"use client";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Clock from "lucide-react/dist/esm/icons/clock";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const BLOG_SERVICE_LINKS = [
  { slug: "pipe-works", itemKey: "plumbingWorks" as const },
  { slug: "24h-emergency-plumbing", itemKey: "plumbing" as const },
  { slug: "bathroom-renovation", itemKey: "bathroomRepair" as const },
  { slug: "24h-emergency-electrical", itemKey: "electrical" as const },
];

function estimateReadingTime(blocks: any[]): number {
  const text = (blocks ?? [])
    .flatMap((b: any) => b._type === "block" ? (b.children ?? []).map((c: any) => c.text ?? "") : [])
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Simple portable text renderer — no external dependency
function renderBlocks(blocks: any[]): React.ReactNode[] {
  return (blocks ?? []).map((block: any, i: number) => {
    if (block._type !== "block") return null;
    const text = (block.children ?? []).map((c: any) => c.text ?? "").join("");
    const key = block._key ?? i;
    if (block.listItem === "bullet") {
      return <li key={key} className="text-[#374151] leading-relaxed">{text}</li>;
    }
    switch (block.style) {
      case "h2": return <h2 key={key} className="text-2xl font-extrabold text-[#2B5CE6] mt-8 mb-3">{text}</h2>;
      case "h3": return <h3 key={key} className="text-xl font-bold text-[#1a2a6c] mt-6 mb-2">{text}</h3>;
      default:   return text ? <p key={key} className="text-[#374151] leading-relaxed mb-3">{text}</p> : null;
    }
  }).filter(Boolean);
}

function groupBlocks(blocks: any[]): React.ReactNode {
  const result: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listKey = 0;

  for (const block of (blocks ?? [])) {
    if (block._type === "block" && block.listItem === "bullet") {
      listItems.push(renderBlocks([block]));
    } else {
      if (listItems.length > 0) {
        result.push(<ul key={`ul-${listKey++}`} className="list-disc pl-6 space-y-1.5 mb-4">{listItems}</ul>);
        listItems = [];
      }
      result.push(...renderBlocks([block]));
    }
  }
  if (listItems.length > 0) {
    result.push(<ul key={`ul-${listKey}`} className="list-disc pl-6 space-y-1.5 mb-4">{listItems}</ul>);
  }
  return result;
}

function BlogServiceLinks() {
  const tItems = useTranslations("services.items");
  const tS = useTranslations("services");
  const tNav = useTranslations("nav");
  return (
    <div>
      <ul className="flex flex-col sm:flex-wrap gap-2 sm:flex-row">
        {BLOG_SERVICE_LINKS.map(({ slug, itemKey }) => (
          <li key={slug}>
            <Link
              href={internalPathToLinkHref(`/services/${slug}`)}
              className="inline-flex rounded-xl border border-[#E8EFFE] bg-[#F0F4FF] px-4 py-2.5 text-sm font-semibold text-[#374151] hover:border-[#3B6CF4]/40 hover:text-[#3B6CF4] transition-colors"
            >
              {tItems(itemKey)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link href="/services" className="text-sm font-bold text-[#3B6CF4] hover:underline">
          {tS("viewAll")} →
        </Link>
        <Link href="/contact" className="text-sm font-semibold text-[#5A5955] hover:text-[#2B5CE6] transition-colors">
          {tNav("contact")}
        </Link>
      </div>
    </div>
  );
}

interface Post {
  title: string;
  body?: any[] | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  mainImage?: { asset?: any; alt?: any } | null;
}

export default function BlogPostDetail({ post }: { post: Post }) {
  const t = useTranslations("blog");
  const format = useFormatter();
  const readingTime = Array.isArray(post.body) && post.body.length > 0
    ? estimateReadingTime(post.body) : null;
  const mainImageAlt =
    typeof post.mainImage?.alt === "string"
      ? post.mainImage.alt
      : (post.mainImage?.alt as any)?.en ?? (post.title ?? "");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#5A5955] hover:text-[#2B5CE6] text-sm font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          {t("backToBlog")}
        </Link>

        {post.publishedAt && (
          <div className="flex items-center gap-3 text-[#6B7280] text-sm font-medium mb-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {t("publishedOn")} {format.dateTime(new Date(post.publishedAt), { day: "numeric", month: "numeric", year: "numeric" })}
            </span>
            {readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {readingTime} {t("minRead")}
              </span>
            )}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2B5CE6] mb-6 font-space leading-tight">
          {post.title}
        </h1>

        {post.mainImage?.asset && (
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-8 border border-[#E8EFFE]">
            <Image
              src={urlFor(post.mainImage).width(1200).height(680).url()}
              alt={mainImageAlt}
              fill
              className="object-cover"
            />
          </div>
        )}

        {Array.isArray(post.body) && post.body.length > 0 && (
          <div className="space-y-0">
            {groupBlocks(post.body)}
          </div>
        )}

        <nav className="mt-12 rounded-2xl border border-[#E8EFFE] bg-[#F0F4FF] p-6">
          <h2 className="text-base font-bold text-[#2B5CE6] mb-1">{t("serviceLinksTitle")}</h2>
          <p className="text-sm text-[#5A5955] mb-4">{t("serviceLinksIntro")}</p>
          <BlogServiceLinks />
        </nav>
      </div>
    </div>
  );
}
