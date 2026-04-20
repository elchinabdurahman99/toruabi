export const locales = ["et", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "et";

export const localeNames: Record<Locale, string> = {
  et: "Eesti",
  en: "English",
  ru: "Русский",
};

export const localePrefixes: Record<Locale, Record<string, string>> = {
  et: {
    services: "teenused",
    blog: "blogi",
    partners: "partnerid",
    "price-list": "hinnakiri",
    terms: "tingimused",
    contact: "kontakt",
    "privacy-policy": "privaatsuspoliitika",
  },
  en: {
    services: "services",
    blog: "blog",
    partners: "partners",
    "price-list": "price-list",
    terms: "terms",
    contact: "contact",
    "privacy-policy": "privacy-policy",
  },
  ru: {
    services: "услуги",
    blog: "блог",
    partners: "партнеры",
    "price-list": "цены",
    terms: "условия",
    contact: "контакты",
    "privacy-policy": "политика-конфиденциальности",
  },
};
