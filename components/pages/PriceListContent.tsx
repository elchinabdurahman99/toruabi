"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";

interface PricingCategory {
  _id: string;
  title: string;
  items?: {
    name: string;
    price: string;
    unit?: string;
  }[];
}

const PRESSURE_FLUSH_KEYWORDS = ["flushing under pressure", "sewerage flushing", "pressure flush", "survepesu", "под давлением"];

function isPressureFlushing(name: string): boolean {
  const lower = name.toLowerCase();
  return PRESSURE_FLUSH_KEYWORDS.some((kw) => lower.includes(kw));
}

export default function PriceListContent({ pricing }: { pricing: PricingCategory[] }) {
  const t = useTranslations("priceList");
  const tc = useTranslations("common");

  const notes = t.raw("notes") as string[];

  return (
    <>
      <PageBanner
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("intro")}
        breadcrumbs={[{ label: t("title") }]}
      />

      <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="bg-white/55 backdrop-blur-sm rounded-3xl p-8 border border-[#3B6CF4]/12 mb-8">
        <h2 className="font-extrabold text-[#2B5CE6] text-lg mb-4">{t("notesTitle")}</h2>
        <ul className="space-y-3 mb-8">
          {notes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[#5A5955] font-medium leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B6CF4] mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-[#8B3FC8]/15 bg-white/50 backdrop-blur-sm p-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#9C9B96] mb-2">{t("discountLabel")}</p>
            <p className="text-[#2B5CE6] font-bold">{t("discountHours")}</p>
          </div>
          <div className="rounded-2xl border border-[#8B3FC8]/15 bg-white/50 backdrop-blur-sm p-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#9C9B96] mb-2">{t("nightLabel")}</p>
            <p className="text-[#2B5CE6] font-bold">{t("nightSurcharge")}</p>
          </div>
        </div>

        <p className="text-[#5A5955] font-medium leading-relaxed mb-4">{t("transportTallinn")}</p>
        <p className="text-[#5A5955] font-medium leading-relaxed mb-4">{t("parking")}</p>
        <p className="text-[#5A5955] font-medium leading-relaxed mb-6">{t("hourlyOnePerson")}</p>

        <div className="rounded-2xl border border-[#3B6CF4]/15 bg-white/50 backdrop-blur-sm p-6 mb-6">
          <p className="text-[#2B5CE6] font-extrabold mb-2">{t("qualityTitle")}</p>
          <p className="text-[#3B6CF4]/80 font-medium leading-relaxed">{t("qualityBody")}</p>
        </div>

        <p className="text-[#2B5CE6] font-bold mb-2">{t("warrantyNb")}</p>
        <p className="text-[#5A5955] font-medium mb-6">{t("taxNote")}</p>

        <p className="text-[#2B5CE6] font-extrabold">{t("callIntro")}</p>
      </div>

      {pricing && pricing.length > 0 && (
        <div className="space-y-8 mb-12">
          {pricing.map((category, i) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/55 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#3B6CF4]/12 hover:shadow-md transition-shadow"
            >
              <div className="bg-white/40 border-b border-[#8B3FC8]/12 px-6 py-4">
                <h3 className="font-extrabold text-[#2B5CE6] text-lg">{category.title}</h3>
              </div>
              {category.items && (
                <div className="divide-y divide-[#3B6CF4]/08">
                  {category.items.map((item, j) => (
                    <div key={j} className="px-6 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 hover:bg-white/40 transition-colors">
                      <span className="text-[#374151] font-medium min-w-0 flex-1 [overflow-wrap:anywhere] break-words hyphens-auto">
                        {item.name}
                      </span>
                      <div className="text-left sm:text-right shrink-0 max-w-full sm:max-w-[45%]">
                        <span className="font-extrabold text-[#2B5CE6]">{item.price}</span>
                        {isPressureFlushing(item.name) && (
                          <span className="text-[#5A5955] text-sm ml-1">({t("pressureFlushingVehicle")})</span>
                        )}
                        {item.unit && item.unit !== "—" && (
                          <span className="text-[#5A5955] text-sm ml-1">/ {item.unit}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#8B3FC8]/20 bg-white/50 backdrop-blur-sm mt-12">
        <div>
          <p className="text-[#2B5CE6] font-extrabold text-xl mb-1">{tc("email")}</p>
          <p className="text-[#5A5955] font-medium">{tc("phone")} | {tc("phone2")}</p>
        </div>
        <a
          href={`tel:${tc("phoneDial")}`}
          className="flex items-center gap-2 text-white font-extrabold px-6 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #E8354A, #C8283C)", boxShadow: "0 8px 24px rgba(232,53,74,0.3)" }}
        >
          <Phone size={16} /> {tc("callUs")}
        </a>
      </div>
      </div>
    </>
  );
}
