import type { Post } from '../types';

export const post: Post = {
  slug: 'how-ai-agents-work',
  title: 'How AI agents actually work: the loop behind the buzzword',
  metaTitle: 'How AI Agents Work: The Loop, Tools and Memory Explained',
  excerpt:
    'An AI agent is a language model running in a loop with tools, memory and rules. Here is what happens inside that loop, step by step, with a real business example.',
  category: 'Guides',
  tags: ['AI agents', 'Agentic AI', 'LLMs'],
  keywords: ['how AI agents work', 'what is an AI agent', 'agentic AI explained', 'AI agent tools', 'AI agent loop'],
  date: '2026-10-29',
  cover: 'agent-loop',
  takeaways: [
    'An AI agent is a language model plus tools, memory and instructions, running in a loop until the goal is met or it hands over to a person.',
    'The model decides; your code acts. The model never touches your systems directly, and every action passes through rules you control.',
    'Most of the engineering is not the model. It is tool design, context, permissions and handling failure.',
    'A good agent knows when to stop and ask a human.',
  ],
  services: ['ai-agents', 'chatbots'],
  body: [
    {
      type: 'p',
      text: '"AI agent" has become one of those terms that means everything and nothing. Vendors call a simple FAQ bot an agent. Others describe agents as digital workers that run a company on their own. The reality is more useful than either story, and once you see the moving parts, it becomes much easier to judge what an agent can do for your business.',
    },
    { type: 'h2', text: 'A one-sentence definition' },
    {
      type: 'p',
      text: 'An **AI agent** is software that uses a language model to decide what to do next, takes actions through tools you give it, and keeps going until the job is done or it needs a person.',
    },
    {
      type: 'p',
      text: 'The difference from a chatbot is action. Ask a chatbot "where is my order?" and it explains how to track an order. Ask an agent and it looks the order up, sees that it is delayed at the courier, tells you the new delivery date and offers to change the address if you will not be home.',
    },
    { type: 'h2', text: 'The four parts of every agent' },
    { type: 'h3', text: '1. The model: the reasoning engine' },
    {
      type: 'p',
      text: 'At the centre is a large language model (LLM). It reads the situation in plain text and decides the next step: reply, ask a question, or call a tool. Models are very good at understanding messy language, mixing languages, and making judgement-like choices between options. They are bad at exact arithmetic, at knowing facts you have not given them, and at noticing when they are wrong. A well-designed agent leans on the strengths and covers the weaknesses with code.',
    },
    { type: 'h3', text: '2. Tools: the hands' },
    {
      type: 'p',
      text: 'Tools are functions the agent is allowed to call, such as `look_up_order`, `check_availability`, `create_ticket` or `send_whatsapp`. Each tool has a name, a description written for the model, and a strict schema for its inputs. The model does not run anything itself. It produces a structured request, your code checks it, runs it and hands the result back.',
    },
    {
      type: 'code',
      lang: 'json',
      caption: 'A tool definition as the model sees it',
      code: `{
  "name": "check_availability",
  "description": "List free appointment slots for one doctor on one date. Use before offering times to a patient.",
  "input_schema": {
    "type": "object",
    "properties": {
      "doctor_id": { "type": "string" },
      "date": { "type": "string", "format": "date" }
    },
    "required": ["doctor_id", "date"]
  }
}`,
    },
    {
      type: 'p',
      text: 'Notice the description says when to use the tool, not only what it does. That one sentence often decides whether the agent picks the right tool.',
    },
    { type: 'h3', text: '3. Memory and context: what it knows right now' },
    {
      type: 'p',
      text: 'A model only knows what is in front of it. Everything the agent needs for this task is assembled into its context: the instructions, the conversation so far, results from tools, and relevant passages from your documents. Short-term memory is the current conversation. Long-term memory is anything the agent can look up, like a customer record in your CRM or a policy in your knowledge base, usually through [retrieval-augmented generation](/blog/rag-explained).',
    },
    { type: 'h3', text: '4. Instructions and rules: the job description' },
    {
      type: 'p',
      text: 'The system prompt describes the role: who the agent serves, its tone, what it may and may not do, and when to hand over. But instructions are guidance, not enforcement. The hard limits, such as which records it can read or the maximum refund it can issue, live in code around the model. We cover that in detail in [our guide to agent guardrails](/blog/ai-agent-guardrails).',
    },
    { type: 'figure', art: 'agent-loop', caption: 'The agent loop: observe, think, act, check, and repeat until the goal is met or a person takes over.' },
    { type: 'h2', text: 'The loop, step by step' },
    {
      type: 'p',
      text: 'Here is a booking agent for a clinic, answering on WhatsApp. A patient writes: "Can I see the skin specialist tomorrow evening?"',
    },
    {
      type: 'steps',
      items: [
        {
          title: 'Observe',
          text: 'The message arrives with the patient’s phone number. The system loads the agent’s instructions, the patient’s record and the list of doctors into the context.',
        },
        {
          title: 'Think',
          text: 'The model reads it all and decides it needs tomorrow’s free slots for the dermatologist. It outputs a request to call `check_availability`.',
        },
        {
          title: 'Act',
          text: 'Your code validates the request, queries the booking system and returns two free slots: 6:30 pm and 7:15 pm.',
        },
        {
          title: 'Observe again',
          text: 'The model sees the result and replies to the patient, offering both times. The patient answers "7:15 please".',
        },
        {
          title: 'Act again',
          text: 'The model calls `create_booking`. Your code checks the slot is still free, books it and returns a confirmation number.',
        },
        {
          title: 'Finish',
          text: 'The agent confirms the booking in the chat. Every step, input and result is written to a log the clinic can review.',
        },
      ],
    },
    {
      type: 'p',
      text: 'The model made three decisions. Your code performed every action. That split is the most important design choice in any agent: **the model chooses, the software executes, and the software has the final say**.',
    },
    { type: 'h2', text: 'Why agents fail, and what fixes it' },
    {
      type: 'list',
      items: [
        '**Vague tools.** If two tools sound alike, the model will sometimes pick the wrong one. Fix it with fewer, sharply described tools that each do one job.',
        '**Too much freedom.** An agent that can do anything will eventually do something wrong. Fix it with scoped permissions and human approval for sensitive actions.',
        '**Missing context.** When the model lacks a fact, it guesses. Fix it with lookups and retrieval, and an explicit instruction to say "I don’t know".',
        '**No way out.** Agents can loop, retrying the same failing step. Fix it with step limits, timeouts and a clean handover to a person.',
        '**Nobody watching.** Problems hide in conversations nobody reads. Fix it with logs, regular review and a test set that runs before every change. We explain ours in [how we test AI agents](/blog/testing-ai-agents-before-go-live).',
      ],
    },
    { type: 'h2', text: 'One agent or many?' },
    {
      type: 'p',
      text: '"Multi-agent systems" get a lot of attention, with teams of agents handing work to each other. They have their place, but most business problems are best served by starting with a single agent and a handful of good tools. We split into several agents only when roles genuinely need different permissions, for example a support agent that must never see finance data, or when one agent’s context grows too large to stay reliable. More agents means more hand-offs, and every hand-off is a place where things go wrong.',
    },
    { type: 'h2', text: 'What this means for your business' },
    {
      type: 'p',
      text: 'The useful question is not "can AI do this job?" It is: **which decisions in this process need judgement, and which actions can we safely let software take?** Where a process is all fixed rules, plain automation is cheaper and more reliable. Where it needs understanding of messy requests plus action in your systems, an agent earns its place. If you want help drawing that line for your own process, that is exactly what our [AI agent development](/services/ai-agents) work starts with.',
    },
  ],
};
