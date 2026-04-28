"use client";
import { motion } from "framer-motion";
import { Zap, Award, Shield, DollarSign, Search, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ICON_GRADIENTS = [
  "linear-gradient(135deg, #3B6CF4, #2B5CE6)",
  "linear-gradient(135deg, #E8354A, #C8283C)",
  "linear-gradient(135deg, #8B3FC8, #6F2FA8)",
  "linear-gradient(135deg, #E8354A, #8B3FC8)",
  "linear-gradient(135deg, #3B6CF4, #8B3FC8)",
  "linear-gradient(135deg, #8B3FC8, #E8354A)",
];

const CARD_BORDERS = [
  "rgba(59,108,244,0.18)",
  "rgba(232,53,74,0.18)",
  "rgba(139,63,200,0.18)",
  "rgba(232,53,74,0.15)",
  "rgba(59,108,244,0.15)",
  "rgba(139,63,200,0.18)",
];

const ICON_SHADOWS = [
  "rgba(59,108,244,0.28)",
  "rgba(232,53,74,0.28)",
  "rgba(139,63,200,0.28)",
  "rgba(232,53,74,0.25)",
  "rgba(59,108,244,0.25)",
  "rgba(139,63,200,0.28)",
];

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const tc = useTranslations("common");

  const reasons = [
    { icon: Zap, titleKey: "experience", num: "01" },
    { icon: Award, titleKey: "certified", num: "02" },
    { icon: Shield, titleKey: "guarantee", num: "03" },
    { icon: DollarSign, titleKey: "pricing", num: "04" },
    { icon: Search, titleKey: "emergency", num: "05" },
    { icon: ThumbsUp, titleKey: "quality", num: "06" },
  ];

  return (
    <section id="why" className="py-28 relative overflow-hidden">
      {/* Subtle ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.10] blur-[90px]"
          style={{ background: "#8B3FC8" }} />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.08] blur-[80px]"
          style={{ background: "#3B6CF4" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5 border border-[#8B3FC8]/20"
            style={{ background: "rgba(139,63,200,0.08)", color: "#8B3FC8" }}
          >
            {t("title")}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#1a2a6c] font-space">
              {t("title")}
            </h2>
            <p className="text-[#5A5955] max-w-xs leading-relaxed lg:text-right">
              {t("subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-7 border transition-all duration-300 group relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.55)",
                borderColor: CARD_BORDERS[i],
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ background: `linear-gradient(135deg, rgba(139,63,200,0.04) 0%, rgba(59,108,244,0.04) 100%)` }} />
              <span className="absolute top-4 right-5 text-7xl font-extrabold text-[#1a2a6c]/[0.04] group-hover:text-[#1a2a6c]/[0.07] transition-colors select-none font-space">
                {r.num}
              </span>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300"
                style={{ background: ICON_GRADIENTS[i], boxShadow: `0 8px 24px ${ICON_SHADOWS[i]}` }}
              >
                <r.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-[#1a2a6c] text-lg mb-2 relative z-10 font-space">{t(`items.${r.titleKey}`)}</h3>
              <p className="text-[#5A5955] text-sm leading-relaxed relative z-10">{t(`items.${r.titleKey}Desc`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#8B3FC8]/20"
          style={{
            background: "linear-gradient(135deg, rgba(59,108,244,0.06) 0%, rgba(139,63,200,0.08) 60%, rgba(232,53,74,0.05) 100%)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h3 className="font-bold text-[#1a2a6c] text-2xl mb-2 font-space">{t("title")}</h3>
            <p className="text-[#5A5955]">{t("subtitle")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${tc("phoneDial")}`}
              className="flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #E8354A, #C8283C)", boxShadow: "0 8px 24px rgba(232,53,74,0.28)" }}
            >
              📞 {tc("callUs")}
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 font-bold px-6 py-3.5 rounded-2xl border border-[#8B3FC8]/25 transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(139,63,200,0.08)", color: "#8B3FC8" }}
            >
              {t("title")} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
