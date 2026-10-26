"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { prefersReducedMotion } from "../motion/motion-provider";
import { Collapse } from "../collapse";
import { Scramble } from "../scramble";

export type RouterScenario = {
  id: string;
  title: string;
  subtitle: string;
  stages: { step: string; name: string }[];
  areas: string[];
};

/**
 * The signature piece: pick an operational problem and watch it route through its 4-stage process into
 * the combination of capability areas it needs. Without JavaScript it shows the first scenario's route.
 */
export function ProblemRouter({
  scenarios,
  areas,
}: {
  scenarios: RouterScenario[];
  areas: readonly string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const s = scenarios[active];
  const lit = new Set(s.areas);

  useGSAP(
    () => {
      const el = root.current!;
      const desktop = matchMedia("(min-width: 1024px)");

      // Draw the wiring: every problem feeds the process column, the process feeds every capability.
      // Measured from the live layout so it follows wrapping text at any width.
      const layout = () => {
        if (!desktop.matches) return;
        const box = el.querySelector<HTMLElement>("[data-board]")!;
        const b = box.getBoundingClientRect();
        const proc = box.querySelector<HTMLElement>("[data-proc]")!.getBoundingClientRect();
        const py = proc.top + proc.height / 2 - b.top;
        const pl = proc.left - b.left;
        const pr = proc.right - b.left;
        const curve = (x1: number, y1: number, x2: number, y2: number) => {
          const m = (x1 + x2) / 2;
          return `M${x1} ${y1}C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
        };
        box.querySelectorAll<HTMLElement>("[data-problem]").forEach((row, i) => {
          const r = row.getBoundingClientRect();
          const d = curve(r.right - b.left, r.top + r.height / 2 - b.top, pl, py);
          box.querySelector(`[data-wire-in="${i}"]`)?.setAttribute("d", d);
        });
        box.querySelectorAll<HTMLElement>("[data-area]").forEach((row, i) => {
          const r = row.getBoundingClientRect();
          const d = curve(pr, py, r.left - b.left, r.top + r.height / 2 - b.top);
          box.querySelector(`[data-wire-out="${i}"]`)?.setAttribute("d", d);
        });
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      // Each new selection re-draws the live route and deals the new stages in.
      if (prefersReducedMotion()) return () => ro.disconnect();
      const tl = gsap.timeline();
      tl.fromTo(
        "[data-live-in]",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.45, ease: "power2.inOut" },
      )
        .fromTo(
          "[data-stage]",
          { autoAlpha: 0, x: -8 },
          { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
          0.2,
        )
        .fromTo(
          "[data-live-out]",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.45, stagger: 0.05, ease: "power2.inOut" },
          0.45,
        );
      return () => {
        ro.disconnect();
        tl.kill();
      };
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <div ref={root} className="overflow-hidden rounded-xl border border-ink bg-sheet">
      <div
        data-board
        className="relative grid gap-8 p-4 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] lg:gap-16"
      >
        {/* Wiring (desktop only); purely illustrative, the lists carry the meaning. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
        >
          {scenarios.map((_, i) => (
            <path
              key={i}
              data-wire-in={i}
              {...(i === active ? { "data-live-in": "" } : {})}
              fill="none"
              className={i === active ? "stroke-field" : "stroke-rule-strong"}
              strokeWidth={i === active ? 2 : 1}
              strokeDasharray={i === active ? undefined : "2 4"}
            />
          ))}
          {areas.map((a, i) => (
            <path
              key={a}
              data-wire-out={i}
              {...(lit.has(a) ? { "data-live-out": "" } : {})}
              fill="none"
              className={lit.has(a) ? "stroke-field" : "stroke-rule-strong"}
              strokeWidth={lit.has(a) ? 2 : 1}
              strokeDasharray={lit.has(a) ? undefined : "2 4"}
            />
          ))}
        </svg>

        <div className="relative min-w-0">
          <p className="figures text-xs text-ink-3">OPERATIONAL FRICTION POINT</p>
          <ol className="mt-4 grid gap-2">
            {scenarios.map((sc, i) => {
              const on = i === active;
              return (
                <li
                  key={sc.id}
                  data-problem
                  className={`rounded-lg border transition-colors duration-200 ${on ? "border-field bg-field text-on-field" : "border-rule bg-sheet hover:border-ink"}`}
                >
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    className="flex w-full items-baseline gap-4 px-4 py-3 text-left"
                  >
                    <span className={`figures text-sm ${on ? "" : "text-redline-ink"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold leading-snug">{sc.title}</span>
                  </button>
                  {/* Both open smoothly under the chosen problem; the previous one closes as smoothly. */}
                  <Collapse open={on}>
                    <div className="-mt-1 px-4 pb-4 pl-12">
                      <p className="text-[0.95rem] leading-snug">{sc.subtitle}</p>
                      <a
                        href={`#${sc.id}`}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold underline decoration-on-field/40 hover:decoration-on-field"
                      >
                        View Solution Roadmap
                        <ArrowDown aria-hidden="true" className="size-4" />
                      </a>
                    </div>
                  </Collapse>
                  {/* Phones: the route opens right under the chosen problem. */}
                  <Collapse open={on} className="lg:hidden">
                    <div className="mx-2 mb-2 grid gap-6 rounded-md bg-sheet p-4 text-ink">
                      <Process s={sc} dealt={on} />
                      <Areas areas={areas} lit={new Set(sc.areas)} />
                    </div>
                  </Collapse>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative hidden min-w-0 lg:flex lg:flex-col lg:justify-center">
          <Process s={s} wired />
        </div>
        <div className="relative hidden min-w-0 lg:block">
          <Areas areas={areas} lit={lit} wired />
        </div>
      </div>
    </div>
  );
}

function Process({
  s,
  wired = false,
  dealt = true,
}: {
  s: RouterScenario;
  wired?: boolean;
  dealt?: boolean;
}) {
  return (
    <>
      <p className="figures text-xs text-ink-3">4-STAGE PROCESS</p>
      <ol
        {...(wired ? { "data-proc": "", "aria-live": "polite" as const } : {})}
        className="mt-4 grid gap-2 rounded-lg border border-ink bg-paper p-2"
      >
        {s.stages.map((st) => (
          <li
            key={`${s.id}-${st.step}`}
            {...(dealt ? { "data-stage": "" } : {})}
            className="rounded-md bg-sheet px-4 py-3"
          >
            <p className="figures text-xs text-redline-ink">
              <Scramble>{st.step}</Scramble>
            </p>
            <p className="mt-1 font-semibold leading-snug">{st.name}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function Areas({
  areas,
  lit,
  wired = false,
}: {
  areas: readonly string[];
  lit: Set<string>;
  wired?: boolean;
}) {
  return (
    <>
      <p className="figures text-xs text-ink-3">Relevant Capability Areas:</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {areas.map((a) => {
          const on = lit.has(a);
          return (
            <li
              key={a}
              {...(wired ? { "data-area": "" } : {})}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[0.95rem] leading-snug transition-colors duration-300 lg:py-3 ${on ? "border-field bg-redline-wash font-semibold text-ink" : "border-rule text-ink-3"}`}
            >
              <span
                aria-hidden="true"
                className={`size-2 shrink-0 rounded-full ${on ? "bg-field" : "bg-rule-strong"}`}
              />
              {a}
              {!on && <span className="sr-only"> (not used)</span>}
            </li>
          );
        })}
      </ul>
    </>
  );
}
