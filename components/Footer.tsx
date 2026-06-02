"use client";

import { LogoMark } from "./brand/LogoMark";

const PILLARS = ["CREATIVIDAD", "CONEXIÓN", "ESTRATEGIA", "INNOVACIÓN", "IMPACTO"];

export function Footer() {
  return (
    <footer className="relative bg-momentum-void section-pad pt-16 pb-10 border-t hairline">
      <div className="mx-auto max-w-7xl">
        {/* Pillar strip — mirrors the brand sheet */}
        <div className="flex items-center justify-between gap-4 pb-12 border-b hairline overflow-x-auto">
          <div className="w-12 h-1.5 bg-momentum-magenta shrink-0 shadow-magenta-sm" />
          <div className="flex items-center gap-4 md:gap-8 text-momentum-chalk/80 whitespace-nowrap">
            {PILLARS.map((p, i) => (
              <span key={p} className="flex items-center gap-4 md:gap-8 label-ui">
                {p}
                {i < PILLARS.length - 1 && <span className="text-momentum-mist/20">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Lower row */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5 flex items-center gap-4">
            <LogoMark size={48} animated={false} />
            <div>
              <div className="font-display text-[10px] tracking-[0.32em] text-momentum-mist/60">
                FRAGO&apos;S
              </div>
              <div className="font-display text-xl tracking-[0.12em] text-momentum-chalk">
                MOMENTUM <span className="text-momentum-magenta">MEDIA</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="label-ui mb-3">Manifesto</div>
            <p className="text-[14px] leading-[1.55] text-momentum-mist/75">
              Movemos ideas. Conectamos marcas. Impulsamos crecimiento.
            </p>
          </div>

          <div className="md:col-span-3 md:text-right">
            <div className="label-ui mb-3">Contacto</div>
            <a href="mailto:hola@fragosmomentum.com" className="block text-[14px] text-momentum-chalk hover:text-momentum-magenta transition-colors">
              hola@fragosmomentum.com
            </a>
            <span className="block label-ui mt-2">Disponible globalmente</span>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t hairline flex flex-wrap items-center justify-between gap-3 label-ui">
          <span>© {new Date().getFullYear()} Frago Vanguard Group · Momentum Media</span>
          <span>Marketing · Branding · Contenido · Crecimiento Digital</span>
        </div>
      </div>
    </footer>
  );
}
