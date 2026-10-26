import { CompileMotion } from "./compile-motion";
import { entities, steps } from "./compile-data";
import { InspectionsApp } from "./inspections-app";

export function Compile() {
  return (
    <CompileMotion
      aria-labelledby="compile-title"
      data-step="0"
      data-cursor="Scroll"
      data-cursor-tone="field"
      className="relative px-2 sm:px-3"
    >
      <div className="overflow-hidden rounded-[1.25rem] bg-ground text-on-ground sm:rounded-[1.75rem]">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:min-h-[calc(100svh-5.5rem)] lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-field">
              THE NOXETECH APPROACH
            </p>
            <h2 id="compile-title" className="display mt-4 text-[clamp(2.2rem,3.2vw,3.25rem)]">
              You Don’t Need Technical Specifications to Get Started
            </h2>
            <ol className="mt-8 hidden space-y-3 lg:block">
              {steps.map((s, i) => (
                <li
                  key={s}
                  data-step-item={i}
                  className="compile-step flex items-baseline gap-3 text-on-ground-2 transition-colors duration-300"
                >
                  <span className="figures text-sm text-field">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-[36ch] text-on-ground-2">
              You know your business, your workflow, and the problem you want to solve. We translate that into
              system architecture, data models, and working software.
            </p>
          </div>

          <div data-stage className="compile-stage relative lg:col-span-9">
            {/* 1. The request */}
            <div data-sentence className="compile-layer">
              <p className="text-sm text-on-ground-2 lg:hidden">1. The request</p>
              <p className="mt-2 max-w-[30ch] text-[clamp(1.6rem,3.3vw,3rem)] font-medium leading-[1.25] tracking-[-0.01em]">
                “Our <span data-word="inspector">inspectors</span> fill in{" "}
                <span data-word="checklist">paper checklists</span> on <span data-word="site">site</span>,
                then someone retypes it all into <span data-word="report">Excel every week</span>.”
              </p>
            </div>

            {/* 2. The data model */}
            <div data-model className="compile-layer">
              <p className="text-sm text-on-ground-2 lg:hidden">2. The data model</p>
              <div className="relative mt-2 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:[.is-live_&]:mt-40 xl:[.is-live_&]:mt-48">
                {entities.map((e) => (
                  <div
                    key={e.k}
                    data-entity={e.k}
                    className="rounded-lg border border-ground-rule bg-paper/[0.03] p-3 sm:p-4"
                  >
                    <p className="figures h-6 text-[0.95rem] font-medium leading-6 text-field">
                      <span data-entity-head={e.k} className="inline-block lg:[.is-live_&]:invisible">
                        {e.name}
                      </span>
                    </p>
                    <ul className="figures mt-3 space-y-1 text-[0.8rem] text-on-ground-2 sm:text-[0.85rem]">
                      {e.fields.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. The working software */}
            <div data-app data-cursor="none" className="compile-layer">
              <p className="text-sm text-on-ground-2 lg:hidden">3. The working software</p>
              <InspectionsApp />
            </div>

            {/* Connectors between the tables; drawn from measured positions once the scene is live */}
            <svg
              data-relations
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden size-full overflow-visible [.is-live_&]:block"
            >
              {[0, 1, 2].map((i) => (
                <path key={i} data-relation />
              ))}
            </svg>

            {/* Tokens: the words that travel from the sentence into the model */}
            {entities.map((e) => (
              <span
                key={e.k}
                data-token={e.k}
                aria-hidden="true"
                className="figures invisible absolute left-0 top-0 z-10 hidden origin-top-left whitespace-nowrap text-[0.95rem] font-medium leading-6 text-field lg:[.is-live_&]:inline-block"
              >
                {e.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </CompileMotion>
  );
}
