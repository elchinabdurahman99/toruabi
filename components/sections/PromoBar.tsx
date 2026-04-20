"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Tag, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PromoBar() {
  const t = useTranslations("promoBar");
  const th = useTranslations("hero");
  const tc = useTranslations("common");

  return (
    <section className="relative z-10 border-y border-white/6" style={{ background: "#0D0D18" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 flex items-center gap-4 border border-white/8 hover:border-[#EF4444]/30 transition-all duration-300 group"
            style={{ background: "rgba(239,68,68,0.06)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 8px 24px rgba(239,68,68,0.3)" }}
            >
              <Tag className="text-white" size={26} strokeWidth={2.25} />
            </div>
            <div>
              <p
                className="text-3xl font-extrabold tracking-tight font-space"
                style={{
                  background: "linear-gradient(135deg, #EF4444, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {th("stats.discount")}
              </p>
              <p className="text-white font-bold text-sm mt-0.5">{th("stats.discountLabel")}</p>
              <p className="text-[#94A3B8] text-sm mt-1.5 leading-snug">{t("discountHint")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-2xl p-6 flex items-center gap-4 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300 group"
            style={{ background: "rgba(59,130,246,0.06)", boxShadow: "0 0 30px rgba(59,130,246,0.08)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl group-hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", boxShadow: "0 8px 24px rgba(59,130,246,0.3)" }}
              aria-hidden
            >
              <Zap size={24} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white text-base">{t("emergencyTitle")}</p>
              <p className="text-[#94A3B8] text-sm mt-1">{tc("phone")} · {tc("phone2")}</p>
              <a
                href={`tel:${tc("phoneDial")}`}
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-[#3B82F6] hover:text-blue-400 transition-colors"
              >
                <Phone size={15} className="shrink-0" />
                {th("ctaSecondary")}
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
