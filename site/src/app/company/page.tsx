import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/company", "About NoxeTech — Custom Software & Technology Solutions", "NoxeTech engineers custom software, web platforms, business systems, and specialized technology solutions built around the way organizations actually work.");

export default function CompanyPage() {
  return <PageIntro title={"Technology should fit the requirement—not the other way around."} intro={"NoxeTech is a custom software and technology company focused on designing and building systems around the way organizations actually need to work."} />;
}
