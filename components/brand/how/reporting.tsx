'use client';

import { Bell, Database, Mail, MessageCircleQuestion } from 'lucide-react';
import { motion } from 'motion/react';
import { Pip } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { CountUp, ease, glass, hotGlass, Label, phaseTracker, Rise, Shell, Spinner, StepTracker, Tick, Typed, useLoop } from './kit';

/**
 * Dashboards & reporting: the questions that matter are agreed, data sources are connected, the
 * dashboard builds itself, and the report goes out on schedule with an alert and a short AI summary.
 * Figures are sample values.
 */

type Board = {
  name: string;
  title: string;
  questions: string[];
  sources: [string, string][];
  kpis: [string, string, string][];
  bars: [string, number][];
  hot: number;
  line: number[];
  email: string;
  alert: string;
  summary: string;
};

const boards: Board[] = [
  {
    name: 'Sales',
    title: 'Weekly sales',
    questions: ['Which branch sells most?', 'Are we on target?', 'What is slipping?'],
    sources: [
      ['POS', '5 branches'],
      ['CRM', '1,240 orders'],
      ['Targets sheet', 'Monthly'],
    ],
    kpis: [
      ['Revenue', '৳48.2L', '+6%'],
      ['Orders', '1,240', '+3%'],
      ['Avg. basket', '৳3,890', '+2%'],
    ],
    bars: [
      ['Gulshan', 92],
      ['Dhanmondi', 78],
      ['Uttara', 64],
      ['Mirpur', 41],
      ['Banani', 58],
    ],
    hot: 3,
    line: [42, 48, 45, 52, 58, 55, 63, 61],
    email: 'Weekly sales · Mon 9:00 AM',
    alert: 'Mirpur sales down 8% this week',
    summary: 'Gulshan led the week. Mirpur slipped after two stock-outs on Thursday.',
  },
  {
    name: 'Inventory',
    title: 'Stock health',
    questions: ['What is about to run out?', 'What is not moving?', 'Where is stock held?'],
    sources: [
      ['ERP', 'Stock ledger'],
      ['POS', 'Daily sales'],
      ['Warehouse app', 'Bin counts'],
    ],
    kpis: [
      ['Stock value', '৳1.3Cr', '-4%'],
      ['Low items', '9', '+3'],
      ['Days of cover', '18', '-2'],
    ],
    bars: [
      ['Dhaka', 88],
      ['Chattogram', 61],
      ['Gazipur', 47],
      ['Sylhet', 30],
      ['Khulna', 22],
    ],
    hot: 4,
    line: [80, 76, 74, 70, 66, 61, 58, 52],
    email: 'Stock report · daily 7:00 AM',
    alert: '9 items below minimum stock',
    summary: 'Nine fast movers fall below minimum by Friday. The reorder list is attached.',
  },
  {
    name: 'Finance',
    title: 'Cash and dues',
    questions: ['How much are we owed?', 'Where does cash go?', 'Are margins holding?'],
    sources: [
      ['Accounting', 'Ledger'],
      ['Bank feed', '3 accounts'],
      ['CRM', 'Invoices'],
    ],
    kpis: [
      ['Receivables', '৳62L', '+9%'],
      ['Cash in', '৳31L', '-5%'],
      ['Margin', '23%', '-1 pt'],
    ],
    bars: [
      ['0–30 d', 90],
      ['31–60 d', 55],
      ['61–90 d', 32],
      ['90+ d', 26],
      ['Disputed', 8],
    ],
    hot: 3,
    line: [30, 34, 33, 38, 36, 41, 44, 47],
    email: 'Cash report · Fri 5:00 PM',
    alert: 'Dues over 90 days up 12%',
    summary: 'Three distributors hold most overdue dues. A follow-up list is attached.',
  },
  {
    name: 'Production',
    title: 'Line output',
    questions: ['Is each line on plan?', 'What is our yield?', 'Where is downtime?'],
    sources: [
      ['Machine logs', '4 lines'],
      ['ERP', 'Orders'],
      ['QC app', 'Inspections'],
    ],
    kpis: [
      ['Output', '18,400', '+4%'],
      ['Yield', '96.1%', '+0.6'],
      ['Downtime', '3.2 h', '-1.1'],
    ],
    bars: [
      ['Line 1', 95],
      ['Line 2', 88],
      ['Line 3', 72],
      ['Line 4', 90],
      ['Line 5', 81],
    ],
    hot: 2,
    line: [88, 90, 86, 91, 89, 84, 92, 90],
    email: 'Production report · daily 6:00 PM',
    alert: 'Line 3 is 6% behind plan',
    summary: 'Line 3 lost two hours to changeovers. The other lines are on plan.',
  },
];

/* Phases: agree the questions, connect sources, build the views, deliver and alert, hold. */
const durations = [2400, 2400, 3400, 3600, 2600] as const;
const phaseSteps = [0, 1, 2, 3, 4] as const;

function Line({ values, draw, reduce, k }: { values: number[]; draw: boolean; reduce: boolean; k: string }) {
  const max = Math.max(...values) * 1.1;
  const min = Math.min(...values) * 0.8;
  const pts = values.map((v, i) => [8 + i * (284 / (values.length - 1)), 70 - ((v - min) / (max - min)) * 60] as const);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox="0 0 300 76" className="block h-auto w-full" aria-hidden>
      {[20, 45, 70].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#fff" strokeOpacity=".05" />
      ))}
      {draw && (
        <>
          <motion.path
            key={`${k}-a`}
            d={`${d} L292 76 L8 76 Z`}
            fill="#E84F3D"
            fillOpacity=".12"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          />
          <motion.path
            key={`${k}-l`}
            d={d}
            fill="none"
            stroke="#E84F3D"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1.2, ease }}
          />
        </>
      )}
    </svg>
  );
}

export function ReportingArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, boards.length);
  const b = boards[loop.tab];
  const p = loop.phase;
  const k = `${loop.tab}`;
  const built = p >= 2;

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: business questions agreed, data sources connected, a dashboard building itself, and a scheduled report delivered with an alert and an AI summary"
      prompt="Pick a dashboard · watch it build"
      tabs={boards.map((x) => x.name)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,17rem)] lg:items-start">
        {/* questions and sources */}
        <div className="space-y-4">
          <div className={cn('p-4 transition-colors duration-500', p === 0 ? hotGlass : glass)}>
            <div className="flex items-center gap-2">
              <MessageCircleQuestion className="h-4 w-4 text-signal-300" />
              <p className="text-[13.5px] font-semibold">Questions you need answered</p>
            </div>
            <div className="mt-3 space-y-2">
              {b.questions.map((q, i) => (
                <Rise key={`${k}-q${i}`} delay={p === 0 ? 0.2 + i * 0.4 : 0} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-[12.5px] text-paper/85">
                  <Tick className="h-3.5 w-3.5" />
                  {q}
                </Rise>
              ))}
            </div>
          </div>
          <div className={cn('p-4 transition-colors duration-500', p === 1 ? hotGlass : glass, p < 1 && 'opacity-50')}>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-paper/60" />
              <p className="text-[13.5px] font-semibold">Data sources</p>
            </div>
            <ul className="mt-3 space-y-2">
              {b.sources.map(([name, what], i) => (
                <li key={`${k}-${name}`} className="flex items-center gap-2.5 text-[12.5px]">
                  {p >= 2 ? (
                    <Tick className="h-3.5 w-3.5" />
                  ) : p === 1 ? (
                    <motion.span key={`${k}-sp${i}`} className="relative inline-flex h-3.5 w-3.5">
                      <motion.span className="absolute inset-0 flex" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.6 + i * 0.5 }}>
                        <Spinner className="h-3.5 w-3.5" />
                      </motion.span>
                      <motion.span className="absolute inset-0 flex" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.5 }}>
                        <Tick className="h-3.5 w-3.5" />
                      </motion.span>
                    </motion.span>
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full border border-white/20" />
                  )}
                  <span className="text-paper/85">{name}</span>
                  <span className="ml-auto font-mono text-[10px] text-paper/40">{what}</span>
                </li>
              ))}
            </ul>
            <Label className="mt-3">{p >= 1 ? 'Synced every hour' : 'Not connected yet'}</Label>
          </div>
        </div>

        {/* the dashboard */}
        <div className="relative">
          <span aria-hidden className="absolute -inset-4 rounded-[40px] bg-signal/15 blur-3xl" />
          <div className={cn('relative p-4 sm:p-5', built ? hotGlass : glass)}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <Label>Dashboard</Label>
                <p className="display text-xl font-semibold">{b.title}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-paper/55">This week</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {b.kpis.map(([label, value, delta], i) => (
                <div key={`${k}-${label}`} className="rounded-xl border border-white/[0.07] bg-black/25 p-3">
                  <Label className="truncate">{label}</Label>
                  <p className="display mt-1 truncate text-[1.2rem] font-semibold leading-tight sm:text-[1.45rem]">
                    {built ? <CountUp value={value} ms={1200} delay={p === 2 ? 200 + i * 200 : 0} /> : <span className="text-paper/20">—</span>}
                  </p>
                  <p className={cn('mt-0.5 font-mono text-[10px]', !built ? 'text-transparent' : delta.startsWith('-') ? 'text-[#F08272]' : 'text-emerald-300')}>{delta}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_1fr]">
              <div className="rounded-xl border border-white/[0.07] bg-black/25 p-3">
                <Label>Breakdown</Label>
                <div className="mt-3 flex h-[104px] items-end gap-2">
                  {b.bars.map(([label, v], i) => (
                    <div key={`${k}-${label}`} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                      <motion.div
                        className={cn('rounded-t-md', i === b.hot ? 'bg-signal' : 'bg-paper/25')}
                        initial={loop.reduce ? false : { height: '0%' }}
                        animate={{ height: built ? `${v}%` : '0%' }}
                        transition={{ duration: 0.7, delay: p === 2 ? 0.6 + i * 0.12 : 0, ease }}
                      />
                      <span className="mt-1.5 truncate text-center font-mono text-[8.5px] text-paper/40">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-black/25 p-3">
                <Label>Trend · 8 weeks</Label>
                <div className="mt-3">
                  <Line values={b.line} draw={built} reduce={loop.reduce} k={k} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* delivered */}
        <div className="space-y-3">
          <div className={cn('p-4 transition-opacity duration-500', glass, p < 3 && 'opacity-40')}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white/10">
                <Mail className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <Label>Scheduled report</Label>
                <p className="truncate text-[12.5px] text-paper/90">{b.email}</p>
              </div>
              {p >= 3 && (
                <Rise k={`${k}-sent`} delay={p === 3 ? 0.4 : 0} className="ml-auto flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-emerald-300">
                  <Tick className="h-3.5 w-3.5" /> Sent
                </Rise>
              )}
            </div>
          </div>
          <div className={cn('p-4 transition-colors duration-500', p >= 3 ? hotGlass : glass, p < 3 && 'opacity-40')}>
            <div className="flex items-center gap-2.5">
              <motion.span
                key={`${k}-bell-${p >= 3}`}
                className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-signal"
                animate={p >= 3 && !loop.reduce ? { rotate: [0, -14, 12, -8, 0] } : { rotate: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Bell className="h-4 w-4" />
              </motion.span>
              <div className="min-w-0">
                <Label className={p >= 3 ? 'text-signal-300' : undefined}>Alert · WhatsApp</Label>
                <p className="text-[12.5px] leading-snug text-paper/90">{p >= 3 ? b.alert : 'Alerts fire when a number crosses a line'}</p>
              </div>
            </div>
          </div>
          <div className={cn('p-4 transition-opacity duration-500', glass, p < 3 && 'opacity-40')}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-ink ring-1 ring-white/15">
                <Pip bust="head" mood={p === 3 ? 'working' : p >= 4 ? 'happy' : 'idle'} className="w-7" title="Pip" />
              </span>
              <Label>Pip · summary</Label>
            </div>
            <p className="mt-2 min-h-[3.2em] text-[12.5px] leading-snug text-paper/85">
              {p >= 3 ? p === 3 ? <Typed key={`${k}-sum`} text={b.summary} ms={1500} delay={1600} /> : b.summary : <span className="text-paper/30">—</span>}
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
