'use client'
// ═══════════════════════════════════════════════════════
//  KAZAPP — Super Admin · Dashboard principal
//  Route : /admin/sa
// ═══════════════════════════════════════════════════════
import Link from 'next/link'

const SA_MODULES = [
  { href: '/admin/sa/roles', icon: '👑', label: 'Gestion des rôles', desc: 'Permissions, super admins, admins locaux, agents', color: '#a78bfa', badge: null },
  { href: '/admin/sa/revenue', icon: '💰', label: 'Revenus globaux', desc: 'MRR multi-pays, commissions, projections', color: '#34d399', badge: 'Live' },
  { href: '/admin/sa/config', icon: '⚙️', label: 'Configuration système', desc: 'Feature flags, limites de plans, paramètres Stripe, sécurité', color: '#818cf8', badge: null },
]

const SYSTEM_HEALTH = [
  { label: 'API Supabase', status: 'ok', icon: '🟢', latency: '18 ms' },
  { label: 'Stripe Webhook', status: 'ok', icon: '🟢', latency: '—' },
  { label: 'Resend Email', status: 'ok', icon: '🟢', latency: '—' },
  { label: 'Edge Functions', status: 'ok', icon: '🟢', latency: '42 ms' },
  { label: 'CDN / Vercel', status: 'ok', icon: '🟢', latency: '22 ms' },
]

const SUPER_ADMINS = [
  { name: 'Kadj (owner)', email: 'kadj@kazapp.be', role: 'Super Admin', active: true },
  { name: 'Alfadjo Diallo', email: 'diallo@kazapp.be', role: 'Admin', active: true },
]

const GLOBAL_STATS = [
  { label: 'Clients totaux', value: '247', delta: '+12%', icon: '👥', color: '#818cf8' },
  { label: 'MRR global', value: '3 420 €', delta: '+8.4%', icon: '💶', color: '#34d399' },
  { label: 'Pays actifs', value: '3', delta: '+1', icon: '🌍', color: '#f59e0b' },
  { label: 'Uptime', value: '99.97%', delta: '↑', icon: '✅', color: '#10b981' },
]

export default function SuperAdminPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900 }}>SA</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#F8FAFC' }}>KaZAPP <span style={{ color: '#6366f1' }}>Super Admin</span></div>
            <div style={{ fontSize: 11, color: '#475569' }}>Accès niveau racine — avec grande puissance...</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 11, background: 'rgba(16,185,129,.12)', color: '#34d399', border: '1px solid rgba(52,211,153,.25)', padding: '4px 12px', borderRadius: 20 }}>🟢 Système opérationnel</span>
          <Link href="/admin" style={{ fontSize: 12, color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>← Dashboard Admin</Link>
        </div>
      </header>

      <main style={{ padding: '32px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
          {GLOBAL_STATS.map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: '18px 16px' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color, letterSpacing: -.5, fontFamily: "'Syne',sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: s.delta.startsWith('+') || s.delta === '↑' ? '#34d399' : '#94a3b8', fontWeight: 700, marginTop: 4 }}>{s.delta}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 12 }}>Modules Super Admin</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SA_MODULES.map(m => (
                <Link key={m.href} href={m.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid ' + m.color + '25', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, transition: 'all .15s', cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: m.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{m.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', marginBottom: 3 }}>
                        {m.label}
                        {m.badge && <span style={{ marginLeft: 8, fontSize: 9, fontWeight: 700, color: m.color, background: m.color + '20', padding: '2px 7px', borderRadius: 20 }}>{m.badge}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#475569' }}>{m.desc}</div>
                    </div>
                    <span style={{ color: '#475569', fontSize: 16, flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 12 }}>Santé du système</div>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, overflow: 'hidden' }}>
              {SYSTEM_HEALTH.map((s, i) => (
                <div key={s.label} style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < SYSTEM_HEALTH.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>{s.icon}</span>
                    <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 600 }}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {s.latency !== '—' && <span style={{ fontSize: 11, color: '#475569' }}>{s.latency}</span>}
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,.1)', padding: '2px 8px', borderRadius: 20 }}>OK</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: .5, margin: '20px 0 12px' }}>Super Admins actifs</div>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, overflow: 'hidden' }}>
              {SUPER_ADMINS.map((a, i) => (
                <div key={a.email} style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < SUPER_ADMINS.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{a.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>{a.email}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', background: 'rgba(167,139,250,.12)', padding: '3px 8px', borderRadius: 20 }}>{a.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(99,102,241,.06)', border: '1px solid rgba(99,102,241,.2)', borderRadius: 16, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', marginBottom: 14 }}>⚡ Actions rapides Super Admin</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Seed démo DB', icon: '🌱', color: '#34d399' },
              { label: 'Vider le cache', icon: '🗑️', color: '#f59e0b' },
              { label: 'Export global CSV', icon: '📥', color: '#60a5fa' },
              { label: 'Déclencher webhook test', icon: '⚡', color: '#a78bfa' },
              { label: 'Activer maintenance', icon: '🔧', color: '#f87171' },
            ].map(a => (
              <button key={a.label} style={{ padding: '8px 16px', background: a.color + '12', border: '1px solid ' + a.color + '30', borderRadius: 9, fontSize: 12, color: a.color, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
