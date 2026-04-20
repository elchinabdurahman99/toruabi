/**
 * Public site origin for canonical, hreflang, OG, and sitemap.
 * Set `NEXT_PUBLIC_SITE_URL` to the exact public URL (including `www` vs apex) so
 * `rel=canonical` matches what users and crawlers see — avoids hreflang/canonical conflicts.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://torudeabi24.ee";

export const SITE_NAME = "TorudeAbi24";
export const LEGAL_ENTITY = "TorudeAbi24";
