import type { Post } from '../types';

export const post: Post = {
  slug: 'how-to-choose-an-ai-development-company',
  title: 'How to choose an AI development company: 12 questions to ask before you sign',
  metaTitle: 'How to Choose an AI Development Company: 12 Questions to Ask',
  excerpt:
    'Every AI agency has a slick demo. These twelve questions, and the red flags to listen for, separate the teams that ship reliable systems from the ones that ship prototypes.',
  category: 'Strategy',
  tags: ['Hiring a team', 'AI agents', 'Planning'],
  keywords: [
    'how to choose an AI development company',
    'AI development agency',
    'hire AI developers',
    'questions to ask an AI agency',
    'AI consulting company',
    'AI vendor evaluation',
  ],
  date: '2026-11-11',
  cover: 'vetting',
  takeaways: [
    'A demo proves almost nothing. Ask how the team tests, what happens when the agent is unsure, and what it costs to run.',
    'Insist on ownership: your code repository, your cloud and AI accounts, your data, from day one.',
    'Good vendors tell you when AI is the wrong tool and push back on unclear scope.',
    'Start with a small, paid, well-defined first milestone, and judge the team on how they handle it.',
  ],
  services: ['ai-agents', 'custom-software'],
  body: [
    {
      type: 'p',
      text: '**The best way to choose an AI development company is to look past the demo and ask how they build for the real world:** how they test, how they handle mistakes, who owns what, and what the system costs to run. A capable team answers these questions specifically and calmly. A weak one answers with confidence and buzzwords.',
    },
    {
      type: 'p',
      text: 'We sell AI development, so we have an obvious interest here. We still think these are the right questions to ask anyone, including us.',
    },
    { type: 'figure', art: 'vetting', caption: 'Twelve questions, three groups: proof, ownership and how the system behaves when things go wrong.' },
    { type: 'h2', text: 'Proof: can they really build it?' },
    { type: 'h3', text: '1. Can you show me something live that you built?' },
    {
      type: 'p',
      text: 'Not a video, not a prototype: a system real people use today. Ask what went wrong during that project and what they changed. Teams with real experience have stories about failures. Teams without it only have features.',
    },
    { type: 'h3', text: '2. Who will I talk to every week, and do they build?' },
    {
      type: 'p',
      text: 'In many agencies the person who sells is not the person who designs. Find out who makes the technical decisions on your project and make sure you speak to them before signing.',
    },
    { type: 'h3', text: '3. Would you recommend not using AI for any part of this?' },
    {
      type: 'p',
      text: 'This is the most revealing question. Plenty of business problems are better solved with a plain rule, a form or a database. A team that says “this part does not need AI” is a team that thinks about your outcome, not their invoice. See [AI agent vs chatbot vs automation](/blog/ai-agent-vs-chatbot-vs-automation).',
    },
    { type: 'h3', text: '4. What do you need from us, and when?' },
    {
      type: 'p',
      text: 'AI projects stall when the client’s documents, data access or decisions arrive late. A good vendor tells you upfront which people, files and system access they need, and plans around it.',
    },
    { type: 'h2', text: 'Reliability: how will it behave in the real world?' },
    { type: 'h3', text: '5. How do you test an AI agent before release?' },
    {
      type: 'p',
      text: 'A good answer includes a written set of test scenarios built from real requests, difficult edge cases, grading criteria for facts and actions, and re-running the whole set after every change. If the answer is “we try it a lot”, keep looking. Our approach is described in [how to test an AI agent](/blog/testing-ai-agents-before-go-live).',
    },
    { type: 'h3', text: '6. What happens when the AI does not know the answer?' },
    {
      type: 'p',
      text: 'Listen for: it says so, it asks a clarifying question, or it hands over to a person with the context attached. Be wary of anyone who promises the AI will “always” answer correctly.',
    },
    { type: 'h3', text: '7. What can the agent do without a person approving it?' },
    {
      type: 'p',
      text: 'Refunds, bookings, record changes and messages to customers should have limits and, where it matters, an approval step. Ask to see how permissions and audit logs work. Our [guardrails article](/blog/ai-agent-guardrails) lists what to expect.',
    },
    { type: 'h3', text: '8. How will we know it is still working after launch?' },
    {
      type: 'p',
      text: 'Models change, documents go out of date, integrations break. Ask about logging, alerts and a review routine for flagged conversations. See [monitoring AI agents in production](/blog/monitoring-ai-agents-in-production).',
    },
    { type: 'h2', text: 'Ownership and money: what are you really buying?' },
    { type: 'h3', text: '9. Whose accounts will everything run in?' },
    {
      type: 'p',
      text: 'The code repository, the cloud hosting and the AI provider account should be in your name, with the vendor invited in. Then you can change vendors without asking permission to keep your own system.',
    },
    { type: 'h3', text: '10. What will it cost to run each month?' },
    {
      type: 'p',
      text: 'Model usage, hosting, telephony and maintenance. A vendor who cannot estimate running costs has probably not run a system like yours in production. Our [cost guide](/blog/ai-agent-development-cost) explains the moving parts.',
    },
    { type: 'h3', text: '11. What exactly is out of scope?' },
    {
      type: 'p',
      text: 'Clear exclusions prevent most disputes. Ask for them in writing, alongside acceptance criteria for each milestone.',
    },
    { type: 'h3', text: '12. What do we get if we part ways?' },
    {
      type: 'p',
      text: 'Code, documentation, credentials, test scenarios and a handover period. If a vendor resists this question, that tells you how the relationship would end.',
    },
    { type: 'h2', text: 'Red flags' },
    {
      type: 'table',
      head: ['You hear', 'What it usually means'],
      rows: [
        ['“Our AI is 99% accurate”', 'Measured on what? Without a test set built from your cases, the number means nothing'],
        ['“We use our proprietary AI”', 'Often a wrapper around a public model, with you locked in to the wrapper'],
        ['“Give us your admin password and we will set it up”', 'Weak security habits that will end up in your system too'],
        ['“We can start the full build tomorrow”', 'No discovery, so the scope and the price will move later'],
        ['“Testing is included” (with no detail)', 'Testing will be whatever time is left at the end'],
        ['A price far below everyone else', 'A demo is being quoted, not a production system'],
      ],
    },
    { type: 'h2', text: 'A simple scoring sheet' },
    {
      type: 'p',
      text: 'Score each vendor from 1 to 5 on these, after a call with the person who would lead your project:',
    },
    {
      type: 'list',
      items: [
        'Relevant live work, explained honestly.',
        'Clear, specific testing and monitoring process.',
        'Ownership terms: accounts, code and handover.',
        'Transparent pricing, including monthly running costs.',
        'Quality of questions they asked you.',
      ],
    },
    {
      type: 'p',
      text: 'Then give the best-scoring team a small, paid, clearly scoped first milestone. How they deliver it is the real interview. If you are comparing teams in different countries, our [guide to outsourcing AI development to Bangladesh](/blog/outsourcing-ai-development-to-bangladesh) covers time zones, contracts and IP.',
    },
    {
      type: 'p',
      text: 'Want to put Agentiq BD through these twelve questions? [Book a discovery call](/#contact) with the engineer who would build your system, or start with the free [48-hour AI business audit](/packages/audit).',
    },
  ],
  faq: [
    {
      q: 'What should I look for in an AI development company?',
      a: 'Look for live systems they built and can explain honestly, a specific testing and monitoring process, ownership terms that keep code and accounts in your name, transparent pricing including monthly running costs, and a willingness to say when AI is the wrong tool.',
    },
    {
      q: 'What questions should I ask an AI agency before hiring them?',
      a: 'Ask to see something live they built, who you will talk to every week, how they test an agent before release, what happens when the AI does not know an answer, what it may do without approval, whose accounts everything runs in, what it costs to run monthly, and what you receive if you part ways.',
    },
    {
      q: 'What are red flags when hiring an AI developer?',
      a: 'Accuracy claims without a test set built from your cases, “proprietary AI” that locks you in, requests for admin passwords, starting a full build without discovery, vague promises that testing is included, and prices far below everyone else.',
    },
    {
      q: 'Should I hire an AI agency or build an in-house team?',
      a: 'An agency is usually faster and cheaper for a first system, especially if you do not yet know how much AI work you will have. Build in-house once AI is core to your product and you have steady work for a team. Either way, keep code and accounts in your own name.',
    },
  ],
};
