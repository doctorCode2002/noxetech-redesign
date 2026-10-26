import { Fragment } from "react";
import { Button } from "../button";
import { Eyebrow } from "../eyebrow";

const points = ["Architectural Scoping", "Requirement Discovery", "Pragmatic Engineering"];

export function CompanyClosing() {
  return (
    <section aria-labelledby="company-close-title" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[1.25rem] bg-field px-5 py-16 text-on-field sm:rounded-[1.75rem] sm:px-10 sm:py-24">
        <Eyebrow tone="field">COLLABORATION</Eyebrow>
        <h2 id="company-close-title" className="display mt-4 max-w-[16ch] text-[clamp(2.8rem,6.6vw,6.5rem)]">
          Ready to Discuss Your Project Requirements?
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-[50ch] text-[1.15rem] font-medium">
              Whether you are transforming a manual workflow, building a new digital product, or integrating
              complex operational systems, our engineering team is ready to scope your solution.
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] font-medium">
              {points.map((p, i) => (
                <Fragment key={p}>
                  {i > 0 && <span className="text-on-field/60">•</span>}
                  <span>{p}</span>
                </Fragment>
              ))}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-6 lg:justify-end">
            <Button href="/start-project" variant="ink">
              Start a Project Inquiry
            </Button>
            <Button href="/how-we-work" variant="text-field" sheetLabel="How We Work">
              Explore How We Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
