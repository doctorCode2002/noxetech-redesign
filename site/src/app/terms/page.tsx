import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/terms", "Terms of Use — Website & Engagement Governance | NoxeTech", "Terms governing the use of the NoxeTech website, technical scoping tools, and business communications.");

export default function TermsPage() {
  return <PageIntro title={"Terms of Use"} intro={"These terms govern your access to and use of the NoxeTech website, informational content, and project scoping tools."} />;
}
