"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Clock, Menu, X, ChevronRight } from "lucide-react";
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

  return (
    <>
      {/* Top utility bar — navy, desktop only */}
      <div className="bg-[#0D1B3E] text-white/75 text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${tc("phoneDial")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold"
            >
              <Phone size={11} className="text-[#CC1414]" />
              {tc("phone")}
            </a>
            <a
              href={`mailto:${tc("email")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={11} className="text-[#CC1414]" />
              {tc("email")}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-[#CC1414]" />
            <span>24/7 — {tc("address")}</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="group block shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC1414]"
            aria-label="TorudeAbi — Avaleht"
          >
            <BrandLogo variant="nav" className="transition-opacity group-hover:opacity-80" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                    isActive(l.href)
                      ? "text-[#CC1414]"
                      : "text-[#374151] hover:text-[#0D1B3E] hover:bg-gray-50"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#CC1414] rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={`tel:${tc("phoneDial")}`}
              className="flex items-center gap-2 text-sm font-bold text-[#0D1B3E] hover:text-[#CC1414] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#CC1414] flex items-center justify-center">
                <Phone size={14} className="text-white" />
              </div>
              {tc("phone")}
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "#0D1B3E", boxShadow: "0 2px 10px rgba(13,27,62,0.25)" }}
            >
              {t("freeQuote")}
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg text-[#0D1B3E] hover:bg-gray-100 transition-colors"
            aria-label="Ava menüü"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-black/25"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[min(320px,88vw)] bg-white flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Link href="/" onClick={() => setOpen(false)}>
                  <BrandLogo variant="drawer" />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                  aria-label="Sulge"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
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
                          ? "bg-red-50 text-[#CC1414]"
                          : "text-[#111827] hover:bg-gray-50 hover:text-[#0D1B3E]"
                      }`}
                    >
                      {l.label}
                      <ChevronRight size={15} className="opacity-35" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer CTA footer */}
              <div className="px-4 pb-8 pt-3 space-y-2.5 border-t border-gray-100">
                <div className="flex justify-end mb-1">
                  <LanguageSwitcher />
                </div>
                <a
                  href={`tel:${tc("phoneDial")}`}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-white font-bold text-base"
                  style={{ background: "#CC1414" }}
                >
                  <Phone size={17} />
                  {t("callNow")}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-base border-2 border-[#0D1B3E] text-[#0D1B3E] hover:bg-[#0D1B3E] hover:text-white transition-colors"
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
