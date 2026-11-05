import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-agent-roi',
  title: 'How to calculate the ROI of an AI agent (with a worked example)',
  metaTitle: 'AI Agent ROI: How to Calculate It, With a Worked Example',
  excerpt:
    'A simple, honest way to work out whether an AI agent will pay for itself: measure the baseline, count every cost, and calculate payback before you build. Includes a worked example and a template.',
  category: 'Strategy',
  tags: ['ROI', 'AI agents', 'Planning'],
  keywords: [
    'AI agent ROI',
    'AI ROI calculation',
    'ROI of AI automation',
    'is an AI agent worth it',
    'AI customer service ROI',
    'AI automation payback period',
  ],
  date: '2026-11-10',
  cover: 'roi',
  takeaways: [
    'ROI = (value gained − total cost) ÷ total cost. Total cost includes the build, monthly running costs, maintenance and your team’s review time.',
    'Measure the baseline first: volume, minutes per task, error rate and response time. Without it, any ROI figure is a guess.',
    'Hours saved only count as money if they are used for something else or avoid a hire. Count other benefits separately.',
    'High-volume, repetitive, rule-based work pays back fastest. Low-volume or constantly changing work often does not.',
  ],
  services: ['ai-agents', 'workflow-automation', 'reporting'],
  body: [
    {
      type: 'p',
      text: '**To calculate the ROI of an AI agent, compare the value it creates with everything it costs, over a fixed period.** Value is usually time saved (hours × the loaded hourly cost of the people doing the work), plus any revenue protected or gained. Cost is the one-time build plus monthly running costs, maintenance and the time your team spends reviewing the agent’s work. ROI = (value − cost) ÷ cost.',
    },
    {
      type: 'p',
      text: 'The maths is simple. What makes most AI ROI claims unreliable is the inputs: a guessed baseline, a forgotten cost, or hours “saved” that nobody actually gets back. This guide walks through the method we use with clients before we build anything.',
    },
    { type: 'figure', art: 'roi', caption: 'Payback is the month the cumulative savings line crosses the total cost line.' },
    { type: 'h2', text: 'Step 1: Measure the baseline' },
    {
      type: 'p',
      text: 'Before any AI, write down how the work runs today. Two weeks of honest numbers are worth more than any industry average:',
    },
    {
      type: 'list',
      items: [
        '**Volume.** How many messages, orders, documents or calls per month?',
        '**Time per task.** Average minutes, including the lookups and copy-pasting around the task itself.',
        '**Cost per hour.** The loaded cost of the people doing it: salary plus benefits, taxes and overhead.',
        '**Quality.** Error rate, rework, complaints, missed follow-ups.',
        '**Speed.** How long customers wait, and what happens out of hours.',
      ],
    },
    { type: 'h2', text: 'Step 2: Estimate what the agent will really do' },
    {
      type: 'p',
      text: 'Be conservative. An agent rarely handles everything. A realistic plan splits the work into three parts: tasks the agent completes on its own, tasks where it prepares a draft that a person approves, and tasks it hands straight to a person. A pilot on real examples is the only reliable way to know the split; until then, assume less automation than the demo suggests.',
    },
    { type: 'h2', text: 'Step 3: Count every cost' },
    {
      type: 'table',
      head: ['Cost', 'Type', 'Often forgotten?'],
      rows: [
        ['Build (discovery, integrations, guardrails, testing)', 'One-time', 'No'],
        ['Model usage, hosting, databases, telephony', 'Monthly', 'Sometimes'],
        ['Maintenance and updates', 'Monthly', 'Often'],
        ['Team time reviewing flagged conversations', 'Monthly', 'Almost always'],
        ['Knowledge upkeep (keeping documents current)', 'Monthly', 'Almost always'],
        ['Training staff on the new process', 'One-time', 'Often'],
      ],
    },
    {
      type: 'p',
      text: 'Our guide to [AI agent development cost](/blog/ai-agent-development-cost) explains how each of these is priced.',
    },
    { type: 'h2', text: 'A worked example: a customer support inbox' },
    {
      type: 'callout',
      tone: 'note',
      title: 'Example numbers, not a client result',
      text: 'The figures below are illustrative, chosen to show the method. Replace every one of them with your own baseline.',
    },
    {
      type: 'table',
      head: ['Input', 'Value'],
      rows: [
        ['Support messages per month', '1,500'],
        ['Average handling time today', '5 minutes'],
        ['Loaded cost of a support agent', '$25 per hour'],
        ['Messages the AI resolves on its own', '40% (600)'],
        ['Time per remaining message with an AI draft', '3 minutes instead of 5'],
        ['Build cost', '$2,500, one-time'],
        ['Running cost (model, hosting)', '$150 per month'],
        ['Maintenance', '$200 per month'],
        ['Review time', '6 hours per month ($150)'],
      ],
    },
    {
      type: 'code',
      lang: 'text',
      caption: 'The calculation',
      code: `Time saved
  resolved by AI:   600 msgs × 5 min        = 3,000 min = 50 h
  faster drafts:    900 msgs × (5 − 3) min  = 1,800 min = 30 h
  total:                                                 80 h / month

Monthly value       80 h × $25              = $2,000
Monthly cost        $150 + $200 + $150      = $500
Net monthly gain    $2,000 − $500           = $1,500

Payback             $2,500 ÷ $1,500         ≈ 1.7 months

First-year ROI
  value  12 × $2,000                        = $24,000
  cost   $2,500 + 12 × $500                 = $8,500
  ROI    ($24,000 − $8,500) ÷ $8,500        ≈ 182%`,
    },
    {
      type: 'p',
      text: 'Now stress-test it. If the agent resolves 20% instead of 40%, time saved drops to 65 hours, net gain to $1,125 a month, and payback stretches to just over two months. Still worthwhile. If volume were 150 messages a month instead of 1,500, the same agent would save about 8 hours, roughly $200 a month, which is less than the $500 it costs to run and look after. That is the honest answer for low-volume work: do not build it yet.',
    },
    { type: 'h2', text: 'Benefits you should count separately' },
    {
      type: 'p',
      text: 'Some of the most valuable results are real but hard to price. List them next to the ROI figure instead of inflating it:',
    },
    {
      type: 'list',
      items: [
        '**Response time.** Answers in seconds, at night and on weekends, often matter more to customers than cost does to you.',
        '**Consistency.** The same correct policy answer every time, with sources.',
        '**Capacity.** Handling a seasonal spike without hiring temporary staff.',
        '**Data.** A searchable record of what customers ask, which feeds product and marketing decisions.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Saved hours are not saved money by default',
      text: 'If the team’s hours are freed but nothing else changes, the cost is the same. Decide upfront what the time is for: faster growth without a new hire, more sales follow-ups, or less overtime. That decision is what turns hours into ROI.',
    },
    { type: 'h2', text: 'Where AI agents usually pay back fastest' },
    {
      type: 'table',
      head: ['Strong ROI', 'Weak ROI'],
      rows: [
        ['High volume of similar requests', 'A few requests a week'],
        ['Clear rules and reliable data', 'Judgement calls and missing data'],
        ['Slow responses cost you customers', 'Nobody minds waiting a day'],
        ['Copy-paste between systems', 'Work that is already one click'],
        ['Stable process', 'Process changes every month'],
      ],
    },
    { type: 'h2', text: 'Prove it with a pilot' },
    {
      type: 'steps',
      items: [
        { title: 'Record the baseline', text: 'Two weeks of volume, time, errors and response time.' },
        { title: 'Pilot one workflow', text: 'Start with drafts a person approves. It is safe and produces real numbers.' },
        { title: 'Compare like with like', text: 'Same metrics, same period length, same kind of requests. Our [evaluation metrics](/blog/ai-agent-evaluation-metrics) article lists what to track for quality.' },
        { title: 'Decide with data', text: 'Expand, adjust or stop. Stopping a pilot that does not pay is a good result too.' },
      ],
    },
    {
      type: 'p',
      text: 'In our free [48-hour AI business audit](/packages/audit) we do steps one and two on paper with you: we map the workflow, estimate the realistic split and give you the payback range before you spend anything. For ongoing tracking, a simple [reporting dashboard](/services/reporting) keeps the numbers honest after launch.',
    },
  ],
  faq: [
    {
      q: 'How do you calculate the ROI of an AI agent?',
      a: 'ROI = (value gained − total cost) ÷ total cost over a fixed period, usually the first year. Value is mostly time saved multiplied by the loaded hourly cost of the people doing the work. Total cost includes the build, monthly running costs, maintenance and your team’s review time.',
    },
    {
      q: 'How long does it take for an AI agent to pay for itself?',
      a: 'For high-volume, repetitive work such as a busy support inbox, payback can come within a few months. For low-volume work the agent may never pay back, because running and maintenance costs exceed the time saved. Calculate it with your own baseline before building.',
    },
    {
      q: 'What costs are usually missed in AI ROI calculations?',
      a: 'The most commonly missed costs are the time staff spend reviewing the agent’s work, keeping its knowledge documents up to date, ongoing maintenance when models or policies change, and training staff on the new process.',
    },
    {
      q: 'Is an AI agent worth it for a small business?',
      a: 'It is when the business has a repetitive task with enough volume, clear rules and reliable data, such as answering common customer questions or entering orders. Start with a small pilot that drafts work for a person to approve, and measure it against a baseline.',
    },
  ],
};
