import { createClient } from "@sanity/client";

// Ensure environment variables are loaded
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing Sanity credentials in environment.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const MAPPINGS = {
  "bathroom-repair": { et: "vannitoa-remont", ru: "ремонт-ванной-комнаты" },
  "boiler-installation": { et: "boilerite-paigaldus", ru: "установка-бойлеров" },
  "cleaning-services": { et: "koristusteenus", ru: "услуги-по-уборке" },
  "plumbing-works-tallinn": { et: "santehnilised-tood", ru: "сантехнические-работы" },
  "blockage-clearing": { et: "ummistuse-likvideerimine", ru: "промывка-канализации" },
  "pipe-freezing": { et: "torude-kulmutamine", ru: "заморозка-труб" },
  "construction-works": { et: "ehitustood", ru: "строительные-работы" },
  "concrete-works": { et: "betoonitood", ru: "бетонные-работы" },
  "apartment-office-repair": { et: "korterite-remont", ru: "ремонт-квартир-и-офисов" },
  "replacement-risers": { et: "pustikute-vahetus", ru: "замена-стояков" },
  "entrance-repair": { et: "trepikodade-remont", ru: "ремонт-подъездов" },
  "paver-installation": { et: "tanavakivi-paigaldus", ru: "установка-брусчатки" },
  "toilet-installation": { et: "wc-poti-paigaldus", ru: "установка-унитаза" },
  "design": { et: "disain", ru: "дизайн-проект" },
};

async function migrate() {
  console.log("🚀 Starting Sanity slug migration...");
  const services = await client.fetch('*[_type == "service"]');
  console.log(`Found ${services.length} services in Sanity.`);

  for (const service of services) {
    const slug = service.slug?.current;
    const mapping = MAPPINGS[slug];

    if (mapping) {
      console.log(`Updating "${slug}" [${service._id}]...`);
      await client
        .patch(service._id)
        .set({
          pathSegment: {
            et: mapping.et,
            ru: mapping.ru,
          },
        })
        .commit();
      console.log(`✅ Success: ET -> ${mapping.et}, RU -> ${mapping.ru}`);
    } else {
      console.log(`ℹ️ No mapping for "${slug}", skipping.`);
    }
  }
  console.log("✨ Migration complete!");
}

migrate().catch(err => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
