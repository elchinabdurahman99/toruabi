"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown, Phone, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import BrandLogo from "@/components/ui/BrandLogo";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";

export type NavServiceItem = {
  _id: string;
  canonicalSlug: string;
  slug: string;
  title: string;
  icon?: string | null;
};

export type NavCategory = {
  _id: string;
  slug: string;
  title: string;
  icon?: string | null;
  services: NavServiceItem[];
};

export default function Navbar({ navCategories = [] }: { navCategories?: NavCategory[] }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string>("");
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasMega = navCategories.length > 0;
  const activeCat = navCategories.find((c) => c._id === hoveredCat) ?? navCategories[0];

  const staticLinks = [
    { label: t("home"),      href: "/" as const },
    { label: t("priceList"), href: "/price-list" as const },
    { label: t("blog"),      href: "/blog" as const },
    { label: t("partners"),  href: "/partners" as const },
    { label: t("contact"),   href: "/contact" as const },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setDrawerOpen(false); setMegaOpen(false); }, [pathname]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!hoveredCat && navCategories[0]) setHoveredCat(navCategories[0]._id);
    setMegaOpen(true);
  };
  const scheduleMegaClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isServicesActive = pathname.startsWith("/services");
  const headerExpanded = pathname === "/" && !scrolled;

  const linkCls = (active: boolean) =>
    `relative px-3.5 py-2 rounded-lg text-[13.5px] font-bold transition-all duration-200 group inline-flex items-center gap-1 ${
      active
        ? "text-[#0B3D91] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.07)]"
        : "text-[#1A1917] hover:text-[#0B3D91] hover:bg-white/80"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-700 ease-in-out ${
          headerExpanded ? "px-3 sm:px-5 pt-3" : "px-0 pt-0"
        }`}
      >
        <nav
          className={`mx-auto h-17.5 lg:h-19.5 transition-[max-width,border-radius,background-color,box-shadow] duration-700 ease-in-out relative ${
            headerExpanded
              ? "max-w-7xl rounded-2xl bg-white/85 backdrop-blur-xl border border-[#1254B8]/12 shadow-[0_8px_20px_rgba(18,84,184,0.12)]"
              : "max-w-full rounded-none bg-white/96 backdrop-blur-xl border-b border-[#1254B8]/15 shadow-[0_4px_20px_rgba(18,84,184,0.09)]"
          }`}
          onMouseLeave={scheduleMegaClose}
        >
          <div className={`h-full flex items-center justify-between ${headerExpanded ? "px-4 sm:px-6" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
            {/* Logo */}
            <Link href="/" aria-label="TorudeAbi — Avaleht" className="shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-[#1254B8] focus:outline-none">
              <BrandLogo variant="nav" className="transition-opacity hover:opacity-80" />
            </Link>

            {/* Desktop nav pill */}
            <ul className="hidden lg:flex items-center gap-0.5 px-1.5 py-1.5 rounded-xl bg-white/85 border border-[#1254B8]/10 backdrop-blur-md shadow-[0_4px_16px_rgba(18,84,184,0.08)]">
              <li>
                <Link href="/" className={linkCls(isActive("/"))}>
                  {t("home")}
                  <span className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full origin-left bg-[#E11D48] transition-transform duration-200 ${isActive("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              </li>

              {/* Services — mega-menu trigger */}
              <li onMouseEnter={openMega}>
                <Link href="/services" className={linkCls(isServicesActive)}>
                  {t("services")}
                  {hasMega && <ChevronDown size={12} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />}
                  <span className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full origin-left bg-[#E11D48] transition-transform duration-200 ${isServicesActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              </li>

              {staticLinks.slice(1).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls(isActive(l.href))}>
                    {l.label}
                    <span className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full origin-left bg-[#E11D48] transition-transform duration-200 ${isActive(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-2.5">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="flex items-center gap-1.5 text-[13px] font-bold text-white px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#1254B8,#0B3D91)", boxShadow: "0 4px 12px rgba(18,84,184,0.28)" }}
              >
                {t("freeQuote")}
              </Link>
            </div>

            {/* Mobile menu btn */}
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden p-2 rounded-lg text-[#1254B8] hover:bg-[#1254B8]/10 transition-colors" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>

          {/* ── Mega-menu — sidebar + content layout ───────────────────────── */}
          <AnimatePresence>
            {hasMega && megaOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 z-[200] pt-1.5"
                onMouseEnter={openMega}
                onMouseLeave={scheduleMegaClose}
              >
                <div
                  className={`bg-white border border-[#E8EFFE] overflow-hidden flex ${headerExpanded ? "rounded-2xl" : "rounded-b-2xl border-t-0"}`}
                  style={{ boxShadow: "0 20px 50px -8px rgba(18,84,184,0.15), 0 6px 18px -4px rgba(0,0,0,0.07)" }}
                >
                  {/* Left — category sidebar */}
                  <div className="w-72 shrink-0 bg-[#F8FAFF] border-r border-[#E8EFFE] py-2">
                    <p className="px-4 pt-1 pb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9C9B96]">
                      {t("services")}
                    </p>
                    {navCategories.map((cat) => {
                      const isHovered = hoveredCat === cat._id || (!hoveredCat && cat === navCategories[0]);
                      return (
                        <button
                          key={cat._id}
                          onMouseEnter={() => setHoveredCat(cat._id)}
                          className={`flex items-center gap-2.5 w-full px-4 py-2 text-left transition-all duration-150 group/cat ${
                            isHovered
                              ? "bg-white text-[#0B3D91] border-l-[3px] border-[#1254B8]"
                              : "text-[#5A5955] hover:bg-white/70 hover:text-[#0B3D91] border-l-[3px] border-transparent"
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${isHovered ? "bg-[#1254B8]" : "bg-[#E8EFFE] group-hover/cat:bg-[#1254B8]/20"}`}>
                            <ServiceIcon slug={cat.slug} sanityIcon={cat.icon} size={13} strokeWidth={2} className={isHovered ? "text-white" : "text-[#1254B8]"} />
                          </span>
                          <span className="text-[12.5px] font-semibold leading-tight">{cat.title}</span>
                          <ChevronRight size={11} className={`ml-auto shrink-0 transition-opacity ${isHovered ? "opacity-60" : "opacity-0"}`} />
                        </button>
                      );
                    })}

                    {/* View all link */}
                    <div className="mx-3 mt-2 pt-2 border-t border-[#E8EFFE]">
                      <Link
                        href="/services"
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-1.5 px-2 py-1.5 text-[11.5px] font-bold text-[#1254B8] hover:underline"
                      >
                        View all services <ArrowUpRight size={11} />
                      </Link>
                    </div>
                  </div>

                  {/* Right — services for hovered category */}
                  <div className="flex-1 p-4 min-h-0">
                    {activeCat && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCat._id}
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          {/* Category heading */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-[#0B3D91] flex items-center justify-center">
                                <ServiceIcon slug={activeCat.slug} sanityIcon={activeCat.icon} size={15} strokeWidth={1.9} className="text-white" />
                              </span>
                              <span className="font-extrabold text-[#0B3D91] text-sm">{activeCat.title}</span>
                            </div>
                            <Link
                              href="/services"
                              onClick={() => setMegaOpen(false)}
                              className="text-[11px] font-bold text-[#1254B8] hover:underline inline-flex items-center gap-1"
                            >
                              View all <ArrowUpRight size={10} />
                            </Link>
                          </div>

                          {/* Service list — 2 column grid */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                            {activeCat.services.map((svc) => (
                              <Link
                                key={svc._id}
                                href={internalPathToLinkHref(`/services/${svc.slug}`)}
                                onClick={() => setMegaOpen(false)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12.5px] text-[#3A3935] font-medium hover:bg-[#F0F4FF] hover:text-[#1254B8] transition-colors group/svc"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1254B8]/25 shrink-0 group-hover/svc:bg-[#1254B8] transition-colors" />
                                <span className="line-clamp-1">{svc.title}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-[#1254B8]/20 backdrop-blur-[2px]"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[min(320px,88vw)] bg-white flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1254B8]/15">
                <Link href="/" onClick={() => setDrawerOpen(false)}><BrandLogo variant="drawer" /></Link>
                <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg text-[#1254B8] hover:bg-[#1254B8]/10"><X size={19} /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
                {/* Home */}
                <Link href="/" onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl font-semibold text-[14.5px] transition-colors ${isActive("/") ? "bg-[#1254B8]/10 text-[#1254B8]" : "text-[#1A1917] hover:bg-[#F0F4FF]"}`}>
                  {t("home")} <ChevronRight size={14} className="opacity-30" />
                </Link>

                {/* Services accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl font-semibold text-[14.5px] transition-colors ${isServicesActive ? "bg-[#1254B8]/10 text-[#1254B8]" : "text-[#1A1917] hover:bg-[#F0F4FF]"}`}
                  >
                    {t("services")}
                    <ChevronDown size={14} className={`opacity-50 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <Link href="/services" onClick={() => setDrawerOpen(false)}
                          className="flex items-center gap-2 mx-2 mt-1 mb-1 px-3 py-2 rounded-lg text-[13px] font-bold text-[#0B3D91] bg-[#F0F4FF]">
                          All services <ArrowUpRight size={12} />
                        </Link>
                        {hasMega && navCategories.map((cat) => (
                          <div key={cat._id} className="mx-2 mb-0.5">
                            <button
                              onClick={() => setMobileCatOpen((v) => v === cat._id ? null : cat._id)}
                              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-[12.5px] font-bold text-[#0B3D91] hover:bg-[#F0F4FF] transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <ServiceIcon slug={cat.slug} sanityIcon={cat.icon} size={13} strokeWidth={2} className="text-[#1254B8]" />
                                {cat.title}
                              </span>
                              <ChevronDown size={12} className={`opacity-40 transition-transform ${mobileCatOpen === cat._id ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {mobileCatOpen === cat._id && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-3">
                                  {cat.services.map((svc) => (
                                    <Link key={svc._id} href={internalPathToLinkHref(`/services/${svc.slug}`)} onClick={() => setDrawerOpen(false)}
                                      className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[#5A5955] hover:text-[#1254B8] hover:bg-[#F0F4FF] rounded-lg transition-colors">
                                      <span className="w-1 h-1 rounded-full bg-[#1254B8]/30 shrink-0" />
                                      {svc.title}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {staticLinks.slice(1).map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl font-semibold text-[14.5px] transition-colors ${isActive(l.href) ? "bg-[#1254B8]/10 text-[#1254B8]" : "text-[#1A1917] hover:bg-[#F0F4FF]"}`}>
                    {l.label} <ChevronRight size={14} className="opacity-30" />
                  </Link>
                ))}
              </div>

              <div className="px-4 pb-6 pt-3 space-y-2 border-t border-[#1254B8]/15">
                <div className="flex justify-end mb-0.5"><LanguageSwitcher /></div>
                <a href={`tel:${tc("phoneDial")}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-[14.5px]"
                  style={{ background: "linear-gradient(135deg,#1254B8,#0B3D91)" }}>
                  <Phone size={16} /> {t("callNow")}
                </a>
                <Link href="/contact" onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-[14.5px] border-2 border-[#1254B8] text-[#1254B8] hover:bg-[#1254B8] hover:text-white transition-colors">
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
