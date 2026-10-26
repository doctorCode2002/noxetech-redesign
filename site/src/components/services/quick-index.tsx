import { AnchorLink } from "./anchor-link";
import { capabilities, num } from "./data";

export function QuickIndex() {
  return (
    <section aria-labelledby="index-title" className="py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-redline-ink">
              Quick Capability Index
            </p>
            <h2 id="index-title" className="display mt-4 text-[clamp(2.4rem,4.6vw,4.25rem)]">
              Six Core Engineering Families
            </h2>
          </div>
          <p className="text-ink-2 lg:col-span-5">
            Click any discipline below to review detailed technical scope, typical deliverables, and scenario
            examples.
          </p>
        </div>
        <ul className="mt-12 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li key={c.id} className="border-b border-r border-rule">
              <AnchorLink
                href={`#${c.id}`}
                className="group flex h-full flex-col gap-4 p-6 transition-colors duration-200 hover:bg-field hover:text-on-field focus-visible:outline-offset-[-2px]"
              >
                <span className="figures text-sm text-redline-ink group-hover:text-on-field">{num(i)}</span>
                <span className="display text-[clamp(1.6rem,2.4vw,2.1rem)]">{c.name}</span>
                <span className="flex-1 text-[0.95rem] text-ink-2 group-hover:text-on-field">{c.summary}</span>
                <span className="text-[0.9rem] font-semibold underline decoration-rule-strong underline-offset-4 group-hover:decoration-on-field">
                  View Scope & Deliverables
                </span>
              </AnchorLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
