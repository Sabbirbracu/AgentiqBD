import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-agent-development-cost',
  title: 'How much does it cost to build an AI agent in 2026?',
  metaTitle: 'AI Agent Development Cost in 2026: Build, Run and Maintain',
  excerpt:
    'Quotes for the same AI agent can differ by ten times. Here is what you are actually paying for, what it costs to run each month, and how to keep the first version small and affordable.',
  category: 'Guides',
  tags: ['AI agents', 'Pricing', 'Planning'],
  keywords: [
    'AI agent development cost',
    'cost to build an AI agent',
    'how much does an AI agent cost',
    'AI agent pricing 2026',
    'custom AI agent cost',
    'AI chatbot development cost',
  ],
  date: '2026-11-06',
  cover: 'cost',
  takeaways: [
    'An AI agent has three costs: the build, the monthly running cost, and ongoing care. Most quotes only show the first.',
    'The price is driven by integrations, the number of edge cases and the testing needed, not by "how smart" the AI is.',
    'A focused first version that automates one workflow can cost hundreds to a few thousand US dollars; multi-system agents cost much more.',
    'Monthly model usage is usually small next to the build, but measure it on real traffic before you scale.',
  ],
  services: ['ai-agents', 'workflow-automation', 'chatbots'],
  body: [
    {
      type: 'p',
      text: '**Short answer:** a focused AI agent that handles one workflow, such as answering customer questions from your documents or turning emails into CRM records, typically costs from a few hundred to a few thousand US dollars to build with a small specialist team. An agent that works across several systems, takes actions with money or customer data, and needs approvals and audit trails costs considerably more. On top of the build you pay a monthly running cost for the AI model and hosting, plus time for maintenance.',
    },
    {
      type: 'p',
      text: 'That range is wide on purpose. Two agents can look identical in a demo and differ by ten times in effort, because the demo is the easy part. This guide breaks down where the money really goes, so you can read any quote, ours included, with a clear head.',
    },
    { type: 'figure', art: 'cost', caption: 'Build, run and care: the three parts of an AI agent’s real cost.' },
    { type: 'h2', text: 'What are you actually paying for?' },
    {
      type: 'p',
      text: 'Calling an AI model is cheap and quick. The work that costs money is everything that turns a clever reply into a dependable part of your business:',
    },
    {
      type: 'table',
      head: ['Cost driver', 'What it covers', 'Why it changes the price'],
      rows: [
        ['Discovery and design', 'Mapping the workflow, the rules, the exceptions and what "good" looks like', 'Unclear processes take longer to pin down. Clear ones are quick.'],
        ['Integrations', 'Connecting the agent to your CRM, inbox, store, database, ERP or calendar', 'Each system adds authentication, data mapping and failure handling. Old systems without APIs cost the most.'],
        ['Knowledge and data', 'Collecting documents, cleaning them and making them searchable (RAG)', 'Messy, outdated or contradictory documents need cleaning before any AI can use them well.'],
        ['Guardrails', 'Permissions, approval steps, limits, audit logs, safe handover to people', 'The more an agent can do (refunds, bookings, record changes), the more protection it needs.'],
        ['Testing and evaluation', 'Scenario sets, grading, regression runs before every release', 'Agents that handle money, health or legal topics need far more test cases.'],
        ['Interface', 'Website widget, WhatsApp, email, phone line or an internal dashboard', 'Voice and multi-channel agents are more work than a single chat window.'],
      ],
    },
    {
      type: 'p',
      text: 'Notice what is not on the list: "making the AI smarter". Model capability is rented from providers such as Anthropic, OpenAI or Google. You pay a builder for judgement, integration and reliability. If a quote is mostly about the model, ask what happens around it. Our article on [how AI agents work](/blog/how-ai-agents-work) explains the parts in more detail.',
    },
    { type: 'h2', text: 'Typical price bands' },
    {
      type: 'p',
      text: 'These are the bands we work in at Agentiq BD, in US dollars. They are a guide for planning, not a fixed quote; the final price comes from the scope you agree.',
    },
    {
      type: 'table',
      head: ['What you get', 'Typical scope', 'Our range', 'Timeline'],
      rows: [
        ['Focused automation or knowledge assistant', 'One workflow, one or two connected tools, answers from your documents', '$500–$2,500', '1–4 weeks'],
        ['AI-powered product or customer-facing app', 'A web app or SaaS MVP with AI features, user accounts and an admin panel', '$1,500–$8,000+', '4–12 weeks'],
        ['Agent inside business operations', 'Multi-step agents across inventory, procurement, reporting or several branches', '$3,000–$15,000+', '8–20 weeks, in phases'],
      ],
      caption: 'Ranges from our published packages. Agencies in the US and Western Europe usually charge several times more for comparable scope, mostly because of salary costs.',
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Why the same agent gets very different quotes',
      text: 'One vendor quotes a demo: a chat window, a prompt and a few happy-path answers. Another quotes a system: integrations, error handling, tests, monitoring and handover rules. Ask every vendor to list exactly what is included, especially testing and what happens when the agent is unsure.',
    },
    { type: 'h2', text: 'What does an AI agent cost to run each month?' },
    {
      type: 'p',
      text: 'After launch, you pay for model usage, hosting and any third-party tools. Model providers charge per token (roughly, per piece of a word) read and written. A useful way to estimate it:',
    },
    {
      type: 'code',
      lang: 'text',
      caption: 'A back-of-the-envelope estimate for monthly model cost',
      code: `monthly model cost ≈ conversations per month
                    × average tokens per conversation (input + output)
                    × provider price per token

then add: hosting + vector database + telephony (voice only) + monitoring`,
    },
    {
      type: 'p',
      text: 'For most small and mid-sized businesses, model usage is a modest line item next to the build cost, because each conversation uses a small amount of text. Three things push it up: very long documents pasted into every request, agents that loop through many steps for each task, and voice agents, which also pay for speech recognition, speech generation and phone minutes. Provider prices change often, so measure on a week of real traffic before you scale, rather than trusting any estimate, including ours.',
    },
    { type: 'h2', text: 'The costs people forget' },
    {
      type: 'list',
      items: [
        '**Maintenance.** Models get updated, your prices and policies change, and the agent needs to keep up. Budget a small monthly retainer or a block of hours.',
        '**Human review time.** Someone on your team should look at flagged conversations every week, especially in the first months. That time is a real cost and the best quality investment you can make.',
        '**Knowledge upkeep.** An agent answering from last year’s price list is worse than no agent. Somebody must own the documents it reads.',
        '**Change requests.** Once the first agent works, everyone wants a second one. That is good news, but it is new scope.',
      ],
    },
    { type: 'h2', text: 'Build, buy, or use a no-code tool?' },
    {
      type: 'table',
      head: ['Option', 'Best when', 'Watch out for'],
      rows: [
        ['Off-the-shelf SaaS agent', 'Your need is common (website FAQ bot, basic helpdesk) and the tool already integrates with your stack', 'Monthly fees that grow with usage, limited control, your data and logic live in someone else’s product'],
        ['No-code builder', 'A simple internal workflow and someone on your team who enjoys configuring tools', 'Hard to test properly, fragile with complex rules, hidden limits at scale'],
        ['Custom build', 'The workflow is specific to your business, touches several systems, or needs strict guardrails', 'Higher upfront cost; choose a builder who tests and documents, so you are not locked in'],
      ],
    },
    {
      type: 'p',
      text: 'We are a custom builder, and we still tell clients to buy a SaaS tool when it fits. If you are not sure which side your problem falls on, our comparison of [AI agents, chatbots and automation](/blog/ai-agent-vs-chatbot-vs-automation) is a good place to start.',
    },
    { type: 'h2', text: 'How to keep the first version affordable' },
    {
      type: 'steps',
      items: [
        { title: 'Pick one painful workflow', text: 'Choose the task that eats the most hours or loses the most customers. Not five tasks. One.' },
        { title: 'Fix the process first', text: 'If the manual process is unclear, AI will copy the confusion faster. See [fix the process before you add AI](/blog/fix-the-process-before-ai).' },
        { title: 'Start with drafts, not actions', text: 'Let the agent prepare replies or records for a person to approve. It is cheaper to build, safer, and gives you real data on quality.' },
        { title: 'Measure, then expand', text: 'Track hours saved and error rates for a few weeks. Expand to actions and new channels only when the numbers say so.' },
      ],
    },
    { type: 'h2', text: 'What to send a vendor for an accurate quote' },
    {
      type: 'list',
      items: [
        'A short description of the workflow today, step by step, with who does what.',
        'The systems involved (for example HubSpot, Shopify, Gmail, a custom database) and whether they have APIs.',
        'Rough volumes: messages, calls or documents per day or month.',
        'What the agent may do on its own, and what always needs a person.',
        'Any rules about data: where it may be stored, who may see it, and industry regulations that apply.',
      ],
    },
    {
      type: 'p',
      text: 'If you would rather not write it up yourself, our free [48-hour AI business audit](/packages/audit) does exactly this: we map the workflow with you and come back with the top three opportunities and a realistic plan. You can also read [how we build an AI agent](/blog/how-we-build-ai-agents) to see what happens after the quote.',
    },
  ],
  faq: [
    {
      q: 'How much does a simple AI chatbot cost?',
      a: 'A chatbot that answers questions from your own documents on a website or WhatsApp is usually the cheapest kind of AI project: typically a few hundred to a couple of thousand US dollars with a specialist team, plus a small monthly running cost. It rises if the bot must look up live orders, book appointments or hand over to staff.',
    },
    {
      q: 'What are the monthly costs of an AI agent after launch?',
      a: 'You pay for AI model usage (charged per token), hosting, any vector database or telephony, and maintenance time. For most small businesses model usage is modest compared with the build. Measure it on a week of real traffic before scaling, because provider prices change often.',
    },
    {
      q: 'Why do AI agent quotes vary so much?',
      a: 'Because some quotes cover a demo and others cover a production system. Integrations, error handling, guardrails, testing and monitoring are most of the work. Ask each vendor to list exactly what is included, especially testing and handover to people.',
    },
    {
      q: 'Is it cheaper to outsource AI agent development?',
      a: 'Usually, yes. Specialist teams in countries such as Bangladesh charge a fraction of US or Western European agency rates for comparable work. The savings only hold if the team tests properly, documents its work and leaves the code and accounts in your name.',
    },
    {
      q: 'How long does it take to build an AI agent?',
      a: 'A focused agent for one workflow typically takes one to four weeks. Agents built into a larger product take four to twelve weeks, and agents across several business systems are usually delivered in phases over two to five months.',
    },
  ],
};
