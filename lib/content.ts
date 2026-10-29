/**
 * All marketing copy lives here so it can be edited (or later swapped for a CMS /
 * the AgentiqBD OS backend) without touching component code.
 */

export const site = {
  name: 'Agentiq BD',
  url: 'https://www.agentiqbd.com',
  email: 'sales@agentiqbd.com',
  location: 'Dhaka, Bangladesh',
  phone: '01304867542',
  address: 'Pragati Sarani, Merul Badda, Dhaka',
  tagline: 'Turn Complexity into Intelligence',
  description:
    'Agentiq BD is an AI engineering and software company in Dhaka, Bangladesh. We build intelligent software, automate business workflows and integrate AI into everyday operations — connected to the tools you already run.',
  /** International format, digits only (01304867542 → +880 1304 867542). */
  whatsapp: '8801304867542',
  /** TODO(owner): PLACEHOLDER — replace with the real Calendly / Cal.com / Google appointment link. Empty → "Book a discovery call" opens a pre-filled email. */
  bookingUrl: 'https://calendly.com/agentiqbd/discovery-call',
  /** TODO(owner): link for the "AI Business Audit" button (a booking page or form). Empty → opens a pre-filled email to `email`. */
  auditUrl: '',
  /** TODO(owner): PLACEHOLDER links ('#') — replace with the real profile URLs. */
  social: [
    { label: 'Facebook', kind: 'facebook', href: 'https://www.facebook.com/agentiqbd/' },
    { label: 'Instagram', kind: 'instagram', href: 'https://www.instagram.com/agentiqbd/' },
    { label: 'LinkedIn', kind: 'linkedin', href: 'https://www.linkedin.com/company/agentiq-bd/?contentTrackingId=n%2Bv6PPRXT4ehR8nyIB2Csg%3D%3D&viewName=premium-nav-upsell-text&upsellOrderOrigin=Tracking%3Av1%3Apremium_nav_upsell_text%3ANav%3AIn-Product' },
    { label: 'X', kind: 'x', href: 'https://twitter.com/agentiqbd' },
  ] as { label: string; kind: 'facebook' | 'instagram' | 'linkedin' | 'x'; href: string }[],
};

/** Order of the numbered sections. Feedback only counts once there is real feedback to show. */
const sectionOrder = [
  'who',
  'services',
  'work',
  'products',
  'core',
  'industries',
  'feedback',
  'why',
  'how',
  'faq',
  'contact',
];
export function sectionNo(id: (typeof sectionOrder)[number]) {
  const visible = sectionOrder.filter((s) => s !== 'feedback' || testimonials.length > 0);
  return String(visible.indexOf(id) + 1).padStart(2, '0');
}

/** Primary nav (Services and Solutions are mega menus, built from `services` and `solutions`). */
/** "Who we are" — answers the first question a new client has. Keep claims to what is true and countable. */
export const whoWeAre = {
  /** `**word**` marks the phrases that get highlighted. */
  lead:
    'Agentiq BD is an **AI engineering and software company** in Dhaka, Bangladesh. We build **intelligent software**, automate business workflows and integrate AI into everyday operations.',
  body:
    'Based in Dhaka, Bangladesh, with **global delivery**. We work with business owners, operations leads and technical teams at manufacturers, growing SMEs and service businesses, with founder-led, hands-on technical delivery.',
  /** Who we serve — drives the graphic beside the text. */
  sectors: [
    { id: 'manufacturers', title: 'Manufacturers', text: 'Production, procurement and inventory under control.', tags: ['ERP', 'Industrial AI', 'Reporting'] },
    { id: 'smes', title: 'Growing SMEs', text: 'Leads, follow-ups and reporting on autopilot.', tags: ['Lead management', 'Automation', 'Custom software'] },
    { id: 'services', title: 'Service businesses', text: 'Bookings, enquiries and customer follow-up handled.', tags: ['Appointments', 'AI agents', 'CRM'] },
  ],
  delivery: 'Founder-led, hands-on technical delivery',
};

export const navLinks = [
  { label: 'Our Work', href: '/#work' },
  { label: 'Products', href: '/#products' },
  { label: 'About', href: '/#why' },
  { label: 'Contact', href: '/#contact' },
];

export const solutions = [
  { label: 'AgentiCore', text: 'Connected operations on one platform', href: '/agenticore' },
  { label: 'AI Employees', text: 'Support, lead and booking agents', href: '/ai-employees' },
  { label: 'Workflow demonstrations', text: 'Before-and-after process examples', href: '/workflows' },
  { label: 'Industries', text: 'Where we work and where we’re focused', href: '/#industries' },
];

/**
 * Technology & integrations strip. `brand` = key into the logo map in components/sections/works-with.tsx
 * (real logos in their real colours); `icon` = generic icon for categories that have no single brand.
 * TODO(owner): keep only the technologies you genuinely build with — these are examples.
 */
export const worksWith = {
  title: 'Built to connect with the systems you use.',
  description:
    'The channels, platforms, APIs and data sources we build against. Integrations are scoped per project — we’ll tell you what’s straightforward and what needs custom work.',
  rows: [
    {
      label: 'Channels',
      items: [
        { name: 'Website', note: 'Chat & forms', icon: 'globe' },
        { name: 'WhatsApp', note: 'Customer conversations', brand: 'whatsapp' },
        { name: 'Messenger', note: 'Social inbox', brand: 'messenger' },
        { name: 'Email', note: 'Inbound & replies', brand: 'gmail' },
        { name: 'Telegram', note: 'Bots & alerts', brand: 'telegram' },
        { name: 'Calendars', note: 'Bookings & reminders', brand: 'googlecalendar' },
        { name: 'Voice', note: 'Calls & callbacks', icon: 'voice' },
        { name: 'Android SMS', note: 'SMS gateway', brand: 'android' },
      ],
    },
    {
      label: 'Business systems',
      items: [
        { name: 'HubSpot', note: 'CRM · leads & contacts', brand: 'hubspot' },
        { name: 'Zoho', note: 'CRM & business apps', brand: 'zoho' },
        { name: 'Odoo', note: 'ERP · orders, stock, finance', brand: 'odoo' },
        { name: 'SAP', note: 'Enterprise ERP', brand: 'sap' },
        { name: 'Shopify', note: 'Commerce', brand: 'shopify' },
        { name: 'WordPress', note: 'Websites & content', brand: 'wordpress' },
        { name: 'Stripe', note: 'Payments', brand: 'stripe' },
        { name: 'Google Sheets', note: 'Spreadsheets', brand: 'googlesheets' },
        { name: 'Documents', note: 'PDFs, policies, SOPs', icon: 'documents' },
      ],
    },
    {
      label: 'Data & engineering',
      items: [
        { name: 'REST APIs', note: 'Any service with an API', icon: 'api' },
        { name: 'PostgreSQL', note: 'SQL database', brand: 'postgresql' },
        { name: 'MySQL', note: 'SQL database', brand: 'mysql' },
        { name: 'MongoDB', note: 'NoSQL database', brand: 'mongodb' },
        { name: 'Supabase', note: 'Postgres backend & auth', brand: 'supabase' },
        { name: 'Convex', note: 'Realtime backend', brand: 'convex' },
        { name: 'Python', note: 'AI & backend', brand: 'python' },
        { name: 'FastAPI', note: 'APIs & services', brand: 'fastapi' },
        { name: 'Next.js', note: 'Web applications', brand: 'nextdotjs' },
        { name: 'React', note: 'User interfaces', brand: 'react' },
        { name: 'TypeScript', note: 'Typed codebases', brand: 'typescript' },
        { name: 'Docker', note: 'Deployment', brand: 'docker' },
      ],
    },
  ],
} as const;

export const services = [
  {
    id: 'ai-engineering',
    number: '01',
    title: 'AI Engineering',
    kicker: 'AI-powered features, agents and intelligent systems',
    description:
      'We design and build AI into the products and processes you already have — from customer-facing agents to internal knowledge tools — with defined limits and proper testing.',
    bullets: [
      'AI Employees for support, leads and bookings',
      'Knowledge-base and RAG applications',
      'AI features inside your existing software',
    ],
  },
  {
    id: 'business-automation',
    number: '02',
    title: 'Business Automation',
    kicker: 'Workflows, integrations and repetitive task automation',
    description:
      'Move data between applications, trigger the next step, send the notification, build the report. The hand-offs between tools and people, handled.',
    bullets: [
      'Request → AI → CRM → follow-up',
      'Document extraction → validation → system update',
      'Scheduled reporting and notifications',
    ],
  },
  {
    id: 'industrial-ai',
    number: '03',
    title: 'Industrial AI & Business Systems',
    kicker: 'ERP, operational intelligence and production workflows',
    description:
      'Procurement, inventory, production and tracking on one connected system, with AI-assisted search, recommendations and exception detection built in.',
    bullets: [
      'Procurement, inventory and production tracking',
      'AI-assisted exception and shortage detection',
      'Dashboards for operational visibility',
    ],
  },
  {
    id: 'custom-software',
    number: '04',
    title: 'Custom Software Engineering',
    kicker: 'Web apps, SaaS, platforms and legacy modernization',
    description:
      'The system your business needs, built from scratch or modernized from what you have — securely deployed, properly integrated and maintainable.',
    bullets: [
      'Web applications, SaaS products and platforms',
      'CRM, ERP and third-party API integration',
      'Legacy-system modernization',
    ],
  },
];

/**
 * Core services — the detailed menu shown before Industries. Tags describe what we build, not performance
 * claims. TODO(owner): confirm Voice AI is something you want to lead with, and add fixed-scope packages
 * (with real durations) if you want them listed.
 */
export const coreServices = [
  {
    id: 'ai-agents',
    category: 'AI Agents',
    tagline: 'AI Employees for support, leads and bookings.',
    short: 'AI Employees for support, leads and bookings.',
    title: 'AI Agent Development',
    description:
      'AI Employees scoped to one job — support, leads or bookings — wired into your systems, with the permissions they need and nothing more.',
    tags: ['Support', 'Sales & leads', 'Appointments', 'Human approval'],
  },
  {
    id: 'chatbots',
    category: 'Conversational AI',
    tagline: 'Website, WhatsApp and Messenger assistants.',
    short: 'Website, WhatsApp and Messenger assistants that answer from your knowledge base.',
    title: 'AI Chatbot Development',
    description:
      'Chat assistants on your website, WhatsApp and Messenger that answer from your own knowledge base and hand over to a person when it matters.',
    tags: ['WhatsApp', 'Website chat', 'Knowledge base', 'Human handoff'],
  },
  {
    id: 'voice',
    category: 'Voice',
    tagline: 'Answers calls and books appointments.',
    short: 'Assistants that answer calls, take bookings and arrange call-backs.',
    title: 'AI Voice Agents',
    description:
      'Voice assistants that answer calls, take bookings and arrange call-backs, connected to your calendar and CRM.',
    tags: ['Calls', 'Bookings', 'Call-backs'],
  },
  {
    id: 'workflow-automation',
    category: 'Automation',
    tagline: 'Hand-offs between tools, automated.',
    short: 'Hand-offs between tools and people, automated.',
    title: 'AI Workflow Automation',
    description:
      'The hand-offs between tools and people, handled: capture the request, update the CRM, send the follow-up, build the report.',
    tags: ['Lead → CRM', 'Document intake', 'Notifications', 'Scheduled reports'],
  },
  {
    id: 'knowledge-rag',
    category: 'Knowledge',
    tagline: 'Q&A over your documents and SOPs.',
    short: 'Search and Q&A over your documents, policies and SOPs.',
    title: 'AI Knowledge Base & RAG',
    description:
      'Search and Q&A over your documents, policies and SOPs, so staff and customers get answers from your own material.',
    tags: ['PDFs & SOPs', 'Internal search', 'Q&A'],
  },
  {
    id: 'integrations',
    category: 'Integrations',
    tagline: 'AI connected to your CRM and ERP.',
    short: 'AI connected to your CRM, ERP and databases through their APIs.',
    title: 'AI Integration Services',
    description:
      'AI connected to the systems you already run through their APIs, so you add capability without replacing your stack.',
    tags: ['CRM', 'ERP', 'REST APIs', 'Databases'],
  },
  {
    id: 'business-systems',
    category: 'Business Systems',
    tagline: 'Procurement, inventory and production.',
    short: 'Procurement, inventory and production on one system.',
    title: 'Industrial AI & ERP',
    description:
      'Procurement, inventory and production on one connected system, with AI-assisted exception and shortage detection.',
    tags: ['Procurement', 'Inventory', 'Production', 'Exception detection'],
  },
  {
    id: 'custom-software',
    category: 'Software',
    tagline: 'Web apps, SaaS and legacy upgrades.',
    short: 'Web apps, SaaS and legacy modernization.',
    title: 'Custom Software & SaaS',
    description:
      'Web applications, SaaS products and platforms, built from scratch or modernized from what you have, securely deployed and maintainable.',
    tags: ['Web apps', 'SaaS', 'Legacy modernization'],
  },
  {
    id: 'reporting',
    category: 'Reporting',
    tagline: 'Dashboards and scheduled reports.',
    short: 'Dashboards and scheduled reports you will read.',
    title: 'Dashboards & Reporting',
    description:
      'Operational data pulled together on a schedule and delivered as a dashboard or report you will actually read.',
    tags: ['Dashboards', 'Scheduled reports', 'Operational visibility'],
  },
];

/**
 * Packages shown in the "Packages" mega menu. TODO(owner): add timelines and prices once you have confirmed them;
 * none are shown on purpose. Tags are descriptive, not claims.
 */
export const packages = [
  {
    id: 'audit',
    title: 'AI Business Audit',
    short: 'See where AI and automation would actually help.',
    description:
      'We review how your business runs today, map the workflows worth improving, and give you a prioritised plan before anything is built.',
    tags: ['Review', 'Priorities', 'Roadmap'],
  },
  {
    id: 'agent-starter',
    title: 'AI Agent Starter',
    short: 'Your first AI Employee, scoped to one job.',
    description:
      'A working AI Employee for support, leads or bookings, connected to your channels and systems, with clear limits and human approval where it matters.',
    tags: ['One agent', 'Your channels', 'Human approval'],
  },
  {
    id: 'workflow',
    title: 'Workflow Automation',
    short: 'One process, automated end to end.',
    description:
      'We pick a repetitive process, such as lead follow-up or document intake, and automate it across the tools your team already uses.',
    tags: ['One process', 'Cross-tool', 'Reporting'],
  },
  {
    id: 'systems',
    title: 'Business Systems Setup',
    short: 'Operations on one connected system.',
    description:
      'Inventory, procurement, production or reporting brought together in a custom system, with dashboards and alerts for what needs attention.',
    tags: ['ERP', 'Dashboards', 'Integrations'],
  },
];

/** "More" menu. Items without an `href` are "coming soon": hoverable for the preview, but not clickable. */
export const moreMenu = [
  {
    id: 'case-studies',
    label: 'Case Studies',
    text: 'Systems we have built and delivered',
    description: 'Real systems we have built and delivered, with screenshots and the story behind each one.',
    tags: ['Real projects', 'Screens', 'Details'],
    href: '/#work',
  },
  {
    id: 'partner',
    label: 'Become a Partner',
    text: 'Agencies, consultants and technology partners',
    description: 'For agencies, consultants and technology providers who want to build and deliver with us.',
    tags: ['Agencies', 'Consultants', 'Technology'],
    href: 'partner',
  },
  {
    id: 'blog',
    label: 'Blog',
    text: 'Notes on AI and engineering',
    description: 'Practical notes on AI, automation and building software that works in a real business.',
    tags: ['AI', 'Automation', 'Engineering'],
    href: '/blog',
  },
  {
    id: 'rnd',
    label: 'R & D',
    text: 'What we are exploring next',
    description: 'The experiments and ideas we are exploring next, before they become part of what we build.',
    tags: ['Experiments', 'Agents', 'Tooling'],
  },
  {
    id: 'products',
    label: 'Products',
    text: 'Software we build ourselves',
    description: 'Software we design, ship and run ourselves, including MyPixel Guard and BatchPilot.',
    tags: ['MyPixel Guard', 'BatchPilot'],
    href: '/#products',
  },
] as { id: string; label: string; text: string; description: string; tags: string[]; href?: string }[];

export type Step = { who: 'user' | 'agent' | 'system'; text: string; tag?: string };

export const employees = [
  {
    id: 'support',
    name: 'SupportAgent',
    role: 'Customer Support',
    responsibility:
      'Handles enquiries, answers from your knowledge base, raises and updates support tickets, and escalates with context.',
    outcome: 'Faster first responses and a lighter repetitive workload for your team.',
    canDo: ['Answer from your knowledge base', 'Look up order or ticket status', 'Log and update tickets', 'Escalate with full context'],
    channels: ['Website', 'WhatsApp', 'Messenger', 'Email'],
    transcript: [
      { who: 'user', text: 'Hi — my order hasn’t arrived yet. Can you check where it is?' },
      { who: 'system', text: 'Order lookup · status “With courier”', tag: 'ERP' },
      {
        who: 'agent',
        text: 'Found it. Your order left our warehouse yesterday and is with the courier — expected tomorrow by 6 pm. Want a message the moment it’s delivered?',
      },
      { who: 'system', text: 'Ticket #2841 logged · notification scheduled', tag: 'Helpdesk' },
    ] as Step[],
  },
  {
    id: 'lead',
    name: 'LeadAgent',
    role: 'Sales & Leads',
    responsibility:
      'Captures inbound interest, asks the right qualifying questions, scores the lead and hands a warm opportunity to sales.',
    outcome: 'Better lead management, quicker follow-up and fewer opportunities lost in the inbox.',
    canDo: ['Ask qualifying questions', 'Score and route leads', 'Create CRM records and notes', 'Notify the right person'],
    channels: ['Website', 'WhatsApp', 'Email', 'CRM'],
    transcript: [
      { who: 'user', text: 'We’re looking at a system for three of our branches. What does pricing look like?' },
      {
        who: 'agent',
        text: 'Happy to help. Quick questions so I point you to the right person: which tools do the branches use today, and what’s the main process you want to fix?',
      },
      { who: 'user', text: 'Inventory is a mess — Excel and WhatsApp mostly.' },
      { who: 'system', text: 'Lead scored 86/100 · owner assigned · note added', tag: 'CRM' },
      { who: 'agent', text: 'Thanks. I’ve passed this to our team with the details — you’ll hear from a real person within one business day.' },
    ] as Step[],
  },
  {
    id: 'booking',
    name: 'BookingAgent',
    role: 'Appointments',
    responsibility:
      'Checks live availability, proposes slots, confirms bookings, sends reminders and handles reschedules.',
    outcome: 'Less manual back-and-forth and fewer missed or double-booked appointments.',
    canDo: ['Check live availability', 'Propose and confirm slots', 'Send reminders', 'Handle reschedules'],
    channels: ['Website', 'WhatsApp', 'Messenger', 'Voice'],
    transcript: [
      { who: 'user', text: 'Can I see the doctor on Thursday evening?' },
      { who: 'system', text: 'Calendar check · 2 open slots Thu', tag: 'Calendar' },
      { who: 'agent', text: 'Thursday has 5:30 pm and 6:15 pm available. Which works better for you?' },
      { who: 'user', text: '6:15 please.' },
      { who: 'system', text: 'Booked · reminder set for 24h and 2h before', tag: 'Calendar' },
      { who: 'agent', text: 'Done — you’re booked for Thursday at 6:15 pm. I’ll send a reminder beforehand.' },
    ] as Step[],
  },
  {
    id: 'custom',
    name: 'Custom AI Employee',
    role: 'Industry-specific',
    responsibility:
      'Scoped to one of your operational processes — from procurement follow-ups to document intake — with the exact permissions it needs and nothing more.',
    outcome: 'Targeted automation of a process that’s specific to how you work.',
    canDo: ['Read incoming documents', 'Validate against your rules', 'Flag exceptions with context', 'Update the target system once approved'],
    channels: ['Any integrated channel'],
    transcript: [
      { who: 'system', text: 'New supplier invoice received by email', tag: 'Inbox' },
      { who: 'system', text: 'Extracted: supplier, PO number, 14 line items, total', tag: 'Document AI' },
      { who: 'system', text: 'Mismatch: line 9 quantity differs from PO (120 vs 100)', tag: 'Validation' },
      { who: 'agent', text: 'Flagged for review. I’ve attached the PO, the invoice and the difference so your buyer can approve in one click.' },
    ] as Step[],
  },
];

export const workflows = [
  {
    id: 'lead-to-crm',
    label: 'Lead capture → CRM',
    title: 'Every enquiry captured, qualified and followed up',
    nodes: ['Enquiry arrives', 'AI qualifies', 'CRM record created', 'Follow-up sent'],
    before: [
      'Enquiries arrive in WhatsApp, email and web forms',
      'Someone copies the details into a sheet when they have time',
      'Follow-up depends on who notices first',
    ],
    after: [
      'Every channel feeds one pipeline',
      'The lead is qualified and logged in the CRM automatically',
      'The right person is notified and the customer hears back promptly',
    ],
    outcome: 'No lead sits unanswered, and sales only spends time on qualified conversations.',
  },
  {
    id: 'enquiry-to-followup',
    label: 'Enquiry → follow-up',
    title: 'Customer questions answered, with the next step handled',
    nodes: ['Customer asks', 'AI checks your systems', 'Reply or action', 'Ticket and reminder logged'],
    before: [
      'Staff answer the same questions over and over',
      'Order or booking status means asking another team',
      'Promised call-backs get forgotten',
    ],
    after: [
      'Routine questions are answered from your own data',
      'Status is looked up in the system, not by chasing people',
      'Tickets and reminders are created automatically; complex cases escalate with context',
    ],
    outcome: 'Faster replies for customers and fewer repetitive tasks for your team.',
  },
  {
    id: 'production-to-reporting',
    label: 'Production data → reporting',
    title: 'Operations data turned into the report you actually read',
    nodes: ['Sources connected', 'Data consolidated', 'Exceptions flagged', 'Report delivered'],
    before: [
      'Stock, production and purchasing data live in separate files',
      'Someone rebuilds the weekly report by hand',
      'Shortages and delays are found after the fact',
    ],
    after: [
      'Data from each system is pulled together on a schedule',
      'Mismatches and shortages are flagged as they appear',
      'The report lands in the inbox or dashboard, ready to read',
    ],
    outcome: 'Decisions made on current data, without the spreadsheet scramble.',
  },
];

/** AgentiCore — the connected-operations section. Icons are mapped in components/sections/business-systems.tsx. */
export const agenticore = {
  modules: [
    { name: 'Inventory', stat: 'Stock · movement · batches' },
    { name: 'Production', stat: 'Planning · tracking · output' },
    { name: 'Procurement', stat: 'Suppliers · POs · approvals' },
    { name: 'Support', stat: 'Tickets · enquiries · escalations' },
    { name: 'Reporting', stat: 'Dashboards · scheduled reports' },
  ],
};

export type ProjectStatus = 'Completed' | 'Deployed' | 'MVP' | 'In development';

/**
 * Selected work. Only name a client or add a screenshot when you have their permission.
 * All four are deployed and live (confirmed by owner). TODO(owner): confirm `role`, and add screenshots / client names only with permission.
 */
export const projects: {
  id: string;
  title: string;
  kind: string;
  summary: string;
  status: ProjectStatus;
  role: string;
  /** Public URL of the live system. Leave out when it is behind a login or the client prefers it private. */
  liveUrl?: string;
  /** Screenshots: put files in public/work/<id>/ and list them here. First image is the card cover. */
  images: ProductImage[];
  /** Portrait phone screenshots, shown as a row of phones (mobile-first projects). */
  mobileImages?: ProductImage[];
  /** Shown under the gallery, e.g. "Sample data shown." */
  imageNote?: string;
  /** Card cover: degrees the phone leans to the left, leaving a gap beside the laptop. */
  phoneTilt?: number;
  /** What the system does — shown on the details page. */
  features?: string[];
  /** Case-study text — each part only appears on the details page when filled in. */
  caseStudy?: { challenge?: string; solution?: string; outcome?: string };
}[] = [
  {
    id: 'pharma-erp',
    title: 'Pharmaceutical ERP',
    kind: 'Industrial & business systems',
    summary:
      'A sourcing ERP for pharmaceutical raw materials: tender notices, supplier enquiries, quotation comparison, purchase orders and finance on one connected system.',
    status: 'Deployed',
    role: 'Design & engineering',
    // Inferred from the screenshots' address bar — TODO(owner): confirm this is the public URL.
    liveUrl: 'https://technestpharma.cloud',
    features: [
      'Tender notices captured automatically from procuring authorities',
      'Supplier and manufacturer catalogue with contacts and products',
      'Supplier enquiries and email handled inside the system',
      'Side-by-side quotation comparison with currency conversion',
      'Purchase orders, samples and supplier statements',
      'Payables, payments and expenses in one finance view',
    ],
    images: [
      { src: '/work/pharma-erp/dashboard.webp', alt: 'Pharmaceutical sourcing ERP dashboard with manufacturer, product and category totals', caption: 'Dashboard', w: 1600, h: 868 },
      { src: '/work/pharma-erp/tender-notices.webp', alt: 'Tender notices list captured from procuring authorities', caption: 'Tender notices', w: 1600, h: 868 },
      { src: '/work/pharma-erp/quotation-comparison.webp', alt: 'Quotation comparison across suppliers with prices, lead time and validity', caption: 'Quotation comparison', w: 1600, h: 868 },
      { src: '/work/pharma-erp/landing.webp', alt: 'Pharmaceutical sourcing ERP landing page', caption: 'Landing page', w: 1600, h: 905 },
    ],
  },
  {
    id: 'learning-platform',
    title: 'Learning platform',
    kind: 'Education platform',
    liveUrl: 'https://bhashal.com/',
    summary:
      'A mobile-first English learning platform for Bangla speakers: structured lessons, practice, progress tracking, streaks and badges.',
    status: 'Deployed',
    role: 'Design & engineering',
    features: [
      'Learning roadmap of chapters, units and short lessons with progress',
      'Lessons with Bangla explanations alongside English examples',
      'Practice and micro-quizzes, with review of past mistakes',
      'XP, daily streaks, weekly goals and achievement badges',
      'Works on phones first, with a full web dashboard too',
    ],
    // Web and mobile lists are paired by index: the mockup shows the same screen on both devices at once.
    images: [
      { src: '/work/learning-platform/web-home.webp', alt: 'Learning platform dashboard with a welcome banner, streak, XP, lessons and course progress', caption: 'Dashboard', w: 2000, h: 1129 },
      { src: '/work/learning-platform/web-progress.webp', alt: 'Progress page with weekly goal, total XP, quiz accuracy and day streak', caption: 'Progress', w: 2000, h: 1129 },
      { src: '/work/learning-platform/web-achievements.webp', alt: 'Achievements page with a trophy case of earned and locked badges', caption: 'Achievements', w: 2000, h: 1128 },
    ],
    mobileImages: [
      { src: '/work/learning-platform/app-home.webp', alt: 'Mobile home screen with a welcome banner, current lesson, streak and XP', caption: 'Home', w: 660, h: 1436 },
      { src: '/work/learning-platform/app-progress.webp', alt: 'Mobile progress screen with weekly goal, XP, quiz accuracy and streak', caption: 'Progress', w: 658, h: 1434 },
      { src: '/work/learning-platform/app-badges.webp', alt: 'Mobile trophy case with earned and locked badges', caption: 'Badges', w: 662, h: 1430 },
    ],
  },
  {
    id: 'marketing-automation',
    title: 'Marketing automation',
    kind: 'Business automation',
    summary: 'Automated campaign and lead follow-up workflows connected to the tools the team already uses.',
    status: 'Deployed',
    role: 'Design & engineering',
    images: [],
  },
  {
    id: 'matrimony-platform',
    title: 'ShaadiMart',
    kind: 'Matrimony platform',
    summary:
      'A matchmaking platform with secure sign-in, real-time chat, profile management and paid membership tiers, taken from idea to a live product in six weeks.',
    status: 'Deployed',
    role: 'Full-stack engineering',
    // The delivered build, kept as handed over. The client's own production site (shaadimartbd.com) keeps changing under their team.
    liveUrl: 'https://dev.shaadimartbd.com',
    features: [
      'Multi-step profile onboarding with progress tracking and inline validation',
      'Discovery and search, with daily match picks and a shortlist',
      'Real-time messaging over secure WebSockets',
      'Four subscription tiers enforced on the server, so premium limits cannot be bypassed',
      'Profile photos stored on Cloudflare R2, with no egress fees',
      'Admin dashboard for moderation and member reports',
    ],
    images: [
      { src: '/work/matrimony-platform/web-landing.webp', alt: 'ShaadiMart landing page with a member search bar', caption: 'Landing page', w: 2000, h: 1129 },
      { src: '/work/matrimony-platform/web-messages.webp', alt: 'Real-time chat with a conversation list and message thread', caption: 'Messages', w: 2000, h: 1079 },
      { src: '/work/matrimony-platform/web-dashboard.webp', alt: 'Member dashboard with profile completion, match search, daily picks and shortlist', caption: 'Dashboard', w: 2000, h: 1081 },
      { src: '/work/matrimony-platform/web-edit-profile.webp', alt: 'Multi-step profile editor on the lifestyle details step', caption: 'Edit profile', w: 2000, h: 1089 },
    ],
    mobileImages: [
      { src: '/work/matrimony-platform/mobile-landing.webp', alt: 'ShaadiMart landing page on a phone', caption: 'Mobile landing', w: 606, h: 1086 },
    ],
    imageNote: 'Test account and sample data shown.',
    phoneTilt: 20,
    caseStudy: {
      challenge:
        'A founder with a validated idea, a startup budget and no technical team needed members to chat safely and instantly, a paywall that could not be bypassed, and thousands of profile photos served affordably, all live within six weeks.',
      solution:
        'A decoupled Next.js and TypeScript client on a Laravel REST API with Sanctum and MySQL, where the backend decides every access question. Four subscription tiers sit on top of two roles, chat runs over WebSockets behind Nginx, and images are served from Cloudflare R2. Deployed on a VPS with GitHub Actions.',
      outcome:
        'Live in 1.5 months with 8 modules, built end to end by one engineer. Premium limits are enforced server-side across all four tiers, image delivery carries no per-gigabyte cost, and a production-only WebSocket SSL failure was found and fixed at launch.',
    },
  },
];

export type ProductImage = { src: string; alt: string; caption: string; w: number; h: number };

/** Our own products. Be exact about maturity — never present an MVP as a launched product. */
export const products: {
  id: string;
  name: string;
  tag: string;
  summary: string;
  highlights: string[];
  status: 'Live' | 'MVP' | 'In development';
  availability: string;
  /** Shown under the gallery — keep it honest about sample data and planned features. */
  imageNote: string;
  images: ProductImage[];
  /** Frame drawn around the screenshots: a browser (with `frameLabel` as the address) or an app window. */
  frame: 'browser' | 'window';
  frameLabel: string;
  /** Brand colour for the glow and the progress chip. */
  accent: string;
  href?: string;
  cta?: string;
}[] = [
  {
    id: 'batchpilot',
    name: 'BatchPilot',
    tag: 'SaaS · Coaching management',
    summary:
      'A phone-first management app for private tutors and coaching centres in Bangladesh. Attendance, fees, dues and parent SMS in one place, so the teacher can focus on teaching.',
    highlights: [
      'Fee collection with automatic accounts and a dues list',
      'Tap-to-mark attendance with automatic SMS to parents',
      'Separate portals for teachers, assistants, parents and students',
      'Each coaching centre’s data kept isolated from the others',
    ],
    status: 'MVP',
    frame: 'browser',
    frameLabel: 'BatchPilot',
    accent: '#7C4DFF',
    availability: 'MVP phase — still in development',
    imageNote:
      'Bangla interface, shown with sample data. Fingerprint-device attendance, automatic dues reminders, diary-photo import and the AI question bank appear in the designs but are planned, not yet available.',
    images: [
      { src: '/products/batchpilot/hero.webp', alt: 'BatchPilot landing page with its feature overview', caption: 'Landing page', w: 1600, h: 902 },
      { src: '/products/batchpilot/dashboard.webp', alt: 'BatchPilot teacher dashboard with today’s batches, fees and attendance', caption: 'Teacher dashboard', w: 1600, h: 903 },
      { src: '/products/batchpilot/attendance.webp', alt: 'BatchPilot attendance page listing students with present, late and absent status', caption: 'Attendance', w: 1600, h: 903 },
      { src: '/products/batchpilot/features.webp', alt: 'BatchPilot feature overview cards', caption: 'Feature overview', w: 1600, h: 903 },
    ],
  },
  {
    id: 'mypixel-guard',
    name: 'MyPixel Guard',
    tag: 'Free tool · Privacy',
    summary:
      'A metadata remover we built for our own use and opened to everyone, free. Find and remove the hidden location, device and author details inside your images before you share them.',
    highlights: [
      'Inspect an image to see exactly what hidden data it carries',
      'Clean GPS location, device, author and other embedded metadata',
      'Redact faces and sensitive text, detected on your device',
      'Batch tools to convert, resize and compress many images at once',
      'Private by design — files stay on your device, nothing is uploaded',
    ],
    status: 'Live',
    frame: 'window',
    frameLabel: 'MyPixel Guard',
    accent: '#FF8A1F',
    availability: 'Live and free to use',
    imageNote: 'Demo screens use stock photos and fictional personal details.',
    images: [
      { src: '/products/mypixelguard/inspect.webp', alt: 'MyPixel Guard Inspect screen listing privacy findings in an image', caption: 'Inspect', w: 1600, h: 1041 },
      { src: '/products/mypixelguard/clean.webp', alt: 'MyPixel Guard Clean screen with cleaning options and before/after preview', caption: 'Clean', w: 1600, h: 1041 },
      { src: '/products/mypixelguard/redact.webp', alt: 'MyPixel Guard Redact screen blurring sensitive text on a sample card', caption: 'Redact', w: 1600, h: 1041 },
      { src: '/products/mypixelguard/studio.webp', alt: 'MyPixel Guard Smart Batch Studio recipe settings', caption: 'Batch Studio', w: 1600, h: 1041 },
    ],
    href: 'https://mypixelguard.agentiqbd.com',
    cta: 'Visit MyPixel Guard',
  },
];

/**
 * Client feedback. Leave empty until you have real, permitted quotes — the section hides itself.
 * Shape: { quote, name, role, company, project }. Add `company` / `name` only with permission.
 */
export const testimonials: { quote: string; name: string; role: string; company?: string; project?: string }[] = [];

/** Every industry is presented as a focus area (owner decision, 2026-10-27), so there is no delivered/focus flag. */
export const industries = [
  {
    name: 'Industrial & Pharmaceutical Manufacturing',
    short: 'Industrial AI',
    featured: true,
    description:
      'ERP, production, procurement and inventory on one connected system, with AI watching for shortages, mismatches and delays before they hit the floor.',
    uses: ['ERP & production tracking', 'Procurement & supplier workflows', 'Inventory and stock movement', 'Industrial AI'],
  },
  {
    name: 'SMEs & Distribution',
    short: 'SMEs',
    description: 'Custom systems that capture every lead, keep reporting current and automate the daily admin.',
    uses: ['Custom systems', 'Lead management', 'Reporting', 'Automation'],
  },
  {
    name: 'Healthcare & Clinics',
    short: 'Healthcare',
    description: 'Appointment workflows, patient enquiries and administration handled around the clock.',
    uses: ['Appointment workflows', 'Patient enquiries', 'Administration'],
  },
  {
    name: 'Education & Training',
    short: 'Education',
    description: 'Admissions, batch and student management, and the education software behind them.',
    uses: ['Admissions', 'Batch & student management', 'Education software'],
  },
  {
    name: 'Real Estate & Property',
    short: 'Real estate',
    description: 'Qualify buyers and tenants, answer property enquiries and book viewings.',
    uses: ['Lead qualification', 'Property enquiries', 'Viewing bookings'],
  },
  {
    name: 'Travel, Hotels & Hospitality',
    short: 'Hospitality',
    description: 'Reservations, customer communication and service workflows across channels.',
    uses: ['Reservations', 'Customer communication', 'Service workflows'],
  },
  {
    name: 'Logistics & Supply Chain',
    short: 'Logistics',
    description: 'Shipment status, inventory integration and reporting that stays current.',
    uses: ['Shipment status', 'Inventory integration', 'Reporting'],
  },
] as const;

/** "How we work" — three steps, one outcome each. Consistent with the FAQ: discovery first, estimate before building. */
export const processSteps = [
  {
    label: 'Discovery',
    title: 'We listen first.',
    text: 'A conversation about the problem and the workflow behind it. We ask questions, look at how you work today, and tell you honestly whether AI, automation or plain software is the right fit.',
    outcome: 'A clear view of what is worth building.',
  },
  {
    label: 'Plan',
    title: 'We agree the plan.',
    text: 'We propose the architecture, the integrations and the risks, often starting with a working prototype of the core workflow. You see a clear estimate before anything is built.',
    outcome: 'A scoped plan and estimate you have approved.',
  },
  {
    label: 'Build & support',
    title: 'We build, we stay.',
    text: 'The system is built and tested for accuracy, permissions and failure cases, then deployed with access control and monitoring. Support after launch is agreed with you up front.',
    outcome: 'A system in daily use, with support in place.',
  },
] as const;

/** "About Agentiq BD" — one belief (it is the section title), four pillars and the founder. Wording is our own. */
export const whyUs = {
  belief: {
    title: 'AI with a purpose,',
    accent: 'or not at all.',
    text: 'We start from the bottleneck in your business, not from the technology. If AI is the right tool, we build it properly. If plain software or a simpler workflow does the job better, we will tell you.',
  },
  pillars: [
    {
      label: 'Direct access',
      title: 'Talk to the person building it.',
      text: 'Our founder is an AI systems engineer and is hands-on in the technical decisions. Your questions go straight to the person designing your system.',
    },
    {
      label: 'Reliable by design',
      title: 'Built for daily operations.',
      text: 'Access permissions, testing for failure cases, monitoring and documentation are part of every build, so the system is ready for real day-to-day use.',
    },
    {
      label: 'Works with your tools',
      title: 'Connected to what you already use.',
      text: 'We integrate with your CRM, ERP, databases and messaging channels. Your team keeps its existing tools and the new system plugs into them.',
    },
    {
      label: 'Global standard',
      title: 'International standard, delivered from Dhaka.',
      text: 'We work to international engineering standards. Meetings, documentation and delivery are in English, and we work with clients across time zones.',
    },
  ],
};

/** Founder block in "Why Agentiq BD". Written from facts the founder supplied (2026-10-27); keep it to those. */
export const founder = {
  name: 'Sabbir Ahmad',
  title: 'Founder & AI Systems Engineer',
  photo: '/founder/sabbir-ahmad.webp',
  statement: 'The engineer behind Agentiq BD.',
  vision: 'World-class solutions, built in Bangladesh.',
  bio: [
    'I started working in the IT industry before I had even graduated from BRAC University. That early start put me on teams and projects from Morgantown and Florida to New Jersey, Australia, Canada and Bangladesh, and it showed me what an international standard looks like in everyday work.',
    'I started Agentiq BD to bring that standard home: world-class engineering, built in Bangladesh by Bangladeshi people, and offered to businesses here and around the world.',
    'What keeps me going is simple. I love real problems, and I love building the thing that solves them. Sometimes a solution grows into a product of its own. I enjoy that whole path, and I would like to walk it with you.',
  ] as string[],
  /** TODO(owner): paste the real profile URLs. An icon only shows once its `href` is filled in. */
  social: [
    { kind: 'facebook', label: 'Facebook', href: '' },
    { kind: 'linkedin', label: 'LinkedIn', href: '' },
    { kind: 'x', label: 'X', href: '' },
    { kind: 'github', label: 'GitHub', href: '' },
  ] as { kind: 'facebook' | 'linkedin' | 'x' | 'github'; label: string; href: string }[],
};

export const guardrails = [
  { title: 'Scoped permissions', text: 'Every AI Employee can only touch what it’s explicitly allowed to.' },
  { title: 'Human approval', text: 'Sensitive actions route to a person before they happen.' },
  { title: 'Full audit trail', text: 'Every decision and system change is logged and reviewable.' },
  { title: 'Tested failure modes', text: 'We design for the edge cases — and what happens when AI is unsure.' },
];

export const missionGoals = [
  'Build world-class AI systems from Bangladesh',
  'Create global-level engineering opportunities at home',
  'Help Bangladeshi businesses adopt AI the right way',
  'Deliver high-value AI engineering to clients internationally',
];

export const values = [
  { title: 'Real problems over AI hype', text: 'AI with a purpose, or not at all.' },
  { title: 'Reliability & responsibility', text: 'Predictable, testable, secure systems.' },
  { title: 'Global standards, Bangladesh origin', text: 'International quality, built where we live.' },
  { title: 'Continuous learning', text: 'Every project makes the next one better.' },
];

export const faqs = [
  {
    q: 'What types of projects do you take on?',
    a: 'AI-powered features and agents, business workflow automation, ERP and operational systems for manufacturers, and custom web, SaaS and platform development, including modernizing older systems. If you’re unsure which category fits, describe the bottleneck and we’ll say so honestly.',
  },
  {
    q: 'Can you integrate with our existing software?',
    a: 'Usually, yes. We work with CRMs, ERPs, databases, spreadsheets, messaging channels and anything that exposes an API. What’s straightforward and what needs custom work is something we confirm during discovery, before you commit.',
  },
  {
    q: 'Do you build custom AI solutions?',
    a: 'Yes. That includes AI Employees for support, leads and bookings, knowledge-base applications, document processing and AI features inside your existing product. Each one is scoped with clear permissions, human approval for sensitive actions and an audit trail.',
  },
  {
    q: 'How do pricing and project timelines work?',
    a: 'We start with a discovery conversation about the problem, then propose a scoped plan, often beginning with a prototype of the core workflow. Pricing and timelines depend on integrations and complexity, so we give you a clear estimate after discovery rather than a number up front.',
  },
  {
    q: 'Do you provide ongoing maintenance?',
    a: 'Yes. Support and improvement after go-live are part of how we work, and the scope is agreed with you as part of the project: documentation, training, monitoring and a support plan.',
  },
  {
    q: 'Can international businesses work with you?',
    a: 'Yes. We’re based in Dhaka and work with clients globally, to international engineering standards and across time zones. Meetings, documentation and delivery are in English.',
  },
];

/** "Service needed" choices on the contact form. */
export const interests = [
  'AI Engineering',
  'Business Automation',
  'Industrial AI & Business Systems',
  'Custom Software Engineering',
  'Not sure yet',
];

/** Partnership route on the contact form (agencies, consultants, technology providers, referral partners). */
export const partnerTypes = ['Agency', 'Consultant', 'Technology provider', 'Referral partner', 'Other'];
