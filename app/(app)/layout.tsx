'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
        } else {
          setIsAuthenticated(true)
          setUserEmail(user.email || '')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-300">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Navigation Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-[#161b22] border-r border-gray-700 p-4 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-400">KaZAPP</h1>
          <p className="text-xs text-gray-500 mt-1">Gestion d\'abonnements</p>
        </div>

        <div className="space-y-1 mb-8">
          <Link
            href="/app/shop"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">🛍️</span>
            <span>Boutique</span>
          </Link>
          <Link
            href="/app/wallet"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">💳</span>
            <span>Portefeuille</span>
          </Link>
          <Link
            href="/app/vault"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">🔐</span>
            <span>Coffre-fort</span>
          </Link>
          <Link
            href="/app/invoices"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">📄</span>
            <span>Factures</span>
          </Link>
          <Link
            href="/app/rapports"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">📊</span>
            <span>Rapports</span>
          </Link>
          <Link
            href="/app/famille"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">👨‍👩‍👧‍👦</span>
            <span>Famille</span>
          </Link>
          <Link
            href="/app/notifications"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">🔔</span>
            <span>Notifications</span>
          </Link>
          <Link
            href="/app/migration"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">↪️</span>
            <span>Migration</span>
          </Link>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-900/30 text-red-400 transition-colors w-full"
          >
            <span className="text-lg">🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
