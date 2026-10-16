"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Cookie from "lucide-react/dist/esm/icons/cookie";

const STORAGE_KEY = "torudeabi24_cookie_consent";

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("ariaLabel")}
      className="fixed bottom-0 left-0 right-0 z-999 p-4 sm:p-6 flex justify-center"
    >
      <div
        className="w-full max-w-2xl text-[#2B5CE6] rounded-2xl shadow-xl border border-[#E8EFFE] flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 bg-white"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)" }}
        >
          <Cookie size={20} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#2B5CE6] mb-0.5">{t("title")}</p>
          <p className="text-xs text-[#5A5955] leading-relaxed">
            {t("body")}{" "}
            <Link href="/privacy-policy" className="underline text-[#3B6CF4] hover:text-[#2B5CE6] transition-colors">
              {t("learnMore")}
            </Link>
          </p>
        </div>

        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={reject}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-[#E8EFFE] bg-[#F0F4FF] text-xs font-bold text-[#5A5955] hover:text-[#2B5CE6] hover:border-[#3B6CF4]/30 transition-colors"
          >
            {t("reject")}
          </button>
          <button
            type="button"
            onClick={accept}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)", boxShadow: "0 4px 16px rgba(59,108,244,0.25)" }}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
