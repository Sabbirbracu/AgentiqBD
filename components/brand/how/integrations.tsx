'use client';

import {
  Bell,
  Boxes,
  CalendarDays,
  ClipboardList,
  Factory,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Globe,
  KeyRound,
  Lock,
  Mail,
  MessageSquare,
  RotateCw,
  ScrollText,
  Send,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Pip } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { glass, hotGlass, Label, phaseTracker, Rise, Shell, StepTracker, Tick, useLoop, Wire } from './kit';

/**
 * AI integration services: your systems around one integration layer. Each system's access is reviewed,
 * the connections are drawn, live events pass through authentication and permission checks (a failure is
 * retried, not lost), and the connections are documented for your team. Sample values.
 */

type Sys = { name: string; Icon: LucideIcon };
type Stack = {
  name: string;
  left: [Sys, Sys, Sys];
  right: [Sys, Sys, Sys];
  first: { what: string; diffs: [string, string, string] };
  second: { from: number; to: number; what: string; error: string; diff: string };
};

const stacks: Stack[] = [
  {
    name: 'Retail',
    left: [
      { name: 'Online store', Icon: ShoppingBag },
      { name: 'POS', Icon: Store },
      { name: 'Website forms', Icon: Globe },
    ],
    right: [
      { name: 'ERP · Inventory', Icon: Boxes },
      { name: 'CRM', Icon: Users },
      { name: 'WhatsApp', Icon: Send },
    ],
    first: { what: 'Order #5521 · 3 items', diffs: ['Stock 41 → 38', 'Contact updated', 'Confirmation sent'] },
    second: { from: 1, to: 0, what: '12 sold at Dhanmondi', error: 'Timeout · retrying', diff: 'Stock 38 → 26' },
  },
  {
    name: 'Clinic',
    left: [
      { name: 'Website', Icon: Globe },
      { name: 'Lab system', Icon: FlaskConical },
      { name: 'Billing', Icon: Wallet },
    ],
    right: [
      { name: 'Patient records', Icon: Users },
      { name: 'Patient portal', Icon: Lock },
      { name: 'SMS', Icon: MessageSquare },
    ],
    first: { what: 'Appointment form sent', diffs: ['Patient linked', 'Booking shown', 'Reminder queued'] },
    second: { from: 1, to: 1, what: 'Report ready · ID 88213', error: 'Portal busy · retrying', diff: 'Report published' },
  },
  {
    name: 'Distribution',
    left: [
      { name: 'Sales app', Icon: Smartphone },
      { name: 'CRM', Icon: Users },
      { name: 'Bank feed', Icon: Wallet },
    ],
    right: [
      { name: 'ERP · Orders', Icon: Boxes },
      { name: 'Accounting', Icon: FileSpreadsheet },
      { name: 'SMS', Icon: MessageSquare },
    ],
    first: { what: 'Dealer order · 300 cartons', diffs: ['Sales order SO-881', 'Invoice drafted', 'Dealer notified'] },
    second: { from: 2, to: 1, what: 'Payment ৳2.4 lakh in', error: 'Duplicate check · retrying', diff: 'Invoice marked paid' },
  },
  {
    name: 'Manufacturing',
    left: [
      { name: 'Buyer email', Icon: Mail },
      { name: 'Machine logs', Icon: Factory },
      { name: 'Supplier portal', Icon: Truck },
    ],
    right: [
      { name: 'ERP · Production', Icon: Boxes },
      { name: 'CRM · Orders', Icon: ClipboardList },
      { name: 'Ops alerts', Icon: Bell },
    ],
    first: { what: 'Revised PO from buyer', diffs: ['Plan updated', 'Order v2 saved', 'Team alerted'] },
    second: { from: 1, to: 0, what: 'Line 2 · 1,200 pcs done', error: 'API down · retrying', diff: 'PRD-901 updated' },
  },
];

/* Phases: review the stack, draw connections, live event, failed event retried, documentation, hold. */
const durations = [2200, 2000, 3000, 3400, 2400, 2000] as const;
const phaseSteps = [0, 1, 2, 2, 3, 4] as const;

const guards = [
  { name: 'Auth', Icon: KeyRound },
  { name: 'Permissions', Icon: Lock },
  { name: 'Retries', Icon: RotateCw },
  { name: 'Logs', Icon: ScrollText },
];

function Tile({ sys, i, phase, k, hot, children }: { sys: Sys; i: number; phase: number; k: string; hot: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('flex min-h-[74px] items-center gap-3 p-3.5 transition-colors duration-500', hot ? hotGlass : glass)}>
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-500', hot ? 'bg-signal' : 'bg-[#2a2a30]')}>
        <sys.Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-paper/90">{sys.name}</p>
        <div className="mt-1 h-4 text-[11.5px]">
          {phase === 0 ? (
            <Rise k={`${k}-${i}`} delay={0.3 + i * 0.25} y={4} className="flex items-center gap-1.5 text-paper/60">
              <Tick className="h-3.5 w-3.5" /> API · read and write
            </Rise>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, stacks.length);
  const st = stacks[loop.tab];
  const p = loop.phase;
  const k = `${loop.tab}`;
  const e2 = st.second;

  const leftText = (i: number) => {
    if (p === 2 && i === 0) return <span className="text-signal-300">{st.first.what}</span>;
    if (p === 3 && i === e2.from) return <span className="text-signal-300">{e2.what}</span>;
    return <span className="text-paper/40">Connected</span>;
  };
  const rightText = (j: number) => {
    if (p === 3 && j === e2.to)
      return (
        <span className="relative block">
          <motion.span className="absolute inset-0 truncate text-[#F08272]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, delay: 0.9, times: [0, 0.1, 0.85, 1] }}>
            ✕ {e2.error}
          </motion.span>
          <Rise delay={2.5} y={4} className="flex items-center gap-1.5 text-paper/80">
            <Tick className="h-3.5 w-3.5" /> {e2.diff}
          </Rise>
        </span>
      );
    if (p >= 3 && j === e2.to) return <span className="flex items-center gap-1.5 text-paper/60">{e2.diff}</span>;
    if (p === 2)
      return (
        <Rise delay={1.4 + j * 0.2} y={4} className="flex items-center gap-1.5 text-paper/80">
          <Tick className="h-3.5 w-3.5" /> {st.first.diffs[j]}
        </Rise>
      );
    if (p > 2) return <span className="text-paper/55">{st.first.diffs[j]}</span>;
    return <span className="text-paper/40">Connected</span>;
  };
  const guardOn = (g: number) => (p === 2 || p === 3 ? g !== 2 || p === 3 : p > 3 && g === 3);

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: business systems connected through one integration layer with authentication, permissions, retries and logs, then documented"
      prompt="Pick a business · watch the systems talk"
      tabs={stacks.map((s) => s.name)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,15rem)_minmax(2rem,1fr)_minmax(0,17rem)_minmax(2rem,1fr)_minmax(0,15rem)] lg:grid-rows-3 lg:items-center lg:gap-x-0 lg:gap-y-4">
        {st.left.map((sys, i) => (
          <div key={`l${i}`} className={cn('lg:col-start-1', ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3'][i])}>
            <Tile sys={sys} i={i} phase={p} k={k} hot={(p === 2 && i === 0) || (p === 3 && i === e2.from)}>
              {leftText(i)}
            </Tile>
          </div>
        ))}
        {st.left.map((_, i) => (
          <Wire
            key={`lw${i}`}
            className={cn('hidden lg:flex lg:col-start-2', ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3'][i])}
            lit={p >= 1}
            flowing={(p === 2 && i === 0) || (p === 3 && i === e2.from)}
            runKey={`${loop.key}-l${i}`}
            delay={0.2}
          />
        ))}

        {/* integration layer */}
        <div className="relative lg:col-start-3 lg:row-span-3 lg:row-start-1">
          <span aria-hidden className="absolute inset-6 rounded-full bg-signal/25 blur-[60px]" />
          <div className={cn('relative p-5 text-center', p >= 2 && p <= 3 ? hotGlass : glass)}>
            <span className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-ink ring-1 ring-white/15">
              <Pip bust="head" mood={p === 2 || p === 3 ? 'working' : p >= 4 ? 'happy' : 'focused'} className="w-14" title="Pip" />
            </span>
            <p className="display mt-3 text-lg font-semibold">Integration layer</p>
            <Label className="mt-1">{p === 0 ? 'Reviewing your stack' : p === 1 ? 'Drawing connections' : p <= 3 ? 'Syncing live' : 'Documented'}</Label>
            <div className="mt-4 grid grid-cols-2 gap-1.5">
              {guards.map((g, i) => {
                const on = guardOn(i);
                return (
                  <motion.span
                    key={g.name}
                    className={cn('flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] transition-colors duration-300', on ? 'bg-signal/15 text-signal-300' : 'bg-white/[0.04] text-paper/40')}
                    animate={on && !loop.reduce ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  >
                    <g.Icon className="h-3 w-3" />
                    {g.name}
                  </motion.span>
                );
              })}
            </div>
          </div>
          {p >= 4 && (
            <Rise k={`${k}-docs`} delay={p === 4 ? 0.2 : 0} className={cn('relative mt-3 flex items-center gap-3 p-3', glass)}>
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/10">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-[12.5px] font-semibold">Connection docs</p>
                <p className="text-[11px] text-paper/55">6 flows · handed to your team</p>
              </div>
              <Tick className="ml-auto" />
            </Rise>
          )}
        </div>

        {st.right.map((_, j) => (
          <Wire
            key={`rw${j}`}
            className={cn('hidden lg:flex lg:col-start-4', ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3'][j])}
            lit={p >= 1}
            flowing={p === 2 || (p === 3 && j === e2.to)}
            runKey={`${loop.key}-r${j}`}
            delay={p === 2 ? 1 + j * 0.15 : 1}
          />
        ))}
        {st.right.map((sys, j) => (
          <div key={`r${j}`} className={cn('lg:col-start-5', ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3'][j])}>
            <Tile sys={sys} i={j + 3} phase={p} k={k} hot={p === 2 || (p === 3 && j === e2.to)}>
              {rightText(j)}
            </Tile>
          </div>
        ))}
      </div>

      {/* sync log */}
      <div className={cn('mt-6 p-4 sm:px-5', glass)}>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold">Sync log</p>
          <Label className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3" /> Today
          </Label>
        </div>
        <div className="mt-3 divide-y divide-white/[0.06] font-mono text-[11px]">
          {p >= 3 && (
            <Rise k={`${k}-log2`} delay={p === 3 ? 2.6 : 0} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
              <RotateCw className="h-3.5 w-3.5 text-signal-300" />
              <span className="text-paper/80">{e2.what}</span>
              <span className="text-paper/45">
                {st.left[e2.from].name} → {st.right[e2.to].name}
              </span>
              <span className="ml-auto text-emerald-300">Retried once · synced</span>
            </Rise>
          )}
          {p >= 2 && (
            <Rise k={`${k}-log1`} delay={p === 2 ? 2 : 0} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
              <Tick className="h-3.5 w-3.5" />
              <span className="text-paper/80">{st.first.what}</span>
              <span className="text-paper/45">{st.left[0].name} → 3 systems</span>
              <span className="ml-auto text-emerald-300">Synced · 0.8 s</span>
            </Rise>
          )}
          {p < 2 && <p className="py-2 text-paper/35">No events yet · connections being set up</p>}
        </div>
      </div>
    </Shell>
  );
}
