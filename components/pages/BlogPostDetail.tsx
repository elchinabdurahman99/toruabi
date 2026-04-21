"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const BLOG_SERVICE_LINKS = [
  { slug: "plumbing-works-tallinn", itemKey: "plumbingWorks" as const },
  { slug: "plumber-24h-tallinn", itemKey: "plumbing" as const },
  { slug: "bathroom-repair", itemKey: "bathroomRepair" as const },
  { slug: "electrician-services", itemKey: "electrical" as const },
];

function BlogServiceLinks() {
  const tItems = useTranslations("services.items");
  const tNav = useTranslations("nav");
  const tS = useTranslations("services");

  return (
    <>
      <ul className="flex flex-col sm:flex-wrap gap-2 sm:flex-row">
        {BLOG_SERVICE_LINKS.map(({ slug, itemKey }) => (
          <li key={slug}>
            <Link
              href={internalPathToLinkHref(`/services/${slug}`)}
              className="inline-flex rounded-xl border border-[#E8EFFE] bg-[#F0F4FF] px-4 py-2.5 text-sm font-semibold text-[#374151] hover:border-[#1254B8]/40 hover:text-[#1254B8] transition-colors"
            >
              {tItems(itemKey)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          href="/services"
          className="text-sm font-bold text-[#1254B8] hover:underline"
        >
          {tS("viewAll")} →
        </Link>
        <Link
          href="/contact"
          className="text-sm font-semibold text-[#5A5955] hover:text-[#0B3D91] transition-colors"
        >
          {tNav("contact")}
        </Link>
      </div>
    </>
  );
}

interface BlogPostDetailProps {
  post: {
    title: string;
    slug: string;
    body?: any[];
    excerpt?: string;
    publishedAt?: string;
    mainImage?: any;
    author?: string;
  };
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const t = useTranslations("blog");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#5A5955] hover:text-[#0B3D91] text-sm font-semibold mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> {t("backToBlog")}
          </Link>

          {post.publishedAt && (
            <div className="flex items-center gap-2 text-[#9C9B96] text-sm font-medium mb-4">
              <Calendar size={14} />
              {t("publishedOn")} {new Date(post.publishedAt).toLocaleDateString()}
              {post.author && <span>· {post.author}</span>}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] mb-6 font-space leading-tight">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="aspect-video relative rounded-2xl overflow-hidden mb-8 border border-[#E8EFFE]">
              <Image
                src={urlFor(post.mainImage).width(1200).height(680).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {post.body && post.body.length > 0 && (
            <div className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-[#0B3D91] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-[#374151] [&_p]:leading-relaxed [&_ul]:space-y-1.5 [&_li]:text-[#374151] [&_strong]:text-[#0B3D91]">
              <PortableText value={post.body} />
            </div>
          )}

          {/* Service links */}
          <nav
            className="mt-12 rounded-2xl border border-[#E8EFFE] bg-[#F0F4FF] p-6"
            aria-labelledby="blog-service-links"
          >
            <h2 id="blog-service-links" className="text-base font-bold text-[#0B3D91] mb-1">
              {t("serviceLinksTitle")}
            </h2>
            <p className="text-sm text-[#5A5955] mb-4">{t("serviceLinksIntro")}</p>
            <BlogServiceLinks />
          </nav>
        </motion.div>
      </div>
    </div>
  );
}
