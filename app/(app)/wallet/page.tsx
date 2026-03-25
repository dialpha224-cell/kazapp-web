'use client'
// ═══════════════════════════════════════════
//  KAZAPP — Page Portefeuille (Wallet)
//  Fichier : app/(client)/app/wallet/page.tsx
// ═══════════════════════════════════════════
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const PAYMENT_METHODS = [
  { id: 1, type: 'Bancontact', last4: '4521', icon: '💳', color: '#005499', default: true },
  { id: 2, type: 'Visa',       last4: '8834', icon: '💳', color: '#1A1F71', default: false },
]

const TRANSACTIONS = [
  { id: 1, label: 'Netflix',          amount: -17.99, date: '01/03/2026', status: 'paid',    icon: '🎬' },
  { id: 2, label: 'Spotify',          amount: -9.99,  date: '01/03/2026', status: 'paid',    icon: '🎵' },
  { id: 3, label: 'Proximus Internet',amount: -45.00, date: '28/02/2026', status: 'paid',    icon: '📡' },
  { id: 4, label: 'Adobe Creative',   amount: -54.99, date: '15/02/2026', status: 'paid',    icon: '🎨' },
  { id: 5, label: 'Google One',       amount: -2.99,  date: '01/02/2026', status: 'paid',    icon: '☁️' },
  { id: 6, label: 'Disney+',          amount: -8.99,  date: '01/04/2026', status: 'pending', icon: '🏰' },
]

export default function WalletPage() {
  const [tab, setTab] = useState<'overview'|'methods'|'history'>('overview')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user)
    })
  }, [])

  const totalPaid    = TRANSACTIONS.filter(t => t.status === 'paid').reduce((s, t) => s + Math.abs(t.amount), 0)
  const totalPending = TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + Math.abs(t.amount), 0)
  const firstName    = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'vous'

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", padding: '0 0 40px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4f46e5 100%)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 24,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.04) 1.5px,transparent 1.5px)', backgroundSize:'22px 22px', pointerEvents:'none' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginBottom:6 }}>💼 Portefeuille</div>
          <h1 style={{ fontSize:24, fontWeight:900, color:'#fff', margin:'0 0 6px', letterSpacing:-.5 }}>Vos finances Kazapp</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.6)', margin:'0 0 20px' }}>Paiements · Méthodes · Historique</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {[
              { label:'Payé ce mois', val:`${totalPaid.toFixed(2)} €`,    bg:'rgba(255,255,255,.15)', color:'#fff' },
              { label:'À venir',      val:`${totalPending.toFixed(2)} €`, bg:'rgba(255,215,0,.2)',    color:'#fde68a' },
              { label:'Transactions', val:`${TRANSACTIONS.length}`,        bg:'rgba(255,255,255,.1)',  color:'rgba(255,255,255,.8)' },
            ].map(k => (
              <div key={k.label} style={{ background:k.bg, borderRadius:10, padding:'10px 16px' }}>
                <div style={{ fontSize:16, fontWeight:900, color:k.color }}>{k.val}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', marginTop:2 }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:20 }}>
        {[
          { id:'overview', label:'📊 Vue d\'ensemble' },
          { id:'methods',  label:'💳 Mes moyens de paiement' },
          { id:'history',  label:'🕐 Historique' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)} style={{
            padding:'8px 16px', borderRadius:8, border:'1.5px solid',
            borderColor: tab === t.id ? '#4f46e5' : '#e1e4e8',
            background:  tab === t.id ? '#4f46e5' : '#fff',
            color:       tab === t.id ? '#fff'    : '#57606a',
            fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'Outfit',sans-serif",
          }}>{t.label}</button>
        ))}
      </div>

      {/* TAB : OVERVIEW */}
      {tab === 'overview' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {/* Paiement 1 clic */}
          <div style={{ gridColumn:'1/-1', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius:14, padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, flexWrap:'wrap' }}>
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:'#fff' }}>⚡ Payer tous mes abonnements en 1 clic</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginTop:4 }}>
                Total ce mois : <strong style={{ color:'#a5b4fc' }}>{(totalPaid + totalPending).toFixed(2)} €</strong>
              </div>
            </div>
            <button style={{
              padding:'12px 24px', background:'#fff', color:'#4f46e5',
              border:'none', borderRadius:10, fontSize:14, fontWeight:800,
              cursor:'pointer', fontFamily:"'Outfit',sans-serif",
            }}>⚡ Payer tout maintenant</button>
          </div>

          {/* Résumé mensuel */}
          <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:20 }}>
            <div style={{ fontSize:13, fontWeight:800, color:'#0d1117', marginBottom:16 }}>📅 Ce mois</div>
            {[
              { label:'Abonnements payés', val:`${TRANSACTIONS.filter(t=>t.status==='paid').length}`, color:'#16a34a' },
              { label:'Total débité',      val:`${totalPaid.toFixed(2)} €`,                          color:'#4f46e5' },
              { label:'En attente',        val:`${totalPending.toFixed(2)} €`,                       color:'#d97706' },
              { label:'Frais Kazapp',      val:'4,99 €',                                             color:'#0891b2' },
            ].map(r => (
              <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f6f8fa' }}>
                <span style={{ fontSize:12, color:'#57606a' }}>{r.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:r.color }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Prochains paiements */}
          <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:20 }}>
            <div style={{ fontSize:13, fontWeight:800, color:'#0d1117', marginBottom:16 }}>🔔 Prochains paiements</div>
            {TRANSACTIONS.filter(t => t.status === 'pending').map(t => (
              <div key={t.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid #f6f8fa' }}>
                <span style={{ fontSize:20 }}>{t.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#0d1117' }}>{t.label}</div>
                  <div style={{ fontSize:10, color:'#8b949e' }}>Prélèvement le {t.date}</div>
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:'#d97706' }}>{Math.abs(t.amount).toFixed(2)} €</span>
              </div>
            ))}
            {TRANSACTIONS.filter(t => t.status === 'pending').length === 0 && (
              <div style={{ fontSize:12, color:'#8b949e', textAlign:'center', padding:'20px 0' }}>Aucun paiement en attente</div>
            )}
          </div>
        </div>
      )}

      {/* TAB : MOYENS DE PAIEMENT */}
      {tab === 'methods' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            {PAYMENT_METHODS.map(pm => (
              <div key={pm.id} style={{
                background:`linear-gradient(135deg,${pm.color},${pm.color}cc)`,
                borderRadius:14, padding:'24px 20px',
                position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', right:-20, top:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,.06)' }}/>
                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
                    <span style={{ fontSize:24 }}>{pm.icon}</span>
                    {pm.default && <span style={{ background:'rgba(255,255,255,.2)', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 }}>Par défaut</span>}
                  </div>
                  <div style={{ fontSize:16, fontWeight:800, color:'#fff', letterSpacing:2 }}>•••• •••• •••• {pm.last4}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginTop:8 }}>{pm.type}</div>
                </div>
              </div>
            ))}
            {/* Ajouter carte */}
            <div style={{
              background:'#f6f8fa', border:'2px dashed #e1e4e8', borderRadius:14,
              padding:'24px 20px', display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', flexDirection:'column', gap:8,
            }}>
              <div style={{ fontSize:28 }}>➕</div>
              <div style={{ fontSize:12, fontWeight:700, color:'#57606a' }}>Ajouter un moyen de paiement</div>
            </div>
          </div>
          <div style={{ background:'#f6f8fa', borderRadius:12, padding:'12px 16px' }}>
            <p style={{ margin:0, fontSize:12, color:'#57606a' }}>🔒 Vos données bancaires sont chiffrées et sécurisées par Stripe. Kazapp ne stocke jamais vos informations de carte.</p>
          </div>
        </div>
      )}

      {/* TAB : HISTORIQUE */}
      {tab === 'history' && (
        <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid #e1e4e8', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:13, fontWeight:800, color:'#0d1117' }}>Toutes les transactions</span>
            <button style={{
              padding:'6px 14px', background:'#f6f8fa', border:'1.5px solid #e1e4e8',
              borderRadius:7, fontSize:11, fontWeight:700, cursor:'pointer', color:'#57606a',
              fontFamily:"'Outfit',sans-serif",
            }}>📥 Exporter CSV</button>
          </div>
          {TRANSACTIONS.map(t => (
            <div key={t.id} style={{
              padding:'12px 20px', borderBottom:'1px solid #f6f8fa',
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:40, height:40, borderRadius:10, background:'#f6f8fa',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0,
              }}>{t.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#0d1117' }}>{t.label}</div>
                <div style={{ fontSize:11, color:'#8b949e' }}>{t.date}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:14, fontWeight:800, color: t.status === 'pending' ? '#d97706' : '#0d1117' }}>
                  -{Math.abs(t.amount).toFixed(2)} €
                </div>
                <div style={{
                  fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
                  background: t.status === 'paid' ? '#f0fdf4' : '#fffbeb',
                  color:      t.status === 'paid' ? '#16a34a' : '#d97706',
                }}>
                  {t.status === 'paid' ? '✅ Payé' : '⏳ En attente'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
