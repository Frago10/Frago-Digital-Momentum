"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "momentum-intro-seen";

/**
 * Cinematic first-visit loader.
 * Shows chevron drawing in + magenta sweep, then dissolves.
 * Only fires on first visit per session (sessionStorage).
 */
export function Intro() {
  // Lazy initializer reads sessionStorage exactly once at mount.
  // We default to `false` on the server to avoid SSR/CSR mismatch — the real
  // value is patched in a single useEffect below.
  const [show, show_set] = useState<boolean>(false);
  const [mounted, mounted_set] = useState(false);

  useEffect(() => {
    mounted_set(true);
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    show_set(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  // Lock body scroll while visible, unlock when dismissed
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Auto-dismiss after the full intro choreography (~3.2s total)
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => show_set(false), 3200);
    return () => clearTimeout(t);
  }, [show]);

  if (!mounted || !show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10001] bg-momentum-void grid place-items-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Chevron mark */}
        <svg viewBox="0 0 120 120" width={88} height={88}>
          <defs>
            <linearGradient id="intro-mag" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7a0f3f" />
              <stop offset="60%" stopColor="#ff2d8d" />
              <stop offset="100%" stopColor="#ff7ab8" />
            </linearGradient>
            <filter id="intro-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="M 60 12 L 108 90 L 92 90 L 60 38 L 28 90 L 12 90 Z"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.path
            d="M 60 12 L 108 90 L 92 90 L 60 38 L 28 90 L 12 90 Z"
            fill="#ffffff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d="M 60 46 L 86 90 L 74 90 L 60 66 L 46 90 L 34 90 Z"
            fill="url(#intro-mag)"
            filter="url(#intro-glow)"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "60px 90px" }}
          />
          <motion.rect
            x="12"
            y="98"
            width="96"
            height="3"
            rx="1.5"
            fill="#ff2d8d"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "12px 100px" }}
          />
        </svg>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center leading-none"
        >
          <span className="font-display text-[10px] tracking-[0.4em] text-momentum-mist/60 mb-2">
            FRAGO&apos;S
          </span>
          <span className="font-display text-2xl tracking-[0.18em] text-momentum-chalk">
            MOMENTUM<span className="text-momentum-magenta">.</span>
          </span>
        </motion.div>

        {/* Loading hairline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1.0, ease: "easeInOut" }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-momentum-magenta to-transparent origin-left"
        />
      </div>
    </motion.div>
  );
}
