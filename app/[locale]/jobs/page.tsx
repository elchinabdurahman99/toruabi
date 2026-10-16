import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { jobPostingsQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";

import JobsGrid from "@/components/pages/JobsGrid";
import FloatingCTA from "@/components/ui/FloatingCTA";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("jobs.title");
  const description = t("jobs.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/jobs"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/jobs"), title, description }),
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
      
      <FloatingCTA />
    </>
  );
}
