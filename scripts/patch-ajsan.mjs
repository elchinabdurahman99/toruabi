/**
 * scripts/patch-ajsan.mjs
 *
 * Removes "Ajsan" / "Ajsan EE" from all service metaTitle fields in Sanity.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=<write-token> \
 *   node scripts/patch-ajsan.mjs
 *
 * Get a write token from:
 *   https://www.sanity.io/manage → your project → API → Tokens → Add API token (Editor)
 */

import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error(
    "❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID env var (found in sanity.config.ts)"
  );
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  Set SANITY_API_TOKEN env var — needs Editor (write) access.\n" +
      "    Create one at https://www.sanity.io/manage → API → Tokens"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/** Strip "| Ajsan EE" and "| Ajsan" patterns, then clean trailing pipes. */
function cleanTitle(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/\s*\|\s*Ajsan EE\s*/gi, "")
    .replace(/\s*\|\s*Ajsan\s*/gi, "")
    .replace(/\bAjsan EE\b/gi, "TorudeAbi24")
    .replace(/\bAjsan\b/gi, "TorudeAbi24")
    .trim()
    .replace(/\s*\|\s*$/, "")
    .trim();
}

async function main() {
  console.log(`🔍  Querying Sanity project "${projectId}" / dataset "${dataset}"…\n`);

  const services = await client.fetch(
    `*[_type == "service" && defined(metaTitle)]{ _id, "title": title.en, metaTitle }`
  );

  console.log(`Found ${services.length} service(s) with a metaTitle field.\n`);

  let patchCount = 0;

  for (const svc of services) {
    const { _id, title, metaTitle } = svc;
    const patch = {};
    let dirty = false;

    for (const lang of ["en", "et", "ru"]) {
      const original = metaTitle?.[lang];
      if (!original) continue;
      const cleaned = cleanTitle(original);
      if (cleaned !== original) {
        patch[`metaTitle.${lang}`] = cleaned;
        dirty = true;
      }
    }

    if (dirty) {
      await client.patch(_id).set(patch).commit();
      console.log(`✅  Patched "${title}" (${_id})`);
      for (const [key, val] of Object.entries(patch)) {
        console.log(`    ${key}: "${val}"`);
      }
      patchCount++;
    }
  }

  console.log(`\n✨  Done. Patched ${patchCount} / ${services.length} service(s).`);

  if (patchCount === 0) {
    console.log(
      '    No "Ajsan" strings found — either already cleaned or metaTitles are set differently.'
    );
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
