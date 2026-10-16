"use client";
import Phone from "lucide-react/dist/esm/icons/phone";
import { useTranslations } from "next-intl";

export default function EmergencyBand() {
  const t = useTranslations("emergencyBand");
  const tc = useTranslations("common");

  const items = [
    t("discount"),
    t("services"),
    t("guarantee"),
    t("cta"),
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="py-2.5 overflow-hidden relative border-b border-white/6"
      style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(59,130,246,0.9))" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center gap-2 sm:gap-4">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 mx-6 sm:mx-8 text-white font-semibold text-xs sm:text-sm tracking-wide"
              >
                {item}
                <span className="w-1 h-1 rounded-full bg-white/40" />
              </span>
            ))}
          </div>
        </div>
        <a
          href={`tel:${tc("phoneDial")}`}
          className="shrink-0 text-white font-bold text-[10px] sm:text-xs px-2.5 sm:px-4 py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 hover:scale-[1.02] transition-transform border border-white/30"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <Phone size={12} className="shrink-0" />
          <span className="hidden sm:inline truncate max-w-40 md:max-w-none">{tc("phone")}</span>
        </a>
      </div>
    </div>
  );
}
