import { Button } from "../button";

// Original site copy, verbatim ("The NoxeTech approach" lists).
const bring = [
  [
    "A Product Concept or Business Idea",
    "A vision for a new digital product, commercial application, or venture.",
  ],
  [
    "A Workflow or Manual Bottleneck",
    "Spreadsheets, manual handoffs, or processes requiring purpose-built software.",
  ],
  [
    "Operational Rules & Requirements",
    "How your business operates, user roles, business logic, and operational needs.",
  ],
  [
    "Desired Outcomes & Timelines",
    "The business targets, performance goals, and key deadlines you need to meet.",
  ],
];
const engineer = [
  [
    "Product Structure & UX",
    "Intuitive user interface flows, information hierarchy, and user-centric design.",
  ],
  [
    "System Architecture & Data Models",
    "Database schemas, security boundaries, and modular component structures.",
  ],
  [
    "Software Implementation & APIs",
    "Type-safe codebases, business logic, backend services, and external integrations.",
  ],
  [
    "Integration & Deployment Setup",
    "Environment setup, automated build workflows, and deployment to production.",
  ],
];

function Column({
  title,
  sub,
  tag,
  items,
  footer,
  accent = false,
}: {
  title: string;
  sub: string;
  tag: string;
  items: string[][];
  footer: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-6 sm:p-8 ${accent ? "border-ink bg-sheet" : "border-rule"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-redline-ink">{title}</h3>
          <p className="mt-2 font-semibold text-ink">{sub}</p>
        </div>
        <span className="figures rounded-full border border-rule px-3 py-1 text-xs text-ink-2">{tag}</span>
      </div>
      <ul className="mt-6 divide-y divide-rule border-y border-rule">
        {items.map(([h, b]) => (
          <li key={h} className="py-4">
            <h4 className="font-semibold text-ink">{h}</h4>
            <p className="mt-1 text-[0.95rem] text-ink-2">{b}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.95rem] font-medium text-ink">{footer}</p>
    </div>
  );
}

export function Approach() {
  return (
    <section aria-label="What you bring and what we engineer" className="py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-4 lg:grid-cols-2">
          <Column
            title="WHAT YOU BRING"
            sub="Business context & requirements"
            tag="INPUT"
            items={bring}
            footer="No technical architecture required from you."
          />
          <Column
            title="WHAT WE ENGINEER"
            sub="Architecture & working software"
            tag="OUTPUT"
            items={engineer}
            footer="Production-grade systems built to exact specifications."
            accent
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-xl bg-sheet p-6 sm:p-8">
          <p className="max-w-[60ch] text-ink">
            Whether you have a formal specification or an early-stage concept, we work with you to structure
            it into a clear development plan.
          </p>
          <Button href="/start-project">Discuss Your Project With Us</Button>
        </div>
      </div>
    </section>
  );
}
