import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { partnersQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";
import Footer from "@/components/layout/Footer";
import PartnersGrid from "@/components/pages/PartnersGrid";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("partners.title"),
    description: t("partners.description"),
    alternates: alternatesForPage(locale as Locale, "/partners"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/partners") },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const partners = await sanityFetch<any[]>(partnersQuery);

  return (
    <>
      <main className="pt-36 pb-20 bg-[#06060A] min-h-screen">
        <PartnersGrid partners={partners || []} />
      </main>
      <Footer />
    </>
  );
}
