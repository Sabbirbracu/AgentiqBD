import type { Post } from '../types';

export const post: Post = {
  slug: 'testing-ai-agents-before-go-live',
  title: 'How we test an AI agent before it talks to your customers',
  metaTitle: 'How to Test AI Agents: Scenarios, Grading and Regression',
  excerpt:
    'You cannot unit-test a conversation the way you test a function. Here is how we build scenario sets, grade behaviour and catch regressions before every release.',
  category: 'Engineering',
  tags: ['AI agents', 'Testing', 'Evaluation'],
  keywords: ['how to test AI agents', 'AI agent evaluation', 'LLM evaluation', 'AI chatbot testing', 'regression testing AI'],
  date: '2026-10-29',
  cover: 'testing',
  takeaways: [
    'Agents can phrase the same answer differently each time, so we test behaviour across many scenarios, not exact outputs.',
    'A good test set comes from real conversations plus deliberately difficult cases.',
    'We grade what matters: the right action, the right facts, safe refusals, timely handover and tone.',
    'The full set runs again on every change to prompts, tools, documents or models.',
  ],
  services: ['ai-agents', 'chatbots'],
  body: [
    {
      type: 'p',
      text: 'Normal software is tested by giving it an input and checking the output is exactly what you expect. AI agents do not work like that. Ask the same question twice and the wording of the answer may differ. Both answers can be right. Or one can be subtly wrong in a way no simple check would catch.',
    },
    {
      type: 'p',
      text: 'That does not make agents untestable. It means testing has to focus on behaviour: did the agent do the right thing, say true things, and stop when it should? This is how we do it.',
    },
    { type: 'figure', art: 'testing', caption: 'A scenario run: every case checked for action, facts, safety and handover before release.' },
    { type: 'h2', text: 'Unit tests still matter' },
    {
      type: 'p',
      text: 'Everything around the model is ordinary code and gets ordinary tests: the tools, input validation, permission checks, approval rules and integrations. If `issue_refund` refuses an amount above the order total, a unit test proves it, every time. Evaluation is for the part that cannot be tested this way: the model’s decisions.',
    },
    { type: 'h2', text: 'Step 1: Build the scenario set' },
    {
      type: 'p',
      text: 'A scenario is a short conversation with a description of what good behaviour looks like. We build the set from five sources:',
    },
    {
      type: 'list',
      items: [
        '**Real requests.** Past emails, chats and call notes from the business, anonymised. These are the everyday cases the agent must get right.',
        '**Variations.** The same requests with typos, Banglish, voice-note transcripts, or two questions in one message.',
        '**Missing information.** No order number, an unknown product, a date that does not exist.',
        '**Adversarial cases.** Attempts to override instructions, requests for another customer’s data, abusive messages.',
        '**Out of scope.** Questions the agent should politely decline or hand to a person.',
      ],
    },
    {
      type: 'code',
      lang: 'yaml',
      caption: 'One scenario from a retail support agent’s test set',
      code: `id: exchange-wrong-colour
conversation:
  - customer: "Ami blue ta order korsilam, black ashse. Friday er age change kora jabe?"
setup:
  order: { id: "A-1043", item: "T-shirt", colour: "black", delivered: "2 days ago" }
  stock: { "T-shirt/blue/M": 4 }
expect:
  tools_called: [get_order, check_stock, create_exchange]
  must_not_call: [issue_refund]
  facts: ["blue is in stock", "exchange within policy window"]
  reply_language: "same as customer"
  handover: false`,
    },
    { type: 'h2', text: 'Step 2: Decide what "pass" means' },
    {
      type: 'table',
      head: ['Check', 'The question', 'How we grade it'],
      rows: [
        ['Action', 'Did it call the right tools, with the right inputs, and avoid the wrong ones?', 'Automatically, from the logs'],
        ['Facts', 'Is every claim supported by the data or the documents?', 'Model-assisted grading, checked by a person'],
        ['Safety', 'Did it refuse what it should refuse and protect other customers’ data?', 'Automatic rules plus review'],
        ['Handover', 'Did it pass the conversation to a person when it should have?', 'Automatically'],
        ['Tone', 'Clear, polite, and in the customer’s language?', 'Human review on a sample'],
      ],
    },
    { type: 'h2', text: 'Step 3: Automate the checks you can' },
    {
      type: 'p',
      text: 'Tool calls are structured, so checking them is deterministic: either `create_exchange` was called with order A-1043 or it was not. Factual accuracy is harder. For that we use a second model as a grader, with a written rubric and the source data in front of it. But a grader model can be wrong too, so a person regularly spot-checks its verdicts. A model is never left to mark its own work unchecked.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Grade the critical cases strictly',
      text: 'Not all scenarios are equal. We mark some as critical, such as anything involving money, personal data or safety. A single failure in a critical scenario blocks the release, whatever the overall pass rate.',
    },
    { type: 'h2', text: 'Step 4: Run everything on every change' },
    {
      type: 'p',
      text: 'Agents can break in surprising ways. A small prompt edit to fix one case can quietly break three others. So can a new tool, an updated knowledge base, or the model provider releasing a new version. The full scenario set runs on every change, results are compared with the previous run, and anything that got worse is investigated before release.',
    },
    { type: 'h2', text: 'Step 5: Keep testing after launch' },
    {
      type: 'p',
      text: 'No test set covers everything real customers will say. After launch, conversations are flagged for review when the agent hands over, when a customer seems unhappy, or when a person corrects the agent’s draft. Each real failure is fixed and then added to the scenario set, so it can never quietly return. Over time the set grows into the most valuable asset of the project: a precise, written description of how the business wants its customers treated.',
    },
    { type: 'h2', text: 'What our clients see' },
    {
      type: 'p',
      text: 'Before launch, we share the scenario list in plain language, so the people who know the business best can add their own "what if a customer says…" cases. It turns testing from something engineers do in private into a shared definition of good service. It is a standard part of every [AI agent](/services/ai-agents) and [chatbot](/services/chatbots) we build. To see where testing fits in the bigger picture, read [how we build an AI agent](/blog/how-we-build-ai-agents).',
    },
  ],
};
