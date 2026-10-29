'use client';

import {
  Building2,
  CalendarDays,
  Clock,
  FileText,
  FlaskConical,
  PhoneForwarded,
  PhoneIncoming,
  ShoppingBag,
  Tag,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Pip, type PipMood } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { glass, hotGlass, Label, Shell, StepTracker, Tick, Typed, Wire } from './kit';

/**
 * AI voice agents: one Pip on four phone lines at once. Every line runs its own call (ringing, listening,
 * checking your data, answering, saved), so the tracker counts how many calls sit at each step right now.
 * Callers, questions and answers are sample values.
 */

type Call = { who: string; name: string; lang: 'BN' | 'EN'; ask: string; src: number; reply: string; result: string; urgent?: boolean };
type Business = { name: string; sources: { name: string; Icon: LucideIcon }[]; calls: Call[] };

const businesses: Business[] = [
  {
    name: 'Clinic',
    sources: [
      { name: 'Doctor rosters', Icon: CalendarDays },
      { name: 'Patient records', Icon: Users },
      { name: 'Fee list', Icon: Tag },
      { name: 'Lab reports', Icon: FlaskConical },
    ],
    calls: [
      { who: 'SH', name: 'Shirin H.', lang: 'BN', ask: 'Is Dr. Rahman in today?', src: 0, reply: 'Yes, from 5 PM. Shall I book you?', result: 'Booked 5:30 PM · SMS sent' },
      { who: 'AK', name: 'Arif K.', lang: 'EN', ask: 'Is my blood test report ready?', src: 3, reply: 'It is ready. I have sent the link by SMS.', result: 'Report link sent' },
      { who: 'NB', name: 'Nusrat B.', lang: 'BN', ask: 'How much is a skin specialist visit?', src: 2, reply: '৳1,000, with slots on Saturday.', result: 'Fee shared · lead saved' },
      { who: 'RN', name: 'Rafiq N.', lang: 'BN', ask: 'My father fainted, what do I do?', src: 1, reply: 'Connecting you to the duty doctor now.', result: 'Transferred to a person', urgent: true },
      { who: 'TM', name: 'Tania M.', lang: 'EN', ask: 'Can I move my Sunday appointment?', src: 0, reply: 'Moved to Monday 11 AM. SMS on its way.', result: 'Rescheduled · SMS sent' },
      { who: 'JH', name: 'Jamal H.', lang: 'BN', ask: 'Do I fast for the lipid test?', src: 3, reply: 'Yes, 10–12 hours. Water is fine.', result: 'Answered · call logged' },
      { who: 'MS', name: 'Mitu S.', lang: 'EN', ask: 'Which doctors work on Friday?', src: 0, reply: 'Dr. Rahman and Dr. Sultana, 4–9 PM.', result: 'Answered · call logged' },
      { who: 'AB', name: 'Anwar B.', lang: 'BN', ask: 'Can someone call me back tomorrow?', src: 1, reply: 'Sure, a call-back is set for 10 AM.', result: 'Call-back logged' },
    ],
  },
  {
    name: 'Real estate',
    sources: [
      { name: 'Listings', Icon: Building2 },
      { name: 'Site visit calendar', Icon: CalendarDays },
      { name: 'CRM', Icon: Users },
      { name: 'Payment plans', Icon: Wallet },
    ],
    calls: [
      { who: 'QH', name: 'Quazi H.', lang: 'BN', ask: 'Is the Bashundhara flat still free?', src: 0, reply: 'Yes, the 3-bed on Road 7 is available.', result: 'Brochure sent on WhatsApp' },
      { who: 'SM', name: 'Sadia M.', lang: 'EN', ask: 'Can I see it on Saturday?', src: 1, reply: 'Saturday 4 PM works. Booking it now.', result: 'Visit booked · agent told' },
      { who: 'IK', name: 'Imran K.', lang: 'BN', ask: 'What is the down payment?', src: 3, reply: '20% at booking, then 36 installments.', result: 'Plan shared · lead saved' },
      { who: 'FR', name: 'Farhana R.', lang: 'EN', ask: 'I want my booking money back.', src: 2, reply: 'Passing you to our accounts team now.', result: 'Transferred to a person', urgent: true },
      { who: 'MA', name: 'Mahbub A.', lang: 'BN', ask: 'Any 2-bed under ৳80 lakh?', src: 0, reply: 'Two options in Mirpur. Sending details.', result: 'Options sent · lead saved' },
      { who: 'LT', name: 'Lamia T.', lang: 'EN', ask: 'Is my site visit confirmed?', src: 1, reply: 'Yes, Friday 11 AM with Mr. Karim.', result: 'Confirmed · SMS sent' },
      { who: 'HN', name: 'Hasan N.', lang: 'BN', ask: 'Is parking included?', src: 0, reply: 'Yes, one space comes with each flat.', result: 'Answered · lead saved' },
      { who: 'RS', name: 'Rumana S.', lang: 'EN', ask: 'Can you call me after 6 PM?', src: 2, reply: 'Of course. Call-back set for 6:30 PM.', result: 'Call-back logged' },
    ],
  },
  {
    name: 'Restaurant',
    sources: [
      { name: 'Reservations', Icon: CalendarDays },
      { name: 'Menu', Icon: FileText },
      { name: 'Orders', Icon: ShoppingBag },
      { name: 'Opening hours', Icon: Clock },
    ],
    calls: [
      { who: 'OF', name: 'Omar F.', lang: 'BN', ask: 'Are you open on Eid?', src: 3, reply: 'Yes, from 4 PM to 11 PM.', result: 'Answered · call logged' },
      { who: 'LA', name: 'Lubna A.', lang: 'EN', ask: 'Table for four at 8 tonight?', src: 0, reply: '8 PM by the window is free. Booked.', result: 'Table held · SMS sent' },
      { who: 'BH', name: 'Babul H.', lang: 'BN', ask: 'Can I order 30 biryani for tomorrow?', src: 2, reply: 'Noted. The manager confirms by 6 PM.', result: 'Order noted for manager' },
      { who: 'SK', name: 'Sumi K.', lang: 'EN', ask: 'Do you have vegetarian dishes?', src: 1, reply: 'Yes, six. I can text you the list.', result: 'Menu sent by SMS' },
      { who: 'RR', name: 'Rakib R.', lang: 'BN', ask: 'My order is 40 minutes late!', src: 2, reply: 'Sorry! Connecting you to the manager.', result: 'Transferred to a person', urgent: true },
      { who: 'NH', name: 'Nadia H.', lang: 'EN', ask: 'Can I move my booking to 9 PM?', src: 0, reply: 'Done, 9 PM for four people.', result: 'Booking moved · SMS sent' },
      { who: 'TJ', name: 'Tahmid J.', lang: 'EN', ask: 'Is there parking nearby?', src: 3, reply: 'Yes, free parking behind the building.', result: 'Answered · call logged' },
      { who: 'PA', name: 'Parvin A.', lang: 'BN', ask: 'Birthday cake with my dinner booking?', src: 1, reply: 'Yes, ৳1,800 for 1 kg. Added to it.', result: 'Cake added to booking' },
    ],
  },
];

/* One call on a line, in ms: ringing, caller speaks, Pip checks data, Pip answers, saved, line free. */
const CYCLE = 9000;
const stages = [
  { id: 'ring', until: 1200, step: 0 },
  { id: 'listen', until: 3400, step: 1 },
  { id: 'lookup', until: 5000, step: 2 },
  { id: 'reply', until: 7000, step: 2 },
  { id: 'saved', until: 8400, step: 3 },
  { id: 'free', until: CYCLE, step: -1 },
] as const;
type Stage = (typeof stages)[number]['id'];
const OFFSETS = [0, 6750, 2250, 4500]; // lines 1–2 on the left, 3–4 on the right
const TICK = 200;

const stageAt = (lt: number) => stages.find((s) => lt < s.until)!;
const avatarTones = ['#3E6E8E', '#8B4A6B', '#4F7A55', '#9A5B34', '#5B5A8E', '#7A7240', '#2F7A74'];

function Waveform({ on, pip }: { on: boolean; pip?: boolean }) {
  return (
    <span aria-hidden className="flex h-5 items-center gap-[3px]">
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className={cn('h-full w-[2.5px] rounded-full transition-colors', on ? 'voice-bar' : 'scale-y-[0.18]', pip ? 'bg-signal' : 'bg-paper/70')}
          style={on ? { animationDelay: `${(i * 137) % 900}ms`, animationDuration: `${700 + ((i * 89) % 500)}ms` } : undefined}
        />
      ))}
    </span>
  );
}

function Line({ call, stage, lt, line, source }: { call: Call; stage: Stage; lt: number; line: number; source: string }) {
  const live = stage !== 'free' && stage !== 'ring';
  const secs = Math.max(0, Math.floor((lt - 1200) / 1000));
  const after = (s: Stage) => stages.findIndex((x) => x.id === stage) > stages.findIndex((x) => x.id === s);
  const tone = avatarTones[(call.who.charCodeAt(0) + call.who.charCodeAt(1)) % avatarTones.length];
  const status: Record<Stage, string> = {
    ring: 'Ringing',
    listen: 'Listening',
    lookup: `Checking ${source}`,
    reply: call.urgent ? 'Transferring' : 'Answering',
    saved: 'Saved',
    free: 'Line free',
  };

  return (
    <div className={cn('relative min-h-[178px] p-4 transition-colors duration-500', stage === 'free' ? `${glass} opacity-60` : live ? hotGlass : glass)}>
      <div className="flex items-center gap-3">
        <span className={cn('relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-paper', stage === 'free' && 'opacity-40')} style={{ backgroundColor: tone }}>
          {stage === 'ring' && <span className="absolute inset-0 animate-ping rounded-full bg-signal/50" />}
          <span className="relative">{call.who}</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-[13.5px] font-semibold text-paper/90">
            <span className="truncate">{stage === 'free' ? `Line ${line}` : call.name}</span>
            {stage !== 'free' && <span className="rounded bg-white/10 px-1.5 py-px font-mono text-[9px] tracking-[0.12em] text-paper/60">{call.lang}</span>}
          </p>
          <Label className={cn('mt-0.5', live && 'text-signal-300')}>
            {status[stage]}
            {live && ` · 0:${String(secs).padStart(2, '0')}`}
          </Label>
        </div>
        {stage === 'ring' ? <PhoneIncoming className="h-4 w-4 animate-pulse text-signal-300" /> : <Waveform on={stage === 'listen' || stage === 'reply'} pip={stage === 'reply'} />}
      </div>

      {stage !== 'free' && stage !== 'ring' && (
        <div className="mt-3 space-y-1.5 text-[12.5px] leading-snug">
          <p className="text-paper/80">
            <span className="mr-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/40">Caller</span>
            {stage === 'listen' ? <Typed text={`“${call.ask}”`} ms={1500} /> : `“${call.ask}”`}
          </p>
          {after('lookup') && (
            <p className="text-paper">
              <span className="mr-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-signal-300">Pip</span>
              {stage === 'reply' ? <Typed text={`“${call.reply}”`} ms={1400} /> : `“${call.reply}”`}
            </p>
          )}
        </div>
      )}
      {stage === 'ring' && <p className="mt-4 text-[12.5px] text-paper/45">Incoming call · picked up on the first ring</p>}
      {stage === 'free' && <p className="mt-4 text-[12.5px] text-paper/35">Waiting for the next call…</p>}
      {stage === 'saved' && (
        <p className="mt-3 flex items-center gap-2 text-[12px] text-paper/80">
          {call.urgent ? <PhoneForwarded className="h-4 w-4 text-signal-300" /> : <Tick />}
          {call.result}
        </p>
      )}
    </div>
  );
}

export function VoiceArt({ steps }: { steps: string[] }) {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const [tab, setTab] = useState(0);
  // Reduced motion: a still frame with every line mid-call.
  const [t, setT] = useState(3000);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setT((x) => x + TICK), TICK);
    return () => clearInterval(id);
  }, [reduce, inView]);

  const biz = businesses[tab];
  const lines = OFFSETS.map((off, i) => {
    const local = t + off;
    const lap = Math.floor(local / CYCLE);
    const lt = local % CYCLE;
    const stage = stageAt(lt);
    // Each line alternates between two of the eight callers, so no caller is ever on two lines.
    const call = biz.calls[(i + 4 * (lap % 2)) % biz.calls.length];
    return { i, lt, stage, call, lap };
  });
  const counts = [0, 1, 2, 3].map((st) => lines.filter((l) => l.stage.step === st).length);
  const live = lines.filter((l) => l.stage.id !== 'free').length;
  const busySources = new Set(lines.filter((l) => l.stage.id === 'lookup').map((l) => l.call.src));
  const mood: PipMood = busySources.size ? 'working' : lines.some((l) => l.stage.id === 'listen') ? 'focused' : 'happy';

  const card = (n: number, pos: string) => {
    const l = lines[n];
    return (
      <div key={`${n}-${l.lap}`} className={pos}>
        <Line call={l.call} stage={l.stage.id} lt={l.lt} line={n + 1} source={biz.sources[l.call.src].name} />
      </div>
    );
  };
  const wire = (n: number, pos: string, right: boolean) => {
    const l = lines[n];
    const s = l.stage.id;
    const towardPip = s === 'listen' || s === 'ring';
    // Packets run caller → Pip while the caller talks, Pip → caller while Pip answers.
    const reverse = right ? towardPip : !towardPip;
    return (
      <Wire
        key={`w${n}`}
        className={cn('hidden lg:flex', pos, reverse && 'rotate-180')}
        lit={s !== 'free'}
        flowing={s === 'listen' || s === 'reply'}
        runKey={`${n}-${l.lap}-${s}-${Math.floor(l.lt / 1100)}`}
      />
    );
  };

  return (
    <Shell
      rootRef={ref}
      label="Animated example: one AI voice agent, Pip, answering four phone calls at the same time, checking your data and saving each call"
      prompt="One voice agent · every line answered at once"
      tabs={businesses.map((b) => b.name)}
      tab={tab}
      onPick={(i) => {
        setTab(i);
        setT(reduce ? 3000 : 0);
      }}
      tracker={<StepTracker steps={steps} counts={counts} countLabel={counts.some((c) => c > 1) ? 'calls' : 'call'} />}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,17rem)_2.5rem_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-0 lg:gap-y-5">
        {/* Pip at the switchboard */}
        <div className="relative flex flex-col items-center lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <span aria-hidden className="absolute top-6 h-48 w-48 rounded-full bg-signal/30 blur-[60px]" />
          <span className="relative rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-300">
            {live} calls live
          </span>
          <div className="relative mt-4 w-full max-w-[15rem] overflow-hidden rounded-[26px] border border-signal/40 bg-gradient-to-b from-[#1d1716] to-[#121214] px-6 pt-5 shadow-[0_30px_60px_-30px_rgba(232,79,61,0.5)]">
            <Pip mood={mood} mic className="relative mx-auto mb-2 w-[132px]" title="Pip, the AI voice agent, wearing a headset" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-3 border-t border-white/10 bg-gradient-to-b from-[#232327] to-[#0c0c0e]" />
          </div>
          <p className="relative mt-3 text-center">
            <span className="display text-xl font-semibold">Pip</span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45">Bangla · English</span>
          </p>
          <div className="relative mt-4 grid w-full max-w-[17rem] grid-cols-2 gap-2">
            {biz.sources.map((src, i) => {
              const on = busySources.has(i);
              return (
                <div key={src.name} className={cn('flex items-center gap-2 px-2.5 py-2 transition-colors duration-300', on ? hotGlass : glass)}>
                  <src.Icon className={cn('h-3.5 w-3.5 shrink-0', on ? 'text-signal-300' : 'text-paper/50')} />
                  <span className={cn('truncate text-[11.5px]', on ? 'text-paper' : 'text-paper/55')}>{src.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {card(0, 'lg:col-start-1 lg:row-start-1')}
        {wire(0, 'lg:col-start-2 lg:row-start-1', false)}
        {card(1, 'lg:col-start-1 lg:row-start-2')}
        {wire(1, 'lg:col-start-2 lg:row-start-2', false)}
        {wire(2, 'lg:col-start-4 lg:row-start-1', true)}
        {card(2, 'lg:col-start-5 lg:row-start-1')}
        {wire(3, 'lg:col-start-4 lg:row-start-2', true)}
        {card(3, 'lg:col-start-5 lg:row-start-2')}
      </div>
    </Shell>
  );
}
