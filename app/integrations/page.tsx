'use client'
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// INTEGRATIONS PAGE
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Intégrations | KaZAPP',
  description: 'Connectez vos services préférés à KaZAPP',
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Intégrations</h1>
            <p className="text-xl text-gray-400">Connectez vos services favoris à KaZAPP</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Stripe Integration */}
            <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-colors">
              <div className="mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-2xl">💳</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Stripe</h3>
              <p className="text-gray-400 mb-4">Gestion des paiements et abonnements</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full">
                Connecter
              </button>
            </div>

            {/* Slack Integration */}
            <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-colors">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl">💬</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Slack</h3>
              <p className="text-gray-400 mb-4">Notifications des changements d'abonnements</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full">
                Connecter
              </button>
            </div>

            {/* Email Integration */}
            <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-colors">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-2xl">📧</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400 mb-4">Rapports hebdomadaires par email</p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full">
                Connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
