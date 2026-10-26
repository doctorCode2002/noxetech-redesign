import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";
import { Drawer } from "./drawer";
import { DrawerMotion } from "./drawer-motion";

// Original site copy, verbatim.
const scope = [
  {
    title: "Custom Architecture",
    text: "Software designed and built directly around specific organizational workflows, data structures, and operational goals.",
  },
  {
    title: "Multi-Platform Scope",
    text: "Web applications, mobile software, internal business management tools, API integrations, and specialized systems.",
  },
  {
    title: "Pragmatic Technology",
    text: "Technology stacks selected according to actual project requirements, team maintainability, and deployment context.",
  },
];

export function Archive() {
  return (
    <section aria-labelledby="status-title" className="py-20 sm:py-28">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Eyebrow>PORTFOLIO STATUS</Eyebrow>
              <p className="figures text-xs uppercase tracking-[0.12em] text-ink-3">{"// REPOSITORY ARCHIVE"}</p>
            </div>
            <h2 id="status-title" className="display mt-4 text-[clamp(2.4rem,4.6vw,4.25rem)]">
              Public Case Studies Are Not Currently Listed
            </h2>
            <p className="mt-6 max-w-[56ch] text-ink-2">
              NoxeTech builds custom web applications, mobile platforms, business systems, and specialized
              infrastructure. Public case studies are not currently published in this repository. To understand our
              capabilities, delivery process, or discuss a project requirement, explore the resources below.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/services" sheetLabel="Services">
                Explore Services
              </Button>
              <Button href="/how-we-work" variant="secondary">
                How We Work
              </Button>
              <Button href="/start-project" variant="secondary">
                Start a Project
              </Button>
            </div>
          </div>
          <DrawerMotion data-cursor="Scroll" className="mx-auto w-full max-w-[30rem] lg:col-span-5 lg:col-start-8">
            <Drawer />
          </DrawerMotion>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:mt-20 md:grid-cols-3">
          {scope.map((s, i) => (
            <li key={s.title} className="bg-paper p-6 sm:p-8">
              <p className="mega text-[clamp(3rem,6vw,4.5rem)] text-redline-ink">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">{s.title}</h3>
              <p className="mt-3 max-w-[40ch] text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Scoping() {
  return (
    <section aria-labelledby="scope-title" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[1.25rem] bg-field px-5 py-16 text-on-field sm:rounded-[1.75rem] sm:px-10 sm:py-24">
        <Eyebrow tone="field">PROJECT SCOPING</Eyebrow>
        <KineticHeading
          as="h2"
          id="scope-title"
          lines={["Have a Project with", "Specific Requirements?"]}
          className="mt-4 text-[clamp(2.6rem,7.4vw,8rem)]"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-[48ch] text-[1.15rem] font-medium">
              Whether you need a custom web platform, mobile application, operational business system, or
              specialized infrastructure, our engineering team can help scope and build it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
              {["Architectural Scoping", "Requirement Analysis", "Structured Delivery"].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-on-field" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-6 lg:justify-end">
            <Button href="/start-project" variant="ink">
              Start a Project Inquiry
            </Button>
            <Button href="/services" variant="text-field" sheetLabel="Services">
              View All Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
