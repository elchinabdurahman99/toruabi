"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const mainLinks = [
    { label: t("home"), href: "/" as const },
    { label: t("services"), href: "/services" as const },
    { label: t("priceList"), href: "/price-list" as const },
    { label: t("blog"), href: "/blog" as const },
    { label: t("partners"), href: "/partners" as const },
    { label: t("contact"), href: "/contact" as const },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isHome = pathname === "/";

  const headerExpanded = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerExpanded ? "px-3 sm:px-5 pt-3" : "px-0 pt-0"
        }`}
      >
        <nav
          className={`mx-auto h-16 lg:h-[74px] transition-all duration-500 ${
            headerExpanded
              ? "max-w-7xl rounded-2xl bg-white/85 backdrop-blur-xl border border-[#1254B8]/12 shadow-[0_10px_24px_rgba(18,84,184,0.14)]"
              : "max-w-full rounded-none bg-white/95 backdrop-blur-xl border-b border-[#1254B8]/15 shadow-[0_10px_30px_rgba(18,84,184,0.08)]"
          }`}
        >
          <div
            className={`h-full flex items-center justify-between ${
              headerExpanded ? "px-4 sm:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            }`}
          >
          <Link
            href="/"
            className="group block shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1254B8]"
            aria-label="TorudeAbi — Avaleht"
          >
            <BrandLogo variant="nav" className="transition-opacity group-hover:opacity-80" />
          </Link>

          <ul className="hidden lg:flex items-center gap-1.5 p-2 rounded-2xl bg-white/85 border-2 border-[#1254B8]/12 backdrop-blur-md shadow-[0_8px_24px_rgba(18,84,184,0.10)]">
            {mainLinks.map((l) => (
              <li key={l.href} className="py-1">
                <Link
                  href={l.href}
                  className={`relative px-4 py-2.5 rounded-lg text-[14px] font-bold transition-all duration-250 group ${
                    isActive(l.href)
                      ? "text-[#0B3D91] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
                      : "text-[#1A1917] hover:text-[#0B3D91] hover:bg-white/85"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full transition-transform duration-250 origin-left ${
                      isActive(l.href)
                        ? "bg-[#E87722] scale-x-100"
                        : "bg-[#E87722] scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(18,84,184,0.35)]"
              style={{
                background: "linear-gradient(135deg, #1254B8, #1254B8)",
                boxShadow: "0 4px 14px rgba(18,84,184,0.28)",
              }}
            >
              {t("freeQuote")}
              <ChevronRight size={14} />
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg text-[#1254B8] hover:bg-[#1254B8]/10 transition-colors"
            aria-label="Ava menüü"
          >
            <Menu size={24} />
          </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-[#1254B8]/25 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[min(320px,88vw)] bg-white flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1254B8]/20">
                <Link href="/" onClick={() => setOpen(false)}>
                  <BrandLogo variant="drawer" />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-[#1254B8] hover:bg-[#1254B8]/10 transition-colors"
                  aria-label="Sulge"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {mainLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-semibold text-[15px] transition-colors ${
                        isActive(l.href)
                          ? "bg-[#1254B8]/10 text-[#1254B8]"
                          : "text-[#1254B8] hover:bg-[#1254B8]/10 hover:text-[#1254B8]"
                      }`}
                    >
                      {l.label}
                      <ChevronRight size={15} className="opacity-35" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-4 pb-8 pt-3 space-y-2.5 border-t border-[#1254B8]/20">
                <div className="flex justify-end mb-1">
                  <LanguageSwitcher />
                </div>
                <a
                  href={`tel:${tc("phoneDial")}`}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-white font-bold text-base"
                  style={{ background: "linear-gradient(135deg, rgb(18, 84, 184), rgb(11, 61, 145))" }}
                >
                  <Phone size={17} />
                  {t("callNow")}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-base border-2 border-[#1254B8] text-[#1254B8] hover:bg-[#1254B8] hover:text-white transition-colors"
                >
                  {t("freeQuote")}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
