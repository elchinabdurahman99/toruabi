import { DUPLICATE_SERVICE_OF } from "./duplicateServices";

const HUB: string[] = [
  "24h-emergency-plumbing",
  "24h-emergency-electrical",
  "bathroom-renovation",
  "apartment-renovation",
];

/** Curated internal links for service detail pages (new Sanity canonical slugs). */
const RELATED: Record<string, string[]> = {
  // Plumbing
  "24h-emergency-plumbing":   ["pipe-works", "drain-blockage-removal", "tap-mixer-replacement", "24h-emergency-electrical"],
  "pipe-works":               ["24h-emergency-plumbing", "tap-mixer-replacement", "replacement-risers", "drain-blockage-removal"],
  "tap-mixer-replacement":    ["pipe-works", "replacement-risers", "bathroom-renovation", "24h-emergency-plumbing"],
  "replacement-risers":   ["pipe-works", "pem-pipe-welding", "tap-mixer-replacement", "24h-emergency-plumbing"],
  "pem-pipe-welding":         ["pipe-works", "replacement-risers", "pipe-cctv-inspection", "24h-emergency-plumbing"],
  "plumber-on-call":          ["24h-emergency-plumbing", "pipe-works", "drain-blockage-removal", "tap-mixer-replacement"],
  // Drainage
  "drain-blockage-removal":   ["sewer-jetting", "pipe-cctv-inspection", "24h-emergency-plumbing", "pipe-works"],
  "sewer-jetting":            ["drain-blockage-removal", "pipe-cctv-inspection", "sewage-removal", "jetting-truck-services"],
  "pipe-cctv-inspection":     ["drain-blockage-removal", "sewer-jetting", "replacement-risers", "pem-pipe-welding"],
  "sewage-removal":           ["sewer-jetting", "jetting-truck-services", "drain-blockage-removal", "pipe-cctv-inspection"],
  "jetting-truck-services":   ["sewer-jetting", "sewage-removal", "drain-blockage-removal", "pipe-cctv-inspection"],
  "sewer-jetting-and-septic-pumping-tallinn": ["jetting-truck-services", "sewer-jetting", "sewage-removal", "drain-blockage-removal"],
  // Electrical
  "24h-emergency-electrical": ["electrical-installation", "switchboard-maintenance", "lighting-installation", "24h-emergency-plumbing"],
  "electrical-installation":  ["24h-emergency-electrical", "switchboard-maintenance", "lighting-installation", "gas-appliance-installation"],
  "switchboard-maintenance":  ["electrical-installation", "24h-emergency-electrical", "lighting-installation", "appliance-installation"],
  "lighting-installation":    ["electrical-installation", "switchboard-maintenance", "24h-emergency-electrical", "interior-design"],
  // Appliances
  "appliance-installation":         ["builtin-appliance-installation", "handyman-services", "electrical-installation", "gas-appliance-installation"],
  "builtin-appliance-installation": ["appliance-installation", "handyman-services", "electrical-installation", "interior-design"],
  "handyman-services":              ["appliance-installation", "property-maintenance", "electrical-installation", "24h-emergency-plumbing"],
  "washing-machine-repair":  ["dishwasher-repair", "refrigerator-repair", "stove-oven-repair", "appliance-installation"],
  "dishwasher-repair":       ["washing-machine-repair", "refrigerator-repair", "stove-oven-repair", "appliance-installation"],
  "refrigerator-repair":     ["washing-machine-repair", "dishwasher-repair", "stove-oven-repair", "appliance-installation"],
  "stove-oven-repair":       ["washing-machine-repair", "dishwasher-repair", "refrigerator-repair", "appliance-installation"],
  // Gas
  "gas-works":                ["gas-appliance-installation", "gas-pipeline-construction", "gas-leak-detection", "24h-emergency-plumbing"],
  "gas-appliance-installation": ["gas-works", "gas-pipeline-construction", "gas-leak-detection", "24h-emergency-plumbing"],
  "gas-pipeline-construction":  ["gas-works", "gas-appliance-installation", "pipe-works", "24h-emergency-plumbing"],
  "gas-leak-detection":         ["gas-works", "gas-appliance-installation", "24h-emergency-plumbing", "pipe-works"],
  // Renovation
  "bathroom-renovation":       ["tiling-works", "tap-mixer-replacement", "pipe-works", "interior-design"],
  "apartment-renovation":      ["bathroom-renovation", "interior-design", "drywall-works", "painting-works"],
  "drywall-works":             ["painting-works", "tiling-works", "apartment-renovation", "flooring-works"],
  "painting-works":            ["drywall-works", "tiling-works", "apartment-renovation", "flooring-works"],
  "tiling-works":              ["bathroom-renovation", "drywall-works", "painting-works", "flooring-works"],
  "flooring-works":            ["tiling-works", "drywall-works", "apartment-renovation", "painting-works"],
  "stairwell-balcony-renovation": ["apartment-renovation", "painting-works", "tiling-works", "construction-projects"],
  "insurance-claims":          ["apartment-renovation", "bathroom-renovation", "pipe-works", "24h-emergency-plumbing"],
  // Design
  "interior-design":      ["apartment-renovation", "3d-visualization", "construction-projects", "bathroom-renovation"],
  "3d-visualization":     ["interior-design", "construction-projects", "apartment-renovation", "as-built-drawings"],
  "construction-projects":["3d-visualization", "as-built-drawings", "interior-design", "apartment-renovation"],
  "as-built-drawings":    ["construction-projects", "3d-visualization", "interior-design", "apartment-renovation"],
  // Exterior / Construction
  "roofing-works":             ["facade-works", "construction-projects", "paving-stone-installation", "property-maintenance"],
  "facade-works":              ["roofing-works", "painting-works", "construction-projects", "paving-stone-installation"],
  "paving-stone-installation": ["roofing-works", "facade-works", "construction-projects", "property-maintenance"],
  // Maintenance
  "property-maintenance": ["handyman-services", "construction-projects", "24h-emergency-plumbing", "24h-emergency-electrical"],
  "container-rental":     ["property-maintenance", "construction-projects", "roofing-works", "paving-stone-installation"],
  // Plumbing — remaining pages
  "plumber-24h-tallinn":       ["24h-emergency-plumbing", "drain-blockage-removal", "tap-mixer-replacement", "boiler-installation"],
  "plumbing-works-tallinn":    ["pipe-works", "24h-emergency-plumbing", "drain-blockage-removal", "boiler-installation"],
  "pipe-repair-replacement":   ["pipe-works", "replacement-risers", "24h-emergency-plumbing", "pipe-cctv-inspection"],
  "water-meter-replacement":   ["tap-mixer-replacement", "water-filter-installation", "replacement-risers", "plumber-on-call"],
  "water-filter-installation": ["water-meter-replacement", "tap-mixer-replacement", "sink-installation", "boiler-installation"],
  "boiler-installation":       ["water-filter-installation", "pipe-works", "plumber-on-call", "electrical-installation"],
  "toilet-installation":       ["sink-installation", "shower-cabin-installation", "tap-mixer-replacement", "drain-blockage-removal"],
  "sink-installation":         ["tap-mixer-replacement", "toilet-installation", "shower-cabin-installation", "drain-blockage-removal"],
  "shower-cabin-installation": ["toilet-installation", "sink-installation", "tap-mixer-replacement", "bathroom-renovation"],
  "radiator-installation":     ["floor-heating", "pipe-works", "boiler-installation", "gas-boiler-replacement"],
  "floor-heating":             ["radiator-installation", "pipe-works", "flooring-works", "tiling-works"],
  "defrosting-pipes":          ["24h-emergency-plumbing", "pipe-repair-replacement", "pipe-freezing", "external-water-supply"],
  "pipe-freezing":             ["pipe-works", "pipe-repair-replacement", "replacement-risers", "defrosting-pipes"],
  "polyethylene-welding":      ["pem-pipe-welding", "external-water-supply", "pipe-works", "pipe-cctv-inspection"],
  "external-water-supply":     ["polyethylene-welding", "wells-sale-installation", "sewage-removal", "pipe-cctv-inspection"],
  "wells-sale-installation":   ["external-water-supply", "polyethylene-welding", "sewage-removal", "concrete-works"],
  // Drainage — remaining pages
  "blockage-clearing":         ["drain-blockage-removal", "sewer-jetting", "pipe-cctv-inspection", "24h-emergency-plumbing"],
  "pressure-flushing-sewer":   ["sewer-jetting", "drain-blockage-removal", "jetting-truck-services", "pipe-cctv-inspection"],
  "sewerage-video-inspection": ["pipe-cctv-inspection", "drain-blockage-removal", "sewer-jetting", "pipe-repair-replacement"],
  // Electrical — remaining page
  "electrician-services":      ["electrical-installation", "24h-emergency-electrical", "switchboard-maintenance", "lighting-installation"],
  // Gas — remaining pages
  "gas-boiler-replacement":    ["gas-works", "gas-leak-detection", "gas-appliance-installation", "radiator-installation"],
  "gas-stove-installation":    ["gas-appliance-installation", "gas-leak-detection", "gas-works", "appliance-installation"],
  // Appliances — remaining page
  "appliance-repair":          ["washing-machine-repair", "dishwasher-repair", "refrigerator-repair", "appliance-installation"],
  // Renovation — remaining pages
  "bathroom-repair":           ["bathroom-renovation", "tiling-works", "tap-mixer-replacement", "shower-cabin-installation"],
  "apartment-office-repair":   ["apartment-renovation", "bathroom-renovation", "drywall-works", "painting-works"],
  "insured-accident-repair":   ["insurance-claims", "24h-emergency-plumbing", "apartment-renovation", "bathroom-renovation"],
  "entrance-repair":           ["stairwell-balcony-renovation", "balcony-repair", "painting-works", "apartment-associations"],
  "balcony-repair":            ["stairwell-balcony-renovation", "facade-works", "concrete-works", "roofing-works"],
  // Design — remaining page
  "design":                    ["interior-design", "3d-visualization", "apartment-renovation", "bathroom-renovation"],
  // Exterior / Construction — remaining pages
  "construction-works":        ["construction-projects", "concrete-works", "drywall-works", "apartment-renovation"],
  "concrete-works":            ["paving-stone-installation", "facade-works", "construction-works", "roofing-works"],
  "roofing-repair":            ["roofing-works", "facade-works", "balcony-repair", "property-maintenance"],
  "paver-installation":        ["paving-stone-installation", "concrete-works", "external-water-supply", "container-rental"],
  // Maintenance — remaining pages
  "cleaning-services":         ["property-maintenance", "container-rental", "handyman-services", "apartment-associations"],
  "containers-for-rent":       ["container-rental", "construction-works", "cleaning-services", "property-maintenance"],
  "apartment-associations":    ["property-maintenance", "replacement-risers", "entrance-repair", "pipe-cctv-inspection"],

};

/** Current Sanity canonical slugs (used for validation). */
const SANITY_SLUGS = new Set([
  "24h-emergency-electrical", "24h-emergency-plumbing", "3d-visualization",
  "apartment-associations", "apartment-office-repair", "apartment-renovation",
  "appliance-installation", "appliance-repair", "as-built-drawings", "balcony-repair",
  "bathroom-renovation", "bathroom-repair", "blockage-clearing", "boiler-installation",
  "builtin-appliance-installation", "cleaning-services", "concrete-works",
  "construction-projects", "construction-works", "container-rental",
  "containers-for-rent", "defrosting-pipes", "design", "dishwasher-repair",
  "drain-blockage-removal", "drywall-works", "electrical-installation",
  "electrician-services", "entrance-repair", "external-water-supply", "facade-works",
  "floor-heating", "flooring-works", "gas-appliance-installation",
  "gas-boiler-replacement", "gas-leak-detection", "gas-pipeline-construction",
  "gas-stove-installation", "gas-works", "handyman-services", "insurance-claims",
  "insured-accident-repair", "interior-design", "jetting-truck-services",
  "lighting-installation", "painting-works", "paver-installation",
  "paving-stone-installation", "pem-pipe-welding", "pipe-cctv-inspection",
  "pipe-freezing", "pipe-repair-replacement", "pipe-works", "plumber-24h-tallinn",
  "plumber-on-call", "plumbing-works-tallinn", "polyethylene-welding",
  "pressure-flushing-sewer", "property-maintenance", "radiator-installation",
  "refrigerator-repair", "replacement-risers", "roofing-repair", "roofing-works",
  "sewage-removal", "sewer-jetting", "sewer-jetting-and-septic-pumping-tallinn",
  "sewerage-video-inspection", "shower-cabin-installation", "sink-installation",
  "stairwell-balcony-renovation", "stove-oven-repair", "switchboard-maintenance",
  "tap-mixer-replacement", "tiling-works", "toilet-installation",
  "washing-machine-repair", "water-filter-installation", "water-meter-replacement",
  "wells-sale-installation",
]);

export function relatedServiceSlugs(currentSlug: string, limit = 4): string[] {
  const raw = RELATED[currentSlug] ?? HUB;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of raw) {
    if (s === currentSlug || seen.has(s) || !SANITY_SLUGS.has(s) || DUPLICATE_SERVICE_OF[s]) continue;
    seen.add(s);
    out.push(s);
    if (out.length >= limit) return out;
  }
  for (const s of SANITY_SLUGS) {
    if (s === currentSlug || seen.has(s) || DUPLICATE_SERVICE_OF[s]) continue;
    out.push(s);
    if (out.length >= limit) break;
  }
  return out.slice(0, limit);
}
