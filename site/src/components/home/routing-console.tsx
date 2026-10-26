"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../motion/motion-provider";
import { ScrambleValue } from "../scramble";

type Route = { dest: string; prefix: string; rates: number[]; down: number | null };

const carriers = ["Carrier A", "Carrier B", "Carrier C"];

const initial: Route[] = [
  { dest: "United Arab Emirates", prefix: "+971", rates: [0.0241, 0.0228, 0.0262], down: null },
  { dest: "Saudi Arabia", prefix: "+966", rates: [0.0198, 0.0214, 0.0189], down: null },
  { dest: "Jordan", prefix: "+962", rates: [0.0312, 0.0297, 0.0305], down: null },
  { dest: "Egypt", prefix: "+20", rates: [0.0156, 0.0171, 0.0149], down: null },
  { dest: "United Kingdom", prefix: "+44", rates: [0.0274, 0.0259, 0.0281], down: null },
  { dest: "Germany", prefix: "+49", rates: [0.0633, 0.0618, 0.0647], down: null },
];

/** The cheapest carrier that is currently up. */
function pick(r: Route) {
  let best = -1;
  r.rates.forEach((rate, i) => {
    if (i !== r.down && (best === -1 || rate < r.rates[best])) best = i;
  });
  return best;
}

/**
 * A simulated least-cost routing table: rates drift, carriers drop out and
 * come back, and each destination always routes through the cheapest live carrier.
 */
export function RoutingConsole() {
  const [routes, setRoutes] = useState(initial);
  const [tps, setTps] = useState(21);
  const root = useRef<HTMLDivElement>(null);
  const prevPick = useRef(initial.map(pick));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(root.current!);
    const id = setInterval(() => {
      if (!visible || document.hidden) return;
      setTps(18 + Math.round(Math.random() * 7));
      setRoutes((rs) =>
        rs.map((r, i) => {
          if (Math.random() > 0.35) return r;
          const rates = r.rates.map((x) =>
            Math.max(0.005, +(x * (1 + (Math.random() - 0.5) * 0.08)).toFixed(4)),
          );
          let down = r.down;
          if (down !== null && Math.random() > 0.5) down = null;
          else if (down === null && Math.random() > 0.8) down = (i + Math.floor(Math.random() * 3)) % 3;
          return { ...r, rates, down };
        }),
      );
    }, 1400);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  // Flash a row when its route switches carrier.
  useEffect(() => {
    const picks = routes.map(pick);
    picks.forEach((p, i) => {
      if (p !== prevPick.current[i]) {
        const row = root.current?.querySelector(`[data-route="${i}"]`);
        if (row)
          gsap.fromTo(
            row,
            { backgroundColor: "rgba(255,106,26,0.28)" },
            { backgroundColor: "rgba(255,106,26,0)", duration: 1.2, ease: "power2.out" },
          );
      }
    });
    prevPick.current = picks;
  }, [routes]);

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-xl border border-ground-rule bg-[color-mix(in_srgb,var(--ground)_65%,black)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ground-rule px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-field opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-field" />
          </span>
          Least-cost routing
        </p>
        <p className="figures text-sm text-on-ground-2">
          <span className="text-on-ground">{tps}</span> TPS
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[0.9rem]">
          <caption className="sr-only">Simulated routing table: price per message by carrier</caption>
          <thead className="text-[0.8rem] text-on-ground-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-normal sm:px-5">
                Destination
              </th>
              {carriers.map((c) => (
                <th key={c} scope="col" className="hidden px-3 py-3 text-right font-normal sm:table-cell">
                  {c}
                </th>
              ))}
              <th scope="col" className="px-3 py-3 text-right font-normal sm:hidden">
                Best rate
              </th>
              <th scope="col" className="px-4 py-3 text-right font-normal sm:px-5">
                Route
              </th>
            </tr>
          </thead>
          <tbody className="figures">
            {routes.map((r, i) => {
              const p = pick(r);
              return (
                <tr key={r.dest} data-route={i} className="border-t border-ground-rule">
                  <th scope="row" className="px-4 py-3 font-sans font-normal sm:px-5">
                    {r.dest} <span className="figures text-on-ground-2">{r.prefix}</span>
                  </th>
                  {r.rates.map((rate, ci) => (
                    <td
                      key={ci}
                      className={`hidden px-3 py-3 text-right transition-colors duration-300 sm:table-cell ${
                        ci === r.down
                          ? "text-on-ground-2 line-through decoration-field/70"
                          : ci === p
                            ? "text-field"
                            : "text-on-ground-2"
                      }`}
                    >
                      <ScrambleValue value={`$${rate.toFixed(4)}`} />
                    </td>
                  ))}
                  <td className="px-3 py-3 text-right text-field sm:hidden">
                    <ScrambleValue value={`$${r.rates[p].toFixed(4)}`} />
                  </td>
                  <td className="px-4 py-3 text-right sm:px-5">
                    <span className="rounded-full bg-field px-3 py-1 font-sans text-[0.78rem] font-semibold text-on-field">
                      {carriers[p].replace("Carrier ", "")}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-ground-rule px-4 py-3 text-[0.8rem] text-on-ground-2 sm:px-5">
        Simulated traffic. Carriers and rates are illustrative, not real pricing.
      </p>
    </div>
  );
}
