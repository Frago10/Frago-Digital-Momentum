"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Frago's Momentum Media — Chevron mark (V5).
 * Sharp upward chevron representing vector of momentum.
 * Outer white blade + inner magenta blade with glow + magenta base line.
 */
export function LogoMark({
  className,
  size = 36,
  animated = true,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn("block", className)}
      aria-label="Momentum Media"
      role="img"
    >
      <defs>
        <linearGradient id="lm-mag" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#7a0f3f" />
          <stop offset="60%" stopColor="#ff2d8d" />
          <stop offset="100%" stopColor="#ff7ab8" />
        </linearGradient>
        <filter id="lm-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.6" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer chevron — white */}
      <motion.path
        d="M 60 12 L 108 90 L 92 90 L 60 38 L 28 90 L 12 90 Z"
        fill="#ffffff"
        initial={animated ? { y: 14, opacity: 0 } : false}
        animate={animated ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.0, ease }}
      />

      {/* Inner chevron — magenta with glow */}
      <motion.path
        d="M 60 46 L 86 90 L 74 90 L 60 66 L 46 90 L 34 90 Z"
        fill="url(#lm-mag)"
        filter="url(#lm-glow)"
        initial={animated ? { y: 14, opacity: 0 } : false}
        animate={animated ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.0, delay: 0.15, ease }}
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
        transition={{ duration: 0.7, delay: 0.4, ease }}
        style={{ transformOrigin: "left center" }}
      />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark size={32} />
      <div className="flex flex-col leading-none">
        <span className="font-display text-[10px] tracking-[0.32em] text-momentum-mist/70">
          FRAGO&apos;S
        </span>
        <span className="font-display text-[15px] font-medium tracking-[0.18em] text-momentum-chalk">
          MOMENTUM<span className="text-momentum-magenta">.</span>
        </span>
      </div>
    </div>
  );
}
