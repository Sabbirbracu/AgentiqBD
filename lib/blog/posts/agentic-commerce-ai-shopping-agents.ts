import type { Post } from '../types';

export const post: Post = {
  slug: 'agentic-commerce-ai-shopping-agents',
  title: 'Agentic commerce: how to get your online store ready for AI shopping agents',
  metaTitle: 'Agentic Commerce: Get Your Store Ready for AI Shopping Agents',
  excerpt:
    'Shoppers are starting to ask AI assistants to find and buy products for them. What agentic commerce is, how AI agents choose a store, and a practical readiness checklist for online sellers.',
  category: 'Strategy',
  tags: ['E-commerce', 'AI agents', 'AEO'],
  keywords: [
    'agentic commerce',
    'AI shopping agents',
    'agentic commerce protocol',
    'AI agent checkout',
    'ecommerce AI readiness',
    'optimize store for AI assistants',
  ],
  date: '2026-11-09',
  cover: 'commerce',
  takeaways: [
    'Agentic commerce means an AI agent searches, compares and sometimes completes a purchase on a shopper’s behalf.',
    'Agents choose stores they can read reliably: complete product data, live stock and price, and clear shipping and return policies.',
    'Open protocols for agent checkout now exist, from OpenAI with Stripe and from Google, and major platforms are adding support.',
    'The groundwork (structured data, accurate feeds, clean APIs) also improves classic SEO and conversion, so it pays off either way.',
  ],
  services: ['integrations', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**Agentic commerce is shopping where an AI agent does the searching, comparing and, increasingly, the buying for a person.** Instead of opening ten tabs, a shopper asks an assistant for “waterproof trail shoes under $120 that ship to Toronto by Friday”, and the agent finds options, checks stock, compares return policies and can complete checkout with the shopper’s approval.',
    },
    {
      type: 'p',
      text: 'For a store owner, that changes who your first visitor is. Before a human sees your product page, an agent may have read it, judged it, and decided whether to show it at all. Stores that are easy for machines to understand get recommended. Stores that are vague, slow or inconsistent get skipped.',
    },
    { type: 'figure', art: 'commerce', caption: 'The agent reads your catalogue, stock and policies before the shopper ever sees your store.' },
    { type: 'h2', text: 'How does an AI shopping agent choose a store?' },
    {
      type: 'p',
      text: 'Agents work from what they can read and verify. When several stores sell similar products, the agent favours the one with:',
    },
    {
      type: 'list',
      items: [
        '**Complete product data.** Exact titles, brand, model, size, colour, material, dimensions, identifiers such as GTIN, and clear images.',
        '**Live price and availability.** If the feed says in stock and the page says sold out, the agent loses trust in the whole store.',
        '**Clear delivery and returns.** Shipping costs, delivery times by region and the return window, stated in plain text, not hidden in an image.',
        '**Reviews and reputation.** Ratings on your site and across the web, which assistants use as evidence.',
        '**A checkout it can complete.** A supported agent checkout or, at minimum, a fast, simple checkout without surprises.',
      ],
    },
    { type: 'h2', text: 'The protocols behind agent checkout' },
    {
      type: 'p',
      text: 'For an agent to buy on someone’s behalf, the store, the agent and the payment provider must agree on how an order is created and paid for, without exposing the shopper’s card details. Several open standards are competing to define that:',
    },
    {
      type: 'table',
      head: ['Standard', 'From', 'What it covers'],
      rows: [
        ['Agentic Commerce Protocol (ACP)', 'OpenAI and Stripe', 'Lets a shopper buy from a merchant inside an AI assistant, with the merchant still processing the order'],
        ['Universal Commerce Protocol (UCP)', 'Google, with retail partners', 'An open standard for the journey from discovery to checkout and after-sales'],
        ['Model Context Protocol (MCP)', 'Open standard, started by Anthropic', 'How agents connect to tools and data in general, such as catalogue search and order status'],
      ],
      caption: 'This landscape is moving quickly. Check your e-commerce platform and payment provider for what they support today.',
    },
    {
      type: 'p',
      text: 'You do not need to pick a winner now. Large platforms and payment providers are adding support so merchants can switch it on, and the groundwork underneath is the same for all of them. If MCP is new to you, read [what is MCP](/blog/what-is-mcp-model-context-protocol).',
    },
    { type: 'h2', text: 'Readiness checklist for online stores' },
    {
      type: 'table',
      head: ['Area', 'What good looks like', 'Quick check'],
      rows: [
        ['Product data', 'Every product has complete attributes, identifiers and accurate descriptions', 'Could someone choose the right size from the text alone?'],
        ['Structured data', 'Product, Offer, shipping and return markup (schema.org) on every product page', 'Run your page through Google’s Rich Results Test'],
        ['Feeds', 'Product feeds (for example Google Merchant Center) update price and stock automatically', 'Compare five feed items with the live page'],
        ['Policies', 'Shipping, returns and warranty in plain text, linked from every product', 'Can you find the return window in under ten seconds?'],
        ['APIs', 'Stock, price and order status available through a stable API', 'Can your developer get live stock for one SKU in one request?'],
        ['Speed', 'Product pages load fast on mobile', 'Check Core Web Vitals in Search Console'],
        ['Payments', 'A payment provider that supports agent checkout, or plans to', 'Ask your provider about their agentic commerce roadmap'],
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'This is also good SEO',
      text: 'Everything on the checklist helps humans and classic search too: rich results, fewer abandoned carts and fewer “where is my order” messages. Agentic commerce is one more reason to do work that was already worth doing.',
    },
    { type: 'h2', text: 'Being found by AI assistants (AEO for products)' },
    {
      type: 'p',
      text: 'Before an agent buys, an assistant recommends. Answer engine optimisation for a store means making your products and your brand easy to cite:',
    },
    {
      type: 'list',
      items: [
        'Write product descriptions that answer real questions: who it is for, what it is not good for, how it compares to the obvious alternative.',
        'Add a short FAQ to category and best-selling product pages, written in the words customers use.',
        'Publish buying guides that compare options honestly, including when a cheaper product is enough.',
        'Keep your brand information consistent across your site, marketplaces, Google Business Profile and social profiles.',
      ],
    },
    { type: 'h2', text: 'Use AI agents on your own side too' },
    {
      type: 'p',
      text: 'Agentic commerce is not only about outside agents visiting you. The same technology can run inside your store: a support agent that answers “where is my order” from the courier API, a product-finder that asks two questions and recommends the right item, or an automation that flags stock running low before a campaign. We cover the safe way to let an agent take actions in [guardrails for AI agents](/blog/ai-agent-guardrails).',
    },
    { type: 'h2', text: 'Where to start' },
    {
      type: 'steps',
      items: [
        { title: 'Audit ten best-selling products', text: 'Check data completeness, structured data, feed accuracy and policy clarity. Fix what you find before touching anything new.' },
        { title: 'Automate price and stock sync', text: 'Mismatches between feed, page and warehouse are the fastest way to lose agent and customer trust.' },
        { title: 'Expose clean APIs', text: 'Stock, price and order status through one stable API, ready for agent checkout and your own support agent.' },
        { title: 'Switch on agent checkout when your platform offers it', text: 'Test it with real orders, watch fraud signals and returns, then expand.' },
      ],
    },
    {
      type: 'p',
      text: 'Our [AI Commerce Launch](/packages/commerce) package covers store development, payment and courier integrations, AI product discovery and support automation. If you already have a store, the free [48-hour AI business audit](/packages/audit) will tell you which of these gaps matter most for you.',
    },
  ],
  faq: [
    {
      q: 'What is agentic commerce?',
      a: 'Agentic commerce is online shopping in which an AI agent searches, compares and can complete purchases on a person’s behalf, usually with the person approving the final order. The agent reads product data, stock, prices and policies directly from stores.',
    },
    {
      q: 'How do I make my online store visible to AI shopping agents?',
      a: 'Give every product complete, accurate data and schema.org Product markup, keep price and stock in sync across your feeds and pages, state shipping and return policies in plain text, keep pages fast, and offer stable APIs for stock and order status.',
    },
    {
      q: 'What is the Agentic Commerce Protocol?',
      a: 'The Agentic Commerce Protocol (ACP) is an open standard from OpenAI and Stripe that lets shoppers buy from merchants inside an AI assistant while the merchant keeps processing the order and the customer relationship. Google has published a similar open standard, the Universal Commerce Protocol.',
    },
    {
      q: 'Do small online stores need to prepare for agentic commerce now?',
      a: 'They should start with the groundwork, because it also improves SEO and conversion today: complete product data, structured data, accurate feeds and clear policies. Agent checkout itself can wait until your e-commerce platform or payment provider supports it.',
    },
  ],
};
