'use client';

import {
  Bell,
  Boxes,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Pip } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { glass, hotGlass, Label, phaseTracker, Rise, Shell, Spinner, StepTracker, Tick, useLoop, Wire } from './kit';

/**
 * Workflow automation: a workflow canvas. A trigger fires, Pip handles the step that needs reading or
 * judgment, the next tool is updated, a person approves, and the run lands in the log. Sample values.
 */

type Step = { title: string; Icon?: LucideIcon; out: string[] };
type Flow = { name: string; runs: string; trigger: Step; ai: Step; action: Step; approval: Step & { rule: string }; notify: Step };

const flows: Flow[] = [
  {
    name: 'Invoice to accounts',
    runs: '#2041',
    trigger: { title: 'Email with a bill', Icon: Mail, out: ['Bill_Karim_Traders.pdf', '3 pages'] },
    ai: { title: 'Read the bill', out: ['Vendor: Karim Traders', 'Amount: ৳62,400', 'Due: 30 Nov'] },
    action: { title: 'Accounting', Icon: FileSpreadsheet, out: ['Bill drafted', 'Coded to Raw materials'] },
    approval: { title: 'Finance manager', rule: 'Bills over ৳50,000', out: ['Approved'] },
    notify: { title: 'WhatsApp', Icon: Send, out: ['Vendor told: paid on 30 Nov'] },
  },
  {
    name: 'Lead to CRM',
    runs: '#0877',
    trigger: { title: 'Website form', Icon: ClipboardList, out: ['Enquiry: 20 office chairs', 'Nexa Ltd'] },
    ai: { title: 'Sort and score', out: ['Budget: ৳3–4 lakh', 'Timing: this month', 'Score: hot'] },
    action: { title: 'CRM', Icon: Users, out: ['Deal created', 'Stage: new'] },
    approval: { title: 'Sales lead', rule: 'Hot leads get an owner', out: ['Assigned to Nabil'] },
    notify: { title: 'Email', Icon: Mail, out: ['Intro and quote sent'] },
  },
  {
    name: 'Leave request',
    runs: '#0312',
    trigger: { title: 'Email request', Icon: Mail, out: ['Leave: 3 days', 'From 12 Nov'] },
    ai: { title: 'Check the policy', out: ['Balance: 7 days', 'Team cover: OK', 'Policy: allowed'] },
    action: { title: 'HR sheet', Icon: FileSpreadsheet, out: ['Leave drafted', 'Calendar held'] },
    approval: { title: 'Line manager', rule: 'Every leave request', out: ['Approved'] },
    notify: { title: 'Email', Icon: Mail, out: ['Staff and team told'] },
  },
  {
    name: 'Order to dispatch',
    runs: '#5521',
    trigger: { title: 'bKash payment', Icon: CreditCard, out: ['৳18,500 received', 'Ref 8KX2…'] },
    ai: { title: 'Match the order', out: ['Order: #5521', 'Items: 3', 'Area: Mirpur'] },
    action: { title: 'ERP', Icon: Boxes, out: ['Dispatch created', 'Stock reserved'] },
    approval: { title: 'Warehouse', rule: 'Confirm before packing', out: ['Packed and ready'] },
    notify: { title: 'SMS', Icon: MessageSquare, out: ['Tracking link sent'] },
  },
];

/* Phases: map the workflow, trigger, AI step, action, approval, notify, hold. */
const durations = [2000, 1700, 2400, 1800, 2700, 1800, 2400] as const;
const phaseSteps = [0, 1, 2, 2, 3, 3, 4] as const;
const kinds = ['Trigger', 'AI step', 'Action', 'Approval', 'Notify'] as const;

function Node({ n, kind, step, phase, k, delayIn, children }: { n: number; kind: string; step: Step; phase: number; k: string; delayIn: number; children?: React.ReactNode }) {
  const active = phase === n + 1;
  const done = phase > n + 1;
  const draft = phase === 0;
  const Icon = step.Icon ?? Bell;
  return (
    <Rise k={`${k}-${n}`} delay={delayIn} className="h-full">
      <div
        className={cn(
          'relative flex h-full min-h-[178px] flex-col p-4 transition-colors duration-500',
          active ? hotGlass : glass,
          draft && 'border-dashed bg-transparent',
          active && 'shadow-[0_24px_50px_-24px_rgba(232,79,61,0.55)]',
        )}
      >
        <div className="flex items-center gap-2.5">
          {kind === 'AI step' ? (
            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-ink ring-1', active ? 'ring-signal/60' : 'ring-white/15')}>
              <Pip bust="head" mood={active ? 'working' : done ? 'happy' : 'idle'} className="w-8" title="Pip" />
            </span>
          ) : (
            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-500', active ? 'bg-signal' : done ? 'bg-white/15' : 'bg-[#2a2a30]')}>
              {kind === 'Approval' ? <UserCheck className="h-[18px] w-[18px]" /> : <Icon className="h-[18px] w-[18px]" />}
            </span>
          )}
          <div className="min-w-0">
            <Label className={active ? 'text-signal-300' : undefined}>{kind === 'AI step' ? 'AI step · Pip' : kind}</Label>
            <p className="truncate text-[13.5px] font-semibold text-paper/90">{step.title}</p>
          </div>
        </div>
        <div className="mt-3 flex-1 space-y-1.5">{children}</div>
        <div className="mt-3 flex items-center gap-2 text-[11px]">
          {done ? (
            <>
              <Tick className="h-3.5 w-3.5" />
              <span className="text-paper/60">Done</span>
            </>
          ) : active ? (
            <>
              <Spinner />
              <span className="text-paper/70">Running</span>
            </>
          ) : (
            <span className="text-paper/30">{draft ? 'Mapped' : 'Waiting'}</span>
          )}
        </div>
      </div>
    </Rise>
  );
}

function Out({ lines, show, k, stagger = 0.25 }: { lines: string[]; show: boolean; k: string; stagger?: number }) {
  if (!show) return <p className="text-[11.5px] text-paper/25">—</p>;
  return (
    <>
      {lines.map((l, i) => (
        <Rise key={`${k}-${i}`} delay={i * stagger} y={4} className="truncate rounded-md bg-black/25 px-2 py-1 font-mono text-[10.5px] text-paper/75">
          {l}
        </Rise>
      ))}
    </>
  );
}

export function WorkflowArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, flows.length);
  const f = flows[loop.tab];
  const p = loop.phase;
  const k = `${loop.tab}`;
  const order: Step[] = [f.trigger, f.ai, f.action, f.approval, f.notify];
  const approving = p === 4;

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: an automated workflow running from a trigger through an AI step, a tool update and a human approval to a notification, with each run logged"
      prompt="Pick a workflow · watch one run"
      tabs={flows.map((x) => x.name)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)] lg:items-stretch">
        {order.map((step, n) => (
          <div key={n} className="contents">
            {n > 0 && <Wire lit={p >= n + 1} flowing={p === n + 1} runKey={`${loop.key}-${n}`} />}
            <Node n={n} kind={kinds[n]} step={step} phase={p} k={k} delayIn={p === 0 ? n * 0.18 : 0}>
              {n === 3 ? (
                <>
                  <p className="text-[11.5px] leading-snug text-paper/55">Rule: {f.approval.rule}</p>
                  {approving && (
                    <div className="flex items-center gap-2 pt-1">
                      <motion.span
                        className="rounded-full bg-signal px-2.5 py-0.5 text-[11px] font-semibold text-paper"
                        animate={{ scale: [1, 1, 0.88, 1] }}
                        transition={{ duration: 1.6, times: [0, 0.6, 0.75, 1] }}
                      >
                        Approve
                      </motion.span>
                      <span className="text-[11px] text-paper/45">Waiting…</span>
                    </div>
                  )}
                  <Out lines={f.approval.out} show={p > 4} k={`${k}-ap`} />
                </>
              ) : (
                <Out lines={step.out} show={p >= n + 1} k={`${k}-${n}`} stagger={n === 1 ? 0.45 : 0.25} />
              )}
            </Node>
          </div>
        ))}
      </div>

      {/* run log */}
      <div className={cn('mt-6 p-4 sm:px-5', glass)}>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold">Run history</p>
          <Label className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            Every run logged
          </Label>
        </div>
        <ul className="mt-3 divide-y divide-white/[0.06] font-mono text-[11px]">
          <li className="flex items-center gap-3 py-2">
            {p >= 6 ? <Tick className="h-3.5 w-3.5" /> : p >= 1 ? <Spinner /> : <span className="h-3 w-3 rounded-full border border-white/20" />}
            <span className="text-paper/80">Run {f.runs}</span>
            <span className="text-paper/45">{f.name}</span>
            <span className={cn('ml-auto', p >= 6 ? 'text-emerald-300' : 'text-paper/45')}>
              {p >= 6 ? 'Success · 4.1 s' : p >= 1 ? `Running · step ${Math.min(p, 5)} of 5` : 'Ready'}
            </span>
          </li>
          {['Success · 3.8 s', 'Success · 4.4 s'].map((r, i) => (
            <li key={r} className="flex items-center gap-3 py-2 text-paper/40">
              <Tick className="h-3.5 w-3.5 opacity-60" />
              <span>Run earlier</span>
              <span className="hidden sm:inline">{f.name}</span>
              <span className="ml-auto">{i ? 'Yesterday' : '1 h ago'} · {r}</span>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
