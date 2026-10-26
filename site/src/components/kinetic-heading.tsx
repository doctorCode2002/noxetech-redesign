"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Fragment, useRef } from "react";
import { prefersReducedMotion } from "./motion/motion-provider";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Element whose pointer movement drives the effect; defaults to the heading's parent. */
  area?: React.RefObject<HTMLElement | null>;
  base?: number;
  /** Width the letters open up to under the cursor (wdth axis, max 100). */
  peak?: number;
  id?: string;
};

/**
 * Giant type whose letters widen as the cursor passes over them, using the
 * width axis of IBM Plex Sans. Characters are split on the server, so the text
 * renders immediately; the effect only adds motion once JavaScript runs.
 *
 * On desktop each line is locked to its resting width and its words are spread
 * across it, so widening letters eat into the word gaps instead of pushing the
 * rest of the line around.
 */
export function KineticHeading({
  lines,
  as: Tag = "h1",
  className = "",
  area,
  base = 75,
  peak = 92,
  id,
}: Props) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const chars = gsap.utils.toArray<HTMLElement>(".char", el);
      // Width changes re-lay out text, so the effect is desktop-only.
      if (prefersReducedMotion() || !chars.length || !matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;

      const lineEls = gsap.utils.toArray<HTMLElement>("[data-line]", el);
      const lock = () => {
        lineEls.forEach((l) => l.style.removeProperty("width"));
        el.classList.remove("is-locked");
        const widths = lineEls.map((l) => l.getBoundingClientRect().width);
        lineEls.forEach((l, i) => (l.style.width = `${Math.ceil(widths[i])}px`));
        el.classList.add("is-locked");
      };
      gsap.set(chars, { "--w": base });
      lock();
      // Re-measure once the web font has loaded; the first measurement may use the fallback font.
      let rippling = false;
      const relock = () => !rippling && requestAnimationFrame(lock);
      document.fonts?.ready.then(relock);
      document.fonts?.addEventListener("loadingdone", relock);

      const setters = chars.map((c) => gsap.quickTo(c, "--w", { duration: 0.6, ease: "power3.out" }));

      // Opening move: one ripple of width runs through the heading when it first comes into view.
      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        gsap.to(chars, {
          "--w": peak,
          duration: 0.32,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          stagger: { each: 0.022, from: "start" },
          // On a first visit, wait for the loader to wipe away.
          delay: document.documentElement.hasAttribute("data-skip-loader") ? 0 : 1, // after the ~1s loader
          onStart: () => (rippling = true),
          onComplete: () => {
            rippling = false;
            relock();
          },
        });
      });
      io.observe(el);

      const host = area?.current ?? el.parentElement!;
      let centers: { x: number; y: number }[] = [];
      let measured = false;
      const radius = () => Math.max(160, innerWidth * 0.14);
      const onMove = (e: PointerEvent) => {
        if (!measured) {
          centers = chars.map((c) => {
            const r = c.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          });
          measured = true;
        }
        const R = radius();
        centers.forEach((p, i) => {
          const d = Math.hypot(e.clientX - p.x, (e.clientY - p.y) * 1.6);
          const f = Math.max(0, 1 - d / R);
          setters[i](base + (peak - base) * f * f * (3 - 2 * f));
        });
      };
      const onLeave = () => {
        setters.forEach((s) => s(base));
        measured = false;
      };
      const invalidate = () => (measured = false);
      const onResize = () => {
        invalidate();
        lock();
      };
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      addEventListener("scroll", invalidate, { passive: true });
      addEventListener("resize", onResize);
      return () => {
        io.disconnect();
        document.fonts?.removeEventListener("loadingdone", relock);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        removeEventListener("scroll", invalidate);
        removeEventListener("resize", onResize);
        lineEls.forEach((l) => l.style.removeProperty("width"));
        el.classList.remove("is-locked");
      };
    },
    { scope: root },
  );

  return (
    <Tag ref={root} id={id} className={`mega ${className}`} style={{ "--w": base } as React.CSSProperties}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <Fragment key={li}>
            {/* On phones the lines flow as one paragraph; from sm up each line is its own row. */}
            <span data-line className="kinetic-line">
              {line.split(" ").map((word, wi, words) => (
                <Fragment key={wi}>
                  <span className="inline-block">
                    {[...word].map((ch, ci) => (
                      <span key={ci} className="char inline-block" style={{ "--w": base } as React.CSSProperties}>
                        {ch}
                      </span>
                    ))}
                  </span>
                  {wi < words.length - 1 && " "}
                </Fragment>
              ))}
            </span>
            {li < lines.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
