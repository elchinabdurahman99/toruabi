import { defaultLocale, localePrefixes, type Locale } from "@/i18n/config";

type PrefixKey = keyof typeof localePrefixes.et;

const INTERNAL_SEGMENT_TO_KEY: Record<string, PrefixKey> = {
  services: "services",
  blog: "blog",
  partners: "partners",
  "price-list": "price-list",
  terms: "terms",
  contact: "contact",
  "privacy-policy": "privacy-policy",
};

/**
 * Maps internal app paths (English segments, matching `app/[locale]/...`) to
 * locale-specific URL segments for canonical + hreflang (e.g. `/services` → `/teenused` for `et`).
 */
export function localizedPathAfterLocale(pathAfterLocale: string, locale: Locale): string {
  if (!pathAfterLocale || pathAfterLocale === "/") return "";
  const p = pathAfterLocale.startsWith("/") ? pathAfterLocale : `/${pathAfterLocale}`;
  const segments = p.split("/").filter(Boolean);
  if (segments.length === 0) return "";

  const first = segments[0];
  const rest = segments.slice(1);
  const key = INTERNAL_SEGMENT_TO_KEY[first];
  if (!key) return p;

  const localizedFirst = localePrefixes[locale][key];
  return `/${[localizedFirst, ...rest].join("/")}`;
}

export function defaultLocalePathAfterLocale(pathAfterLocale: string): string {
  return localizedPathAfterLocale(pathAfterLocale, defaultLocale);
}
