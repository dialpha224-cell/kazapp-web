// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
//  KAZAPP — Middleware d'authentification & autorisation
//  Fichier : middleware.ts (racine du projet)
// ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes publiques (accessibles sans connexion)
const PUBLIC_ROUTES = ['/', '/login', '/register', '/cgu', '/privacy', '/api/webhook']

// Routes admin uniquement
const ADMIN_ROUTES = ['/admin']

// Routes réservées aux rôles élevés
const ADMIN_ROLES = ['admin', 'superadmin', 'agent']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Ignorer les fichiers statiques et API publiques ──
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/api/webhook')
  ) {
    return NextResponse.next()
  }

  // ── Créer la réponse de base ──
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // ── Créer le client Supabase côté serveur ──
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // ── Récupérer la session ──
  const { data: { session } } = await supabase.auth.getSession()

  // ── Routes publiques : toujours accessibles ──
  const isPublic = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
  if (isPublic) {
    // Si connecté sur /login ou /register → rediriger vers l'app
    if (session && (pathname === '/login' || pathname === '/register')) {
      const role = session.user.user_metadata?.app_role || 'user'
      const dest = ADMIN_ROLES.includes(role) ? '/admin' : '/app/shop'
      return NextResponse.redirect(new URL(dest, request.url))
    }
    return response
  }

  // ── Pas de session → rediriger vers /login ──
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── Routes admin : vérifier le rôle ──
  const isAdminRoute = ADMIN_ROUTES.some(r => pathname.startsWith(r))
  if (isAdminRoute) {
    const role = session.user.user_metadata?.app_role || 'user'
    if (!ADMIN_ROLES.includes(role)) {
      // Utilisateur normal → rediriger vers l'app client
      return NextResponse.redirect(new URL('/app/shop', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest).*)',
  ],
}
