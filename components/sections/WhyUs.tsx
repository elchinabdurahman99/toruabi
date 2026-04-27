"use client";
import { motion } from "framer-motion";
import { Zap, Award, Shield, DollarSign, Search, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ICON_GRADIENTS = [
  "linear-gradient(135deg, #E11D48, #BE123C)",
  "linear-gradient(135deg, #1254B8, #0B3D91)",
  "linear-gradient(135deg, #E11D48, #1254B8)",
  "linear-gradient(135deg, #1254B8, #E11D48)",
  "linear-gradient(135deg, #BE123C, #E11D48)",
  "linear-gradient(135deg, #0B3D91, #1254B8)",
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
    <section id="why" className="py-28 relative overflow-hidden" style={{ background: "#06060A" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #1254B8 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5 border border-[#E11D48]/20"
            style={{ background: "rgba(225,29,72,0.1)", color: "#E11D48" }}
          >
            {t("title")}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-white font-space">
              {t("title")}
            </h2>
            <p className="text-[#94A3B8] max-w-xs leading-relaxed lg:text-right">
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
              className="rounded-3xl p-7 border border-white/8 hover:border-white/16 transition-all duration-300 group relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ background: `linear-gradient(135deg, rgba(225,29,72,0.05) 0%, rgba(18,84,184,0.05) 100%)` }} />
              <span className="absolute top-4 right-5 text-7xl font-extrabold text-white/3 group-hover:text-white/6 transition-colors select-none font-space">
                {r.num}
              </span>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300"
                style={{ background: ICON_GRADIENTS[i], boxShadow: `0 8px 24px ${i % 2 === 0 ? "rgba(225,29,72,0.3)" : "rgba(18,84,184,0.3)"}` }}
              >
                <r.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 relative z-10 font-space">{t(`items.${r.titleKey}`)}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed relative z-10">{t(`items.${r.titleKey}Desc`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/8"
          style={{
            background: "linear-gradient(135deg, rgba(225,29,72,0.08) 0%, rgba(18,84,184,0.08) 100%)",
          }}
        >
          <div>
            <h3 className="font-bold text-white text-2xl mb-2 font-space">{t("title")}</h3>
            <p className="text-[#94A3B8]">{t("subtitle")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${tc("phoneDial")}`}
              className="flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #E11D48, #BE123C)", boxShadow: "0 8px 24px rgba(225,29,72,0.3)" }}
            >
              📞 {tc("callUs")}
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-2xl border border-white/12 hover:border-[#1254B8]/40 transition-all"
              style={{ background: "rgba(18,84,184,0.15)" }}
            >
              {t("title")} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
