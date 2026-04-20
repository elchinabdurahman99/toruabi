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
      className="object-contain max-h-12 w-auto max-w-[180px]"
    />
  ) : (
    <p className="font-bold text-[#0D1B3E] text-sm px-2 text-center">{partner.name}</p>
  );

  const base = "flex items-center justify-center min-h-[96px] px-6 py-4 rounded-2xl bg-white border border-[#E2E5EF] shrink-0 w-[220px] transition-all duration-200";

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:border-[#CC1414]/40 hover:shadow-md`}
      >
        {inner}
      </a>
    );
  }
  return <div className={base}>{inner}</div>;
}

export default function PartnersGrid({ partners }: { partners: Partner[] }) {
  const t = useTranslations("partners");

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#F5F6FA] border-b border-[#E2E5EF]">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[#CC1414] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              torudeabi.ee
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B3E] font-space">
              {t("title")}
            </h1>
            <p className="text-[#6B7280] font-medium mt-3 max-w-2xl leading-relaxed">{t("subtitle")}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {partners.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-[#F5F6FA] border border-dashed border-[#E2E5EF]">
            <p className="text-[#9CA3AF] text-base font-medium">{t("empty")}</p>
          </div>
        ) : (
          <>
            <div className="relative rounded-2xl border border-[#E2E5EF] bg-[#F5F6FA] overflow-hidden shadow-sm">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#F5F6FA] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#F5F6FA] to-transparent" />

              <div className="py-10 md:py-12">
                <div className="flex w-max animate-partner-marquee hover:[animation-play-state:paused] gap-6 px-8">
                  {[...partners, ...partners].map((partner, i) => (
                    <LogoBox key={`${partner._id}-${i}`} partner={partner} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-[#9CA3AF] text-sm mt-6">{t("sliderHint")}</p>
          </>
        )}
      </div>
    </div>
  );
}
