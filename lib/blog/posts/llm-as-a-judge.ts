import type { Post } from '../types';

export const post: Post = {
  slug: 'llm-as-a-judge',
  title: 'LLM-as-a-judge: how to grade AI agent answers automatically (with a prompt template)',
  metaTitle: 'LLM-as-a-Judge: Prompt Template, Biases and How to Calibrate',
  excerpt:
    'Using one AI model to grade another is the fastest way to test an agent at scale, and the easiest way to fool yourself. A working judge prompt, the known biases, and how to check your judge against humans.',
  category: 'Engineering',
  tags: ['AI agents', 'Testing', 'Evaluation'],
  keywords: [
    'LLM as a judge',
    'LLM-as-a-judge prompt',
    'LLM judge evaluation',
    'AI grading AI',
    'LLM evaluation rubric',
    'LLM judge bias',
    'automated evaluation of AI agents',
  ],
  date: '2026-11-17',
  cover: 'metrics',
  takeaways: [
    'LLM-as-a-judge means asking a language model to grade another model’s answer against a rubric, so you can test hundreds of conversations without reading each one.',
    'Judges are reliable on narrow, concrete questions (“Does the answer state the refund window as 30 days?”) and unreliable on vague ones (“Rate the quality from 1 to 10”).',
    'Known biases: favouring longer answers, favouring the first option shown, favouring answers from the same model family, and being swayed by confident tone.',
    'Before trusting a judge, grade 50 or more answers by hand and measure how often the judge agrees with you. Re-check whenever you change the judge model or prompt.',
  ],
  services: ['ai-agents', 'knowledge-rag'],
  body: [
    {
      type: 'p',
      text: '**LLM-as-a-judge is an evaluation method where one language model grades the output of another against a written rubric.** Instead of a person reading every test conversation, a judge model reads the question, the agent’s answer and the grading rules, then returns a verdict such as pass or fail with a short reason. It is how teams test AI agents on hundreds of cases every time they change a prompt.',
    },
    {
      type: 'p',
      text: 'It is also easy to get wrong. A judge that gives everything a 7 out of 10, or that prefers long answers, produces a dashboard full of confident numbers that mean nothing. This guide covers how to build a judge you can actually trust. It fits into the wider process in [how to test AI agents](/blog/testing-ai-agents-before-go-live).',
    },
    { type: 'h2', text: 'When should you use an LLM judge?' },
    {
      type: 'table',
      head: ['Check', 'Best grader', 'Why'],
      rows: [
        ['Is the output valid JSON? Does it contain the order number?', 'Code (exact rules)', 'Free, instant and never wrong. Never pay a model for what a regex can do.'],
        ['Did the agent call the refund tool with the right amount?', 'Code (check the tool call log)', 'Tool calls are structured data; compare them directly.'],
        ['Does the answer stick to the provided policy text?', 'LLM judge', 'Meaning, not exact words, matters; a judge handles paraphrase.'],
        ['Was the tone polite and did it avoid promising things it cannot do?', 'LLM judge', 'Hard to write as code, easy to describe in a rubric.'],
        ['Is this answer good enough for a legal or medical context?', 'Human expert', 'Stakes are too high to delegate the final call.'],
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Use the cheapest grader that works',
      text: 'In a good test suite most checks are plain code. Save the judge for the questions only a reader can answer, and save humans for calibrating the judge and for high-stakes cases.',
    },
    { type: 'h2', text: 'A judge prompt template that works' },
    {
      type: 'p',
      text: 'The template below grades one answer against one criterion and returns structured output. Run one judge call per criterion rather than asking for everything at once; narrow questions get more consistent verdicts.',
    },
    {
      type: 'code',
      lang: 'text',
      caption: 'One criterion per call, pass/fail verdict, reason before verdict, reference facts supplied.',
      code: `You are grading a customer support agent's reply.

## Criterion
The reply must state the correct refund policy and must not promise
anything the policy does not allow.

## Reference facts (the only source of truth)
{reference_facts}

## Customer message
{customer_message}

## Agent reply
{agent_reply}

## Instructions
1. List each claim the reply makes about refunds.
2. For each claim, say whether the reference facts support it.
3. Ignore tone, length and formatting; grade only the criterion.
4. If the reply says it does not know and offers a handover,
   that is a PASS unless the facts clearly answer the question.

Respond in JSON only:
{"reasoning": "<two to four sentences>", "verdict": "PASS" | "FAIL"}`,
    },
    { type: 'h3', text: 'Why this template is shaped this way' },
    {
      type: 'list',
      items: [
        '**Pass/fail, not 1–10.** Judges spread scores unevenly on numeric scales and drift between runs. A binary verdict on a concrete criterion is far more repeatable. If you need nuance, add more criteria, not more points on the scale.',
        '**Reasoning before the verdict.** Asking the model to list claims first makes it actually check them, and gives you a reason to read when a case fails.',
        '**Reference facts included.** Without them, the judge grades against its own general knowledge, which may differ from your policy.',
        '**Explicit “ignore length and tone”.** This counters the most common judge bias, covered below.',
        '**A rule for “I don’t know”.** Otherwise judges often fail honest handovers for being unhelpful, which pushes your agent towards guessing.',
      ],
    },
    { type: 'h2', text: 'The known biases of LLM judges' },
    {
      type: 'table',
      head: ['Bias', 'What happens', 'How to reduce it'],
      rows: [
        ['Length (verbosity) bias', 'Longer, more detailed answers get better grades even when they are not more correct', 'Tell the judge to ignore length; grade specific claims, not overall quality'],
        ['Position bias', 'When comparing two answers, the judge favours the one shown first (or second)', 'Run each comparison twice with the order swapped; count only consistent wins'],
        ['Self-preference', 'A judge tends to rate answers from its own model family higher', 'Use a judge from a different provider than the agent where possible'],
        ['Confidence bias', 'Fluent, assertive wrong answers beat hesitant correct ones', 'Supply reference facts and ask the judge to verify each claim against them'],
        ['Leniency', 'Judges pass borderline answers to be agreeable', 'Write what a FAIL looks like, with examples, into the rubric'],
      ],
    },
    { type: 'h2', text: 'How to calibrate a judge against humans' },
    {
      type: 'steps',
      items: [
        { title: 'Collect 50–100 real answers', text: 'Take them from test runs or production logs, mixing clear passes, clear fails and borderline cases.' },
        { title: 'Grade them by hand first', text: 'Two people if you can. Where they disagree, the rubric is unclear; fix the wording before involving the judge.' },
        { title: 'Run the judge on the same set', text: 'Same criterion, same reference facts, low temperature.' },
        { title: 'Measure agreement', text: 'Count how often the judge’s verdict matches the human verdict. Look closely at false passes (judge said PASS, human said FAIL); those are the expensive mistakes.' },
        { title: 'Fix and repeat', text: 'Read the judge’s reasoning on each disagreement, tighten the rubric or add examples, and re-run until agreement is high enough for the risk involved.' },
      ],
    },
    {
      type: 'p',
      text: 'There is no universal threshold. For a low-risk FAQ bot, a judge that agrees with humans on the large majority of cases and rarely gives false passes may be fine. For anything touching money, health or legal rights, keep a human reviewing a sample of the judge’s passes for as long as the agent runs. The cases you hand-grade here are also the start of a [golden dataset](/blog/golden-dataset-ai-evaluation), which you will reuse on every release.',
    },
    { type: 'h2', text: 'Running judges in practice' },
    {
      type: 'list',
      items: [
        '**Pin the judge model version.** A provider updating the model behind an alias can silently change your pass rate. Re-calibrate when you upgrade.',
        '**Keep the temperature low** so the same answer gets the same verdict on a re-run.',
        '**Store the reasoning with every verdict.** When the pass rate drops, the reasons tell you what broke faster than the number does.',
        '**Budget for it.** Judge calls cost money: cases × criteria × releases adds up. A smaller, cheaper model is often fine for simple criteria once calibrated.',
        '**Use a tool when it saves time.** promptfoo, DeepEval, LangSmith, Langfuse and Phoenix all support judge-based grading; see our [comparison of AI agent testing tools](/blog/ai-agent-testing-tools).',
      ],
    },
    {
      type: 'p',
      text: 'We use calibrated judges, alongside plain code checks and human review, on every [AI agent](/services/ai-agents) and [knowledge assistant](/services/knowledge-rag) we ship, and the client receives the rubric and agreement numbers with the handover. For the full list of what to measure, see [AI agent evaluation metrics](/blog/ai-agent-evaluation-metrics).',
    },
  ],
  faq: [
    {
      q: 'What is LLM-as-a-judge?',
      a: 'LLM-as-a-judge is a way of evaluating AI output where one language model grades another model’s answer against a written rubric and returns a verdict, such as pass or fail, with a reason. It lets teams test AI agents and chatbots on hundreds of cases automatically instead of reading every answer by hand.',
    },
    {
      q: 'How accurate is LLM-as-a-judge?',
      a: 'It depends on the criterion and the rubric. Judges agree well with humans on narrow, concrete questions backed by reference facts, and poorly on vague overall-quality scores. The only way to know for your use case is to grade a sample of answers by hand and measure how often the judge agrees.',
    },
    {
      q: 'Should an LLM judge use a 1 to 10 score or pass/fail?',
      a: 'Pass/fail on one concrete criterion per call is usually more reliable. Numeric scales tend to cluster around the middle and shift between runs. If you need more detail, split the evaluation into several pass/fail criteria rather than adding points to a scale.',
    },
    {
      q: 'Can the same model be both the agent and the judge?',
      a: 'It can, but judges tend to rate answers from their own model family more favourably. Where possible, use a judge model from a different provider than the agent, supply reference facts, and calibrate the judge against human grades.',
    },
  ],
};
