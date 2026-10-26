import { Eyebrow } from "@/components/eyebrow";
import { HeroBackdrop } from "@/components/hero-art/hero-backdrop";
import { StartProjectArt } from "@/components/hero-art/start-project";
import { IntakeWizard } from "@/components/intake/intake-wizard";
import { TransitionLink } from "@/components/motion/transition-link";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/start-project",
  "Start a Project — Custom Software Intake | NoxeTech",
  "Structure your custom software, web platform, mobile app, or systems integration project. Share your requirements, timeline, and goals with NoxeTech engineers.",
);

// Original site copy, verbatim.
const promises = [
  ["~3–5 Minutes", "Clear, step-by-step guided intake"],
  ["No Jargon Required", "Describe what you need in plain words"],
  ["Direct Engineering Review", "Evaluated by technical architects"],
];

export default function StartProjectPage() {
  return (
    <>
      <section className="drafting-grid relative isolate overflow-hidden border-b border-rule">
        <HeroBackdrop>
          <StartProjectArt />
        </HeroBackdrop>
        <div className="shell pb-16 pt-16 sm:pb-20 sm:pt-20">
          <Eyebrow>PROJECT INTAKE // STRUCTURED SCOPING WIZARD</Eyebrow>
          <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)]">
            Start a Project with NoxeTech
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.1rem] text-ink-2">
            Organize your project requirements, operational goals, and timeline. Our engineering team reviews
            each submission to provide a clear, consultative architectural recommendation.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {promises.map(([t, d]) => (
              <li key={t} className="border-t border-ink pt-4">
                <p className="font-semibold text-ink">{t}</p>
                <p className="mt-1 text-sm text-ink-2">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell relative max-w-5xl">
          <IntakeWizard />
          <p className="mt-12 text-center text-ink-2">
            Looking for general inquiries or have a specific question first?{" "}
            <TransitionLink
              href="/contact"
              className="font-semibold text-ink underline decoration-rule-strong hover:decoration-field"
            >
              Contact our team directly
            </TransitionLink>
          </p>
        </div>
      </section>
    </>
  );
}
