/**
 * scripts/seed-grouped-services.mjs
 * Creates or patches all sub-services under their respective categories.
 * Requires service categories to exist first — run seed-service-categories.mjs first.
 *
 * Run: node --env-file=.env.local scripts/seed-grouped-services.mjs
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (default: production)
 *   SANITY_API_WRITE_TOKEN
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-20",
  token:      process.env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

// ── helpers ───────────────────────────────────────────────────────────────────
const ls = (et, az, en, ru) => ({ _type: "localeString", et, az, en, ru });
const lt = (et, az, en, ru) => ({ _type: "localeText",   et, az, en, ru });
const ref = (id)             => ({ _type: "reference", _ref: id });
const slug = (s)             => ({ _type: "slug", current: s });

// ── service definitions (grouped by category) ─────────────────────────────────
const SERVICES = [

  // ── 1. Plumbing Works ─────────────────────────────────────────────────────
  {
    _id: "service-24h-emergency-plumbing",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "24h-emergency-plumbing",
    pathSegment: { et: "toruabi-24h", ru: "аварийная-сантехника-24ч" },
    icon: "PhoneCall",
    order: 1,
    title: ls(
      "Toruabi 24h",
      "Toruabi 24h",
      "24h Emergency Plumbing",
      "Аварийная сантехника 24ч"
    ),
    shortDescription: lt(
      "Ööpäevaringne operatiivne abi toruavariide ja lekete korral.",
      "Boru avariləri və sızıntılar üçün gecə-gündüz əməliyyat yardımı.",
      "Round-the-clock emergency response for pipe bursts and leaks.",
      "Круглосуточная аварийная помощь при прорывах труб и утечках."
    ),
    metaTitle: ls(
      "Toruabi 24h Tallinnas | Kiire avariiteenus",
      "Toruabi 24h Tallinn | Sürətli avari xidməti",
      "24h Emergency Plumber in Tallinn | Fast Response",
      "Аварийный сантехник 24ч в Таллине | Быстрый выезд"
    ),
    metaDescription: lt(
      "Toruabi 24h Tallinnas. Lekete kõrvaldamine, torude parandus ja avariiteenus ööpäevaringselt.",
      "Tallinn şəhərində 24h toruabi. Sızıntıların aradan qaldırılması, boru təmiri.",
      "24h emergency plumber in Tallinn. Leak fixing, pipe repair and emergency service around the clock.",
      "Аварийный сантехник 24ч в Таллине. Устранение утечек, ремонт труб круглосуточно."
    ),
  },
  {
    _id: "service-pipe-works",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "pipe-works",
    pathSegment: { et: "torutood", ru: "трубопроводные-работы" },
    icon: "Pipette",
    order: 2,
    title: ls("Torutööd", "Boru İşləri", "Pipe Works", "Трубопроводные работы"),
    shortDescription: lt(
      "Üldised vee-, kanalisatsiooni- ja küttesüsteemide ehitustööd.",
      "Su, kanalizasiya və istilik sistemlərinin ümumi tikinti işləri.",
      "General water supply, drainage and heating system pipe works.",
      "Общестроительные работы по водоснабжению, канализации и отоплению."
    ),
    metaTitle: ls(
      "Torutööd Tallinnas | Vee- ja kanalisatsioonisüsteemid",
      "Boru İşləri Tallinn | Su və Kanalizasiya Sistemləri",
      "Pipe Works Tallinn | Water & Drainage Systems",
      "Трубопроводные работы в Таллине | Водоснабжение и канализация"
    ),
    metaDescription: lt(
      "Professionaalsed torutööd Tallinnas. Vee-, kanalisatsiooni- ja küttesüsteemide paigaldus.",
      "Tallinn şəhərində peşəkar boru işləri. Su, kanalizasiya və istilik sistemlərinin quraşdırılması.",
      "Professional pipe works in Tallinn. Installation of water supply, drainage and heating systems.",
      "Профессиональные трубопроводные работы в Таллине. Монтаж систем водоснабжения и канализации."
    ),
  },
  {
    _id: "service-plumber-on-call",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "plumber-on-call",
    pathSegment: { et: "torumees", ru: "сантехник-на-вызов" },
    icon: "Wrench",
    order: 3,
    title: ls("Torumees", "Santexnik Çağırışı", "Plumber on Call", "Вызов сантехника"),
    shortDescription: lt(
      "Kvalifitseeritud santehniku väljakutse paigaldus- ja remonditöödeks.",
      "Quraşdırma və təmir işləri üçün ixtisaslı santexnik çağırışı.",
      "Qualified plumber call-out for installation and repair works.",
      "Вызов квалифицированного сантехника для монтажа и ремонта."
    ),
    metaTitle: ls(
      "Torumees Tallinn | Kvalifitseeritud santehniku väljakutse",
      "Santexnik Çağırışı Tallinn | İxtisaslı Xidmət",
      "Plumber on Call Tallinn | Qualified Plumbing Service",
      "Вызов сантехника в Таллине | Квалифицированная помощь"
    ),
    metaDescription: lt(
      "Kogenud torumehe väljakutse Tallinnas. Kiire ja usaldusväärne santehniliste tööde teostamine.",
      "Tallinn şəhərində təcrübəli santexnik çağırışı. Sürətli və etibarlı sanitexnik xidmət.",
      "Experienced plumber call-out in Tallinn. Fast and reliable plumbing service.",
      "Вызов опытного сантехника в Таллине. Быстрая и надёжная сантехническая помощь."
    ),
  },
  {
    _id: "service-drain-blockage-removal",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "drain-blockage-removal",
    pathSegment: { et: "ummistuste-likvideerimine", ru: "устранение-засоров" },
    icon: "X",
    order: 4,
    title: ls(
      "Ummistuste likvideerimine",
      "Tıxacların Aradan Qaldırılması",
      "Drain & Blockage Removal",
      "Устранение засоров"
    ),
    shortDescription: lt(
      "Kanalisatsiooni ja torustiku ummistuste kiire eemaldamine.",
      "Kanalizasiya və boru sistemlərinin tıxaclarının sürətlə aradan qaldırılması.",
      "Fast removal of blockages in drainage and pipe systems.",
      "Быстрое устранение засоров в канализации и трубопроводах."
    ),
    metaTitle: ls(
      "Ummistuste likvideerimine Tallinnas | Kiire kanalisatsiooniteenus",
      "Tıxacların Aradan Qaldırılması Tallinn | Sürətli Xidmət",
      "Drain Blockage Removal Tallinn | Fast Service",
      "Устранение засоров в Таллине | Быстро и надёжно"
    ),
    metaDescription: lt(
      "Kanalisatsiooniummistuste kiire likvideerimine Tallinnas. Professionaalne puhastamine ja survepesu.",
      "Tallinn şəhərində kanalizasiya tıxaclarının sürətlə aradan qaldırılması.",
      "Fast drain and sewer blockage removal in Tallinn. Professional cleaning and jetting.",
      "Быстрое устранение засоров канализации в Таллине. Профессиональная прочистка."
    ),
  },
  {
    _id: "service-tap-mixer-replacement",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "tap-mixer-replacement",
    pathSegment: { et: "segisti-vahetus", ru: "замена-смесителей" },
    icon: "Droplets",
    order: 5,
    title: ls(
      "Segisti vahetus",
      "Misgirin Dəyişdirilməsi",
      "Tap & Mixer Replacement",
      "Замена смесителей"
    ),
    shortDescription: lt(
      "Segistite, kraanide ja dušisüsteemide vahetus ning remont.",
      "Misgirlərin, kranların və duş sistemlərinin dəyişdirilməsi və təmiri.",
      "Replacement and repair of taps, mixers and shower systems.",
      "Замена и ремонт смесителей, кранов и душевых систем."
    ),
    metaTitle: ls(
      "Segisti vahetus Tallinn | Kraanide ja dušisüsteemide remont",
      "Misgir Dəyişdirilməsi Tallinn | Kran və Duş Sistemləri",
      "Tap & Mixer Replacement Tallinn | Shower System Repair",
      "Замена смесителей в Таллине | Ремонт кранов и душей"
    ),
    metaDescription: lt(
      "Segistite ja kraanide vahetus Tallinnas. Kiire ja professionaalne remont.",
      "Tallinn şəhərində misgir və kranların dəyişdirilməsi. Sürətli peşəkar xidmət.",
      "Tap and mixer replacement in Tallinn. Fast and professional repair service.",
      "Замена смесителей и кранов в Таллине. Быстрый и профессиональный ремонт."
    ),
  },
  {
    _id: "service-boiler-installation",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "boiler-installation",
    pathSegment: { et: "boilerite-paigaldus", ru: "установка-бойлера" },
    icon: "Thermometer",
    order: 6,
    title: ls(
      "Boilerite paigaldus ja vahetus",
      "Boilerlərin Quraşdırılması və Dəyişdirilməsi",
      "Boiler Installation & Replacement",
      "Установка и замена бойлеров"
    ),
    shortDescription: lt(
      "Boilerite hooldus, puhastamine ja uute seadmete paigaldus.",
      "Boilerlərin texniki xidməti, təmizlənməsi və yeni avadanlıqların quraşdırılması.",
      "Boiler maintenance, cleaning and installation of new units.",
      "Техническое обслуживание, чистка и установка новых бойлеров."
    ),
    metaTitle: ls(
      "Boileri paigaldus ja vahetus Tallinn | Hooldus ja remont",
      "Boiler Quraşdırılması Tallinn | Texniki Xidmət",
      "Boiler Installation & Replacement Tallinn | Maintenance",
      "Установка и замена бойлеров в Таллине | Обслуживание"
    ),
    metaDescription: lt(
      "Boilerite paigaldus ja vahetus Tallinnas. Hooldus, puhastamine, uue seadme paigaldus.",
      "Tallinn şəhərində boiler quraşdırılması. Texniki xidmət, təmizlənmə, yeni avadanlıq.",
      "Boiler installation and replacement in Tallinn. Maintenance, cleaning and new unit setup.",
      "Установка и замена бойлеров в Таллине. Обслуживание, чистка, подключение."
    ),
  },
  {
    _id: "service-radiator-installation",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "radiator-installation",
    pathSegment: { et: "radiaatorite-paigaldus", ru: "установка-радиаторов" },
    icon: "Flame",
    order: 7,
    title: ls(
      "Radiaatorite paigaldus",
      "Radiatorların Quraşdırılması",
      "Radiator Installation",
      "Установка радиаторов"
    ),
    shortDescription: lt(
      "Radiaatorite vahetus, paigaldus ja küttesüsteemiga ühendamine.",
      "Radiatorların dəyişdirilməsi, quraşdırılması və istilik sisteminə qoşulması.",
      "Radiator replacement, installation and connection to heating system.",
      "Замена, установка радиаторов и подключение к системе отопления."
    ),
    metaTitle: ls(
      "Radiaatorite paigaldus Tallinn | Küttesüsteemide remont",
      "Radiatorların Quraşdırılması Tallinn | İstilik Sistemləri",
      "Radiator Installation Tallinn | Heating System Works",
      "Установка радиаторов в Таллине | Работы с отоплением"
    ),
    metaDescription: lt(
      "Radiaatorite paigaldus ja vahetus Tallinnas. Küttesüsteemide ühendamine professionaalselt.",
      "Tallinn şəhərində radiatorların quraşdırılması. İstilik sistemlərinin peşəkar qoşulması.",
      "Radiator installation and replacement in Tallinn. Professional heating system connection.",
      "Установка и замена радиаторов в Таллине. Профессиональное подключение к отоплению."
    ),
  },
  {
    _id: "service-riser-pipe-replacement",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "riser-pipe-replacement",
    pathSegment: { et: "pustikute-vahetus", ru: "замена-стояков" },
    icon: "ArrowUpDown",
    order: 8,
    title: ls(
      "Püstikute vahetus",
      "Stoyakların Dəyişdirilməsi",
      "Riser Pipe Replacement",
      "Замена стояков"
    ),
    shortDescription: lt(
      "Vee- ja kanalisatsioonipüstikute täielik renoveerimine.",
      "Su və kanalizasiya stoyaklarının tam yenilənməsi.",
      "Full renovation of water and sewage riser pipes.",
      "Полная замена стояков водоснабжения и канализации."
    ),
    metaTitle: ls(
      "Püstikute vahetus Tallinn | Vee- ja kanalisatsioonitorud",
      "Stoyakların Dəyişdirilməsi Tallinn | Su və Kanalizasiya",
      "Riser Pipe Replacement Tallinn | Water & Sewage Risers",
      "Замена стояков в Таллине | Водоснабжение и канализация"
    ),
    metaDescription: lt(
      "Vee- ja kanalisatsioonipüstikute vahetus Tallinnas. Täielik renoveerimine korteriühistutele.",
      "Tallinn şəhərində su və kanalizasiya stoyaklarının dəyişdirilməsi.",
      "Water and sewage riser pipe replacement in Tallinn. Full renovation for housing associations.",
      "Замена стояков водоснабжения и канализации в Таллине."
    ),
  },
  {
    _id: "service-water-meter-replacement",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "water-meter-replacement",
    pathSegment: { et: "veemootjate-vahetus", ru: "замена-счётчиков-воды" },
    icon: "Gauge",
    order: 9,
    title: ls(
      "Veemõõtjate vahetus",
      "Su Sayğaclarının Dəyişdirilməsi",
      "Water Meter Replacement",
      "Замена водосчётчиков"
    ),
    shortDescription: lt(
      "Veemõõtjate paigaldus, vahetus ja taatlemine.",
      "Su sayğaclarının quraşdırılması, dəyişdirilməsi və yoxlanılması.",
      "Water meter installation, replacement and verification.",
      "Установка, замена и поверка водосчётчиков."
    ),
    metaTitle: ls(
      "Veemõõtja vahetus Tallinn | Paigaldus ja taatlemine",
      "Su Sayğacı Dəyişdirilməsi Tallinn | Quraşdırma",
      "Water Meter Replacement Tallinn | Installation & Verification",
      "Замена водосчётчиков в Таллине | Установка и поверка"
    ),
    metaDescription: lt(
      "Veemõõtjate vahetus ja paigaldus Tallinnas. Kiire ja usaldusväärne teenus.",
      "Tallinn şəhərində su sayğaclarının dəyişdirilməsi. Sürətli və etibarlı xidmət.",
      "Water meter replacement and installation in Tallinn. Fast and reliable service.",
      "Замена и установка водосчётчиков в Таллине. Быстро и надёжно."
    ),
  },
  {
    _id: "service-toilet-installation",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "toilet-installation",
    pathSegment: { et: "wc-poti-paigaldus", ru: "установка-унитаза" },
    icon: "ShowerHead",
    order: 10,
    title: ls(
      "WC poti paigaldus",
      "Unitazın Quraşdırılması",
      "Toilet Installation",
      "Установка унитаза"
    ),
    shortDescription: lt(
      "Sanitaartehnika ja unitazide paigaldamine.",
      "Sanitar texnika və unitazların quraşdırılması.",
      "Installation of sanitary ware and toilets.",
      "Монтаж санитарной техники и унитазов."
    ),
    metaTitle: ls(
      "WC poti paigaldus Tallinn | Sanitaartehnika",
      "Unitaz Quraşdırılması Tallinn | Sanitar Texnika",
      "Toilet Installation Tallinn | Sanitary Ware",
      "Установка унитаза в Таллине | Санитарная техника"
    ),
    metaDescription: lt(
      "Unitazide ja sanitaartehnika paigaldus Tallinnas. Kiire ja professionaalne teenus.",
      "Tallinn şəhərində unitaz və sanitar texnika quraşdırılması.",
      "Toilet and sanitary ware installation in Tallinn. Fast and professional service.",
      "Установка унитазов и санитарной техники в Таллине."
    ),
  },
  {
    _id: "service-pipe-freezing",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "pipe-freezing",
    pathSegment: { et: "torude-kulmutamine", ru: "заморозка-труб" },
    icon: "Snowflake",
    order: 11,
    title: ls(
      "Torude külmutamine",
      "Boruların Dondurulması",
      "Emergency Pipe Freezing",
      "Заморозка труб"
    ),
    shortDescription: lt(
      "Avariitööd ilma vett püstakust välja laskmata.",
      "Stoyakdan su buraxmadan avari işləri.",
      "Emergency works without draining the riser pipe.",
      "Аварийные работы без слива воды из стояка."
    ),
    metaTitle: ls(
      "Torude külmutamine Tallinn | Avariiteenus",
      "Boruların Dondurulması Tallinn | Avari Xidmət",
      "Pipe Freezing Tallinn | Emergency Service",
      "Заморозка труб в Таллине | Аварийная служба"
    ),
    metaDescription: lt(
      "Torude külmutamine avariitöödeks Tallinnas. Vett välja laskmata, kiiresti.",
      "Tallinn şəhərində boruların dondurulması. Su buraxmadan sürətli avari xidməti.",
      "Pipe freezing for emergency works in Tallinn. No water drainage needed — fast.",
      "Заморозка труб для аварийных работ в Таллине. Без слива воды — быстро."
    ),
  },
  {
    _id: "service-pipe-cctv-inspection",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "pipe-cctv-inspection",
    pathSegment: { et: "torustike-videouuring", ru: "видеодиагностика-труб" },
    icon: "Camera",
    order: 12,
    title: ls(
      "Torustike videouuring",
      "Boru Kamera Diaqnostikası",
      "Pipe CCTV Inspection",
      "Видеодиагностика трубопроводов"
    ),
    shortDescription: lt(
      "Torustike survepesu ja kaamerauuring.",
      "Boru sistemlərinin yüksək təzyiqli yuyulması və kamera diaqnostikası.",
      "Pipe jetting and CCTV camera inspection.",
      "Промывка трубопроводов и видеодиагностика камерой."
    ),
    metaTitle: ls(
      "Torustike videouuring Tallinn | Kaamerauuring ja survepesu",
      "Boru Kamera Diaqnostikası Tallinn",
      "Pipe CCTV Inspection Tallinn | Jetting & Camera Survey",
      "Видеодиагностика труб в Таллине | Промывка и камера"
    ),
    metaDescription: lt(
      "Torustike kaamerauuring ja survepesu Tallinnas. Täpne diagnoos ja efektiivne puhastus.",
      "Tallinn şəhərində boru sistemlərinin kamera ilə diaqnostikası.",
      "Pipe CCTV inspection and jetting in Tallinn. Accurate diagnosis and effective cleaning.",
      "Видеодиагностика и промывка трубопроводов в Таллине."
    ),
  },
  {
    _id: "service-pem-pipe-welding",
    categoryId: "serviceCategory-plumbing-works",
    slugEn: "pem-pipe-welding",
    pathSegment: { et: "pem-torude-keevitus", ru: "сварка-полиэтиленовых-труб" },
    icon: "Flame",
    order: 13,
    title: ls(
      "PEM torude keevitus",
      "Plastik Boruların Qaynağı",
      "PEM Pipe Welding",
      "Сварка полиэтиленовых труб"
    ),
    shortDescription: lt(
      "Plasttorude professionaalne keevitus.",
      "Plastik boruların peşəkar qaynağı.",
      "Professional welding of polyethylene pipes.",
      "Профессиональная сварка полиэтиленовых труб."
    ),
    metaTitle: ls(
      "PEM torude keevitus Tallinn | Plasttorude paigaldus",
      "PEM Boru Qaynağı Tallinn | Plastik Borular",
      "PEM Pipe Welding Tallinn | Polyethylene Pipe Installation",
      "Сварка ПЭ труб в Таллине | Монтаж полиэтилена"
    ),
    metaDescription: lt(
      "PEM ja plasttorude keevitus Tallinnas. Professionaalne paigaldus ja ühendamine.",
      "Tallinn şəhərində PEM plastik boruların qaynağı. Peşəkar montaj.",
      "PEM polyethylene pipe welding in Tallinn. Professional installation and connection.",
      "Сварка полиэтиленовых труб в Таллине. Профессиональный монтаж."
    ),
  },

  // ── 2. High-Pressure Washing ───────────────────────────────────────────────
  {
    _id: "service-sewer-jetting",
    categoryId: "serviceCategory-high-pressure-washing",
    slugEn: "sewer-jetting",
    pathSegment: { et: "kanalisatsiooni-survepesu", ru: "промывка-канализации" },
    icon: "Waves",
    order: 1,
    title: ls(
      "Kanalisatsiooni survepesu",
      "Kanalizasiyanın Yüksək Təzyiqli Yuyulması",
      "Sewer Jetting",
      "Промывка канализации"
    ),
    shortDescription: lt(
      "Torustike pesu kõrgsurvega ja ummistuste avamine.",
      "Boru sistemlərinin yüksək təzyiqli yuyulması və tıxacların açılması.",
      "High-pressure pipe cleaning and blockage removal.",
      "Промывка труб высоким давлением и устранение засоров."
    ),
    metaTitle: ls(
      "Kanalisatsiooni survepesu Tallinn | Kõrgsurvepuhastus",
      "Kanalizasiya Yüksək Təzyiqli Yuma Tallinn",
      "Sewer Jetting Tallinn | High-Pressure Pipe Cleaning",
      "Промывка канализации в Таллине | Высокое давление"
    ),
    metaDescription: lt(
      "Kanalisatsiooni survepesu Tallinnas. Kõrgsurvepuhastus ummistuste eemaldamiseks.",
      "Tallinn şəhərində kanalizasiyanın yüksək təzyiqli yuyulması.",
      "Sewer jetting in Tallinn. High-pressure cleaning to remove blockages.",
      "Промывка канализации высоким давлением в Таллине."
    ),
  },
  {
    _id: "service-sewage-removal",
    categoryId: "serviceCategory-high-pressure-washing",
    slugEn: "sewage-removal",
    pathSegment: { et: "fekaalivedu", ru: "откачка-отходов" },
    icon: "Truck",
    order: 2,
    title: ls("Fekaalivedu", "Nəcis Daşınması", "Sewage Removal", "Откачка жидких отходов"),
    shortDescription: lt(
      "Vedeljäätmete väljavedu ja utiliseerimine.",
      "Maye tullantıların kənarlaşdırılması və utilizasiyası.",
      "Removal and disposal of liquid waste.",
      "Вывоз и утилизация жидких отходов."
    ),
    metaTitle: ls(
      "Fekaalivedu Tallinn | Vedeljäätmete utiliseerimine",
      "Nəcis Daşınması Tallinn | Maye Tullantı Utilizasiyası",
      "Sewage Removal Tallinn | Liquid Waste Disposal",
      "Откачка жидких отходов в Таллине | Вывоз и утилизация"
    ),
    metaDescription: lt(
      "Fekaalivedu Tallinnas. Vedeljäätmete kiire ja ohutu eemaldamine ning utiliseerimine.",
      "Tallinn şəhərində nəcis daşınması. Maye tullantıların sürətli və təhlükəsiz kənarlaşdırılması.",
      "Sewage removal in Tallinn. Fast and safe liquid waste collection and disposal.",
      "Откачка жидких отходов в Таллине. Быстрый и безопасный вывоз."
    ),
  },
  {
    _id: "service-jetting-truck",
    categoryId: "serviceCategory-high-pressure-washing",
    slugEn: "jetting-truck-services",
    pathSegment: { et: "survepesuauto-teenused", ru: "машина-высокого-давления" },
    icon: "Truck",
    order: 3,
    title: ls(
      "Survepesuauto teenused",
      "Yüksək Təzyiqli Avtomobil Xidmətləri",
      "Jetting Truck Services",
      "Услуги машины высокого давления"
    ),
    shortDescription: lt(
      "Operatiivne survepesu ja kanalite puhastus suurte masinatega.",
      "Böyük texnika ilə sürətli yüksək təzyiqli yuma və kanal təmizlənməsi.",
      "Rapid high-pressure washing and channel cleaning with heavy machinery.",
      "Оперативная промывка и чистка каналов специализированными машинами."
    ),
    metaTitle: ls(
      "Survepesuauto Tallinn | Kanalite puhastus",
      "Yüksək Təzyiqli Avtomobil Tallinn | Kanal Təmizlənməsi",
      "Jetting Truck Tallinn | Channel Cleaning Services",
      "Машина высокого давления в Таллине | Чистка каналов"
    ),
    metaDescription: lt(
      "Survepesuauto teenused Tallinnas. Kanalite ja kanalisatsiooni puhastus suurte masinatega.",
      "Tallinn şəhərində yüksək təzyiqli avtomobil xidmətləri. Kanal və kanalizasiya təmizlənməsi.",
      "Jetting truck services in Tallinn. Channel and sewer cleaning with heavy machinery.",
      "Услуги машины высокого давления в Таллине. Чистка каналов и канализации."
    ),
  },

  // ── 3. Electrical Works ───────────────────────────────────────────────────
  {
    _id: "service-24h-emergency-electrical",
    categoryId: "serviceCategory-electrical-works",
    slugEn: "24h-emergency-electrical",
    pathSegment: { et: "elektriabi-24h", ru: "аварийный-электрик-24ч" },
    icon: "Zap",
    order: 1,
    title: ls(
      "Elektriabi 24h",
      "Elektrik Yardımı 24h",
      "24h Emergency Electrical",
      "Аварийный электрик 24ч"
    ),
    shortDescription: lt(
      "Kiire abi elektriavariide korral.",
      "Elektrik avariləri üçün sürətli yardım.",
      "Fast response for electrical emergencies.",
      "Быстрая помощь при электрических авариях."
    ),
    metaTitle: ls(
      "Elektriabi 24h Tallinn | Kiire avariiteenus",
      "Elektrik Yardımı 24h Tallinn | Avari Xidməti",
      "24h Emergency Electrician Tallinn | Fast Response",
      "Аварийный электрик 24ч в Таллине | Быстрый выезд"
    ),
    metaDescription: lt(
      "Elektriabi 24h Tallinnas. Avariiteenus elektririkete korral ööpäevaringselt.",
      "Tallinn şəhərində elektrik yardımı 24h. Elektrik qəzaları üçün gecə-gündüz xidmət.",
      "24h emergency electrician in Tallinn. Round-the-clock electrical emergency service.",
      "Аварийный электрик 24ч в Таллине. Круглосуточная помощь при электрических авариях."
    ),
  },
  {
    _id: "service-electrical-installation",
    categoryId: "serviceCategory-electrical-works",
    slugEn: "electrical-installation",
    pathSegment: { et: "elektripaigaldiste-montaaz", ru: "монтаж-электроустановок" },
    icon: "Cable",
    order: 2,
    title: ls(
      "Elektripaigaldiste montaaž",
      "Elektrik Qurğularının Montajı",
      "Electrical Installation",
      "Монтаж электроустановок"
    ),
    shortDescription: lt(
      "Uute elektrisüsteemide ja kaablite paigaldus.",
      "Yeni elektrik sistemlərinin və kabellərin quraşdırılması.",
      "Installation of new electrical systems and cables.",
      "Монтаж новых электросистем и прокладка кабелей."
    ),
    metaTitle: ls(
      "Elektripaigaldiste montaaž Tallinn | Elektrisüsteemid",
      "Elektrik Montajı Tallinn | Yeni Elektrik Sistemləri",
      "Electrical Installation Tallinn | New Systems & Cables",
      "Монтаж электроустановок в Таллине | Новые системы"
    ),
    metaDescription: lt(
      "Elektripaigaldiste montaaž Tallinnas. Uute elektrisüsteemide ja kaablite professionaalne paigaldus.",
      "Tallinn şəhərində elektrik qurğularının montajı. Yeni sistemlər.",
      "Electrical installation in Tallinn. Professional setup of new electrical systems and cables.",
      "Монтаж электроустановок в Таллине. Профессиональная прокладка кабелей."
    ),
  },
  {
    _id: "service-switchboard-maintenance",
    categoryId: "serviceCategory-electrical-works",
    slugEn: "switchboard-maintenance",
    pathSegment: { et: "elektrikilpide-hooldus", ru: "обслуживание-щитовых" },
    icon: "ToggleLeft",
    order: 3,
    title: ls(
      "Elektrikilpide hooldus",
      "Elektrik Panoların Texniki Xidməti",
      "Switchboard Maintenance",
      "Обслуживание электрощитовых"
    ),
    shortDescription: lt(
      "Kilpide montaaž, korrastamine ja tehniline kontroll.",
      "Panoların montajı, qaydaya salınması və texniki nəzarəti.",
      "Switchboard assembly, servicing and technical inspection.",
      "Монтаж щитовых, их обслуживание и техническая проверка."
    ),
    metaTitle: ls(
      "Elektrikilpide hooldus Tallinn | Kilpide montaaž",
      "Elektrik Pano Xidməti Tallinn | Montaj",
      "Switchboard Maintenance Tallinn | Electrical Panel Service",
      "Обслуживание электрощитовых в Таллине | Монтаж"
    ),
    metaDescription: lt(
      "Elektrikilpide montaaž ja hooldus Tallinnas. Professionaalne kontroll ja korrastamine.",
      "Tallinn şəhərində elektrik panolarının montajı. Peşəkar texniki xidmət.",
      "Switchboard installation and maintenance in Tallinn. Professional inspection and servicing.",
      "Монтаж и обслуживание электрощитовых в Таллине."
    ),
  },
  {
    _id: "service-lighting-installation",
    categoryId: "serviceCategory-electrical-works",
    slugEn: "lighting-installation",
    pathSegment: { et: "valgustuse-paigaldus", ru: "установка-освещения" },
    icon: "Lightbulb",
    order: 4,
    title: ls(
      "Valgustuse paigaldus",
      "İşıqlandırmanın Quraşdırılması",
      "Lighting Installation",
      "Установка освещения"
    ),
    shortDescription: lt(
      "Sise- ja välisvalgustite montaaž.",
      "Daxili və xarici işıqlandırma sistemlərinin montajı.",
      "Installation of indoor and outdoor lighting systems.",
      "Монтаж систем внутреннего и наружного освещения."
    ),
    metaTitle: ls(
      "Valgustuse paigaldus Tallinn | Sise- ja välisvalgusti",
      "İşıqlandırma Quraşdırılması Tallinn",
      "Lighting Installation Tallinn | Indoor & Outdoor",
      "Установка освещения в Таллине | Внутреннее и наружное"
    ),
    metaDescription: lt(
      "Valgustuse paigaldus Tallinnas. Sise- ja välisvalgustite professionaalne montaaž.",
      "Tallinn şəhərində işıqlandırma sistemlərinin quraşdırılması.",
      "Lighting installation in Tallinn. Professional indoor and outdoor lighting setup.",
      "Установка систем освещения в Таллине. Внутреннее и наружное."
    ),
  },

  // ── 4. Appliance Repair ───────────────────────────────────────────────────
  {
    _id: "service-washing-machine-repair",
    categoryId: "serviceCategory-appliance-repair",
    slugEn: "washing-machine-repair",
    pathSegment: { et: "pesumasinate-remont", ru: "ремонт-стиральных-машин" },
    icon: "RefreshCw",
    order: 1,
    title: ls(
      "Pesumasinate remont",
      "Paltaryuyan Maşınların Təmiri",
      "Washing Machine Repair",
      "Ремонт стиральных машин"
    ),
    shortDescription: lt(
      "Pesumasinate diagnostika ja varuosade vahetus.",
      "Paltaryuyan maşınların diaqnostikası və ehtiyat hissələrinin dəyişdirilməsi.",
      "Washing machine diagnostics and spare parts replacement.",
      "Диагностика и замена запчастей стиральных машин."
    ),
    metaTitle: ls(
      "Pesumasinate remont Tallinn | Diagnostika ja varuosad",
      "Paltaryuyan Maşın Təmiri Tallinn",
      "Washing Machine Repair Tallinn | Diagnostics & Parts",
      "Ремонт стиральных машин в Таллине | Диагностика"
    ),
    metaDescription: lt(
      "Pesumasinate remont Tallinnas. Kiire diagnostika ja kvaliteetsete varuosade vahetus.",
      "Tallinn şəhərində paltaryuyan maşınların təmiri. Sürətli diaqnostika.",
      "Washing machine repair in Tallinn. Fast diagnostics and quality spare parts replacement.",
      "Ремонт стиральных машин в Таллине. Быстрая диагностика и замена запчастей."
    ),
  },
  {
    _id: "service-dishwasher-repair",
    categoryId: "serviceCategory-appliance-repair",
    slugEn: "dishwasher-repair",
    pathSegment: { et: "noudepesumasinate-remont", ru: "ремонт-посудомоечных-машин" },
    icon: "Package",
    order: 2,
    title: ls(
      "Nõudepesumasinate remont",
      "Qabyuyan Maşınların Təmiri",
      "Dishwasher Repair",
      "Ремонт посудомоечных машин"
    ),
    shortDescription: lt(
      "Nõudepesumasinate remont ja tehniline hooldus.",
      "Qabyuyan maşınların təmiri və texniki xidmət.",
      "Dishwasher repair and technical maintenance.",
      "Ремонт и техническое обслуживание посудомоечных машин."
    ),
    metaTitle: ls(
      "Nõudepesumasinate remont Tallinn",
      "Qabyuyan Maşın Təmiri Tallinn",
      "Dishwasher Repair Tallinn | Maintenance Service",
      "Ремонт посудомоечных машин в Таллине"
    ),
    metaDescription: lt(
      "Nõudepesumasinate remont Tallinnas. Professionaalne diagnostika ja hooldus.",
      "Tallinn şəhərində qabyuyan maşınların təmiri. Peşəkar xidmət.",
      "Dishwasher repair in Tallinn. Professional diagnostics and maintenance.",
      "Ремонт посудомоечных машин в Таллине. Профессиональная диагностика."
    ),
  },
  {
    _id: "service-refrigerator-repair",
    categoryId: "serviceCategory-appliance-repair",
    slugEn: "refrigerator-repair",
    pathSegment: { et: "kulmikute-remont", ru: "ремонт-холодильников" },
    icon: "Thermometer",
    order: 3,
    title: ls(
      "Külmikute remont",
      "Soyuducuların Təmiri",
      "Refrigerator Repair",
      "Ремонт холодильников"
    ),
    shortDescription: lt(
      "Külmikute remont, freooni täitmine ja kompressorite vahetus.",
      "Soyuducuların təmiri, freon doldurulması və kompressorların dəyişdirilməsi.",
      "Refrigerator repair, refrigerant refill and compressor replacement.",
      "Ремонт холодильников, заправка фреоном и замена компрессоров."
    ),
    metaTitle: ls(
      "Külmikute remont Tallinn | Freoon ja kompressor",
      "Soyuducu Təmiri Tallinn | Freon və Kompressor",
      "Refrigerator Repair Tallinn | Freon & Compressor",
      "Ремонт холодильников в Таллине | Фреон и компрессор"
    ),
    metaDescription: lt(
      "Külmikute remont Tallinnas. Freooni täitmine, kompressorite vahetus, diagnostika.",
      "Tallinn şəhərində soyuducuların təmiri. Freon, kompressor dəyişdirilməsi.",
      "Refrigerator repair in Tallinn. Freon refill, compressor replacement, diagnostics.",
      "Ремонт холодильников в Таллине. Заправка фреоном, замена компрессора."
    ),
  },
  {
    _id: "service-stove-oven-repair",
    categoryId: "serviceCategory-appliance-repair",
    slugEn: "stove-oven-repair",
    pathSegment: { et: "elektripliitide-remont", ru: "ремонт-плит-и-духовок" },
    icon: "ChefHat",
    order: 4,
    title: ls(
      "Elektripliitide ja ahjude remont",
      "Elektrik Plitə və Sobalarının Təmiri",
      "Electric Stove & Oven Repair",
      "Ремонт электроплит и духовок"
    ),
    shortDescription: lt(
      "Elektripliitide, ahjude ja pindade remont.",
      "Elektrik plitə, soba və səthlərinin təmiri.",
      "Repair of electric stoves, ovens and hobs.",
      "Ремонт электроплит, духовых шкафов и варочных поверхностей."
    ),
    metaTitle: ls(
      "Elektripliitide remont Tallinn | Ahjud ja pinnad",
      "Elektrik Plitə Təmiri Tallinn | Soba və Səthlər",
      "Electric Stove & Oven Repair Tallinn",
      "Ремонт электроплит и духовок в Таллине"
    ),
    metaDescription: lt(
      "Elektripliitide ja ahjude remont Tallinnas. Kiire diagnostika kõigile kaubamärkidele.",
      "Tallinn şəhərində elektrik plitə və sobalarının təmiri.",
      "Electric stove and oven repair in Tallinn. Fast diagnostics for all brands.",
      "Ремонт электроплит и духовок в Таллине. Быстрая диагностика всех марок."
    ),
  },
  {
    _id: "service-appliance-installation",
    categoryId: "serviceCategory-appliance-repair",
    slugEn: "appliance-installation",
    pathSegment: { et: "kodumasinate-paigaldus", ru: "установка-бытовой-техники" },
    icon: "Settings",
    order: 5,
    title: ls(
      "Kodumasinate paigaldus ja ühendamine",
      "Məişət Texnikasının Quraşdırılması və Qoşulması",
      "Appliance Installation & Connection",
      "Установка и подключение бытовой техники"
    ),
    shortDescription: lt(
      "Seadmete professionaalne ühendamine vee- ja elektrivõrku.",
      "Cihazların su və elektrik şəbəkəsinə peşəkar qoşulması.",
      "Professional connection of appliances to water and electrical networks.",
      "Профессиональное подключение техники к водопроводу и электросети."
    ),
    metaTitle: ls(
      "Kodumasinate paigaldus Tallinn | Ühendamine",
      "Məişət Texnikası Quraşdırılması Tallinn",
      "Appliance Installation Tallinn | Water & Electrical Connection",
      "Установка бытовой техники в Таллине | Подключение"
    ),
    metaDescription: lt(
      "Kodumasinate paigaldus ja ühendamine Tallinnas. Vee- ja elektrivõrku ühendamine.",
      "Tallinn şəhərində məişət texnikasının quraşdırılması. Su və elektrik şəbəkəsinə qoşulma.",
      "Appliance installation and connection in Tallinn. Water and electrical hookup.",
      "Установка и подключение бытовой техники в Таллине."
    ),
  },
  {
    _id: "service-builtin-appliance-installation",
    categoryId: "serviceCategory-appliance-repair",
    slugEn: "builtin-appliance-installation",
    pathSegment: { et: "integreeritava-tehnika-paigaldus", ru: "встройка-техники" },
    icon: "Package2",
    order: 6,
    title: ls(
      "Integreeritava tehnika paigaldus",
      "Quraşdırılan Texnikanın Montajı",
      "Built-in Appliance Installation",
      "Встройка встраиваемой техники"
    ),
    shortDescription: lt(
      "Köögimööbli sisse ehitatava tehnika montaaž.",
      "Mətbəx mebelinin içinə quraşdırılan texnikanın montajı.",
      "Installation of built-in kitchen appliances into cabinetry.",
      "Монтаж встраиваемой техники в кухонную мебель."
    ),
    metaTitle: ls(
      "Integreeritava tehnika paigaldus Tallinn | Köögimööbel",
      "Quraşdırılan Texnika Montajı Tallinn | Mətbəx",
      "Built-in Appliance Installation Tallinn | Kitchen",
      "Встройка техники в Таллине | Кухонная мебель"
    ),
    metaDescription: lt(
      "Köögimööbli sisse ehitatava tehnika montaaž Tallinnas. Professionaalne paigaldus.",
      "Tallinn şəhərində mətbəx mebelinin içinə quraşdırılan texnikanın montajı.",
      "Built-in kitchen appliance installation in Tallinn. Professional fitting.",
      "Встройка кухонной техники в мебель в Таллине. Профессиональный монтаж."
    ),
  },

  // ── 5. Gas Works ──────────────────────────────────────────────────────────
  {
    _id: "service-gas-appliance-installation",
    categoryId: "serviceCategory-gas-works",
    slugEn: "gas-appliance-installation",
    pathSegment: { et: "gaasiseadmete-paigaldus", ru: "установка-газового-оборудования" },
    icon: "Flame",
    order: 1,
    title: ls(
      "Gaasiseadmete paigaldus",
      "Qaz Avadanlığının Quraşdırılması",
      "Gas Appliance Installation",
      "Установка газового оборудования"
    ),
    shortDescription: lt(
      "Gaasikatelde, pliitide ja muude seadmete paigaldus ja vahetus.",
      "Qaz qazanlarının, plitələrinin və digər avadanlığın quraşdırılması.",
      "Installation and replacement of gas boilers, stoves and other appliances.",
      "Установка и замена газовых котлов, плит и прочего оборудования."
    ),
    metaTitle: ls(
      "Gaasiseadmete paigaldus Tallinn | Katlad ja pliidid",
      "Qaz Avadanlığı Quraşdırılması Tallinn",
      "Gas Appliance Installation Tallinn | Boilers & Stoves",
      "Установка газового оборудования в Таллине | Котлы и плиты"
    ),
    metaDescription: lt(
      "Gaasiseadmete paigaldus Tallinnas. Katlad, pliidid, boilerid — litsentseeritud meeskond.",
      "Tallinn şəhərində qaz avadanlığının quraşdırılması. Lisenziyalı komanda.",
      "Gas appliance installation in Tallinn. Boilers, stoves, heaters — licensed team.",
      "Установка газового оборудования в Таллине. Котлы, плиты — лицензированная бригада."
    ),
  },
  {
    _id: "service-gas-pipeline-construction",
    categoryId: "serviceCategory-gas-works",
    slugEn: "gas-pipeline-construction",
    pathSegment: { et: "gaasitrasside-ehitus", ru: "прокладка-газопровода" },
    icon: "GitMerge",
    order: 2,
    title: ls(
      "Gaasitrasside ehitus",
      "Qaz Kəmərinin Çəkilişi",
      "Gas Pipeline Construction",
      "Прокладка газопроводов"
    ),
    shortDescription: lt(
      "Uute gaasitrasside rajamine ja laiendamine.",
      "Yeni qaz kəmərlərinin çəkilişi və genişləndirilməsi.",
      "Construction and extension of new gas pipelines.",
      "Прокладка и расширение новых газопроводов."
    ),
    metaTitle: ls(
      "Gaasitrasside ehitus Tallinn | Uute trasside rajamine",
      "Qaz Kəməri Çəkilişi Tallinn | Yeni Boru Xəttləri",
      "Gas Pipeline Construction Tallinn | New Lines",
      "Прокладка газопроводов в Таллине | Новые линии"
    ),
    metaDescription: lt(
      "Gaasitrasside ehitus Tallinnas. Uute trasside rajamine ja laiendamine litsentseeritud spetsialistidega.",
      "Tallinn şəhərində qaz kəmərinin çəkilişi. Lisenziyalı mütəxəssislər.",
      "Gas pipeline construction in Tallinn. New line installation and extension by licensed specialists.",
      "Прокладка газопроводов в Таллине. Монтаж новых линий лицензированными специалистами."
    ),
  },
  {
    _id: "service-gas-leak-detection",
    categoryId: "serviceCategory-gas-works",
    slugEn: "gas-leak-detection",
    pathSegment: { et: "gaasilekke-tuvastamine", ru: "обнаружение-утечки-газа" },
    icon: "AlertTriangle",
    order: 3,
    title: ls(
      "Gaasilekke tuvastamine",
      "Qaz Sızmasının Aşkarlanması",
      "Gas Leak Detection",
      "Обнаружение утечки газа"
    ),
    shortDescription: lt(
      "Ohutuse kontroll ja sızmaların likvideerimine.",
      "Təhlükəsizlik nəzarəti və sızmaların aradan qaldırılması.",
      "Safety inspection and elimination of gas leaks.",
      "Проверка безопасности и устранение утечек газа."
    ),
    metaTitle: ls(
      "Gaasilekke tuvastamine Tallinn | Ohutuskontroll",
      "Qaz Sızması Aşkarlanması Tallinn | Təhlükəsizlik",
      "Gas Leak Detection Tallinn | Safety Inspection",
      "Обнаружение утечки газа в Таллине | Проверка безопасности"
    ),
    metaDescription: lt(
      "Gaasilekke tuvastamine Tallinnas. Ohutuse kontroll ja lekete kiire likvideerimine.",
      "Tallinn şəhərində qaz sızmasının aşkarlanması. Sürətli aradan qaldırılması.",
      "Gas leak detection in Tallinn. Safety inspection and fast leak elimination.",
      "Обнаружение и устранение утечек газа в Таллине. Проверка безопасности."
    ),
  },

  // ── 6. Interior Renovation ────────────────────────────────────────────────
  {
    _id: "service-apartment-renovation",
    categoryId: "serviceCategory-interior-renovation",
    slugEn: "apartment-renovation",
    pathSegment: { et: "korterite-remont", ru: "ремонт-квартир" },
    icon: "Home",
    order: 1,
    title: ls(
      "Korterite remont",
      "Mənzillərin Təmiri",
      "Apartment Renovation",
      "Ремонт квартир"
    ),
    shortDescription: lt(
      "Korterите tam açar teslim təmiri və yenilənmesi.",
      "Mənzillərin tam açar təhvil təmiri və yenilənməsi.",
      "Full turnkey apartment renovation and refurbishment.",
      "Полный ремонт квартир под ключ и обновление."
    ),
    metaTitle: ls(
      "Korterite remont Tallinn | Täielik renoveerimine",
      "Mənzil Təmiri Tallinn | Tam Açar Xidmət",
      "Apartment Renovation Tallinn | Full Turnkey Service",
      "Ремонт квартир в Таллине | Под ключ"
    ),
    metaDescription: lt(
      "Korterite täielik remont Tallinnas. Võtmed kätte lahendus.",
      "Tallinn şəhərində tam açar mənzil təmiri.",
      "Full apartment renovation in Tallinn. Turnkey solutions.",
      "Полный ремонт квартир в Таллине. Решения под ключ."
    ),
  },
  {
    _id: "service-bathroom-renovation",
    categoryId: "serviceCategory-interior-renovation",
    slugEn: "bathroom-renovation",
    pathSegment: { et: "vannitoa-remont", ru: "ремонт-ванной-комнаты" },
    icon: "ShowerHead",
    order: 2,
    title: ls(
      "Vannitoa remont",
      "Həmamın Əsaslı Təmiri",
      "Bathroom Renovation",
      "Ремонт ванных комнат"
    ),
    shortDescription: lt(
      "Vannatubade ja tualettide põhjalik remont, hüdroizolatsioon.",
      "Həmam və tualetlərin əsaslı təmiri, hidroizolyasiya işləri.",
      "Thorough bathroom and toilet renovation with waterproofing.",
      "Капитальный ремонт ванных комнат и туалетов с гидроизоляцией."
    ),
    metaTitle: ls(
      "Vannitoa remont Tallinn | Hüdroizolatsioon",
      "Həmam Təmiri Tallinn | Hidroizolyasiya",
      "Bathroom Renovation Tallinn | Waterproofing",
      "Ремонт ванной комнаты в Таллине | Гидроизоляция"
    ),
    metaDescription: lt(
      "Vannatubade remont Tallinnas. Hüdroizolatsioon, plaatimine, sanitaartehnika.",
      "Tallinn şəhərində həmam təmiri. Hidroizolyasiya, kafel, sanitar texnika.",
      "Bathroom renovation in Tallinn. Waterproofing, tiling and sanitary fittings.",
      "Ремонт ванной комнаты в Таллине. Гидроизоляция, плитка, сантехника."
    ),
  },
  {
    _id: "service-painting-works",
    categoryId: "serviceCategory-interior-renovation",
    slugEn: "painting-works",
    pathSegment: { et: "maalritood", ru: "малярные-работы" },
    icon: "PaintBucket",
    order: 3,
    title: ls("Maalritööd", "Rəngkarlıq İşləri", "Painting Works", "Малярные работы"),
    shortDescription: lt(
      "Seinade pahteldamine, kruntimine ja värvimine.",
      "Divarların qruntlanması, suvaqlanması və rənglənməsi.",
      "Wall filling, priming and painting.",
      "Шпатлёвка, грунтовка и покраска стен."
    ),
    metaTitle: ls(
      "Maalritööd Tallinn | Seinade värvimine ja pahteldamine",
      "Rəngkarlıq İşləri Tallinn | Divar Rənglənməsi",
      "Painting Works Tallinn | Wall Painting & Filling",
      "Малярные работы в Таллине | Покраска и шпатлёвка стен"
    ),
    metaDescription: lt(
      "Maalritööd Tallinnas. Seinade pahteldamine, kruntimine ja professionaalne värvimine.",
      "Tallinn şəhərində rəngkarlıq işləri. Peşəkar divar rənglənməsi.",
      "Painting works in Tallinn. Wall filling, priming and professional painting.",
      "Малярные работы в Таллине. Шпатлёвка, грунтовка и покраска."
    ),
  },
  {
    _id: "service-tiling-works",
    categoryId: "serviceCategory-interior-renovation",
    slugEn: "tiling-works",
    pathSegment: { et: "plaatimistood", ru: "плиточные-работы" },
    icon: "Grid3x3",
    order: 4,
    title: ls("Plaatimistööd", "Kafel İşləri", "Tiling Works", "Плиточные работы"),
    shortDescription: lt(
      "Seinade ja põrandate plaatimine.",
      "Divar və döşəmə kafel işləri.",
      "Wall and floor tiling works.",
      "Укладка плитки на стены и полы."
    ),
    metaTitle: ls(
      "Plaatimistööd Tallinn | Seinad ja põrandad",
      "Kafel İşləri Tallinn | Divar və Döşəmə",
      "Tiling Works Tallinn | Walls & Floors",
      "Плиточные работы в Таллине | Стены и полы"
    ),
    metaDescription: lt(
      "Plaatimistööd Tallinnas. Seinad ja põrandad — professionaalne paigaldus.",
      "Tallinn şəhərində kafel işləri. Divar və döşəmə — peşəkar quraşdırma.",
      "Tiling works in Tallinn. Walls and floors — professional installation.",
      "Плиточные работы в Таллине. Стены и полы — профессиональная укладка."
    ),
  },
  {
    _id: "service-flooring-works",
    categoryId: "serviceCategory-interior-renovation",
    slugEn: "flooring-works",
    pathSegment: { et: "porandatood", ru: "напольные-покрытия" },
    icon: "Layers",
    order: 5,
    title: ls(
      "Põrandatööd",
      "Döşəmə İşləri",
      "Flooring Works",
      "Напольные покрытия"
    ),
    shortDescription: lt(
      "Parketi, laminaadi ja PVC katete paigaldus.",
      "Parket, laminat və PVC örtüklərinin döşənməsi.",
      "Installation of parquet, laminate and PVC flooring.",
      "Укладка паркета, ламината и ПВХ покрытий."
    ),
    metaTitle: ls(
      "Põrandatööd Tallinn | Parkett, laminaat, PVC",
      "Döşəmə İşləri Tallinn | Parket, Laminat, PVC",
      "Flooring Works Tallinn | Parquet, Laminate & PVC",
      "Напольные покрытия в Таллине | Паркет, ламинат, ПВХ"
    ),
    metaDescription: lt(
      "Põrandatööd Tallinnas. Parketi, laminaadi ja PVC katete paigaldus.",
      "Tallinn şəhərində döşəmə işləri. Parket, laminat və PVC örtüklərinin döşənməsi.",
      "Flooring works in Tallinn. Parquet, laminate and PVC flooring installation.",
      "Напольные покрытия в Таллине. Укладка паркета, ламината и ПВХ."
    ),
  },
  {
    _id: "service-drywall-works",
    categoryId: "serviceCategory-interior-renovation",
    slugEn: "drywall-works",
    pathSegment: { et: "kipsitood", ru: "гипсокартонные-работы" },
    icon: "Square",
    order: 6,
    title: ls("Kipsitööd", "Alçipan İşləri", "Drywall Works", "Гипсокартонные работы"),
    shortDescription: lt(
      "Kipsist vaheseinte ja lagede ehitus.",
      "Alçipan arakəsmələri və tavanların tikilməsi.",
      "Construction of drywall partition walls and ceilings.",
      "Монтаж гипсокартонных перегородок и потолков."
    ),
    metaTitle: ls(
      "Kipsitööd Tallinn | Vaheseinte ehitus",
      "Alçipan İşləri Tallinn | Arakəsmə Tikilməsi",
      "Drywall Works Tallinn | Partition Walls & Ceilings",
      "Гипсокартонные работы в Таллине | Перегородки и потолки"
    ),
    metaDescription: lt(
      "Kipsitööd Tallinnas. Vaheseinte ja lagede ehitus kipsist.",
      "Tallinn şəhərində alçipan işləri. Arakəsmə və tavan tikilməsi.",
      "Drywall works in Tallinn. Partition wall and ceiling construction.",
      "Гипсокартонные работы в Таллине. Монтаж перегородок и потолков."
    ),
  },

  // ── 7. Exterior Construction ──────────────────────────────────────────────
  {
    _id: "service-roofing-works",
    categoryId: "serviceCategory-exterior-construction",
    slugEn: "roofing-works",
    pathSegment: { et: "katusetood", ru: "кровельные-работы" },
    icon: "Home",
    order: 1,
    title: ls("Katusetööd", "Dam İşləri", "Roofing Works", "Кровельные работы"),
    shortDescription: lt(
      "Katusekatete paigaldus, remont ja räästaste ehitus.",
      "Dam örtüklərinin quraşdırılması, təmiri və oluğun tikilməsi.",
      "Roof covering installation, repair and gutter construction.",
      "Монтаж кровли, ремонт и строительство водостоков."
    ),
    metaTitle: ls(
      "Katusetööd Tallinn | Katusekatete paigaldus",
      "Dam İşləri Tallinn | Dam Örtükləri",
      "Roofing Works Tallinn | Roof Covering Installation",
      "Кровельные работы в Таллине | Монтаж кровли"
    ),
    metaDescription: lt(
      "Katusetööd Tallinnas. Katusekatete paigaldus, remont ja räästaste ehitus.",
      "Tallinn şəhərində dam işləri. Dam örtüklərinin quraşdırılması.",
      "Roofing works in Tallinn. Roof covering installation, repair and gutters.",
      "Кровельные работы в Таллине. Монтаж, ремонт кровли и водостоков."
    ),
  },
  {
    _id: "service-facade-works",
    categoryId: "serviceCategory-exterior-construction",
    slugEn: "facade-works",
    pathSegment: { et: "fassaaditood", ru: "фасадные-работы" },
    icon: "Building2",
    order: 2,
    title: ls("Fassaaditööd", "Fasad İşləri", "Facade Works", "Фасадные работы"),
    shortDescription: lt(
      "Fassaadide soojustamine, krohvimine ja värvimine.",
      "Fasadların izolyasiyası, suvaqlanması və rənglənməsi.",
      "Facade insulation, plastering and painting.",
      "Утепление, штукатурка и покраска фасадов."
    ),
    metaTitle: ls(
      "Fassaaditööd Tallinn | Soojustamine ja krohvimine",
      "Fasad İşləri Tallinn | İzolyasiya və Suvaqlama",
      "Facade Works Tallinn | Insulation & Plastering",
      "Фасадные работы в Таллине | Утепление и штукатурка"
    ),
    metaDescription: lt(
      "Fassaaditööd Tallinnas. Soojustamine, krohvimine ja värvimine.",
      "Tallinn şəhərində fasad işləri. İzolyasiya, suvaqlama və rəngləmə.",
      "Facade works in Tallinn. Insulation, plastering and painting.",
      "Фасадные работы в Таллине. Утепление, штукатурка и покраска."
    ),
  },
  {
    _id: "service-concrete-works",
    categoryId: "serviceCategory-exterior-construction",
    slugEn: "concrete-works",
    pathSegment: { et: "betoonitood", ru: "бетонные-работы" },
    icon: "HardHat",
    order: 3,
    title: ls("Betoonitööd", "Beton İşləri", "Concrete Works", "Бетонные работы"),
    shortDescription: lt(
      "Vundamentide valamine ja betoonkonstruktsioonid.",
      "Özül tökmə işləri və beton konstruksiyalar.",
      "Foundation pouring and concrete structure construction.",
      "Заливка фундаментов и бетонных конструкций."
    ),
    metaTitle: ls(
      "Betoonitööd Tallinn | Vundamentide valamine",
      "Beton İşləri Tallinn | Özül Tökmə",
      "Concrete Works Tallinn | Foundation Pouring",
      "Бетонные работы в Таллине | Заливка фундаментов"
    ),
    metaDescription: lt(
      "Betoonitööd Tallinnas. Vundamentide valamine ja betoonkonstruktsioonide ehitus.",
      "Tallinn şəhərində beton işləri. Özül tökmə və beton konstruksiyalar.",
      "Concrete works in Tallinn. Foundation pouring and concrete structure construction.",
      "Бетонные работы в Таллине. Заливка фундаментов и конструкций."
    ),
  },
  {
    _id: "service-stairwell-balcony-renovation",
    categoryId: "serviceCategory-exterior-construction",
    slugEn: "stairwell-balcony-renovation",
    pathSegment: { et: "trepikodade-remont", ru: "ремонт-подъездов-и-балконов" },
    icon: "ArrowUp",
    order: 4,
    title: ls(
      "Trepikodade ja rõdude remont",
      "Pilləkən və Eyvanların Təmiri",
      "Stairwell & Balcony Renovation",
      "Ремонт подъездов и балконов"
    ),
    shortDescription: lt(
      "Korteriühistute ühispindade renoveerimine.",
      "Mənzil birliklərinin ortaq sahələrinin yenilənməsi.",
      "Renovation of shared areas for housing associations.",
      "Ремонт мест общего пользования для ТСЖ."
    ),
    metaTitle: ls(
      "Trepikodade remont Tallinn | Korteriühistud",
      "Pilləkən Təmiri Tallinn | Mənzil Birlikləri",
      "Stairwell Renovation Tallinn | Housing Associations",
      "Ремонт подъездов в Таллине | ТСЖ"
    ),
    metaDescription: lt(
      "Trepikodade ja rõdude remont Tallinnas. Korteriühistute ühispindade renoveerimine.",
      "Tallinn şəhərində pilləkən və eyvanların təmiri. Mənzil birlikləri.",
      "Stairwell and balcony renovation in Tallinn for housing associations.",
      "Ремонт подъездов и балконов в Таллине для ТСЖ."
    ),
  },
  {
    _id: "service-paving-stone-installation",
    categoryId: "serviceCategory-exterior-construction",
    slugEn: "paving-stone-installation",
    pathSegment: { et: "tanavakivi-paigaldus", ru: "укладка-брусчатки" },
    icon: "Grid2x2",
    order: 5,
    title: ls(
      "Tänavakivi paigaldus",
      "Yol Daşı Döşənməsi",
      "Paving Stone Installation",
      "Укладка брусчатки"
    ),
    shortDescription: lt(
      "Teede ja sissesõiduteede kiviparketi paigaldus.",
      "Yolların və girişlərin daş parket döşənməsi.",
      "Stone paving installation for roads and driveways.",
      "Укладка брусчатки для дорог и въездов."
    ),
    metaTitle: ls(
      "Tänavakivi paigaldus Tallinn | Kiviparketi",
      "Yol Daşı Döşənməsi Tallinn | Daş Parket",
      "Paving Stone Installation Tallinn | Driveways",
      "Укладка брусчатки в Таллине | Дорожки и въезды"
    ),
    metaDescription: lt(
      "Tänavakivi paigaldus Tallinnas. Teede ja sissesõiduteede kiviparketi paigaldus.",
      "Tallinn şəhərində yol daşı döşənməsi. Yollar və girişlər.",
      "Paving stone installation in Tallinn. Roads and driveways.",
      "Укладка брусчатки в Таллине. Дорожки, въезды и площадки."
    ),
  },

  // ── 8. Design & Planning ──────────────────────────────────────────────────
  {
    _id: "service-interior-design",
    categoryId: "serviceCategory-design-planning",
    slugEn: "interior-design",
    pathSegment: { et: "sisekujundus", ru: "дизайн-интерьера" },
    icon: "Palette",
    order: 1,
    title: ls(
      "Sisekujundus",
      "Daxili Dizayn",
      "Interior Design",
      "Дизайн интерьера"
    ),
    shortDescription: lt(
      "Interjöör- ja ergonoomikakujundus.",
      "İnteryer dizaynı və erqonomika həlləri.",
      "Interior and ergonomic design solutions.",
      "Дизайн интерьера и эргономические решения."
    ),
    metaTitle: ls(
      "Sisekujundus Tallinn | Interjöör ja ergonoomika",
      "Daxili Dizayn Tallinn | İnteryer",
      "Interior Design Tallinn | Ergonomic Solutions",
      "Дизайн интерьера в Таллине | Эргономичные решения"
    ),
    metaDescription: lt(
      "Sisekujundus Tallinnas. Professionaalne interjööriplaneerimine ja -disain.",
      "Tallinn şəhərində daxili dizayn. Peşəkar interyer planlaması.",
      "Interior design in Tallinn. Professional interior planning and design.",
      "Дизайн интерьера в Таллине. Профессиональное планирование пространства."
    ),
  },
  {
    _id: "service-3d-visualization",
    categoryId: "serviceCategory-design-planning",
    slugEn: "3d-visualization",
    pathSegment: { et: "3d-vizualiseerimine", ru: "3d-визуализация" },
    icon: "Box",
    order: 2,
    title: ls(
      "3D vizualiseerimine",
      "3D Vizualizasiya",
      "3D Visualization",
      "3D визуализация"
    ),
    shortDescription: lt(
      "Tulevase remondi visuaalne fotorealistlik vaade.",
      "Gələcək təmirin vizual fotorealistik görüntüsü.",
      "Photorealistic visual preview of the future renovation.",
      "Фотореалистичная визуализация будущего ремонта."
    ),
    metaTitle: ls(
      "3D vizualiseerimine Tallinn | Remondi eelvaade",
      "3D Vizualizasiya Tallinn | Təmir Görüntüsü",
      "3D Visualization Tallinn | Renovation Preview",
      "3D визуализация в Таллине | Предпросмотр ремонта"
    ),
    metaDescription: lt(
      "3D vizualiseerimine Tallinnas. Fotorealistlik eelvaade enne remondi algust.",
      "Tallinn şəhərində 3D vizualizasiya. Təmirdən əvvəl fotorealistik görüntü.",
      "3D visualization in Tallinn. Photorealistic preview before renovation begins.",
      "3D визуализация в Таллине. Фотореалистичный просмотр до начала ремонта."
    ),
  },
  {
    _id: "service-construction-projects",
    categoryId: "serviceCategory-design-planning",
    slugEn: "construction-projects",
    pathSegment: { et: "ehitusprojektid", ru: "строительное-проектирование" },
    icon: "FileText",
    order: 3,
    title: ls(
      "Ehitusprojektid",
      "Tikinti Layihələri",
      "Construction Projects",
      "Строительное проектирование"
    ),
    shortDescription: lt(
      "Vee-, kanalisatsiooni- ja kütteprojektide koostamine.",
      "Su, kanalizasiya və istilik sistemlərinin layihələrinin hazırlanması.",
      "Preparation of water supply, drainage and heating system projects.",
      "Разработка проектов водоснабжения, канализации и отопления."
    ),
    metaTitle: ls(
      "Ehitusprojektid Tallinn | Vesi, kanalisatsioon, küte",
      "Tikinti Layihələri Tallinn | Su, Kanalizasiya, İstilik",
      "Construction Projects Tallinn | Water, Drainage, Heating",
      "Строительное проектирование в Таллине | Водоснабжение, канализация"
    ),
    metaDescription: lt(
      "Ehitusprojektide koostamine Tallinnas. Vee-, kanalisatsiooni- ja küttesüsteemide projektid.",
      "Tallinn şəhərində tikinti layihələrinin hazırlanması.",
      "Construction project preparation in Tallinn. Water, drainage and heating system designs.",
      "Разработка строительных проектов в Таллине."
    ),
  },
  {
    _id: "service-as-built-drawings",
    categoryId: "serviceCategory-design-planning",
    slugEn: "as-built-drawings",
    pathSegment: { et: "teostusjoonised", ru: "исполнительная-документация" },
    icon: "Ruler",
    order: 4,
    title: ls(
      "Teostusjoonised",
      "İcra Sənədləri",
      "As-Built Drawings",
      "Исполнительная документация"
    ),
    shortDescription: lt(
      "Tehtud tööde ametlik vormistamine ja dokumentatsioon.",
      "Tamamlanmış işlərin rəsmi sənədləşdirilməsi.",
      "Official documentation of completed works.",
      "Официальное оформление и документация выполненных работ."
    ),
    metaTitle: ls(
      "Teostusjoonised Tallinn | Ametlik dokumentatsioon",
      "İcra Sənədləri Tallinn | Rəsmi Sənədləşmə",
      "As-Built Drawings Tallinn | Official Documentation",
      "Исполнительная документация в Таллине"
    ),
    metaDescription: lt(
      "Teostusjooniste koostamine Tallinnas. Tehtud tööde ametlik vormistamine.",
      "Tallinn şəhərində icra sənədlərinin hazırlanması.",
      "As-built drawing preparation in Tallinn. Official documentation of completed works.",
      "Исполнительная документация в Таллине. Официальное оформление работ."
    ),
  },

  // ── 9. Property Management & Support ─────────────────────────────────────
  {
    _id: "service-property-maintenance",
    categoryId: "serviceCategory-management-support",
    slugEn: "property-maintenance",
    pathSegment: { et: "kinnisvara-hooldus", ru: "обслуживание-недвижимости" },
    icon: "Building",
    order: 1,
    title: ls(
      "Kinnisvara hooldus",
      "Daşınmaz Əmlakın Saxlanması",
      "Property Maintenance",
      "Обслуживание недвижимости"
    ),
    shortDescription: lt(
      "Tehnosüsteemide regulaarne kontroll korteriühistutele.",
      "Mənzil birlikləri üçün texniki sistemlərin müntəzəm nəzarəti.",
      "Regular inspection of technical systems for housing associations.",
      "Регулярный контроль технических систем для ТСЖ."
    ),
    metaTitle: ls(
      "Kinnisvara hooldus Tallinn | Korteriühistud",
      "Daşınmaz Əmlak Saxlanması Tallinn | Mənzil Birlikləri",
      "Property Maintenance Tallinn | Housing Associations",
      "Обслуживание недвижимости в Таллине | ТСЖ"
    ),
    metaDescription: lt(
      "Kinnisvara hooldus Tallinnas. Tehnosüsteemide regulaarne kontroll ja hooldus.",
      "Tallinn şəhərində daşınmaz əmlakın saxlanması.",
      "Property maintenance in Tallinn. Regular inspection and upkeep of technical systems.",
      "Обслуживание недвижимости в Таллине. Регулярный контроль систем."
    ),
  },
  {
    _id: "service-insurance-claims",
    categoryId: "serviceCategory-management-support",
    slugEn: "insurance-claims",
    pathSegment: { et: "kindlustusjuhtumid", ru: "страховые-случаи" },
    icon: "FileCheck",
    order: 2,
    title: ls(
      "Kindlustusjuhtumid",
      "Sığorta Halları",
      "Insurance Claims",
      "Страховые случаи"
    ),
    shortDescription: lt(
      "Kahjude hindamine ja ametlike kalkulatsioonide koostamine.",
      "Zərərlərin qiymətləndirilməsi və rəsmi hesablamaların hazırlanması.",
      "Damage assessment and preparation of official cost estimates.",
      "Оценка ущерба и составление официальных смет."
    ),
    metaTitle: ls(
      "Kindlustusjuhtumid Tallinn | Kahjude hindamine",
      "Sığorta Halları Tallinn | Zərər Qiymətləndirilməsi",
      "Insurance Claims Tallinn | Damage Assessment",
      "Страховые случаи в Таллине | Оценка ущерба"
    ),
    metaDescription: lt(
      "Kindlustusjuhtumite käsitlemine Tallinnas. Kahjude hindamine ja kalkulatsioonid.",
      "Tallinn şəhərində sığorta hallarının idarə edilməsi. Zərər qiymətləndirilməsi.",
      "Insurance claim handling in Tallinn. Damage assessment and cost estimates.",
      "Страховые случаи в Таллине. Оценка ущерба и составление смет."
    ),
  },
  {
    _id: "service-container-rental",
    categoryId: "serviceCategory-management-support",
    slugEn: "container-rental",
    pathSegment: { et: "konteinerite-rent", ru: "аренда-контейнеров" },
    icon: "Package",
    order: 3,
    title: ls(
      "Konteinerite rent",
      "Konteynerlərin İcarəsi",
      "Container Rental",
      "Аренда контейнеров"
    ),
    shortDescription: lt(
      "Ehitusprügi äravedu konteineritega.",
      "Konteynerlərlə tikinti tullantılarının kənarlaşdırılması.",
      "Construction waste removal with containers.",
      "Вывоз строительного мусора в контейнерах."
    ),
    metaTitle: ls(
      "Konteinerite rent Tallinn | Ehitusprügi äravedu",
      "Konteyner İcarəsi Tallinn | Tikinti Tullantısı",
      "Container Rental Tallinn | Construction Waste Removal",
      "Аренда контейнеров в Таллине | Вывоз строймусора"
    ),
    metaDescription: lt(
      "Konteinerite rent Tallinnas. Ehitusprügi kiire ja mugav äravedu.",
      "Tallinn şəhərində konteyner icarəsi. Tikinti tullantılarının sürətli kənarlaşdırılması.",
      "Container rental in Tallinn. Fast and convenient construction waste removal.",
      "Аренда контейнеров в Таллине. Быстрый вывоз строительного мусора."
    ),
  },
  {
    _id: "service-cleaning-services",
    categoryId: "serviceCategory-management-support",
    slugEn: "cleaning-services",
    pathSegment: { et: "puhastustood", ru: "клининговые-услуги" },
    icon: "Sparkles",
    order: 4,
    title: ls(
      "Puhastustööd",
      "Təmizlik İşləri",
      "Cleaning Services",
      "Клининговые услуги"
    ),
    shortDescription: lt(
      "Ehitusjärgne ja üldine koristus.",
      "Tikintidən sonrakı və ümumi təmizlik işləri.",
      "Post-construction and general cleaning services.",
      "Послестроительная и общая уборка."
    ),
    metaTitle: ls(
      "Puhastustööd Tallinn | Ehitusjärgne koristus",
      "Təmizlik İşləri Tallinn | Tikintidən Sonrakı Təmizlik",
      "Cleaning Services Tallinn | Post-Construction Cleaning",
      "Клининг в Таллине | Послестроительная уборка"
    ),
    metaDescription: lt(
      "Puhastustööd Tallinnas. Ehitusjärgne koristus ja üldine puhastus.",
      "Tallinn şəhərində təmizlik işləri. Tikintidən sonrakı uborka.",
      "Cleaning services in Tallinn. Post-construction and general cleaning.",
      "Клининговые услуги в Таллине. Послестроительная и общая уборка."
    ),
  },
];

// ── upsert ───────────────────────────────────────────────────────────────────
async function upsertService(svc) {
  const {
    _id,
    categoryId,
    slugEn,
    pathSegment,
    ...rest
  } = svc;

  const doc = {
    _id,
    _type: "service",
    slug: slug(slugEn),
    pathSegment,
    category: ref(categoryId),
    ...rest,
  };

  // Also check for existing service by slug (e.g. from old seed scripts)
  const existingById  = await client.fetch(`*[_id == $id][0]._id`, { id: _id });
  const existingBySlug = !existingById
    ? await client.fetch(`*[_type == "service" && slug.current == $s][0]._id`, { s: slugEn })
    : null;

  const targetId = existingById || existingBySlug;

  if (targetId) {
    await client.patch(targetId).set({ ...doc, _id: targetId }).commit();
    console.log(`  ✏️  Patched  → ${targetId}`);
  } else {
    await client.createOrReplace(doc);
    console.log(`  ✅  Created → ${_id}`);
  }
}

async function run() {
  console.log(`\n🚀  Seeding ${SERVICES.length} services across 9 categories…\n`);

  // Verify all category IDs exist first
  const catIds = [...new Set(SERVICES.map((s) => s.categoryId))];
  const existing = await client.fetch(
    `*[_id in $ids]._id`,
    { ids: catIds }
  );
  const missing = catIds.filter((id) => !existing.includes(id));
  if (missing.length) {
    console.error("❌  Missing categories:", missing.join(", "));
    console.error("   Run  npm run seed:service-categories  first.");
    process.exit(1);
  }

  let current = null;
  for (const svc of SERVICES) {
    if (svc.categoryId !== current) {
      current = svc.categoryId;
      console.log(`\n📂  ${current}`);
    }
    await upsertService(svc);
  }

  console.log("\n✨  Done! All services are now live in Sanity.");
  console.log("   Open /studio → 🔧 Teenused / Services to review.\n");
}

run().catch((err) => {
  console.error("❌  Script failed:", err.message);
  process.exit(1);
});
