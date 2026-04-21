import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { sanityFetch } from "@/lib/sanity/client";
import { testimonialsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: alternatesForPage(locale as Locale, "/contact"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/contact") },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const testimonials = await sanityFetch<
    { _id: string; name: string; text?: string | null; rating?: number | null; avatar?: unknown }[]
  >(testimonialsQuery(locale as Locale));

  return (
    <>
      <main className="bg-[#F0F4FF]">
        <Contact />
        <TestimonialsSection items={testimonials ?? []} showList={false} showForm={true} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
