"use client";

/**
 * Tiny UI sound kit, synthesized with the Web Audio API (no audio files).
 * Sounds only ever play in response to a click, and respect the saved mute setting.
 */
export type Sound = "tap" | "toggle" | "success" | "error" | "sweep" | "tick";

let ctx: AudioContext | null = null;
const KEY = "nx-sound";

export function isMuted() {
  try {
    return localStorage.getItem(KEY) === "off";
  } catch {
    return false;
  }
}

export function setMuted(muted: boolean) {
  try {
    localStorage.setItem(KEY, muted ? "off" : "on");
  } catch {}
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

/** One enveloped oscillator note. */
function note(a: AudioContext, freq: number, start: number, dur: number, type: OscillatorType, gain: number, glideTo?: number) {
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(a.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

export function play(sound: Sound) {
  if (typeof window === "undefined" || isMuted()) return;
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  switch (sound) {
    case "tap":
      note(a, 1320, t, 0.05, "sine", 0.07);
      break;
    case "toggle":
      note(a, 880, t, 0.05, "triangle", 0.07);
      note(a, 1320, t + 0.045, 0.06, "triangle", 0.06);
      break;
    case "success":
      [784, 988, 1319].forEach((f, i) => note(a, f, t + i * 0.07, 0.16, "sine", 0.07));
      break;
    case "error":
      note(a, 330, t, 0.12, "square", 0.035, 220);
      break;
    case "tick":
      // One step of a thermal printer's paper feed.
      note(a, 2400, t, 0.018, "square", 0.025);
      note(a, 180, t, 0.03, "triangle", 0.04);
      break;
    case "sweep":
      note(a, 300, t, 0.35, "sine", 0.05, 1400);
      break;
  }
}
