"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SLIDES = [
  {
    id: "plumbing",
    src: "https://images.unsplash.com/photo-1749532125405-70950966b0e5?w=2400&h=1600&fit=crop&q=90&auto=format&fm=webp",
  },
  {
    id: "electrical",
    src: "https://images.unsplash.com/photo-1731168273756-e02cae42265b?w=2400&h=1600&fit=crop&q=90&auto=format&fm=webp",
  },
  {
    id: "renovation",
    src: "https://images.unsplash.com/photo-1772016127953-19bb88908950?w=2400&h=1600&fit=crop&q=90&auto=format&fm=webp",
  },
  {
    id: "cleaning",
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=2400&h=1600&fit=crop&q=90&auto=format&fm=webp",
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
      {/* Red corner accent */}
      <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#CC1414] rounded-2xl z-0 hidden sm:block" />

      <div
        className="relative w-full overflow-hidden rounded-2xl z-10
          h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] xl:h-[560px]"
        style={{ boxShadow: "0 20px 60px rgba(13,27,62,0.15), 0 2px 12px rgba(13,27,62,0.08)" }}
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
            {/* Light bottom fade for dots legibility */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={
                i === index
                  ? { width: 28, background: "#CC1414" }
                  : { width: 6, background: "rgba(255,255,255,0.5)" }
              }
              aria-label={`${i + 1} / ${n}`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/20 hover:border-white/50 transition-all bg-white/15 backdrop-blur-sm"
          aria-label={t("sliderPrev")}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/20 hover:border-[#CC1414]/70 transition-all bg-white/15 backdrop-blur-sm"
          aria-label={t("sliderNext")}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Navy corner accent — bottom left */}
      <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#0D1B3E] rounded-xl z-0 hidden sm:block" />
    </div>
  );
}
