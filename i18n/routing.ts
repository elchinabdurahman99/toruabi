import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

/**
 * Localized URL segments per locale (middleware rewrites to internal `app/[locale]/...` paths).
 * Must stay in sync with `localePrefixes` in `./config` and `lib/seo/localizedPath.ts`.
 *
 * `alternateLinks: false` — hreflang comes only from Next.js `generateMetadata` + `lib/seo/urls.ts`
 * so we avoid conflicting duplicate `Link:` HTTP headers vs `<link rel="alternate">`.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/services": {
      et: "/teenused",
      en: "/services",
      ru: "/услуги",
    },
    "/services/[slug]": {
      et: "/teenused/[slug]",
      en: "/services/[slug]",
      ru: "/услуги/[slug]",
    },
    "/blog": {
      et: "/blogi",
      en: "/blog",
      ru: "/блог",
    },
    "/blog/[slug]": {
      et: "/blogi/[slug]",
      en: "/blog/[slug]",
      ru: "/блог/[slug]",
    },
    "/contact": {
      et: "/kontakt",
      en: "/contact",
      ru: "/контакты",
    },
    "/partners": {
      et: "/partnerid",
      en: "/partners",
      ru: "/партнеры",
    },
    "/price-list": {
      et: "/hinnakiri",
      en: "/price-list",
      ru: "/цены",
    },
    "/terms": {
      et: "/tingimused",
      en: "/terms",
      ru: "/условия",
    },
    "/privacy-policy": {
      et: "/privaatsuspoliitika",
      en: "/privacy-policy",
      ru: "/политика-конфиденциальности",
    },
    "/works": {
      et: "/meie-tood",
      en: "/works",
      ru: "/наши-работы",
    },
    "/jobs": {
      et: "/tookoht",
      en: "/jobs",
      ru: "/вакансии",
    },
  },
});
