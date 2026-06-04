import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Frago's Momentum Media — Movemos ideas. Conectamos marcas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050505",
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#F2F2F2",
        }}
      >
        {/* Magenta radial glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(255,45,141,0.45) 0%, rgba(255,45,141,0.18) 35%, rgba(5,5,5,0) 70%)",
            display: "flex",
          }}
        />

        {/* Bottom void fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,5,5,0) 50%, rgba(5,5,5,0.6) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 80px",
            width: "100%",
          }}
        >
          {/* Top row — chevron + brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <svg width="64" height="64" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="og-mag" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#7a0f3f" />
                  <stop offset="60%" stopColor="#ff2d8d" />
                  <stop offset="100%" stopColor="#ff7ab8" />
                </linearGradient>
              </defs>
              <path d="M 60 12 L 108 90 L 92 90 L 60 38 L 28 90 L 12 90 Z" fill="#ffffff" />
              <path d="M 60 46 L 86 90 L 74 90 L 60 66 L 46 90 L 34 90 Z" fill="url(#og-mag)" />
              <rect x="12" y="98" width="96" height="3" rx="1.5" fill="#ff2d8d" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: "0.32em",
                  color: "rgba(242,242,242,0.7)",
                  fontWeight: 600,
                }}
              >
                FRAGO&apos;S
              </span>
              <span
                style={{
                  fontSize: 28,
                  letterSpacing: "0.18em",
                  color: "#F2F2F2",
                  fontWeight: 700,
                  marginTop: 6,
                }}
              >
                MOMENTUM<span style={{ color: "#ff2d8d" }}>.</span>
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              maxWidth: 1000,
            }}
          >
            <span
              style={{
                fontSize: 22,
                letterSpacing: "0.32em",
                color: "#ff2d8d",
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              ● CREATIVE GROWTH ECOSYSTEM
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "#F2F2F2",
              }}
            >
              Movemos ideas.
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "#ff2d8d",
              }}
            >
              Conectamos marcas.
            </span>
          </div>

          {/* Pillars footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 14,
              letterSpacing: "0.32em",
              color: "rgba(242,242,242,0.55)",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 36,
                height: 4,
                background: "#ff2d8d",
                display: "flex",
                borderRadius: 2,
                marginRight: 8,
              }}
            />
            CREATIVIDAD
            <span style={{ color: "rgba(242,242,242,0.2)" }}>|</span>
            CONEXIÓN
            <span style={{ color: "rgba(242,242,242,0.2)" }}>|</span>
            ESTRATEGIA
            <span style={{ color: "rgba(242,242,242,0.2)" }}>|</span>
            INNOVACIÓN
            <span style={{ color: "rgba(242,242,242,0.2)" }}>|</span>
            IMPACTO
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
