"use client";
import { motion } from "framer-motion";
import Home from "lucide-react/dist/esm/icons/home";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  kicker?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  accentColor?: string;
}

export default function PageBanner({
  kicker,
  title,
  subtitle,
  breadcrumbs,
  accentColor = "#E8354A",
}: Props) {
  const tn = useTranslations("nav");
  return (
    <div className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16">
      {/* Glow blobs */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full opacity-[0.18] blur-[80px] pointer-events-none"
        style={{ background: "#3B6CF4" }}
      />
      <motion.div
        animate={{ x: [0, -14, 10, 0], y: [0, 10, -14, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-60px] top-[-30px] h-[280px] w-[280px] rounded-full opacity-[0.14] blur-[90px] pointer-events-none"
        style={{ background: "#8B3FC8" }}
      />
      <motion.div
        animate={{ x: [0, -8, 12, 0], y: [0, 8, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 bottom-0 h-[200px] w-[200px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[70px] pointer-events-none"
        style={{ background: "#E8354A" }}
      />

      {/* Frosted underlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,63,200,0.25), rgba(59,108,244,0.25), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5A5955] mb-5 flex-wrap"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-[#E8354A] transition-colors">
              <Home size={11} /> {tn("home")}
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={10} className="opacity-40" />
                {b.href ? (
                  <Link href={b.href as any} className="hover:text-[#E8354A] transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-[#1a2a6c] font-bold">{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          {kicker && (
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-0.5 rounded-full" style={{ background: accentColor }} />
              <span className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: accentColor }}>
                {kicker}
              </span>
            </div>
          )}

          <h1
            className="font-extrabold font-space text-[#1a2a6c] mb-3"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="text-[#5A5955] text-base leading-relaxed max-w-xl mt-2">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
