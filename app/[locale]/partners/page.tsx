import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { partnersQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";

import PartnersGrid from "@/components/pages/PartnersGrid";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("partners.title");
  const description = t("partners.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/partners"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/partners"), title, description }),
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const partners = await sanityFetch<any[]>(partnersQuery);

  return (
    <>
      <main className="pt-16 pb-20 min-h-screen">
        <PartnersGrid partners={partners || []} />
      </main>
      
    </>
  );
}
