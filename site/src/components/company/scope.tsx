import { Button } from "../button";
import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim ("System scope").
const areas = [
  {
    title: "Digital Products",
    sub: "Customer-facing applications & web platforms",
    text: "Interactive web applications, mobile platforms, client portals, and SaaS products engineered with responsive interfaces and reliable backends.",
    items: [
      "Customer Portals & Dashboards",
      "Cross-Platform Mobile Apps",
      "Interactive Web Applications",
      "E-commerce & Subscription Systems",
    ],
  },
  {
    title: "Business Operations",
    sub: "Internal management & administration platforms",
    text: "Bespoke operational tools designed to replace spreadsheet sprawl, coordinate departmental workflows, and manage organizational records securely.",
    items: [
      "Custom ERP & Resource Planning",
      "Inventory & Dispatch Systems",
      "Role-Based Operations Portals",
      "Financial & Billing Workflows",
    ],
  },
  {
    title: "Connected Systems",
    sub: "API integrations, pipelines & data exchange",
    text: "Secure middleware connecting disparate commercial platforms, third-party APIs, legacy databases, and automated event pipelines.",
    items: [
      "Third-Party API Integrations",
      "Webhook & Event Pipelines",
      "Database Sync & ETL Workflows",
      "Automated Document Generation",
    ],
  },
  {
    title: "Specialized Technology",
    sub: "Infrastructure, messaging & domain engines",
    text: "Specialized software components including telecom and messaging integrations, custom calculation engines, and tailored cloud infrastructure.",
    items: [
      "Telecom & Messaging Services",
      "Custom Calculation & Rules Engines",
      "Cloud Deployment & Infrastructure",
      "Legacy System Modernization",
    ],
  },
];

export function Scope() {
  return (
    <section aria-labelledby="scope-title" className="py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>SYSTEM SCOPE</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="scope-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            What We Work On
          </h2>
          <div className="lg:col-span-5">
            <p className="text-ink-2">
              We design and engineer systems across the full software lifecycle—from consumer-facing digital
              platforms to complex internal operations and integrations.
            </p>
            <Button href="/services" variant="text" sheetLabel="Services" className="mt-2">
              View All 6 Services
            </Button>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {areas.map((a) => (
            <li key={a.title} className="flex flex-col rounded-xl border border-rule p-6 sm:p-8">
              <h3 className="display text-[clamp(1.75rem,2.6vw,2.25rem)]">{a.title}</h3>
              <p className="mt-2 text-sm font-semibold text-redline-ink">{a.sub}</p>
              <p className="mt-4 max-w-[52ch] text-ink-2">{a.text}</p>
              <p className="figures mt-6 text-xs uppercase text-ink-3">Typical Engagements:</p>
              <ul className="mt-3 grid gap-x-6 border-t border-rule sm:grid-cols-2">
                {a.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-2 border-b border-rule py-3 text-[0.95rem] text-ink">
                    <span aria-hidden="true" className="size-2 shrink-0 translate-y-[-2px] bg-field" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
