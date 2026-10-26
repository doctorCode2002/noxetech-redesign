"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion/motion-provider";

/**
 * Custom cursor for the sections that ask for one with `data-cursor`:
 * - `data-cursor="ring"`: a ring that trails the pointer and grows over links;
 * - any other value (e.g. "View", "Scroll"): a pill with that label; `data-cursor-tone="field"`
 *   makes the pill orange for dark sections.
 * Elsewhere the normal cursor is used. Mouse devices only; off under reduced motion.
 */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [tone, setTone] = useState<"ink" | "field">("ink");
  const [onLink, setOnLink] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    const el = root.current!;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- enabling depends on browser-only media queries
    setEnabled(true);
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let current: string | null = null;
    let px = -1;
    let py = -1;

    /** Points the cursor at whatever is under (cx, cy): which zone, which label, over a link or not. */
    const sync = (node: EventTarget | null, cx: number, cy: number) => {
      // Pointer events can target the document or a text node, which have no .closest().
      const target = node instanceof Element ? node : node instanceof Node ? node.parentElement : null;
      const zone = target?.closest<HTMLElement>("[data-cursor]") ?? null;
      const raw = zone?.dataset.cursor ?? null;
      const next = raw === "none" ? null : raw; // "none" opts a nested area back into the normal cursor
      if (next !== current) {
        // Jump straight to the pointer when the cursor appears, instead of sliding in from its last spot.
        if (!current) gsap.set(el, { x: cx, y: cy });
        current = next;
        setMode(next);
        setTone(zone?.dataset.cursorTone === "field" ? "field" : "ink");
      }
      setOnLink(!!target?.closest("a[href], button"));
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      x(px);
      y(py);
      sync(e.target, px, py);
    };
    // Scrolling moves the page under a still mouse; re-check what is under it every scroll frame,
    // otherwise a section can hide the normal cursor while the custom one never appears.
    // A hit test costs a layout, so: never on pages without cursor zones, at most every 100ms while
    // scrolling, and once more when the scroll settles.
    let frame = 0;
    let last = 0;
    let settle = 0;
    const recheck = () => {
      frame = 0;
      last = performance.now();
      sync(document.elementFromPoint(px, py), px, py);
    };
    const onScroll = () => {
      if (px < 0 || frame || !document.querySelector("[data-cursor]")) return;
      clearTimeout(settle);
      settle = window.setTimeout(recheck, 120);
      if (performance.now() - last > 100) frame = requestAnimationFrame(recheck);
    };
    const onLeave = () => {
      px = -1;
      current = null;
      setMode(null);
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("has-cursor");
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!enabled) return <div ref={root} hidden />;
  const label = mode && mode !== "ring" ? mode : null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{ opacity: mode ? 1 : 0, transition: "opacity 150ms" }}
    >
      {label ? (
        <span
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold shadow-sheet ${
            tone === "field" ? "bg-field text-on-field" : "bg-ink text-paper"
          }`}
        >
          {label}
        </span>
      ) : (
        <span
          className={`relative block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-on-field transition-[width,height,background-color] duration-200 ${
            onLink ? "size-14 bg-on-field/10" : "size-9"
          }`}
        >
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-on-field" />
        </span>
      )}
    </div>
  );
}
