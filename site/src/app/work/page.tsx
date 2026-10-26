import { Archive, Scoping } from "@/components/work/archive";
import { WorkHero } from "@/components/work/hero";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/work", "Selected Work & Technical Case Studies | NoxeTech", "Explore selected custom software projects, web platforms, mobile applications, and systems integration architecture delivered by NoxeTech engineers.");

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <Archive />
      <Scoping />
    </>
  );
}
