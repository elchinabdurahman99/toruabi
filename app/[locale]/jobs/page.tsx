import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { jobPostingsQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";
import Footer from "@/components/layout/Footer";
import JobsGrid from "@/components/pages/JobsGrid";
import FloatingCTA from "@/components/ui/FloatingCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("jobs.title"),
    description: t("jobs.description"),
    alternates: alternatesForPage(locale as Locale, "/jobs"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/jobs") },
  };
}

export default async function JobsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jobs = await sanityFetch<any[]>(jobPostingsQuery(locale as Locale));

  return (
    <>
      <main className="pt-16 pb-20 min-h-screen">
        <JobsGrid jobs={jobs || []} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
