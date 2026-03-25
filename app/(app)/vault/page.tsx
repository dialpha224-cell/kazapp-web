'use client'
// ═══════════════════════════════════════════════════════
//  KAZAPP — Page Vault (Mes abonnements)
//  Fichier : kazapp-web/app/(client)/vault/page.tsx
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const VAULT_TABS = [
  { id: 'subs',     label: '📋 Mes abonnements' },
  { id: 'charges',  label: '🏠 Mes charges fixes' },
  { id: 'family',   label: '👨‍👩‍👧 Pack Famille' },
  { id: 'packs',    label: '📦 Mes packs' },
  { id: 'history',  label: '🕐 Historique' },
  { id: 'profile',  label: '👤 Mon profil' },
]

const SUB_FILTERS = [
  { id: 'all',    label: 'Tous' },
  { id: 'active', label: '✅ Actifs' },
  { id: 'paused', label: '⏸ En pause' },
  { id: 'cancel', label: '❌ Résiliation' },
]

export default function VaultPage() {
  const [tab,     setTab]     = useState('subs')
  const [filter,  setFilter]  = useState('all')
  const [subs,    setSubs]    = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data: prof } = await supabase
      .from('user_profiles').select('*').eq('id', session.user.id).single()
    setProfile(prof)

    const { data: subsData } = await supabase
      .from('subscriptions')
      .select('*, services(id, name, category, price)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
    if (subsData) setSubs(subsData)
    setLoading(false)
  }

  const filtered = filter === 'all' ? subs
    : filter === 'active' ? subs.filter(s => s.status === 'active')
    : filter === 'paused' ? subs.filter(s => s.status === 'paused')
    : subs.filter(s => s.status === 'cancelled')

  const totalMonthly = subs.filter(s => s.status === 'active').reduce((sum, s) => sum + Number(s.amount), 0)
  const totalAnnual  = totalMonthly * 12
  const firstName    = profile?.first_name || 'Utilisateur'
  const initials     = (profile?.first_name?.[0] || 'U') + (profile?.last_name?.[0] || '')

  const STATUS_COLORS: Record<string, string> = {
    active: '#16a34a', paused: '#d97706', cancelled: '#dc2626', expired: '#8b949e', pending: '#0891b2',
  }
  const STATUS_LABELS: Record<string, string> = {
    active: '✅ Actif', paused: '⏸ En pause', cancelled: '❌ Résilié', expired: 'Expiré', pending: '⏳ En attente',
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── HERO PROFIL ── */}
      <div style={{
        background: '#fff', border: '1.5px solid #e1e4e8', borderRadius: 16,
        padding: '24px 28px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 800, color: '#fff', flexShrink: 0,
        }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#0d1117' }}>
            {firstName} {profile?.last_name || ''}
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#8b949e' }}>
            Membre Kazapp · compte actif
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { val: subs.filter(s=>s.status==='active').length, lbl: 'Abonnements' },
            { val: `${totalMonthly.toFixed(2)} €`, lbl: 'Par mois' },
            { val: `${totalAnnual.toFixed(0)} €`, lbl: 'Par an' },
          ].map(m => (
            <div key={m.lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0d1117' }}>{m.val}</div>
              <div style={{ fontSize: 10, color: '#8b949e', fontWeight: 600 }}>{m.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BANNER 1 CLIC ── */}
      {subs.filter(s=>s.status==='active').length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
          borderRadius: 14, padding: '16px 22px', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>⚡ Payer tous mes abonnements en 1 clic</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 3 }}>
              Paiement groupé sécurisé —{' '}
              <span style={{ fontWeight: 800, color: '#a5b4fc' }}>{totalMonthly.toFixed(2)} €</span> ce mois
            </div>
          </div>
          <button style={{
            padding: '11px 24px', borderRadius: 10, border: 'none',
            background: '#fff', color: '#4f46e5', fontSize: 13, fontWeight: 800,
            cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
          }}>⚡ Payer tout maintenant</button>
        </div>
      )}

      {/* ── TABS ── */}
      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
        {VAULT_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '8px 16px', borderRadius: 8, border: '1.5px solid',
            borderColor: tab === t.id ? '#4f46e5' : '#e1e4e8',
            background: tab === t.id ? '#4f46e5' : '#fff',
            color: tab === t.id ? '#fff' : '#57606a',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: "'Outfit', sans-serif",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── TAB: MES ABONNEMENTS ── */}
      {tab === 'subs' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {SUB_FILTERS.map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  padding: '5px 12px', borderRadius: 20, border: '1.5px solid',
                  borderColor: filter === f.id ? '#4f46e5' : '#e1e4e8',
                  background: filter === f.id ? '#4f46e5' : '#fff',
                  color: filter === f.id ? '#fff' : '#57606a',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}>{f.label}</button>
              ))}
            </div>
            <Link href="/app/shop" style={{
              padding: '7px 14px', background: '#4f46e5', color: '#fff',
              borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: 'none',
            }}>+ Ajouter un abonnement</Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#8b949e' }}>Chargement...</div>
          ) : filtered.length === 0 ? (
            <div style={{
              background: '#fff', border: '1px solid #e1e4e8', borderRadius: 14,
              padding: 40, textAlign: 'center', color: '#8b949e',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🛒</div>
              <div style={{ fontWeight: 700 }}>Aucun abonnement actif.</div>
              <Link href="/app/shop" style={{
                display: 'inline-block', marginTop: 12, padding: '8px 16px',
                background: '#4f46e5', color: '#fff', borderRadius: 8,
                fontSize: 12, fontWeight: 700, textDecoration: 'none',
              }}>Parcourir le catalogue →</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
              {filtered.map(sub => (
                <div key={sub.id} style={{
                  background: '#fff', border: '1.5px solid #e1e4e8', borderRadius: 14, padding: 20,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0d1117' }}>{sub.services?.name || 'Service'}</div>
                      <div style={{ fontSize: 11, color: '#8b949e' }}>{sub.services?.category || ''}</div>
                    </div>
                    <span style={{
                      padding: '3px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                      background: sub.status === 'active' ? '#f0fdf4' : '#fef2f2',
                      color: STATUS_COLORS[sub.status] || '#8b949e',
                    }}>{STATUS_LABELS[sub.status] || sub.status}</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#4f46e5', marginBottom: 8 }}>
                    {Number(sub.amount).toFixed(2)} €<span style={{ fontSize: 11, fontWeight: 400, color: '#8b949e' }}>/mois</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{
                      flex: 1, padding: '6px', background: '#f6f8fa', border: '1.5px solid #e1e4e8',
                      borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif", color: '#57606a',
                    }}>⏸ Pause</button>
                    <button style={{
                      flex: 1, padding: '6px', background: '#fef2f2', border: '1.5px solid #fecaca',
                      borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif", color: '#dc2626',
                    }}>❌ Résilier</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: PACK FAMILLE ── */}
      {tab === 'family' && (
        <div style={{
          background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4f46e5 100%)',
          borderRadius: 16, padding: '36px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1.5px,transparent 1.5px)', backgroundSize: '22px 22px' }}/>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>👨‍👩‍👧‍👦</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Votre espace commun Famille</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.8 }}>
              Un espace <strong style={{ color: '#e0e7ff' }}>100% partagé</strong> entre les membres de votre famille.
              Synchronisé instantanément pour tout le groupe.
            </div>
            <button style={{
              padding: '14px 32px', background: '#fff', color: '#4f46e5',
              border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 800,
              cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            }}>👨‍👩‍👧‍👦 Créer mon espace Famille →</button>
          </div>
        </div>
      )}

      {/* Autres tabs */}
      {['charges', 'packs', 'history', 'profile'].includes(tab) && (
        <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: 14, padding: 40, textAlign: 'center', color: '#8b949e' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>
            {tab === 'charges' ? '🏠' : tab === 'packs' ? '📦' : tab === 'history' ? '🕐' : '👤'}
          </div>
          <div style={{ fontWeight: 700 }}>Section {tab} — bientôt disponible</div>
        </div>
      )}
    </div>
  )
}
