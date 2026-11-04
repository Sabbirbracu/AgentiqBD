import type { Post } from '../types';

export const post: Post = {
  slug: 'rag-evaluation',
  title: 'RAG evaluation: how to test a chatbot that answers from your documents',
  metaTitle: 'RAG Evaluation: How to Test a RAG Chatbot Step by Step',
  excerpt:
    'A RAG chatbot can fail in two places: finding the right passage, and answering from it. Here is how to build a test set, measure each half separately and know which fix a failure needs.',
  category: 'Engineering',
  tags: ['RAG', 'Testing', 'Evaluation'],
  keywords: [
    'RAG evaluation',
    'how to evaluate RAG',
    'RAG testing',
    'RAG evaluation metrics',
    'test RAG chatbot',
    'retrieval evaluation',
    'faithfulness',
  ],
  date: '2026-11-04',
  cover: 'rag-eval',
  takeaways: [
    'Test retrieval and generation separately: they fail for different reasons and need different fixes.',
    'A good RAG test set pairs each question with the passage that answers it, and includes questions the documents do not cover.',
    'Track retrieval hit rate, faithfulness, citation accuracy and honest "I don’t know" answers; permission leaks must be zero.',
    'Re-run the set whenever documents, chunking, the embedding model, the prompt or the model change.',
  ],
  services: ['knowledge-rag', 'chatbots'],
  body: [
    {
      type: 'p',
      text: 'A RAG chatbot answers questions from your own documents. Before the model writes anything, the system searches your files, picks the most relevant passages and hands them to the model with an instruction to answer only from them. Our [RAG explainer](/blog/rag-explained) covers how that works. This article covers the next question: how do you know it works well enough to put in front of staff or customers?',
    },
    {
      type: 'p',
      text: '**RAG evaluation is the process of checking, on a fixed set of questions, whether the system finds the right passages and then answers faithfully from them.** Done well, it tells you not only that something is wrong, but where.',
    },
    { type: 'figure', art: 'rag-eval', caption: 'Two halves, two sets of checks: did search find the right passage, and did the answer stay true to it?' },
    { type: 'h2', text: 'Test the two halves separately' },
    {
      type: 'p',
      text: 'Every RAG answer goes through two steps, and either can fail:',
    },
    {
      type: 'list',
      items: [
        '**Retrieval:** the search step. Did the right passage come back near the top of the results?',
        '**Generation:** the writing step. Given the passages, did the model answer correctly, using only what they say?',
      ],
    },
    {
      type: 'p',
      text: 'If you only grade the final answer, a wrong answer could mean either. The fixes are completely different. Bad retrieval is fixed with better chunking, better search or cleaner documents. Bad generation is fixed with better instructions, a stronger model or stricter citation rules. Measuring both halves on every question stops you from tuning the prompt when the real problem is search.',
    },
    { type: 'h2', text: 'Step 1: Build the test set' },
    {
      type: 'p',
      text: 'A RAG test set is a list of questions, each with the correct answer and the passage (or passages) that contain it. We aim for real questions first: search logs, support tickets, the questions new staff ask in their first month. Then we add the cases that usually break things:',
    },
    {
      type: 'list',
      items: [
        '**Paraphrases.** The same question in words that do not appear in the document ("send it back" instead of "return").',
        '**Two-document questions.** The answer needs a policy from one file and a price from another.',
        '**Not covered.** Questions the documents do not answer. The right response is "I don’t know", not a guess.',
        '**Old versions.** Topics where an outdated document is still in the library. The system must prefer the current one.',
        '**Restricted content.** Questions a given user should not be able to get answers to, such as salary data for a non-HR user.',
        '**Mixed language.** Questions in Bangla or Banglish about documents written in English, or the other way round, if your users write that way.',
      ],
    },
    {
      type: 'code',
      lang: 'yaml',
      caption: 'Two test cases from an internal policy assistant',
      code: `- id: sale-item-return
  question: "Can I return something I bought in the sale?"
  user_role: customer_support
  expected_sources: ["returns-policy.pdf#p3"]
  must_not_use: ["returns-policy-2024.pdf"]   # superseded
  answer_must_include: ["7 days", "unused", "receipt"]

- id: not-covered-warranty-abroad
  question: "Is the warranty valid if I move abroad?"
  user_role: customer_support
  expected_sources: []          # documents do not cover this
  expected_behaviour: says_unknown_and_offers_handover`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Let the document owners write the answers',
      text: 'Engineers can write the questions, but the people who own the policies should confirm the correct answers. Otherwise the test set encodes an engineer’s guess about the policy, and the system gets graded against it.',
    },
    { type: 'h2', text: 'Step 2: Measure retrieval' },
    {
      type: 'p',
      text: 'Retrieval can be graded automatically, because each question already lists the passages it needs. The useful numbers are:',
    },
    {
      type: 'table',
      head: ['Metric', 'What it means', 'Why it matters'],
      rows: [
        ['Hit rate (recall at k)', 'Share of questions where a correct passage is in the top k results the model sees', 'If the passage is not retrieved, the model cannot use it'],
        ['Rank of the first correct passage', 'How high the right passage appears (often summarised as mean reciprocal rank)', 'Passages near the top are used more reliably'],
        ['Outdated-source rate', 'How often a superseded document is retrieved instead of the current one', 'Old policies produce confident, wrong answers'],
        ['Permission leaks', 'Retrieved passages the user is not allowed to see', 'Must be zero. Access control belongs in search, not in the prompt'],
      ],
    },
    {
      type: 'p',
      text: 'Set k to the number of passages the model actually receives. A passage at rank 12 does not help if only the top 5 are passed on.',
    },
    { type: 'h2', text: 'Step 3: Measure generation' },
    {
      type: 'p',
      text: 'Now grade the answers, given what was retrieved. These checks need judgement, so we use a second model as a grader with a written rubric and the source passages in front of it, and a person reviews a sample of its verdicts.',
    },
    {
      type: 'list',
      items: [
        '**Faithfulness.** Does every claim in the answer appear in the retrieved passages? An answer can be true in the real world and still be unfaithful, if it came from the model’s general knowledge instead of your documents.',
        '**Answer correctness.** Does the answer match the one the document owner confirmed, including the details that matter (amounts, deadlines, conditions)?',
        '**Citation accuracy.** Do the sources it shows actually support what it says? A citation to the wrong page is worse than none, because it looks trustworthy.',
        '**Honest abstention.** For not-covered questions, does it say it does not know, and offer a next step? Also track the opposite: how often it says "I don’t know" when the answer was right there.',
      ],
    },
    { type: 'h2', text: 'Reading the results: symptom, cause, fix' },
    {
      type: 'table',
      head: ['What you see', 'Likely cause', 'What to try'],
      rows: [
        ['Right passage missing from results', 'Chunks too large or split mid-topic, or wording mismatch', 'Re-chunk by section, add titles to chunks, try hybrid (keyword plus semantic) search'],
        ['Right passage found but ranked low', 'Search ranks loosely related text higher', 'Add a re-ranking step, filter by document type or date first'],
        ['Old policy quoted', 'Superseded files still indexed', 'Remove or tag old versions; filter by "current" before searching'],
        ['Correct passage, wrong answer', 'Instructions too loose, or the model fills gaps', 'Require quoting or citing, tighten the instructions, test a stronger model'],
        ['Guesses on uncovered questions', 'No clear rule for "not found"', 'Instruct and test the "I don’t know" path explicitly'],
        ['Answers that should be hidden', 'Access filtered after search, or not at all', 'Apply the user’s permissions inside the search query itself'],
      ],
    },
    { type: 'h2', text: 'Step 4: Re-run on every change' },
    {
      type: 'p',
      text: 'RAG systems change more often than people expect. New documents are added, chunk sizes are tuned, embedding models are upgraded, prompts are edited, and the model provider ships new versions. Any one of these can improve some answers and quietly break others. The test set runs on every change, and each run is compared with the last one, not just with a threshold.',
    },
    {
      type: 'p',
      text: 'After launch, add real questions that went wrong to the set. Flag conversations where users rephrase the same question, rate an answer badly or ask for a person: those are usually retrieval failures. How we turn these numbers into a go-live decision is covered in [AI agent evaluation metrics](/blog/ai-agent-evaluation-metrics).',
    },
    { type: 'h2', text: 'A starter plan' },
    {
      type: 'steps',
      items: [
        { title: 'Collect 50 real questions', text: 'From tickets, emails or staff, with the passage that answers each one confirmed by the document owner.' },
        { title: 'Add the hard cases', text: 'Paraphrases, not-covered questions, old versions and at least one restricted question per user role.' },
        { title: 'Grade both halves', text: 'Hit rate and permission leaks for retrieval; faithfulness, correctness and abstention for answers.' },
        { title: 'Fix the biggest gap first', text: 'Usually retrieval. There is little point polishing answers the model never had the passage for.' },
      ],
    },
    {
      type: 'p',
      text: 'This is how we test every [AI knowledge base](/services/knowledge-rag) and document-answering [chatbot](/services/chatbots) we build. For the wider testing process around agents that also take actions, read [how to test an AI agent before go-live](/blog/testing-ai-agents-before-go-live).',
    },
  ],
};
