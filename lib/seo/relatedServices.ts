import { ALL_SERVICE_SLUGS } from "@/lib/serviceSlugs";

const HUB: string[] = [
  "plumbing-works-tallinn",
  "plumber-24h-tallinn",
  "bathroom-repair",
  "electrician-services",
];

/** Curated internal links for service detail pages. */
const RELATED: Record<string, string[]> = {
  "bathroom-repair": ["plumbing-works-tallinn", "pipe-repair-replacement", "blockage-clearing", "water-meter-replacement"],
  "plumbing-works-tallinn": ["plumber-24h-tallinn", "pipe-repair-replacement", "bathroom-repair", "water-meter-replacement"],
  "plumber-24h-tallinn": ["blockage-clearing", "pipe-repair-replacement", "plumbing-works-tallinn", "pressure-flushing-sewer"],
  "pipe-repair-replacement": ["plumbing-works-tallinn", "replacement-risers", "water-meter-replacement", "bathroom-repair"],
  "blockage-clearing": ["pressure-flushing-sewer", "sewerage-video-inspection", "plumber-24h-tallinn", "plumbing-works-tallinn"],
  "pressure-flushing-sewer": ["blockage-clearing", "sewerage-video-inspection", "plumber-24h-tallinn", "polyethylene-welding"],
  "sewerage-video-inspection": ["blockage-clearing", "pressure-flushing-sewer", "pipe-repair-replacement", "replacement-risers"],
  "water-meter-replacement": ["replacement-risers", "pipe-repair-replacement", "plumbing-works-tallinn", "bathroom-repair"],
  "replacement-risers": ["pipe-repair-replacement", "plumbing-works-tallinn", "water-meter-replacement", "apartment-associations"],
  "boiler-installation": ["plumbing-works-tallinn", "floor-heating", "electrician-services", "bathroom-repair"],
  "floor-heating": ["boiler-installation", "electrician-services", "bathroom-repair", "construction-works"],
  "electrician-services": ["boiler-installation", "appliance-repair", "floor-heating", "bathroom-repair"],
  "appliance-repair": ["electrician-services", "plumbing-works-tallinn", "boiler-installation", "handyman-services"],
  "polyethylene-welding": ["external-water-supply", "pipe-repair-replacement", "water-meter-replacement", "wells-sale-installation"],
  "external-water-supply": ["polyethylene-welding", "wells-sale-installation", "sewerage-video-inspection", "defrosting-pipes"],
  "wells-sale-installation": ["external-water-supply", "polyethylene-welding", "concrete-works", "handyman-services"],
  "concrete-works": ["construction-works", "roofing-repair", "paver-installation", "floor-heating"],
  "construction-works": ["concrete-works", "apartment-office-repair", "roofing-repair", "handyman-services"],
  "apartment-office-repair": ["construction-works", "entrance-repair", "electrician-services", "plumbing-works-tallinn"],
  "entrance-repair": ["apartment-associations", "apartment-office-repair", "balcony-repair", "cleaning-services"],
  "apartment-associations": ["replacement-risers", "entrance-repair", "roofing-repair", "pipe-repair-replacement"],
  "balcony-repair": ["roofing-repair", "entrance-repair", "construction-works", "water-meter-replacement"],
  "roofing-repair": ["balcony-repair", "construction-works", "external-water-supply", "handyman-services"],
  "cleaning-services": ["apartment-office-repair", "construction-works", "handyman-services", "apartment-associations"],
  "paver-installation": ["construction-works", "concrete-works", "external-water-supply", "containers-for-rent"],
  "containers-for-rent": ["construction-works", "cleaning-services", "paver-installation", "handyman-services"],
  "handyman-services": ["electrician-services", "plumbing-works-tallinn", "appliance-repair", "apartment-office-repair"],
  "insured-accident-repair": ["plumbing-works-tallinn", "bathroom-repair", "apartment-office-repair", "construction-works"],
  "design": ["apartment-office-repair", "bathroom-repair", "construction-works", "balcony-repair"],
  "defrosting-pipes": ["pipe-freezing", "plumber-24h-tallinn", "blockage-clearing", "plumbing-works-tallinn"],
  "pipe-freezing": ["defrosting-pipes", "plumber-24h-tallinn", "plumbing-works-tallinn", "blockage-clearing"],
  "toilet-installation": ["bathroom-repair", "plumbing-works-tallinn", "blockage-clearing", "water-meter-replacement"],
};

export function relatedServiceSlugs(currentSlug: string, limit = 4): string[] {
  const raw = RELATED[currentSlug] ?? HUB;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of raw) {
    if (s === currentSlug || seen.has(s)) continue;
    if (!ALL_SERVICE_SLUGS.includes(s as (typeof ALL_SERVICE_SLUGS)[number])) continue;
    seen.add(s);
    out.push(s);
    if (out.length >= limit) return out;
  }
  for (const s of ALL_SERVICE_SLUGS) {
    if (s === currentSlug || seen.has(s)) continue;
    out.push(s);
    if (out.length >= limit) break;
  }
  return out.slice(0, limit);
}
