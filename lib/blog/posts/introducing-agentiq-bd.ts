import type { Post } from '../types';

/** Founder facts come from content.ts `founder` (supplied by the owner). Don't add years, employers or counts. */
export const post: Post = {
  slug: 'introducing-agentiq-bd',
  title: 'Introducing Agentiq BD: AI with a purpose, built in Bangladesh',
  metaTitle: 'Introducing Agentiq BD, an AI & Software Company in Dhaka',
  excerpt:
    'Who we are, what we build, and the one rule behind every project we take on: start from the problem in the business, never from the technology.',
  category: 'Company',
  tags: ['Agentiq BD', 'Company', 'Bangladesh'],
  keywords: ['Agentiq BD', 'AI company in Bangladesh', 'software company in Bangladesh', 'AI agents Bangladesh'],
  date: '2026-10-29',
  cover: 'intro',
  takeaways: [
    'Agentiq BD is an AI engineering and software company in Dhaka, building for businesses in Bangladesh and around the world.',
    'We build AI agents, chatbots, workflow automation, business systems and custom software, connected to the tools a business already runs.',
    'Our rule is "AI with a purpose, or not at all". If plain software or a simpler workflow does the job better, we say so.',
    'Delivery is founder-led: the person who designs your system is the person you talk to.',
  ],
  services: ['ai-agents', 'workflow-automation', 'custom-software'],
  body: [
    {
      type: 'p',
      text: 'Every company has a reason it exists. Ours is simple to say and harder to do: build world-class software in Bangladesh, by Bangladeshi engineers, for businesses here and abroad. This first post explains who we are, what we build and how we decide what is worth building at all.',
    },
    { type: 'h2', text: 'Why we started Agentiq BD' },
    {
      type: 'p',
      text: 'Our founder, Sabbir Ahmad, started working in the IT industry before he had graduated from BRAC University. That early start put him on teams and projects from Morgantown, Florida and New Jersey to Australia, Canada and Bangladesh. Working across those places made one thing obvious: an international standard is not a mystery. It is a set of habits. Clear requirements, careful engineering, honest communication and support after launch.',
    },
    {
      type: 'p',
      text: 'Agentiq BD was started to bring those habits home. Bangladesh has the talent to build software that competes anywhere. What it often lacks is companies that hold themselves to that bar every day, on every project, whether the client is a factory in Gazipur or a startup in Toronto.',
    },
    { type: 'quote', text: 'World-class solutions, built in Bangladesh.', cite: 'Sabbir Ahmad, Founder & AI Systems Engineer' },
    { type: 'h2', text: 'What we build' },
    {
      type: 'p',
      text: 'We are an AI engineering and software company. In practice, that means we work on six kinds of problem:',
    },
    {
      type: 'list',
      items: [
        '**AI agents.** Software that understands a request and takes action in your systems: answering customers, qualifying leads, booking appointments. See [AI agent development](/services/ai-agents).',
        '**Chatbots and voice agents.** Conversational assistants on your website, WhatsApp or phone line, answering from your own information. See [AI chatbots](/services/chatbots) and [AI voice agents](/services/voice).',
        '**Workflow automation.** The repetitive steps between your tools, handled automatically: data entry, notifications, follow-ups and reports. See [workflow automation](/services/workflow-automation).',
        '**Knowledge bases.** AI that answers questions from your policies, manuals and documents, with sources. See [AI knowledge base & RAG](/services/knowledge-rag).',
        '**Business systems.** ERP, inventory, procurement and production systems, with AI where it helps. See [business systems](/services/business-systems).',
        '**Custom software.** Web apps, SaaS platforms and internal tools, built to your process. See [custom software](/services/custom-software).',
      ],
    },
    { type: 'h2', text: 'The rule behind every project' },
    {
      type: 'p',
      text: 'A lot of AI projects fail for the same reason: they start with "we need AI" instead of "this is what is slowing us down". The result is a clever demo that nobody uses after the first month.',
    },
    {
      type: 'p',
      text: 'So we work the other way round. The first conversation is always about the business: where time goes, where mistakes happen, and which tasks wait for one person who is always busy. Only then do we ask which tool fits. Sometimes the answer is an AI agent. Often it is a simple automation, a cleaner database or a better form. We call this **AI with a purpose, or not at all**, and we will tell you when AI is the wrong choice, even if it means a smaller project for us.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'A quick test',
      text: 'If you cannot describe your problem without using the word "AI", it is not ready to be an AI project yet. Describe the work, the delay or the error first. The right tool usually becomes obvious.',
    },
    { type: 'h2', text: 'How we work' },
    {
      type: 'steps',
      items: [
        {
          title: 'Discovery',
          text: 'We listen first. We look at how the work happens today and tell you honestly whether AI, automation or plain software is the right fit.',
        },
        {
          title: 'Plan',
          text: 'We propose the architecture, the integrations and the risks, often starting with a working prototype of the core workflow. You see a clear estimate before anything is built.',
        },
        {
          title: 'Build & support',
          text: 'We build and test for accuracy, permissions and failure cases, deploy with access control and monitoring, and stay for support after launch.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Throughout, you talk directly to the person designing your system. Our founder is an AI systems engineer and is hands-on in the technical decisions. There is no account manager translating your questions into tickets.',
    },
    { type: 'h2', text: 'What we have built so far' },
    {
      type: 'p',
      text: 'Our client work includes a [pharmaceutical sourcing ERP](/work/pharma-erp) that brings tender notices, supplier enquiries, quotation comparison, purchase orders and finance into one system, along with a learning platform, a marketing automation system and a matrimony platform. All four are deployed and in use.',
    },
    {
      type: 'p',
      text: 'We also build products of our own. [MyPixel Guard](https://mypixelguard.agentiqbd.com) is a free, live tool that removes hidden metadata from images and redacts faces and text, entirely on your device. BatchPilot, a phone-first management app for private tutors and coaching centres, is in its MVP phase. Building our own products keeps us honest: we live with the same trade-offs we recommend to clients.',
    },
    { type: 'h2', text: 'Who we work with' },
    {
      type: 'p',
      text: 'Most of our clients fall into three groups: manufacturers who need production, procurement and inventory under control; growing SMEs who want leads, follow-ups and reporting to run without constant chasing; and service businesses that handle a steady flow of bookings and enquiries. We are based in Dhaka and work with clients globally. Meetings, documentation and delivery are in English, and we are comfortable across time zones.',
    },
    { type: 'h2', text: 'What this blog is for' },
    {
      type: 'p',
      text: 'This blog is where we write down what we learn while building. You will find plain explanations of how AI agents, RAG and automation actually work, the process we follow, and honest notes on what went wrong and how we fixed it. It is written for business owners who want to understand what they are buying, and for engineers who want the details.',
    },
    {
      type: 'p',
      text: 'If there is a bottleneck in your business you have been meaning to fix, we would like to hear about it. A discovery call costs nothing and you will leave it with a clearer view of what is worth building, whether or not you build it with us.',
    },
  ],
};
