import {
  Challenges,
  Matrix,
  Scenarios,
  SmsBand,
  SolutionsClosing,
  SolutionsHero,
} from "@/components/solutions/sections";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("/solutions", "Software Solutions by Operational Challenge — NoxeTech", "Custom technology solutions engineered around real operational requirements—from translating new product ideas and replacing manual spreadsheets to modernizing legacy software and connecting disconnected systems.");

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SmsBand />
      <Challenges />
      <Scenarios />
      <Matrix />
      <SolutionsClosing />
    </>
  );
}
