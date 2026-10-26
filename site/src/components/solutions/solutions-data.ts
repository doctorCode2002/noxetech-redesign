// Original site copy, verbatim (content/original-content.md, "## /solutions").

/** The six capability areas, in the order the services page lists them. */
export const capabilityAreas = [
  "Web & Digital Platforms",
  "Mobile Applications",
  "Business Systems",
  "Automation & Integrations",
  "Telecom Technology",
  "Cloud & Infrastructure",
] as const;

export type CapabilityArea = (typeof capabilityAreas)[number];

/** Same slugs as the homepage capability rows, so they land on the matching /services section. */
export const capabilitySlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");

export type Stage = { step: string; name: string; text: string };

export type Scenario = {
  id: string;
  /** Short title as used in the challenge index. */
  indexTitle: string;
  title: string;
  subtitle: string;
  who: string;
  today: string;
  challenges: string[];
  areas: CapabilityArea[];
  scopeNote: string;
  approach: string;
  stages: Stage[];
  changeTitle: string;
  change: string;
  outcomes: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "building-new-digital-product",
    indexTitle: "Building a New Digital Product",
    title: "Building a New Digital Product",
    subtitle: "Turning Product Ideas into Working Software",
    who: "Founders, businesses, and organizations planning a new commercial, web, or mobile platform.",
    today:
      "You have a clear concept, market opportunity, or operational vision, but need a technical team to define the technical requirements, design user flows, and build the software from concept to launch.",
    challenges: [
      "Translating high-level ideas into clear technical specifications",
      "Selecting an appropriate technology stack and database structure",
      "Balancing the need for a practical launch with maintainable code quality",
      "Needing technical expertise without building an in-house engineering team",
    ],
    areas: ["Web & Digital Platforms", "Mobile Applications", "Cloud & Infrastructure", "Automation & Integrations"],
    scopeNote:
      "NoxeTech focuses on software design, architecture, and engineering. Business strategy, market validation, and user acquisition remain the domain of the client.",
    approach:
      "We work consultatively to scope requirements, design user interfaces, develop front-end and backend systems, and deploy to your chosen cloud environment.",
    stages: [
      { step: "1. Scoping", name: "Requirements Definition", text: "Clarifying core user journeys, functional requirements, and system boundaries." },
      { step: "2. Interface Design", name: "UX & Layout Planning", text: "Designing responsive, accessible user interfaces tailored to your audience." },
      { step: "3. Development", name: "Full-Stack Implementation", text: "Building front-end interfaces, backend services, and database structures." },
      { step: "4. Deployment", name: "Launch Preparation", text: "Setting up the hosting environment, testing functionality, and preparing for release." },
    ],
    changeTitle: "What custom software can change",
    change:
      "A custom product gives you a dedicated platform built specifically for your audience and business model, with full control over feature development, user experience, and ongoing updates.",
    outcomes: [
      "A functional, tailored product ready for real users and customers",
      "User interfaces designed specifically around your target workflows",
      "Structured database and backend architecture ready for future enhancements",
      "Direct control over your technical roadmap without platform constraints",
    ],
  },
  {
    id: "replacing-manual-processes",
    indexTitle: "Replacing Manual Processes",
    title: "Replacing Manual Processes",
    subtitle: "Replacing Spreadsheets, Paperwork & Repetitive Manual Steps",
    who: "Operations teams, administrative departments, and businesses struggling with manual workflows.",
    today:
      "Core organizational activities are managed across multiple spreadsheets, email threads, physical papers, or disparate files. This creates friction, duplicate data entry, and delays in obtaining up-to-date information.",
    challenges: [
      "Critical business information fragmented across personal spreadsheets",
      "Time spent on repetitive manual copy-pasting and file sharing",
      "Risk of data inconsistencies, version conflicts, or missing records",
      "Difficulty generating accurate operational summaries or tracking approvals",
    ],
    areas: ["Business Systems", "Web & Digital Platforms", "Automation & Integrations"],
    scopeNote: "Custom software directly supports your organization’s approved operational rules and workflows.",
    approach:
      "We map your current manual process, identify bottlenecks, and build an intuitive system tailored to your team’s daily operational needs.",
    stages: [
      { step: "1. Workflow Analysis", name: "Process Mapping", text: "Documenting current manual steps, inputs, reviews, and reporting needs." },
      { step: "2. Data Structuring", name: "Database Design", text: "Organizing data into structured models that reflect your real-world entities." },
      { step: "3. System Build", name: "Custom Interface Development", text: "Creating clear web forms, status dashboards, and automated validation rules." },
      { step: "4. Delivery", name: "Setup & Handover", text: "Configuring access permissions, reviewing with your team, and launching the system." },
    ],
    changeTitle: "What custom software can change",
    change:
      "Centralizing your operations in custom software can streamline data entry, provide structured approval stages, and give your team a single source of truth.",
    outcomes: [
      "A central system that replaces scattered files with structured data",
      "Form validations that help reduce data entry errors and omissions",
      "Clear visibility into task statuses, requests, and operational progress",
      "Reduced administrative overhead from manual coordination and tracking",
    ],
  },
  {
    id: "modernizing-existing-software",
    indexTitle: "Modernizing Existing Software",
    title: "Modernizing Existing Software",
    subtitle: "Evaluating, Updating & Extending Legacy Applications",
    who: "Organizations with existing software that is difficult to maintain, outdated, or struggling with new requirements.",
    today:
      "An existing software system that served your organization in the past may now have an outdated interface, run on older technologies, lack mobile compatibility, or be difficult to modify with new features.",
    challenges: [
      "User interface that feels dated or difficult for staff to navigate",
      "Difficulty making updates or adding new capabilities without breaking existing logic",
      "Performance issues or slower response times as data has grown",
      "Challenges connecting the legacy system with modern third-party tools",
    ],
    areas: ["Web & Digital Platforms", "Business Systems", "Cloud & Infrastructure", "Automation & Integrations"],
    scopeNote:
      "We avoid prescribing unnecessary full rewrites when modular enhancements or API connections can solve the underlying problem effectively.",
    approach:
      "We first evaluate the existing software, database, and requirements before deciding whether to improve, extend, restructure, integrate, or rebuild.",
    stages: [
      { step: "1. Assessment", name: "System & Code Review", text: "Reviewing current architecture, data structures, pain points, and dependencies." },
      { step: "2. Strategy", name: "Pragmatic Plan", text: "Determining the most suitable approach: interface refresh, modular updates, API bridges, or a phased rebuild." },
      { step: "3. Implementation", name: "Targeted Engineering", text: "Developing updated components and services while safeguarding existing operations." },
      { step: "4. Verification", name: "Testing & Cutover", text: "Testing data integrity, validating functionality with users, and completing the transition." },
    ],
    changeTitle: "What modernization can change",
    change:
      "Modernizing an existing system can refresh the user experience, improve maintainability, and allow you to support new workflows while preserving your valuable historical data.",
    outcomes: [
      "Updated, responsive interfaces accessible on modern browsers and devices",
      "Cleaner, more maintainable code structure for future feature additions",
      "Improved system stability and easier integration with other tools",
      "Retained historical business data and verified core business logic",
    ],
  },
  {
    id: "connecting-disconnected-systems",
    indexTitle: "Connecting Disconnected Systems",
    title: "Connecting Disconnected Systems",
    subtitle: "Connecting Siloed Tools & Automating Data Flow",
    who: "Organizations running multiple software tools that do not communicate with each other.",
    today:
      "Your team uses different software tools for accounting, sales, inventory, operations, or customer management. Because these tools are disconnected, staff must manually export, reformat, and import files to keep information aligned.",
    challenges: [
      "Customer and transaction data out of sync across different applications",
      "Time spent on regular CSV exports, manual transformations, and imports",
      "Delayed operational reporting due to asynchronous data updates",
      "Potential for human error during manual data re-entry between tools",
    ],
    areas: ["Automation & Integrations", "Business Systems", "Cloud & Infrastructure"],
    scopeNote:
      "Integration capabilities depend on the API support, data formats, and access permissions provided by the third-party platforms.",
    approach:
      "We examine the APIs and capabilities of each system, design integration logic, and build secure connectors with error handling.",
    stages: [
      { step: "1. Discovery", name: "Interface Mapping", text: "Analyzing endpoints, data models, authentication methods, and update frequency." },
      { step: "2. Design", name: "Data Flow Planning", text: "Defining how records should be mapped, transformed, and validated between systems." },
      { step: "3. Integration Build", name: "Connector Development", text: "Building custom integration services with retry logic and error logging." },
      { step: "4. Testing & Launch", name: "Validation & Monitoring", text: "Testing sync accuracy, verifying edge cases, and setting up ongoing monitoring." },
    ],
    changeTitle: "What custom integrations can change",
    change:
      "Building reliable integrations and automated data pipelines allows information to flow between your tools automatically, keeping records consistent and saving administrative time.",
    outcomes: [
      "Automated data exchange between core software platforms",
      "Less time spent on manual file transfers and re-keying data",
      "More consistent and timely records across all connected systems",
      "Error logging to highlight and handle synchronization issues",
    ],
  },
  {
    id: "internal-operations-software",
    indexTitle: "Building Internal Operations Software",
    title: "Building Internal Operations Software",
    subtitle: "Custom Tools for Internal Workflows & Team Operations",
    who: "Enterprises, NGOs, institutions, and operational departments needing software tailored to internal processes.",
    today:
      "Off-the-shelf software either doesn’t support your specific workflow requirements, requires awkward workarounds, or includes unnecessary complexity that makes everyday tasks harder for staff.",
    challenges: [
      "Commercial software that does not fit your operational hierarchy or approval stages",
      "Staff relying on side spreadsheets because the main software lacks needed fields",
      "Need for specific access permissions to protect sensitive internal or beneficiary data",
      "Difficulty generating required reporting formats for leadership or external audits",
    ],
    areas: ["Business Systems", "Web & Digital Platforms", "Automation & Integrations", "Cloud & Infrastructure"],
    scopeNote:
      "We focus on building software that supports your operational processes; internal organizational policies remain with client leadership.",
    approach:
      "We collaborate with your operational leaders to specify roles, design clear staff dashboards, and engineer a maintainable system.",
    stages: [
      { step: "1. Discovery", name: "Workflow Specification", text: "Defining user roles, team responsibilities, data fields, and review steps." },
      { step: "2. Logic Design", name: "Business Rules", text: "Coding specific approval sequences, validation checks, and record lifecycles." },
      { step: "3. Interface Build", name: "Staff Dashboard Development", text: "Building fast, intuitive interfaces optimized for daily operational tasks." },
      { step: "4. Rollout", name: "Deployment & Training", text: "Deploying the system with appropriate access controls and guidance documentation." },
    ],
    changeTitle: "What a purpose-built system can change",
    change:
      "A custom internal tool is designed specifically around how your team functions, providing only the features you need in a clear, focused interface.",
    outcomes: [
      "Software that directly reflects your internal team workflows and terms",
      "Cleaner, faster interfaces designed for daily operational productivity",
      "Appropriate permission levels tailored to your organizational structure",
      "Custom reporting and export formats that match your reporting requirements",
    ],
  },
  {
    id: "specialized-industry-systems",
    indexTitle: "Creating Specialized Systems",
    title: "Creating Specialized Systems",
    subtitle: "Custom Engineering for Unique, Non-Standard Requirements",
    who: "Organizations with specialized workflows, unique domain rules, telecommunications needs, or non-standard technical requirements.",
    today:
      "Your project involves specialized communication protocols, unique operational workflows, custom hardware interfaces, or specific domain rules that standard software packages cannot support.",
    challenges: [
      "Standard off-the-shelf software unable to accommodate unique industry processes",
      "Need for specialized communication or messaging protocol support",
      "Custom business rules, tariff models, or calculation logic",
      "Specific data hosting, security, or deployment constraints",
    ],
    areas: ["Telecom Technology", "Business Systems", "Automation & Integrations", "Cloud & Infrastructure"],
    scopeNote:
      "We engineer the custom software, logic, and interfaces. Any external third-party accounts, carrier contracts, or specialized hardware are coordinated with the client.",
    approach:
      "We apply software engineering discipline to analyze the technical requirements, design custom logic and data handling, and build a dependable system.",
    stages: [
      { step: "1. Deep Scoping", name: "Technical Analysis", text: "Reviewing protocol specifications, calculation rules, and data structures." },
      { step: "2. Architecture", name: "System Design", text: "Designing data processing pipelines, custom business logic, and state models." },
      { step: "3. Engineering", name: "Custom Software Build", text: "Developing custom software modules with careful error handling and testing." },
      { step: "4. Verification", name: "Testing & Handover", text: "Verifying system behavior against requirements and preparing deployment documentation." },
    ],
    changeTitle: "What specialized engineering can change",
    change:
      "Custom engineering delivers a solution built specifically for your technical and operational constraints, without forcing compromises on your process.",
    outcomes: [
      "A system engineered directly around your specialized technical requirements",
      "Reliable software architecture designed for your expected workflows",
      "Clear documentation and operational visibility into system behavior",
      "Configured hosting and environment setup matched to your specifications",
    ],
  },
];

/** The solutions matrix rows. */
export const matrix = [
  {
    scenario: "New Digital Product",
    challenge: "Product concept exists but requires software architecture and development",
    helps: "Full-stack software design, development, and cloud deployment",
    benefit: "A custom platform built around your specific product vision",
  },
  {
    scenario: "Replacing Manual Processes",
    challenge: "Workflows trapped in scattered spreadsheets and repetitive manual steps",
    helps: "Centralized database with tailored web interfaces and validation rules",
    benefit: "Centralized records with less manual data re-entry",
  },
  {
    scenario: "Modernizing Existing Software",
    challenge: "Legacy system is hard to update, outdated, or lacks modern interfaces",
    helps: "System assessment followed by targeted refactoring, UI updates, or rebuild",
    benefit: "Updated usability and maintainability while preserving business data",
  },
  {
    scenario: "Connecting Disconnected Systems",
    challenge: "Siloed tools requiring manual daily CSV exports and duplicate entry",
    helps: "Custom integration services and automated data synchronization",
    benefit: "Automatic data flow and consistent records across tools",
  },
  {
    scenario: "Internal Operations Software",
    challenge: "Off-the-shelf software is rigid, overly complex, or lacks needed workflows",
    helps: "Purpose-built management tools designed around your team’s real workflows",
    benefit: "Software that matches your exact organizational processes",
  },
  {
    scenario: "Specialized Systems",
    challenge: "Unique domain logic, specialized protocols, or non-standard requirements",
    helps: "Bespoke software architecture, custom business logic, and integrations",
    benefit: "A purpose-engineered system built for your specific requirements",
  },
];

export const commonProblems = [
  "New Digital Products",
  "Replacing Manual Processes",
  "Modernizing Existing Software",
  "Connecting Disconnected Systems",
  "Internal Operations Tools",
  "Specialized Project Requirements",
];
