"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { ALL_SERVICE_SLUGS, slugToMessageKey } from "@/lib/serviceSlugs";

const PREVIEW_HOME_LIMIT = 6;

type Item = {
  _id: string;
  slug: string;
  canonicalSlug?: string;
  title?: string;
  description?: string;
  icon?: string | null;
  order?: number;
};

function buildPreviewList(cms: Item[] | null | undefined): Item[] {
  if (cms && cms.length > 0) {
    return [...cms]
      .sort(
        (a, b) =>
          (a.order ?? 999) - (b.order ?? 999) ||
          (a.canonicalSlug ?? a.slug).localeCompare(b.canonicalSlug ?? b.slug),
      )
      .slice(0, PREVIEW_HOME_LIMIT);
  }
  return ALL_SERVICE_SLUGS.slice(0, PREVIEW_HOME_LIMIT).map((slug) => ({
    _id: slug,
    slug,
    title: undefined,
    description: undefined,
    icon: null,
  }));
}

export default function ServicesPreview({
  services,
  totalCount,
}: {
  services: Item[] | null | undefined;
  totalCount: number;
}) {
  const t = useTranslations("services");
  const tp = useTranslations("servicesPreview");

  const list = buildPreviewList(services);
  const canon = (item: Item) => item.canonicalSlug ?? item.slug;

  const titleFor = (item: Item) => {
    if (item.title) return item.title;
    const key = slugToMessageKey[canon(item)];
    if (key) return t(`items.${key}` as any);
    return item.slug;
  };

  const descFor = (item: Item) => {
    if (item.description?.trim()) return item.description.trim();
    const key = slugToMessageKey[canon(item)];
    if (key) return t(`itemShort.${key}` as any);
    return "";
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#E11D48]" />
              <p className="text-[#E11D48] text-xs font-bold uppercase tracking-[0.25em]">
                {tp("kicker")}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D91] leading-[1.05] font-space">
              {tp("title")}
            </h2>
            <p className="text-[#5A5955] text-base sm:text-lg mt-4 leading-relaxed">
              {tp("subtitle")}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start lg:self-end text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shrink-0"
            style={{
              background: "linear-gradient(135deg, #1254B8, #0B3D91)",
              boxShadow: "0 4px 16px rgba(18,84,184,0.25)",
            }}
          >
            {tp("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((item, i) => {
            const isFirst = i === 0;
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.05, 0.25) }}
              >
                {isFirst ? (
                  /* Featured first card — blue */
                  <Link
                    href={internalPathToLinkHref(`/services/${item.slug}`)}
                    className="group flex flex-col gap-4 bg-[#0B3D91] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full"
                    style={{ boxShadow: "0 8px 32px -8px rgba(11,61,145,0.35)" }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1254B8]/40 rounded-bl-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-3xl pointer-events-none" />

                    <div className="w-12 h-12 rounded-xl bg-[#E11D48] flex items-center justify-center text-white shrink-0 relative z-10">
                      <ServiceIcon slug={canon(item)} sanityIcon={item.icon} size={22} strokeWidth={1.9} />
                    </div>

                    <div className="flex flex-col gap-2 relative z-10 flex-1">
                      <span className="text-white text-base font-extrabold leading-snug font-space hyphens-auto">
                        {titleFor(item)}
                      </span>
                      {descFor(item) ? (
                        <span className="text-white/65 text-xs leading-relaxed line-clamp-3">
                          {descFor(item)}
                        </span>
                      ) : null}
                    </div>

                    <span className="relative z-10 flex items-center gap-1 text-[#E11D48] text-[11px] font-bold uppercase tracking-wide">
                      {t("learnMore")} <ArrowUpRight size={11} />
                    </span>
                  </Link>
                ) : (
                  /* Regular card */
                  <Link
                    href={internalPathToLinkHref(`/services/${item.slug}`)}
                    className="group flex flex-col gap-4 bg-white border border-[#E8EFFE] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1254B8]/30 hover:shadow-[0_12px_36px_-8px_rgba(18,84,184,0.15)] relative overflow-hidden h-full"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#E8EFFE] to-transparent rounded-bl-3xl pointer-events-none transition-opacity group-hover:opacity-60" />

                    <div className="w-12 h-12 rounded-xl bg-[#E8EFFE] flex items-center justify-center text-[#1254B8] shrink-0 group-hover:bg-[#1254B8] group-hover:text-white transition-all duration-300">
                      <ServiceIcon slug={canon(item)} sanityIcon={item.icon} size={22} strokeWidth={1.9} />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <span className="text-[#0B3D91] text-base font-extrabold leading-snug group-hover:text-[#1254B8] transition-colors font-space hyphens-auto">
                        {titleFor(item)}
                      </span>
                      {descFor(item) ? (
                        <span className="text-[#9C9B96] text-xs leading-relaxed line-clamp-2">
                          {descFor(item)}
                        </span>
                      ) : null}
                    </div>

                    <span className="flex items-center gap-1 text-[#1254B8] text-[11px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("learnMore")} <ArrowUpRight size={11} />
                    </span>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[#9C9B96] text-sm mt-8">
          {tp("countHint", { shown: PREVIEW_HOME_LIMIT, total: totalCount })}
        </p>
      </div>
    </section>
  );
}
