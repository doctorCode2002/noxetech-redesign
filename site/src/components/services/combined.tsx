import { Button } from "../button";
import { CombinedMotion } from "./combined-motion";
import { capabilities, capIndex, num, reference, tiers } from "./data";

/** The stack map again, now showing one project spanning five of the six families. */
function ProjectMap() {
  return (
    <div className="rounded-xl border border-ground-rule p-3 sm:p-4">
      {tiers.map((t, ti) => (
        <div key={t.code}>
          {ti > 0 && (
            <div aria-hidden="true" className="flex h-6 justify-center">
              <span className="w-px bg-field transition-transform delay-300 duration-700 group-data-[state=waiting]/map:scale-y-0" />
            </div>
          )}
          <p className="figures px-1 text-[0.68rem] text-on-ground-2">{t.code}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {capabilities.map((c) => {
              if (c.tier !== ti) return null;
              const order = reference.findIndex((r) => r.cap === c.id);
              const used = order >= 0;
              const d = `${order * 180}ms`;
              return (
                <li
                  key={c.id}
                  data-block={c.id}
                  style={used ? { transitionDelay: `${d}, ${d}, ${d}, 0ms` } : undefined}
                  className={`flex items-baseline gap-2 rounded-md border px-3 py-2 text-[0.85rem] font-medium leading-tight transition-[background-color,color,border-color,opacity] duration-500 data-[dim]:opacity-30 ${
                    used
                      ? "border-field bg-field text-on-field group-data-[state=waiting]/map:border-ground-rule group-data-[state=waiting]/map:bg-transparent group-data-[state=waiting]/map:text-on-ground-2"
                      : "border-dashed border-ground-rule text-on-ground-2"
                  }`}
                >
                  {used && <span className="figures text-[0.7rem] opacity-70">{num(order)}</span>}
                  {c.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Combined() {
  return (
    <section aria-labelledby="combined-title" className="px-2 sm:px-3">
      <div className="rounded-[1.25rem] bg-ground py-16 text-on-ground sm:rounded-[1.75rem] sm:py-24">
        <div className="shell">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-field">
            SYSTEM ARCHITECTURE INTEGRATION
          </p>
          <p className="figures mt-2 text-xs text-on-ground-2">{"// MULTI-DISCIPLINARY DELIVERY"}</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="combined-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
              Real Projects Combine Multiple Capabilities
            </h2>
            <p className="text-on-ground-2 lg:col-span-5">
              Most production software projects require more than one capability. For example, a custom
              operational system might combine web portals, mobile tools, internal workflow rules, API
              integrations, and cloud hosting into one unified solution:
            </p>
          </div>

          <CombinedMotion className="group/map mt-12 border-t border-ground-rule pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-ground-2">
                  Reference Project Architecture Breakdown
                </p>
                <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight">
                  Enterprise Client Operations & Field Ecosystem
                </h3>
              </div>
              <p className="figures text-sm text-field">5 Capabilities Harmonized</p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <ProjectMap />
                </div>
              </div>
              <ol className="grid gap-px overflow-hidden rounded-xl border border-ground-rule bg-ground-rule sm:grid-cols-2 lg:col-span-7">
                {reference.map((r, k) => (
                  <li
                    key={r.name}
                    data-part={r.cap}
                    className="bg-ground p-5 last:sm:col-span-2"
                  >
                    <p className="flex items-baseline gap-2 text-[0.8rem]">
                      <span className="figures text-field">{num(k)}</span>
                      <span className="text-on-ground-2">{capabilities[capIndex(r.cap)].name}</span>
                    </p>
                    <h4 className="mt-3 text-[1.1rem] font-semibold leading-tight">{r.name}</h4>
                    <p className="mt-2 text-[0.95rem] text-on-ground-2">{r.text}</p>
                    <p className="figures mt-4 text-[0.8rem] leading-relaxed">{r.spec}</p>
                  </li>
                ))}
              </ol>
            </div>
          </CombinedMotion>

          <div className="mt-12 grid gap-6 rounded-xl border border-field/40 p-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-9">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-field">Integrated Approach</p>
              <p className="mt-2 max-w-[70ch] text-[1.05rem]">
                By working with an engineering team that handles both interface development and backend
                architecture, you ensure all parts of your software work together seamlessly.
              </p>
            </div>
            <div className="lg:col-span-3 lg:justify-self-end">
              <Button href="/how-we-work" sheetLabel="How We Work">
                Explore Methodology
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
