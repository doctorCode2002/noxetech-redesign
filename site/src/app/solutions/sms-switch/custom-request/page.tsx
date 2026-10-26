import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/solutions/sms-switch/custom-request", "Request a Custom Version — NoxeTech SMS Switch", "Need a tailored SMS Switch? Contact our technical team to build a custom version based on your traffic, routing, SMPP, reporting, security, and operational requirements.");

export default function SolutionsSmsSwitchCustomRequestPage() {
  return <PageIntro title={"Request a Custom Version"} intro={"Need a tailored SMS Switch? Contact our technical team to build a custom version based on your traffic, routing, SMPP, reporting, security, and operational requirements."} />;
}
