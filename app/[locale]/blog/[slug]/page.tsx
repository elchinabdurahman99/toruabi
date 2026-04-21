import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostBySlugQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import BlogPostDetail from "@/components/pages/BlogPostDetail";
import { alternatesForBlogPostPage, segmentTripleFromSanity } from "@/lib/seo/localeSegments";
import { normalizeUrlSlugParam } from "@/lib/normalizeUrlSlug";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function isMissingDoc<T>(doc: T | null | undefined): doc is null | undefined {
  return doc == null || Array.isArray(doc);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = await params;
  const slug = normalizeUrlSlugParam(rawSlug);
  const post = await sanityFetch<any>(blogPostBySlugQuery(locale as Locale), { slug });

  if (isMissingDoc(post)) return { title: "Post Not Found" };

  const segments = segmentTripleFromSanity(post.canonicalSlug, post.pathSegment);
  const { canonical, languages } = alternatesForBlogPostPage(segments, locale as Locale, slug);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical, languages },
    openGraph: { url: canonical },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug: rawSlug } = await params;
  const slug = normalizeUrlSlugParam(rawSlug);
  setRequestLocale(locale);

  const post = await sanityFetch<any>(blogPostBySlugQuery(locale as Locale), { slug });

  if (isMissingDoc(post)) notFound();

  return (
    <>
      <main className="pt-16 pb-16">
        <BlogPostDetail post={post} />
      </main>
      <Footer />
    </>
  );
}
