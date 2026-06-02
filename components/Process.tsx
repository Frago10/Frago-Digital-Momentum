"use client";

import { motion } from "motion/react";

const STEPS = [
  { n: "01", title: "Diagnóstico", body: "Inmersión profunda en marca, audiencia y mercado. Definimos hipótesis y norte estratégico." },
  { n: "02", title: "Estrategia", body: "Posicionamiento, narrativa, sistema de mensajes y arquitectura de marca." },
  { n: "03", title: "Diseño", body: "Identidad visual, sistema gráfico, dirección de arte y prototipos de canal." },
  { n: "04", title: "Producción", body: "Ejecución premium: visual, video, motion y contenido modular listo para escalar." },
  { n: "05", title: "Lanzamiento", body: "Activación coordinada, distribución y medición del momentum generado." },
];

export function Process() {
  return (
    <section
      id="proceso"
      className="relative bg-momentum-ink section-pad py-32 md:py-44 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-magenta-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pb-10 border-b hairline mb-16"
        >
          <div className="eyebrow mb-5">04 — Proceso</div>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.0] tracking-editorial text-momentum-chalk max-w-3xl">
            Estrategia, creatividad y ejecución en una sola pista.
          </h2>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/[0.06]">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-7 bg-momentum-ink hover:bg-momentum-smoke transition-colors min-h-[260px] flex flex-col"
            >
              <div className="font-display text-[11px] tracking-[0.32em] text-momentum-magenta mb-4">
                {s.n}
              </div>
              <h3 className="font-display text-xl md:text-2xl text-momentum-chalk mb-3 tracking-editorial">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-momentum-mist/75 text-pretty">
                {s.body}
              </p>
              <div className="mt-auto pt-5 h-px bg-gradient-to-r from-momentum-magenta to-transparent w-0 group-hover:w-full transition-all duration-700" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
