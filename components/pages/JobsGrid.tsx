"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Briefcase, DollarSign, Building2, ArrowRight, Users, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PageBanner from "@/components/ui/PageBanner";

interface JobPosting {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  location?: string;
  type?: "full-time" | "part-time" | "contract";
  department?: string;
  salary?: string;
  publishedAt?: string;
  isActive: boolean;
}

const typeColorMap: Record<string, { bg: string; text: string; border: string }> = {
  "full-time": {
    bg: "rgba(59,108,244,0.10)",
    text: "#3B6CF4",
    border: "rgba(59,108,244,0.25)",
  },
  "part-time": {
    bg: "rgba(139,63,200,0.10)",
    text: "#8B3FC8",
    border: "rgba(139,63,200,0.25)",
  },
  contract: {
    bg: "rgba(232,53,74,0.09)",
    text: "#E8354A",
    border: "rgba(232,53,74,0.22)",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" as const },
  }),
};

function TypeBadge({ type, label }: { type: string; label: string }) {
  const colors = typeColorMap[type] ?? typeColorMap["full-time"];
  return (
    <span
      className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
      style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
    >
      {label}
    </span>
  );
}

function JobCard({ job, index, applyLabel, typeLabel, t }: {
  job: JobPosting;
  index: number;
  applyLabel: string;
  typeLabel: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group rounded-2xl border bg-white/55 backdrop-blur-sm border-[#3B6CF4]/12 overflow-hidden transition-all duration-300"
      style={{
        boxShadow: hovered
          ? "0 12px 40px -8px rgba(59,108,244,0.14), 0 2px 8px -2px rgba(139,63,200,0.08)"
          : "0 2px 12px -4px rgba(59,108,244,0.06)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, #3B6CF4, #8B3FC8)",
          opacity: hovered ? 1 : 0.4,
        }}
      />

      <div className="p-6 pt-7">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-extrabold text-[#1a2a6c] text-lg leading-tight mb-2 line-clamp-2">
              {job.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.type && <TypeBadge type={job.type} label={typeLabel} />}
              {job.department && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border bg-white/60 border-[#3B6CF4]/15 text-[#5A5955]">
                  <Building2 size={9} />
                  {job.department}
                </span>
              )}
            </div>
          </div>

          {/* Icon bubble */}
          <div
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #3B6CF4, #8B3FC8)"
                : "rgba(59,108,244,0.08)",
            }}
          >
            <Briefcase
              size={18}
              style={{ color: hovered ? "#ffffff" : "#3B6CF4" }}
              className="transition-colors duration-300"
            />
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          {job.location && (
            <span className="flex items-center gap-1.5 text-[13px] text-[#5A5955] font-medium">
              <MapPin size={13} className="text-[#E8354A] shrink-0" />
              {job.location}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1.5 text-[13px] text-[#5A5955] font-medium">
              <DollarSign size={13} className="text-[#3B6CF4] shrink-0" />
              {job.salary}
            </span>
          )}
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-[#6B6F7B] text-sm leading-relaxed line-clamp-3 mb-5">
            {job.description}
          </p>
        )}

        {/* Apply button */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #E8354A 0%, #C8283C 100%)",
            boxShadow: "0 4px 14px rgba(232,53,74,0.30)",
          }}
        >
          {applyLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

function EmptyState({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-24 px-8 rounded-3xl border border-dashed border-[#8B3FC8]/20 bg-white/40 backdrop-blur-sm"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "linear-gradient(135deg, rgba(139,63,200,0.12), rgba(59,108,244,0.12))" }}
      >
        <Users size={36} style={{ color: "#8B3FC8" }} />
      </div>
      <h3 className="font-extrabold text-[#1a2a6c] text-xl mb-3">{t("joinTeam")}</h3>
      <p className="text-[#9C9B96] text-base font-medium max-w-md mx-auto mb-2">{t("empty")}</p>
      <p className="text-[#9C9B96] text-sm max-w-sm mx-auto">{t("emptyHint")}</p>
    </motion.div>
  );
}

export default function JobsGrid({ jobs }: { jobs: JobPosting[] }) {
  const t = useTranslations("jobs");

  // Collect unique departments for filter tabs
  const departments = useMemo(() => {
    const depts = Array.from(
      new Set(jobs.map((j) => j.department).filter(Boolean) as string[])
    );
    return depts;
  }, [jobs]);

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return jobs;
    return jobs.filter((j) => j.department === activeFilter);
  }, [jobs, activeFilter]);

  function typeLabel(type?: string) {
    if (type === "full-time") return t("fullTime");
    if (type === "part-time") return t("partTime");
    if (type === "contract") return t("contract");
    return type ?? "";
  }

  return (
    <div className="min-h-screen">
      <PageBanner
        kicker={t("kicker")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        accentColor="#8B3FC8"
      />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Open positions count + join CTA banner */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 p-5 rounded-2xl border border-[#3B6CF4]/12 bg-white/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(59,108,244,0.10)" }}
              >
                <Sparkles size={16} style={{ color: "#3B6CF4" }} />
              </div>
              <div>
                <p className="font-extrabold text-[#1a2a6c] text-sm">
                  {jobs.length} {t("openPositions")}
                </p>
                <p className="text-[#9C9B96] text-xs">{t("joinTeamDesc")}</p>
              </div>
            </div>
            <a
              href="mailto:info@torudeabi24.ee"
              className="text-sm font-bold text-[#3B6CF4] hover:text-[#8B3FC8] transition-colors underline underline-offset-2 whitespace-nowrap"
            >
              info@torudeabi24.ee
            </a>
          </motion.div>
        )}

        {/* Department filter tabs */}
        {departments.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {["all", ...departments].map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className="text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200"
                style={
                  activeFilter === dept
                    ? {
                        background: "linear-gradient(135deg, #3B6CF4, #8B3FC8)",
                        color: "#fff",
                        borderColor: "transparent",
                        boxShadow: "0 4px 12px rgba(59,108,244,0.25)",
                      }
                    : {
                        background: "rgba(255,255,255,0.6)",
                        color: "#5A5955",
                        borderColor: "rgba(59,108,244,0.18)",
                      }
                }
              >
                {dept === "all" ? t("filterAll") : dept}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid or Empty state */}
        {jobs.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((job, i) => (
                <JobCard
                  key={job._id}
                  job={job}
                  index={i}
                  applyLabel={t("applyNow")}
                  typeLabel={typeLabel(job.type)}
                  t={t}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #1a2a6c 0%, #3B6CF4 50%, #8B3FC8 100%)",
            boxShadow: "0 20px 60px rgba(59,108,244,0.25)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
            style={{ background: "radial-gradient(circle, #fff, transparent)" }} />
          <div className="absolute bottom-0 left-8 w-40 h-40 rounded-full opacity-10 translate-y-1/2"
            style={{ background: "radial-gradient(circle, #E8354A, transparent)" }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-2">{t("kicker")}</p>
              <h3 className="font-extrabold text-white text-2xl mb-1">{t("joinTeam")}</h3>
              <p className="text-white/70 text-sm max-w-sm">{t("joinTeamDesc")}</p>
            </div>
            <a
              href="mailto:info@torudeabi24.ee"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #E8354A, #C8283C)",
                color: "#fff",
                boxShadow: "0 6px 20px rgba(232,53,74,0.35)",
              }}
            >
              info@torudeabi24.ee
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
