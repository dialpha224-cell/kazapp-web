'use client'
// ═══════════════════════════════════════════════════════
//  KAZAPP — Admin : Journal d'audit (Audit Logs)
//  Route : /admin/audit   Priorité : 🟡 P3
// ═══════════════════════════════════════════════════════
import { useState } from 'react'
import Link from 'next/link'

const ACTION_STYLE: Record<string, { color: string; bg: string }> = {
  login:          { color:'#4ade80', bg:'rgba(74,222,128,.12)'    },
  logout:         { color:'#94a3b8', bg:'rgba(148,163,184,.1)'    },
  register:       { color:'#a5b4fc', bg:'rgba(99,102,241,.15)'    },
  subscribe:      { color:'#f59e0b', bg:'rgba(245,158,11,.12)'    },
  cancel:         { color:'#f87171', bg:'rgba(248,113,113,.12)'   },
  payment:        { color:'#4ade80', bg:'rgba(74,222,128,.12)'    },
  payment_failed: { color:'#f87171', bg:'rgba(248,113,113,.12)'   },
  admin_action:   { color:'#67e8f9', bg:'rgba(103,232,249,.1)'    },
  password_change:{ color:'#fbbf24', bg:'rgba(251,191,36,.1)'     },
  suspend:        { color:'#f97316', bg:'rgba(249,115,22,.1)'     },
}

const DEMO_LOGS = [
  { id:1, created_at:'19/03/2026 01:37:13', action:'login', actor:'Système', role:'superadmin' },
]

export default function AdminAuditPage() {
  return <div>Admin Audit Page</div>
}
