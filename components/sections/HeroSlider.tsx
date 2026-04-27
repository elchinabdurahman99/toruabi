"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SLIDES = [
  {
    id: "plumber-premium-1",
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2600&h=1700&fit=crop&q=90&auto=format&fm=webp",
  },
  {
    id: "electrician-premium-1",
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=2600&h=1700&fit=crop&q=90&auto=format&fm=webp",
  },
  {
    id: "plumber-premium-2",
    src: "https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?w=2600&h=1700&fit=crop&q=90&auto=format&fm=webp",
  },
  {
    id: "electrician-premium-2",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2600&h=1700&fit=crop&q=90&auto=format&fm=webp",
  },
] as const;

const AUTO_MS = 5500;

export default function HeroSlider() {
  const t = useTranslations("hero");
  const alts = (t.raw("sliderAlts") as string[]) ?? [];
  const [index, setIndex] = useState(0);
  const n = SLIDES.length;

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + n) % n);
  }, [n]);

  useEffect(() => {
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [go]);

  return (
    <div className="relative w-full">
      <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-[#E11D48]/14 blur-xl z-0" />
      <div className="absolute -bottom-5 -left-4 w-20 h-20 rounded-full bg-[#E11D48]/12 blur-lg z-0" />

      <div
        className="relative w-full overflow-hidden rounded-[26px] z-10 border border-white/55 bg-white/22 backdrop-blur-sm
          h-[290px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[490px]"
        style={{ boxShadow: "0 22px 52px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.5)" }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={SLIDES[index].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index].src}
              alt={alts[index] ?? "torudeabi.ee — torustiku teenused Tallinnas"}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 58vw"
              priority={index === 0}
              quality={90}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(15,23,42,0.18)_100%)]" />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-white/55 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((index + 1) / n) * 100}%`,
                background: "linear-gradient(135deg, #E11D48, #BE123C)",
              }}
            />
          </div>
          <span className="text-[11px] font-bold text-white tabular-nums min-w-[36px] text-right">
            {String(index + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={
                i === index
                  ? { width: 28, background: "#E11D48" }
                  : { width: 6, background: "rgba(255,255,255,0.45)" }
              }
              aria-label={`${i + 1} / ${n}`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/40 hover:border-[#E11D48]/90 transition-all bg-white/18 backdrop-blur-sm"
          aria-label={t("sliderPrev")}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/40 hover:border-[#E11D48]/90 transition-all bg-white/18 backdrop-blur-sm"
          aria-label={t("sliderNext")}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#E11D48]/75 rounded-xl z-0 hidden sm:block" />
    </div>
  );
}
