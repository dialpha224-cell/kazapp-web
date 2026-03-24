// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
//  KAZAPP — Service Worker pour PWA
//  Cache & stratégies offline
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

const CACHE_NAME = 'kazapp-v1'
const ASSET_CACHE = 'kazapp-assets-v1'
const API_CACHE = 'kazapp-api-v1'

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
]

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
      self.skipWaiting(),
    ])
  )
})

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (![CACHE_NAME, ASSET_CACHE, API_CACHE].includes(name)) {
            return caches.delete(name)
          }
        })
      )
    )
  )
})

// Fetch strategy: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignore non-GET requests
  if (request.method !== 'GET') return

  // API requests: Network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    return event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            caches.open(API_CACHE).then(cache => cache.put(request, response.clone()))
          }
          return response
        })
        .catch(() => caches.match(request))
    )
  }

  // Assets: Cache first, network fallback
  event.respondWith(
    caches.match(request).then(response => {
      if (response) return response
      return fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && request.method === 'GET') {
            caches.open(ASSET_CACHE).then(cache => cache.put(request, networkResponse.clone()))
          }
          return networkResponse
        })
        .catch(() => caches.match('/offline.html'))
    })
  )
})

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions())
  }
})

async function syncTransactions() {
  try {
    const cache = await caches.open(API_CACHE)
    const requests = await cache.keys()
    // Queue pending requests for retry
  } catch (error) {
    console.error('Sync failed:', error)
  }
}
