import type { Post } from '../types';

export const post: Post = {
  slug: 'inventory-software-vs-spreadsheets',
  title: 'When spreadsheets stop working: 8 signs you need inventory and operations software',
  metaTitle: 'Inventory Software vs Spreadsheets: 8 Signs It’s Time to Switch',
  excerpt:
    'Spreadsheets are a great start and a poor operating system. Eight warning signs that your stock, purchasing or production has outgrown them, and how to move to proper software without stopping the business.',
  category: 'Strategy',
  tags: ['Business systems', 'ERP', 'Inventory'],
  keywords: [
    'inventory management software',
    'inventory software vs spreadsheets',
    'replace Excel with software',
    'ERP for small business',
    'when do you need an ERP',
    'custom inventory system',
  ],
  date: '2026-11-02',
  cover: 'inventory',
  takeaways: [
    'Spreadsheets break down when several people edit the same numbers, stock moves between locations, or decisions depend on yesterday’s data.',
    'The cost of staying is hidden: stock-outs, over-ordering, manual reconciliation and decisions made on wrong numbers.',
    'Choose off-the-shelf software when your process is standard; build custom when your process is what makes you competitive.',
    'Move in phases: one process at a time, with the old spreadsheet running in parallel until the numbers agree.',
  ],
  services: ['business-systems', 'custom-software', 'reporting'],
  body: [
    {
      type: 'p',
      text: '**You need inventory or operations software when your spreadsheets can no longer give one correct answer, quickly, to questions like “how much do we have, where is it, and what do we need to order?”** That usually happens when several people edit the same files, stock moves between locations, or purchase decisions depend on numbers someone has to reconcile by hand first.',
    },
    {
      type: 'p',
      text: 'Spreadsheets are not the enemy. Almost every business starts with them, and they are perfect while one person owns the numbers. The trouble begins as the business grows and the spreadsheet quietly becomes the company’s operating system, without any of the safeguards an operating system needs.',
    },
    { type: 'figure', art: 'inventory', caption: 'Five spreadsheets, five versions of the truth, versus one system with live stock.' },
    { type: 'h2', text: 'Eight signs you have outgrown spreadsheets' },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Nobody trusts the stock number.** People walk to the shelf or call the warehouse before promising a delivery.',
        '**Files called “FINAL_v3_updated”.** Several versions exist and nobody is sure which is current.',
        '**Month-end takes days.** Someone spends days reconciling purchases, sales and stock before anyone can see results.',
        '**Stock-outs and over-stock at the same time.** You run out of fast movers while slow items fill the store.',
        '**Purchasing lives in email.** Quotes, approvals and POs are scattered across inboxes and chat groups.',
        '**More than one location.** Branches, warehouses or production lines each keep their own sheet.',
        '**Formulas only one person understands.** If they are away, decisions wait.',
        '**No history.** You cannot see who changed a number, when, or why.',
      ],
    },
    {
      type: 'p',
      text: 'If three or more of these are true, the spreadsheet is costing you more than software would. The cost is just harder to see, because it appears as lost sales, cash tied up in stock and hours of manual work.',
    },
    { type: 'h2', text: 'What proper software gives you' },
    {
      type: 'table',
      head: ['Spreadsheet today', 'With inventory and operations software'],
      rows: [
        ['Stock updated when someone remembers', 'Stock updated by every sale, receipt, transfer and production run'],
        ['One file per location', 'One system, with stock per location and transfers between them'],
        ['Reorder decisions by gut feeling', 'Reorder points and alerts based on real usage'],
        ['Purchases in email threads', 'Requests, quotations, approvals and POs in one workflow'],
        ['Reports built by hand every month', 'Live dashboards and scheduled reports'],
        ['Anyone can overwrite anything', 'Roles, permissions and a full audit trail'],
      ],
    },
    { type: 'h2', text: 'Off-the-shelf or custom?' },
    {
      type: 'table',
      head: ['Choose off-the-shelf when', 'Choose custom when'],
      rows: [
        ['Your process is standard for your industry', 'Your process is unusual, and it is part of why customers choose you'],
        ['A popular tool already covers 90% of what you need', 'You would need heavy customisation or several tools glued together'],
        ['You can change your process to match the software', 'Changing the process would cost you efficiency or customers'],
        ['Monthly fees stay reasonable as you grow', 'Per-user fees would grow faster than the value'],
      ],
    },
    {
      type: 'p',
      text: 'We build custom systems, and we still recommend off-the-shelf tools when they fit. Our longer comparison is in [custom software vs SaaS](/blog/custom-software-vs-saas).',
    },
    { type: 'h2', text: 'How to switch without stopping the business' },
    {
      type: 'steps',
      items: [
        { title: 'Map the real process', text: 'How stock, orders and purchases actually move today, including the workarounds. See [fix the process before you add AI](/blog/fix-the-process-before-ai).' },
        { title: 'Start with one process', text: 'Usually stock and purchasing. Leave the rest on spreadsheets for now.' },
        { title: 'Clean and import the data', text: 'Product codes, units and opening stock. This step decides whether people trust the new system.' },
        { title: 'Run both in parallel', text: 'For a few weeks, until the numbers agree. Then retire the spreadsheet for good.' },
        { title: 'Add the next process', text: 'Sales, production, multi-branch reporting, finance, and AI features such as demand forecasting where the data supports it.' },
      ],
    },
    {
      type: 'p',
      text: 'An example from our work: a [pharmaceutical sourcing ERP](/work/pharma-erp) that brought tender notices, supplier enquiries, quotation comparison, purchase orders and finance into one connected system. Our [Custom Business Software](/packages/business-software) package is built for this kind of project, delivered in phases. The free [48-hour AI business audit](/packages/audit) is a good first step if you are not sure what to replace first.',
    },
  ],
  faq: [
    {
      q: 'When should a business stop using Excel for inventory?',
      a: 'When several people edit the same stock files, stock moves between locations, nobody trusts the stock number without checking, or month-end reconciliation takes days. At that point errors and manual work usually cost more than software.',
    },
    {
      q: 'Is an ERP worth it for a small business?',
      a: 'It is when operations involve stock, purchasing and more than one person or location. Start with the processes that hurt most, such as inventory and purchasing, rather than a full ERP on day one.',
    },
    {
      q: 'Should I buy inventory software or build custom software?',
      a: 'Buy when your process is standard and a popular tool covers most of it. Build custom when your process is unusual and part of your competitive advantage, or when you would otherwise glue several tools together with heavy customisation.',
    },
    {
      q: 'How long does it take to move from spreadsheets to inventory software?',
      a: 'A first phase covering stock and purchasing typically takes a few weeks to a few months, depending on the number of locations, products and integrations. Running the old spreadsheet in parallel for a few weeks is the safest way to switch.',
    },
  ],
};
