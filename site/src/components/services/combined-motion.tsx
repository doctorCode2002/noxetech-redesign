"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../motion/motion-provider";

/**
 * The reference project's stack map. The five families it uses light up in turn the first time
 * the map comes into view; pointing at or focusing one part of the project singles out its family.
 * Without JavaScript (or with reduced motion) the five are simply lit.
 */
export function CombinedMotion({ children, ...props }: React.ComponentProps<"div">) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    let stop: (() => void) | undefined;
    if (!prefersReducedMotion()) {
      el.dataset.state = "waiting";
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          el.dataset.state = "on";
        },
        { rootMargin: "0px 0px -30% 0px" },
      );
      io.observe(el);
      stop = () => io.disconnect();
    }
    const parts = el.querySelectorAll<HTMLElement>("[data-part]");
    const set = (cap: string | null) => {
      if (cap) el.dataset.hot = cap;
      else delete el.dataset.hot;
      el.querySelectorAll<HTMLElement>("[data-block]").forEach((b) => {
        b.toggleAttribute("data-dim", cap !== null && b.dataset.block !== cap);
      });
    };
    const on = (e: Event) => set((e.currentTarget as HTMLElement).dataset.part!);
    const off = () => set(null);
    parts.forEach((p) => {
      p.addEventListener("pointerenter", on);
      p.addEventListener("pointerleave", off);
      p.addEventListener("focusin", on);
      p.addEventListener("focusout", off);
    });
    return () => {
      stop?.();
      parts.forEach((p) => {
        p.removeEventListener("pointerenter", on);
        p.removeEventListener("pointerleave", off);
        p.removeEventListener("focusin", on);
        p.removeEventListener("focusout", off);
      });
    };
  }, []);

  return (
    <div ref={root} {...props}>
      {children}
    </div>
  );
}
