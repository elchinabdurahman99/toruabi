/**
 * Scans ALL Sanity documents across ALL types,
 * finds every string field containing "Ajsan" (case-insensitive),
 * and replaces it with "TorudeAbi24".
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xbk57s09",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const AJSAN_RE = /Ajsan(\s*EE)?/gi;
const REPLACEMENT = "TorudeAbi24";

// Recursively walk a value and replace all Ajsan strings
function replaceInValue(val) {
  if (typeof val === "string") {
    if (AJSAN_RE.test(val)) {
      AJSAN_RE.lastIndex = 0;
      return { changed: true, value: val.replace(AJSAN_RE, REPLACEMENT) };
    }
    AJSAN_RE.lastIndex = 0;
    return { changed: false, value: val };
  }
  if (Array.isArray(val)) {
    let changed = false;
    const value = val.map((item) => {
      const r = replaceInValue(item);
      if (r.changed) changed = true;
      return r.value;
    });
    return { changed, value };
  }
  if (val && typeof val === "object") {
    let changed = false;
    const value = {};
    for (const [k, v] of Object.entries(val)) {
      // skip Sanity internal fields
      if (k.startsWith("_")) { value[k] = v; continue; }
      const r = replaceInValue(v);
      if (r.changed) changed = true;
      value[k] = r.value;
    }
    return { changed, value };
  }
  return { changed: false, value: val };
}

async function main() {
  console.log("🔍 Fetching all documents from Sanity...\n");

  // Fetch every document (excluding system types)
  const docs = await client.fetch(
    `*[!(_type match "system.*") && !(_type match "sanity.*")] {
      ...,
    }`,
    {},
    { perspective: "raw" }
  );

  console.log(`📄 Total documents: ${docs.length}\n`);

  let totalPatched = 0;
  const transaction = client.transaction();
  const report = [];

  for (const doc of docs) {
    const { changed, value: patched } = replaceInValue(doc);
    if (!changed) continue;

    // Collect field diffs for reporting
    const fields = [];
    function diffFields(original, updated, path = "") {
      if (typeof original === "string" && original !== updated) {
        fields.push(`  ${path}: "${original}" → "${updated}"`);
      } else if (Array.isArray(original)) {
        original.forEach((_, i) => diffFields(original[i], updated[i], `${path}[${i}]`));
      } else if (original && typeof original === "object") {
        for (const k of Object.keys(original)) {
          if (!k.startsWith("_")) diffFields(original[k], updated[k], path ? `${path}.${k}` : k);
        }
      }
    }
    diffFields(doc, patched);

    report.push({ id: doc._id, type: doc._type, fields });
    transaction.createOrReplace(patched);
    totalPatched++;
  }

  if (totalPatched === 0) {
    console.log('✅ No "Ajsan" found in any document. Nothing to patch.');
    return;
  }

  // Print report
  console.log(`\n⚠️  Found "Ajsan" in ${totalPatched} document(s):\n`);
  for (const { id, type, fields } of report) {
    console.log(`  [${type}] ${id}`);
    fields.forEach((f) => console.log(f));
    console.log();
  }

  console.log("🔧 Committing patches...");
  await transaction.commit();
  console.log(`\n✅ Done. Replaced "Ajsan" → "TorudeAbi24" in ${totalPatched} document(s).`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
