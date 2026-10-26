import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { KineticHeading } from "../kinetic-heading";
import { Globe } from "./globe";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-2 sm:px-3">
      <div
        data-cursor="ring"
        className="relative isolate flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden rounded-[1.25rem] bg-field text-on-field sm:min-h-[calc(100svh-6.5rem)] sm:rounded-[1.75rem]"
      >
        {/* The copy layer lets pointer events through to the globe; its own text and controls opt back in. */}
        <div className="pointer-events-none relative flex flex-1 flex-col justify-between gap-8 px-5 pb-6 pt-8 sm:px-10 sm:pb-10 sm:pt-12 [&_a]:pointer-events-auto [&_h1]:pointer-events-auto [&_p]:pointer-events-auto [&_ul]:pointer-events-auto">
          <div className="relative z-10">
            <Eyebrow tone="field">CUSTOM SOFTWARE & TECHNOLOGY SOLUTIONS</Eyebrow>
            <KineticHeading
              id="hero-title"
              lines={["Bring the idea.", "We’ll engineer the", "software behind it."]}
              className="mt-4 w-fit text-[clamp(2.9rem,min(9.6vw,15svh),10.5rem)] !leading-[1.06] lg:text-[clamp(3.5rem,min(6.8vw,11.5svh),8.5rem)]"
            />
          </div>

          <div className="pointer-events-auto mx-auto -my-4 w-[min(80vw,20rem)] lg:absolute lg:right-[-4%] lg:top-1/2 lg:z-0 lg:m-0 lg:w-[min(54vw,94svh)] lg:-translate-y-1/2">
            <Globe />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="max-w-[48ch] text-[1.1rem] font-medium leading-normal sm:text-[1.2rem]">
                NoxeTech designs and builds custom software, digital platforms, business systems, and
                technology solutions around real client requirements—from concept and architecture through
                development and delivery.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href="/start-project" variant="ink">
                  Start a Project
                </Button>
                <Button href="/services" variant="text-field" sheetLabel="Services">
                  Explore Capabilities
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
