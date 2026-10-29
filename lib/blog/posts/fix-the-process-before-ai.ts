import type { Post } from '../types';

export const post: Post = {
  slug: 'fix-the-process-before-ai',
  title: 'Fix the process first: why we often start without AI',
  metaTitle: 'Fix the Process Before Adding AI: A Practical Method',
  excerpt:
    'Adding AI to a messy process only makes the mess faster. How we map a workflow, remove the waste, automate the rules, and only then decide where AI earns its place.',
  category: 'Strategy',
  tags: ['Automation', 'Strategy', 'Operations'],
  keywords: ['business process automation', 'AI adoption strategy', 'workflow automation before AI', 'process mapping'],
  date: '2026-10-29',
  cover: 'process',
  takeaways: [
    'AI cannot fix a process that nobody has written down.',
    'Map how the work really flows, including the WhatsApp messages and side spreadsheets.',
    'Remove steps first, then automate the rules, and add AI only where judgement is needed.',
    'The result is cheaper to run and much easier to trust.',
  ],
  services: ['workflow-automation', 'business-systems', 'reporting'],
  body: [
    {
      type: 'p',
      text: 'The most common request we hear is some version of "we want to use AI in our business". It is a good instinct. But when we ask what should change, the honest answer is often a process that has grown over years: a mix of spreadsheets, WhatsApp groups, phone calls and one experienced person who knows how it all fits together.',
    },
    {
      type: 'p',
      text: 'Put AI on top of that and you get the same confusion, only faster. So before we talk about models, we fix the process. Here is the four-step method we use.',
    },
    { type: 'figure', art: 'process', caption: 'From a tangle of hand-offs to a straight line: remove, automate, then add AI where judgement lives.' },
    { type: 'h2', text: 'Step 1: Map the real process' },
    {
      type: 'p',
      text: 'Not the version in the org chart or the policy document. The real one. We follow a single order, lead or request from the moment it arrives until it is finished, and write down every step:',
    },
    {
      type: 'list',
      items: [
        'Every hand-off between people or departments.',
        'Every time data is copied from one place to another.',
        'Every wait: for an approval, a reply, a file.',
        'Every side spreadsheet, notebook and WhatsApp group the work passes through.',
        'Every exception, and who handles it.',
      ],
    },
    {
      type: 'p',
      text: 'This usually takes a few conversations and an afternoon of watching the work happen. It is the most valuable part of the whole project, because it is the first time anyone has seen the process written down end to end.',
    },
    { type: 'h2', text: 'Step 2: Remove before you automate' },
    {
      type: 'p',
      text: 'Once the process is on paper, waste is easy to spot. The best step to automate is the one you can delete. Typical candidates:',
    },
    {
      type: 'list',
      items: [
        'The same data typed into two or three systems.',
        'Approvals that are always given and never actually read.',
        'Reports that are prepared every week and opened by no one.',
        'Workarounds that exist only because of a system that was replaced years ago.',
      ],
    },
    { type: 'h2', text: 'Step 3: Automate the rules' },
    {
      type: 'p',
      text: 'What remains is a mix of rule-based steps and steps that need judgement. The rule-based ones go to plain [workflow automation](/services/workflow-automation), with no AI involved: notifications, syncing data between systems, scheduled [reports and dashboards](/services/reporting), reminders and status updates. These are cheap to run, completely predictable and easy to test.',
    },
    { type: 'h2', text: 'Step 4: Add AI where judgement lives' },
    {
      type: 'p',
      text: 'Now, and only now, we look at where AI genuinely helps. It earns its place in steps that involve:',
    },
    {
      type: 'list',
      items: [
        '**Reading unstructured input:** emails, chat messages, voice notes, scanned PDFs.',
        '**Answering varied questions** from customers or staff, from your own documents.',
        '**Classifying and routing:** is this a complaint, an order, or a quote request?',
        '**Drafting:** replies, summaries, first versions of documents for a person to check.',
      ],
    },
    {
      type: 'p',
      text: 'By this point the AI has a clean job with clear inputs and outputs, which makes it far more accurate and far easier to test than if it had been dropped into the original tangle.',
    },
    { type: 'h2', text: 'A worked example' },
    {
      type: 'callout',
      tone: 'note',
      title: 'Illustrative example',
      text: 'This is a composite we use to explain the method, not a description of a specific client.',
    },
    {
      type: 'p',
      text: 'A distributor takes orders from shops by WhatsApp and phone. **Before:** a salesperson reads each message, checks stock in an Excel file, calls the warehouse to confirm, types the invoice in the accounting software, takes a photo of it and sends it back on WhatsApp. When the salesperson is busy, orders wait. When the Excel file is out of date, orders are promised that cannot be delivered.',
    },
    {
      type: 'p',
      text: '**After:** one product list becomes the single source of truth, and automation keeps stock levels in sync with the warehouse. An AI agent reads incoming order messages, including mixed Bangla and English, and turns them into draft orders. The salesperson checks and approves each draft with one tap. The invoice is generated and sent automatically, and a daily summary goes to the owner.',
    },
    {
      type: 'p',
      text: 'Notice that AI is one step out of five. The rest is cleaning up data and plain automation. That is typical, and it is why the result is reliable.',
    },
    { type: 'h2', text: 'How to know it is working' },
    {
      type: 'p',
      text: 'Decide what success means before anything is built, and measure the starting point. Good measures are simple: time from request to response, number of errors or corrections per week, hours spent on a task, orders handled per person. Without a baseline, nobody can say whether the project paid off, and opinions take the place of evidence.',
    },
    { type: 'h2', text: 'Start with one process' },
    {
      type: 'p',
      text: 'Pick the process that causes the most pain, fix it properly and prove the value. Then move to the next. Teams that try to transform everything at once usually end up with half-finished systems nobody trusts. If you want help choosing where to start, that is what our discovery call is for, and it often leads to [workflow automation](/services/workflow-automation) or a connected [business system](/services/business-systems) rather than AI first.',
    },
  ],
};
