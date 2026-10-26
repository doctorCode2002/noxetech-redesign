import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { ProcessMotion } from "./process-motion";

// Original site copy, verbatim.
const stages = [
  {
    name: "Discovery & Scope",
    text: "We discuss your requirements, define system goals, identify technical constraints, and establish clear, predictable project milestones.",
  },
  {
    name: "Architecture & Design",
    text: "We plan the system architecture, data structures, and user interface workflows before writing implementation code.",
  },
  {
    name: "Engineering & Development",
    text: "We build the software in structured iterations with regular progress reviews and feedback checkpoints.",
  },
  {
    name: "Testing & Quality Review",
    text: "We verify functionality, performance, and stability across platforms to ensure the system is solid and production-ready.",
  },
  {
    name: "Deployment & Launch",
    text: "We configure the production environment, deploy the system, and ensure a smooth, stable release for your users.",
  },
];

export function Process() {
  return (
    <ProcessMotion
      aria-labelledby="process-title"
      data-cursor="Scroll"
      className="relative overflow-hidden border-t border-rule py-20 sm:py-28 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16"
    >
      <div className="shell">
        <Eyebrow>HOW WE WORK</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="process-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            A Clear, Structured Approach to Software Delivery
          </h2>
          <div className="lg:col-span-5">
            <p className="text-ink-2">
              From initial discovery to launch, our development process is structured, transparent, and
              focused on delivering working software.
            </p>
            <Button href="/how-we-work" variant="text" sheetLabel="How We Work" className="mt-2">
              Learn More About Our Process
            </Button>
          </div>
        </div>
      </div>

      <div className="shell mt-10 motion-reduce:hidden">
        <div className="h-px bg-rule">
          <div data-progress className="h-[3px] origin-left -translate-y-px bg-field" />
        </div>
      </div>

      <div className="shell mt-10 lg:mt-12">
        {/* Phones and tablets: a swipeable row. Desktop: a track that slides while the section is pinned. */}
        <ol
          data-track
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:gap-0 lg:px-0 lg:pb-0 [&.is-pinned]:mx-0 [&.is-pinned]:w-max [&.is-pinned]:snap-none [&.is-pinned]:overflow-visible [&.is-pinned]:px-0"
        >
          {stages.map((s, i) => (
            <li
              key={s.name}
              className="relative w-[78vw] shrink-0 snap-start rounded-xl border border-rule p-5 sm:w-[46vw] lg:w-[min(30vw,26rem)] lg:rounded-none lg:border-0 lg:border-l lg:border-rule lg:p-0 lg:px-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <p aria-hidden="true" className="mega text-[clamp(4.5rem,10vw,9rem)] text-redline-ink">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">
                <span className="sr-only">Stage {i + 1}: </span>
                {s.name}
              </h3>
              <p className="mt-3 max-w-[38ch] text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
        {/* Only the swipe fallback needs a hint; the pinned track moves with ordinary scrolling. */}
        <p className="mt-3 hidden text-sm text-ink-3 motion-reduce:block lg:motion-reduce:hidden">
          Swipe to see all five stages.
        </p>
      </div>
    </ProcessMotion>
  );
}
