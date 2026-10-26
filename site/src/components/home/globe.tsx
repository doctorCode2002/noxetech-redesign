"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { whenIdle } from "@/lib/idle";
import { prefersReducedMotion } from "../motion/motion-provider";

type LatLng = [number, number];

// Message routes between regional hubs (illustrative traffic, not office locations).
const hubs: Record<string, LatLng> = {
  dubai: [25.2048, 55.2708],
  riyadh: [24.7136, 46.6753],
  amman: [31.9539, 35.9106],
  cairo: [30.0444, 31.2357],
  istanbul: [41.0082, 28.9784],
  frankfurt: [50.1109, 8.6821],
  london: [51.5072, -0.1276],
  lagos: [6.5244, 3.3792],
  mumbai: [19.076, 72.8777],
  singapore: [1.3521, 103.8198],
  newyork: [40.7128, -74.006],
  saopaulo: [-23.5505, -46.6333],
  nairobi: [-1.2921, 36.8219],
  tokyo: [35.6762, 139.6503],
};

const routes: [string, string][] = [
  ["dubai", "london"],
  ["dubai", "mumbai"],
  ["dubai", "singapore"],
  ["riyadh", "cairo"],
  ["amman", "frankfurt"],
  ["amman", "dubai"],
  ["cairo", "lagos"],
  ["istanbul", "london"],
  ["frankfurt", "newyork"],
  ["london", "newyork"],
  ["newyork", "saopaulo"],
  ["dubai", "nairobi"],
  ["singapore", "tokyo"],
  ["mumbai", "singapore"],
];

// Colors are linear RGB 0..1 for the shader.
const FIELD: [number, number, number] = [1, 0.42, 0.1];

/**
 * Dotted 3D globe with message routes arcing between hubs (COBE, WebGL, ~5 KB).
 * Loaded after the page is interactive, paused off screen, draggable to spin.
 */
type RGB = [number, number, number];
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const DIM: RGB = [0.42, 0.18, 0.07]; // idle route: a low ember
const LIT: RGB = [1, 0.5, 0.16]; // signal orange
const HOT: RGB = [1, 0.93, 0.8]; // the moment a connection lands

/**
 * Connections in motion: every route stays drawn, and each one pulses in turn,
 * brightening from ember to orange to near-white as its connection lands, while
 * the two hubs it joins swell and glow. Staggered so the network never pulses in unison.
 */
const CYCLE = 3.2; // seconds between pulses on the same route

/**
 * How squarely a place faces the viewer for a given rotation: 1 at the centre of the
 * visible disc, 0 at its edge, negative on the far side. Inverts COBE's own mapping
 * (phi = PI - (lng - PI/2), theta = lat).
 */
function facing([lat, lng]: LatLng, phi: number, theta: number) {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  const faceLng = (3 * Math.PI) / 2 - phi;
  return Math.cos(la) * Math.cos(theta) * Math.cos(lo - faceLng) + Math.sin(la) * Math.sin(theta);
}
// Arcs rise above the surface, so one near the edge traces a line along (or past) the sphere's
// outline. Routes fade into the sphere's dark colour as either end nears the edge, and are gone
// well before the rim; hubs shrink away the same way. Nothing pops in or out.
const ARC_HIDE = 0.45;
const ARC_FULL = 0.65;
const HUB_HIDE = 0.2;
const HUB_FULL = 0.35;
const SPHERE: RGB = [0.03, 0.03, 0.035];
const ramp = (x: number, lo: number, hi: number) => {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

function connections(time: number, phi: number, theta: number) {
  const heat: Record<string, number> = {};
  const face = Object.fromEntries(Object.entries(hubs).map(([k, v]) => [k, facing(v, phi, theta)]));
  const arcs = routes.flatMap(([a, b], i) => {
    const fade = ramp(Math.min(face[a], face[b]), ARC_HIDE, ARC_FULL);
    if (fade === 0) return [];
    const u = ((time + i * 0.71) % CYCLE) / CYCLE;
    // A short pulse at the start of each cycle, quiet for the rest of it.
    const p = u < 0.38 ? Math.pow(Math.sin((u / 0.38) * Math.PI), 2) : 0;
    heat[a] = Math.max(heat[a] ?? 0, p * fade);
    heat[b] = Math.max(heat[b] ?? 0, p * fade);
    const color = p < 0.65 ? mix(DIM, LIT, p / 0.65) : mix(LIT, HOT, (p - 0.65) / 0.35);
    return [{ from: hubs[a], to: hubs[b], color: mix(SPHERE, color, fade) }];
  });
  const markers = Object.entries(hubs).flatMap(([name, location]) => {
    const fade = ramp(face[name], HUB_HIDE, HUB_FULL);
    if (fade === 0) return [];
    const h = heat[name] ?? 0;
    return [{ location, size: (0.03 + 0.045 * h) * fade, color: mix(LIT, HOT, h) }];
  });
  return { arcs, markers };
}

/** True when WebGL runs in software (no GPU): animating there would block the main thread. */
function softwareRenderer() {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|software|basic render/i.test(name);
  } catch {
    return true;
  }
}

export function Globe({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  // True once the live globe has drawn: it fades in and the poster fades out.
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = canvas.current!;
    const reduce = prefersReducedMotion();
    let destroy: (() => void) | undefined;
    let cancelled = false;

    // The poster image underneath already shows the globe. The live WebGL globe only starts on devices
    // with a GPU, once the browser is idle, and fades in over the matching poster.
    if (softwareRenderer()) return;
    const cancelIdle = whenIdle(async () => {
      const { default: createGlobe } = await import("cobe");
      if (cancelled) return;
      const small = innerWidth < 640;
      const still = reduce;
      // The canvas is large on desktop; 1.5× keeps the dots crisp at well under 2×'s pixel cost.
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      let size = el.offsetWidth;
      // Face the Middle East / Europe, where most routes are (COBE's location-to-angle mapping).
      const [lat, lng] = [32, 30];
      let phi = Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);
      let theta = ((lat * Math.PI) / 180) * 0.6;
      let drag: { x: number; y: number; phi: number; theta: number } | null = null;
      let velocity = 0;

      const globe = createGlobe(el, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta,
        // An ink sphere with signal-orange continents, routes and hubs.
        dark: 1,
        diffuse: 1.2,
        scale: 1,
        mapSamples: small ? 8000 : 12000,
        mapBrightness: 5,
        mapBaseBrightness: 0,
        baseColor: [0.18, 0.18, 0.2],
        markerColor: [1, 0.55, 0.25],
        glowColor: FIELD,
        opacity: 1,
        markers: connections(0, phi, theta).markers,
        arcs: connections(0, phi, theta).arcs,
        arcColor: [1, 0.6, 0.3],
        arcWidth: 0.6,
        arcHeight: 0.24,
        markerElevation: 0.01,
      });

      // Phones draw at most 30 frames a second; desktops follow the display.
      const minGap = small ? 1000 / 30 : 0;
      let lastDraw = 0;
      const tick = () => {
        const now = performance.now();
        if (now - lastDraw < minGap) return;
        const dt = lastDraw ? Math.min(now - lastDraw, 50) / 16.7 : 1;
        lastDraw = now;
        if (!drag) {
          phi += velocity;
          velocity *= 0.94;
          phi += 0.0022 * dt;
        }
        globe.update({ phi, theta, ...connections(now / 1000, phi, theta) });
      };
      globe.update({ phi, theta, ...connections(performance.now() / 1000, phi, theta) });
      let running = false;
      const start = () => {
        if (running || still) return;
        running = true;
        gsap.ticker.add(tick);
      };
      const stop = () => {
        running = false;
        gsap.ticker.remove(tick);
      };

      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
      io.observe(el);
      const onVis = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVis);

      const ro = new ResizeObserver(() => {
        size = el.offsetWidth;
        globe.update({ width: size * dpr, height: size * dpr });
      });
      ro.observe(el);

      // Drag to spin, with a little inertia on release.
      const onDown = (e: PointerEvent) => {
        e.preventDefault(); // dragging the globe must not start a text selection
        drag = { x: e.clientX, y: e.clientY, phi, theta };
        el.setPointerCapture(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (!drag) return;
        const next = drag.phi + (e.clientX - drag.x) / 220;
        velocity = next - phi;
        phi = next;
        theta = Math.max(-0.6, Math.min(0.9, drag.theta + (e.clientY - drag.y) / 400));
        if (still) globe.update({ phi, theta, ...connections(0, phi, theta) });
      };
      const onUp = () => (drag = null);
      // Text selection starts from mousedown's default in Chrome, not pointerdown, so cancel that too.
      const noSelect = (e: MouseEvent) => e.preventDefault();
      el.addEventListener("mousedown", noSelect);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);

      // The live globe takes over: fade the poster out so none of its frozen arcs linger behind.
      requestAnimationFrame(() => setLive(true));

      destroy = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        el.removeEventListener("mousedown", noSelect);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        globe.destroy();
      };
    }, 1500);

    return () => {
      cancelled = true;
      cancelIdle();
      destroy?.();
    };
  }, []);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      {/* Pre-rendered first frame: shows instantly, and stays as the globe on devices without a GPU. */}
      <Image
        src="/globe-poster-1200.webp"
        alt=""
        aria-hidden="true"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1024px) 54vw, min(80vw, 320px)"
        draggable={false}
        className={`select-none transition-opacity duration-700 ${live ? "opacity-0" : ""}`}
      />
      <canvas
        ref={canvas}
        aria-hidden="true"
        data-cursor="Drag"
        className={`globe absolute inset-0 size-full cursor-grab touch-pan-y select-none transition-opacity duration-700 active:cursor-grabbing ${live ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
