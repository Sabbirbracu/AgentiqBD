import type { Post } from '../types';

/**
 * BatchPilot facts come from content.ts `products` (MVP, in development). Planned features (fingerprint attendance,
 * automatic dues reminders, diary-photo import, AI question bank) must stay described as planned.
 */
export const post: Post = {
  slug: 'building-software-for-bangladesh',
  title: 'Building software for Bangladesh: lessons from a phone-first SaaS',
  metaTitle: 'Building Software for Bangladesh: Lessons from a Phone-First SaaS',
  excerpt:
    'BatchPilot is a management app for private tutors and coaching centres. Designing it taught us what "built for Bangladesh" really means: phone first, Bangla first, SMS first.',
  category: 'Lessons',
  tags: ['SaaS', 'Product design', 'BatchPilot'],
  keywords: ['software for Bangladesh', 'Bangla app design', 'coaching centre management software', 'SaaS Bangladesh', 'mobile first design'],
  date: '2026-10-29',
  cover: 'phone',
  takeaways: [
    'Design for the phone first. Many users will rarely, if ever, open the app on a computer.',
    'Use the language your users think in. A Bangla interface is a design task, not a translation task.',
    'SMS still reaches parents that apps and email do not.',
    'Keep every customer’s data isolated from day one, even when the customers are small.',
  ],
  services: ['custom-software', 'business-systems'],
  body: [
    {
      type: 'p',
      text: 'Private tutoring is a huge part of education in Bangladesh. Behind it, thousands of tutors and coaching centres run their admin on notebooks, memory and WhatsApp: who paid this month, who was absent, who still owes for last term. Every hour spent on that is an hour not spent teaching.',
    },
    {
      type: 'p',
      text: 'BatchPilot is our answer: one app for attendance, fees, dues and parent SMS. It is in its MVP phase and still in development, but designing it has already taught us a lot about building software that fits how people in Bangladesh actually work.',
    },
    { type: 'figure', art: 'phone', caption: 'The core loop: tap attendance on the phone, and parents get an SMS without anyone typing it.' },
    { type: 'h2', text: 'Lesson 1: Phone first means designing for one hand' },
    {
      type: 'p',
      text: 'A tutor marks attendance between batches, often standing, often holding something in the other hand. That rules out small buttons, long forms and anything that needs a keyboard. Attendance is a list of names with large tap targets. Collecting a fee is a few taps, not a form.',
    },
    {
      type: 'p',
      text: 'It also has to work on mid-range Android phones over mobile data. That means light pages, few large images, and screens that are still usable when the connection is slow. The desktop view exists, but it is the extra, not the starting point.',
    },
    { type: 'h2', text: 'Lesson 2: Bangla is a design decision' },
    {
      type: 'p',
      text: 'BatchPilot’s interface is in Bangla. Doing that well is much more than translating English labels:',
    },
    {
      type: 'list',
      items: [
        '**Use the words people already use.** Tutors say "বকেয়া" for dues and "ব্যাচ" for a batch. Formal or literal translations of software terms confuse people.',
        '**Text length changes layouts.** A label that fits in English may wrap in Bangla, or the other way round. Layouts have to be tested in the real language.',
        '**Font rendering matters.** Bangla conjunct letters need a font that renders them cleanly at small sizes on cheap screens.',
        '**Pick one style for numbers.** Bangla or English digits for money and phone numbers: choose deliberately and stay consistent everywhere, including SMS.',
      ],
    },
    { type: 'h2', text: 'Lesson 3: SMS still beats app notifications for parents' },
    {
      type: 'p',
      text: 'It is tempting to build everything around push notifications. But many parents will never install an app for their child’s coaching centre. SMS reaches every phone, smart or not. So when attendance is marked, parents receive an SMS automatically, and nobody has to type it.',
    },
    {
      type: 'p',
      text: 'Each SMS has a cost, and that shapes the design. The question for every message is: would a parent want to be interrupted for this? Absence, yes. A minor update, probably not.',
    },
    { type: 'h2', text: 'Lesson 4: Different people, different views' },
    {
      type: 'p',
      text: 'A coaching centre is not one user. BatchPilot has separate portals for teachers, assistants, parents and students. Each role sees what it needs and nothing more. A parent sees their own child’s attendance and fees, not the whole batch. Designing the roles early kept the interface simple for everyone, because nobody has to wade through screens meant for someone else.',
    },
    { type: 'h2', text: 'Lesson 5: Isolate every customer’s data from day one' },
    {
      type: 'p',
      text: 'BatchPilot is multi-tenant: many coaching centres share one system. Each centre’s data is kept isolated from every other centre. That separation is enforced on the server for every request, never left to the app on the phone to respect.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Small customers still deserve strong isolation',
      text: 'It is tempting to cut corners because each customer is small. But a single leak of one centre’s fee records to another would end trust in the whole product. Tenant isolation is far cheaper to build in at the start than to retrofit later.',
    },
    { type: 'h2', text: 'Lesson 6: Keep the roadmap honest' },
    {
      type: 'p',
      text: 'Our designs include features we are excited about: fingerprint-device attendance, automatic dues reminders, importing records from a photo of a paper diary, and an AI question bank. They are planned, not available yet, and we say so plainly wherever BatchPilot appears. Showing what is done, and clearly labelling what is next, is how a young product earns trust with people who have been promised a lot by software before.',
    },
    { type: 'h2', text: 'What "built for Bangladesh" means for client work' },
    {
      type: 'p',
      text: 'The same principles apply to almost every business system we build here. Start from the phone. Work in Bangla and English, and in the mix of both that people actually type. Reach people on the channels they already use, which usually means SMS and WhatsApp before email. Expect slow connections. And treat data isolation and access control as basics, not extras.',
    },
    {
      type: 'p',
      text: 'If you are planning software for customers or staff in Bangladesh, our [custom software](/services/custom-software) team builds with these lessons from the first sketch.',
    },
  ],
};
