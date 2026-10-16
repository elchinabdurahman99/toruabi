"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { useTranslations } from "next-intl";

// Resolved slide — server passes pre-computed URLs (no Sanity client in bundle)
export interface HeroSlide {
  id: string;
  src: string;
  srcMobile?: string;
  alt: string;
}

interface Props {
  slides: HeroSlide[];
}

const AUTO_MS = 5500;

export default function HeroSlider({ slides }: Props) {
  const t = useTranslations("hero");
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const n = slides.length;

  // Enable transitions only after the page is fully interactive
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + n) % n);
  }, [n]);

  useEffect(() => {
    if (!mounted || n === 0) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [go, mounted, n]);

  if (n === 0) return null;

  return (
    <div className="relative w-full">
      <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-[#E8354A]/14 blur-xl z-0" />
      <div className="absolute -bottom-5 -left-4 w-20 h-20 rounded-full bg-[#E8354A]/12 blur-lg z-0" />

      {/* Discount badge */}
      <div className="absolute -top-2.5 -left-2.5 z-30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: -5 }}
          className="flex items-center gap-1.5 bg-[#A51C2D] text-white px-2.5 py-1 rounded-lg shadow-[0_8px_30px_rgba(232,53,74,0.35)] border border-white/30 backdrop-blur-md"
        >
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider whitespace-nowrap">
            {t("stats.discountBadge")}
          </span>
        </motion.div>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[26px] z-10 border border-white/55 bg-white/22 backdrop-blur-sm
          h-[290px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[490px]"
        style={{ boxShadow: "0 22px 52px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.5)" }}
      >
        {mounted ? (
          // After mount: crossfade transitions between slides
          <AnimatePresence mode="sync">
            <motion.div
              key={slides[index].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 58vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(15,23,42,0.18)_100%)]" />
            </motion.div>
          </AnimatePresence>
        ) : (
          // SSR + first paint: static image, preloaded via <link rel="preload"> in page.tsx
          <div className="absolute inset-0">
            <Image
              src={slides[0].src}
              alt={slides[0].alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 58vw"
              priority
              quality={75}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(15,23,42,0.18)_100%)]" />
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-white/55 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((index + 1) / n) * 100}%`, background: "linear-gradient(135deg,#E8354A,#C8283C)" }}
            />
          </div>
          <span className="text-[11px] font-bold text-white tabular-nums min-w-9 text-right">
            {String(index + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
          </span>
        </div>

        {/* Dot indicators — 44×44 touch target */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className="flex items-center justify-center h-11 w-11"
              aria-label={`${i + 1} / ${n}`}
            >
              <span
                className="block h-1.5 rounded-full transition-all duration-300"
                style={i === index ? { width: 28, background: "#E8354A" } : { width: 6, background: "rgba(255,255,255,0.45)" }}
              />
            </button>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/40 hover:border-[#E8354A]/90 transition-all bg-white/18 backdrop-blur-sm"
          aria-label={t("sliderPrev")}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/40 hover:border-[#E8354A]/90 transition-all bg-white/18 backdrop-blur-sm"
          aria-label={t("sliderNext")}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#E8354A]/75 rounded-xl z-0 hidden sm:block" />
    </div>
  );
}
