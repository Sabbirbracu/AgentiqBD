'use client';

import { BookOpen, FileText, Search, UserRound } from 'lucide-react';
import { motion } from 'motion/react';
import { Pip } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { ease, glass, hotGlass, Label, phaseTracker, Rise, Shell, StepTracker, Tick, Typed, useLoop, Wire } from './kit';

/**
 * AI chatbots: a live chat window (website, WhatsApp or Messenger) where Pip answers from your own
 * documents, cites the one it used, and saves the lead or hands the chat to your team. Sample values.
 */

type Convo = {
  channel: 'Website' | 'WhatsApp' | 'Messenger';
  business: string;
  docs: string[];
  source: number;
  ask: string;
  answer: string;
  reply: string;
  close: string;
  handoff?: string;
  lead: [string, string][];
};

const convos: Convo[] = [
  {
    channel: 'Website',
    business: 'Online fashion store',
    docs: ['Shop FAQs', 'Price list', 'Delivery policy', 'Return policy'],
    source: 2,
    ask: 'Do you deliver to Sylhet? How long does it take?',
    answer: 'Yes! Sylhet delivery takes 2–3 days and costs ৳120. Shall I start your order?',
    reply: 'Yes, 2 of the blue panjabi in L please',
    close: 'Done. I noted 2 × blue panjabi (L). Our team will call to confirm.',
    lead: [
      ['Name', 'Tania A.'],
      ['Phone', '017•• ••• 482'],
      ['Wants', '2 × blue panjabi, L'],
    ],
  },
  {
    channel: 'WhatsApp',
    business: 'City clinic',
    docs: ['Doctor schedule', 'Fee list', 'Clinic FAQs', 'Lab guide'],
    source: 1,
    ask: 'Fee for a skin specialist? Is Dr. Nasrin in on Saturday?',
    answer: 'The skin specialist fee is ৳1,000. Dr. Nasrin sees patients Sat 5–9 PM. Shall I request a slot?',
    reply: 'Yes, 6 PM please',
    close: 'Requested Saturday 6 PM. Reception will confirm shortly.',
    lead: [
      ['Name', 'Mahin S.'],
      ['Phone', '018•• ••• 207'],
      ['Wants', 'Skin specialist · Sat 6 PM'],
    ],
  },
  {
    channel: 'Messenger',
    business: 'Restaurant & catering',
    docs: ['Menu', 'Catering packages', 'Opening hours', 'Event FAQs'],
    source: 1,
    ask: 'Can you cater for 80 guests next Friday?',
    answer: 'Yes. Catering for 80+ guests starts at ৳650 per guest, with three menu options.',
    reply: 'Can I talk to someone about a custom menu?',
    close: 'Of course. Our events manager Rina has joined with this whole chat.',
    handoff: 'Rina, events manager',
    lead: [
      ['Name', 'Farhan K.'],
      ['Phone', '019•• ••• 330'],
      ['Wants', 'Catering · 80 guests'],
    ],
  },
];

/* Phases: load knowledge, customer asks, Pip searches and answers, follow-up and handoff, hold. */
const durations = [2200, 2000, 3000, 3200, 2400] as const;
const phaseSteps = [0, 1, 2, 3, 4] as const;

const skins = {
  Website: { head: 'bg-ink text-paper', sub: 'text-paper/55', wall: 'bg-[#F3F3EC]', bot: 'bg-white text-ink ring-1 ring-ink/[0.06]', me: 'bg-signal text-white', input: 'Ask us anything…' },
  WhatsApp: { head: 'bg-[#008069] text-white', sub: 'text-white/70', wall: 'bg-[#EFEAE2]', bot: 'bg-white text-ink', me: 'bg-[#D9FDD3] text-ink', input: 'Message' },
  Messenger: { head: 'bg-white text-ink border-b border-ink/10', sub: 'text-ink/50', wall: 'bg-white', bot: 'bg-[#F0F0F0] text-ink', me: 'bg-[#0866FF] text-white', input: 'Aa' },
} as const;

function Dots({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-current" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  );
}

function Bubble({ me, skin, delay = 0, children }: { me?: boolean; skin: (typeof skins)[keyof typeof skins]; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      className={cn('flex items-end gap-1.5', me && 'justify-end')}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease }}
    >
      {!me && (
        <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink">
          <Pip bust="head" mood="happy" className="w-5" title="Pip" />
        </span>
      )}
      <div className={cn('max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug shadow-sm', me ? `${skin.me} rounded-br-md` : `${skin.bot} rounded-bl-md`)}>{children}</div>
    </motion.div>
  );
}

export function ChatArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, convos.length);
  const c = convos[loop.tab];
  const skin = skins[c.channel];
  const p = loop.phase;
  const k = `${loop.tab}`;

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: Pip, an AI chatbot, answering a customer on the website, WhatsApp or Messenger from your own documents and saving the lead for your team"
      prompt="Pick a channel · watch a real chat"
      tabs={convos.map((x) => x.channel)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      <div className="grid items-center gap-y-0 lg:grid-cols-[minmax(0,15rem)_3rem_minmax(0,24rem)_3rem_minmax(0,15rem)] lg:justify-center">
        {/* your knowledge */}
        <div className={cn('p-4', glass)}>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-signal-300" />
            <p className="text-[13.5px] font-semibold">Your knowledge</p>
          </div>
          <ul className="mt-3 space-y-2">
            {c.docs.map((d, i) => {
              const used = p >= 2 && i === c.source;
              return (
                <li key={`${k}-${d}`} className={cn('relative overflow-hidden px-3 py-2.5 transition-colors duration-500', used ? hotGlass : glass)}>
                  <div className="flex items-center gap-2.5">
                    <FileText className={cn('h-3.5 w-3.5 shrink-0', used ? 'text-signal-300' : 'text-paper/50')} />
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-paper/85">{d}</span>
                    <Rise delay={0.35 + i * 0.35}>
                      <Tick className="h-3.5 w-3.5" />
                    </Rise>
                  </div>
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal/60"
                    initial={loop.reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.9, delay: i * 0.35, ease: 'linear' }}
                  />
                  {used && <Label className="mt-1 text-signal-300">Used for this answer</Label>}
                </li>
              );
            })}
          </ul>
          <Label className="mt-3">{p >= 1 ? 'Ready · answers only from these' : 'Loading your documents…'}</Label>
        </div>

        <Wire lit={p >= 2} flowing={p === 2} runKey={`${loop.key}-in`} delay={0.6} />

        {/* the chat window */}
        <div className="relative mx-auto w-full max-w-[24rem]">
          <span aria-hidden className="absolute -inset-6 rounded-[44px] bg-signal/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[26px] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className={cn('flex items-center gap-3 px-4 py-3', skin.head)}>
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink ring-2 ring-white/20">
                <Pip bust="head" mood={p === 2 ? 'working' : p >= 3 ? 'happy' : 'focused'} className="w-8" title="Pip" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold">{c.business}</p>
                <p className={cn('flex items-center gap-1.5 text-[11px]', skin.sub)}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {p === 2 ? 'Pip is typing…' : 'Pip · replies instantly'}
                </p>
              </div>
              <span className={cn('ml-auto rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]', c.channel === 'Messenger' ? 'bg-ink/[0.06] text-ink/60' : 'bg-white/15')}>{c.channel}</span>
            </div>
            <div key={k} className={cn('flex h-[340px] flex-col justify-end gap-2.5 px-3 py-4', skin.wall)}>
              {p === 0 && <p className="mx-auto mb-auto mt-auto rounded-full bg-ink/[0.06] px-3 py-1 text-[11px] text-ink/50">Learning your documents…</p>}
              {p >= 1 && (
                <Bubble me skin={skin} delay={p === 1 ? 0.6 : 0}>
                  {c.ask}
                </Bubble>
              )}
              {p === 1 && (
                <motion.div className="flex justify-end" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.55, duration: 0.1 }}>
                  <span className={cn('rounded-2xl px-3 py-2', skin.me)}>
                    <Dots />
                  </span>
                </motion.div>
              )}
              {p === 2 && (
                <motion.div className="flex items-center gap-2 pl-8 text-[11px] text-ink/55" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.3, times: [0, 0.15, 0.85, 1] }}>
                  <Search className="h-3 w-3" />
                  Searching “{c.docs[c.source]}”
                  <Dots className="text-ink/40" />
                </motion.div>
              )}
              {p >= 2 && (
                <Bubble skin={skin} delay={p === 2 ? 1.3 : 0}>
                  {p === 2 ? <Typed text={c.answer} ms={1400} delay={1300} /> : c.answer}
                  <span className="mt-1.5 flex items-center gap-1 text-[10px] opacity-60">
                    <FileText className="h-3 w-3" />
                    From: {c.docs[c.source]}
                  </span>
                </Bubble>
              )}
              {p >= 3 && (
                <Bubble me skin={skin} delay={p === 3 ? 0.2 : 0}>
                  {c.reply}
                </Bubble>
              )}
              {p >= 3 && (
                <Bubble skin={skin} delay={p === 3 ? 1.2 : 0}>
                  {c.close}
                </Bubble>
              )}
              {p >= 3 && c.handoff && (
                <Rise delay={p === 3 ? 2 : 0} className="mx-auto flex items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 py-1 text-[11px] text-ink/60">
                  <UserRound className="h-3 w-3" />
                  {c.handoff} joined the chat
                </Rise>
              )}
            </div>
            <div className={cn('flex items-center gap-2 border-t border-ink/[0.06] bg-white px-3 py-2.5')}>
              <span className="flex-1 rounded-full bg-ink/[0.05] px-3 py-1.5 text-[12px] text-ink/40">{skin.input}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal text-[12px] text-white">➤</span>
            </div>
          </div>
        </div>

        <Wire lit={p >= 3} flowing={p === 3} runKey={`${loop.key}-out`} delay={1.4} />

        {/* saved for your team */}
        <div className={cn('p-4 transition-colors duration-500', p >= 3 ? hotGlass : glass)}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13.5px] font-semibold">Saved for your team</p>
            {p >= 3 && (
              <Rise delay={p === 3 ? 2.2 : 0} className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300">
                In CRM
              </Rise>
            )}
          </div>
          <dl className="mt-3 space-y-2">
            {c.lead.map(([label, value], i) => (
              <div key={`${k}-${label}`} className="rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2">
                <dt>
                  <Label>{label}</Label>
                </dt>
                <dd className="mt-0.5 h-4 text-[12.5px] text-paper/90">
                  {p >= 3 ? p === 3 ? <Typed text={value} ms={600} delay={1500 + i * 350} caret={false} /> : value : <span className="text-paper/25">—</span>}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-paper/70">
            {p >= 3 ? (
              <Rise delay={p === 3 ? 2.4 : 0} className="flex items-center gap-2">
                <Tick />
                {c.handoff ? `Chat handed to ${c.handoff.split(',')[0]}` : 'Follow-up task created'}
              </Rise>
            ) : (
              <span className="text-paper/35">Waiting for the conversation…</span>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
