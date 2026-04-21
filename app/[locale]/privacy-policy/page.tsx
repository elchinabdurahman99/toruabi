import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import PrivacyContent from "@/components/pages/PrivacyContent";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
    alternates: alternatesForPage(locale as Locale, "/privacy-policy"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/privacy-policy") },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main className="pt-16 pb-16">
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
