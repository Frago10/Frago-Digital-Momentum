"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Six logo direction explorations for Frago's Momentum Media.
 * Each accepts `size` (px) and `animated`.
 */

type LogoProps = { size?: number; animated?: boolean; className?: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/*  V1 — Kinetic M animada                                                    */
/*  Mark from brand sheet + animated magenta slash + shimmer on white blade   */
/* -------------------------------------------------------------------------- */

export function LogoV1({ size = 96, animated = true, className }: LogoProps) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={cn("block", className)} aria-label="Momentum Media V1">
      <defs>
        <linearGradient id="v1-white" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcdcde" />
        </linearGradient>
        <linearGradient id="v1-magenta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7ab8" />
          <stop offset="55%" stopColor="#ff2d8d" />
          <stop offset="100%" stopColor="#7a0f3f" />
        </linearGradient>
        <linearGradient id="v1-shimmer" x1="-100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="v1-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="v1-whiteClip">
          <path d="M 18 108 L 18 18 L 38 18 L 60 70 L 60 108 Z" />
        </clipPath>
      </defs>

      {/* white blade */}
      <path d="M 18 108 L 18 18 L 38 18 L 60 70 L 60 108 Z" fill="url(#v1-white)" />

      {/* shimmer sweep clipped to the blade */}
      {animated && (
        <motion.rect
          x="0"
          y="0"
          width="120"
          height="120"
          fill="url(#v1-shimmer)"
          clipPath="url(#v1-whiteClip)"
          initial={{ x: -120 }}
          animate={{ x: 120 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
        />
      )}

      {/* magenta blade */}
      <motion.path
        d="M 60 70 L 82 18 L 102 18 L 102 108 L 82 108 L 82 56 L 70 86 Z"
        fill="url(#v1-magenta)"
        filter="url(#v1-glow)"
        animate={animated ? { filter: ["url(#v1-glow)", "url(#v1-glow)"] } : undefined}
      />

      {/* pulsing magenta dot near the slash */}
      {animated && (
        <motion.circle
          cx="92"
          cy="40"
          r="2.4"
          fill="#ffffff"
          animate={{ opacity: [0.2, 1, 0.2], r: [2, 3, 2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  V2 — Liquid metallic M                                                    */
/*  M with chrome+magenta gradient + traveling highlight                      */
/* -------------------------------------------------------------------------- */

export function LogoV2({ size = 96, animated = true, className }: LogoProps) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={cn("block", className)} aria-label="Momentum Media V2">
      <defs>
        <linearGradient id="v2-liquid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f7fa" />
          <stop offset="30%" stopColor="#cfcfd2" />
          <stop offset="55%" stopColor="#ff7ab8" />
          <stop offset="80%" stopColor="#ff2d8d" />
          <stop offset="100%" stopColor="#7a0f3f" />
        </linearGradient>
        <linearGradient id="v2-sweep" x1="-50%" y1="0%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <clipPath id="v2-mclip">
          <path d="M 18 108 L 18 18 L 38 18 L 60 70 L 82 18 L 102 18 L 102 108 L 82 108 L 82 56 L 60 100 L 38 56 L 38 108 Z" />
        </clipPath>
      </defs>

      <path
        d="M 18 108 L 18 18 L 38 18 L 60 70 L 82 18 L 102 18 L 102 108 L 82 108 L 82 56 L 60 100 L 38 56 L 38 108 Z"
        fill="url(#v2-liquid)"
      />

      {animated && (
        <motion.rect
          x="0"
          y="0"
          width="60"
          height="120"
          fill="url(#v2-sweep)"
          clipPath="url(#v2-mclip)"
          initial={{ x: -60 }}
          animate={{ x: 120 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
        />
      )}

      {/* subtle inner shadow line */}
      <path
        d="M 18 108 L 18 18 L 38 18 L 60 70 L 82 18 L 102 18 L 102 108 L 82 108 L 82 56 L 60 100 L 38 56 L 38 108 Z"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  V3 — MM monogram interlock                                                */
/*  Two stylized Ms interlocked, white + magenta                              */
/* -------------------------------------------------------------------------- */

export function LogoV3({ size = 96, animated = true, className }: LogoProps) {
  return (
    <svg viewBox="0 0 140 110" width={size * 1.27} height={size * (110 / 120)} className={cn("block", className)} aria-label="Momentum Media V3">
      <defs>
        <linearGradient id="v3-white" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfcfd2" />
        </linearGradient>
        <linearGradient id="v3-mag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7ab8" />
          <stop offset="60%" stopColor="#ff2d8d" />
          <stop offset="100%" stopColor="#c4196b" />
        </linearGradient>
      </defs>

      {/* first M — white, on the left, slightly behind */}
      <motion.g
        initial={animated ? { x: -8, opacity: 0 } : false}
        animate={animated ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.0, ease: EASE }}
      >
        <path
          d="M 8 100 L 8 14 L 22 14 L 44 64 L 66 14 L 80 14 L 80 100 L 66 100 L 66 44 L 50 80 L 38 80 L 22 44 L 22 100 Z"
          fill="url(#v3-white)"
        />
      </motion.g>

      {/* second M — magenta, offset to the right, overlapping */}
      <motion.g
        initial={animated ? { x: 8, opacity: 0 } : false}
        animate={animated ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
        style={{ mixBlendMode: "screen" }}
      >
        <path
          d="M 58 100 L 58 14 L 72 14 L 94 64 L 116 14 L 130 14 L 130 100 L 116 100 L 116 44 L 100 80 L 88 80 L 72 44 L 72 100 Z"
          fill="url(#v3-mag)"
        />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  V4 — Pure wordmark editorial                                              */
/*  "MOMENTUM." with magenta period + animated underline                      */
/* -------------------------------------------------------------------------- */

export function LogoV4({ size = 96, animated = true, className }: LogoProps) {
  // size controls the font-size relative to height
  const fontSize = size * 0.42;
  return (
    <div
      className={cn("inline-flex flex-col items-start leading-none", className)}
      style={{ height: size }}
    >
      <div className="flex items-baseline" style={{ fontSize, fontFamily: '"Cabinet Grotesk", "Satoshi", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" }}>
        <motion.span
          initial={animated ? { opacity: 0, y: 6 } : false}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-momentum-chalk"
        >
          MOMENTUM
        </motion.span>
        <motion.span
          initial={animated ? { opacity: 0, scale: 0.4 } : false}
          animate={animated ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="text-momentum-magenta"
          style={{ marginLeft: -fontSize * 0.04 }}
        >
          .
        </motion.span>
      </div>
      <motion.div
        initial={animated ? { scaleX: 0 } : false}
        animate={animated ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.0, delay: 0.4, ease: EASE }}
        className="origin-left mt-2 h-px bg-gradient-to-r from-momentum-magenta via-momentum-magenta to-transparent"
        style={{ width: fontSize * 4.2 }}
      />
      <div
        className="mt-1 text-momentum-mist/60"
        style={{ fontFamily: '"Satoshi", sans-serif', fontSize: fontSize * 0.22, letterSpacing: "0.32em", fontWeight: 500 }}
      >
        FRAGO&apos;S · MEDIA
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  V5 — Arrow / Glyph abstracto                                              */
/*  Sharp upward chevron — vector of momentum                                 */
/* -------------------------------------------------------------------------- */

export function LogoV5({ size = 96, animated = true, className }: LogoProps) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={cn("block", className)} aria-label="Momentum Media V5">
      <defs>
        <linearGradient id="v5-mag" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#7a0f3f" />
          <stop offset="60%" stopColor="#ff2d8d" />
          <stop offset="100%" stopColor="#ff7ab8" />
        </linearGradient>
        <filter id="v5-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer chevron — white */}
      <motion.path
        d="M 60 12 L 108 90 L 92 90 L 60 38 L 28 90 L 12 90 Z"
        fill="#ffffff"
        initial={animated ? { y: 14, opacity: 0 } : false}
        animate={animated ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.0, ease: EASE }}
      />

      {/* Inner chevron — magenta with glow */}
      <motion.path
        d="M 60 46 L 86 90 L 74 90 L 60 66 L 46 90 L 34 90 Z"
        fill="url(#v5-mag)"
        filter="url(#v5-glow)"
        initial={animated ? { y: 14, opacity: 0 } : false}
        animate={animated ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
      />

      {/* Base line */}
      <motion.rect
        x="12"
        y="98"
        width="96"
        height="3"
        rx="1.5"
        fill="#ff2d8d"
        initial={animated ? { scaleX: 0 } : false}
        animate={animated ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        style={{ transformOrigin: "left center" }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  V6 — Type-as-architecture                                                 */
/*  Massive bold M, white face + magenta edge depth                           */
/* -------------------------------------------------------------------------- */

export function LogoV6({ size = 96, animated = true, className }: LogoProps) {
  return (
    <svg viewBox="0 0 130 120" width={size * (130 / 120)} height={size} className={cn("block", className)} aria-label="Momentum Media V6">
      <defs>
        <linearGradient id="v6-face" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8eaed" />
        </linearGradient>
        <linearGradient id="v6-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7ab8" />
          <stop offset="100%" stopColor="#ff2d8d" />
        </linearGradient>
      </defs>

      {/* Magenta back layer — extrude effect */}
      <motion.path
        d="M 12 110 L 12 14 L 32 14 L 65 76 L 98 14 L 118 14 L 118 110 L 100 110 L 100 50 L 76 96 L 54 96 L 30 50 L 30 110 Z"
        fill="url(#v6-edge)"
        transform="translate(6 6)"
        initial={animated ? { opacity: 0, x: 14, y: 14 } : false}
        animate={animated ? { opacity: 1, x: 6, y: 6 } : undefined}
        transition={{ duration: 1.0, ease: EASE }}
      />

      {/* White front face */}
      <motion.path
        d="M 12 110 L 12 14 L 32 14 L 65 76 L 98 14 L 118 14 L 118 110 L 100 110 L 100 50 L 76 96 L 54 96 L 30 50 L 30 110 Z"
        fill="url(#v6-face)"
        initial={animated ? { opacity: 0, y: 12 } : false}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lockup variants — small horizontal pairing of mark + wordmark             */
/* -------------------------------------------------------------------------- */

export function LockupV1() {
  return (
    <div className="flex items-center gap-3">
      <LogoV1 size={36} />
      <div className="flex flex-col leading-none">
        <span className="font-display text-[10px] tracking-[0.32em] text-momentum-mist/70">FRAGO&apos;S</span>
        <span className="font-display text-[15px] font-medium tracking-[0.18em] text-momentum-chalk">
          MOMENTUM<span className="text-momentum-magenta">.</span>
        </span>
      </div>
    </div>
  );
}
