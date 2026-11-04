import type { Post } from '../types';

export const post: Post = {
  slug: 'testing-voice-ai-agents',
  title: 'How to test a voice AI agent before it answers your phone',
  metaTitle: 'How to Test Voice AI Agents: Speech, Timing and Handover',
  excerpt:
    'A voice agent can make every right decision and still fail the caller: it mishears a phone number, talks over them or pauses too long. Here is what to test on top of the usual agent checks, and how.',
  category: 'Engineering',
  tags: ['AI agents', 'Voice', 'Testing'],
  keywords: [
    'how to test voice AI agents',
    'voice AI agent testing',
    'voice agent evaluation',
    'AI receptionist testing',
    'voice bot testing',
    'speech recognition testing',
  ],
  date: '2026-11-04',
  cover: 'voice-test',
  takeaways: [
    'Test a voice agent in three layers: what it hears, what it decides, and what it says back.',
    'Judge speech recognition on the details that matter (names, numbers, dates, addresses), not on overall word accuracy.',
    'Test timing: interruptions, long silences, and how long callers wait after they stop speaking, especially on the slowest calls.',
    'Always test on real phone lines and real voices before launch; clean recordings hide most problems.',
  ],
  services: ['voice', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: 'A voice AI agent is an AI agent with a phone in front of it. Underneath, it still has to understand the request, use the right tools and know when to hand over, so everything in [how to test an AI agent](/blog/testing-ai-agents-before-go-live) still applies. But voice adds problems that a chat agent never meets: there is no screen to check what was understood, the line may be noisy, and timing matters as much as content.',
    },
    {
      type: 'p',
      text: 'This article covers what changes when you test a voice agent, and the extra checks we run before one answers a real business line.',
    },
    { type: 'figure', art: 'voice-test', caption: 'Speech in, logic, speech out: a voice agent can fail at any of the three, so each is tested on its own.' },
    { type: 'h2', text: 'Three layers to test' },
    {
      type: 'steps',
      items: [
        { title: 'Speech in', text: 'Speech recognition turns the caller’s voice into text. Did it hear the words that matter correctly?' },
        { title: 'Logic', text: 'The agent decides what to do and calls its tools. Same checks as any agent: right action, right facts, right handover.' },
        { title: 'Speech out', text: 'The reply is spoken back. Is it clear, correctly pronounced, short enough, and delivered at the right moment?' },
      ],
    },
    {
      type: 'p',
      text: 'Test the logic layer first, with text, because it is the fastest to run and fix. Then test the two speech layers, which is where most voice-specific failures hide.',
    },
    { type: 'h2', text: 'Speech in: test the details, not the word count' },
    {
      type: 'p',
      text: 'Speech recognition is often scored by word error rate: the share of words transcribed wrongly. It is a useful engineering number, but it misses what matters to the business. A transcript can get 95 words out of 100 right and still miss the one digit in a phone number that makes the booking useless.',
    },
    {
      type: 'p',
      text: '**For a voice agent, the key speech metric is entity accuracy: how often it captures names, numbers, dates, times and addresses exactly right.** We test these specifically:',
    },
    {
      type: 'list',
      items: [
        '**Phone numbers and reference numbers**, said in groups, said slowly, said quickly, and with corrections ("zero one seven… no, one nine").',
        '**Names**, especially local names and spellings the recogniser may never have seen.',
        '**Dates and times**, including "the day after tomorrow", "half past four" and the local way of saying times.',
        '**Addresses and area names**, which are often the hardest words on the call.',
        '**Different voices and conditions**: older and younger callers, strong accents, a busy street, a car, a speakerphone.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Read critical details back',
      text: 'No recogniser is perfect, so the agent should confirm what matters before acting: "That’s Thursday at 5:30, and your number is 017… is that right?" Testing then includes the correction path: does the agent fix the detail cleanly when the caller says "no"?',
    },
    { type: 'h2', text: 'Logic: the same checks as any agent' },
    {
      type: 'p',
      text: 'Run the agent’s full scenario set as text: bookings, cancellations, questions, missing details, out-of-scope requests and callers who want a person. Our [AI agent test case checklist](/blog/ai-agent-test-cases) covers the categories. For voice, add the cases that only happen on calls: the caller speaking to someone else in the room, a silent caller, and a caller who hangs up halfway through a booking.',
    },
    { type: 'h2', text: 'Speech out: what the caller hears' },
    {
      type: 'list',
      items: [
        '**Pronunciation** of the business name, staff names, product names and local place names.',
        '**Numbers read aloud** the way people expect: prices, times and phone numbers in natural groups, not as one long figure.',
        '**Length.** A reply that reads well on screen is often too long to listen to. Spoken answers should be short, with one question at a time.',
        '**No visual formatting.** Lists, links and symbols that make sense in chat sound strange when read out.',
      ],
    },
    { type: 'h2', text: 'Timing and turn-taking' },
    {
      type: 'p',
      text: 'Timing is where voice agents feel most robotic, and it is easy to miss in testing because testers are patient. We check:',
    },
    {
      type: 'table',
      head: ['Situation', 'Good behaviour'],
      rows: [
        ['Caller interrupts mid-sentence', 'The agent stops talking and listens'],
        ['Caller pauses to think or find a number', 'The agent waits, instead of jumping in after a short gap'],
        ['Long silence', 'A gentle prompt ("Are you still there?"), then a polite close'],
        ['Caller says "hello?" while the agent is working', 'A short acknowledgement, so they know the line is alive'],
        ['A slow tool, such as a calendar lookup', 'A brief "one moment, let me check" instead of dead air'],
      ],
    },
    {
      type: 'p',
      text: '**Response time** is measured from the moment the caller stops speaking to the moment the agent starts. Look at the slowest calls, not just the average: a pause that feels small in a chat feels long on the phone, and it is the slow moments that make callers hang up or start talking over the agent.',
    },
    { type: 'h2', text: 'Handover and the end of the call' },
    {
      type: 'list',
      items: [
        '**Transfers work on the real phone system**, to the right number, during and outside office hours.',
        '**Call-backs are recorded** with the caller’s number, name and reason, and reach the right person.',
        '**The summary is accurate.** Compare the summary sent to the CRM or inbox against the actual call.',
        '**Urgent calls always go to a person**, whatever else is happening, with no menu to get through first.',
      ],
    },
    { type: 'h2', text: 'How to run voice tests' },
    {
      type: 'table',
      head: ['Method', 'Good for', 'Limits'],
      rows: [
        ['Text-only scenario runs', 'Logic, tool calls, handover rules', 'Says nothing about speech or timing'],
        ['Recorded call audio (with consent)', 'Real voices, accents, background noise', 'Needs permission; cannot interrupt or react'],
        ['Generated voices with added noise', 'Large numbers of variations quickly', 'Synthetic voices are cleaner than real callers'],
        ['Simulated caller (a second agent on the line)', 'Full conversations, interruptions, repeat runs', 'Still not a real person on a real phone'],
        ['Scripted live calls by staff', 'Real lines, real phones, real timing', 'Slow; use for the final checks'],
      ],
    },
    {
      type: 'p',
      text: 'Use them together. Automated runs catch regressions on every change; live calls from ordinary mobile phones catch what lab tests miss. We always finish with staff calling the real number from their own phones, in the situations customers will be in.',
    },
    { type: 'h2', text: 'A note on Bangla and mixed-language calls' },
    {
      type: 'p',
      text: 'Recognition and voice quality vary by language, accent and phone line. For Bangla and mixed Bangla-English calls, we test with the business’s own call scenarios during discovery and say plainly what works before anyone commits. If names or numbers are unreliable in a language, the agent can confirm them by SMS or hand those calls to a person.',
    },
    { type: 'h2', text: 'After launch' },
    {
      type: 'p',
      text: 'Review a sample of real calls every week at first: transcripts next to recordings, so you can see what was misheard. Every misheard detail and awkward pause becomes a new test case. How to set this up is covered in [monitoring AI agents in production](/blog/monitoring-ai-agents-in-production).',
    },
    {
      type: 'p',
      text: 'This testing is part of every [AI voice agent](/services/voice) we build. If your business misses calls while the team is busy, that page explains what a voice agent can take off your hands.',
    },
  ],
};
