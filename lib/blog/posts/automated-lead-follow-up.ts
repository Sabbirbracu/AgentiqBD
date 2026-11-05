import type { Post } from '../types';

export const post: Post = {
  slug: 'automated-lead-follow-up',
  title: 'Automated lead follow-up: how to reply to every enquiry in minutes, not days',
  metaTitle: 'Automated Lead Follow-Up: Reply to Every Enquiry in Minutes',
  excerpt:
    'Leads go cold while they wait in inboxes, DMs and web forms. How to capture every enquiry in one place, reply in minutes, qualify it and hand the good ones to sales, with or without AI.',
  category: 'Guides',
  tags: ['Automation', 'Sales', 'CRM'],
  keywords: [
    'automated lead follow-up',
    'lead follow-up automation',
    'speed to lead',
    'lead response automation',
    'CRM automation',
    'AI lead qualification',
  ],
  date: '2026-10-30',
  cover: 'leads',
  takeaways: [
    'Most lost leads are not lost to competitors; they are lost to slow or forgotten follow-up.',
    'Step one is boring and essential: every channel (forms, email, WhatsApp, Facebook, calls) lands in one CRM.',
    'Automation sends the first reply in minutes, asks the qualifying questions and books the call; people handle the conversation that closes.',
    'AI helps with understanding free-text enquiries and drafting personal replies, but simple rules do most of the work.',
  ],
  services: ['workflow-automation', 'integrations', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**Automated lead follow-up means every new enquiry gets a fast, relevant first reply and a scheduled next step without anyone having to remember it.** The system captures leads from every channel into one CRM, replies within minutes, asks the questions that tell you whether the lead is a fit, books a call or sends the right information, and reminds your team when a human needs to step in.',
    },
    {
      type: 'p',
      text: 'Most small and mid-sized businesses do not have a lead problem. They have a follow-up problem. Enquiries arrive at night, on weekends, in five different apps, and the busiest people are the ones expected to answer them. By the time someone replies, the buyer has already spoken to two other companies.',
    },
    { type: 'figure', art: 'leads', caption: 'Every channel into one pipeline: reply, qualify, book, and hand the right leads to a person.' },
    { type: 'h2', text: 'Why speed matters so much' },
    {
      type: 'p',
      text: 'A buyer who fills in a form is paying attention right now. An hour later they are in a meeting; a day later they have chosen someone else or forgotten why they asked. The first useful reply sets the tone: it shows you are organised and that you read what they wrote. You cannot guarantee that a person is free in that moment, but a system can be.',
    },
    { type: 'h2', text: 'The five building blocks' },
    {
      type: 'steps',
      items: [
        { title: 'Capture every channel', text: 'Website forms, email, WhatsApp, Facebook and Instagram messages, LinkedIn, phone calls and marketplace enquiries all create a record in one CRM, with the source attached.' },
        { title: 'Reply in minutes', text: 'An immediate, specific reply that confirms what they asked about and tells them what happens next. Not “we received your message”.' },
        { title: 'Qualify', text: 'Two or three questions (budget range, timeline, location, what they need) asked by form, message or a short AI conversation. Answers go straight into the CRM.' },
        { title: 'Route and book', text: 'Good-fit leads get a booking link or go to the right salesperson. Poor fits get helpful information and a polite close.' },
        { title: 'Follow up until there is an answer', text: 'A short sequence over the next days, stopped automatically the moment the lead replies or books.' },
      ],
    },
    { type: 'h2', text: 'Where AI helps, and where rules are enough' },
    {
      type: 'table',
      head: ['Task', 'Rules are enough', 'AI adds value'],
      rows: [
        ['Saving the lead to the CRM', 'Yes', 'Only for messy free-text messages that need details pulled out'],
        ['First reply', 'A good template per enquiry type', 'Personalising the reply to what the person actually wrote'],
        ['Qualification', 'Form fields and simple scoring', 'Understanding open answers and asking a sensible follow-up question'],
        ['Routing', 'By product, region or value', 'Spotting urgency or a very large opportunity in the message'],
        ['Follow-up sequence', 'Yes', 'Drafting a reply to an unexpected question for a person to approve'],
      ],
    },
    {
      type: 'p',
      text: 'Start with rules. Add AI where messages are varied and important, and keep a person approving anything unusual. If you are unsure which tool fits, read [AI agent vs chatbot vs automation](/blog/ai-agent-vs-chatbot-vs-automation).',
    },
    { type: 'h2', text: 'An example flow for a B2B service company' },
    {
      type: 'code',
      lang: 'text',
      caption: 'Example only: adapt the steps and timings to your sales cycle',
      code: `New enquiry (form, email or WhatsApp)
  → create contact + deal in CRM, source = channel
  → within 2 min: personal reply + 3 short questions
  → answers received?
      fit      → booking link + notify account owner
      unclear  → AI drafts a reply, salesperson approves
      not fit  → helpful resource, close politely
  → no reply: follow up on day 1, day 3, day 7, then pause
  → every Monday: report of new, booked, won, lost by source`,
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Respect consent and spam rules',
      text: 'Reply to people who contacted you, but only add them to marketing sequences if they agreed. Rules differ by market (for example CAN-SPAM in the US, GDPR and PECR in the EU and UK), and WhatsApp has its own template and opt-in rules for business messages.',
    },
    { type: 'h2', text: 'What to measure' },
    {
      type: 'list',
      items: [
        '**Time to first reply**, by channel and by hour of the day.',
        '**Share of leads that get a reply at all.** It is often lower than people think.',
        '**Booked calls per 100 leads**, before and after automation.',
        '**Won deals by source**, so you know which channel deserves more budget.',
      ],
    },
    {
      type: 'p',
      text: 'We have built and deployed this kind of [lead and campaign follow-up automation](/work/marketing-automation), connected to the tools the team already used. Our [AI & Workflow Automation](/packages/automation) package covers projects like this, and the free [48-hour AI business audit](/packages/audit) will show where your leads are leaking today.',
    },
  ],
  faq: [
    {
      q: 'What is automated lead follow-up?',
      a: 'Automated lead follow-up is a system that captures new enquiries from every channel into a CRM, sends a fast and relevant first reply, asks qualifying questions, books calls or routes leads to the right person, and sends follow-ups until the lead responds.',
    },
    {
      q: 'How fast should you respond to a new lead?',
      a: 'As fast as possible, ideally within minutes, while the buyer is still paying attention. An automated first reply guarantees that speed at any hour; a person can then continue the conversation once they are available.',
    },
    {
      q: 'Do I need AI for lead follow-up automation?',
      a: 'Not always. Capture, routing, reminders and follow-up sequences work well with simple rules. AI adds value when enquiries arrive as free text that needs understanding, or when you want personal replies drafted for a salesperson to approve.',
    },
    {
      q: 'Which CRM works best for automated follow-up?',
      a: 'Most modern CRMs, such as HubSpot, Pipedrive, Zoho or Salesforce, can handle it. The best choice is usually the one your team already uses, connected properly to every channel your leads come from.',
    },
  ],
};
