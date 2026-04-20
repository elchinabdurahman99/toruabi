import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { canonicalFor, localeLanguageAlternates } from "./urls";

/**
 * Ensures hreflang self-URL matches rel=canonical exactly (reciprocal / self-reference audits).
 */
export function buildI18nAlternates(locale: Locale | string, pathAfterLocale: string) {
  const canonical = canonicalFor(locale, pathAfterLocale);
  const { languages } = localeLanguageAlternates(pathAfterLocale);
  const loc = String(locale);
  return {
    canonical,
    languages: { ...languages, [loc]: canonical },
  } as const;
}

export function alternatesForPage(locale: Locale | string, pathAfterLocale: string): Metadata["alternates"] {
  const { canonical, languages } = buildI18nAlternates(locale, pathAfterLocale);
  return { canonical, languages };
}

export function openGraphPageUrl(locale: Locale | string, pathAfterLocale: string): string {
  return canonicalFor(locale, pathAfterLocale);
}
