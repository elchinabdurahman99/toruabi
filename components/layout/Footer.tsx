"use client";
import { useEffect, useState } from "react";
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Clock from "lucide-react/dist/esm/icons/clock";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import BrandLogo from "@/components/ui/BrandLogo";

export interface FooterServiceLink {
  canonicalSlug: string;
  slug: string;
  title: string;
}

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
      className="fixed bottom-24 right-6 z-48 w-11 h-11 rounded-xl text-white shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
      style={{ background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)" }}
      aria-label={t("scrollTop")}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}

export default function Footer({
  logoUrl,
  serviceLinks = [],
}: {
  logoUrl?: string;
  serviceLinks?: FooterServiceLink[];
}) {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const ts = useTranslations("services");
  const tn = useTranslations("nav");

  const companyLinks = [
    { label: tn("services"), href: "/services" as const },
    { label: tn("priceList"), href: "/price-list" as const },
    { label: tn("blog"), href: "/blog" as const },
    { label: tn("partners"), href: "/partners" as const },
    { label: tn("contact"), href: "/contact" as const },
  ];

  return (
    <footer className="relative overflow-hidden bg-white/30 backdrop-blur-sm text-[#2B5CE6] border-t border-[#3B6CF4]/10" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#3B6CF4]/12 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-[-90px] h-80 w-80 rounded-full bg-[#E8354A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8B3FC8]/12 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div>
            <Link
              href="/"
              className="inline-block mb-5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6CF4]"
              aria-label="TorudeAbi — Avaleht"
            >
              <BrandLogo variant="footer" logoUrl={logoUrl} />
            </Link>
            <p className="text-[#34415D] text-sm leading-relaxed mb-4">
              {t("description")}
            </p>
            <p className="text-[#5C6A86] text-xs font-semibold mb-0.5" itemProp="name">{t("companyName")}</p>
            <p className="text-[#5C6A86] text-xs mb-5" itemProp="address">{t("companyAddress")}</p>
            <div className="flex gap-2">
              {["FB", "IG", "TW"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#34415D] text-xs font-bold border border-[#DDE7FF] bg-white/90 shadow-sm hover:text-white transition-all cursor-pointer hover:bg-[#E8354A] hover:border-[#E8354A]"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Services — dinamik Sanity-dən */}
          <div>
            <h3 className="font-bold text-[#2B5CE6] text-sm mb-5 uppercase tracking-widest font-space">
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.canonicalSlug}>
                  <Link
                    href={internalPathToLinkHref(`/services/${s.slug}`)}
                    className="text-[#34415D] hover:text-[#E8354A] text-sm transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-[#3B6CF4] hover:text-[#E8354A] text-sm font-bold transition-colors"
                >
                  {ts("viewAll")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-[#2B5CE6] text-sm mb-5 uppercase tracking-widest font-space">
              {t("companyTitle")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#34415D] hover:text-[#E8354A] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[#2B5CE6] text-sm mb-5 uppercase tracking-widest font-space">
              {t("contactTitle")}
            </h3>
            <div className="space-y-4">
              {[
                { icon: Phone, label: tc("phone"), sub: t("phoneSub"), href: `tel:${tc("phoneDial")}` },
                { icon: Mail, label: tc("email"), sub: t("emailAnytime"), href: `mailto:${tc("email")}` },
                { icon: MapPin, label: tc("address"), sub: t("fullCoverage"), href: undefined },
                { icon: Clock, label: t("available247"), sub: t("includingHolidays"), href: undefined },
              ].map(({ icon: Icon, label, sub, href }) => (
                <div key={label} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE7FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-[#3B6CF4]" />
                  </div>
                  <div>
                    {href ? (
                      <a href={href} className="text-[#2B5CE6] hover:text-[#E8354A] text-sm font-bold transition-colors block">
                        {label}
                      </a>
                    ) : (
                      <span className="text-[#2B5CE6] text-sm font-bold block">{label}</span>
                    )}
                    <span className="text-[#5C6A86] text-xs">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#DDE7FF]/90 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#5C6A86] text-xs">
            <a
              href="https://navalab.ee/et/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8354A] transition-colors"
            >
              {t("copyright_navalab_v1", { year: new Date().getFullYear() })}
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[#5C6A86] hover:text-[#E8354A] text-xs transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="text-[#5C6A86] hover:text-[#E8354A] text-xs transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
