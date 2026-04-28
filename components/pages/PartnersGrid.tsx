"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { urlFor } from "@/lib/sanity/image";
import PageBanner from "@/components/ui/PageBanner";

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
    <p className="font-bold text-[#8B3FC8] text-sm px-2 text-center">{partner.name}</p>
  );

  const base =
    "group flex items-center justify-center min-h-[96px] px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#3B6CF4]/12 shrink-0 w-[220px] transition-all duration-300";

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:border-[#8B3FC8]/30 hover:shadow-[0_8px_24px_-6px_rgba(139,63,200,0.18)] hover:-translate-y-0.5`}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={`${base} hover:border-[#3B6CF4]/25 hover:shadow-[0_4px_16px_-4px_rgba(59,108,244,0.12)]`}>
      {inner}
    </div>
  );
}

export default function PartnersGrid({ partners }: { partners: Partner[] }) {
  const t = useTranslations("partners");

  return (
    <div className="min-h-screen">
      <PageBanner
        kicker="torudeabi.ee"
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        accentColor="#8B3FC8"
      />

      <div className="max-w-7xl mx-auto px-6 py-14">
        {partners.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-white/50 backdrop-blur-sm border border-dashed border-[#8B3FC8]/20">
            <p className="text-[#9C9B96] text-base font-medium">{t("empty")}</p>
          </div>
        ) : (
          <>
            <div className="relative rounded-3xl border border-[#8B3FC8]/15 bg-white/40 backdrop-blur-sm overflow-hidden">
              {/* Fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-white/40 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-white/40 to-transparent" />

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
