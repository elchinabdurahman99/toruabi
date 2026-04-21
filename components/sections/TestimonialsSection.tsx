"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { urlFor } from "@/lib/sanity/image";

export type TestimonialItem = {
  _id: string;
  name: string;
  text?: string | null;
  rating?: number | null;
  avatar?: unknown;
};

type Props = {
  items: TestimonialItem[];
  compact?: boolean;
  showList?: boolean;
  showForm?: boolean;
};

const AVATAR_COLORS = [
  "#0B3D91",
  "#E87722",
  "#1B8E4A",
  "#7C3AED",
  "#1254B8",
  "#D97706",
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "text-[#E87722] fill-[#E87722]"
              : "text-[#E8E7E2] fill-[#E8E7E2]"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  colorIndex,
}: {
  item: TestimonialItem;
  colorIndex: number;
}) {
  const avatarUrl =
    item.avatar && typeof item.avatar === "object"
      ? urlFor(item.avatar as any)
          .width(96)
          .height(96)
          .url()
      : null;
  const r = Math.min(5, Math.max(1, item.rating ?? 5));
  const color = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col gap-4 bg-white border border-[#E8EFFE] rounded-2xl p-6 hover:shadow-[0_8px_32px_-8px_rgba(18,84,184,0.12)] hover:-translate-y-0.5 transition-all duration-300">
      <Stars rating={r} size={15} />
      <p className="text-[#5A5955] text-sm leading-relaxed flex-1 italic">
        &ldquo;{item.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-[#E8EFFE]">
        {avatarUrl ? (
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#E8EFFE] shrink-0">
            <Image src={avatarUrl} alt="" fill className="object-cover" sizes="40px" />
          </div>
        ) : (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 text-sm"
            style={{ background: color }}
          >
            {initials}
          </div>
        )}
        <div>
          <p className="font-bold text-[#0B3D91] text-sm font-space leading-tight">
            {item.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ 
  items, 
  compact = false, 
  showList = true, 
  showForm = true 
}: Props) {
  const t = useTranslations("reviews");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const n = items?.length ?? 0;
  const avg =
    n > 0
      ? (items.reduce((acc, item) => acc + (item.rating ?? 5), 0) / n).toFixed(1)
      : "5.0";

  const inputClass =
    "w-full rounded-xl px-3 py-2.5 text-sm text-[#0B3D91] border border-[#E8EFFE] bg-[#FAFAF8] focus:outline-none focus:border-[#1254B8]/50 focus:bg-white transition-colors placeholder:text-[#9C9B96]";
  const slides = useMemo(() => {
    const source = items.slice(0, 9);
    const grouped: TestimonialItem[][] = [];
    for (let i = 0; i < source.length; i += 3) grouped.push(source.slice(i, i + 3));
    return grouped;
  }, [items]);

  useEffect(() => {
    if (!showList || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [showList, slides.length]);

  useEffect(() => {
    if (slides.length === 0) setSlideIndex(0);
    else if (slideIndex > slides.length - 1) setSlideIndex(0);
  }, [slides.length, slideIndex]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setErr(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text, rating }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(typeof data.error === "string" ? data.error : t("error"));
        return;
      }
      setDone(true);
      setName("");
      setText("");
      setRating(5);
    } catch {
      setErr(t("error"));
    } finally {
      setSending(false);
    }
  }

  /* ── compact (embedded) ── */
  if (compact) {
    return (
      <section id="reviews" className="py-0 bg-transparent">
        {showList && (
          <>
            <div className="mb-5 text-left">
              <span className="inline-block text-[#E87722] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                {t("kicker")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D91] font-space mb-1">
                {t("title")}
              </h2>
              <p className="text-[#5A5955] text-sm">{t("subtitle")}</p>
            </div>

            {n > 0 && (
              <div className="flex flex-col gap-4 mb-6">
                {items.slice(0, 3).map((item, i) => (
                  <TestimonialCard key={item._id} item={item} colorIndex={i} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Compact review form */}
        {showForm && (
          <div className="rounded-2xl border border-[#E8EFFE] bg-white p-5">
            <h3 className="font-bold text-[#0B3D91] font-space text-base mb-1">
              {t("formTitle")}
            </h3>
            <p className="text-[#9C9B96] text-xs mb-4">{t("formHint")}</p>
            {done ? (
              <p className="text-[#0B3D91] font-bold text-center py-4">{t("success")}</p>
            ) : (
              <form onSubmit={submitReview} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9C9B96] block mb-1">
                    {t("yourName")}
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9C9B96] block mb-1">
                    {t("rating")}
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="rounded-lg px-2.5 py-1.5 text-sm font-bold border-2 transition-all"
                        style={
                          rating === num
                            ? {
                                borderColor: "#1254B8",
                                background: "rgba(18,84,184,0.08)",
                                color: "#1254B8",
                              }
                            : { borderColor: "#E8EFFE", background: "white", color: "#9C9B96" }
                        }
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9C9B96] block mb-1">
                    {t("yourReview")}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full text-white font-bold rounded-xl disabled:opacity-60 py-3 text-sm"
                  style={{ background: "linear-gradient(135deg, #1254B8, #0B3D91)" }}
                >
                  {sending ? "…" : t("submit")}
                </button>
              </form>
            )}
          </div>
        )}
      </section>
    );
  }

  /* ── full (non-compact) ── */
  return (
    <section id="reviews" className={`py-16 sm:py-20 ${showList ? 'bg-white' : 'bg-transparent py-0'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {showList && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-10 h-0.5 bg-[#E87722]" />
                <span className="text-[#E87722] text-xs font-bold uppercase tracking-[0.25em]">
                  {t("kicker")}
                </span>
                <span className="w-10 h-0.5 bg-[#E87722]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] font-space mb-3">
                {t("title")}
              </h2>
              <p className="text-[#5A5955] text-base max-w-lg mx-auto">{t("subtitle")}</p>
            </div>

            {/* Cards slider */}
            {n === 0 ? (
              <p className="text-center text-[#9C9B96] py-8">{t("empty")}</p>
            ) : (
              <div className="mb-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(slides[slideIndex] ?? []).map((item, i) => (
                    <TestimonialCard key={`${item._id}-${slideIndex}`} item={item} colorIndex={i} />
                  ))}
                </div>
                {slides.length > 1 ? (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSlideIndex(idx)}
                        className={`h-2.5 rounded-full transition-all ${
                          idx === slideIndex ? "w-7 bg-[#1254B8]" : "w-2.5 bg-[#1254B8]/25 hover:bg-[#1254B8]/45"
                        }`}
                        aria-label={`Go to review slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            {/* Rating summary */}
            {n > 0 && (
              <div className="bg-[#F0F4FF] rounded-3xl border border-[#E8EFFE] p-8 sm:p-10 flex flex-col items-center gap-3 mb-12">
                <span className="text-6xl font-black text-[#0B3D91] font-space leading-none">
                  {avg}
                </span>
                <Stars rating={Math.round(Number(avg))} size={22} />
                <p className="text-[#9C9B96] text-sm font-medium">
                  Põhineb {n}+ kliendi hinnangul
                </p>
              </div>
            )}
          </>
        )}

        {/* Review submission form */}
        {showForm && (
          <div className={`max-w-xl mx-auto bg-white border border-[#E8EFFE] rounded-2xl p-6 sm:p-8 ${!showList ? 'shadow-lg' : ''}`}>
            <h3 className="font-bold text-[#0B3D91] font-space text-lg mb-1.5">
              {t("formTitle")}
            </h3>
            <p className="text-[#9C9B96] text-sm mb-5">{t("formHint")}</p>
            {done ? (
              <p className="text-[#0B3D91] font-bold text-center py-6 text-lg">
                {t("success")}
              </p>
            ) : (
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9C9B96] block mb-1">
                    {t("yourName")}
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9C9B96] block mb-1">
                    {t("rating")}
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="rounded-lg px-3 py-2 text-sm font-bold border-2 transition-all"
                        style={
                          rating === num
                            ? {
                                borderColor: "#1254B8",
                                background: "rgba(18,84,184,0.08)",
                                color: "#1254B8",
                              }
                            : { borderColor: "#E8EFFE", background: "white", color: "#9C9B96" }
                        }
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9C9B96] block mb-1">
                    {t("yourReview")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full text-white font-bold rounded-xl disabled:opacity-60 py-3.5 text-sm"
                  style={{
                    background: "linear-gradient(135deg, #1254B8, #0B3D91)",
                    boxShadow: "0 4px 16px rgba(18,84,184,0.2)",
                  }}
                >
                  {sending ? "…" : t("submit")}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
