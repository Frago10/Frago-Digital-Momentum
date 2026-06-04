"use client";

/**
 * Procedural sound system for Momentum Media.
 *
 * - Zero audio assets — every sound is synthesized via Web Audio.
 * - Persists user preference (on/off) in localStorage.
 * - Single AudioContext, resumed lazily on first user gesture (autoplay
 *   policy compliance).
 */

const STORAGE_KEY = "momentum-sound-enabled";

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let enabled = false;
let initialised = false;
const listeners = new Set<(enabled: boolean) => void>();

function isClient() {
  return typeof window !== "undefined";
}

export function initSound() {
  if (!isClient() || initialised) return;
  initialised = true;
  const stored = localStorage.getItem(STORAGE_KEY);
  enabled = stored === "1";
  notify();
}

function ensureContext() {
  if (!isClient()) return null;
  if (ctx) return ctx;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Ctor = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.18;
  masterGain.connect(ctx.destination);
  return ctx;
}

function resumeIfNeeded() {
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

function notify() {
  for (const fn of listeners) fn(enabled);
}

export function subscribeSound(fn: (enabled: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(next: boolean) {
  if (!isClient()) return;
  enabled = next;
  localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  if (next) {
    ensureContext();
    resumeIfNeeded();
    // Confirmation chime so user knows it's live
    playTone({ freq: 880, dur: 0.12, attack: 0.005, decay: 0.12, type: "sine", gain: 0.6 });
    setTimeout(() => playTone({ freq: 1320, dur: 0.18, attack: 0.005, decay: 0.18, type: "sine", gain: 0.5 }), 70);
  }
  notify();
}

type ToneOpts = {
  freq: number;
  dur: number;
  attack?: number;
  decay?: number;
  type?: OscillatorType;
  gain?: number;
  detune?: number;
};

function playTone({
  freq,
  dur,
  attack = 0.005,
  decay = 0.1,
  type = "sine",
  gain = 1,
  detune = 0,
}: ToneOpts) {
  if (!enabled) return;
  const audio = ensureContext();
  if (!audio || !masterGain) return;
  resumeIfNeeded();

  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;

  const now = audio.currentTime;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(gain, now + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

  osc.connect(env);
  env.connect(masterGain);
  osc.start(now);
  osc.stop(now + attack + decay + 0.02);
}

/** Subtle high tick on hover entry */
export function playHover() {
  playTone({ freq: 2100, dur: 0.05, attack: 0.002, decay: 0.06, type: "sine", gain: 0.35 });
}

/** Crisper double-tap on click */
export function playClick() {
  playTone({ freq: 1480, dur: 0.06, attack: 0.002, decay: 0.07, type: "triangle", gain: 0.55 });
  setTimeout(() => {
    playTone({ freq: 980, dur: 0.08, attack: 0.002, decay: 0.09, type: "triangle", gain: 0.4 });
  }, 28);
}

/** Soft swell — for section reveals or important state changes */
export function playReveal() {
  playTone({ freq: 320, dur: 0.6, attack: 0.04, decay: 0.55, type: "sine", gain: 0.55 });
  playTone({ freq: 640, dur: 0.6, attack: 0.05, decay: 0.55, type: "sine", gain: 0.32, detune: -8 });
}
