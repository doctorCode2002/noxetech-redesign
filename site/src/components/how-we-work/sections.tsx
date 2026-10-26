import { ArrowRight, Check, MessageSquare, Plus } from "lucide-react";
import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";
import { pad } from "./data";
import { SmoothDetails } from "../collapse";

// Original site copy, verbatim, for the sections after the stages.

const bring = [
  "Clear articulation of business objectives and operational pain points",
  "Access to relevant existing systems, spreadsheets, or workflow examples",
  "Subject matter expertise on organizational rules and edge cases",
  "Constructive, timely feedback during milestone review points",
  "Key decision-maker availability for scope and priority choices",
];
const deliver = [
  "Translating business requirements into structured technical blueprints",
  "Explaining architecture choices and trade-offs in plain, understandable language",
  "Structuring disciplined engineering execution across all project layers",
  "Identifying technical risks, security considerations, and scalability bottlenecks early",
  "Validating delivered software rigorously against agreed specifications",
];

export function Collaboration() {
  return (
    <section aria-labelledby="collab-title" className="border-t border-rule py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>COLLABORATION MODEL</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="collab-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            How We Collaborate on Projects
          </h2>
          <p className="text-ink-2 lg:col-span-5">
            Successful custom software is the product of disciplined engineering combined with deep domain
            knowledge from your team. We structure collaboration around clear roles and transparency.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-rule p-6 sm:p-8">
            <h3 className="text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">
              What You Bring to the Project
            </h3>
            <p className="mt-3 text-ink-2">
              The most successful custom software projects benefit from active collaboration and domain
              knowledge from your team.
            </p>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {bring.map((b) => (
                <li key={b} className="flex gap-3 py-3">
                  <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-redline-ink" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-ink bg-sheet p-6 sm:p-8">
            <h3 className="text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">
              What NoxeTech Delivers as Your Engineering Partner
            </h3>
            <p className="mt-3 text-ink-2">
              We take responsibility for translating your organizational goals into reliable, maintainable
              software architecture.
            </p>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {deliver.map((d) => (
                <li key={d} className="flex gap-3 py-3">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-redline-ink" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 flex gap-3 rounded-xl bg-ground p-6 text-on-ground-2 sm:px-8">
          <MessageSquare aria-hidden="true" className="mt-1 size-5 shrink-0 text-field" />
          <span>
            <strong className="font-semibold text-on-ground">Transparent Communication:</strong> Project
            updates focus on architectural decisions, milestone progress, and scope adjustments without
            unnecessary technical jargon.
          </span>
        </p>
      </div>
    </section>
  );
}

const starts = [
  {
    title: "A New Idea or Product Concept",
    text: "You have a vision for a digital product or service but need technical scoping, architecture, and end-to-end development to bring it to life.",
  },
  {
    title: "A Manual or Spreadsheet Workflow",
    text: "Your operations rely on spreadsheets, emails, or paper forms that have reached their limits and need replacement with a structured system.",
  },
  {
    title: "An Existing System Needing Modernization",
    text: "You have an active application or legacy codebase that requires architectural refactoring, performance improvements, or new modules.",
  },
  {
    title: "A Specific Business Problem",
    text: "You face an operational bottleneck, data fragmentation, or integration gap, and need engineering guidance on the best technical solution.",
  },
  {
    title: "A Detailed Technical Specification",
    text: "You already have wireframes, API schemas, or functional requirements and need a disciplined development team to execute the build.",
  },
];

export function Intake() {
  return (
    <section aria-labelledby="intake-title" className="border-t border-rule py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>FLEXIBLE INTAKE</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="intake-title" className="display max-w-[20ch] text-[clamp(2.4rem,4.6vw,4.25rem)]">
              You Do Not Need a Finished Specification to Start
            </h2>
            <p className="mt-6 max-w-[60ch] text-ink-2">
              Every project begins from a different starting point. Whether you have a raw concept, an
              operational pain point, or detailed wireframes, our team adapts to your level of preparation.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href="/start-project">Start Project Scoping</Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {starts.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col rounded-xl border border-rule p-6 transition-colors hover:border-ink"
            >
              <h3 className="text-[1.25rem] font-semibold leading-tight [font-stretch:88%]">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.975rem] text-ink-2">{s.text}</p>
              <p className="figures mt-6 flex items-center justify-between gap-4 border-t border-rule pt-4 text-xs">
                <span className="flex items-center gap-2 text-redline-ink">
                  <Check aria-hidden="true" className="size-4" />
                  Valid Starting Point
                </span>
                <span className="text-ink-3">{pad(i + 1)}</span>
              </p>
            </li>
          ))}
          <li className="flex flex-col rounded-xl bg-field p-6 text-on-field">
            <p className="figures text-xs uppercase tracking-[0.12em] text-on-field/75">
              {"// GUIDED INTAKE"}
            </p>
            <h3 className="display mt-4 text-[2rem]">7-Step Scoping Wizard</h3>
            <p className="mt-3 flex-1 text-[0.975rem] font-medium">
              Use our structured project inquiry tool to outline project type, platforms, integrations, and
              operational context in minutes.
            </p>
            <div className="mt-6">
              <Button href="/start-project" variant="ink" size="sm" sheetLabel="Start a Project">
                Launch Intake Wizard
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

const criteria = [
  {
    title: "Operational Requirements",
    text: "Does the application require real-time data streaming, offline sync, high-concurrency read operations, or complex transactional integrity?",
  },
  {
    title: "Deployment & Infrastructure Context",
    text: "Will the system run on dedicated cloud instances, serverless infrastructure, containerized clusters, or existing corporate servers?",
  },
  {
    title: "Maintainability & Ecosystem Maturity",
    text: "We favor battle-tested technologies with strong typing, robust community support, and extensive documentation over experimental tools.",
  },
  {
    title: "Client Team Capabilities",
    text: "If your internal team will maintain the system post-launch, we align technical choices with your existing skills and operational preferences.",
  },
];

export function Pragmatic() {
  return (
    <section aria-labelledby="stack-title" className="px-2 sm:px-3">
      <div className="rounded-[1.25rem] bg-ground py-16 text-on-ground sm:rounded-[1.75rem] sm:py-24">
        <div className="shell">
          <Eyebrow tone="ground">PRAGMATIC ENGINEERING</Eyebrow>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="stack-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-6">
              Technology Follows the Project—Not Trends
            </h2>
            <p className="text-on-ground-2 lg:col-span-6">
              We do not impose a single rigid tech stack on every client. Frameworks, databases, hosting
              environments, and integration tools are selected according to your specific functional
              requirements, operational constraints, and long-term maintainability.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ground-rule bg-ground-rule sm:grid-cols-2">
            {criteria.map((c, i) => (
              <li key={c.title} className="bg-ground p-6 sm:p-8">
                <p className="figures text-xs text-field">{pad(i + 1)}</p>
                <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-on-ground-2">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Do I need a complete technical specification before contacting NoxeTech?",
    "No. Many clients reach out with a business problem, an initial concept, or a rough workflow description. Part of our Discovery phase is collaborating with you to define clear functional requirements, user stories, and technical specifications before writing code.",
  ],
  [
    "Can NoxeTech work with our existing codebase or third-party software?",
    "Yes. We regularly build custom software that connects to existing databases, ERPs, CRM platforms, accounting tools, and legacy systems via APIs, webhooks, or database sync pipelines. We can also modernize or extend existing applications after reviewing the current architecture.",
  ],
  [
    "Can a project combine multiple engineering capabilities?",
    "Yes. Many engagements naturally combine multiple services—such as a custom web dashboard, a companion mobile app for field teams, and automated integration middleware connecting to your internal database. We design unified architectures across all required platforms.",
  ],
  [
    "How does NoxeTech select the technology stack for a project?",
    "We select technologies based on project requirements, data complexity, performance targets, deployment environments, and long-term maintainability. We prioritize reliable, well-typed, and maintainable frameworks (such as Next.js, Node.js, TypeScript, PostgreSQL, and modern cloud primitives) without forcing unnecessary complexity.",
  ],
  [
    "What happens if our requirements evolve during the development process?",
    "Requirements often gain clarity as you see early working builds. When adjustments arise, we evaluate their technical impact on system architecture, timeline, and budget. Minor refinements are incorporated naturally, while significant scope additions are discussed and prioritized collaboratively.",
  ],
];

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>COMMON QUESTIONS</Eyebrow>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2.2rem,3.6vw,3.25rem)]">
              Frequently Asked Questions About Working With Us
            </h2>
            <p className="mt-6 max-w-[40ch] text-ink-2">
              Straightforward answers regarding our engineering intake, technical decisions, and project
              workflow.
            </p>
          </div>
        </div>
        <div className="border-t border-ink lg:col-span-8">
          {faqs.map(([q, a]) => (
            <SmoothDetails
              key={q}
              className="group border-b border-rule"
              summaryClassName="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[1.15rem] font-semibold leading-snug transition-colors hover:text-redline-ink [&::-webkit-details-marker]:hidden"
              summary={
                <>
                  {q}
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-rule-strong transition-[transform,background-color,border-color] duration-300 ease-out-expo group-data-[expanded]:rotate-45 group-data-[expanded]:border-field group-data-[expanded]:bg-field group-data-[expanded]:text-on-field">
                    <Plus aria-hidden="true" className="size-4" />
                  </span>
                </>
              }
            >
              <p className="max-w-[68ch] pb-6 text-ink-2">{a}</p>
            </SmoothDetails>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GetStarted() {
  return (
    <section aria-labelledby="go-title" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[1.25rem] bg-field px-5 py-16 text-on-field sm:rounded-[1.75rem] sm:px-10 sm:py-24">
        <Eyebrow tone="field">GET STARTED</Eyebrow>
        <KineticHeading
          as="h2"
          id="go-title"
          lines={["Ready to Plan Your", "Software Project?"]}
          className="mt-4 text-[clamp(2.8rem,8vw,8.5rem)]"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-[48ch] text-[1.15rem] font-medium">
              Tell us about your project objectives, operational workflows, or technical constraints. We will
              help structure a clear development path and architectural plan.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
              {["Architectural Scoping", "Requirement Discovery", "Disciplined Delivery"].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-on-field" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-6 lg:justify-end">
            <Button href="/start-project" variant="ink">
              Start a Project Inquiry
            </Button>
            <Button href="/services" variant="text-field" sheetLabel="Services">
              Explore Engineering Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
