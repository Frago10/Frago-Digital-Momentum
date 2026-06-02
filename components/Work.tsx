"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Card = {
  num: string;
  category: string;
  year: string;
  /** Tailwind gradient for the visual area */
  gradient: string;
  /** Optional accent color for the magenta-blend halo */
  accent: string;
};

const CARDS: Card[] = [
  {
    num: "01",
    category: "Brand Identity",
    year: "2026",
    gradient: "from-[#2b0a1a] via-[#4a0f2a] to-[#ff2d8d]",
    accent: "#ff2d8d",
  },
  {
    num: "02",
    category: "Campaign · Motion",
    year: "2026",
    gradient: "from-[#0d0d10] via-[#1f1027] to-[#7a1f5a]",
    accent: "#ff7ab8",
  },
  {
    num: "03",
    category: "Founder Story",
    year: "2026",
    gradient: "from-[#1a1014] via-[#3a1029] to-[#ff5ba8]",
    accent: "#ff5ba8",
  },
  {
    num: "04",
    category: "Content System",
    year: "2026",
    gradient: "from-[#100a14] via-[#26102b] to-[#c4196b]",
    accent: "#c4196b",
  },
  {
    num: "05",
    category: "Digital Positioning",
    year: "2026",
    gradient: "from-[#0a0a0c] via-[#1c0c1c] to-[#ff2d8d]",
    accent: "#ff2d8d",
  },
  {
    num: "06",
    category: "Visual Storytelling",
    year: "2026",
    gradient: "from-[#14080f] via-[#2b0d1f] to-[#ff7ab8]",
    accent: "#ff7ab8",
  },
];

function WorkCard({ card, index }: { card: Card; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic tilt — track cursor relative to card center
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 220, damping: 22 });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], ["-3%", "3%"]), { stiffness: 180, damping: 24 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], ["-3%", "3%"]), { stiffness: 180, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      data-cursor="view"
      data-cursor-label="Ver case"
      className="group relative cursor-pointer"
    >
      {/* Card frame */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06] bg-momentum-ink transition-all duration-500 group-hover:border-momentum-magenta/40 group-hover:shadow-lift">
        {/* Gradient visual area with parallax */}
        <motion.div
          style={{ x: px, y: py }}
          className={cn(
            "absolute -inset-4 bg-gradient-to-br",
            card.gradient,
          )}
        />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,5,5,0.55)_85%,_rgba(5,5,5,0.85)_100%)]" />

        {/* Grain */}
        <div className="absolute inset-0 bg-grain opacity-[0.18] mix-blend-overlay" />

        {/* Top row — number + arrow */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <div className="font-display text-[11px] tracking-[0.32em] text-momentum-chalk/80">
            {card.num} <span className="text-momentum-chalk/30">/ 06</span>
          </div>
          <div className="w-9 h-9 rounded-full border border-white/15 grid place-items-center backdrop-blur-md transition-all duration-500 group-hover:border-momentum-magenta/70 group-hover:bg-momentum-magenta group-hover:rotate-45">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M3 8 L8 3 M4 3 H8 V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Center label — visible by default, fades on hover */}
        <div className="absolute inset-0 grid place-items-center transition-opacity duration-500 group-hover:opacity-0">
          <div className="text-center">
            <div className="font-display text-[10px] tracking-[0.4em] text-momentum-chalk/40 mb-2">
              CASE STUDY
            </div>
            <div className="font-display text-3xl md:text-4xl text-momentum-chalk/85 tracking-editorial">
              Próximamente
            </div>
          </div>
        </div>

        {/* Hover-reveal — "Available 2026" with magnetic CTA */}
        <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className="text-center">
            <div className="font-display text-[10px] tracking-[0.4em] text-momentum-chalk/60 mb-3">
              AVAILABLE Q3 · {card.year}
            </div>
            <div className="inline-flex items-center gap-2 font-display text-lg md:text-xl text-momentum-chalk tracking-editorial">
              Reservar slot
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom row — category + year + magenta line */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="px-5 py-4 flex items-center justify-between text-momentum-chalk/60">
            <span className="label-ui flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full shadow-magenta-sm"
                style={{ background: card.accent }}
              />
              {card.category}
            </span>
            <span className="label-ui">{card.year}</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-momentum-magenta to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
        </div>
      </div>
    </motion.div>
  );
}

export function Work() {
  return (
    <section
      id="trabajo"
      className="relative bg-momentum-void section-pad py-32 md:py-44 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-magenta-radial opacity-25" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24 pb-10 border-b hairline">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow mb-5">03 — Trabajo</div>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.0] tracking-editorial text-momentum-chalk max-w-3xl">
              <span className="text-chalk-metallic">Cases que </span>
              <span className="text-magenta-gradient">construyen momentum.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 md:items-end"
          >
            <div className="flex items-center gap-2 label-ui">
              <span className="w-1.5 h-1.5 rounded-full bg-momentum-magenta animate-magenta-pulse" />
              SELECCIÓN 2026
            </div>
            <p className="max-w-xs text-[14px] text-momentum-mist/70 text-pretty md:text-right">
              Trabajamos con un número limitado de proyectos cada trimestre para mantener el estándar.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((c, i) => (
            <WorkCard key={c.num} card={c} index={i} />
          ))}
        </div>

        {/* Slot strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pt-10 border-t hairline"
        >
          <div>
            <div className="label-ui mb-1.5 text-momentum-magenta">SLOTS DISPONIBLES</div>
            <div className="font-display text-2xl md:text-3xl tracking-editorial text-momentum-chalk">
              2 cupos abiertos · próximo trimestre
            </div>
          </div>
          <a href="#contacto" className="btn-magenta">
            Reservar conversación
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
