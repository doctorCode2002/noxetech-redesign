import { Button } from "../button";
import { Eyebrow } from "../eyebrow";
import { RoutingConsole } from "./routing-console";

// Original site copy, verbatim.
const packages = [
  {
    label: "Ready Package",
    price: "$199",
    name: "SMS Switch Lite",
    edition: "Lite Edition",
    setup: "+ $180 one-time setup",
    items: [
      "Maximum Throughput (TPS) · 10 TPS",
      "Monthly SMS Capacity · 5,000,000 SMS / month",
      "SMPP Connections · 10 Connections",
    ],
    cta: "Buy Lite / Configure",
  },
  {
    label: "Full Production Package",
    price: "$549",
    name: "SMS Switch Pro",
    edition: "Pro Edition",
    setup: "+ $139 one-time setup",
    items: [
      "Finance Pro",
      "Maximum Throughput (TPS) · 25 TPS",
      "Monthly SMS Capacity · 10,000,000 SMS / month",
      "SMPP Connections · 50 Connections",
    ],
    cta: "Buy Pro Edition",
    featured: true,
  },
];

export function SmsSwitch() {
  return (
    <section aria-labelledby="sms-title" className="mb-20 px-2 sm:mb-28 sm:px-3">
      <div className="rounded-[1.25rem] bg-ground py-16 text-on-ground sm:rounded-[1.75rem] sm:py-24">
        <div className="shell">
          <Eyebrow tone="ground">FLAGSHIP TELECOM PLATFORM · SMS SWITCH</Eyebrow>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="sms-title" className="display text-[clamp(2.6rem,5.6vw,5.5rem)] lg:col-span-7">
              Carrier-Grade A2P/P2P SMS Routing
            </h2>
            <p className="max-w-[52ch] text-[1.05rem] text-on-ground-2 lg:col-span-5">
              Engineered for high-volume SMPP gateway management, dynamic least-cost routing (LCR), and
              real-time margin billing. Available in scalable Lite and full Pro carrier editions.
            </p>
          </div>

          <div className="mt-12 min-w-0">
            <RoutingConsole />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`flex min-w-0 flex-col rounded-xl border p-6 ${
                  p.featured ? "border-field bg-ground" : "border-ground-rule bg-ground"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-ground-2">
                    {p.label}
                  </p>
                  <p>
                    <span className="figures text-[1.75rem] text-field">{p.price}</span>
                    <span className="text-on-ground-2"> / mo</span>
                  </p>
                </div>
                <h3 className="display mt-4 text-[1.9rem]">{p.name}</h3>
                <p className="mt-1 text-sm text-on-ground-2">{p.edition}</p>
                <p className="text-sm text-on-ground-2">{p.setup}</p>
                <ul className="mt-4 flex-1 space-y-2 border-t border-ground-rule pt-4 text-[0.9rem]">
                  {p.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Button
                  href="/solutions/sms-switch#configurator"
                  sheetLabel="SMS Switch"
                  variant={p.featured ? "primary" : "secondary"}
                  className={`mt-6 justify-center ${p.featured ? "" : "!border-ground-rule !text-on-ground hover:!border-on-ground"}`}
                >
                  {p.cta}
                </Button>
              </div>
            ))}
            <div className="flex min-w-0 flex-col rounded-xl bg-field p-6 text-on-field">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-field/75">
                  Lite + Upgrades
                </p>
                <p className="text-sm font-semibold">Modular</p>
              </div>
              <h3 className="display mt-4 text-[1.9rem]">Custom Package</h3>
              <p className="mt-2 text-[0.95rem]">
                Build your tailored deployment from the SMS Switch Lite with optional add-on features,
                enterprise themes, and sub-admin seats.
              </p>
              <ul className="mt-4 flex-1 space-y-2 border-t border-on-field/25 pt-4 text-[0.9rem]">
                <li>SMS Switch Lite ($199 / mo Base)</li>
                <li>Select Multi-Feature Add-ons</li>
                <li>Enterprise Themes & Sub-Admin Seats</li>
              </ul>
              <Button
                href="/solutions/sms-switch#configurator"
                sheetLabel="SMS Switch"
                variant="ink"
                className="mt-6 justify-center"
              >
                Build Custom Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
