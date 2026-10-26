import { Approach } from "@/components/home/approach";
import { Capabilities } from "@/components/home/capabilities";
import { Closing } from "@/components/home/closing";
import { Compile } from "@/components/home/compile";
import { Hero } from "@/components/home/hero";
import { Principles } from "@/components/home/principles";
import { Process } from "@/components/home/process";
import { SmsSwitch } from "@/components/home/sms-switch";
import { StartingPoints } from "@/components/home/starting-points";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <SmsSwitch />
      <Compile />
      <Approach />
      <Process />
      <Principles />
      <StartingPoints />
      <Closing />
    </>
  );
}
