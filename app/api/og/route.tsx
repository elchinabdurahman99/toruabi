import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "TorudeAbi24 — Teie isiklikud meistrid";
  const subtitle = searchParams.get("sub") || "24/7 Torutöö · Elektritööd · Remont · Tallinn & Harjumaa";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f1f6e 0%, #1a2a6c 40%, #1e1060 100%)",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,108,244,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,108,244,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Blue glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(59,108,244,0.35)",
            filter: "blur(80px)",
          }}
        />

        {/* Red glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(232,53,74,0.28)",
            filter: "blur(80px)",
          }}
        />

        {/* Card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            padding: "56px 80px",
            borderRadius: 32,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            maxWidth: 960,
            width: "100%",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(135deg,#E8354A,#C8283C)",
              borderRadius: 100,
              padding: "10px 24px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "white",
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              24/7 KIIRABI · TALLINN & HARJUMAA
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: "white",
                textAlign: "center",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </span>
            <div
              style={{
                width: 80,
                height: 4,
                borderRadius: 4,
                background: "linear-gradient(90deg,#3B6CF4,#E8354A)",
              }}
            />
            <span
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.72)",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {subtitle}
            </span>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 8,
            }}
          >
            {[
              { num: "500+", label: "Lõpetatud tööd" },
              { num: "-30%", label: "Soodustus päeval" },
              { num: "60 min", label: "Saabumine" },
            ].map(({ num, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: "#3B6CF4",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.55)",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 40,
            fontSize: 18,
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.05em",
          }}
        >
          torudeabi24.ee
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
