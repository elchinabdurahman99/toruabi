import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import PrivacyContent from "@/components/pages/PrivacyContent";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("privacy.title");
  const description = t("privacy.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/privacy-policy"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/privacy-policy"), title, description }),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main className="pt-28 pb-16">
        <PrivacyContent />
      </main>
      
    </>
  );
}
