"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Search from "lucide-react/dist/esm/icons/search";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { ALL_SERVICE_SLUGS, slugToMessageKey } from "@/lib/serviceSlugs";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Service {
  _id: string;
  title: string;
  slug: string;
  canonicalSlug?: string;
  description?: string;
  icon?: string | null;
  order?: number;
  thumbUrl?: string;
  thumbAlt?: string;
}

interface CategoryGroup {
  _id: string;
  slug: string;
  title: string;
  icon?: string | null;
  services: Service[];
}

interface Props {
  categories: CategoryGroup[];
  allServices: Service[];
}

// ── Constants ─────────────────────────────────────────────────────────────────
const ACCENT_COLORS = ["#2B5CE6", "#3B6CF4", "#E8354A", "#1B8E4A", "#7C3AED", "#0B7EA8", "#B45309", "#2B5CE6", "#3B6CF4"];

function fallbackList(tItem: (k: string) => string): Service[] {
  return ALL_SERVICE_SLUGS.map((slug, i) => {
    const key = slugToMessageKey[slug];
    return { _id: slug, slug, title: key ? tItem(key) : slug, description: "", order: i };
  });
}

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, accentColor, learnMore }: { service: Service; accentColor: string; learnMore: string }) {
  return (
    <Link
      href={internalPathToLinkHref(`/services/${service.slug}`)}
      className="group flex flex-col h-full rounded-2xl border border-[#3B6CF4]/12 bg-white/55 backdrop-blur-sm hover:border-[#8B3FC8]/35 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(59,108,244,0.18)] transition-all duration-300 overflow-hidden relative"
    >
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-[0.07] pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-300"
        style={{ background: accentColor }}
      />
      {service.thumbUrl && (
        <div className="relative w-full aspect-16/10 shrink-0 overflow-hidden">
          <Image
            src={service.thumbUrl}
            alt={service.thumbAlt || service.title}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: accentColor }}
          >
            <ServiceIcon
              slug={service.canonicalSlug ?? service.slug}
              sanityIcon={service.icon}
              size={22}
              strokeWidth={1.9}
            />
          </div>
          <h2 className="font-bold text-[#2B5CE6] text-[15px] leading-snug hyphens-auto font-space pt-0.5 group-hover:text-[#3B6CF4] transition-colors">
            {service.title}
          </h2>
        </div>
        {service.description ? (
          <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {service.description}
          </p>
        ) : (
          <div className="flex-1 mb-4" />
        )}
        <span className="inline-flex items-center gap-1.5 text-[#3B6CF4] font-bold text-xs mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          {learnMore}
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ServicesGrid({ categories, allServices }: Props) {
  const t = useTranslations("services");
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // null = All
  const [q, setQ] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);

  const hasCats = categories.length > 0;

  // When searching: search across ALL services regardless of active category
  const displayedServices = useMemo(() => {
    const needle = q.trim().toLowerCase();

    if (needle) {
      // Search mode: across all flat services
      const base = allServices.length > 0 ? allServices : fallbackList((k) => t(`items.${k}` as never));
      return base.filter((s) => {
        const c = s.canonicalSlug ?? s.slug;
        return (
          s.title.toLowerCase().includes(needle) ||
          s.slug.toLowerCase().includes(needle) ||
          c.toLowerCase().includes(needle) ||
          (s.description && s.description.toLowerCase().includes(needle))
        );
      });
    }

    if (!hasCats) {
      return allServices.length > 0 ? allServices : fallbackList((k) => t(`items.${k}` as never));
    }

    // Category filter mode
    if (activeCategory === null) {
      // All: flatten services from all categories
      return categories.flatMap((cat) => cat.services);
    }
    const cat = categories.find((c) => c._id === activeCategory);
    return cat?.services ?? [];
  }, [q, activeCategory, categories, allServices, hasCats, t]);

  // When search is active we show flat grid; otherwise we may show sectioned view
  const isSearching = q.trim().length > 0;
  const isAllCats = activeCategory === null && !isSearching;

  return (
    <div className="min-h-screen">
      <PageBanner
        kicker="torudeabi24.ee · Tallinn & Harjumaa"
        title={t("pageTitle")}
        subtitle={t("pageIntro")}
        breadcrumbs={[{ label: t("title") }]}
        accentColor="#8B3FC8"
      />

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-4 mb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="max-w-lg"
        >
          <label className="sr-only" htmlFor="svc-search">{t("searchLabel")}</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={17} />
            <input
              id="svc-search"
              value={q}
              onChange={(e) => { setQ(e.target.value); setActiveCategory(null); }}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl text-[#2B5CE6] placeholder:text-[#6B7280] pl-11 pr-4 py-3 text-sm font-medium bg-white/75 backdrop-blur-sm border border-[#3B6CF4]/15 focus:border-[#8B3FC8]/50 focus:outline-none transition-all shadow-sm"
            />
          </div>
        </motion.div>
      </div>

      {/* Category tabs — only show when data exists and not searching */}
      {hasCats && !isSearching && (
        <div className="sticky top-17.5 lg:top-19.5 z-30 bg-white/80 backdrop-blur-md border-b border-[#3B6CF4]/10 shadow-sm">
          <div
            ref={tabsRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2 py-3"
          >
            {/* All tab */}
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeCategory === null
                  ? "bg-[#8B3FC8] text-white shadow-md"
                  : "bg-white/60 text-[#2B5CE6] hover:bg-white/80"
              }`}
            >
              <LayoutGrid size={14} />
              {t("title")}
            </button>

            {categories.map((cat, i) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat._id
                    ? "text-white shadow-md"
                    : "bg-white/60 text-[#2B5CE6] hover:bg-white/80"
                }`}
                style={activeCategory === cat._id ? { background: ACCENT_COLORS[i % ACCENT_COLORS.length] } : {}}
              >
                <ServiceIcon
                  slug={cat.slug}
                  sanityIcon={cat.icon}
                  size={13}
                  strokeWidth={2}
                  className={activeCategory === cat._id ? "text-white" : "text-[#3B6CF4]"}
                />
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Sectioned view: "All" categories (no search, no filter) ── */}
        {isAllCats && hasCats ? (
          <div className="space-y-14">
            {categories.map((cat, catIdx) => {
              const accentColor = ACCENT_COLORS[catIdx % ACCENT_COLORS.length];
              return (
                <motion.section
                  key={cat._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                        style={{ background: accentColor, boxShadow: `0 6px 16px -4px ${accentColor}60` }}
                      >
                        <ServiceIcon slug={cat.slug} sanityIcon={cat.icon} size={20} strokeWidth={1.9} />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2B5CE6] font-space">
                          {cat.title}
                        </h2>
                        <p className="text-[#6B7280] text-xs mt-0.5">
                          {t("serviceCount", { count: cat.services.length })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveCategory(cat._id)}
                      className="hidden sm:flex items-center gap-1.5 text-[#3B6CF4] text-sm font-bold hover:underline"
                    >
                      {t("viewAllInCategory")} <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Divider line with color */}
                  <div className="h-0.5 w-full rounded-full mb-6 opacity-20" style={{ background: accentColor }} />

                  {/* Services grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {cat.services.map((svc) => (
                      <ServiceCard
                        key={svc._id}
                        service={svc}
                        accentColor={accentColor}
                        learnMore={t("learnMore")}
                      />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        ) : (
          /* ── Filtered/search view: flat grid ── */
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory ?? "search"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {displayedServices.length === 0 ? (
                <p className="text-center text-[#6B7280] py-16">{t("noResults")}</p>
              ) : (
                <>
                  {/* Category heading when filtered */}
                  {activeCategory && !isSearching && (() => {
                    const catIdx = categories.findIndex((c) => c._id === activeCategory);
                    const cat = categories[catIdx];
                    return cat ? (
                      <div className="flex items-center gap-3 mb-8">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                          style={{ background: ACCENT_COLORS[catIdx % ACCENT_COLORS.length] }}
                        >
                          <ServiceIcon slug={cat.slug} sanityIcon={cat.icon} size={20} strokeWidth={1.9} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-[#2B5CE6] font-space">{cat.title}</h2>
                      </div>
                    ) : null;
                  })()}

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {displayedServices.map((svc, i) => {
                      const catIdx = activeCategory
                        ? categories.findIndex((c) => c._id === activeCategory)
                        : i;
                      return (
                        <motion.div
                          key={svc._id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(i * 0.025, 0.35) }}
                        >
                          <ServiceCard
                            service={svc}
                            accentColor={ACCENT_COLORS[catIdx % ACCENT_COLORS.length]}
                            learnMore={t("learnMore")}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl bg-[#F0F4FF] border border-[#E8EFFE] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6"
          style={{ boxShadow: "0 4px 24px rgba(59,108,244,0.06)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)", boxShadow: "0 8px 24px -4px rgba(59,108,244,0.3)" }}
          >
            <ShieldCheck size={30} className="text-white" />
          </div>
          <p className="text-[#2B5CE6] font-semibold text-lg sm:text-xl leading-relaxed text-center sm:text-left">
            {t("guarantee")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
