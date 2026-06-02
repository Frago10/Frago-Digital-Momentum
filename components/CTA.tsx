"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./MagneticButton";

const ParticleField = dynamic(
  () => import("./scenes/ParticleField").then((m) => m.ParticleField),
  { ssr: false, loading: () => null },
);

function useInViewport(ref: React.RefObject<HTMLElement | null>, rootMargin = "200px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const particlesActive = useInViewport(ref, "200px");
  return (
    <section
      id="contacto"
      ref={ref}
      className="relative bg-momentum-void overflow-hidden"
    >
      <div className="relative min-h-[90svh] flex items-center section-pad py-32 md:py-40">
        {/* Particle layer */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
          {particlesActive && <ParticleField />}
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,5,5,0.7)_85%,_rgba(5,5,5,0.95)_100%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow justify-center mb-8"
          >
            05 — Hablemos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium tracking-editorial leading-[0.95] text-[clamp(2.8rem,8vw,8rem)] text-balance"
          >
            <span className="block text-chalk-metallic">Si quieres construir</span>
            <span className="block text-magenta-gradient">una marca con momentum,</span>
            <span className="block text-momentum-chalk/70 text-[0.6em] tracking-editorial font-normal mt-6">
              empecemos por una conversación.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton href="mailto:hola@fragosmomentum.com" pull={0.4} labelPull={0.6}>
              Iniciar proyecto
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <a href="#filosofia" className="btn-ghost">
              Conocer la filosofía
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-momentum-mist/60"
          >
            <span className="label-ui">hola@fragosmomentum.com</span>
            <span className="hidden md:inline text-momentum-mist/20">·</span>
            <span className="label-ui">@fragosmomentum</span>
            <span className="hidden md:inline text-momentum-mist/20">·</span>
            <span className="label-ui">Disponible globalmente</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
