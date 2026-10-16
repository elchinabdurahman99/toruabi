import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { canonicalFor, localeLanguageAlternates } from "./urls";
import { SITE_NAME } from "@/lib/siteConfig";

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

const BRAND_RE = /torude\s?abi/i;

/** Skips the layout "%s | TorudeAbi24.ee" template when the title already names the brand. */
export function pageTitle(title: string): NonNullable<Metadata["title"]> {
  return BRAND_RE.test(title) ? { absolute: title } : title;
}

const DEFAULT_OG_ALT: Record<string, string> = {
  et: `${SITE_NAME} — torutööd, elektritööd ja remont Tallinnas ja Harjumaal 24/7`,
  ru: `${SITE_NAME} — сантехника, электрика и ремонт в Таллине и Харьюмаа 24/7`,
  en: `${SITE_NAME} — 24/7 plumbing, electrical & renovation in Tallinn & Harjumaa`,
};

export function defaultOgImageAlt(locale: Locale | string): string {
  return DEFAULT_OG_ALT[String(locale)] ?? DEFAULT_OG_ALT.en;
}

/**
 * Full openGraph + twitter block for a page. Next.js merges metadata shallowly, so a page
 * that sets only `openGraph.url` would otherwise drop og:title/og:image and inherit the
 * home page's twitter:title.
 */
export function socialMeta({
  locale,
  url,
  title,
  description,
  image,
  imageAlt,
  type = "website",
}: {
  locale: Locale | string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const fullTitle = BRAND_RE.test(title) ? title : `${title} | ${SITE_NAME}`;
  const img = image ?? "/api/og";
  const alt = imageAlt ?? defaultOgImageAlt(locale);
  const loc = String(locale);
  return {
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: loc === "et" ? "et_EE" : loc === "ru" ? "ru_RU" : "en_US",
      type,
      images: [{ url: img, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}
