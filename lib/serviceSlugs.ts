/** Canonical URL slugs (match Sanity seed + detail routes). */
export const ALL_SERVICE_SLUGS = [
  // Cat 1: santehnilised-tood — Santehnilised tööd (13)
  "plumber-24h-tallinn",
  "plumbing-works-tallinn",
  "pipe-repair-replacement",
  "toilet-installation",
  "water-meter-replacement",
  "boiler-installation",
  "blockage-clearing",
  "defrosting-pipes",
  "pipe-freezing",
  "polyethylene-welding",
  "floor-heating",
  "replacement-risers",
  "radiator-installation",
  // Cat 2: survepesu-eritehnika — Survepesu ja eritehnika (3)
  "pressure-flushing-sewer",
  "sewerage-video-inspection",
  "cesspool-emptying",
  // Cat 3: elektritood — Elektritööd (4)
  "electrician-services",
  "electrical-panel-installation",
  "lighting-installation",
  "socket-installation",
  // Cat 4: kodumasinate-remont — Kodumasinate remont ja paigaldus (6)
  "appliance-repair",
  "handyman-services",
  "washing-machine-installation",
  "dishwasher-installation",
  "cooker-installation",
  "furniture-assembly",
  // Cat 5: gaasitood — Gaasitööd (3)
  "gas-works",
  "gas-boiler-installation",
  "gas-line-installation",
  // Cat 6: siseviimistlus — Siseviimistlus ja remont (6)
  "bathroom-repair",
  "apartment-office-repair",
  "balcony-repair",
  "entrance-repair",
  "insured-accident-repair",
  "concrete-works",
  // Cat 7: valisehitus — Välisehitus ja fassaaditööd (5)
  "construction-works",
  "external-water-supply",
  "paver-installation",
  "roofing-repair",
  "wells-sale-installation",
  // Cat 8: disain-planeerimine — Disain ja planeerimine (4)
  "design",
  "interior-design",
  "visualization-3d",
  "building-permit",
  // Cat 9: haldus-tugiteenused — Haldus ja tugiteenused (4)
  "apartment-associations",
  "containers-for-rent",
  "cleaning-services",
  "property-management",
] as const;

export type ServiceSlug = (typeof ALL_SERVICE_SLUGS)[number];

/** Map slug → `services.items.*` message key (when CMS title missing). */
export const slugToMessageKey: Record<string, string> = {
  // Cat 1
  "plumber-24h-tallinn": "plumbing",
  "plumbing-works-tallinn": "plumbingWorks",
  "pipe-repair-replacement": "pipeRepair",
  "toilet-installation": "toiletInstallation",
  "water-meter-replacement": "waterMeter",
  "boiler-installation": "boilerInstallation",
  "blockage-clearing": "blockageClearing",
  "defrosting-pipes": "defrostingPipes",
  "pipe-freezing": "pipeFreezing",
  "polyethylene-welding": "polyethyleneWelding",
  "floor-heating": "floorHeating",
  "replacement-risers": "replacementRisers",
  "radiator-installation": "radiatorInstallation",
  // Cat 2
  "pressure-flushing-sewer": "pressureFlushing",
  "sewerage-video-inspection": "sewerageVideo",
  "cesspool-emptying": "cesspoolEmptying",
  // Cat 3
  "electrician-services": "electrical",
  "electrical-panel-installation": "electricalPanel",
  "lighting-installation": "lightingInstallation",
  "socket-installation": "socketInstallation",
  // Cat 4
  "appliance-repair": "applianceRepair",
  "handyman-services": "handymanServices",
  "washing-machine-installation": "washingMachineInstallation",
  "dishwasher-installation": "dishwasherInstallation",
  "cooker-installation": "cookerInstallation",
  "furniture-assembly": "furnitureAssembly",
  // Cat 5
  "gas-works": "gasWorks",
  "gas-boiler-installation": "gasBoilerInstallation",
  "gas-line-installation": "gasLineInstallation",
  // Cat 6
  "bathroom-repair": "bathroomRepair",
  "apartment-office-repair": "apartmentRepair",
  "balcony-repair": "balconyRepair",
  "entrance-repair": "entranceRepair",
  "insured-accident-repair": "insuredAccident",
  "concrete-works": "concreteWorks",
  // Cat 7
  "construction-works": "constructionWorks",
  "external-water-supply": "externalWaterSupply",
  "paver-installation": "pavers",
  "roofing-repair": "roofing",
  "wells-sale-installation": "wells",
  // Cat 8
  design: "design",
  "interior-design": "interiorDesign",
  "visualization-3d": "visualization3d",
  "building-permit": "buildingPermit",
  // Cat 9
  "apartment-associations": "apartmentAssociations",
  "containers-for-rent": "containers",
  "cleaning-services": "cleaning",
  "property-management": "propertyManagement",
};

/** 9 service categories with their member slugs. titleKey maps to `serviceCats.*` in messages. */
export const SERVICE_CATEGORIES = [
  {
    slug: "santehnilised-tood",
    titleKey: "cat.plumbing",
    services: [
      "plumber-24h-tallinn",
      "plumbing-works-tallinn",
      "pipe-repair-replacement",
      "toilet-installation",
      "water-meter-replacement",
      "boiler-installation",
      "blockage-clearing",
      "defrosting-pipes",
      "pipe-freezing",
      "polyethylene-welding",
      "floor-heating",
      "replacement-risers",
      "radiator-installation",
    ],
  },
  {
    slug: "survepesu-eritehnika",
    titleKey: "cat.pressureWashing",
    services: [
      "pressure-flushing-sewer",
      "sewerage-video-inspection",
      "cesspool-emptying",
    ],
  },
  {
    slug: "elektritood",
    titleKey: "cat.electrical",
    services: [
      "electrician-services",
      "electrical-panel-installation",
      "lighting-installation",
      "socket-installation",
    ],
  },
  {
    slug: "kodumasinate-remont",
    titleKey: "cat.appliances",
    services: [
      "appliance-repair",
      "handyman-services",
      "washing-machine-installation",
      "dishwasher-installation",
      "cooker-installation",
      "furniture-assembly",
    ],
  },
  {
    slug: "gaasitood",
    titleKey: "cat.gas",
    services: [
      "gas-works",
      "gas-boiler-installation",
      "gas-line-installation",
    ],
  },
  {
    slug: "siseviimistlus",
    titleKey: "cat.interior",
    services: [
      "bathroom-repair",
      "apartment-office-repair",
      "balcony-repair",
      "entrance-repair",
      "insured-accident-repair",
      "concrete-works",
    ],
  },
  {
    slug: "valisehitus",
    titleKey: "cat.exterior",
    services: [
      "construction-works",
      "external-water-supply",
      "paver-installation",
      "roofing-repair",
      "wells-sale-installation",
    ],
  },
  {
    slug: "disain-planeerimine",
    titleKey: "cat.design",
    services: [
      "design",
      "interior-design",
      "visualization-3d",
      "building-permit",
    ],
  },
  {
    slug: "haldus-tugiteenused",
    titleKey: "cat.management",
    services: [
      "apartment-associations",
      "containers-for-rent",
      "cleaning-services",
      "property-management",
    ],
  },
] as const;
