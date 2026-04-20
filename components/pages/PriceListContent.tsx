"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EF4444] text-white text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5">
          {t("kicker")}
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0D1B3E] mb-4" style={{ letterSpacing: "-0.03em" }}>
          {t("title")}
        </h1>
        <p className="text-[#6B7280] font-medium text-lg leading-relaxed max-w-3xl mb-2">{t("intro")}</p>
      </motion.div>

      <div className="bg-white rounded-3xl p-8 border border-[#E2E5EF] mb-8 shadow-sm">
        <h2 className="font-extrabold text-[#0D1B3E] text-lg mb-4">{t("notesTitle")}</h2>
        <ul className="space-y-3 mb-8">
          {notes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[#6B7280] font-medium leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-[#E2E5EF] bg-[#F5F6FA] p-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#9CA3AF] mb-2">{t("discountLabel")}</p>
            <p className="text-[#0D1B3E] font-bold">{t("discountHours")}</p>
          </div>
          <div className="rounded-2xl border border-[#E2E5EF] bg-[#F5F6FA] p-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#9CA3AF] mb-2">{t("nightLabel")}</p>
            <p className="text-[#0D1B3E] font-bold">{t("nightSurcharge")}</p>
          </div>
        </div>

        <p className="text-[#6B7280] font-medium leading-relaxed mb-4">{t("transportTallinn")}</p>
        <p className="text-[#6B7280] font-medium leading-relaxed mb-4">{t("parking")}</p>
        <p className="text-[#6B7280] font-medium leading-relaxed mb-6">{t("hourlyOnePerson")}</p>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mb-6">
          <p className="text-[#CC1414] font-extrabold mb-2">{t("qualityTitle")}</p>
          <p className="text-[#CC1414]/80 font-medium leading-relaxed">{t("qualityBody")}</p>
        </div>

        <p className="text-[#0D1B3E] font-bold mb-2">{t("warrantyNb")}</p>
        <p className="text-[#6B7280] font-medium mb-6">{t("taxNote")}</p>

        <p className="text-[#0D1B3E] font-extrabold">{t("callIntro")}</p>
      </div>

      {pricing && pricing.length > 0 && (
        <div className="space-y-8 mb-12">
          {pricing.map((category, i) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#E2E5EF] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-[#F5F6FA] border-b border-[#E2E5EF] px-6 py-4">
                <h3 className="font-extrabold text-[#0D1B3E] text-lg">{category.title}</h3>
              </div>
              {category.items && (
                <div className="divide-y divide-[#E8E6E1]">
                  {category.items.map((item, j) => (
                    <div key={j} className="px-6 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 hover:bg-gray-50/50 transition-colors">
                      <span className="text-[#374151] font-medium min-w-0 flex-1 [overflow-wrap:anywhere] break-words hyphens-auto">
                        {item.name}
                      </span>
                      <div className="text-left sm:text-right shrink-0 max-w-full sm:max-w-[45%]">
                        <span className="font-extrabold text-[#0D1B3E]">{item.price}</span>
                        {isPressureFlushing(item.name) && (
                          <span className="text-[#6B7280] text-sm ml-1">({t("pressureFlushingVehicle")})</span>
                        )}
                        {item.unit && item.unit !== "—" && (
                          <span className="text-[#6B7280] text-sm ml-1">/ {item.unit}</span>
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

      <div className="rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#E2E5EF] bg-[#F5F6FA] mt-12 shadow-sm">
        <div>
          <p className="text-[#0D1B3E] font-extrabold text-xl mb-1">{tc("email")}</p>
          <p className="text-[#6B7280] font-medium">{tc("phone")} | {tc("phone2")}</p>
        </div>
        <a
          href={`tel:${tc("phoneDial")}`}
          className="flex items-center gap-2 bg-[#CC1414] text-white font-extrabold px-6 py-3.5 rounded-2xl hover:bg-red-700 transition-colors shadow-red"
        >
          <Phone size={16} /> {tc("callUs")}
        </a>
      </div>
    </div>
  );
}
