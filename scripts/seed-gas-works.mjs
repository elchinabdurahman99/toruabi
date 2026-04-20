/**
 * scripts/seed-gas-works.mjs
 * Creates the "Gas Works" service document in Sanity with trilingual content.
 * Run: node --env-file=.env.local scripts/seed-gas-works.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion= process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token     = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// ── helpers ──────────────────────────────────────────────────────────────────
function localeString(et, en, ru) { return { _type: "localeString", et, en, ru }; }
function localeText(et, en, ru)   { return { _type: "localeText",   et, en, ru }; }

function block(et, en, ru) {
  return {
    _type: "localeBlock",
    et: toPortableText(et),
    en: toPortableText(en),
    ru: toPortableText(ru),
  };
}

/** Converts a plain-text string with newlines into minimal Portable Text blocks. */
function toPortableText(text) {
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((para, i) => ({
      _key:  `b${i}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: `c${i}`, _type: "span", text: para.trim(), marks: [] }],
    }));
}

// ── content ──────────────────────────────────────────────────────────────────

const ET_BODY = `Professionaalsed gaasitööd ja sertifitseeritud hooldus

Meie meeskond teostab kõiki keerukaid gaasitöid vastavalt ohutusstandarditele. Oleme spetsialiseerunud tuntud kaubamärkide nagu Junkers, Bosch, Viessmann, Vaillant ja Buderus seadmete hooldusele ja remondile. Meil on kehtiv A-kategooria litsents, mis annab teile garantii töökvaliteedi ja turvalisuse kohta.

Meie teenused:

Gaasikatelde ja veesoojendite (boilerite) diagnostika ja remont.

Süsteemide perioodiline hooldus (aitab säästa kuni 15% küttekuludelt).

Gaasilekete kontroll ja torustike surveproovid.

Uute gaasiseadmete paigaldus ja seadistamine.`;

const EN_BODY = `Licensed Gas Services and Specialized Equipment Maintenance

Safety and efficiency are our top priorities. We offer high-end gas services, specializing in the maintenance and repair of top-tier brands such as Junkers, Bosch, Viessmann, and Vaillant. With our certified expertise, we ensure your heating system operates at peak performance while meeting all Estonian safety regulations.

Key Services:

Expert repair and annual servicing of gas boilers.

Gas leak detection and safety certification.

Installation of modern, energy-efficient gas systems.

Emergency gas repairs and component replacements.`;

const RU_BODY = `Квалифицированные газовые услуги и сервис оборудования

Нужен качественный сервис для вашего газового оборудования? Мы специализируемся на работе с ведущими мировыми брендами: Junkers, Bosch, Viessmann, Wolf и др. Наши мастера имеют официальные допуски и сертификаты для проведения работ любой сложности, гарантируя полную герметичность и эффективность вашей системы.

Наши услуги:

Профессиональный ремонт и чистка газовых котлов.

Настройка автоматики и проверка эффективности сгорания газа.

Устранение утечек и замена старых газовых труб.

Проектирование и монтаж систем отопления «под ключ».`;

const doc = {
  _type: "service",

  title: localeString(
    "Gaasitööd ja katelde hooldus",
    "Gas Works & Boiler Maintenance",
    "Газовые работы и обслуживание котлов"
  ),

  slug: { _type: "slug", current: "gas-works" },

  pathSegment: {
    et: "gaasitood",
    ru: "газовые-работы",
  },

  icon: "Flame",

  shortDescription: localeText(
    "Litsentseeritud gaasitööd Tallinnas. Junkers, Bosch, Viessmann seadmete paigaldus ja hooldus.",
    "Licensed gas engineering in Tallinn. Specialized in Junkers, Bosch, and Viessmann boiler maintenance.",
    "Лицензированный ремонт и обслуживание газовых котлов в Таллине."
  ),

  body: block(ET_BODY, EN_BODY, RU_BODY),

  metaTitle: localeString(
    "Gaasitööd, katelde remont ja hooldus (Junkers, Bosch) | Ajsan",
    "Licensed Gas Works | Repair of Bosch, Junkers, Viessmann Boilers | Ajsan",
    "Газовые работы и ремонт котлов Junkers, Bosch, Viessmann | Ajsan"
  ),

  metaDescription: localeText(
    "Litsentseeritud gaasitööd Tallinnas. Junkers, Bosch, Viessmann seadmete paigaldus ja hooldus. Ohutu gaasisüsteemide kontroll. Helista ja broneeri aeg!",
    "Professional gas engineering in Tallinn. Specialized in Junkers, Bosch, and Viessmann boiler maintenance. Certified safety checks and repairs. 24/7 support.",
    "Лицензированный ремонт и обслуживание газовых котлов в Таллине. Работаем с брендами Bosch, Junkers, Viessmann. Безопасность и официальная гарантия."
  ),

  order: 20,
};

// ── upsert ───────────────────────────────────────────────────────────────────
async function run() {
  // Check if already exists
  const existing = await client.fetch(
    `*[_type == "service" && slug.current == "gas-works"][0]._id`
  );

  if (existing) {
    console.log(`ℹ️  Service "gas-works" already exists (${existing}). Patching instead of creating.`);
    await client.patch(existing).set(doc).commit();
    console.log(`✅  Patched: ${existing}`);
  } else {
    const created = await client.create(doc);
    console.log(`✅  Created: ${created._id}`);
  }

  console.log("\n✨  Done! Gas Works service is now live in Sanity.");
  console.log("   URLs:");
  console.log("   ET → /et/teenused/gaasitood");
  console.log("   EN → /en/services/gas-works");
  console.log("   RU → /ru/услуги/газовые-работы");
}

run().catch(err => {
  console.error("❌  Script failed:", err.message);
  process.exit(1);
});
