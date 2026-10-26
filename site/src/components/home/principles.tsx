import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim ("Why NoxeTech").
const principles = [
  {
    title: "Built Around Your Requirements",
    text: "We engineer solutions specifically for your business processes rather than forcing your operations into pre-packaged, rigid templates.",
  },
  {
    title: "End-to-End Execution",
    text: "We handle the full technical lifecycle—from initial technical planning and system design through to development and delivery.",
  },
  {
    title: "Broad Technical Capabilities",
    text: "Engineering expertise spanning web and mobile applications, business management software, telecom integrations, and cloud infrastructure.",
  },
  {
    title: "Maintainable, Modern Engineering",
    text: "Built using industry-standard technologies and clean architecture for long-term operational stability and future adaptability.",
  },
];

export function Principles() {
  return (
    <section aria-labelledby="why-title" className="px-2 sm:px-3">
      <div className="rounded-[1.25rem] bg-ground py-16 text-on-ground sm:rounded-[1.75rem] sm:py-24">
        <div className="shell">
          <Eyebrow tone="ground">WHY NOXETECH</Eyebrow>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="why-title" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] lg:col-span-7">
              Focused on Solutions, Not Generic Templates
            </h2>
            <p className="text-on-ground-2 lg:col-span-5">
              Our engineering approach is designed around delivering custom software built for your exact
              operational requirements.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ground-rule bg-ground-rule sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-ground p-6 sm:p-8">
                <p className="figures text-xs text-field">PRINCIPLE // {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight [font-stretch:85%]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-on-ground-2">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
