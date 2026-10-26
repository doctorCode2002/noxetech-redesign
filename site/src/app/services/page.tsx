import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/services", "Engineering & Technology Services — NoxeTech", "Custom software development, web platforms, mobile applications, tailored business systems, API automation, telecom engineering, and cloud infrastructure.");

export default function ServicesPage() {
  return <PageIntro title={"Custom software designed and built around your requirements."} intro={"NoxeTech designs, develops, integrates, and delivers custom software across six core capability areas—combining user interfaces, business logic, system integrations, and supporting infrastructure tailored to your project’s goals."} />;
}
