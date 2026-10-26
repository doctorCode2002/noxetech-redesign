"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { whenIdle, whenNear } from "@/lib/idle";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { prefersReducedMotion } from "../motion/motion-provider";
import { DRAWER_TRAVEL } from "./drawer";

/** Pulls the archive drawer open as it scrolls through the viewport; the dividers settle in after it. */
export function DrawerMotion({ children, ...props }: React.ComponentProps<"div">) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const schedule = matchMedia("(min-width: 1024px) and (hover: hover)").matches ? whenIdle : (cb: () => void) => whenNear(root.current!, cb);
      const cancel = schedule(
        contextSafe!(() => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 45%", scrub: 0.8 },
          });
          tl.from("[data-drawer-move]", { y: -DRAWER_TRAVEL, ease: "power2.out", duration: 1 }).from(
            "[data-divider]",
            { y: 6, ease: "power2.out", duration: 0.3, stagger: 0.05 },
            0.6,
          );
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
