import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "xbk57s09",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const hl = (et, en, ru, value) => ({ label: { et, en, ru }, value });

const projects = [
  {
    _id: "work-bathroom-kristiine",
    _type: "workProject",
    order: 1,
    isPublished: true,
    serviceType: "bathroom",
    location: "Tallinn, Kristiine",
    completedAt: "2026-03-15T00:00:00.000Z",
    title: { et: "Vannitoa täisremont Kristiines", en: "Full Bathroom Renovation in Kristiine", ru: "Полный ремонт ванной в Кристийне" },
    slug: { _type: "slug", current: "vannitoa-remont-kristiine" },
    shortDescription: {
      et: "5 m² vannitoa täielik renoveerimine: uus hüdroisolatsioon, plaatimine, WC, dušinurk ja põrandaküte. Tööd kestsid 10 tööpäeva, 3-aastane garantii.",
      en: "Full 5 m² bathroom renovation: new waterproofing, tiling, toilet, walk-in shower and underfloor heating. Completed in 10 working days, 3-year warranty.",
      ru: "Полный ремонт ванной 5 м²: новая гидроизоляция, укладка плитки, унитаз, душевая и тёплый пол. Выполнено за 10 рабочих дней, гарантия 3 года.",
    },
    highlights: [
      hl("Pindala", "Area", "Площадь", "5 m²"),
      hl("Kestus", "Duration", "Срок", "10 tööpäeva"),
      hl("Garantii", "Warranty", "Гарантия", "3 aastat"),
      hl("Hüdroisolatsioon", "Waterproofing", "Гидроизоляция", "Sertifitseeritud"),
    ],
    metaTitle: { et: "Vannitoa remont Kristiines — TorudeAbi24", en: "Bathroom Renovation Kristiine — TorudeAbi24", ru: "Ремонт ванной Кристийне — TorudeAbi24" },
    metaDescription: {
      et: "Täielik vannitoa renoveerimine Kristiines: hüdroisolatsioon, plaatimine, dušinurk ja põrandaküte. 3-aastane garantii. TorudeAbi24 — sertifitseeritud meistrid Tallinnas.",
      en: "Full bathroom renovation in Kristiine: waterproofing, tiling, walk-in shower and underfloor heating. 3-year warranty. TorudeAbi24 — certified renovators in Tallinn.",
      ru: "Полный ремонт ванной в Кристийне: гидроизоляция, плитка, душевая и тёплый пол. Гарантия 3 года. TorudeAbi24 — сертифицированные мастера в Таллине.",
    },
  },
  {
    _id: "work-plumbing-lasnamae",
    _type: "workProject",
    order: 2,
    isPublished: true,
    serviceType: "plumbing",
    location: "Tallinn, Lasnamäe",
    completedAt: "2026-02-20T00:00:00.000Z",
    title: { et: "Torustiku täielik vahetus Lasnamäel", en: "Full Plumbing Replacement in Lasnamäe", ru: "Полная замена трубопровода на Ласнамяэ" },
    slug: { _type: "slug", current: "torustik-lasnamae" },
    shortDescription: {
      et: "3-toalise korteri kõikide vee- ja kanalisatsioonitorude vahetus. Vananenud teras- ja pliiktorud asendati kaasaegse PPR torustikuga. Tööd kestsid 2 tööpäeva.",
      en: "Full water supply and drainage pipe replacement in a 3-room apartment. Old steel and lead pipes replaced with modern PPR piping. Completed in 2 working days.",
      ru: "Полная замена труб водоснабжения и канализации в 3-комнатной квартире. Старые стальные и свинцовые трубы заменены современными PPR. Выполнено за 2 рабочих дня.",
    },
    highlights: [
      hl("Toru materjal", "Pipe material", "Материал труб", "PPR"),
      hl("Korter", "Apartment", "Квартира", "3 tuba"),
      hl("Kestus", "Duration", "Срок", "2 tööpäeva"),
      hl("Veesurvemõõtmine", "Pressure test", "Опрессовка", "Tehtud"),
    ],
    metaTitle: { et: "Torustiku vahetus Lasnamäel — TorudeAbi24", en: "Plumbing Replacement Lasnamäe — TorudeAbi24", ru: "Замена труб Ласнамяэ — TorudeAbi24" },
    metaDescription: {
      et: "Torustiku täielik vahetus Lasnamäel: PPR torustik, survetest ja garantii 2 aastat. TorudeAbi24 — sertifitseeritud toruseppad Tallinnas.",
      en: "Full plumbing replacement in Lasnamäe: PPR piping, pressure test and 2-year warranty. TorudeAbi24 — certified plumbers in Tallinn.",
      ru: "Полная замена трубопровода на Ласнамяэ: PPR трубы, опрессовка и гарантия 2 года. TorudeAbi24 — сертифицированные сантехники в Таллине.",
    },
  },
  {
    _id: "work-electrical-mustamae",
    _type: "workProject",
    order: 3,
    isPublished: true,
    serviceType: "electrical",
    location: "Tallinn, Mustamäe",
    completedAt: "2026-01-10T00:00:00.000Z",
    title: { et: "Elektrisüsteemi täisuuendus Mustamäel", en: "Full Electrical Upgrade in Mustamäe", ru: "Полная модернизация электрики на Мустамяэ" },
    slug: { _type: "slug", current: "elekter-mustamae" },
    shortDescription: {
      et: "Nõukogudeaegse alumiiniumjuhtmestiku asendamine vaskjuhtmetega, uue kaitsekasti paigaldus RCD kaitsega ja valgustuse täisuuendus. Kõik tööd EVS 812 kohaselt.",
      en: "Replacement of Soviet-era aluminium wiring with copper, new consumer unit with RCD protection, and full lighting upgrade. All work to EVS 812 standard.",
      ru: "Замена советской алюминиевой проводки на медную, установка нового щитка с УЗО и полная модернизация освещения. Все работы по стандарту EVS 812.",
    },
    highlights: [
      hl("Juhtmestik", "Wiring", "Проводка", "Vask"),
      hl("RCD kaitse", "RCD protection", "УЗО", "Paigaldatud"),
      hl("Standard", "Standard", "Стандарт", "EVS 812"),
      hl("Garantii", "Warranty", "Гарантия", "2 aastat"),
    ],
    metaTitle: { et: "Elektritööd Mustamäel — TorudeAbi24", en: "Electrical Works Mustamäe — TorudeAbi24", ru: "Электромонтаж Мустамяэ — TorudeAbi24" },
    metaDescription: {
      et: "Alumiiniumjuhtmestiku vahetus vaskjuhtmetega, uus kaitsekast RCD kaitsega Mustamäel. EVS 812 standard, 2-aastane garantii. TorudeAbi24 sertifitseeritud elektrikud.",
      en: "Aluminium to copper wiring replacement, new RCD consumer unit in Mustamäe. EVS 812 certified, 2-year warranty. TorudeAbi24 licensed electricians.",
      ru: "Замена алюминиевой проводки на медную, новый щиток с УЗО на Мустамяэ. Стандарт EVS 812, гарантия 2 года. Лицензированные электрики TorudeAbi24.",
    },
  },
  {
    _id: "work-renovation-põhja-tallinn",
    _type: "workProject",
    order: 4,
    isPublished: true,
    serviceType: "renovation",
    location: "Tallinn, Põhja-Tallinn",
    completedAt: "2025-12-05T00:00:00.000Z",
    title: { et: "Korteri kompleksremont Põhja-Tallinnas", en: "Full Apartment Renovation in Põhja-Tallinn", ru: "Комплексный ремонт квартиры в Пыхья-Таллинне" },
    slug: { _type: "slug", current: "korteri-remont-pohja-tallinn" },
    shortDescription: {
      et: "65 m² korteri täielik renoveerimine: kips, parkett, uueduksed, vannituba, köök ja elekter. Projekt valmis 4 nädalaga, võtmed kätte.",
      en: "Full renovation of 65 m² apartment: plastering, parquet, new doors, bathroom, kitchen and electrical. Project completed in 4 weeks, turnkey.",
      ru: "Полный ремонт квартиры 65 м²: штукатурка, паркет, новые двери, ванная, кухня и электрика. Проект выполнен за 4 недели, под ключ.",
    },
    highlights: [
      hl("Pindala", "Area", "Площадь", "65 m²"),
      hl("Kestus", "Duration", "Срок", "4 nädalat"),
      hl("Formaat", "Format", "Формат", "Võtmed kätte"),
      hl("Toad", "Rooms", "Комнаты", "3 tuba + vannituba"),
    ],
    metaTitle: { et: "Korteri remont Põhja-Tallinnas — TorudeAbi24", en: "Apartment Renovation Põhja-Tallinn — TorudeAbi24", ru: "Ремонт квартиры Пыхья-Таллинн — TorudeAbi24" },
    metaDescription: {
      et: "65 m² korteri täielik remont Põhja-Tallinnas: kips, parkett, vannituba, köök ja elekter. Võtmed kätte, 4 nädalaga. TorudeAbi24 — usaldusväärne remondifirma Tallinnas.",
      en: "Full 65 m² apartment renovation in Põhja-Tallinn: plastering, parquet, bathroom, kitchen and electrical. Turnkey in 4 weeks. TorudeAbi24 — trusted renovators in Tallinn.",
      ru: "Полный ремонт квартиры 65 м² в Пыхья-Таллинне: штукатурка, паркет, ванная, кухня, электрика. Под ключ за 4 недели. TorudeAbi24 — надёжная ремонтная компания.",
    },
  },
  {
    _id: "work-boiler-kesklinn",
    _type: "workProject",
    order: 5,
    isPublished: true,
    serviceType: "plumbing",
    location: "Tallinn, Kesklinn",
    completedAt: "2025-11-18T00:00:00.000Z",
    title: { et: "Katla paigaldus ja boileri vahetus Kesklinnas", en: "Boiler Installation and Replacement in Kesklinn", ru: "Установка котла и замена бойлера в Кесклинне" },
    slug: { _type: "slug", current: "katel-boiler-kesklinn" },
    shortDescription: {
      et: "Vana 150L boileri vahetus uue energiasäästliku 200L seadmega ning küttekatla hooldus ja paigaldus. Tööd kestsid 1 tööpäeva, sama päeva teenindus.",
      en: "Old 150L boiler replaced with new energy-efficient 200L unit and heating boiler serviced and installed. Work completed in 1 day, same-day service.",
      ru: "Замена старого бойлера 150 л на новый энергоэффективный 200 л и обслуживание котла отопления. Работы выполнены за 1 день, обслуживание в день обращения.",
    },
    highlights: [
      hl("Uus boiler", "New boiler", "Новый бойлер", "200 L"),
      hl("Energiaklass", "Energy class", "Класс энергии", "A+"),
      hl("Kestus", "Duration", "Срок", "1 tööpäev"),
      hl("Teenindus", "Service", "Обслуживание", "Samal päeval"),
    ],
    metaTitle: { et: "Katla paigaldus Tallinnas — TorudeAbi24", en: "Boiler Installation Tallinn — TorudeAbi24", ru: "Установка котла Таллинн — TorudeAbi24" },
    metaDescription: {
      et: "Boileri ja katla vahetus Tallinnas samal päeval. Energiasäästlikud A+ seadmed, 2-aastane garantii. TorudeAbi24 sertifitseeritud santehnikud.",
      en: "Boiler and heating system replacement in Tallinn on the same day. Energy-efficient A+ units, 2-year warranty. TorudeAbi24 certified plumbers.",
      ru: "Замена бойлера и котла в Таллине в день обращения. Энергоэффективные устройства класса A+, гарантия 2 года. Сертифицированные сантехники TorudeAbi24.",
    },
  },
  {
    _id: "work-gas-pirita",
    _type: "workProject",
    order: 6,
    isPublished: true,
    serviceType: "gas",
    location: "Tallinn, Pirita",
    completedAt: "2025-10-22T00:00:00.000Z",
    title: { et: "Gaasikatla paigaldus ja gaasitorustik Pirital", en: "Gas Boiler Installation and Gas Piping in Pirita", ru: "Установка газового котла и газопровода в Пирита" },
    slug: { _type: "slug", current: "gaas-pirita" },
    shortDescription: {
      et: "Kondensatsioonsegaasikatla paigaldus eramajas: gaasitorustik, põletid, automaatika ja korstnapühkimine. Kõik tööd Gaasiseaduse nõuete kohaselt.",
      en: "Condensing gas boiler installation in a private house: gas piping, burners, automation and chimney sweep. All work to Gaasiseadus requirements.",
      ru: "Установка конденсационного газового котла в частном доме: газопровод, горелки, автоматика и чистка дымохода. Все работы по требованиям Gaasiseadus.",
    },
    highlights: [
      hl("Katla tüüp", "Boiler type", "Тип котла", "Kondensatsioonsegaas"),
      hl("Efektiivsus", "Efficiency", "КПД", "98%"),
      hl("Sertifikaat", "Certificate", "Сертификат", "Gaasiseadus"),
      hl("Garantii", "Warranty", "Гарантия", "2 aastat"),
    ],
    metaTitle: { et: "Gaasikatla paigaldus Tallinnas — TorudeAbi24", en: "Gas Boiler Installation Tallinn — TorudeAbi24", ru: "Газовый котёл Таллинн — TorudeAbi24" },
    metaDescription: {
      et: "Gaasikatla ja gaasitorustiku paigaldus Tallinnas. Gaasiseaduse nõuetekohane paigaldus, 2-aastane garantii. TorudeAbi24 sertifitseeritud gaasimeistrid.",
      en: "Gas boiler and gas piping installation in Tallinn. Compliant with Gaasiseadus, 2-year warranty. TorudeAbi24 certified gas engineers.",
      ru: "Установка газового котла и газопровода в Таллине. Соответствует Gaasiseadus, гарантия 2 года. Сертифицированные газовые инженеры TorudeAbi24.",
    },
  },
  {
    _id: "work-construction-haabersti",
    _type: "workProject",
    order: 7,
    isPublished: true,
    serviceType: "construction",
    location: "Tallinn, Haabersti",
    completedAt: "2025-09-30T00:00:00.000Z",
    title: { et: "Vahesein ja ehitustööd Haaberstis", en: "Partition Wall and Construction Works in Haabersti", ru: "Перегородка и строительные работы в Хааберсти" },
    slug: { _type: "slug", current: "ehitus-haabersti" },
    shortDescription: {
      et: "Korteri ümberplaneerimine: 2 kipsvahesein, põrandate tasoitus, parkett ja lae viimistlus. 90 m² projekt valmis 1 nädalaga.",
      en: "Apartment replanning: 2 plasterboard partition walls, floor levelling, parquet and ceiling finishing. 90 m² project completed in 1 week.",
      ru: "Перепланировка квартиры: 2 гипсокартонные перегородки, выравнивание полов, паркет и отделка потолка. Проект 90 м² выполнен за 1 неделю.",
    },
    highlights: [
      hl("Pindala", "Area", "Площадь", "90 m²"),
      hl("Vaheseinad", "Partitions", "Перегородки", "2 tk"),
      hl("Põrand", "Floor", "Пол", "Parkett"),
      hl("Kestus", "Duration", "Срок", "1 nädal"),
    ],
    metaTitle: { et: "Ehitustööd Haaberstis — TorudeAbi24", en: "Construction Works Haabersti — TorudeAbi24", ru: "Строительные работы Хааберсти — TorudeAbi24" },
    metaDescription: {
      et: "Vaheseinad, põranda tasoitus ja parkett Haaberstis. 90 m² projekt, 1 nädalaga valmis. TorudeAbi24 — kiire ja kvaliteetne ehitusfirma Tallinnas.",
      en: "Partition walls, floor levelling and parquet in Haabersti. 90 m² project in 1 week. TorudeAbi24 — fast and quality construction company in Tallinn.",
      ru: "Перегородки, выравнивание полов и паркет в Хааберсти. Проект 90 м² за 1 неделю. TorudeAbi24 — быстрая и качественная строительная компания Таллина.",
    },
  },
  {
    _id: "work-cleaning-nomme",
    _type: "workProject",
    order: 8,
    isPublished: true,
    serviceType: "cleaning",
    location: "Tallinn, Nõmme",
    completedAt: "2025-08-14T00:00:00.000Z",
    title: { et: "Ehitusjärgne puhastus Nõmmel", en: "Post-Construction Cleaning in Nõmme", ru: "Уборка после ремонта на Нымме" },
    slug: { _type: "slug", current: "puhastus-nomme" },
    shortDescription: {
      et: "120 m² maja ehitusjärgne süvapuhastus: krohvitolm, värviplekkid, aknad, põrandad ja sanitaartehnika. Kõik tööd ühel päeval.",
      en: "Post-construction deep clean of 120 m² house: plaster dust, paint stains, windows, floors and sanitary ware. All work completed in one day.",
      ru: "Генеральная уборка после ремонта дома 120 м²: штукатурная пыль, краска, окна, полы и сантехника. Все работы выполнены за один день.",
    },
    highlights: [
      hl("Pindala", "Area", "Площадь", "120 m²"),
      hl("Kestus", "Duration", "Срок", "1 tööpäev"),
      hl("Puhastus", "Clean type", "Тип уборки", "Süvapuhastus"),
      hl("Tulemus", "Result", "Результат", "Sissekolimiseks valmis"),
    ],
    metaTitle: { et: "Ehitusjärgne puhastus Tallinnas — TorudeAbi24", en: "Post-Construction Cleaning Tallinn — TorudeAbi24", ru: "Уборка после ремонта Таллинн — TorudeAbi24" },
    metaDescription: {
      et: "Ehitusjärgne süvapuhastus Tallinnas. 120 m² ühel päeval, sissekolimiseks valmis. TorudeAbi24 — professionaalne koristusteenus Tallinnas ja Harjumaal.",
      en: "Post-construction deep cleaning in Tallinn. 120 m² in one day, move-in ready. TorudeAbi24 — professional cleaning service in Tallinn and Harjumaa.",
      ru: "Генеральная уборка после ремонта в Таллине. 120 м² за один день, готово к заселению. TorudeAbi24 — профессиональный клининг в Таллине и Харьюмаа.",
    },
  },
];

async function main() {
  // Delete existing
  const existing = await client.fetch('*[_type == "workProject"]._id');
  console.log(`🗑  Deleting ${existing.length} existing work projects...`);
  if (existing.length > 0) {
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  // Create new
  console.log(`\n✍️  Creating ${projects.length} SEO-perfect work projects...\n`);
  for (const p of projects) {
    await client.createOrReplace(p);
    console.log(`   ✅ [${p.serviceType}] ${p.title.en} — ${p.location}`);
  }

  console.log(`\n🎉 Done! ${projects.length} work projects live in Sanity.`);
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
