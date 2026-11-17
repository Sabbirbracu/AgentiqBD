import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-agent-testing-tools',
  title: 'AI agent testing tools compared: promptfoo, DeepEval, Ragas, LangSmith, Langfuse and Phoenix',
  metaTitle: 'AI Agent Testing Tools Compared (2026): Which One to Use',
  excerpt:
    'Six popular tools for testing and evaluating AI agents, side by side: what each one is for, where it fits in your workflow, and a simple way to pick one without a month of trials.',
  category: 'Engineering',
  tags: ['AI agents', 'Testing', 'Tools'],
  keywords: [
    'AI agent testing tools',
    'LLM evaluation tools',
    'AI agent evaluation tools',
    'promptfoo vs DeepEval',
    'LangSmith vs Langfuse',
    'Ragas',
    'Arize Phoenix',
    'open source LLM evaluation',
  ],
  date: '2026-11-16',
  cover: 'testing',
  takeaways: [
    'Testing tools fall into two groups: test runners (promptfoo, DeepEval, Ragas) that grade outputs before release, and tracing platforms (LangSmith, Langfuse, Phoenix) that record what the agent did and run evaluations on it.',
    'Most teams need one of each: a runner in CI to block bad releases and a tracing tool to see real conversations in production.',
    'promptfoo suits config-driven tests and red teaming; DeepEval suits Python teams who like pytest; Ragas is the specialist for RAG metrics.',
    'No tool fixes a weak test set. Start with 30–50 real scenarios and pass/fail rules, then pick the tool that runs them with the least friction.',
  ],
  services: ['ai-agents', 'knowledge-rag'],
  body: [
    {
      type: 'p',
      text: '**AI agent testing tools run a set of test conversations against your agent, grade the answers automatically, and show you what changed between versions.** The six most common choices are promptfoo, DeepEval, Ragas, LangSmith, Langfuse and Arize Phoenix. They overlap, but each has a home turf, and picking the wrong one usually means a tool your team stops opening after two weeks.',
    },
    {
      type: 'p',
      text: 'This guide compares them from the point of view of a team shipping a real agent: a support bot, a booking agent, a document assistant. If you have not yet decided what to test, read [how to test AI agents](/blog/testing-ai-agents-before-go-live) first; the tool comes after the test plan.',
    },
    { type: 'h2', text: 'The two kinds of AI testing tool' },
    {
      type: 'table',
      head: ['Kind', 'What it does', 'When it runs', 'Examples'],
      rows: [
        ['Test runner', 'Runs a fixed set of test cases, grades each answer with rules or an AI judge, reports pass/fail', 'Before release, in CI, on every prompt or model change', 'promptfoo, DeepEval, Ragas'],
        ['Tracing and evaluation platform', 'Records every step of real and test runs (prompts, tool calls, latency, cost), stores datasets, runs evaluations on traces', 'During development and in production', 'LangSmith, Langfuse, Arize Phoenix'],
      ],
    },
    {
      type: 'p',
      text: 'The line is blurring: tracing platforms now run dataset evaluations, and test runners now export results to dashboards. Still, asking “do I need to block bad releases, or see what happened in production?” tells you which tool to look at first.',
    },
    { type: 'figure', art: 'testing', caption: 'A test runner gates the release; a tracing tool watches what happens after it.' },
    { type: 'h2', text: 'The six tools at a glance' },
    {
      type: 'table',
      head: ['Tool', 'Type', 'Best for', 'Open source', 'Language'],
      rows: [
        ['promptfoo', 'Test runner + red teaming', 'Config-driven tests, comparing prompts and models, security scans', 'Yes', 'YAML config, CLI (Node.js)'],
        ['DeepEval', 'Test runner', 'Python teams who want pytest-style tests and ready-made metrics', 'Yes', 'Python'],
        ['Ragas', 'Metrics library', 'Measuring RAG quality: faithfulness, context precision and recall', 'Yes', 'Python'],
        ['LangSmith', 'Tracing + evaluation (hosted)', 'Teams on LangChain or LangGraph, or anyone wanting a managed platform', 'No (SDKs are open)', 'Python, TypeScript'],
        ['Langfuse', 'Tracing + evaluation', 'Teams who want open-source tracing they can self-host', 'Yes', 'Python, TypeScript, OpenTelemetry'],
        ['Arize Phoenix', 'Tracing + evaluation', 'OpenTelemetry-based tracing and evals, local or self-hosted', 'Yes', 'Python, TypeScript, OpenTelemetry'],
      ],
      caption: 'Licences, hosting options and pricing change often; check each project’s site before you commit.',
    },
    { type: 'h2', text: 'promptfoo: tests as a config file' },
    {
      type: 'p',
      text: 'promptfoo describes tests in a YAML file: the prompts or agent endpoint, the test inputs, and assertions such as “contains the order number”, “is valid JSON” or “an AI judge rates it as polite and correct”. One command runs every case against one or more models and shows a side-by-side table. It also has a red-teaming mode that generates attack inputs such as prompt injection and data-leak attempts.',
    },
    {
      type: 'list',
      items: [
        '**Pick it if** you want tests that non-Python team members can read and edit, you compare models or prompts often, or you need security testing alongside quality testing.',
        '**Watch out for** very complex multi-step agent flows, where a custom script calling your agent may be easier than expressing everything in config.',
      ],
    },
    { type: 'h2', text: 'DeepEval: pytest for LLM apps' },
    {
      type: 'p',
      text: 'DeepEval lets you write test cases in Python and assert on metrics such as answer relevancy, faithfulness, hallucination, task completion or a custom rubric scored by an AI judge. Tests run with a pytest-style command, so they slot into an existing Python CI pipeline.',
    },
    {
      type: 'list',
      items: [
        '**Pick it if** your agent is written in Python and your engineers already live in pytest.',
        '**Watch out for** treating built-in metric scores as truth. Check a sample of the judge’s grades against your own before you trust a threshold.',
      ],
    },
    { type: 'h2', text: 'Ragas: the RAG specialist' },
    {
      type: 'p',
      text: 'Ragas is a library of metrics for retrieval-augmented generation: did the retriever find the right passages (context precision and recall), and does the answer stick to them (faithfulness)? It is not a full test harness, so teams often call Ragas metrics from their own scripts or from another runner. Our [RAG evaluation guide](/blog/rag-evaluation) explains what each of these measures means in practice.',
    },
    {
      type: 'list',
      items: [
        '**Pick it if** your agent answers from documents and you need to know whether bad answers come from retrieval or from generation.',
        '**Watch out for** using it on agents that mostly call tools; its metrics are built around retrieved context.',
      ],
    },
    { type: 'h2', text: 'LangSmith, Langfuse and Phoenix: see what the agent did' },
    {
      type: 'p',
      text: 'An agent that fails in production rarely fails at the last step. It picked the wrong tool, got an empty search result, or misread a date three steps earlier. Tracing platforms record each step as a trace so you can replay the run, then turn a bad trace into a new test case with a click.',
    },
    {
      type: 'table',
      head: ['', 'LangSmith', 'Langfuse', 'Arize Phoenix'],
      rows: [
        ['Hosting', 'Managed cloud; self-hosting on enterprise plans', 'Managed cloud or self-host', 'Run locally, self-host, or use Arize’s cloud'],
        ['Strongest fit', 'LangChain and LangGraph projects (works without them too)', 'Framework-neutral teams wanting open source', 'Teams already standardising on OpenTelemetry'],
        ['Datasets and evals', 'Yes', 'Yes', 'Yes'],
        ['Prompt management', 'Yes', 'Yes', 'Yes'],
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Traces contain customer data',
      text: 'Traces hold full conversations, which can include names, phone numbers and order details. Decide where traces are stored, who can see them and how long they are kept before you switch tracing on in production. Self-hosting or masking personal data may be required by your contracts.',
    },
    { type: 'h2', text: 'How to choose in one afternoon' },
    {
      type: 'steps',
      items: [
        { title: 'Write 30 test cases first', text: 'Real questions from support tickets or call logs, each with a pass/fail rule. Our [test case template](/blog/ai-agent-test-cases) gives you the categories.' },
        { title: 'Pick a runner by language', text: 'Python agent: DeepEval (add Ragas metrics if it answers from documents). Anything else, or mixed teams: promptfoo.' },
        { title: 'Pick a tracer by hosting needs', text: 'Must self-host or prefer open source: Langfuse or Phoenix. Already on LangChain and happy with managed: LangSmith.' },
        { title: 'Run the same 30 cases in each candidate', text: 'Time how long setup takes and whether failures are easy to understand. The tool your team can read quickly wins.' },
        { title: 'Wire the runner into CI', text: 'Block a release when the pass rate drops below your threshold. That is where the tool pays for itself.' },
      ],
    },
    { type: 'h2', text: 'Do you need a tool at all?' },
    {
      type: 'p',
      text: 'For a first prototype, a spreadsheet of test questions and a short script that calls your agent and checks the answers is enough. Move to a dedicated tool when you change prompts or models weekly, when more than one person edits the agent, or when you need a record of quality over time for a client or auditor. Whatever you pick, the score only means something if the test set reflects real users; see [AI agent evaluation metrics](/blog/ai-agent-evaluation-metrics) for which numbers to track.',
    },
    {
      type: 'p',
      text: 'Every [AI agent we build](/services/ai-agents) ships with its test set, an automated runner in CI and production tracing, so the client can see quality, not just hear about it. If you have an agent that works in demos but surprises you in production, the free [48-hour AI business audit](/packages/audit) is a good place to start.',
    },
  ],
  faq: [
    {
      q: 'What is the best tool for testing AI agents?',
      a: 'There is no single best tool. promptfoo is strong for config-driven tests and red teaming, DeepEval suits Python teams using pytest, Ragas specialises in RAG metrics, and LangSmith, Langfuse and Arize Phoenix trace and evaluate agents in development and production. Most teams use one test runner plus one tracing platform.',
    },
    {
      q: 'What is the difference between LangSmith and Langfuse?',
      a: 'Both trace LLM and agent runs and run evaluations on datasets. LangSmith is a managed platform from the LangChain team and fits LangChain and LangGraph projects especially well. Langfuse is open source, framework-neutral and can be self-hosted, which matters when traces contain customer data.',
    },
    {
      q: 'Is promptfoo or DeepEval better?',
      a: 'promptfoo uses YAML config and a command-line tool, so it suits mixed teams, model comparisons and security red teaming. DeepEval uses Python and pytest-style tests with built-in metrics, so it suits Python engineering teams. Both are open source and both can run in CI.',
    },
    {
      q: 'Are there free AI agent testing tools?',
      a: 'Yes. promptfoo, DeepEval, Ragas, Langfuse and Arize Phoenix are open source and can be run for free on your own machines, though you still pay for the model calls your tests make. Managed cloud versions of these tools usually have free tiers with paid plans above them.',
    },
  ],
};
