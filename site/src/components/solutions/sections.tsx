import { ArrowUpRight, Check, X } from "lucide-react";
import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";
import { TransitionLink } from "../motion/transition-link";
import { ProblemRouter } from "./problem-router";
import {
  capabilityAreas,
  capabilitySlug,
  commonProblems,
  matrix,
  scenarios,
  type Scenario,
} from "./solutions-data";

// All visible copy is the original site's, verbatim (see solutions-data.ts).

export function SolutionsHero() {
  return (
    <section aria-labelledby="solutions-title" className="drafting-grid border-b border-rule">
      <div className="shell grid gap-12 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Eyebrow>PROBLEM-FOCUSED SOLUTIONS</Eyebrow>
            <span className="figures text-xs text-ink-3">{"// PROBLEM-FIRST SOFTWARE ENGINEERING"}</span>
          </div>
          <h1 id="solutions-title" className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)]">
            Custom technology designed around real operational challenges.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.1rem] text-ink-2">
            Every organization faces distinct challenges—from outgrowing manual spreadsheets and wrestling
            with disconnected software to planning a new digital product from the ground up. We start by
            understanding your operational situation, then design and build the software to address it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/start-project">Start a Project</Button>
            <Button href="/services" variant="text" sheetLabel="Services">
              Explore Capabilities
            </Button>
          </div>
          <div className="mt-10 border-t border-rule pt-6">
            <p className="figures text-xs uppercase text-ink-3">Common Problems:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {commonProblems.map((p, i) => (
                <li key={p}>
                  <a
                    href={`#${scenarios[i].id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-rule-strong bg-sheet px-3 py-1 text-sm hover:border-ink"
                  >
                    <span aria-hidden="true" className="size-2 rounded-full bg-field" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The method in one sheet: friction in, scoping in the middle, a system out. */}
        <figure className="rounded-xl border border-ink bg-sheet shadow-sheet lg:col-span-5">
          <figcaption className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3">
            <span className="figures text-sm font-semibold">PROBLEM_SOLVER.MAP</span>
            <span className="figures rounded-sm border border-rule-strong px-2 text-xs text-ink-3">
              METHODOLOGY
            </span>
          </figcaption>
          <div className="p-4 sm:p-6">
            <div className="rounded-lg border border-dashed border-rule-strong p-4">
              <p className="figures text-xs text-ink-3">OPERATIONAL FRICTION POINT</p>
              <p className="mt-2 text-[0.95rem] text-ink-2">
                Scattered spreadsheets, manual double entry, fragile legacy code, or missing digital
                interfaces.
              </p>
            </div>
            <p className="figures py-4 text-center text-xs font-semibold text-redline-ink">
              ↓ CONSULTATIVE TECHNICAL SCOPING ↓
            </p>
            <div className="rounded-lg border border-field bg-redline-wash p-4">
              <p className="figures text-xs text-redline-ink">ENGINEERED CUSTOM SYSTEM</p>
              <p className="mt-2 text-[0.95rem] font-medium">
                Normalized relational database, role-based web/mobile interfaces, automated API pipelines, and
                cloud hosting.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-rule px-4 py-3 text-xs text-ink-3">
            <span>No Off-The-Shelf Restrictions</span>
            <span className="figures text-redline-ink">Engineered for Your Team</span>
          </div>
        </figure>
      </div>
    </section>
  );
}

export function SmsBand() {
  return (
    <section aria-labelledby="sms-band-title" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="rounded-[1.25rem] bg-ground py-12 text-on-ground sm:rounded-[1.75rem] sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="ground">FLAGSHIP TELECOM PLATFORM · NOXETECH SMS SWITCH</Eyebrow>
            <h2 id="sms-band-title" className="display mt-4 text-[clamp(2.4rem,4.6vw,4.25rem)]">
              NoxeTech SMS Switch
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.05rem] text-on-ground-2">
              Carrier-Grade A2P/P2P SMS Routing & High-Performance Gateway Platform
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button href="https://demo-pro.noxetech.com/app/login" external>
              View Live Demo
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
            <Button
              href="/solutions/sms-switch"
              variant="secondary"
              sheetLabel="SMS Switch"
              className="!border-ground-rule !text-on-ground hover:!border-on-ground"
            >
              Explore SMS Switch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Challenges() {
  return (
    <section aria-labelledby="challenges-title" className="py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>WHAT ARE YOU TRYING TO SOLVE?</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="challenges-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            Six Common Operational Challenges
          </h2>
          <p className="text-ink-2 lg:col-span-5">
            Identify your organization&apos;s primary friction point below to review our technical approach
            and expected outcomes.
          </p>
        </div>
        <div className="mt-12">
          <ProblemRouter
            areas={capabilityAreas}
            scenarios={scenarios.map((s) => ({
              id: s.id,
              title: s.indexTitle,
              subtitle: s.subtitle,
              areas: s.areas,
              stages: s.stages.map(({ step, name }) => ({ step, name })),
            }))}
          />
        </div>
      </div>
    </section>
  );
}

function ScenarioSection({ s, n }: { s: Scenario; n: number }) {
  const num = String(n).padStart(2, "0");
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="scroll-mt-24 border-t border-rule py-20 sm:py-28"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="figures text-sm font-semibold text-redline-ink">{num}</span>
              <span className="figures text-xs text-ink-3">{"// SOLUTION SCENARIO"}</span>
            </p>
            <h2 id={`${s.id}-title`} className="display mt-4 text-[clamp(2.4rem,4.6vw,4.25rem)]">
              {s.title}
            </h2>
            <p className="mt-4 text-[1.2rem] font-medium">{s.subtitle}</p>
          </div>
          <p className="max-w-[44ch] border-l-2 border-field pl-4 text-[0.95rem] text-ink-2 lg:col-span-4">
            {s.who}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Before: the situation and its friction. */}
          <div className="min-w-0 lg:col-span-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">What is happening today</h3>
            <p className="mt-3 text-ink-2">{s.today}</p>
            <p className="figures mt-6 text-xs uppercase text-ink-3">Common Operational Challenges:</p>
            <ul className="mt-3 space-y-3">
              {s.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-[0.975rem]">
                  <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-redline-ink" strokeWidth={2.5} />
                  {c}
                </li>
              ))}
            </ul>

            <p className="figures mt-8 text-xs uppercase text-ink-3">Relevant Capability Areas:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.areas.map((a) => (
                <li key={a}>
                  <TransitionLink
                    href={`/services#${capabilitySlug(a)}`}
                    sheetLabel="Services"
                    className="inline-flex items-center gap-2 rounded-full border border-field bg-redline-wash px-3 py-1 text-sm font-medium hover:bg-field hover:text-on-field"
                  >
                    <span aria-hidden="true" className="size-2 rounded-full bg-field" />
                    {a}
                  </TransitionLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-2 border-field pl-4">
              <p className="text-sm font-semibold">Project Scope Note:</p>
              <p className="mt-1 text-sm text-ink-2">{s.scopeNote}</p>
            </div>
          </div>

          {/* After: how it is approached and what changes. */}
          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-xl border border-rule bg-sheet p-4 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                  How NoxeTech approaches this project
                </h3>
                <span className="figures text-xs text-redline-ink">4-STAGE PROCESS</span>
              </div>
              <p className="mt-3 text-ink-2">{s.approach}</p>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2">
                {s.stages.map((st) => (
                  <li key={st.step} className="bg-sheet p-4">
                    <p className="figures text-xs text-redline-ink">
                      {st.step} <span aria-hidden="true">—</span> {st.name}
                    </p>
                    <p className="mt-2 text-[0.95rem]">{st.text}</p>
                  </li>
                ))}
              </ol>

              <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em]">{s.changeTitle}</h4>
              <p className="mt-3 text-ink-2">{s.change}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-[0.95rem]">
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-redline-ink"
                      strokeWidth={2.5}
                    />
                    {o}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
                <p className="text-ink-2">Facing this operational challenge?</p>
                <Button href="/start-project" variant="solid" size="sm">
                  Discuss This Scenario
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Scenarios() {
  return (
    <>
      {scenarios.map((s, i) => (
        <ScenarioSection key={s.id} s={s} n={i + 1} />
      ))}
    </>
  );
}

export function Matrix() {
  const heads = ["Scenario", "Operational Challenge", "How NoxeTech Helps", "Expected Benefit"];
  return (
    <section aria-labelledby="matrix-title" className="px-2 sm:px-3">
      <div className="rounded-[1.25rem] bg-ground py-16 text-on-ground sm:rounded-[1.75rem] sm:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Eyebrow tone="ground">SOLUTIONS MATRIX</Eyebrow>
            <span className="figures text-xs text-on-ground-2">{"// PROBLEM-TO-SOLUTION COMPARISON"}</span>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="matrix-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
              Matching Challenges with Engineered Solutions
            </h2>
            <p className="text-on-ground-2 lg:col-span-5">
              A structured breakdown of common operational problems and how NoxeTech designs custom software
              to address them.
            </p>
          </div>

          {/* Desktop: a real table. */}
          <table className="mt-12 hidden w-full border-collapse text-left text-[0.95rem] lg:table">
            <thead>
              <tr className="border-b border-on-ground/40">
                {heads.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="figures pb-4 pr-6 text-xs font-semibold uppercase text-on-ground-2"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((r, i) => (
                <tr key={r.scenario} className="border-b border-ground-rule align-top">
                  <th scope="row" className="py-6 pr-6 font-semibold">
                    <a href={`#${scenarios[i].id}`} className="hover:text-field">
                      <span className="figures mr-2 text-field">{String(i + 1).padStart(2, "0")}</span>
                      {r.scenario}
                    </a>
                  </th>
                  <td className="py-6 pr-6 text-on-ground-2">{r.challenge}</td>
                  <td className="py-6 pr-6">
                    <span aria-hidden="true" className="mr-1 text-field">
                      ›
                    </span>
                    {r.helps}
                  </td>
                  <td className="py-6 text-on-ground-2">{r.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phones and tablets: one card per scenario, labelled with the table headers. */}
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
            {matrix.map((r, i) => (
              <li key={r.scenario} className="rounded-xl border border-ground-rule p-4 sm:p-6">
                <a href={`#${scenarios[i].id}`} className="font-semibold">
                  <span className="figures mr-2 text-field">{String(i + 1).padStart(2, "0")}</span>
                  {r.scenario}
                </a>
                <dl className="mt-4 space-y-3 text-[0.95rem]">
                  {[
                    [heads[1], r.challenge],
                    [heads[2], `› ${r.helps}`],
                    [heads[3], r.benefit],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="figures text-xs uppercase text-on-ground-2">{k}</dt>
                      <dd className="mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[60ch] text-on-ground-2">
              Every solution is designed directly around your project requirements, operational workflows, and
              technical constraints.
            </p>
            <Button href="/start-project">Start a Project</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionsClosing() {
  return (
    <section aria-labelledby="consult-title" className="px-2 pb-2 pt-20 sm:px-3 sm:pb-3 sm:pt-28">
      <div className="rounded-[1.25rem] bg-field px-5 py-16 text-on-field sm:rounded-[1.75rem] sm:px-10 sm:py-24">
        <Eyebrow tone="field">TECHNICAL CONSULTATION</Eyebrow>
        <KineticHeading
          as="h2"
          id="consult-title"
          lines={["Have an Operational", "or Technical Challenge?"]}
          className="mt-4 text-[clamp(2.8rem,7.4vw,8rem)]"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="max-w-[56ch] text-[1.15rem] font-medium">
              Whether you need to build a new digital product, streamline manual processes, or connect
              disparate software systems, our software engineers are ready to discuss your specific
              requirements.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
              {["Detailed Problem Analysis", "Clear Technical Roadmap", "Pragmatic Technology Selection"].map(
                (b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-2 rounded-full bg-on-field" />
                    {b}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-5 lg:justify-end">
            <Button href="/start-project" variant="ink">
              Start a Project
            </Button>
            <Button href="/how-we-work" variant="text-field" sheetLabel="How We Work">
              Review How We Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
