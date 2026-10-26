import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { AnchorLink } from "./anchor-link";
import { capabilities, num, tiers } from "./data";
import { HeroBackdrop } from "../hero-art/hero-backdrop";
import { ServicesArt } from "../hero-art/services";

const approach = ["Requirements-Driven", "Custom Software", "System Integrations", "Reliable Deployment"];

/** The original's CAPABILITY_MATRIX.MAP: the full stack in three tiers, each family placed in its tier. */
function MatrixMap() {
  return (
    <div className="rounded-[1.25rem] bg-ground p-4 text-on-ground sm:p-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-ground-rule pb-3">
        <p className="figures text-xs text-on-ground-2">CAPABILITY_MATRIX.MAP</p>
        <p className="figures text-xs text-field">FULL-STACK SCOPE</p>
      </div>
      <div className="mt-4">
        {tiers.map((t, ti) => (
          <div key={t.code}>
            <div className="rounded-xl border border-ground-rule p-4">
              <p className="figures text-[0.7rem] text-field">{t.code}</p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[1.05rem] font-semibold leading-tight">{t.title}</p>
                <p className="figures text-[0.7rem] text-on-ground-2">{t.spec}</p>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {capabilities.map((c, i) =>
                  c.tier === ti ? (
                    <li key={c.id}>
                      <AnchorLink
                        href={`#${c.id}`}
                        className="flex items-baseline gap-2 rounded-md border border-ground-rule px-3 py-1 text-[0.85rem] text-on-ground transition-colors duration-150 hover:border-field hover:bg-field hover:text-on-field"
                      >
                        <span className="figures text-[0.7rem] opacity-70">{num(i)}</span>
                        {c.name}
                      </AnchorLink>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
            {t.link && (
              <p className="figures py-3 text-center text-[0.68rem] tracking-[0.04em] text-on-ground-2">
                {t.link}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ground-rule pt-3">
        <p className="text-[0.9rem] font-semibold">Custom Architecture & Design</p>
        <p className="figures text-xs text-on-ground-2">Tailored Specifications</p>
      </div>
    </div>
  );
}

export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-title"
      className="drafting-grid relative isolate overflow-hidden border-b border-rule"
    >
      <HeroBackdrop>
        <ServicesArt />
      </HeroBackdrop>
      <div className="shell grid gap-12 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <Eyebrow>ENGINEERING CAPABILITIES</Eyebrow>
          <p className="figures mt-2 text-xs text-ink-3">{"// SYSTEM ARCHITECTURE & DEVELOPMENT"}</p>
          <h1 id="services-title" className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)]">
            Custom software designed and built around your requirements.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.1rem] text-ink-2">
            NoxeTech designs, develops, integrates, and delivers custom software across six core capability
            areas—combining user interfaces, business logic, system integrations, and supporting
            infrastructure tailored to your project’s goals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/start-project">Start a Project</Button>
            <Button href="/how-we-work" variant="text" sheetLabel="How We Work">
              How We Work
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-4 text-[0.9rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">Approach:</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {approach.map((a) => (
                <li key={a} className="flex items-center gap-2 text-ink">
                  <span aria-hidden="true" className="size-2 rounded-full bg-field" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-5">
          <MatrixMap />
        </div>
      </div>
    </section>
  );
}
