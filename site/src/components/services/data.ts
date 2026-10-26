// Original site copy for /services, verbatim (content/original-content.md, "## /services").

export type Area = { name: string; text: string; spec: string };

export type Capability = {
  id: string;
  name: string;
  /** Which tier of the capability matrix the family sits in (0 presentation, 1 core, 2 protocols). */
  tier: 0 | 1 | 2;
  subtitle: string;
  summary: string;
  body: string;
  areas: Area[];
  examples: string[];
  situations: string[];
  deliverables: string[];
  note: string;
};

export const tiers = [
  {
    code: "01 // PRESENTATION & CLIENT TIERS",
    title: "Web Platforms & Mobile Products",
    spec: "WCAG AA / Responsive",
    link: "↓ API CONTRACTS & REAL-TIME STREAMS ↓",
  },
  {
    code: "02 // CORE BUSINESS & DOMAIN LOGIC",
    title: "Business Systems & Workflow Engines",
    spec: "State Machines / RBAC",
    link: "↓ INTEGRATION PIPELINES & PROTOCOLS ↓",
  },
  {
    code: "03 // PROTOCOLS, MESSAGING & RUNTIMES",
    title: "Automation, Telecom & Cloud Infra",
    spec: "Containers / Queues / APIs",
    link: "",
  },
] as const;

export const capabilities: Capability[] = [
  {
    id: "web-digital-platforms",
    name: "Web & Digital Platforms",
    tier: 0,
    subtitle: "Custom Web Applications, Portals & Digital Systems",
    summary:
      "Designing and developing custom web applications, portals, and platforms tailored to specific operational needs and user workflows.",
    body: "We build custom web platforms ranging from corporate digital presences and client account portals to interactive operational dashboards and online business applications. Each system is designed for clear usability, responsive performance, and secure data handling.",
    areas: [
      {
        name: "User-Centered Interface Design",
        text: "Clear, accessible, and responsive layouts designed for intuitive navigation across desktop and mobile browsers.",
        spec: "Standards-based responsive design and accessible structure (WCAG AA).",
      },
      {
        name: "Application Logic & APIs",
        text: "Structured backend services and data interfaces to handle business rules, transactions, and user interactions.",
        spec: "RESTful endpoints, secure session handling, and structured data validation.",
      },
      {
        name: "User Access & Account Management",
        text: "Authentication, account permissions, and role management tailored to your organizational structure.",
        spec: "Configurable role permissions and session controls.",
      },
      {
        name: "Administrative Control Panels",
        text: "Dedicated back-office interfaces for staff to manage content, review submissions, and monitor activity.",
        spec: "Administrative dashboards with search, filtering, and data management.",
      },
    ],
    examples: [
      "Web applications and interactive tools",
      "Corporate platforms and digital presence",
      "Customer portals and account management hubs",
      "Operational dashboards and reporting panels",
      "Online services and subscription products",
      "E-commerce and transactional catalog systems",
      "Booking, reservation, and scheduling systems",
      "Specialized web-based workflow interfaces",
    ],
    situations: [
      "Launching a new web product or digital service",
      "Creating a self-service portal for clients or partners",
      "Consolidating disparate web tools into a unified platform",
    ],
    deliverables: [
      "Custom web application codebase",
      "Responsive user interface components",
      "Database structure and backend services",
      "Deployment setup and configuration documentation",
    ],
    note: "Specific features such as payment processing, multi-tier user permissions, or reporting tools are determined by project requirements.",
  },
  {
    id: "mobile-applications",
    name: "Mobile Applications",
    tier: 0,
    subtitle: "Custom Mobile Applications for iOS & Android",
    summary:
      "Developing custom mobile applications designed around user workflows, operational mobility, and field requirements.",
    body: "We build mobile applications that extend your systems into the field or provide convenient mobile experiences for your customers. Our mobile solutions connect with central backends to keep data consistent across devices.",
    areas: [
      {
        name: "Mobile User Experience",
        text: "Intuitive, touch-friendly interfaces designed for quick task completion on iOS and Android devices.",
        spec: "Ergonomic mobile flows tailored for phone and tablet screen sizes.",
      },
      {
        name: "Centralized Backend Connectivity",
        text: "Secure connections with backend databases, APIs, and business systems for consistent data updates.",
        spec: "Token authentication and data exchange with backend services.",
      },
      {
        name: "Field & Device Capabilities",
        text: "Support for camera input, barcode scanning, location services, or local data caching where required.",
        spec: "Configured according to specific device hardware requirements.",
      },
      {
        name: "Operational Workflow Tools",
        text: "Streamlined forms and task tracking that enable staff to complete work on-site or on the move.",
        spec: "Structured data entry forms and status tracking.",
      },
    ],
    examples: [
      "Customer-facing mobile service applications",
      "Internal staff and team management tools",
      "Field service, inspection, and data collection apps",
      "Mobile extensions for existing web platforms",
      "On-demand booking, tracking, and service apps",
      "Inventory, asset, and barcode scanning tools",
      "Operational communication and dispatch utilities",
      "Specialized mobile workflow assistants",
    ],
    situations: [
      "Providing customers with a dedicated mobile application for services",
      "Equipping field teams with mobile data collection and inspection tools",
      "Extending an existing business system to mobile devices",
    ],
    deliverables: [
      "Mobile application builds for target platforms",
      "Integration endpoints connecting to backend services",
      "Store preparation assets and technical documentation",
    ],
    note: "Decisions regarding native vs. cross-platform frameworks, offline support, or hardware features depend on your specific operational requirements.",
  },
  {
    id: "business-systems",
    name: "Business Systems",
    tier: 1,
    subtitle: "Tailored Management Software & Operational Tools",
    summary:
      "Engineering custom business systems, administrative platforms, and management software tailored to organizational workflows.",
    body: "When off-the-shelf software is too rigid or complex, we design and build custom business software that reflects how your team actually works—supporting resource tracking, approval flows, administrative records, and operations.",
    areas: [
      {
        name: "Tailored Workflow Routing",
        text: "Custom approval paths, stage transitions, and notification rules aligned with your operating procedures.",
        spec: "Configurable business logic and workflow states.",
      },
      {
        name: "Structured Business Data Models",
        text: "Organized data architecture designed to accurately capture your business entities, records, and relationships.",
        spec: "Relational database schemas designed for data integrity.",
      },
      {
        name: "Permissions & Organizational Roles",
        text: "Access controls that ensure team members only view and edit the information relevant to their roles.",
        spec: "Role-based access controls and action tracking.",
      },
      {
        name: "Operational Summaries & Exports",
        text: "Tabular views, summary dashboards, and data export tools to support operational oversight and review.",
        spec: "Searchable data tables, CSV/PDF generation, and filterable views.",
      },
    ],
    examples: [
      "Custom ERP and resource management systems",
      "Bespoke CRM and relationship management tools",
      "Internal administrative, billing, and accounting systems",
      "Beneficiary, grant, and NGO program management platforms",
      "Inventory, order, and supply tracking tools",
      "Approval routing and document management systems",
      "Staff, team, and operational tracking portals",
      "Custom reporting and administrative record engines",
    ],
    situations: [
      "Replacing complex manual spreadsheets with a unified management platform",
      "Building an administrative portal matching unique institutional processes",
      "Managing programs, grants, or beneficiaries with specific tracking needs",
    ],
    deliverables: [
      "Custom business management software",
      "Database schema and data setup scripts",
      "User permission structure and documentation",
      "System administration guidelines",
    ],
    note: "Every business system is tailored to your organization’s defined processes, avoiding unnecessary complexity and unused features.",
  },
  {
    id: "automation-integrations",
    name: "Automation & Integrations",
    tier: 2,
    subtitle: "System Connectivity, Data Flow & Workflow Automation",
    summary:
      "Connecting existing software tools, synchronizing operational data, and automating repetitive business tasks.",
    body: "We help organizations connect disconnected software systems, automate recurring data transfers, and build reliable integrations that reduce manual data entry across different platforms.",
    areas: [
      {
        name: "Third-Party Service Connections",
        text: "Reliable connections to external services, platforms, and payment providers using standard API interfaces.",
        spec: "Defensive API handling, retry logic, and error management.",
      },
      {
        name: "Automated Information Flow",
        text: "Event-triggered actions and data updates that keep multiple tools in sync without manual intervention.",
        spec: "Webhook listeners and event processing pipelines.",
      },
      {
        name: "Data Mapping & Transformation",
        text: "Converting and formatting data between systems to ensure records remain accurate across platforms.",
        spec: "Data transformation and schema alignment.",
      },
      {
        name: "Scheduled Tasks & Monitoring",
        text: "Automated background jobs and logging to ensure recurring processes run reliably.",
        spec: "Background worker queues and execution logging.",
      },
    ],
    examples: [
      "API integrations between existing software tools",
      "Automated data transfer and synchronization",
      "Payment gateway and billing service connections",
      "CRM, ERP, and customer tool synchronization",
      "Webhook handling and event-driven notifications",
      "Database connectors and data bridges",
      "Automated email, SMS, and alert dispatchers",
      "Scheduled background data processing routines",
    ],
    situations: [
      "Connecting an online store with an internal inventory or accounting system",
      "Automating customer onboarding across multiple software platforms",
      "Eliminating manual CSV exports and imports between departments",
    ],
    deliverables: [
      "Custom integration services and connection scripts",
      "Data mapping and processing logic",
      "Event triggers and webhook handlers",
      "Integration configuration and maintenance guide",
    ],
    note: "Integrations depend on the available APIs and capabilities of the third-party platforms being connected.",
  },
  {
    id: "telecom-technology",
    name: "Telecom Technology",
    tier: 2,
    subtitle: "Specialized Messaging Systems & Communications Software",
    summary:
      "Engineering messaging platforms, routing logic, gateway integrations, and specialized communications software.",
    body: "NoxeTech provides software engineering for telecommunications and messaging systems—building reliable software for message routing, gateway connections, traffic management, and communication workflows.",
    areas: [
      {
        name: "Communications Protocol Integration",
        text: "Integration with messaging protocols and standard web APIs for structured communication interchange.",
        spec: "Support for SMPP, HTTP REST, and messaging gateway interfaces.",
      },
      {
        name: "Routing & Rate Logic",
        text: "Custom rules for routing messages, calculating rates, and managing communication flows.",
        spec: "Configurable routing logic and tariff calculations.",
      },
      {
        name: "Queueing & Message Handling",
        text: "Buffer management and structured queueing to manage message delivery reliably.",
        spec: "Asynchronous queues and delivery status processing.",
      },
      {
        name: "Traffic & Balance Management",
        text: "Monitoring tools for tracking message volumes, account balances, and activity logs.",
        spec: "Usage tracking, threshold alerts, and reporting views.",
      },
    ],
    examples: [
      "SMS platform software architectures",
      "SMS gateway and messaging API integrations",
      "Message routing and rate calculation logic",
      "Multi-channel messaging and notification hubs",
      "Traffic monitoring and balance management tools",
      "Customer messaging portals and sub-account management",
      "Delivery report (DLR) tracking software",
      "Specialized telecommunications workflow tools",
    ],
    situations: [
      "Building an internal notification or messaging dispatch system",
      "Creating a messaging portal with sub-account management",
      "Integrating messaging protocols into an existing software system",
    ],
    deliverables: [
      "Custom messaging platform software",
      "Routing engine and account management modules",
      "Customer or administrator web interface",
      "Integration documentation and protocol setup details",
    ],
    note: "NoxeTech engineers the software, routing logic, and system architecture. Telecommunications routes, carrier relationships, and message termination are managed by the client or their designated providers.",
  },
  {
    id: "cloud-infrastructure",
    name: "Cloud & Infrastructure",
    tier: 2,
    subtitle: "Supporting Environments, Server Setup & Cloud Architecture",
    summary:
      "Designing and configuring reliable server, cloud, and deployment environments to support custom software applications.",
    body: "We configure and prepare the cloud and server environments required to run the custom software we build—ensuring appropriate security settings, maintainable configurations, and reliable deployment processes.",
    areas: [
      {
        name: "Application Environment Setup",
        text: "Configuring server runtimes, environment variables, and dependencies to host custom software reliably.",
        spec: "Container configurations and runtime environment management.",
      },
      {
        name: "Deployment Workflows",
        text: "Structured deployment processes that enable software updates to be tested and deployed with minimal disruption.",
        spec: "Version-controlled deployment scripts and automated build checks.",
      },
      {
        name: "Security & Access Configuration",
        text: "Standard security measures including SSL certificates, firewall rules, and restricted administrative access.",
        spec: "HTTPS enforcement, network isolation, and secure secret storage.",
      },
      {
        name: "System Health & Logging",
        text: "Basic logging and uptime monitoring to ensure visibility into application status and error events.",
        spec: "Application log aggregation and status monitoring endpoints.",
      },
    ],
    examples: [
      "Application deployment environment setup",
      "Cloud platform configuration (e.g., Google Cloud, AWS, DigitalOcean)",
      "Automated build and deployment setup (CI/CD)",
      "Database configuration, maintenance, and backup planning",
      "Domain, SSL/TLS, and web server configuration",
      "Application logging and health check setup",
      "Staging and production environment separation",
      "Cloud storage and file management setup",
    ],
    situations: [
      "Setting up a secure cloud environment for a newly built web application",
      "Establishing separate staging and production environments for ongoing development",
      "Configuring automated backups and monitoring for an existing system",
    ],
    deliverables: [
      "Environment configuration and setup scripts",
      "Deployment process documentation",
      "Server configuration guidelines",
      "Backup and maintenance reference documentation",
    ],
    note: "We design and configure the infrastructure architecture needed to support software applications; we do not resell generic shared web hosting services.",
  },
];

/** The reference project: which capability (by id) each of its five parts draws on. */
export const reference = [
  {
    cap: "web-digital-platforms",
    name: "Management & Client Portals",
    text: "Web interfaces for customers and internal staff to manage accounts, view status, and access documents.",
    spec: "Responsive web application with role-based navigation.",
  },
  {
    cap: "business-systems",
    name: "Operations & Workflow Rules",
    text: "Central system logic managing approvals, team tasks, status updates, and audit records.",
    spec: "Structured database model and business rules.",
  },
  {
    cap: "mobile-applications",
    name: "Field & Mobile Tools",
    text: "Mobile tools allowing field personnel or remote staff to update records and complete tasks on the move.",
    spec: "Mobile application connecting to central APIs.",
  },
  {
    cap: "automation-integrations",
    name: "External System Connections",
    text: "Automated data exchanges with third-party tools, payment services, or existing software.",
    spec: "API connections and webhook handlers.",
  },
  {
    cap: "cloud-infrastructure",
    name: "Cloud Environment & Hosting",
    text: "Secure cloud hosting setup with backup routines and monitoring to keep the platform running.",
    spec: "Configured cloud runtime with automated backups.",
  },
];

export const num = (i: number) => String(i + 1).padStart(2, "0");
export const capIndex = (id: string) => capabilities.findIndex((c) => c.id === id);
