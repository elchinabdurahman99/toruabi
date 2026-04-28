"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  MapPin,
  CalendarDays,
  Wrench,
  Zap,
  Bath,
  Paintbrush,
  Flame,
  SprayCan,
  Building2,
  Ruler,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface WorkHighlight {
  label: string;
  value: string;
}

export interface WorkProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  serviceType?: string;
  location?: string;
  completedAt?: string;
  mainImage?: {
    asset?: { _ref?: string; url?: string };
    hotspot?: unknown;
    crop?: unknown;
    alt?: string;
  };
  highlights?: WorkHighlight[];
  isPublished?: boolean;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_PROJECTS: WorkProject[] = [
  {
    _id: "mock-1",
    title: "Torustiku täielik vahetus Kristiines",
    slug: "torustiku-vahetus-kristiine",
    shortDescription:
      "Vanaaegse terastorusiku asendamine kaasaegse PP-torustikuga. Töö hõlmas kõiki vertikaalseid ja horisontaalseid trassid.",
    serviceType: "plumbing",
    location: "Tallinn, Kristiine",
    completedAt: "2025-11-10T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80" },
      alt: "PP torustiku paigaldus Kristiines",
    },
    highlights: [
      { label: "Kestus", value: "3 päeva" },
      { label: "Materjal", value: "PP torustik" },
      { label: "Pindala", value: "72 m²" },
    ],
  },
  {
    _id: "mock-2",
    title: "Elektriseadmete uuendus Ülemiste ärimajas",
    slug: "elektriseadmete-uuendus-ulemiste",
    shortDescription:
      "Vananenud elektrijuhtmestiku täielik asendamine, kilpide uuendamine ja LED-valgustuse paigaldus kolmekorruselises ärimajas.",
    serviceType: "electrical",
    location: "Tallinn, Ülemiste",
    completedAt: "2025-10-05T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
      alt: "Elektritööd Ülemiste ärimajas",
    },
    highlights: [
      { label: "Kestus", value: "5 päeva" },
      { label: "Paneelid", value: "4 tk" },
      { label: "Valgustid", value: "LED 48 tk" },
    ],
  },
  {
    _id: "mock-3",
    title: "Vannitoa kompleksremont Mustamäel",
    slug: "vannitoa-remont-mustamae",
    shortDescription:
      "Terviklik vannitoa renoveerimine: plaatimine, sanitaartehnika vahetus, sooja põranda paigaldus ja kaasaegne ventilatsioon.",
    serviceType: "bathroom",
    location: "Tallinn, Mustamäe",
    completedAt: "2025-09-20T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80" },
      alt: "Renoveeritud vannituba Mustamäel",
    },
    highlights: [
      { label: "Kestus", value: "8 päeva" },
      { label: "Pindala", value: "6,5 m²" },
      { label: "Garantii", value: "2 aastat" },
    ],
  },
  {
    _id: "mock-4",
    title: "Karkassmaja ehitus Piritale",
    slug: "karkassmaja-ehitus-pirita",
    shortDescription:
      "Ühepereelamule karkassehituse teostamine: vundament, seinad, katus ja välisviimistlus avturneeritud lahendusega.",
    serviceType: "construction",
    location: "Tallinn, Pirita",
    completedAt: "2025-07-15T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80" },
      alt: "Karkassmaja ehitus Pirita",
    },
    highlights: [
      { label: "Kestus", value: "45 päeva" },
      { label: "Pindala", value: "180 m²" },
      { label: "Korruseid", value: "2" },
    ],
  },
  {
    _id: "mock-5",
    title: "Korterirenoveerimine Lasnamäel",
    slug: "korteri-renoveerimine-lasnamae",
    shortDescription:
      "3-toalise korteri täielik renoveerimine: uued põrandad, laed, sisseehitatud mööbel ja kaasaegne köögitehnika.",
    serviceType: "renovation",
    location: "Tallinn, Lasnamäe",
    completedAt: "2025-06-01T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" },
      alt: "Renoveeritud korter Lasnamäel",
    },
    highlights: [
      { label: "Kestus", value: "21 päeva" },
      { label: "Pindala", value: "78 m²" },
      { label: "Toad", value: "3" },
    ],
  },
  {
    _id: "mock-6",
    title: "Plaatimistööd Kalamaja saunamajas",
    slug: "plaatimistood-kalamaja",
    shortDescription:
      "Spaa-taseme plaatimistööd: põrand, seinad ja lagi. Kasutatud itaalia portselanplaadid, soe põrand kogu alal.",
    serviceType: "bathroom",
    location: "Tallinn, Kalamaja",
    completedAt: "2025-04-18T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80" },
      alt: "Plaatimistööd Kalamaja saunamajas",
    },
    highlights: [
      { label: "Kestus", value: "4 päeva" },
      { label: "Plaadid", value: "IT portselan" },
      { label: "Pindala", value: "28 m²" },
    ],
  },
  {
    _id: "mock-7",
    title: "Interjööridesain ja remont Kesklinn",
    slug: "interjooridesain-kesklinn",
    shortDescription:
      "Penthouse-korteri sisekujunduslahendus ja täielik remont: avatud plaan, luksuslikud viimistlusmaterjalid ja nutimaja lahendus.",
    serviceType: "design",
    location: "Tallinn, Kesklinn",
    completedAt: "2025-02-28T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" },
      alt: "Penthouse interjöör Tallinnas",
    },
    highlights: [
      { label: "Kestus", value: "60 päeva" },
      { label: "Pindala", value: "145 m²" },
      { label: "Stiil", value: "Skandinaavia" },
    ],
  },
  {
    _id: "mock-8",
    title: "Ärihoone fassaadiremont Vanalinn",
    slug: "arihoone-fassaad-vanalinn",
    shortDescription:
      "Ajaloolise ärihoone välisfassaadi renoveerimine: krohv, soojustus ja akende vahetus energia­tõhususe parandamiseks.",
    serviceType: "construction",
    location: "Tallinn, Vanalinn",
    completedAt: "2024-12-10T00:00:00Z",
    mainImage: {
      asset: { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
      alt: "Ärihoone fassaadiremont Vanalinnas",
    },
    highlights: [
      { label: "Kestus", value: "15 päeva" },
      { label: "Fassaad", value: "320 m²" },
      { label: "Aknad", value: "24 tk" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Service type config
// ---------------------------------------------------------------------------
const SERVICE_CONFIG: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  plumbing: {
    icon: <Wrench size={13} />,
    color: "#3B6CF4",
    bg: "rgba(59,108,244,0.12)",
  },
  electrical: {
    icon: <Zap size={13} />,
    color: "#F4A23B",
    bg: "rgba(244,162,59,0.12)",
  },
  bathroom: {
    icon: <Bath size={13} />,
    color: "#8B3FC8",
    bg: "rgba(139,63,200,0.12)",
  },
  renovation: {
    icon: <Paintbrush size={13} />,
    color: "#E8354A",
    bg: "rgba(232,53,74,0.12)",
  },
  gas: {
    icon: <Flame size={13} />,
    color: "#F46B3B",
    bg: "rgba(244,107,59,0.12)",
  },
  cleaning: {
    icon: <SprayCan size={13} />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.12)",
  },
  construction: {
    icon: <Building2 size={13} />,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.12)",
  },
  design: {
    icon: <Ruler size={13} />,
    color: "#EC4899",
    bg: "rgba(236,72,153,0.12)",
  },
  other: {
    icon: <MoreHorizontal size={13} />,
    color: "#6B7280",
    bg: "rgba(107,114,128,0.12)",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function imageUrl(project: WorkProject): string | null {
  const asset = project.mainImage?.asset as { _ref?: string; url?: string } | undefined;
  if (!asset) return null;
  if (asset.url) return asset.url;
  // Sanity CDN URL from _ref
  if (asset._ref) {
    const ref = asset._ref as string;
    const [, id, dimensions, format] = ref.match(/image-([^-]+(?:-[^-]+)*)-(\d+x\d+)-(\w+)$/) || [];
    if (id && dimensions && format) {
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`;
    }
  }
  return null;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("et-EE", { year: "numeric", month: "short" });
}

function safeServiceTypeLabel(type: string, t: ReturnType<typeof useTranslations>) {
  try {
    return t(`serviceTypes.${type}` as never);
  } catch {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

// ---------------------------------------------------------------------------
// Project Card
// ---------------------------------------------------------------------------
function ProjectCard({ project, t }: { project: WorkProject; t: ReturnType<typeof useTranslations> }) {
  const [hovered, setHovered] = useState(false);
  const cfg = SERVICE_CONFIG[project.serviceType ?? "other"] ?? SERVICE_CONFIG.other;
  const imgSrc = imageUrl(project);
  const dateStr = formatDate(project.completedAt);
  const serviceLabel = project.serviceType ? safeServiceTypeLabel(project.serviceType, t) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group relative bg-white/55 backdrop-blur-sm border border-[#3B6CF4]/12 rounded-2xl overflow-hidden"
      style={{
        boxShadow: hovered
          ? "0 16px 48px rgba(59,108,244,0.15), 0 4px 16px rgba(0,0,0,0.08)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0f2fa]">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={project.mainImage?.alt ?? project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <Building2 size={48} />
          </div>
        )}

        {/* Gradient overlay always present */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Service type badge */}
        {serviceLabel && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
          >
            {cfg.icon}
            {serviceLabel}
          </div>
        )}

        {/* Hover overlay: title + description */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col justify-end p-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,20,60,0.88) 0%, rgba(10,20,60,0.55) 60%, transparent 100%)",
              }}
            >
              <p className="text-white font-bold text-sm leading-snug font-space mb-1">
                {project.title}
              </p>
              {project.shortDescription && (
                <p className="text-white/75 text-xs leading-relaxed line-clamp-2">
                  {project.shortDescription}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-bold text-[#1a2a6c] text-sm leading-snug mb-1 font-space line-clamp-2 group-hover:text-[#3B6CF4] transition-colors">
          {project.title}
        </h3>

        {/* Location + date row */}
        <div className="flex items-center gap-3 text-[11px] text-[#5A5955] mt-1.5 flex-wrap">
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-[#E8354A] shrink-0" />
              {project.location}
            </span>
          )}
          {dateStr && (
            <span className="flex items-center gap-1">
              <CalendarDays size={11} className="text-[#3B6CF4] shrink-0" />
              {dateStr}
            </span>
          )}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#3B6CF4]/10 flex flex-wrap gap-x-3 gap-y-1">
            {project.highlights.map((h, i) => (
              <span key={i} className="text-[11px] text-[#5A5955]">
                <span className="font-semibold text-[#1a2a6c]">{h.label}:</span>{" "}
                {h.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface Props {
  projects: WorkProject[];
}

export default function WorksGrid({ projects }: Props) {
  const t = useTranslations("works");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Use mock data if no real projects
  const data = projects.length > 0 ? projects : MOCK_PROJECTS;

  // Build filter tabs from available service types
  const tabs = useMemo(() => {
    const types = Array.from(new Set(data.map((p) => p.serviceType).filter(Boolean) as string[]));
    return types;
  }, [data]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return data;
    return data.filter((p) => p.serviceType === activeFilter);
  }, [data, activeFilter]);

  return (
    <div>
      {/* Page Banner */}
      <PageBanner
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
        accentColor="#E8354A"
        breadcrumbs={[{ label: t("title") }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveFilter("all")}
            className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
            style={
              activeFilter === "all"
                ? {
                    background: "linear-gradient(135deg, #3B6CF4, #8B3FC8)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(59,108,244,0.3)",
                  }
                : {
                    background: "rgba(255,255,255,0.6)",
                    color: "#1a2a6c",
                    border: "1px solid rgba(59,108,244,0.15)",
                  }
            }
          >
            {t("filterAll")}
            <span className="ml-1.5 opacity-60">({data.length})</span>
          </button>

          {tabs.map((type) => {
            const count = data.filter((p) => p.serviceType === type).length;
            const cfg = SERVICE_CONFIG[type] ?? SERVICE_CONFIG.other;
            const isActive = activeFilter === type;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: cfg.color,
                        color: "#fff",
                        boxShadow: `0 4px 16px ${cfg.color}40`,
                      }
                    : {
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}25`,
                      }
                }
              >
                {cfg.icon}
                {safeServiceTypeLabel(type, t)}
                <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Project count */}
        <p className="text-xs text-[#5A5955] mb-6">
          {filtered.length}{" "}
          {t("projectCount", { count: filtered.length }).replace(
            filtered.length.toString(),
            ""
          ).trim() || "projekti"}
        </p>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #8B3FC8 0%, #3B6CF4 100%)",
            boxShadow: "0 24px 64px rgba(139,63,200,0.3)",
          }}
        >
          {/* Background blobs */}
          <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">
              {t("kicker")}
            </p>
            <h2 className="text-white font-extrabold font-space text-2xl sm:text-3xl mb-3 leading-tight">
              {t("ctaTitle")}
            </h2>
            <p className="text-white/75 text-base mb-8 max-w-lg mx-auto">
              {t("ctaSubtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #E8354A, #C8283C)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(232,53,74,0.45)",
              }}
            >
              {t("ctaButton")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
