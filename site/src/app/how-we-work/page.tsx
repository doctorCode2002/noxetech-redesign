import { Hero } from "@/components/how-we-work/hero";
import { Iteration } from "@/components/how-we-work/iteration";
import { Collaboration, Faq, GetStarted, Intake, Pragmatic } from "@/components/how-we-work/sections";
import { Stages } from "@/components/how-we-work/stages";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/how-we-work", "How We Work — Software Development & Delivery Process | NoxeTech", "A clear path from requirement to working software. Discover NoxeTech’s 5-stage engineering lifecycle: Discovery, Architecture, Engineering, Verification, and Delivery.");

export default function HowWeWorkPage() {
  return (
    <>
      <Hero />
      <Stages />
      <Iteration />
      <Collaboration />
      <Intake />
      <Pragmatic />
      <Faq />
      <GetStarted />
    </>
  );
}
