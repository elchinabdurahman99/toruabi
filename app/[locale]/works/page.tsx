import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { workProjectsQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import { SITE_NAME } from "@/lib/siteConfig";

import FloatingCTA from "@/components/ui/FloatingCTA";
import WorksGrid from "@/components/pages/WorksGrid";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("works.title");
  const description = t("works.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/works"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/works"), title, description }),
  };
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await sanityFetch<any[]>(workProjectsQuery(locale as Locale));
  const data = projects ?? [];

  const worksLabel =
    locale === "et" ? "Meie Tööd" : locale === "ru" ? "Наши Работы" : "Our Works";

  // Build ImageObject list for structured data from real projects
  const imageObjects = data
    .filter((p) => p.mainImage?.asset)
    .slice(0, 12)
    .map((p) => {
      const imgUrl = p.mainImage.asset?.url
        ?? (p.mainImage.asset?._ref
          ? urlFor(p.mainImage).width(800).height(600).url()
          : null);
      if (!imgUrl) return null;
      return {
        "@type": "ImageObject",
        url: imgUrl,
        name: p.title,
        description: p.shortDescription ?? p.title,
        author: { "@type": "Organization", name: SITE_NAME },
      };
    })
    .filter(Boolean);

  const itemListSchema = imageObjects.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: worksLabel,
        description:
          locale === "et"
            ? "Lõpetatud projektid Tallinnas ja Harjumaal — torustik, elekter, vannitoad, remont."
            : locale === "ru"
            ? "Выполненные проекты в Таллине и Харьюмаа — сантехника, электрика, ванные, ремонт."
            : "Completed projects in Tallinn and Harjumaa — plumbing, electrical, bathrooms, renovation.",
        url: openGraphPageUrl(locale as Locale, "/works"),
        numberOfItems: data.length,
        itemListElement: data.slice(0, 20).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          description: p.shortDescription,
        })),
      }
    : null;

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: worksLabel, href: "/works" }]} />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <main className="pt-16 min-h-screen">
        <WorksGrid projects={data} locale={locale} />
      </main>
      
      <FloatingCTA />
    </>
  );
}
