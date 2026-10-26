import { ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "../button";

// Original copy, verbatim. The demo links are switched off in this preview build.
const demos = [
  {
    tag: "LITE EDITION",
    name: "SMS Switch Lite",
    body: "Essential SMS routing and management for streamlined operations.",
    cta: "Launch Lite Demo",
  },
  {
    flag: "CARRIER EDITION",
    tag: "PRO EDITION",
    name: "SMS Switch Pro",
    body: "Advanced control, reporting, routing, and operational capabilities.",
    cta: "Launch Pro Demo",
  },
];

export function SmsDemos() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="demo-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            Experience NoxeTech SMS Switch
          </h2>
          <p className="max-w-[48ch] text-[1.05rem] text-ink-2 lg:col-span-5">
            Explore both editions before choosing the right deployment for your operation.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {demos.map((d) => (
            <article
              key={d.name}
              className={`relative flex min-w-0 flex-col rounded-2xl border p-6 sm:p-8 ${
                d.flag ? "border-field bg-sheet" : "border-rule bg-sheet"
              }`}
            >
              {d.flag && (
                <p className="figures absolute -top-3 left-6 rounded-full bg-field px-3 py-1 text-[0.7rem] font-medium text-on-field sm:left-8">
                  {d.flag}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <p className="figures rounded-full border border-rule-strong px-3 py-1 text-[0.72rem] text-ink-2">
                  {d.tag}
                </p>
                <p className="flex items-center gap-2 text-sm text-ink-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-[#16a34a]" />
                  Available
                </p>
              </div>
              <h3 className="display mt-6 text-[2rem]">{d.name}</h3>
              <p className="mt-2 flex-1 text-ink-2">{d.body}</p>
              <Button
                disabled
                variant={d.flag ? "primary" : "solid"}
                className="mt-8 w-full"
                aria-describedby="demo-offline"
              >
                {d.cta} <ExternalLink aria-hidden="true" className="size-4" />
              </Button>
            </article>
          ))}
        </div>
        <p id="demo-offline" className="mt-4 text-sm text-ink-3">
          Live demos are switched off in this preview build.
        </p>

        <div className="mt-8 flex gap-4 rounded-2xl border border-rule p-6">
          <ShieldCheck aria-hidden="true" className="mt-1 size-5 shrink-0 text-redline-ink" />
          <div>
            <p className="font-semibold">Demo Environment</p>
            <p className="mt-1 text-sm text-ink-2">
              Auto-login enabled. This is a demonstration environment for preview purposes only. Some
              features may be limited or disabled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
