"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Search, Wrench, CheckCircle } from "lucide-react";

const STEP_ICONS = [Phone, Search, Wrench, CheckCircle];
const STEP_COLORS = [
  { bg: "linear-gradient(135deg,#CC1414,#A80F0F)", shadow: "rgba(204,20,20,0.25)", num: "rgba(204,20,20,0.15)" },
  { bg: "linear-gradient(135deg,#0D1B3E,#162251)", shadow: "rgba(13,27,62,0.25)", num: "rgba(13,27,62,0.15)" },
  { bg: "linear-gradient(135deg,#CC1414,#0D1B3E)", shadow: "rgba(204,20,20,0.2)", num: "rgba(204,20,20,0.1)" },
  { bg: "linear-gradient(135deg,#0D1B3E,#CC1414)", shadow: "rgba(13,27,62,0.2)", num: "rgba(13,27,62,0.1)" },
];

export default function Process() {
  const t = useTranslations("process");

  const steps = [
    { num: "01", titleKey: "call" },
    { num: "02", titleKey: "diagnose" },
    { num: "03", titleKey: "fix" },
    { num: "04", titleKey: "done" },
  ];

  return (
    <section id="process" className="py-14 sm:py-16 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(204,20,20,0.15), rgba(13,27,62,0.15), transparent)" }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(13,27,62,0.15), rgba(204,20,20,0.15), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-3 border border-[#0D1B3E]/10"
            style={{ background: "rgba(13,27,62,0.05)", color: "#0D1B3E" }}
          >
            {t("title")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B3E] mb-2 sm:mb-3 font-space">
            {t("title")}
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px"
            style={{ background: "linear-gradient(to right, rgba(204,20,20,0.15), rgba(13,27,62,0.15))" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const color = STEP_COLORS[i];
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex lg:flex-col items-start lg:items-center gap-3 sm:gap-4 lg:gap-0 lg:text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-lg"
                    style={{ background: color.bg, boxShadow: `0 12px 32px ${color.shadow}` }}
                  >
                    <Icon size={26} className="text-white" />
                    <span
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-extrabold text-white border border-white/20"
                      style={{ background: color.num, backdropFilter: "blur(8px)" }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>
                  <div className="lg:mt-4">
                    <h4 className="font-bold text-[#0D1B3E] text-sm sm:text-base mb-1 sm:mb-1.5 font-space">
                      {t(`steps.${step.titleKey}`)}
                    </h4>
                    <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
                      {t(`steps.${step.titleKey}Desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
