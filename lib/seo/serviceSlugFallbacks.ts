/**
 * When Sanity `pathSegment.et` / `pathSegment.ru` are empty, these URL segments are used
 * so ET/RU service URLs and hreflang are not only English `slug.current`.
 * CMS `pathSegment.*` always wins over these defaults.
 *
 * RU values use Cyrillic (matches `scripts/migrate-service-path-segments.mjs` + Studio validation).
 * Keep in sync with GROQ in `lib/sanity/queries.ts` (generated from this map).
 */
export const SERVICE_SLUG_FALLBACK: Record<string, { et?: string; ru?: string }> = {
  "bathroom-repair": { et: "vannitoa-remont", ru: "ремонт-ванной-комнаты" },
  "boiler-installation": { et: "boilerite-paigaldus", ru: "установка-бойлеров" },
  "cleaning-services": { et: "koristusteenus", ru: "услуги-по-уборке" },
  "concrete-works": { et: "betoonitood", ru: "бетонные-работы" },
  "construction-works": { et: "ehitustood", ru: "строительные-работы" },
  "external-water-supply": { et: "valine-veevarustus", ru: "наружное-водоснабжение" },
  "containers-for-rent": { et: "konteinerid-rendile", ru: "аренда-контейнеров" },
  "defrosting-pipes": { et: "torude-kulmutus", ru: "разморозка-труб" },
  design: { et: "disain", ru: "дизайн-проект" },
  "balcony-repair": { et: "rõdu-remont", ru: "ремонт-балкона" },
  "electrician-services": { et: "elektrid", ru: "электромонтажные-услуги" },
  "blockage-clearing": { et: "ummistuse-likvideerimine", ru: "промывка-канализации" },
  "entrance-repair": { et: "trepikodade-remont", ru: "ремонт-подъездов" },
  "apartment-associations": { et: "korteriuhistud", ru: "работы-для-тсж" },
  "floor-heating": { et: "põrandaküte", ru: "теплый-пол" },
  "handyman-services": { et: "meistreteenused", ru: "услуги-мастера" },
  "paver-installation": { et: "tanavakivi-paigaldus", ru: "установка-брусчатки" },
  "insured-accident-repair": { et: "kindlustus-remont", ru: "ремонт-по-страховке" },
  "pipe-freezing": { et: "torude-kulmutamine", ru: "заморозка-труб" },
  "plumber-24h-tallinn": { et: "santehnik-24h-tallinn", ru: "сантехник-24-часа-таллин" },
  "plumbing-works-tallinn": { et: "santehnilised-tood", ru: "сантехнические-работы" },
  "polyethylene-welding": { et: "polüetüleen-keevitus", ru: "сварка-полиэтилена" },
  "pressure-flushing-sewer": { et: "survepesu-kanalisatsioon", ru: "промывка-канализации" },
  "pipe-repair-replacement": { et: "toru-remont-vahetus", ru: "ремонт-и-замена-труб" },
  "apartment-office-repair": { et: "korterite-remont", ru: "ремонт-квартир-и-офисов" },
  "appliance-repair": { et: "tehnika-remont", ru: "ремонт-бытовой-техники" },
  "replacement-risers": { et: "pustikute-vahetus", ru: "замена-стояков" },
  "water-meter-replacement": { et: "veearvesti-vahetus", ru: "замена-счетчиков-воды" },
  "roofing-repair": { et: "katus-remont", ru: "ремонт-кровли" },
  "sewerage-video-inspection": { et: "kanalisatsiooni-video", ru: "видеоинспекция-канализации" },
  "toilet-installation": { et: "wc-poti-paigaldus", ru: "установка-унитаза" },
  "wells-sale-installation": { et: "kaevide-muük-paigaldus", ru: "скважины-и-колодцы" },
};
