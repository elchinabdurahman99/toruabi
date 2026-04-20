import { LEGAL_ENTITY, SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export default function JsonLd({ locale }: { locale: string }) {
  const baseUrl = SITE_URL;
  const descriptions: Record<string, string> = {
    et: "Professionaalne torutööd, elektritööd ja ehitusteenused Tallinnas ning Harjumaal. Kiire abi ja 24/7 avariitööd.",
    en: "Professional plumbing, electrical, and construction services in Tallinn and Harjumaa. 24/7 emergency support.",
    ru: "Профессиональные сантехнические, электромонтажные и строительные услуги в Таллине и Харьюмаа. Аварийная помощь 24/7."
  };
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    name: LEGAL_ENTITY,
    alternateName: SITE_NAME,
    url: baseUrl,
    telephone: "+372 6273939",
    email: "ajsan@ajsan.ee",
    description: descriptions[locale] || descriptions["en"],
    image: `${baseUrl}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tallinn",
      addressCountry: "EE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "59.4370",
      longitude: "24.7536",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
    areaServed: {
      "@type": "City",
      name: "Tallinn",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "59.4370",
        longitude: "24.7536",
      },
      geoRadius: "50000",
    },
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Plumbing Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Plumbing 24/7" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pipe Repair and Replacement" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Repair" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Electrical Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrician Services" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Boiler Installation" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Construction & Renovation",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction Works" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apartment Renovation" }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", description: "-30% discount 08:00–19:00" } },
          ],
        },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: SITE_NAME,
    url: baseUrl,
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: [
      { "@type": "Language", name: "Estonian", alternateName: "et" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Russian", alternateName: "ru" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
