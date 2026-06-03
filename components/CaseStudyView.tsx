"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LenisProvider } from "./LenisProvider";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MagneticButton } from "./MagneticButton";
import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, type CaseStudy } from "@/lib/cases";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Find next case for "Siguiente caso" link
  const idx = CASE_STUDIES.findIndex((c) => c.slug === study.slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <LenisProvider>
      <Nav />
      <main className="relative bg-momentum-void text-momentum-chalk">
        {/* HERO */}
        <section
          ref={heroRef}
          className={cn(
            "relative min-h-[95svh] overflow-hidden section-pad pt-32 pb-20 flex flex-col justify-end",
            "bg-gradient-to-br",
            study.gradient,
          )}
        >
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,5,5,0.65)_85%,_rgba(5,5,5,0.92)_100%)]"
          />
          <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 mx-auto max-w-7xl w-full"
          >
            <div className="flex items-center justify-between gap-4 mb-12">
              <Link
                href="/"
                className="label-ui flex items-center gap-2 text-momentum-chalk/70 hover:text-momentum-chalk transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 6H3M5.5 3.5 3 6l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Volver al sitio
              </Link>
              <div className="flex items-center gap-3 label-ui">
                <span>{study.num} / 06</span>
                <span className="text-momentum-chalk/30">·</span>
                <span>{study.year}</span>
              </div>
            </div>

            <div className="eyebrow mb-6">{study.category}</div>

            <div className="font-display text-[10px] tracking-[0.4em] text-momentum-chalk/60 mb-3">
              CLIENTE · {study.client.toUpperCase()}
            </div>

            <h1 className="font-display font-medium tracking-editorial leading-[0.95] text-[clamp(2.4rem,6.5vw,6.5rem)] max-w-[22ch] text-momentum-chalk">
              <SplitText text={study.title} trigger="mount" delay={0.4} stagger={0.018} />
            </h1>

            <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.55] text-momentum-chalk/80 text-pretty">
              {study.subtitle}
            </p>
          </motion.div>
        </section>

        {/* META STRIP */}
        <section className="relative bg-momentum-ink section-pad py-10 border-y hairline">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6">
            <Meta label="Cliente" value={study.client} />
            <Meta label="Duración" value={study.duration} />
            <Meta label="Año" value={study.year} />
            <Meta label="Categoría" value={study.category} />
          </div>
        </section>

        {/* CHALLENGE */}
        <Section eyebrow="01 — El reto" id="reto">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-editorial text-chalk-metallic max-w-3xl mb-6">
            El punto de partida.
          </h2>
          <p className="max-w-3xl text-[18px] leading-[1.65] text-momentum-mist text-pretty">
            {study.challenge}
          </p>
        </Section>

        {/* SCOPE */}
        <Section eyebrow="02 — Alcance" id="alcance" bg="ink">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-editorial text-chalk-metallic max-w-md">
                Qué entregamos.
              </h2>
            </div>
            <ul className="md:col-span-7 flex flex-col">
              {study.scope.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-5 py-5 border-b border-white/[0.08] last:border-b-0 group"
                >
                  <span className="font-display text-[11px] tracking-[0.32em] text-momentum-magenta w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl md:text-2xl tracking-editorial text-momentum-chalk flex-1">
                    {item}
                  </span>
                  <span
                    style={{ background: study.accent }}
                    className="h-px w-0 group-hover:w-12 transition-all duration-500"
                  />
                </motion.li>
              ))}
            </ul>
          </div>
        </Section>

        {/* APPROACH */}
        <Section eyebrow="03 — El enfoque" id="enfoque">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-editorial text-chalk-metallic max-w-3xl mb-12">
            Cómo lo construimos.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-6xl">
            {study.approach.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-7 border-l border-momentum-magenta/30"
              >
                <span
                  className="absolute top-0 -left-1.5 w-3 h-3 rounded-full"
                  style={{ background: study.accent, boxShadow: `0 0 14px ${study.accent}aa` }}
                />
                <div className="font-display text-[11px] tracking-[0.32em] text-momentum-magenta mb-3">
                  PASO {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[16px] leading-[1.6] text-momentum-mist text-pretty">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* QUOTE */}
        <Section eyebrow="" id="testimonio" bg="ink">
          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="font-display text-[5rem] leading-none text-momentum-magenta mb-6 opacity-60">
              &ldquo;
            </div>
            <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] tracking-editorial text-chalk-metallic text-balance mb-8">
              {study.quote.body}
            </p>
            <footer className="label-ui">
              {study.quote.author} · <span className="text-momentum-magenta">{study.quote.role}</span>
            </footer>
          </motion.blockquote>
        </Section>

        {/* OUTCOME + METRICS */}
        <Section eyebrow="04 — Resultado" id="resultado">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6">
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-editorial text-magenta-gradient max-w-md mb-6">
                Lo que pasó después.
              </h2>
              <p className="text-[16px] leading-[1.65] text-momentum-mist text-pretty">
                {study.outcome}
              </p>
            </div>
            <div className="md:col-span-6 grid grid-cols-2 gap-px bg-white/[0.06]">
              {study.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-momentum-void p-6 md:p-8 min-h-[160px] flex flex-col justify-between"
                >
                  <div className="label-ui">{m.label}</div>
                  <div className="font-display text-3xl md:text-4xl tracking-editorial text-momentum-chalk flex items-center gap-2">
                    {m.value}
                    {m.trend === "up" && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-momentum-magenta">
                        <path d="M5 12 L9 7 L13 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA → next case + back home */}
        <section className="relative bg-momentum-void section-pad py-32 overflow-hidden border-t hairline">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-magenta-radial opacity-30" />
          <div className="relative mx-auto max-w-5xl text-center">
            <div className="eyebrow justify-center mb-6">Siguiente caso</div>
            <Link
              href={`/work/${next.slug}/`}
              className="group block"
              data-cursor="view"
              data-cursor-label="Ver caso"
            >
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-editorial text-chalk-metallic group-hover:text-magenta-gradient transition-colors duration-500 mb-4">
                {next.title}
              </h2>
              <div className="label-ui group-hover:text-momentum-magenta transition-colors">
                {next.client.toUpperCase()} · {next.category}
              </div>
            </Link>
            <div className="mt-12 flex items-center justify-center gap-3">
              <MagneticButton href="/#contacto">
                Iniciar tu proyecto
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <Link href="/" className="btn-ghost">
                Volver al sitio
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </LenisProvider>
  );
}

/* -------------------------------------------------------------------------- */

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="label-ui mb-2">{label}</div>
      <div className="font-display text-base md:text-lg text-momentum-chalk tracking-editorial">
        {value}
      </div>
    </div>
  );
}

function Section({
  eyebrow,
  id,
  bg = "void",
  children,
}: {
  eyebrow: string;
  id: string;
  bg?: "void" | "ink";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative section-pad py-24 md:py-32",
        bg === "ink" ? "bg-momentum-ink" : "bg-momentum-void",
      )}
    >
      <div className="mx-auto max-w-7xl">
        {eyebrow && <div className="eyebrow mb-10">{eyebrow}</div>}
        {children}
      </div>
    </section>
  );
}
