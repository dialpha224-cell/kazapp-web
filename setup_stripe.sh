#!/bin/bash
# ═══════════════════════════════════════════════════════
#  KAZAPP — Création automatique des produits Stripe
#  Utilisation : ./setup_stripe.sh sk_live_XXXXX
#  (ou sk_test_XXXXX pour les tests)
# ═══════════════════════════════════════════════════════

SK="$1"
if [ -z "$SK" ]; then
  echo "Usage: ./setup_stripe.sh sk_live_XXXXX"
  echo "Obtenir la clé sur: https://dashboard.stripe.com/apikeys"
  exit 1
fi

echo ""
echo "🚀 KaZAPP — Création des produits Stripe"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Plan Essentiel (4,99 €/mois) ─────────────────────
ESS=$(curl -s https://api.stripe.com/v1/products \
  -u "$SK:" \
  -d name="KaZAPP Essentiel" \
  -d description="Gérez jusqu'à 10 abonnements, historique 6 mois, alertes prix" \
  -d "metadata[plan]=essentiel" \
  -d "metadata[app]=kazapp")
ESS_ID=$(echo $ESS | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR:'+d.get('error',{}).get('message','?')))")
echo "✅ KaZAPP Essentiel  — ID: $ESS_ID"

ESS_PRICE=$(curl -s https://api.stripe.com/v1/prices \
  -u "$SK:" \
  -d product="$ESS_ID" \
  -d unit_amount=499 \
  -d currency=eur \
  -d "recurring[interval]=month" \
  -d nickname="Essentiel Mensuel")
ESS_PRICE_ID=$(echo $ESS_PRICE | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR:'+d.get('error',{}).get('message','?')))")
echo "   Prix mensuel 4,99 € — $ESS_PRICE_ID"

# ── Plan Famille (9,99 €/mois) ───────────────────────
FAM=$(curl -s https://api.stripe.com/v1/products \
  -u "$SK:" \
  -d name="KaZAPP Famille" \
  -d description="6 membres · 25 abonnements max · partage familial complet" \
  -d "metadata[plan]=famille" \
  -d "metadata[app]=kazapp")
FAM_ID=$(echo $FAM | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR:'+d.get('error',{}).get('message','?')))")
echo "✅ KaZAPP Famille    — ID: $FAM_ID"

FAM_PRICE=$(curl -s https://api.stripe.com/v1/prices \
  -u "$SK:" \
  -d product="$FAM_ID" \
  -d unit_amount=999 \
  -d currency=eur \
  -d "recurring[interval]=month" \
  -d nickname="Famille Mensuel")
FAM_PRICE_ID=$(echo $FAM_PRICE | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR:'+d.get('error',{}).get('message','?')))")
echo "   Prix mensuel 9,99 € — $FAM_PRICE_ID"

# ── Plan Premium (19,99 €/mois) ──────────────────────
PRE=$(curl -s https://api.stripe.com/v1/products \
  -u "$SK:" \
  -d name="KaZAPP Premium" \
  -d description="Gestion illimitée, historique complet, API d'intégration, support prioritaire" \
  -d "metadata[plan]=premium" \
  -d "metadata[app]=kazapp")
PRE_ID=$(echo $PRE | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR:'+d.get('error',{}).get('message','?')))")
echo "✅ KaZAPP Premium    — ID: $PRE_ID"

PRE_PRICE=$(curl -s https://api.stripe.com/v1/prices \
  -u "$SK:" \
  -d product="$PRE_ID" \
  -d unit_amount=1999 \
  -d currency=eur \
  -d "recurring[interval]=month" \
  -d nickname="Premium Mensuel")
PRE_PRICE_ID=$(echo $PRE_PRICE | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR:'+d.get('error',{}).get('message','?')))")
echo "   Prix mensuel 19,99 € — $PRE_PRICE_ID"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Produits créés avec succès!"
echo ""
echo "Copier ces IDs dans .env.local:"
echo "  NEXT_PUBLIC_STRIPE_ESSENTIAL_PRICE_ID=$ESS_PRICE_ID"
echo "  NEXT_PUBLIC_STRIPE_FAMILLE_PRICE_ID=$FAM_PRICE_ID"
echo "  NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=$PRE_PRICE_ID"
echo ""
