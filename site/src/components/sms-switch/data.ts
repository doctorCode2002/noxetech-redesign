// Original site copy and prices, verbatim (content/original-content.md, /solutions/sms-switch).

export type PackageId = "lite" | "pro" | "custom";

export const PACKAGE_EVENT = "sms-switch:package";

/** The three toggle buttons in "CHOOSE PACKAGE". */
export const packageTabs: { id: PackageId; name: string; sub: string }[] = [
  { id: "lite", name: "Lite", sub: "$199 / mo" },
  { id: "pro", name: "Pro", sub: "$549 / mo" },
  { id: "custom", name: "Custom", sub: "Lite + Upgrades" },
];

/** The edition card shown under the toggle, per package. */
export const editionCard: Record<PackageId, { title: string; body: string; price: string }> = {
  lite: { title: "SMS Switch Lite Subscription", body: "Lite Edition", price: "$199 / mo" },
  pro: { title: "SMS Switch Pro Subscription", body: "Pro Edition", price: "$549 / mo" },
  custom: { title: "1. SMS Switch Lite", body: "Lite Edition", price: "$199 / mo" },
};

export const base: Record<PackageId, { line: string; amount: number }> = {
  lite: { line: "SMS Switch Lite", amount: 199 },
  pro: { line: "SMS Switch Pro", amount: 549 },
  custom: { line: "SMS Switch Lite", amount: 199 },
};

export const features = [
  {
    id: "finance",
    name: "Finance Pro",
    desc: "Advanced financial management tools for monitoring and managing SMS-related financial operations.",
    price: 90,
  },
  {
    id: "dlr",
    name: "Report DLR",
    desc: "Track SMS delivery status and access delivery reports, including successful and failed deliveries.",
    price: 80,
  },
  {
    id: "test",
    name: "Private Test Account",
    desc: "A dedicated private test account for testing SMS connectivity, integrations, and message delivery workflows before production use.",
    price: 50,
  },
  {
    id: "cr",
    name: "Report CR",
    desc: "CR Reports (Conversion Rate Reports): Access detailed reports to monitor SMS delivery and conversion rates, analyze traffic performance, and evaluate campaign effectiveness.",
    price: 40,
  },
];

export const themes = [
  {
    id: "default",
    name: "Default Theme",
    desc: "Standard dark high-contrast interface with orange accents. Included free.",
    price: 0,
  },
  {
    id: "executive",
    name: "Executive Dark",
    desc: "Sophisticated slate gray and warm carbon styling for enterprise operations.",
    price: 49,
  },
  {
    id: "cyber",
    name: "Cyber Operations",
    desc: "High-visibility tactical cyan and dark console theme for NOC command centers.",
    price: 69,
  },
  {
    id: "amber",
    name: "Terminal Amber",
    desc: "Retro-modern high-contrast amber monochromatic telecom interface.",
    price: 59,
  },
  {
    id: "silver",
    name: "Minimalist Silver",
    desc: "Clean corporate silver and charcoal enterprise layout.",
    price: 79,
  },
];

export const SEAT_PRICE = 30;
export const MAX_SEATS = 99;

export const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const editions = [
  {
    id: "lite" as const,
    label: "Ready Subscription",
    price: "$199",
    name: "SMS Switch Lite",
    edition: "Lite Edition",
    setup: "+ $180 one-time setup",
    items: [
      ["Maximum Throughput (TPS)", "10 TPS"],
      ["Monthly SMS Capacity", "5,000,000 SMS / month"],
      ["SMPP Connections", "10 Connections"],
    ],
    demo: "View Lite Demo",
    cta: "Subscribe Lite / Configure",
  },
  {
    id: "pro" as const,
    flag: "RECOMMENDED EDITION",
    label: "Full Production Package",
    price: "$549",
    name: "SMS Switch Pro",
    edition: "Pro Edition",
    setup: "+ $139 one-time setup",
    items: [
      ["Finance Pro", ""],
      ["Maximum Throughput (TPS)", "25 TPS"],
      ["Monthly SMS Capacity", "10,000,000 SMS / month"],
      ["SMPP Connections", "50 Connections"],
    ],
    demo: "View Pro Demo",
    cta: "Subscribe Pro / Configure",
  },
];
