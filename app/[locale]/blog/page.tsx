import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostsQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import BlogGrid from "@/components/pages/BlogGrid";
import { alternatesForPage, openGraphPageUrl } from "@/lib/seo/pageMeta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageSeo" });
  return {
    title: t("blogIndex.title"),
    description: t("blogIndex.description"),
    alternates: alternatesForPage(locale as Locale, "/blog"),
    openGraph: { url: openGraphPageUrl(locale as Locale, "/blog") },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await sanityFetch<any[]>(blogPostsQuery(locale as Locale));

  return (
    <>
      <main className="pt-16 pb-16">
        <BlogGrid posts={posts || []} />
      </main>
      <Footer />
    </>
  );
}
