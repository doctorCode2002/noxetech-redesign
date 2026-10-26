"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "./motion/motion-provider";
import { ThemeToggle } from "./theme-toggle";

const R = 22;
const C = 2 * Math.PI * R;

/** Bottom-right stack: the theme switch, and below it a back-to-top button once the visitor is past the first screen. */
export function FloatingControls() {
  const { lenis } = useMotion();
  const [past, setPast] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      setPast(scrollY > innerHeight);
      // The ring around the arrow shows how far down the page you are.
      ring.current?.style.setProperty("stroke-dashoffset", String(C * (1 - (max > 0 ? scrollY / max : 0))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }

  return (
    // The theme switch holds the bottom corner; back-to-top sits above it (absolutely, so it takes no space while hidden).
    <div className="fixed bottom-4 right-3 z-40 sm:bottom-6 sm:right-5">
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={past ? 0 : -1}
        aria-hidden={!past}
        className={`absolute bottom-[calc(100%+0.5rem)] left-0 inline-flex size-12 items-center justify-center rounded-full border border-rule bg-sheet/90 text-ink shadow-sheet backdrop-blur-md transition-[opacity,transform,border-color] duration-300 ease-out-expo hover:border-ink ${
          past ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
          <circle
            ref={ring}
            cx="24"
            cy="24"
            r={R}
            fill="none"
            stroke="var(--field)"
            strokeWidth="2"
            strokeDasharray={C}
            strokeDashoffset={C}
          />
        </svg>
        <ArrowUp className="size-5" strokeWidth={2} />
      </button>
      {/* On phones the theme button waits until the hero is scrolled past (it would cover the hero's facts);
          the mobile menu has its own theme switch. */}
      <div
        className={`transition-[opacity,transform] duration-300 ease-out-expo ${
          past ? "" : "max-sm:pointer-events-none max-sm:translate-y-3 max-sm:opacity-0"
        }`}
      >
        <ThemeToggle />
      </div>
    </div>
  );
}
