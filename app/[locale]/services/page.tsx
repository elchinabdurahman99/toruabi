import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceCategoriesWithServicesQuery, servicesListQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import { DUPLICATE_SERVICE_OF } from "@/lib/seo/duplicateServices";
import type { Metadata } from "next";

import ServicesGrid from "@/components/pages/ServicesGrid";
import { urlFor } from "@/lib/sanity/image";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { withSeoFilename } from "@/lib/sanity/image";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("servicesIndex.title");
  const description = t("servicesIndex.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/services"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/services"), title, description }),
  };
}

function addThumb(svc: any, locale: string) {
  const rawThumb = svc.image?.asset
    ? urlFor(svc.image).width(640).height(400).fit("crop").quality(85).url()
    : undefined;
  return {
    ...svc,
    thumbUrl: rawThumb
      ? withSeoFilename(rawThumb, svc.image?.originalFilename ?? `torudeabi24-${svc.canonicalSlug ?? "service"}`)
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
  const allServices = (rawFlat ?? [])
    .filter((s) => !DUPLICATE_SERVICE_OF[s.canonicalSlug])
    .map((s) => addThumb(s, locale));

  const servicesLabel =
    locale === "et" ? "Teenused" : locale === "ru" ? "Услуги" : "Services";

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: servicesLabel, href: "/services" }]} />
      <main className="pt-16 pb-16">
        <ServicesGrid categories={categories} allServices={allServices} />
      </main>
      
    </>
  );
}
