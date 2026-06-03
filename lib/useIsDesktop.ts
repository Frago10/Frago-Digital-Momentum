"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the runtime has confirmed the viewport is desktop-sized
 * (>= 768px by default) AND the pointer is fine (mouse/trackpad, not touch).
 * Starts as `false` on the server to keep SSR/CSR identical.
 *
 * Use this to gate heavy R3F scenes, custom cursor, and other desktop-only
 * polish.
 */
export function useIsDesktop(minWidth = 768): boolean {
  const [is, set] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine)`,
    );
    const update = () => set(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth]);
  return is;
}
