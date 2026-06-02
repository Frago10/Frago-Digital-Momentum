"use client";

import { motion } from "motion/react";
import {
  LogoV1,
  LogoV2,
  LogoV3,
  LogoV4,
  LogoV5,
  LogoV6,
} from "@/components/brand/LogoVariants";

const VARIANTS = [
  {
    id: 1,
    name: "Kinetic M animada",
    tag: "Brand-fiel · evoluciona",
    desc: "Mismo M angular del brand sheet, slash magenta hace shimmer continuo + dot magenta pulsa. Mantiene equity, lo despierta.",
    Logo: LogoV1,
  },
  {
    id: 2,
    name: "Liquid metallic M",
    tag: "Eco del hero · ultra premium",
    desc: "M completa con gradiente chrome→magenta líquido. Highlight blanco recorre el letterform como mercurio. Lee 3D, futurista.",
    Logo: LogoV2,
  },
  {
    id: 3,
    name: "MM monogram interlock",
    tag: "Custom sigil · memorable",
    desc: "Dos M entrelazadas formando símbolo único. Codifica 'Momentum Media' en un solo glyph. Studio lujo, muy fashion-tech.",
    Logo: LogoV3,
  },
  {
    id: 4,
    name: "Pure wordmark editorial",
    tag: "Sin mark · solo tipografía",
    desc: "MOMENTUM display heavy con period magenta y underline kinetic. Confianza editorial pura, tipo magazine de lujo.",
    Logo: LogoV4,
  },
  {
    id: 5,
    name: "Arrow / chevron glyph",
    tag: "Minimal · iconic · funcional",
    desc: "Chevron blanco + chevron magenta interior + base line. Vector de momentum hacia arriba. Perfecto como favicon/app icon.",
    Logo: LogoV5,
  },
  {
    id: 6,
    name: "Type-as-architecture",
    tag: "Brutal · monumental",
    desc: "Una sola M en peso brutal-display con extrude magenta detrás. El logo ES la M. Confianza dominante, escala primero.",
    Logo: LogoV6,
  },
];

export default function LogoPreviewPage() {
  return (
    <main className="min-h-screen bg-momentum-void section-pad py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="pb-12 mb-12 border-b hairline">
          <div className="eyebrow mb-5">Frago&apos;s Momentum · Logo Exploration</div>
          <h1 className="font-display text-5xl md:text-6xl tracking-editorial text-momentum-chalk">
            6 direcciones de logo
          </h1>
          <p className="mt-4 max-w-2xl text-momentum-mist/75 text-[15px] leading-[1.6]">
            Cada variante en su contexto natural: dark mode, escala real, animación activa.
            Dime el número (1-6) y la aplico al nav + footer.
          </p>
        </header>

        {/* Grid of variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VARIANTS.map((v, i) => (
            <motion.article
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col gap-6 p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-momentum-ink hover:border-momentum-magenta/40 transition-colors duration-500 group"
            >
              {/* Number badge */}
              <div className="flex items-center justify-between">
                <div className="font-display text-[11px] tracking-[0.32em] text-momentum-magenta">
                  OPCIÓN {String(v.id).padStart(2, "0")}
                </div>
                <div className="label-ui">{v.tag}</div>
              </div>

              {/* Logo render area */}
              <div className="grid place-items-center min-h-[200px] rounded-xl bg-gradient-to-br from-momentum-void to-momentum-smoke border border-white/[0.04] overflow-hidden">
                <v.Logo size={120} />
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl md:text-[28px] leading-[1.1] tracking-editorial text-momentum-chalk mb-2">
                  {v.name}
                </h2>
                <p className="text-[14.5px] leading-[1.55] text-momentum-mist/80 text-pretty">
                  {v.desc}
                </p>
              </div>

              {/* Lockup preview row — show how it works in nav */}
              <div className="pt-5 border-t border-white/[0.06]">
                <div className="label-ui mb-3">EN NAVEGACIÓN</div>
                <div className="flex items-center gap-4">
                  <v.Logo size={40} />
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[10px] tracking-[0.32em] text-momentum-mist/60">
                      FRAGO&apos;S
                    </span>
                    <span className="font-display text-[15px] font-medium tracking-[0.18em] text-momentum-chalk">
                      MOMENTUM<span className="text-momentum-magenta">.</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t hairline flex flex-wrap items-center justify-between gap-4">
          <div className="label-ui">Decide y dime el número.</div>
          <a href="/" className="btn-ghost">
            ← Volver al sitio
          </a>
        </footer>
      </div>
    </main>
  );
}
