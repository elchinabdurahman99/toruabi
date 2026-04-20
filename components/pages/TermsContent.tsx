"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TermsContent() {
  const t = useTranslations("terms");

  const items = t.raw("items") as string[];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0D1B3E] mb-10" style={{ letterSpacing: "-0.03em" }}>
          {t("title")}
        </h1>

        <div className="bg-white rounded-3xl p-8 border border-[#E2E5EF] shadow-sm">
          <ol className="space-y-6">
            {items.map((item: string, i: number) => (
              <li key={i} className="flex gap-4">
                <span className="font-extrabold text-[#CC1414] text-lg flex-shrink-0 w-8">{i + 1}.</span>
                <p className="text-[#6B7280] font-medium leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
