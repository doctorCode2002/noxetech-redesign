"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Button } from "../button";
import { Scramble } from "../scramble";
import { prefersReducedMotion } from "../motion/motion-provider";
import type { ContactData } from "./contact-form";

/**
 * The success state: the message filed as a slip that echoes back what the team will read.
 * Nothing was sent; the PreviewNote beside it says so.
 */
export function MessageSlip({ data, onReset }: { data: ContactData; onReset: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      root.current?.focus({ preventScroll: true });
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(root.current, { opacity: 0, y: 40, rotate: -1.5, duration: 0.8 })
        .from("[data-seal]", { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, 0.2)
        .from("[data-slip-row]", { opacity: 0, x: -12, duration: 0.6, stagger: 0.06 }, 0.3);
    },
    { scope: root },
  );

  const rows = [
    ["Inquiry Category", data.inquiryType],
    ["Full Name", data.fullName],
    ["Email Address", data.email],
    ["Company / Organization", data.company],
    ["Phone / WhatsApp", data.phone],
  ].filter(([, v]) => v.trim());

  return (
    <div
      ref={root}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="relative overflow-hidden rounded-2xl border border-rule bg-sheet shadow-sheet outline-none"
    >
      <div data-seal className="h-1 origin-left bg-field" />
      <div className="p-6 sm:p-10">
        <p className="figures text-xs text-redline-ink">
          <Scramble>{data.inquiryType.toUpperCase()}</Scramble>
        </p>
        <h2 id="message-title" className="display mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)]">Thank you, {data.fullName.trim()}.</h2>
        <p className="mt-3 text-ink-2">Your message has been received.</p>

        <dl className="mt-8 border-t border-dashed border-rule-strong text-sm">
          {rows.map(([k, v]) => (
            <div
              key={k}
              data-slip-row
              className="grid gap-1 border-b border-dashed border-rule py-3 sm:grid-cols-[12rem_1fr] sm:gap-4"
            >
              <dt className="figures text-xs uppercase text-ink-3">{k}</dt>
              <dd className="break-words text-ink">{v}</dd>
            </div>
          ))}
          <div data-slip-row className="py-3">
            <dt className="figures flex justify-between gap-4 text-xs uppercase text-ink-3">
              <span>Message</span>
              <span>
                {data.message.length}/4000
              </span>
            </dt>
            <dd className="mt-3 max-h-60 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-paper p-4 text-ink" data-lenis-prevent>
              {data.message}
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <Button variant="secondary" onClick={onReset}>
            Send another message
          </Button>
        </div>
      </div>
    </div>
  );
}
