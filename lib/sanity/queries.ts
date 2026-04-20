import { Locale } from "@/i18n/config";
import { SERVICE_SLUG_FALLBACK } from "@/lib/seo/serviceSlugFallbacks";

export function localizedField(field: string, locale: Locale) {
  return `coalesce(${field}.${locale}, ${field}.et)`;
}

/** GROQ expression: default slug when `pathSegment` is empty (must match `segmentTripleFromSanity`). */
function groqSelectFallback(locale: "et" | "ru"): string {
  const pairs = Object.entries(SERVICE_SLUG_FALLBACK).filter(([, v]) => v[locale]);
  if (pairs.length === 0) return "slug.current";
  const cases = pairs.map(([k, v]) => `slug.current == "${k}" => "${v[locale]}"`).join(",\n");
  return `select(${cases}, slug.current)`;
}

/**
 * Service: pathSegment.et|ru from Sanity (Cyrillic OK for RU), then code fallbacks, then English slug.current.
 * English uses main `slug` only; legacy pathSegment.en still supported if present in old documents.
 */
function servicePathSegmentSlug(locale: Locale): string {
  if (locale === "et") return `coalesce(pathSegment.et, ${groqSelectFallback("et")})`;
  if (locale === "ru") return `coalesce(pathSegment.ru, ${groqSelectFallback("ru")})`;
  return `coalesce(pathSegment.en, slug.current)`;
}

/** Blog: no service slug fallbacks — only CMS segments or English slug.current. */
function blogPathSegmentSlug(locale: Locale): string {
  if (locale === "et") return `coalesce(pathSegment.et, slug.current)`;
  if (locale === "ru") return `coalesce(pathSegment.ru, slug.current)`;
  return `coalesce(pathSegment.en, slug.current)`;
}

/** GROQ: resolve URL param to document when slug is fallback ET/RU segment. */
function serviceSlugFallbackMatchGROQ(): string {
  const parts: string[] = [];
  for (const [canonical, { et, ru }] of Object.entries(SERVICE_SLUG_FALLBACK)) {
    if (et) parts.push(`($slug == "${et}" && slug.current == "${canonical}")`);
    if (ru) parts.push(`($slug == "${ru}" && slug.current == "${canonical}")`);
  }
  return parts.length ? parts.join(" || ") : "false";
}

const serviceMatchAnySlug = `(
  slug.current == $slug ||
  pathSegment.et == $slug ||
  pathSegment.ru == $slug ||
  pathSegment.en == $slug ||
  ${serviceSlugFallbackMatchGROQ()}
)`;

const blogMatchAnySlug = `(
  slug.current == $slug ||
  pathSegment.et == $slug ||
  pathSegment.ru == $slug ||
  pathSegment.en == $slug
)`;

/** Sitemap: canonical slug + per-locale overrides */
export const allServicesForSitemapQuery = `
  *[_type == "service" && slug.current != "plumber"] | order(slug.current asc) {
    "canonicalSlug": slug.current,
    pathSegment
  }
`;

/** Sitemap: blog posts */
export const allBlogPostsForSitemapQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    "canonicalSlug": slug.current,
    pathSegment
  }
`;

/** @deprecated use allServicesForSitemapQuery */
export const allServiceSlugsQuery = `
  *[_type == "service" && slug.current != "plumber"] | order(slug.current asc) {
    "slug": slug.current
  }
`;

/** @deprecated use allBlogPostsForSitemapQuery */
export const allBlogSlugsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    "slug": slug.current
  }
`;

export const servicesListQuery = (locale: Locale) => `
  *[_type == "service" && slug.current != "plumber"] | order(coalesce(order, 999) asc, slug.current asc) {
    _id,
    "title": ${localizedField("title", locale)},
    "canonicalSlug": slug.current,
    "slug": ${servicePathSegmentSlug(locale)},
    "description": ${localizedField("shortDescription", locale)},
    "icon": icon,
    order,
    image {
      asset,
      hotspot,
      crop,
      "alt": coalesce(alt.${locale}, alt.et)
    }
  }
`;

export const serviceBySlugQuery = (locale: Locale) => `
  *[_type == "service" && ${serviceMatchAnySlug} && slug.current != "plumber"][0] {
    _id,
    "canonicalSlug": slug.current,
    pathSegment,
    "slug": ${servicePathSegmentSlug(locale)},
    "title": ${localizedField("title", locale)},
    "shortDescription": ${localizedField("shortDescription", locale)},
    "body": ${localizedField("body", locale)},
    "metaTitle": ${localizedField("metaTitle", locale)},
    "metaDescription": ${localizedField("metaDescription", locale)},
    image {
      asset,
      hotspot,
      crop,
      "alt": coalesce(alt.${locale}, alt.et)
    },
    gallery[] {
      _key,
      asset,
      hotspot,
      crop,
      "alt": coalesce(alt.${locale}, alt.et)
    },
    "icon": icon
  }
`;

export const servicesByCanonicalSlugsQuery = (locale: Locale) => `
  *[_type == "service" && slug.current in $slugs]{
    "canonicalSlug": slug.current,
    "slug": ${servicePathSegmentSlug(locale)}
  }
`;

export const blogPostsQuery = (locale: Locale) => `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    "title": ${localizedField("title", locale)},
    "canonicalSlug": slug.current,
    "slug": ${blogPathSegmentSlug(locale)},
    "excerpt": ${localizedField("excerpt", locale)},
    "publishedAt": publishedAt,
    mainImage,
    "author": author->name
  }
`;

export const blogPostBySlugQuery = (locale: Locale) => `
  *[_type == "blogPost" && ${blogMatchAnySlug}][0] {
    _id,
    "canonicalSlug": slug.current,
    pathSegment,
    "slug": ${blogPathSegmentSlug(locale)},
    "title": ${localizedField("title", locale)},
    "body": ${localizedField("body", locale)},
    "excerpt": ${localizedField("excerpt", locale)},
    "metaTitle": ${localizedField("metaTitle", locale)},
    "metaDescription": ${localizedField("metaDescription", locale)},
    "publishedAt": publishedAt,
    mainImage,
    "author": author->name
  }
`;

export const partnersQuery = `
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    logo,
    url
  }
`;

export const pricingQuery = (locale: Locale) => `
  *[_type == "pricingCategory"] | order(order asc) {
    _id,
    "title": ${localizedField("title", locale)},
    "items": items[] {
      "name": ${localizedField("name", locale)},
      "price": price,
      "unit": ${localizedField("unit", locale)}
    }
  }
`;

export const siteSettingsQuery = (locale: Locale) => `
  *[_type == "siteSettings"][0] {
    "companyName": companyName,
    "phone": phone,
    "phone2": phone2,
    "email": email,
    "address": ${localizedField("address", locale)},
    "regNumber": regNumber,
    "licenseNumber": licenseNumber,
    logo,
    "socialLinks": socialLinks
  }
`;

export const testimonialsQuery = (locale: Locale) => `
  *[_type == "testimonial" && (!defined(approved) || approved == true)] | order(coalesce(order, 999) asc) {
    _id,
    "name": name,
    "text": ${localizedField("text", locale)},
    "rating": rating,
    avatar
  }
`;

export const privacyPageQuery = (locale: Locale) => `
  *[_type == "page" && slug.current == "privacy-policy"][0] {
    "title": ${localizedField("title", locale)},
    "body": ${localizedField("body", locale)}
  }
`;

export const termsPageQuery = (locale: Locale) => `
  *[_type == "page" && slug.current == "terms"][0] {
    "title": ${localizedField("title", locale)},
    "body": ${localizedField("body", locale)}
  }
`;
