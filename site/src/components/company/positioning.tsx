import { Eyebrow } from "../eyebrow";
import { LedgerMotion } from "./ledger-motion";

// Original site copy, verbatim ("Operational transformations we engineer").
const transformations = [
  {
    from: "A raw concept or product vision",
    to: "A robust, production-ready digital product",
    text: "Transforming product ideas into scalable web applications, mobile platforms, and customer-facing software.",
  },
  {
    from: "Manual, spreadsheet-driven processes",
    to: "Purpose-built operational software",
    text: "Replacing fragmented sheets and manual handoffs with structured databases, role-based workflows, and automated checks.",
  },
  {
    from: "Isolated, disconnected software tools",
    to: "Connected, automated workflows",
    text: "Unifying disparate platforms through robust API integrations, webhook pipelines, and data synchronization.",
  },
  {
    from: "Aging, constrained legacy systems",
    to: "Modern, maintainable technical architecture",
    text: "Modernizing outdated codebases and data architectures without operational disruption.",
  },
  {
    from: "Specialized or unusual operational needs",
    to: "Bespoke technology platforms",
    text: "Engineering tailored solutions for messaging, telemetry, specialized calculation engines, and domain-specific rules.",
  },
];

/**
 * Core positioning, then the five transformations set as a change ledger: each starting state is
 * struck out with the redline and replaced by the engineered outcome, like a reviewed diff.
 */
export function Positioning() {
  return (
    <section aria-labelledby="positioning-title" className="py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>CORE POSITIONING</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-start">
          <h2 id="positioning-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-6">
            Software Designed Around Real Operational Context
          </h2>
          <div className="lg:col-span-6">
            <p className="text-[1.1rem] text-ink-2">
              Many operational challenges cannot be solved well by forcing an organization into rigid,
              off-the-shelf software with mismatched workflows and unnecessary constraints. NoxeTech engineers
              custom digital systems where tailored architecture delivers genuine operational clarity and
              value.
            </p>
            <div className="mt-6 rounded-xl border border-rule bg-sheet p-6">
              <p className="font-semibold text-ink">Pragmatic by Design:</p>
              <p className="mt-2 text-[0.95rem] text-ink-2">
                We are pragmatic technologists: when an existing commercial product legitimately solves a
                problem cleanly and cost-effectively, we support that choice. When off-the-shelf software
                creates bottlenecks, data fragmentation, or operational compromise, custom engineering becomes
                the appropriate investment.
              </p>
            </div>
          </div>
        </div>

        <h3 className="figures mt-16 text-xs uppercase text-ink-3 sm:mt-20">
          {"// OPERATIONAL TRANSFORMATIONS WE ENGINEER"}
        </h3>
        <LedgerMotion className="mt-4 overflow-hidden rounded-2xl border border-rule bg-sheet">
          {transformations.map((t, i) => (
            <li
              key={t.from}
              data-row
              className="grid gap-4 border-t border-rule p-6 first:border-t-0 sm:p-8 lg:grid-cols-12 lg:gap-8"
            >
              <div className="figures flex items-baseline justify-between gap-4 text-xs lg:col-span-2 lg:flex-col lg:justify-start lg:gap-1">
                <span className="text-ink-3">TRANSFORMATION {String(i + 1).padStart(2, "0")}</span>
                <span className="text-redline-ink">{"// CUSTOM"}</span>
              </div>

              <dl className="pl-6 lg:col-span-6">
                <dt className="figures text-xs uppercase text-ink-3">Starting State:</dt>
                <dd className="relative mt-1">
                  <span aria-hidden="true" className="figures absolute -left-6 top-0 text-ink-3">
                    −
                  </span>
                  <span data-from className="relative inline-block text-[1.05rem] text-ink-3">
                    {t.from}
                    {/* The redline strike: drawn in by the motion layer, shown as-is without it. */}
                    <span
                      data-strike
                      aria-hidden="true"
                      className="absolute inset-0 text-transparent line-through decoration-redline decoration-2"
                    >
                      {t.from}
                    </span>
                  </span>
                </dd>
                <dt className="figures mt-4 text-xs uppercase text-redline-ink">Engineered Outcome:</dt>
                <dd
                  data-to
                  className="relative mt-1 text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight [font-stretch:85%]"
                >
                  <span
                    data-plus
                    aria-hidden="true"
                    className="figures absolute -left-6 top-0 text-[0.6em] font-medium leading-[2.0833] text-redline-ink"
                  >
                    +
                  </span>
                  {t.to}
                </dd>
              </dl>

              <p data-note className="text-[0.95rem] text-ink-2 lg:col-span-4 lg:border-l lg:border-rule lg:pl-8">
                {t.text}
              </p>
            </li>
          ))}
        </LedgerMotion>
      </div>
    </section>
  );
}
