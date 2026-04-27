"use client";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Star, ShieldCheck, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroSlider from "@/components/sections/HeroSlider";
import RainCanvas from "@/components/ui/RainCanvas";

export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  const rawTags = t.raw("tags");
  const tags = Array.isArray(rawTags) ? (rawTags as string[]) : [];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden min-h-[100svh]"
        style={{ background: "linear-gradient(150deg,#e8d8df 0%,#e6dae4 38%,#d8e0f5 100%)" }}
      >
        {/* ── Background layer ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">

          {/* Static teardrop tile pattern */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <symbol id="td" viewBox="0 0 12 18">
                <path d="M6 1 C6 1 1 8 1 12 A5 5 0 0 0 11 12 C11 8 6 1 6 1Z" />
              </symbol>
              <pattern id="tdpat" x="0" y="0" width="52" height="68" patternUnits="userSpaceOnUse">
                <use href="#td" x="4"  y="4"  width="12" height="18" fill="#1254B8" opacity="0.09" />
                <use href="#td" x="30" y="34" width="10" height="15" fill="#E11D48" opacity="0.06" />
                <use href="#td" x="16" y="46" width="8"  height="12" fill="#0B3D91" opacity="0.05" />
                <use href="#td" x="40" y="8"  width="7"  height="11" fill="#1254B8" opacity="0.04" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tdpat)" />
          </svg>

          {/* Real rain canvas */}
          <RainCanvas />

          {/* Glow blobs */}
          <motion.div
            animate={{ x: [0, 24, -12, 0], y: [0, -18, 12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-28 top-10 h-[480px] w-[480px] rounded-full bg-[#1254B8] opacity-[0.20] blur-[90px]"
          />
          <motion.div
            animate={{ x: [0, -18, 10, 0], y: [0, 14, -20, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-60px] top-[-40px] h-[560px] w-[560px] rounded-full bg-[#E11D48] opacity-[0.16] blur-[110px]"
          />
          <motion.div
            animate={{ x: [0, -10, 14, 0], y: [0, 10, -8, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-20 bottom-20 h-[300px] w-[300px] rounded-full bg-[#E11D48] opacity-[0.13] blur-[70px]"
          />

          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/70 to-transparent" />
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
                  style={{ background: "linear-gradient(135deg,#E11D48,#BE123C)", boxShadow: "0 8px 28px rgba(225,29,72,0.38)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {t("badge")}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#1254B8] bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-[#1254B8]/15 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_6px_#22C55E]" />
                  {t("availableNow")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-black font-space tracking-tight text-[#0D2D6A] mb-5 hyphens-auto"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)", lineHeight: 1.08 }}
              >
                {t("title")}
                <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 text-[#E11D48]">{t("titleHighlight")}</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-[0.28em] bg-[#E11D48]/14 rounded-sm origin-left -z-0"
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="text-[#2E3B5C] text-[15px] sm:text-[15.5px] leading-[1.7] max-w-lg mb-7 font-medium"
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
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white text-[#1254B8] border border-[#1254B8]/14 shadow-sm"
                  >
                    <CheckCircle2 size={12} className="text-[#E11D48] shrink-0" />
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
                      background: "linear-gradient(135deg,#E11D48,#BE123C)",
                      boxShadow: "0 16px 40px rgba(225,29,72,0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
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
                  whileHover={{ y: -4, scale: 1.02, boxShadow: "0 18px 40px rgba(18,84,184,0.22)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 font-black text-[15px] px-6 py-4 rounded-2xl bg-white text-[#0D2D6A] border border-[#1254B8]/20 shadow-md transition-all group"
                >
                  <Phone size={18} className="text-[#1254B8] group-hover:rotate-12 transition-transform" />
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
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#E11D48]/12 shadow-sm">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={13} className="fill-[#E11D48] text-[#E11D48]" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-[#0D2D6A] ml-1">5.0</span>
                </div>

                <div className="w-px h-7 bg-[#1254B8]/12 hidden sm:block" />

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#2E3B5C]">
                  <strong className="text-[#1254B8] font-black text-[15px]">500+</strong>
                  {t("statJobs")}
                </div>

                <div className="w-px h-7 bg-[#1254B8]/12 hidden sm:block" />

                <div className="flex items-center gap-1 text-[13px] font-bold text-[#2E3B5C]">
                  <Clock size={13} className="text-[#E11D48] shrink-0" />
                  <strong className="text-[#1254B8] font-black">60 min</strong>
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
              <div className="absolute -inset-4 rounded-[3rem] border border-[#E11D48]/14 -z-10" />
              <div className="absolute -inset-8 rounded-[3.6rem] border border-[#1254B8]/7 -z-10" />

              {/* Image card */}
              <div
                className="relative p-2.5 rounded-[2.4rem] bg-white/55 backdrop-blur-md border border-white/70"
                style={{ boxShadow: "0 40px 90px rgba(18,84,184,0.18), 0 8px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)" }}
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
                  style={{ boxShadow: "0 20px 50px rgba(18,84,184,0.18), 0 4px 14px rgba(0,0,0,0.07)" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#E11D48,#BE123C)", boxShadow: "0 6px 20px rgba(225,29,72,0.38)" }}
                  >
                    <Phone size={19} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="text-[9px] font-black text-[#E11D48] uppercase tracking-[0.22em] leading-none mb-1.5">
                      {t("emergencyLabel") || "KIIRABI 24/7"}
                    </p>
                    <a
                      href={`tel:${tc("phoneDial")}`}
                      className="text-[#0D2D6A] font-black text-sm hover:text-[#1254B8] transition-colors block leading-tight"
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
                  style={{ boxShadow: "0 16px 45px rgba(225,29,72,0.14), 0 4px 14px rgba(0,0,0,0.06)" }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#1254B8]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-[#1254B8]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#5A6A8A] uppercase tracking-[0.18em] leading-none mb-1">{t("certifiedLabel")}</p>
                    <p className="text-[#0D2D6A] font-black text-[12px] leading-tight">{t("yearsExp")}</p>
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
                  style={{ background: "linear-gradient(135deg,#1254B8,#0B3D91)", boxShadow: "0 12px 35px rgba(18,84,184,0.38), inset 0 1px 0 rgba(255,255,255,0.15)" }}
                >
                  <span className="font-black text-[18px] leading-none">-30%</span>
                  <span className="text-[8px] font-bold opacity-80 uppercase tracking-wider">{t("discountLabel")}</span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-[60px] sm:h-[80px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,120 L1440,120 L1440,0 C1140,80 840,80 0,0 Z" fill="#FFFFFF" />
        </svg>
      </section>
    </div>
  );
}
