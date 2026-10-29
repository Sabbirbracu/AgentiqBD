/**
 * One landing page per core service (/services/<id>) — the pages that can rank for specific searches such as
 * "AI chatbot development" or "workflow automation Bangladesh". `id` matches `coreServices` in content.ts.
 *
 * Writing rules (same as the rest of the site): our own wording, no invented metrics, clients, prices or
 * timelines. `answer` is the one-paragraph definition that search engines and AI assistants quote, so it must
 * stand on its own and name the service, what it does and who it is for.
 */
export type ServicePage = {
  id: string;
  /** <title> without the site suffix — keep under ~55 characters. */
  metaTitle: string;
  /** ≤ 155 characters. */
  metaDescription: string;
  h1: string;
  answer: string;
  /** Search phrases this page is written for (metadata keywords + sitemap review). */
  keywords: string[];
  build: string[];
  fit: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    id: 'ai-agents',
    metaTitle: 'AI Agent Development & Agentic AI in Bangladesh',
    metaDescription:
      'AI agents and agentic AI for support, leads and bookings, connected to your systems with clear limits and human approval. Built by Agentiq BD, Bangladesh.',
    h1: 'AI agents that handle support, leads and bookings',
    answer:
      'An AI agent is software that takes a request, decides the next step and carries it out inside your business tools. Working towards a goal over several steps like this, rather than answering a single prompt, is what is meant by agentic AI. Agentiq BD, an AI engineering company in Dhaka, Bangladesh, builds AI agents we call AI Employees. Each one is scoped to a single job, such as answering customers, qualifying leads or booking appointments, with only the permissions that job needs.',
    keywords: [
      'AI agents',
      'AI agent development',
      'agentic AI',
      'what is agentic AI',
      'what is an AI agent',
      'what are AI agents',
      'AI agent development company',
      'AI agents for business',
      'AI agent development Bangladesh',
      'AI employees',
    ],
    build: [
      'Support agents that answer from your own knowledge base and hand over to a person when needed',
      'Lead agents that capture enquiries, ask qualifying questions and update your CRM',
      'Booking agents that check availability and confirm appointments',
      'Human-approval steps for anything sensitive, with an audit trail of what the agent did',
      'Connections to the channels and systems you already use: website, WhatsApp, email, CRM, calendar',
    ],
    fit: [
      'Teams answering the same customer questions every day',
      'Businesses losing leads because enquiries are answered late',
      'Service businesses that run on appointments and follow-ups',
    ],
    faqs: [
      {
        q: 'What is an AI Employee?',
        a: 'An AI Employee is an AI agent given one defined job, such as support, lead handling or bookings. It works inside your systems with limited permissions, asks for human approval on sensitive actions, and keeps a record of what it did.',
      },
      {
        q: 'What is agentic AI?',
        a: 'Agentic AI is AI that works towards a goal over several steps. It plans what to do, uses tools such as your CRM or calendar, checks the result and decides what comes next, instead of only replying to one prompt. AI agents are how agentic AI is put to work. In a business we keep them tightly scoped: one job, limited permissions and human approval for sensitive actions.',
      },
      {
        q: 'What is the difference between an AI agent and a chatbot?',
        a: 'A chatbot answers questions in a conversation. An AI agent can also take actions: look up an order, update a record, book a slot or raise a ticket. Many projects use both, with a chat window in front and an agent doing the work behind it.',
      },
      {
        q: 'What are AI agents used for in business?',
        a: 'Common uses are customer support, lead qualification, appointment booking, document processing and internal requests. A good first agent usually takes on a repetitive task with clear rules that your team handles many times a day.',
      },
      {
        q: 'Will an AI agent replace my team?',
        a: 'The aim is to take repetitive first-line work off your team, not to remove people. Agents hand over to a person whenever a case needs judgment, and you decide where that line sits.',
      },
      {
        q: 'Can the agent work in Bangla and English?',
        a: 'Language support is confirmed during discovery for your channel and use case. Tell us the languages your customers use and we will say honestly what works well today.',
      },
    ],
    related: ['chatbots', 'workflow-automation', 'integrations'],
  },
  {
    id: 'chatbots',
    metaTitle: 'AI Chatbot Development for Website & WhatsApp',
    metaDescription:
      'Custom AI chatbots for your website, WhatsApp and Messenger that answer from your own knowledge base and hand over to a human. Built by Agentiq BD, Dhaka.',
    h1: 'AI chatbot development for your website, WhatsApp and Messenger',
    answer:
      'An AI chatbot is a chat assistant that answers customer questions in natural language. Agentiq BD builds AI chatbots for websites, WhatsApp and Messenger that answer from your own documents and policies instead of guessing, and hand the conversation to a person when it matters.',
    keywords: [
      'AI chatbot development',
      'custom chatbot for business',
      'WhatsApp chatbot for business',
      'website chatbot',
      'AI chatbot Bangladesh',
      'Messenger chatbot',
    ],
    build: [
      'Website chat widgets trained on your own content',
      'WhatsApp and Messenger assistants for enquiries, orders and follow-up',
      'Answers grounded in your knowledge base, with sources you can review',
      'Human handoff with the full conversation passed on',
      'Lead capture that writes into your CRM or spreadsheet',
    ],
    fit: [
      'Businesses that get most enquiries through WhatsApp or Messenger',
      'Teams with a website full of questions that never get answered after hours',
      'Companies with documentation customers rarely read',
    ],
    faqs: [
      {
        q: 'How is an AI chatbot different from a normal chatbot?',
        a: 'A rule-based chatbot follows fixed menus. An AI chatbot understands free-text questions and answers from your own material, so customers can ask in their own words. We keep it grounded in your content and add a handoff to a person.',
      },
      {
        q: 'Can you connect a chatbot to WhatsApp?',
        a: 'Yes. We build WhatsApp assistants that sit alongside your existing number and workflow. The exact setup depends on the WhatsApp Business options available to you, which we confirm during discovery.',
      },
      {
        q: 'What happens when the chatbot does not know the answer?',
        a: 'It says so and passes the conversation to your team instead of inventing an answer. You choose who receives it and how.',
      },
    ],
    related: ['ai-agents', 'knowledge-rag', 'voice'],
  },
  {
    id: 'voice',
    metaTitle: 'AI Voice Agents That Answer Calls & Book',
    metaDescription:
      'AI voice agents that answer calls, take bookings and arrange call-backs, connected to your calendar and CRM. Built by Agentiq BD in Dhaka, Bangladesh.',
    h1: 'AI voice agents that answer calls and take bookings',
    answer:
      'An AI voice agent is an assistant that speaks with callers, understands what they need and completes the task. Agentiq BD builds AI voice agents that answer calls, take bookings and arrange call-backs, connected to your calendar and CRM so nothing is lost between the call and your records.',
    keywords: [
      'AI voice agent',
      'AI voice agents',
      'voice AI agent',
      'AI voice assistant for business',
      'AI receptionist',
      'AI phone agent',
      'AI call answering',
    ],
    build: [
      'Call answering for common questions, opening hours and directions',
      'Appointment booking against your real calendar',
      'Call-back requests logged with the caller’s details and reason',
      'Handover to a person for urgent or complex calls',
      'Call summaries sent to your CRM or inbox',
    ],
    fit: [
      'Clinics, salons and service businesses that miss calls while busy',
      'Teams that lose bookings outside office hours',
      'Businesses that want every call logged and summarised',
    ],
    faqs: [
      {
        q: 'Can a voice agent book appointments?',
        a: 'Yes. It checks availability in your calendar, confirms a slot with the caller and records the booking, with a confirmation sent by message if you want one.',
      },
      {
        q: 'What if the caller wants a person?',
        a: 'The agent transfers or arranges a call-back. You decide which situations always go to a person, such as urgent or sensitive calls.',
      },
      {
        q: 'Does it work in Bangla?',
        a: 'Language quality varies by use case and phone line, so we test with your real call scenarios during discovery and tell you plainly what works before you commit.',
      },
    ],
    related: ['ai-agents', 'chatbots', 'integrations'],
  },
  {
    id: 'workflow-automation',
    metaTitle: 'AI Workflow & Business Process Automation',
    metaDescription:
      'Automate the hand-offs between your tools: lead capture to CRM, document intake, notifications and reports. AI workflow automation by Agentiq BD, Dhaka.',
    h1: 'AI workflow automation for the work between your tools',
    answer:
      'AI workflow automation connects the steps of a business process so they run without manual hand-offs. Agentiq BD automates work such as capturing a request, updating the CRM, sending the follow-up and building the report, using AI where a step needs reading, classifying or deciding.',
    keywords: [
      'AI workflow automation',
      'business process automation',
      'business automation Bangladesh',
      'workflow automation company',
      'document processing automation',
      'lead to CRM automation',
    ],
    build: [
      'Lead capture that creates the CRM record and sends the first follow-up',
      'Document intake: read invoices or forms, validate them and update the system',
      'Notifications and reminders triggered by real events',
      'Scheduled reports built and delivered automatically',
      'Approval steps where a person must confirm before the workflow continues',
    ],
    fit: [
      'Teams copying data between spreadsheets, email and a CRM',
      'Operations that depend on someone remembering the next step',
      'Businesses ready to automate one repetitive process first',
    ],
    faqs: [
      {
        q: 'Which process should we automate first?',
        a: 'Usually the one that is repetitive, happens often and has a clear start and finish, such as lead follow-up or document intake. Discovery is where we choose it with you.',
      },
      {
        q: 'Do we need to replace our existing tools?',
        a: 'No. We connect the tools you already use through their integrations and APIs, so your team keeps working the way it does now.',
      },
      {
        q: 'Is it automation or AI?',
        a: 'Often both. Plain automation handles fixed steps, and AI handles the steps that need reading or judgment. If simple automation is enough, we will say so.',
      },
    ],
    related: ['integrations', 'reporting', 'ai-agents'],
  },
  {
    id: 'knowledge-rag',
    metaTitle: 'AI Knowledge Base Software & RAG Development',
    metaDescription:
      'Custom AI-powered knowledge base software for internal search and customer Q&A over your PDFs, policies and SOPs, built with RAG by Agentiq BD.',
    h1: 'AI knowledge base software that answers from your own documents',
    answer:
      'Knowledge base software stores a company’s documents and helps people find answers in them. AI knowledge base software goes further: using retrieval-augmented generation (RAG), the assistant looks up your own documents before it answers, so replies come from your material instead of general knowledge. Agentiq BD builds custom AI knowledge base software for internal search and customer Q&A over PDFs, policies and SOPs.',
    keywords: [
      'knowledge base software',
      'AI knowledge base software',
      'AI powered knowledge base software',
      'internal knowledge base software',
      'custom knowledge base software',
      'knowledge base platform',
      'RAG development',
      'knowledge base chatbot',
      'AI document search',
      'retrieval augmented generation',
      'internal knowledge assistant',
      'AI Q&A over documents',
    ],
    build: [
      'Internal search across PDFs, policies, SOPs and handbooks',
      'Customer-facing Q&A grounded in your published content',
      'Answers that cite the source document so they can be checked',
      'Access rules so people only see what they are allowed to see',
      'An update path so new documents are picked up without rebuilding',
    ],
    fit: [
      'Teams that keep asking each other where a procedure is written down',
      'Businesses with large documentation and no good way to search it',
      'Support teams answering the same policy questions repeatedly',
    ],
    faqs: [
      {
        q: 'What is knowledge base software?',
        a: 'Knowledge base software is a central place for a company’s documents, policies and how-to guides, with search so staff or customers can find answers themselves. AI knowledge base software adds an assistant that reads the relevant documents and answers questions in plain language, with a link to the source.',
      },
      {
        q: 'Should we buy knowledge base software or have one built?',
        a: 'If you mainly need a place to write and organise help articles, an off-the-shelf tool is usually the right choice and we will say so. A custom build makes sense when answers must come from many existing files such as PDFs, SOPs and spreadsheets, when access rules are strict, or when the knowledge base has to connect to your own systems and chat channels.',
      },
      {
        q: 'What is RAG in simple terms?',
        a: 'The assistant first finds the relevant passages in your documents, then writes its answer from them. That keeps answers tied to your material and lets you check the source.',
      },
      {
        q: 'Is our data safe?',
        a: 'We design access control, data handling and hosting around your requirements and agree them with you before building. Sensitive documents can be kept to people who already have access to them.',
      },
      {
        q: 'What kinds of documents can it use?',
        a: 'Commonly PDFs, Word files, web pages and exported spreadsheets. We confirm the formats you have during discovery.',
      },
    ],
    related: ['chatbots', 'ai-agents', 'integrations'],
  },
  {
    id: 'integrations',
    metaTitle: 'AI Integration Services for CRM & ERP',
    metaDescription:
      'Add AI to the systems you already run. Agentiq BD connects AI to your CRM, ERP, databases and messaging channels through their APIs, without replacing your stack.',
    h1: 'AI integration services for your CRM, ERP and databases',
    answer:
      'AI integration means connecting AI capabilities to the software your business already uses. Agentiq BD integrates AI with CRMs, ERPs, databases, spreadsheets and messaging channels through their APIs, so you add capability without replacing your stack.',
    keywords: [
      'AI integration services',
      'AI CRM integration',
      'AI ERP integration',
      'API integration company',
      'add AI to existing software',
    ],
    build: [
      'AI features added inside your existing product or internal tools',
      'Two-way sync between AI workflows and your CRM or ERP',
      'Connections to databases, spreadsheets and messaging channels',
      'Authentication, permissions and logging around every connection',
      'Documentation so your team can maintain what we build',
    ],
    fit: [
      'Businesses with working software that needs an AI layer, not a rebuild',
      'Teams stuck exporting data from one system to import into another',
      'Product teams adding AI features to an existing application',
    ],
    faqs: [
      {
        q: 'Can you integrate with our existing software?',
        a: 'Usually, yes, if it exposes an API or a standard export. What is straightforward and what needs custom work is something we confirm during discovery, before you commit.',
      },
      {
        q: 'Do we have to change how our team works?',
        a: 'Not by default. The point is that your team keeps its tools and the AI connects to them.',
      },
      {
        q: 'Who maintains the integration afterwards?',
        a: 'Support after go-live is part of how we work, and the scope is agreed with you as part of the project, along with documentation and monitoring.',
      },
    ],
    related: ['workflow-automation', 'custom-software', 'business-systems'],
  },
  {
    id: 'business-systems',
    metaTitle: 'Industrial AI & ERP Development in Bangladesh',
    metaDescription:
      'Procurement, inventory and production on one connected ERP, with AI-assisted exception and shortage detection. Industrial AI and ERP by Agentiq BD, Dhaka.',
    h1: 'Industrial AI and ERP for procurement, inventory and production',
    answer:
      'An AI-enabled ERP brings procurement, inventory and production onto one connected system and uses AI to flag shortages, mismatches and delays. Agentiq BD designs and builds these business systems for manufacturers, including a pharmaceutical sourcing ERP that is live today.',
    keywords: [
      'ERP development Bangladesh',
      'AI-enabled ERP',
      'industrial AI',
      'manufacturing ERP software',
      'inventory management system',
      'procurement software',
    ],
    build: [
      'Procurement flows: enquiries, quotation comparison and purchase orders',
      'Inventory and stock movement tracking',
      'Production tracking from order to finished goods',
      'AI-assisted detection of shortages, mismatches and delays',
      'Dashboards that show what needs attention today',
    ],
    fit: [
      'Manufacturers and distributors running on spreadsheets and email',
      'Teams whose procurement, stock and production data live in different places',
      'Operations managers who want early warning instead of end-of-month surprises',
    ],
    faqs: [
      {
        q: 'Have you built an ERP before?',
        a: 'Yes. We built and deployed a sourcing ERP for pharmaceutical raw materials covering tender notices, supplier enquiries, quotation comparison, purchase orders and finance. It is one of the projects on our Our Work page.',
      },
      {
        q: 'Do you replace our current system or work alongside it?',
        a: 'Either. We can build a new connected system, or add the missing pieces and integrate with what you already run. Discovery tells us which is sensible for you.',
      },
      {
        q: 'What does AI add to an ERP?',
        a: 'It helps search, recommends next steps and spots exceptions such as shortages or mismatched quantities early. The core of the system is still ordinary, reliable software.',
      },
    ],
    related: ['custom-software', 'reporting', 'integrations'],
  },
  {
    id: 'custom-software',
    metaTitle: 'Software Development Company in Bangladesh',
    metaDescription:
      'Agentiq BD is a software development company in Dhaka, Bangladesh, building web apps, SaaS products and platforms, and modernizing legacy systems.',
    h1: 'Custom software development company in Bangladesh',
    answer:
      'Custom software development is building the system your business needs rather than adapting one that nearly fits. Agentiq BD is a software development company in Dhaka, Bangladesh. We build web applications, SaaS products and platforms from scratch, and modernize older systems, for clients in Bangladesh and abroad, securely deployed and maintainable.',
    keywords: [
      'software company in Bangladesh',
      'software development company in Bangladesh',
      'best software company in Bangladesh',
      'software company in Dhaka',
      'IT company in Bangladesh',
      'custom software development Bangladesh',
      'SaaS development company',
      'web application development',
      'legacy system modernization',
      'software development company Dhaka',
    ],
    build: [
      'Web applications and internal tools',
      'SaaS products, including multi-tenant systems with isolated customer data',
      'Platforms with separate portals for different user roles',
      'Modernization of older systems into maintainable, documented software',
      'Secure deployment, monitoring and handover documentation',
    ],
    fit: [
      'Founders turning a business process or idea into a product',
      'Companies outgrowing spreadsheets or off-the-shelf tools',
      'Teams stuck with an old system that is hard to change',
    ],
    faqs: [
      {
        q: 'Do you build SaaS products?',
        a: 'Yes. Our own product BatchPilot, a management app for private tutors and coaching centres, is a SaaS product currently in MVP phase, built with separate portals and isolated data per centre.',
      },
      {
        q: 'How do pricing and timelines work?',
        a: 'We start with a discovery conversation, then propose a scoped plan, often beginning with a prototype of the core workflow. You get a clear estimate after discovery rather than a number up front.',
      },
      {
        q: 'Can you work with an international team or client?',
        a: 'Yes. We are based in Dhaka and work with clients globally. Meetings, documentation and delivery are in English.',
      },
      {
        q: 'How do I choose a software company in Bangladesh?',
        a: 'Look at live work you can open, not only screenshots. Speak with the engineer who will design your system, ask for a written scope and estimate before work starts, and agree who owns the code and how support works after launch. Hold us to the same test: our projects are on the Our Work page, and you talk directly to the engineer designing your system.',
      },
    ],
    related: ['business-systems', 'integrations', 'reporting'],
  },
  {
    id: 'reporting',
    metaTitle: 'Business Dashboards & Automated Reporting',
    metaDescription:
      'Operational data pulled together on a schedule and delivered as a dashboard or report you will read. Dashboards and automated reporting by Agentiq BD.',
    h1: 'Dashboards and automated reporting you will actually read',
    answer:
      'Automated reporting collects your operational data on a schedule and delivers it as a dashboard or report, so decisions do not wait on someone assembling a spreadsheet. Agentiq BD builds dashboards and scheduled reports on top of the systems you already run.',
    keywords: [
      'business dashboard development',
      'automated reporting',
      'operational dashboards',
      'scheduled reports',
      'data dashboard company Bangladesh',
    ],
    build: [
      'Dashboards that show current operations at a glance',
      'Scheduled reports sent to the right people by email or message',
      'Data pulled from your CRM, ERP, spreadsheets and databases',
      'Alerts when something needs attention rather than at month end',
      'Plain-language summaries of what changed',
    ],
    fit: [
      'Managers who rebuild the same weekly report by hand',
      'Owners who want one view across sales, stock and operations',
      'Teams whose numbers never agree because they come from different files',
    ],
    faqs: [
      {
        q: 'Can reports be sent automatically?',
        a: 'Yes. We schedule reports to run daily, weekly or monthly and deliver them by email or your messaging channel.',
      },
      {
        q: 'Where does the data come from?',
        a: 'From the systems you already use: CRM, ERP, databases and spreadsheets. We confirm what is available during discovery.',
      },
      {
        q: 'Can AI summarise the numbers?',
        a: 'Yes. A short written summary of what changed can sit on top of the figures, always shown alongside the underlying data so it can be checked.',
      },
    ],
    related: ['workflow-automation', 'business-systems', 'integrations'],
  },
];

export const servicePageById = (id: string) => servicePages.find((p) => p.id === id);
