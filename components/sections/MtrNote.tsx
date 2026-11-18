import type { Locale } from "@/i18n/config";

const NOTE: Record<Locale, string> = {
  et: "Kvaliteet ja vastutus on tagatud riiklike tegevuslubadega (MTR)",
  en: "Quality and responsibility are guaranteed by state activity licences (MTR)",
  ru: "Качество и ответственность гарантированы государственными лицензиями на деятельность (MTR)",
};

export default function MtrNote({ locale }: { locale: Locale }) {
  return (
    <section className="relative z-10 pt-10 sm:pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center sm:justify-center gap-3 sm:gap-4 rounded-2xl border border-[#3B6CF4]/15 bg-white px-5 py-4 sm:px-8 shadow-[0_12px_35px_rgba(59,108,244,0.10)]">
          <span className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-[#3B6CF4] text-white">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l7 3v5c0 4.5-2.9 8.3-7 10-4.1-1.7-7-5.5-7-10V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <p className="text-[15px] sm:text-base font-bold leading-snug text-[#2B5CE6]">{NOTE[locale]}</p>
        </div>
      </div>
    </section>
  );
}
