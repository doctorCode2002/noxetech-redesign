// Original site copy for the project intake wizard, verbatim.

export const steps = ["Project Type", "Overview", "Situation", "Requirements", "Planning", "Contact", "Review"];

export const projectTypes = [
  ["Website / Digital Experience", "Corporate platform, landing pages, digital presence, or informational portal."],
  ["Custom Web Platform", "Interactive web application, SaaS product, client portal, or customer dashboard."],
  ["Mobile Application", "iOS and Android application, field tool, or mobile companion for your platform."],
  ["Business Management System", "Operational software, administrative dashboard, inventory, or workflow tool."],
  ["ERP / CRM / Internal System", "Custom relationship management, resource planning, or team operations system."],
  ["Automation or Integration", "Connecting existing software, automating data flows, APIs, and background routines."],
  ["Telecom / Messaging System", "SMS platform architecture, messaging gateway, routing logic, or communications hub."],
  ["Cloud / Infrastructure Solution", "Application environment setup, cloud architecture, deployment configuration, or server setup."],
  ["Existing System Improvement", "Evaluating, modernizing, refactoring, or extending a software system you already have."],
  ["Something Custom / Bespoke", "Unique technical requirements, specialized domain logic, or cross-discipline platforms."],
  ["I'm Not Sure Yet", "You have a goal or problem in mind and want guidance on the right technical approach."],
] as const;

export const stages = [
  ["Idea only / Concept stage", "Concept or business need is defined, but no specifications or software exist yet."],
  ["Requirements are partially defined", "You have outlines, user stories, or preliminary wireframes ready for review."],
  ["Currently handled manually", "Work is currently done with paper, verbal steps, or manual team coordination."],
  ["Managed in spreadsheets / documents", "You use spreadsheets, docs, or forms that have grown too complex or disconnected."],
  ["Existing software needs improvement", "A running software application needs new features, UI refresh, or performance tuning."],
  ["Existing software needs replacement", "An older legacy tool is reaching its limits and needs to be replaced with a modern system."],
  ["Development has already started", "Codebase or prototypes exist and you need an engineering team to take over or complete it."],
  ["Live product in production", "The platform is currently operating with active users and needs ongoing engineering support."],
  ["Other situation", "A different operational context or unique project starting point."],
] as const;

export const features = [
  "User accounts & authentication",
  "Admin dashboard & control panel",
  "Customer / client portal",
  "Mobile access / responsive app",
  "Payments & billing workflows",
  "Reporting & data export (CSV/PDF)",
  "Inventory or asset tracking",
  "Accounting & financial workflows",
  "Automated email or SMS notifications",
  "Third-party API integrations",
  "Workflow automation & background jobs",
  "Role & permission management (RBAC)",
  "File & document management",
  "Telecom / SMS gateway integration",
  "Cloud setup & server configuration",
  "Existing database / system integration",
  "I am not sure yet",
];

export const audiences = [
  "Customers / Clients",
  "Internal Staff & Team Members",
  "System Administrators & Managers",
  "Field Teams & Remote Workers",
  "Partners & External Vendors",
  "Beneficiaries / Program Participants",
  "General Public Users",
  "Multiple Distinct User Groups",
  "Not sure yet",
];

export const timelines = [
  "As soon as practical",
  "Within 1–3 months",
  "Within 3–6 months",
  "More than 6 months",
  "Flexible / Exploring options",
  "I have a specific target launch date",
  "Not sure yet",
];

export const budgets = [
  ["I have an estimated budget or range", "You have a target allocation or budget range ready to share."],
  ["Budget is not defined yet", "You are in initial scoping and exploring feasible options."],
  ["I need guidance estimating the project", "You would like NoxeTech to estimate the scope and technical effort."],
] as const;

export const contactMethods = ["Email", "Phone", "WhatsApp", "No preference"];

export const errors = {
  projectType: "Please select the type of project you want to build.",
  descriptionEmpty: "Please provide a brief description of what you would like to build.",
  descriptionShort: "Please describe your project with at least 10 characters.",
  currentStage: "Please select where your project or operational process is today.",
  integrations: "Please specify which systems, tools, or APIs need to be connected.",
  timeline: "Please select your target project timeline.",
  budget: "Please select your budget planning status.",
  fullName: "Please provide your full name.",
  email: "Please provide a valid email address.",
  consent: "Please confirm your consent for NoxeTech to use this information to respond to your inquiry.",
};
