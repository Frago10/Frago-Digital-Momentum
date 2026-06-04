"use client";

import { useEffect } from "react";
import { initSound, playClick, playHover, isSoundEnabled } from "@/lib/sound";

/**
 * Global delegation for hover + click sounds.
 * Mount once at the layout level. Reads its enabled state from the sound
 * module, which is the source of truth.
 */
export function SoundSystem() {
  useEffect(() => {
    initSound();

    // Track which element is currently "playing hover" so we don't retrigger
    // every pixel move within the same target.
    let lastHover: Element | null = null;

    const matchesInteractive = (el: Element | null): Element | null => {
      if (!el) return null;
      // closest() walks up the DOM
      const i = el.closest(
        "a, button, [role='button'], [data-cursor='view'], [data-cursor='link'], [data-sound='hover']",
      );
      return i;
    };

    const onPointerOver = (e: PointerEvent) => {
      if (!isSoundEnabled()) return;
      const t = matchesInteractive(e.target as Element);
      if (t && t !== lastHover) {
        lastHover = t;
        playHover();
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const t = matchesInteractive(e.target as Element);
      // Only clear when actually leaving (not bubbling between children)
      const related = matchesInteractive(e.relatedTarget as Element | null);
      if (t && t === lastHover && related !== t) {
        lastHover = null;
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!isSoundEnabled()) return;
      const t = matchesInteractive(e.target as Element);
      if (t) playClick();
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
