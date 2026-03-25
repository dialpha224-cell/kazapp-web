'use client'
// ═══════════════════════════════════════════
//  KAZAPP — Page Rapports
//  Fichier : app/(client)/app/rapports/page.tsx
// ═══════════════════════════════════════════
import { useState } from 'react'

const MONTHLY_DATA = [
  { month: 'Oct', total: 112.45 },
  { month: 'Nov', total: 127.90 },
  { month: 'Déc', total: 118.30 },
  { month: 'Jan', total: 134.55 },
  { month: 'Fév', total: 121.80 },
  { month: 'Mar', total: 139.95 },
]

const CATEGORIES = [
  { name: 'Streaming', amount: 41.97, color: '#4f46e5', pct: 30 },
  { name: 'Télécom',   amount: 45.00, color: '#0891b2', pct: 32 },
  { name: 'Musique',   amount: 20.98, color: '#16a34a', pct: 15 },
  { name: 'Cloud',     amount: 10.98, color: '#d97706', pct: 8  },
  { name: 'Logiciel',  amount: 54.99, color: '#9333ea', pct: 39 },
]

const maxTotal = Math.max(...MONTHLY_DATA.map(d => d.total))

export default function RapportsPage() {
  const [period, setPeriod] = useState('6m')

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif" }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ margin:0, fontSize:22, fontWeight:900, color:'#0d1117' }}>📊 Rapports & Analyses</h1>
          <p style={{ margin:'4px 0 0', fontSize:12, color:'#8b949e' }}>Vue détaillée de vos dépenses</p>
        </div>
        <div style={{ display:'flex', gap:4, background:'#f6f8fa', borderRadius:8, padding:3 }}>
          {['3m','6m','1an'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding:'6px 14px', borderRadius:6, border:'none',
              background: period === p ? '#4f46e5' : 'transparent',
              color:      period === p ? '#fff'    : '#57606a',
              fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'Outfit',sans-serif",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Total ce mois',    val:'139,95 €', icon:'💰', color:'#4f46e5', bg:'#eef2ff' },
          { label:'Moyenne mensuelle',val:'125,83 €', icon:'📈', color:'#16a34a', bg:'#f0fdf4' },
          { label:'Abonnements actifs',val:'8',       icon:'📋', color:'#0891b2', bg:'#ecfeff' },
          { label:'Économies packs',  val:'23,50 €',  icon:'🎁', color:'#d97706', bg:'#fffbeb' },
        ].map(k => (
          <div key={k.label} style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:18 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#8b949e', textTransform:'uppercase', letterSpacing:.5 }}>{k.label}</span>
              <div style={{ width:34, height:34, borderRadius:8, background:k.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{k.icon}</div>
            </div>
            <div style={{ fontSize:24, fontWeight:900, color:k.color }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:20, marginBottom:24 }}>

        {/* Graphique barres */}
        <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:24 }}>
          <div style={{ fontSize:13, fontWeight:800, color:'#0d1117', marginBottom:20 }}>📅 Évolution mensuelle</div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:12, height:180 }}>
            {MONTHLY_DATA.map(d => (
              <div key={d.month} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ fontSize:10, fontWeight:700, color:'#4f46e5' }}>{d.total.toFixed(0)}€</div>
                <div style={{
                  width:'100%', borderRadius:'6px 6px 0 0',
                  background:'linear-gradient(180deg,#4f46e5,#7c3aed)',
                  height: `${(d.total / maxTotal) * 140}px`,
                  transition: 'height .3s',
                }}/>
                <div style={{ fontSize:10, color:'#8b949e', fontWeight:600 }}>{d.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:24 }}>
          <div style={{ fontSize:13, fontWeight:800, color:'#0d1117', marginBottom:20 }}>🗂️ Par catégorie</div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {CATEGORIES.map(c => (
              <div key={c.name}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:12, fontWeight:600, color:'#0d1117' }}>{c.name}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:c.color }}>{c.amount.toFixed(2)} €</span>
                </div>
                <div style={{ height:6, background:'#f6f8fa', borderRadius:3, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${c.pct}%`, background:c.color, borderRadius:3, transition:'width .4s' }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top dépenses */}
      <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid #e1e4e8', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:13, fontWeight:800, color:'#0d1117' }}>🏆 Top dépenses</span>
          <button style={{
            padding:'6px 14px', background:'#f6f8fa', border:'1.5px solid #e1e4e8',
            borderRadius:7, fontSize:11, fontWeight:700, cursor:'pointer', color:'#57606a',
            fontFamily:"'Outfit',sans-serif",
          }}>📥 Exporter PDF</button>
        </div>
        {[
          { rank:1, name:'Adobe Creative', cat:'Logiciel',  amount:54.99, pct:39, color:'#9333ea' },
          { rank:2, name:'Proximus',        cat:'Télécom',   amount:45.00, pct:32, color:'#0891b2' },
          { rank:3, name:'Netflix',         cat:'Streaming', amount:17.99, pct:13, color:'#4f46e5' },
          { rank:4, name:'Apple Music',     cat:'Musique',   amount:10.99, pct:8,  color:'#16a34a' },
          { rank:5, name:'Disney+',         cat:'Streaming', amount:8.99,  pct:6,  color:'#d97706' },
        ].map(item => (
          <div key={item.rank} style={{ padding:'12px 20px', borderBottom:'1px solid #f6f8fa', display:'flex', alignItems:'center', gap:14 }}>
            <div style={{
              width:28, height:28, borderRadius:'50%', background:'#f6f8fa',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:12, fontWeight:800, color:item.color, flexShrink:0,
            }}>#{item.rank}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#0d1117' }}>{item.name}</span>
                <span style={{ fontSize:13, fontWeight:800, color:item.color }}>{item.amount.toFixed(2)} €</span>
              </div>
              <div style={{ height:4, background:'#f6f8fa', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${item.pct}%`, background:item.color, borderRadius:2 }}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
