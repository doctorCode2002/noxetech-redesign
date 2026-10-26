"use client";

import { useEffect, useRef } from "react";

/**
 * The frame every inner-page hero background sits in: behind the hero copy, faded out toward the
 * text so the copy always reads, and paused whenever it is off screen so it costs nothing there.
 * The art itself (children) is a server-rendered SVG from this folder.
 */
export function HeroBackdrop({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current!;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) delete node.dataset.paused;
      else node.dataset.paused = "";
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={el} aria-hidden="true" className="hero-backdrop">
      {children}
    </div>
  );
}
