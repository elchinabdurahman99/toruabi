/**
 * scripts/prepare-standalone.mjs
 *
 * Runs automatically after `npm run build` (postbuild hook).
 *
 * Next.js `output: "standalone"` creates a minimal server at
 * `.next/standalone/server.js` but does NOT copy static assets.
 * Without this step the server starts but returns 404 for all
 * CSS / JS / image files — nothing loads in the browser.
 *
 * This script copies:
 *   .next/static/  →  .next/standalone/.next/static/
 *   public/        →  .next/standalone/public/
 */

import { cpSync, existsSync } from "fs";
import { join } from "path";

const root       = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.log("⚠️  .next/standalone not found — skipping (not a standalone build?)");
  process.exit(0);
}

// 1. Copy Next.js static chunks (JS, CSS, source maps, images)
const nextStatic    = join(root, ".next", "static");
const standaloneStatic = join(standalone, ".next", "static");
cpSync(nextStatic, standaloneStatic, { recursive: true });
console.log("✅  Copied .next/static → .next/standalone/.next/static");

// 2. Copy public folder (favicon, robots.txt, llms.txt, og-image, etc.)
const publicDir         = join(root, "public");
const standalonePublic  = join(standalone, "public");
cpSync(publicDir, standalonePublic, { recursive: true });
console.log("✅  Copied public/ → .next/standalone/public/");

console.log("\n✨  Standalone build ready.");
console.log("    Start with: node .next/standalone/server.js");
console.log("    Or via PM2: pm2 start ecosystem.config.cjs --update-env\n");
