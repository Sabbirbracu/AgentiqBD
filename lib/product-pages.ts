/**
 * Detail pages for our own products (/products/<id>). Card data (name, status, screenshots) stays in
 * `products` in content.ts; this file holds the longer story, specs and FAQs.
 *
 * Sources: BatchPilot from its README and MVP Blueprint (field visit, Bogura, 22 Oct 2026); MyPixel Guard from
 * its README files and its own website. Keep every claim traceable to those, and keep the status honest.
 */

export type ProductPage = {
  /** Matches `products[].id` in content.ts. */
  id: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** One-line promise under the H1. */
  tagline: string;
  /** For the SoftwareApplication JSON-LD. */
  operatingSystem: string;
  applicationCategory: string;
  primaryCta: { label: string; href: string; external?: boolean };
  why: { title: string; paragraphs: string[]; problems?: { title: string; text: string }[] };
  fit?: { forWho: string[]; notFor: string[] };
  steps: { title: string; text: string }[];
  features: { title: string; items: string[] }[];
  specs: [label: string, value: string][];
  /** Where the product stands today: built, in progress, planned. */
  progress?: { label: string; tone: 'done' | 'doing' | 'planned'; items: string[] }[];
  limits?: string[];
  faqs: { q: string; a: string }[];
  /** Service page ids (lib/service-pages.ts) this product shows we can build. */
  services: string[];
};

export const productPages: ProductPage[] = [
  {
    id: 'batchpilot',
    metaTitle: 'BatchPilot: Coaching Centre Management Software for Bangladesh',
    metaDescription:
      'BatchPilot is a phone-first app for private batch teachers and coaching centres in Bangladesh: fees, dues, attendance, admissions and parent messages in Bangla. MVP in development by Agentiq BD.',
    keywords: [
      'coaching centre management software',
      'coaching management software Bangladesh',
      'batch management app',
      'tuition fee management app',
      'student attendance app Bangladesh',
      'private tutor software',
      'BatchPilot',
    ],
    tagline: 'Fees, dues, attendance and parent updates for private batch teachers and coaching centres, in Bangla, on the phone they already use.',
    operatingSystem: 'Web (phone, tablet and laptop)',
    applicationCategory: 'BusinessApplication',
    primaryCta: { label: 'Ask about the pilot', href: '/#contact' },
    why: {
      title: 'Teachers were running large batches from a paper diary',
      paragraphs: [
        'In the district towns of North Bengal, a private batch teacher can teach hundreds of students. When we visited teachers in Bogura in October 2026, batches of 70 to 90 students were common, and many teachers had 600 or more students across their batches, with one to three assistants and an office room.',
        'Almost all of it ran on paper. Assistants collected fees in cash, wrote them in a diary, marked attendance in a register and phoned parents one by one about dues and absences. The teacher, busy in class all day, had no quick way to see what came in this month and who still owed.',
        'Management software already exists, but the teachers did not need more features. They needed something simpler: fewer screens, Bangla first, the most common jobs in a few taps, and someone to set it up with them in person. That is what BatchPilot is built around.',
      ],
      problems: [
        { title: 'Unpaid and late fees', text: 'The biggest problem, because it directly reduces the teacher’s income.' },
        { title: 'Accounts nobody can check', text: 'Daily cash sits with the assistant and the records sit in a diary, so the teacher can never be sure.' },
        { title: 'Keeping parents informed', text: 'Calling parents about absences and dues takes up hours of an assistant’s day.' },
        { title: 'Attendance for 80 or 90 students', text: 'A paper register is slow to mark and hard to search later.' },
      ],
    },
    fit: {
      forWho: [
        'Private batch teachers and small coaching centres (SSC, HSC and admission preparation)',
        'Teachers with a few hundred to around 1,500 active students across several batches',
        'Teams where one to three assistants handle fees, attendance and parent calls',
        'Teachers who want to see collections and dues without opening a diary',
      ],
      notFor: [
        'Schools looking for a full ERP with salaries, leave and branches',
        'Online class platforms: BatchPilot is built for in-person batches',
        'A payment middleman: students pay the teacher directly, and we take no commission',
      ],
    },
    steps: [
      { title: 'Log in with a phone number', text: 'One login for everyone. A one-time code arrives by SMS, and the app sends each person to their own portal: teacher, assistant, guardian or student.' },
      { title: 'Set up batches, students and fees', text: 'Create batches and fee plans, monthly or a course fee in instalments, with an optional admission fee. A new admission is one flow: batch, student, fee, done.' },
      { title: 'Run the day in a few taps', text: 'Collect a fee in three taps and the receipt is recorded. Attendance opens with everyone present, so the assistant only taps the students who are absent.' },
      { title: 'See where things stand', text: 'The teacher’s dashboard shows this month’s collection, the dues list and who was absent. Guardians and students can check their own fees and attendance.' },
    ],
    features: [
      {
        title: 'Fees and dues',
        items: [
          'Monthly dues created for every enrolled student',
          'Payments applied to the oldest month first; anything extra becomes an advance',
          'Partial payments, discounts and a live dues list',
          'Mistakes fixed with a reversal entry, so payment history is never edited or deleted',
          'Each assistant’s own cash collection shown separately',
        ],
      },
      {
        title: 'Attendance',
        items: [
          'Today’s batches on one screen',
          'One-tap roster with everyone marked present by default',
          'Absence messages cancelled automatically if attendance is corrected',
        ],
      },
      {
        title: 'Admissions',
        items: [
          'Fee plans per course, with optional admission fee',
          'Office admission in a single flow',
          'A QR join link and printable poster for each course',
          'Online join requests with seat holds, reviewed in an inbox',
        ],
      },
      {
        title: 'Portals and team',
        items: [
          'Separate portals for the teacher, assistants, guardians and students',
          'Permissions for assistants, so each person sees only what they need',
          'One family dashboard when a student studies with more than one teacher',
          'Bangla first, with English available',
        ],
      },
      {
        title: 'Parent messages',
        items: [
          'Templates for receipts, absences, reminders and notices',
          'Quiet hours from 9 pm to 8 am, so no message arrives at night',
          'At most two messages per guardian per day (receipts excepted), with duplicate protection',
        ],
      },
    ],
    specs: [
      ['Status', 'MVP, in development, preparing a pilot in North Bengal'],
      ['Platform', 'Web app for phone, tablet and laptop, installable on the home screen'],
      ['Language', 'Bangla first, English available'],
      ['Sign-in', 'Phone number with a one-time SMS code'],
      ['Users', 'Teacher (owner), assistants, guardians and students'],
      ['Data separation', 'Each coaching centre’s data is isolated at the database level (PostgreSQL row-level security), with tests that check it'],
      ['Money records', 'Amounts stored exactly in poisha; balances are calculated, never typed in; corrections are reversal entries'],
      ['Dates', 'Business dates in Bangladesh time'],
      ['Built with', 'Next.js and Tailwind (app), FastAPI in Python (API), PostgreSQL (database)'],
    ],
    progress: [
      {
        label: 'Working today',
        tone: 'done',
        items: ['Phone login and the four portals', 'Batches, students and enrolments', 'Fee ledger, receipts and dues list', 'Attendance roster', 'Admissions, QR links and join requests', 'Teacher and assistant dashboards'],
      },
      {
        label: 'In progress',
        tone: 'doing',
        items: ['Connecting the SMS gateway: messages are prepared and queued today, sending is the next step', 'Automatic monthly fees and step-by-step due reminders', 'Attendance that keeps working without internet'],
      },
      {
        label: 'Planned',
        tone: 'planned',
        items: ['Importing students from a photo of the diary, with AI', 'Excel import with old dues', 'Monthly reports and export', 'Fingerprint attendance and an AI question bank'],
      },
    ],
    faqs: [
      { q: 'Is BatchPilot available now?', a: 'Not yet for everyone. It is an MVP in development, and we are preparing a pilot with a small group of batch teachers in North Bengal. If you would like to be considered, contact us.' },
      { q: 'Do parents need to install an app?', a: 'No. Parents receive receipts, absence notices and reminders by SMS. If they want more, they can log in with their phone number to see fees and attendance.' },
      { q: 'Does BatchPilot take a share of the fees?', a: 'No. Students pay the teacher directly, as they do today. BatchPilot only records the payment and keeps the accounts.' },
      { q: 'What happens if a payment is entered wrongly?', a: 'It is corrected with a reversal entry rather than being edited or deleted, so the full history stays visible to the teacher.' },
      { q: 'Can other coaching centres see my data?', a: 'No. Every centre’s data is separated at the database level, not just hidden on screen, and automated tests check that one centre can never read another’s records.' },
      { q: 'Will my assistant find it easy?', a: 'It is designed for the assistant first: the most common jobs take about three taps, and buttons are large enough for low-cost tablets.' },
      { q: 'Does it work without internet?', a: 'Not yet. Offline attendance is in progress, so marks taken without a connection will sync once the device is back online.' },
      { q: 'How much will it cost?', a: 'Pricing is not published yet. We will share it with pilot teachers first.' },
    ],
    services: ['custom-software', 'business-systems'],
  },
  {
    id: 'mypixel-guard',
    metaTitle: 'MyPixel Guard: Free Metadata Remover for Mac & Windows',
    metaDescription:
      'MyPixel Guard is a free desktop app that finds and removes hidden metadata (GPS location, device, author, AI labels) from photos on your own computer. No upload, no account. Built by Agentiq BD.',
    keywords: [
      'metadata remover',
      'metadata removal software',
      'remove EXIF data',
      'remove GPS location from photo',
      'EXIF remover for Mac',
      'offline metadata remover',
      'remove C2PA content credentials',
      'MyPixel Guard',
    ],
    tagline: 'Find and remove the hidden location, device and author details inside your photos, on your own computer, before you share them.',
    operatingSystem: 'macOS 13 or later, Windows 10/11 (64-bit)',
    applicationCategory: 'UtilitiesApplication',
    primaryCta: { label: 'Download free', href: 'https://mypixelguard.agentiqbd.com', external: true },
    why: {
      title: 'Every photo says more than you think',
      paragraphs: [
        'A single photo can carry your exact GPS location, your phone model, the time you took it and your name, and sometimes labels that mark it as AI-made. Anyone you send it to can read all of it.',
        'We needed a reliable way to clean that information before sharing images, without sending them to someone else’s server first, because uploading a private photo to strip its private data defeats the point. So we built a desktop app that does everything on your own computer.',
        'It worked well enough for our own use that we opened it to everyone, free, with no account.',
      ],
      problems: [
        { title: 'Exact GPS location', text: 'Coordinates saved by the camera can reveal where you live, work or travel.' },
        { title: 'Camera and device', text: 'The make, model and lens of the device that took the photo.' },
        { title: 'Name and copyright', text: 'Author, owner and copyright text stored inside the file.' },
        { title: 'AI labels and history', text: 'C2PA Content Credentials, XMP tags and edit history that platforms read.' },
      ],
    },
    steps: [
      { title: 'Add your images', text: 'Drag them in or choose them from your computer. Whole folders work too.' },
      { title: 'Pick a tool', text: 'Inspect, Clean, Redact, Convert, Resize, Compress, Remove Background or Batch Studio, from the sidebar.' },
      { title: 'Review and save', text: 'Check the preview and choose a folder. A new copy is saved and checked; your original stays exactly as it was.' },
    ],
    features: [
      {
        title: 'Inspect',
        items: ['Reads EXIF, IPTC, XMP, GPS and C2PA data', 'Shows evidence of AI provenance, without claiming to be a definitive AI detector'],
      },
      {
        title: 'Clean',
        items: ['Choose exactly what to remove', 'Preview what is removed and what is kept', 'Asks before removing Content Credentials', 'Every saved file is read back to confirm the data is really gone'],
      },
      {
        title: 'Redact',
        items: ['Finds faces and text on your device and blurs them', 'Every detected region is numbered for review, with an exact preview before export'],
      },
      {
        title: 'Convert, resize and compress',
        items: ['JPEG, PNG, TIFF, plus HEIC on Mac and WebP where supported', 'Exact pixels or percentages, with presets for social media', 'Quality slider with before and after preview, and a target file size'],
      },
      {
        title: 'Remove Background',
        items: ['Runs on your computer, with no upload', 'Only adds transparency: the subject’s colours and resolution are untouched', 'Saved without quality loss as PNG or TIFF'],
      },
      {
        title: 'Batch Studio',
        items: ['One recipe applied to many photos at once', 'Progress, cancel, and a list of any files that failed'],
      },
    ],
    specs: [
      ['Status', 'Live and free'],
      ['Mac', 'macOS 13 or later (Remove Background needs macOS 14)'],
      ['Windows', 'Windows 10 or 11, 64-bit'],
      ['Languages', 'English and Bangla'],
      ['Formats', 'JPEG, PNG and TIFF everywhere; HEIC read and write on Mac, WebP where supported; on Windows HEIC can be read but not written'],
      ['Account', 'None needed'],
      ['Processing', 'On your computer; images are never uploaded and no internet connection is needed'],
      ['Originals', 'Never changed; results go to a folder you choose and never overwrite existing files'],
      ['Mac installer scan', '0 of 59 antivirus engines flagged it on VirusTotal'],
      ['Built with', 'Swift (Mac app); Rust, Tauri and React (Windows app)'],
    ],
    limits: [
      'Removing metadata cannot erase invisible watermarks woven into the pixels, such as SynthID.',
      'Finding no metadata does not prove an image was made by a person.',
      'Automatic face and text detection can miss things or mark the wrong area, so always review before you share.',
      'Converted, resized and compressed copies are new files and never carry Content Credentials.',
    ],
    faqs: [
      { q: 'Is MyPixel Guard really free?', a: 'Yes. It is free to download and use, with no account and no sign-up.' },
      { q: 'Does it upload my photos?', a: 'No. Every tool runs on your own computer, and it works offline.' },
      { q: 'How do I remove the GPS location from a photo?', a: 'Add the photo and choose Clean. It removes the GPS location, camera details and dates, saves a clean copy in the folder you choose, and checks the result.' },
      { q: 'Will it change my original image?', a: 'Never. Results are saved as new copies in a folder you choose, and existing files are never overwritten.' },
      { q: 'Can it remove AI watermarks like SynthID?', a: 'No. It removes metadata labels such as C2PA Content Credentials and AI tags in XMP or IPTC, but it cannot remove invisible watermarks woven into the pixels.' },
      { q: 'What is C2PA or Content Credentials?', a: 'A signed record inside an image that describes how it was made or edited. Platforms such as Facebook and Instagram can read it to add labels. MyPixel Guard shows it and, with your confirmation, removes it.' },
      { q: 'Does removing the background reduce quality?', a: 'No. It only adds a transparency layer; the subject’s colours and resolution are not changed, and PNG or TIFF files are saved without compression loss. Detection depends on the photo, so check the preview before saving.' },
      { q: 'Why would a software company give away a tool?', a: 'We built it for our own work first. Opening it up costs us little, and it shows how we build software: careful with people’s data and honest about limits.' },
    ],
    services: ['custom-software'],
  },
];

export const productPageById = (id: string) => productPages.find((p) => p.id === id);
