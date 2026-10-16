import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/seo/JsonLd";

// Below-fold — load after hero paints
const ServicesPreview   = dynamic(() => import("@/components/sections/ServicesPreview"));
const Process           = dynamic(() => import("@/components/sections/Process"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const SeoSection        = dynamic(() => import("@/components/sections/SeoSection"));
const FloatingCTA       = dynamic(() => import("@/components/ui/FloatingCTA"));
import { sanityFetch } from "@/lib/sanity/client";
import { servicesListQuery, testimonialsQuery, heroSlidesQuery, servicesByCanonicalSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Locale } from "@/i18n/config";
import { ALL_SERVICE_SLUGS } from "@/lib/serviceSlugs";
import type { HeroSlide } from "@/components/sections/HeroSlider";
import type { Metadata } from "next";
import { alternatesForPage } from "@/lib/seo/pageMeta";
import { DUPLICATE_SERVICE_OF } from "@/lib/seo/duplicateServices";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesForPage(locale as Locale, "") };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const SEO_CANONICAL_SLUGS = [
    "24h-emergency-plumbing", "electrician-services", "bathroom-renovation",
    "cleaning-services", "pipe-repair-replacement", "gas-boiler-replacement",
    "roofing-works", "construction-works", "drain-blockage-removal",
    "apartment-renovation", "floor-heating", "water-meter-replacement",
  ];

  const [services, testimonials, rawSlides, seoServiceRows] = await Promise.all([
    sanityFetch<any[]>(servicesListQuery(locale as Locale)),
    sanityFetch<any[]>(testimonialsQuery(locale as Locale)),
    sanityFetch<any[]>(heroSlidesQuery(locale)),
    sanityFetch<Array<{ canonicalSlug: string; slug: string }>>(
      servicesByCanonicalSlugsQuery(locale as Locale),
      { slugs: SEO_CANONICAL_SLUGS },
    ).catch(() => []),
  ]);

  const seoSlugMap: Record<string, string> = Object.fromEntries(
    (seoServiceRows ?? []).map((r) => [r.canonicalSlug, r.slug]),
  );

  // Server-side URL resolution — keeps @sanity/client out of the client bundle
  // Mobile: 640px wide, q=60 for fast LCP. Desktop: 900px wide, q=75.
  const slides: HeroSlide[] = (rawSlides ?? [])
    .filter((s: any) => s?.asset)
    .map((s: any, i: number) => ({
      id: s._key ?? `slide-${i}`,
      src: urlFor(s).width(900).height(600).fit("crop").auto("format").quality(72).url(),
      srcMobile: urlFor(s).width(640).height(427).fit("crop").auto("format").quality(60).url(),
      alt: s.alt ?? "TorudeAbi24",
    }));

  // Duplicate documents 301 to their main page, so they are neither listed nor counted.
  const listedServices = (services ?? []).filter((s) => !DUPLICATE_SERVICE_OF[s.canonicalSlug]);
  const serviceTotal = listedServices.length || ALL_SERVICE_SLUGS.length;

  return (
    <>
      {/* LCP preload — two size variants matched by media query so the preload scanner
          fetches the right image before the JS bundle even parses. */}
      {slides[0] && (<>
        <link rel="preload" as="image" href={slides[0].srcMobile} fetchPriority="high" media="(max-width: 640px)" />
        <link rel="preload" as="image" href={slides[0].src} fetchPriority="high" media="(min-width: 641px)" />
      </>)}
      <JsonLd locale={locale} />
      <Hero slides={slides} />
      <ServicesPreview services={listedServices} totalCount={serviceTotal} />
      <Process />
      <TestimonialsSection items={testimonials ?? []} showList={true} showForm={false} />
      <SeoSection serviceSlugMap={seoSlugMap} />
      <FloatingCTA />
    </>
  );
}
