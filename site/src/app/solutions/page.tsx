import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/solutions", "Software Solutions by Operational Challenge — NoxeTech", "Custom technology solutions engineered around real operational requirements—from translating new product ideas and replacing manual spreadsheets to modernizing legacy software and connecting disconnected systems.");

export default function SolutionsPage() {
  return <PageIntro title={"Custom technology designed around real operational challenges."} intro={"Every organization faces distinct challenges—from outgrowing manual spreadsheets and wrestling with disconnected software to planning a new digital product from the ground up. We start by understanding your operational situation, then design and build the software to address it."} />;
}
