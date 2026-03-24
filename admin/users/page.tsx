'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false) })
      .catch(e => { console.error(e); setLoading(false) })
  }, [])

  return (
    <div style={{ background: '#060D1A', minHeight: '100vh', padding: '28px 32px', color: '#F8FAFC' }}>
      <Link href="/admin">← Tableau de bord</Link>
      <h1>👥 Utilisateurs</h1>
      {loading ? <div>Chargement...</div> : <table><tbody>{users.map(u => <tr key={u.id}><td>{u.email}</td></tr>)}</tbody></table>}
    </div>
  )
}'
