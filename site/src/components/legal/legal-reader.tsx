"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Printer } from "lucide-react";
import { useRef } from "react";
import { Button } from "../button";
import { settleScrollTriggers } from "@/lib/scroll-settle";
import { SmoothDetails } from "../collapse";

type Entry = { id: string; n: string; text: string };

/*
 * The reading map. Each clause in the contents rail has its own meter that fills as that clause
 * is read, the clause in view is marked as the current location, and a running figure shows how
 * much of the document is behind you. Phones get a collapsible contents list and a thin progress
 * line at the top of the screen. All of it is plain links without JavaScript.
 */
export function LegalReader({ toc, children }: { toc: Entry[]; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const r = root.current!;
      const article = r.querySelector<HTMLElement>("[data-article]")!;
      const bar = r.querySelector<HTMLElement>("[data-bar]")!;
      const pct = r.querySelector<HTMLElement>("[data-pct]")!;
      const line = "top 40%";

      toc.forEach(({ id }, i) => {
        const clause = document.getElementById(id);
        if (!clause) return;
        const links = r.querySelectorAll<HTMLElement>(`[data-toc="${id}"]`);
        const fills = r.querySelectorAll<HTMLElement>(`[data-toc="${id}"] [data-fill]`);
        const mark = (on: boolean) =>
          links.forEach((l) =>
            on ? l.setAttribute("aria-current", "location") : l.removeAttribute("aria-current"),
          );
        ScrollTrigger.create({
          trigger: clause,
          start: line,
          // The last clause may be too short to reach the reading line; it runs to the end of the page.
          end: i === toc.length - 1 ? "max" : "bottom 40%",
          onUpdate: (s) => gsap.set(fills, { scaleY: s.progress }),
          onRefresh: (s) => gsap.set(fills, { scaleY: s.progress }),
          onToggle: (s) => mark(s.isActive),
        });
      });

      const total = (p: number) => {
        gsap.set(bar, { scaleX: p });
        pct.textContent = String(Math.round(p * 100)).padStart(2, "0");
      };
      ScrollTrigger.create({
        trigger: article,
        start: "top 60%",
        end: "bottom 85%",
        onUpdate: (s) => total(s.progress),
        onRefresh: (s) => total(s.progress),
      });
      settleScrollTriggers();
    },
    { scope: root, dependencies: [toc] },
  );

  return (
    <div ref={root} className="py-16 sm:py-20 print:py-0">
      {/* Phones: a hairline at the top of the screen tracks the whole document. */}
      <div
        aria-hidden="true"
        data-bar
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-field lg:hidden print:hidden"
      />

      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8 print:block">
        <aside className="hidden lg:col-span-3 lg:block print:hidden">
          <nav aria-label="Contents" className="sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">Contents</p>
            <ol className="mt-4 grid gap-1">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    data-toc={t.id}
                    className="group relative flex gap-3 py-2 pl-4 pr-2 text-[0.925rem] leading-snug text-ink-3 transition-colors hover:text-ink aria-[current=location]:font-semibold aria-[current=location]:text-ink"
                  >
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-rule">
                      <span data-fill className="block h-full origin-top scale-y-0 bg-field" />
                    </span>
                    {t.n && <span className="figures text-redline-ink">{t.n}.</span>}
                    <span>{t.text}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-rule pt-4">
              <p className="figures text-xs text-ink-3">
                <span data-pct>00</span>% read
              </p>
              <Button variant="secondary" size="sm" onClick={() => window.print()}>
                <Printer aria-hidden="true" className="size-4" /> Print
              </Button>
            </div>
          </nav>
        </aside>

        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          <SmoothDetails
            className="group mb-12 rounded-xl border border-rule bg-sheet lg:hidden print:hidden"
            summaryClassName="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink [&::-webkit-details-marker]:hidden"
            summary={
              <>
                Contents
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-data-[expanded]:rotate-180"
                />
              </>
            }
          >
            <ol className="grid border-t border-rule px-4 py-2">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    data-toc={t.id}
                    className="flex gap-3 py-2 text-[0.95rem] text-ink-2 hover:text-ink aria-[current=location]:font-semibold aria-[current=location]:text-ink"
                    onClick={(e) => e.currentTarget.closest("details")?.querySelector("summary")?.click()}
                  >
                    {t.n && <span className="figures text-redline-ink">{t.n}.</span>}
                    <span>{t.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </SmoothDetails>

          <article data-article className="max-w-[68ch] print:max-w-none">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
