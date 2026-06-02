"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How aggressively the button follows the cursor (0..1) */
  pull?: number;
  /** Inner text/label also gets a stronger pull for layered motion */
  labelPull?: number;
  type?: "button" | "submit";
};

/**
 * Magnetic button — when the cursor enters its hit area (slightly expanded
 * via padding), the button translates toward the cursor, and the inner label
 * pulls a bit further. Spring-eased for organic weight.
 *
 * Pairs with the custom Cursor component (Cursor.tsx) to feel like the
 * cursor "magnetically connects" to interactive elements.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  pull = 0.35,
  labelPull = 0.55,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 });

  // Label is a softer/looser spring so it lags slightly behind the shell
  const lx = useTransform(sx, (v) => v * (labelPull / pull));
  const ly = useTransform(sy, (v) => v * (labelPull / pull));

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * pull);
    y.set((e.clientY - cy) * pull);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span style={{ x: lx, y: ly }} className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </motion.span>
  );

  const shellProps = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: sx, y: sy },
    className: cn("inline-block will-change-transform", className),
  };

  if (href) {
    return (
      // @ts-expect-error motion span as inline-block magnet wrapper
      <motion.span {...shellProps}>
        <a href={href} className="btn-magenta inline-flex items-center" onClick={onClick}>
          {inner}
        </a>
      </motion.span>
    );
  }

  return (
    // @ts-expect-error motion span as inline-block magnet wrapper
    <motion.span {...shellProps}>
      <button type={type} className="btn-magenta inline-flex items-center" onClick={onClick}>
        {inner}
      </button>
    </motion.span>
  );
}
