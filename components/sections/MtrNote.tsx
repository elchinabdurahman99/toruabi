import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";

const MTR_URL = "https://mtr.ttja.ee/majandustegevusteade?m=98";

const LICENCES = [
  { key: "construction", number: "EEH012495" },
  { key: "electrical", number: "TEL003775" },
  { key: "gas", number: "TGT000755" },
] as const;

function VerifyLink({ label, className }: { label: string; className: string }) {
  return (
    <a
      href={MTR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`items-center gap-1.5 text-sm font-bold text-[#2B5CE6] hover:text-[#3B6CF4] hover:underline ${className}`}
    >
      {label}
      <svg viewBox="0 0 24 24" aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  );
}

/** Home page: the company's MTR activity licences, right under the hero. */
export default async function MtrNote({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "registrations" });

  return (
    <section aria-labelledby="mtr-licences" className="relative z-10 pt-10 sm:pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-4 rounded-2xl border border-[#3B6CF4]/15 bg-white p-4 shadow-[0_12px_35px_rgba(59,108,244,0.10)] sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
          <div>
            <h2 id="mtr-licences" className="flex items-center gap-3 font-space text-lg font-extrabold leading-snug text-[#2B5CE6] sm:text-xl">
              <span className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-[#3B6CF4] text-white">
                <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5c0 4.5-2.9 8.3-7 10-4.1-1.7-7-5.5-7-10V6l7-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              {t("title")}
            </h2>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[#5A5955] sm:text-base">{t("note")}</p>
            <VerifyLink label={t("verify")} className="mt-3 hidden lg:inline-flex" />
          </div>

          <dl className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {LICENCES.map((l) => (
              <div
                key={l.number}
                className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#3B6CF4]/15 bg-[#F0F4FF] px-4 py-3 sm:flex-col sm:items-start sm:rounded-2xl sm:p-5"
              >
                <dt className="min-w-0 text-sm font-bold leading-snug text-[#1A1917]">{t(`fields.${l.key}`)}</dt>
                <dd className="shrink-0 rounded-lg bg-[#3B6CF4] px-2.5 py-1 text-sm font-extrabold tracking-wide text-white tabular-nums sm:text-base">
                  {l.number}
                </dd>
              </div>
            ))}
          </dl>

          <VerifyLink label={t("verify")} className="inline-flex lg:hidden" />
        </div>
      </div>
    </section>
  );
}
