"use client";
import { motion } from "framer-motion";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";

const SEO_KEYWORDS: Array<{
  labelKey: string;
  tagKey: string;
  hot?: boolean;
  canonical: string;
}> = [
  { labelKey: "plumbing",          tagKey: "247",        hot: true, canonical: "24h-emergency-plumbing" },
  { labelKey: "electrical",        tagKey: "certified",             canonical: "electrician-services" },
  { labelKey: "bathroomRepair",    tagKey: "fullRefits",            canonical: "bathroom-renovation" },
  { labelKey: "cleaning",          tagKey: "deepClean",             canonical: "cleaning-services" },
  { labelKey: "pipeRepair",        tagKey: "emergency",  hot: true, canonical: "pipe-repair-replacement" },
  { labelKey: "boilerInstallation",tagKey: "sameDay",               canonical: "gas-boiler-replacement" },
  { labelKey: "roofing",           tagKey: "certified",             canonical: "roofing-works" },
  { labelKey: "constructionWorks", tagKey: "designBuild",           canonical: "construction-works" },
  { labelKey: "blockageClearing",  tagKey: "fast",                  canonical: "drain-blockage-removal" },
  { labelKey: "apartmentRepair",   tagKey: "custom",                canonical: "apartment-renovation" },
  { labelKey: "floorHeating",      tagKey: "install",               canonical: "floor-heating" },
  { labelKey: "waterMeter",        tagKey: "local",      hot: true, canonical: "water-meter-replacement" },
];

export default function SeoSection({ serviceSlugMap = {} }: { serviceSlugMap?: Record<string, string> }) {
  const t = useTranslations("seo");
  const ts = useTranslations("services");
  const tt = useTranslations("seoTags");

  const keywords = SEO_KEYWORDS.map(({ labelKey, tagKey, hot, canonical }) => ({
    labelKey,
    tagKey,
    hot,
    slug: serviceSlugMap[canonical] ?? canonical,
  }));

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#E8354A]" />
            <div className="inline-flex items-center gap-2 bg-[#3B6CF4] text-white text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm">
              {t("title")}
            </div>
            <span className="w-8 h-0.5 bg-[#E8354A]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2B5CE6] mb-3 font-space tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-[#5A5955] font-medium max-w-lg mx-auto leading-relaxed">{t("content")}</p>
        </motion.div>
        <div className="flex flex-wrap gap-3 justify-center">
          {keywords.map((kw, i) => (
            <motion.div
              key={kw.labelKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={internalPathToLinkHref(`/services/${kw.slug}`)}
                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all duration-200 ${
                  kw.hot ? "bg-[#E8354A] border-[#E8354A] text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg" : "bg-white border-[#E8EFFE] text-[#374151] hover:border-[#3B6CF4]/40 hover:text-[#3B6CF4] shadow-sm"
                }`}
              >
                {kw.hot && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                {ts(`items.${kw.labelKey}` as any)}
                <span className={`text-xs font-medium ${kw.hot ? "text-white/80" : "text-[#9CA3B8]"}`}>· {tt(kw.tagKey as any)}</span>
                <ArrowUpRight size={12} className={`opacity-0 group-hover:opacity-60 transition-opacity ${kw.hot ? "" : "text-[#3B6CF4]"}`} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ — disabled for now. To re-enable: change false to true */}
        {false && (
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B5CE6] mb-8 text-center font-space">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                { q: "How fast do you respond to plumbing emergencies in Tallinn?", a: "Our emergency team arrives within 30–60 minutes across Tallinn and Harjumaa. We operate 24/7 including weekends and public holidays. Call +372 56 89 79 29 any time." },
                { q: "Are your plumbers and electricians licensed in Estonia?", a: "Yes. All our technicians hold current Estonian trade certifications. Electricians are licensed under Elektriohutusseadus and gas engineers under Gaasiseadus. We provide documentation on request." },
                { q: "What is the -30% discount and when does it apply?", a: "We offer a 30% discount on all services Monday to Sunday during 08:00–19:00. For night work (19:00–08:00) the full rate applies with a €10 call-out surcharge." },
                { q: "Which areas of Tallinn and Harjumaa do you cover?", a: "We serve all Tallinn districts: Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita, and Haabersti. We also cover Harjumaa including Maardu, Keila, Saue, Viimsi, and surrounding municipalities." },
                { q: "Do you offer a warranty on completed work?", a: "Yes. All completed work carries a 2-year warranty for normal use, per Estonian Võlaõigusseadus requirements. Bathroom renovations carry a separate 3-year warranty on waterproofing and tiling." },
                { q: "When do I pay for the service?", a: "You pay only after the work is completed and you are satisfied with the result. No upfront payment is required." },
              ].map(({ q, a }, i) => (
                <details key={i} className="group rounded-2xl border border-[#E8EFFE] bg-white shadow-sm">
                  <summary className="cursor-pointer list-none flex items-center justify-between px-6 py-4 font-bold text-[#1a2a6c] text-[15px] select-none gap-4">
                    <span>{q}</span>
                    <span className="text-[#3B6CF4] font-black text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-[#374151] text-sm leading-relaxed border-t border-[#E8EFFE] pt-4">{a}</div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
