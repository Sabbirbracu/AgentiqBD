import type { Post } from '../types';

export const post: Post = {
  slug: 'build-mcp-server-typescript',
  title: 'How to build an MCP server in TypeScript: a step-by-step tutorial',
  metaTitle: 'How to Build an MCP Server in TypeScript (Step by Step)',
  excerpt:
    'Build a small Model Context Protocol server that lets an AI assistant look up orders in your system: project setup, one tool, testing with MCP Inspector, connecting it to a desktop AI client, and making it safe for real data.',
  category: 'Engineering',
  tags: ['MCP', 'AI agents', 'Tutorial'],
  keywords: [
    'how to build an MCP server',
    'MCP server tutorial',
    'MCP server TypeScript',
    'Model Context Protocol tutorial',
    'create MCP server',
    'MCP tools example',
    'MCP Inspector',
  ],
  date: '2026-11-25',
  cover: 'mcp',
  takeaways: [
    'An MCP server exposes tools, data or prompts from your system in a standard format that MCP-compatible AI clients can use.',
    'With the official TypeScript SDK, a working server with one tool is about 40 lines: create the server, register a tool with an input schema, connect a transport.',
    'Test with MCP Inspector before connecting a real AI client; it shows your tools and lets you call them by hand.',
    'Before real data: give tools narrow permissions, validate inputs, return clear errors, never log to stdout on a stdio server, and add authentication for remote servers.',
  ],
  services: ['integrations', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**An MCP server is a small program that exposes tools, data or prompts from your system using the Model Context Protocol, so any MCP-compatible AI client can use them.** Build it once and assistants such as Claude, along with other MCP-capable apps and agent frameworks, can look up your orders, search your documents or create records, without a custom integration for each one. If MCP is new to you, read [what is MCP](/blog/what-is-mcp-model-context-protocol) first.',
    },
    {
      type: 'p',
      text: 'In this tutorial we build a server with one tool, `get_order_status`, using the official TypeScript SDK. The same pattern scales to any internal system with an API or database.',
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Check the SDK version',
      text: 'The MCP SDKs move quickly. The code below follows the official TypeScript SDK’s current high-level API (`McpServer` and `registerTool`). If a method name differs in the version you install, the SDK’s README has the up-to-date equivalent.',
    },
    { type: 'h2', text: 'What you will build' },
    {
      type: 'table',
      head: ['Part', 'What it does'],
      rows: [
        ['MCP server', 'A Node.js program that describes its tools to AI clients and runs them when asked'],
        ['Tool: get_order_status', 'Takes an order number, looks it up and returns the status'],
        ['Transport: stdio', 'The client starts the server as a local process and talks to it over standard input and output'],
        ['Client', 'MCP Inspector for testing, then a desktop AI app'],
      ],
    },
    { type: 'h2', text: 'Step 1: set up the project' },
    {
      type: 'code',
      lang: 'bash',
      code: `mkdir order-mcp && cd order-mcp
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
npx tsc --init`,
    },
    {
      type: 'p',
      text: 'In `package.json`, set `"type": "module"` and add a build script (`"build": "tsc"`). In `tsconfig.json`, set `"module"` and `"moduleResolution"` to `"Node16"`, `"target"` to `"ES2022"`, `"outDir"` to `"build"` and `"rootDir"` to `"src"`. Install the `zod` version the SDK’s README recommends.',
    },
    { type: 'h2', text: 'Step 2: write the server' },
    {
      type: 'code',
      lang: 'typescript',
      caption: 'src/index.ts: a complete MCP server with one tool. Replace findOrder with a call to your real system.',
      code: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Stand-in for your database or API.
const orders: Record<string, { status: string; eta: string }> = {
  'A-1042': { status: 'shipped', eta: '2026-11-28' },
  'A-1043': { status: 'processing', eta: '2026-12-02' },
};
async function findOrder(id: string) {
  return orders[id] ?? null;
}

const server = new McpServer({ name: 'order-status', version: '1.0.0' });

server.registerTool(
  'get_order_status',
  {
    title: 'Get order status',
    description:
      'Look up the current status and estimated delivery date of a customer order by its order number.',
    inputSchema: {
      orderId: z
        .string()
        .regex(/^A-\\d{4}$/)
        .describe('Order number in the format A-1234'),
    },
  },
  async ({ orderId }) => {
    const order = await findOrder(orderId);
    if (!order) {
      return {
        content: [{ type: 'text', text: 'No order found with number ' + orderId + '.' }],
        isError: true,
      };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify({ orderId, ...order }) }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('order-status MCP server running on stdio');`,
    },
    { type: 'h3', text: 'What each part does' },
    {
      type: 'list',
      items: [
        '**`McpServer`** handles the protocol: announcing the server, listing tools and routing calls.',
        '**`registerTool`** declares a tool with a name, a description the AI reads to decide when to use it, and an input schema. The SDK validates inputs against the schema before your code runs.',
        '**The handler** returns content for the AI to read. `isError: true` tells the client the call failed, so the AI can explain it or try something else instead of treating the message as data.',
        '**`console.error`, not `console.log`.** On a stdio server, standard output carries protocol messages. Anything else printed there breaks the connection, so log to standard error.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Descriptions are prompts',
      text: 'The AI chooses tools from their names and descriptions. Write them for the model: say what the tool does, when to use it, and the exact input format. Vague descriptions are the most common reason an AI ignores or misuses a tool.',
    },
    { type: 'h2', text: 'Step 3: build and test with MCP Inspector' },
    {
      type: 'code',
      lang: 'bash',
      code: `npm run build
npx @modelcontextprotocol/inspector node build/index.js`,
    },
    {
      type: 'p',
      text: 'MCP Inspector opens in your browser. Connect, open the Tools tab, and you should see `get_order_status` with its description and input field. Call it with `A-1042`, then with `A-9999` (not found) and `hello` (invalid format) to check the success, error and validation paths.',
    },
    { type: 'h2', text: 'Step 4: connect it to an AI client' },
    {
      type: 'p',
      text: 'Desktop MCP clients start local servers from a configuration file. In Claude Desktop, for example, you add the server to `claude_desktop_config.json` and restart the app:',
    },
    {
      type: 'code',
      lang: 'json',
      code: `{
  "mcpServers": {
    "order-status": {
      "command": "node",
      "args": ["/absolute/path/to/order-mcp/build/index.js"]
    }
  }
}`,
    },
    {
      type: 'p',
      text: 'Ask “What is the status of order A-1042?” and the assistant should ask permission to call your tool, then answer from its result. Other clients use a similar command-and-arguments configuration; check their documentation for the file location.',
    },
    { type: 'h2', text: 'Step 5: make it safe for real data' },
    {
      type: 'table',
      head: ['Concern', 'What to do'],
      rows: [
        ['Permissions', 'Give the server its own credentials with the minimum access needed. A status lookup tool needs read-only access to orders, nothing more.'],
        ['Input validation', 'Keep strict schemas (formats, lengths, allowed values) and validate again in your own code before touching the database.'],
        ['Write actions', 'For tools that change data (refunds, cancellations), require confirmation, set limits and log every call with its inputs.'],
        ['Data exposure', 'Return only the fields the AI needs. Leaving out phone numbers and addresses means they cannot leak through a conversation.'],
        ['Untrusted content', 'Text your tools return (customer notes, emails) can contain prompt injection. Treat it as data; see [prompt injection testing](/blog/prompt-injection-testing).'],
        ['Remote servers', 'For servers other people connect to over the network, use the Streamable HTTP transport with proper authentication (the MCP specification describes OAuth-based authorisation), plus rate limiting.'],
      ],
    },
    { type: 'h2', text: 'Where to go next' },
    {
      type: 'list',
      items: [
        '**Add resources** to expose read-only data such as a product catalogue or policy documents.',
        '**Add prompts** to package common tasks (“summarise this customer’s open orders”) for users to pick.',
        '**Write tests** that call each tool directly with valid, invalid and edge-case inputs, and add agent-level tests that check the AI picks the right tool; see [AI agent test cases](/blog/ai-agent-test-cases).',
        '**Monitor usage** in production: which tools are called, failures and latency. See [AI agent monitoring](/blog/monitoring-ai-agents-in-production).',
      ],
    },
    {
      type: 'p',
      text: 'We build production MCP servers and [integrations](/services/integrations) that connect AI assistants and [AI agents](/services/ai-agents) to ERPs, CRMs, databases and internal tools, with scoped permissions, audit logs and tests. If you want your systems usable by AI without handing over the keys, the free [48-hour AI business audit](/packages/audit) is a good starting point.',
    },
  ],
  faq: [
    {
      q: 'What is an MCP server?',
      a: 'An MCP server is a program that exposes tools, data (resources) or prompt templates from a system using the Model Context Protocol, an open standard. Any MCP-compatible AI client can connect to it and use those capabilities without a custom integration for each AI product.',
    },
    {
      q: 'How do I create an MCP server?',
      a: 'Install an official MCP SDK (for example the TypeScript SDK with zod), create a server, register tools with a name, description, input schema and handler, connect a transport such as stdio, then test it with MCP Inspector before adding it to an AI client’s configuration.',
    },
    {
      q: 'What languages can I build an MCP server in?',
      a: 'There are official MCP SDKs for several languages, including TypeScript and Python, as well as others such as Java, Kotlin, C# and Go. Any language can be used in principle, because MCP is a documented protocol built on JSON-RPC.',
    },
    {
      q: 'What is the difference between stdio and HTTP MCP servers?',
      a: 'A stdio server runs as a local process started by the AI client and communicates over standard input and output, which suits tools on the same machine. A remote server uses the Streamable HTTP transport over the network, so many users can connect, and it needs authentication and rate limiting.',
    },
  ],
};
