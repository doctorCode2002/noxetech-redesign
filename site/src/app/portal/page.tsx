import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/portal", "Customer Portal Sign-In — NoxeTech", "Use the same business email used for your NoxeTech order. Access your orders, payments, and invoices via secure email magic link.");

export default function PortalPage() {
  return <PageIntro title={"Customer Portal Sign-In"} intro={"Use the same business email used for your NoxeTech order. Access your orders, payments, and invoices via secure email magic link."} />;
}
