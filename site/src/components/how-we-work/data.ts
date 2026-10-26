// Original site copy for /how-we-work, verbatim.

export const stageNames = ["Discovery", "Architecture", "Engineering", "Verification", "Delivery"];

export const stages = [
  {
    title: "Discovery & Requirements",
    sub: "Establish operational context, objectives, and constraints",
    body: "We begin by understanding what your organization needs to accomplish, how users will interact with the system, and what technical or operational constraints exist.",
    output:
      "A structured project scope definition and shared technical understanding of what will be engineered.",
    activities: [
      "Analyze business objectives and core user personas",
      "Map existing manual workflows, spreadsheets, or legacy tools",
      "Identify required third-party integrations and data sources",
      "Document technical constraints, security needs, and regulatory factors",
      "Establish feature priorities and clear project boundaries",
    ],
  },
  {
    title: "Technical Architecture",
    sub: "Design system structures, data models, and component boundaries",
    body: "Before writing production code, we plan the software structure to ensure scalability, security, and maintainability. Technology decisions happen after requirements are understood.",
    output:
      "A technical blueprint establishing system architecture, data models, interface plans, and implementation milestones.",
    activities: [
      "Define relational and document data schemas",
      "Design REST / GraphQL API contracts and webhook flows",
      "Establish system component boundaries and module responsibilities",
      "Select appropriate framework, database, and infrastructure stack",
      "Plan user authentication, access control, and permission tiers",
    ],
  },
  {
    title: "Software Engineering",
    sub: "Build the platform incrementally with clean, modular code",
    body: "We engineer the system through structured development milestones, implementing frontend interfaces, backend services, business logic, and API integrations in disciplined stages.",
    output: "Functional, modular software components assembled into a cohesive, working application environment.",
    activities: [
      "Implement responsive, accessible user interfaces",
      "Develop robust backend services, APIs, and business logic",
      "Configure database migrations and data persistence layers",
      "Integrate third-party APIs, messaging services, and payment gateways",
      "Conduct regular internal code reviews and architectural checks",
    ],
  },
  {
    title: "System Verification",
    sub: "Systematically test functionality, data integrity, and responsiveness",
    body: "Verification is an integral phase of our engineering lifecycle. We test the system against the agreed requirements across multiple devices and operational conditions.",
    output: "A verified, stable release candidate ready for staging review and production deployment preparation.",
    activities: [
      "Verify business logic, calculations, and data workflows",
      "Test responsive layout and typography across mobile, tablet, and desktop",
      "Validate edge cases, error handling, and form validation flows",
      "Review authentication security, route guards, and role permissions",
      "Conduct integration checks with connected APIs and third-party services",
    ],
  },
  {
    title: "Delivery & Release Preparation",
    sub: "Prepare the system for production deployment and handover",
    body: "We prepare the completed software for its agreed delivery environment, whether that involves cloud deployment, server configuration, or team handover documentation.",
    output:
      "A deployed, production-ready system with operational documentation and structured handover to your team.",
    activities: [
      "Compile production-optimized builds and configure environment secrets",
      "Configure hosting infrastructure, DNS records, and SSL certificates",
      "Perform staging deployment and final validation walkthrough",
      "Provide operational documentation, API references, and architecture guides",
      "Execute staged production cutover and launch verification",
    ],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");
