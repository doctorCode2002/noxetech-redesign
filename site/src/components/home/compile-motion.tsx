"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { onFirstInteraction, whenIdle } from "@/lib/idle";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { prefersReducedMotion } from "../motion/motion-provider";
import { entities } from "./compile-data";

/** Offset of `el` inside `stage`, ignoring transforms (so it stays correct mid-animation). */
function offsetIn(el: HTMLElement, stage: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== stage) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

export function CompileMotion({ children, ...props }: React.ComponentProps<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const build = () => {
        {
          const section = root.current!;
          const stage = section.querySelector<HTMLElement>("[data-stage]")!;
          section.classList.add("is-live");

          // Every position is measured in one pass (no style writes in between), and again on refresh.
          type Box = { x: number; y: number; w: number; h: number };
          const pos: Record<string, { word: Box; head: Box; box: Box; nav: Box; tokenH: number }> = {};
          const relations = [...section.querySelectorAll<SVGPathElement>("[data-relation]")];
          const lg = () => matchMedia("(min-width: 1024px)").matches;
          const measure = () => {
            // Reads first...
            stage.style.minHeight = "";
            for (const { k } of entities) {
              pos[k] = {
                word: offsetIn(word(k), stage),
                head: offsetIn(head(k), stage),
                box: offsetIn(box(k), stage),
                nav: offsetIn(nav(k), stage),
                tokenH: token(k).offsetHeight,
              };
            }
            const layers = [...stage.querySelectorAll<HTMLElement>(".compile-layer")];
            const tallest = Math.max(
              ...layers.map((l) => offsetIn(l, stage).y + l.offsetHeight),
              pos.report.box.y + pos.report.box.h,
            );
            // ...then writes: the stage is exactly as tall as its tallest layer, and each
            // connector runs through the gap between two tables on the same row.
            stage.style.minHeight = `${Math.ceil(tallest)}px`;
            relations.forEach((path, i) => {
              const a = pos[entities[i].k].box;
              const b = pos[entities[i + 1].k].box;
              const sameRow = Math.abs(a.y - b.y) < 4;
              const y = a.y + 28;
              path.setAttribute("d", sameRow ? `M${a.x + a.w} ${y}H${b.x}` : "");
            });
          };
          const token = (k: string) => section.querySelector<HTMLElement>(`[data-token="${k}"]`)!;
          const word = (k: string) => section.querySelector<HTMLElement>(`[data-word="${k}"]`)!;
          const head = (k: string) => section.querySelector<HTMLElement>(`[data-entity-head="${k}"]`)!;
          const box = (k: string) => section.querySelector<HTMLElement>(`[data-entity="${k}"]`)!;
          const nav = (k: string) => section.querySelector<HTMLElement>(`[data-nav="${k}"]`)!;
          measure();
          ScrollTrigger.addEventListener("refreshInit", measure);

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=170%",
              pin: true,
              anticipatePin: 1,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                section.dataset.step = String(self.progress < 0.3 ? 0 : self.progress < 0.62 ? 1 : 2);
              },
            },
          });

          // 1. The request: key words light up one by one.
          tl.to("[data-word]", { color: "var(--field)", stagger: 0.08, duration: 0.2 });
          entities.forEach(({ k }) => {
            tl.set(
              token(k),
              {
                x: () => pos[k].word.x,
                y: () => pos[k].word.y,
                // Words lift off near their own size, capped so they never pile up mid-flight.
                scale: () => Math.min(pos[k].word.h / pos[k].tokenH, 1.6),
              },
              "<",
            );
          });

          // 2. Words leave the sentence and become tables.
          tl.addLabel("model", "+=0.05");
          // On wide screens the tables sit below the sentence, so it can stay as a faint echo.
          tl.to("[data-sentence]", { autoAlpha: () => (lg() ? 0.12 : 0), duration: 0.4 }, "model");
          tl.fromTo("[data-token]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, stagger: 0.1 }, "model");
          tl.from("[data-entity]", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.5 }, "model+=0.15");
          entities.forEach(({ k }, i) => {
            tl.to(
              token(k),
              {
                x: () => pos[k].head.x,
                y: () => pos[k].head.y,
                scale: 1,
                duration: 0.6,
              },
              `model+=${0.05 + i * 0.1}`,
            );
          });
          tl.from("[data-relation]", { drawSVG: "0%", duration: 0.5, stagger: 0.1 }, "model+=0.6");

          // 3. Tables collapse into the app's navigation, and the app assembles around them.
          tl.addLabel("app", "+=0.25");
          tl.to("[data-sentence]", { autoAlpha: 0, duration: 0.3 }, "app");
          tl.to("[data-relations]", { autoAlpha: 0, duration: 0.3 }, "app");
          entities.forEach(({ k }, i) => {
            const to = () => ({ b: pos[k].box, n: pos[k].nav });
            tl.to(
              box(k),
              {
                x: () => to().n.x - to().b.x,
                y: () => to().n.y - to().b.y,
                scaleX: () => to().n.w / to().b.w,
                scaleY: () => to().n.h / to().b.h,
                transformOrigin: "0 0",
                autoAlpha: 0,
                duration: 0.6,
              },
              `app+=${i * 0.05}`,
            );
            tl.to(
              token(k),
              {
                x: () => to().n.x + 12,
                y: () => to().n.y + (to().n.h - pos[k].tokenH) / 2,
                duration: 0.6,
              },
              `app+=${i * 0.05}`,
            );
          });
          tl.from("[data-app]", { autoAlpha: 0, scale: 0.97, duration: 0.5 }, "app+=0.25");
          tl.to("[data-token]", { autoAlpha: 0, duration: 0.2 }, "app+=0.7");
          tl.from("[data-nav-label]", { autoAlpha: () => (lg() ? 0 : 1), duration: 0.2 }, "app+=0.7");
          tl.from("[data-row]", { autoAlpha: 0, x: -16, stagger: 0.06, duration: 0.3 }, "app+=0.6");
          tl.from("[data-report]", { autoAlpha: 0, y: 16, duration: 0.3 }, "app+=0.85");
          tl.to({}, { duration: 0.3 });

          settleScrollTriggers();
          return () => {
            ScrollTrigger.removeEventListener("refreshInit", measure);
            section.classList.remove("is-live");
          };
        }
      };
      let cleanup: (() => void) | undefined;
      // Desktop has the headroom to build right after load (so jumps and back navigation land correctly);
      // phones wait for the first scroll to keep loading light.
      const schedule = matchMedia("(min-width: 1024px) and (hover: hover)").matches
        ? whenIdle
        : onFirstInteraction;
      const cancel = schedule(contextSafe!(() => (cleanup = build())));
      return () => {
        cancel();
        cleanup?.();
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
