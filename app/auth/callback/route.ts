import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// ── GET — Auth callback (magic link / OAuth) ────────────────
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code        = requestUrl.searchParams.get('code')
  const next        = requestUrl.searchParams.get('next') ?? '/app/shop'
  const error       = requestUrl.searchParams.get('error')
  const errorDesc   = requestUrl.searchParams.get('error_description')

  // Handle OAuth/magic link errors
  if (error) {
    console.error('Auth callback error:', error, errorDesc)
    const loginUrl = new URL('/login', requestUrl.origin)
    loginUrl.searchParams.set('error', errorDesc ?? error)
    return NextResponse.redirect(loginUrl)
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      const loginUrl = new URL('/login', requestUrl.origin)
      loginUrl.searchParams.set('error', 'Lien expiré. Demandez un nouveau lien.')
      return NextResponse.redirect(loginUrl)
    }

    if (data.user) {
      // Role-based redirect after magic link login
      const role = data.user.user_metadata?.app_role as string | undefined

      if (role === 'superadmin' || role === 'admin' || role === 'agent') {
        return NextResponse.redirect(new URL('/admin', requestUrl.origin))
      }

      return NextResponse.redirect(new URL(next, requestUrl.origin))
    }
  }

  // Fallback
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
