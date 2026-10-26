"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Button } from "../button";
import { prefersReducedMotion } from "../motion/motion-provider";

/**
 * A deliberate action: press and hold (pointer, or Space/Enter) to fill the button;
 * letting go early drains it. Fires onConfirm once full.
 */
export function HoldButton({
  children,
  onConfirm,
  disabled,
  duration = 1.2,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  duration?: number;
}) {
  const fill = useRef<HTMLSpanElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const holding = useRef(false);
  // Fill progress 0..1, tracked here rather than read back from the element's CSS.
  const progress = useRef({ value: 0 });
  const render = () => {
    if (fill.current) fill.current.style.clipPath = `inset(0 ${100 - progress.current.value * 100}% 0 0)`;
  };

  useEffect(() => () => void tween.current?.kill(), []);

  function start() {
    if (disabled || holding.current) return;
    holding.current = true;
    tween.current?.kill();
    const d = prefersReducedMotion() ? 0.6 : duration;
    tween.current = gsap.to(progress.current, {
      value: 1,
      duration: d * (1 - progress.current.value),
      ease: "none",
      onUpdate: render,
      onComplete: () => {
        holding.current = false;
        progress.current.value = 0;
        render();
        onConfirm();
      },
    });
  }

  function stop() {
    if (!holding.current) return;
    holding.current = false;
    tween.current?.kill();
    tween.current = gsap.to(progress.current, {
      value: 0,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: render,
    });
  }

  return (
    <Button
      variant="solid"
      disabled={disabled}
      className="relative touch-none select-none overflow-hidden"
      onPointerDown={(e) => {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {} // capture is a nicety; never let it block the hold
        start();
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          start();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") stop();
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
      {/* The fill: an orange copy of the label, revealed left to right as the hold progresses. */}
      <span
        ref={fill}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-field text-on-field"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {children}
      </span>
    </Button>
  );
}
