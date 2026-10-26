"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { prefersReducedMotion } from "../motion/motion-provider";

/**
 * Applies each transformation as its row scrolls in: the redline strikes through the starting
 * state, then the engineered outcome is written in on the "+" line. The server-rendered rows
 * already show the final state, so nothing depends on this running.
 */
export function LedgerMotion({ children, ...props }: React.ComponentProps<"ol">) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
        const q = gsap.utils.selector(row);
        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
            defaults: { ease: "expo.out" },
          })
          .fromTo(
            q("[data-strike]"),
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut", clearProps: "clipPath" },
          )
          .from(q("[data-plus]"), { scale: 0, rotate: -90, duration: 0.5 }, 0.45)
          .from(q("[data-to]"), { opacity: 0, x: -16, duration: 0.8 }, 0.5)
          .from(q("[data-note]"), { opacity: 0, duration: 0.8 }, 0.65);
      });
      settleScrollTriggers();
    },
    { scope: root },
  );

  return (
    <ol ref={root} {...props}>
      {children}
    </ol>
  );
}
