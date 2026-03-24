'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const REVENUE_DATA = [
  { month: 'Jan', mrr: 1200, churn: 2, ltv: 450 },
  { month: 'Feb', mrr: 1450, churn: 1, ltv: 520 },
  { month: 'Mar', mrr: 1850, churn: 0, ltv: 680 },
  { month: 'Apr', mrr: 2340, churn: 1, ltv: 780 },
  { month: 'May', mrr: 2890, churn: 2, ltv: 920 },
]

export default function AdminRevenueePage() {
  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', padding: '28px 32px', color: '#F8FAFC', fontFamily: "'DM Sans',sans-serif" }}>
      <Link href="/admin/sa" style={{ fontSize: 12, color: '#475569', textDecoration: 'none' }}>← Super Admin</Link>
      <h1 style={{ fontSize: 22, fontWeight: 900, margin: '12px 0' }}>💰 Revenus Globaux</h1>
      <div style={{ marginTop: 30 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 12, fontWeight: 700, color: '#64748b' }}>Mois</th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 12, fontWeight: 700, color: '#64748b' }}>MRR</th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 12, fontWeight: 700, color: '#64748b' }}>Churn</th>
              <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 12, fontWeight: 700, color: '#64748b' }}>LTV</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_DATA.map(r => (
              <tr key={r.month}>
                <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{r.month}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{r.mrr}€</td>
                <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{r.churn}%</td>
                <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{r.ltv}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
