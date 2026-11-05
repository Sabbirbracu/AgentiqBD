import type { Post } from '../types';

export const post: Post = {
  slug: 'what-is-mcp-model-context-protocol',
  title: 'What is MCP? The Model Context Protocol explained for business owners',
  metaTitle: 'What Is MCP (Model Context Protocol)? A Plain-English Guide',
  excerpt:
    'MCP is the open standard that lets AI assistants and agents connect to your tools and data. What it is, how it works, where it helps a business, and the security questions to ask first.',
  category: 'Guides',
  tags: ['MCP', 'AI agents', 'Integrations'],
  keywords: [
    'what is MCP',
    'Model Context Protocol',
    'MCP server',
    'MCP explained',
    'MCP for business',
    'MCP security',
  ],
  date: '2026-11-08',
  cover: 'mcp',
  takeaways: [
    'MCP (Model Context Protocol) is an open standard for connecting AI applications to tools and data, so one connector works with many AI apps.',
    'An MCP server exposes a system’s tools and data; an AI application (the host) connects to it through an MCP client.',
    'For a business, MCP means you can make your own systems usable by AI assistants and agents without a custom integration for each one.',
    'MCP does not make anything safe by itself: permissions, approvals for actions and audit logs still have to be designed.',
  ],
  services: ['integrations', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**MCP, the Model Context Protocol, is an open standard that defines how AI applications connect to external tools and data.** Instead of building a separate integration between every AI app and every business system, a system is wrapped once as an MCP server, and any AI application that supports MCP can use it. It is often compared to a USB-C port for AI: one shape of plug, many devices.',
    },
    {
      type: 'p',
      text: 'Anthropic introduced MCP in late 2024 as an open specification. Since then it has been adopted across the industry: major AI assistants, coding tools and agent frameworks support it, and the protocol is now developed under an open, vendor-neutral foundation rather than by a single company. For a business, the practical question is not “is MCP important?” but “which of my systems should an AI be able to reach, and how safely?”',
    },
    { type: 'figure', art: 'mcp', caption: 'One protocol in the middle: AI apps on one side, your systems on the other, permissions in between.' },
    { type: 'h2', text: 'The problem MCP solves' },
    {
      type: 'p',
      text: 'An AI agent is only useful if it can look things up and do things: check an order, read a contract, create a ticket. Before MCP, every connection was custom. If you wanted your inventory system available in a chatbot, a coding assistant and a reporting agent, you built three integrations, each slightly different, each maintained separately.',
    },
    {
      type: 'p',
      text: 'MCP replaces that with one contract. The system describes what it offers in a standard format, and every MCP-compatible AI application understands that description. Build once, reuse everywhere.',
    },
    { type: 'h2', text: 'How MCP works, in plain words' },
    {
      type: 'table',
      head: ['Part', 'What it is', 'Example'],
      rows: [
        ['Host', 'The AI application the person uses', 'A desktop AI assistant, an IDE, or your own customer-support agent'],
        ['Client', 'The piece inside the host that speaks MCP', 'Built into the host; one client per connected server'],
        ['Server', 'A small program that exposes one system to AI', 'An MCP server for your CRM, your database or your file storage'],
        ['Tools', 'Actions the AI may call, with defined inputs', '`search_orders`, `create_ticket`, `get_stock_level`'],
        ['Resources', 'Data the AI may read', 'Product catalogue, policy documents, a customer record'],
        ['Prompts', 'Reusable instructions the server offers', '“Summarise this account for a sales call”'],
      ],
    },
    {
      type: 'p',
      text: 'When the AI decides it needs information, it calls a tool on the server. The server checks the request, talks to the real system, and returns the result. The model never gets direct access to your database; it only sees what the server chooses to expose.',
    },
    {
      type: 'code',
      lang: 'json',
      caption: 'How an MCP server might describe one read-only tool',
      code: `{
  "name": "get_stock_level",
  "description": "Current stock for one product SKU at one warehouse. Read-only.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "sku": { "type": "string", "description": "Product SKU, e.g. TS-BLUE-M" },
      "warehouse": { "type": "string", "enum": ["dhaka", "chattogram"] }
    },
    "required": ["sku"]
  }
}`,
    },
    { type: 'h2', text: 'Where MCP helps a business' },
    {
      type: 'list',
      items: [
        '**Internal assistants that know your business.** Staff ask an AI assistant about stock, orders or policies, and it answers from live systems instead of guesses.',
        '**Agents that work across tools.** A support agent that reads the helpdesk, checks the order system and drafts a reply, using one MCP server per system.',
        '**Being reachable by other people’s AI.** Software companies publish MCP servers so their customers’ AI assistants can use the product directly. If you sell software, this is becoming a feature buyers ask for.',
        '**Less rework when you switch models.** Because the connectors follow a standard, moving from one AI provider to another does not mean rebuilding every integration.',
      ],
    },
    { type: 'h2', text: 'When you do not need MCP' },
    {
      type: 'p',
      text: 'MCP is a connector standard, not a strategy. If you are building one agent that talks to one system, a normal, well-tested API integration may be simpler. MCP pays off when several AI applications need the same systems, or when you want your product to be usable from AI assistants your customers already have. If you are still deciding what kind of AI you need at all, start with [AI agent vs chatbot vs automation](/blog/ai-agent-vs-chatbot-vs-automation).',
    },
    { type: 'h2', text: 'MCP security: what to check first' },
    {
      type: 'p',
      text: 'MCP makes connecting easy. That is exactly why it needs care. The risks are the same ones every AI agent has, now reachable through a standard plug:',
    },
    {
      type: 'table',
      head: ['Risk', 'What can go wrong', 'What we do about it'],
      rows: [
        ['Over-broad permissions', 'A server exposes “run any query” when the agent only needed “read one order”', 'Narrow tools with specific inputs; read-only by default'],
        ['Prompt injection', 'Text inside an email or document tells the AI to call a tool it should not', 'Treat everything the agent reads as data; approvals for risky actions'],
        ['Tool poisoning', 'A third-party server’s tool description contains hidden instructions', 'Use servers you built or reviewed; pin versions; review updates'],
        ['Weak authentication', 'Anyone who finds the server URL can use it', 'Proper authentication (OAuth for remote servers), per-user access, no shared admin keys'],
        ['No audit trail', 'Nobody can tell which tool calls the AI made, or why', 'Log every call with user, inputs and result'],
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Never install unknown MCP servers on systems with real data',
      text: 'A public MCP server is code that runs with the access you give it. Treat it like any third-party software: check who made it, what it can touch, and keep it away from production data until you have reviewed it.',
    },
    {
      type: 'p',
      text: 'Our article on [guardrails for AI agents](/blog/ai-agent-guardrails) covers permissions, approvals and audit trails in depth; all of it applies to MCP servers.',
    },
    { type: 'h2', text: 'Getting started' },
    {
      type: 'steps',
      items: [
        { title: 'List the questions people ask your systems', text: 'Which lookups and actions take staff time every day? Those are your first tools.' },
        { title: 'Start read-only', text: 'Expose search and lookup tools first. Add actions that change data later, with approval steps.' },
        { title: 'Build or review the server', text: 'Wrap your system in a small MCP server with narrow, well-described tools, proper authentication and logging.' },
        { title: 'Test it like an agent', text: 'Run real scenarios, including attempts to misuse the tools. See [AI agent test cases](/blog/ai-agent-test-cases).' },
      ],
    },
    {
      type: 'p',
      text: 'We build MCP servers and API [integrations](/services/integrations) for businesses that want their AI assistants and [AI agents](/services/ai-agents) to work with real data, safely. If you are not sure whether MCP is the right fit, the free [AI business audit](/packages/audit) is a good first step.',
    },
  ],
  faq: [
    {
      q: 'What does MCP stand for in AI?',
      a: 'MCP stands for Model Context Protocol. It is an open standard that defines how AI applications connect to external tools and data sources, so a system wrapped once as an MCP server can be used by any AI application that supports the protocol.',
    },
    {
      q: 'What is an MCP server?',
      a: 'An MCP server is a small program that exposes one system, such as a CRM, database or file store, to AI applications. It lists the tools (actions) and resources (data) the AI may use, checks each request, talks to the real system and returns the result.',
    },
    {
      q: 'Is MCP the same as an API?',
      a: 'No. An API is how software talks to a specific system. MCP is a standard way to describe tools and data to AI applications, and an MCP server usually calls the system’s API behind the scenes. MCP adds a common format that every compatible AI app understands.',
    },
    {
      q: 'Is MCP secure?',
      a: 'MCP itself is a protocol; security depends on how each server is built and deployed. Use narrow, read-only tools by default, require approval for actions that change data, authenticate every user, log every call, and only install third-party servers you have reviewed.',
    },
  ],
};
