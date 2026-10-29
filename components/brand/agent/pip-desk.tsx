'use client';

import { Check, ShieldCheck } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Spinner, Wire } from '@/components/brand/how/kit';
import { Pip, type PipMood } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { AGENT, deskScenes, type DeskJob, type DeskRow, type DeskSay } from './desk-scenes';

/**
 * Pip desk: the animated graphic under a service's How it works steps. Each tab runs three jobs, one per
 * Pip desk: it arrives, Pip works it out, a system updates, and a person steps in where the job needs one.
 * The scene (tabs, wording, tracker) comes from desk-scenes.ts.
 */

const avatarTones = ['#3E6E8E', '#8B4A6B', '#4F7A55', '#9A5B34', '#5B5A8E', '#7A7240', '#2F7A74'];

/** Phase timings (ms): arrive → work it out → act in the system → done, with an extra approval beat when needed. */
const phaseDurations = (job: DeskJob) => (job.approve ? [1300, 1800, 1500, 1500, 1500] : [1300, 1800, 1500, 1800]);
const HOLD = 1800; // pause on the finished board before the next tab
const ease = [0.22, 1, 0.36, 1] as const;

const fill = (t: string, job: DeskJob) => t.replace('{ch}', job.ch).replace('{sys}', job.sys).replace('{agent}', AGENT);

type RowState = 'idle' | 'active' | 'done';

const isFinished = (job: DeskJob, state: RowState, phase: number) =>
  state === 'done' || (state === 'active' && phase >= phaseDurations(job).length - 1);

/* ───────────────────────── Pieces ───────────────────────── */

/** Re-plays a short rise-in whenever `k` changes. Enter-only, so a new status never waits on the old one leaving. */
function Swap({ k, children, className }: { k: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div key={k} className={className} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>
      {children}
    </motion.div>
  );
}

function Avatar({ who }: { who: DeskJob['who'] }) {
  if (typeof who !== 'string') {
    const Icon = who;
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#2a2a30] text-paper/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <Icon className="h-[17px] w-[17px]" strokeWidth={2} />
      </span>
    );
  }
  const tone = avatarTones[(who.charCodeAt(0) + (who.charCodeAt(1) || 0)) % avatarTones.length];
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-paper" style={{ backgroundColor: tone }}>
      {who}
    </span>
  );
}

function RequestCard({ job, tab, row, say, state, phase, k }: { job: DeskJob; tab: string; row: DeskRow; say: DeskSay; state: RowState; phase: number; k: string }) {
  const active = state === 'active';
  return (
    <div
      className={cn(
        'relative rounded-2xl border p-3.5 transition-[border-color,background-color,opacity] duration-500',
        active ? 'border-signal/40 bg-signal/[0.07]' : 'border-white/10 bg-white/[0.035]',
        state === 'idle' && 'opacity-60',
      )}
    >
      <Swap k={k} className="flex items-start gap-3">
        <Avatar who={job.who} />
        <div className="min-w-0 flex-1">
          <p className={cn('font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors', active ? 'text-signal-300' : 'text-paper/45')}>
            {tab} · {job.ch}
          </p>
          <p className="mt-1 text-[13.5px] leading-snug text-paper/90">{job.msg}</p>
          <div className="mt-2 h-4">
            {state === 'done' ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-emerald-400/90">
                <Check className="h-3 w-3" strokeWidth={3} />
                {say.handled} {AGENT} · {row.desk}
              </motion.p>
            ) : active ? (
              <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/45">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                {phase === 0 ? say.fresh : 'In progress'}
              </p>
            ) : (
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/30">Queued</p>
            )}
          </div>
        </div>
      </Swap>
    </div>
  );
}

function AgentStatus({ job, say, state, phase }: { job: DeskJob; say: DeskSay; state: RowState; phase: number }) {
  if (state === 'idle') {
    return (
      <Swap k="idle" className="flex items-center gap-2 text-[12.5px] text-paper/40">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        Ready for the next one
      </Swap>
    );
  }
  if (isFinished(job, state, phase)) {
    return (
      <Swap k="done" className="flex items-center gap-2 text-[12.5px] text-paper/80">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/90">
          <Check className="h-2.5 w-2.5 text-ink" strokeWidth={3.5} />
        </span>
        {job.approve ? say.doneApproved : say.done}
      </Swap>
    );
  }
  if (phase === 3 && job.approve) {
    return (
      <Swap k="approve" className="flex min-w-0 items-center gap-2 text-[12.5px] text-paper/85">
        <ShieldCheck className="h-4 w-4 shrink-0 text-signal-300" />
        <span className="min-w-0 flex-1 leading-snug">{job.approve}</span>
        <motion.span
          className="shrink-0 rounded-full bg-signal px-2.5 py-0.5 text-[11px] font-semibold text-paper"
          animate={{ scale: [1, 1, 0.9, 1], boxShadow: ['0 0 0 0 rgba(232,79,61,0.6)', '0 0 0 8px rgba(232,79,61,0)', '0 0 0 0 rgba(232,79,61,0)', '0 0 0 0 rgba(232,79,61,0)'] }}
          transition={{ duration: 1.3, times: [0, 0.5, 0.8, 1] }}
        >
          {job.cta ?? 'Approve'}
        </motion.span>
      </Swap>
    );
  }
  const text = phase === 0 ? fill(say.arrive, job) : phase === 1 ? `${job.work}…` : fill(say.act, job);
  return (
    <Swap k={`p${phase}`} className="flex min-w-0 items-center gap-2 text-[12.5px]">
      {phase === 0 ? <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-signal" /> : <Spinner />}
      <span className={cn('truncate', phase > 0 ? 'desk-shimmer' : 'text-paper/85')}>{text}</span>
    </Swap>
  );
}

function AgentCard({ row, job, say, mic, state, phase, reduce }: { row: DeskRow; job: DeskJob; say: DeskSay; mic?: boolean; state: RowState; phase: number; reduce: boolean }) {
  const active = state === 'active';
  const total = phaseDurations(job).length;
  const progress = state === 'done' ? 1 : active ? (phase + 1) / total : 0;
  const mood: PipMood =
    state === 'idle' ? 'idle' : isFinished(job, state, phase) ? 'happy' : phase === 0 ? 'focused' : job.approve && phase === 3 ? 'waiting' : 'working';
  return (
    <div className="relative">
      {active && !reduce && (
        <motion.div layoutId="desk-glow" aria-hidden className="pointer-events-none absolute -inset-4 rounded-[36px] bg-signal/[0.16] blur-2xl" transition={{ duration: 0.8, ease }} />
      )}
      <div
        className={cn(
          'relative overflow-hidden rounded-[22px] border transition-[border-color,background-color,opacity] duration-500',
          active
            ? 'border-signal/45 bg-gradient-to-b from-[#1d1716] to-[#121214] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-30px_rgba(232,79,61,0.45)]'
            : 'border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
          state === 'idle' && 'opacity-75',
        )}
      >
        <div className="flex">
          {/* Pip at the desk; the desk strip along the card's bottom is the desk front */}
          <div className="relative flex w-[100px] shrink-0 items-end justify-center pt-3 sm:w-[124px] lg:w-[108px] xl:w-[124px]">
            <span
              aria-hidden
              className={cn('absolute left-1/2 top-4 h-24 w-24 -translate-x-1/2 rounded-full bg-signal/40 blur-[38px] transition-opacity duration-700', active ? 'opacity-100' : 'opacity-0')}
            />
            <Pip mood={mood} mic={mic} title={`${AGENT} at the ${row.desk} desk`} className="relative mb-2 w-[86px] sm:w-[100px] lg:w-[92px] xl:w-[100px]" />
          </div>
          <div className="min-w-0 flex-1 py-4 pb-6 pr-4 sm:py-5 sm:pb-7 sm:pr-5">
            <div className="flex items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-2">
                <span className="display text-[19px] font-semibold leading-none text-paper">{AGENT}</span>
                <span className="truncate rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-signal-300">{row.desk}</span>
              </p>
              <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/40">
                <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'animate-pulse bg-emerald-400' : 'bg-emerald-500/70')} />
                {active ? 'Working' : 'Online'}
              </span>
            </div>
            <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/45">{row.tagline}</p>
            <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex lg:hidden xl:flex">
              {row.skills.map((s) => (
                <li key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-paper/60">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex min-h-9 items-center rounded-xl border border-white/[0.07] bg-black/25 px-3 py-1.5">
              <AgentStatus job={job} say={say} state={state} phase={phase} />
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2.5 border-t border-white/10 bg-gradient-to-b from-[#232327] to-[#0c0c0e]">
          <motion.div
            className={cn('absolute inset-x-0 bottom-0 h-[2px] origin-left', state === 'done' ? 'bg-emerald-500/50' : 'bg-gradient-to-r from-signal/40 to-signal')}
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.6, ease }}
          />
        </div>
      </div>
    </div>
  );
}

function SystemCard({ job, say, state, phase, k }: { job: DeskJob; say: DeskSay; state: RowState; phase: number; k: string }) {
  const writing = state === 'active' && phase === 2;
  const held = state === 'active' && phase === 3 && Boolean(job.approve);
  const done = isFinished(job, state, phase);
  const hot = state === 'active' && phase >= 2;
  const Icon = job.Icon;
  return (
    <div
      className={cn(
        'relative rounded-2xl border p-3.5 transition-[border-color,background-color,opacity] duration-500',
        hot ? 'border-white/20 bg-white/[0.06]' : 'border-white/10 bg-white/[0.035]',
        state === 'idle' && 'opacity-60',
      )}
    >
      <Swap k={k} className="flex items-center gap-3">
        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-500', hot ? 'bg-signal' : 'bg-[#2a2a30]')}>
          <Icon className="h-[18px] w-[18px] text-paper" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-semibold text-paper/90">{job.sys}</p>
          <div className="mt-1 h-4">
            {done ? (
              <motion.p initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5 truncate text-[11.5px] text-paper/75">
                <Check className="h-3 w-3 shrink-0 text-emerald-400" strokeWidth={3} />
                <span className="truncate">{job.result}</span>
              </motion.p>
            ) : held ? (
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-signal-300">Waiting on a person</p>
            ) : writing ? (
              <p className="desk-shimmer font-mono text-[9.5px] uppercase tracking-[0.14em]">{say.writing}</p>
            ) : (
              <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/35">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                Connected
              </p>
            )}
          </div>
        </div>
      </Swap>
    </div>
  );
}

/* ───────────────────────── Desk ───────────────────────── */

const grid =
  'lg:grid-cols-[minmax(0,14rem)_2.5rem_minmax(0,1fr)_2.5rem_minmax(0,13rem)] xl:grid-cols-[minmax(0,17rem)_3.5rem_minmax(0,1fr)_3.5rem_minmax(0,16rem)]';

export function PipDesk({ id, steps: howSteps, className }: { id: string; steps: string[]; className?: string }) {
  const scene = deskScenes[id];
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  // row 3 = every job on the board handled (also the resting state when motion is reduced)
  const [s, setS] = useState({ tab: 0, row: reduce ? 3 : 0, phase: 0 });
  const tab = scene.tabs[s.tab];
  const job = s.row < 3 ? tab.jobs[s.row] : undefined;
  const durations = job ? phaseDurations(job) : [HOLD];

  useEffect(() => {
    if (reduce) setS((x) => ({ ...x, row: 3, phase: 0 }));
  }, [reduce]);

  useEffect(() => {
    if (reduce || !inView) return;
    const current = s.row < 3 ? phaseDurations(scene.tabs[s.tab].jobs[s.row]) : [HOLD];
    const t = setTimeout(() => {
      setS((x) => {
        if (x.phase + 1 < current.length) return { ...x, phase: x.phase + 1 };
        if (x.row < 3) return { ...x, row: x.row + 1, phase: 0 };
        return { tab: (x.tab + 1) % scene.tabs.length, row: 0, phase: 0 };
      });
    }, current[s.phase]);
    return () => clearTimeout(t);
  }, [s, reduce, inView, scene]);

  const tabs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const strip = tabs.current;
    const el = strip?.children[s.tab] as HTMLElement | undefined;
    if (!strip || !el || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [s.tab, reduce]);

  const pick = (i: number) => setS({ tab: i, row: reduce ? 3 : 0, phase: 0 });
  const runKey = `${s.tab}-${s.row}-${s.phase}`;

  // Tracker: which step each phase lights. Phases past "act" (approval and finish) share the last entry.
  const labels = scene.steps ?? howSteps;
  const map = scene.phaseSteps ?? [0, 1, 2, 3];
  const stepOf = (p: number) => map[Math.min(p, 3)];
  const step = s.row === 3 ? labels.length : stepOf(s.phase);
  const sameStep = durations.map((_, p) => p).filter((p) => stepOf(p) === step);
  const at = sameStep.indexOf(s.phase);
  const barFrom = s.row < 3 && at >= 0 ? at / sameStep.length : 0;
  const barTo = s.row < 3 && at >= 0 ? (at + 1) / sameStep.length : 1;
  const columns = scene.columns.map((c) => c.replace('{agent}', AGENT));

  return (
    <div ref={ref} className={cn('relative text-paper', className)} role="group" aria-label={scene.label}>
      {/* tabs */}
      <div className="relative flex flex-col items-center">
        <p className="eyebrow text-paper/45">{scene.prompt}</p>
        <div className="mt-4 max-w-full rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
          <div ref={tabs} className="relative flex gap-0.5 overflow-x-auto rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {scene.tabs.map((t, i) => {
              const on = i === s.tab;
              return (
                <button
                  key={t.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(i)}
                  className={cn('relative shrink-0 rounded-full px-4 py-2 text-[13.5px] transition-colors sm:px-5', on ? 'text-ink' : 'text-paper/55 hover:text-paper')}
                >
                  {on && <motion.span layoutId={`desk-tab-${id}`} className="absolute inset-0 rounded-full bg-paper shadow-[0_6px_20px_-6px_rgba(252,252,244,0.45)]" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                  <span className="relative font-medium">{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* board */}
      <div className="relative mt-12 sm:mt-14">
        <div className={cn('mb-4 hidden lg:grid', grid)}>
          <p className="eyebrow text-paper/45">{columns[0]}</p>
          <span />
          <p className="eyebrow text-center text-signal-300">{columns[1]}</p>
          <span />
          <p className="eyebrow text-right text-paper/45">{columns[2]}</p>
        </div>

        <div className="space-y-4 lg:space-y-5">
          {scene.rows.map((row, i) => {
            const rowJob = tab.jobs[i];
            const state: RowState = i < s.row ? 'done' : i === s.row ? 'active' : 'idle';
            const phase = state === 'active' ? s.phase : 0;
            const doneSys = state === 'done' || (state === 'active' && phase >= 2);
            return (
              <div
                key={row.desk}
                className={cn(
                  'grid items-center',
                  grid,
                  // on small screens only the job in progress is shown, stacked vertically
                  !reduce && s.row < 3 && state !== 'active' && 'hidden lg:grid',
                )}
              >
                <RequestCard job={rowJob} tab={tab.name} row={row} say={scene.say} state={state} phase={phase} k={`${s.tab}`} />
                <Wire lit={state !== 'idle'} flowing={state === 'active' && phase === 0} runKey={`${runKey}-in`} />
                <AgentCard row={row} job={rowJob} say={scene.say} mic={scene.mic} state={state} phase={phase} reduce={reduce} />
                <Wire lit={doneSys} flowing={state === 'active' && phase === 2} runKey={`${runKey}-out`} />
                <SystemCard job={rowJob} say={scene.say} state={state} phase={phase} k={`${s.tab}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* the four steps, in sync */}
      <div className="relative mt-12 rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur sm:px-7">
        <ol className="grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4">
          {labels.map((title, i) => {
            const complete = s.row === 3 || i < step;
            const current = s.row < 3 && i === step;
            return (
              <li key={title} className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors duration-500',
                      current ? 'bg-signal text-paper' : complete ? 'bg-white/15 text-paper' : 'bg-white/[0.06] text-paper/40',
                    )}
                  >
                    {complete && !current ? <Check className="h-3 w-3" strokeWidth={3} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <p className={cn('text-[13px] leading-snug transition-colors duration-500 lg:truncate', current ? 'text-paper' : complete ? 'text-paper/70' : 'text-paper/40')}>{title}</p>
                </div>
                <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-white/[0.07]">
                  {current ? (
                    <motion.div
                      key={runKey}
                      className="h-full origin-left bg-signal"
                      initial={{ scaleX: barFrom }}
                      animate={{ scaleX: inView ? barTo : barFrom }}
                      transition={{ duration: durations[s.phase] / 1000, ease: 'linear' }}
                    />
                  ) : (
                    <div className={cn('h-full origin-left transition-transform duration-500', complete ? 'scale-x-100 bg-white/30' : 'scale-x-0')} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
