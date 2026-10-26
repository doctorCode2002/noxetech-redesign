import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/privacy", "Privacy Policy — Data Handling & Communications | NoxeTech", "Learn how NoxeTech handles information submitted through our contact and project inquiry channels.");

export default function PrivacyPage() {
  return <PageIntro title={"Privacy Policy"} intro={"This policy explains how NoxeTech collects, processes, and protects information submitted through our website, contact forms, and project scoping wizard."} />;
}
