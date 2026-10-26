import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/work", "Selected Work & Technical Case Studies | NoxeTech", "Explore selected custom software projects, web platforms, mobile applications, and systems integration architecture delivered by NoxeTech engineers.");

export default function WorkPage() {
  return <PageIntro title={"Software Built Around Real Requirements"} intro={"A portfolio of custom web platforms, mobile applications, business systems, and specialized infrastructure engineered by NoxeTech."} />;
}
