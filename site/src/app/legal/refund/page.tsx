import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/legal/refund", "Payment, Delivery & Correction Policy | NoxeTech", "NoxeTech payments are final and non-refundable: infrastructure, licences and third-party resources are procured immediately once a payment is confirmed.");

export default function LegalRefundPage() {
  return <PageIntro title={"Payment, Delivery & Correction Policy"} intro={"All payments are final and non-refundable. Infrastructure, licences and third-party resources are procured as soon as a payment is confirmed."} />;
}
