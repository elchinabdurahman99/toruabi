import type { Locale } from "@/i18n/config";

/**
 * Service documents that duplicate another page (same ET/RU URL or same topic).
 * They stay in Sanity untouched, but their URLs 301 to the main page and they are
 * left out of the sitemap and related links, so each topic has one indexable URL.
 *
 * duplicate canonical slug → main canonical slug
 */
export const DUPLICATE_SERVICE_OF: Record<string, string> = {
  "apartment-office-repair": "apartment-renovation",
  "bathroom-repair": "bathroom-renovation",
  "blockage-clearing": "drain-blockage-removal",
  "paver-installation": "paving-stone-installation",
  "containers-for-rent": "container-rental",
  "entrance-repair": "stairwell-balcony-renovation",
  "pressure-flushing-sewer": "sewer-jetting",
};

/**
 * URL segment of a duplicate → URL segment of the main page, per locale.
 * Segments shared with the main page (e.g. ET `korterite-remont`) already serve it and need no entry.
 */
export const DUPLICATE_SERVICE_REDIRECTS: Record<Locale, Record<string, string>> = {
  en: {
    "apartment-office-repair": "apartment-renovation",
    "bathroom-repair": "bathroom-renovation",
    "blockage-clearing": "drain-blockage-removal",
    "paver-installation": "paving-stone-installation",
    "containers-for-rent": "container-rental",
    "entrance-repair": "stairwell-balcony-renovation",
    "pressure-flushing-sewer": "sewer-jetting",
  },
  et: {
    "konteinerid-rendile": "konteinerite-rent",
    "survepesu-kanalisatsioon": "kanalisatsiooni-survepesu",
  },
  ru: {
    "ремонт-квартир-и-офисов": "ремонт-квартир",
    "промывка-канализации": "прочистка-канализации",
    "установка-брусчатки": "укладка-брусчатки",
    "ремонт-подъездов": "ремонт-подъездов-и-балконов",
  },
};
