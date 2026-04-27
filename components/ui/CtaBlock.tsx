"use client";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CtaBlockProps {
  variant?: "yellow" | "dark";
  translationKey: "notSure" | "ready";
}

export default function CtaBlock({ variant = "dark", translationKey }: CtaBlockProps) {
  const t = useTranslations("cta");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");
  const isPrimary = variant === "yellow";

  return (
    <div className="px-6 py-6" style={{ background: "#06060A" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/8 relative overflow-hidden"
          style={
            isPrimary
              ? {
                  background: "linear-gradient(135deg, rgba(225,29,72,0.12) 0%, rgba(18,84,184,0.12) 100%)",
                  boxShadow: "0 0 60px rgba(225,29,72,0.08)",
                }
              : { background: "rgba(255,255,255,0.03)" }
          }
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            <h3 className="font-extrabold text-white text-2xl lg:text-3xl mb-2 font-space">
              {t(translationKey)}
            </h3>
            <p className="text-[#94A3B8]">
              {t(`${translationKey}Subtitle`)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
            <a
              href={`tel:${tc("phoneDial")}`}
              className="flex items-center gap-2 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm hover:-translate-y-0.5 text-white"
              style={{
                background: "linear-gradient(135deg, #E11D48, #BE123C)",
                boxShadow: "0 8px 24px rgba(225,29,72,0.3)",
              }}
            >
              <Phone size={16} /> {tc("callUs")}
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm text-white border border-white/10 hover:border-[#1254B8]/40"
              style={{ background: "rgba(18,84,184,0.15)" }}
            >
              {tn("freeQuote")} <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
