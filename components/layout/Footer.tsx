"use client";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import BrandLogo from "@/components/ui/BrandLogo";

function ScrollToTop() {
  const t = useTranslations("footer");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-48 w-11 h-11 rounded-xl bg-[#CC1414] text-white shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
      aria-label={t("scrollTop")}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const ts = useTranslations("services");
  const tn = useTranslations("nav");

  const serviceLinks = [
    { label: ts("items.plumbing"), slug: "plumber-24h-tallinn" },
    { label: ts("items.electrical"), slug: "electrician-services" },
    { label: ts("items.bathroomRepair"), slug: "bathroom-repair" },
    { label: ts("items.constructionWorks"), slug: "construction-works" },
    { label: ts("items.cleaning"), slug: "cleaning-services" },
    { label: ts("items.design"), slug: "disain" },
    { label: ts("items.insuredAccident"), slug: "kindlustus-remont" },
    { label: ts("items.toiletInstallation"), slug: "wc-paigaldus" },
  ];

  const companyLinks = [
    { label: tn("services"), href: "/services" as const },
    { label: tn("priceList"), href: "/price-list" as const },
    { label: tn("blog"), href: "/blog" as const },
    { label: tn("partners"), href: "/partners" as const },
    { label: tn("contact"), href: "/contact" as const },
  ];

  return (
    <footer className="bg-[#F5F6FA] text-[#0D1B3E] border-t border-[#E2E5EF]">
      {/* Top red accent line */}
      <div className="h-1 w-full bg-[#CC1414]" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div>
            <Link
              href="/"
              className="inline-block mb-5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC1414]"
              aria-label="TorudeAbi — Avaleht"
            >
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
              {t("description")}
            </p>
            <p className="text-[#9CA3AF] text-xs font-semibold mb-0.5">{t("companyName")}</p>
            <p className="text-[#9CA3AF] text-xs mb-0.5">{t("companyAddress")}</p>
            <p className="text-[#9CA3AF] text-xs mb-5">{t("regNr")}</p>
            <div className="flex gap-2">
              {["FB", "IG", "TW"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] text-xs font-bold border border-[#E2E5EF] bg-white hover:bg-[#CC1414] hover:border-[#CC1414] hover:text-white transition-all cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-[#0D1B3E] text-sm mb-5 uppercase tracking-widest font-space">
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={internalPathToLinkHref(`/services/${s.slug}`)}
                    className="text-[#6B7280] hover:text-[#CC1414] text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-[#CC1414] hover:text-red-300 text-sm font-bold transition-colors"
                >
                  {ts("viewAll")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[#0D1B3E] text-sm mb-5 uppercase tracking-widest font-space">
              {t("companyTitle")}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#6B7280] hover:text-[#CC1414] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#0D1B3E] text-sm mb-5 uppercase tracking-widest font-space">
              {t("contactTitle")}
            </h4>
            <div className="space-y-4">
              {[
                { icon: Phone, label: tc("phone"), sub: t("phoneSub"), href: `tel:${tc("phoneDial")}` },
                { icon: Mail, label: tc("email"), sub: t("emailAnytime"), href: `mailto:${tc("email")}` },
                { icon: MapPin, label: tc("address"), sub: t("fullCoverage"), href: undefined },
                { icon: Clock, label: t("available247"), sub: t("includingHolidays"), href: undefined },
              ].map(({ icon: Icon, label, sub, href }) => (
                <div key={label} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#CC1414]/15 border border-[#CC1414]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-[#CC1414]" />
                  </div>
                  <div>
                    {href ? (
                      <a href={href} className="text-[#0D1B3E] hover:text-[#CC1414] text-sm font-bold transition-colors block">
                        {label}
                      </a>
                    ) : (
                      <span className="text-[#0D1B3E] text-sm font-bold block">{label}</span>
                    )}
                    <span className="text-[#9CA3AF] text-xs">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E2E5EF] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-xs">
            <a
              href="https://navalab.ee/et/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#CC1414] transition-colors"
            >
              Made with ❤️ by Navalab © 2026. All rights reserved.
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[#9CA3AF] hover:text-[#CC1414] text-xs transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="text-[#9CA3AF] hover:text-[#CC1414] text-xs transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
