"use client";

/**
 * Spline runtime wrapper.
 *
 * The @splinetool/react-spline package ships ESM-only with a strict `exports`
 * map that confuses Next.js's resolver. We work around it with a webpack
 * alias in next.config.mjs that points `@splinetool/react-spline/next`
 * directly at the built file. With that in place this normal import works.
 */
import Spline from "@splinetool/react-spline/next";

export default function SplineEmbed({ scene }: { scene: string }) {
  return (
    <Spline
      scene={scene}
      // Hide the default Spline watermark / logo if Spline's TOS allows.
      // Keeping these props as a hint to anyone reading — they require the
      // paid plan to actually take effect.
    />
  );
}
