import { cookies } from "next/headers";

type Locale = "et" | "en" | "ru";

const content: Record<Locale, { heading: string; body: string; home: string; services: string; emergency: string; homeHref: string; servicesHref: string }> = {
  et: { heading: "Lehte ei leitud", body: "Otsitavat lehte ei eksisteeri või see on teisaldatud.", home: "← Avaleht", services: "Kõik teenused", emergency: "Torustiku avarii?", homeHref: "/et", servicesHref: "/et/teenused" },
  en: { heading: "Page Not Found", body: "The page you're looking for doesn't exist or has been moved.", home: "← Go Home", services: "All Services", emergency: "Have a plumbing emergency?", homeHref: "/en", servicesHref: "/en/services" },
  ru: { heading: "Страница не найдена", body: "Страница не существует или была перемещена.", home: "← На главную", services: "Все услуги", emergency: "Аварийная ситуация?", homeHref: "/ru", servicesHref: "/ru/услуги" },
};

export default async function NotFound() {
  const jar = await cookies();
  const raw = jar.get("NEXT_LOCALE")?.value as Locale | undefined;
  const locale: Locale = raw && raw in content ? raw : "et";
  const c = content[locale];

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
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 24,
          padding: "48px 40px",
          textAlign: "center",
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 40px 80px rgba(59,108,244,0.14),0 8px 32px rgba(0,0,0,0.06)",
        }}
      >
        <a href={c.homeHref} style={{ display: "inline-block", marginBottom: 24 }}>
          <img src="/toru.png" alt="TorudeAbi24" style={{ height: 40 }} />
        </a>

        <div
          style={{
            fontSize: "clamp(4rem,18vw,8rem)",
            fontWeight: 900,
            lineHeight: 1,
            background: "linear-gradient(135deg,#3B6CF4 0%,#E8354A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 16,
          }}
        >
          404
        </div>

        <div style={{ height: 2, width: 64, margin: "0 auto 24px", borderRadius: 4, background: "linear-gradient(90deg,#3B6CF4,#E8354A)" }} />

        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a2a6c", marginBottom: 12 }}>
          {c.heading}
        </h1>
        <p style={{ color: "#5A5955", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 32 }}>
          {c.body}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={c.homeHref}
            style={{
              display: "block", fontWeight: 700, fontSize: 14, color: "#fff",
              padding: "14px 24px", borderRadius: 12, textDecoration: "none",
              background: "linear-gradient(135deg,#3B6CF4,#2B5CE6)",
              boxShadow: "0 8px 24px rgba(59,108,244,0.35)",
            }}
          >
            {c.home}
          </a>
          <a
            href={c.servicesHref}
            style={{
              display: "block", fontWeight: 700, fontSize: 14, color: "#3B6CF4",
              padding: "14px 24px", borderRadius: 12, textDecoration: "none",
              border: "2px solid rgba(59,108,244,0.25)",
            }}
          >
            {c.services}
          </a>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(59,108,244,0.1)" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#5A5955", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>
            {c.emergency}
          </p>
          <a href="tel:+37256897929" style={{ fontWeight: 900, color: "#E8354A", fontSize: 14, textDecoration: "none" }}>
            +372 56 89 79 29
          </a>
        </div>
      </div>
    </div>
  );
}
