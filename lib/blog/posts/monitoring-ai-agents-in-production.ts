import type { Post } from '../types';

export const post: Post = {
  slug: 'monitoring-ai-agents-in-production',
  title: 'Monitoring AI agents in production: what to log, alert on and review',
  metaTitle: 'AI Agent Monitoring in Production: Logs, Alerts and Reviews',
  excerpt:
    'AI agents rarely crash. They fail quietly: a wrong answer, a skipped step, a cost that creeps up. Here is what to log for every conversation, which problems deserve an alert, and how a weekly review keeps an agent healthy.',
  category: 'Engineering',
  tags: ['AI agents', 'Monitoring', 'Evaluation'],
  keywords: [
    'AI agent monitoring',
    'monitoring AI agents in production',
    'AI agent observability',
    'LLM monitoring',
    'AI agent logging',
    'model drift',
  ],
  date: '2026-11-04',
  cover: 'monitoring',
  takeaways: [
    'Log every conversation as a trace: inputs, retrieved documents, tool calls, versions, cost, timing and outcome, with personal data masked.',
    'Alert immediately on hard failures (tool errors, blocked actions, cost or latency spikes); review softer trends weekly.',
    'Send flagged conversations to a review queue: handovers, unhappy customers, staff corrections and a random sample.',
    'Re-run the test set on a schedule even when nothing changed, and pin model versions, because providers update models behind the same name.',
  ],
  services: ['ai-agents', 'chatbots'],
  body: [
    {
      type: 'p',
      text: 'Ordinary software tends to fail loudly. A server goes down, an error appears, someone gets paged. AI agents fail quietly. The agent keeps replying, politely and confidently, while it gives an outdated price, skips a step it used to take, or starts handing every third customer to a person. Nothing crashes, so nothing alerts.',
    },
    {
      type: 'p',
      text: '**AI agent monitoring means recording what the agent sees, decides and does in every conversation, and checking those records for problems before customers report them.** Testing before launch tells you the agent was good on the day it went live. Monitoring tells you it is still good today.',
    },
    { type: 'figure', art: 'monitoring', caption: 'A daily error count with an alert line: the spike is a failing CRM connection, caught before the weekly review.' },
    { type: 'h2', text: 'Why agents drift after launch' },
    {
      type: 'list',
      items: [
        '**The world changes.** Prices, policies, stock and opening hours change, and the documents or data the agent reads may not keep up.',
        '**Customers change.** A new product, a promotion or a delivery problem brings questions the test set never covered.',
        '**The model changes.** Providers update models, sometimes behind the same name, and behaviour shifts in small ways.',
        '**Connected systems change.** A CRM field is renamed, an API slows down, a password expires.',
        '**The agent changes.** Every prompt edit or new tool can fix one thing and break another.',
      ],
    },
    { type: 'h2', text: 'What to log for every conversation' },
    {
      type: 'p',
      text: 'The basic unit of monitoring is a trace: one record per conversation, holding every step the agent took. Without traces, you can see that something went wrong but not why.',
    },
    {
      type: 'code',
      lang: 'yaml',
      caption: 'A simplified trace from a support agent (personal details masked)',
      code: `conversation: c-48213
channel: whatsapp
versions: { prompt: v14, model: "provider-model-2026-09-01", tools: v6 }
steps:
  - customer: "Order A-10XX still not here, it's been a week"
  - tool: get_order
    input: { order_id: "A-10XX" }
    output: { status: "with courier", eta: "yesterday" }
    ms: 420
  - tool: get_courier_status
    error: timeout
    ms: 8000
  - agent: "Sorry, I can't reach the courier right now. I've asked our team to check and they'll message you today."
  - handover: { to: support_queue, reason: tool_failure }
outcome: handed_over
cost_usd: 0.004
total_ms: 11200`,
    },
    {
      type: 'p',
      text: 'At minimum, record: the messages, the documents retrieved, each tool call with its inputs, outputs, errors and timing, the versions of the prompt, model and tools, the cost, and the outcome (resolved, handed over, abandoned). Version numbers matter more than they look: they are how you connect a change in behaviour to the change that caused it.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Logs are personal data too',
      text: 'Traces contain names, phone numbers, addresses and sometimes payment questions. Mask what you do not need, restrict who can read the logs, and delete them after a set period. Monitoring should not create a bigger privacy risk than the agent itself.',
    },
    { type: 'h2', text: 'Alerts: what needs attention now' },
    {
      type: 'p',
      text: 'Alert only on things that need someone to act within hours. Too many alerts, and people stop reading them. These are the ones we set up:',
    },
    {
      type: 'table',
      head: ['Alert', 'Why it matters'],
      rows: [
        ['Tool error rate above normal', 'A connected system is down or changed; the agent is failing on real requests'],
        ['A guardrail blocked an action', 'Something tried to make the agent exceed a limit or touch data it should not; someone should look'],
        ['Daily cost above budget', 'A loop, a misuse, or a sudden rise in traffic; better found today than on the invoice'],
        ['Response time spike', 'Customers are waiting; often a slow provider or tool'],
        ['Handover rate jumps or drops sharply', 'Either the agent is struggling, or it has stopped passing on cases it should'],
        ['Model provider errors or outage', 'Switch to the fallback, or put a clear message in front of customers'],
      ],
    },
    {
      type: 'p',
      text: 'Every alert needs a named owner and a first step, such as "check the CRM connection" or "pause refunds". The most important first step is the kill switch: a way to switch the agent off, or limit it to answering questions only, in seconds. See [guardrails for AI agents](/blog/ai-agent-guardrails).',
    },
    { type: 'h2', text: 'Trends: what to review weekly' },
    {
      type: 'p',
      text: 'Slower changes do not need an alert, but they do need a regular look. A weekly dashboard of the production metrics from [AI agent evaluation metrics](/blog/ai-agent-evaluation-metrics) covers most of it: resolution rate, human correction rate, escalation rate, response time, cost per resolved task and customer feedback. Read them as trends. One bad day is noise; four weeks of slow decline is a signal.',
    },
    { type: 'h2', text: 'The review queue' },
    {
      type: 'p',
      text: 'Numbers show that something changed. Reading conversations shows what. We send these conversations to a review queue for a person to read:',
    },
    {
      type: 'list',
      items: [
        '**Every handover**, to check it was needed and that the summary was useful.',
        '**Unhappy customers**: low ratings, complaints, or angry language.',
        '**Staff corrections**: drafts that were edited heavily, actions that were undone, tickets that were reopened.',
        '**Low grader scores**, if a second model checks a sample of answers for accuracy.',
        '**A small random sample**, because the worst failures are often the ones nobody flagged.',
      ],
    },
    {
      type: 'p',
      text: 'Each real failure gets fixed, and then becomes a new case in the test set, so the same mistake cannot quietly come back. This loop is what makes an agent better over time instead of slowly worse.',
    },
    { type: 'h2', text: 'Catching drift on purpose' },
    {
      type: 'p',
      text: 'Some changes happen without anyone touching the agent. Two habits catch them:',
    },
    {
      type: 'list',
      items: [
        '**Pin model versions** where the provider allows it, and upgrade on purpose, after the test set passes on the new version.',
        '**Re-run the full test set on a schedule**, weekly for example, even when nothing changed. If yesterday’s pass becomes today’s fail with no change on your side, something underneath moved.',
      ],
    },
    { type: 'h2', text: 'A simple weekly routine' },
    {
      type: 'steps',
      items: [
        { title: 'Check the dashboard', text: 'Resolution, corrections, handovers, response time and cost, compared with the previous weeks.' },
        { title: 'Read the queue', text: 'Go through flagged conversations and the random sample. Note each failure and its cause.' },
        { title: 'Fix and add tests', text: 'Fix the causes, add each failure to the test set, and run the full set before releasing the fix.' },
        { title: 'Update the sources', text: 'Confirm that prices, policies and documents the agent relies on are still current.' },
      ],
    },
    {
      type: 'p',
      text: 'In the first weeks after launch this takes the most time, because that is when the agent meets the questions nobody predicted. It usually settles into a short weekly check once the common failures are fixed.',
    },
    {
      type: 'p',
      text: 'We build tracing, alerts and a review queue into every [AI agent](/services/ai-agents) and [chatbot](/services/chatbots) we deliver. For the testing that comes before all of this, start with [how to test an AI agent before go-live](/blog/testing-ai-agents-before-go-live).',
    },
  ],
};
