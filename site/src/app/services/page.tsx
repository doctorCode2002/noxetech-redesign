import { CapabilityIndex } from "@/components/services/capability-index";
import { CapabilitySection } from "@/components/services/capability-section";
import { Consultation, ScopePrinciple } from "@/components/services/closing";
import { Combined } from "@/components/services/combined";
import { capabilities } from "@/components/services/data";
import { ServicesHero } from "@/components/services/hero";
import { QuickIndex } from "@/components/services/quick-index";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/services", "Engineering & Technology Services — NoxeTech", "Custom software development, web platforms, mobile applications, tailored business systems, API automation, telecom engineering, and cloud infrastructure.");

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <QuickIndex />
      <div className="shell relative pb-20 sm:pb-28 lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
        <CapabilityIndex />
        <div className="lg:col-span-9">
          {capabilities.map((c, i) => (
            <CapabilitySection key={c.id} c={c} i={i} />
          ))}
        </div>
      </div>
      <Combined />
      <ScopePrinciple />
      <Consultation />
    </>
  );
}
