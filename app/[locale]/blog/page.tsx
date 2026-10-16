import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";

import BlogGrid from "@/components/pages/BlogGrid";
import { alternatesForPage, openGraphPageUrl, pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 3600;
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  const title = t("blogIndex.title");
  const description = t("blogIndex.description");
  return {
    title: pageTitle(title),
    description,
    alternates: alternatesForPage(locale as Locale, "/blog"),
    ...socialMeta({ locale, url: openGraphPageUrl(locale as Locale, "/blog"), title, description }),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await sanityFetch<any[]>(blogPostsQuery(locale as Locale));

  const blogLabel =
    locale === "et" ? "Blogi" : locale === "ru" ? "Блог" : "Blog";

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: blogLabel, href: "/blog" }]} />
      <main className="pt-16 pb-16">
        <BlogGrid posts={posts || []} />
      </main>
      
    </>
  );
}
