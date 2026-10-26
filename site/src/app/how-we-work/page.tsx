import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/how-we-work", "How We Work — Software Development & Delivery Process | NoxeTech", "A clear path from requirement to working software. Discover NoxeTech’s 5-stage engineering lifecycle: Discovery, Architecture, Engineering, Verification, and Delivery.");

export default function HowWeWorkPage() {
  return <PageIntro title={"A clear path from requirement to working software."} intro={"Every project is different, but the delivery process should remain understandable. NoxeTech structures projects around clear requirements, technical planning, implementation, verification, and delivery."} />;
}
