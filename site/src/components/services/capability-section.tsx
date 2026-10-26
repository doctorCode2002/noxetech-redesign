import { Button } from "../button";
import { type Capability, num, tiers } from "./data";

/** Small label in the original's voice: uppercase, tracked, quiet. */
function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.12em] text-ink-3 ${className}`}>{children}</p>;
}

/** Where this family sits in the stack: three bars, its tier filled. */
function TierMark({ tier }: { tier: number }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="flex flex-col gap-1">
        {tiers.map((t, i) => (
          <span key={t.code} className={`block h-1 w-8 rounded-full ${i === tier ? "bg-field" : "bg-rule-strong"}`} />
        ))}
      </span>
      <span className="figures text-xs text-ink-3">{tiers[tier].code}</span>
    </div>
  );
}

export function CapabilitySection({ c, i }: { c: Capability; i: number }) {
  return (
    <section
      id={c.id}
      tabIndex={-1}
      aria-labelledby={`${c.id}-title`}
      className="scroll-mt-36 border-t border-rule py-16 outline-none sm:py-20 lg:scroll-mt-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex items-end gap-4">
          <p aria-hidden="true" className="mega text-[clamp(4rem,8vw,7rem)] text-redline-ink [font-stretch:78%]">
            {num(i)}
          </p>
          <div className="pb-1">
            <p className="figures text-xs text-redline-ink">{"// CAPABILITY FAMILY"}</p>
            <p className="mt-1 max-w-[40ch] text-[0.95rem] font-medium leading-snug text-ink-2">{c.subtitle}</p>
          </div>
        </div>
        <TierMark tier={c.tier} />
      </div>

      <h2 id={`${c.id}-title`} className="display mt-8 text-[clamp(2.4rem,4.6vw,4.25rem)]">
        <span className="sr-only">{num(i)} </span>
        {c.name}
      </h2>
      <div className="mt-6 grid gap-4 xl:grid-cols-2 xl:gap-12">
        <p className="max-w-[52ch] text-[1.15rem] font-medium leading-normal text-ink">{c.summary}</p>
        <p className="max-w-[60ch] text-ink-2">{c.body}</p>
      </div>

      {/* Technical capabilities matrix: the four architectural areas that make up the family. */}
      <div className="mt-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
          <Label className="text-ink">Technical Capabilities Matrix</Label>
          <p className="figures text-xs text-ink-3">4 Architectural Areas</p>
        </div>
        <ol className="grid sm:grid-cols-2">
          {c.areas.map((a, k) => (
            <li
              key={a.name}
              className="border-b border-rule py-6 sm:px-6 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
            >
              <p aria-hidden="true" className="figures text-xs text-ink-3">
                {num(i)}.{k + 1}
              </p>
              <h3 className="mt-2 text-[1.15rem] font-semibold leading-tight">{a.name}</h3>
              <p className="mt-2 text-[0.975rem] text-ink-2">{a.text}</p>
              <p className="figures mt-4 flex gap-2 text-[0.8rem] leading-relaxed text-ink">
                <span aria-hidden="true" className="text-redline-ink">
                  {"//"}
                </span>
                {a.spec}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 grid gap-12 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Typical Project Examples & System Scopes
          </h3>
          <ul className="mt-4 grid border-t border-rule sm:grid-cols-2 sm:gap-x-8">
            {c.examples.map((e) => (
              <li key={e} className="flex gap-3 border-b border-rule py-3 text-[0.95rem]">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-field" />
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div className="xl:col-span-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Applicable Project Situations
          </h3>
          <ul className="mt-4 space-y-3">
            {c.situations.map((s) => (
              <li key={s} className="flex gap-3 rounded-lg bg-redline-wash px-4 py-3 text-[0.95rem] text-ink">
                <span aria-hidden="true" className="figures font-semibold text-redline-ink">
                  ›
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid overflow-hidden rounded-xl border border-rule bg-sheet md:grid-cols-2">
        <div className="p-6">
          <Label className="text-ink">Core Engineering Deliverables:</Label>
          <ul className="mt-4 space-y-2">
            {c.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-[0.95rem]">
                <span aria-hidden="true" className="figures text-redline-ink">
                  ✓
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-8 border-t border-rule p-6 md:border-l md:border-t-0">
          <div>
            <Label>Scope Framework Note:</Label>
            <p className="mt-3 text-[0.95rem] text-ink-2">{c.note}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold">Require this capability?</p>
            <Button href="/start-project" size="sm">
              Start Inquiry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
