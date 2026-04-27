import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceCategoriesWithServicesQuery, servicesListQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/pages/ServicesGrid";
import { urlFor } from "@/lib/sanity/image";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("servicesIndex.title"),
    description: t("servicesIndex.description"),
    alternates: alternatesForPage(locale as Locale, "/services"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/services") },
  };
}

function addThumb(svc: any, locale: string) {
  return {
    ...svc,
    thumbUrl: svc.image?.asset
      ? urlFor(svc.image).width(640).height(400).fit("crop").quality(85).url()
      : undefined,
    thumbAlt: (typeof svc.image?.alt === "string" && svc.image.alt) || svc.title,
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Primary: try to get categorized data
  const rawCategories = await sanityFetch<any[]>(
    serviceCategoriesWithServicesQuery(locale as Locale)
  );

  const categories = (rawCategories ?? [])
    .filter((cat) => cat.services?.length > 0)
    .map((cat) => ({
      ...cat,
      services: (cat.services ?? []).map((s: any) => addThumb(s, locale)),
    }));

  // Fallback flat list (for search + uncategorized services)
  const rawFlat = await sanityFetch<any[]>(servicesListQuery(locale as Locale));
  const allServices = (rawFlat ?? []).map((s) => addThumb(s, locale));

  return (
    <>
      <main className="pt-16 pb-16">
        <ServicesGrid categories={categories} allServices={allServices} />
      </main>
      <Footer />
    </>
  );
}
