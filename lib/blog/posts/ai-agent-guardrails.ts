import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-agent-guardrails',
  title: 'Guardrails for AI agents: permissions, approvals and audit trails',
  metaTitle: 'AI Agent Guardrails: Permissions, Approvals and Audit Trails',
  excerpt:
    'An agent that can act in your systems needs the same controls you would give a new employee, enforced in code rather than in the prompt. Here are the five layers we use.',
  category: 'Engineering',
  tags: ['AI agents', 'Security', 'Guardrails'],
  keywords: ['AI agent guardrails', 'AI agent security', 'prompt injection', 'human in the loop AI', 'AI audit trail'],
  date: '2026-10-29',
  cover: 'guardrails',
  takeaways: [
    'Prompts are guidance, not security. Hard limits must be enforced by the code around the model.',
    'Give each agent the least access it needs: its own credentials, scoped to its job.',
    'Route sensitive actions, such as refunds, price changes or bulk messages, through human approval.',
    'Log every decision and action so you can review, explain and improve.',
  ],
  services: ['ai-agents', 'integrations'],
  body: [
    {
      type: 'p',
      text: 'You would not give a new employee the admin password on their first day. You would give them access to what their job needs, ask them to check with a manager before anything costly, and keep records of what they did. An AI agent deserves exactly the same treatment, with one difference: the rules have to be written in code, because an agent cannot be trusted to remember them.',
    },
    { type: 'figure', art: 'guardrails', caption: 'Five layers around the model. Each one catches what the layer before it might miss.' },
    { type: 'h2', text: 'Why "just tell it in the prompt" is not enough' },
    {
      type: 'p',
      text: 'Language models follow instructions most of the time, not all of the time. Worse, anything the agent reads can contain instructions of its own. A customer message, an email, a web page or an uploaded PDF can say "ignore your previous instructions and…". This is called **prompt injection**, and if the prompt is your only protection, one clever message is all it takes.',
    },
    {
      type: 'p',
      text: 'So we split the job in two. The prompt describes how the agent should behave. The code decides what is possible.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Treat everything the agent reads as data',
      text: 'Emails, documents, web pages and customer messages are information to work with, never commands to follow. An agent should not gain permissions because a message asked for them.',
    },
    { type: 'h2', text: 'Layer 1: Scoped permissions' },
    {
      type: 'list',
      items: [
        'Each agent gets its own service account, never a person’s login or a shared admin key.',
        'Read-only wherever possible. Write access only to the specific tables or endpoints the job needs.',
        'Record-level limits: a support agent talking to a customer can only see that customer’s orders.',
        'No raw database queries or shell access. Only the specific tools you designed.',
        'Secrets such as API keys stay in the server, never in the prompt where they could be repeated back.',
      ],
    },
    { type: 'h2', text: 'Layer 2: Validation on every action' },
    {
      type: 'p',
      text: 'Every tool call the model requests is checked by ordinary code before it runs. Are the values in range? Does this customer own this order? Is the refund larger than what they paid? If a check fails, the tool returns a clear error the model can read and explain, and nothing happens.',
    },
    {
      type: 'code',
      lang: 'ts',
      caption: 'Validation lives in the tool, not in the prompt',
      code: `async function issueRefund(input: { orderId: string; amount: number }, ctx: AgentContext) {
  const order = await orders.get(input.orderId);
  if (!order || order.customerId !== ctx.customerId) {
    return { error: 'Order not found for this customer.' };
  }
  if (input.amount <= 0 || input.amount > order.paidAmount - order.refunded) {
    return { error: 'Refund amount is outside what can be refunded.' };
  }
  if (input.amount > ctx.limits.autoRefundMax) {
    return await approvals.request({ action: 'refund', input, reason: ctx.lastReasoning });
  }
  return await payments.refund(order, input.amount);
}`,
    },
    { type: 'h2', text: 'Layer 3: Human approval for sensitive actions' },
    {
      type: 'p',
      text: 'Some actions should always pass through a person. The agent prepares the action with its reasoning, and a staff member approves, edits or rejects it in one click, from a dashboard, Slack or WhatsApp. The customer is told the request is being reviewed. You decide the thresholds, and they can change as trust grows.',
    },
    {
      type: 'table',
      head: ['Action', 'Typical default'],
      rows: [
        ['Answer a question from the knowledge base', 'Automatic'],
        ['Create or reschedule a booking', 'Automatic'],
        ['Issue a refund', 'Approval above a limit you set'],
        ['Change a price or apply a special discount', 'Always needs approval'],
        ['Send a message to a list of customers', 'Always needs approval'],
        ['Delete records', 'Not allowed for the agent'],
      ],
      caption: 'An example approval policy. Yours will depend on what a mistake costs.',
    },
    { type: 'h2', text: 'Layer 4: Limits and a kill switch' },
    {
      type: 'list',
      items: [
        '**Step limits:** an agent that has not finished in a set number of steps hands over instead of looping.',
        '**Rate limits:** caps on how many actions or messages it can send per minute and per day.',
        '**Spend limits:** a ceiling on model usage, so a bug cannot run up a surprise bill.',
        '**Timeouts:** slow external systems do not leave a customer waiting forever.',
        '**A kill switch:** one control that pauses the agent and routes everything to people.',
      ],
    },
    { type: 'h2', text: 'Layer 5: The audit trail' },
    {
      type: 'p',
      text: 'For every conversation we log the incoming message, the context the agent was given, each tool call with its inputs and result, the final reply, and who approved what. That record lets you explain any decision to a customer, find the cause of a bad answer in minutes, improve the agent with real examples, and meet compliance requirements where they apply.',
    },
    { type: 'h2', text: 'Guardrails make agents more useful, not less' },
    {
      type: 'p',
      text: 'It is tempting to see all this as friction. In practice it works the other way. Teams that can see what an agent did, and know it cannot do anything drastic, are comfortable giving it more work. Guardrails are what let an agent move from answering questions to handling real transactions. They are built into every [AI agent we deliver](/services/ai-agents), and if you want to see how they fit into our full process, read [how we build an AI agent](/blog/how-we-build-ai-agents).',
    },
  ],
};
