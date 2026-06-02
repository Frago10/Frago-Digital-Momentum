import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        momentum: {
          void: "#050505",
          ink: "#0a0a0c",
          smoke: "#16161a",
          steel: "#1f1f24",
          mist: "#cfcfd2",
          chalk: "#F2F2F2",
          magenta: "#FF2D8D",
          "magenta-soft": "#ff5ba8",
          "magenta-deep": "#c4196b",
          "magenta-glow": "#ff7ab8",
        },
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Satoshi"', "system-ui", "sans-serif"],
        ui: ['"Satoshi"', '"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', '"Satoshi"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.025em",
        wide2: "0.18em",
        wide3: "0.32em",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "magenta-radial":
          "radial-gradient(ellipse at center, rgba(255,45,141,0.28) 0%, rgba(255,45,141,0) 65%)",
        "magenta-sweep":
          "linear-gradient(115deg, rgba(255,45,141,0) 0%, rgba(255,45,141,0.85) 45%, rgba(255,123,184,1) 55%, rgba(255,45,141,0) 100%)",
        "chalk-edge":
          "linear-gradient(180deg, #ffffff 0%, #cfcfd2 100%)",
        "void-fade":
          "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,1) 100%)",
      },
      boxShadow: {
        "magenta-sm": "0 0 16px rgba(255,45,141,0.35), 0 0 1px rgba(255,45,141,0.6)",
        "magenta-md": "0 0 32px rgba(255,45,141,0.5), 0 0 2px rgba(255,45,141,0.7)",
        "magenta-lg": "0 0 80px rgba(255,45,141,0.55), 0 0 4px rgba(255,45,141,0.8)",
        "panel":
          "0 0 0 1px rgba(255,255,255,0.06), 0 30px 100px -24px rgba(0,0,0,0.85)",
        "lift":
          "0 0 0 1px rgba(255,255,255,0.08), 0 50px 120px -30px rgba(255,45,141,0.35)",
      },
      animation: {
        "magenta-pulse": "magentaPulse 3.4s ease-in-out infinite",
        "shimmer": "shimmer 3.6s linear infinite",
        "float-y": "floatY 9s ease-in-out infinite",
        "marquee": "marquee 38s linear infinite",
        "spin-slow": "spin 22s linear infinite",
      },
      keyframes: {
        magentaPulse: {
          "0%, 100%": { opacity: "0.55", filter: "drop-shadow(0 0 8px rgba(255,45,141,0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 24px rgba(255,45,141,0.85))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
