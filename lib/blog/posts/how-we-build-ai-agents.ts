import type { Post } from '../types';

export const post: Post = {
  slug: 'how-we-build-ai-agents',
  title: 'How we build an AI agent, from bottleneck to go-live',
  metaTitle: 'How We Build AI Agents: Our Process from Scoping to Launch',
  excerpt:
    'The six stages we follow to build AI agents that hold up with real customers: mapping the job, designing tools, writing instructions, guardrails, testing and a careful launch.',
  category: 'Engineering',
  tags: ['AI agents', 'Process', 'Engineering'],
  keywords: ['how to build an AI agent', 'AI agent development process', 'AI agent development company', 'build AI agent for business'],
  date: '2026-10-29',
  cover: 'build',
  takeaways: [
    'We start by mapping the work a person does today, not by writing prompts.',
    'Tools come before prompts: the actions an agent can take define what it can safely do.',
    'Every agent ships with scoped permissions, approvals for sensitive actions, logs and a human handover.',
    'We test against written scenarios before any customer sees the agent, then launch narrowly and widen as trust grows.',
  ],
  services: ['ai-agents', 'integrations'],
  body: [
    {
      type: 'p',
      text: 'Building a demo agent takes an afternoon. Building one that a business can rely on every day, with real customers, real data and real consequences, takes a process. This is ours. It is not the only way to do it, but each stage exists because skipping it caused problems somewhere.',
    },
    { type: 'figure', art: 'build', caption: 'Our six stages, from mapping the job to a narrow, supervised launch.' },
    { type: 'h2', text: 'Stage 1: Map the job before the agent' },
    {
      type: 'p',
      text: 'We sit with the people who do the work today and write down what actually happens: the requests that come in, what they look up to answer them, the decisions they make, the actions they take, and the exceptions that need a manager. The output is a simple job sheet.',
    },
    {
      type: 'table',
      head: ['Request', 'What the person checks', 'Action', 'Approval?'],
      rows: [
        ['"Is the medium size in stock?"', 'Inventory sheet', 'Reply with stock and price', 'No'],
        ['"Book me in for Friday"', 'Calendar', 'Create the booking', 'No'],
        ['"I want a refund"', 'Order and refund policy', 'Prepare the refund', 'Yes'],
        ['"Complaint about a staff member"', 'Nothing', 'Hand to the manager', 'Always a person'],
      ],
      caption: 'Part of a job sheet for a retail support agent',
    },
    {
      type: 'p',
      text: 'This table becomes the scope. Anything not on it, the agent hands over to a person. It also shows, before any code is written, whether an agent is even the right tool. If every row is a fixed rule, plain [workflow automation](/services/workflow-automation) will do the job more cheaply.',
    },
    { type: 'h2', text: 'Stage 2: Design the tools' },
    {
      type: 'p',
      text: 'Each action on the job sheet becomes a tool, a function the agent can ask to run. We spend more time here than anywhere else, because tools decide what the agent can do and how safely it can do it. Our rules:',
    },
    {
      type: 'list',
      items: [
        '**One tool, one job.** `get_order_status` and `cancel_order` are separate, even if they hit the same API.',
        '**Names a new employee would understand.** The model picks tools by reading their names and descriptions.',
        '**Validate everything in code.** Types, ranges and ownership are checked before the action runs, never left to the prompt.',
        '**Return small, clear results.** A tool that dumps a whole database row confuses the model. Return what the next decision needs.',
        '**Separate reading from writing.** Look-up tools and tools that change data get different permissions.',
      ],
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Read before write',
      text: 'We often launch with read-only tools first: the agent looks things up and drafts replies, and a person sends them. Tools that create, update or send are switched on once the team trusts the output.',
    },
    { type: 'h2', text: 'Stage 3: Write the instructions' },
    {
      type: 'p',
      text: 'Only now do we write the system prompt. We keep it structured, so it can be reviewed and changed without side effects:',
    },
    {
      type: 'code',
      lang: 'text',
      caption: 'The skeleton of our agent instructions',
      code: `ROLE        Who you are and who you serve.
GOAL        What a finished conversation looks like.
TOOLS       When to use each tool, and when not to.
NEVER       Things you must never do or promise.
HAND OVER   Situations that always go to a person.
STYLE       Tone, length, language (reply in the customer's language).
FORMAT      How to present prices, dates and order numbers.`,
    },
    {
      type: 'p',
      text: 'Language matters more than people expect. Customers in Bangladesh often mix Bangla, English and Banglish in a single message. We write instructions and test cases for all three, so the agent replies naturally in whatever the customer used.',
    },
    { type: 'h2', text: 'Stage 4: Add the guardrails' },
    {
      type: 'p',
      text: 'An agent that acts in your systems needs the controls you would give a new employee, enforced in code. That means its own credentials scoped to its job, validation on every action, a human approval queue for sensitive actions such as refunds or price changes, limits on steps and spending, and a full audit log. We wrote a whole article on this: [guardrails for AI agents](/blog/ai-agent-guardrails).',
    },
    { type: 'h2', text: 'Stage 5: Test with real scenarios' },
    {
      type: 'p',
      text: 'Before anyone outside the team talks to the agent, we build a scenario set: real past requests (anonymised), variations with typos and mixed languages, and deliberately hard cases such as angry customers, missing information and attempts to trick the agent. Every change to prompts, tools or models is run against the full set. The details are in [how we test an AI agent](/blog/testing-ai-agents-before-go-live).',
    },
    { type: 'h2', text: 'Stage 6: Launch narrow, then widen' },
    {
      type: 'p',
      text: 'We never switch an agent on for everyone at once. A typical launch looks like this:',
    },
    {
      type: 'steps',
      items: [
        { title: 'Shadow mode', text: 'The agent drafts every reply; a person reviews and sends. We compare drafts with what the person would have written.' },
        { title: 'Narrow live', text: 'One channel, or certain hours, or one type of request, answered by the agent directly, with staff watching the log.' },
        { title: 'Widen', text: 'More channels, request types and write actions, added one at a time as each proves itself.' },
        { title: 'Steady state', text: 'Regular review of flagged conversations. Every real failure becomes a new test scenario.' },
      ],
    },
    { type: 'h2', text: 'What you get at the end' },
    {
      type: 'list',
      items: [
        'The agent, connected to your channels (website, WhatsApp, email or phone) and your systems through [integrations](/services/integrations).',
        'An admin view of conversations, actions, approvals and logs.',
        'The scenario test set, so changes can be checked safely later.',
        'Documentation and a handover session for your team.',
        'A support plan agreed up front, covering monitoring and improvements.',
      ],
    },
    { type: 'h2', text: 'How long does it take?' },
    {
      type: 'p',
      text: 'It depends mostly on integrations: an agent that reads from one well-documented system is very different from one that writes to three older ones. We give a clear estimate after discovery rather than a number up front, and we often start with a working prototype of the core workflow so you can judge the value before committing to the full build. If you have a process in mind, our [AI agent development](/services/ai-agents) page explains how to get started.',
    },
  ],
};
