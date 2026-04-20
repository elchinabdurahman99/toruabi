export const SLUG_TO_CANONICAL: Record<string, string> = {
  // Bathroom Repair
  "bathroom-repair": "bathroom-repair",
  "vannitoa-remont": "bathroom-repair",
  "ремонт-ванной-комнаты": "bathroom-repair",

  // Boiler Installation
  "boiler-installation": "boiler-installation",
  "boilerite-paigaldus": "boiler-installation",
  "установка-бойлеров": "boiler-installation",

  // Cleaning Services
  "cleaning-services": "cleaning-services",
  "koristusteenus": "cleaning-services",
  "услуги-по-уборке": "cleaning-services",

  // Plumbing Works
  "plumbing-works-tallinn": "plumbing-works-tallinn",
  "santehnilised-tood": "plumbing-works-tallinn",
  "сантехнические-работы": "plumbing-works-tallinn",

  // Blockage Clearing / Sewerage
  "blockage-clearing": "blockage-clearing",
  "ummistuse-likvideerimine": "blockage-clearing",
  "промывка-канализации": "blockage-clearing",

  // Pipe Freezing
  "pipe-freezing": "pipe-freezing",
  "torude-kulmutamine": "pipe-freezing",
  "заморозка-труб": "pipe-freezing",

  // Construction Works
  "construction-works": "construction-works",
  "ehitustood": "construction-works",
  "строительные-работы": "construction-works",

  // Concrete Works
  "concrete-works": "concrete-works",
  "betoonitood": "concrete-works",
  "бетонные-работы": "concrete-works",

  // Apartment Repair
  "apartment-office-repair": "apartment-office-repair",
  "korterite-remont": "apartment-office-repair",
  "ремонт-квартир-и-офисов": "apartment-office-repair",

  // Riser Replacement
  "replacement-risers": "replacement-risers",
  "pustikute-vahetus": "replacement-risers",
  "замена-стояков": "replacement-risers",

  // Entrance Repair
  "entrance-repair": "entrance-repair",
  "trepikodade-remont": "entrance-repair",
  "ремонт-подъездов": "entrance-repair",

  // Paver Installation
  "paver-installation": "paver-installation",
  "tanavakivi-paigaldus": "paver-installation",
  "установка-брусчатки": "paver-installation",

  // Toilet Installation
  "toilet-installation": "toilet-installation",
  "wc-poti-paigaldus": "toilet-installation",
  "установка-унитаза": "toilet-installation",

  // Design
  "design": "design",
  "disain": "design",
  "дизайн-проект": "design",

  // Add other fallbacks from serviceSlugFallbacks if needed
  "external-water-supply": "external-water-supply",
  "valine-veevarustus": "external-water-supply",
  "наружное-водоснабжение": "external-water-supply",

  // Gas Works
  "gas-works": "gas-works",
  "gaasitood": "gas-works",
  "газовые-работы": "gas-works",
};

export const CANONICAL_TO_LOCALIZED: Record<string, { en: string; et: string; ru: string }> = {
  "bathroom-repair": { en: "bathroom-repair", et: "vannitoa-remont", ru: "ремонт-ванной-комнаты" },
  "boiler-installation": { en: "boiler-installation", et: "boilerite-paigaldus", ru: "установка-бойлеров" },
  "cleaning-services": { en: "cleaning-services", et: "koristusteenus", ru: "услуги-по-уборке" },
  "plumbing-works-tallinn": { en: "plumbing-works-tallinn", et: "santehnilised-tood", ru: "сантехнические-работы" },
  "blockage-clearing": { en: "blockage-clearing", et: "ummistuse-likvideerimine", ru: "промывка-канализации" },
  "pipe-freezing": { en: "pipe-freezing", et: "torude-kulmutamine", ru: "заморозка-труб" },
  "construction-works": { en: "construction-works", et: "ehitustood", ru: "строительные-работы" },
  "concrete-works": { en: "concrete-works", et: "betoonitood", ru: "бетонные-работы" },
  "apartment-office-repair": { en: "apartment-office-repair", et: "korterite-remont", ru: "ремонт-квартир-и-офисов" },
  "replacement-risers": { en: "replacement-risers", et: "pustikute-vahetus", ru: "замена-стояков" },
  "entrance-repair": { en: "entrance-repair", et: "trepikodade-remont", ru: "ремонт-подъездов" },
  "paver-installation": { en: "paver-installation", et: "tanavakivi-paigaldus", ru: "установка-брусчатки" },
  "toilet-installation": { en: "toilet-installation", et: "wc-poti-paigaldus", ru: "установка-унитаза" },
  "design": { en: "design", et: "disain", ru: "дизайн-проект" },
  "external-water-supply": { en: "external-water-supply", et: "valine-veevarustus", ru: "наружное-водоснабжение" },
  "gas-works": { en: "gas-works", et: "gaasitood", ru: "газовые-работы" },
};

export function getLocalizedSlug(slug: string, toLocale: string): string | null {
  const canonical = SLUG_TO_CANONICAL[slug];
  if (!canonical) return null;
  return CANONICAL_TO_LOCALIZED[canonical]?.[toLocale as "en" | "et" | "ru"] || slug;
}
