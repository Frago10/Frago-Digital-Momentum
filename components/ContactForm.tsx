"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, type FormEvent } from "react";
import { MagneticButton } from "./MagneticButton";

/**
 * Static-export-safe contact form via Formspree (or any HTTPS form endpoint).
 *
 * SETUP:
 *  1. Create a free account at https://formspree.io
 *  2. New Form → copy the endpoint URL (looks like https://formspree.io/f/xxxxxxx)
 *  3. Paste it below in FORMSPREE_ENDPOINT.
 *
 * While unset, the form simulates a successful submission locally so the UI
 * can still be tested end-to-end.
 */
const FORMSPREE_ENDPOINT = ""; // ej: "https://formspree.io/f/xqkrbnly"

type Status = "idle" | "submitting" | "success" | "error";

const BUDGETS = [
  "$5K – $15K",
  "$15K – $40K",
  "$40K – $100K",
  "$100K+",
  "Aún no lo sé",
];

const SCOPES = [
  "Brand identity",
  "Creative direction",
  "Digital positioning",
  "Content system",
  "Growth strategy",
  "Motion / Visual storytelling",
  "Otro",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      } else {
        // Local simulation — replace by setting FORMSPREE_ENDPOINT above
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Algo falló. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-10"
          >
            <div className="inline-flex w-14 h-14 rounded-full bg-momentum-magenta/15 border border-momentum-magenta/50 items-center justify-center mb-6">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 11.5 9 15.5 17 7" stroke="#ff2d8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-momentum-chalk tracking-editorial mb-3">
              Mensaje recibido.
            </h3>
            <p className="text-momentum-mist/80 text-[15px] leading-[1.6] max-w-md mx-auto">
              Te respondemos en menos de 48 horas hábiles. Mientras tanto, échale ojo a nuestros cases.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="grid gap-5 max-w-2xl mx-auto text-left"
          >
            {/* honeypot */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

            <Field label="Tu nombre" name="name" required />
            <Field label="Marca o proyecto" name="company" required />
            <Field label="Email" name="email" type="email" required />

            <SelectField label="Tipo de proyecto" name="scope" options={SCOPES} />
            <SelectField label="Rango de inversión" name="budget" options={BUDGETS} />

            <div>
              <label className="label-ui block mb-2">Cuéntanos qué necesitas</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="¿Cuál es el objetivo? ¿Qué te trajo aquí hoy?"
                className="w-full bg-momentum-ink border border-white/[0.08] rounded-xl px-5 py-4 text-momentum-chalk placeholder:text-momentum-mist/40 text-[15px] leading-[1.55] focus:outline-none focus:border-momentum-magenta/60 transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="text-[13px] text-momentum-magenta">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="label-ui">
                {FORMSPREE_ENDPOINT ? "Respondemos en <48h." : "Demo mode — configura Formspree."}
              </p>
              <MagneticButton type="submit">
                {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label-ui block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-momentum-ink border border-white/[0.08] rounded-xl px-5 py-3.5 text-momentum-chalk text-[15px] focus:outline-none focus:border-momentum-magenta/60 transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="label-ui block mb-2">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-momentum-ink border border-white/[0.08] rounded-xl px-5 py-3.5 text-momentum-chalk text-[15px] focus:outline-none focus:border-momentum-magenta/60 transition-colors appearance-none"
      >
        <option value="" disabled>
          Selecciona…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
