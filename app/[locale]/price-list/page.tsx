import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { pricingQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";

import PriceListContent from "@/components/pages/PriceListContent";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("priceList.title");
  const description = t("priceList.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/price-list"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/price-list"), title, description }),
  };
}

export default async function PriceListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pricing = await sanityFetch<any[]>(pricingQuery(locale as Locale));

  const priceLabel =
    locale === "et" ? "Hinnakiri" : locale === "ru" ? "Цены" : "Price List";

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: priceLabel, href: "/price-list" }]} />
      <main className="pt-16 pb-16">
        <PriceListContent pricing={pricing || []} />
      </main>
      
    </>
  );
}
