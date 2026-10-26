"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion/motion-provider";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 420;

/**
 * Smoothly opens and closes its content (height via `grid-template-rows: 0fr → 1fr`, plus a
 * fade), without measuring anything in JavaScript. Closed content is `inert`, so it can't be
 * tabbed into or read out while hidden.
 */
export function Collapse({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      inert={!open}
      className={`grid motion-reduce:transition-none ${className}`}
      style={{
        gridTemplateRows: open ? "1fr" : "0fr",
        opacity: open ? 1 : 0,
        transition: `grid-template-rows ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}`,
      }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/**
 * A native <details>/<summary> accordion that animates both ways. The browser keeps native
 * semantics (keyboard, screen readers, find-in-page opening it); we only delay removing
 * `open` until the closing animation has finished.
 */
export function SmoothDetails({
  summary,
  children,
  className = "",
  summaryClassName = "",
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  summaryClassName?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Keep state in sync when the browser opens/closes it on its own (e.g. find-in-page) or a
  // script removes `open` directly.
  useEffect(() => {
    const el = ref.current!;
    const onToggle = () => {
      if (el.open) setExpanded(true);
      else if (!timer.current) setExpanded(false);
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <details ref={ref} className={className} data-expanded={expanded || undefined}>
      <summary
        className={summaryClassName}
        onClick={(e) => {
          const el = ref.current!;
          if (!el.open) {
            // Opening: let the browser set `open`, then expand on the next frame.
            requestAnimationFrame(() => setExpanded(true));
            return;
          }
          // Closing: collapse first, remove `open` once the animation is done.
          e.preventDefault();
          setExpanded(false);
          clearTimeout(timer.current);
          timer.current = window.setTimeout(
            () => {
              timer.current = 0;
              el.open = false;
            },
            prefersReducedMotion() ? 0 : DURATION,
          );
        }}
      >
        {summary}
      </summary>
      <Collapse open={expanded}>{children}</Collapse>
    </details>
  );
}
