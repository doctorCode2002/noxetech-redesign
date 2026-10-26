import { ArrowLeft } from "lucide-react";
import { TransitionLink } from "@/components/motion/transition-link";
import { CustomRequestForm } from "@/components/sms-switch/custom-request-form";
import { HeroBackdrop } from "@/components/hero-art/hero-backdrop";
import { SmsCustomRequestArt } from "@/components/hero-art/sms-custom-request";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/solutions/sms-switch/custom-request", "Request a Custom Version — NoxeTech SMS Switch", "Need a tailored SMS Switch? Contact our technical team to build a custom version based on your traffic, routing, SMPP, reporting, security, and operational requirements.");

export default function SolutionsSmsSwitchCustomRequestPage() {
  return (
    <>
      <section className="drafting-grid relative isolate overflow-hidden border-b border-rule">
        <HeroBackdrop>
          <SmsCustomRequestArt />
        </HeroBackdrop>
        <div className="shell pb-16 pt-8 sm:pb-20 sm:pt-12">
          <TransitionLink
            href="/solutions/sms-switch"
            sheetLabel="SMS Switch"
            className="group inline-flex items-center gap-2 text-[0.95rem] text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to SMS Switch
          </TransitionLink>
          <p className="mt-12 text-[0.95rem] font-semibold">
            <span>Noxe</span>
            <span className="text-redline-ink">Tech</span>
          </p>
          <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)]">Request a Custom Version</h1>
          <p className="mt-6 max-w-[60ch] text-[1.1rem] text-ink-2">
            Need a tailored SMS Switch? Contact our technical team to build a custom version based on your
            traffic, routing, SMPP, reporting, security, and operational requirements.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell">
          <CustomRequestForm />
        </div>
      </section>
    </>
  );
}
