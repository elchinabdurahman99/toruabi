"use client";

import { motion } from "framer-motion";
import Home from "lucide-react/dist/esm/icons/home";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Phone from "lucide-react/dist/esm/icons/phone";
import Wrench from "lucide-react/dist/esm/icons/wrench";
import Zap from "lucide-react/dist/esm/icons/zap";
import Droplets from "lucide-react/dist/esm/icons/droplets";
import { Link } from "@/i18n/navigation";
import BrandLogo from "@/components/ui/BrandLogo";

const floatingIcons = [
  { Icon: Wrench,   x: "8%",  y: "20%", delay: 0,   size: 28, opacity: 0.12 },
  { Icon: Zap,      x: "88%", y: "15%", delay: 0.3, size: 22, opacity: 0.10 },
  { Icon: Droplets, x: "80%", y: "75%", delay: 0.6, size: 26, opacity: 0.12 },
  { Icon: Wrench,   x: "5%",  y: "72%", delay: 0.9, size: 20, opacity: 0.08 },
  { Icon: Zap,      x: "50%", y: "8%",  delay: 1.2, size: 18, opacity: 0.09 },
  { Icon: Droplets, x: "92%", y: "48%", delay: 1.5, size: 24, opacity: 0.11 },
];

type Props = {
  heading: string;
  body: string;
  goHome: string;
  allServices: string;
  emergency: string;
  phone: string;
  phoneDial: string;
  logoUrl?: string;
};

export default function NotFoundPage({
  heading,
  body,
  goHome,
  allServices,
  emergency,
  phone,
  phoneDial,
  logoUrl,
}: Props) {
  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fdf0f3 50%, #f0f4ff 100%)" }}
    >
      {/* Background blobs */}
      <div className="hero-blob-1 absolute -left-32 -top-16 h-[500px] w-[500px] rounded-full opacity-[0.18] blur-[120px] pointer-events-none" style={{ background: "#3B6CF4" }} />
      <div className="hero-blob-2 absolute right-[-80px] bottom-[-40px] h-[450px] w-[450px] rounded-full opacity-[0.14] blur-[100px] pointer-events-none" style={{ background: "#E8354A" }} />
      <div className="hero-blob-3 absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[80px] pointer-events-none" style={{ background: "#8B3FC8" }} />

      {/* Mesh grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="grid404" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0L0 0 0 48" fill="none" stroke="#3B6CF4" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid404)" />
      </svg>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size, opacity }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay, duration: 0.6 },
            scale: { delay, duration: 0.6 },
            y: { delay, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon size={size} className="text-[#3B6CF4]" />
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <div
          className="rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.85)",
            boxShadow: "0 40px 80px rgba(59,108,244,0.14), 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Link href="/" aria-label="Go home">
              <BrandLogo variant="nav" logoUrl={logoUrl} />
            </Link>
          </motion.div>

          {/* 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-4 select-none"
          >
            <span
              className="font-black font-space leading-none"
              style={{
                fontSize: "clamp(5rem, 18vw, 9rem)",
                background: "linear-gradient(135deg, #3B6CF4 0%, #E8354A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 4px 24px rgba(59,108,244,0.25))",
              }}
            >
              404
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-0.5 w-16 mx-auto mb-6 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg, #3B6CF4, #E8354A)" }}
          />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a2a6c] font-space mb-3">
              {heading}
            </h1>
            <p className="text-[#5A5955] text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
              {body}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 font-bold text-sm text-white px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#3B6CF4,#2B5CE6)", boxShadow: "0 8px 24px rgba(59,108,244,0.35)" }}
            >
              <Home size={16} />
              {goHome}
            </Link>
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 font-bold text-sm text-[#3B6CF4] px-6 py-3.5 rounded-xl border-2 border-[#3B6CF4]/25 hover:border-[#3B6CF4] hover:bg-[#3B6CF4]/5 transition-all hover:-translate-y-0.5"
            >
              <ArrowLeft size={16} />
              {allServices}
            </Link>
          </motion.div>

          {/* Emergency strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-[#3B6CF4]/10"
          >
            <p className="text-[10px] font-bold text-[#5A5955] uppercase tracking-[0.2em] mb-2">
              {emergency}
            </p>
            <a
              href={`tel:${phoneDial}`}
              className="inline-flex items-center gap-2 font-black text-[#E8354A] text-sm hover:scale-105 transition-transform"
            >
              <Phone size={14} />
              {phone}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 pointer-events-none"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full"
            style={{ background: i === 2 ? "#E8354A" : "#3B6CF4", opacity: i === 2 ? 0.5 : 0.2 }}
            animate={{ height: [8, 20, 8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
