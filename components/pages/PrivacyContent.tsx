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

        <div className="bg-white rounded-3xl p-8 border border-[#E2E5EF] shadow-sm prose prose-lg max-w-none [&_h4]:text-xl [&_h4]:font-extrabold [&_h4]:text-[#0D1B3E] [&_h4]:mt-8 [&_h4]:mb-3 [&_p]:text-[#6B7280] [&_p]:font-medium [&_p]:leading-relaxed">
          <h4>1. Introduction</h4>
          <p>
            Welcome to ajsan.ee. This policy outlines how SNN RAKENTAMINEN OÜ (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, protects, and handles your personal data when you visit and use our website.
          </p>
          <p>
            We are committed to protecting your privacy and processing your data in accordance with the General Data Protection Regulation (GDPR) and other relevant data protection laws.
          </p>
          <p>
            <strong>Data Controller:</strong> SNN RAKENTAMINEN OÜ (brand: Ajsan), Tallinn, Estonia. Registration details as stated on your invoice or contract.
          </p>

          <h4>2. What Personal Data We Collect and Why</h4>
          <p>
            We collect information to provide and improve our services. The types of personal data we collect depend on your interactions with our Website.
          </p>

          <h4>3. Cookie Policy</h4>
          <p>
            Cookies are small text files placed on your device when you visit a website. We use strictly necessary cookies, performance and analytics cookies, functionality cookies, and marketing cookies.
          </p>

          <h4>4. Who We Share Your Data With</h4>
          <p>
            We do not sell your personal data. We may share your data with trusted third-party service providers who assist us in operating our website.
          </p>

          <h4>5. Your Data Protection Rights</h4>
          <p>
            Under the GDPR, you have rights including the right to access, rectification, erasure, restrict processing, data portability, and to object. Contact us at ajsan@ajsan.ee.
          </p>

          <h4>6. Contact</h4>
          <p>
            If you have concerns about our use of your personal information, contact us at ajsan@ajsan.ee. You also have the right to lodge a complaint with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon) at aki.ee.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
