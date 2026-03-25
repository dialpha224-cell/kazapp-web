'use client'
// ═══════════════════════════════════════════
//  KAZAPP — Page Migration
//  Fichier : app/(client)/app/migration/page.tsx
// ═══════════════════════════════════════════
import { useState } from 'react'

const OPERATORS = [
  { id:'proximus', name:'Proximus', logo:'📡', color:'#6600CC' },
  { id:'base',     name:'Base/Telenet', logo:'📺', color:'#E30613' },
  { id:'orange',   name:'Orange', logo:'🟠', color:'#FF6600' },
  { id:'voo',      name:'VOO', logo:'📻', color:'#00A86B' },
  { id:'other',    name:'Autre opérateur', logo:'📞', color:'#57606a' },
]

const STEPS = ['Opérateur actuel', 'Vos services', 'Analyse', 'Migration']

export default function MigrationPage() {
  const [step, setStep] = useState(0)
  const [operator, setOperator] = useState('')
  const [services, setServices] = useState<string[]>([])

  const toggleService = (s: string) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", maxWidth:700, margin:'0 auto' }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ margin:0, fontSize:22, fontWeight:900, color:'#0d1117' }}>🔄 Migration d'opérateur</h1>
        <p style={{ margin:'4px 0 0', fontSize:12, color:'#8b949e' }}>Transférez vos abonnements en quelques clics</p>
      </div>

      {/* Stepper */}
      <div style={{ display:'flex', background:'#fff', border:'1px solid #e1e4e8', borderRadius:12, overflow:'hidden', marginBottom:28 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            flex:1, padding:'12px 8px', textAlign:'center',
            fontSize:11, fontWeight:700,
            background: i === step ? '#4f46e5' : i < step ? '#f0fdf4' : '#fff',
            color: i === step ? '#fff' : i < step ? '#16a34a' : '#8b949e',
            borderRight: i < STEPS.length-1 ? '1px solid #e1e4e8' : 'none',
          }}>
            {i < step ? '✓ ' : ''}{i+1}. {s}
          </div>
        ))}
      </div>

      {/* Step 0 : Opérateur */}
      {step === 0 && (
        <div>
          <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:24, marginBottom:16 }}>
            <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:800, color:'#0d1117' }}>Votre opérateur actuel</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10 }}>
              {OPERATORS.map(op => (
                <div key={op.id} onClick={() => setOperator(op.id)} style={{
                  padding:'16px 12px', borderRadius:12, border:'2px solid',
                  borderColor: operator === op.id ? op.color : '#e1e4e8',
                  background:  operator === op.id ? `${op.color}15` : '#fff',
                  cursor:'pointer', textAlign:'center', transition:'all .15s',
                }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{op.logo}</div>
                  <div style={{ fontSize:12, fontWeight:700, color: operator === op.id ? op.color : '#0d1117' }}>{op.name}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => operator && setStep(1)} style={{
            width:'100%', padding:'13px', background: operator ? '#4f46e5' : '#e1e4e8',
            color: operator ? '#fff' : '#8b949e', border:'none', borderRadius:10,
            fontSize:14, fontWeight:700, cursor: operator ? 'pointer' : 'not-allowed',
            fontFamily:"'Outfit',sans-serif",
          }}>Continuer →</button>
        </div>
      )}

      {/* Step 1 : Services */}
      {step === 1 && (
        <div>
          <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:24, marginBottom:16 }}>
            <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:800, color:'#0d1117' }}>Vos services actuels</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {['Internet','TV','Mobile','Fixe','Pack Famille','Sécurité maison'].map(s => (
                <div key={s} onClick={() => toggleService(s)} style={{
                  padding:'12px 16px', borderRadius:10, border:'2px solid',
                  borderColor: services.includes(s) ? '#4f46e5' : '#e1e4e8',
                  background:  services.includes(s) ? '#eef2ff' : '#fff',
                  cursor:'pointer', display:'flex', alignItems:'center', gap:10,
                }}>
                  <div style={{
                    width:18, height:18, borderRadius:4, border:'2px solid',
                    borderColor: services.includes(s) ? '#4f46e5' : '#e1e4e8',
                    background:  services.includes(s) ? '#4f46e5' : '#fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, color:'#fff', flexShrink:0,
                  }}>{services.includes(s) ? '✓' : ''}</div>
                  <span style={{ fontSize:13, fontWeight:600, color: services.includes(s) ? '#4f46e5' : '#0d1117' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(0)} style={{ padding:'12px 20px', background:'#f6f8fa', border:'1.5px solid #e1e4e8', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:"'Outfit',sans-serif", color:'#57606a' }}>← Retour</button>
            <button onClick={() => services.length > 0 && setStep(2)} style={{
              flex:1, padding:'12px', background: services.length > 0 ? '#4f46e5' : '#e1e4e8',
              color: services.length > 0 ? '#fff' : '#8b949e', border:'none', borderRadius:10,
              fontSize:14, fontWeight:700, cursor: services.length > 0 ? 'pointer' : 'not-allowed',
              fontFamily:"'Outfit',sans-serif",
            }}>Analyser mes économies →</button>
          </div>
        </div>
      )}

      {/* Step 2 : Analyse */}
      {step === 2 && (
        <div>
          <div style={{ background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'1.5px solid #bbf7d0', borderRadius:14, padding:24, marginBottom:16, textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🎉</div>
            <h3 style={{ margin:'0 0 8px', fontSize:18, fontWeight:900, color:'#16a34a' }}>Économies potentielles : 23,50 €/mois</h3>
            <p style={{ margin:0, fontSize:13, color:'#15803d' }}>Soit 282 € par an en passant par Kazapp !</p>
          </div>
          <div style={{ background:'#fff', border:'1.5px solid #e1e4e8', borderRadius:14, padding:20, marginBottom:16 }}>
            <h4 style={{ margin:'0 0 14px', fontSize:14, fontWeight:800, color:'#0d1117' }}>Récapitulatif</h4>
            {services.map(s => (
              <div key={s} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f6f8fa' }}>
                <span style={{ fontSize:12, color:'#0d1117', fontWeight:600 }}>{s}</span>
                <span style={{ fontSize:12, color:'#16a34a', fontWeight:700 }}>Inclus dans Kazapp</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(1)} style={{ padding:'12px 20px', background:'#f6f8fa', border:'1.5px solid #e1e4e8', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:"'Outfit',sans-serif", color:'#57606a' }}>← Retour</button>
            <button onClick={() => setStep(3)} style={{ flex:1, padding:'12px', background:'#16a34a', color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Outfit',sans-serif" }}>🚀 Lancer la migration →</button>
          </div>
        </div>
      )}

      {/* Step 3 : Confirmation */}
      {step === 3 && (
        <div style={{ textAlign:'center', padding:'40px 20px' }}>
          <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'#0d1117', margin:'0 0 12px' }}>Migration lancée !</h2>
          <p style={{ fontSize:14, color:'#57606a', maxWidth:400, margin:'0 auto 24px' }}>
            Notre équipe prend en charge la résiliation de vos anciens contrats et l'activation de vos nouveaux services sous 48h.
          </p>
          <button onClick={() => setStep(0)} style={{ padding:'12px 28px', background:'#4f46e5', color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Outfit',sans-serif" }}>
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  )
}
