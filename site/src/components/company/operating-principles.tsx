import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim ("How we operate").
const principles = [
  {
    title: "Understand Before Building",
    lead: "Clarify objectives, user flows, and operational boundaries before writing code.",
    text: "Rushing into implementation without understanding constraints leads to rework. We invest time in rigorous initial scoping to establish a solid foundation.",
  },
  {
    title: "Choose Technology Deliberately",
    lead: "Evaluate frameworks, databases, and hosting against concrete requirements.",
    text: "We avoid cargo-cult technology adoption. Every library and infrastructure component is selected based on reliability, security, and project fit.",
  },
  {
    title: "Keep Complexity Justified",
    lead: "Simple architectures that work reliably outperform over-engineered abstractions.",
    text: "Unnecessary microservices, excessive layers, and convoluted dependencies introduce points of failure. We engineer the simplest robust system that fulfills the requirements.",
  },
  {
    title: "Communicate Scope Clearly",
    lead: "Maintain transparency around requirements, trade-offs, and technical decisions.",
    text: "We explain technical choices in plain language, highlight architectural trade-offs honestly, and keep project stakeholders aligned on delivery boundaries.",
  },
  {
    title: "Build for Future Maintainability",
    lead: "Deliver clean, structured codebases that can evolve over time.",
    text: "Good software is easy to read, test, and adapt. We write disciplined code with standardized structure, clear conventions, and documentation.",
  },
];

export function OperatingPrinciples() {
  return (
    <section aria-labelledby="operate-title" className="border-t border-rule py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>HOW WE OPERATE</Eyebrow>
            <h2 id="operate-title" className="display mt-4 text-[clamp(2.4rem,4.4vw,4rem)]">
              Operating Principles
            </h2>
            <p className="mt-6 max-w-[40ch] text-ink-2">
              Rather than generic corporate slogans, our team adheres to concrete engineering principles that
              govern how we evaluate requirements, write code, and communicate with clients.
            </p>
          </div>
        </div>
        <ol className="lg:col-span-8">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="grid gap-4 border-t border-ink py-8 first:pt-6 sm:grid-cols-[6rem_1fr] sm:gap-8 last:pb-0"
            >
              <p aria-hidden="true" className="mega text-[clamp(3.5rem,6vw,5rem)] text-redline-ink">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">
                  <span className="sr-only">{i + 1}. </span>
                  {p.title}
                </h3>
                <p className="mt-2 font-medium text-ink">{p.lead}</p>
                <p className="mt-3 max-w-[60ch] text-ink-2">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
