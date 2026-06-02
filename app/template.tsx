"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Next.js App Router template — re-mounts on every route change.
 * Gives every page a cinematic in-fade and a fade-out via overlay sweep.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {/* Sweep overlay — magenta wipe that fires once per mount, hiding the
          paint flicker and giving a cinematic curtain reveal. */}
      <motion.div
        key={`sweep-${pathname}`}
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.0, delay: 0.05, ease: [0.83, 0, 0.17, 1] }}
        className="pointer-events-none fixed inset-0 z-[9000] origin-bottom"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, #160516 35%, #c4196b 70%, #ff2d8d 100%)",
        }}
      />

      {/* Page content fade-in */}
      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
