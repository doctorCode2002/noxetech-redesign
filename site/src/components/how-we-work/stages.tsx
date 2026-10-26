import { Eyebrow } from "../eyebrow";
import { Artifact } from "./artifact";
import { pad, stages } from "./data";
import { StagePanel, StagesMotion } from "./stages-motion";

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 size-5 shrink-0">
      <circle cx="10" cy="10" r="9" className="fill-none stroke-rule-strong" />
      <circle
        cx="10"
        cy="10"
        r="9"
        className="fill-field transition-opacity duration-300 [transition-delay:var(--d)] motion-reduce:transition-none [.is-live_&]:opacity-0 [.is-live_[data-ticked]_&]:opacity-100"
      />
      <path
        d="M6 10.5l2.75 2.75L14 8"
        pathLength={1}
        strokeDasharray="1"
        className="fill-none stroke-on-field transition-[stroke-dashoffset] duration-500 ease-out-expo [transition-delay:calc(var(--d)+150ms)] motion-reduce:transition-none [.is-live_&]:[stroke-dashoffset:1] [.is-live_[data-ticked]_&]:[stroke-dashoffset:0]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Stages() {
  return (
    <StagesMotion aria-labelledby="stages-title" className="border-t border-rule py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>DELIVERY LIFECYCLE</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="stages-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            The Five Project Stages
          </h2>
          <p className="text-ink-2 lg:col-span-5">
            Every engagement follows a structured path designed to eliminate technical ambiguity early, structure
            development cleanly, and verify functionality rigorously.
          </p>
        </div>
      </div>
      <div className="shell mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
        <div className="hidden lg:col-span-5 lg:block">
          <StagePanel />
        </div>
        <ol className="lg:col-span-7">
          {stages.map((s, i) => (
            <li
              key={s.title}
              id={`stage-${pad(i + 1)}`}
              data-stage={i}
              className="scroll-mt-28 border-t border-ink pb-16 pt-6 last:pb-0 sm:pb-20"
            >
              <div className="flex items-end justify-between gap-4">
                <p aria-hidden="true" className="mega text-[clamp(4rem,9vw,7.5rem)] text-redline-ink">
                  {pad(i + 1)}
                </p>
                <p className="figures pb-2 text-xs uppercase tracking-[0.12em] text-ink-3">
                  STAGE {pad(i + 1)} OF 05
                </p>
              </div>
              <h3 className="display mt-6 text-[clamp(1.9rem,3.2vw,2.75rem)]">{s.title}</h3>
              <p className="figures mt-3 text-[0.95rem] text-redline-ink">{s.sub}</p>
              <p className="mt-4 max-w-[60ch] text-ink-2">{s.body}</p>

              {/* Phones and tablets: the artifact this stage produces, drawn inline. */}
              <Artifact
                state={i}
                data-inline-art={i}
                className="mt-8 rounded-xl border border-rule bg-paper p-4 sm:p-6 lg:hidden"
              />

              <div className="mt-8 rounded-xl bg-ground p-6 text-on-ground">
                <p className="figures text-xs uppercase tracking-[0.12em] text-field">
                  {"// STAGE DELIVERABLE / OUTPUT"}
                </p>
                <p className="mt-3 text-[1.05rem] font-medium">{s.output}</p>
              </div>

              <p className="figures mt-8 text-xs uppercase tracking-[0.12em] text-ink-3">
                {"// KEY ENGINEERING ACTIVITIES"}
              </p>
              <ul data-activities className="group/acts mt-4 divide-y divide-rule border-y border-rule">
                {s.activities.map((a, j) => (
                  <li
                    key={a}
                    className="flex gap-3 py-3 text-ink"
                    style={{ "--d": `${j * 110}ms` } as React.CSSProperties}
                  >
                    <Check />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </StagesMotion>
  );
}
