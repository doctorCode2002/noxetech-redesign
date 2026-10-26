"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { LogoMarkMono } from "../logo";
import { prefersReducedMotion } from "../motion/motion-provider";

/**
 * The confirmation as a perforated ticket: it slides up into place, then the
 * stub with the reference ID tears along the perforation and tilts away.
 */
export function Ticket({
  referenceId,
  category,
  timeline,
  email,
}: {
  referenceId: string;
  category: string;
  timeline: string;
  email: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline()
        .from(root.current, { y: 40, autoAlpha: 0, duration: 0.6, ease: "expo.out" })
        .to(
          "[data-stub]",
          // Stacked on phones, the stub is full width, so it only drops and tilts slightly.
          window.matchMedia("(min-width: 640px)").matches
            ? { rotate: 4, x: 10, y: 6, duration: 0.5, ease: "back.out(2)", transformOrigin: "0% 0%" }
            : { rotate: 1.5, y: 8, duration: 0.5, ease: "back.out(2)", transformOrigin: "0% 0%" },
          "+=0.35",
        );
    },
    { scope: root },
  );

  const rows = [
    ["SCOPE CATEGORY", category],
    ["TIMELINE PARAMETER", timeline],
    ["CONTACT EMAIL", email],
  ];

  return (
    <div
      ref={root}
      className="mx-auto flex w-full max-w-xl flex-col text-left drop-shadow-[0_16px_24px_rgb(0_0_0/0.18)] sm:flex-row"
    >
      <div className="ticket-main flex-1 overflow-hidden rounded-2xl rounded-b-none bg-sheet p-6 sm:rounded-b-2xl sm:rounded-r-none">
        <div className="flex items-center gap-2 text-ink">
          <LogoMarkMono className="size-6" />
          <span className="font-semibold">NoxeTech</span>
        </div>
        <dl className="mt-6 space-y-4">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt className="figures text-xs text-ink-3">{k}</dt>
              <dd className="mt-1 font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div
        data-stub
        className="ticket-stub flex overflow-hidden flex-col items-start justify-between gap-4 rounded-2xl rounded-t-none border-t-2 border-dashed border-rule bg-field p-6 text-on-field sm:w-48 sm:rounded-t-2xl sm:rounded-l-none sm:border-l-2 sm:border-t-0"
      >
        <p className="figures text-xs">INQUIRY RECEIVED</p>
        <div>
          <p className="figures text-xs opacity-75">Reference ID:</p>
          <p className="figures mt-1 text-lg font-semibold">{referenceId}</p>
        </div>
      </div>
    </div>
  );
}
