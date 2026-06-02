"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { SplitText } from "./SplitText";

const MomentumScene = dynamic(
  () => import("./scenes/MomentumScene").then((m) => m.MomentumScene),
  { ssr: false, loading: () => null },
);

function useInViewport(ref: React.RefObject<HTMLElement | null>, rootMargin = "100px") {
  const [inView, setInView] = useState(true);
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

const REVEAL = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1.05, delay: 0.55 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 1.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const sceneActive = useInViewport(ref, "200px");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yScene = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yCopy = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityCopy = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-momentum-void"
    >
      {/* Radial magenta glow */}
      <div className="pointer-events-none absolute inset-0 bg-magenta-radial opacity-70" />

      {/* 3D scene layer — only mounted while hero is in viewport */}
      <motion.div
        style={{ y: yScene }}
        className="absolute inset-0 z-0"
      >
        {sceneActive && <MomentumScene />}
      </motion.div>

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,5,5,0.7)_85%,_rgba(5,5,5,0.95)_100%)]" />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-grain opacity-[0.06] mix-blend-overlay" />

      {/* Copy */}
      <motion.div
        style={{ y: yCopy, opacity: opacityCopy }}
        className="relative z-10 section-pad min-h-[100svh] flex flex-col justify-center pt-32 pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-8"
        >
          Frago&apos;s · Creative Growth Ecosystem
        </motion.div>

        {/* Massive headline with char-level reveal */}
        <h1 className="font-display font-medium tracking-editorial leading-[0.92] text-[clamp(3.2rem,9.5vw,11rem)] max-w-[18ch]">
          <SplitText
            as="span"
            text="Movemos"
            trigger="mount"
            delay={0.55}
            stagger={0.035}
            className="block text-chalk-metallic"
          />
          <SplitText
            as="span"
            text="ideas que"
            trigger="mount"
            delay={0.72}
            stagger={0.035}
            className="block text-chalk-metallic"
          />
          <SplitText
            as="span"
            text="construyen marcas."
            trigger="mount"
            delay={0.92}
            stagger={0.025}
            className="block text-magenta-gradient"
          />
        </h1>

        {/* Subline */}
        <motion.p
          variants={FADE_UP}
          custom={0}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-[44ch] text-[15px] md:text-[17px] leading-[1.55] text-momentum-mist/85 text-pretty"
        >
          Ecosistema creativo premium para fundadores, atletas, creadores y marcas
          que quieren dejar huella. Branding, storytelling y sistemas de contenido
          diseñados para generar autoridad — y momentum real.
        </motion.p>

        {/* CTAs — primary is magnetic */}
        <motion.div
          variants={FADE_UP}
          custom={1}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#contacto">
            Iniciar proyecto
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <a href="#servicios" className="btn-ghost">
            Ver servicios
          </a>
        </motion.div>

        {/* Bottom strip — pillars marquee */}
        <motion.div
          variants={FADE_UP}
          custom={2}
          initial="hidden"
          animate="show"
          className="absolute bottom-10 left-0 right-0 section-pad"
        >
          <div className="flex items-center justify-between gap-6">
            <div className="hidden md:flex items-center gap-2.5 text-momentum-mist/55">
              <span className="label-ui">Scroll</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-momentum-mist/60 to-transparent"
              />
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-2 justify-end">
              {["Creatividad", "Conexión", "Estrategia", "Innovación", "Impacto"].map((p, i) => (
                <span key={p} className="flex items-center gap-2 label-ui">
                  <span className="w-1 h-1 rounded-full bg-momentum-magenta shadow-magenta-sm" />
                  {p}
                  {i < 4 && <span className="text-momentum-mist/20 ml-4">/</span>}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
