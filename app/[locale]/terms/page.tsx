import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import TermsContent from "@/components/pages/TermsContent";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("terms.title"),
    description: t("terms.description"),
    alternates: alternatesForPage(locale as Locale, "/terms"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/terms") },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main className="pt-16 pb-16">
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
