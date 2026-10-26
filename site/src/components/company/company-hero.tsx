import { Compass, Layers, SquareTerminal } from "lucide-react";
import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";

// Original site copy, verbatim.
const tags = [
  { icon: Compass, text: "Requirement-First Engineering" },
  { icon: SquareTerminal, text: "Pragmatic Architecture" },
  { icon: Layers, text: "Maintainable Codebases" },
];

export function CompanyHero() {
  return (
    <section aria-labelledby="company-title" className="drafting-grid border-b border-rule">
      <div className="shell pb-16 pt-16 sm:pb-24 sm:pt-20">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Eyebrow>ABOUT NOXETECH</Eyebrow>
          <p className="figures text-xs text-ink-3">{"// CUSTOM SOFTWARE & TECHNOLOGY SOLUTIONS"}</p>
        </div>
        <KineticHeading
          id="company-title"
          lines={["Technology should fit", "the requirement—not", "the other way around."]}
          className="mt-4 w-fit text-[clamp(2.6rem,6.6vw,6.25rem)] !leading-[0.98]"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="max-w-[56ch] text-[1.15rem] text-ink-2">
              NoxeTech is a custom software and technology company focused on designing and building systems
              around the way organizations actually need to work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/start-project">Start a Project</Button>
              <Button href="/how-we-work" variant="secondary" sheetLabel="How We Work">
                How We Work
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 lg:col-span-5">
            {tags.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 border-t border-ink pt-3 text-[0.95rem] font-medium">
                <Icon aria-hidden="true" className="size-4 shrink-0 text-redline-ink" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
