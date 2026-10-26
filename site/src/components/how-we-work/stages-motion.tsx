"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createContext, useContext, useRef, useState } from "react";
import { whenIdle, whenNear } from "@/lib/idle";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { prefersReducedMotion } from "../motion/motion-provider";
import { ScrambleValue } from "../scramble";
import { Artifact } from "./artifact";
import { pad, stageNames } from "./data";

/** The stage currently being read; null until the scroll scene has been built. */
const ActiveStage = createContext<number | null>(null);

function setFlags(el: HTMLElement, state: number) {
  for (let r = 1; r <= 4; r++) el.toggleAttribute(`data-r${r}`, state >= r);
}

/**
 * Wraps the stages section. As each stage is read, its activities tick off one by one, the
 * inline artifact (phones) builds from the previous stage's state, and the sticky desktop panel
 * advances to that stage's artifact.
 */
export function StagesMotion({ children, ...props }: React.ComponentProps<"section">) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const section = root.current!;
      const schedule = matchMedia("(min-width: 1024px) and (hover: hover)").matches ? whenIdle : (cb: () => void) => whenNear(root.current!, cb);
      const cancel = schedule(
        contextSafe!(() => {
          section.classList.add("is-live");

          section.querySelectorAll<HTMLElement>("[data-activities]").forEach((ul) =>
            ScrollTrigger.create({
              trigger: ul,
              start: "top 85%",
              once: true,
              onEnter: () => ul.setAttribute("data-ticked", ""),
            }),
          );

          section.querySelectorAll<HTMLElement>("[data-inline-art]").forEach((el) => {
            const i = Number(el.dataset.inlineArt);
            if (!el.offsetParent) return; // hidden on desktop
            setFlags(el, i - 1);
            ScrollTrigger.create({
              trigger: el,
              start: "top 70%",
              once: true,
              onEnter: () => setFlags(el, i),
            });
          });

          setActive(0);
          section.querySelectorAll<HTMLElement>("[data-stage]").forEach((li, i) =>
            ScrollTrigger.create({
              trigger: li,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => self.isActive && setActive(i),
            }),
          );
          settleScrollTriggers();
        }),
      );
      return () => {
        cancel();
        section.classList.remove("is-live");
      };
    },
    { scope: root },
  );

  return (
    <ActiveStage.Provider value={active}>
      <section ref={root} {...props}>
        {children}
      </section>
    </ActiveStage.Provider>
  );
}

/** Desktop: the artifact for the stage being read, kept in view beside the stages. */
export function StagePanel() {
  const active = useContext(ActiveStage);
  const shown = active ?? 4;
  return (
    <div className="sticky top-28">
      <div className="rounded-xl border border-rule bg-sheet p-6 shadow-sheet">
        <div aria-hidden="true" className="flex items-center justify-between gap-4">
          <p className="figures text-xs uppercase tracking-[0.12em] text-ink-3">
            STAGE <ScrambleValue value={pad(shown + 1)} className="text-ink" /> OF 05
          </p>
          <p className="figures text-xs uppercase tracking-[0.12em] text-redline-ink">{stageNames[shown]}</p>
        </div>
        <Artifact state={shown} className="mt-6" />
      </div>
      <nav aria-label="Delivery stages" className="mt-4">
        <ol className="grid grid-cols-5 gap-2">
          {stageNames.map((name, i) => {
            const on = active !== null && i <= active;
            const current = active === i;
            return (
              <li key={name}>
                <a
                  href={`#stage-${pad(i + 1)}`}
                  aria-current={current ? "step" : undefined}
                  className={`group block pt-3 transition-colors ${current ? "text-ink" : "text-ink-3 hover:text-ink"}`}
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-rule">
                    <span
                      className={`block h-full origin-left bg-field transition-transform duration-500 ease-out-expo motion-reduce:transition-none ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                  <span className="figures mt-2 block text-xs">{pad(i + 1)}</span>
                  <span className="block truncate text-[0.8125rem] font-medium">{name}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
