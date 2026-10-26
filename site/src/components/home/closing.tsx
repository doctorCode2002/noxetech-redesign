import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";

export function Closing() {
  return (
    <section aria-labelledby="close-title" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[1.25rem] bg-field px-5 py-16 text-on-field sm:rounded-[1.75rem] sm:px-10 sm:py-24">
        <Eyebrow tone="field">START A CONVERSATION</Eyebrow>
        <KineticHeading
          as="h2"
          id="close-title"
          lines={["Have something", "you want to build?"]}
          className="mt-4 text-[clamp(3rem,9vw,9.5rem)]"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-[46ch] text-[1.15rem] font-medium">
              Tell us what you’re trying to create, improve, automate, or replace. We’ll help turn the
              requirement into a clear technical project.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
              {["Structured Scope Intake", "Direct Technical Discussion", "No Preliminary Obligation"].map(
                (b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-2 rounded-full bg-on-field" />
                    {b}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-6 lg:justify-end">
            <Button href="/start-project" variant="ink">
              Start a Project
            </Button>
            <Button href="/contact" variant="text-field" sheetLabel="Contact">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
