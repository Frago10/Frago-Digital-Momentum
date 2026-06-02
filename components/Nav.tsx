"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { LogoLockup } from "./brand/LogoMark";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Filosofía", href: "#filosofia" },
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajo", href: "#trabajo" },
  { label: "Proceso", href: "#proceso" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="section-pad">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 md:px-5 py-2.5 transition-all duration-500",
              scrolled ? "glass-strong shadow-panel" : "bg-transparent",
            )}
          >
            <a href="#top" className="flex items-center" aria-label="Inicio">
              <LogoLockup />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2 text-[13px] font-medium tracking-[0.05em] text-momentum-mist hover:text-momentum-chalk transition-colors"
                >
                  {link.label}
                  <span className="absolute left-4 right-4 bottom-1 h-px bg-momentum-magenta scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="#contacto" className="btn-magenta text-xs">
                Hablemos
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10"
              aria-label="Abrir menú"
            >
              <div className="relative w-4 h-3">
                <span className={cn("absolute left-0 right-0 top-0 h-px bg-momentum-chalk transition-transform duration-300", mobileOpen && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-momentum-chalk transition-opacity duration-300", mobileOpen && "opacity-0")} />
                <span className={cn("absolute left-0 right-0 bottom-0 h-px bg-momentum-chalk transition-transform duration-300", mobileOpen && "-translate-y-1.5 -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-momentum-void/95 backdrop-blur-2xl"
          >
            <div className="h-full flex flex-col items-center justify-center gap-8 section-pad">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-momentum-chalk hover:text-momentum-magenta transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="btn-magenta mt-4"
              >
                Hablemos
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
