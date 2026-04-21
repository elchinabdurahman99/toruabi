import { getTranslations, setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceBySlugQuery, servicesByCanonicalSlugsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ServiceDetail from "@/components/pages/ServiceDetail";
import { urlFor } from "@/lib/sanity/image";
import { alternatesForServicePage, segmentTripleFromSanity } from "@/lib/seo/localeSegments";
import { relatedServiceSlugs } from "@/lib/seo/relatedServices";
import { slugToMessageKey } from "@/lib/serviceSlugs";
import { normalizeUrlSlugParam } from "@/lib/normalizeUrlSlug";

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

  const ogImage =
    service.image?.asset != null
      ? urlFor(service.image).width(1200).height(630).fit("crop").auto("format").url()
      : undefined;

  const segments = segmentTripleFromSanity(service.canonicalSlug, service.pathSegment);
  const { canonical, languages } = alternatesForServicePage(segments, locale as Locale, slug);

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.shortDescription,
    ...(ogImage
      ? {
          openGraph: {
            url: canonical,
            images: [{ url: ogImage, width: 1200, height: 630, alt: service.title }],
          },
          twitter: { card: "summary_large_image", images: [ogImage] },
        }
      : { openGraph: { url: canonical } }),
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
      ? await sanityFetch<Array<{ canonicalSlug: string; slug: string }>>(
          servicesByCanonicalSlugsQuery(locale as Locale),
          { slugs: relatedCanonical },
        )
      : [];
  const relatedLinks = relatedCanonical.map((canon) => {
    const row = relatedRows?.find((r) => r.canonicalSlug === canon);
    return {
      slug: row?.slug ?? canon,
      title: tServices(`items.${slugToMessageKey[canon]}` as never),
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
    push(
      urlFor(service.image).width(1600).height(1067).fit("crop").quality(88).auto("format").url(),
      typeof service.image?.alt === "string" ? service.image.alt : service.title,
    );
  }
  for (const g of service.gallery ?? []) {
    if (!g?.asset) continue;
    push(
      urlFor(g).width(1600).height(1067).fit("crop").quality(88).auto("format").url(),
      (typeof g.alt === "string" && g.alt) || service.title,
    );
  }

  return (
    <>
      <main className="pt-16 pb-16">
        <ServiceDetail service={service} topImages={topImages} relatedServices={relatedLinks} />
      </main>
      <Footer />
    </>
  );
}
