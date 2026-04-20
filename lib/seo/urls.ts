import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/siteConfig";
import { localizedPathAfterLocale } from "./localizedPath";

const base = () => SITE_URL.replace(/\/$/, "");

/** Absolute URL for one locale + internal path (English segments, e.g. "/services", "/blog/foo"). Home: "". */
export function absUrl(locale: string, pathAfterLocale: string): string {
  const loc = locale as Locale;
  const localized = localizedPathAfterLocale(pathAfterLocale, loc);
  // Ensure we don't have double slashes if localized is empty
  const suffix = localized === "/" || localized === "" ? "" : localized;
  return `${base()}/${locale}${suffix}`;
}

/**
 * hreflang map: each locale gets the correct localized path (e.g. et → /teenused/…, ru → /uslugi/…).
 */
export function localeLanguageAlternates(pathAfterLocale: string): {
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absUrl(l, pathAfterLocale);
  }
  // x-default points to the default locale's prefixed URL as requested (no unprefixed versions in alternates)
  languages["x-default"] = absUrl(defaultLocale, pathAfterLocale);
  return { languages };
}

export function canonicalFor(locale: Locale | string, pathAfterLocale: string): string {
  return absUrl(locale, pathAfterLocale);
}
