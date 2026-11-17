import type { Post } from '../types';

export const post: Post = {
  slug: 'how-to-reduce-ai-hallucinations',
  title: 'How to stop an AI chatbot from making things up: 9 fixes that work in production',
  metaTitle: 'How to Reduce AI Hallucinations in Chatbots: 9 Proven Fixes',
  excerpt:
    'Your chatbot quoted a price you never set or invented a policy. Why AI hallucinates, the nine fixes that actually reduce it in business chatbots and agents, and how to measure whether they worked.',
  category: 'Guides',
  tags: ['AI agents', 'Chatbots', 'RAG'],
  keywords: [
    'how to reduce AI hallucinations',
    'stop chatbot hallucinations',
    'AI chatbot making things up',
    'LLM hallucination prevention',
    'reduce hallucinations RAG',
    'why does AI hallucinate',
    'AI hallucination in customer service',
  ],
  date: '2026-11-20',
  cover: 'rag',
  takeaways: [
    'Hallucination is when an AI gives a fluent, confident answer that is false or not supported by your information.',
    'The biggest single fix is to stop asking the model to remember facts: give it your approved information (RAG) and fetch live data such as prices and stock through tools.',
    'Make “I don’t know, let me connect you” an acceptable answer, and test for it. Agents that are graded on always answering learn to guess.',
    'You cannot reach zero. Measure faithfulness on a test set, monitor real conversations, and keep humans in the loop where a wrong answer is costly.',
  ],
  services: ['knowledge-rag', 'chatbots', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**An AI hallucination is an answer that sounds confident and fluent but is false or not supported by the information the AI was given.** In a business chatbot that looks like an invented discount, a wrong opening time, a policy that does not exist, or a made-up order status. It happens because language models generate the most likely-sounding text, and they do that whether or not they actually know the answer.',
    },
    {
      type: 'p',
      text: 'The good news: in a business chatbot with a defined job, most hallucinations come from a handful of fixable causes. These are the nine fixes we apply, roughly in order of impact.',
    },
    { type: 'h2', text: 'Why business chatbots hallucinate' },
    {
      type: 'list',
      items: [
        '**The answer is not in what the model was given**, so it fills the gap from general knowledge or guesses.',
        '**The right information exists but was not retrieved**, because search returned the wrong passages.',
        '**The information is outdated or contradictory**, such as two versions of the returns policy in the knowledge base.',
        '**The prompt pushes it to always answer**, so “I don’t know” feels like failure.',
        '**The question is outside the bot’s job**, and nothing tells it to decline.',
      ],
    },
    { type: 'h2', text: 'The 9 fixes' },
    { type: 'h3', text: '1. Ground answers in your own approved information (RAG)' },
    {
      type: 'p',
      text: 'Retrieval-augmented generation finds the relevant passages from your documents and gives them to the model with the question, with an instruction to answer only from them. This alone removes most invented policies and product details. If RAG is new to you, start with [RAG explained](/blog/rag-explained).',
    },
    { type: 'h3', text: '2. Fetch live facts through tools, never from memory' },
    {
      type: 'p',
      text: 'Prices, stock, order status, appointment slots and account balances change daily. They should come from your systems through a tool call (a database query or API) every time, not from documents and never from the model’s memory. If the tool fails, the bot should say so instead of guessing.',
    },
    { type: 'h3', text: '3. Make “I don’t know” a correct answer' },
    {
      type: 'p',
      text: 'Tell the model plainly that when the information does not answer the question, it should say so and offer a handover to a person. Then add test cases where the right answer is “I don’t know”, so a version that starts guessing fails the test.',
    },
    { type: 'h3', text: '4. Narrow the job' },
    {
      type: 'p',
      text: 'A bot that answers questions about your products, orders and policies, and politely declines everything else, hallucinates far less than one told to “help with anything”. Write down what is in scope and what to do with the rest.',
    },
    { type: 'h3', text: '5. Fix retrieval before blaming the model' },
    {
      type: 'p',
      text: 'When an answer is wrong, check what was retrieved. Often the model did its job with the wrong passages. Better document splitting, combining keyword and semantic search, and re-ranking results usually help more than changing models. Our [RAG evaluation guide](/blog/rag-evaluation) shows how to tell retrieval failures from generation failures.',
    },
    { type: 'h3', text: '6. Clean the knowledge base' },
    {
      type: 'p',
      text: 'Remove old versions, resolve contradictions, give each document an owner and a review date. A chatbot is only as accurate as the least accurate document it can find.',
    },
    { type: 'h3', text: '7. Show sources' },
    {
      type: 'p',
      text: 'Ask the model to cite which document each answer came from, and show the link to the user. It nudges the model to stay close to the text, lets users check, and makes wrong answers easy to trace.',
    },
    { type: 'h3', text: '8. Use structured output and validation for anything actionable' },
    {
      type: 'p',
      text: 'When the AI fills a form, creates a booking or extracts invoice fields, require a fixed format and validate it in code: the date is real, the product code exists, the total adds up. Reject and retry, or send to a person, when validation fails.',
    },
    { type: 'h3', text: '9. Keep humans where mistakes are expensive' },
    {
      type: 'p',
      text: 'For refunds, contracts, medical or legal topics, let the AI draft and a person approve. This is not a failure of the AI project; it is how you get most of the time saving with little of the risk. See [AI agent guardrails](/blog/ai-agent-guardrails) for approval patterns.',
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'What about temperature and bigger models?',
      text: 'A lower temperature makes answers more consistent, and newer models generally hallucinate less, but neither fixes missing or wrong information. Do fixes 1–4 first; then model choice becomes a fine-tuning step, not a rescue.',
    },
    { type: 'h2', text: 'How to measure hallucinations' },
    {
      type: 'table',
      head: ['Measure', 'What it tells you', 'How'],
      rows: [
        ['Faithfulness', 'Share of answers fully supported by the retrieved information', 'An AI judge checks each claim against the sources, calibrated against human grades'],
        ['Correct refusal rate', 'Share of unanswerable questions where the bot says it does not know', 'Test cases whose right answer is a handover'],
        ['Fact accuracy on live data', 'Prices, dates and statuses match your systems', 'Code checks against the database for test orders and products'],
        ['Production flags', 'Real wrong answers that reached customers', 'Thumbs-down feedback, staff review of a sample, complaint tags'],
      ],
    },
    {
      type: 'p',
      text: 'Run these on a fixed test set before each release and track them over time. For how to automate the grading, see [LLM-as-a-judge](/blog/llm-as-a-judge); for the full metrics list, [AI agent evaluation metrics](/blog/ai-agent-evaluation-metrics).',
    },
    {
      type: 'p',
      text: 'We build [AI knowledge assistants](/services/knowledge-rag) and [chatbots](/services/chatbots) that answer from your approved information, cite sources, fetch live data through tools and hand over when unsure. If your current bot is inventing answers, the free [48-hour AI business audit](/packages/audit) will show where the gaps are.',
    },
  ],
  faq: [
    {
      q: 'Why do AI chatbots hallucinate?',
      a: 'Language models generate the most likely-sounding text rather than looking up facts. When the information they need is missing, wrong, contradictory or not retrieved, they still produce a fluent answer, which can be false. Prompts that push the bot to always answer make this worse.',
    },
    {
      q: 'How do I stop my chatbot from making things up?',
      a: 'Give it your approved information through retrieval (RAG), fetch live facts such as prices and order status through tools, tell it to say “I don’t know” and hand over when the information does not answer the question, narrow its scope, clean your knowledge base, show sources, and keep human approval for high-stakes answers.',
    },
    {
      q: 'Does RAG eliminate hallucinations?',
      a: 'No, but it greatly reduces them in business chatbots. Hallucinations can still happen when retrieval returns the wrong passages or the model adds details not in the sources, so RAG systems should be tested for faithfulness and retrieval quality on every release.',
    },
    {
      q: 'Can AI hallucinations be reduced to zero?',
      a: 'Not with current technology. The practical goal is to make them rare, easy to detect and low-impact: ground answers in your data, validate actionable outputs in code, monitor real conversations, and require human approval where a wrong answer is costly.',
    },
  ],
};
