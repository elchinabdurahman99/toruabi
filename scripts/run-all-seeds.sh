#!/usr/bin/env bash
# =============================================================================
# scripts/run-all-seeds.sh
#
# Runs the current SEO seed scripts in order:
#   1. patch-ajsan.mjs          — remove "Ajsan/Ajsan EE" from service titles
#   2. patch-service-seo.mjs    — set metaTitle (≤48c), metaDescription, image.alt
#                                 for all 76 services (FORCE=1 overwrites)
#   3. seed-service-content.mjs — 500+ word body content for top 4 services
#   4. seed-work-projects.mjs   — EN/ET/RU translations for 8 work projects
#
# PREREQUISITES:
#   .env.local must contain:
#     NEXT_PUBLIC_SANITY_PROJECT_ID=...
#     NEXT_PUBLIC_SANITY_DATASET=production
#     SANITY_API_WRITE_TOKEN=...   (Editor token: sanity.io/manage → API → Tokens)
#
# USAGE:
#   chmod +x scripts/run-all-seeds.sh
#   ./scripts/run-all-seeds.sh
# =============================================================================

set -euo pipefail

# Load .env.local
if [ -f ".env.local" ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Resolve token (accept either name)
TOKEN="${SANITY_API_WRITE_TOKEN:-${SANITY_API_TOKEN:-}}"
if [ -z "$TOKEN" ]; then
  echo "❌  Set SANITY_API_WRITE_TOKEN in .env.local"
  echo "    Get it: sanity.io/manage → your project → API → Tokens → Add (Editor)"
  exit 1
fi
export SANITY_API_WRITE_TOKEN="$TOKEN"
export SANITY_API_TOKEN="$TOKEN"

: "${NEXT_PUBLIC_SANITY_PROJECT_ID:?❌ NEXT_PUBLIC_SANITY_PROJECT_ID not set in .env.local}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TorudeAbi24 — SEO Seed Run"
echo "  Project : $NEXT_PUBLIC_SANITY_PROJECT_ID"
echo "  Dataset : ${NEXT_PUBLIC_SANITY_DATASET:-production}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

S="scripts"

run() {
  echo ""
  echo "▶  $1"
  node --env-file=.env.local "$S/$1"
  echo "✅  $1 complete"
}

# 1 — Strip Ajsan from service metaTitles
run patch-ajsan.mjs

# 2 — Apply optimised metaTitle / metaDescription / image.alt to all services
FORCE=1 node --env-file=.env.local "$S/patch-service-seo.mjs"
echo "✅  patch-service-seo.mjs complete"

# 3 — 500+ word body content for top 4 services (plumber, electrician, bathroom, gas)
run seed-service-content.mjs

# 4 — Work project EN/ET/RU translations
run seed-work-projects.mjs

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅  ALL DONE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  npm run build        → verify no errors"
echo "  deploy to production"
echo "  Google Search Console → URL Inspection → Request Indexing"
echo ""
