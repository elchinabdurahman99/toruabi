"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Send, CheckCircle, Paperclip,
  Info, AlertCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

type ContactProps = { compact?: boolean };

const MAX_BYTES_PER_FILE = 12 * 1024 * 1024;
const LARGE_FALLBACK_BYTES = 2 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl px-3.5 py-2.5 text-sm text-[#2B5CE6] border border-[#E8EFFE] bg-white/50 focus:outline-none focus:border-[#3B6CF4]/50 focus:bg-white transition-all placeholder:text-[#9C9B96]";

const labelClass = "text-[#5A5955] text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5";

export default function Contact({ compact = false }: ContactProps) {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number }[]>([]);
  const [clientFileError, setClientFileError] = useState<string | null>(null);
  const [showLargeFileFallback, setShowLargeFileFallback] = useState(false);
  const contactItems = [
    {
      icon: Phone,
      label: t("info.phone"),
      value: tc("phone"),
      sub: t("info.phoneSub"),
      href: `tel:${tc("phoneDial")}`,
    },
    {
      icon: Phone,
      label: "Lauatelefon",
      value: tc("phone2"),
      sub: tc("phone2"),
      href: `tel:${String(tc("phone2")).replace(/\s+/g, "")}`,
    },
    {
      icon: Mail,
      label: t("info.email"),
      value: tc("email"),
      sub: t("info.hoursValue"),
      href: `mailto:${tc("email")}`,
    },
    {
      icon: MapPin,
      label: t("info.address"),
      value: tc("address"),
      sub: t("info.area"),
    },
  ];

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setFileMeta(files.map((f) => ({ name: f.name, size: f.size })));
    setClientFileError(null);
    setShowLargeFileFallback(false);
    const tooBig = files.find((f) => f.size > MAX_BYTES_PER_FILE);
    if (tooBig) setClientFileError(t("form.fileTooLarge"));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowLargeFileFallback(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const files = fd.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);
    if (files.some((f) => f.size > MAX_BYTES_PER_FILE)) {
      setClientFileError(t("form.fileTooLarge"));
      setLoading(false);
      return;
    }
    const hasLargeForFallback = files.some((f) => f.size > LARGE_FALLBACK_BYTES);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({} as Record<string, unknown>));
      if (!res.ok) {
        const msg =
          data.code === "FILE_TOO_LARGE"
            ? t("form.fileTooLarge")
            : typeof data.error === "string"
              ? data.error
              : t("form.error");
        setError(msg);
        if (
          hasLargeForFallback ||
          (typeof data.suggestEmailFallback === "boolean" && data.suggestEmailFallback)
        ) {
          setShowLargeFileFallback(true);
        }
        return;
      }
      setSubmitted(true);
      form.reset();
      setFileMeta([]);
      setClientFileError(null);
    } catch {
      setError(t("form.error"));
      if (hasLargeForFallback) setShowLargeFileFallback(true);
    } finally {
      setLoading(false);
    }
  };

  /* ─── Compact (embedded) ─────────────────────────────────── */
  if (compact) {
    return (
      <section id="contact" className="py-0 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B5CE6] font-space mb-1">
            {t("title")}
          </h2>
          <p className="text-[#5A5955] text-sm max-w-xl">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-5">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl flex gap-3 items-start border border-[#E8EFFE] bg-white hover:border-[#3B6CF4]/30 hover:shadow-sm transition-all p-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E8EFFE] flex items-center justify-center shrink-0 text-[#3B6CF4]">
                  <item.icon size={14} />
                </div>
                <div>
                  <p className="text-[#9C9B96] text-[10px] font-bold uppercase tracking-widest mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#2B5CE6] font-bold text-sm hover:text-[#3B6CF4] transition-colors block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#2B5CE6] font-bold text-sm">{item.value}</p>
                  )}
                  <p className="text-[#9C9B96] text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CompactForm
              submitted={submitted}
              loading={loading}
              error={error}
              fileMeta={fileMeta}
              clientFileError={clientFileError}
              showLargeFileFallback={showLargeFileFallback}
              handleSubmit={handleSubmit}
              handleFilesChange={handleFilesChange}
              t={t}
              tc={tc}
              inputClass={inputClass}
              labelClass={labelClass}
            />
          </motion.div>
        </div>
      </section>
    );
  }

  /* ─── Full (non-compact) ─────────────────────────────────── */
  return (
    <section id="contact" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 20px 60px -15px rgba(43,92,230,0.12)" }}
        >
          <div className="grid lg:grid-cols-[5fr_7fr]">
            {/* Left: Purple gradient info panel */}
            <div
              className="p-8 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col gap-8"
              style={{ background: "linear-gradient(145deg, #1A4FD6 0%, #2B5CE6 50%, #3B6CF4 100%)" }}
            >
              {/* Decorative glows */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#E8354A]/20 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-8 h-0.5 bg-[#E8354A]" />
                  <span className="text-[#E8354A] text-xs font-bold uppercase tracking-[0.25em]">
                    {t("kicker") || "KONTAKT"}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-space mb-4 leading-tight">
                  {t("title")}
                </h2>
                <p className="text-white/65 text-base leading-relaxed">{t("subtitle")}</p>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-3.5 items-center bg-white/10 rounded-xl px-4 py-3.5 border border-white/10 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white font-bold text-sm hover:text-[#E8354A] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-bold text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: White form panel */}
            <div className="bg-white/60 backdrop-blur-md p-8 sm:p-10 lg:p-12">
              <h3 className="text-2xl font-extrabold text-[#2B5CE6] font-space mb-2">
                {t("form.title")}
              </h3>
              <p className="text-[#9C9B96] text-sm mb-7">
                {t("form.hint")}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-[#E8EFFE] bg-white/50 backdrop-blur-sm text-center p-12 flex flex-col items-center gap-5"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)" }}
                  >
                    <CheckCircle size={30} className="text-white" />
                  </div>
                  <h4 className="font-bold text-[#2B5CE6] font-space text-2xl">
                    {t("form.success")}
                  </h4>
                  <a
                    href={`tel:${tc("phoneDial")}`}
                    className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl"
                    style={{ background: "linear-gradient(135deg, #E8354A, #C8283C)" }}
                  >
                    <Phone size={16} /> {tc("callUs")}
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className={labelClass}>{t("form.name")}</label>
                    <input
                      name="name"
                      type="text"
                      placeholder={t("form.placeholders.name")}
                      className={inputClass}
                    />
                  </div>

                  {/* Phone + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className={labelClass}>{t("form.phone")}</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t("form.placeholders.phone")}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>
                        {t("form.email")} <span className="text-[#E8354A]">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={t("form.placeholders.email")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col">
                    <label className={labelClass}>
                      {t("info.address")} <span className="text-[#E8354A]">*</span>
                    </label>
                    <input
                      name="address"
                      type="text"
                      required
                      placeholder={t("form.placeholders.address")}
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label className={labelClass}>
                      {t("form.message")} <span className="text-[#E8354A]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder={t("form.placeholders.message")}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Attachments */}
                  <div className="flex flex-col gap-1.5">
                    <label className={`${labelClass} flex items-center gap-2`}>
                      <Paperclip size={12} /> {t("form.attachments")}
                    </label>
                    <div className="flex gap-3 rounded-xl border border-[#E8EFFE] bg-white/50 backdrop-blur-sm px-4 py-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3B6CF4]">
                        <Info size={13} className="text-white" />
                      </div>
                      <p className="text-xs leading-relaxed text-[#5A5955]">
                        {t("form.fileSizeInfo")}
                      </p>
                    </div>
                    <input
                      name="files"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFilesChange}
                      className="text-sm text-[#5A5955] file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-white file:bg-[#2B5CE6] file:cursor-pointer"
                    />
                    {fileMeta.length > 0 && (
                      <ul className="text-xs text-[#5A5955] space-y-0.5" aria-live="polite">
                        {fileMeta.map((f) => (
                          <li key={f.name + f.size} className="flex justify-between gap-2">
                            <span className="truncate text-[#374151]">{f.name}</span>
                            <span className="shrink-0">
                              {(f.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {clientFileError && (
                      <p className="text-red-600 text-sm flex items-start gap-2" role="alert">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        {clientFileError}
                      </p>
                    )}
                  </div>

                  {showLargeFileFallback && (
                    <div className="flex gap-3 rounded-xl border border-[#E8EFFE] bg-white/50 backdrop-blur-sm px-4 py-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3B6CF4]">
                        <Mail size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#374151] leading-snug">
                          {t("form.uploadFailLargeFile")}
                        </p>
                        <a
                          href={`mailto:${tc("email")}?subject=${encodeURIComponent("Contact — attachments")}`}
                          className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-[#3B6CF4] hover:underline"
                        >
                          <Mail size={14} /> {tc("email")}
                        </a>
                      </div>
                    </div>
                  )}

                  {error && (
                    <p className="text-red-600 text-sm flex items-start gap-2" role="alert">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading || !!clientFileError}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 disabled:opacity-60 text-white font-bold rounded-xl transition-all text-base py-3.5"
                    style={{
                      background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)",
                      boxShadow: "0 4px 16px rgba(59,108,244,0.25)",
                    }}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={17} />
                    )}
                    {loading ? "..." : `${t("form.submit")} →`}
                  </motion.button>

                  <p className="text-center text-[#9C9B96] text-xs">
                    {t("form.hint")}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Compact form sub-component ─────────────────────────── */
function CompactForm({
  submitted,
  loading,
  error,
  fileMeta,
  clientFileError,
  showLargeFileFallback,
  handleSubmit,
  handleFilesChange,
  t,
  tc,
  inputClass,
  labelClass,
}: {
  submitted: boolean;
  loading: boolean;
  error: string | null;
  fileMeta: { name: string; size: number }[];
  clientFileError: string | null;
  showLargeFileFallback: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: ReturnType<typeof useTranslations>;
  tc: ReturnType<typeof useTranslations>;
  inputClass: string;
  labelClass: string;
}) {
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[#E8EFFE] bg-white/50 backdrop-blur-sm text-center p-8 flex flex-col items-center gap-4"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)" }}
        >
          <CheckCircle size={26} className="text-white" />
        </div>
        <h3 className="font-bold text-[#2B5CE6] font-space text-lg">{t("form.success")}</h3>
        <a
          href={`tel:${tc("phoneDial")}`}
          className="flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm"
          style={{ background: "linear-gradient(135deg, #E8354A, #C8283C)" }}
        >
          <Phone size={15} /> {tc("callUs")}
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#E8EFFE] bg-white p-5 space-y-3"
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>{t("form.name")}</label>
          <input name="name" type="text" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>{t("form.phone")}</label>
          <input name="phone" type="tel" className={inputClass} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>{t("form.email")}</label>
        <input name="email" type="email" className={inputClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>{t("form.message")}</label>
        <textarea name="message" rows={3} className={`${inputClass} resize-none`} />
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          name="files"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFilesChange}
          className="text-sm text-[#5A5955] file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-white file:bg-[#2B5CE6] file:cursor-pointer"
        />
        {fileMeta.length > 0 && (
          <ul className="text-xs text-[#5A5955] space-y-0.5">
            {fileMeta.map((f) => (
              <li key={f.name + f.size} className="flex justify-between gap-2">
                <span className="truncate">{f.name}</span>
                <span className="shrink-0">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
              </li>
            ))}
          </ul>
        )}
        {clientFileError && (
          <p className="text-red-600 text-sm flex items-start gap-2" role="alert">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            {clientFileError}
          </p>
        )}
      </div>
      {showLargeFileFallback && (
        <div className="flex gap-3 rounded-xl border border-[#E8EFFE] bg-white/50 backdrop-blur-sm px-3.5 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B6CF4]">
            <Mail size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#374151]">{t("form.uploadFailLargeFile")}</p>
            <a
              href={`mailto:${tc("email")}`}
              className="text-xs font-bold text-[#3B6CF4] hover:underline"
            >
              {tc("email")}
            </a>
          </div>
        </div>
      )}
      {error && (
        <p className="text-red-600 text-sm flex items-start gap-2" role="alert">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </p>
      )}
      <motion.button
        type="submit"
        disabled={loading || !!clientFileError}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2.5 disabled:opacity-60 text-white font-bold rounded-xl text-sm py-3"
        style={{
          background: "linear-gradient(135deg, #3B6CF4, #2B5CE6)",
          boxShadow: "0 4px 16px rgba(59,108,244,0.2)",
        }}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send size={15} />
        )}
        {loading ? "..." : t("form.submit")}
      </motion.button>
    </form>
  );
}
