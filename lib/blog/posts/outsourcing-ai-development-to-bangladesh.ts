import type { Post } from '../types';

export const post: Post = {
  slug: 'outsourcing-ai-development-to-bangladesh',
  title: 'Outsourcing AI and software development to Bangladesh: a guide for US, UK and EU companies',
  metaTitle: 'Outsourcing AI Development to Bangladesh: A Buyer’s Guide',
  excerpt:
    'Thinking of hiring a development team in Bangladesh? An honest guide to time zones, communication, contracts, IP, data protection and how to run a low-risk first project.',
  category: 'Strategy',
  tags: ['Outsourcing', 'Bangladesh', 'Hiring a team'],
  keywords: [
    'outsource AI development',
    'offshore software development Bangladesh',
    'software development company Bangladesh',
    'outsourcing to Bangladesh',
    'hire AI developers Bangladesh',
    'offshore AI development team',
  ],
  date: '2026-11-07',
  cover: 'global',
  takeaways: [
    'Bangladesh offers strong engineers at a fraction of US and Western European rates, with English as the working language of the tech industry.',
    'Dhaka is UTC+6 with no daylight saving: UK and EU mornings overlap with the Dhaka afternoon, and US mornings with the Dhaka evening.',
    'Protect yourself with the basics: code in your own repository, accounts in your name, IP assignment in the contract and milestone payments.',
    'Start with a small, paid, clearly scoped first milestone before committing to a large build.',
  ],
  services: ['custom-software', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**Short answer:** outsourcing AI or software development to Bangladesh works well when you treat it like hiring any remote team: clear scope, weekly demos, code and accounts in your name, and a contract that assigns the intellectual property to you. Done that way, you get experienced engineers at a fraction of US or Western European agency rates, with enough working-hour overlap for live calls.',
    },
    {
      type: 'p',
      text: 'We are a Bangladeshi company, so read this with that in mind. We have tried to write the guide we would want a friend abroad to read before hiring anyone here, including us.',
    },
    { type: 'figure', art: 'global', caption: 'Dhaka sits between Europe and the US: overlap with London in the afternoon, New York in the evening.' },
    { type: 'h2', text: 'Why companies look at Bangladesh' },
    {
      type: 'list',
      items: [
        '**Cost.** Senior engineering time costs a fraction of what it does in the US, UK or EU. That often decides whether a project happens at all.',
        '**A large, young engineering workforce.** Universities produce many computer science and engineering graduates every year, and many engineers have worked on international projects remotely.',
        '**English as the working language.** Technical documentation, code, tickets and client calls in the industry are in English.',
        '**Less crowded than the obvious choices.** Good teams are often easier to reach directly, and you are more likely to work with senior people instead of being handed down a long chain.',
      ],
    },
    { type: 'h2', text: 'What about time zones?' },
    {
      type: 'p',
      text: 'Bangladesh Standard Time is UTC+6 all year, with no daylight saving. That gives predictable overlap windows:',
    },
    {
      type: 'table',
      head: ['Your location', 'Time difference (northern winter)', 'Good overlap for calls'],
      rows: [
        ['London (GMT)', 'Dhaka is 6 hours ahead', 'Your 9am–12pm = Dhaka 3pm–6pm'],
        ['Berlin, Paris, Amsterdam (CET)', 'Dhaka is 5 hours ahead', 'Your 9am–1pm = Dhaka 2pm–6pm'],
        ['New York (EST)', 'Dhaka is 11 hours ahead', 'Your 8am–10am = Dhaka 7pm–9pm'],
        ['San Francisco (PST)', 'Dhaka is 14 hours ahead', 'Your 5pm–7pm = Dhaka 7am–9am next day'],
      ],
      caption: 'During northern summer, when the UK, EU and US move their clocks forward, Dhaka is one hour less ahead.',
    },
    {
      type: 'p',
      text: 'For US clients the difference is a feature as much as a problem: you describe a change at the end of your day, and a working version is waiting the next morning. It only works if requests are written clearly and there is one short live call a week to settle anything ambiguous.',
    },
    { type: 'h2', text: 'The real risks, and how to reduce each one' },
    {
      type: 'table',
      head: ['Risk', 'What it looks like', 'How to reduce it'],
      rows: [
        ['Unclear scope', 'Both sides think “done” means different things', 'Write acceptance criteria per milestone and demo against them'],
        ['Lock-in', 'Code, servers or API keys live only in the vendor’s accounts', 'Your repository, your cloud account, your model-provider account from day one'],
        ['Silent problems', 'Weeks without visible progress, then surprises', 'Weekly demo of working software, not status reports'],
        ['Quality', 'It works in the demo but breaks with real users', 'Ask how they test; for AI, ask to see their evaluation process'],
        ['Continuity', 'One developer disappears and nobody understands the code', 'Documentation, readable code and a handover document as deliverables'],
        ['Infrastructure', 'Power or internet outages delay a call', 'Ask about backup power and internet; most established teams have both'],
      ],
    },
    { type: 'h2', text: 'Contracts, IP and data protection' },
    {
      type: 'p',
      text: 'Nothing here replaces advice from your own lawyer, but these points belong in almost every outsourcing agreement:',
    },
    {
      type: 'list',
      items: [
        '**IP assignment.** All code, designs and documentation created for you are assigned to you on payment.',
        '**Confidentiality.** A mutual NDA, signed before you share sensitive data or business details.',
        '**Data protection.** If you are in the EU or UK and personal data is involved, you need a data processing agreement and a lawful basis for the transfer. Better still, design the system so the vendor never needs production personal data.',
        '**Milestones.** Payment against delivered, demonstrated milestones rather than large amounts upfront.',
        '**Exit terms.** What the vendor hands over if you part ways: code, credentials, documentation, and a reasonable handover period.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Keep the keys',
      text: 'Create the GitHub organisation, the cloud account and the AI provider account yourself, and invite the vendor in. You can remove their access with one click, and you never have to ask anyone for your own system back.',
    },
    { type: 'h2', text: 'How to run a low-risk first project' },
    {
      type: 'steps',
      items: [
        { title: 'Start with a paid discovery or a small milestone', text: 'One to two weeks of work with a concrete output: a workflow map, a working integration, or a first agent tested on real examples.' },
        { title: 'Judge the communication, not just the code', text: 'Did they ask good questions? Did they push back when something was unclear? Did they say “we do not know yet” when that was true?' },
        { title: 'Check the handover', text: 'Can your own developer, or another vendor, read and run what was delivered? If not, fix that before the next milestone.' },
        { title: 'Then commit to the bigger build', text: 'With trust established, a phased plan with clear milestones keeps both sides honest.' },
      ],
    },
    { type: 'h2', text: 'What to ask any offshore AI team' },
    {
      type: 'list',
      items: [
        'Can you show me a system you built that is live today, and explain what went wrong during the project?',
        'How do you test an AI agent before release? (A good answer mentions scenario sets and regression runs; see [how we test AI agents](/blog/testing-ai-agents-before-go-live).)',
        'Who will I talk to every week, and will that person write code on my project?',
        'Which accounts will be in my name, and what will you hand over at the end?',
        'What will this cost to run each month after launch?',
      ],
    },
    {
      type: 'p',
      text: 'We cover the full list, with red flags, in [how to choose an AI development company](/blog/how-to-choose-an-ai-development-company).',
    },
    { type: 'h2', text: 'How we work with international clients' },
    {
      type: 'p',
      text: 'Agentiq BD is a founder-led AI engineering and software company in Dhaka. You talk directly to the engineer who designs and builds your system. Our founder has worked on teams and projects in the US, Australia, Canada and Bangladesh, and we work in English, in your time zone’s overlap window, with code and accounts in your name. Our published [package prices](/packages) are in US dollars, so you can see the range before the first call.',
    },
    {
      type: 'p',
      text: 'If you want a second opinion on a project before you hire anyone, book the free [48-hour AI business audit](/packages/audit). You get the top three opportunities and a realistic plan, whether or not you build it with us.',
    },
  ],
  faq: [
    {
      q: 'Is Bangladesh a good country to outsource software development to?',
      a: 'Yes, for companies that manage remote work well. Bangladesh has a large, English-speaking engineering workforce and rates well below the US and Western Europe. As with any country, the quality depends on the team, so start with a small paid milestone and check how they test and communicate.',
    },
    {
      q: 'What is the time difference between Bangladesh and the US?',
      a: 'Bangladesh is UTC+6 with no daylight saving. Dhaka is 11 hours ahead of New York and 14 hours ahead of San Francisco in the northern winter, and one hour less in summer. US mornings overlap with the Dhaka evening, which suits a short daily or weekly call.',
    },
    {
      q: 'How do I protect my intellectual property when outsourcing to Bangladesh?',
      a: 'Sign an NDA before sharing details, include an IP assignment clause in the contract, keep the code in your own repository and the cloud and AI accounts in your name, and pay against delivered milestones. Your own lawyer should review the contract.',
    },
    {
      q: 'Can an offshore team handle GDPR requirements?',
      a: 'Yes, if it is planned. You need a data processing agreement and a lawful basis for transferring personal data outside the EU or UK. The simplest protection is to design the system so the development team works with test data and never needs production personal data.',
    },
  ],
};
