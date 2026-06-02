"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

/**
 * Custom magnetic cursor for Momentum Media.
 *
 * Layers:
 *  - dot: tight, follows pointer 1:1 (no spring) for precision
 *  - ring: large, spring-eased trail for "weight"
 *  - trail: short fading dust trail behind movement
 *
 * Context awareness:
 *  - Over [data-cursor="link"] / a / button → ring grows + magenta fill
 *  - Over [data-cursor="text"] → ring shrinks to vertical bar
 *  - On mousedown → both layers contract briefly
 *
 * Disabled automatically on touch / coarse pointer devices.
 */

type Variant = "default" | "link" | "text" | "view" | "drag";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  // Raw position values — dot follows directly, ring follows with spring
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const ringX = useSpring(mx, { stiffness: 280, damping: 26, mass: 0.55 });
  const ringY = useSpring(my, { stiffness: 280, damping: 26, mass: 0.55 });

  // Trail dots
  const trailRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Only enable for fine pointers (mouse/trackpad)
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "cursor-none-override";
    style.innerHTML = `
      *, *::before, *::after { cursor: none !important; }
      input, textarea, [contenteditable] { cursor: text !important; }
    `;
    document.head.appendChild(style);

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      // throttle trail
      const now = performance.now();
      if (now - lastTrailTime.current > 32) {
        lastTrailTime.current = now;
        const next = { x: e.clientX, y: e.clientY, id: now };
        trailRef.current = [next, ...trailRef.current].slice(0, 6);
        setTrail([...trailRef.current]);
      }

      // Hover context
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]") as HTMLElement | null;
      const cursorLabel = target.closest("[data-cursor-label]") as HTMLElement | null;
      const linkOrBtn = target.closest("a, button, [role='button']") as HTMLElement | null;
      const editable =
        target.closest("input, textarea, [contenteditable='true']") !== null;

      if (cursorLabel?.dataset.cursorLabel) {
        setLabel(cursorLabel.dataset.cursorLabel);
      } else {
        setLabel(null);
      }

      if (editable) setVariant("text");
      else if (cursorAttr?.dataset.cursor) setVariant(cursorAttr.dataset.cursor as Variant);
      else if (linkOrBtn) setVariant("link");
      else setVariant("default");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      document.getElementById("cursor-none-override")?.remove();
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  // Variant-based sizing & style
  const ringSize =
    variant === "link" ? 56 :
    variant === "view" ? 92 :
    variant === "text" ? 4 :
    variant === "drag" ? 72 :
    36;
  const ringScale = pressed ? 0.7 : 1;
  const ringHeight = variant === "text" ? 28 : ringSize;
  const ringBorderRadius = variant === "text" ? 2 : 999;

  return (
    <>
      {/* Trail dots */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden
        style={{ opacity: hidden ? 0 : 1, transition: "opacity 200ms" }}
      >
        {trail.map((t, i) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full bg-momentum-magenta"
            style={{
              left: t.x - 3,
              top: t.y - 3,
              width: 6,
              height: 6,
              filter: "blur(2px)",
              mixBlendMode: "screen",
              opacity: (6 - i) / 12,
            }}
          />
        ))}
      </div>

      {/* Ring (slow follower) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
          transition: "opacity 200ms",
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringHeight,
            borderRadius: ringBorderRadius,
            scale: ringScale,
            backgroundColor:
              variant === "link" || variant === "view"
                ? "rgba(255, 45, 141, 0.18)"
                : "rgba(255, 45, 141, 0)",
            borderColor:
              variant === "text"
                ? "rgba(255, 45, 141, 0.9)"
                : variant === "link" || variant === "view"
                ? "rgba(255, 45, 141, 0.85)"
                : "rgba(242, 242, 242, 0.45)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.4 }}
          className="border backdrop-blur-[2px] grid place-items-center"
        >
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="font-display text-[10px] tracking-[0.18em] text-momentum-chalk whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Dot (tight follower, no spring) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
          transition: "opacity 200ms",
        }}
      >
        <motion.div
          animate={{
            width: variant === "text" ? 0 : pressed ? 4 : 6,
            height: variant === "text" ? 0 : pressed ? 4 : 6,
            opacity: variant === "text" ? 0 : 1,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-full bg-momentum-chalk shadow-magenta-sm"
        />
      </motion.div>
    </>
  );
}
