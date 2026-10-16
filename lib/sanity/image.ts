import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder) {
    return {
      width: () => ({ height: () => ({ url: () => "/placeholder.jpg" }), url: () => "/placeholder.jpg" }),
      height: () => ({ url: () => "/placeholder.jpg" }),
      fit: () => ({ url: () => "/placeholder.jpg" }),
      quality: () => ({ url: () => "/placeholder.jpg" }),
      auto: () => ({ url: () => "/placeholder.jpg" }),
      url: () => "/placeholder.jpg",
    } as any;
  }
  return builder.image(source);
}

/**
 * Appends a virtual SEO-friendly filename to a Sanity CDN URL.
 *
 * Sanity's image CDN ignores anything appended after the file extension in
 * the URL path, so the image is served identically while Google/Bing index it
 * with the descriptive filename. Example:
 *   .../abc123-1200x800.jpg  →  .../abc123-1200x800.jpg/torudeabi24-bathroom-repair.jpg
 *
 * Pass the `originalFilename` field from the Sanity asset (fetched via
 * `asset->originalFilename` in GROQ) or a manually crafted descriptive name.
 */
export function withSeoFilename(
  url: string,
  filename: string | null | undefined,
): string {
  if (!url || !filename || url.startsWith("/")) return url;

  // Strip extension from the filename and slugify it
  const base = filename
    .replace(/\.[^.]+$/, "")             // remove .jpg / .png etc.
    .toLowerCase()
    .replace(/[äÄ]/g, "a")
    .replace(/[öÖ]/g, "o")
    .replace(/[üÜ]/g, "u")
    .replace(/[õÕ]/g, "o")
    .replace(/[^a-z0-9-]/g, "-")         // non-alphanumeric → dash
    .replace(/-+/g, "-")                  // collapse multiple dashes
    .replace(/^-|-$/g, "");              // trim leading/trailing dashes

  if (!base) return url;

  // Preserve existing format extension from the URL
  const ext = url.match(/\.(jpg|jpeg|png|webp|gif|avif)(?:\?|$)/i)?.[1] ?? "jpg";

  // Strip any existing query string, append filename, re-attach query string
  const [path, qs] = url.split("?");
  const seoUrl = `${path}/${base}.${ext}`;
  return qs ? `${seoUrl}?${qs}` : seoUrl;
}
