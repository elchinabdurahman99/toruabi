"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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
};

const AUTO_MS = 6000;

function AverageRating({ items }: { items: TestimonialItem[] }) {
  const n = items.length;
  if (n === 0) return null;
  const avg = (items.reduce((acc, item) => acc + (item.rating ?? 5), 0) / n).toFixed(1);
  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={15} className={i <= Math.round(Number(avg)) ? "text-[#CC1414] fill-[#CC1414]" : "text-[#E2E5EF] fill-[#E2E5EF]"} />
        ))}
      </div>
      <span className="text-sm font-bold text-[#0D1B3E]">{avg} / 5</span>
    </div>
  );
}

export default function TestimonialsSection({ items, compact = false }: Props) {
  const t = useTranslations("reviews");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const n = items?.length ?? 0;
  const [index, setIndex] = useState(0);

  const go = useCallback((delta: number) => {
    if (n <= 0) return;
    setIndex((i) => (i + delta + n) % n);
  }, [n]);

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [n, go]);

  useEffect(() => {
    setIndex((i) => (n === 0 ? 0 : Math.min(i, n - 1)));
  }, [n]);

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
      if (!res.ok) { setErr(typeof data.error === "string" ? data.error : t("error")); return; }
      setDone(true);
      setName(""); setText(""); setRating(5);
    } catch { setErr(t("error")); }
    finally { setSending(false); }
  }

  const inputClass = "w-full rounded-xl px-3 py-2.5 text-sm text-[#0D1B3E] border border-[#E2E5EF] bg-white focus:outline-none focus:border-[#CC1414]/50 transition-colors placeholder:text-[#9CA3AF]";

  return (
    <section id="reviews" className={compact ? "py-0 bg-transparent" : "py-16 sm:py-20 bg-[#F5F6FA] border-y border-[#E2E5EF]"}>
      <div className={compact ? "" : "max-w-7xl mx-auto px-6"}>
        <div className={`${compact ? "mb-5 text-left" : "mb-10 text-center max-w-2xl mx-auto"}`}>
          <span className={`inline-block text-[#CC1414] text-xs font-bold uppercase tracking-[0.2em] ${compact ? "mb-2" : "mb-3"}`}>
            {t("kicker")}
          </span>
          <h2 className={`font-extrabold text-[#0D1B3E] font-space ${compact ? "text-2xl sm:text-3xl mb-1" : "text-3xl sm:text-4xl mb-2"}`}>
            {t("title")}
          </h2>
          <p className={`text-[#6B7280] ${compact ? "text-sm" : "text-base"}`}>{t("subtitle")}</p>
          {n > 0 && <AverageRating items={items} />}
        </div>

        {/* Carousel */}
        <div className={`${compact ? "mb-6" : "mb-10 max-w-2xl mx-auto"}`}>
          {n === 0 ? (
            <p className="text-center text-[#9CA3AF] py-8">{t("empty")}</p>
          ) : (
            <div className="relative" role="region" aria-roledescription="carousel" aria-label={t("title")}>
              <div className={`overflow-hidden border border-[#E2E5EF] bg-white ${compact ? "rounded-2xl" : "rounded-2xl"} shadow-sm`}>
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {items.map((item, slideIdx) => {
                    const avatarUrl = item.avatar && typeof item.avatar === "object"
                      ? urlFor(item.avatar as any).width(96).height(96).url()
                      : null;
                    const r = Math.min(5, Math.max(1, item.rating ?? 5));
                    return (
                      <article
                        key={item._id}
                        className={`w-full shrink-0 flex flex-col gap-3 ${compact ? "py-4 px-10 sm:px-12" : "py-6 px-12 sm:px-14"}`}
                        aria-hidden={slideIdx !== index}
                      >
                        <div className="flex items-center gap-3">
                          {avatarUrl ? (
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#E2E5EF] shrink-0">
                              <Image src={avatarUrl} alt="" fill className="object-cover" sizes="44px" />
                            </div>
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-[#CC1414] flex items-center justify-center font-bold text-white shrink-0 text-base">
                              {item.name?.charAt(0) ?? "?"}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-[#0D1B3E] text-sm font-space">{item.name}</p>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} size={13} className={j < r ? "text-[#CC1414] fill-[#CC1414]" : "text-[#E2E5EF] fill-[#E2E5EF]"} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-[#374151] text-sm leading-relaxed">{item.text}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl border border-[#E2E5EF] bg-white shadow-sm flex items-center justify-center text-[#6B7280] hover:text-[#CC1414] hover:border-[#CC1414]/30 transition-all z-10"
                    aria-label={t("prevReview")}
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl border border-[#E2E5EF] bg-white shadow-sm flex items-center justify-center text-[#6B7280] hover:text-[#CC1414] hover:border-[#CC1414]/30 transition-all z-10"
                    aria-label={t("nextReview")}
                  >
                    <ChevronRight size={17} />
                  </button>
                  <div className="flex justify-center gap-2 mt-3">
                    {items.map((item, i) => (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-7 bg-[#CC1414]" : "w-1.5 bg-[#E2E5EF]"}`}
                        aria-label={`${i + 1} / ${n}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Review form */}
        <div className={`rounded-2xl border border-[#E2E5EF] bg-white ${compact ? "p-5" : "max-w-xl mx-auto p-6 sm:p-8"}`}>
          <h3 className={`font-bold text-[#0D1B3E] font-space ${compact ? "text-base mb-1" : "text-lg mb-1.5"}`}>{t("formTitle")}</h3>
          <p className={`text-[#9CA3AF] ${compact ? "text-xs mb-4" : "text-sm mb-5"}`}>{t("formHint")}</p>
          {done ? (
            <p className="text-[#0D1B3E] font-bold text-center py-4">{t("success")}</p>
          ) : (
            <form onSubmit={submitReview} className={compact ? "space-y-3" : "space-y-4"}>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-1">{t("yourName")}</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-1">{t("rating")}</label>
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="rounded-lg px-2.5 py-1.5 text-sm font-bold border-2 transition-all"
                      style={
                        rating === num
                          ? { borderColor: "#CC1414", background: "rgba(204,20,20,0.08)", color: "#CC1414" }
                          : { borderColor: "#E2E5EF", background: "white", color: "#9CA3AF" }
                      }
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-1">{t("yourReview")}</label>
                <textarea required rows={3} value={text} onChange={(e) => setText(e.target.value)} className={`${inputClass} resize-none`} />
              </div>
              {err && <p className="text-red-600 text-sm">{err}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full text-white font-bold rounded-xl disabled:opacity-60 py-3 text-sm"
                style={{ background: "#CC1414" }}
              >
                {sending ? "…" : t("submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
