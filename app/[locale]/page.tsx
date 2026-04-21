import { setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Process from "@/components/sections/Process";
// import Pricing from "@/components/sections/Pricing";
import SeoSection from "@/components/sections/SeoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import JsonLd from "@/components/seo/JsonLd";
import { sanityFetch } from "@/lib/sanity/client";
import { servicesListQuery, testimonialsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import { ALL_SERVICE_SLUGS } from "@/lib/serviceSlugs";

import type { Metadata } from "next";
import { alternatesForPage } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: alternatesForPage(locale as Locale, ""),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, testimonials] = await Promise.all([
    sanityFetch<{ _id: string; slug: string; title?: string; description?: string; icon?: string | null; order?: number }[]>(servicesListQuery(locale as Locale)),
    sanityFetch<{ _id: string; name: string; text?: string | null; rating?: number | null; avatar?: unknown }[]>(testimonialsQuery(locale as Locale))
  ]);

  const serviceTotal = services?.length ? services.length : ALL_SERVICE_SLUGS.length;

  return (
    <>
      <JsonLd locale={locale} />
      <Hero />
      <ServicesPreview services={services} totalCount={serviceTotal} />
      <Process />
      <TestimonialsSection items={testimonials ?? []} showList={true} showForm={false} />
      {/* <Pricing /> */}
      <SeoSection />
      <Footer />
      <FloatingCTA />
    </>
  );
}
