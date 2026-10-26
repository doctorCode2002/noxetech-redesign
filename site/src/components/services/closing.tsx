import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";

export function ScopePrinciple() {
  return (
    <section aria-labelledby="principle-title" className="py-20 sm:py-28">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Eyebrow>NON-LIMITATION SCOPE PRINCIPLE</Eyebrow>
          <h2 id="principle-title" className="display mt-4 text-[clamp(2.4rem,4.6vw,4.25rem)]">
            Custom Engineering for Specific Needs
          </h2>
          <p className="mt-6 max-w-[64ch] text-[1.1rem] text-ink-2">
            The six categories above represent our core capability areas. If your organization has unique
            requirements, specialized workflow rules, or custom integration needs that do not fit neatly into
            standard definitions, we design and build software around your specifications.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-4 lg:flex-col lg:items-end">
          <Button href="/start-project" variant="solid">
            Discuss Your Requirements
          </Button>
          <Button href="/solutions" variant="text" sheetLabel="Solutions">
            Explore Solutions by Problem
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Consultation() {
  return (
    <section aria-labelledby="consult-title" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[1.25rem] bg-field px-5 py-16 text-on-field sm:rounded-[1.75rem] sm:px-10 sm:py-24">
        <Eyebrow tone="field">ENGINEERING CONSULTATION</Eyebrow>
        <KineticHeading
          as="h2"
          id="consult-title"
          lines={["Ready to build your", "custom software system?"]}
          className="mt-4 text-[clamp(2.8rem,7.6vw,8rem)]"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-[48ch] text-[1.15rem] font-medium">
              Discuss your technical requirements, architectural scope, and delivery timelines directly with our
              senior software engineers.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
              {["Structured Discovery Phase", "Clear Milestones", "Direct Technical Communication"].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-on-field" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-6 lg:justify-end">
            <Button href="/start-project" variant="ink">
              Start a Project
            </Button>
            <Button href="/how-we-work" variant="text-field" sheetLabel="How We Work">
              Review Engineering Process
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
