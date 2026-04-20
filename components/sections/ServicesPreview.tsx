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

const CARD_ACCENT_COLORS = [
  "#CC1414",
  "#0D1B3E",
  "#1565C0",
  "#CC1414",
  "#0D1B3E",
  "#1565C0",
] as const;

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
    <section className="py-16 sm:py-20 bg-[#F5F6FA] relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E2E5EF]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[#CC1414] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {tp("kicker")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B3E] leading-[1.05] font-space">
              {tp("title")}
            </h2>
            <p className="text-[#6B7280] text-base sm:text-lg mt-4 leading-relaxed">
              {tp("subtitle")}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start lg:self-end text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shrink-0"
            style={{ background: "#CC1414", boxShadow: "0 4px 16px rgba(204,20,20,0.25)" }}
          >
            {tp("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Service cards – alternate numbered list style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((item, i) => {
            const accent = CARD_ACCENT_COLORS[i % CARD_ACCENT_COLORS.length];
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.05, 0.25) }}
              >
                <Link
                  href={internalPathToLinkHref(`/services/${item.slug}`)}
                  className="group flex flex-row gap-5 items-start bg-white border border-[#E2E5EF] rounded-2xl px-5 py-5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px -8px ${accent}22`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${accent}35`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "#E2E5EF";
                  }}
                >
                  {/* Large index number */}
                  <span
                    className="text-5xl font-black leading-none select-none shrink-0 transition-transform group-hover:scale-110 duration-300"
                    style={{ color: `${accent}18`, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {num}
                  </span>
                  <div className="flex flex-col gap-1.5 min-w-0 pt-0.5">
                    {/* Icon + Title row */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110 duration-200"
                        style={{ background: accent }}
                      >
                        <ServiceIcon slug={canon(item)} sanityIcon={item.icon} size={16} strokeWidth={2} />
                      </div>
                      <span className="text-[#0D1B3E] text-[15px] font-extrabold leading-snug group-hover:text-[#CC1414] transition-colors hyphens-auto font-space">
                        {titleFor(item)}
                      </span>
                    </div>
                    {descFor(item) ? (
                      <span className="text-[#6B7280] text-xs leading-relaxed line-clamp-2 pl-10">
                        {descFor(item)}
                      </span>
                    ) : null}
                    <span className="pl-10 mt-0.5 flex items-center gap-0.5 text-[#CC1414] text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("learnMore")}
                      <ArrowUpRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[#9CA3AF] text-sm mt-8">
          {tp("countHint", { shown: PREVIEW_HOME_LIMIT, total: totalCount })}
        </p>
      </div>
    </section>
  );
}
