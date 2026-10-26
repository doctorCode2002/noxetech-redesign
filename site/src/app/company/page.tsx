import { CollaborationContexts } from "@/components/company/collaboration-contexts";
import { CompanyClosing } from "@/components/company/company-closing";
import { CompanyHero } from "@/components/company/company-hero";
import { Convictions } from "@/components/company/convictions";
import { OperatingPrinciples } from "@/components/company/operating-principles";
import { Positioning } from "@/components/company/positioning";
import { Scope } from "@/components/company/scope";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/company", "About NoxeTech — Custom Software & Technology Solutions", "NoxeTech engineers custom software, web platforms, business systems, and specialized technology solutions built around the way organizations actually work.");

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <Positioning />
      <Convictions />
      <Scope />
      <OperatingPrinciples />
      <CollaborationContexts />
      <CompanyClosing />
    </>
  );
}
