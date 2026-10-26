import { CodeXml, Layers, Target } from "lucide-react";
import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim.
const marks = [
  { icon: Target, label: "Requirement-Driven Design" },
  { icon: CodeXml, label: "Architectural Documentation" },
  { icon: Layers, label: "Verified Implementation Details" },
];

export function WorkHero() {
  return (
    <section aria-labelledby="work-title" className="drafting-grid border-b border-rule">
      <div className="shell pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Eyebrow>SELECTED WORK</Eyebrow>
          <p className="figures text-xs uppercase tracking-[0.12em] text-ink-3">
            {"// TECHNICAL CASE STUDIES & SYSTEMS"}
          </p>
        </div>
        <h1 id="work-title" className="display mt-4 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.5rem)]">
          Software Built Around Real Requirements
        </h1>
        <p className="mt-8 max-w-[60ch] text-[1.1rem] text-ink-2">
          A portfolio of custom web platforms, mobile applications, business systems, and specialized infrastructure
          engineered by NoxeTech.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {marks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 border-t border-ink pt-4 font-semibold">
              <Icon aria-hidden="true" className="size-5 shrink-0 text-redline-ink" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
