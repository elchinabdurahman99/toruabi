/**
 * scripts/patch-service-seo.mjs
 *
 * Patches ALL 48 service documents in Sanity with:
 *  - image.alt  (localeString: et, en, ru)
 *  - metaTitle  (localeString: et, en, ru)
 *  - metaDescription (localeText: et, en, ru)
 *
 * Only writes fields that are currently empty/null — existing values are kept.
 * To force-overwrite everything, set FORCE=1 in the environment.
 *
 * Run:
 *   node --env-file=.env.local scripts/patch-service-seo.mjs
 *   FORCE=1 node --env-file=.env.local scripts/patch-service-seo.mjs
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token     = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const FORCE     = process.env.FORCE === "1";

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const ls = (et, en, ru) => ({ _type: "localeString", et, en, ru });
const lt = (et, en, ru) => ({ _type: "localeText",   et, en, ru });

// ── SEO data for all 48 services ──────────────────────────────────────────────
// Format: [slug, imageAlt{et,en,ru}, metaTitle{et,en,ru}, metaDesc{et,en,ru}]

const SERVICES = [

  // ── Cat 1: Plumbing (13) ────────────────────────────────────────────────────

  {
    slug: "plumber-24h-tallinn",
    alt: ls(
      "Avariitorumees Tallinnas remondib veetoru – TorudeAbi24",
      "Emergency plumber repairing a water pipe in Tallinn – TorudeAbi24",
      "Аварийный сантехник ремонтирует трубу в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Avariitorumees Tallinn 24/7 – 30 min reageerimin", "Emergency Plumber Tallinn 24/7 – 30 min Response", "Аварийный сантехник Таллин 24/7 – выезд 30 мин"
    ),
    metaDesc: lt(
      "Avariitorumees Tallinnas ööpäevaringselt. Purunenud torud, leke, üleujutus – saabume 30–60 minutiga. Sertifitseeritud tehnikud, garantii, tasuta hinnapakkumine.",
      "Emergency plumber in Tallinn 24/7. Burst pipes, leaks, flooding – we arrive in 30–60 min. Certified, warranty, free quote. Call +372 56 89 79 29",
      "Аварийный сантехник Таллин 24/7. Прорыв труб, течь, затопление – приезжаем за 30–60 мин. Сертификат, гарантия, бесплатная смета. +372 56 89 79 29"
    ),
  },

  {
    slug: "plumbing-works-tallinn",
    alt: ls(
      "Torumees paigaldab PP-torusid Tallinna korteris – TorudeAbi24",
      "Plumber installing PP pipes in a Tallinn apartment – TorudeAbi24",
      "Сантехник монтирует PP-трубы в квартире в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Torutööd Tallinnas – vask, PP, PE torud,", "Plumbing Works Tallinn – Copper, PP, PE Pipes,", "Сантехнические работы Таллин – медь, PP, PE"
    ),
    metaDesc: lt(
      "Professionaalsed torutööd Tallinnas: vask, PP, PE torud, veevarustus, kanalisatsioon. Sertifitseeritud torumees, kirjalik garantii, tasuta hinnapakkumine.",
      "Professional plumbing works in Tallinn: copper, PP, PE pipes, water supply, drainage. Certified plumber, written warranty, free quote.",
      "Профессиональные сантехнические работы в Таллине: медь, PP, PE, водоснабжение, канализация. Сертификат, гарантия, бесплатная смета."
    ),
  },

  {
    slug: "pipe-repair-replacement",
    alt: ls(
      "Torude remont ja asendamine – leke kõrvaldatakse Tallinnas – TorudeAbi24",
      "Pipe repair and replacement – fixing a leak in Tallinn – TorudeAbi24",
      "Ремонт и замена труб – устранение течи в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Torude remont ja asendamine Tallinn", "Pipe Repair & Replacement Tallinn", "Ремонт и замена труб Таллин"
    ),
    metaDesc: lt(
      "Torude remont, asendamine ja leketõrje Tallinnas ja Harjumaal. Kõik materjalid: vasktorud, PP, PVC. Kiire reageerimine, garantii.",
      "Pipe repair, replacement and leak fixing in Tallinn and Harjumaa. All materials: copper, PP, PVC. Fast response, warranty.",
      "Ремонт, замена труб и устранение протечек в Таллине и Харьюмаа. Все материалы: медь, PP, PVC. Быстрый выезд, гарантия."
    ),
  },

  {
    slug: "toilet-installation",
    alt: ls(
      "WC-poti paigaldus vannitoas Tallinnas – TorudeAbi24",
      "Toilet installation in a Tallinn bathroom – TorudeAbi24",
      "Установка унитаза в ванной в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "WC paigaldus Tallinn – kõik brändid, sama päev", "Toilet Installation Tallinn – All Brands, Same", "Установка унитаза Таллин – все бренды, в тот же"
    ),
    metaDesc: lt(
      "WC-poti ja tsistern paigaldus Tallinnas. Kõik brändid: Roca, Grohe, Villeroy & Boch. Sama päev, garantii, tasuta hinnapakkumine.",
      "Toilet and cistern installation in Tallinn. All brands: Roca, Grohe, Villeroy & Boch. Same-day service, warranty, free quote.",
      "Установка унитаза и бачка в Таллине. Все бренды: Roca, Grohe, Villeroy & Boch. В тот же день, гарантия, бесплатная смета."
    ),
  },

  {
    slug: "water-meter-replacement",
    alt: ls(
      "Veearvestite vahetus – sertifitseeritud torumees Tallinnas – TorudeAbi24",
      "Water meter replacement – certified plumber in Tallinn – TorudeAbi24",
      "Замена счётчиков воды – сертифицированный сантехник в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Veearvestite vahetus Tallinn – pitseerimine,", "Water Meter Replacement Tallinn – Sealing &", "Замена счётчиков воды Таллин – пломбировка,"
    ),
    metaDesc: lt(
      "Veearvestite vahetus ja pitseerimine Tallinnas. Kõik tüübid, kohaliku omavalitsuse nõuetele vastavus, dokumendid väljastame.",
      "Water meter replacement and sealing in Tallinn. All types, compliant with local regulations, documentation provided.",
      "Замена и пломбировка счётчиков воды в квартирах Таллина. Все типы счётчиков, официальная документация, соответствие нормам. Быстрый выезд."
    ),
  },

  {
    slug: "boiler-installation",
    alt: ls(
      "Boileri paigaldus vannitoas – elektriline boiler Tallinnas – TorudeAbi24",
      "Electric boiler installation in a Tallinn bathroom – TorudeAbi24",
      "Установка бойлера в ванной в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Boileri paigaldus Tallinn – elektriline ja", "Boiler Installation Tallinn – Electric & Gas", "Установка бойлера Таллин – электрический и"
    ),
    metaDesc: lt(
      "Boileri paigaldus ja hooldus Tallinnas: elektrilised ja gaasboilerid, kõik brändid. Sertifitseeritud, garantii, kiire teenindus.",
      "Boiler installation and maintenance in Tallinn: electric and gas boilers, all brands. Certified, warranty, fast service.",
      "Установка и обслуживание бойлеров в Таллине: электрические и газовые, все бренды. Сертификат, гарантия, быстрый сервис."
    ),
  },

  {
    slug: "blockage-clearing",
    alt: ls(
      "Ummistuse likvideerimine kanalisatsioonitorus Tallinnas – TorudeAbi24",
      "Drain blockage clearing in a Tallinn sewer pipe – TorudeAbi24",
      "Устранение засора в канализационной трубе в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Ummistuse likvideerimine Tallinn – kiire", "Drain Blockage Clearing Tallinn – Fast Solution", "Устранение засора канализации Таллин – быстро"
    ),
    metaDesc: lt(
      "Kanalisatsiooni ja torude ummistuse likvideerimine Tallinnas: mehaaniline ja hüdrodünaamiline puhastus, videodiagnostika. Kiire reageerimine.",
      "Drain and pipe blockage clearing in Tallinn: mechanical and hydro-jetting, video diagnostics. Fast response.",
      "Устранение засоров труб и канализации в Таллине: механическая и гидродинамическая прочистка, видеодиагностика. Быстрый выезд."
    ),
  },

  {
    slug: "defrosting-pipes",
    alt: ls(
      "Külmunud torude sulatus – spetsiaalne seade Tallinnas – TorudeAbi24",
      "Frozen pipe defrosting with specialist equipment in Tallinn – TorudeAbi24",
      "Разморозка замёрзших труб специальным оборудованием в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Torude sulatus Tallinn – külmunud torud", "Pipe Defrosting Tallinn – Frozen Pipes Restored", "Разморозка труб Таллин – восстановим замёрзшие"
    ),
    metaDesc: lt(
      "Külmunud torude sulatus Tallinnas ja Harjumaal. Spetsiaalne soojendusseade, kahjustuste vältimine. Kiire reageerimine talvel.",
      "Frozen pipe defrosting in Tallinn and Harjumaa. Specialist heating equipment, damage prevention. Fast winter response.",
      "Разморозка замёрзших труб в Таллине и Харьюмаа. Специальное нагревательное оборудование, без повреждений. Быстрый зимний выезд."
    ),
  },

  {
    slug: "pipe-freezing",
    alt: ls(
      "Torude külmutamine – toru lõikamine ilma vett tühjendamata – TorudeAbi24",
      "Pipe freezing – cutting a pipe without draining the system – TorudeAbi24",
      "Заморозка труб – врезка без слива системы – TorudeAbi24"
    ),
    metaTitle: ls(
      "Torude külmutamine Tallinn – töö ilma vett", "Pipe Freezing Tallinn – Work Without Draining", "Заморозка труб Таллин – работа без слива воды"
    ),
    metaDesc: lt(
      "Torude külmutamine Tallinnas: töötame torustikul ilma kogu süsteemi tühjendamata. Kiire ja ohutu lahendus remondiks.",
      "Pipe freezing in Tallinn: we work on pipework without draining the entire system. Fast and safe repair solution.",
      "Заморозка труб в Таллине: работаем на трубопроводе без слива всей системы. Быстрое и безопасное решение для ремонта."
    ),
  },

  {
    slug: "polyethylene-welding",
    alt: ls(
      "Polüetüleentorude keevitamine – PE toruühendus Tallinnas – TorudeAbi24",
      "Polyethylene pipe welding – PE pipe connection in Tallinn – TorudeAbi24",
      "Сварка полиэтиленовых труб – соединение PE труб в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Polüetüleentorude keevitamine Tallinn", "Polyethylene Pipe Welding Tallinn", "Сварка полиэтиленовых труб Таллин"
    ),
    metaDesc: lt(
      "PE torude keevitamine ja survetorusüsteemide paigaldus Tallinnas. Sertifitseeritud keevitajad, kõrgsurve testimine, garantii.",
      "PE pipe welding and pressure network installation in Tallinn. Certified welders, high-pressure testing, warranty.",
      "Сварка PE труб и монтаж напорных сетей в Таллине. Сертифицированные сварщики, испытание давлением, гарантия."
    ),
  },

  {
    slug: "floor-heating",
    alt: ls(
      "Põrandakütte paigaldus – kütteelemendid betoonpõrandas Tallinnas – TorudeAbi24",
      "Underfloor heating installation – heating elements in concrete floor Tallinn – TorudeAbi24",
      "Монтаж тёплого пола – нагревательные элементы в бетонном полу Таллин – TorudeAbi24"
    ),
    metaTitle: ls(
      "Põrandakütte paigaldus Tallinn – vesi ja", "Underfloor Heating Installation Tallinn – Water", "Установка тёплого пола Таллин – водяной и"
    ),
    metaDesc: lt(
      "Põrandakütte paigaldus Tallinnas: vesipõrand ja elektriline süsteem, lekete tuvastamine, garantii. Kõik ruumitüübid.",
      "Underfloor heating installation in Tallinn: water and electric systems, leak detection, warranty. All room types.",
      "Монтаж тёплого пола в Таллине: водяной и электрический, обнаружение утечек, гарантия. Все типы помещений."
    ),
  },

  {
    slug: "replacement-risers",
    alt: ls(
      "Stiiakite vahetus – vertikaalsed torud kortermaja keldris Tallinnas – TorudeAbi24",
      "Riser replacement – vertical pipes in apartment building basement Tallinn – TorudeAbi24",
      "Замена стояков – вертикальные трубы в подвале многоквартирного дома Таллин – TorudeAbi24"
    ),
    metaTitle: ls(
      "Stiiakite vahetus Tallinn – küte ja kanalisatsio", "Riser Replacement Tallinn – Heating & Sewage", "Замена стояков Таллин – отопление и канализация"
    ),
    metaDesc: lt(
      "Kütte- ja kanalisatsioonistiiakite vahetus Tallinnas kortermajades. Töötame ilma pikaajalise veekatkestuseta, garantii.",
      "Heating and sewage riser replacement in Tallinn apartment buildings. We work with minimal water interruption, warranty.",
      "Замена стояков отопления и канализации в многоквартирных домах Таллина. Минимальное отключение воды, гарантия."
    ),
  },

  {
    slug: "radiator-installation",
    alt: ls(
      "Radiaatori paigaldus – kütteradiaator paigaldatakse korterisse Tallinnas – TorudeAbi24",
      "Radiator installation – heating radiator being installed in Tallinn apartment – TorudeAbi24",
      "Установка радиатора – монтаж радиатора отопления в квартире Таллина – TorudeAbi24"
    ),
    metaTitle: ls(
      "Radiaatorite paigaldus ja vahetus Tallinn", "Radiator Installation & Replacement Tallinn", "Установка и замена радиаторов Таллин"
    ),
    metaDesc: lt(
      "Kütteradiaatorite paigaldus ja vahetus Tallinnas: alumiinium, teras, malm. Kõik brändid, garantii, kiire teenindus.",
      "Heating radiator installation and replacement in Tallinn: aluminium, steel, cast iron. All brands, warranty, fast service.",
      "Установка и замена радиаторов отопления в Таллине: алюминий, сталь, чугун. Все бренды, гарантия, быстрый сервис."
    ),
  },

  // ── Cat 2: Pressure Washing (3) ─────────────────────────────────────────────

  {
    slug: "pressure-flushing-sewer",
    alt: ls(
      "Survepesur puhastab kanalisatsioonitoru – hüdrodünaamiline pesu Tallinnas – TorudeAbi24",
      "Pressure jet cleaning a sewer pipe – hydro-jetting in Tallinn – TorudeAbi24",
      "Гидродинамическая промывка канализационной трубы в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Survepesu Tallinn – kanalisatsiooni puhastus", "Pressure Flushing Tallinn – Sewer Cleaning with", "Промывка канализации Таллин – гидродинамическая"
    ),
    metaDesc: lt(
      "Kanalisatsiooni kõrgsurvepesu Tallinnas: rasvaummistused, juuristik, setted. Spetsiaalautoga, kiire reageerimine.",
      "High-pressure sewer cleaning in Tallinn: grease blockages, root ingress, sludge. Specialist vehicle, fast response.",
      "Гидродинамическая промывка канализации в Таллине: жировые пробки, корни, осадок. Спецавтомобиль, быстрый выезд."
    ),
  },

  {
    slug: "sewerage-video-inspection",
    alt: ls(
      "Kanalisatsiooni videoinspektion – kaamerapea torus Tallinnas – TorudeAbi24",
      "Sewage video inspection – camera head inside a pipe in Tallinn – TorudeAbi24",
      "Видеоинспекция канализации – камера в трубе в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Kanalisatsiooni videoinspektion Tallinn", "Sewerage Video Inspection Tallinn", "Видеоинспекция канализации Таллин"
    ),
    metaDesc: lt(
      "Kanalisatsioonitoru videoinspektion Tallinnas: ummistuste, kahjustuste ja juuristiku tuvastamine. Aruanne koos videoga.",
      "Sewerage video inspection in Tallinn: detecting blockages, damage, root ingress. Report with video recording.",
      "Видеодиагностика канализации в Таллине: обнаружение засоров, трещин и корней. Профессиональная CCTV-инспекция, подробный отчёт с видео."
    ),
  },

  {
    slug: "sewer-jetting-and-septic-pumping-tallinn",
    alt: ls(
      "Kogumiskaev tühjendatakse – fekaaltranspordi auto Tallinnas – TorudeAbi24",
      "Cesspool emptying – sewage tanker vehicle in Tallinn – TorudeAbi24",
      "Откачка выгребной ямы – ассенизаторская машина в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Kogumiskaev tühjendus ja septik Tallinn", "Cesspool Emptying & Septic Service Tallinn", "Откачка ямы и септика Таллин"
    ),
    metaDesc: lt(
      "Kogumiskaevude, septikute ja fekaaltankide tühjendus Tallinnas ja Harjumaal. Kiire väljasõit, nõuetekohane utiliseerimine.",
      "Cesspool, septic tank and sewage tank emptying in Tallinn and Harjumaa. Fast dispatch, proper disposal.",
      "Откачка выгребных ям, септиков и фекальных ёмкостей в Таллине и Харьюмаа. Быстрый выезд, утилизация по норме."
    ),
  },

  // ── Cat 3: Electrical (4) ───────────────────────────────────────────────────

  {
    slug: "electrician-services",
    alt: ls(
      "Elektrik paigaldab juhtmestikku Tallinna korteris – TorudeAbi24",
      "Electrician installing wiring in a Tallinn apartment – TorudeAbi24",
      "Электрик монтирует проводку в квартире в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Elektrik Tallinn – juhtmestik, kilbid, valgustus", "Electrician Tallinn – Wiring, Panels, Lighting", "Электрик Таллин – проводка, щиты, освещение"
    ),
    metaDesc: lt(
      "Sertifitseeritud elektrik Tallinnas: juhtmestiku paigaldus, kilpide uuendamine, valgustus, pistikupesad. 24/7 avariiabi, garantii.",
      "Certified electrician in Tallinn: wiring installation, panel upgrades, lighting, sockets. 24/7 emergency, warranty.",
      "Сертифицированный электрик в Таллине: монтаж проводки, замена щитов, освещение, розетки. Аварии 24/7, гарантия."
    ),
  },

  {
    slug: "switchboard-maintenance",
    alt: ls(
      "Elektrikilbi paigaldus – uus jaotuskast Tallinna majas – TorudeAbi24",
      "Electrical panel installation – new distribution board in Tallinn house – TorudeAbi24",
      "Установка электрощита – новый распределительный щит в доме Таллин – TorudeAbi24"
    ),
    metaTitle: ls(
      "Elektrikilpide paigaldus Tallinn – jaotuskastid", "Electrical Panel Installation Tallinn", "Установка электрощитов Таллин – распределительны"
    ),
    metaDesc: lt(
      "Elektrikilpide ja jaotuskastide paigaldus ja uuendamine Tallinnas. Kõik tüübid, vastavus normidele, kirjalik garantii.",
      "Electrical panel and distribution board installation and upgrades in Tallinn. All types, code compliant, written warranty.",
      "Установка и модернизация электрощитов и распределительных щитов в Таллине. Все типы, соответствие нормам, гарантия."
    ),
  },

  {
    slug: "lighting-installation",
    alt: ls(
      "LED-valgustite paigaldus – modernne valgustus köögis Tallinnas – TorudeAbi24",
      "LED lighting installation – modern kitchen lighting in Tallinn – TorudeAbi24",
      "Установка LED-светильников – современное освещение кухни в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Valgustite paigaldus Tallinn – LED, sise- ja", "Lighting Installation Tallinn – LED, Indoor &", "Установка освещения Таллин – LED, внутреннее и"
    ),
    metaDesc: lt(
      "Valgustite paigaldus Tallinnas: LED, laevalgusti, piluvalgusti, välisvalustus. Kiire paigaldus, garantii.",
      "Lighting installation in Tallinn: LED, ceiling fixtures, spotlights, exterior lighting. Fast installation, warranty.",
      "Установка освещения в Таллине: LED, потолочные светильники, споты, наружное освещение. Быстрый монтаж, гарантия."
    ),
  },

  {
    slug: "electrical-installation",
    alt: ls(
      "Pistikupesade ja lülitite paigaldus – elektrik töötab Tallinnas – TorudeAbi24",
      "Socket and switch installation – electrician working in Tallinn – TorudeAbi24",
      "Установка розеток и выключателей – электрик в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Pistikupesade paigaldus Tallinn – kõik tüübid", "Socket & Switch Installation Tallinn – All Types", "Установка розеток и выключателей Таллин"
    ),
    metaDesc: lt(
      "Pistikupesade, lülitite ja elektrisüsteemide paigaldus Tallinnas. Kõik brändid: Schneider, ABB, Legrand. Garantii.",
      "Socket, switch and electrical system installation in Tallinn. All brands: Schneider, ABB, Legrand. Warranty.",
      "Установка розеток, выключателей и электросистем в Таллине. Все бренды: Schneider, ABB, Legrand. Гарантия."
    ),
  },

  // ── Cat 4: Appliances & Handyman (6) ────────────────────────────────────────

  {
    slug: "appliance-repair",
    alt: ls(
      "Kodumasinate remont – tehnik remondib pesumasinat Tallinnas – TorudeAbi24",
      "Appliance repair – technician repairing a washing machine in Tallinn – TorudeAbi24",
      "Ремонт бытовой техники – мастер чинит стиральную машину в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Kodumasinate remont Tallinn – pesumasin,", "Appliance Repair Tallinn – Washing Machine,", "Ремонт бытовой техники Таллин – стиральная,"
    ),
    metaDesc: lt(
      "Kodumasinate remont ja paigaldus Tallinnas: pesumasin, nõudepesumasin, pliit, ahjud. Kiire, garantii.",
      "Appliance repair and installation in Tallinn: washing machine, dishwasher, cooker, ovens. Fast, warranty.",
      "Ремонт и установка бытовой техники в Таллине: стиральная, посудомоечная, плита, духовка. Быстро, гарантия."
    ),
  },

  {
    slug: "handyman-services",
    alt: ls(
      "Käsitöömees parandab korteris väikeseid rikkeid Tallinnas – TorudeAbi24",
      "Handyman fixing small repairs in a Tallinn apartment – TorudeAbi24",
      "Мастер на час устраняет мелкие поломки в квартире в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Käsitöömehe teenused Tallinn – väikeremont,", "Handyman Services Tallinn – Small Repairs,", "Мастер на час Таллин – мелкий ремонт, монтаж"
    ),
    metaDesc: lt(
      "Käsitöömehe teenused Tallinnas: väikremont, piltide riputamine, mööblikokkupanemine, uste seadistamine. Kiire, usaldusvääre.",
      "Handyman services in Tallinn: small repairs, picture hanging, furniture assembly, door adjustment. Fast, reliable.",
      "Услуги мастера на час в Таллине: мелкий ремонт, монтаж картин, сборка мебели, регулировка дверей. Быстро, надёжно."
    ),
  },

  {
    slug: "appliance-installation",
    alt: ls(
      "Pesumasina paigaldus vannitoas – torumees ühendab veevoolikuid Tallinnas – TorudeAbi24",
      "Washing machine installation – plumber connecting water hoses in Tallinn – TorudeAbi24",
      "Установка стиральной машины – сантехник подключает шланги в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Pesumasina paigaldus Tallinn – ühendus ja", "Washing Machine Installation Tallinn – Connectio", "Установка стиральной машины Таллин – подключение"
    ),
    metaDesc: lt(
      "Pesumasina paigaldus ja ühendamine Tallinnas: vesi, kanalisatsioon, elekter. Kõik brändid. Sama päev, garantii.",
      "Washing machine installation and connection in Tallinn: water, drainage, electricity. All brands. Same-day, warranty.",
      "Установка и подключение стиральной машины в Таллине: вода, канализация, электричество. Все бренды. В тот же день, гарантия."
    ),
  },

  {
    slug: "builtin-appliance-installation",
    alt: ls(
      "Nõudepesumasina paigaldus köögis Tallinnas – TorudeAbi24",
      "Dishwasher installation in a Tallinn kitchen – TorudeAbi24",
      "Установка посудомоечной машины на кухне в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Nõudepesumasina paigaldus Tallinn", "Dishwasher Installation Tallinn", "Установка посудомоечной машины Таллин"
    ),
    metaDesc: lt(
      "Nõudepesumasina paigaldus ja ühendamine Tallinnas. Vesi, kanalisatsioon, elekter, kõik brändid. Garantii.",
      "Dishwasher installation and connection in Tallinn. Water, drainage, electricity, all brands. Warranty.",
      "Установка и подключение посудомоечной машины в Таллине. Вода, канализация, электричество, все бренды. Гарантия."
    ),
  },

  {
    slug: "stove-oven-repair",
    alt: ls(
      "Pliidi ja ahju paigaldus köögis – professionaalne paigaldus Tallinnas – TorudeAbi24",
      "Cooker and oven installation in kitchen – professional fitting in Tallinn – TorudeAbi24",
      "Установка плиты и духовки на кухне – профессиональный монтаж в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Pliidi ja ahju paigaldus Tallinn – elekter ja", "Cooker & Oven Installation Tallinn – Electric &", "Установка плиты и духовки Таллин – электро и газ"
    ),
    metaDesc: lt(
      "Pliidi ja ahju paigaldus Tallinnas: elektriline ja gaas, kõik brändid. Sertifitseeritud, garantii, kiire.",
      "Cooker and oven installation in Tallinn: electric and gas models, all major brands. Certified plumber, same-day service available, 2-year warranty.",
      "Установка плиты и духовки в Таллине: электрическая и газовая, все бренды. Сертификат, гарантия, быстро."
    ),
  },

  {
    slug: "property-maintenance",
    alt: ls(
      "Mööbli kokkupanemine – käsitöömees koostab kapi Tallinnas – TorudeAbi24",
      "Furniture assembly – handyman assembling a wardrobe in Tallinn – TorudeAbi24",
      "Сборка мебели – мастер собирает шкаф в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Mööbli kokkupanemine Tallinn – IKEA ja teised", "Furniture Assembly Tallinn – IKEA & Other Brands", "Сборка мебели Таллин – IKEA и другие бренды"
    ),
    metaDesc: lt(
      "Mööbli kokkupanemine Tallinnas: IKEA, Jysk, Kika ja teised brändid. Kiire ja täpne paigaldus, samal päeval võimalik, garantii kogu Tallinnas.",
      "Furniture assembly in Tallinn: IKEA, Jysk, Kika and other brands. Fast and precise installation, same-day service available, guaranteed quality.",
      "Сборка мебели в Таллине: IKEA, Jysk, Kika и другие бренды. Быстрая и аккуратная сборка, возможен выезд в день обращения, гарантия качества."
    ),
  },

  // ── Cat 5: Gas Works (3) ────────────────────────────────────────────────────

  {
    slug: "gas-works",
    alt: ls(
      "Gaasitehnik kontrollib gaasiliini Tallinna majas – TorudeAbi24",
      "Gas technician inspecting a gas line in a Tallinn building – TorudeAbi24",
      "Газовый техник проверяет газопровод в здании Таллина – TorudeAbi24"
    ),
    metaTitle: ls(
      "Gaasitööd Tallinn – litsentseeritud gaasitehniku", "Gas Works Tallinn – Licensed Gas Technicians", "Газовые работы Таллин – лицензированные"
    ),
    metaDesc: lt(
      "Gaasitööd Tallinnas: gaasitorustiku paigaldus, remont, kontroll ja hooldus. Litsentseeritud tehnikud, ohutu, garantii.",
      "Gas works in Tallinn: gas line installation, repair, inspection and maintenance. Licensed technicians, safe, warranty.",
      "Газовые работы в Таллине: монтаж, ремонт, проверка и обслуживание газопроводов. Лицензия, безопасно, гарантия."
    ),
  },

  {
    slug: "gas-appliance-installation",
    alt: ls(
      "Gaasikatla paigaldus – technik ühendab gaasikatla Tallinnas – TorudeAbi24",
      "Gas boiler installation – technician connecting a gas boiler in Tallinn – TorudeAbi24",
      "Установка газового котла – техник подключает котёл в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Gaasikatla paigaldus Tallinn – Junkers, Bosch,", "Gas Boiler Installation Tallinn – Junkers,", "Установка газового котла Таллин – Junkers,"
    ),
    metaDesc: lt(
      "Gaasikatla paigaldus ja hooldus Tallinnas: Junkers, Bosch, Viessmann. Litsentseeritud gaasitehnikud, garantii.",
      "Gas boiler installation and servicing in Tallinn: Junkers, Bosch, Viessmann. Licensed gas technicians, warranty.",
      "Установка и техническое обслуживание газовых котлов в Таллине: Junkers, Bosch, Viessmann. Лицензированные газовики, гарантия 2 года, документы."
    ),
  },

  {
    slug: "gas-pipeline-construction",
    alt: ls(
      "Gaasijuhtme paigaldus – torumees paigaldab gaasitoru majas – TorudeAbi24",
      "Gas line installation – plumber laying gas pipe in a building – TorudeAbi24",
      "Прокладка газопровода – монтаж газовой трубы в здании – TorudeAbi24"
    ),
    metaTitle: ls(
      "Gaasijuhtme paigaldus Tallinn", "Gas Line Installation Tallinn", "Прокладка газопровода Таллин"
    ),
    metaDesc: lt(
      "Gaasijuhtmete paigaldus ja ühendamine Tallinnas vastavalt kehtivatele normidele. Litsentseeritud, ohutu, garantii.",
      "Gas line installation and connection in Tallinn in accordance with current regulations. Licensed, safe, warranty.",
      "Прокладка и подключение газовых труб в Таллине по действующим нормам. Лицензия, безопасно, гарантия."
    ),
  },

  // ── Cat 6: Interior Renovation (6) ──────────────────────────────────────────

  {
    slug: "bathroom-repair",
    alt: ls(
      "Vannitoa täisremont – plaatimistööd ja sanitaartehnika Tallinnas – TorudeAbi24",
      "Full bathroom renovation – tiling and sanitary fittings in Tallinn – TorudeAbi24",
      "Полный ремонт ванной – плитка и сантехника в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Vannitoa remont Tallinn – täisremont võtmed", "Bathroom Renovation Tallinn – Full Remodel", "Ремонт ванной Таллин – полный ремонт под ключ"
    ),
    metaDesc: lt(
      "Vannitoa täisremont Tallinnas: plaatimine, santehnilised tööd, soe põrand, ventilatsioon, garantii. Tasuta hinnapakkumine.",
      "Full bathroom renovation in Tallinn: tiling, plumbing, underfloor heating, ventilation, warranty. Free quote.",
      "Полный ремонт ванной в Таллине: плитка, сантехника, тёплый пол, вентиляция, гарантия. Бесплатная смета."
    ),
  },

  {
    slug: "apartment-office-repair",
    alt: ls(
      "Korteri täisremont – viimistlustööd uues ruumis Tallinnas – TorudeAbi24",
      "Full apartment renovation – finishing works in a new room in Tallinn – TorudeAbi24",
      "Полный ремонт квартиры – отделочные работы в новом помещении Таллин – TorudeAbi24"
    ),
    metaTitle: ls(
      "Korteri ja kontori remont Tallinn – võtmed kätte", "Apartment & Office Renovation Tallinn – Turnkey", "Ремонт квартиры и офиса Таллин – под ключ"
    ),
    metaDesc: lt(
      "Korterite ja kontorite täisremont Tallinnas: põrandad, laed, seinad, viimistlus, mööbel. Võtmed kätte, garantii.",
      "Full apartment and office renovation in Tallinn: floors, ceilings, walls, finishing, furniture. Turnkey, warranty.",
      "Полный ремонт квартир и офисов в Таллине: полы, потолки, стены, отделка, мебель. Под ключ, гарантия."
    ),
  },

  {
    slug: "balcony-repair",
    alt: ls(
      "Rõdu remont – plaatimine ja veekindlustus rõdul Tallinnas – TorudeAbi24",
      "Balcony repair – tiling and waterproofing on a Tallinn balcony – TorudeAbi24",
      "Ремонт балкона – плитка и гидроизоляция балкона в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Rõdude remont Tallinn – veekindlustus, plaatimin", "Balcony Repair Tallinn – Waterproofing, Tiling", "Ремонт балкона Таллин – гидроизоляция, плитка"
    ),
    metaDesc: lt(
      "Rõdude remont Tallinnas: veekindlustus, plaatimine, klaasamine, värvimine. Garantii, kiire teenindus.",
      "Balcony repair in Tallinn: professional waterproofing, tiling, glazing, and painting. Certified team, 2-year warranty, free quote on request.",
      "Ремонт балконов в Таллине: профессиональная гидроизоляция, плитка, остекление и покраска. Сертифицированная бригада, гарантия 2 года, смета бесплатно."
    ),
  },

  {
    slug: "entrance-repair",
    alt: ls(
      "Trepikoja remont – värsked seinad ja põrand kortermajas Tallinnas – TorudeAbi24",
      "Entrance renovation – fresh walls and floor in a Tallinn apartment building – TorudeAbi24",
      "Ремонт подъезда – свежие стены и пол в многоквартирном доме Таллина – TorudeAbi24"
    ),
    metaTitle: ls(
      "Trepikodade remont Tallinn – kortermajad", "Entrance Renovation Tallinn – Apartment", "Ремонт подъездов Таллин – многоквартирные дома"
    ),
    metaDesc: lt(
      "Trepikodade remont Tallinnas: värvimine, plaatimine, põrand, elekter. Korteriühistutele soodushinnad, garantii.",
      "Entrance renovation in Tallinn: painting, tiling, flooring, electrical. Discounts for housing associations, warranty.",
      "Ремонт подъездов в многоквартирных домах Таллина: покраска стен, напольное покрытие, плитка, электрика. Скидки для ТСЖ, гарантия на все виды работ."
    ),
  },

  {
    slug: "insured-accident-repair",
    alt: ls(
      "Kindlustusjuhtumi hindamine ja remont – kahjukoha ülevaatamine Tallinnas – TorudeAbi24",
      "Insurance accident assessment and repair – damage inspection in Tallinn – TorudeAbi24",
      "Оценка и ремонт страхового случая – осмотр ущерба в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Kindlustusjuhtumi remont Tallinn – hindamine,", "Insured Accident Repair Tallinn – Assessment &", "Ремонт по страховому случаю Таллин – оценка,"
    ),
    metaDesc: lt(
      "Kindlustusjuhtumite hindamine ja remont Tallinnas: veekahju, tulekahju, muu kahju. Kindlustusseltside koostööpartner.",
      "Insurance damage assessment and repair in Tallinn: water damage, fire, other incidents. Works with insurance companies.",
      "Оценка и ремонт страховых случаев в Таллине: водный, пожарный ущерб и прочее. Работаем со страховыми компаниями."
    ),
  },

  {
    slug: "concrete-works",
    alt: ls(
      "Betoonitööd – betoonipõranda valu tööstusobjektil Tallinnas – TorudeAbi24",
      "Concrete works – pouring concrete floor at industrial site in Tallinn – TorudeAbi24",
      "Бетонные работы – заливка бетонного пола на объекте в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Betoonitööd Tallinn – põrandad, vundamendid,", "Concrete Works Tallinn – Floors, Foundations,", "Бетонные работы Таллин – полы, фундаменты,"
    ),
    metaDesc: lt(
      "Betoonitööd Tallinnas: põrandavalamine, alused, konstruktsioonid. Kvaliteetne betoon, armeeritud, garantii.",
      "Concrete works in Tallinn: floor pouring, bases, structural concrete. Quality concrete, reinforced, warranty.",
      "Бетонные работы в Таллине: заливка полов, основания, конструкции. Качественный бетон, армирование, гарантия."
    ),
  },

  // ── Cat 7: Exterior & Construction (5) ──────────────────────────────────────

  {
    slug: "construction-works",
    alt: ls(
      "Ehitustööd – karkasskonstruktsiooni ehitamine Tallinnas – TorudeAbi24",
      "Construction works – building frame structure in Tallinn – TorudeAbi24",
      "Строительные работы – возведение каркасной конструкции в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Ehitustööd Tallinn – karkass, müüritis,", "Construction Works Tallinn – Frame, Masonry,", "Строительные работы Таллин – каркас, кладка,"
    ),
    metaDesc: lt(
      "Ehitustööd Tallinnas: karkass, müüritised, krohv, soojustus, viimistlus. Kogenud ehitajad, garantii.",
      "Construction works in Tallinn: frame, masonry, plastering, insulation, finishing. Experienced builders, warranty.",
      "Строительные работы в Таллине: каркас, кладка, штукатурка, утепление, отделка. Опытные строители, гарантия."
    ),
  },

  {
    slug: "external-water-supply",
    alt: ls(
      "Välisveevärgi paigaldus – kraavitamine välisobjektil Tallinnas – TorudeAbi24",
      "External water supply installation – trenching at outdoor site in Tallinn – TorudeAbi24",
      "Монтаж наружного водоснабжения – земляные работы на объекте в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Välisveevärgi ehitus Tallinn – kraavitamine,", "External Water Supply Construction Tallinn", "Прокладка наружного водопровода Таллин"
    ),
    metaDesc: lt(
      "Välisveevärgi ehitus Tallinnas: vee- ja kanalisatsioonitrassid, kraavitamine, septiksüsteemid. Garantii.",
      "External water supply construction in Tallinn: water and sewer lines, trenching, septic systems. Warranty.",
      "Прокладка наружных водопроводных и канализационных сетей в Таллине и Харьюмаа: траншейные работы, монтаж труб, септики. Официальная документация."
    ),
  },

  {
    slug: "paver-installation",
    alt: ls(
      "Tänavakivi paigaldus – kivikatte ladumine hoovis Tallinnas – TorudeAbi24",
      "Paver installation – laying stone paving in a Tallinn courtyard – TorudeAbi24",
      "Укладка брусчатки – мощение двора в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Tänavakivi paigaldus Tallinn – õued, parkimispla", "Paver Installation Tallinn – Courtyards,", "Укладка брусчатки Таллин – дворы, парковки"
    ),
    metaDesc: lt(
      "Tänavakivi paigaldus Tallinnas: betoon- ja looduskivi, alustepõhja ettevalmistus, piirikivid. Kiire teenindus, täpne paigaldus, garantii.",
      "Paver installation in Tallinn: concrete and natural stone paving, base preparation, edging. Fast, warranty.",
      "Укладка тротуарной плитки в Таллине: бетонная и натуральная, подготовка основания, бордюрный камень. Быстро, аккуратно, гарантия качества."
    ),
  },

  {
    slug: "roofing-repair",
    alt: ls(
      "Katuseremont – spetsialisti katusekatendi kontroll Tallinnas – TorudeAbi24",
      "Roof repair – specialist inspecting roof covering in Tallinn – TorudeAbi24",
      "Ремонт кровли – специалист осматривает кровельное покрытие в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Katuseremont Tallinn – lame ja kaldkatus,", "Roof Repair Tallinn – Flat & Pitched Roof, Leak", "Ремонт кровли Таллин – плоская и скатная крыша,"
    ),
    metaDesc: lt(
      "Katuseremont Tallinnas: lame- ja kaldkatus, lekete tuvastamine ja kõrvaldamine, soojustus. Garantii.",
      "Roof repair in Tallinn: flat and pitched roofs, professional leak detection, waterproofing, and insulation. Certified roofers, 2-year warranty.",
      "Ремонт кровли в Таллине: плоская и скатная крыша, поиск и устранение протечек, гидроизоляция, утепление. Сертифицированные кровельщики, гарантия."
    ),
  },

  {
    slug: "wells-sale-installation",
    alt: ls(
      "Puurkaevu paigaldus – puurkaev paigaldatakse eramajaõuel Tallinnas – TorudeAbi24",
      "Well installation – borehole being drilled in a Tallinn house garden – TorudeAbi24",
      "Установка скважины – бурение скважины во дворе частного дома в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Puurkaevud Tallinn – müük, paigaldus, hooldus", "Wells Tallinn – Sale, Installation, Maintenance", "Скважины Таллин – продажа, монтаж, обслуживание"
    ),
    metaDesc: lt(
      "Puurkaevude müük, paigaldus ja hooldus Tallinnas ja Harjumaal. Eramajad ja ärikinnisvara, kõik sügavused, litsentseeritud spetsialistid, garantii.",
      "Well sale, installation and maintenance in Tallinn and Harjumaa. Residential and commercial, warranty.",
      "Продажа, монтаж и обслуживание скважин в Таллине и Харьюмаа. Частные и коммерческие объекты, гарантия."
    ),
  },

  // ── Cat 8: Design & Planning (4) ────────────────────────────────────────────

  {
    slug: "design",
    alt: ls(
      "Interjööridesaini skitsid – ruumiplaneering Tallinna korterprojektis – TorudeAbi24",
      "Interior design sketches – room layout for Tallinn apartment project – TorudeAbi24",
      "Эскизы интерьерного дизайна – планировка комнаты для проекта квартиры Таллина – TorudeAbi24"
    ),
    metaTitle: ls(
      "Disain Tallinn – sise- ja interjööridesain", "Design Tallinn – Interior Architecture & Design", "Дизайн Таллин – интерьерная архитектура и дизайн"
    ),
    metaDesc: lt(
      "Interjööridesain Tallinnas: kontseptsioon, planeeringud, materjalide valik. Unikaalsed lahendused, garantii.",
      "Interior design in Tallinn: concept development, spatial layouts, material selection, and 3D visualisation. Unique tailored solutions, consultation included.",
      "Интерьерный дизайн в Таллине: концепция, планировки, подбор материалов. Уникальные решения, гарантия."
    ),
  },

  {
    slug: "interior-design",
    alt: ls(
      "Interjööriarhitektuuri projekt – 3D visualiseering kaasaegsest elutoast Tallinnas – TorudeAbi24",
      "Interior architecture project – 3D visualisation of modern living room in Tallinn – TorudeAbi24",
      "Проект интерьерной архитектуры – 3D визуализация современной гостиной в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Interjööriarhitektuur Tallinn – täielik", "Interior Architecture Tallinn – Full Design", "Интерьерная архитектура Таллин – полный"
    ),
    metaDesc: lt(
      "Interjööriarhitektuuri teenused Tallinnas: planeeringud, 3D visualiseeringud, spetsifikatsioonid. Professionaalsed disainerid.",
      "Interior architecture services in Tallinn: layouts, 3D visualisations, specifications. Professional designers.",
      "Услуги интерьерной архитектуры в Таллине: планировки, 3D визуализации, спецификации. Профессиональные дизайнеры."
    ),
  },

  {
    slug: "3d-visualization",
    alt: ls(
      "3D visualiseering – realistlik ruumikujunduse render Tallinnas – TorudeAbi24",
      "3D visualisation – realistic room design render in Tallinn – TorudeAbi24",
      "3D визуализация – реалистичный рендер дизайна интерьера в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "3D visualiseering Tallinn – fotorealistlik", "3D Visualisation Tallinn – Photorealistic", "3D визуализация Таллин – фотореалистичный рендер"
    ),
    metaDesc: lt(
      "3D visualiseerimine ja renderimine Tallinnas: elutoad, vannitoad, köögid, fassaadid. Kiire tarneaeg, kõrge kvaliteet.",
      "3D visualisation and rendering in Tallinn: living rooms, bathrooms, kitchens, facades. Fast turnaround, high quality.",
      "3D визуализация и фотореалистичный рендеринг интерьеров в Таллине: гостиные, ванные, кухни, фасады. Быстрые сроки, высокое качество, доступная цена."
    ),
  },

  {
    slug: "as-built-drawings",
    alt: ls(
      "Ehitusluba dokumentatsioon – arhitekt töötab plaanide kallal Tallinnas – TorudeAbi24",
      "Building permit documentation – architect working on plans in Tallinn – TorudeAbi24",
      "Документация для разрешения на строительство – архитектор работает над планами в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Ehitusluba ja projektdokumentatsioon Tallinn", "Building Permit & Project Documentation Tallinn", "Разрешение на строительство и документация"
    ),
    metaDesc: lt(
      "Ehituslubade ja projektdokumentatsiooni koostamine Tallinnas. Arhitektuurne projekt, tehniline dokumentatsioon, kooskõlastused.",
      "Building permit and project documentation preparation in Tallinn. Architectural design, technical docs, approvals.",
      "Оформление разрешений на строительство и проектной документации в Таллине. Архитектурный проект, техдокументация."
    ),
  },

  // ── Cat 9: Management & Support (4) ─────────────────────────────────────────

  {
    slug: "apartment-associations",
    alt: ls(
      "Korteriühistu hooldus – tehnik kontrollib küttesüsteemi kortermaja keldris Tallinnas – TorudeAbi24",
      "Housing association maintenance – technician inspecting heating in Tallinn apartment block basement – TorudeAbi24",
      "Обслуживание ТСЖ – техник проверяет систему отопления в подвале многоквартирного дома Таллин – TorudeAbi24"
    ),
    metaTitle: ls(
      "Korteriühistute hooldus Tallinn – terviklahendus", "Housing Association Services Tallinn – Full", "Обслуживание ТСЖ Таллин – полный комплекс услуг"
    ),
    metaDesc: lt(
      "Korteriühistute hooldus Tallinnas: torutööd, elektritööd, ehitus, avariivalmidus. Sooduslepingud, usaldusväärne partner.",
      "Housing association maintenance in Tallinn: plumbing, electrical, construction, emergency readiness. Preferential contracts.",
      "Обслуживание ТСЖ в Таллине: сантехника, электрика, строительство, аварийная готовность. Льготные договоры."
    ),
  },

  {
    slug: "containers-for-rent",
    alt: ls(
      "Konteinerite rent – ehitusjäätmete konteiner hoovil Tallinnas – TorudeAbi24",
      "Container rental – construction waste container in Tallinn courtyard – TorudeAbi24",
      "Аренда контейнеров – строительный контейнер во дворе в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Konteinerite rent Tallinn – ehitus ja olmejäätme", "Container Rental Tallinn – Construction & Waste", "Аренда контейнеров Таллин – строительные и"
    ),
    metaDesc: lt(
      "Konteinerite rent Tallinnas: ehitusprügi, olmejäätmed, kõiksuurused. Tarne ja äraviimine, kiire, konkurentsivõimeline hind.",
      "Container rental in Tallinn: construction waste, household waste, all sizes. Delivery and collection, fast, competitive price.",
      "Аренда контейнеров в Таллине: строительный мусор, ТБО, все размеры. Доставка и вывоз, быстро, выгодная цена."
    ),
  },

  {
    slug: "cleaning-services",
    alt: ls(
      "Koristusteenus – professionaalne koristaja puhastab korterit Tallinnas – TorudeAbi24",
      "Cleaning service – professional cleaner tidying a Tallinn apartment – TorudeAbi24",
      "Услуги уборки – профессиональная уборщица убирает квартиру в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Koristusteenus Tallinn – järelehitus, üldkoristu", "Cleaning Services Tallinn – Post-Build &", "Услуги уборки Таллин – после ремонта, генеральна"
    ),
    metaDesc: lt(
      "Koristusteenused Tallinnas: järelehituspuhastus, üldkoristus, regulaarne hoolduskoristus. Professionaalne meeskond, garantii.",
      "Cleaning services in Tallinn: post-construction cleaning, general cleaning, regular maintenance. Professional team, guarantee.",
      "Услуги уборки в Таллине: после ремонта, генеральная, регулярная. Профессиональная команда, гарантия."
    ),
  },

  {
    slug: "property-maintenance",
    alt: ls(
      "Kinnisvara haldus – haldur kontrollib ärihoone tehnilist seisundit Tallinnas – TorudeAbi24",
      "Property management – manager inspecting commercial building condition in Tallinn – TorudeAbi24",
      "Управление недвижимостью – управляющий осматривает состояние коммерческого здания в Таллине – TorudeAbi24"
    ),
    metaTitle: ls(
      "Kinnisvara haldus Tallinn – tehniline hooldus,", "Property Management Tallinn – Technical", "Управление недвижимостью Таллин – техобслуживани"
    ),
    metaDesc: lt(
      "Kinnisvara haldus ja hooldus Tallinnas: tehniline järelevalve, plaanikohane hooldus, avariivalmidus. Sooduslepingud.",
      "Property management and maintenance in Tallinn: technical supervision, planned maintenance, emergency readiness. Contracts.",
      "Управление и обслуживание недвижимости в Таллине: технадзор, плановое ТО, аварийная готовность. Договоры."
    ),
  },
];

// ── Patch logic ───────────────────────────────────────────────────────────────

async function patchService(svc) {
  const doc = await client.fetch(
    `*[_type == "service" && slug.current == $s][0]{ _id, image, metaTitle, metaDescription }`,
    { s: svc.slug }
  );

  if (!doc) {
    console.warn(`  NOT FOUND: ${svc.slug}`);
    return;
  }

  const patch = client.patch(doc._id);
  const updates = {};

  // Alt text on hero image (only if image exists and alt is missing or FORCE)
  if (doc.image?.asset) {
    const needsAlt = FORCE || !doc.image?.alt?.et || !doc.image?.alt?.en || !doc.image?.alt?.ru;
    if (needsAlt) {
      updates["image.alt"] = svc.alt;
    }
  }

  // metaTitle
  const needsTitle = FORCE || !doc.metaTitle?.et || !doc.metaTitle?.en || !doc.metaTitle?.ru;
  if (needsTitle) updates.metaTitle = svc.metaTitle;

  // metaDescription
  const needsDesc = FORCE || !doc.metaDescription?.et || !doc.metaDescription?.en || !doc.metaDescription?.ru;
  if (needsDesc) updates.metaDescription = svc.metaDesc;

  if (Object.keys(updates).length === 0) {
    console.log(`  SKIP (already set): ${svc.slug}`);
    return;
  }

  await patch.set(updates).commit();
  console.log(`  PATCHED: ${svc.slug} — fields: ${Object.keys(updates).join(", ")}`);
}

async function main() {
  console.log(`\nPatching ${SERVICES.length} services (FORCE=${FORCE})...\n`);
  let ok = 0, skip = 0, fail = 0;

  for (const svc of SERVICES) {
    try {
      process.stdout.write(`→ ${svc.slug} `);
      await patchService(svc);
      ok++;
    } catch (err) {
      console.error(`  FAILED: ${svc.slug} — ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone. Patched: ${ok}, Skipped: ${skip}, Failed: ${fail}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
