"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** Animation trigger: viewport (whileInView) or "mount" (animate immediately) */
  trigger?: "viewport" | "mount";
  /** Stagger between characters (seconds) */
  stagger?: number;
  /** Initial delay before the first char starts (seconds) */
  delay?: number;
  /** Animate per-character (default) or per-word */
  by?: "char" | "word";
  /** Element to render the wrapper as */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Pull effect: "rise" lifts from below, "fade" just opacity */
  effect?: "rise" | "fade" | "blur";
};

/**
 * SplitText — character/word-level reveal on viewport or mount.
 * Honors `prefers-reduced-motion`.
 *
 * SSR-SAFE: renders plain text on the server, swaps to animated chars after
 * mount. Prevents the static-export bug where motion's `initial={opacity:0}`
 * would bake into the HTML and (if hydration ever stalls) leave text invisible.
 */
export function SplitText({
  text,
  className,
  trigger = "viewport",
  stagger = 0.025,
  delay = 0,
  by = "char",
  as = "span",
  effect = "rise",
}: Props) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const segments = useMemo(() => {
    if (by === "word") return text.split(" ");
    return text.split("");
  }, [text, by]);

  const Wrapper = as as keyof React.JSX.IntrinsicElements;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WrapperAny = Wrapper as any;

  // On the server (and the first client render before mount), render plain
  // text. This way no opacity-0 inline styles ever ship in static HTML.
  if (!mounted) {
    return (
      <WrapperAny className={cn(className)} aria-label={text}>
        {text}
      </WrapperAny>
    );
  }

  const initial =
    reduced
      ? { opacity: 0 }
      : effect === "rise"
        ? { opacity: 0, y: "75%" }
        : effect === "blur"
          ? { opacity: 0, filter: "blur(8px)" }
          : { opacity: 0 };
  const animate =
    reduced
      ? { opacity: 1 }
      : effect === "rise"
        ? { opacity: 1, y: "0%" }
        : effect === "blur"
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 1 };

  const inner = segments.map((seg, i) => {
    const isSpace = seg === " ";
    return (
      <span
        key={i}
        className="inline-block overflow-hidden align-baseline"
        style={isSpace ? { width: "0.32em" } : undefined}
        aria-hidden="true"
      >
        <motion.span
          initial={initial}
          {...(trigger === "viewport"
            ? { whileInView: animate, viewport: { once: true, amount: 0.5 } }
            : { animate })}
          transition={{
            duration: reduced ? 0.3 : 0.85,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block will-change-transform"
        >
          {isSpace ? " " : seg}
        </motion.span>
        {by === "word" && i < segments.length - 1 && (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </span>
    );
  });

  return (
    <WrapperAny className={cn(className)} aria-label={text}>
      {inner}
    </WrapperAny>
  );
}
