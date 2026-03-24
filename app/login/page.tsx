'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        setMessage('Connexion réussie! Redirection en cours...')
        setTimeout(() => router.push('/app/shop'), 1500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setMessage('Lien de connexion envoyé! Vérifiez votre email.')
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi du lien')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">KaZAPP</h1>
          <p className="text-gray-400">Gérez vos abonnements facilement</p>
        </div>

        <div className="bg-[#161b22] border border-gray-700 rounded-lg p-8 space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-900/20 border border-green-700 text-green-300 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="vous@exemple.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#161b22] text-gray-400">Ou</span>
            </div>
          </div>

          <button
            onClick={handleMagicLink}
            disabled={loading || !email}
            className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {loading ? 'Envoi en cours...' : 'Lien de connexion magique'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Pas encore inscrit?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
