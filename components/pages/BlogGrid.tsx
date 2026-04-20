"use client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

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
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#F5F6FA] border-b border-[#E2E5EF]">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[#CC1414] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              torudeabi.ee
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B3E] font-space">
              {t("title")}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-[#F5F6FA] border border-[#E2E5EF]">
            <p className="text-[#9CA3AF] text-base">No blog posts yet. Check back soon!</p>
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
                  className="group flex flex-col h-full rounded-[2rem] border border-[#E2E5EF] bg-white hover:border-[#CC1414]/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden p-3"
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
                    <div className="aspect-[16/10] bg-[#F5F6FA] flex items-center justify-center rounded-[1.5rem]">
                      <span className="text-[#9CA3AF] text-3xl font-black">Blog</span>
                    </div>
                  )}
                  <div className="flex flex-col flex-1 px-4 py-6">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1.5 text-[#9CA3AF] text-xs font-semibold mb-3">
                        <Calendar size={12} />
                        {new Date(post.publishedAt).toLocaleDateString()}
                        {post.author && <span>· {post.author}</span>}
                      </div>
                    )}
                    <h3 className="font-bold text-[#0D1B3E] text-base mb-2 font-space group-hover:text-[#CC1414] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-[#6B7280] text-sm line-clamp-3 mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                    )}
                    <span className="mt-auto text-sm font-bold text-[#CC1414] flex items-center gap-1 group-hover:gap-2 transition-all">
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
