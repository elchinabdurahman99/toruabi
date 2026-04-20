"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { ALL_SERVICE_SLUGS, slugToMessageKey } from "@/lib/serviceSlugs";

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

function fallbackList(tItem: (itemKey: string) => string): Service[] {
  return ALL_SERVICE_SLUGS.map((slug, i) => {
    const key = slugToMessageKey[slug];
    return { _id: slug, slug, title: key ? tItem(key) : slug, description: "", order: i };
  });
}

const ICON_COLORS = ["#CC1414", "#0D1B3E", "#1565C0", "#CC1414", "#0D1B3E", "#1565C0"] as const;

export default function ServicesGrid({ services }: { services: Service[] | null }) {
  const t = useTranslations("services");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const base = services && services.length > 0 ? services : fallbackList((k) => t(`items.${k}` as never));
    const needle = q.trim().toLowerCase();
    if (!needle) return base;
    return base.filter((s) => {
      const c = s.canonicalSlug ?? s.slug;
      return (
        s.title.toLowerCase().includes(needle) ||
        s.slug.toLowerCase().includes(needle) ||
        c.toLowerCase().includes(needle) ||
        (s.description && s.description.toLowerCase().includes(needle))
      );
    });
  }, [services, q, t]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#F5F6FA] border-b border-[#E2E5EF]">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[#CC1414] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              torudeabi.ee · Tallinn & Harjumaa
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] max-w-3xl text-[#0D1B3E] font-space">
              {t("title")}
            </h1>
            <p className="text-[#6B7280] text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-8 max-w-lg"
          >
            <label className="sr-only" htmlFor="svc-search">{t("searchLabel")}</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={17} />
              <input
                id="svc-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-xl text-[#0D1B3E] placeholder:text-[#9CA3AF] pl-11 pr-4 py-3 text-sm font-medium bg-white border border-[#E2E5EF] focus:border-[#CC1414]/50 focus:outline-none transition-all shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {list.length === 0 ? (
          <p className="text-center text-[#9CA3AF] py-16">{t("noResults")}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {list.map((service, i) => {
              const color = ICON_COLORS[i % ICON_COLORS.length];
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.025, 0.4) }}
                >
                  <Link
                    href={internalPathToLinkHref(`/services/${service.slug}`)}
                    className="group flex flex-col h-full rounded-[2rem] border border-[#E2E5EF] bg-white hover:border-transparent hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px -10px ${color}25`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                      (e.currentTarget as HTMLElement).style.borderColor = "#E2E5EF";
                    }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none rounded-bl-full transition-colors duration-500" style={{ background: color }} />
                    {service.thumbUrl && (
                      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden">
                        <Image
                          src={service.thumbUrl}
                          alt={service.thumbAlt || service.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform"
                          style={{ background: color }}
                        >
                          <ServiceIcon slug={service.canonicalSlug ?? service.slug} sanityIcon={service.icon} size={24} strokeWidth={1.9} />
                        </div>
                        <h2 className="font-bold text-[#0D1B3E] text-base leading-snug hyphens-auto font-space pt-0.5 group-hover:text-[#CC1414] transition-colors">
                          {service.title}
                        </h2>
                      </div>
                      {service.description ? (
                        <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{service.description}</p>
                      ) : (
                        <div className="flex-1 mb-4" />
                      )}
                      <span className="inline-flex items-center gap-1 text-[#CC1414] font-bold text-xs mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        {t("learnMore")}
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl bg-[#F5F6FA] border-2 border-[#E2E5EF] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 shadow-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#CC1414] flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck size={30} className="text-white" />
          </div>
          <p className="text-[#0D1B3E] font-semibold text-lg sm:text-xl leading-relaxed text-center sm:text-left">
            {t("guarantee")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
