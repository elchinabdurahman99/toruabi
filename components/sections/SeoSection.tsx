"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SeoSection() {
  const t = useTranslations("seo");
  const ts = useTranslations("services");

  const keywords = [
    { labelKey: "plumbing", tag: "24/7", hot: true },
    { labelKey: "electrical", tag: "Certified" },
    { labelKey: "bathroomRepair", tag: "Full refits" },
    { labelKey: "cleaning", tag: "Deep clean" },
    { labelKey: "pipeRepair", tag: "Emergency", hot: true },
    { labelKey: "boilerInstallation", tag: "Same day" },
    { labelKey: "roofing", tag: "Certified" },
    { labelKey: "constructionWorks", tag: "Design & build" },
    { labelKey: "blockageClearing", tag: "Fast" },
    { labelKey: "apartmentRepair", tag: "Custom" },
    { labelKey: "floorHeating", tag: "Install" },
    { labelKey: "waterMeter", tag: "Local", hot: true },
  ];

  return (
    <section className="py-20 bg-[#F0F4FF] border-y border-[#E8EFFE]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#E11D48]" />
            <div className="inline-flex items-center gap-2 bg-[#1254B8] text-white text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm">
              {t("title")}
            </div>
            <span className="w-8 h-0.5 bg-[#E11D48]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B3D91] mb-3 font-space tracking-tight">
            {t("title")}
          </h2>
          <p className="text-[#5A5955] font-medium max-w-lg mx-auto leading-relaxed">{t("content")}</p>
        </motion.div>
        <div className="flex flex-wrap gap-3 justify-center">
          {keywords.map((kw, i) => (
            <motion.div
              key={kw.labelKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all duration-200 ${
                  kw.hot ? "bg-[#E11D48] border-[#E11D48] text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg" : "bg-white border-[#E8EFFE] text-[#374151] hover:border-[#1254B8]/40 hover:text-[#1254B8] shadow-sm"
                }`}
              >
                {kw.hot && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                {ts(`items.${kw.labelKey}`)}
                <span className={`text-xs font-medium ${kw.hot ? "text-white/80" : "text-[#9CA3B8]"}`}>· {kw.tag}</span>
                <ArrowUpRight size={12} className={`opacity-0 group-hover:opacity-60 transition-opacity ${kw.hot ? "" : "text-[#1254B8]"}`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
