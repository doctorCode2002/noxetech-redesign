import { ExternalLink } from "lucide-react";
import { Button } from "../button";
import { editions } from "./data";
import { PackageLink } from "./package-link";

export function SmsEditions() {
  return (
    <section id="editions" aria-labelledby="editions-title" className="scroll-mt-24 border-t border-rule py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="editions-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
            Choose Your Deployment Edition
          </h2>
          <p className="max-w-[52ch] text-[1.05rem] text-ink-2 lg:col-span-5">
            Select between scalable Lite ready deployment, full carrier-grade Pro production infrastructure, or
            a modular Custom package.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {editions.map((e) => (
            <article
              key={e.id}
              className={`relative flex min-w-0 flex-col rounded-2xl border bg-sheet p-6 sm:p-8 ${
                e.flag ? "border-field" : "border-rule"
              }`}
            >
              {e.flag && (
                <p className="figures absolute -top-3 left-6 rounded-full bg-field px-3 py-1 text-[0.7rem] font-medium text-on-field sm:left-8">
                  {e.flag}
                </p>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">{e.label}</p>
                <p>
                  <span className="figures text-[1.75rem] text-redline-ink">{e.price}</span>
                  <span className="text-ink-3"> / mo</span>
                </p>
              </div>
              <h3 className="display mt-4 text-[2rem]">{e.name}</h3>
              <p className="mt-1 text-sm text-ink-2">{e.edition}</p>
              <p className="figures text-sm text-redline-ink">{e.setup}</p>
              <ul className="mt-6 flex-1 divide-y divide-rule border-t border-rule text-[0.92rem]">
                {e.items.map(([k, v]) => (
                  <li key={k} className="flex flex-wrap justify-between gap-x-4 py-3">
                    <span>{k}</span>
                    {v && <span className="figures text-ink-2">{v}</span>}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Button disabled variant="secondary" size="sm" aria-describedby="editions-demo-offline">
                  {e.demo} <ExternalLink aria-hidden="true" className="size-4" />
                </Button>
                <PackageLink pkg={e.id} variant={e.flag ? "primary" : "solid"}>
                  {e.cta}
                </PackageLink>
              </div>
            </article>
          ))}

          <article className="flex min-w-0 flex-col rounded-2xl bg-field p-6 text-on-field sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-field/75">Lite + Upgrades</p>
              <p className="text-right">
                <span className="block text-xs">Starting at</span>
                <span className="figures text-[1.25rem]">$199 / mo</span>
              </p>
            </div>
            <h3 className="display mt-4 text-[2rem]">Custom Package</h3>
            <p className="mt-2 text-[0.95rem]">
              Build your tailored deployment starting from Lite Foundation with optional add-on features,
              enterprise themes, and sub-admin seats.
            </p>
            <ul className="mt-6 flex-1 divide-y divide-on-field/20 border-t border-on-field/25 text-[0.92rem]">
              <li className="py-3">Lite Foundation ($199 / mo Base)</li>
              <li className="py-3">Select Multi-Feature Add-ons (+$XX / mo)</li>
              <li className="py-3">Enterprise Themes & Sub-Admin Seats (+$XX / mo)</li>
            </ul>
            <div className="mt-8 grid gap-3">
              <PackageLink pkg="custom" variant="ink">
                Build Custom Package
              </PackageLink>
              <Button
                href="/solutions/sms-switch/custom-request"
                variant="text-field"
                sheetLabel="Custom Version"
                className="justify-self-center"
              >
                Request a Custom Version
              </Button>
            </div>
          </article>
        </div>
        <p id="editions-demo-offline" className="mt-4 text-sm text-ink-3">
          Live demos are switched off in this preview build.
        </p>
      </div>
    </section>
  );
}
