"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Phone from "lucide-react/dist/esm/icons/phone";
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
      
      <div className="bg-white/55 backdrop-blur-sm rounded-3xl p-8 border border-[#3B6CF4]/12 mb-8 mt-2">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-[#8B3FC8]/15 bg-white/50 backdrop-blur-sm p-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-2">{t("discountLabel")}</p>
            <p className="text-[#2B5CE6] font-bold">{t("discountHours")}</p>
          </div>
          <div className="rounded-2xl border border-[#8B3FC8]/15 bg-white/50 backdrop-blur-sm p-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-2">{t("nightLabel")}</p>
            <p className="text-[#2B5CE6] font-bold">{t("nightSurcharge")}</p>
          </div>
        </div>

        <p className="text-[#5A5955] font-medium leading-relaxed mb-6">{t("transportTallinn")}</p>

        <div className="rounded-2xl border border-[#3B6CF4]/15 bg-white/50 backdrop-blur-sm p-6 mb-2">
          <p className="text-[#2B5CE6] font-extrabold mb-2">{t("qualityTitle")}</p>
          <p className="text-[#3B6CF4]/80 font-medium leading-relaxed">{t("qualityBody")}</p>
        </div>
      </div>

      {pricing && pricing.length > 0 && (
        <div className="space-y-8 mb-12">
          <div className="bg-white/55 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#3B6CF4]/12 hover:shadow-md transition-shadow">
            <div className="bg-white/40 border-b border-[#8B3FC8]/12 px-6 py-4">
              <h3 className="font-extrabold text-[#2B5CE6] text-lg">{t("cameraInspectionTitle")}</h3>
            </div>
            <div className="px-2 py-2 sm:px-3">
              <div className="rounded-xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 transition-colors hover:bg-white/60">
                <span className="text-[#374151] font-medium min-w-0 flex-1 [overflow-wrap:anywhere] break-words hyphens-auto">
                  {t("sewerFlushingName")}
                </span>
                <div className="text-left sm:text-right shrink-0 max-w-full sm:max-w-[45%]">
                  <span className="font-extrabold text-[#2B5CE6]">{t("sewerFlushingPrice")}</span>
                </div>
              </div>
              <div className="rounded-xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 transition-colors hover:bg-white/60 bg-[#3B6CF4]/[0.03]">
                <span className="text-[#374151] font-medium min-w-0 flex-1 [overflow-wrap:anywhere] break-words hyphens-auto">
                  {t("cameraInspectionName")}
                </span>
                <div className="text-left sm:text-right shrink-0 max-w-full sm:max-w-[45%]">
                  <span className="font-extrabold text-[#2B5CE6]">{t("cameraInspectionPrice")}</span>
                  <span className="text-[#5A5955] text-sm ml-1">/ {t("cameraInspectionUnit")}</span>
                </div>
              </div>
            </div>
          </div>
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
                <div className="px-2 py-2 sm:px-3">
                  {category.items.map((item, j) => (
                    <div
                      key={j}
                      className={`rounded-xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 transition-colors hover:bg-white/60 ${
                        j % 2 === 1 ? "bg-[#3B6CF4]/[0.03]" : ""
                      }`}
                    >
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

      <div className="bg-white/55 backdrop-blur-sm rounded-3xl p-8 border border-[#3B6CF4]/12 mb-8">
        {/* VAT Notice Banner */}
        <div className="flex items-center gap-3 rounded-2xl px-5 py-3.5 mb-6 border border-[#E8354A]/20" style={{ background: "linear-gradient(135deg, #fff5f6 0%, #fff0f1 100%)" }}>
          <span className="text-lg">🏷️</span>
          <p className="text-[#E8354A] font-extrabold text-sm">{t("taxNote")}</p>
        </div>

        <div className="bg-[#3B6CF4]/5 rounded-2xl p-5 mb-6 border border-[#3B6CF4]/10">
          <p className="text-[#2B5CE6] font-bold">{t("discountSecondHour")}</p>
        </div>

        <h2 className="font-extrabold text-[#2B5CE6] text-lg mb-4">{t("notesTitle")}</h2>
        <ul className="space-y-3 mb-8">
          {notes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[#5A5955] font-medium leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B6CF4] mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <p className="text-[#5A5955] font-medium leading-relaxed mb-4">{t("parking")}</p>
        <p className="text-[#5A5955] font-medium leading-relaxed mb-6">{t("hourlyOnePerson")}</p>

        <p className="text-[#2B5CE6] font-bold mb-4">{t("warrantyNb")}</p>

        <p className="text-[#5A5955] font-medium leading-relaxed mb-4 border-l-2 border-[#3B6CF4]/20 pl-4 py-1">
          {t.rich("pressureWashingNote", {
            important: (chunks) => <span className="italic font-bold text-[#2B5CE6]">{chunks}</span>
          })}
        </p>

        <p className="text-[#2B5CE6] font-extrabold">{t("callIntro")}</p>
      </div>

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
