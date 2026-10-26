import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/contact", "Contact NoxeTech — General & Technical Inquiries", "Contact NoxeTech directly for general questions, partnership discussions, or technical inquiries. Email contact@noxetech.com.");

export default function ContactPage() {
  return <PageIntro title={"Contact NoxeTech"} intro={"Have a general inquiry, technical question, or partnership discussion? Reach out to our team directly."} />;
}
