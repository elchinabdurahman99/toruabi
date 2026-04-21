import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { pricingQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import PriceListContent from "@/components/pages/PriceListContent";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("priceList.title"),
    description: t("priceList.description"),
    alternates: alternatesForPage(locale as Locale, "/price-list"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/price-list") },
  };
}

export default async function PriceListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pricing = await sanityFetch<any[]>(pricingQuery(locale as Locale));

  return (
    <>
      <main className="pt-16 pb-16">
        <PriceListContent pricing={pricing || []} />
      </main>
      <Footer />
    </>
  );
}
