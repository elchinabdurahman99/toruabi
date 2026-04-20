"use client";
import { motion } from "framer-motion";
import { Phone, Clock, Wrench, CreditCard, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Emergency() {
  const t = useTranslations("emergency");
  const tc = useTranslations("common");

  const features = [
    { icon: Clock, title: t("features.fast"), desc: t("features.available") },
    { icon: Phone, title: t("features.available"), desc: t("features.certified") },
    { icon: Wrench, title: t("features.certified"), desc: t("features.guaranteed") },
    { icon: CreditCard, title: t("features.guaranteed"), desc: t("features.fast") },
  ];

  const featureColors = [
    { bg: "linear-gradient(135deg,#EF4444,#DC2626)", shadow: "rgba(239,68,68,0.3)", border: "rgba(239,68,68,0.2)" },
    { bg: "linear-gradient(135deg,#3B82F6,#1D4ED8)", shadow: "rgba(59,130,246,0.3)", border: "rgba(59,130,246,0.2)" },
    { bg: "linear-gradient(135deg,#EF4444,#3B82F6)", shadow: "rgba(239,68,68,0.25)", border: "rgba(239,68,68,0.15)" },
    { bg: "linear-gradient(135deg,#3B82F6,#EF4444)", shadow: "rgba(59,130,246,0.25)", border: "rgba(59,130,246,0.15)" },
  ];

  return (
    <section id="emergency" className="py-28 relative overflow-hidden border-y border-white/6" style={{ background: "#0D0D18" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #EF4444, transparent 70%)" }} />
        <div className="absolute -left-24 bottom-0 w-96 h-96 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 border border-[#EF4444]/20"
              style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
            >
              <Zap size={12} /> {t("badge")}
            </div>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 font-space">
              {t("title")}
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-md">
              {t("subtitle")}
            </p>
            <motion.a
              href={`tel:${tc("phoneDial")}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 text-white font-extrabold text-lg px-8 py-4 rounded-2xl transition-colors"
              style={{
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
                boxShadow: "0 12px 40px rgba(239,68,68,0.4)",
              }}
            >
              <Phone size={20} />
              {t("cta")}
            </motion.a>

            <div
              className="mt-6 inline-flex items-center gap-3 rounded-2xl px-5 py-3 border border-white/8"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
              </span>
              <span className="text-[#94A3B8] text-sm font-semibold">
                {tc("phone")} | {tc("phone2")}
              </span>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {features.map((f, i) => {
              const c = featureColors[i];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 rounded-2xl p-5 transition-all duration-300 group border hover:border-opacity-40"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = c.border;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${c.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: c.bg, boxShadow: `0 4px 16px ${c.shadow}` }}
                  >
                    <f.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1 font-space">{f.title}</h4>
                    <p className="text-[#94A3B8] text-xs leading-relaxed">{f.desc}</p>
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
