import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-customer-support-automation',
  title: 'AI customer support automation: what to automate first, and what to keep human',
  metaTitle: 'AI Customer Support Automation: What to Automate First',
  excerpt:
    'AI can answer a large share of support questions instantly, but automating the wrong ones damages trust. A practical order for automating customer support, with the handover rules that keep customers happy.',
  category: 'Strategy',
  tags: ['Customer support', 'AI agents', 'Chatbots'],
  keywords: [
    'AI customer support automation',
    'automate customer service',
    'AI customer service agent',
    'customer support chatbot',
    'AI helpdesk',
    'support ticket automation',
  ],
  date: '2026-11-05',
  cover: 'support',
  takeaways: [
    'Automate in order of risk: answers first, then look-ups, then simple actions, and keep complex or emotional cases with people.',
    'Your support history tells you what to automate: group the last few months of tickets by reason and start with the biggest, simplest group.',
    'Handover is the feature that protects trust: easy to reach a person, with the full conversation passed along.',
    'Even where the AI does not reply, it can tag, prioritise and draft, which speeds up every human agent.',
  ],
  services: ['chatbots', 'ai-agents', 'integrations'],
  body: [
    {
      type: 'p',
      text: '**AI customer support automation uses AI agents to answer common questions, look up order or account details and complete simple requests across chat, email, WhatsApp and phone, while handing complex or sensitive cases to people with the full context.** Done well, customers get instant answers to routine questions, and your team spends its time on the conversations that need judgement.',
    },
    {
      type: 'p',
      text: 'Done badly, it becomes the chatbot everyone hates: confident wrong answers, loops, and no way to reach a person. The difference is not the AI model. It is which questions you automate, in what order, and how the handover works.',
    },
    { type: 'figure', art: 'support', caption: 'The automation ladder: answer, look up, act, and hand over everything else.' },
    { type: 'h2', text: 'Start with your ticket history' },
    {
      type: 'p',
      text: 'Export the last few months of support conversations and group them by reason. In most businesses a handful of reasons (order status, delivery times, returns, how-to questions, account access) make up a large share of volume. Those are your first candidates, as long as the answers are clear and the data exists.',
    },
    { type: 'h2', text: 'The order we recommend' },
    {
      type: 'table',
      head: ['Level', 'What the AI does', 'Examples', 'Risk'],
      rows: [
        ['1. Answer', 'Replies from your help articles and policies, with links', 'Opening hours, shipping times, return policy, how-to steps', 'Low'],
        ['2. Look up', 'Reads live data from your systems after verifying the customer', 'Order status, delivery tracking, appointment details, balance', 'Low to medium'],
        ['3. Act', 'Completes simple requests within set limits', 'Change delivery address before dispatch, reschedule, resend invoice', 'Medium'],
        ['4. Assist', 'Drafts replies for a person to approve on complex cases', 'Complaints, exceptions, refunds above a limit', 'Kept with people'],
      ],
    },
    {
      type: 'p',
      text: 'Move up a level only when the previous one is working and measured. Actions that involve money, personal data or exceptions to policy need limits and approvals; our [guardrails article](/blog/ai-agent-guardrails) explains how.',
    },
    { type: 'h2', text: 'What to keep human' },
    {
      type: 'list',
      items: [
        '**Upset customers.** When frustration shows, a person should take over quickly.',
        '**Exceptions.** Anything outside policy, where the right answer depends on the customer’s history and value.',
        '**High-value accounts.** Your biggest customers may expect a named person.',
        '**Anything legal, medical or safety-related.**',
        '**Cases where the AI is unsure.** It should say so and hand over, not guess.',
      ],
    },
    { type: 'h2', text: 'Handover is the most important feature' },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Make the human easy to reach',
      text: 'Customers forgive an AI that says “let me get a colleague” far more easily than one that traps them. Offer a clear way to reach a person, pass the whole conversation and any looked-up details along, and tell the customer when to expect a reply.',
    },
    { type: 'h2', text: 'Automation that helps your team even when the AI does not reply' },
    {
      type: 'list',
      items: [
        '**Tagging and routing.** Every incoming message classified by reason, language and urgency, then sent to the right queue.',
        '**Prioritising.** Angry, urgent or high-value messages moved to the top.',
        '**Drafting.** A suggested reply with the relevant order details already filled in.',
        '**Summarising.** Long email threads condensed into three lines before an agent opens them.',
      ],
    },
    { type: 'h2', text: 'Measure the right things' },
    {
      type: 'table',
      head: ['Metric', 'Why it matters'],
      rows: [
        ['Resolution rate (without a person)', 'How much the AI really handles, not just how many chats it starts'],
        ['Customer satisfaction on AI-handled chats', 'Compared with human-handled ones'],
        ['Handover rate and reasons', 'Shows what to improve or what to leave to people'],
        ['Wrong-answer reports', 'Every one becomes a test case'],
        ['First response time', 'Across all channels, including nights and weekends'],
      ],
    },
    {
      type: 'p',
      text: 'Before launch, we test support agents on real scenarios, including messy, angry and out-of-scope messages; see [how to test an AI agent](/blog/testing-ai-agents-before-go-live). After launch, we watch them with the routines in [monitoring AI agents in production](/blog/monitoring-ai-agents-in-production).',
    },
    {
      type: 'p',
      text: 'We build [AI chatbots and support agents](/services/chatbots) for websites, WhatsApp and email, connected to your helpdesk, store or CRM. For phone support, see our guide to the [AI receptionist](/blog/ai-receptionist-small-business). The free [48-hour AI business audit](/packages/audit) will show which of your support requests are worth automating first.',
    },
  ],
  faq: [
    {
      q: 'What customer support tasks can AI automate?',
      a: 'AI can answer common questions from your help content, look up order, delivery or account details, complete simple requests such as rescheduling or changing an address within limits, and tag, route, prioritise and draft replies for human agents.',
    },
    {
      q: 'What percentage of customer support can be automated with AI?',
      a: 'It depends on your ticket mix. Businesses with many repetitive questions about orders, delivery and policies can automate a large share; those with complex, technical or emotional cases much less. Group a few months of tickets by reason to estimate it for your business.',
    },
    {
      q: 'Will AI customer support frustrate my customers?',
      a: 'It will if customers cannot reach a person or the AI guesses. Keep automation to questions with clear answers, let the AI say when it is unsure, and make handover to a person easy, with the conversation passed along.',
    },
    {
      q: 'Which channels can AI customer support work on?',
      a: 'Website chat, email, WhatsApp, Facebook Messenger, Instagram and phone. The same knowledge and rules can serve every channel, connected to your helpdesk, e-commerce platform or CRM.',
    },
  ],
};
