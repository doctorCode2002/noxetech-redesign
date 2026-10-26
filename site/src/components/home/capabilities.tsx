import { pixelMask } from "@/lib/pixel-mask";
import { Eyebrow } from "../eyebrow";
import { Button } from "../button";
import { TransitionLink } from "../motion/transition-link";
import { CapList } from "./cap-list";

// Original site copy, verbatim.
const capabilities = [
  {
    name: "Web & Digital Platforms",
    what: "Web applications, client portals, SaaS products, corporate platforms, and custom online systems built for performance, usability, and stability.",
    builds: [
      "Multi-tenant SaaS architectures",
      "Interactive client & partner portals",
      "High-performance web apps",
    ],
  },
  {
    name: "Mobile Applications",
    what: "Custom mobile products for iOS and Android designed around user experience, operational workflows, and specific device requirements.",
    builds: ["Tailored user interfaces", "Operational field apps", "API-driven mobile backends"],
  },
  {
    name: "Business Systems",
    what: "ERP, CRM, administrative, accounting, operational, and internal management software tailored to your specific organization workflows.",
    builds: [
      "Custom ERP & CRM solutions",
      "Accounting & operational software",
      "Internal workflow management",
    ],
  },
  {
    name: "Automation & Integrations",
    what: "APIs, workflow automation, and custom integrations that connect existing tools, databases, and external third-party platforms.",
    builds: ["Custom API development", "Automated workflow pipelines", "System & database synchronization"],
  },
  {
    name: "Telecom Technology",
    what: "Messaging platforms, telecom integrations, SMS systems, and specialized communication solutions engineered for reliability.",
    builds: ["SMS messaging platforms", "Telephony API integrations", "Carrier & gateway connections"],
  },
  {
    name: "Cloud & Infrastructure",
    what: "Deployment architecture, cloud environments, infrastructure setup, and scalable backend solutions built for growth.",
    builds: ["Cloud environment configuration", "Scalable backend services", "Production deployment setup"],
  },
];

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");

function Row({ c, flood = false }: { c: (typeof capabilities)[number]; flood?: boolean }) {
  const Name = flood ? "p" : "h3";
  return (
    <div className="grid gap-3 py-6 sm:py-8 lg:grid-cols-12 lg:items-center lg:gap-8">
      <Name className="cap-name mega whitespace-nowrap text-[clamp(1.9rem,4.2vw,4.25rem)] lg:col-span-7">
        {c.name}
      </Name>
      <div className="lg:col-span-5">
        <p className={`max-w-[52ch] text-[1rem] ${flood ? "" : "text-ink"}`}>{c.what}</p>
        <ul
          className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem] ${flood ? "opacity-75" : "text-ink-2"}`}
        >
          {c.builds.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="py-20 sm:py-28">
      <div className="shell">
        <Eyebrow>WHAT WE BUILD</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="capabilities-title" className="display text-[clamp(2.4rem,4.8vw,4.5rem)] lg:col-span-8">
            Custom Technology Solutions Built for Real Requirements
          </h2>
          <div className="lg:col-span-4">
            <p className="text-ink-2">
              We engineer software around the specific needs of your business, users, and operations.
            </p>
            <Button href="/services" variant="text" sheetLabel="Services" className="mt-2">
              Explore All Capabilities
            </Button>
          </div>
        </div>

        <CapList className="mt-12 border-t border-ink" style={pixelMask() as React.CSSProperties}>
          {capabilities.map((c) => (
            <li key={c.name} className="cap-row relative border-b border-ink">
              <TransitionLink
                href={`/services#${slug(c.name)}`}
                sheetLabel="Services"
                data-cursor="View"
                className="relative block focus-visible:outline-offset-[-2px]"
              >
                <Row c={c} />
                {/* The same row in orange, revealed by the racing-pixels mask. */}
                <div aria-hidden="true" className="cap-flood absolute inset-0 bg-field text-on-field">
                  <Row c={c} flood />
                </div>
              </TransitionLink>
            </li>
          ))}
        </CapList>
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
          <p className="max-w-[64ch] text-ink-2">
            These categories represent common solutions we engineer, not limits on what we can build. Every
            project is designed around your specific requirements.
          </p>
          <Button href="/start-project" variant="text">
            Start A Custom Inquiry →
          </Button>
        </div>
      </div>
    </section>
  );
}
