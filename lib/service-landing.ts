/**
 * The sales and teaching sections of each service landing page (/services/<id>). The SEO core of the page
 * (title, definition, what we build, who it is for, FAQs) lives in service-pages.ts; this file adds what a
 * visitor needs to understand the service and decide: a plain-language explanation, how it works, what
 * changes, example scenarios and an honest "not a fit" list.
 *
 * Same writing rules as the rest of the site: our own wording, no invented metrics, clients, prices or
 * timelines. Use cases are example scenarios unless `proof` points at a real project or product.
 */
export type ServiceLanding = {
  /** Completes the heading "What is …?". */
  term: string;
  /** Key terms with one-sentence definitions: shown under "What is …?" and published as DefinedTerm data for search and AI assistants. */
  glossary: { term: string; definition: string }[];
  /** Hero subhead: one or two sentences on what the visitor gets. */
  intro: string;
  /** Part of the page H1 drawn in the accent colour (must appear in the H1 exactly). */
  heroAccent: string;
  /** Phrases inside `intro` drawn brighter, so the key points stand out (must appear in the intro exactly). */
  introHighlights: string[];
  /** "In plain words": an everyday explanation for visitors new to the idea. */
  plain: string;
  /** How it works, four steps from start to finish. */
  how: { title: string; text: string }[];
  /** "Sound familiar?" — the day-to-day problem and what it looks like after. */
  shifts: { before: string; after: string }[];
  /** Example scenarios. Set `real` only for something we have actually built. */
  useCases: { sector: string; title: string; text: string; real?: boolean }[];
  /** When we would advise against it, said up front. */
  notFit: string[];
  /** Real work that shows we have done this: projects in `projects` or products in `products` (content.ts). */
  proof?: { kind: 'project' | 'product'; id: string; text: string }[];
};

export const serviceLanding: Record<string, ServiceLanding> = {
  'ai-agents': {
    term: 'an AI agent',
    glossary: [
      { term: 'AI agent', definition: 'Software that takes a request, decides the next step and carries it out inside your business tools.' },
      { term: 'Agentic AI', definition: 'AI that works towards a goal over several steps, planning, using tools and checking results, instead of answering one prompt.' },
      { term: 'AI Employee', definition: 'Our name for an AI agent given one defined job, with only the permissions that job needs.' },
      { term: 'Human-in-the-loop', definition: 'A design where a person reviews or approves the agent’s sensitive actions before they happen.' },
    ],
    intro:
      'Hand repetitive front-line work to an AI Employee: one clearly defined job, connected to your systems, with a person approving anything sensitive.',
    heroAccent: 'support, leads and bookings',
    introHighlights: ['an AI Employee', 'connected to your systems', 'a person approving anything sensitive'],
    plain:
      'Think of a new team member who does one job only, follows your written rules, logs everything they do and checks with a manager before anything risky. That is an AI Employee. Because it is software it is available at any hour, but it only gets the access its job needs.',
    how: [
      { title: 'A request comes in', text: 'A customer message, web form, email or call arrives on a channel you already use.' },
      { title: 'The agent works out the task', text: 'It reads the request, checks your knowledge base and records, and picks the next step within the rules you set.' },
      { title: 'It acts inside your tools', text: 'It replies, updates the CRM, books the slot or raises a ticket, using only the permissions that job needs.' },
      { title: 'People stay in control', text: 'Sensitive actions wait for approval, unclear cases go to your team, and every step is logged.' },
    ],
    shifts: [
      { before: 'Customers wait hours for answers your team has given a hundred times', after: 'Routine questions answered straight away, from your own information' },
      { before: 'New enquiries sit in an inbox until someone is free', after: 'Every enquiry gets a reply, qualifying questions and a CRM record' },
      { before: 'Booking a visit takes several messages to find a time', after: 'Customers choose a free slot and get a confirmation' },
      { before: 'Nobody is sure what was promised to which customer', after: 'A record of every conversation and action, ready to review' },
    ],
    useCases: [
      { sector: 'Retail & e-commerce', title: 'Order and delivery questions', text: 'A support agent checks order status in your system and answers on WhatsApp, passing refund requests to a person for approval.' },
      { sector: 'Real estate', title: 'Qualifying property enquiries', text: 'A lead agent asks about budget, area and timing, scores the enquiry and assigns it to the right person in the CRM.' },
      { sector: 'Clinics & services', title: 'Appointment requests', text: 'A booking agent offers open slots, confirms the visit and sends a reminder before the appointment.' },
    ],
    notFit: [
      'Nobody can describe the rules of the job yet, because it changes every time',
      'You get a handful of requests a week that one person handles easily',
      'The job needs unrestricted access to sensitive systems with no room for a human check',
    ],
  },

  chatbots: {
    term: 'an AI chatbot',
    glossary: [
      { term: 'AI chatbot', definition: 'A chat assistant that understands questions in natural language and replies in a conversation.' },
      { term: 'Knowledge base', definition: 'The collection of your FAQs, policies and product details the chatbot answers from.' },
      { term: 'Human handoff', definition: 'Passing the conversation, with its full history, to a person when the chatbot should not answer.' },
    ],
    intro:
      'A chat assistant on your website, WhatsApp or Messenger that understands customers in their own words, answers from your information and hands over to your team when it should.',
    heroAccent: 'website, WhatsApp and Messenger',
    introHighlights: ['understands customers in their own words', 'answers from your information', 'hands over to your team'],
    plain:
      'Imagine your best support person wrote down everything they know, and an assistant could read all of it in a second before every reply. The chatbot does the reading and the replying. Your team steps in whenever a customer needs a person.',
    how: [
      { title: 'We load your knowledge', text: 'FAQs, policies, price lists and product details go into a knowledge base the assistant can search.' },
      { title: 'A customer asks', text: 'They type a question in their own words on your website, WhatsApp or Messenger.' },
      { title: 'It answers from your content', text: 'The assistant finds the relevant information and replies, without inventing what is not there.' },
      { title: 'Handoff and follow-up', text: 'If it cannot help, or the customer asks for a person, the whole conversation goes to your team. Leads are saved to your CRM.' },
    ],
    shifts: [
      { before: 'Messages sent after office hours wait until the next morning', after: 'Common questions answered at any hour' },
      { before: 'Staff type the same delivery and price answers all day', after: 'Your team focuses on the chats that need a person' },
      { before: 'Customers give up on menu bots that do not understand them', after: 'Customers ask in plain language and get a relevant answer' },
      { before: 'Chat enquiries never make it onto the sales list', after: 'Names, numbers and requests captured in your CRM or sheet' },
    ],
    useCases: [
      { sector: 'E-commerce', title: 'Product and delivery questions on WhatsApp', text: 'Answers stock, size and delivery questions from your catalogue and policies, then collects the order details.' },
      { sector: 'Education', title: 'Admission enquiries', text: 'Explains courses, fees and schedules from your prospectus and saves interested students for a call-back.' },
      { sector: 'Services', title: 'Website support assistant', text: 'Answers from your help pages and opens a ticket with the full chat when a problem needs your team.' },
    ],
    notFit: [
      'There is no written information yet for the assistant to answer from (we can help you create it first)',
      'Almost every conversation needs personal judgment',
      'You get so few chats that a simple contact form already works',
    ],
  },

  voice: {
    term: 'an AI voice agent',
    glossary: [
      { term: 'AI voice agent', definition: 'An assistant that talks with callers on the phone, understands the request and completes the task.' },
      { term: 'AI receptionist', definition: 'An AI voice agent set up to answer a business’s incoming calls, questions and bookings.' },
      { term: 'Speech-to-text', definition: 'The step that turns the caller’s words into text so the agent can understand them.' },
    ],
    intro:
      'A voice assistant that picks up the phone, understands what the caller needs, books the appointment or arranges a call-back, and logs every call.',
    heroAccent: 'answer calls and take bookings',
    introHighlights: ['picks up the phone', 'books the appointment', 'logs every call'],
    plain:
      'It works like a receptionist with your calendar open and your FAQ sheet beside them. Callers speak normally. The assistant answers what it can, books what it is allowed to, and passes everything else to your team with a short summary.',
    how: [
      { title: 'The call is answered', text: 'Calls to your number, or the calls you choose to route to it, are picked up by the voice agent.' },
      { title: 'It understands the request', text: 'Speech becomes text, the agent works out what the caller wants and asks follow-up questions.' },
      { title: 'It completes the task', text: 'It answers the question, checks your calendar and books a slot, or records a call-back request.' },
      { title: 'Your records are updated', text: 'A call summary and any booking are saved to your CRM or inbox. Urgent calls go straight to a person.' },
    ],
    shifts: [
      { before: 'Calls ring out while staff are with customers', after: 'Every call is picked up, even at the busiest time' },
      { before: 'Bookings are lost outside office hours', after: 'Callers book or request a call-back at any hour' },
      { before: 'Call notes live in a notebook or someone’s memory', after: 'Each call summarised and saved where the team can see it' },
      { before: 'Staff repeat opening hours and directions all day', after: 'Routine questions answered without interrupting anyone' },
    ],
    useCases: [
      { sector: 'Healthcare', title: 'Clinic appointment line', text: 'Books, moves and confirms appointments against the doctors’ real calendars, and passes medical questions to staff.' },
      { sector: 'Beauty & wellness', title: 'Salon bookings', text: 'Takes bookings for a specific service and stylist while the team is busy with clients.' },
      { sector: 'Field services', title: 'Service call-backs', text: 'Records the address, the problem and a preferred time, and creates a job request for the team.' },
    ],
    notFit: [
      'Most of your calls are negotiations or sensitive conversations',
      'You need a language or accent we have not yet tested with your callers (we test before you commit)',
      'Call volume is low enough for one person to answer comfortably',
    ],
  },

  'workflow-automation': {
    term: 'AI workflow automation',
    glossary: [
      { term: 'Workflow automation', definition: 'Software that runs the steps of a business process in order, without manual hand-offs.' },
      { term: 'Trigger', definition: 'The event that starts a workflow, such as a form submission, an email or a new record.' },
      { term: 'Approval step', definition: 'A point where the workflow pauses until a person confirms it should continue.' },
    ],
    intro:
      'Stop moving information between tools by hand. We automate the steps from a request arriving to the work being done, with AI for the steps that need reading or judgment.',
    heroAccent: 'the work between your tools',
    introHighlights: ['Stop moving information between tools by hand.', 'AI for the steps that need reading or judgment'],
    plain:
      'Picture the checklist someone follows every time a lead arrives or an invoice lands: copy this here, email that person, update that sheet. Workflow automation turns the checklist into software that runs by itself, every time, in the same order.',
    how: [
      { title: 'Map the process', text: 'We write down the real steps, the tools involved and who approves what.' },
      { title: 'Set the trigger', text: 'A form, an email, a new row or a payment starts the workflow automatically.' },
      { title: 'Automate each step', text: 'Data moves between your tools. AI reads documents, sorts requests or drafts replies where a step needs it.' },
      { title: 'Approve and monitor', text: 'People approve the steps that need a decision, and you can see every run, including any that failed.' },
    ],
    shifts: [
      { before: 'Data copied between email, spreadsheets and the CRM by hand', after: 'Records created and updated automatically' },
      { before: 'Follow-ups depend on someone remembering', after: 'The next step starts the moment the last one finishes' },
      { before: 'Invoices and forms typed in line by line', after: 'Documents read, checked and queued for review' },
      { before: 'The weekly report takes a morning to put together', after: 'Reports built and delivered on schedule' },
    ],
    useCases: [
      { sector: 'Sales', title: 'Lead to CRM to follow-up', text: 'A web enquiry creates the CRM record, assigns an owner and sends the first follow-up straight away.' },
      { sector: 'Finance & operations', title: 'Invoice intake', text: 'Supplier invoices arriving by email are read, matched to purchase orders and queued for approval.' },
      { sector: 'HR & admin', title: 'New-joiner checklist', text: 'A new hire triggers accounts, documents and reminders across the tools your team uses.' },
    ],
    notFit: [
      'The process changes every week and has no stable steps yet',
      'It happens a few times a month and takes minutes, so automation would cost more than it saves',
      'The real gap is missing data or a missing system, which needs fixing first',
    ],
    proof: [
      {
        kind: 'project',
        id: 'marketing-automation',
        text: 'We have built and deployed marketing automation: campaign and lead follow-up workflows connected to the tools the team already used.',
      },
    ],
  },

  'knowledge-rag': {
    term: 'AI knowledge base software',
    glossary: [
      { term: 'Knowledge base software', definition: 'A central, searchable place for a company’s documents, policies and how-to guides.' },
      { term: 'Retrieval-augmented generation (RAG)', definition: 'An approach where the AI first retrieves relevant passages from your documents, then writes its answer from them.' },
      { term: 'Semantic search', definition: 'Search by meaning, which finds the right passage even when the question uses different words.' },
      { term: 'Source citation', definition: 'A link from each answer back to the document and section it came from.' },
    ],
    intro:
      'Turn your PDFs, policies and SOPs into an assistant that answers questions from them and shows exactly where each answer came from.',
    heroAccent: 'answers from your own documents',
    introHighlights: ['answers questions from them', 'shows exactly where each answer came from'],
    plain:
      'It is like an open-book exam. Before answering, the assistant looks up the right pages in your documents, writes the answer from those pages and points to them. If the answer is not in your documents, it says so.',
    how: [
      { title: 'Collect your documents', text: 'PDFs, Word files, web pages and spreadsheets are gathered, with rules for who may see what.' },
      { title: 'Index them by meaning', text: 'Documents are split into passages and indexed so a search finds the right section even when the wording differs.' },
      { title: 'Retrieve, then answer', text: 'For each question the assistant pulls the most relevant passages and writes its answer only from them.' },
      { title: 'Show the source', text: 'Each answer links back to the document and section. New documents are added without rebuilding anything.' },
    ],
    shifts: [
      { before: 'People ask colleagues where a procedure is written down', after: 'They ask the assistant and get the answer with its source' },
      { before: 'Keyword search misses documents that use other words', after: 'Search by meaning finds the right section' },
      { before: 'New staff depend on others to find policies', after: 'New staff find procedures on their own' },
      { before: 'The answer depends on who you ask', after: 'Answers come from the same approved documents every time' },
    ],
    useCases: [
      { sector: 'Manufacturing', title: 'SOP assistant for supervisors', text: 'Supervisors ask how a procedure is done and get the steps from the current SOP, with the document reference.' },
      { sector: 'HR', title: 'Policy questions', text: 'Staff ask about leave, travel or expense rules and get the answer from the handbook without waiting for HR.' },
      { sector: 'Customer support', title: 'Product documentation Q&A', text: 'Customers or agents ask technical questions and get answers grounded in your manuals.' },
    ],
    notFit: [
      'Your documents are out of date or contradict each other (we can help clean them up first)',
      'The answers you need are live figures in a database, not documents (that is an integration or reporting job)',
      'There are only a few short documents that everyone already knows',
      'You mainly need a place to write help articles; an off-the-shelf knowledge base tool does that well',
    ],
  },

  integrations: {
    term: 'AI integration',
    glossary: [
      { term: 'API', definition: 'A defined way for one piece of software to read from or write to another.' },
      { term: 'Two-way sync', definition: 'Keeping the same data up to date in two systems, whichever side changes it.' },
      { term: 'Audit log', definition: 'A record of every automated change: what changed, when, and what made the change.' },
    ],
    intro:
      'Keep the software you already run. We connect AI to your CRM, ERP, databases and messaging channels so it can read, decide and update without anyone copying data across.',
    heroAccent: 'CRM, ERP and databases',
    introHighlights: ['Keep the software you already run.', 'read, decide and update', 'without anyone copying data across'],
    plain:
      'Your systems are like departments that never talk to each other. Integration gives them a secure line between them. AI sits on that line: it reads from one system, makes sense of the data and writes the result into another, within strict permissions.',
    how: [
      { title: 'Review your stack', text: 'We list your systems, the data each one holds and the access they allow through APIs or exports.' },
      { title: 'Design the connections', text: 'We decide what flows where, in which direction, and who or what is allowed to trigger it.' },
      { title: 'Build with safeguards', text: 'Every connection gets authentication, permissions, error handling and logging.' },
      { title: 'Document and hand over', text: 'You get documentation for each connection, so your team can maintain and extend it.' },
    ],
    shifts: [
      { before: 'Teams export from one system to import into another', after: 'Data stays in sync between systems automatically' },
      { before: 'AI tools sit outside your workflow, working on copied data', after: 'AI works inside your systems, on current data' },
      { before: 'Every new idea seems to need a new platform', after: 'New capability added to the software you already use' },
      { before: 'Nobody knows what changed a record, or when', after: 'Every automated change is logged' },
    ],
    useCases: [
      { sector: 'Sales', title: 'AI inside the CRM', text: 'New leads are summarised, tagged and scored inside the CRM your team already works in.' },
      { sector: 'Operations', title: 'ERP data in customer chat', text: 'Order status from the ERP is available to your WhatsApp assistant, so customers get current answers.' },
      { sector: 'Product teams', title: 'AI features in your app', text: 'Search, summaries or drafting added to your existing application through a secure API layer.' },
    ],
    notFit: [
      'The system you want to connect has no API or export at all (we check this in discovery)',
      'The existing system is failing and needs replacing, not connecting',
    ],
  },

  'business-systems': {
    term: 'an AI-enabled ERP',
    glossary: [
      { term: 'ERP', definition: 'Enterprise resource planning: one system for procurement, inventory, production and finance.' },
      { term: 'AI-enabled ERP', definition: 'An ERP with an AI layer that helps search, suggests next steps and flags exceptions.' },
      { term: 'Exception detection', definition: 'Automatically spotting problems such as projected shortages or mismatched quantities.' },
    ],
    intro:
      'Run procurement, inventory and production on one connected system, with AI that spots shortages, mismatches and delays before they hold up the work.',
    heroAccent: 'procurement, inventory and production',
    introHighlights: ['one connected system', 'spots shortages, mismatches and delays'],
    plain:
      'Today the purchase list is in one spreadsheet, the stock count in another and the production plan on a whiteboard. An ERP puts them in one place, so a change in one updates the others. The AI layer watches the numbers and raises a flag when something does not add up.',
    how: [
      { title: 'Map your operation', text: 'We walk through how materials are bought, stored and used, and where information gets lost.' },
      { title: 'Build the core modules', text: 'Procurement, inventory and production are built around your real process, with roles for each team.' },
      { title: 'Connect the data', text: 'Modules share one database, so a purchase order, a goods receipt and a production run all update the same stock.' },
      { title: 'Add AI on top', text: 'AI helps search and flags exceptions such as projected shortages or quantity mismatches, with a suggested next step.' },
    ],
    shifts: [
      { before: 'Stock is checked by phone or a walk to the warehouse', after: 'Current stock visible on one screen' },
      { before: 'Supplier quotations compared across scattered emails', after: 'Quotations compared side by side in the system' },
      { before: 'Shortages discovered when production stops', after: 'Projected shortages flagged in advance' },
      { before: 'Month-end numbers never match between teams', after: 'Every team works from the same records' },
    ],
    useCases: [
      { sector: 'Pharmaceuticals', title: 'Raw-material sourcing', text: 'Tender notices, supplier enquiries, quotation comparison and purchase orders in one workflow.', real: true },
      { sector: 'Manufacturing', title: 'Production tracking', text: 'Orders, materials and finished goods tracked from start to finish, with delays highlighted.' },
      { sector: 'Distribution', title: 'Inventory and reorder', text: 'Stock movements across locations, with reorder alerts based on actual usage.' },
    ],
    notFit: [
      'An off-the-shelf system already fits your process and only needs setting up',
      'Your team is not ready to change how data is recorded, because a system only works if people use it',
    ],
    proof: [
      {
        kind: 'project',
        id: 'pharma-erp',
        text: 'We designed and built a sourcing ERP for pharmaceutical raw materials that is live today: tender notices, supplier enquiries, quotation comparison, purchase orders and finance.',
      },
    ],
  },

  'custom-software': {
    term: 'custom software',
    glossary: [
      { term: 'Custom software', definition: 'Software built around your own process instead of adapting an off-the-shelf product.' },
      { term: 'SaaS', definition: 'Software as a service: an application customers use online, usually by subscription.' },
      { term: 'Multi-tenant', definition: 'One application serving many customers, each with their own isolated data.' },
      { term: 'Legacy modernization', definition: 'Rebuilding or upgrading an old system into maintainable, documented software.' },
    ],
    intro:
      'When off-the-shelf tools nearly fit but not quite, we build the web app, SaaS product or platform your business actually needs, or modernize the one you have.',
    heroAccent: 'in Bangladesh',
    introHighlights: ['the web app, SaaS product or platform', 'modernize the one you have'],
    plain:
      'Off-the-shelf software is a ready-made suit: quick to get, but cut for someone else. Custom software is tailored to how your business works, owned by you, and changed whenever you need it to.',
    how: [
      { title: 'Discover and scope', text: 'We learn who the users are, how they work and what is essential, and agree what the first version includes.' },
      { title: 'Design and prototype', text: 'The screens and the core workflow are prototyped so you can try them before the full build.' },
      { title: 'Build in stages', text: 'Features are built, tested and shown to you as they are ready, not revealed at the end.' },
      { title: 'Deploy and support', text: 'Secure deployment, monitoring and documentation, with support after launch agreed up front.' },
    ],
    shifts: [
      { before: 'The business runs on spreadsheets that break as you grow', after: 'A system built around your workflow' },
      { before: 'You pay for features you never use and miss the ones you need', after: 'Only the features your team actually uses' },
      { before: 'An old system nobody dares to change', after: 'Modern, documented code your team can maintain' },
      { before: 'Everyone shares one login and sees everything', after: 'Separate portals and permissions for each role' },
    ],
    useCases: [
      { sector: 'Education', title: 'Mobile-first learning platform', text: 'Lessons, progress tracking and achievements for learners, on web and phone.', real: true },
      { sector: 'Community platform', title: 'Matrimony platform with real-time chat', text: 'Member profiles, match search, shortlists and messaging, built full-stack.', real: true },
      { sector: 'SaaS', title: 'Management app for tutors and coaching centres', text: 'Our own product, BatchPilot, in MVP: separate portals and isolated data for each centre.', real: true },
    ],
    notFit: [
      'An existing tool already does the job well; we will point you to it instead',
      'You need something live this week, because custom software needs proper planning',
    ],
    proof: [
      { kind: 'project', id: 'matrimony-platform', text: 'A matrimony platform with member search, shortlists and real-time chat, delivered full-stack.' },
      { kind: 'project', id: 'learning-platform', text: 'A mobile-first learning platform with lessons, progress and achievements.' },
    ],
  },

  reporting: {
    term: 'automated reporting',
    glossary: [
      { term: 'Operational dashboard', definition: 'A live view of the few numbers that show how the business is running today.' },
      { term: 'Scheduled report', definition: 'A report that is built and sent automatically, for example every Monday morning.' },
      { term: 'Alert threshold', definition: 'A limit that triggers a notification when a number crosses it.' },
    ],
    intro:
      'Get the numbers you need without waiting for someone to build a spreadsheet: dashboards and scheduled reports built on the data you already have.',
    heroAccent: 'you will actually read',
    introHighlights: ['dashboards and scheduled reports', 'the data you already have'],
    plain:
      'Instead of someone collecting figures from five places every Monday, the system collects them itself, puts them in one view and sends a summary to the people who need it.',
    how: [
      { title: 'Agree the questions', text: 'We start from the decisions you make and the few numbers behind them, not from every possible chart.' },
      { title: 'Connect the sources', text: 'Data is pulled from your CRM, ERP, databases and spreadsheets on a schedule.' },
      { title: 'Build the views', text: 'Dashboards and reports show what matters, with filters by team, period and location.' },
      { title: 'Deliver and alert', text: 'Reports arrive by email or message on schedule, alerts fire when a number crosses a line, and AI can add a short summary.' },
    ],
    shifts: [
      { before: 'Someone rebuilds the same report by hand every week', after: 'The report builds and sends itself' },
      { before: 'Each team quotes a different number', after: 'One agreed source for every figure' },
      { before: 'Problems show up at month end', after: 'Alerts arrive when something needs attention' },
      { before: 'Dashboards full of charts nobody opens', after: 'A few views built around the decisions you make' },
    ],
    useCases: [
      { sector: 'Retail', title: 'Daily sales and stock', text: 'Sales, returns and low-stock items in one view, emailed to managers each morning.' },
      { sector: 'Manufacturing', title: 'Production overview', text: 'Output, delays and material shortages across lines, with alerts for exceptions.' },
      { sector: 'Management', title: 'Weekly owner report', text: 'Key figures from sales, operations and finance, with a short written summary of what changed.' },
    ],
    notFit: [
      'Your data is not recorded anywhere yet, so the first step is a system to capture it',
      'You need one report, once; a spreadsheet is fine for that',
    ],
    proof: [
      {
        kind: 'project',
        id: 'pharma-erp',
        text: 'The pharmaceutical sourcing ERP we built includes a dashboard with manufacturer, product and category totals.',
      },
    ],
  },
};

/** Part of every build, whatever the service. Matches the "Reliable by design" pillar in content.ts. */
export const includedInEveryBuild = [
  { title: 'Scoped permissions', text: 'Each part of the system gets only the access it needs.' },
  { title: 'Testing for failure cases', text: 'We test what happens when inputs are wrong, missing or unexpected.' },
  { title: 'Monitoring', text: 'You can see that it is running, and we are alerted when it is not.' },
  { title: 'Documentation & handover', text: 'Written down so your team understands and can maintain it.' },
  { title: 'Support after launch', text: 'The support plan is agreed with you before we start.' },
];
