import { Eyebrow } from "../eyebrow";
import { RoutingConsole } from "../home/routing-console";
import { KineticHeading } from "../kinetic-heading";
import { JumpButton, PackageLink } from "./package-link";
import { SubnavLink } from "./subnav-link";
import { HeroBackdrop } from "../hero-art/hero-backdrop";
import { SmsSwitchArt } from "../hero-art/sms-switch";

// Original sub-navigation, verbatim.
const subnav = [
  ["#overview", "Overview"],
  ["#editions", "Editions & Pricing"],
  ["#configurator", "Custom Package"],
  ["#demo", "Live Demos"],
];

export function SmsHero() {
  return (
    <section
      id="overview"
      aria-labelledby="sms-hero-title"
      className="drafting-grid relative isolate overflow-hidden scroll-mt-24 border-b border-rule"
    >
      <HeroBackdrop>
        <SmsSwitchArt />
      </HeroBackdrop>
      <div className="shell">
        <nav
          aria-label="SMS Switch"
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-rule py-4"
        >
          <p className="text-[0.95rem] font-semibold">
            <span>Noxe</span>
            <span className="text-redline-ink">Tech</span> <span>SMS Switch</span>
          </p>
          <ul className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto">
            {subnav.map(([href, text]) => (
              <li key={href} className="shrink-0">
                <SubnavLink href={href}>{text}</SubnavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-12 pb-20 pt-12 sm:pb-28 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="min-w-0 lg:col-span-6">
            <Eyebrow>FLAGSHIP TELECOM PLATFORM · SMS SWITCH</Eyebrow>
            <KineticHeading
              id="sms-hero-title"
              lines={["NoxeTech", "SMS Switch"]}
              className="mt-4 w-fit text-[clamp(3rem,8vw,6.5rem)] !leading-[0.95]"
            />
            <p className="mt-8 max-w-[44ch] text-[1.15rem] text-ink-2">
              Carrier-Grade A2P/P2P SMS Routing & High-Performance Gateway Platform
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <JumpButton hash="#editions" variant="solid">
                View Editions & Pricing
              </JumpButton>
              <JumpButton hash="#demo">Explore Live Demos</JumpButton>
              <PackageLink pkg="custom">Build Custom Package</PackageLink>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <div className="rounded-2xl bg-ground p-2 text-on-ground shadow-sheet sm:p-3">
              <RoutingConsole />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
