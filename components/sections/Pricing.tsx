"use client";
import { motion } from "framer-motion";
import Check from "lucide-react/dist/esm/icons/check";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const plans = [
  { emoji: "🔩", titleKey: "plumbing", from: "€49", unit: "small repair", popular: false, accent: "#3B6CF4",
    features: ["Free inspection", "Transparent quote", "Pay after completion", "12-month guarantee", "24/7 callout"] },
  { emoji: "⚡", titleKey: "electrical", from: "€59", unit: "standard job", popular: true, accent: "#8B3FC8",
    features: ["Free inspection", "Itemised quote", "Certified techs", "Safety certificate", "24-month guarantee"] },
  { emoji: "🏗️", titleKey: "constructionWorks", from: "Custom", unit: "per project", popular: false, accent: "#E8354A",
    features: ["Free assessment", "Detailed proposal", "Fixed-price", "Weekly updates", "2-year guarantee"] },
  { emoji: "🧹", titleKey: "cleaning", from: "€79", unit: "standard apt", popular: false, accent: "#8B3FC8",
    features: ["Free quote", "All equipment", "Eco-friendly", "Regular plans", "Satisfaction guarantee"] },
];

export default function Pricing() {
  const t = useTranslations("pricing");
  const ts = useTranslations("services");

  return (
    <section id="pricing" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5 border border-[#8B3FC8]/20"
            style={{ background: "rgba(139,63,200,0.08)", color: "#8B3FC8" }}
          >
            {t("title")}
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-[#1a2a6c] mb-4 font-space">
            {t("title")}
          </h2>
          <p className="text-[#5A5955] text-lg max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl overflow-hidden border transition-all duration-300"
              style={
                plan.popular
                  ? {
                      background: "rgba(139,63,200,0.06)",
                      borderColor: "rgba(139,63,200,0.35)",
                      boxShadow: "0 20px 60px rgba(139,63,200,0.14)",
                    }
                  : {
                      background: "rgba(255,255,255,0.55)",
                      borderColor: "rgba(59,108,244,0.15)",
                      backdropFilter: "blur(12px)",
                    }
              }
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(to right, #3B6CF4, #8B3FC8)" }} />
              )}
              {plan.popular && (
                <div
                  className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                  style={{ background: "linear-gradient(135deg, #8B3FC8, #3B6CF4)" }}
                >
                  Popular
                </div>
              )}

              <div className="p-6 border-b border-black/6">
                <div className="text-4xl mb-4">{plan.emoji}</div>
                <h3 className="font-bold text-[#1a2a6c] text-xl mb-1 font-space">
                  {ts(`items.${plan.titleKey}`)}
                </h3>
                <div
                  className="font-extrabold text-3xl mt-4 font-space"
                  style={{
                    background: plan.popular
                      ? "linear-gradient(135deg, #8B3FC8, #3B6CF4)"
                      : `linear-gradient(135deg, ${plan.accent}, ${plan.accent}cc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {plan.from}
                </div>
                <p className="text-[#6B7280] text-xs mt-0.5">/ {plan.unit}</p>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `linear-gradient(135deg, ${plan.accent}, ${plan.accent}cc)` }}
                      >
                        <Check size={9} className="text-white" strokeWidth={3.5} />
                      </div>
                      <span className="text-[#5A5955] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 group hover:-translate-y-0.5"
                  style={
                    plan.popular
                      ? { background: "linear-gradient(135deg, #8B3FC8, #3B6CF4)", color: "#fff", boxShadow: "0 8px 24px rgba(139,63,200,0.28)" }
                      : { background: `rgba(${plan.accent === "#3B6CF4" ? "59,108,244" : plan.accent === "#E8354A" ? "232,53,74" : "139,63,200"},0.10)`, color: plan.accent, border: `1px solid ${plan.accent}33` }
                  }
                >
                  {t("requestQuote")}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#6B7280] text-sm mt-8">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
