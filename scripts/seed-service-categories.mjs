/**
 * scripts/seed-service-categories.mjs
 * Creates or patches all 9 service categories with ET / AZ / EN / RU titles.
 *
 * Run: node --env-file=.env.local scripts/seed-service-categories.mjs
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (default: production)
 *   SANITY_API_WRITE_TOKEN
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-20",
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

// ── helpers ──────────────────────────────────────────────────────────────────
function ls(et, az, en, ru) {
  return { _type: "localeString", et, az, en, ru };
}
function lt(et, az, en, ru) {
  return { _type: "localeText", et, az, en, ru };
}

// ── category data ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    _id:   "serviceCategory-plumbing-works",
    slug:  "plumbing-works",
    icon:  "Droplets",
    order: 10,
    title: ls(
      "Santehnilised tööd",
      "Santexnik İşləri",
      "Plumbing Works",
      "Сантехнические работы"
    ),
    description: lt(
      "Torude paigaldus, remont ja avariitööd. Vee- ja kanalisatsioonisüsteemid.",
      "Boru quraşdırılması, təmiri və avari işləri. Su və kanalizasiya sistemləri.",
      "Pipe installation, repair and emergency works. Water and drainage systems.",
      "Монтаж, ремонт и аварийные работы с трубами. Водоснабжение и канализация."
    ),
  },
  {
    _id:   "serviceCategory-high-pressure-washing",
    slug:  "high-pressure-washing",
    icon:  "Waves",
    order: 20,
    title: ls(
      "Survepesu ja eritehnika",
      "Yüksək Təzyiqli Yuma və Xüsusi Texnika",
      "High-Pressure Washing & Special Equipment",
      "Гидродинамическая промывка и спецтехника"
    ),
    description: lt(
      "Kanalisatsiooni survepesu ja fekaalivedu spetsiaaltehnikaga.",
      "Kanalizasiyanın yüksək təzyiqli yuyulması və xüsusi texnika xidmətləri.",
      "Sewer jetting and sewage removal with specialized machinery.",
      "Промывка канализации и откачка жидких отходов спецтехникой."
    ),
  },
  {
    _id:   "serviceCategory-electrical-works",
    slug:  "electrical-works",
    icon:  "Zap",
    order: 30,
    title: ls(
      "Elektritööd",
      "Elektrik İşləri",
      "Electrical Works",
      "Электромонтажные работы"
    ),
    description: lt(
      "Elektripaigaldised, kaablid, kilbid ja valgustus — kõik elektritööd.",
      "Elektrik qurğuları, kabelləri, panolar və işıqlandırma — bütün elektrik işləri.",
      "Electrical installations, cables, switchboards and lighting — all electrical works.",
      "Электромонтаж, кабели, щитовые и освещение — все виды электрических работ."
    ),
  },
  {
    _id:   "serviceCategory-appliance-repair",
    slug:  "appliance-repair",
    icon:  "Settings",
    order: 40,
    title: ls(
      "Kodumasinate remont ja paigaldus",
      "Məişət Texnikasının Təmiri və Quraşdırılması",
      "Appliance Repair & Installation",
      "Ремонт и установка бытовой техники"
    ),
    description: lt(
      "Pesu-, nõudepesumasing, külmik, pliit ja muude kodumasinate remont ning paigaldus.",
      "Paltaryuyan, qabyuyan maşınlar, soyuducular, plitələr və digər məişət texnikasının təmiri.",
      "Washing machines, dishwashers, fridges, stoves and other home appliance repair and installation.",
      "Ремонт стиральных, посудомоечных машин, холодильников, плит и прочей бытовой техники."
    ),
  },
  {
    _id:   "serviceCategory-gas-works",
    slug:  "gas-works",
    icon:  "Flame",
    order: 50,
    title: ls(
      "Gaasitööd",
      "Qaz İşləri",
      "Gas Works",
      "Газовые работы"
    ),
    description: lt(
      "Gaasikatelde paigaldus, torustikud ja lekete tuvastamine litsentseeritud spetsialistidelt.",
      "Qaz qazanlarının quraşdırılması, boru xətləri və sızmaların aşkarlanması lisenziyalı mütəxəssislər tərəfindən.",
      "Gas boiler installation, pipelines and leak detection by licensed specialists.",
      "Монтаж газовых котлов, трубопроводов и обнаружение утечек лицензированными специалистами."
    ),
  },
  {
    _id:   "serviceCategory-interior-renovation",
    slug:  "interior-renovation",
    icon:  "PaintBucket",
    order: 60,
    title: ls(
      "Siseviimistlus ja remont",
      "Daxili Təmir İşləri",
      "Interior Renovation & Finishing",
      "Внутренняя отделка и ремонт"
    ),
    description: lt(
      "Korterite ja vannitubade remont, maalri-, plaatimis- ja põrandatööd.",
      "Mənzillərin və hamamların əsaslı təmiri, rəngkarlıq, kafel və döşəmə işləri.",
      "Apartment and bathroom renovation, painting, tiling and flooring works.",
      "Ремонт квартир и ванных комнат, малярные, плиточные и напольные работы."
    ),
  },
  {
    _id:   "serviceCategory-exterior-construction",
    slug:  "exterior-construction",
    icon:  "Building2",
    order: 70,
    title: ls(
      "Välisehitus ja fassaaditööd",
      "Xarici Tikinti İşləri",
      "Exterior Construction & Facade Works",
      "Внешнее строительство и фасадные работы"
    ),
    description: lt(
      "Katused, fassaadid, betoonitööd, rõdud ja tänavakivi paigaldus.",
      "Damlar, fasadlar, beton işləri, eyvanlar və yol daşı döşənməsi.",
      "Roofing, facades, concrete works, balconies and paving stone installation.",
      "Кровля, фасады, бетонные работы, балконы и укладка брусчатки."
    ),
  },
  {
    _id:   "serviceCategory-design-planning",
    slug:  "design-planning",
    icon:  "Ruler",
    order: 80,
    title: ls(
      "Disain ja planeerimine",
      "Dizayn və Layihələndirmə",
      "Design & Planning",
      "Дизайн и планирование"
    ),
    description: lt(
      "Sisekujundus, 3D visualiseerimine ja ehitusprojektide koostamine.",
      "Daxili dizayn, 3D vizualizasiya və tikinti layihələrinin hazırlanması.",
      "Interior design, 3D visualization and construction project planning.",
      "Дизайн интерьера, 3D визуализация и разработка строительных проектов."
    ),
  },
  {
    _id:   "serviceCategory-management-support",
    slug:  "management-support",
    icon:  "ClipboardList",
    order: 90,
    title: ls(
      "Haldus ja tugiteenused",
      "İdarəetmə və Dəstək",
      "Property Management & Support",
      "Управление и вспомогательные услуги"
    ),
    description: lt(
      "Kinnisvara hooldus, kindlustusjuhtumid, konteinerite rent ja puhastustööd.",
      "Daşınmaz əmlakın saxlanması, sığorta halları, konteyner icarəsi və təmizlik işləri.",
      "Property maintenance, insurance claims, container rental and cleaning services.",
      "Обслуживание недвижимости, страховые случаи, аренда контейнеров и клининг."
    ),
  },
];

// ── upsert ───────────────────────────────────────────────────────────────────
async function upsertCategory(cat) {
  const { _id, slug, ...rest } = cat;

  const doc = {
    _id,
    _type: "serviceCategory",
    slug: { _type: "slug", current: slug },
    ...rest,
  };

  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: _id });

  if (existing) {
    await client.patch(_id).set(doc).commit();
    console.log(`  ✏️  Patched  → ${_id}`);
  } else {
    await client.createOrReplace(doc);
    console.log(`  ✅  Created → ${_id}`);
  }
}

async function run() {
  console.log(`\n🚀  Seeding ${CATEGORIES.length} service categories…\n`);

  for (const cat of CATEGORIES) {
    await upsertCategory(cat);
  }

  console.log("\n✨  Done! All categories are live in Sanity.");
  console.log("   Next: run  npm run seed:grouped-services  to seed sub-services.\n");
}

run().catch((err) => {
  console.error("❌  Script failed:", err.message);
  process.exit(1);
});
