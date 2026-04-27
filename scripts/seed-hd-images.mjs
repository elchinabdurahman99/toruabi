/**
 * scripts/seed-hd-images.mjs
 * Replaces all service images with curated HD photos from Pexels CDN.
 * Pexels CDN URLs are publicly accessible without an API key.
 *
 * Run: node --env-file=.env.local scripts/seed-hd-images.mjs
 */
import { createClient } from "@sanity/client";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
});

// ── Pexels CDN helper (no API key required for direct CDN access) ──────────────
function pexelsUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
}

async function downloadImg(pexelsId, filename) {
  const url = pexelsUrl(pexelsId);
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; HomeServiceBot/1.0)",
      "Referer": "https://www.pexels.com/",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for pexels/${pexelsId}`);
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.startsWith("image")) throw new Error(`Not image (${ct}) for ${pexelsId}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

async function patchImages(slug, heroId, galId) {
  const doc = await client.fetch(
    `*[_type=="service" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id}`,
    { s: slug }
  );
  if (!doc) { console.error(`  ✗ NOT FOUND: ${slug}`); return; }

  let heroAsset;
  try {
    heroAsset = await downloadImg(heroId, `${slug}-hero.jpg`);
  } catch (e) {
    console.error(`  ✗ hero failed (${slug}): ${e.message}`); return;
  }

  let galAsset;
  try {
    galAsset = await downloadImg(galId, `${slug}-gallery.jpg`);
  } catch (e) {
    console.error(`  ✗ gallery failed (${slug}): ${e.message}`);
    // patch hero only
    await client.patch(doc._id).set({
      image: { _type: "image", asset: { _type: "reference", _ref: heroAsset._id } },
    }).commit();
    console.log(`  ~ hero-only: ${slug}`); return;
  }

  await client.patch(doc._id).set({
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: heroAsset._id },
    },
    gallery: [{
      _type: "image", _key: "g0",
      asset: { _type: "reference", _ref: galAsset._id },
    }],
  }).commit();
  console.log(`  ✓ ${slug}`);
}

// ── Curated service → Pexels photo ID mapping ─────────────────────────────────
// [slug, heroPhotoId, galleryPhotoId]
// All IDs are free Pexels photos (verified accessible via CDN)
const SERVICES = [
  // ── EMERGENCY PLUMBING ──────────────────────────────────────────────────────
  ["24h-emergency-plumbing",          "32588548", "15206136"],  // plumber repairing pipe
  ["plumber-24h-tallinn",             "6419128",  "32588548"],  // installing steel pipes
  ["plumber-on-call",                 "6419128",  "14953886"],  // tools on blueprint

  // ── PIPE WORKS ──────────────────────────────────────────────────────────────
  ["pipe-works",                      "8488035",  "6419128"],   // exposed pipes / installing pipes
  ["pipe-repair-replacement",         "32588548", "8488035"],   // plumber at work
  ["plumbing-works-tallinn",          "6419128",  "11658940"],  // pipes / water meter
  ["external-water-supply",           "13726337", "16138946"],  // pipeline valves
  ["wells-sale-installation",         "16138946", "12527113"],  // industrial pipes / gate valve
  ["defrosting-pipes",                "8488035",  "11658940"],  // exposed pipes / water meter
  ["pipe-freezing",                   "11658940", "8488035"],   // water meter / pipes

  // ── TAP / FAUCET / TOILET ────────────────────────────────────────────────────
  ["tap-mixer-replacement",           "4239115",  "9462312"],   // glove cleaning sink / scrubbing sink
  ["toilet-installation",             "5768318",  "220612"],    // shower drain / sink drainage
  ["water-meter-replacement",         "11658940", "35290675"],  // water meter / adjusting water pump

  // ── DRAIN / BLOCKAGE ────────────────────────────────────────────────────────
  ["drain-blockage-removal",          "9462312",  "5768318"],   // glove scrubbing / shower drain
  ["blockage-clearing",               "5768318",  "220612"],    // shower drain / sink drainage

  // ── HEATING / RADIATOR ──────────────────────────────────────────────────────
  ["radiator-installation",           "12034871", "3125905"],   // white radiator in room / electric heater
  ["floor-heating",                   "3125905",  "12034871"],  // heater / radiator
  ["boiler-installation",             "35290675", "12034871"],  // adjusting water pump / radiator

  // ── RISER / VERTICAL PIPES ──────────────────────────────────────────────────
  ["riser-pipe-replacement",          "8488035",  "13726337"],  // exposed pipes / pipeline valve
  ["replacement-risers",              "13726337", "8488035"],   // pipeline valve / exposed pipes

  // ── SEWER / HIGH-PRESSURE JETTING ───────────────────────────────────────────
  ["sewer-jetting",                   "36842620", "13319904"],  // night drain cleaning / street drain
  ["sewage-removal",                  "36842620", "16138946"],  // drain cleaning / industrial pipes
  ["jetting-truck-services",          "36842620", "5711732"],   // drain cleaning / frosted industrial pipes
  ["sewer-jetting-and-septic-pumping-tallinn", "5711732", "36842620"], // industrial pipes / drain cleaning
  ["pressure-flushing-sewer",         "36842620", "5768318"],   // drain cleaning / shower drain
  ["sewerage-video-inspection",       "13319904", "8488035"],   // street drain / exposed pipes

  // ── PIPE INSPECTION / WELDING ────────────────────────────────────────────────
  ["pipe-cctv-inspection",            "8488035",  "13319904"],  // exposed pipes / street drain
  ["pem-pipe-welding",                "12527113", "7616004"],   // gate valve / shut-off valve
  ["polyethylene-welding",            "7616004",  "12527113"],  // shut-off valve / gate valve

  // ── ELECTRICAL EMERGENCY ─────────────────────────────────────────────────────
  ["24h-emergency-electrical",        "257736",   "27928762"],  // electrician fixing switchboard / man at panel
  ["electrical-installation",         "27928762", "17842832"],  // man at electrical panel / by fuse box
  ["electrician-services",            "17842832", "257736"],    // fuse box / fixing switchboard

  // ── SWITCHBOARD / WIRING ─────────────────────────────────────────────────────
  ["switchboard-maintenance",         "8488059",  "28950842"],  // opened switchboard / circuit breakers
  ["lighting-installation",           "1253128",  "12175487"],  // modern ceiling lights / circular LED

  // ── APPLIANCES ───────────────────────────────────────────────────────────────
  ["appliance-installation",          "19563199", "3773569"],   // modern oven & stove / elegant kitchen
  ["builtin-appliance-installation",  "5008410",  "7534297"],   // spacious kitchen / sleek kitchen
  ["appliance-repair",                "10699352", "32391499"],  // technician repairing device / freezer repair
  ["washing-machine-repair",          "10699352", "5591460"],   // technician repairing / person using washer
  ["refrigerator-repair",             "32391499", "35290689"],  // technicians repairing freezer / microwave repair
  ["dishwasher-repair",               "10699352", "8774444"],   // technician repairing / washing machine
  ["stove-oven-repair",               "5825352",  "19563199"],  // kitchen with gas stove / modern oven

  // ── CONSTRUCTION / RENOVATION ────────────────────────────────────────────────
  ["apartment-renovation",            "5493656",  "5691533"],   // man renovating home / modern flat renovation
  ["apartment-office-repair",         "16767783", "5493654"],   // man working on house / workers renovating
  ["bathroom-renovation",             "11701114", "6934184"],   // modern bathroom shower+bathtub / shower+sink
  ["bathroom-repair",                 "6436787",  "7534564"],   // bathroom shower cabin / modern apartment bath
  ["construction-projects",           "5493654",  "6474343"],   // workers renovating / polishing ceiling
  ["construction-works",              "6474343",  "16767783"],  // polishing ceiling / man working on house
  ["drywall-works",                   "6474123",  "6474308"],   // man working drywall / applying compound
  ["facade-works",                    "154141",   "36054139"],  // scaffolding details / historic building scaffolding
  ["flooring-works",                  "4263067",  "1388944"],   // man laying laminate / measuring wood floor
  ["painting-works",                  "994164",   "5691597"],   // person with paint roller / man painting walls
  ["tiling-works",                    "11806490", "12924578"],  // aligning tiles with levelers / mason installing tiles
  ["roofing-works",                   "31763542", "15562216"],  // roof tiles with buckets / tiles on roof
  ["roofing-repair",                  "15562216", "48784"],     // tiles on roof / gray roof
  ["stairwell-balcony-renovation",    "33998579", "14100350"],  // urban scaffolding / neoclassical with scaffolding
  ["balcony-repair",                  "36054139", "33998579"],  // building under restoration / intricate scaffolding
  ["entrance-repair",                 "14100350", "154141"],    // urban scene scaffolding / scaffolding details
  ["concrete-works",                  "3616756",  "5493659"],   // empty room with wood planks / smoothing wall

  // ── INTERIOR / DESIGN ────────────────────────────────────────────────────────
  ["interior-design",                 "7018389",  "5824901"],   // cozy sofa modern living room / plants
  ["design",                          "5490303",  "4906249"],   // living room sofa + armchair / cottage living room
  ["3d-visualization",                "5942736",  "6970077"],   // contemporary living room / couch and floor lamp

  // ── GAS ──────────────────────────────────────────────────────────────────────
  ["gas-appliance-installation",      "5825352",  "12527113"],  // kitchen with gas stove / gate valve
  ["gas-leak-detection",              "16138946", "7616004"],   // industrial gas pipes / shut-off valve
  ["gas-pipeline-construction",       "13726337", "5711732"],   // plumbing valve / frosted industrial pipes
  ["gas-works",                       "12527113", "16138946"],  // gate valve / industrial gas pipes

  // ── PAVING ───────────────────────────────────────────────────────────────────
  ["paving-stone-installation",       "3038559",  "12889058"],  // cobblestone Paris / cobblestone + buildings
  ["paver-installation",              "12889058", "19571211"],  // cobblestone + buildings / colorful facades

  // ── DOCUMENTATION / ADMIN ────────────────────────────────────────────────────
  ["as-built-drawings",               "14953886", "11658940"],  // plumbing tools on blueprint / water meter
  ["insurance-claims",                "5691533",  "6474207"],   // modern flat renovation / freshly installed drywall
  ["insured-accident-repair",         "6474207",  "5691533"],   // drywall / renovation flat

  // ── EQUIPMENT / RENTAL ───────────────────────────────────────────────────────
  ["container-rental",                "154141",   "33998579"],  // scaffolding / urban scaffolding
  ["containers-for-rent",             "33998579", "154141"],    // urban scaffolding / scaffolding

  // ── PROPERTY / GENERAL ───────────────────────────────────────────────────────
  ["property-maintenance",            "36054139", "14100350"],  // historic building restoration / scaffolding urban
  ["handyman-services",               "6419128",  "5493656"],   // plumber with pipes / man renovating
  ["apartment-associations",          "5493654",  "5691533"],   // construction workers / modern flat renovation
  ["cleaning-services",               "4239115",  "9462311"],   // glove cleaning sink / yellow gloves brush
];

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🖼  Uploading HD images for ${SERVICES.length} services…\n`);
  let ok = 0, fail = 0;

  for (const [slug, heroId, galId] of SERVICES) {
    const idx = String(ok + fail + 1).padStart(2, "0");
    process.stdout.write(`[${idx}/${SERVICES.length}] ${slug}\n`);
    try {
      await patchImages(slug, heroId, galId);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${slug}: ${e.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n✅  Done — ${ok} updated, ${fail} failed.\n`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
