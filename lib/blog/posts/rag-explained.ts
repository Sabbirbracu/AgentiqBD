import type { Post } from '../types';

export const post: Post = {
  slug: 'rag-explained',
  title: 'RAG explained: how to make AI answer from your own documents',
  metaTitle: 'RAG Explained: How AI Answers from Your Own Documents',
  excerpt:
    'Retrieval-augmented generation is how a chatbot or agent answers from your policies, manuals and price lists instead of guessing. How it works, and where it goes wrong.',
  category: 'Guides',
  tags: ['RAG', 'Knowledge base', 'LLMs'],
  keywords: ['what is RAG', 'retrieval augmented generation explained', 'AI knowledge base', 'chat with your documents', 'RAG pipeline'],
  date: '2026-10-29',
  cover: 'rag',
  takeaways: [
    'A language model does not know your business. RAG finds the relevant parts of your documents and gives them to the model with each question.',
    'The pipeline is: collect, chunk, embed, store, retrieve, then answer with sources.',
    'Most RAG quality problems are document problems: outdated, duplicated or badly structured sources.',
    'Good RAG says "I don’t know" when your documents do not cover the question.',
  ],
  services: ['knowledge-rag', 'chatbots'],
  body: [
    {
      type: 'p',
      text: 'Ask a general AI model about your company’s refund policy and it will give you an answer. It will sound confident, and it may be completely made up. The model was trained on the public internet, not on your policy documents. When it does not know something, it produces the most plausible-sounding text instead. This is what people mean by "hallucination".',
    },
    {
      type: 'p',
      text: '**Retrieval-augmented generation (RAG)** fixes this by looking things up first. Before the model answers, the system finds the relevant passages in your own documents and hands them over with the question, along with an instruction to answer only from them.',
    },
    { type: 'h2', text: 'Why not just train the model on our documents?' },
    {
      type: 'p',
      text: 'Fine-tuning a model teaches it style and patterns well, but it is a poor way to store facts. It is expensive, it goes out of date the moment your price list changes, and you cannot easily see which document an answer came from. RAG keeps your knowledge in documents you can edit, and the model reads the current version every time.',
    },
    { type: 'h2', text: 'How RAG works, step by step' },
    { type: 'figure', art: 'rag', caption: 'Documents are split, indexed by meaning and retrieved for each question. The model answers from those passages and cites them.' },
    {
      type: 'steps',
      items: [
        { title: 'Collect', text: 'Gather the sources: PDFs, Word files, help-centre articles, website pages, spreadsheets, internal wikis.' },
        { title: 'Chunk', text: 'Split each document into passages of a few paragraphs, following its headings, and keep the title and source with every chunk.' },
        { title: 'Embed', text: 'Convert each chunk into a vector, a list of numbers that captures its meaning. Passages with similar meaning end up close together.' },
        { title: 'Store', text: 'Save the vectors with their metadata (source, date, department, who may see it) in a vector database, or in Postgres with pgvector.' },
        { title: 'Retrieve', text: 'When a question arrives, embed it the same way and find the closest chunks. Combine with keyword search so exact codes and names are not missed.' },
        { title: 'Answer', text: 'Give the model the question, the retrieved chunks and clear rules: answer only from these passages, cite them, and say so if they do not cover the question.' },
      ],
    },
    {
      type: 'code',
      lang: 'text',
      caption: 'A simplified answering prompt',
      code: `Answer the customer's question using ONLY the passages below.
Cite the passage number after each fact, like [2].
If the passages do not contain the answer, say you don't know
and offer to connect the customer with a person.
Reply in the language the customer used.

Passages:
[1] Delivery inside Dhaka: 1–2 working days ...
[2] Delivery outside Dhaka: 3–5 working days ...

Question: ঢাকার বাইরে ডেলিভারিতে কতদিন লাগে?`,
    },
    { type: 'h2', text: 'Where RAG goes wrong' },
    { type: 'h3', text: 'Bad sources' },
    {
      type: 'p',
      text: 'If there are two versions of the price list in the system, the AI will sometimes quote the old one. No retrieval technique fixes contradictory documents. The fix is organisational: one owner per document, one source of truth, and old versions removed rather than left alongside the new ones.',
    },
    { type: 'h3', text: 'Bad chunks' },
    {
      type: 'p',
      text: 'Split a table down the middle, or separate a paragraph from the heading that gives it meaning, and the retrieved passage stops making sense. Chunking that follows the document’s structure, and adds the section title to each chunk, makes a large difference.',
    },
    { type: 'h3', text: 'Bad retrieval' },
    {
      type: 'p',
      text: 'The customer asks how to "cancel"; the policy talks about "termination". Pure keyword search misses it; pure vector search can miss exact product codes. Hybrid search (both together), re-ranking the top results, and rewriting vague questions before searching all help.',
    },
    { type: 'h3', text: 'No access control' },
    {
      type: 'p',
      text: 'If HR documents are in the same index as product manuals, a customer might get an answer drawn from salary policy. Permissions must be applied at retrieval time, by filtering on who is asking, not by hoping the model stays quiet.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Filter before, not after',
      text: 'Never retrieve restricted passages and then ask the model to ignore them. If a passage should not be seen by this user, it should never reach the model in the first place.',
    },
    { type: 'h2', text: 'How to tell if your RAG is any good' },
    {
      type: 'p',
      text: 'Build a test set of real questions with known correct answers and their source documents, then check three things for each one:',
    },
    {
      type: 'list',
      items: [
        '**Retrieval:** did the right passage come back in the top results?',
        '**Faithfulness:** does the answer say only what the passage says?',
        '**Honesty:** when the documents do not cover a question, does the system say so instead of guessing?',
      ],
    },
    {
      type: 'p',
      text: 'Run the set before and after every change to documents, chunking or prompts. It is the only reliable way to know whether a change helped.',
    },
    { type: 'h2', text: 'Mixed languages' },
    {
      type: 'p',
      text: 'For many teams in Bangladesh, documents are written in English but questions arrive in Bangla or Banglish. Multilingual embedding models can match a Bangla question to an English passage, but this needs testing with real questions, not assumptions. We include mixed-language questions in every test set.',
    },
    { type: 'h2', text: 'Where to start' },
    {
      type: 'p',
      text: 'Start with one department and one well-kept set of documents, for example HR policies for staff, or a product catalogue for customers. Clean those documents first, launch with sources shown on every answer, and expand once people trust it. Our [AI knowledge base & RAG](/services/knowledge-rag) page covers what a first project looks like.',
    },
  ],
};
