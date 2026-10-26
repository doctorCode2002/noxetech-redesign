"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { onFirstInteraction, whenIdle } from "@/lib/idle";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { prefersReducedMotion } from "../motion/motion-provider";

const ROW = 48;

/** Scrubs a marker down the delivery path; at Adjustment it loops back to Engineering once, then finishes. */
export function IterationMotion({ children, ...props }: React.ComponentProps<"div">) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const schedule = matchMedia("(min-width: 1024px) and (hover: hover)").matches ? whenIdle : onFirstInteraction;
      const cancel = schedule(
        contextSafe!(() => {
          const to = (i: number) => ({ y: i * ROW, duration: 1, ease: "power1.inOut" });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 35%", scrub: 0.6 },
          });
          tl.set("[data-loop]", { drawSVG: "0%" })
            .set("[data-loop-head]", { opacity: 0 })
            .to("[data-marker]", { ...to(4), duration: 4 })
            .to("[data-marker]", { ...to(2), duration: 2 })
            .fromTo("[data-loop]", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 2, ease: "power1.inOut" }, "<")
            .set("[data-loop-head]", { opacity: 1 })
            .to("[data-marker]", { ...to(6), duration: 4 });
          settleScrollTriggers();
        }),
      );
      return cancel;
    },
    { scope: root },
  );

  return (
    <div ref={root} {...props}>
      {children}
    </div>
  );
}
