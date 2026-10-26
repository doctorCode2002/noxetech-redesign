import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim ("Collaboration contexts").
const contexts = [
  {
    who: "Entrepreneurs & Founders",
    context: "Launching a new software product or digital business model.",
    engage:
      "Teams requiring disciplined technical execution to transform validated concepts into production-ready web or mobile platforms.",
  },
  {
    who: "Growing Businesses & SMEs",
    context: "Outgrowing manual spreadsheets or off-the-shelf software constraints.",
    engage:
      "Organizations needing bespoke operational systems, automated workflows, or unified internal management tools.",
  },
  {
    who: "Institutions & Organizations",
    context: "Managing complex internal operations, records, or multi-stakeholder workflows.",
    engage:
      "Entities requiring structured data architectures, strict role-based permissions, and reliable operational platforms.",
  },
  {
    who: "Operational & Departmental Teams",
    context: "Facing bottlenecks caused by disconnected software tools and manual handoffs.",
    engage:
      "Teams seeking targeted integration middleware, workflow automation, and custom management dashboards.",
  },
  {
    who: "Technical Teams & CTOs",
    context: "Requiring specialized engineering capacity for complex software modules or platforms.",
    engage:
      "Engineering leaders seeking disciplined, architecture-first partners for full-stack system implementation.",
  },
];

const tag = "figures text-xs uppercase text-ink-3";

export function CollaborationContexts() {
  return (
    <section aria-labelledby="contexts-title" className="border-t border-rule py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>COLLABORATION CONTEXTS</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="contexts-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            Projects We Are Equipped to Work With
          </h2>
          <p className="text-ink-2 lg:col-span-5">
            NoxeTech collaborates across diverse organizational scales and stages where tailored software
            engineering delivers measurable operational advantage.
          </p>
        </div>
        <ul className="mt-12 border-b border-rule">
          {contexts.map((c) => (
            <li key={c.who} className="grid gap-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-8">
              <h3 className="text-[1.45rem] font-semibold leading-tight [font-stretch:85%] lg:col-span-4">
                {c.who}
              </h3>
              <dl className="grid gap-4 sm:grid-cols-2 sm:gap-8 lg:col-span-8">
                <div>
                  <dt className={tag}>Operational Context:</dt>
                  <dd className="mt-2 text-ink">{c.context}</dd>
                </div>
                <div>
                  <dt className={`${tag} !text-redline-ink`}>How NoxeTech Engages:</dt>
                  <dd className="mt-2 text-ink-2">{c.engage}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
