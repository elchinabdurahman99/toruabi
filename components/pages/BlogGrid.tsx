"use client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import PageBanner from "@/components/ui/PageBanner";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: any;
  author?: string;
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("blog");

  return (
    <div className="min-h-screen">
      <PageBanner
        kicker="torudeabi.ee"
        title={t("title")}
        breadcrumbs={[{ label: t("title") }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#8B3FC8]/15">
            <p className="text-[#9C9B96] text-base">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={internalPathToLinkHref(`/blog/${post.slug}`)}
                  className="group flex flex-col h-full rounded-[2rem] border border-[#3B6CF4]/12 bg-white/55 backdrop-blur-sm hover:border-[#8B3FC8]/35 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/70 transition-all duration-300 overflow-hidden p-3"
                >
                  {post.mainImage ? (
                    <div className="aspect-video relative overflow-hidden rounded-[1.5rem]">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(340).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-white/40 flex items-center justify-center rounded-[1.5rem]">
                      <span className="text-[#8B3FC8] text-3xl font-black">Blog</span>
                    </div>
                  )}
                  <div className="flex flex-col flex-1 px-4 py-6">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1.5 text-[#9C9B96] text-xs font-semibold mb-3">
                        <Calendar size={12} />
                        {new Date(post.publishedAt).toLocaleDateString()}
                        {post.author && <span>· {post.author}</span>}
                      </div>
                    )}
                    <h3 className="font-bold text-[#1a2a6c] text-base mb-2 font-space group-hover:text-[#8B3FC8] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-[#5A5955] text-sm line-clamp-3 mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                    )}
                    <span className="mt-auto text-sm font-bold text-[#E8354A] flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("readMore")} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
