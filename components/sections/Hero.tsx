"use client";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroSlider from "@/components/sections/HeroSlider";

export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  const rawTags = t.raw("tags");
  const tags = Array.isArray(rawTags) ? (rawTags as string[]) : [];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#F6F8FF] min-h-[100svh]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(140%_100%_at_8%_12%,rgba(18,84,184,0.18),transparent_44%),radial-gradient(100%_80%_at_88%_18%,rgba(232,119,34,0.15),transparent_42%),linear-gradient(160deg,#f8fbff_0%,#f3f8ff_46%,#eff6ff_100%)]" />
          
          {/* Subtle Grid/Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.06]" 
               style={{ backgroundImage: `radial-gradient(#1254B8 0.8px, transparent 0.8px)`, backgroundSize: '28px 28px' }} 
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute -left-28 top-4 h-[460px] w-[460px] rounded-full border border-[#1254B8]/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            className="absolute right-[-140px] top-[-70px] h-[520px] w-[520px] rounded-full border border-[#E87722]/10"
          />
          
          <motion.div
            animate={{ x: [0, 15, -10, 0], y: [0, -12, 8, 0], scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 top-20 h-72 w-72 rounded-[46%] bg-[linear-gradient(145deg,#1254B8,#3A7CE2)] opacity-20 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 10, 0], y: [0, 10, -14, 0], scale: [1, 1.04, 0.96, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-6 top-16 h-80 w-80 rounded-[40%] bg-[linear-gradient(145deg,#E87722,#1254B8)] opacity-18 blur-3xl"
          />
          
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),rgba(255,255,255,0.1)_40%,rgba(255,255,255,0.4))]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[100svh] flex items-center pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 xl:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.23em] px-3 py-1.5 rounded-full mb-4 border border-[#2E3B5C]/15 bg-white text-[#1254B8] shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] animate-pulse shadow-[0_0_8px_#E87722]" />
                {t("badge")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="text-[1.78rem] leading-[0.98] sm:text-[2.2rem] lg:text-[2.7rem] xl:text-[3rem] font-black text-[#0D2D6A] mb-4 font-space hyphens-auto tracking-tight"
              >
                {t("title")}
                <br />
                <span className="inline-block text-[#E87722] relative">
                  {t("titleHighlight")}
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#E87722]/15 rounded-full origin-left -z-10"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-[#2E3B5C] text-[15px] sm:text-base leading-relaxed max-w-xl mb-6 font-medium"
              >
                {t("subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="flex items-center gap-1.5 mb-7 overflow-x-auto no-scrollbar pb-1"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-lg bg-white text-[#1254B8] border border-[#1254B8]/15 shadow-sm whitespace-nowrap"
                  >
                    <CheckCircle2 size={13} className="text-[#E87722] shrink-0" />
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <motion.a
                  href={`tel:${tc("phoneDial")}`}
                  whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 40px rgba(18,84,184,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 text-white font-black text-[15px] px-6 py-3.5 rounded-xl transition-all relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #1254B8, #0B3D91)",
                    boxShadow: "0 12px 30px rgba(18,84,184,0.25)",
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <Phone size={19} className="group-hover:rotate-12 transition-transform" />
                  {t("ctaSecondary")}
                </motion.a>
                
                <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 font-black text-base px-8 py-4 rounded-2xl transition-all border-2 border-[#E87722] text-white group bg-[#E87722] shadow-[0_12px_30px_rgba(232,119,34,0.25)] hover:shadow-[0_20px_40px_rgba(232,119,34,0.35)]"
                  >
                    {t("cta")}
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-4 flex-wrap rounded-xl bg-white/70 backdrop-blur-md px-4 py-3 border border-[#1254B8]/15 shadow-[0_12px_40px_rgba(18,84,184,0.12)] max-w-fit"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={15} className="fill-[#E87722] text-[#E87722]" />
                  ))}
                  <span className="ml-2 text-sm font-black text-[#0D2D6A]">5.0</span>
                </div>
                <span className="w-px h-5 bg-[#1254B8]/20" />
                <span className="text-[13px] text-[#0D2D6A] font-bold">
                  <strong className="text-[#1254B8] font-black">500+</strong> klienti
                </span>
                <span className="w-px h-5 bg-[#1254B8]/20" />
                <span className="text-[13px] text-[#0D2D6A] font-bold">
                  <strong className="text-[#1254B8] font-black">15+</strong> a. kogemust
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 xl:col-span-7 relative"
            >
              <div className="relative rounded-[2.5rem] p-2.5 border border-[#1254B8]/12 bg-white shadow-[0_30px_70px_rgba(18,84,184,0.18)]">
                <div className="absolute -inset-3 rounded-[2.8rem] border border-[#E87722]/20 -z-10 bg-gradient-to-br from-[#E87722]/5 to-transparent" />
                <HeroSlider />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 left-6 sm:left-12 sm:bottom-10 bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 flex items-center gap-4 z-20 border border-[#1254B8]/15 shadow-[0_20px_50px_rgba(18,84,184,0.22)]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #E87722, #C5651A)" }}
                >
                  <Phone size={20} className="text-white animate-bounce" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[#E87722] uppercase tracking-[0.2em] leading-none mb-1.5">
                    {t("emergencyLabel") || "KIIRABI 24/7"}
                  </p>
                  <a
                    href={`tel:${tc("phoneDial")}`}
                    className="text-[#0D2D6A] font-black text-sm leading-tight hover:text-[#1254B8] transition-colors block"
                  >
                    {tc("phone")}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-[60px] sm:h-[80px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,120 L1440,120 L1440,0 C1140,80 840,80 0,0 Z"
            fill="#FFFFFF"
          />
        </svg>
      </section>
    </div>
  );
}
