import { ArrowRight } from "lucide-react";
import { Button } from "../button";
import { Eyebrow } from "../eyebrow";

export function ContactHero() {
  return (
    <section aria-labelledby="contact-title" className="drafting-grid border-b border-rule">
      <div className="shell grid gap-10 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Eyebrow>GET IN TOUCH</Eyebrow>
            <p className="figures text-xs text-ink-3">{"// GENERAL & TECHNICAL INQUIRIES"}</p>
          </div>
          <h1 id="contact-title" className="display mt-4 text-[clamp(2.8rem,7vw,6rem)]">
            Contact NoxeTech
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.15rem] text-ink-2">
            Have a general inquiry, technical question, or partnership discussion? Reach out to our team
            directly.
          </p>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-6 lg:col-span-5">
          <p className="figures text-xs uppercase text-redline-ink">{"// Planning a New Software Project?"}</p>
          <p className="mt-3 text-ink">
            Use our guided 7-step intake wizard to define requirements, timeline, and architecture.
          </p>
          <Button href="/start-project" size="sm" className="mt-6">
            Start a Project <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
