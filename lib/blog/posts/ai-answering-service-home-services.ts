import type { Post } from '../types';

export const post: Post = {
  slug: 'ai-answering-service-home-services',
  title: 'AI answering service for HVAC, plumbing and electrical businesses: book more jobs without missing calls',
  metaTitle: 'AI Answering Service for HVAC & Plumbing: A Practical Guide',
  excerpt:
    'For home service businesses, a missed call is often a lost job. How an AI answering service handles after-hours calls, emergencies and job booking for HVAC, plumbing and electrical companies, and where it must hand over to a person.',
  category: 'Guides',
  tags: ['Voice AI', 'Small business', 'Home services'],
  keywords: [
    'AI answering service for HVAC',
    'AI answering service for plumbers',
    'AI receptionist for contractors',
    'after hours answering service HVAC',
    'AI call answering for home services',
    'AI phone agent for electricians',
    'virtual receptionist for plumbing company',
  ],
  date: '2026-11-22',
  cover: 'phone',
  takeaways: [
    'Home service calls arrive when crews are on jobs, driving or off for the night, which is exactly when calls go unanswered and customers ring the next company.',
    'An AI answering service picks up every call, captures the job details, books into open slots and sends true emergencies straight to the on-call technician.',
    'Safety calls, such as a suspected gas leak or sparking panel, need a fixed script that directs the caller to emergency services or the utility first. Never let the AI improvise these.',
    'The value depends on connecting it to your scheduling software and writing clear rules for emergency vs next-day work, service area and pricing questions.',
  ],
  services: ['voice', 'ai-agents', 'integrations'],
  body: [
    {
      type: 'p',
      text: '**An AI answering service for home services is a voice AI agent that answers your phone when your team cannot, works out whether the caller needs emergency help or a regular appointment, books the job or alerts the on-call technician, and sends your office a written summary.** For HVAC, plumbing and electrical companies, it closes the gap between when customers call (often evenings, weekends and while every tech is on a job) and when someone is free to answer.',
    },
    {
      type: 'p',
      text: 'A homeowner with no heat or a burst pipe does not leave a voicemail and wait. They call the next company on the search results. That is the case for answering every call. This guide covers what a good setup looks like, built for trades rather than a generic receptionist. For the general version, see [AI receptionist for small business](/blog/ai-receptionist-small-business).',
    },
    { type: 'h2', text: 'What the AI handles on a typical call' },
    {
      type: 'table',
      head: ['Call type', 'What the AI does'],
      rows: [
        ['New service request', 'Collects name, address, phone, the problem in the caller’s words, system type or age if known, and books an open slot or a callback window'],
        ['Emergency (no heat in freezing weather, active leak, no power)', 'Follows your emergency rules: confirms the address, takes details, and calls or texts the on-call tech immediately'],
        ['Safety hazard (gas smell, burning smell, sparking)', 'Reads your fixed safety script, such as leaving the building and calling the gas utility or emergency services, then alerts your team'],
        ['Existing job: “when is the tech arriving?”', 'Looks up the appointment and gives the window, or takes a message for dispatch'],
        ['Price questions', 'Gives only what you approve (for example your diagnostic or trip fee) and explains that a quote follows the visit'],
        ['Outside your service area', 'Says so politely, so your team does not waste a callback'],
        ['Sales calls and spam', 'Takes a message or ends the call, so they do not interrupt the office'],
      ],
    },
    { type: 'figure', art: 'phone', caption: 'Every call answered: emergencies go to the on-call tech, routine jobs go on the schedule.' },
    { type: 'h2', text: 'Emergency and safety calls need fixed rules' },
    {
      type: 'p',
      text: 'This is the part to get right before anything else. The AI should never decide on its own whether a situation is safe. You write the rules; it follows them word for word.',
    },
    {
      type: 'list',
      items: [
        '**Safety hazards first.** For a suspected gas leak, burning smell or electrical hazard, the AI reads your approved script, which typically tells the caller to leave the building and contact the utility or emergency services, before taking any job details.',
        '**Clear emergency definitions.** Write down what counts as an emergency for your business: no heat below a set temperature, no cooling for vulnerable occupants, active water leak, total loss of power. Everything else is next available slot.',
        '**On-call escalation.** Who gets called or texted, in what order, and what happens if nobody answers within a few minutes.',
        '**Emergency rates.** If after-hours visits cost more, the AI should say so before dispatching, using your exact wording.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Test emergencies more than anything else',
      text: 'Before going live, have your team call in with every emergency and safety scenario, including vague ones (“there’s a weird smell near the furnace”). The AI must take the safe path every time. See [how to test a voice AI agent](/blog/testing-voice-ai-agents).',
    },
    { type: 'h2', text: 'Connecting it to your scheduling software' },
    {
      type: 'p',
      text: 'An AI that only takes messages helps. One that books directly into your schedule helps much more. Most home service companies run on field service software, such as ServiceTitan, Housecall Pro or Jobber, or a shared calendar. The AI can check availability and create jobs where the software offers an API or integration access; some platforms require partner approval, so check this early.',
    },
    {
      type: 'table',
      head: ['Setup', 'What the AI can do'],
      rows: [
        ['No integration', 'Answer, take full job details, text the summary to the office, promise a callback window'],
        ['Calendar access', 'Offer real open slots and book them, with confirmation by text'],
        ['Field service software integration', 'Create the customer and job record, book the slot, look up existing appointments and send reminders'],
      ],
    },
    { type: 'h2', text: 'Rules to write before launch' },
    {
      type: 'list',
      items: [
        '**Service area** by ZIP code or town list.',
        '**Services you do and do not offer**, for example no commercial refrigeration, or no new construction.',
        '**What can be quoted on the phone** (trip fee, diagnostic fee, maintenance plan price) and what cannot.',
        '**Booking rules**: job lengths, buffer time between jobs, which techs handle which work.',
        '**Disclosure**: a short line telling callers they are speaking with an AI assistant. Check your state’s rules on call recording consent.',
        '**Handover**: when to transfer to a live person during office hours, and how to reach them.',
      ],
    },
    { type: 'h2', text: 'AI answering service vs a human answering service' },
    {
      type: 'table',
      head: ['', 'Human answering service', 'AI answering service'],
      rows: [
        ['Availability', '24/7 with shared operators', '24/7, every call answered at once, even during storms or heat waves'],
        ['Knowledge of your business', 'Scripts read by operators handling many companies', 'Your rules, prices and service area, applied the same way every time'],
        ['Booking', 'Often message-taking only', 'Can book directly when connected to your schedule'],
        ['Empathy on difficult calls', 'Strong', 'Limited; should hand difficult calls to a person'],
        ['Cost model', 'Usually per minute or per call', 'Per minute of usage plus setup; scales with no extra staff'],
      ],
    },
    {
      type: 'p',
      text: 'Many companies use both: AI for the volume and after hours, with staff or a human service handling escalations. To work out whether the numbers make sense for your call volume and average job value, use the method in our [AI agent ROI guide](/blog/ai-agent-roi).',
    },
    { type: 'h2', text: 'How to know it is working' },
    {
      type: 'list',
      items: [
        '**Missed call rate** before and after.',
        '**Jobs booked from after-hours calls**, which were mostly lost before.',
        '**Emergency handling**: every emergency reached the on-call tech within your target time.',
        '**Booking accuracy**: correct address, phone, problem and slot.',
        '**Callback rate**: how often the office had to call back for missing details.',
      ],
    },
    {
      type: 'p',
      text: 'We build [AI voice agents](/services/voice) for service businesses, with fixed safety scripts, on-call escalation and [integrations](/services/integrations) with the scheduling tools you already use. If you want to see where calls are being lost today, start with the free [48-hour AI business audit](/packages/audit).',
    },
  ],
  faq: [
    {
      q: 'What is an AI answering service for HVAC companies?',
      a: 'It is a voice AI agent that answers an HVAC company’s phone when staff are busy or off, identifies whether the caller has an emergency or needs a regular appointment, books the job or alerts the on-call technician, and sends the office a written summary of each call.',
    },
    {
      q: 'Can an AI answering service handle emergency plumbing calls?',
      a: 'Yes, when it follows rules you define. It confirms the address and problem, and immediately calls or texts the on-call plumber for situations you class as emergencies, such as an active leak. For safety hazards it should read a fixed script directing the caller to the right emergency contact first.',
    },
    {
      q: 'Can an AI book jobs into ServiceTitan, Housecall Pro or Jobber?',
      a: 'It can where the software provides an API or integration access for your account. Some field service platforms require partner approval for API access, so confirm this before you start. Without an integration, the AI can still take full job details and send them to your office.',
    },
    {
      q: 'Is an AI answering service better than a human answering service?',
      a: 'They are good at different things. AI answers every call at once, applies your rules consistently and can book directly into your schedule. Human operators are better at emotional or complex calls. Many home service businesses use AI for volume and after hours, with people handling escalations.',
    },
  ],
};
