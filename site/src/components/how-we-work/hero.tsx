import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { pad, stageNames } from "./data";
import { HeroBackdrop } from "../hero-art/hero-backdrop";
import { HowWeWorkArt } from "../hero-art/how-we-work";

export function Hero() {
  return (
    <section aria-labelledby="hww-title" className="drafting-grid relative isolate overflow-hidden border-b border-rule">
      <HeroBackdrop>
        <HowWeWorkArt />
      </HeroBackdrop>
      <div className="shell pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Eyebrow>OUR PROCESS</Eyebrow>
          <p className="figures text-xs uppercase tracking-[0.12em] text-ink-3">{"// 5-STAGE ENGINEERING LIFECYCLE"}</p>
        </div>
        <h1 id="hww-title" className="display mt-4 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.5rem)]">
          A clear path from requirement to working software.
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[60ch] text-[1.1rem] text-ink-2 lg:col-span-7">
            Every project is different, but the delivery process should remain understandable. NoxeTech structures
            projects around clear requirements, technical planning, implementation, verification, and delivery.
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button href="/start-project">Start a Project</Button>
            <Button href="/services" variant="secondary" sheetLabel="Services">
              Explore Services
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <p className="figures text-xs uppercase tracking-[0.12em] text-ink-3">{"// DELIVERY STAGES"}</p>
          <ol className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-5">
            {stageNames.map((name, i) => (
              <li key={name} className="last:col-span-2 sm:last:col-span-1">
                <a
                  href={`#stage-${pad(i + 1)}`}
                  className="group flex h-full items-end justify-between gap-4 bg-sheet p-4 transition-colors hover:bg-field hover:text-on-field sm:block sm:p-6"
                >
                  <span className="figures block text-sm text-redline-ink transition-colors group-hover:text-on-field">
                    {pad(i + 1)}
                  </span>
                  <span className="block font-semibold sm:mt-8 sm:text-[1.15rem]">{name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
