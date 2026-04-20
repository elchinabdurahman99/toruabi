/**
 * Decodes and NFC-normalizes URL `[slug]` params so GROQ matches Sanity strings
 * (Cyrillic, Estonian letters, encoded ü/õ etc.).
 */
export function normalizeUrlSlugParam(slug: string): string {
  if (slug == null || typeof slug !== "string") return slug;
  let s = slug;
  try {
    s = decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    /* already decoded */
  }
  return s
    .normalize("NFC")
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .trim();
}
