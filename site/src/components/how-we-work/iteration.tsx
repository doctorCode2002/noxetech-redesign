import { Eyebrow } from "../eyebrow";
import { pad } from "./data";
import { IterationMotion } from "./iteration-motion";

// Original site copy, verbatim.
const flow = "Discovery → Architecture → Engineering → Review → Adjustment → Verification → Delivery";
const steps = flow.split(" → ");
const loops = [
  {
    title: "Review Points & Feedback Loops",
    text: "Key milestones allow stakeholders to review working software, validate workflows, and provide feedback before subsequent stages begin.",
  },
  {
    title: "Impact-Aware Scope Adjustments",
    text: "When requirements evolve, we evaluate the adjustment against system architecture, project timeline, and delivery priorities to make informed decisions together.",
  },
  {
    title: "Structured Change Management",
    text: "We prevent scope creep and architectural degradation by documenting additions clearly and maintaining transparency around trade-offs.",
  },
];

const ROW = 48;
const X = 40;
const y = (i: number) => i * ROW + ROW / 2;

export function Iteration() {
  return (
    <section aria-labelledby="iter-title" className="border-t border-rule py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>ITERATIVE REALITY</Eyebrow>
          <h2 id="iter-title" className="display mt-4 text-[clamp(2.4rem,4.6vw,4.25rem)]">
            Software Development Is an Iterative Journey
          </h2>
          <p className="mt-6 max-w-[48ch] text-ink-2">
            While our 5-stage framework provides clear structure, real software projects often uncover new insights
            during implementation. We manage changes thoughtfully rather than pretending requirements never evolve.
          </p>

          <IterationMotion className="mt-10 rounded-xl border border-rule bg-sheet p-6">
            <p className="sr-only">{flow}</p>
            {/* The path drawn as a rail: a marker runs it with the scroll and loops back once through review. */}
            <div aria-hidden="true" className="relative" style={{ height: steps.length * ROW }}>
              <svg
                viewBox={`0 0 64 ${steps.length * ROW}`}
                width="64"
                height={steps.length * ROW}
                className="absolute left-0 top-0 overflow-visible"
              >
                <line x1={X} x2={X} y1={y(0)} y2={y(steps.length - 1)} className="stroke-rule-strong" strokeWidth="2" />
                <path
                  data-loop
                  d={`M${X - 8} ${y(4)}C4 ${y(4)} 4 ${y(2)} ${X - 8} ${y(2)}`}
                  className="fill-none stroke-field"
                  strokeWidth="2"
                />
                <path
                  data-loop-head
                  d={`M${X - 14} ${y(2) - 6}l6 6-6 6`}
                  className="fill-none stroke-field"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {steps.map((s, i) => (
                  <circle key={s} cx={X} cy={y(i)} r="5" className="fill-sheet stroke-ink-3" strokeWidth="2" />
                ))}
                <circle data-marker cx={X} cy={y(0)} r="8" className="fill-field" />
              </svg>
              <ol className="pl-16">
                {steps.map((s, i) => (
                  <li key={s} className="flex h-12 items-center gap-3">
                    <span className="figures text-xs text-ink-3">{pad(i + 1)}</span>
                    <span className={`font-medium ${i === 3 || i === 4 ? "text-redline-ink" : "text-ink"}`}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </IterationMotion>
        </div>

        <ol className="grid content-start gap-4 lg:col-span-7 lg:pt-12">
          {loops.map((l, i) => (
            <li key={l.title} className="grid gap-4 rounded-xl border border-rule p-6 sm:grid-cols-[4rem_1fr] sm:p-8">
              <p className="mega text-[3rem] text-redline-ink">{pad(i + 1)}</p>
              <div>
                <h3 className="text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">{l.title}</h3>
                <p className="mt-3 max-w-[56ch] text-ink-2">{l.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
