"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Phone, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import ServiceIcon from "@/components/ui/ServiceIcon";
import ServicePortableText from "@/components/portable/ServicePortableText";
import type { PortableTextBlock } from "@portabletext/types";

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
  };
  topImages?: Array<{ url: string; alt: string }>;
  relatedServices?: Array<{ slug: string; title: string }>;
}

export default function ServiceDetail({ service, topImages = [], relatedServices = [] }: ServiceDetailProps) {
  const t = useTranslations("services");
  const tc = useTranslations("common");

  const bodyBlocks = service.body && Array.isArray(service.body) ? (service.body as PortableTextBlock[]) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Magnificent Header */}
      <div className="bg-gradient-to-br from-[#F5F6FA] via-[#F5F6FA] to-white border-b border-[#E2E5EF] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#CC1414]/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D1B3E]/5 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-10 sm:pb-20 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#CC1414] text-sm font-bold tracking-wide mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> {tc("back")}
          </Link>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col gap-6 mb-6">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] flex items-center justify-center text-white shrink-0 shadow-xl"
                  style={{ background: "linear-gradient(135deg, #CC1414, #A80F0F)", boxShadow: "0 20px 40px -10px rgba(204,20,20,0.3)" }}
                >
                  <ServiceIcon slug={service.canonicalSlug ?? service.slug} sanityIcon={service.icon} size={44} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[#CC1414] text-sm font-bold uppercase tracking-[0.25em] mb-2">Premium Service</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D1B3E] leading-[1.05] font-space tracking-tight">
                    {service.title}
                  </h1>
                </div>
              </div>

              {service.shortDescription && (
                <p className="text-[#374151] text-base sm:text-lg font-medium leading-relaxed max-w-2xl border-l-4 border-[#CC1414] pl-5 bg-red-50/50 py-3 pr-4 rounded-r-xl">
                  {service.shortDescription}
                </p>
              )}
            </motion.div>

            {/* Sticky sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-[2rem] bg-white border border-[#E2E5EF] p-8 lg:sticky lg:top-28 shadow-[0_20px_40px_-15px_rgba(13,27,62,0.05)] relative z-20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#CC1414]/5 to-transparent rounded-bl-full pointer-events-none" />
              <p className="text-[#0D1B3E] text-xs font-bold uppercase tracking-[0.2em] mb-5">{t("asideKicker")}</p>
              <a
                href={`tel:${tc("phoneDial")}`}
                className="flex items-center justify-center gap-2.5 w-full text-white text-base font-bold py-4 rounded-xl hover:-translate-y-1 transition-all mb-3"
                style={{ background: "#CC1414", boxShadow: "0 12px 24px -6px rgba(204,20,20,0.3)" }}
              >
                <Phone size={18} /> {tc("callUs")}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2.5 w-full border-2 border-[#E2E5EF] text-[#0D1B3E] text-sm font-bold py-4 rounded-xl hover:border-[#CC1414] hover:text-[#CC1414] transition-colors"
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
                    className={`relative overflow-hidden rounded-2xl border border-[#E2E5EF] aspect-[4/3] ${topImages.length === 1 ? "sm:col-span-2 max-sm:aspect-[16/10]" : ""}`}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes={topImages.length === 1 ? "(max-width: 1024px) 100vw, 896px" : "(max-width: 640px) 100vw, 50vw"}
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
                <article className="bg-white rounded-2xl border border-[#E2E5EF] p-6 sm:p-8 shadow-sm">
                  <ServicePortableText value={bodyBlocks} serviceTitle={service.title} />
                </article>

                {relatedServices.length > 0 && (
                  <nav className="mt-8 bg-[#F5F6FA] rounded-2xl p-6 border border-[#E2E5EF]" aria-label={t("relatedServices")}>
                    <h2 className="text-base font-bold text-[#0D1B3E] mb-4">{t("relatedServices")}</h2>
                    <ul className="flex flex-wrap gap-2">
                      {relatedServices.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={internalPathToLinkHref(`/services/${item.slug}`)}
                            className="inline-flex items-center rounded-xl border border-[#E2E5EF] bg-white px-4 py-2 text-sm font-semibold text-[#374151] hover:border-[#CC1414]/40 hover:text-[#CC1414] transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/services" className="inline-block mt-4 text-sm font-bold text-[#CC1414] hover:underline">
                      {t("allServicesCta")} →
                    </Link>
                  </nav>
                )}

                {/* Bottom CTA */}
                <section
                  className="mt-12 rounded-[2rem] bg-gradient-to-r from-[#F5F6FA] to-white border border-[#E2E5EF] p-10 sm:p-14 shadow-lg relative overflow-hidden"
                  aria-labelledby="service-cta-heading"
                >
                  <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-[#CC1414]/10 to-transparent rounded-tl-full pointer-events-none" />
                  <div className="relative z-10">
                    <h2 id="service-cta-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E] leading-tight font-space mb-3">
                      {t("pageCtaTitle")}
                    </h2>
                    <p className="text-[#6B7280] text-base leading-relaxed mb-8 max-w-xl">{t("pageCtaSubtitle")}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`tel:${tc("phoneDial")}`}
                        className="flex items-center justify-center gap-2.5 flex-1 rounded-xl text-white font-bold py-4 text-sm transition-all hover:-translate-y-1 shadow-md"
                        style={{ background: "#CC1414", boxShadow: "0 10px 25px -5px rgba(204,20,20,0.3)" }}
                      >
                        <Phone size={18} /> {tc("phone")}
                      </a>
                      <a
                        href={`mailto:${tc("email")}`}
                        className="flex items-center justify-center gap-2.5 flex-1 rounded-xl font-bold py-4 text-sm border-2 border-[#E2E5EF] text-[#0D1B3E] hover:border-[#CC1414] hover:text-[#CC1414] transition-colors"
                      >
                        <Mail size={18} /> {tc("email")}
                      </a>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2.5 flex-1 rounded-xl font-bold py-4 text-sm bg-white border border-[#E2E5EF] text-[#0D1B3E] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                      >
                        {t("pageCtaButton")}
                        <MessageCircle size={18} />
                      </Link>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <div className="rounded-[2rem] bg-[#F5F6FA] border border-[#E2E5EF] p-12 text-center text-[#6B7280] font-medium text-lg">
                {t("guarantee")}
              </div>
            )}
          </div>

          {/* Right sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-white border border-[#E2E5EF] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-[#CC1414]" />
                <h3 className="font-bold text-[#0D1B3E] text-sm">{t("asideKicker")}</h3>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
                {service.shortDescription || t("subtitle")}
              </p>
              <a
                href={`tel:${tc("phoneDial")}`}
                className="flex items-center justify-center gap-2 text-white text-sm font-bold py-3.5 rounded-xl w-full transition-all hover:-translate-y-0.5"
                style={{ background: "#CC1414" }}
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
