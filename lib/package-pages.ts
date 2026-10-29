import {
  Activity,
  Bell,
  BellRing,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  Cloud,
  ClipboardList,
  Code2,
  Copy,
  CreditCard,
  Database,
  DatabaseBackup,
  Factory,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Lock,
  Map,
  MessageCircle,
  Package,
  PackageCheck,
  PenTool,
  Plug,
  Puzzle,
  Rocket,
  ScanText,
  ScrollText,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Unplug,
  UserCheck,
  Users,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Offer pages for the packages in lib/content.ts (`packages`), one per id. Each page answers four questions for the
 * buyer: who it is for, which problem it solves, what they get, and the starting price and timeline. Prices are the
 * owner's ranges; timelines were confirmed by the owner on 2026-10-29. Personas, quotes, example scopes and
 * deliverables describe typical situations and work, not real clients or promises; the exact scope and quote follow
 * the discovery call.
 * TODO(owner): review the copy, the example scopes at each end of the price range and the FAQ answers.
 */

/** A section title: `title` then `accent` (drawn in the accent serif), with an optional lead paragraph. */
export type Heading = { title: string; accent: string; lead?: string };

export type PackagePage = {
  id: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  /** Phrase at the end of h1, drawn in the accent serif on its own line. */
  heroAccent: string;
  intro: string;
  /**
   * Direct two-to-three sentence answer naming the package, what it includes, price and timeline. Written for answer
   * engines and AI assistants: used in the Service JSON-LD description and llms-full.txt.
   */
  answer: string;
  /** What the buyer walks away with, shown as ticks in the hero. */
  outcomes: string[];
  /** Lowest price in USD (0 = free) and highest when the range is closed; feeds structured data. */
  minPrice: number;
  maxPrice?: number;
  timelineNote: string;
  /** Section titles, written per package so no two pages read the same. */
  headings: { audience: Heading; problems: Heading; deliverables: Heading; pricing: Heading; steps: Heading };
  /** Who it is for, each with the sentence they would say themselves. */
  audience: { Icon: LucideIcon; title: string; quote: string; text: string }[];
  /** "Probably not this package if…", optionally pointing to the package that fits better. */
  notFor: { text: string; alt?: string }[];
  /** Today vs. after, with what the problem costs. */
  problems: { problem: string; cost: string; fix: string }[];
  deliverables: { Icon: LucideIcon; title: string; text: string }[];
  /**
   * Paid packages: what ships as standard, written for this buyer's main worry (money and orders, rebuilding later,
   * losing control, disrupting the business). Shown as the stacked deck under the deliverables.
   */
  included?: { heading: Heading; badge: string; items: { Icon: LucideIcon; title: string; text: string }[] };
  /** Only for the free audit: what it deliberately leaves to a paid package. */
  notIncluded?: string[];
  /** Only for the free audit: why it is free, and what we need from the client. */
  whyFree?: string;
  needFromYou?: string[];
  /** What a project looks like near each end of the price range. */
  scopes: { label: string; price: string; text: string }[];
  priceFactors: string[];
  /** Real, deployed projects from lib/content.ts `projects` that show this kind of work. */
  proof?: string[];
  /** Core-service ids (lib/content.ts `coreServices`) linked from this page, and that link back to it. */
  relatedServices: string[];
  steps: { title: string; text: string }[];
  /** Search-style questions first (price, timeline, definitions): they feed FAQPage rich results and AI answers. */
  faqs: { q: string; a: string }[];
};

/** How every paid package is run. Mirrors the process copy used across the site. */
export const promises = [
  { title: 'Fixed quote first', text: 'You approve the scope and price before any work starts.' },
  { title: 'Progress you can see', text: 'Regular demos on a test link, not a reveal at the end.' },
  { title: 'Honest advice', text: 'If a simpler or cheaper option fits, we will tell you.' },
  { title: 'Support agreed up front', text: 'The plan for after launch is settled before we begin.' },
];

export const packagePages: PackagePage[] = [
  {
    id: 'audit',
    metaTitle: 'Free AI Business Audit & Readiness Assessment',
    metaDescription:
      'Free AI business audit and readiness assessment: we review your workflows, find the top 3 AI and automation opportunities, and send a roadmap in 48 hours.',
    keywords: ['free AI audit', 'AI business audit', 'AI readiness assessment', 'free AI consultation', 'AI consulting Bangladesh', 'business process audit', 'automation opportunities assessment', 'AI strategy for small business'],
    h1: 'Find what to fix first, free, in 48 hours.',
    heroAccent: 'free, in 48 hours.',
    intro:
      'A free AI readiness assessment for your business: we look at how you run today, find three practical opportunities for AI, automation or custom software, and give you a prioritised roadmap. No cost and no obligation.',
    answer:
      'The 48-Hour AI Business Audit is a free AI readiness assessment from Agentiq BD. After a short discovery call, we review your workflows, identify the top 3 opportunities for AI, automation or custom software, and deliver a prioritised roadmap within 48 hours. There is no fee and no obligation; prototypes, technical design and implementation are paid work quoted separately.',
    outcomes: ['Where your team loses the most time', 'The 3 changes worth making first', 'A roadmap you can act on, with or without us'],
    minPrice: 0,
    maxPrice: 0,
    timelineNote: 'Delivered within 48 hours after the discovery discussion and receipt of the required information.',
    headings: {
      audience: {
        title: 'For owners who know things could run',
        accent: 'better.',
        lead: 'You do not need a technical background. You only need a business with work worth improving.',
      },
      problems: {
        title: 'Running the business should not feel',
        accent: 'this manual.',
        lead: 'If two or more of these sound like your week, the audit is worth your time.',
      },
      deliverables: {
        title: 'What you walk away',
        accent: 'with.',
        lead: 'A written assessment and roadmap that you keep, whatever you decide next.',
      },
      pricing: { title: 'Free, and back to you in', accent: '48 hours.' },
      steps: { title: 'Four steps,', accent: 'zero commitment.' },
    },
    audience: [
      {
        Icon: Briefcase,
        title: 'Owners of growing SMEs',
        quote: 'My team is busy all day, but I cannot see where the hours go.',
        text: 'You want to know which manual work is worth fixing first.',
      },
      {
        Icon: Sparkles,
        title: 'Businesses curious about AI',
        quote: 'Everyone says we should use AI. Where would it actually help us?',
        text: 'You want practical uses for your business, not hype.',
      },
      {
        Icon: Unplug,
        title: 'Teams burnt by tools before',
        quote: 'We bought software once. Nobody ended up using it.',
        text: 'You want a plan grounded in how your work really runs.',
      },
      {
        Icon: Lightbulb,
        title: 'Founders planning a build',
        quote: 'Before I spend on development, I want to know what to build first.',
        text: 'You want a second opinion before committing a budget.',
      },
    ],
    notFor: [
      { text: 'You already know exactly what you want built and need a quote.', alt: 'saas-mvp' },
      { text: 'You need a working prototype or a detailed technical design. Those are part of a paid package.' },
    ],
    problems: [
      { problem: 'Your team re-types the same data into sheets, the CRM and invoices.', cost: 'Hours every week', fix: 'We map where the time goes and which steps can be automated.' },
      { problem: 'Everyone says “use AI”, but nobody can say where it would help.', cost: 'Money on the wrong tools', fix: 'You get three specific, practical opportunities, ranked by impact.' },
      { problem: 'You are not sure whether to buy a tool or build software.', cost: 'Decisions on guesswork', fix: 'We recommend the simplest option that solves it, even if that is not custom software.' },
      { problem: 'Projects start without a clear plan and then drift.', cost: 'Projects that stall', fix: 'A prioritised roadmap: what to improve first, and why.' },
    ],
    deliverables: [
      { Icon: Search, title: 'Workflow assessment', text: 'Identify repetitive tasks, operational bottlenecks and manual processes.' },
      { Icon: Lightbulb, title: 'Top 3 opportunities', text: 'Find three practical opportunities for AI, automation or custom software.' },
      { Icon: Map, title: 'Recommended action plan', text: 'Get a prioritised roadmap showing what to improve first and why.' },
      { Icon: Zap, title: '48-hour delivery', text: 'Delivered within 48 hours after the discovery discussion and receipt of the required information.' },
    ],
    notIncluded: [
      'Working prototypes or proofs of concept',
      'Detailed technical design or architecture',
      'Extensive technical research',
      'Implementation and integration',
    ],
    whyFree:
      'Good projects start from a real problem. The audit lets us both see whether there is one worth solving. If there is, you will know exactly what it would take. If there is not, you keep the roadmap and owe nothing.',
    needFromYou: ['A short discovery call', 'A few examples of the work involved', 'A list of the tools and spreadsheets you use today'],
    scopes: [],
    priceFactors: [],
    relatedServices: ['ai-agents', 'workflow-automation', 'custom-software'],
    steps: [
      { title: 'Discovery discussion', text: 'A short call about how your business runs, where work piles up and what you want to improve.' },
      { title: 'You share the details', text: 'Examples of the processes involved, the tools you use today and rough volumes.' },
      { title: 'We assess', text: 'We review the workflows, spot the bottlenecks and weigh up the options.' },
      { title: 'Your roadmap in 48 hours', text: 'The top 3 opportunities and a prioritised plan. What you do next is up to you.' },
    ],
    faqs: [
      {
        q: 'What is an AI readiness assessment?',
        a: 'An AI readiness assessment reviews how a business runs today to find where AI, automation or custom software would actually help, and what to do first. Our free 48-hour AI business audit covers a workflow assessment, the top 3 opportunities and a prioritised roadmap.',
      },
      {
        q: 'How much does an AI business audit cost?',
        a: 'Ours is free, with no obligation to continue. Paid work, such as technical design, proofs of concept and implementation, is quoted separately afterwards, and only if you want to go ahead.',
      },
      { q: 'Is the audit really free?', a: 'Yes. There is no fee and no obligation to work with us afterwards. You keep the assessment and the roadmap.' },
      {
        q: 'When does the 48 hours start?',
        a: 'After the discovery discussion, once we have received the information we need, such as examples of the processes and the tools you use.',
      },
      {
        q: 'Will you try to sell me something?',
        a: 'The audit exists to find a real problem worth solving. If one of the opportunities fits a paid package, we can scope it with you. If the honest answer is that you do not need us, we will say so.',
      },
      {
        q: 'What happens after the audit?',
        a: 'If you want to go ahead, we turn one opportunity into a scoped paid project with a clear quote and timeline. Technical design, proofs of concept and implementation all happen at that stage.',
      },
    ],
  },
  {
    id: 'commerce',
    metaTitle: 'E-commerce Website Development in Bangladesh',
    metaDescription:
      'E-commerce website development in Bangladesh with bKash, Nagad and courier integration, AI product search and AI support. From $800, live in 2–6 weeks.',
    keywords: ['ecommerce website development in Bangladesh', 'ecommerce website price in Bangladesh', 'ecommerce website with AI', 'AI ecommerce Bangladesh', 'online store development Bangladesh', 'bKash payment gateway integration', 'Nagad payment integration', 'courier API integration Pathao Steadfast RedX', 'Facebook seller website', 'Shopify WooCommerce developer Bangladesh'],
    h1: 'An online store with AI built in.',
    heroAccent: 'AI built in.',
    intro:
      'E-commerce website development in Bangladesh with bKash, Nagad and courier integration, AI product search, AI customer support and order automation, for sellers ready to move beyond taking orders in the inbox.',
    answer:
      'AI Commerce Launch is Agentiq BD’s e-commerce website development package for Bangladesh: an online store (custom, Shopify or WooCommerce) with bKash, Nagad, card and cash-on-delivery payments, courier integration with services such as Pathao, Steadfast or RedX, AI product search, an AI customer support assistant and order automation. It costs $800–$3,000 and typically launches in 2–6 weeks.',
    outcomes: ['Every order in one place, not five inboxes', 'Customers answered instantly, day and night', 'Payments and couriers connected, no copying'],
    minPrice: 800,
    maxPrice: 3000,
    timelineNote: 'From approval of the scope to launch. Payment gateway and courier account approvals can affect the date.',
    headings: {
      audience: {
        title: 'Built for sellers ready to',
        accent: 'grow past the inbox.',
        lead: 'If orders, payments and deliveries still depend on someone copying messages, this package is for you.',
      },
      problems: {
        title: 'Where your online sales',
        accent: 'leak today.',
        lead: 'Each of these costs you orders, money or time. Here is what changes once the store is live.',
      },
      deliverables: {
        title: 'Your store,',
        accent: 'fully wired.',
        lead: 'Everything needed to sell, get paid and deliver, set up and connected for you. The exact list is agreed before work starts.',
      },
      pricing: { title: 'Launch from $800, in', accent: '2–6 weeks.' },
      steps: { title: 'From first call to your', accent: 'first online order.' },
    },
    audience: [
      {
        Icon: MessageCircle,
        title: 'Facebook & Instagram sellers',
        quote: 'Orders come in all day on Messenger, and we copy every one by hand.',
        text: 'You are ready for a real store behind your social pages.',
      },
      {
        Icon: Store,
        title: 'Retailers going online',
        quote: 'Our shop does well. Now we want to sell online too.',
        text: 'You want an online channel that runs on the same stock.',
      },
      {
        Icon: ShoppingCart,
        title: 'Stores that outgrew their site',
        quote: 'The website takes orders, but everything after that is manual.',
        text: 'You want payments, couriers and updates to run on their own.',
      },
      {
        Icon: Globe,
        title: 'Brands selling near and far',
        quote: 'We need bKash and local couriers, with room to go international.',
        text: 'You want local payments today and options for tomorrow.',
      },
    ],
    notFor: [
      { text: 'You need a marketplace for many vendors, or a booking or subscription product.', alt: 'saas-mvp' },
      { text: 'You only take a few orders a week. Your social shop may be enough for now.' },
    ],
    problems: [
      { problem: 'Orders arrive in Messenger, WhatsApp and comments, then get copied by hand.', cost: 'Lost orders', fix: 'Every order lands in one place, with stock and customer details attached.' },
      { problem: 'Customers ask the same questions all day: price, size, delivery charge.', cost: 'Slow replies', fix: 'An AI assistant answers from your catalogue and policies, and hands over to you when needed.' },
      { problem: 'Fake or cancelled cash-on-delivery orders waste courier fees.', cost: 'Wasted courier fees', fix: 'Orders are confirmed by WhatsApp or SMS before a parcel is booked.' },
      { problem: 'Booking couriers and updating customers takes hours.', cost: 'Hours every day', fix: 'Courier booking and delivery updates run automatically.' },
      { problem: 'Shoppers cannot find the right product.', cost: 'Missed sales', fix: 'AI search understands requests like “red cotton saree under 3,000”.' },
    ],
    deliverables: [
      { Icon: Store, title: 'Your online store', text: 'Mobile-first store with catalogue, cart and checkout, custom-built or on Shopify or WooCommerce.' },
      { Icon: CreditCard, title: 'Payment integration', text: 'bKash, Nagad, cards through a payment gateway, and cash on delivery, using your merchant accounts.' },
      { Icon: Truck, title: 'Courier integration', text: 'Booking, tracking and status updates with couriers such as Pathao, Steadfast or RedX.' },
      { Icon: Search, title: 'AI product discovery', text: 'Search and recommendations that understand what shoppers mean, plus AI-drafted product descriptions you approve.' },
      { Icon: MessageCircle, title: 'AI customer support', text: 'An assistant on your site, Messenger or WhatsApp that answers from your products and policies, with human handover.' },
      { Icon: Zap, title: 'Order automation', text: 'Order and COD confirmation messages, low-stock alerts and a daily order summary.' },
      { Icon: LayoutDashboard, title: 'Admin, training & handover', text: 'A dashboard for orders, products and customers, with training and documentation for your team.' },
    ],
    included: {
      heading: {
        title: 'Sell with confidence,',
        accent: 'from day one.',
        lead: 'Your store handles real money and real customers from the first order, so these come built in.',
      },
      badge: 'Built for real orders',
      items: [
        { Icon: Lock, title: 'Secure checkout', text: 'Card payments are handled by the payment gateway, not stored on your site.' },
        { Icon: PackageCheck, title: 'Tested with real orders', text: 'Test orders go through every payment method and courier before launch.' },
        { Icon: Smartphone, title: 'Built for phones first', text: 'Designed and checked on mobile, where most of your customers shop.' },
        { Icon: GraduationCap, title: 'Your team trained', text: 'Hands-on training to add products, manage orders and handle returns.' },
        { Icon: LifeBuoy, title: 'Support as you grow', text: 'Fixes and help after go-live, under a support plan agreed before we start.' },
      ],
    },
    scopes: [
      {
        label: 'Starting scope',
        price: 'from $800',
        text: 'A launch-ready store: catalogue, cart and checkout, one payment method, one courier and AI-drafted product descriptions.',
      },
      {
        label: 'Full scope',
        price: 'up to $3,000',
        text: 'Several payment methods and couriers, AI search, an AI support assistant on your chat channels, COD confirmation and order automation.',
      },
    ],
    priceFactors: [
      'Number of products and categories',
      'Custom design or an adapted theme',
      'How many payment methods and couriers',
      'Which AI features and chat channels',
      'Moving products and orders from an existing store',
    ],
    relatedServices: ['chatbots', 'integrations', 'workflow-automation'],
    steps: [
      { title: 'Scope call', text: 'Your products, channels, payment methods and couriers, and how orders are handled today.' },
      { title: 'Plan & quote', text: 'A fixed scope, price and launch date for you to approve before any work starts.' },
      { title: 'Build & integrate', text: 'We build the store and connect payments, couriers and AI, and you review it on a test link.' },
      { title: 'Launch & handover', text: 'Go live, train your team and agree the support plan.' },
    ],
    faqs: [
      {
        q: 'How much does an e-commerce website cost in Bangladesh?',
        a: 'With Agentiq BD, AI Commerce Launch costs $800–$3,000. The starting scope is a launch-ready store with one payment method and one courier; the full scope adds more payment methods and couriers, AI search, an AI support assistant and order automation. You get a fixed quote before any work starts.',
      },
      {
        q: 'How long does it take to build an e-commerce website?',
        a: 'Typically 2–6 weeks from approval of the scope to launch. Payment gateway and courier account approvals can affect the date, so we start those early.',
      },
      {
        q: 'Can you integrate bKash, Nagad and couriers like Pathao, Steadfast and RedX?',
        a: 'Yes. Payment integration covers bKash, Nagad, cards through a payment gateway and cash on delivery. Courier integration covers booking, tracking and delivery updates with couriers such as Pathao, Steadfast or RedX, using your own merchant and courier accounts.',
      },
      {
        q: 'Shopify, WooCommerce or custom-built?',
        a: 'It depends on your catalogue, budget and plans. We recommend one in the scope call. Shopify and WooCommerce are usually faster to launch; custom-built suits unusual flows or deeper integrations.',
      },
      {
        q: 'Do I need my own bKash or Nagad merchant account?',
        a: 'Yes. Payments go to your business account, so the merchant accounts are in your name. We help with the setup, and approval times can affect the launch date.',
      },
      {
        q: 'Can the AI assistant answer in Bangla?',
        a: 'Yes, in Bangla and English. It answers from your own product data and policies, hands over to a person when it is unsure, and we test it with real customer questions before launch.',
      },
      { q: 'What happens after launch?', a: 'We agree a support plan before we start, covering fixes, small changes and help as your store grows.' },
    ],
  },
  {
    id: 'saas-mvp',
    metaTitle: 'SaaS & MVP Development Company in Bangladesh',
    metaDescription:
      'SaaS and MVP development in Bangladesh: web apps, SaaS platforms, portals, internal tools and APIs, scoped to launch fast. From $1,500, in 4–12 weeks.',
    keywords: ['MVP development company', 'SaaS development company', 'SaaS MVP development cost', 'MVP development services', 'custom software development company in Bangladesh', 'web application development Bangladesh', 'startup software development', 'SaaS product development', 'internal tools development'],
    h1: 'Turn your software idea into a product people can use.',
    heroAccent: 'a product people can use.',
    intro:
      'SaaS and MVP development for founders and businesses: web applications, SaaS platforms, business portals, internal tools and APIs, scoped to the smallest version that proves the idea, then built to grow.',
    answer:
      'Custom Software & SaaS MVP is Agentiq BD’s software development package for startups, founders and businesses with unique requirements: product scoping, UX/UI design, a web application with accounts, roles and an admin panel, integrations and APIs, AI features where useful, and cloud deployment with documentation. It costs $1,500–$8,000+ and the first version typically launches in 4–12 weeks.',
    outcomes: ['A first version in real users’ hands', 'Built to grow, not to be rebuilt', 'Demos at every step, so nothing is a surprise'],
    minPrice: 1500,
    timelineNote: 'From approval of the scope to launch of the first version. Larger platforms ship in stages.',
    headings: {
      audience: {
        title: 'For founders and teams with an idea',
        accent: 'worth building.',
        lead: 'You know the problem and the people who have it. You need the product built properly.',
      },
      problems: {
        title: 'Why good software ideas',
        accent: 'stall.',
        lead: 'Most ideas do not fail on the idea. They fail on the build. Here is how we avoid that.',
      },
      deliverables: {
        title: 'From idea to a product',
        accent: 'people can log into.',
        lead: 'Every piece needed to launch version one. The exact list is agreed with you in the scope.',
      },
      pricing: { title: 'Start from $1,500. Launch in', accent: '4–12 weeks.' },
      steps: { title: 'A clear path from idea to', accent: 'launch day.' },
    },
    audience: [
      {
        Icon: Rocket,
        title: 'Founders with an idea to prove',
        quote: 'I know the problem. I need a team to build version one.',
        text: 'You want real users on a real product, fast.',
      },
      {
        Icon: Users,
        title: 'Startups without a tech team',
        quote: 'We are ready to ship, but we do not have developers.',
        text: 'You want one partner for design, build and launch.',
      },
      {
        Icon: Package,
        title: 'Businesses productising a tool',
        quote: 'Our internal tool works so well that others would pay for it.',
        text: 'You want to turn it into a product other companies can use.',
      },
      {
        Icon: Puzzle,
        title: 'Teams with a unique workflow',
        quote: 'Nothing off the shelf fits how we actually work.',
        text: 'You want software built around your process.',
      },
    ],
    notFor: [
      { text: 'You need a standard online store.', alt: 'commerce' },
      { text: 'You need inventory, procurement or multi-branch operations software.', alt: 'business-software' },
    ],
    problems: [
      { problem: 'The idea is clear, but you have no technical team.', cost: 'Months of waiting', fix: 'One team handles scoping, design, build and deployment.' },
      { problem: 'Quotes cover a huge scope before the idea is proven.', cost: 'Budget gone before launch', fix: 'We scope the smallest version that tests the idea with real users.' },
      { problem: 'Workarounds around off-the-shelf tools keep piling up.', cost: 'Endless workarounds', fix: 'Software built around your workflow, not the other way round.' },
      { problem: 'Past builds were hard to maintain or hand over.', cost: 'Code nobody can touch', fix: 'Clean code, documentation and a handover the next developer can pick up.' },
    ],
    deliverables: [
      { Icon: ClipboardList, title: 'Product scope & MVP plan', text: 'The users, the core workflow and the smallest feature set worth launching.' },
      { Icon: PenTool, title: 'UX & UI design', text: 'Key screens designed and clickable, so you can review the flow before it is built.' },
      { Icon: Code2, title: 'Web application', text: 'Frontend, backend and database, built for real users from day one.' },
      { Icon: Lock, title: 'Accounts, roles & admin', text: 'Sign-up, login, permissions and an admin panel to run the product.' },
      { Icon: Webhook, title: 'Integrations & APIs', text: 'Payments, email and SMS, third-party services, and an API of your own if needed.' },
      { Icon: Sparkles, title: 'AI features where they help', text: 'Search, assistants or document processing, added only where they make the product better.' },
      { Icon: Cloud, title: 'Deployment & handover', text: 'Hosted on the cloud with monitoring, documentation and a support plan.' },
    ],
    included: {
      heading: {
        title: 'Built to grow,',
        accent: 'not to be rebuilt.',
        lead: 'Whether version two is easy is decided in version one. These are part of every MVP we build.',
      },
      badge: 'Founder-friendly by default',
      items: [
        { Icon: Layers, title: 'Foundations that scale', text: 'An architecture chosen so new features and more users fit without a rewrite.' },
        { Icon: KeyRound, title: 'Accounts done properly', text: 'Login, permissions and data separation handled right from the first release.' },
        { Icon: FlaskConical, title: 'Tested before users see it', text: 'We test the failure cases, not only the happy path.' },
        { Icon: Activity, title: 'Monitoring from launch', text: 'You can see that it is running, and we are alerted when it is not.' },
        { Icon: FileText, title: 'A clean handover', text: 'Documented code and a handover your next developer can pick up.' },
      ],
    },
    scopes: [
      { label: 'Starting scope', price: 'from $1,500', text: 'A focused MVP: one core workflow, user accounts and an admin panel, deployed and ready for first users.' },
      { label: 'Full scope', price: '$8,000+', text: 'A multi-role SaaS platform with subscriptions, integrations, dashboards and AI features.' },
    ],
    priceFactors: [
      'Number of user roles and screens',
      'Integrations with other systems',
      'AI features',
      'Depth of design work',
      'Subscriptions, billing and multi-tenancy',
    ],
    proof: ['matrimony-platform', 'learning-platform'],
    relatedServices: ['custom-software', 'ai-agents', 'integrations'],
    steps: [
      { title: 'Discovery & scope', text: 'We agree the users, the core workflow and what version one must do.' },
      { title: 'Design', text: 'Key screens designed and clicked through with you before the build starts.' },
      { title: 'Build in sprints', text: 'Working software at each step, with demos on a test link so you see progress.' },
      { title: 'Launch & handover', text: 'Deployed with monitoring, documentation and a plan for what comes next.' },
    ],
    faqs: [
      {
        q: 'How much does it cost to build a SaaS MVP?',
        a: 'With Agentiq BD, from $1,500 for a focused MVP (one core workflow, user accounts and an admin panel) to $8,000+ for a multi-role SaaS platform with subscriptions, integrations, dashboards and AI features. You get a fixed quote after the discovery call.',
      },
      {
        q: 'How long does MVP development take?',
        a: 'Typically 4–12 weeks from approval of the scope to launch of the first version, with demos on a test link along the way. Larger platforms ship in stages.',
      },
      {
        q: 'What is an MVP in software development?',
        a: 'An MVP (minimum viable product) is the smallest version of a product that real users can use to test the idea. It covers the core workflow properly and leaves the rest for later, so you learn from users before spending the full budget.',
      },
      { q: 'Can we start small and grow later?', a: 'Yes. That is the point of an MVP. We plan version one so later features fit without a rebuild.' },
      { q: 'Will I see progress during the build?', a: 'Yes. You get regular demos on a test link and can give feedback as we go, not only at the end.' },
      {
        q: 'Can you add AI to the product?',
        a: 'Yes, where it makes the product better, for example search, assistants or document processing. We will tell you when a simpler feature does the job.',
      },
      { q: 'What happens after launch?', a: 'We agree a support plan before we start, covering fixes, monitoring and the next round of features.' },
    ],
  },
  {
    id: 'automation',
    metaTitle: 'AI Workflow Automation Services in Bangladesh',
    metaDescription:
      'AI workflow automation: connect your tools, automate data entry and documents, and add an AI knowledge base for staff. From $500, live in 1–4 weeks.',
    keywords: ['AI workflow automation', 'workflow automation services', 'AI automation agency', 'AI automation agency Bangladesh', 'business process automation Bangladesh', 'document processing automation', 'AI knowledge base for employees', 'automate data entry', 'CRM automation', 'WhatsApp automation for business'],
    h1: 'Take the repetitive work off your team’s plate.',
    heroAccent: 'off your team’s plate.',
    intro:
      'AI workflow automation that connects the tools you already use, processes documents and data entry, and adds an AI knowledge base so your team finds answers and finishes routine work faster.',
    answer:
      'AI & Workflow Automation is Agentiq BD’s automation package: workflows that connect the tools a business already uses (CRM, sheets, email, WhatsApp, accounting), AI document processing with human review for exceptions, an AI knowledge base assistant over SOPs and policies, and alerts and scheduled reports. It costs $500–$2,500 and typically goes live in 1–4 weeks.',
    outcomes: ['Repetitive tasks handled automatically', 'Documents read and filed for you', 'Answers from your own SOPs and policies'],
    minPrice: 500,
    maxPrice: 2500,
    timelineNote: 'From approval of the scope to go-live. Several workflows can go live one at a time.',
    headings: {
      audience: {
        title: 'For teams doing the same task',
        accent: 'again and again.',
        lead: 'If your people spend their day moving information around instead of using it, start here.',
      },
      problems: {
        title: 'The busywork quietly',
        accent: 'eating your week.',
        lead: 'None of these feel big on their own. Added up, they cost your team days every month.',
      },
      deliverables: {
        title: 'Automations and an AI assistant,',
        accent: 'working for your team.',
        lead: 'Built on the tools you already use. The exact list is agreed with you before work starts.',
      },
      pricing: { title: 'Start from $500. Live in', accent: '1–4 weeks.' },
      steps: { title: 'Live in weeks,', accent: 'not months.' },
    },
    audience: [
      {
        Icon: Copy,
        title: 'Teams copying data between tools',
        quote: 'We copy the same lead into three different places.',
        text: 'You want information to move between your tools on its own.',
      },
      {
        Icon: FileText,
        title: 'Document-heavy businesses',
        quote: 'Someone types in every invoice by hand.',
        text: 'You want documents read and entered for you, with checks.',
      },
      {
        Icon: BookOpen,
        title: 'Teams that need a knowledge base',
        quote: 'New staff ask the same policy questions every single day.',
        text: 'You want answers from your own SOPs, available to everyone.',
      },
      {
        Icon: Plug,
        title: 'Businesses with tools in place',
        quote: 'We pay for good tools. They just do not talk to each other.',
        text: 'You want more from what you have, not a new platform.',
      },
    ],
    notFor: [
      { text: 'You need a whole new operational platform.', alt: 'business-software' },
      { text: 'The process changes every week. Settle the process first; the free audit can help.', alt: 'audit' },
    ],
    problems: [
      { problem: 'Leads and requests wait hours before someone copies them into the CRM.', cost: 'Leads gone cold', fix: 'They are captured, sorted and routed automatically.' },
      { problem: 'Invoices and forms are typed in by hand.', cost: 'Hours of typing', fix: 'AI reads the documents and fills your system; a person checks the exceptions.' },
      { problem: 'Staff keep asking the same questions about policies and procedures.', cost: 'Experts interrupted', fix: 'A knowledge assistant answers from your own documents and shows the source.' },
      { problem: 'The weekly report takes half a day.', cost: 'Half a day lost', fix: 'Reports are assembled and sent on schedule.' },
    ],
    deliverables: [
      { Icon: Workflow, title: 'Workflow automation', text: 'One or more workflows across your tools: trigger, steps, approvals and notifications.' },
      { Icon: Plug, title: 'Tool integrations', text: 'Your CRM, sheets, email, WhatsApp, accounting and other tools connected through their APIs.' },
      { Icon: ScanText, title: 'Document processing', text: 'Data pulled from PDFs and images, checked, and sent to your system, with a review queue for exceptions.' },
      { Icon: BookOpen, title: 'AI knowledge assistant', text: 'Answers over your SOPs, policies and FAQs, with sources and access control, for staff or customers.' },
      { Icon: Bell, title: 'Alerts & scheduled reports', text: 'The right people told when something needs attention, and reports sent on schedule.' },
      { Icon: Activity, title: 'Monitoring, docs & training', text: 'You can see it running, your team knows how it works, and the support plan is agreed.' },
    ],
    included: {
      heading: {
        title: 'Automation you can',
        accent: 'trust and check.',
        lead: 'Handing work to software only works if you stay in control. These come with every automation.',
      },
      badge: 'You stay in control',
      items: [
        { Icon: UserCheck, title: 'A person in the loop', text: 'Uncertain cases go to someone on your team for review instead of being guessed.' },
        { Icon: ScrollText, title: 'Every action logged', text: 'A full record of what ran, what changed and when, for you to review.' },
        { Icon: KeyRound, title: 'Only the access it needs', text: 'Each automation gets the minimum permissions in your tools, nothing more.' },
        { Icon: BellRing, title: 'Alerts when a step fails', text: 'The right person is told straight away, so nothing fails silently.' },
        { Icon: GraduationCap, title: 'Your team can adjust it', text: 'Training and docs so your staff understand it and can change simple rules.' },
      ],
    },
    scopes: [
      { label: 'Starting scope', price: 'from $500', text: 'One workflow automated end to end between the tools you already use.' },
      {
        label: 'Full scope',
        price: 'up to $2,500',
        text: 'Several connected workflows, document processing and an AI knowledge assistant for your team.',
      },
    ],
    priceFactors: [
      'Number of workflows',
      'Number of tools and APIs to connect',
      'Volume and variety of documents',
      'Size of the knowledge base',
      'Approval steps and access rules',
    ],
    proof: ['marketing-automation'],
    relatedServices: ['workflow-automation', 'knowledge-rag', 'integrations'],
    steps: [
      { title: 'Map the process', text: 'We walk through the work as it happens today, with real examples.' },
      { title: 'Agree what to automate', text: 'A fixed scope and price, including where a person stays in the loop.' },
      { title: 'Build & test', text: 'Built and tested with your real documents, data and questions.' },
      { title: 'Go live & monitor', text: 'Switched on with monitoring, documentation and training for your team.' },
    ],
    faqs: [
      {
        q: 'What is AI workflow automation?',
        a: 'AI workflow automation lets software handle the repetitive steps between your tools, such as capturing a lead, reading a document, updating the CRM and sending a follow-up, with AI for steps that need understanding and a person in the loop for anything uncertain.',
      },
      {
        q: 'How much does workflow automation cost?',
        a: 'With Agentiq BD, from $500 for one workflow automated end to end to $2,500 for several connected workflows, document processing and an AI knowledge assistant. You get a fixed quote before work starts.',
      },
      {
        q: 'Can you build an AI knowledge base for our employees?',
        a: 'Yes. The AI knowledge assistant answers staff questions from your own SOPs, policies and FAQs, shows the source of each answer, and only uses the documents each person is allowed to see.',
      },
      { q: 'Do we need to replace our current tools?', a: 'No. This package connects and automates the tools you already use.' },
      {
        q: 'What if the AI gets something wrong?',
        a: 'Uncertain documents go to a review queue for a person to check, and the knowledge assistant shows its source and says when it does not know rather than guessing.',
      },
      { q: 'Can the knowledge assistant be private to our staff?', a: 'Yes. Access is controlled, so each person only sees answers from the documents they are allowed to see.' },
      {
        q: 'Which tools can you connect?',
        a: 'If a tool has an API or a reliable export, we can usually connect it. We confirm each one during scoping, before you approve the quote.',
      },
    ],
  },
  {
    id: 'business-software',
    metaTitle: 'Custom ERP & Inventory Software in Bangladesh',
    metaDescription:
      'Custom ERP and inventory software in Bangladesh for manufacturing, procurement, logistics and multi-branch teams. From $3,000, rolled out in phases.',
    keywords: ['ERP software in Bangladesh', 'custom ERP development Bangladesh', 'ERP software price in Bangladesh', 'inventory management software Bangladesh', 'manufacturing ERP software Bangladesh', 'procurement software', 'multi-branch business software', 'warehouse management software', 'AI ERP'],
    h1: 'One system, built around how you work.',
    heroAccent: 'around how you work.',
    intro:
      'Custom ERP and inventory management software for manufacturing, procurement, logistics and multi-branch operations, with management reporting and AI built in where it adds real value.',
    answer:
      'Custom Business Software is Agentiq BD’s custom ERP development package for businesses in Bangladesh and abroad: inventory, procurement, production, logistics and multi-branch modules, role-based access, management dashboards, AI shortage and exception alerts, data migration and integrations, rolled out in phases with training. It costs $3,000–$15,000+ and typically takes 8–20 weeks, with the first module live early.',
    outcomes: ['One source of truth for stock, orders and production', 'Shortages flagged before they stop work', 'Every branch on one dashboard'],
    minPrice: 3000,
    timelineNote: 'Delivered in phases: the first module goes live before the full system is complete.',
    headings: {
      audience: {
        title: 'For businesses that have outgrown',
        accent: 'spreadsheets.',
        lead: 'When the business runs on numbers nobody fully trusts, it is time for one system.',
      },
      problems: {
        title: 'When the numbers',
        accent: 'do not add up.',
        lead: 'Disconnected tools hide problems until they are expensive. Here is what changes with one platform.',
      },
      deliverables: {
        title: 'One platform for',
        accent: 'every part of the operation.',
        lead: 'Designed around how you work, and rolled out in phases. The exact modules are agreed with you.',
      },
      pricing: { title: 'Start from $3,000, delivered', accent: 'in phases.' },
      steps: { title: 'Rolled out module by module,', accent: 'not all at once.' },
    },
    audience: [
      {
        Icon: Factory,
        title: 'Manufacturers',
        quote: 'Production stopped because nobody saw the shortage coming.',
        text: 'You need procurement, stock and production on the same numbers.',
      },
      {
        Icon: Truck,
        title: 'Distributors & logistics',
        quote: 'Every warehouse has its own version of the stock.',
        text: 'You need one view of stock, dispatch and deliveries.',
      },
      {
        Icon: Building2,
        title: 'Multi-branch businesses',
        quote: 'I wait days for every branch to send its report.',
        text: 'You want every branch on one live dashboard.',
      },
      {
        Icon: FileSpreadsheet,
        title: 'Companies outgrowing spreadsheets',
        quote: 'The whole business runs on spreadsheets, and it shows.',
        text: 'You need a system that keeps up with how you have grown.',
      },
    ],
    notFor: [
      { text: 'A standard accounting or POS package already fits. We will tell you if it does.' },
      { text: 'You only need one or two processes automated.', alt: 'automation' },
    ],
    problems: [
      { problem: 'Stock numbers differ between the warehouse, the sheets and the accounts.', cost: 'Wrong stock decisions', fix: 'One source of truth, updated as work happens.' },
      { problem: 'Shortages are discovered when production stops.', cost: 'Stopped production', fix: 'AI-assisted alerts flag shortages and exceptions early.' },
      { problem: 'Each branch reports differently, and late.', cost: 'Late decisions', fix: 'Every branch on one system, with management on one dashboard.' },
      { problem: 'Purchase approvals live in WhatsApp chats.', cost: 'No audit trail', fix: 'A procurement workflow with approvals and a full audit trail.' },
    ],
    deliverables: [
      { Icon: Map, title: 'Process mapping & system design', text: 'How your operation runs, turned into a system plan you approve.' },
      { Icon: Boxes, title: 'Core modules', text: 'Inventory, procurement, production, logistics or sales, chosen to fit your business.' },
      { Icon: Building2, title: 'Multi-branch & roles', text: 'Branches, warehouses and people, each with the access they need.' },
      { Icon: LayoutDashboard, title: 'Dashboards & reports', text: 'Management reporting from live data, on screen and on schedule.' },
      { Icon: Sparkles, title: 'AI where it adds value', text: 'Shortage and exception detection, document intake and early warnings.' },
      { Icon: Database, title: 'Data migration & integrations', text: 'Your spreadsheets and existing systems brought in, and accounting connected.' },
      { Icon: GraduationCap, title: 'Phased rollout & training', text: 'Module by module, with training, documentation and a support plan.' },
    ],
    included: {
      heading: {
        title: 'Rolled out without',
        accent: 'stopping the business.',
        lead: 'Changing the system your operation runs on is a big step. These keep it safe at every stage.',
      },
      badge: 'Low-risk rollout',
      items: [
        { Icon: Layers, title: 'Phased go-live', text: 'One module at a time, so daily work never stops for a big-bang switch.' },
        { Icon: DatabaseBackup, title: 'Data moved and checked', text: 'Your existing data cleaned, migrated and verified before anyone relies on it.' },
        { Icon: KeyRound, title: 'Access by role and branch', text: 'Each branch, team and person sees and changes only what they should.' },
        { Icon: ScrollText, title: 'A full audit trail', text: 'Every approval and change is logged and reviewable.' },
        { Icon: GraduationCap, title: 'Training as each module lands', text: 'Each team is trained when its part of the system goes live.' },
      ],
    },
    scopes: [
      { label: 'Starting scope', price: 'from $3,000', text: 'One core module, such as inventory or procurement, with roles, dashboards and data migration.' },
      {
        label: 'Full scope',
        price: '$15,000+',
        text: 'A multi-module, multi-branch platform with AI-assisted alerts, integrations and management reporting.',
      },
    ],
    priceFactors: [
      'Number of modules',
      'Number of branches, warehouses and user roles',
      'Integrations with accounting and existing systems',
      'Amount and condition of data to migrate',
      'AI features',
    ],
    proof: ['pharma-erp'],
    relatedServices: ['business-systems', 'reporting', 'custom-software'],
    steps: [
      { title: 'Discovery & process mapping', text: 'We walk the floor with you, on site or on calls, and map how work and data move.' },
      { title: 'Design & phase plan', text: 'The system design and a phased plan, with the first module agreed.' },
      { title: 'Build & roll out', text: 'Module by module, each tested with your team before it goes live.' },
      { title: 'Training & support', text: 'Your staff trained, documentation handed over and the support plan in place.' },
    ],
    faqs: [
      {
        q: 'How much does ERP software cost in Bangladesh?',
        a: 'A custom ERP from Agentiq BD starts at $3,000 for one core module, such as inventory or procurement, and goes to $15,000+ for a multi-module, multi-branch platform. It is rolled out in phases, and you get a fixed quote before work starts.',
      },
      {
        q: 'Do you build inventory management software?',
        a: 'Yes. Inventory is one of the core modules: stock across warehouses and branches, low-stock and shortage alerts, procurement and purchase approvals, and reporting, connected to your accounting where needed.',
      },
      { q: 'Can we keep our accounting software?', a: 'Usually, yes. We connect to it rather than replace it, and confirm how during discovery.' },
      { q: 'Can you move our existing data across?', a: 'Yes. We migrate from spreadsheets and existing systems, cleaning and checking the data on the way in.' },
      {
        q: 'Custom ERP or ready-made ERP software: which should we choose?',
        a: 'A custom system fits how you actually work, with no paying for modules you never use. If an off-the-shelf package suits you better, we will say so.',
      },
      { q: 'Do we have to wait for the whole system?', a: 'No. It goes live in phases, so the first module is in use while the next ones are built.' },
    ],
  },
];

export const packagePageById = (id: string) => packagePages.find((p) => p.id === id);
