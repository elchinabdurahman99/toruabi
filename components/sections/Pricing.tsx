"use client";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const plans = [
  { emoji: "🔩", titleKey: "plumbing", from: "€49", unit: "small repair", popular: false,
    features: ["Free inspection", "Transparent quote", "Pay after completion", "12-month guarantee", "24/7 callout"] },
  { emoji: "⚡", titleKey: "electrical", from: "€59", unit: "standard job", popular: true,
    features: ["Free inspection", "Itemised quote", "Certified techs", "Safety certificate", "24-month guarantee"] },
  { emoji: "🏗️", titleKey: "constructionWorks", from: "Custom", unit: "per project", popular: false,
    features: ["Free assessment", "Detailed proposal", "Fixed-price", "Weekly updates", "2-year guarantee"] },
  { emoji: "🧹", titleKey: "cleaning", from: "€79", unit: "standard apt", popular: false,
    features: ["Free quote", "All equipment", "Eco-friendly", "Regular plans", "Satisfaction guarantee"] },
];

export default function Pricing() {
  const t = useTranslations("pricing");
  const ts = useTranslations("services");

  return (
    <section id="pricing" className="py-28 relative overflow-hidden" style={{ background: "#0D0D18" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(225,29,72,0.3), rgba(18,84,184,0.3), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5 border border-[#E11D48]/20"
            style={{ background: "rgba(225,29,72,0.1)", color: "#E11D48" }}
          >
            {t("title")}
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-4 font-space">
            {t("title")}
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-md mx-auto">
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
                      background: "linear-gradient(135deg, rgba(225,29,72,0.12) 0%, rgba(18,84,184,0.12) 100%)",
                      borderColor: "rgba(225,29,72,0.3)",
                      boxShadow: "0 20px 60px rgba(225,29,72,0.12)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }
              }
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(to right, #E11D48, #1254B8)" }} />
              )}
              {plan.popular && (
                <div
                  className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                  style={{ background: "linear-gradient(135deg, #E11D48, #1254B8)" }}
                >
                  Popular
                </div>
              )}

              <div className="p-6 border-b border-white/8">
                <div className="text-4xl mb-4">{plan.emoji}</div>
                <h3 className="font-bold text-white text-xl mb-1 font-space">
                  {ts(`items.${plan.titleKey}`)}
                </h3>
                <div
                  className="font-extrabold text-3xl mt-4 font-space"
                  style={
                    plan.popular
                      ? {
                          background: "linear-gradient(135deg, #E11D48, #1254B8)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : { color: "white" }
                  }
                >
                  {plan.from}
                </div>
                <p className="text-[#64748B] text-xs mt-0.5">/ {plan.unit}</p>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={plan.popular
                          ? { background: "linear-gradient(135deg,#E11D48,#1254B8)" }
                          : { background: "rgba(18,84,184,0.2)", border: "1px solid rgba(18,84,184,0.3)" }}
                      >
                        <Check size={9} className="text-white" strokeWidth={3.5} />
                      </div>
                      <span className="text-[#94A3B8] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 group text-white hover:-translate-y-0.5"
                  style={
                    plan.popular
                      ? { background: "linear-gradient(135deg,#E11D48,#1254B8)", boxShadow: "0 8px 24px rgba(225,29,72,0.3)" }
                      : { background: "rgba(18,84,184,0.15)", border: "1px solid rgba(18,84,184,0.25)" }
                  }
                >
                  {t("requestQuote")}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#64748B] text-sm mt-8">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
