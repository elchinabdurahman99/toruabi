"use client";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroSlider from "@/components/sections/HeroSlider";

const STATS = [
  { value: "500+", labelKey: "statJobs" },
  { value: "15+", labelKey: "statYears" },
  { value: "24/7", labelKey: "statAvail" },
  { value: "5★", labelKey: "statRating" },
] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  const rawTags = t.raw("tags");
  const tags = Array.isArray(rawTags) ? (rawTags as string[]) : [];

  return (
    <div className="bg-white">
      {/* Main hero */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-brand-dots opacity-50 pointer-events-none" />
        {/* Red left accent stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#CC1414] hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: Content */}
            <div className="lg:col-span-6 xl:col-span-5">

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-5 border border-[#CC1414]/25 bg-red-50 text-[#CC1414]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#CC1414] animate-pulse" />
                {t("badge")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[1.9rem] leading-[1.08] sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-[#0D1B3E] mb-5 font-space hyphens-auto"
              >
                {t("title")}
                <br />
                <span className="relative inline-block text-[#CC1414]">
                  {t("titleHighlight")}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#CC1414]/25 rounded-full" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-lg mb-6"
              >
                {t("subtitle")}
              </motion.p>

              {/* Feature tags with checkmarks */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-7"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full bg-[#F5F6FA] text-[#374151] border border-[#E2E5EF]"
                  >
                    <CheckCircle2 size={13} className="text-[#CC1414] shrink-0" />
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <a
                  href={`tel:${tc("phoneDial")}`}
                  className="flex items-center justify-center gap-2.5 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: "#CC1414", boxShadow: "0 4px 20px rgba(204,20,20,0.28)" }}
                >
                  <Phone size={17} />
                  {t("ctaSecondary")}
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 border-2 border-[#0D1B3E] text-[#0D1B3E] hover:bg-[#0D1B3E] hover:text-white group"
                >
                  {t("cta")}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={15} className="fill-[#CC1414] text-[#CC1414]" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-[#0D1B3E]">5.0</span>
                </div>
                <span className="w-px h-4 bg-[#E2E5EF]" />
                <span className="text-sm text-[#6B7280]">
                  <strong className="text-[#0D1B3E]">500+</strong> klienti
                </span>
                <span className="w-px h-4 bg-[#E2E5EF]" />
                <span className="text-sm text-[#6B7280]">
                  <strong className="text-[#0D1B3E]">15+</strong> a. kogemust
                </span>
              </motion.div>
            </div>

            {/* RIGHT: Slider with emergency card overlay */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 xl:col-span-7 relative"
            >
              <HeroSlider />

              {/* Emergency floating card */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="absolute -bottom-4 left-4 sm:left-6 sm:bottom-6 bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 z-20"
                style={{ boxShadow: "0 8px 32px rgba(13,27,62,0.15)", border: "1px solid #E2E5EF" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#CC1414" }}
                >
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider leading-none mb-1">
                    {t("emergencyLabel") || "Kiirabi 24/7"}
                  </p>
                  <a
                    href={`tel:${tc("phoneDial")}`}
                    className="text-[#0D1B3E] font-extrabold text-[13px] leading-tight hover:text-[#CC1414] transition-colors"
                  >
                    {tc("phone")}
                  </a>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats bar — light theme */}
      <div className="bg-[#F5F6FA] border-y border-[#E2E5EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2E5EF]">
            {STATS.map(({ value, labelKey }) => (
              <div key={value} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0D1B3E] font-space mb-1">
                  {value}
                </span>
                <span className="text-[#6B7280] text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {(() => {
                    try { return t(labelKey as any); } catch { return labelKey; }
                  })()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
