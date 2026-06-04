"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { initSound, isSoundEnabled, setSoundEnabled, subscribeSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/**
 * Animated sound toggle. Renders 3 small vertical bars that pulse when sound
 * is on, fall silent + show a slash when off.
 */
export function SoundToggle({ className }: { className?: string }) {
  const [on, set] = useState(false);
  const [mounted, mounted_set] = useState(false);

  useEffect(() => {
    initSound();
    set(isSoundEnabled());
    mounted_set(true);
    return subscribeSound(set);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "w-10 h-10 rounded-full border border-white/10 grid place-items-center",
          className,
        )}
        aria-label="Sound toggle"
        type="button"
      />
    );
  }

  const toggle = () => setSoundEnabled(!on);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Apagar sonido" : "Encender sonido"}
      data-sound="ignore"
      className={cn(
        "group relative w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-momentum-magenta/60 transition-colors",
        className,
      )}
    >
      <div className="relative flex items-end gap-[3px] h-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-[2px] bg-momentum-chalk rounded-full"
            initial={false}
            animate={
              on
                ? {
                    height: [6, 12, 6],
                    backgroundColor: "#ff2d8d",
                  }
                : {
                    height: 6,
                    backgroundColor: "#9c9ca0",
                  }
            }
            transition={
              on
                ? {
                    duration: 0.8 + i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08,
                  }
                : { duration: 0.25 }
            }
          />
        ))}
        {/* Slash overlay when off */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: on ? 0 : 1, opacity: on ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute left-[-3px] right-[-3px] top-1/2 h-px bg-momentum-mist/70 origin-left rotate-[-30deg]"
        />
      </div>
    </button>
  );
}
