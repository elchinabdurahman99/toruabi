"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function FloatingCTA() {
  const tc = useTranslations("common");
  const t = useTranslations("contact");
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="rounded-2xl p-4 w-64 border border-white/10"
                style={{
                  background: "rgba(13,13,24,0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <p className="font-bold text-white text-sm mb-1 font-space">{t("title")}?</p>
                <p className="text-[#94A3B8] text-xs mb-4">{t("orderHere")}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${tc("phoneDial")}`}
                    className="flex items-center gap-2 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #EF4444, #DC2626)",
                      boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
                    }}
                  >
                    <Phone size={14} /> {tc("callUs")}
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setExpanded(false)}
                    className="flex items-center gap-2 text-white text-sm font-bold py-2.5 px-4 rounded-xl border border-white/10 hover:border-[#3B82F6]/40 transition-all"
                    style={{ background: "rgba(59,130,246,0.1)" }}
                  >
                    <MessageCircle size={14} /> {tc("writeUs")}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="w-14 h-14 rounded-full flex items-center justify-center relative text-white"
            style={{
              background: "linear-gradient(135deg, #EF4444, #3B82F6)",
              boxShadow: "0 8px 32px rgba(239,68,68,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#06060A] animate-pulse" />
            {expanded ? <X size={20} /> : <Phone size={20} />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
