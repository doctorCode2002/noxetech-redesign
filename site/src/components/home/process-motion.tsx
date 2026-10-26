"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { whenIdle, whenNear } from "@/lib/idle";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { prefersReducedMotion } from "../motion/motion-provider";

export function ProcessMotion({ children, ...props }: React.ComponentProps<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      let mm: gsap.MatchMedia | undefined;
      // Desktop has the headroom to build right after load (so jumps and back navigation land correctly);
      // phones build each scene just before it scrolls into view (whenNear), keeping load and the
      // first swipe light.
      const schedule = matchMedia("(min-width: 1024px) and (hover: hover)").matches
        ? whenIdle
        : (cb: () => void) => whenNear(root.current!, cb);
      const cancel = schedule(
        contextSafe!(() => {
          mm = gsap.matchMedia();
          // Every size: the stages run past horizontally while the section is pinned, so plain
          // vertical scrolling (finger, wheel or trackpad) moves them. Until this builds, and for
          // reduced motion, phones keep a native swipe row.
          mm.add("all", () => {
            const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
            track.classList.add("is-pinned");
            // Slide until the last stage's right edge meets the page margin (the shell's content box).
            const distance = () => {
              const shell = track.parentElement!;
              const cs = getComputedStyle(shell);
              const inner = shell.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
              return Math.max(0, track.scrollWidth - inner);
            };
            const scrollTrigger = {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            };
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              // anticipatePin applies the pin a moment early, so fast scrolls don't show a jump.
              scrollTrigger: { ...scrollTrigger, pin: true, anticipatePin: 1 },
            });
            gsap.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger });
            settleScrollTriggers();
            return () => track.classList.remove("is-pinned");
          });
        }),
      );
      return () => {
        cancel();
        mm?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
