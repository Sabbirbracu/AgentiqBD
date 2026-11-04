import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-agent-evaluation-metrics',
  title: 'AI agent evaluation metrics: what to measure before and after launch',
  metaTitle: 'AI Agent Evaluation Metrics: What to Measure and Thresholds',
  excerpt:
    'One accuracy score cannot tell you if an AI agent is ready. These are the metrics we track before launch and in production, how each one is measured, and how to turn them into a release gate.',
  category: 'Engineering',
  tags: ['AI agents', 'Testing', 'Evaluation'],
  keywords: [
    'AI agent evaluation metrics',
    'how to evaluate AI agents',
    'AI agent metrics',
    'AI agent KPIs',
    'task success rate',
    'LLM evaluation metrics',
    'hallucination rate',
  ],
  date: '2026-11-04',
  cover: 'metrics',
  takeaways: [
    'Judge an agent with a small scorecard of separate metrics, never one blended accuracy number.',
    'Before launch, measure task success, tool-call accuracy, groundedness, safety and handover on a fixed scenario set.',
    'After launch, track resolution (not just containment), human correction rate, cost per resolved task and response time.',
    'Turn the scorecard into a release gate: no critical failures, every metric above its threshold, nothing worse than the last run.',
  ],
  services: ['ai-agents', 'chatbots'],
  body: [
    {
      type: 'p',
      text: '"Is the agent good enough to launch?" sounds like a yes-or-no question. In practice it is five or six separate questions. Does it finish the job? Does it use its tools correctly? Does it say only true things? Does it refuse what it should refuse? Does it hand over to a person at the right moment? And can the business afford to run it?',
    },
    {
      type: 'p',
      text: 'Each of those needs its own number. This article lists the AI agent evaluation metrics we use, what each one means in plain words, how it is measured, and how we combine them into a clear go or no-go decision. For the testing process that produces these numbers, read [how to test an AI agent before go-live](/blog/testing-ai-agents-before-go-live).',
    },
    { type: 'figure', art: 'metrics', caption: 'A release scorecard: every metric has its own threshold, and one miss is enough to stop a release.' },
    { type: 'h2', text: 'Why one accuracy score is not enough' },
    {
      type: 'p',
      text: 'Imagine an agent that answers 95% of customer questions well. That sounds ready. But if the other 5% include refunds sent to the wrong customer, a blended score hides the only failures that matter. The opposite also happens: an agent that hands every hard question to a person can look very safe while saving the team almost no time.',
    },
    {
      type: 'p',
      text: 'So we never average quality into one figure. We keep a short scorecard where each metric is tracked on its own, and some failures are serious enough to block a release by themselves.',
    },
    { type: 'h2', text: 'The AI agent metrics that matter' },
    {
      type: 'table',
      head: ['Metric', 'The question it answers', 'How it is measured', 'When'],
      rows: [
        ['Task success rate', 'Did the agent finish the job correctly?', 'Scenario checks, plus human review', 'Before and after launch'],
        ['Tool-call accuracy', 'Right tool, right inputs, no forbidden calls?', 'Automatically, from the logs', 'Before launch'],
        ['Groundedness', 'Is every claim backed by the data or documents?', 'Model-assisted grading, spot-checked by a person', 'Before and after launch'],
        ['Safety compliance', 'Did it refuse what it should, and only that?', 'Automatic rules plus review', 'Before launch'],
        ['Handover accuracy', 'Did it pass to a person at the right moments?', 'Automatically, from scenario labels', 'Before and after launch'],
        ['Consistency', 'Does it pass the same case every time?', 'Repeated runs of each scenario', 'Before launch'],
        ['Response time', 'How long does the customer wait?', 'Timestamps in the logs', 'After launch'],
        ['Cost per resolved task', 'What does one finished job cost to run?', 'Model and tool usage divided by resolved tasks', 'After launch'],
        ['Human correction rate', 'How often does a person have to fix its work?', 'Edits to drafts, reopened tickets', 'After launch'],
      ],
    },
    { type: 'h2', text: 'Quality metrics to measure before launch' },
    {
      type: 'p',
      text: 'These come from running the agent against a fixed set of test scenarios: real requests, tricky variations, missing information and deliberate attacks (our [AI agent test case checklist](/blog/ai-agent-test-cases) lists them). Because the set is fixed, the numbers can be compared from one release to the next.',
    },
    { type: 'h3', text: 'Task success rate' },
    {
      type: 'p',
      text: '**Task success rate is the share of scenarios in which the agent reached the correct end result.** "Correct" is defined per scenario before the test runs: the exchange was created, the booking was made, or the right answer was given. A polite reply that does not solve the problem counts as a failure. This is the headline metric, but it only means something next to the others.',
    },
    { type: 'h3', text: 'Tool-call accuracy' },
    {
      type: 'p',
      text: '**Tool-call accuracy measures whether the agent called the right tools, with the right inputs, and avoided the tools it must not use.** It is the easiest metric to measure, because tool calls are structured data in the logs. We track three parts separately: missing calls (it forgot to check stock), wrong inputs (it looked up the wrong order) and forbidden calls (it issued a refund when the scenario says it must not). Forbidden calls are always treated as critical.',
    },
    { type: 'h3', text: 'Groundedness and hallucination rate' },
    {
      type: 'p',
      text: '**Groundedness is the share of answers in which every factual claim is supported by the data or documents the agent was given.** Its opposite is the hallucination rate. We check it with a second model acting as a grader, which gets the answer, the source material and a written rubric. A person reviews a sample of its verdicts, because a grader model can be wrong too. For agents that answer from documents, this is the metric that decides whether people can trust the answers. Our article on [RAG](/blog/rag-explained) explains how answers are tied to sources, and [RAG evaluation](/blog/rag-evaluation) covers how to test them.',
    },
    { type: 'h3', text: 'Safety and policy compliance' },
    {
      type: 'p',
      text: 'Safety has two sides, and both need measuring. **Under-refusal** is doing something it should have refused: sharing another customer’s data, following instructions hidden in an email, or going past a spending limit. **Over-refusal** is refusing a normal, allowed request. Under-refusal is a release blocker. Over-refusal is not dangerous, but it quietly destroys the value of the agent, so it gets a threshold of its own. The controls behind these checks are covered in [guardrails for AI agents](/blog/ai-agent-guardrails).',
    },
    { type: 'h3', text: 'Handover accuracy' },
    {
      type: 'p',
      text: '**Handover accuracy measures whether the agent passed the conversation to a person exactly when it should.** We split it in two. Missed handovers (an angry customer or a complaint about safety that the agent kept handling) are serious. Unneeded handovers (a simple question it could have answered) waste staff time. Tracking both stops the agent from "fixing" one problem by creating the other.',
    },
    { type: 'h3', text: 'Consistency across repeated runs' },
    {
      type: 'p',
      text: 'An agent can pass a scenario once and fail it on the next try, because its answers are not fixed. So we run each scenario several times and count it as passed only if it passes every time. A case that passes three runs out of five is not 60% fine. It is a failure that one customer in a few will meet.',
    },
    { type: 'h2', text: 'Production metrics to track after launch' },
    {
      type: 'p',
      text: 'Once real customers arrive, the scenario set is no longer the whole picture. These metrics come from live traffic and show whether the agent is actually helping the business. How to collect them is covered in [monitoring AI agents in production](/blog/monitoring-ai-agents-in-production).',
    },
    {
      type: 'list',
      items: [
        '**Resolution rate.** The share of conversations where the customer’s problem was actually solved, confirmed by the outcome (order changed, booking made) or by the customer not coming back about the same thing.',
        '**Human correction rate.** How often staff edit the agent’s drafts, undo its actions or reopen its tickets. When this rises, quality has slipped, even if customers have not complained yet.',
        '**Escalation rate.** The share of conversations passed to a person. A sudden change in either direction is a signal worth investigating.',
        '**Response time.** Time to the first reply and to a finished task. We look at the slowest replies (for example the slowest 5%), not only the average, because that is where customers give up.',
        '**Cost per resolved task.** Model and tool costs divided by tasks actually resolved, not by messages sent. An agent that is cheap per message but needs many turns can cost more than it looks.',
        '**Customer feedback.** Ratings and complaints, read alongside the numbers above rather than on their own.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Containment rate can lie',
      text: 'Many tools report "containment": the share of conversations that never reached a person. It is easy to raise by making handover harder, which makes customers angrier while the dashboard improves. Always read containment next to resolution rate and human correction rate.',
    },
    { type: 'h2', text: 'Turning metrics into a release gate' },
    {
      type: 'p',
      text: 'Metrics are only useful if they decide something. Before a project starts, we agree thresholds with the business, mark which scenarios are critical, and write them down as a release gate. Every change to prompts, tools, documents or the model has to pass the gate before it goes live.',
    },
    {
      type: 'code',
      lang: 'yaml',
      caption: 'Example release gate for a support agent. The thresholds are illustrative; each business sets its own.',
      code: `release_gate:
  critical_scenarios:
    max_failures: 0          # money, personal data, safety
  thresholds:
    task_success: ">= 0.85"
    tool_call_accuracy: ">= 0.95"
    forbidden_tool_calls: 0
    groundedness: ">= 0.90"
    missed_handovers: 0
    over_refusal: "<= 0.05"
  consistency:
    runs_per_scenario: 3
    must_pass: all
  regression:
    worse_than_previous_run: block`,
    },
    {
      type: 'p',
      text: 'The regression rule matters as much as the thresholds. A prompt edit that fixes one case and breaks two others can still leave every number above its threshold. Comparing each run with the previous one catches that before customers do.',
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Small test sets move in big steps',
      text: 'With 50 scenarios, a single failure moves the success rate by two points. That is fine, as long as you read the numbers as signals and look at which cases failed, not just how many.',
    },
    { type: 'h2', text: 'A starter scorecard for your first agent' },
    {
      type: 'p',
      text: 'You do not need every metric on day one. If you are evaluating your first AI agent, start here:',
    },
    {
      type: 'steps',
      items: [
        { title: 'Write 30 to 50 scenarios', text: 'Take them from real requests, and include a handful of missing-information and adversarial cases. Mark the critical ones.' },
        { title: 'Track four numbers', text: 'Task success, forbidden tool calls, groundedness and missed handovers. These cover most of the risk.' },
        { title: 'Agree the gate', text: 'Zero critical failures, a threshold for each number, and nothing worse than last time.' },
        { title: 'Add production metrics at launch', text: 'Resolution rate, human correction rate and cost per resolved task, reviewed weekly at first.' },
      ],
    },
    { type: 'h2', text: 'How we use this at Agentiq BD' },
    {
      type: 'p',
      text: 'Every [AI agent](/services/ai-agents) and [chatbot](/services/chatbots) we build ships with a scenario set, a written release gate and a weekly scorecard for the first weeks after launch. Clients see the scorecard in plain language, so the decision to go live is made on evidence, not on a good demo. To see where evaluation fits in the whole project, read [how we build an AI agent](/blog/how-we-build-ai-agents).',
    },
  ],
};
