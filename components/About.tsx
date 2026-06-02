"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const PHRASES = [
  { plain: "No creamos contenido.", accent: false },
  { plain: "Creamos", accent: false },
  { plain: "momentum.", accent: true },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  // Reveal progress for each word (one motion value per line; pre-computed y)
  const p0 = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const p1 = useTransform(scrollYProgress, [0.18, 0.38], [0, 1]);
  const p2 = useTransform(scrollYProgress, [0.32, 0.55], [0, 1]);
  const y0 = useTransform(p0, [0, 1], ["60%", "0%"]);
  const y1 = useTransform(p1, [0, 1], ["60%", "0%"]);
  const y2 = useTransform(p2, [0, 1], ["60%", "0%"]);
  const lines = [
    { opacity: p0, y: y0 },
    { opacity: p1, y: y1 },
    { opacity: p2, y: y2 },
  ];

  return (
    <section
      id="filosofia"
      ref={ref}
      className="relative bg-momentum-void section-pad py-32 md:py-48 overflow-hidden"
    >
      {/* Magenta sweep highlight */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-magenta-sweep opacity-[0.04] blur-3xl rotate-[-6deg]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 pb-14 border-b hairline"
        >
          <div className="eyebrow">01 — Filosofía</div>
          <div className="hidden md:block label-ui text-right max-w-[28ch]">
            Diseñamos sistemas creativos que generan autoridad y crecimiento sostenible.
          </div>
        </motion.div>

        {/* Massive scroll-driven phrase */}
        <div className="pt-20 md:pt-32">
          <h2 className="font-display font-medium tracking-editorial leading-[0.95] text-[clamp(2.8rem,8vw,9rem)] max-w-[18ch]">
            {PHRASES.map((p, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  style={{ opacity: lines[i].opacity, y: lines[i].y }}
                  className={
                    p.accent
                      ? "block text-magenta-gradient"
                      : "block text-momentum-chalk"
                  }
                >
                  {p.plain}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Two-column supporting copy */}
          <div className="mt-24 grid md:grid-cols-12 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 md:col-start-2"
            >
              <div className="label-ui mb-4">Qué hacemos</div>
              <p className="text-[17px] md:text-[19px] leading-[1.55] text-momentum-mist text-pretty">
                Momentum Media es la división creativa de Frago Vanguard Group.
                Construimos identidades visuales, narrativas y ecosistemas de
                contenido para marcas que aspiran a ser referentes — no
                seguidoras.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5"
            >
              <div className="label-ui mb-4">Por qué importa</div>
              <p className="text-[17px] md:text-[19px] leading-[1.55] text-momentum-mist text-pretty">
                En un mundo saturado de contenido, lo único que mueve a la
                gente es la emoción. Diseñamos experiencias visuales que se
                sienten antes de pensarse — y que convierten audiencias en
                comunidades reales.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
