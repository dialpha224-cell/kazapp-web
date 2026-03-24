-- KAZAPP — Seed de base de données
-- Insertion des données initiales pour développement & tests

BEGIN;

-- ══════════════════════════════════════════════════════════════════════════════════════
-- 1. UTILISATEURS (authentification Supabase)
-- ══════════════════════════════════════════════════════════════════════════════════════

-- Les utilisateurs sont créés via Supabase Auth, cette table est générée automatiquement

-- ══════════════════════════════════════════════════════════════════════════════════════
-- 2. PROFILS UTILISATEURS
-- ══════════════════════════════════════════════════════════════════════════════════════

INSERT INTO public.profiles (id, email, full_name, avatar_url, app_role, plan, status, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@kazapp.be', 'Admin KaZAPP', NULL, 'admin', 'premium', 'active', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'user@kazapp.be', 'John User', NULL, 'user', 'essentiel', 'active', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'family@kazapp.be', 'Family User', NULL, 'user', 'famille', 'active', NOW())
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════════════════════════
-- 3. SERVICES / PRODUITS STRIPE
-- ══════════════════════════════════════════════════════════════════════════════════════

INSERT INTO public.services (id, name, category, stripe_product_id, description, logo_url, website, created_at)
VALUES
  ('svc-001', 'Netflix', 'streaming', 'prod_netflix', 'Streaming vidéo', 'https://logo.clearbit.com/netflix.com', 'netflix.com', NOW()),
  ('svc-002', 'Spotify', 'music', 'prod_spotify', 'Streaming musical', 'https://logo.clearbit.com/spotify.com', 'spotify.com', NOW()),
  ('svc-003', 'Adobe Creative Cloud', 'creative', 'prod_adobe', 'Suite créative', 'https://logo.clearbit.com/adobe.com', 'adobe.com', NOW()),
  ('svc-004', 'Microsoft 365', 'office', 'prod_microsoft', 'Suite bureautique', 'https://logo.clearbit.com/microsoft.com', 'microsoft.com', NOW()),
  ('svc-005', 'AWS', 'cloud', 'prod_aws', 'Hébergement cloud', 'https://logo.clearbit.com/aws.amazon.com', 'aws.amazon.com', NOW())
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════════════════════════
-- 4. ABONNEMENTS (User subscriptions)
-- ══════════════════════════════════════════════════════════════════════════════════════

INSERT INTO public.subscriptions (id, user_id, service_id, stripe_subscription_id, price, currency, billing_cycle, renewal_date, notes, status, created_at)
VALUES
  ('sub-001', '22222222-2222-2222-2222-222222222222', 'svc-001', 'sub_netflix_001', 15.99, 'EUR', 'monthly', NOW() + interval '30 days', 'Standard HD', 'active', NOW()),
  ('sub-002', '22222222-2222-2222-2222-222222222222', 'svc-002', 'sub_spotify_001', 9.99, 'EUR', 'monthly', NOW() + interval '30 days', 'Premium', 'active', NOW()),
  ('sub-003', '33333333-3333-3333-3333-333333333333', 'svc-003', 'sub_adobe_001', 59.99, 'EUR', 'monthly', NOW() + interval '30 days', 'All Apps', 'active', NOW())
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════════════════════════
-- 5. ALERTES (Price tracking)
-- ══════════════════════════════════════════════════════════════════════════════════════

INSERT INTO public.alerts (id, user_id, subscription_id, alert_type, threshold, is_active, created_at)
VALUES
  ('alert-001', '22222222-2222-2222-2222-222222222222', 'sub-001', 'price_increase', 20.00, true, NOW()),
  ('alert-002', '22222222-2222-2222-2222-222222222222', 'sub-002', 'renewal_reminder', NULL, true, NOW())
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════════════════════════
-- 6. INVITATIONS (Family/Team invitations)
-- ══════════════════════════════════════════════════════════════════════════════════════

INSERT INTO public.invitations (id, sender_id, email, role, status, created_at, expires_at)
VALUES
  ('inv-001', '33333333-3333-3333-3333-333333333333', 'familymember@example.com', 'member', 'pending', NOW(), NOW() + interval '7 days')
ON CONFLICT (id) DO NOTHING;

COMMIT;
