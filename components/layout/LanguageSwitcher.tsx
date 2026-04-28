"use client";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { getLocalizedSlug } from "@/lib/seo/serviceSlugMappings";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const routeParams = useParams();
  const slugParam = routeParams.slug;
  const slug = typeof slugParam === "string" ? slugParam : undefined;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const path = pathname ?? "/";
    if (slug && path.startsWith("/services/")) {
      const localizedSlug = getLocalizedSlug(slug, newLocale) || slug;
      router.replace({ pathname: "/services/[slug]", params: { slug: localizedSlug } }, { locale: newLocale });
    } else if (slug && path.startsWith("/blog/")) {
      router.replace({ pathname: "/blog/[slug]", params: { slug } }, { locale: newLocale });
    } else {
      router.replace(path as never, { locale: newLocale });
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border border-[#E8EFFE] bg-white text-[#374151] hover:text-[#2B5CE6] hover:bg-[#F0F4FF] hover:border-[#3B6CF4]/30 shadow-sm transition-all"
      >
        <Globe size={14} className="text-[#3B6CF4]" />
        {locale.toUpperCase()}
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden min-w-[8.5rem] z-50 border border-[#E8EFFE] bg-white shadow-xl"
        >
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors flex items-center justify-between ${
                l === locale ? "text-[#3B6CF4] bg-[#F0F4FF]" : "text-[#5A5955] hover:text-[#2B5CE6] hover:bg-[#F0F4FF]"
              }`}
            >
              {localeNames[l]}
              {l === locale && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B6CF4]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
