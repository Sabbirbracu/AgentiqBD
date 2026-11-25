/**
 * Open roles shown on /careers and /careers/<id>.
 *
 * Owner facts (2026-11-25): one Junior Executive opening, BDT 12,000–18,000 a month, at least 1 year of hands-on
 * experience (self-practice or freelance counts), good spoken and written English for international clients,
 * work = monthly client onboarding target + Agentiq BD's social media.
 *
 * When a role is filled, set `open: false`: the page then says so and the JobPosting structured data is dropped,
 * so Google for Jobs stops listing it. Bump lib/seo.ts `contentUpdated` whenever this file changes.
 */

export type JobPost = {
  id: string;
  open: boolean;
  title: string;
  /** Shown under the title and used in the JobPosting title. */
  team: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  datePosted: string;
  /** Last day to apply (YYYY-MM-DD). Empty = open until filled. */
  validThrough: string;
  vacancies: number;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACTOR';
  employmentLabel: string;
  location: string;
  salary: { min: number; max: number; currency: 'BDT'; label: string; note: string };
  experience: string;
  /** For the JobPosting structured data. */
  experienceMonths: number;
  intro: string[];
  responsibilities: { title: string; items: string[] }[];
  mustHave: string[];
  niceToHave: string[];
  notForYou: string[];
  growth: string[];
  apply: { subject: string; send: string[]; optional: string[] };
  process: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const jobs: JobPost[] = [
  {
    id: 'junior-executive',
    open: true,
    title: 'Junior Executive',
    team: 'Client Growth & Social Media',
    metaTitle: 'Junior Executive Job in Dhaka (Client Growth & Social Media)',
    metaDescription:
      'Agentiq BD is hiring one Junior Executive in Dhaka to help win new clients and run our social media. BDT 12,000–18,000 a month. Good English and 1 year of hands-on practice needed.',
    summary:
      'Help us bring in new clients every month and run Agentiq BD’s social media. A first step for someone who speaks good English and wants to grow fast.',
    datePosted: '2026-11-25',
    // TODO(owner): set a closing date (YYYY-MM-DD) if you want one. Empty shows "Open until filled".
    validThrough: '',
    vacancies: 1,
    // TODO(owner): confirm full-time and on-site at the Dhaka office (or say if hybrid/remote is possible).
    employmentType: 'FULL_TIME',
    employmentLabel: 'Full-time, on-site',
    location: 'Pragati Sarani, Merul Badda, Dhaka',
    salary: {
      min: 12000,
      max: 18000,
      currency: 'BDT',
      label: 'BDT 12,000 – 18,000 / month',
      note: 'Where you start in this range depends on your experience and how you do on the practical task.',
    },
    experience: '1 year of hands-on practice',
    experienceMonths: 12,
    intro: [
      'Agentiq BD builds AI systems, automation and custom software for businesses in Bangladesh and abroad. Many of the people we talk to every day are international clients, so English is the working language of our sales and social channels.',
      'We are looking for one person at the start of their career who is hungry to learn. You will not need to know everything on day one. You will need to show up, ask good questions, take feedback well and get a little better every week.',
      'You will work directly with the founder on two things that are closely linked: finding and onboarding new clients, and running the social media that brings many of them to us.',
    ],
    responsibilities: [
      {
        title: 'Client onboarding target',
        items: [
          'Help reach the monthly target for new clients that we set together each month.',
          'Research businesses that could use our services and keep a clean, up-to-date lead list.',
          'Write first messages and follow-ups by email, LinkedIn and WhatsApp, and reply to new enquiries quickly.',
          'Book discovery calls for the founder and send a short brief about each lead before the call.',
          'Once a client says yes, coordinate onboarding: collect documents and access, set up the kick-off and make sure nothing falls through the cracks.',
          'Track every lead from first contact to signed client, and share a simple weekly report on where the pipeline stands.',
        ],
      },
      {
        title: 'Social media',
        items: [
          'Run Agentiq BD’s Facebook, Instagram, LinkedIn and X pages.',
          'Plan a monthly content calendar with the founder and post on schedule.',
          'Turn our projects, products and blog posts into short posts, carousels and captions, using design and AI tools.',
          'Reply to comments and messages, and pass serious enquiries into the sales pipeline the same day.',
          'Share a short monthly report: what we posted, what worked and what to try next.',
        ],
      },
    ],
    mustHave: [
      'Good written and spoken English. You can hold a clear conversation with an international client and write a polite, correct email without help.',
      'At least 1 year of hands-on practice in sales, outreach, client communication or social media. It does not have to be at a company: freelancing, running your own or someone else’s page, a student club or a year of serious self-practice all count, as long as you can show us what you did.',
      'A growth mindset: you want to learn, you take feedback without taking it personally, and you keep improving.',
      'You are organised and follow up without being reminded.',
      'Comfortable with Google Docs/Sheets, social media tools and using AI tools such as ChatGPT or Claude in your daily work.',
    ],
    niceToHave: [
      'Basic design skills in Canva or a similar tool.',
      'Experience with a CRM or any structured way of tracking leads.',
      'Interest in AI, software or tech businesses.',
      'Spoken Bangla as well as English, for local clients.',
    ],
    notForYou: [
      'You want a role with a fixed routine and no targets.',
      'You are not comfortable speaking English with clients yet.',
      'You prefer to wait for instructions rather than take the next step yourself.',
    ],
    growth: [
      'Learn sales, client communication and social media from the founder, on real deals and real campaigns.',
      'See from the inside how AI systems and software projects are sold, scoped and delivered.',
      'Use AI tools every day as part of your work, not just as a side hobby.',
      'Take on more responsibility as you show results.',
    ],
    apply: {
      subject: 'Application: Junior Executive',
      send: [
        'Your CV.',
        'A short note in English (no more than 150 words) on why you want this role.',
        'Links or screenshots of something you have done: a page you ran, posts you wrote, outreach you did or results you got.',
      ],
      optional: ['A 1-minute voice or video recording in English introducing yourself. This helps us a lot.'],
    },
    // TODO(owner): confirm these hiring steps.
    process: [
      { title: 'Application review', text: 'We read every application and reply to the people we shortlist.' },
      { title: 'Short call in English', text: 'A 15–20 minute call to get to know you and hear your English.' },
      { title: 'Practical task', text: 'A small task you can finish in about an hour: write an outreach message and plan a week of posts for Agentiq BD.' },
      { title: 'Final interview', text: 'A conversation with the founder about the task, the role and how you want to grow.' },
    ],
    faq: [
      {
        q: 'I don’t have office experience. Can I still apply?',
        a: 'Yes. We need at least 1 year of hands-on practice, but it can be freelancing, running a page, volunteering or serious self-practice. Show us what you did and what you learned.',
      },
      {
        q: 'How good does my English need to be?',
        a: 'Good enough to speak with an international client on a call and write a clear email on your own. It does not need to be perfect, but it needs to be confident.',
      },
      {
        q: 'Who sets the monthly onboarding target?',
        a: 'We set it together with the founder each month, based on the pipeline. You help reach it by finding leads, following up and onboarding clients. Pricing and final deal terms stay with the founder.',
      },
      {
        q: 'How many people are you hiring?',
        a: 'One person for this role.',
      },
    ],
  },
];

export const jobById = (id: string) => jobs.find((j) => j.id === id);
export const openJobs = () => jobs.filter((j) => j.open);
