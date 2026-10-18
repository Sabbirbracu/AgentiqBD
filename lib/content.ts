/**
 * All marketing copy lives here so it can be edited (or later swapped for a CMS /
 * the AgentiqBD OS backend) without touching component code.
 */

export const site = {
  name: 'Agentiq BD',
  url: 'https://www.agentiqbd.com',
  email: 'hello@agentiqbd.com',
  location: 'Dhaka, Bangladesh',
  tagline: 'Turn Complexity into Intelligence',
  description:
    'Agentiq BD is an AI engineering and intelligent business systems company. We design and deploy AI Employees, workflow automation, AI-enabled ERP and custom AI systems that connect to the tools you already run.',
};

export const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'AI Employees', href: '#employees' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Industries', href: '#industries' },
  { label: 'Approach', href: '#approach' },
  { label: 'FAQ', href: '#faq' },
];

/** "Works with" strip under the hero. `icon` keys map to lucide icons in components/sections/works-with.tsx. */
export const worksWith = {
  title: 'Plugs into the tools you already run.',
  description:
    'No rip-and-replace. Your AI Employees and workflows connect to the channels customers use and the systems your team already lives in.',
  rows: [
    {
      label: 'Channels',
      items: [
        { name: 'Website', note: 'Chat & forms', icon: 'globe' },
        { name: 'WhatsApp', note: 'Customer conversations', icon: 'whatsapp' },
        { name: 'Messenger', note: 'Social inbox', icon: 'messenger' },
        { name: 'Email', note: 'Inbound & replies', icon: 'mail' },
        { name: 'Voice', note: 'Calls & callbacks', icon: 'voice' },
        { name: 'Calendars', note: 'Bookings & reminders', icon: 'calendar' },
      ],
    },
    {
      label: 'Systems & data',
      items: [
        { name: 'CRM', note: 'Leads & contacts', icon: 'crm' },
        { name: 'ERP', note: 'Orders, stock, finance', icon: 'erp' },
        { name: 'REST APIs', note: 'Any service with an API', icon: 'api' },
        { name: 'Databases', note: 'SQL & NoSQL', icon: 'database' },
        { name: 'Documents', note: 'PDFs, policies, SOPs', icon: 'documents' },
        { name: 'Spreadsheets', note: 'Sheets & Excel', icon: 'sheet' },
        { name: 'Internal tools', note: 'Back-office apps', icon: 'tools' },
        { name: 'Dashboards', note: 'Live reporting', icon: 'dashboard' },
      ],
    },
  ],
} as const;

export const comparison = {
  chatbot: {
    label: 'A typical chatbot',
    points: [
      'Answers from a fixed script or FAQ',
      'Lives in a widget, disconnected from your systems',
      'Hands over to a human the moment something real is needed',
      'Success is measured in “chats deflected”',
    ],
  },
  employee: {
    label: 'An Agentiq AI Employee',
    points: [
      'Retrieves the right answer from your own data and documents',
      'Updates the CRM, ERP, ticket or calendar — then confirms it',
      'Executes defined tasks inside strict permissions',
      'Escalates to your team with full context, when it should',
    ],
  },
};

export const services = [
  {
    id: 'employees',
    number: '01',
    title: 'AI Employees',
    kicker: 'Digital workers with real responsibilities',
    description:
      'Purpose-built AI workers for support, lead handling and bookings — operating across your website, WhatsApp, Messenger, email and voice.',
    bullets: [
      'Customer enquiries, FAQs and ticket handling',
      'Lead capture, qualification and CRM updates',
      'Appointment booking and confirmations',
    ],
  },
  {
    id: 'automation',
    number: '02',
    title: 'AI Workflow Automation',
    kicker: 'Connect the work between your tools',
    description:
      'Move data between applications, trigger the next step, send the notification, build the report. Repetitive coordination, handled.',
    bullets: [
      'Request → AI processing → CRM → follow-up',
      'Order → stock check → production → notification',
      'Document extraction → validation → system update',
    ],
  },
  {
    id: 'erp',
    number: '03',
    title: 'AI-Enabled ERP & Business Systems',
    kicker: 'Operations on one connected platform',
    description:
      'Traditional ERP discipline — procurement, inventory, production, tracking — with AI-assisted search, recommendations and exception detection built in.',
    bullets: [
      'Procurement, suppliers and purchasing',
      'Inventory, products and stock movement',
      'Production planning and operational tracking',
    ],
  },
  {
    id: 'custom',
    number: '04',
    title: 'Custom AI Engineering',
    kicker: 'Built around how your business actually runs',
    description:
      'Add AI to the software you already have, or build the system you need from scratch — securely deployed and properly integrated.',
    bullets: [
      'Knowledge-base and RAG applications',
      'CRM, ERP and third-party API integration',
      'Internal tools and operational dashboards',
    ],
  },
];

export type Step = { who: 'user' | 'agent' | 'system'; text: string; tag?: string };

export const employees = [
  {
    id: 'support',
    name: 'SupportAgent',
    role: 'Customer Support',
    responsibility:
      'Handles enquiries, answers from your knowledge base, raises and updates support tickets, and escalates with context.',
    outcome: 'Faster first responses and a lighter repetitive workload for your team.',
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
    id: 'sales',
    label: 'Sales',
    title: 'Every enquiry followed up — automatically',
    nodes: ['Customer request', 'AI understands & qualifies', 'CRM record created', 'Follow-up sent'],
    detail:
      'Enquiries from any channel are read, qualified and logged in your CRM. The right person is notified and the customer hears back without waiting for someone to notice.',
    changes: ['No lead sits unanswered', 'CRM stays accurate without data entry', 'Sales sees only qualified conversations'],
  },
  {
    id: 'operations',
    label: 'Operations',
    title: 'Orders that move themselves',
    nodes: ['Order placed', 'Inventory checked', 'Production planned', 'Team notified'],
    detail:
      'A new order triggers a stock check, flags shortages, schedules production and notifies every team that needs to act — with exceptions raised before they become delays.',
    changes: ['Fewer hand-offs and status chases', 'Shortages caught at order time', 'One source of truth across teams'],
  },
  {
    id: 'backoffice',
    label: 'Back-office',
    title: 'Paperwork becomes data',
    nodes: ['Document received', 'Fields extracted', 'Rules validated', 'System updated'],
    detail:
      'Invoices, forms and delivery notes are read, checked against your rules and written to the right system. Only the genuine exceptions reach a human.',
    changes: ['Less manual data entry', 'Fewer transcription errors', 'Audit trail on every record'],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    title: 'Reports without the spreadsheet scramble',
    nodes: ['Sources connected', 'Data consolidated', 'Insights generated', 'Report delivered'],
    detail:
      'Data from separate tools is pulled together on a schedule and turned into the report your team actually needs — in their inbox or dashboard, ready to read.',
    changes: ['Same numbers, every time', 'Hours back every reporting cycle', 'Decisions made on current data'],
  },
];

export const erpModules = [
  { name: 'Procurement', stat: 'Suppliers · POs · approvals' },
  { name: 'Inventory', stat: 'Stock · movement · batches' },
  { name: 'Production', stat: 'Planning · tracking · output' },
  { name: 'Sales & Orders', stat: 'Quotes · orders · delivery' },
];

export const industries = [
  {
    name: 'Industrial & Pharmaceutical Manufacturing',
    short: 'Industrial AI',
    featured: true,
    description:
      'Procurement, inventory, batch and production tracking brought onto one connected system, with AI watching for shortages, mismatches and delays before they hit the floor.',
    uses: ['Procurement & supplier workflows', 'Inventory and stock movement', 'Production planning & tracking', 'Exception detection'],
  },
  {
    name: 'Customer-facing SMEs',
    short: 'SMEs',
    description: 'Respond to every enquiry instantly, capture every lead, and stop living in your inbox.',
    uses: ['Support on WhatsApp & web', 'Lead capture & follow-up'],
  },
  {
    name: 'Healthcare Providers',
    short: 'Healthcare',
    description: 'Appointment booking, reminders and front-desk questions handled around the clock.',
    uses: ['Booking & reminders', 'Patient FAQs'],
  },
  {
    name: 'Education & Training',
    short: 'Education',
    description: 'Admissions enquiries, course questions and enrolment follow-up without extra headcount.',
    uses: ['Admissions support', 'Enrolment follow-up'],
  },
  {
    name: 'Real Estate',
    short: 'Real estate',
    description: 'Qualify buyers and tenants, schedule viewings and keep every lead warm.',
    uses: ['Lead qualification', 'Viewing scheduling'],
  },
  {
    name: 'Travel & Service',
    short: 'Travel',
    description: 'Handle itinerary questions, bookings and service requests across channels.',
    uses: ['Booking requests', 'Service requests'],
  },
];

export const processSteps = [
  { title: 'Discovery', text: 'We study the business problem and the workflow behind it, to understand what really needs to change.' },
  { title: 'Solution design', text: 'Architecture, integrations and risk assessment — agreed before anything is built.' },
  { title: 'Prototype', text: 'A working slice of the core workflow, to prove it’s feasible before we commit to full development.' },
  { title: 'Development', text: 'Software, AI logic and integrations built against the approved design.' },
  { title: 'Testing', text: 'Accuracy, permissions, failure cases and security — verified, not assumed.' },
  { title: 'Deployment', text: 'Production set-up with access control, monitoring and a clean go-live.' },
  { title: 'Handover', text: 'Documentation, training and a support plan, so your team is never in the dark.' },
  { title: 'Optimisation', text: 'We review the metrics, gather feedback and keep improving the system.' },
];

export const principles = [
  {
    title: 'Business-first engineering',
    text: 'We don’t start with technology. We start with the bottleneck, and design from there.',
  },
  {
    title: 'End-to-end workflows',
    text: 'Not just generating replies — retrieving information, updating systems, executing tasks and tracking the outcome.',
  },
  {
    title: 'Integration over isolation',
    text: 'AI shouldn’t be a separate tool. We connect it to your CRM, ERP, databases and the apps you already use.',
  },
  {
    title: 'Reusable engineering',
    text: 'What we learn on every project becomes a stronger foundation for the next — better quality, delivered faster.',
  },
  {
    title: 'Outcome-focused delivery',
    text: 'We measure value by results, not by the number of features shipped.',
  },
];

export const metrics = [
  'Time saved',
  'Processing speed',
  'Manual effort removed',
  'Error rate',
  'Workflow completion',
];

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
    q: 'What is an AI Employee, and how is it different from a chatbot?',
    a: 'A chatbot answers questions. An AI Employee owns a responsibility — like handling support, qualifying leads or managing bookings. It reads from your systems, takes actions in them (create a ticket, update the CRM, confirm a slot) and escalates to your team when it should.',
  },
  {
    q: 'Will it replace my team?',
    a: 'No — the goal is to remove repetitive work so your people can focus on the conversations and decisions that need a human. Sensitive actions can be routed for human approval, and everything the AI does is logged.',
  },
  {
    q: 'Do we have to replace the software we already use?',
    a: 'Not usually. We integrate with your existing CRM, ERP, databases, messaging channels and APIs. If a system genuinely needs replacing, we’ll tell you honestly — and design the migration.',
  },
  {
    q: 'How do you keep our data secure?',
    a: 'We design with least-privilege access, secure deployment and defined data boundaries from the first day, and we test permissions and failure cases before go-live. We’ll walk through the specifics for your setup during discovery.',
  },
  {
    q: 'How does a project start, and how long does it take?',
    a: 'It starts with a discovery conversation about the bottleneck. From there we scope a prototype of the core workflow so you can see it working before committing to full development. Timelines depend on integrations and complexity — we’ll give you a clear plan after discovery.',
  },
  {
    q: 'Do you work with businesses outside Bangladesh?',
    a: 'Yes. We’re built from Bangladesh and serve businesses globally, working to international engineering standards and across time zones.',
  },
];

export const interests = [
  'AI Employees',
  'Workflow automation',
  'AI-enabled ERP',
  'Custom AI',
  'Not sure yet',
];
