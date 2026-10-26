"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CircleCheck, Hand, LoaderCircle, Printer, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { play } from "@/lib/sound";
import { lockScroll, prefersReducedMotion, unlockScroll, useMotion } from "../motion/motion-provider";
import { HandBack, HandThumb } from "./hands";
import { PAGE_H, PAGE_W, ReportDocument, type ReportLine } from "./report-document";

type Stage = "idle" | "processing" | "printing" | "done";

const labels: Record<Stage, string> = {
  idle: "Ready to print",
  processing: "Generating report",
  printing: "Printing report",
  done: "Report printed",
};

/** Scale for the page held up in front of the viewer. */
function heldScale() {
  return Math.min((innerHeight - 96) / PAGE_H, ((innerWidth - 32) / PAGE_W) * 0.9, 1.5);
}

/**
 * The weekly report from a desk printer. The page feeds out of the slot lying on its
 * side; once printed, clicking it picks it up: it lifts off the tray, turns upright,
 * grows, and a pair of hands holds it up to read. Click outside, the close button or
 * Escape puts it back down. Content reflects the live checklist state.
 */
export function ReportPrinter({ lines, issues }: { lines: ReportLine[]; issues: number }) {
  const [stage, setStage] = useState<Stage>("idle");
  const [held, setHeld] = useState(false);
  const [trayScale, setTrayScale] = useState(0);
  const tray = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLButtonElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const { lenis } = useMotion();

  useEffect(() => () => void tl.current?.kill(), []);

  // The sideways page is drawn at its intrinsic size and scaled to the tray width.
  useLayoutEffect(() => {
    const el = tray.current!;
    const ro = new ResizeObserver(() => setTrayScale(el.clientWidth / PAGE_H));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function print() {
    if (stage === "processing" || stage === "printing") return;
    const el = sheet.current!;
    tl.current?.kill();
    play("sweep");
    setStage("processing");

    if (prefersReducedMotion()) {
      gsap.set(el, { yPercent: 0, autoAlpha: 1 });
      window.setTimeout(() => {
        setStage("done");
        play("success");
      }, 400);
      return;
    }

    // Paper starts inside the printer and rolls out of the slot, with a soft tick per roller turn.
    const steps = 8;
    const t = gsap.timeline({ onComplete: () => (setStage("done"), play("success")) });
    t.set(el, { yPercent: -100, autoAlpha: 1 });
    t.to({}, { duration: 0.7 }); // generating
    t.call(() => setStage("printing"));
    for (let i = 1; i <= steps; i++) {
      t.call(() => play("tick"));
      t.to(el, { yPercent: -100 + (100 * i) / steps, duration: 0.16, ease: "none" });
    }
    tl.current = t;
  }

  // Where the page lies in the tray, relative to the middle of the screen.
  function trayPose() {
    const r = sheet.current!.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - innerWidth / 2,
      y: r.top + r.height / 2 - innerHeight / 2,
      rotation: -90,
      scale: trayScale,
    };
  }

  function pickUp() {
    if (stage !== "done" || held) return;
    play("tap");
    lockScroll(lenis);
    setHeld(true);
  }

  function putDown() {
    if (closing.current) return;
    closing.current = true;
    play("toggle");
    const finish = () => {
      closing.current = false;
      setHeld(false);
      gsap.set(sheet.current, { autoAlpha: 1 });
      unlockScroll(lenis);
      sheet.current?.focus({ preventScroll: true });
    };
    if (prefersReducedMotion()) return finish();
    gsap.killTweensOf(page.current);
    gsap
      .timeline({ onComplete: finish })
      .to(page.current!.querySelectorAll("[data-hand]"), {
        y: 260,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(page.current, { ...trayPose(), duration: 0.6, ease: "expo.inOut" })
      .to(backdrop.current, { autoAlpha: 0, duration: 0.4 }, "<0.1");
  }

  // Lift the page out of the tray once the held view is on screen.
  useGSAP(
    () => {
      if (!held || !page.current) return;
      closeBtn.current?.focus({ preventScroll: true });
      const hands = page.current.querySelectorAll("[data-hand]");
      const S = heldScale();
      gsap.set(sheet.current, { autoAlpha: 0 });
      if (prefersReducedMotion()) {
        gsap.set(page.current, { scale: S });
        return;
      }
      gsap
        .timeline()
        .fromTo(backdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0)
        .fromTo(
          page.current,
          trayPose(),
          { x: 0, y: 0, rotation: -1.5, scale: S, duration: 0.8, ease: "expo.inOut", force3D: false },
          0,
        )
        .fromTo(hands, { y: 260, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" }, 0.5)
        // Held, it breathes a little, the way paper does in someone's hands.
        .to(page.current, {
          y: 6,
          rotation: -0.5,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          // 2D transforms re-rasterize, so the scaled-up text stays sharp.
          force3D: false,
          repeat: -1,
        });
    },
    { dependencies: [held] },
  );

  useEffect(() => {
    if (!held) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && putDown();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  const busy = stage === "processing" || stage === "printing";

  return (
    <div className="mx-auto w-full max-w-md">
      {/* The machine: paper stack in the input tray at the back, panel and slot at the front. */}
      <div
        aria-hidden="true"
        className="mx-10 h-4 rounded-t-md bg-[#e9e7e1] shadow-[inset_0_-4px_0_#d6d3cb]"
      />
      <div className="relative z-10 rounded-2xl bg-gradient-to-b from-[#24272d] to-[#16181c] p-3 pb-7 text-white shadow-[0_16px_32px_-16px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.1)]">
        <div className="flex items-start justify-between gap-4 rounded-xl bg-[#0c0d10] p-4 shadow-inner">
          <div className="min-w-0">
            <p className="font-semibold">Weekly report</p>
            <p className="text-xs text-white/60">
              Week 43 · 38 sites · {issues} open issue{issues === 1 ? "" : "s"}
            </p>
            <p
              className="mt-3 flex items-center gap-2 text-xs text-white/70"
              role="status"
              aria-live="polite"
            >
              {stage === "done" ? (
                <CircleCheck className="size-4 text-[#22c55e]" />
              ) : busy ? (
                <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Printer className="size-4" />
              )}
              {labels[stage]}
            </p>
          </div>
          <button
            type="button"
            onClick={print}
            disabled={busy}
            className="shrink-0 rounded-full bg-[#ff6a1a] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white disabled:opacity-60"
          >
            {stage === "done" ? "Print again" : "Print report"}
          </button>
        </div>
        {/* Paper slot */}
        <div
          aria-hidden="true"
          className="absolute inset-x-5 bottom-3 h-2 rounded-sm bg-black shadow-inner"
        />
      </div>

      {/* Output tray: the page comes out lying on its side. */}
      <div className="relative -mt-3 px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 z-20 h-2 bg-black/40 blur-[6px]"
        />
        <div
          ref={tray}
          className="relative overflow-hidden pb-4"
          style={{ aspectRatio: `${PAGE_H} / ${PAGE_W}` }}
        >
          <button
            ref={sheet}
            type="button"
            onClick={pickUp}
            disabled={stage !== "done"}
            aria-label="Pick up the printed report"
            aria-hidden={stage !== "done"}
            className="group invisible absolute inset-x-0 top-0 block disabled:cursor-default"
            style={{ aspectRatio: `${PAGE_H} / ${PAGE_W}` }}
          >
            <span
              className="absolute left-1/2 top-1/2 block shadow-[0_8px_24px_rgb(0_0_0/0.18)] transition-[filter] group-enabled:group-hover:brightness-[1.03]"
              style={{
                width: PAGE_W,
                height: PAGE_H,
                transform: `translate(-50%, -50%) rotate(-90deg) scale(${trayScale})`,
              }}
            >
              <ReportDocument lines={lines} issues={issues} />
            </span>
          </button>
        </div>
        <p
          className={`flex items-center justify-center gap-2 text-xs text-black/60 transition-opacity ${stage === "done" ? "opacity-100" : "opacity-0"}`}
        >
          <Hand className="size-4" /> Click the page to pick it up
        </p>
      </div>

      {held &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Weekly inspections report"
            data-lenis-prevent
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
          >
            <div ref={backdrop} onClick={putDown} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              ref={page}
              className="relative"
              style={{ width: PAGE_W, height: PAGE_H, transform: "scale(0)" }}
            >
              <HandBack side="left" />
              <HandBack side="right" />
              <div className="relative z-10 shadow-[0_30px_60px_-12px_rgb(0_0_0/0.5)]">
                <ReportDocument lines={lines} issues={issues} />
              </div>
              <HandThumb side="left" />
              <HandThumb side="right" />
            </div>
            <button
              ref={closeBtn}
              type="button"
              onClick={putDown}
              aria-label="Put the report down"
              className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-[#ff6a1a]"
            >
              <X className="size-5" />
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
