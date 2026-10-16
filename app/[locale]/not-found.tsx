"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import BrandLogo from "@/components/ui/BrandLogo";

const TRANSLATIONS = {
  et: {
    heading: "Lehte ei leitud",
    body: "Otsitavat lehte ei eksisteeri või see on teisaldatud. Vajad kiiret abi? Helista meile — 24/7.",
    goHome: "Avaleht",
    allServices: "Kõik teenused",
    emergency: "Torustiku avarii?",
    homeHref: "/et",
    servicesHref: "/et/teenused",
  },
  en: {
    heading: "Page Not Found",
    body: "The page you're looking for doesn't exist or has been moved. Need urgent help? Call us — 24/7.",
    goHome: "Go Home",
    allServices: "All Services",
    emergency: "Have a plumbing emergency?",
    homeHref: "/en",
    servicesHref: "/en/services",
  },
  ru: {
    heading: "Страница не найдена",
    body: "Страница не существует или была перемещена. Нужна срочная помощь? Звоните — 24/7.",
    goHome: "На главную",
    allServices: "Все услуги",
    emergency: "Аварийная ситуация?",
    homeHref: "/ru",
    servicesHref: "/ru/услуги",
  },
} as const;

type Locale = keyof typeof TRANSLATIONS;

export default function NotFound() {
  const [locale, setLocale] = useState<Locale>("et");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/en")) setLocale("en");
    else if (path.startsWith("/ru")) setLocale("ru");
    else setLocale("et");
  }, []);

  const t = TRANSLATIONS[locale];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#f0f4ff 0%,#fdf0f3 50%,#f0f4ff 100%)",
        fontFamily: "system-ui,sans-serif",
        padding: "1rem",
      }}
    >
      {/* blobs */}
      <div style={{ position:"absolute", left:-128, top:-64, width:500, height:500, borderRadius:"50%", background:"#3B6CF4", opacity:0.18, filter:"blur(120px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:-80, bottom:-40, width:450, height:450, borderRadius:"50%", background:"#E8354A", opacity:0.14, filter:"blur(100px)", pointerEvents:"none" }} />

      <div
        style={{
          position:"relative",
          zIndex:10,
          width:"100%",
          maxWidth:480,
          borderRadius:24,
          padding:"48px 40px",
          textAlign:"center",
          background:"rgba(255,255,255,0.82)",
          border:"1px solid rgba(255,255,255,0.9)",
          boxShadow:"0 40px 80px rgba(59,108,244,0.14),0 8px 32px rgba(0,0,0,0.06)",
        }}
      >
        <Link href={t.homeHref as any} style={{ display:"inline-flex", marginBottom:24 }}>
          <BrandLogo variant="nav" />
        </Link>

        <div
          style={{
            fontSize:"clamp(4rem,18vw,8rem)",
            fontWeight:900,
            lineHeight:1,
            background:"linear-gradient(135deg,#3B6CF4 0%,#E8354A 100%)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            marginBottom:16,
          }}
        >
          404
        </div>

        <div style={{ height:2, width:64, margin:"0 auto 24px", borderRadius:4, background:"linear-gradient(90deg,#3B6CF4,#E8354A)" }} />

        <h1 style={{ fontSize:"1.5rem", fontWeight:800, color:"#1a2a6c", marginBottom:12 }}>
          {t.heading}
        </h1>
        <p style={{ color:"#5A5955", fontSize:"0.9rem", lineHeight:1.6, marginBottom:32 }}>
          {t.body}
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <a
            href={t.homeHref}
            style={{
              display:"block", fontWeight:700, fontSize:14, color:"#fff",
              padding:"14px 24px", borderRadius:12, textDecoration:"none",
              background:"linear-gradient(135deg,#3B6CF4,#2B5CE6)",
              boxShadow:"0 8px 24px rgba(59,108,244,0.35)",
            }}
          >
            ← {t.goHome}
          </a>
          <a
            href={t.servicesHref}
            style={{
              display:"block", fontWeight:700, fontSize:14, color:"#3B6CF4",
              padding:"14px 24px", borderRadius:12, textDecoration:"none",
              border:"2px solid rgba(59,108,244,0.25)",
            }}
          >
            {t.allServices}
          </a>
        </div>

        <div style={{ marginTop:32, paddingTop:24, borderTop:"1px solid rgba(59,108,244,0.1)" }}>
          <p style={{ fontSize:10, fontWeight:700, color:"#5A5955", textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:8 }}>
            {t.emergency}
          </p>
          <a href="tel:+37256897929" style={{ fontWeight:900, color:"#E8354A", fontSize:14, textDecoration:"none" }}>
            +372 56 89 79 29
          </a>
        </div>
      </div>
    </div>
  );
}
