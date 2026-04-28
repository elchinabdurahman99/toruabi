"use client";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Star, ShieldCheck, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroSlider from "@/components/sections/HeroSlider";

export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  const rawTags = t.raw("tags");
  const tags = Array.isArray(rawTags) ? (rawTags as string[]) : [];

  return (
    <div>
      <section className="relative overflow-hidden min-h-[100svh]">
        {/* ── Background layer ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">

          {/* Subtle mesh grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
            <defs>
              <pattern id="mesh" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0L0 0 0 48" fill="none" stroke="#3B6CF4" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>

          {/* Glow blob — Blue (top-left) */}
          <motion.div
            animate={{ x: [0, 24, -12, 0], y: [0, -18, 12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-28 top-10 h-[480px] w-[480px] rounded-full opacity-[0.22] blur-[100px]"
            style={{ background: "#3B6CF4" }}
          />
          {/* Glow blob — Red (top-right) */}
          <motion.div
            animate={{ x: [0, -18, 10, 0], y: [0, 14, -20, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-60px] top-[-40px] h-[500px] w-[500px] rounded-full opacity-[0.16] blur-[110px]"
            style={{ background: "#E8354A" }}
          />
          {/* Glow blob — Purple (bottom-center) */}
          <motion.div
            animate={{ x: [0, -10, 14, 0], y: [0, 10, -8, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 bottom-10 h-[340px] w-[340px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[80px]"
            style={{ background: "#8B3FC8" }}
          />

        </div>

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center min-h-[100svh] pt-24 pb-28 lg:pt-28 lg:pb-20">

            {/* LEFT */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.45 }}
                className="inline-flex items-center gap-2 self-start mb-6"
              >
                <span
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] px-4 py-2 rounded-full text-white"
                  style={{ background: "linear-gradient(135deg,#E8354A,#C8283C)", boxShadow: "0 8px 28px rgba(232,53,74,0.38)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {t("badge")}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#3B6CF4] bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-[#3B6CF4]/15 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_6px_#22C55E]" />
                  {t("availableNow")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-black font-space tracking-tight text-[#1a2a6c] mb-5 hyphens-auto"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)", lineHeight: 1.08 }}
              >
                {t("title")}
                <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 text-[#E8354A]">{t("titleHighlight")}</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-[0.28em] bg-[#E8354A]/14 rounded-sm origin-left -z-0"
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="text-[#2E3B6C] text-[15px] sm:text-[15.5px] leading-[1.7] max-w-lg mb-7 font-medium"
              >
                {t("subtitle")}
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.28 + i * 0.06 }}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white text-[#3B6CF4] border border-[#3B6CF4]/14 shadow-sm"
                  >
                    <CheckCircle2 size={12} className="text-[#E8354A] shrink-0" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3 mb-9"
              >
                {/* Primary – red */}
                <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="relative flex items-center justify-center gap-2.5 font-black text-[15px] px-7 py-4 rounded-2xl text-white overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg,#E8354A,#C8283C)",
                      boxShadow: "0 16px 40px rgba(232,53,74,0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-150%", "250%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                    />
                    {t("cta")}
                    <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>

                {/* Secondary – white/navy */}
                <motion.a
                  href={`tel:${tc("phoneDial")}`}
                  whileHover={{ y: -4, scale: 1.02, boxShadow: "0 18px 40px rgba(59,108,244,0.22)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 font-black text-[15px] px-6 py-4 rounded-2xl bg-white text-[#1a2a6c] border border-[#3B6CF4]/20 shadow-md transition-all group"
                >
                  <Phone size={18} className="text-[#3B6CF4] group-hover:rotate-12 transition-transform" />
                  {t("ctaSecondary")}
                </motion.a>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-3"
              >
                {/* Stars */}
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#E8354A]/12 shadow-sm">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={13} className="fill-[#E8354A] text-[#E8354A]" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-[#1a2a6c] ml-1">5.0</span>
                </div>

                <div className="w-px h-7 bg-[#3B6CF4]/12 hidden sm:block" />

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#2E3B6C]">
                  <strong className="text-[#3B6CF4] font-black text-[15px]">500+</strong>
                  {t("statJobs")}
                </div>

                <div className="w-px h-7 bg-[#3B6CF4]/12 hidden sm:block" />

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#2E3B6C]">
                  <Clock size={13} className="text-[#E8354A] shrink-0" />
                  <strong className="text-[#3B6CF4] font-black">60 min</strong>
                  {t("statResponse")}
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 36, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.14, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 xl:col-span-7 relative mt-10 lg:mt-0"
            >
              {/* Outer decorative rings */}
              <div className="absolute -inset-4 rounded-[3rem] border border-[#E8354A]/14 -z-10" />
              <div className="absolute -inset-8 rounded-[3.6rem] border border-[#3B6CF4]/7 -z-10" />

              {/* Image card */}
              <div
                className="relative p-2.5 rounded-[2.4rem] bg-white/55 backdrop-blur-md border border-white/70"
                style={{ boxShadow: "0 40px 90px rgba(59,108,244,0.18), 0 8px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)" }}
              >
                <HeroSlider />
              </div>

              {/* ── Float: Emergency ── */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.72, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-5 left-4 sm:left-10 sm:bottom-9 z-20"
              >
                <div
                  className="flex items-center gap-3.5 bg-white/96 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-white"
                  style={{ boxShadow: "0 20px 50px rgba(59,108,244,0.18), 0 4px 14px rgba(0,0,0,0.07)" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#E8354A,#C8283C)", boxShadow: "0 6px 20px rgba(232,53,74,0.38)" }}
                  >
                    <Phone size={19} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="text-[9px] font-black text-[#E8354A] uppercase tracking-[0.22em] leading-none mb-1.5">
                      {t("emergencyLabel") || "KIIRABI 24/7"}
                    </p>
                    <a
                      href={`tel:${tc("phoneDial")}`}
                      className="text-[#1a2a6c] font-black text-sm hover:text-[#3B6CF4] transition-colors block leading-tight"
                    >
                      {tc("phone")}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* ── Float: Certified ── */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.82, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-5 right-4 sm:right-8 z-20"
              >
                <div
                  className="flex items-center gap-3 bg-white/96 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white"
                  style={{ boxShadow: "0 16px 45px rgba(232,53,74,0.14), 0 4px 14px rgba(0,0,0,0.06)" }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#3B6CF4]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-[#3B6CF4]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#5A6A8A] uppercase tracking-[0.18em] leading-none mb-1">{t("certifiedLabel")}</p>
                    <p className="text-[#1a2a6c] font-black text-[12px] leading-tight">{t("yearsExp")}</p>
                  </div>
                </div>
              </motion.div>

              {/* ── Float: Discount ── */}
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 z-20 hidden sm:block"
              >
                <div
                  className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg,#8B3FC8,#6F2FA8)", boxShadow: "0 12px 35px rgba(139,63,200,0.38), inset 0 1px 0 rgba(255,255,255,0.15)" }}
                >
                  <span className="font-black text-[18px] leading-none">-30%</span>
                  <span className="text-[8px] font-bold opacity-80 uppercase tracking-wider">{t("discountLabel")}</span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

      </section>
    </div>
  );
}
