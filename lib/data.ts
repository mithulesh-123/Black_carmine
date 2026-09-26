export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  visual: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  year: string;
  nature: string;
  scope: string[];
  stack: string[];
  summary: string;
  story: {
    lead: string;
    paragraphs: string[];
  };
  approach: string[];
  visual: string;
  accent: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  artifacts: string[];
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
] as const;

export const CAPABILITIES = [
  "Web Development",
  "Mobile Apps",
  "SaaS Platforms",
  "UI / UX Design",
  "Brand Systems",
  "E-commerce",
  "AI Solutions",
  "Automation",
  "Digital Products",
  "Design Systems",
  "Motion & Interaction",
  "Headless CMS",
];

export const SERVICES: Service[] = [
  {
    id: "web",
    index: "01",
    title: "Web Development",
    tagline: "Performance as a design material",
    description:
      "We build fast, resilient web platforms — from editorial marketing sites to complex headless commerce and multi-tenant SaaS front-ends. Accessibility, Core Web Vitals and type-safety are part of the craft, not an afterthought.",
    capabilities: [
      "Next.js / React",
      "Headless architecture",
      "Edge & streaming SSR",
      "Design-system engineering",
      "Performance budgets",
    ],
    visual: "grid",
  },
  {
    id: "mobile",
    index: "02",
    title: "Mobile App Development",
    tagline: "Native feel, one codebase",
    description:
      "Product-grade mobile apps for iOS and Android with offline-first data, smooth 60fps interactions and a release pipeline you control. We design and ship in tight loops, so the app in the store is the app you signed off on.",
    capabilities: [
      "React Native / Expo",
      "Offline-first sync",
      "Push & background tasks",
      "Store submission",
      "Crash & performance monitoring",
    ],
    visual: "orbit",
  },
  {
    id: "saas",
    index: "03",
    title: "SaaS Platforms",
    tagline: "Multi-tenant systems, built to scale",
    description:
      "Billing, roles, onboarding, dashboards and admin tooling — the unglamorous machinery that makes a SaaS product trustworthy. We architect data models and permission systems that survive contact with real customers.",
    capabilities: [
      "Auth & multi-tenancy",
      "Billing & entitlements",
      "Realtime dashboards",
      "Admin tooling",
      "Usage & metering",
    ],
    visual: "matrix",
  },
  {
    id: "uiux",
    index: "04",
    title: "UI / UX Design",
    tagline: "Interfaces that feel inevitable",
    description:
      "Research, flows, prototypes and pixel-precise interface design. We prototype interactions at the fidelity they will ship at, so motion and micro-copy are tested before a single production line is written.",
    capabilities: [
      "Discovery & user flows",
      "Hi-fi prototyping",
      "Interaction design",
      "Usability testing",
      "Handoff & specs",
    ],
    visual: "flow",
  },
  {
    id: "branding",
    index: "05",
    title: "Branding & Identity",
    tagline: "Systems with a pulse",
    description:
      "Naming, marks, type, motion and the guidelines that keep a brand coherent across every surface. We deliver identities as living tokens — not a PDF — so engineering and marketing stay in sync.",
    capabilities: [
      "Positioning & naming",
      "Logo & monogram",
      "Type & colour systems",
      "Motion identity",
      "Brand guidelines",
    ],
    visual: "mark",
  },
  {
    id: "commerce",
    index: "06",
    title: "E-commerce",
    tagline: "Commerce that converts quietly",
    description:
      "Headless storefronts with sub-second navigation, flexible merchandising and checkout flows that remove friction instead of adding it. Integrations with inventory, PIM and ERP systems included.",
    capabilities: [
      "Headless storefronts",
      "Checkout optimisation",
      "PIM / ERP integration",
      "Subscriptions",
      "A/B-ready architecture",
    ],
    visual: "weave",
  },
  {
    id: "ai",
    index: "07",
    title: "AI Solutions",
    tagline: "Intelligence, applied where it counts",
    description:
      "Retrieval pipelines, agent workflows, copilots and moderation layers — grounded in your data with evaluation harnesses that keep quality measurable. We ship AI features that are auditable, not magical.",
    capabilities: [
      "RAG pipelines",
      "Agent workflows",
      "Evaluation harnesses",
      "Guardrails & moderation",
      "Vector & hybrid search",
    ],
    visual: "neural",
  },
  {
    id: "automation",
    index: "08",
    title: "Automation",
    tagline: "Remove the work, keep the control",
    description:
      "Internal tooling, CI/CD, content pipelines and ops automation with humans in the loop where judgement matters. Every automation ships with observability and a kill switch.",
    capabilities: [
      "Workflow orchestration",
      "CI/CD & preview pipelines",
      "Content & CMS automation",
      "Observability & alerting",
      "Human-in-the-loop review",
    ],
    visual: "pulse",
  },
  {
    id: "products",
    index: "09",
    title: "Custom Digital Products",
    tagline: "When no off-the-shelf tool fits",
    description:
      "Genuine bespoke builds: interactive configurators, WebGL experiences, internal platforms and data products. We scope honestly, build in vertical slices, and put working software in front of users every week.",
    capabilities: [
      "WebGL & 3D web",
      "Interactive configurators",
      "Internal platforms",
      "Data visualisation",
      "Vertical-slice delivery",
    ],
    visual: "prism",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "nocturne",
    index: "01",
    name: "Nocturne",
    category: "Immersive Brand Platform",
    year: "2026",
    nature: "Internal R&D",
    scope: ["Art direction", "WebGL", "Front-end", "Motion system"],
    stack: ["Next.js", "TypeScript", "GSAP", "Three.js"],
    summary:
      "A cinematic brand platform prototype exploring how far a page can feel like a film without losing sub-second navigation.",
    story: {
      lead: "Most brand sites make you wait. Nocturne asked the opposite question: can a page feel cinematic and still be gone before you notice it loading?",
      paragraphs: [
        "We built the entire experience around a single continuous camera move, then broke it into chapters that stream in as the scroll progresses. Everything above the fold renders in one frame group; the rest defers until the scroll position demands it.",
        "The type system is the interface. Headlines compress and stretch with scroll velocity, and the soundscape reacts to chapter changes. Motion is the navigation — there are no buttons until you stop moving.",
        "The hardest part was restraint. Every shader we added pushed frame time up, so we budgeted milliseconds instead of features and cut everything that did not serve the cut.",
      ],
    },
    approach: [
      "Milliseconds as the design budget",
      "Streaming chapters instead of one long load",
      "Scroll-velocity-driven type scaling",
    ],
    visual: "nocturne",
    accent: "#e8214b",
  },
  {
    slug: "carmine-commerce",
    index: "02",
    name: "Carmine Commerce",
    category: "Headless Storefront Framework",
    year: "2025",
    nature: "Internal R&D",
    scope: ["Architecture", "Front-end", "Design system", "Performance"],
    stack: ["Next.js", "GraphQL", "TypeScript", "Tailwind"],
    summary:
      "A headless storefront kit tuned for sub-second category navigation and merchandising without engineering tickets.",
    story: {
      lead: "Storefronts die in the gap between a merchandiser's idea and an engineer's deploy. Carmine Commerce closes that gap.",
      paragraphs: [
        "We modelled content, catalogue and commerce as three separate graphs so merchandisers can rework a landing page without touching the product pipeline. Layouts are defined as schema, not code.",
        "Navigation uses speculative prefetching on pointer-hover and viewport intersection, so category pages often appear before the click resolves. Cache invalidation is scoped to the exact route subtree that changed.",
        "Checkout stayed deliberately boring. Every novelty we removed from the flow measurably improved completion, so the interesting work went into everything around it instead.",
      ],
    },
    approach: [
      "Content, catalogue and commerce as separate graphs",
      "Speculative prefetch on hover and intersection",
      "Layouts as schema, not code",
    ],
    visual: "commerce",
    accent: "#ff5c7a",
  },
  {
    slug: "atlas-studio",
    index: "03",
    name: "Atlas Studio",
    category: "Design-System Engine",
    year: "2025",
    nature: "Internal R&D",
    scope: ["Design system", "Tooling", "Documentation"],
    stack: ["React", "TypeScript", "Turborepo", "Storybook"],
    summary:
      "A token pipeline that compiles one source of truth into Figma variables, CSS, native code and docs in a single build.",
    story: {
      lead: "Design systems fracture the moment a second platform appears. Atlas Studio keeps one source of truth and compiles it into every target a team actually ships.",
      paragraphs: [
        "Tokens are authored as typed data with a schema validator. A single build emits Figma variables, CSS custom properties, iOS and Android constants, and a versioned docs site with live playgrounds.",
        "Breaking changes are detected at the semantic layer, so a colour rename produces a migration note automatically instead of a silent regression in production.",
        "We treated documentation as a product surface with its own analytics. The sections teams stopped reading were the sections nobody understood — those became the first things we rewrote.",
      ],
    },
    approach: [
      "Typed tokens as the single source of truth",
      "One build, every platform target",
      "Semantic diffing for breaking changes",
    ],
    visual: "atlas",
    accent: "#8e0028",
  },
  {
    slug: "pulse-os",
    index: "04",
    name: "Pulse OS",
    category: "Operator Dashboard & Automation",
    year: "2024",
    nature: "Concept",
    scope: ["Product design", "Realtime front-end", "Automation"],
    stack: ["React", "WebSockets", "Node", "Postgres"],
    summary:
      "A control-room concept for ops teams where every alert is one gesture away from the runbook that resolves it.",
    story: {
      lead: "Operators do not need more dashboards. They need the alert, the context and the fix in the same square of glass.",
      paragraphs: [
        "Pulse OS collapses monitoring, runbooks and approvals into one realtime surface. Selecting an incident unfolds its timeline, related deploys, on-call context and the automation that can remediate it.",
        "Every automation declares its blast radius before it runs. Approvals are inline, reversible and logged to the same stream that triggered them, so the audit trail writes itself.",
        "We resisted every chart that did not change a decision. The interface is dense, but every pixel on screen is tied to an action a human can take.",
      ],
    },
    approach: [
      "Alert, context and remediation in one surface",
      "Declared blast radius before any automation runs",
      "No chart without a decision attached",
    ],
    visual: "pulse",
    accent: "#e8214b",
  },
  {
    slug: "vessel",
    index: "05",
    name: "Vessel",
    category: "AI Knowledge Interface",
    year: "2026",
    nature: "Internal R&D",
    scope: ["AI engineering", "Product design", "Front-end"],
    stack: ["Next.js", "Python", "pgvector", "OpenAI"],
    summary:
      "A grounded research interface where every generated answer links back to the paragraph it was drawn from.",
    story: {
      lead: "Answers without provenance are opinion with confidence. Vessel builds citations into the fabric of the interface.",
      paragraphs: [
        "Vessel indexes a knowledge base into hybrid vector and lexical indexes, then renders answers as composable blocks that each carry their source references. Clicking a claim scrolls to the exact passage.",
        "The evaluation harness is first-class: every prompt template has versioned test sets, and regressions block the deploy rather than surfacing later in support tickets.",
        "Guardrails run on both input and output, and every refusal is visible to the operator with the reason attached. Trust here is a UX surface, not a config flag.",
      ],
    },
    approach: [
      "Every claim carries its citation",
      "Versioned eval sets gate the deploy",
      "Refusals visible, explained, and overrideable",
    ],
    visual: "neural",
    accent: "#ff5c7a",
  },
  {
    slug: "meridian",
    index: "06",
    name: "Meridian",
    category: "Cross-Platform Mobile Product",
    year: "2024",
    nature: "Concept",
    scope: ["Product design", "Mobile engineering", "Offline sync"],
    stack: ["React Native", "Expo", "SQLite", "TypeScript"],
    summary:
      "A field-operations app concept that stays fully usable on a site with no signal and reconciles silently when coverage returns.",
    story: {
      lead: "Field crews do not care that the server is far away. Meridian makes the offline path the primary path, not the fallback.",
      paragraphs: [
        "Every mutation writes to a local queue with conflict-free merge semantics. The UI optimistically reflects the change, and a subtle indicator shows what is pending versus confirmed.",
        "Sync is a background citizen. It batch-writes on restored connectivity, respects battery state, and never blocks the foreground interaction the user actually came for.",
        "We designed the empty, error and mid-sync states first. On unreliable networks those are the states people live in, so they got the majority of the design effort.",
      ],
    },
    approach: [
      "Offline-first, online-second",
      "Conflict-free local queue",
      "Empty and error states designed first",
    ],
    visual: "orbit",
    accent: "#8e0028",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Immerse",
    description:
      "We map the problem before the solution. Stakeholder interviews, technical audit, competitive landscape and a written point of view on where the real leverage sits.",
    artifacts: ["Discovery report", "Technical audit", "Scope and hypotheses"],
  },
  {
    index: "02",
    title: "Architect",
    description:
      "Information architecture, data models and a spine of key screens. We choose the architecture that survives your real constraints — traffic, team, budget and legacy systems.",
    artifacts: ["IA & flows", "Data model", "Technical spike"],
  },
  {
    index: "03",
    title: "Craft",
    description:
      "Interface design and production engineering happen in the same room. Components are built to the design system, with motion and accessibility specified as acceptance criteria.",
    artifacts: ["Design system", "Component library", "Motion specs"],
  },
  {
    index: "04",
    title: "Build",
    description:
      "Vertical slices in weekly increments, deployed to a preview environment you control. Honest progress you can click, not a Gantt chart to trust.",
    artifacts: ["Weekly slices", "Preview deploys", "Quality gates"],
  },
  {
    index: "05",
    title: "Launch & Tune",
    description:
      "Release strategy, monitoring and a tuning window after launch. We instrument what matters, hand over documentation your team will actually read, and stay on call while it settles.",
    artifacts: ["Release plan", "Observability", "Handover & docs"],
  },
];

export const TECHNOLOGIES = [
  { name: "Next.js", group: "Web" },
  { name: "React", group: "Web" },
  { name: "TypeScript", group: "Web" },
  { name: "Tailwind CSS", group: "Web" },
  { name: "GSAP", group: "Motion" },
  { name: "Three.js / WebGL", group: "Motion" },
  { name: "React Native", group: "Mobile" },
  { name: "Expo", group: "Mobile" },
  { name: "Node.js", group: "Platform" },
  { name: "PostgreSQL", group: "Platform" },
  { name: "pgvector", group: "AI" },
  { name: "LangChain", group: "AI" },
  { name: "GraphQL", group: "Platform" },
  { name: "Turborepo", group: "Platform" },
  { name: "Figma", group: "Design" },
  { name: "Storybook", group: "Design" },
  { name: "Vercel", group: "Infra" },
  { name: "Docker", group: "Infra" },
];

export const SOCIALS = [
  { label: "X / Twitter", href: "https://x.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
];

export const STUDIO_FACTS = [
  { label: "Model", value: "Full-service, senior-only" },
  { label: "Engagements", value: "Retainer & project" },
  { label: "Delivery", value: "Weekly vertical slices" },
  { label: "Working hours", value: "CET / flexible overlap" },
];
