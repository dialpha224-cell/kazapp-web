'use client'
// ═════════════════════════════════════════
//  KAZAPP — Page Migration d'opérateur
//  Route : /app/migration
// ═════════════════════════════════════════
import { useState } from 'react'

const OPERATORS = [
  { id:'proximus', name:'Proximus',        logo:'📡', color:'#a78bfa' },
  { id:'base',     name:'Base / Telenet',  logo:'📺', color:'#f87171' },
  { id:'orange',   name:'Orange',          logo:'🟠', color:'#fb923c' },
  { id:'voo',      name:'VOO',             logo:'📻', color:'#34d399' },
  { id:'other',    name:'Autre',           logo:'📞', color:'#94a3b8' },
]

const SERVICES_LIST = ['Internet','TV','Mobile','Téléphone fixe','Pack Famille','Sécurité maison']

const STEPS = ['Opérateur actuel', 'Vos services', 'Analyse', 'Migration']

// ── Styles partagés (dark theme) ──────────────────────────────
const S = {
  card:  { background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:24 },
  btn:   { border:'none', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", padding:'12px 20px', transition:'all .15s' } as React.CSSProperties,
  label: { fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase' as const, letterSpacing:.5 },
}

export default function MigrationPage() {
  const [step,     setStep]     = useState(0)
  const [operator, setOperator] = useState('')
  const [services, setServices] = useState<string[]>([])

  const toggle = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const opData = OPERATORS.find(o => o.id === operator)

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", color:'#F8FAFC', maxWidth:720, margin:'0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ margin:'0 0 4px', fontSize:24, fontWeight:900, fontFamily:"'Syne',sans-serif", letterSpacing:-.5 }}>
          🔄 Migration d'opérateur
        </h1>
        <p style={{ margin:'0 0 16px', color:'#cbd5e1', fontSize:14 }}>
          Changez d'opérateur en toute sérénité
        </p>
      </div>

      {/* Progress */}
      <div style={{ display:'flex', gap:12, marginBottom:32 }}>
        {STEPS.map((t, i) => (
          <div key={i} style={{
            flex:1, height:4, background: i <= step ? '#4f46e5' : '#334155',
            borderRadius:2, transition:'all .3s'
          }} />
        ))}
      </div>

      {/* STEP 0: Choose current operator */}
      {step === 0 && (
        <div style={S.card as React.CSSProperties}>
          <div style={{ ...S.label, marginBottom:16 }}>Votre opérateur actuel</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {OPERATORS.map(op => (
              <button
                key={op.id}
                onClick={() => { setOperator(op.id); setStep(1) }}
                style={{
                  ...S.btn,
                  background: operator === op.id ? '#4f46e5' : 'rgba(255,255,255,.06)',
                  color: '#fff',
                  border: `2px solid ${operator === op.id ? op.color : 'transparent'}`,
                  padding:'16px 12px',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                }}
              >
                <div style={{ fontSize:28 }}>{op.logo}</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{op.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Select services */}
      {step === 1 && (
        <div style={S.card as React.CSSProperties}>
          <div style={{ ...S.label, marginBottom:16 }}>Vos services actuels</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
            {SERVICES_LIST.map(svc => (
              <label key={svc} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                <input
                  type="checkbox"
                  checked={services.includes(svc)}
                  onChange={() => toggle(svc)}
                  style={{ width:20, height:20, cursor:'pointer' }}
                />
                <span style={{ color:'#cbd5e1' }}>{svc}</span>
              </label>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={() => setStep(0)} style={{{ ...S.btn, background:'rgba(255,255,255,.1)', color:'#cbd5e1', flex:1 }}}>
              Retour
            </button>
            <button onClick={() => setStep(2)} style={{{ ...S.btn, background:'#4f46e5', color:'#fff', flex:1 }}}>
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Analysis */}
      {step === 2 && (
        <div style={S.card as React.CSSProperties}>
          <div style={{ fontSize:28, marginBottom:12 }}>✅ Analyse complète</div>
          <div style={{ color:'#cbd5e1', marginBottom:20 }}>
            <p>Opérateur: <strong>{opData?.name}</strong></p>
            <p>Services: <strong>{services.join(', ')}</strong></p>
            <p style={{ marginTop:12, color:'#94a3b8' }}>Nos experts vont préparer votre dossier de migration.</p>
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={() => setStep(1)} style={{{ ...S.btn, background:'rgba(255,255,255,.1)', color:'#cbd5e1', flex:1 }}}>
              Retour
            </button>
            <button onClick={() => setStep(3)} style={{{ ...S.btn, background:'#22c55e', color:'#fff', flex:1 }}}>
              Commencer migration
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Migration Process */}
      {step === 3 && (
        <div style={S.card as React.CSSProperties}>
          <div style={{ fontSize:28, marginBottom:12 }}>🚀 Migration en cours</div>
          <div style={{ color:'#cbd5e1', marginBottom:20 }}>
            <p style={{ marginBottom:12 }}>Votre dossier est en cours de traitement:</p>
            <ul style={{ paddingLeft:20, color:'#94a3b8' }}>
              <li>Pré-validation auprès de {opData?.name}</li>
              <li>Résiliation de votre contrat actuel</li>
              <li>Activation chez votre nouvel opérateur</li>
              <li>Suivi personnalisé jusqu'à la fin</li>
            </ul>
          </div>
          <button onClick={() => { setStep(0); setOperator(''); setServices([]) }} style={{{ ...S.btn, background:'#4f46e5', color:'#fff', width:'100%' }}}>
            Nouvelle migration
          </button>
        </div>
      )}
    </div>
  )
}
