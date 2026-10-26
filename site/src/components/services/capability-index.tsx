"use client";

import { useEffect, useRef, useState } from "react";
import { AnchorLink } from "./anchor-link";
import { capabilities, num, tiers } from "./data";

/**
 * The capability matrix as a live index. Desktop: a sticky three-tier map beside the sections,
 * lighting the family in view. Phones and tablets: a sticky strip of the six families.
 */
export function CapabilityIndex() {
  const [active, setActive] = useState(-1);
  const strip = useRef<HTMLDivElement>(null);

  // Track the section crossing a band a little above the middle of the viewport.
  useEffect(() => {
    const sections = capabilities.map((c) => document.getElementById(c.id)).filter((s) => s !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(capabilities.findIndex((c) => c.id === e.target.id));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Keep the active chip visible in the phone strip (scrolls the strip only, never the page).
  useEffect(() => {
    const row = strip.current;
    const chip = row?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    if (!row || !chip || row.offsetParent === null) return;
    row.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  const cls = (i: number) =>
    i === active
      ? "bg-field text-on-field"
      : i < active
        ? "text-ink hover:bg-redline-wash"
        : "text-ink-2 hover:bg-redline-wash hover:text-ink";

  return (
    <>
      <nav aria-label="Capabilities" className="sticky top-20 z-30 -mx-4 px-4 pt-2 sm:-mx-8 sm:px-8 lg:hidden">
        <div
          ref={strip}
          className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-rule bg-sheet p-1 shadow-sheet"
        >
          {capabilities.map((c, i) => (
            <AnchorLink
              key={c.id}
              href={`#${c.id}`}
              data-i={i}
              aria-current={i === active ? "location" : undefined}
              className={`flex shrink-0 items-baseline gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[0.85rem] font-medium transition-colors duration-200 ${cls(i)}`}
            >
              <span className="figures text-[0.75rem] opacity-70">{num(i)}</span>
              {c.name}
            </AnchorLink>
          ))}
        </div>
      </nav>

      <div className="hidden lg:col-span-3 lg:block">
        <nav aria-label="Capabilities" className="sticky top-28 pb-8">
          <div className="flex items-baseline justify-between gap-4">
            <p className="figures text-xs text-ink-3">CAPABILITY_MATRIX.MAP</p>
            <p aria-hidden="true" className="figures text-xs text-ink-3">
              <span className="text-redline-ink">{active < 0 ? "--" : num(active)}</span> / 06
            </p>
          </div>
          <div className="mt-4">
            {tiers.map((t, ti) => {
              const inTier = capabilities.map((c, i) => [c, i] as const).filter(([c]) => c.tier === ti);
              const lit = active >= 0 && capabilities[active].tier === ti;
              return (
                <div key={t.code}>
                  {ti > 0 && (
                    <div aria-hidden="true" className="flex h-4 justify-center">
                      <span className="w-px bg-rule-strong" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg border p-2 transition-colors duration-300 ${lit ? "border-ink" : "border-rule"}`}
                  >
                    <p className="figures px-2 pb-1 pt-1 text-[0.68rem] leading-snug text-ink-3">{t.code}</p>
                    <ul>
                      {inTier.map(([c, i]) => (
                        <li key={c.id}>
                          <AnchorLink
                            href={`#${c.id}`}
                            aria-current={i === active ? "location" : undefined}
                            className={`flex items-baseline gap-3 rounded-md px-2 py-2 text-[0.95rem] font-medium leading-tight transition-colors duration-200 ${cls(i)}`}
                          >
                            <span className="figures text-[0.75rem] opacity-70">{num(i)}</span>
                            {c.name}
                          </AnchorLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
