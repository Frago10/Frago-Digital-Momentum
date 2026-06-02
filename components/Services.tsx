"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Service = {
  num: string;
  title: string;
  description: string;
  outputs: string[];
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Brand Identity Systems",
    description:
      "Identidades visuales completas: nombre, logo, sistema tipográfico, paleta, voz y guidelines vivos que escalan con la marca.",
    outputs: ["Logo + variantes", "Sistema tipográfico", "Brand book"],
  },
  {
    num: "02",
    title: "Creative Direction",
    description:
      "Dirección artística y conceptual de campañas, lanzamientos y ecosistemas visuales. Cada decisión, intencional.",
    outputs: ["Art direction", "Mood & tone", "Campaign concept"],
  },
  {
    num: "03",
    title: "Digital Positioning",
    description:
      "Estrategia de marca digital: posicionamiento, mensaje, narrativa y arquitectura de canales para destacar en el feed.",
    outputs: ["Messaging framework", "Channel strategy", "Content pillars"],
  },
  {
    num: "04",
    title: "Content Ecosystems",
    description:
      "Sistemas de contenido premium — no piezas sueltas. Producción visual, fotografía, video y formatos modulares listos para escalar.",
    outputs: ["Visual production", "Content systems", "Asset library"],
  },
  {
    num: "05",
    title: "Growth Strategy",
    description:
      "Crecimiento orgánico y de pago con narrativa de marca. Métricas que importan, no métricas vanidosas.",
    outputs: ["Funnels", "Paid + organic", "Performance creative"],
  },
  {
    num: "06",
    title: "Motion Branding",
    description:
      "Identidad en movimiento: logo motion, transiciones, opens y assets cinéticos para video y plataformas.",
    outputs: ["Logo motion", "Bumpers", "Motion guidelines"],
  },
  {
    num: "07",
    title: "Visual Storytelling",
    description:
      "Storytelling visual para fundadores y marcas personales. Convertimos tu historia en una narrativa que la gente quiere consumir.",
    outputs: ["Founder narrative", "Storyboards", "Episodic content"],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col gap-5 p-7 md:p-8 rounded-2xl",
        "bg-momentum-ink/60 backdrop-blur-md",
        "border border-white/[0.06] hover:border-momentum-magenta/40",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:shadow-lift overflow-hidden"
      )}
    >
      {/* Sweep highlight on hover */}
      <div className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-magenta-sweep opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 rotate-12" />

      <header className="flex items-start justify-between gap-4">
        <div className="font-display text-[11px] tracking-[0.32em] text-momentum-magenta">
          {service.num}
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 grid place-items-center group-hover:border-momentum-magenta/60 group-hover:rotate-45 transition-all duration-500">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 6h6M6 3v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </header>

      <h3 className="font-display text-2xl md:text-[28px] leading-[1.05] tracking-editorial text-momentum-chalk">
        {service.title}
      </h3>

      <p className="text-[14.5px] leading-[1.55] text-momentum-mist/85 text-pretty">
        {service.description}
      </p>

      <div className="mt-auto pt-5 border-t border-white/[0.06] flex flex-wrap gap-x-3 gap-y-1.5">
        {service.outputs.map((o) => (
          <span key={o} className="label-ui">
            ⌁ {o}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section
      id="servicios"
      className="relative bg-momentum-ink section-pad py-32 md:py-44 overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[600px] h-[600px] bg-magenta-radial opacity-50" />
      <div className="pointer-events-none absolute bottom-0 -right-40 w-[500px] h-[500px] bg-magenta-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24 pb-10 border-b hairline">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="eyebrow mb-6">02 — Servicios</div>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.0] tracking-editorial">
              <span className="text-momentum-chalk">Sistemas creativos. </span>
              <span className="text-magenta-gradient">No tareas sueltas.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm text-[15px] leading-[1.6] text-momentum-mist/80"
          >
            Cada servicio es un sistema completo, no un entregable aislado.
            Diseñamos para que tu marca funcione cuando dejemos la sala.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
