"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Paperclip, Info, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type ContactProps = { compact?: boolean };

const MAX_BYTES_PER_FILE = 12 * 1024 * 1024;
const LARGE_FALLBACK_BYTES = 2 * 1024 * 1024;

const CONTACT_ICON_COLORS = ["#CC1414", "#0D1B3E", "#1565C0", "#CC1414"];

const inputClass =
  "w-full rounded-xl px-3.5 py-2.5 text-sm text-[#0D1B3E] border border-[#E2E5EF] bg-white focus:outline-none focus:border-[#CC1414]/50 transition-all placeholder:text-[#9CA3AF]";

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
    { icon: Phone, label: t("info.phone"), value: tc("phone"), sub: t("info.phoneSub"), href: `tel:${tc("phoneDial")}` },
    { icon: Mail, label: t("info.email"), value: tc("email"), sub: t("info.hoursValue"), href: `mailto:${tc("email")}` },
    { icon: MapPin, label: t("info.address"), value: tc("address"), sub: t("info.area") },
    { icon: Clock, label: t("info.hours"), value: t("info.hoursValue"), sub: t("orderHere") },
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
        if (hasLargeForFallback || (typeof data.suggestEmailFallback === "boolean" && data.suggestEmailFallback)) {
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

  return (
    <section id="contact" className={`${compact ? "py-0" : "py-16 sm:py-20"} relative bg-white`}>
      {!compact && (
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <span className="inline-block text-[#CC1414] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            torudeabi.ee
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B3E] font-space mb-2">{t("title")}</h2>
          <p className="text-[#6B7280] text-base max-w-lg">{t("subtitle")}</p>
        </div>
      )}

      <div className={`relative z-10 ${compact ? "w-full" : "max-w-7xl mx-auto px-6"}`}>
        {compact && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E] font-space mb-1">{t("title")}</h2>
            <p className="text-[#6B7280] text-sm max-w-xl">{t("subtitle")}</p>
          </motion.div>
        )}

        <div className={`grid ${compact ? "gap-5" : "lg:grid-cols-5 gap-10"}`}>
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${compact ? "" : "lg:col-span-2"} flex flex-col gap-3`}
          >
            {contactItems.map((item, i) => (
              <div
                key={item.label}
                className={`rounded-xl flex gap-3 items-start border border-[#E2E5EF] bg-white hover:border-[#CC1414]/30 hover:shadow-sm transition-all ${compact ? "p-3.5" : "p-4"}`}
              >
                <div
                  className={`rounded-xl flex items-center justify-center shrink-0 ${compact ? "w-9 h-9" : "w-10 h-10"}`}
                  style={{ background: CONTACT_ICON_COLORS[i] }}
                >
                  <item.icon size={compact ? 14 : 16} className="text-white" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[#0D1B3E] font-bold text-sm hover:text-[#CC1414] transition-colors block">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#0D1B3E] font-bold text-sm">{item.value}</p>
                  )}
                  <p className="text-[#9CA3AF] text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={compact ? "" : "lg:col-span-3"}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl border border-[#E2E5EF] bg-white text-center h-full flex flex-col items-center justify-center ${compact ? "p-8 gap-4" : "p-12 gap-5"}`}
              >
                <div className="w-16 h-16 rounded-full bg-[#CC1414] flex items-center justify-center">
                  <CheckCircle size={30} className="text-white" />
                </div>
                <h3 className={`font-bold text-[#0D1B3E] font-space ${compact ? "text-lg" : "text-2xl"}`}>{t("form.success")}</h3>
                <a
                  href={`tel:${tc("phoneDial")}`}
                  className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl"
                  style={{ background: "#CC1414" }}
                >
                  <Phone size={16} /> {tc("callUs")}
                </a>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`rounded-2xl border border-[#E2E5EF] bg-white ${compact ? "p-5 space-y-3" : "p-6 sm:p-8 space-y-4"}`}
              >
                <div className={`grid sm:grid-cols-2 ${compact ? "gap-3" : "gap-4"}`}>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#374151] text-xs font-bold uppercase tracking-widest">{t("form.name")}</label>
                    <input name="name" type="text" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#374151] text-xs font-bold uppercase tracking-widest">{t("form.phone")}</label>
                    <input name="phone" type="tel" required className={inputClass} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#374151] text-xs font-bold uppercase tracking-widest">{t("form.email")}</label>
                  <input name="email" type="email" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#374151] text-xs font-bold uppercase tracking-widest">{t("form.message")}</label>
                  <textarea name="message" rows={compact ? 3 : 4} className={`${inputClass} resize-none`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#374151] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Paperclip size={13} /> {t("form.attachments")}
                  </label>
                  <div className="flex gap-3 rounded-xl border border-[#1565C0]/20 bg-blue-50/50 px-4 py-3" role="note">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1565C0]">
                      <Info size={15} className="text-white" />
                    </div>
                    <p className="text-xs leading-relaxed text-[#6B7280]">{t("form.fileSizeInfo")}</p>
                  </div>
                  <input
                    name="files"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFilesChange}
                    className="text-sm text-[#6B7280] file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-white file:bg-[#0D1B3E] file:cursor-pointer"
                  />
                  <p className="text-[#9CA3AF] text-xs">{t("form.attachmentsHint")}</p>
                  {fileMeta.length > 0 && (
                    <ul className="text-xs text-[#6B7280] space-y-0.5" aria-live="polite">
                      {fileMeta.map((f) => (
                        <li key={f.name + f.size} className="flex justify-between gap-2">
                          <span className="truncate text-[#374151]">{f.name}</span>
                          <span className="shrink-0">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
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
                  <div className="flex gap-3 rounded-xl border border-[#1565C0]/20 bg-blue-50/50 px-4 py-3.5" role="alert">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1565C0]">
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#374151] leading-snug">{t("form.uploadFailLargeFile")}</p>
                      <a
                        href={`mailto:${tc("email")}?subject=${encodeURIComponent("Contact — attachments")}`}
                        className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1565C0] hover:underline"
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
                  className={`w-full flex items-center justify-center gap-2.5 disabled:opacity-60 text-white font-bold rounded-xl transition-all ${compact ? "text-sm py-3" : "text-base py-3.5"}`}
                  style={{ background: "#CC1414", boxShadow: "0 4px 16px rgba(204,20,20,0.25)" }}
                >
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={17} />}
                  {loading ? "..." : t("form.submit")}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
