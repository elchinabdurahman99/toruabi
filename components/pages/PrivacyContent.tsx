"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <div className="max-w-4xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0D1B3E] mb-10" style={{ letterSpacing: "-0.03em" }}>
          {t("title")}
        </h1>

        <div className="bg-white rounded-3xl p-8 border border-[#E2E5EF] shadow-sm prose prose-lg max-w-none [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[#0D1B3E] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-[#6B7280] [&_p]:font-medium [&_p]:leading-relaxed">
          <h2>1. Introduction</h2>
          <p>
            This policy outlines how Torudeabi24.ee OÜ collects, uses, protects, and handles personal data
            of visitors and customers who use this website.
          </p>
          <p>
            Torudeabi24.ee OÜ is committed to protecting privacy and processing all data in accordance with
            the General Data Protection Regulation (GDPR) and applicable Estonian data protection law.
          </p>
          <p>
            <strong>Data Controller:</strong> Torudeabi24.ee OÜ, Vene tn 28, Tallinn 10111, Estonia.
            Registration details as stated on the invoice or contract.
          </p>

          <h2>2. Personal Data Collected and Purpose</h2>
          <p>
            Personal data is collected to provide and improve services. The types of data collected depend
            on interactions with the website — such as submitting the contact form, making a service inquiry,
            or booking a visit.
          </p>

          <h2>3. Cookie Policy</h2>
          <p>
            Cookies are small text files placed on a visitor&rsquo;s device when visiting a website.
            Torudeabi24.ee uses strictly necessary cookies, performance and analytics cookies, functionality
            cookies, and — where consent is given — marketing cookies.
          </p>

          <h2>4. Data Sharing</h2>
          <p>
            Torudeabi24.ee OÜ does not sell personal data. Data may be shared with trusted third-party
            service providers who assist in operating this website and delivering services, under strict
            data processing agreements.
          </p>

          <h2>5. Data Protection Rights</h2>
          <p>
            Under the GDPR, every individual has rights including the right to access, rectification,
            erasure, restriction of processing, data portability, and the right to object.
            Contact info@torudeabi24.ee to exercise any of these rights.
          </p>

          <h2>6. Contact</h2>
          <p>
            For concerns about personal data handling, contact info@torudeabi24.ee. Complaints may also
            be lodged with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon) at aki.ee.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
