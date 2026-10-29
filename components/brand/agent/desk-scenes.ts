import {
  Boxes,
  Building2,
  CalendarDays,
  Car,
  Factory,
  FlaskConical,
  GraduationCap,
  MapPin,
  ShoppingBag,
  Stethoscope,
  Tag,
  Truck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Scene for the Pip desk animation (AI agents How it works): something arrives on the left, Pip works on
 * it, a system on the right updates, and a person steps in where it matters. Other services have their
 * own graphics in components/brand/how. All names, numbers and messages are sample values, never claims.
 */

/** The AI Employee's character name (working name from the mascot concept; change it here). */
export const AGENT = 'Pip';

export type DeskJob = {
  /** Channel or source shown above the message. */
  ch: string;
  /** Initials of the person, or an icon when a system starts it. */
  who: string | LucideIcon;
  msg: string;
  /** What Pip is doing while it works it out. */
  work: string;
  /** The system on the right and its icon. */
  sys: string;
  Icon: LucideIcon;
  result: string;
  /** When set, a person has to step in before the job finishes. */
  approve?: string;
  /** Label of the button the person presses (default "Approve"). */
  cta?: string;
};

export type DeskRow = { desk: string; tagline: string; skills: string[] };

/** Text templates: {ch} and {sys} are filled from the job, {agent} with the agent name. */
export type DeskSay = {
  fresh: string;
  arrive: string;
  act: string;
  writing: string;
  done: string;
  doneApproved: string;
  handled: string;
};

export type DeskScene = {
  prompt: string;
  label: string;
  columns: [string, string, string];
  rows: [DeskRow, DeskRow, DeskRow];
  tabs: { name: string; jobs: [DeskJob, DeskJob, DeskJob] }[];
  /** Tracker labels. Leave out to use the page's own How it works step titles. */
  steps?: [string, string, string, string];
  /** Which tracker step lights during: arrive, work, act, finish (incl. approval). Earlier steps show as done. */
  phaseSteps?: [number, number, number, number];
  say: DeskSay;
  /** Give Pip a headset microphone (voice). */
  mic?: boolean;
};

const agentSay: DeskSay = {
  fresh: 'New request',
  arrive: 'New request on {ch}',
  act: 'Updating {sys}…',
  writing: 'Writing record…',
  done: 'Replied · logged',
  doneApproved: 'Approved · replied · logged',
  handled: 'Handled by',
};

export const deskScenes: Record<string, DeskScene> = {
  /* ───────────── AI agents ───────────── */
  'ai-agents': {
    prompt: 'Pick an industry · watch it work',
    label: 'Animated example: Pip, the AI Employee, handling example requests across industries, from request to approval',
    columns: ['Your customer asks', '{agent} gets to work', 'Your systems update'],
    rows: [
      { desk: 'Support', tagline: 'Answers · tracks · resolves', skills: ['Order status', 'Stock', 'Returns'] },
      { desk: 'Sales', tagline: 'Qualifies · scores · hands off', skills: ['Pricing', 'Budget fit', 'Lead score'] },
      { desk: 'Bookings', tagline: 'Offers slots · confirms · reminds', skills: ['Free slots', 'Confirm', 'Reminders'] },
    ],
    say: agentSay,
    tabs: [
      {
        name: 'Pharma',
        jobs: [
          { ch: 'WhatsApp', who: 'MH', msg: 'Is batch B-221 in stock?', work: 'Checking stock for B-221', sys: 'ERP · Inventory', Icon: Boxes, result: '1,240 strips · reply sent' },
          { ch: 'Email', who: 'TR', msg: 'Distributor rate for 500 boxes?', work: 'Matching price book and volume', sys: 'CRM · Price book', Icon: Tag, result: 'Lead scored · quote sent', approve: 'Special rate needs a manager' },
          { ch: 'Website', who: 'NK', msg: 'Can your rep visit on Tuesday?', work: 'Finding a free rep slot', sys: 'Calendar · Rep roster', Icon: CalendarDays, result: 'Tue 11:00 AM confirmed' },
        ],
      },
      {
        name: 'Garments',
        jobs: [
          { ch: 'Email', who: 'AL', msg: 'Status of PO-3318?', work: 'Looking up PO-3318', sys: 'ERP · Production', Icon: Factory, result: 'Sewing done · ships Friday' },
          { ch: 'Email', who: 'JL', msg: 'FOB price for 5,000 polos?', work: 'Checking MOQ and costing', sys: 'CRM · Costing sheet', Icon: Tag, result: 'Quote sent · lead scored', approve: 'Quote needs merchandiser sign-off' },
          { ch: 'WhatsApp', who: 'SR', msg: 'Factory visit next week?', work: 'Checking the compliance calendar', sys: 'Calendar', Icon: CalendarDays, result: 'Wed 3:00 PM confirmed' },
        ],
      },
      {
        name: 'E-commerce',
        jobs: [
          { ch: 'Messenger', who: 'SA', msg: 'Return my size-M kurti', work: 'Checking order and return policy', sys: 'Orders · Returns', Icon: ShoppingBag, result: 'Pickup booked · refund queued', approve: 'Refund ৳1,450 needs approval' },
          { ch: 'Website', who: 'RB', msg: 'Bulk price for 200 units?', work: 'Checking stock and tier pricing', sys: 'CRM · Leads', Icon: Users, result: 'Lead scored · sent to sales' },
          { ch: 'WhatsApp', who: 'FH', msg: 'Deliver tomorrow afternoon?', work: 'Checking courier slots', sys: 'Courier · Slots', Icon: Truck, result: 'Tomorrow 2–5 PM booked' },
        ],
      },
      {
        name: 'Healthcare',
        jobs: [
          { ch: 'Website', who: 'RK', msg: 'Is my test report ready?', work: 'Finding the report by patient ID', sys: 'Lab records', Icon: FlaskConical, result: 'Report link sent', approve: 'Released after doctor sign-off' },
          { ch: 'Email', who: 'MA', msg: 'Health check for 40 staff?', work: 'Matching corporate packages', sys: 'CRM · Packages', Icon: Users, result: 'Lead scored · sent to sales' },
          { ch: 'WhatsApp', who: 'NF', msg: 'Cardiologist, Sat evening?', work: 'Checking doctor rosters', sys: 'Calendar · Doctor rosters', Icon: Stethoscope, result: 'Sat 6:15 PM confirmed' },
        ],
      },
      {
        name: 'Real estate',
        jobs: [
          { ch: 'WhatsApp', who: 'KH', msg: 'Can I move my installment date?', work: 'Checking the payment plan', sys: 'Accounts · Payments', Icon: Wallet, result: 'Moved to 15 Nov · SMS sent', approve: 'Date change needs accounts OK' },
          { ch: 'Website', who: 'TI', msg: '3-bed flat under ৳1.5 cr?', work: 'Matching budget and area', sys: 'CRM · Listings', Icon: Building2, result: 'Budget fit · agent assigned' },
          { ch: 'Messenger', who: 'ZR', msg: 'Site visit this Friday?', work: 'Finding a free agent slot', sys: 'Calendar', Icon: CalendarDays, result: 'Fri 4:00 PM confirmed' },
        ],
      },
      {
        name: 'Education',
        jobs: [
          { ch: 'Email', who: 'PS', msg: 'Sibling discount on fees?', work: 'Checking student records', sys: 'Student records', Icon: GraduationCap, result: 'Discount applied · receipt sent', approve: 'Discount needs accounts approval' },
          { ch: 'Website', who: 'IA', msg: 'Admission info for Class 6?', work: 'Collecting class and branch', sys: 'CRM · Enquiries', Icon: Users, result: 'Counsellor assigned' },
          { ch: 'WhatsApp', who: 'SN', msg: 'Admission test slot, Class 6?', work: 'Checking the exam calendar', sys: 'Exam calendar', Icon: CalendarDays, result: 'Sun 10:00 AM booked' },
        ],
      },
      {
        name: 'FMCG',
        jobs: [
          { ch: 'WhatsApp', who: 'HB', msg: 'Where is delivery D-77?', work: 'Tracking dispatch for D-77', sys: 'ERP · Dispatch', Icon: Truck, result: 'Out for delivery · ETA 4 PM' },
          { ch: 'WhatsApp', who: 'AB', msg: 'Dealer rate for 200 cartons?', work: 'Checking the area price book', sys: 'CRM · Price book', Icon: Tag, result: 'Dealer scored · sent to sales', approve: 'Special rate needs area manager' },
          { ch: 'Phone', who: 'MU', msg: 'Rep visit for a restock?', work: 'Checking the route plan', sys: 'Route plan', Icon: MapPin, result: 'Added to Thursday route' },
        ],
      },
      {
        name: 'Automotive',
        jobs: [
          { ch: 'Website', who: 'DS', msg: 'Warranty claim for my battery', work: 'Checking warranty and service history', sys: 'Workshop · Jobs', Icon: Wrench, result: 'Claim opened · bay booked', approve: 'Claim needs service manager OK' },
          { ch: 'Messenger', who: 'NH', msg: 'EMI options for the new model?', work: 'Matching budget and finance plans', sys: 'CRM · Leads', Icon: Users, result: 'Lead scored · sent to sales' },
          { ch: 'WhatsApp', who: 'RA', msg: 'Test drive on Saturday?', work: 'Checking the showroom calendar', sys: 'Calendar · Showroom', Icon: Car, result: 'Sat 11:30 AM confirmed' },
        ],
      },
    ],
  },
};
