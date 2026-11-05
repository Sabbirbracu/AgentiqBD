import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-receptionist-small-business',
  title: 'AI receptionist for small business: what it can handle, what it cannot, and how to set one up',
  metaTitle: 'AI Receptionist for Small Business: What It Can and Can’t Do',
  excerpt:
    'An AI receptionist answers every call, books appointments and takes messages around the clock. An honest look at what works today, where it still needs a human, and how to roll one out safely.',
  category: 'Guides',
  tags: ['Voice AI', 'AI agents', 'Small business'],
  keywords: [
    'AI receptionist',
    'AI receptionist for small business',
    'AI phone answering service',
    'virtual receptionist AI',
    'AI voice agent for appointments',
    'AI answering service',
  ],
  date: '2026-11-12',
  cover: 'receptionist',
  takeaways: [
    'An AI receptionist is a voice AI agent that answers your phone line, handles routine requests and passes the rest to your team.',
    'It is strong at FAQs, booking and rescheduling, taking messages and routing calls; it is weak at emotional, complex or high-stakes calls.',
    'The quality comes from setup: accurate business information, a connected calendar, clear handover rules and testing with real call types.',
    'Tell callers they are speaking to an AI, and check your local rules on call recording and consent.',
  ],
  services: ['voice', 'ai-agents'],
  body: [
    {
      type: 'p',
      text: '**An AI receptionist is a voice AI agent that answers your business phone, understands what the caller wants, and handles the routine part of the call:** answering common questions, booking or moving appointments, taking a message, or transferring the caller to the right person. It works around the clock, answers every call at once, and hands anything unusual to a human.',
    },
    {
      type: 'p',
      text: 'For a clinic, salon, law office, repair shop or agency, missed calls are missed customers. Many callers do not leave voicemail; they call the next business on the list. An AI receptionist exists to stop that, without pretending to be your whole front desk.',
    },
    { type: 'figure', art: 'receptionist', caption: 'Every call answered: routine requests handled, the rest routed to a person with a summary.' },
    { type: 'h2', text: 'What can an AI receptionist handle well?' },
    {
      type: 'table',
      head: ['Task', 'How it works', 'Fit'],
      rows: [
        ['Opening hours, location, prices, services', 'Answers from your approved business information', 'Excellent'],
        ['Booking, rescheduling, cancelling', 'Checks your calendar or booking system, confirms by reading back and by text message', 'Excellent'],
        ['Taking messages', 'Collects name, number and reason, then sends a summary to the right person', 'Excellent'],
        ['Routing calls', 'Transfers to sales, support or a named person, during set hours', 'Very good'],
        ['Lead qualification', 'Asks a few set questions and records the answers in your CRM', 'Good'],
        ['After-hours triage', 'Separates urgent calls (forwarded to on-call staff) from ones that can wait', 'Good, with clear rules'],
      ],
    },
    { type: 'h2', text: 'What it should not handle (yet)' },
    {
      type: 'list',
      items: [
        '**Upset or distressed callers.** Complaints and emotional calls deserve a person. The AI should notice and hand over quickly.',
        '**Complex judgement.** Quotes for unusual jobs, legal or medical advice, negotiations.',
        '**Card payments by voice.** Do not let the AI collect card numbers over the phone. Send a secure payment link by text instead.',
        '**Emergencies.** For anything that could be urgent, the AI should direct callers to emergency services or your on-call line, never try to assess the situation itself.',
        '**Very noisy lines or uncommon names.** Speech recognition is good, not perfect. Critical details should always be read back and confirmed.',
      ],
    },
    { type: 'h2', text: 'How an AI receptionist works' },
    {
      type: 'steps',
      items: [
        { title: 'The call arrives', text: 'Your existing number forwards to the AI line, always or only when staff do not answer, or outside business hours.' },
        { title: 'Speech becomes text', text: 'Speech recognition turns the caller’s words into text in real time.' },
        { title: 'The agent decides', text: 'An AI model, with your business information and a set of allowed tools (calendar, CRM, transfer), works out what the caller needs and what to do.' },
        { title: 'Text becomes speech', text: 'The reply is spoken back in a natural voice, quickly enough that the conversation feels normal.' },
        { title: 'Everything is logged', text: 'A transcript and short summary go to your team, with any booking or message already in your systems.' },
      ],
    },
    {
      type: 'p',
      text: 'The part callers notice most is speed. A pause of a few seconds feels broken on the phone, so the whole chain has to respond fast, and it has to cope with interruptions. That is why voice agents need their own testing, covered in [how to test a voice AI agent](/blog/testing-voice-ai-agents).',
    },
    { type: 'h2', text: 'Setting one up: the checklist' },
    {
      type: 'table',
      head: ['Item', 'Why it matters'],
      rows: [
        ['Approved business information', 'Hours, services, prices, policies and directions. The AI should answer only from this, never improvise.'],
        ['Calendar or booking system connection', 'Without it, the AI can only take messages, which is useful but much less valuable.'],
        ['Handover rules', 'When to transfer, to whom, during which hours, and what to do when nobody is available.'],
        ['Confirmation by text message', 'Callers get the booking in writing; your team gets fewer “what time was it?” calls.'],
        ['AI disclosure', 'A short line at the start, such as “You are speaking with our AI assistant.” Honest, and expected by callers.'],
        ['Recording and consent rules', 'Rules on recording calls and on AI voice disclosure vary by country and, in the US, by state. Check what applies to you.'],
        ['Real test calls', 'Your team calls in with the requests, accents and awkward questions your customers really bring.'],
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Start with overflow, not every call',
      text: 'Send calls to the AI only when your staff do not pick up, or after hours. You capture calls you were missing anyway, and your team gets to know the system before it handles the busy daytime line.',
    },
    { type: 'h2', text: 'What does it cost to run?' },
    {
      type: 'p',
      text: 'Ongoing costs are mostly per minute: phone line minutes, speech recognition, the AI model and speech generation. Off-the-shelf AI receptionist products bundle these into a monthly plan with a set number of minutes. A custom-built receptionist costs more upfront but can connect to your own booking system, CRM and rules exactly, and you pay the underlying providers directly. Which is better depends on how standard your calls and tools are; our [AI agent cost guide](/blog/ai-agent-development-cost) explains how to compare them.',
    },
    { type: 'h2', text: 'How to measure whether it is working' },
    {
      type: 'list',
      items: [
        '**Answer rate.** Share of calls answered, compared with your missed-call rate before.',
        '**Resolution rate.** Calls fully handled (booking made, question answered) without a person.',
        '**Handover quality.** When it transferred, was it the right call to transfer, with a useful summary?',
        '**Booking accuracy.** Appointments with the right date, time, service and contact details.',
        '**Caller complaints.** Read every one in the first weeks; each is a test case for the next version.',
      ],
    },
    {
      type: 'p',
      text: 'We build [AI voice agents](/services/voice) and receptionists connected to the calendars, CRMs and phone systems businesses already use, with handover to staff and full transcripts. If you are not sure whether your call volume justifies one, our [ROI guide](/blog/ai-agent-roi) shows how to work it out, or start with the free [48-hour AI business audit](/packages/audit).',
    },
  ],
  faq: [
    {
      q: 'What is an AI receptionist?',
      a: 'An AI receptionist is a voice AI agent that answers a business phone line, understands what callers want and handles routine requests such as questions, bookings, messages and call transfers. It works 24/7 and hands complex or sensitive calls to a person.',
    },
    {
      q: 'Can an AI receptionist book appointments?',
      a: 'Yes. When it is connected to your calendar or booking system, an AI receptionist can check availability, book, reschedule or cancel appointments, read the details back to the caller and send a confirmation by text message.',
    },
    {
      q: 'Do I have to tell callers they are speaking to an AI?',
      a: 'It is good practice everywhere and required in some places. A short disclosure at the start of the call is honest and expected. Rules on AI voice disclosure and call recording consent vary by country and, in the US, by state, so check the rules that apply to your business.',
    },
    {
      q: 'Will an AI receptionist replace my front desk staff?',
      a: 'For most small businesses it supports them rather than replaces them. It answers calls they would have missed, handles routine requests and takes messages, while staff handle complex, emotional or high-value calls with a summary already in front of them.',
    },
  ],
};
