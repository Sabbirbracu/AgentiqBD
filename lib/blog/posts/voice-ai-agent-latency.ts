import type { Post } from '../types';

export const post: Post = {
  slug: 'voice-ai-agent-latency',
  title: 'Voice AI agent latency: where the delay comes from and how to cut it',
  metaTitle: 'Voice AI Agent Latency: How to Reduce Response Delay',
  excerpt:
    'A voice agent that pauses too long feels broken, however smart it is. A breakdown of where the delay comes from in a voice pipeline, sensible targets, and the fixes that make the biggest difference.',
  category: 'Engineering',
  tags: ['Voice AI', 'AI agents', 'Performance'],
  keywords: [
    'voice AI latency',
    'voice agent latency',
    'reduce voice AI latency',
    'AI voice agent response time',
    'speech to speech latency',
    'conversational AI latency',
    'voice bot delay',
  ],
  date: '2026-11-24',
  cover: 'voice-test',
  takeaways: [
    'Latency is the time from when the caller stops speaking to when they hear the agent start replying. It is the main thing that makes a voice agent feel natural or robotic.',
    'In a typical pipeline the delay adds up from five places: detecting end of speech, speech-to-text, the language model, text-to-speech, and network and telephony.',
    'The biggest wins: stream every stage, tune end-of-speech detection, use a fast model for the spoken reply, keep services close together, and avoid slow tool calls before the first words.',
    'Measure the real delay on real phone calls, at the median and the slow end (p95), not just averages from a demo on office Wi-Fi.',
  ],
  services: ['voice', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**Voice AI latency is the time between the caller finishing a sentence and hearing the agent begin to answer.** In normal human conversation that gap is very short, typically a fraction of a second. When a voice agent takes two or three seconds, callers start repeating themselves, talk over it or hang up, even if the answer would have been perfect.',
    },
    {
      type: 'p',
      text: 'Latency is a pipeline problem: several systems each add a little delay. You cut it by finding which stage is slow and changing that stage, not by switching to “a faster AI” and hoping.',
    },
    { type: 'h2', text: 'Where the delay comes from' },
    {
      type: 'table',
      head: ['Stage', 'What happens', 'Typical cause of slowness'],
      rows: [
        ['End-of-speech detection', 'The system decides the caller has finished, not just paused', 'Waiting too long in silence “to be sure”'],
        ['Speech-to-text (STT)', 'Audio is turned into text', 'Non-streaming transcription that waits for the whole utterance'],
        ['Language model (LLM)', 'The agent decides what to say and whether to call tools', 'Large model, long prompt, tool calls before replying'],
        ['Text-to-speech (TTS)', 'The reply text becomes audio', 'Waiting for the full reply text before generating speech'],
        ['Network and telephony', 'Audio travels between the phone network and your services', 'Services in different regions; extra hops between providers'],
      ],
    },
    { type: 'figure', art: 'voice-test', caption: 'The caller hears the sum of every stage, so each one needs to stream and hand off early.' },
    {
      type: 'p',
      text: 'Some platforms replace the middle three stages with a single speech-to-speech model that listens and replies in audio directly. That can cut latency noticeably and sounds more natural, at the cost of less control over exactly what is said and, often, higher cost per minute. Both designs are valid; the fixes below apply to either.',
    },
    { type: 'h2', text: 'What is a good target?' },
    {
      type: 'p',
      text: 'As a working guide, aim for the agent to start speaking within about one second of the caller finishing, most of the time, and treat anything regularly above two seconds as a problem. Exact numbers depend on the call type: a quick booking needs snappy replies, while a caller asking a complex question tolerates a short pause, especially if the agent acknowledges it. Measure the slow end too: if one reply in twenty takes four seconds, callers remember that one.',
    },
    { type: 'h2', text: 'The fixes, in order of impact' },
    { type: 'h3', text: '1. Stream everything' },
    {
      type: 'p',
      text: 'Each stage should start working before the previous one finishes: transcription while the caller speaks, the model reading partial text, speech generation starting from the first sentence of the reply rather than the last. A pipeline that waits for each stage to complete fully can easily double the delay.',
    },
    { type: 'h3', text: '2. Tune end-of-speech detection' },
    {
      type: 'p',
      text: 'Many slow agents are just waiting too long in silence. Shorter silence thresholds respond faster but risk interrupting callers who pause mid-sentence; smarter turn detection that considers the words, not only the silence, helps. Test with real callers, including slow speakers and people reading out numbers.',
    },
    { type: 'h3', text: '3. Use a fast model for the spoken reply' },
    {
      type: 'p',
      text: 'What matters for voice is how quickly the model produces its first words (time to first token), not its total speed. Smaller, faster models often handle routine call steps well. Keep the system prompt focused; long prompts slow every reply.',
    },
    { type: 'h3', text: '4. Say something before slow tool calls' },
    {
      type: 'p',
      text: 'Looking up an order or checking a calendar can take a second or more. Have the agent acknowledge first (“Let me check that for you”) and run the lookup while speaking. It is what a person would do, and callers accept it.',
    },
    { type: 'h3', text: '5. Keep services close together' },
    {
      type: 'p',
      text: 'Run your agent in the same cloud region as your telephony, speech and model providers where possible, and close to your callers. Every extra round trip between continents adds delay you cannot optimise away in code.',
    },
    { type: 'h3', text: '6. Cache and prepare' },
    {
      type: 'list',
      items: [
        'Pre-generate audio for fixed lines such as the greeting, disclosure and common confirmations.',
        'Load the caller’s details (by phone number) when the call connects, not when they are first needed.',
        'Keep connections to providers open instead of reconnecting per turn.',
      ],
    },
    { type: 'h3', text: '7. Handle interruptions cleanly' },
    {
      type: 'p',
      text: 'Fast replies mean callers will sometimes talk over the agent. It should stop speaking as soon as the caller starts (barge-in), listen, and respond to what they said, not finish its old sentence.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Measure each stage, not only the total',
      text: 'Log timestamps at every handoff: speech ended, transcript ready, first model token, first audio byte, audio played. Without this, you will guess which stage to fix, and usually guess wrong.',
    },
    { type: 'h2', text: 'How to measure latency properly' },
    {
      type: 'list',
      items: [
        '**Use real phone calls**, from mobile networks, not a browser demo on office Wi-Fi. The phone network adds delay of its own.',
        '**Report the median and the p95** (the slowest 5% of replies). Averages hide the bad moments callers remember.',
        '**Split by turn type**: simple replies, replies with a tool call, and replies after a long caller message.',
        '**Track it in production**, because provider load, prompt growth and new tools all change latency after launch. See [AI agent monitoring in production](/blog/monitoring-ai-agents-in-production).',
      ],
    },
    {
      type: 'p',
      text: 'Latency is one part of voice quality; recognition accuracy, handling accents and clean handover to staff matter just as much. Our guide to [testing voice AI agents](/blog/testing-voice-ai-agents) covers the full checklist, and [AI receptionist for small business](/blog/ai-receptionist-small-business) shows how it comes together for a real phone line.',
    },
    {
      type: 'p',
      text: 'We build [AI voice agents](/services/voice) with stage-by-stage latency logging from day one, so delays are measured and fixed rather than argued about.',
    },
  ],
  faq: [
    {
      q: 'What is latency in a voice AI agent?',
      a: 'Latency is the time between when a caller stops speaking and when they hear the voice agent start to reply. It is made up of end-of-speech detection, speech-to-text, the language model’s response, text-to-speech and network or telephony delay.',
    },
    {
      q: 'What is a good response time for a voice AI agent?',
      a: 'As a practical guide, the agent should usually begin speaking within about one second of the caller finishing, and replies regularly taking more than two seconds feel broken. Measure on real phone calls and check the slowest replies (p95), not just the average.',
    },
    {
      q: 'How do I reduce voice AI latency?',
      a: 'Stream every stage of the pipeline, tune end-of-speech detection, use a fast model with a focused prompt for spoken replies, acknowledge the caller before slow tool calls, run services in the same region, pre-generate fixed audio, and log timing at every stage to find the real bottleneck.',
    },
    {
      q: 'Are speech-to-speech models faster than STT, LLM and TTS pipelines?',
      a: 'Often, yes. A single speech-to-speech model avoids handoffs between separate speech and text systems, which can reduce delay and sound more natural. The trade-offs are usually less control over exact wording and higher cost per minute, so the right choice depends on the use case.',
    },
  ],
};
