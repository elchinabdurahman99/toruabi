/**
 * scripts/seed-work-projects.mjs
 *
 * Seeds 8 work project documents with full EN/ET/RU translations:
 *   - title (localeString)
 *   - shortDescription (localeText)
 *   - mainImage.alt (localeString)
 *   - highlights[].label (localeString)
 *   - metaTitle ≤48 chars (template adds " | TorudeAbi24.ee" → ≤65)
 *   - metaDescription 140–160 chars
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=<editor-token> \
 *   node scripts/seed-work-projects.mjs
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token     = process.env.SANITY_API_TOKEN;
const dryRun    = process.argv.includes("--dry-run");

if (!projectId && !dryRun) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID not set"); process.exit(1); }
if (!token     && !dryRun) { console.error("❌  SANITY_API_TOKEN not set"); process.exit(1); }

const client = dryRun ? null : createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ── Work Project Data ────────────────────────────────────────────
// Each entry matches existing workProject by slug.
// slug = slugified version of title.en for lookup.

const WORK_PROJECTS = [
  {
    slugQuery: "torustiku",  // partial match for Sanity fetch
    title: {
      en: "Full Pipe Replacement in Kristiine",
      et: "Torustiku täielik vahetus Kristiines",
      ru: "Полная замена трубопровода в Кристийне",
    },
    shortDescription: {
      en: "Complete replacement of worn Soviet-era water supply and drainage pipes in a 72 m² Kristiine apartment. Copper and PEX supply pipes, PVC drainage, completed in 3 days.",
      et: "Täielik nõukogude-aegse vee- ja kanalisatsioonitoru vahetus 72 m² Kristiine korteris. Vask- ja PEX-torud, PVC kanalisatsioon, valmis 3 päevaga.",
      ru: "Полная замена изношенных советских труб водоснабжения и канализации в квартире 72 м² в Кристийне. Медь и PEX, ПВХ канализация, выполнено за 3 дня.",
    },
    imageAlt: {
      en: "Pipe replacement in Kristiine apartment Tallinn — TorudeAbi24",
      et: "Torustiku vahetus Kristiine korteris Tallinnas — TorudeAbi24",
      ru: "Замена труб в квартире Кристийне Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Pipe Replacement Kristiine Tallinn",
      et: "Torustiku vahetus Kristiines Tallinnas",
      ru: "Замена труб Кристийне Таллинн",
    },
    metaDescription: {
      en: "Complete water supply and drainage pipe replacement in a Kristiine apartment. Soviet-era pipes replaced with copper and PEX. 3-day project, 2-year warranty.",
      et: "Täielik vee- ja kanalisatsioonitoru vahetus Kristiine korteris. Nõukogude torud asendati vask- ja PEX-torudega. 3-päevane projekt, 2-aastane garantii.",
      ru: "Полная замена труб водоснабжения и канализации в квартире Кристийне. Советские трубы заменены на медь и PEX. 3 дня, гарантия 2 года.",
    },
    highlights: [
      { label: { en: "Area", et: "Pindala", ru: "Площадь" }, value: "72 m²" },
      { label: { en: "Duration", et: "Kestus", ru: "Срок" }, value: "3 days" },
      { label: { en: "Pipes replaced", et: "Asendatud torud", ru: "Труб заменено" }, value: "48 m" },
    ],
  },
  {
    slugQuery: "elektritood",
    title: {
      en: "Electrical Upgrade at Ülemiste Business Centre",
      et: "Elektritööd Ülemiste ärimajas",
      ru: "Электромонтаж в бизнес-центре Юлемисте",
    },
    shortDescription: {
      en: "Full electrical upgrade for an Ülemiste City office: 4 distribution panels replaced, 48 LED luminaires installed, all cabling brought up to current Elektriohutusseadus requirements.",
      et: "Täielik elektriuuendus Ülemiste City kontoris: 4 jaotuskilpi vahetatud, 48 LED-valgusti paigaldatud, kogu juhtmestik viidud vastavusse kehtiva Elektriohutusseadusega.",
      ru: "Полная модернизация электрики офиса в Юлемисте: заменены 4 распределительных щита, установлено 48 LED-светильников, вся проводка приведена в соответствие с Elektriohutusseadus.",
    },
    imageAlt: {
      en: "Electrical panel installation Ülemiste business centre Tallinn — TorudeAbi24",
      et: "Elektrikilbi paigaldus Ülemiste ärimajas Tallinnas — TorudeAbi24",
      ru: "Монтаж электрощита бизнес-центр Юлемисте Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Electrical Upgrade Ülemiste Office Tallinn",
      et: "Elektritööd Ülemiste ärimajas Tallinnas",
      ru: "Электромонтаж Юлемисте Таллинн",
    },
    metaDescription: {
      en: "Office electrical upgrade in Ülemiste City Tallinn: 4 panels, 48 LEDs, full rewire to Elektriohutusseadus standards. Certified electricians, 3-year warranty.",
      et: "Kontori elektriuuendus Ülemiste City Tallinnas: 4 kilpi, 48 LED-valgusti, täielik ümberjuhtmestamine. Sertifitseeritud elektrikud, 3-aastane garantii.",
      ru: "Модернизация электрики офиса в Юлемисте: 4 щита, 48 LED, полная перепроводка. Лицензированные электрики, гарантия 3 года.",
    },
    highlights: [
      { label: { en: "Panels", et: "Kilbid", ru: "Щитов" }, value: "4" },
      { label: { en: "LED lights", et: "LED-valgustid", ru: "LED-светильников" }, value: "48" },
      { label: { en: "Certificate", et: "Tõend", ru: "Свидетельство" }, value: "Yes / Jah / Да" },
    ],
  },
  {
    slugQuery: "vannitoa",
    title: {
      en: "Complete Bathroom Renovation in Mustamäe",
      et: "Vannitoa kompleksremont Mustamäel",
      ru: "Комплексный ремонт ванной на Мустамяэ",
    },
    shortDescription: {
      en: "Complete bathroom remodel in a Mustamäe panel apartment: full demolition, professional liquid membrane waterproofing, large-format porcelain tiling, Geberit concealed cistern toilet, walk-in shower, underfloor heating.",
      et: "Täielik vannitoa remont Mustamäe paneelmajas: täielik lammutus, professionaalne vedelmembraaniga hüdroisolatsioon, suurformaatne portselaanplaatimine, Geberit varjatud tsisterniga tualett, jalutusduš, põrandaküte.",
      ru: "Полный ремонт ванной в панельном доме Мустамяэ: демонтаж, гидроизоляция жидкой мембраной, крупноформатная плитка, унитаз Geberit со скрытым бачком, душевой поддон, тёплый пол.",
    },
    imageAlt: {
      en: "Renovated bathroom Mustamäe Tallinn — TorudeAbi24",
      et: "Renoveeritud vannituba Mustamäel Tallinnas — TorudeAbi24",
      ru: "Отремонтированная ванная Мустамяэ Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Bathroom Renovation Mustamäe Tallinn",
      et: "Vannitoa remont Mustamäel Tallinnas",
      ru: "Ремонт ванной Мустамяэ Таллинн",
    },
    metaDescription: {
      en: "Full bathroom renovation in Mustamäe Tallinn: waterproofing, large-format tiling, Geberit toilet, underfloor heating. 3-year warranty. TorudeAbi24.",
      et: "Täielik vannitoa remont Mustamäel Tallinnas: hüdroisolatsioon, plaatimine, Geberit tualett, põrandaküte. 3-aastane garantii. TorudeAbi24.",
      ru: "Полный ремонт ванной на Мустамяэ: гидроизоляция, плитка, Geberit, тёплый пол. Гарантия 3 года. TorudeAbi24.",
    },
    highlights: [
      { label: { en: "Area", et: "Pindala", ru: "Площадь" }, value: "6.5 m²" },
      { label: { en: "Duration", et: "Kestus", ru: "Срок" }, value: "12 days" },
      { label: { en: "Warranty", et: "Garantii", ru: "Гарантия" }, value: "3 years" },
    ],
  },
  {
    slugQuery: "ehitustood",
    title: {
      en: "New Construction Partition Walls in Lasnamäe",
      et: "Ehitustööd Lasnamäel — vaheseinad",
      ru: "Строительство перегородок в Ласнамяэ",
    },
    shortDescription: {
      en: "Gypsum board partition wall installation for apartment redevelopment in Lasnamäe: 38 linear metres of new walls, doorways, sound insulation, plastering, and painting for client handover.",
      et: "Kipskartongist vaheseinte paigaldus korteri ümberkujunduseks Lasnamäel: 38 jooksumeeter uusi seinu, ukseavad, helikindlustus, krohvimine ja värvimine üleandmiseks.",
      ru: "Монтаж гипсокартонных перегородок при перепланировке квартиры в Ласнамяэ: 38 пог. м новых стен, дверные проёмы, шумоизоляция, штукатурка и покраска под сдачу.",
    },
    imageAlt: {
      en: "Partition wall construction Lasnamäe apartment Tallinn — TorudeAbi24",
      et: "Vaheseinte ehitus Lasnamäe korteris Tallinnas — TorudeAbi24",
      ru: "Строительство перегородок квартира Ласнамяэ Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Partition Walls Construction Lasnamäe",
      et: "Vaheseinte ehitus Lasnamäel Tallinnas",
      ru: "Перегородки Ласнамяэ Таллинн",
    },
    metaDescription: {
      en: "Gypsum board partition walls in Lasnamäe apartment: 38 m of new walls, soundproofing, plastering, painting. Full construction project, 2-year warranty.",
      et: "Kipskartong vaheseinte paigaldus Lasnamäe korteris: 38 m seinu, helikindlustus, krohvimine, värvimine. Täisprojekt, 2-aastane garantii.",
      ru: "Гипсокартонные перегородки в квартире Ласнамяэ: 38 м стен, шумоизоляция, штукатурка, покраска. Полный проект, гарантия 2 года.",
    },
    highlights: [
      { label: { en: "Wall length", et: "Seinte pikkus", ru: "Длина стен" }, value: "38 m" },
      { label: { en: "Duration", et: "Kestus", ru: "Срок" }, value: "8 days" },
      { label: { en: "Soundproofing", et: "Helikindlustus", ru: "Шумоизоляция" }, value: "Yes" },
    ],
  },
  {
    slugQuery: "rekonstrueerimine",
    title: {
      en: "Full Apartment Renovation in Põhja-Tallinn",
      et: "Korteri täisremont Põhja-Tallinnas",
      ru: "Полный ремонт квартиры Пыхья-Таллинн",
    },
    shortDescription: {
      en: "Turnkey renovation of a 58 m² pre-war apartment in Põhja-Tallinn: full pipe replacement, rewiring, new bathroom and kitchen, flooring, walls and ceilings throughout.",
      et: "Võtmevalmis remont 58 m² sõjaeelsele korterile Põhja-Tallinnas: täielik toruvahetus, ümberjuhtmestamine, uus vannituba ja köök, põrandakate, seinad ja laed kogu korteris.",
      ru: "Ремонт под ключ квартиры 58 м² довоенной постройки в Пыхья-Таллинне: полная замена труб, перепроводка, новая ванная и кухня, полы, стены и потолки во всех комнатах.",
    },
    imageAlt: {
      en: "Full apartment renovation Põhja-Tallinn — TorudeAbi24",
      et: "Korteri täisremont Põhja-Tallinnas — TorudeAbi24",
      ru: "Полный ремонт квартиры Пыхья-Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Full Apartment Renovation Põhja-Tallinn",
      et: "Korteri täisremont Põhja-Tallinnas",
      ru: "Ремонт квартиры Пыхья-Таллинн",
    },
    metaDescription: {
      en: "Turnkey 58 m² apartment renovation in Põhja-Tallinn: plumbing, electrical, bathroom, kitchen, flooring. Single contractor, 2-year warranty. Free quote.",
      et: "Võtmevalmis 58 m² korteri remont Põhja-Tallinnas: torustik, elekter, vannituba, köök, põrand. Üks töövõtja, 2-aastane garantii. Tasuta pakkumine.",
      ru: "Ремонт под ключ 58 м² в Пыхья-Таллинне: сантехника, электрика, ванная, кухня, полы. Одна бригада, гарантия 2 года. Бесплатная смета.",
    },
    highlights: [
      { label: { en: "Area", et: "Pindala", ru: "Площадь" }, value: "58 m²" },
      { label: { en: "Duration", et: "Kestus", ru: "Срок" }, value: "28 days" },
      { label: { en: "Trades", et: "Erialad", ru: "Специальностей" }, value: "5" },
    ],
  },
  {
    slugQuery: "disain",
    title: {
      en: "Interior Design Project in Nõmme",
      et: "Sisearhitektuuri projekt Nõmmel",
      ru: "Интерьерный дизайн-проект в Нымме",
    },
    shortDescription: {
      en: "Interior architecture and 3D visualisation project for a 94 m² Nõmme house: complete spatial planning, material selection boards, 3D renders in 4 rooms, project documentation for construction team.",
      et: "Sisearhitektuuri ja 3D visualiseerimise projekt 94 m² Nõmme majale: täielik ruumiplaneerimine, materjalide valikutahvlid, 3D visualisatsioonid 4 ruumis, projektdokumentatsioon ehitusmeeskonnale.",
      ru: "Проект интерьерного дизайна и 3D-визуализации для дома 94 м² в Нымме: планировка пространства, подборка материалов, 3D-рендеры 4 комнат, проектная документация для строителей.",
    },
    imageAlt: {
      en: "Interior design 3D visualisation Nõmme house Tallinn — TorudeAbi24",
      et: "Sisearhitektuur 3D visualiseerimine Nõmme maja Tallinnas — TorudeAbi24",
      ru: "Дизайн интерьера 3D визуализация дом Нымме Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Interior Design Project Nõmme Tallinn",
      et: "Sisearhitektuur Nõmmel Tallinnas",
      ru: "Дизайн интерьера Нымме Таллинн",
    },
    metaDescription: {
      en: "Interior design and 3D visualisation for a 94 m² Nõmme house: spatial planning, material boards, 4-room renders, construction documentation. TorudeAbi24.",
      et: "Sisearhitektuur ja 3D visualiseerimine 94 m² Nõmme maja jaoks: ruumiplaneerimine, materjalitahvlid, 4 ruumi visualisatsioon, ehitusdokumentatsioon.",
      ru: "Дизайн интерьера и 3D-визуализация дома 94 м² в Нымме: планировка, подборка материалов, рендеры 4 комнат, документация для строителей.",
    },
    highlights: [
      { label: { en: "Area", et: "Pindala", ru: "Площадь" }, value: "94 m²" },
      { label: { en: "3D rooms", et: "3D ruumid", ru: "3D комнаты" }, value: "4" },
      { label: { en: "Delivery", et: "Tähtaeg", ru: "Срок" }, value: "3 weeks" },
    ],
  },
  {
    slugQuery: "blockage",
    title: {
      en: "Emergency Drain Unblocking in Haabersti",
      et: "Avariikanalisatsiooni puhastus Haaberstis",
      ru: "Аварийная прочистка дренажа в Хаабёрсти",
    },
    shortDescription: {
      en: "Same-day emergency drain unblocking for a flooded kitchen in Haabersti: CCTV camera inspection identified a fat-clog 4 metres into the main drain, cleared with high-pressure jetting in 90 minutes.",
      et: "Samal päeval hädaabikanalisatsioonipuhastus üleujutatud köögis Haaberstis: CCTV-kaameraülevaatus tuvastas rasvakorgistuse 4 meetrit peastiiakust, kõrvaldati survepesuga 90 minutiga.",
      ru: "Аварийная прочистка канализации в тот же день для затопленной кухни в Хаабёрсти: видеодиагностика выявила жировую пробку в 4 метрах от стояка, устранена гидропромывкой за 90 минут.",
    },
    imageAlt: {
      en: "Emergency drain unblocking Haabersti Tallinn — TorudeAbi24",
      et: "Avariikanalisatsioon Haaberstis Tallinnas — TorudeAbi24",
      ru: "Аварийная прочистка дренажа Хаабёрсти Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Emergency Drain Unblocking Haabersti",
      et: "Kanalisatsiooniavarii Haaberstis Tallinnas",
      ru: "Аварийная прочистка Хаабёрсти Таллинн",
    },
    metaDescription: {
      en: "Same-day emergency drain unblocking in Haabersti Tallinn: CCTV inspection, high-pressure jetting. Kitchen drain cleared in 90 minutes. 24/7 service.",
      et: "Samal päeval kanalisatsiooniavarii Haaberstis: CCTV ülevaatus, survepesu. Köögi kanalisatsioon puhastatud 90 minutiga. 24/7 teenus.",
      ru: "Аварийная прочистка канализации в Хаабёрсти в тот же день: видеодиагностика, гидропромывка. Кухонный слив очищен за 90 минут. Служба 24/7.",
    },
    highlights: [
      { label: { en: "Response", et: "Reageerimine", ru: "Реагирование" }, value: "35 min" },
      { label: { en: "Method", et: "Meetod", ru: "Метод" }, value: "CCTV + jetting" },
      { label: { en: "Cleared in", et: "Puhastatud", ru: "Устранено за" }, value: "90 min" },
    ],
  },
  {
    slugQuery: "gaas",
    title: {
      en: "Gas Boiler Installation in Pirita",
      et: "Gaasikatel paigaldus Pirital",
      ru: "Установка газового котла в Пирита",
    },
    shortDescription: {
      en: "Supply and installation of a Vaillant ecoTEC Plus 28 kW combi boiler in a Pirita detached house: gas connection, flue installation, system filling, commissioning, and safety certification.",
      et: "Vaillant ecoTEC Plus 28 kW kombikatla tarne ja paigaldus Pirita eramajas: gaasühenndus, lõõri paigaldus, süsteemi täitmine, kasutuselevõtt ja ohutusvõimendi.",
      ru: "Поставка и монтаж двухконтурного котла Vaillant ecoTEC Plus 28 кВт в частном доме Пирита: подключение газа, монтаж дымохода, наполнение системы, пуско-наладка и сертификация безопасности.",
    },
    imageAlt: {
      en: "Gas boiler installation Pirita detached house Tallinn — TorudeAbi24",
      et: "Gaasikatel paigaldus Pirita eramaja Tallinnas — TorudeAbi24",
      ru: "Установка газового котла частный дом Пирита Таллинн — TorudeAbi24",
    },
    metaTitle: {
      en: "Gas Boiler Installation Pirita Tallinn",
      et: "Gaasikatel paigaldus Pirital Tallinnas",
      ru: "Котёл газовый Пирита Таллинн",
    },
    metaDescription: {
      en: "Vaillant 28 kW combi boiler installation in Pirita Tallinn: gas connection, flue, commissioning, safety certificate. Licensed gas engineers. 2-year warranty.",
      et: "Vaillant 28 kW kombikatla paigaldus Pirital Tallinnas: gaasühendus, lõõr, kasutuselevõtt, ohutusvõimendi. Litsentseeritud gaasitehnikud. 2-aastane garantii.",
      ru: "Монтаж котла Vaillant 28 кВт в Пирита: подключение газа, дымоход, пуск, сертификат безопасности. Лицензированные газовики. Гарантия 2 года.",
    },
    highlights: [
      { label: { en: "Boiler", et: "Katel", ru: "Котёл" }, value: "Vaillant ecoTEC Plus 28 kW" },
      { label: { en: "Certificate", et: "Sertifikaat", ru: "Сертификат" }, value: "Yes / Jah / Да" },
      { label: { en: "Duration", et: "Kestus", ru: "Срок" }, value: "1 day" },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────
function mkKey(prefix, i) {
  return `${prefix}_${i}_${Math.random().toString(36).slice(2, 6)}`;
}

// Map slugQuery → serviceType value from workProject schema
const SERVICE_TYPE_MAP = {
  torustiku: "plumbing",
  elektritood: "electrical",
  vannitoa: "bathroom",
  ehitustood: "construction",
  rekonstrueerimine: "renovation",
  disain: "design",
  blockage: "plumbing",
  gaas: "other",
};

// Slug suffix for each project
const SLUG_MAP = {
  torustiku: "pipe-replacement-kristiine",
  elektritood: "electrical-ulemiste",
  vannitoa: "bathroom-renovation-mustamae",
  ehitustood: "construction-lasnamae",
  rekonstrueerimine: "apartment-renovation-pohja-tallinn",
  disain: "interior-design-nomme",
  blockage: "drain-unblocking-haabersti",
  gaas: "gas-boiler-pirita",
};

async function main() {
  console.log(dryRun ? "🔍  DRY RUN\n" : `🚀  Creating/updating ${WORK_PROJECTS.length} work projects\n`);

  let created = 0, updated = 0, skipped = 0;

  for (const wp of WORK_PROJECTS) {
    const slug = SLUG_MAP[wp.slugQuery] ?? wp.slugQuery;
    process.stdout.write(`  [${slug}] ${wp.title.en.substring(0, 40)} ... `);

    if (dryRun) {
      console.log(`🔍  metaTitle EN [${wp.metaTitle.en.length}c] | desc [${wp.metaDescription.en.length}c]`);
      created++;
      continue;
    }

    // Check if document already exists by slug
    const existing = await client.fetch(
      `*[_type == "workProject" && slug.current == $slug][0]{ _id }`,
      { slug }
    );

    const doc = {
      _type: "workProject",
      slug: { _type: "slug", current: slug },
      title: wp.title,
      shortDescription: wp.shortDescription,
      serviceType: SERVICE_TYPE_MAP[wp.slugQuery] ?? "other",
      location: "Tallinn, Estonia",
      isPublished: true,
      order: Object.keys(SLUG_MAP).indexOf(wp.slugQuery) + 1,
      metaTitle: wp.metaTitle,
      metaDescription: wp.metaDescription,
      highlights: wp.highlights.map((h, i) => ({
        _type: "object",
        _key: mkKey("h", i),
        label: h.label,
        value: h.value,
      })),
    };

    if (existing?._id) {
      await client.patch(existing._id).set(doc).commit();
      updated++;
      console.log(`✅  updated (${existing._id})`);
    } else {
      const result = await client.create(doc);
      created++;
      console.log(`✅  created (${result._id})`);
    }
  }

  console.log(`\n✨  Done. Created: ${created}  |  Updated: ${updated}  |  Skipped: ${skipped}`);
}

main().catch(err => { console.error("💥 Fatal:", err.message); process.exit(1); });
