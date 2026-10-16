import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceBySlugQuery, servicesByCanonicalSlugsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetail from "@/components/pages/ServiceDetail";
import { urlFor } from "@/lib/sanity/image";
import { alternatesForServicePage, segmentTripleFromSanity } from "@/lib/seo/localeSegments";
import { pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import { relatedServiceSlugs } from "@/lib/seo/relatedServices";
import { slugToMessageKey } from "@/lib/serviceSlugs";
import { normalizeUrlSlugParam } from "@/lib/normalizeUrlSlug";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import SetPageSlugs from "@/components/seo/SetPageSlugs";
import { SITE_URL } from "@/lib/siteConfig";
import { withSeoFilename } from "@/lib/sanity/image";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function isMissingDoc<T>(doc: T | null | undefined): doc is null | undefined {
  return doc == null || Array.isArray(doc);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = await params;
  const slug = normalizeUrlSlugParam(rawSlug);
  const service = await sanityFetch<any>(serviceBySlugQuery(locale as Locale), { slug });

  if (isMissingDoc(service)) return { title: "Service Not Found" };

  const ogImageRaw =
    service.image?.asset != null
      ? urlFor(service.image).width(1200).height(630).fit("crop").auto("format").url()
      : undefined;
  const ogImage = ogImageRaw
    ? withSeoFilename(ogImageRaw, service.image?.originalFilename ?? `torudeabi24-${slug}`)
    : undefined;

  const segments = segmentTripleFromSanity(service.canonicalSlug, service.pathSegment);
  const { canonical, languages } = alternatesForServicePage(segments, locale as Locale, slug);

  const title: string = service.metaTitle || service.title;
  const description: string | undefined = service.metaDescription || service.shortDescription;

  return {
    title: pageTitle(title),
    description,
    ...socialMeta({
      locale,
      url: canonical,
      title,
      description,
      image: ogImage,
      imageAlt: ogImage ? service.title : undefined,
    }),
    alternates: { canonical, languages },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug: rawSlug } = await params;
  const slug = normalizeUrlSlugParam(rawSlug);
  setRequestLocale(locale);

  const service = await sanityFetch<any>(serviceBySlugQuery(locale as Locale), { slug });

  if (isMissingDoc(service)) notFound();

  const tServices = await getTranslations({ locale, namespace: "services" });
  const relatedCanonical = relatedServiceSlugs(service.canonicalSlug);
  const relatedRows =
    relatedCanonical.length > 0
      ? await sanityFetch<Array<{ canonicalSlug: string; slug: string; title?: string }>>(
          servicesByCanonicalSlugsQuery(locale as Locale),
          { slugs: relatedCanonical },
        )
      : [];
  const relatedLinks = relatedCanonical.map((canon) => {
    const row = relatedRows?.find((r) => r.canonicalSlug === canon);
    const msgKey = slugToMessageKey[canon];
    return {
      slug: row?.slug ?? canon,
      title: row?.title || (msgKey ? tServices(`items.${msgKey}` as never) : canon),
    };
  });

  const topImages: { url: string; alt: string }[] = [];
  const seen = new Set<string>();
  const push = (url: string, alt: string) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    topImages.push({ url, alt: alt || service.title });
  };

  if (service.image?.asset) {
    const rawUrl = urlFor(service.image).width(1600).height(1067).fit("crop").quality(88).auto("format").url();
    push(
      withSeoFilename(rawUrl, service.image.originalFilename ?? `torudeabi24-${slug}`),
      typeof service.image?.alt === "string" ? service.image.alt : service.title,
    );
  }
  for (const g of service.gallery ?? []) {
    if (!g?.asset) continue;
    const rawGUrl = urlFor(g).width(1600).height(1067).fit("crop").quality(88).auto("format").url();
    push(
      withSeoFilename(rawGUrl, g.originalFilename ?? `torudeabi24-${slug}-gallery`),
      (typeof g.alt === "string" && g.alt) || service.title,
    );
  }

  const servicesLabel =
    locale === "et" ? "Teenused" : locale === "ru" ? "Услуги" : "Services";
  const servicesHref =
    locale === "et" ? "/teenused" : locale === "ru" ? "/%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8" : "/services";
  const serviceCanonicalUrl =
    locale === "et"
      ? `${SITE_URL}/et/teenused/${service.slug}`
      : locale === "ru"
      ? `${SITE_URL}/ru/%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8/${service.slug}`
      : `${SITE_URL}/en/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceCanonicalUrl}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription || service.shortDescription || service.title,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "TorudeAbi24",
      telephone: "+37256897929",
      url: SITE_URL,
    },
    brand: { "@type": "Brand", name: "TorudeAbi24.ee" },
    areaServed: [
      { "@type": "City", name: "Tallinn" },
      { "@type": "AdministrativeArea", name: "Harjumaa" },
    ],
    url: serviceCanonicalUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      lowPrice: 35,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        description: "From €35/hour. -30% discount 08:00–19:00 weekdays.",
        priceCurrency: "EUR",
      },
      availability: "https://schema.org/InStock",
      seller: { "@type": "LocalBusiness", "@id": `${SITE_URL}/#organization` },
    },
    ...(topImages.length > 0 ? { image: topImages[0].url } : {}),
  };

  const segments = segmentTripleFromSanity(service.canonicalSlug, service.pathSegment);

  return (
    <>
      <SetPageSlugs et={segments.et} en={segments.en} ru={segments.ru} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: servicesLabel, href: servicesHref },
          { name: service.title },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {Array.isArray(service.faq) && service.faq.length >= 2 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: service.faq.map((item: any, i: number) => ({
                "@type": "Question",
                "@id": `${SITE_URL}/${locale}/services/${slug}#faq-${i + 1}`,
                name: (typeof item.question === "object"
                  ? item.question[locale] ?? item.question.et ?? item.question.en
                  : item.question) ?? "",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: (typeof item.answer === "object"
                    ? item.answer[locale] ?? item.answer.et ?? item.answer.en
                    : item.answer) ?? "",
                },
              })),
            }),
          }}
        />
      )}
      <main className="pt-16 pb-16">
        <ServiceDetail service={service} topImages={topImages} relatedServices={relatedLinks} />
      </main>
      
    </>
  );
}
