/**
 * Next.js `output: "standalone"` does not copy `.next/static` or `public` into `.next/standalone`.
 * Docker / self-hosted runs need them next to the server bundle.
 *
 * Run automatically after `next build` via package.json `postbuild`.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const standalone = join(root, ".next", "standalone");
const nextDir = join(standalone, ".next");

if (!existsSync(standalone)) {
  console.warn("[prepare-standalone] .next/standalone missing — skip (not a standalone build?)");
  process.exit(0);
}

mkdirSync(nextDir, { recursive: true });

const staticSrc = join(root, ".next", "static");
const staticDest = join(nextDir, "static");
if (existsSync(staticSrc)) {
  cpSync(staticSrc, staticDest, { recursive: true, force: true });
  console.log("[prepare-standalone] .next/static → .next/standalone/.next/static");
} else {
  console.warn("[prepare-standalone] .next/static missing — skipped");
}

const publicSrc = join(root, "public");
const publicDest = join(standalone, "public");
if (existsSync(publicSrc)) {
  cpSync(publicSrc, publicDest, { recursive: true, force: true });
  console.log("[prepare-standalone] public → .next/standalone/public");
} else {
  console.warn("[prepare-standalone] public/ missing — skipped");
}
