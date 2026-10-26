import { ConfiguratorSection } from "@/components/sms-switch/configurator-section";
import { SmsDemos } from "@/components/sms-switch/demos";
import { SmsEditions } from "@/components/sms-switch/editions";
import { SmsHero } from "@/components/sms-switch/hero";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/solutions/sms-switch", "NoxeTech SMS Switch — Carrier-Grade A2P/P2P SMS Routing Platform", "SMS Switch Lite and Pro editions: SMPP gateway management, dynamic least-cost routing, real-time margin billing and carrier-grade throughput. Live demos and authoritative pricing.");

export default function SolutionsSmsSwitchPage() {
  return (
    <>
      <SmsHero />
      <SmsDemos />
      <SmsEditions />
      <ConfiguratorSection />
    </>
  );
}
