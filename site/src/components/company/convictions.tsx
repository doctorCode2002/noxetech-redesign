import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim ("Engineering philosophy").
const convictions = [
  {
    title: "Requirements First",
    lead: "Understand the problem before choosing the tools",
    text: "We do not begin with preconceived frameworks or architectural templates. Technical scoping begins with deep analysis of organizational workflows, user responsibilities, data models, and constraints.",
  },
  {
    title: "Architecture with Purpose",
    lead: "Technical decisions must serve the project, not industry trends",
    text: "Every layer, database selection, and component boundary must be justified by actual operational needs, performance targets, and security requirements—not transient industry fashion.",
  },
  {
    title: "Build for Maintainability",
    lead: "Clear, understandable code over unnecessary complexity",
    text: "Software must be operable and maintainable long after initial delivery. We prioritize strict typing, structured directory layouts, clear separation of concerns, and clean architectural boundaries.",
  },
  {
    title: "Verify Before Delivery",
    lead: "Testing and review are non-negotiable engineering disciplines",
    text: "Quality assurance is an integral phase of our development lifecycle. We systematically test data flows, user roles, responsive behaviors, and edge-case error states prior to release.",
  },
  {
    title: "Appropriate Technology",
    lead: "The right stack for the actual deployment environment",
    text: "We select technology based on operational longevity, team maintainability, ecosystem maturity, and deployment constraints—ensuring the client receives an appropriate and sustainable solution.",
  },
];

export function Convictions() {
  return (
    <section aria-labelledby="convictions-title" className="px-2 sm:px-3">
      <div className="rounded-[1.25rem] bg-ground py-16 text-on-ground sm:rounded-[1.75rem] sm:py-24">
        <div className="shell">
          <Eyebrow tone="ground">ENGINEERING PHILOSOPHY</Eyebrow>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="convictions-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
              Core Technical Convictions
            </h2>
            <p className="text-on-ground-2 lg:col-span-5">
              Software engineering is not about adopting the newest industry buzzwords. It is the disciplined
              craft of solving organizational problems with clean, maintainable, and reliable systems.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ground-rule bg-ground-rule sm:grid-cols-2 lg:grid-cols-3">
            {convictions.map((c, i) => (
              <li key={c.title} className="flex flex-col bg-ground p-6 sm:p-8">
                <p className="figures text-xs text-on-ground-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">{c.title}</h3>
                <p className="figures mt-2 text-[0.8rem] leading-snug text-field">{c.lead}</p>
                <p className="mt-4 max-w-[48ch] text-on-ground-2">{c.text}</p>
              </li>
            ))}
            <li className="flex flex-col justify-end bg-field p-6 text-on-field sm:p-8">
              <p className="figures text-xs uppercase text-on-field/75">{"// NO DOGMA"}</p>
              <h3 className="display mt-4 text-[clamp(1.9rem,3vw,2.5rem)]">Pragmatic Architecture</h3>
              <p className="mt-4 max-w-[44ch] font-medium">
                We do not force proprietary methodologies or unnecessary complexity onto projects. Every
                architectural decision is transparent, justifiable, and tailored.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
