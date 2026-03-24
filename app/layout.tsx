import type { Metadata, Viewport } from 'next'
import { Outfit, DM_Sans, Syne } from 'next/font/google'

// ── Fonts ──────────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

// ── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'KaZAPP — Gérez vos abonnements',
    template: '%s | KaZAPP',
  },
  description:
    'Centralisez et maîtrisez tous vos abonnements en un seul endroit. Paiement en 1 clic, rapports intelligents, conforme RGPD.',
  keywords: ['abonnements', 'gestion', 'streaming', 'belgique', 'RGPD', 'fintech'],
  authors: [{ name: 'KaZAPP', url: 'https://kazapp.be' }],
  creator: 'KaZAPP',
  publisher: 'KaZAPP',
  manifest: '/manifest.json',
  metadataBase: new URL('https://kazapp.be'),
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: 'https://kazapp.be',
    siteName: 'KaZAPP',
    title: 'KaZAPP — Gérez vos abonnements',
    description: 'Centralisez tous vos abonnements. Paiement 1 clic. 100% RGPD.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'KaZAPP' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KaZAPP — Gérez vos abonnements',
    description: 'Centralisez tous vos abonnements. Paiement 1 clic. 100% RGPD.',
    images: ['/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KaZAPP',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4f46e5',
    'msapplication-config': '/browserconfig.xml',
  },
}

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
}

// ── Root Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${dmSans.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* PWA iOS */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KaZAPP" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96x96.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Microsoft */}
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
      </head>
      <body className="bg-[#0d1117] text-white antialiased font-dm-sans min-h-screen">
        {children}
        {/* ── PWA Service Worker Registration ── */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .then(function(reg) {
                  console.log('[KaZAPP] Service Worker enregistré:', reg.scope);
                  // Check for updates every 60s
                  setInterval(() => reg.update(), 60000);
                  // Notify SW to skip waiting on new version
                  reg.addEventListener('updatefound', function() {
                    const newWorker = reg.installing;
                    if (newWorker) {
                      newWorker.addEventListener('statechange', function() {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                          newWorker.postMessage({ type: 'SKIP_WAITING' });
                        }
                      });
                    }
                  });
                })
                .catch(function(err) {
                  console.warn('[KaZAPP] Service Worker échec:', err);
                });
            });
          }
        `}} />
      </body>
    </html>
  )
}
