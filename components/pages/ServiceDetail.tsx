"use client";

import { motion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import Phone from "lucide-react/dist/esm/icons/phone";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Mail from "lucide-react/dist/esm/icons/mail";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import ServiceIcon from "@/components/ui/ServiceIcon";
import ServicePortableText from "@/components/portable/ServicePortableText";
import type { PortableTextBlock } from "@portabletext/types";

interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceDetailProps {
  service: {
    title: string;
    slug: string;
    canonicalSlug?: string;
    shortDescription?: string;
    body?: unknown[];
    icon?: string | null;
    image?: unknown;
    gallery?: Array<{ _key?: string; alt?: string; asset?: unknown }>;
    faq?: FaqItem[];
  };
  topImages?: Array<{ url: string; alt: string }>;
  relatedServices?: Array<{ slug: string; title: string }>;
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      className="border-b border-[#E8EFFE] last:border-b-0"
      initial={false}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-colors duration-200"
            style={{
              background: isOpen ? "linear-gradient(135deg, #3B6CF4, #2B5CE6)" : "#E8EFFE",
              color: isOpen ? "#fff" : "#3B6CF4",
            }}
          >
            {index + 1}
          </span>
          <span
            className="text-sm font-semibold leading-snug transition-colors duration-200"
            style={{ color: isOpen ? "#2B5CE6" : "#1a2a6c" }}
          >
            {item.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown
            size={18}
            className="transition-colors duration-200"
            style={{ color: isOpen ? "#3B6CF4" : "#9CA3AF" }}
          />
        </motion.div>
      </button>
      <AnimateHeight isOpen={isOpen}>
        <div className="px-6 pb-5 pl-[3.75rem]">
          <p className="text-sm text-[#374151] leading-relaxed">{item.answer}</p>
        </div>
      </AnimateHeight>
    </motion.li>
  );
}

function AnimateHeight({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        opacity: isOpen ? 1 : 0,
        transition: "grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function FaqAccordion({ items, locale }: { items: FaqItem[]; locale: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => { setOpenIndex(0); }, []);
  const heading =
    locale === "et"
      ? "Korduma Kippuvad Küsimused"
      : locale === "ru"
      ? "Часто задаваемые вопросы"
      : "Frequently Asked Questions";

  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-4 px-1">
        <div
          className="w-1 h-6 rounded-full"
          style={{ background: "linear-gradient(180deg, #3B6CF4, #2B5CE6)" }}
        />
        <h2 className="text-base font-bold text-[#1a2a6c]">{heading}</h2>
      </div>
      <motion.ul
        className="rounded-2xl border border-[#E8EFFE] bg-white overflow-hidden divide-y divide-[#E8EFFE]"
        style={{ boxShadow: "0 4px 24px rgba(59,108,244,0.06)" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <FaqItem
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </motion.div>
        ))}
      </motion.ul>
    </section>
  );
}

const CITY_SUFFIX: Record<string, string> = { et: " Tallinnas", ru: " в Таллине", en: " in Tallinn" };

/** Adds the city to the H1 for local search unless the title already names a place. */
function withCity(title: string, locale: string): string {
  if (/tallin|таллин|harju|харью/i.test(title)) return title;
  return title + (CITY_SUFFIX[locale] ?? "");
}

export default function ServiceDetail({
  service,
  topImages = [],
  relatedServices = [],
}: ServiceDetailProps) {
  const t = useTranslations("services");
  const tc = useTranslations("common");
  const locale = useLocale();

  const bodyBlocks =
    service.body && Array.isArray(service.body)
      ? (service.body as PortableTextBlock[])
      : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#F0F4FF] border-b border-[#E8EFFE] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-[#3B6CF4]/6 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#2B5CE6]/4 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-10 sm:pb-20 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#5A5955] mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#3B6CF4] transition-colors font-medium">
              {locale === "et" ? "Avaleht" : locale === "ru" ? "Главная" : "Home"}
            </Link>
            <span className="text-[#C4C0BB]" aria-hidden="true">›</span>
            <Link href="/services" className="hover:text-[#3B6CF4] transition-colors font-medium">
              {locale === "et" ? "Teenused" : locale === "ru" ? "Услуги" : "Services"}
            </Link>
            <span className="text-[#C4C0BB]" aria-hidden="true">›</span>
            <span className="text-[#2B5CE6] font-semibold" aria-current="page">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col gap-5 mb-6">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] flex items-center justify-center text-white shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)",
                    boxShadow: "0 20px 40px -10px rgba(59,108,244,0.35)",
                  }}
                >
                  <ServiceIcon
                    slug={service.canonicalSlug ?? service.slug}
                    sanityIcon={service.icon}
                    size={44}
                    strokeWidth={1.8}
                  />
                </div>
                <div>
                  <p className="text-[#E8354A] text-sm font-bold uppercase tracking-[0.25em] mb-2">
                    {t("premiumBadge")}
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2B5CE6] leading-[1.05] font-space tracking-tight">
                    {withCity(service.title, locale)}
                  </h1>
                </div>
              </div>

              {service.shortDescription && (
                <p className="text-[#374151] text-base sm:text-lg font-medium leading-relaxed max-w-2xl border-l-4 border-[#3B6CF4] pl-5 bg-[#E8EFFE]/50 py-3 pr-4 rounded-r-xl">
                  {service.shortDescription}
                </p>
              )}
            </motion.div>

            {/* Sticky sidebar — top */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-[2rem] bg-white border border-[#E8EFFE] p-8 lg:sticky lg:top-28 relative z-20"
              style={{ boxShadow: "0 20px 40px -15px rgba(43,92,230,0.08)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E8EFFE] to-transparent rounded-bl-full pointer-events-none" />
              <p className="text-[#2B5CE6] text-xs font-bold uppercase tracking-[0.2em] mb-5">
                {t("asideKicker")}
              </p>
              <a
                href={`tel:${tc("phoneDial")}`}
                className="flex items-center justify-center gap-2.5 w-full text-white text-base font-bold py-4 rounded-xl hover:-translate-y-1 transition-all mb-3"
                style={{
                  background: "linear-gradient(135deg, #E8354A, #C8283C)",
                  boxShadow: "0 12px 24px -6px rgba(232,53,74,0.35)",
                }}
              >
                <Phone size={18} /> {tc("callUs")}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2.5 w-full border-2 border-[#E8EFFE] text-[#2B5CE6] text-sm font-bold py-4 rounded-xl hover:border-[#3B6CF4] hover:text-[#3B6CF4] transition-colors"
              >
                <MessageCircle size={18} /> {tc("writeUs")}
              </Link>
            </motion.aside>
          </div>

          {/* Gallery */}
          {topImages.length > 0 && (
            <section className="mt-8" aria-label={t("galleryLabel")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topImages.map((item, i) => (
                  <div
                    key={`${item.url}-${i}`}
                    className={`relative overflow-hidden rounded-2xl border border-[#E8EFFE] aspect-[4/3] ${
                      topImages.length === 1 ? "sm:col-span-2 max-sm:aspect-[16/10]" : ""
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes={
                        topImages.length === 1
                          ? "(max-width: 1024px) 100vw, 896px"
                          : "(max-width: 640px) 100vw, 50vw"
                      }
                      priority={i < 2}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-12">
          <div>
            {bodyBlocks.length > 0 ? (
              <>
                <article className="bg-white rounded-2xl border border-[#E8EFFE] p-6 sm:p-8">
                  <ServicePortableText value={bodyBlocks} serviceTitle={service.title} />
                </article>

                {Array.isArray(service.faq) && service.faq.length > 0 && (
                  <FaqAccordion items={service.faq} locale={locale} />
                )}

                {relatedServices.length > 0 && (
                  <nav
                    className="mt-8 bg-[#F0F4FF] rounded-2xl p-6 border border-[#E8EFFE]"
                    aria-label={t("relatedServices")}
                  >
                    <h2 className="text-base font-bold text-[#2B5CE6] mb-4">
                      {t("relatedServices")}
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                      {relatedServices.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={internalPathToLinkHref(`/services/${item.slug}`)}
                            className="inline-flex items-center rounded-xl border border-[#E8EFFE] bg-white px-4 py-2 text-sm font-semibold text-[#374151] hover:border-[#3B6CF4]/40 hover:text-[#3B6CF4] transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/services"
                      className="inline-block mt-4 text-sm font-bold text-[#3B6CF4] hover:underline"
                    >
                      {t("allServicesCta")} →
                    </Link>
                  </nav>
                )}

                {/* Bottom CTA */}
                <section
                  className="mt-12 rounded-[2rem] bg-[#F0F4FF] border border-[#E8EFFE] p-10 sm:p-14 relative overflow-hidden"
                  aria-labelledby="service-cta-heading"
                  style={{ boxShadow: "0 4px 24px rgba(59,108,244,0.06)" }}
                >
                  <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-[#3B6CF4]/8 to-transparent rounded-tl-full pointer-events-none" />
                  <div className="relative z-10">
                    <h2
                      id="service-cta-heading"
                      className="text-2xl sm:text-3xl font-extrabold text-[#2B5CE6] leading-tight font-space mb-3"
                    >
                      {t("pageCtaTitle")}
                    </h2>
                    <p className="text-[#5A5955] text-base leading-relaxed mb-8 max-w-xl">
                      {t("pageCtaSubtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`tel:${tc("phoneDial")}`}
                        className="flex items-center justify-center gap-2.5 flex-1 rounded-xl text-white font-bold py-4 text-sm transition-all hover:-translate-y-1"
                        style={{
                          background: "linear-gradient(135deg, #E8354A, #C8283C)",
                          boxShadow: "0 10px 25px -5px rgba(232,53,74,0.35)",
                        }}
                      >
                        <Phone size={18} /> {tc("phone")}
                      </a>
                      <a
                        href={`mailto:${tc("email")}`}
                        className="flex items-center justify-center gap-2.5 flex-1 rounded-xl font-bold py-4 text-sm border-2 border-[#E8EFFE] text-[#2B5CE6] hover:border-[#3B6CF4] hover:text-[#3B6CF4] transition-colors"
                      >
                        <Mail size={18} /> {tc("email")}
                      </a>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2.5 flex-1 rounded-xl font-bold py-4 text-sm bg-white border border-[#E8EFFE] text-[#2B5CE6] hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        {t("pageCtaButton")}
                        <MessageCircle size={18} />
                      </Link>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <div className="rounded-[2rem] bg-[#F0F4FF] border border-[#E8EFFE] p-12 text-center text-[#5A5955] font-medium text-lg">
                {t("guarantee")}
              </div>
            )}
          </div>

          {/* Right sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-white border border-[#E8EFFE] p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-[#3B6CF4]" />
                <h3 className="font-bold text-[#2B5CE6] text-sm">{t("asideKicker")}</h3>
              </div>
              <p className="text-[#5A5955] text-sm leading-relaxed mb-5">
                {service.shortDescription || t("subtitle")}
              </p>
              <a
                href={`tel:${tc("phoneDial")}`}
                className="flex items-center justify-center gap-2 text-white text-sm font-bold py-3.5 rounded-xl w-full transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)",
                  boxShadow: "0 4px 16px rgba(59,108,244,0.2)",
                }}
              >
                <Phone size={15} /> {tc("phone")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
