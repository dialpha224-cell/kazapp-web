'use client'
// ═══════════════════════════════════════════════════════
//  KAZAPP — Page Shop (Boutique client)
//  Fichier : kazapp-web/app/(client)/shop/page.tsx
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SHOP_TABS = [
  { id: 'catalogue', emoji: '🗂️', label: 'Catalogue' },
  { id: 'packs',     emoji: '✦',   label: 'Packs' },
  { id: 'charges',   emoji: '🏠',  label: 'Mes charges', green: true },
  { id: 'mobilite',  emoji: '🚗',  label: 'Mobilité' },
  { id: 'quotidien', emoji: '🌟',  label: 'Quotidien' },
  { id: 'builder',   emoji: '🛠️',  label: 'Pack perso' },
]

const CATEGORIES = ['Tous', 'Streaming', 'Télécom', 'Musique', 'Cloud', 'Énergie', 'Assurance', 'Sport']

interface Service {
  id: string
  name: string
  logo?: string
  category: string
  price: number
  description?: string
}

interface CartItem extends Service {
  qty: number
}

export default function ShopPage() {
  const [tab,      setTab]      = useState('catalogue')
  const [cat,      setCat]      = useState('Tous')
  const [services, setServices] = useState<Service[]>([])
  const [cart,     setCart]     = useState<CartItem[]>([])
  const [user,     setUser]     = useState<any>(null)
  const [subs,     setSubs]     = useState<any[]>([])
  const [loading,  setLoading]  = useState(true)
  const [greeting, setGreeting] = useState('Bonjour 👋')

  useEffect(() => {
    const h = new Date().getHours()
    setGreeting(h < 12 ? 'Bonjour 👋' : h < 18 ? 'Bon après-midi 👋' : 'Bonsoir 👋')
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setUser(session.user)
      const { data: profile } = await supabase
        .from('user_profiles').select('*').eq('id', session.user.id).single()
      if (profile) setUser({ ...session.user, profile })

      const { data: subsData } = await supabase
        .from('subscriptions').select('*, services(*)').eq('user_id', session.user.id).eq('status', 'active')
      if (subsData) setSubs(subsData)
    }

    const { data: svcData } = await supabase.from('services').select('*').order('name')
    if (svcData) setServices(svcData)
    setLoading(false)
  }

  const addToCart = (svc: Service) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === svc.id)
      if (exists) return prev
      return [...prev, { ...svc, qty: 1 }]
    })
  }

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id))
  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const monthlyTotal = (cartTotal + 4.99).toFixed(2)

  const filtered = cat === 'Tous' ? services : services.filter(s => s.category === cat)

  const firstName = user?.profile?.first_name || user?.user_metadata?.first_name || 'vous'

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4f46e5 100%)',
        borderRadius: 16, padding: '28px 28px 24px', marginBottom: 20,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1.5px,transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 6 }}>{greeting}</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: -.5 }}>
            Votre espace Kazapp
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', margin: '0 0 14px' }}>
            Catalogue complet · Packs · Gestion en 1 clic
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: '#4f46e5', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>
              {subs.length} abonnement{subs.length !== 1 ? 's' : ''}
            </span>
            <span style={{ background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.8)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>
              {subs.reduce((s, sub) => s + Number(sub.amount || 0), 0).toFixed(2)} €/mois
            </span>
            <span style={{ background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.8)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>
              40+ services
            </span>
          </div>
        </div>
      </div>

      {/* ── ABONNEMENTS ACTIFS ── */}
      {subs.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0d1117' }}>✅ Abonnements actifs</span>
            <Link href="/app/vault" style={{ fontSize: 11, color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>Tout gérer →</Link>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
            {subs.map(sub => (
              <div key={sub.id} style={{
                flexShrink: 0, background: '#fff', border: '1.5px solid #e1e4e8',
                borderRadius: 12, padding: '10px 14px', minWidth: 140,
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0d1117' }}>{sub.services?.name || 'Service'}</div>
                <div style={{ fontSize: 11, color: '#4f46e5', fontWeight: 700 }}>{Number(sub.amount).toFixed(2)} €/mois</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

        {/* ── CONTENU PRINCIPAL ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Onglets */}
          <div style={{
            display: 'flex', background: '#fff', border: '1px solid #e1e4e8',
            borderRadius: 12, overflow: 'hidden', marginBottom: 20,
            boxShadow: '0 1px 3px rgba(0,0,0,.06)',
          }}>
            {SHOP_TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, padding: '10px 4px', border: 'none', borderRight: '1px solid #e1e4e8',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', lineHeight: 1.3,
                background: tab === t.id ? '#4f46e5' : '#fff',
                color: tab === t.id ? '#fff' : t.green ? '#059669' : '#57606a',
                fontFamily: "'Outfit', sans-serif",
              }}>
                {t.emoji}<br/>{t.label}
              </button>
            ))}
          </div>

          {/* TAB Catalogue */}
          {tab === 'catalogue' && (
            <div>
              {/* Filtres catégories */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCat(c)} style={{
                      padding: '5px 12px', borderRadius: 20, border: '1.5px solid',
                      borderColor: cat === c ? '#4f46e5' : '#e1e4e8',
                      background: cat === c ? '#4f46e5' : '#fff',
                      color: cat === c ? '#fff' : '#57606a',
                      fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif",
                    }}>{c}</button>
                  ))}
                </div>
                <button style={{
                  padding: '7px 14px', background: 'linear-gradient(135deg,#4f46e5,#3730a3)',
                  color: '#fff', border: 'none', borderRadius: 7, fontSize: 11, fontWeight: 800,
                  cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Outfit', sans-serif",
                }}>✨ Ajouter un service</button>
              </div>

              {/* Grille services */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#8b949e' }}>Chargement...</div>
              ) : filtered.length === 0 ? (
                <div style={{
                  background: '#fff', border: '1px solid #e1e4e8', borderRadius: 14,
                  padding: 40, textAlign: 'center', color: '#8b949e',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🗂️</div>
                  <div style={{ fontWeight: 700 }}>Catalogue en cours de chargement</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Les services seront ajoutés depuis Supabase</div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 12 }}>
                  {filtered.map(svc => (
                    <div key={svc.id} style={{
                      background: '#fff', border: '1.5px solid #e1e4e8', borderRadius: 12,
                      padding: '16px', cursor: 'pointer', transition: 'all .15s',
                    }}
                      onMouseOver={e => (e.currentTarget.style.borderColor = '#4f46e5')}
                      onMouseOut={e => (e.currentTarget.style.borderColor = '#e1e4e8')}
                    >
                      <div style={{ fontSize: 28, marginBottom: 8 }}>📦</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#0d1117', marginBottom: 4 }}>{svc.name}</div>
                      <div style={{ fontSize: 10, color: '#8b949e', marginBottom: 8 }}>{svc.category}</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#4f46e5', marginBottom: 10 }}>
                        {Number(svc.price).toFixed(2)} €/mois
                      </div>
                      <button onClick={() => addToCart(svc)} style={{
                        width: '100%', padding: '6px', background: '#eef2ff',
                        border: '1.5px solid #c7d2fe', borderRadius: 7,
                        fontSize: 11, fontWeight: 700, color: '#4f46e5',
                        cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                      }}>+ Ajouter</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB Packs */}
          {tab === 'packs' && (
            <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: 14, padding: 40, textAlign: 'center', color: '#8b949e' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
              <div style={{ fontWeight: 700 }}>Packs disponibles prochainement</div>
            </div>
          )}

          {/* TAB Builder */}
          {tab === 'builder' && (
            <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0d1117', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                🛠️ Composer mon pack personnalisé
              </div>
              <div style={{ background: '#f6f8fa', borderRadius: 10, padding: '12px 16px', marginBottom: 14, minHeight: 48, color: '#8b949e', fontSize: 12 }}>
                Ajoutez des services depuis le catalogue…
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input placeholder="Nom du pack (ex: Pack Famille, Pack Pro…)" style={{
                  flex: 1, padding: '10px 12px', border: '1.5px solid #e1e4e8',
                  borderRadius: 8, fontSize: 12, fontFamily: "'Outfit', sans-serif",
                }}/>
                <button style={{
                  padding: '10px 16px', background: '#4f46e5', color: '#fff',
                  border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                }}>💾 Sauvegarder</button>
              </div>
            </div>
          )}

          {/* Autres tabs */}
          {['charges', 'mobilite', 'quotidien'].includes(tab) && (
            <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: 14, padding: 40, textAlign: 'center', color: '#8b949e' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>
                {tab === 'charges' ? '🏠' : tab === 'mobilite' ? '🚗' : '🌟'}
              </div>
              <div style={{ fontWeight: 700 }}>Section {tab} — bientôt disponible</div>
            </div>
          )}
        </div>

        {/* ── PANIER ── */}
        <div style={{
          width: 280, flexShrink: 0, background: '#fff',
          border: '1.5px solid #e1e4e8', borderRadius: 14,
          overflow: 'hidden', position: 'sticky', top: 20,
        }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid #e1e4e8',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0d1117' }}>🛒 Panier</span>
            {cart.length > 0 && (
              <button onClick={clearCart} style={{
                fontSize: 11, color: '#8b949e', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}>Vider</button>
            )}
          </div>

          <div style={{ padding: '12px', minHeight: 120 }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#8b949e' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🛍️</div>
                <div style={{ fontSize: 11 }}>Votre panier est vide.<br/>Parcourez le catalogue.</div>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid #f6f8fa',
                }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#0d1117' }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: '#4f46e5' }}>{Number(item.price).toFixed(2)} €/mois</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    background: 'none', border: 'none', color: '#dc2626',
                    cursor: 'pointer', fontSize: 14, fontFamily: "'Outfit', sans-serif",
                  }}>✕</button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e1e4e8', background: '#f6f8fa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#57606a', marginBottom: 4 }}>
                <span>Sous-total</span><span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#57606a', marginBottom: 8 }}>
                <span>🔒 Frais Kazapp</span><span>4,99 €/mois</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#0d1117', marginBottom: 12 }}>
                <span>Total mensuel</span><span>{monthlyTotal} €</span>
              </div>
              <button style={{
                width: '100%', padding: '11px', background: 'linear-gradient(135deg,#4f46e5,#3730a3)',
                color: '#fff', border: 'none', borderRadius: 10, fontSize: 13,
                fontWeight: 800, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}>📝 Signer & Payer →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
