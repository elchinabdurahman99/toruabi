"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { urlFor } from "@/lib/sanity/image";

interface Partner {
  _id: string;
  name: string;
  logo?: unknown;
  url?: string;
}

function LogoBox({ partner }: { partner: Partner }) {
  const inner = partner.logo ? (
    <Image
      src={urlFor(partner.logo as any).width(280).height(140).url()}
      alt={partner.name}
      width={200}
      height={100}
      className="object-contain max-h-12 w-auto max-w-[180px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
    />
  ) : (
    <p className="font-bold text-[#1254B8] text-sm px-2 text-center">{partner.name}</p>
  );

  const base =
    "group flex items-center justify-center min-h-[96px] px-6 py-4 rounded-2xl bg-white border border-[#E8EFFE] shrink-0 w-[220px] transition-all duration-300";

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:border-[#1254B8]/30 hover:shadow-[0_8px_24px_-6px_rgba(18,84,184,0.15)] hover:-translate-y-0.5`}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={`${base} hover:border-[#1254B8]/20 hover:shadow-[0_4px_16px_-4px_rgba(18,84,184,0.1)]`}>
      {inner}
    </div>
  );
}

export default function PartnersGrid({ partners }: { partners: Partner[] }) {
  const t = useTranslations("partners");

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#F0F4FF] border-b border-[#E8EFFE]">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-12">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-[#E87722]" />
              <span className="text-[#E87722] text-xs font-bold uppercase tracking-[0.25em]">
                torudeabi.ee
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D91] font-space mb-3">
              {t("title")}
            </h1>
            <p className="text-[#5A5955] font-medium mt-3 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {partners.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-[#F0F4FF] border border-dashed border-[#E8EFFE]">
            <p className="text-[#9C9B96] text-base font-medium">{t("empty")}</p>
          </div>
        ) : (
          <>
            <div className="relative rounded-3xl border border-[#E8EFFE] bg-[#F0F4FF] overflow-hidden">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-[#F0F4FF] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-[#F0F4FF] to-transparent" />

              <div className="py-10 md:py-14">
                <div className="flex w-max animate-partner-marquee hover:[animation-play-state:paused] gap-6 px-8">
                  {[...partners, ...partners].map((partner, i) => (
                    <LogoBox key={`${partner._id}-${i}`} partner={partner} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-[#9C9B96] text-sm mt-6">{t("sliderHint")}</p>
          </>
        )}
      </div>
    </div>
  );
}
