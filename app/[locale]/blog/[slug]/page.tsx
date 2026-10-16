import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostBySlugQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostDetail from "@/components/pages/BlogPostDetail";
import { alternatesForBlogPostPage, segmentTripleFromSanity } from "@/lib/seo/localeSegments";
import { pageTitle, socialMeta } from "@/lib/seo/pageMeta";
import { normalizeUrlSlugParam } from "@/lib/normalizeUrlSlug";
import { urlFor } from "@/lib/sanity/image";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const revalidate = 3600;
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

  const ogImageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").auto("format").url()
    : `${SITE_URL}/api/og`;

  const title: string = post.metaTitle || post.title;
  const description: string | undefined = post.metaDescription || post.excerpt;
  const social = socialMeta({
    locale,
    url: canonical,
    title,
    description,
    image: ogImageUrl,
    imageAlt: post.title,
    type: "article",
  });

  return {
    title: pageTitle(title),
    description,
    alternates: { canonical, languages },
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
    },
    twitter: social.twitter,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug: rawSlug } = await params;
  const slug = normalizeUrlSlugParam(rawSlug);
  setRequestLocale(locale);

  const post = await sanityFetch<any>(blogPostBySlugQuery(locale as Locale), { slug });

  if (isMissingDoc(post)) notFound();

  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").auto("format").url()
    : `${SITE_URL}/api/og`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/${locale}/blog/${slug}`,
    headline: post.title,
    description: post.metaDescription || post.excerpt || post.title,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    datePublished: post.publishedAt ?? new Date().toISOString(),
    dateModified: post._updatedAt ?? post.publishedAt ?? new Date().toISOString(),
    inLanguage: locale,
    image: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630 },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/api/og` },
    },
    author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${slug}`,
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <main className="pt-16 pb-16">
        <BlogPostDetail post={post} />
      </main>
      
    </>
  );
}
