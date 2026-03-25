'use client'
// ═══════════════════════════════════════════════════════
//  KAZAPP — Landing Page (Page publique)
//  Fichier : app/page.tsx
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import Link from 'next/link'

const FEATURES = [
  { icon:'🗂️', title:'Catalogue complet',         desc:'Plus de 40 services négociés — streaming, télécom, logiciels, assurance, énergie.' },
  { icon:'⚡', title:'Paiement unique mensuel',    desc:'Un seul prélèvement KaZAPP remplace tous vos abonnements individuels. Zéro paperasse.' },
  { icon:'💡', title:'IA d\'optimisation',          desc:'Détection automatique de doublons, hausses de prix et économies potentielles chaque semaine.' },
  { icon:'👨‍👩‍👧', title:'Espace Famille',          desc:'Partagez les abonnements entre membres de la famille depuis un seul espace centralisé.' },
  { icon:'📊', title:'Rapports & Analytiques',     desc:'Visualisez l\'évolution de vos dépenses en temps réel avec des graphiques détaillés.' },
  { icon:'🔒', title:'Sécurité & RGPD',            desc:'Données hébergées en Europe, paiements SSL, conformité RGPD totale. Votre vie privée d\'abord.' },
]

const HOW_IT_WORKS = [
  { step:'01', icon:'📝', title:'Créez votre compte', desc:'Inscription en 2 minutes. Choisissez votre rôle : utilisateur, famille ou PME.' },
  { step:'02', icon:'🗂️', title:'Parcourez le catalogue', desc:'Découvrez tous les services disponibles et composez votre sélection personnalisée.' },
  { step:'03', icon:'📋', title:'Signez en 1 clic', desc:'Un seul contrat KaZAPP couvre tous vos abonnements. Signature électronique sécurisée.' },
  { step:'04', icon:'⚡', title:'Profitez & économisez', desc:'KaZAPP gère tout automatiquement. Vous recevez des alertes et conseils d\'optimisation.' },
]

const PACKS = [
  { name:'Solo',        icon:'👤', price:28.99, desc:'Essentiels pour une personne',       services:['Netflix','Spotify','Google One'],           color:'#4f46e5', badge:'' },
  { name:'Famille',     icon:'👨‍👩‍👧', price:42.99, desc:'Partagez en famille',            services:['Netflix Premium','Disney+','Spotify Famille','Google One 2To'], color:'#059669', badge:'Populaire' },
  { name:'PME Starter', icon:'💼', price:38.99, desc:'Outils professionnels complets',     services:['Microsoft 365','Dropbox Plus','Zoom Pro'],   color:'#0891b2', badge:'Pro' },
]

const STATS = [
  { val:'40+', label:'Services disponibles' },
  { val:'3 min', label:'Pour s\'inscrire' },
  { val:'30%', label:'D\'économie moyenne' },
  { val:'100%', label:'RGPD conforme' },
]

const TESTIMONIALS = [
  { name:'Sophie M.', role:'Famille de 4', quote:'J\'ai économisé 47€/mois en regroupant tous nos abonnements sur KaZAPP. La gestion est devenue un jeu d\'enfant.', avatar:'S', stars:5 },
  { name:'Marc T.',   role:'Freelance',    quote:'Un seul prélèvement mensuel pour tous mes outils professionnels. Fini les 8 factures différentes chaque mois.', avatar:'M', stars:5 },
  { name:'Aida K.',   role:'Entreprise',   quote:'KaZAPP a détecté 3 doublons dans nos abonnements PME. Économie annuelle : 456€. L\'IA est bluffante.', avatar:'A', stars:5 },
]

export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const FAQ = [
    { q:'Comment fonctionne le paiement unique KaZAPP ?', a:'Chaque mois, KaZAPP prélève un montant unique qui couvre l\'ensemble de vos abonnements actifs + 4,99 € de frais de gestion. KaZAPP redistribue ensuite automatiquement les paiements à chaque fournisseur.' },
    { q:'Puis-je résilier un abonnement à tout moment ?', a:'Oui, absolument. Depuis votre espace Mon Espace, vous pouvez mettre en pause ou résilier n\'importe quel abonnement en un seul clic, sans frais cachés ni engagement minimum.' },
    { q:'Mes données bancaires sont-elles sécurisées ?', a:'KaZAPP ne stocke jamais vos coordonnées bancaires. Les paiements sont traités par Stripe (certifié PCI DSS niveau 1). Toutes les données sont chiffrées et hébergées en Europe (RGPD).' },
    { q:'KaZAPP est-il disponible en dehors de la Belgique ?', a:'KaZAPP est actuellement disponible en Belgique et au Luxembourg. Une expansion vers la France et les Pays-Bas est prévue pour fin 2026.' },
    { q:'Que se passe-t-il si un fournisseur augmente son prix ?', a:'KaZAPP surveille en temps réel les tarifs de tous les fournisseurs. Vous recevez une notification immédiate avec une analyse d\'impact et des alternatives éventuelles.' },
  ]

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", color:'#0d1117', overflowX:'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        height:60,
        background: scrollY > 20 ? 'rgba(13,17,23,.95)' : 'transparent',
        backdropFilter: scrollY > 20 ? 'blur(12px)' : 'none',
        borderBottom: scrollY > 20 ? '1px solid rgba(255,255,255,.08)' : 'none',
        transition:'all .3s ease',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 32px',
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#4f46e5"/>
            <path d="M8 22L14 10L20 16L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="10" r="2.5" fill="white"/>
          </svg>
          <span style={{ fontSize:18, fontWeight:900, color:'#fff', letterSpacing:-.5 }}>KaZAPP</span>
        </div>
        {/* Nav links */}
        <div style={{ display:'flex', gap:28, alignItems:'center' }}>
          {[['Fonctionnalités','#features'],['Packs','#packs'],['Tarifs','#pricing'],['FAQ','#faq']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,.7)', textDecoration:'none', transition:'color .15s' }}
              onMouseOver={e => (e.currentTarget.style.color='#fff')}
              onMouseOut={e => (e.currentTarget.style.color='rgba(255,255,255,.7)')}
            >{label}</a>
          ))}
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <Link href="/login" style={{ padding:'7px 16px', borderRadius:8, border:'1px solid rgba(255,255,255,.2)', color:'rgba(255,255,255,.8)', fontSize:12, fontWeight:700, textDecoration:'none', background:'transparent', transition:'all .15s' }}>
            Se connecter
          </Link>
          <Link href="/register" style={{ padding:'8px 18px', borderRadius:8, background:'#4f46e5', color:'#fff', fontSize:12, fontWeight:700, textDecoration:'none', boxShadow:'0 4px 14px rgba(79,70,229,.4)' }}>
            Commencer →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        background:'linear-gradient(135deg,#0d0b1a 0%,#1a1533 40%,#0d1117 100%)',
        padding:'100px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Background grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(79,70,229,.08) 1.5px,transparent 1.5px)', backgroundSize:'32px 32px', pointerEvents:'none' }}/>
        {/* Glow effects */}
        <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, background:'radial-gradient(circle,rgba(79,70,229,.12) 0%,transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:1, maxWidth:780 }}>
          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(79,70,229,.15)', border:'1px solid rgba(79,70,229,.3)', borderRadius:20, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4f46e5', display:'inline-block', boxShadow:'0 0 6px #4f46e5' }}/>
            <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.8)' }}>Disponible en Belgique & Luxembourg</span>
          </div>

          <h1 style={{ fontSize:60, fontWeight:900, color:'#fff', margin:'0 0 20px', lineHeight:1.1, letterSpacing:-2 }}>
            Gérez <span style={{ background:'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>tous vos abonnements</span><br/>
            en un seul endroit
          </h1>

          <p style={{ fontSize:18, color:'rgba(255,255,255,.55)', margin:'0 0 36px', lineHeight:1.7, maxWidth:560, marginLeft:'auto', marginRight:'auto' }}>
            KaZAPP centralise vos abonnements, charges fixes et services numériques.<br/>
            Un seul paiement mensuel, une gestion simplifiée, des économies garanties.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:48 }}>
            <Link href="/register" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'14px 32px', background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'~fff',
              borderRadius:12, fontSize:15, fontWeight:800, textDecoration:'none',
              boxShadow:'0 8px 24px rgba(79,70,229,.4)', transition:'transform .15s',
            }}
              onMouseOver={e => (e.currentTarget.style.transform='translateY(-2px)')}
              onMouseOut={e => (e.currentTarget.style.transform='translateY(0)')}
            >
              🚀 Commencer gratuitement
            </Link>
            <a href="#features" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'14px 28px', background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.9)',
              borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none',
              border:'1px solid rgba(255,255,255,.15)',
            }}>
              ▶️ Voir la démo
            </a>
          </div>

          {/* Stats */}
          <div style={{ display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:28, fontWeight:900, color:'#fff', letterSpacing:-1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.4)', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:10, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:2 }}>Découvrir</span>
          <div style={{ width:1, height:24, background:'linear-gradient(180deg,rgba(79,70,229,.6),transparent)' }}/>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background:'#f6f8fa', padding:'80px 32px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'#eef2ff', border:'1.5px solid #c7d2fe', borderRadius:20, padding:'4px 14px', fontSize:11, fontWeight:800, color:'#4f46e5', marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>Fonctionnalités</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0d1117', margin:'0 0 12px', letterSpacing:-1 }}>Tout ce dont vous avez besoin</h2>
            <p style={{ fontSize:15, color:'#57606a', margin:0, maxWidth:520, marginLeft:'auto', marginRight:'auto', lineHeight:1.7 }}>KaZAPP est plus qu'un gestionnaire d'abonnements. C'est votre copilote financier personnel.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:16, padding:'24px',
                transition:'all .2s', cursor:'default',
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor='#4f46e5'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(79,70,229,.1)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor='#e1e4e8'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
              >
                <div style={{ fontSize:32, marginBottom:12 }}>{f.icon}</div>
                <h3 style={{ margin:'0 0 8px', fontSize:16, fontWeight:800, color:'#0d1117' }}>{f.title}</h3>
                <p style={{ margin:0, fontSize:13, color:'#57606a', lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
  2     </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={{ background:'#fff', padding:'80px 32px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'#eef2ff', border:'1.5px solid #c7d2fe', borderRadius:20, padding:'4px 14px', fontSize:11, fontWeight:800, color:'#4f46e5', marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>Comment ça marche</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0d1117', margin:'0 0 12px', letterSpacing:-1 }}>Démarrez en 4 étapes</h2>
            <p style={{ fontSize:15, color:'#57606a', margin:0, maxWidth:460, marginLeft:'auto', marginRight:'auto' }}>Simple, rapide et sans engagement. Votre premier mois est gratuit.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:0, position:'relative' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} style={{ textAlign:'center', padding:'0 20px', position:'relative' }}>
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{ position:'absolute', top:28, left:'calc(50% + 32px)', right:0, height:2, background:'linear-gradient(90deg,#c7d2fe,transparent)', zIndex:0 }}/>
                )}
                <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#4f46e5,#3730a3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, margin:'0 auto 16px', position:'relative', zIndex:1, boxShadow:'0 4px 16px rgba(79,70,229,.3)' }}>
                  {step.icon}
                </div>
                <div style={{ fontSize:9, fontWeight:800, color:'#4f46e5', textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>Étape {step.step}</div>
                <h3 style={{ margin:'0 0 8px', fontSize:15, fontWeight:800, color:'#0d1117' }}>{step.title}</h3>
                <p style={{ margin:0, fontSize:12, color:'#57606a', lineHeight:1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKS ── */}
      <section id="packs" style={{ background:'#f6f8fa', padding:'80px 32px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:'#eef2ff', border:'1.5px solid #c7d2fe', borderRadius:20, padding:'4px 14px', fontSize:11, fontWeight:800, color:'#4f46e5', marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>Nos packs</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0d1117', margin:'0 0 12px', letterSpacing:-1 }}>Des offres pour chaque besoin</h2>
            <p style={{ fontSize:15, color:'#57606a', margin:0 }}>Packs négociés — économisez jusqu'à 30% par rapport aux prix individuels.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            {PACKS.map((pack, i) => (
              <div key={pack.name} style={{
                background:'#fff', border:`1.5px solid ${i===1 ? pack.color : '#e1e4e8'}`,
                borderRadius:18, padding:'28px 24px', position:'relative', overflow:'hidden',
                boxShadow: i===1 ? `0 8px 32px ${pack.color}25` : '0 2px 8px rgba(0,0,0,.06)',
                transition:'all .2s',
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor=pack.color; e.currentTarget.style.transform='translateY(-4px)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor=i===1 ? pack.color : '#e1e4e8'; e.currentTarget.style.transform='translateY(0)' }}
              >
                {pack.badge && (
                  <div style={{ position:'absolute', top:16, right:16, background:pack.color, color:'#fff', fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20 }}>{pack.badge}</div>
                )}
                <div style={{ fontSize:36, marginBottom:12 }}>{pack.icon}</div>
                <h3 style={{ margin:'0 0 6px', fontSize:20, fontWeight:900, color:'#0d1117' }}>{pack.name}</h3>
                <p style={{ margin:'0 0 16px', fontSize:13, color:'#57606a' }}>{pack.desc}</p>
                <div style={{ marginBottom:18 }}>
        2         <span style={{ fontSize:36, fontWeight:900, color:pack.color }}>{pack.price.toFixed(2)} €</span>
                  <span style={{ fontSize:13, color:'#8b949e' }}>/mois</span>
                </div>
                <div style={{ marginBottom:20 }}>
                  {pack.services.map(s => (
                    <div key={s} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <span style={{ width:16, height:16, borderRadius:'50%', background:`${pack.color}20`, border:`1.5px solid ${pack.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:pack.color, flexShrink:0, fontWeight:800 }}>✓</span>
                      <span style={{ fontSize:12, color:'#0d1117', fontWeight:600 }}>{s}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register" style={{ display:'block', textAlign:'center', padding:'11px', background: i===1 ? `linear-gradient(135deg,${pack.color},${pack.color}cc)` : '#f6f8fa', color: i===1 ? '#fff' : pack.color, border: i===1 ? 'none' : `1.5px solid ${pack.color}40`, borderRadius:10, fontSize:13, fontWeight:800, textDecoration:'none' }}>
                  Choisir ce pack →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:28, fontSize:13, color:'#8b949e' }}>
            Vous pouvez aussi créer votre propre pack avec le{' '}
            <Link href="/app/shop" style={{ color:'#4f46e5', fontWeight:700, textDecoration:'none' }}>Pack Perso Builder →</Link>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={{ background:'#fff', padding:'80px 32px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:'#eef2ff', border:'1.5px solid #c7d2fe', borderRadius:20, padding:'4px 14px', fontSize:11, fontWeight:800, color:'#4f46e5', marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>Témoignages</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0d1117', margin:'0 0 12px', letterSpacing:-1 }}>Ils font confiance à KaZAPP</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background:'#f6f8fa', border:'1.5px solid #e1e4e8', borderRadius:16, padding:24 }}>
                <div style={{ display:'flex', gap:2, marginBottom:12 }}>
                  {Array.from({length:t.stars}).map((_, s) => <span key={s} style={{ color:'#f59e0b', fontSize:14 }}>★</span>)}
                </div>
                <p style={{ margin:'0 0 16px', fontSize:13, color:'#0d1117', lineHeight:1.7, fontStyle:'italic' }}>"{t.quote}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:900, color:'#fff' }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:800, color:'#0d1117' }}>{t.name}</div>
                    <div style={{ fontSize:11, color:'#8b949e' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background:'#f6f8fa', padding:'80px 32px' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:'#eef2ff', border:'1.5px solid #c7d2fe', borderRadius:20, padding:'4px 14px', fontSize:11, fontWeight:800, color:'#4f46e5', marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>FAQ</div>
            <h2 style={{ fontSize:38, fontWeight:900, color:'#0d1117', margin:0, letterSpacing:-1 }}>Questions fréquentes</h2>
          </div>
          <div style={{ display:'grid', gap:10 }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{ background:'#fff', border:`1.5px solid ${faqOpen === i ? '#4f46e5' : '#e1e4e8'}`, borderRadius:12, overflow:'hidden', transition:'all .2s' }}>
                <button
                  onClick={() => setFaqOpen(p => p === i ? null : i)}
                  style={{ width:'100%', padding:'16px 20px', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, fontFamily:"'Outfit',sans-serif" }}
                >
                  <span style={{ fontSize:14, fontWeight:700, color:'#0d1117', textAlign:'left' }}>{item.q}</span>
                  <span style={{ fontSize:18, color:'#4f46e5', transform: faqOpen === i ? 'rotate(45deg)' : 'none', transition:'transform .2s', flexShrink:0 }}>+</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding:'0 20px 16px', fontSize:13, color:'#57606a', lineHeight:1.7, borderTop:'1px solid #f0f0f0' }}>
                    {item.a}
                  </div>
     0          )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background:'linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4f46e5 100%)', padding:'80px 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.04) 1.5px,transparent 1.5px)', backgroundSize:'22px 22px', pointerEvents:'none' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:600, margin:'0 auto' }}>
    2     <h2 style={{ fontSize:42, fontWeight:900, color:'#fff', margin:'0 0 16px', letterSpacing:-1.5, lineHeight:1.1 }}>
            Prêt à simplifier<br/>votre vie numérique ?
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.6)', margin:'0 0 36px', lineHeight:1.7 }}>
  2         Rejoignez des milliers d'utilisateurs KaZAPP en Belgique et commencez à économiser dès aujourd'hui.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/register" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', background:'#fff', color:'#4f46e5', borderRadius:12, fontSize:15, fontWeight:800, textDecoration:'none', boxShadow:'0 8px 24px rgba(0,0,0,.2)' }}>
              🚀 Commencer gratuitement
            </Link>
            <Link href="/login" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 24px', background:'rgba(255,255,255,.1)', color:'rgba(255,255,255,.9)', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none', border:'1px solid rgba(255,255,255,.2)' }}>
              Se connecter
            </Link>
          </div>
          <p style={{ marginTop:20, fontSize:11, color:'rgba(255,255,255,.35)' }}>Aucune carte de crédit requise · Premier mois gratuit · Résiliation à tout moment</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#0d1117', padding:'40px 32px 24px', color:'rgba(255,255,255,.4)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20, marginBottom:32 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#4f46e5"/>
                <path d="M8 22L14 10L20 16L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
           2    <circle cx="24" cy="10" r="2.5" fill="white"/>
              </svg>
              <span style={{ fontSize:16, fontWeight:900, color:'#fff' }}>KaZAPP</span>
            </div>
            <div style={{ display:'flex', gap:24 }}>
              {['CGU','Confidentialité','Cookies','Contact'].map(link => (
                <a key={link} href="#" style={{ fontSize:12, color:'rgba(255,255,255,.3)', textDecoration:'none', transition:'color .15s' }}
                  onMouseOver={e => (e.currentTarget.style.color='rgba(255,255,255,.7)')}
                  onMouseOut={e => (e.currentTarget.style.color='rgba(255,255,255,.3)')}
                >{link}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:20, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
            <span style={{ fontSize:11 }}>© 2026 KaZAPP · Tous droits réservés · Made in Belgium 🇧🇪</span>
            <span style={{ fontSize:11 }}>🔒 RGPD conforme · Hébergement Europe</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
