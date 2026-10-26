export const site = {
  name: "NoxeTech",
  url: "https://noxetech.com",
  email: "projects@noxetech.com",
  description:
    "NoxeTech designs and builds custom software, digital platforms, business systems, and technology solutions based on real client requirements.",
};

// Navigation and footer use the original site's wording.
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Our Work" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  {
    title: "Company",
    links: [
      { href: "/company", label: "Company" },
      { href: "/how-we-work", label: "How We Work" },
      { href: "/work", label: "Our Work" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { href: "/services", label: "Services" },
      { href: "/solutions", label: "Solutions" },
    ],
  },
  {
    title: "Project",
    links: [{ href: "/start-project", label: "Start a Project" }],
  },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/legal/refund", label: "Payment Policy" },
] as const;

/** The name shown on the page-transition sheet for each route (nav wording where there is one). */
export const pageTitles: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/solutions": "Solutions",
  "/solutions/sms-switch": "SMS Switch",
  "/solutions/sms-switch/custom-request": "Custom Version",
  "/work": "Our Work",
  "/how-we-work": "How We Work",
  "/company": "Company",
  "/contact": "Contact",
  "/start-project": "Start a Project",
  "/portal": "Client Portal",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Use",
  "/legal/refund": "Payment Policy",
};
