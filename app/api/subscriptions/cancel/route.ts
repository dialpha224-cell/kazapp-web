import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// ── POST — Cancel subscription ──────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { subscriptionId } = body

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'subscriptionId required' },
        { status: 400 }
      )
    }

    // Cancel the subscription
    const deletedSubscription = await stripe.subscriptions.del(subscriptionId)

    // Update in Supabase
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'canceled', canceled_at: new Date().toISOString() })
      .eq('stripe_subscription_id', subscriptionId)

    if (error) {
      console.error('Database update error:', error)
      return NextResponse.json(
        { error: 'Failed to update subscription status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      subscription: deletedSubscription,
    })
  } catch (error) {
    console.error('Cancel error:', error)
    return NextResponse.json(
      { error: 'Cancellation failed' },
      { status: 500 }
    )
  }
}
