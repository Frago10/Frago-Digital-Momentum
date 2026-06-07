"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  SPLINE INTEGRATION — Clarity Stream                                       */
/*  Scene: https://my.spline.design/claritystream-47nWn6btZt2mxZghMzV4krxa/   */
/*  Runtime: webpack alias in next.config.mjs makes the import resolvable.    */
/* -------------------------------------------------------------------------- */

const SPLINE_SCENE =
  "https://prod.spline.design/claritystream-47nWn6btZt2mxZghMzV4krxa/scene.splinecode";

// Dynamic + ssr:false so the ~600KB runtime never blocks first paint and
// never tries to render server-side (Spline relies on the browser globals).
const SplineEmbed = dynamic(() => import("./SplineEmbed"), {
  ssr: false,
  loading: () => null,
});

/* -------------------------------------------------------------------------- */
/*  Fallback — cinematic liquid blob scene (pure CSS + Motion)                */
/*  Se ve premium por sí solo. Se reemplaza automáticamente cuando            */
/*  SPLINE_SCENE tenga URL.                                                   */
/* -------------------------------------------------------------------------- */

function LiquidFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Backdrop noise */}
      <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />

      {/* Blob 1 — large magenta core */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 520,
          height: 520,
          marginLeft: -260,
          marginTop: -260,
          borderRadius: "42% 58% 70% 30% / 45% 30% 70% 55%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,123,184,0.95) 0%, rgba(255,45,141,0.85) 35%, rgba(122,15,63,0.5) 65%, rgba(5,5,5,0) 80%)",
          filter: "blur(2px)",
          mixBlendMode: "screen",
        }}
        animate={{
          borderRadius: [
            "42% 58% 70% 30% / 45% 30% 70% 55%",
            "60% 40% 30% 70% / 55% 65% 35% 45%",
            "30% 70% 65% 35% / 35% 45% 55% 65%",
            "42% 58% 70% 30% / 45% 30% 70% 55%",
          ],
          rotate: [0, 90, 180, 360],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 — orbiting deep magenta */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 340,
          height: 340,
          marginLeft: -170,
          marginTop: -170,
          borderRadius: "65% 35% 50% 50% / 40% 60% 40% 60%",
          background:
            "radial-gradient(circle at 60% 40%, rgba(196,25,107,0.75) 0%, rgba(122,15,63,0.55) 50%, rgba(5,5,5,0) 80%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -90, 60, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 — small white highlight */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 80, -30, 0],
          opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer concentric rings — subtle structure */}
      {[280, 360, 460].map((size, i) => (
        <motion.div
          key={size}
          className="absolute left-1/2 top-1/2 rounded-full border border-momentum-magenta/10"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          animate={{
            rotate: i % 2 === 0 ? 360 : -360,
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 30 + i * 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Center cross / focal mark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-px h-12 bg-momentum-magenta/40 absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="h-px w-12 bg-momentum-magenta/40 absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section — Manifesto with Spline embed + scroll-driven typography          */
/* -------------------------------------------------------------------------- */

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

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const sceneActive = useInViewport(ref, "300px");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slow parallax on the scene + opposite drift on text
  const sceneY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.4, 0.85]);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative min-h-[110svh] w-full bg-momentum-void overflow-hidden"
    >
      {/* Full-bleed scene layer */}
      <motion.div
        style={{ y: sceneY }}
        className="absolute inset-0 z-0"
      >
        {sceneActive &&
          (SPLINE_SCENE ? (
            <Suspense fallback={<LiquidFallback />}>
              <div className="absolute inset-0">
                <SplineEmbed scene={SPLINE_SCENE} />
              </div>
            </Suspense>
          ) : (
            <LiquidFallback />
          ))}
      </motion.div>

      {/* Tinted vignette overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(5,5,5,0.7)_75%,_rgba(5,5,5,0.95)_100%)]"
      />

      {/* Grain */}
      <div className="absolute inset-0 z-[2] bg-grain opacity-[0.05] mix-blend-overlay pointer-events-none" />

      {/* Typography overlay */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 min-h-[110svh] section-pad flex flex-col justify-center"
      >
        <div className="mx-auto max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-10"
          >
            Manifesto · Lo que creemos
          </motion.div>

          {/* Massive editorial statement */}
          <h2 className="font-display font-medium tracking-editorial leading-[0.95] text-[clamp(2.6rem,7.5vw,8rem)] max-w-[20ch]">
            <RevealLine text="Una marca sin movimiento" delay={0.1} />
            <RevealLine text="es solo un logo." delay={0.25} accent />
            <RevealLine text="Nosotros construimos" delay={0.45} />
            <RevealLine text="lo que viene después." delay={0.6} accent />
          </h2>

          {/* Three-column credo */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {[
              {
                num: "I.",
                title: "La forma sigue al sentimiento",
                body: "Antes de la pieza, definimos la emoción. La estética sin propósito es ruido visual.",
              },
              {
                num: "II.",
                title: "El sistema sobrevive a la pieza",
                body: "Un anuncio se olvida; una identidad bien construida acompaña una década entera.",
              },
              {
                num: "III.",
                title: "El momentum es métrico",
                body: "Medimos atención, conexión y conversión — no likes. Lo que no genera momentum no vuelve.",
              },
            ].map((credo, i) => (
              <motion.div
                key={credo.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.85 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-l border-momentum-magenta/40 pl-5"
              >
                <div className="font-display text-xs tracking-[0.32em] text-momentum-magenta mb-3">
                  {credo.num}
                </div>
                <h3 className="font-display text-xl md:text-2xl text-momentum-chalk mb-2 tracking-editorial">
                  {credo.title}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-momentum-mist/75 text-pretty">
                  {credo.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function RevealLine({
  text,
  delay,
  accent,
}: {
  text: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        className={
          accent
            ? "block text-magenta-gradient"
            : "block text-chalk-metallic"
        }
      >
        {text}
      </motion.span>
    </span>
  );
}
