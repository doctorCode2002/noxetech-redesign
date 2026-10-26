import { Eyebrow } from "../eyebrow";

// Original site copy, verbatim ("How clients work with us").
const points = [
  {
    tag: "New Product",
    situation: "Starting with an idea",
    text: "You know what you want the product to achieve but need the technical system designed and built from the ground up.",
    outcome: "Turn early concepts into fully functional digital platforms and applications.",
  },
  {
    tag: "Automation",
    situation: "Replacing a manual process",
    text: "Turn spreadsheets, paper forms, repetitive tasks, and fragmented handoffs into purpose-built software.",
    outcome: "Streamline operational time, minimize manual errors, and centralize company data.",
  },
  {
    tag: "Modernization",
    situation: "Modernizing an existing system",
    text: "Improve, restructure, extend, or rebuild software that no longer fits current operational needs or modern standards.",
    outcome: "Increase reliability, upgrade usability, and unlock new functional capabilities.",
  },
  {
    tag: "Integrations",
    situation: "Connecting existing systems",
    text: "Create custom integrations, APIs, and automation between tools and platforms that currently operate separately.",
    outcome: "Enable real-time data synchronization and eliminate redundant data entry.",
  },
];

export function StartingPoints() {
  return (
    <section aria-labelledby="start-title" className="py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>HOW CLIENTS WORK WITH US</Eyebrow>
            <h2 id="start-title" className="display mt-4 text-[clamp(2.4rem,4.4vw,4rem)]">
              Starting Points for Your Project
            </h2>
            <p className="mt-6 max-w-[40ch] text-ink-2">
              Whether you are building something new or improving existing software, we adapt our engineering
              approach to your situation.
            </p>
          </div>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {points.map((p) => (
            <li key={p.situation} className="border-t border-ink pt-6">
              <p className="text-sm font-semibold text-redline-ink">{p.tag}</p>
              <h3 className="mt-2 text-[1.45rem] font-semibold leading-tight [font-stretch:88%]">
                {p.situation}
              </h3>
              <p className="mt-3 text-ink-2">{p.text}</p>
              <p className="mt-4 text-[0.95rem] text-ink">
                <span className="figures mr-2 text-xs text-redline-ink">OUTCOME //</span>
                {p.outcome}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
