/**
 * Patches all seed-*.mjs scripts in this directory to replace the deprecated
 * source.unsplash.com image URL with loremflickr.com.
 *
 * Run: node scripts/fix-upload-urls.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));

const files = [
  "seed-plumbing-b1.mjs",
  "seed-plumbing-b2.mjs",
  "seed-plumbing-b3.mjs",
  "seed-plumbing-b4.mjs",
  "seed-elec-b1.mjs",
  "seed-elec-b2.mjs",
  "seed-elec-b3.mjs",
  "seed-const-b1.mjs",
  "seed-const-b2.mjs",
  "seed-const-b3.mjs",
  "seed-const-b4.mjs",
  "seed-content-gas-misc.mjs",
];

// Replacement patterns — order matters (more specific first)
const replacements = [
  // Pattern: encodeURIComponent(keyword) with ,professional suffix
  {
    from: /`https:\/\/source\.unsplash\.com\/featured\/1200x800\/\?\$\{encodeURIComponent\(keyword\)\},professional`/g,
    to:   "`https://loremflickr.com/1200/800/${encodeURIComponent(keyword.split(' ').slice(0,3).join(','))}/all`",
  },
  // Pattern: encodeURIComponent(kw) — multi-line or inline, any surrounding chars
  {
    from: /`https:\/\/source\.unsplash\.com\/featured\/1200x800\/\?\$\{encodeURIComponent\(kw\)\}`/g,
    to:   "`https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`",
  },
];

// seed-elec-b1.mjs uses a slightly different inline pattern without a `url` variable
const elecB1Replacement = {
  from: /`https:\/\/source\.unsplash\.com\/featured\/1200x800\/\?\$\{encodeURIComponent\(kw\)\}`/g,
  to:   "`https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`",
};

let total = 0;

for (const f of files) {
  const path = join(__dir, f);
  let src = readFileSync(path, "utf8");
  let changed = false;

  for (const { from, to } of replacements) {
    const next = src.replace(from, to);
    if (next !== src) { src = next; changed = true; }
  }

  if (changed) {
    writeFileSync(path, src, "utf8");
    console.log("✓ patched:", f);
    total++;
  } else {
    // Check if already patched
    if (src.includes("loremflickr.com")) {
      console.log("  already uses loremflickr:", f);
    } else {
      console.warn("⚠️  no match found:", f);
    }
  }
}

console.log(`\nDone — ${total} file(s) patched.`);
