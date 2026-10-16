import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import Contact from "@/components/sections/Contact";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FloatingCTA from "@/components/ui/FloatingCTA";
import PageBanner from "@/components/ui/PageBanner";
import { sanityFetch } from "@/lib/sanity/client";
import { testimonialsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("contact.title");
  const description = t("contact.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/contact"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/contact"), title, description }),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [testimonials, t] = await Promise.all([
    sanityFetch<
      { _id: string; name: string; text?: string | null; rating?: number | null; avatar?: unknown }[]
    >(testimonialsQuery(locale as Locale)),
    getTranslations({ locale, namespace: "contact" }),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[{ name: t("title"), href: "/contact" }]}
      />
      <main>
        <PageBanner
          kicker="torudeabi24.ee"
          title={t("title")}
          subtitle={t("subtitle")}
          breadcrumbs={[{ label: t("title") }]}
          accentColor="#E8354A"
        />
        <Contact />
        <TestimonialsSection items={testimonials ?? []} showList={false} showForm={true} />
      </main>
      
      <FloatingCTA />
    </>
  );
}
