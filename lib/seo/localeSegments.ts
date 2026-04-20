import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { absUrl } from "./urls";
import { SERVICE_SLUG_FALLBACK } from "./serviceSlugFallbacks";

/** Resolved URL slug per locale (main Sanity slug + optional pathSegment overrides). */
export type SegmentTriple = { et: string; en: string; ru: string };

export function segmentTripleFromSanity(
  canonicalSlug: string,
  pathSegment?: { et?: string; en?: string; ru?: string } | null,
): SegmentTriple {
  const p = pathSegment ?? {};
  const fb = SERVICE_SLUG_FALLBACK[canonicalSlug];
  return {
    et: p.et?.trim() || fb?.et || canonicalSlug,
    en: p.en?.trim() || canonicalSlug,
    ru: p.ru?.trim() || fb?.ru || canonicalSlug,
  };
}

function alternatesForNestedRoute(
  base: "services" | "blog",
  segments: SegmentTriple,
  locale: Locale,
  currentSlug?: string,
): { canonical: string; languages: Record<string, string> } {
  const prefix = `/${base}`;
  const loc = String(locale);
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absUrl(l, `${prefix}/${segments[l] as string}`);
  }

  // Use currentSlug if provided to ensure canonical matches the actual URL (fixes SEO conflicts)
  const effectiveSlug = currentSlug || (segments[locale] as string);
  const canonical = absUrl(locale, `${prefix}/${effectiveSlug}`);
  languages[loc] = canonical;

  // x-default points to default locale's prefixed version
  languages["x-default"] = absUrl(defaultLocale, `${prefix}/${segments[defaultLocale] as string}`);

  return { canonical, languages };
}

export function alternatesForServicePage(segments: SegmentTriple, locale: Locale, currentSlug?: string) {
  return alternatesForNestedRoute("services", segments, locale, currentSlug);
}

export function alternatesForBlogPostPage(segments: SegmentTriple, locale: Locale, currentSlug?: string) {
  return alternatesForNestedRoute("blog", segments, locale, currentSlug);
}
