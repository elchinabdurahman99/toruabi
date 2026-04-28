import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { workProjectsQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import WorksGrid from "@/components/pages/WorksGrid";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("works.title"),
    description: t("works.description"),
    alternates: alternatesForPage(locale as Locale, "/works"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/works") },
  };
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await sanityFetch<any[]>(workProjectsQuery(locale as Locale));

  return (
    <>
      <main className="pt-16 min-h-screen">
        <WorksGrid projects={projects || []} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
