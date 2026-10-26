"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion/motion-provider";

gsap.registerPlugin(ScrambleTextPlugin);

// No < or >: the plugin writes HTML, and those would show up as entities mid-scramble.
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#_";

/**
 * Text that decodes through random characters the first time it scrolls into view.
 * The final text is server-rendered (and given to assistive tech as-is), so nothing
 * is hidden if scripts or motion are off.
 */
export function Scramble({ children, className }: { children: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current!;
    if (prefersReducedMotion()) return;
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tween = gsap.to(node, {
          duration: Math.min(1.4, 0.35 + children.length * 0.025),
          scrambleText: { text: children, chars: GLYPHS, revealDelay: 0.15, speed: 0.6 },
          ease: "none",
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      tween?.kill();
      node.textContent = children;
    };
  }, [children]);

  return (
    // Screen readers get the real text once; the scrambling copy is hidden from them.
    <span className={className}>
      <span className="sr-only">{children}</span>
      <span ref={el} aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/**
 * A value that scrambles from its old figures to its new ones whenever it changes
 * (e.g. live rates in the routing console). Digits only, so the column never jumps.
 */
export function ScrambleValue({ value, className }: { value: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  // Rendered once; afterwards GSAP owns the text, so React never touches a node GSAP replaced.
  const [initial] = useState(value);

  useEffect(() => {
    const node = el.current!;
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) {
      node.textContent = value;
      return;
    }
    const tween = gsap.to(node, {
      duration: 0.45,
      scrambleText: { text: value, chars: "0123456789", speed: 1 },
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={el} className={className}>
      {initial}
    </span>
  );
}
