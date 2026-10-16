import { LEGAL_ENTITY, SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const PHONE = "+37256897929";
const PHONE_DISPLAY = "+372 56 89 79 29";
const EMAIL = "info@torudeabi24.ee";

export default function JsonLd({ locale }: { locale: string }) {
  const baseUrl = SITE_URL;

  const servicesBase =
    locale === "et"
      ? `${baseUrl}/et/teenused`
      : locale === "ru"
      ? `${baseUrl}/ru/%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8`
      : `${baseUrl}/en/services`;

  const descriptions: Record<string, string> = {
    et: "Professionaalne torutööd, elektritööd ja ehitusteenused Tallinnas ning Harjumaal. Kiire abi ja 24/7 avariitööd. -30% soodustus 08:00–19:00.",
    en: "Professional plumbing, electrical, and construction services in Tallinn and Harjumaa. 24/7 emergency support. -30% discount 08:00–19:00.",
    ru: "Профессиональные сантехнические, электромонтажные и строительные услуги в Таллине и Харьюмаа. Аварийная помощь 24/7. Скидка -30% с 08:00 до 19:00.",
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["PlumbingService", "ElectricalContractor", "GeneralContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
        "@id": `${baseUrl}/#organization`,
        name: LEGAL_ENTITY,
        alternateName: [SITE_NAME, "TorudeAbi24", "Torudeabi 24"],
        url: baseUrl,
        telephone: PHONE,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE,
            contactType: "emergency",
            availableLanguage: ["Estonian", "English", "Russian"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          },
          {
            "@type": "ContactPoint",
            telephone: PHONE,
            contactType: "customer service",
            availableLanguage: ["Estonian", "English", "Russian"],
          },
        ],
        email: EMAIL,
        description: descriptions[locale] ?? descriptions["en"],
        image: [`${baseUrl}/favicon-512x512.png`],
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon-512x512.png`,
          width: 512,
          height: 512,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Vene tn 28",
          addressLocality: "Tallinn",
          addressRegion: "Harju maakond",
          postalCode: "10111",
          addressCountry: "EE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 59.4370,
          longitude: 24.7536,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        areaServed: [
          { "@type": "City", name: "Tallinn" },
          { "@type": "AdministrativeArea", name: "Harjumaa" },
          { "@type": "City", name: "Maardu" },
          { "@type": "City", name: "Keila" },
          { "@type": "City", name: "Saue" },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 59.4370, longitude: 24.7536 },
          geoRadius: "50000",
        },
        sameAs: [
          "https://www.facebook.com/torudeabi24",
          "https://maps.app.goo.gl/TorudeAbi24Tallinn",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Home Services Tallinn",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Plumbing Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Plumbing 24/7", url: `${servicesBase}/24h-emergency-plumbing` }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", lowPrice: 35, description: "-30% discount 08:00–19:00" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pipe Works", url: `${servicesBase}/pipe-works` }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", lowPrice: 35, description: "-30% discount 08:00–19:00" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drain Blockage Removal", url: `${servicesBase}/drain-blockage-removal` }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", lowPrice: 35, description: "-30% discount 08:00–19:00" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewer Jetting", url: `${servicesBase}/sewer-jetting` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Renovation", url: `${servicesBase}/bathroom-renovation` }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", lowPrice: 35, description: "-30% discount 08:00–19:00" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "Electrical Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrical 24/7", url: `${servicesBase}/24h-emergency-electrical` }, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", lowPrice: 35, description: "-30% discount 08:00–19:00" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Installation", url: `${servicesBase}/electrical-installation` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gas Appliance Installation", url: `${servicesBase}/gas-appliance-installation` } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "Construction & Renovation",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction Projects", url: `${servicesBase}/construction-projects` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apartment Renovation", url: `${servicesBase}/apartment-renovation` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Design", url: `${servicesBase}/interior-design` } },
              ],
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: SITE_NAME,
        url: baseUrl,
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: ["et", "en", "ru"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/et/teenused?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "@id": `${baseUrl}/#faq-question-1`,
            name: locale === "et" ? "Kui kiiresti te reageerite hädaolukorras?" : locale === "ru" ? "Как быстро вы приедете в аварийном случае?" : "How fast do you respond to emergencies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: locale === "et"
                ? `Meie avariitiim reageerib 30–60 minuti jooksul Tallinnas ja Harjumaal. Helistage ${PHONE_DISPLAY} ööpäevaringselt.`
                : locale === "ru"
                ? `Наша аварийная бригада прибудет в течение 30–60 минут по Таллину и Харьюмаа. Звоните ${PHONE_DISPLAY} круглосуточно.`
                : `Our emergency team arrives within 30–60 minutes across Tallinn and Harjumaa. Call ${PHONE_DISPLAY} any time 24/7.`,
            },
          },
          {
            "@type": "Question",
            "@id": `${baseUrl}/#faq-question-2`,
            name: locale === "et" ? "Kas teil on litsents ja garantii?" : locale === "ru" ? "Есть ли у вас лицензия и гарантия?" : "Are you licensed and do you offer a warranty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: locale === "et"
                ? "Jah. Kõik meie tehnikud on sertifitseeritud ja litsentseeritud. Anname 2-aastase garantii kõigile töödele."
                : locale === "ru"
                ? "Да. Все наши специалисты сертифицированы и лицензированы. Мы предоставляем 2-летнюю гарантию на все работы."
                : "Yes. All our technicians are certified and licensed. We provide a 2-year warranty on all completed work.",
            },
          },
          {
            "@type": "Question",
            "@id": `${baseUrl}/#faq-question-3`,
            name: locale === "et" ? "Mis on teie soodustusprogramm?" : locale === "ru" ? "Какова ваша скидочная программа?" : "What is your discount programme?",
            acceptedAnswer: {
              "@type": "Answer",
              text: locale === "et"
                ? "Pakume -30% soodustust kõigile teenustele tööpäeviti 08:00–19:00. Öötöödele (19:00–08:00) lisandub €10 väljakutsetasu."
                : locale === "ru"
                ? "Мы предлагаем скидку -30% на все услуги в будние дни с 08:00 до 19:00. Для ночных работ (19:00–08:00) добавляется €10 за вызов."
                : "We offer a -30% discount on all services weekdays 08:00–19:00. Night work (19:00–08:00) includes a €10 call-out surcharge.",
            },
          },
          {
            "@type": "Question",
            "@id": `${baseUrl}/#faq-question-4`,
            name: locale === "et" ? "Millistes piirkondades te töötate?" : locale === "ru" ? "В каких районах вы работаете?" : "Which areas do you cover?",
            acceptedAnswer: {
              "@type": "Answer",
              text: locale === "et"
                ? "Töötame kogu Tallinnas ja Harjumaal, sealhulgas Maardu, Keila, Saue ja ümbritsevad vallad."
                : locale === "ru"
                ? "Мы работаем по всему Таллину и Харьюмаа, включая Маарду, Кейла, Сауэ и прилегающие волости."
                : "We cover all of Tallinn and Harjumaa, including Maardu, Keila, Saue, and surrounding municipalities.",
            },
          },
          {
            "@type": "Question",
            "@id": `${baseUrl}/#faq-question-5`,
            name: locale === "et" ? "Millal ma maksan?" : locale === "ru" ? "Когда я плачу?" : "When do I pay?",
            acceptedAnswer: {
              "@type": "Answer",
              text: locale === "et"
                ? "Maksate alles pärast töö lõpetamist ja teie rahulolu tagamist. Ettemaksu ei nõuta."
                : locale === "ru"
                ? "Вы платите только после завершения работы и вашего удовлетворения результатом. Предоплата не требуется."
                : "You pay only after the work is completed and you are satisfied with the result. No upfront payment required.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
