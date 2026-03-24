'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState<string | null>(null)
  const [maintenance, setMaintenance] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [rgpd, setRgpd] = useState(true)

  const save = (section: string) => {
    setSaved(section)
    setTimeout(() => setSaved(null), 2000)
  }

  const S = {
    page: { fontFamily: "'DM Sans',sans-serif", background: '#060D1A', minHeight: '100vh', padding: '28px 32px', color: '#F8FAFC' },
    card: { background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: '22px 24px', marginBottom: 16 },
    label: { fontSize: 10, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, textTransform: 'uppercase' as const },
    input: { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '9px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none', fontFamily: "'DM Sans',sans-serif", width: '100%', boxSizing: 'border-box' as const },
    btn: { padding: '9px 20px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", background: 'linear-gradient(135deg,#6366F1,#4f46e5)', color: '#fff' },
  }

  return (
    <div style={S.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <Link href="/admin" style={{ fontSize: 12, color: '#475569', textDecoration: 'none', marginBottom: 6, display: 'block' }}>← Tableau de bord</Link>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: -.5, fontFamily: "'Syne',sans-serif" }}>⚙️ Paramètres de la plateforme</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#475569' }}>Configuration globale de KaZAPP</p>
        </div>
      </div>

      <div style={{ ...S.card, marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Syne',sans-serif", marginBottom: 16 }}>🌐 Général</div>
        <div style={{ marginBottom: 14 }}>
          <label style={S.label}>Maintenance</label>
          <button onClick={() => setMaintenance(!maintenance)} style={{ ...S.btn, background: maintenance ? '#ef4444' : '#6366f1' }}>
            {maintenance ? '⚠️ Activé' : '✅ Désactivé'}
          </button>
        </div>
        <button onClick={() => save('general')} style={{ ...S.btn, marginTop: 14 }}>
          {saved === 'general' ? '✅ Enregistré !' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}
