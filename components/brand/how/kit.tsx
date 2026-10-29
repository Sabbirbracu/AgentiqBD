'use client';

import { Check } from 'lucide-react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared pieces for the How it works motion graphics: the phase loop, the tab bar and step tracker every
 * graphic sits in, and small animated primitives (wires, typing, counting).
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export const glass = 'rounded-2xl border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]';
export const hotGlass = 'rounded-2xl border border-signal/40 bg-signal/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]';

/** Drives a graphic: phases advance on their own while it is on screen, then the next tab starts. */
export function useLoop(durations: readonly number[], tabCount = 1) {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const last = durations.length - 1;
  const [s, setS] = useState({ tab: 0, phase: 0 });

  useEffect(() => {
    if (reduce) setS((x) => ({ ...x, phase: last }));
  }, [reduce, last]);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(
      () => setS((x) => (x.phase < last ? { ...x, phase: x.phase + 1 } : { tab: (x.tab + 1) % tabCount, phase: 0 })),
      durations[s.phase],
    );
    return () => clearTimeout(t);
  }, [s, reduce, inView, last, tabCount, durations]);

  return {
    ...s,
    ref,
    inView,
    reduce,
    durations,
    key: `${s.tab}-${s.phase}`,
    pick: (tab: number) => setS({ tab, phase: reduce ? last : 0 }),
  };
}
export type Loop = ReturnType<typeof useLoop>;

/** Tracker props for a phase loop: `phaseSteps[p]` is the step lit during phase p (steps.length = all done). */
export function phaseTracker(loop: Loop, phaseSteps: readonly number[]) {
  const step = phaseSteps[loop.phase];
  const same = phaseSteps.map((st, p) => (st === step ? p : -1)).filter((p) => p >= 0);
  const at = same.indexOf(loop.phase);
  return { current: step, from: at / same.length, to: (at + 1) / same.length, ms: loop.durations[loop.phase], runKey: loop.key, inView: loop.inView };
}

/* ───────────────────────── Frame ───────────────────────── */

export function Shell({
  rootRef,
  label,
  prompt,
  tabs,
  tab = 0,
  onPick,
  tracker,
  children,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  label: string;
  prompt: string;
  tabs?: string[];
  tab?: number;
  onPick?: (i: number) => void;
  tracker: ReactNode;
  children: ReactNode;
}) {
  const id = useId();
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = strip.current?.children[tab] as HTMLElement | undefined;
    const s = strip.current;
    if (!s || !el || s.scrollWidth <= s.clientWidth) return;
    s.scrollTo({ left: el.offsetLeft - (s.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
  }, [tab]);

  return (
    <div ref={rootRef} className="relative text-paper" role="group" aria-label={label}>
      <div className="relative flex flex-col items-center">
        <p className="eyebrow text-center text-paper/45">{prompt}</p>
        {tabs && (
          <div className="mt-4 max-w-full rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
            <div ref={strip} className="relative flex gap-0.5 overflow-x-auto rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((t, i) => {
                const on = i === tab;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onPick?.(i)}
                    className={cn('relative shrink-0 rounded-full px-4 py-2 text-[13.5px] transition-colors sm:px-5', on ? 'text-ink' : 'text-paper/55 hover:text-paper')}
                  >
                    {on && <motion.span layoutId={`tab-${id}`} className="absolute inset-0 rounded-full bg-paper shadow-[0_6px_20px_-6px_rgba(252,252,244,0.45)]" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                    <span className="relative font-medium">{t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="relative mt-12 sm:mt-14">{children}</div>
      {tracker}
    </div>
  );
}

/** The page's four How it works steps, lit in sync with the graphic. `counts` shows how many items sit at each step instead. */
export function StepTracker({
  steps,
  current = steps.length,
  from = 0,
  to = 1,
  ms = 1000,
  runKey = '',
  inView = true,
  counts,
  countLabel = 'live',
}: {
  steps: string[];
  current?: number;
  from?: number;
  to?: number;
  ms?: number;
  runKey?: string;
  inView?: boolean;
  counts?: number[];
  countLabel?: string;
}) {
  return (
    <div className="relative mt-12 rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur sm:px-7">
      <ol className="grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4">
        {steps.map((title, i) => {
          const n = counts?.[i] ?? 0;
          const isCurrent = counts ? n > 0 : i === current;
          const complete = !counts && i < current;
          return (
            <li key={title} className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors duration-500',
                    isCurrent ? 'bg-signal text-paper' : complete ? 'bg-white/15 text-paper' : 'bg-white/[0.06] text-paper/40',
                  )}
                >
                  {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : String(i + 1).padStart(2, '0')}
                </span>
                <p className={cn('text-[13px] leading-snug transition-colors duration-500 lg:truncate', isCurrent ? 'text-paper' : complete ? 'text-paper/70' : 'text-paper/40')}>{title}</p>
                {counts && (
                  <span
                    title={`${n} ${countLabel}`}
                    className={cn('ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 font-mono text-[10px] transition-colors', n ? 'bg-signal/15 text-signal-300' : 'bg-white/[0.05] text-paper/30')}
                  >
                    {n}
                  </span>
                )}
              </div>
              <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-white/[0.07]">
                {counts ? (
                  <div className={cn('h-full origin-left bg-signal transition-transform duration-500')} style={{ transform: `scaleX(${Math.min(n / 2, 1)})` }} />
                ) : i === current ? (
                  <motion.div
                    key={runKey}
                    className="h-full origin-left bg-signal"
                    initial={{ scaleX: from }}
                    animate={{ scaleX: inView ? to : from }}
                    transition={{ duration: ms / 1000, ease: 'linear' }}
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
  );
}

/* ───────────────────────── Primitives ───────────────────────── */

/** A connector that lights up and carries a glowing packet; horizontal on desktop, vertical on mobile. */
export function Wire({ lit, flowing, runKey, delay = 0, className }: { lit: boolean; flowing?: boolean; runKey: string; delay?: number; className?: string }) {
  return (
    <div aria-hidden className={cn('relative flex items-center justify-center', className)}>
      <div className="relative hidden h-px w-full bg-white/10 lg:block">
        <span className="absolute -left-[3px] -top-[3px] h-[7px] w-[7px] rounded-full border border-white/25 bg-ink-800" />
        <span className={cn('absolute -right-[3px] -top-[3px] h-[7px] w-[7px] rounded-full border transition-colors duration-500', lit ? 'border-signal bg-signal' : 'border-white/25 bg-ink-800')} />
        <motion.span className="absolute inset-0 origin-left bg-gradient-to-r from-signal/20 to-signal/70" initial={false} animate={{ scaleX: lit ? 1 : 0 }} transition={{ duration: 0.7, ease }} />
        {flowing && (
          <motion.span
            key={runKey}
            className="absolute top-1/2 h-[2px] w-14 -translate-x-full -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-signal/60 to-signal"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.1, delay, ease: 'easeInOut' }}
          >
            <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-signal shadow-[0_0_14px_4px_rgba(232,79,61,0.55)]" />
          </motion.span>
        )}
      </div>
      <div className="relative h-7 w-px bg-white/10 lg:hidden">
        <motion.span className="absolute inset-0 origin-top bg-gradient-to-b from-signal/20 to-signal/70" initial={false} animate={{ scaleY: lit ? 1 : 0 }} transition={{ duration: 0.7, ease }} />
        {flowing && (
          <motion.span
            key={runKey}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_14px_4px_rgba(232,79,61,0.55)]"
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
          />
        )}
      </div>
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <span className={cn('h-3 w-3 shrink-0 animate-spin rounded-full border-[1.5px] border-white/20 border-t-signal', className)} />;
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/45', className)}>{children}</p>;
}

/** Fades and rises in when mounted (or when `k` changes). */
export function Rise({ k, delay = 0, y = 8, className, children }: { k?: string; delay?: number; y?: number; className?: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div key={k} className={className} initial={reduce ? false : { opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** Types `text` out over `ms`, after `delay` ms. */
export function Typed({ text, ms = 1200, delay = 0, className, caret = true }: { text: string; ms?: number; delay?: number; className?: string; caret?: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      const every = Math.max(14, ms / Math.max(text.length, 1));
      id = setInterval(() => setN((x) => (x >= text.length ? x : x + 1)), every);
    }, delay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [text, ms, delay, reduce]);
  return (
    <span className={className}>
      {text.slice(0, n)}
      {caret && n < text.length && <span className="type-caret" />}
    </span>
  );
}

/** Counts the number inside `value` (e.g. "৳48.2L", "1,240") up from `from` (default zero). */
export function CountUp({ value, from = 0, ms = 1100, delay = 0, className }: { value: string; from?: number; ms?: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const [shown, setShown] = useState(reduce || !m ? value : `${m[1]}${from.toLocaleString('en-US')}${m[3]}`);
  useEffect(() => {
    if (!m || reduce) {
      setShown(value);
      return;
    }
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    const commas = num.includes(',');
    const c = animate(from, target, {
      duration: ms / 1000,
      delay: delay / 1000,
      ease: 'easeOut',
      onUpdate: (v) => {
        const n = decimals ? v.toFixed(decimals) : Math.round(v).toString();
        setShown(`${pre}${commas ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n}${post}`);
      },
    });
    return () => c.stop();
  }, [value, from, ms, delay, reduce]);
  return <span className={className}>{shown}</span>;
}

/** Small "done" tick. */
export function Tick({ className }: { className?: string }) {
  return (
    <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/90', className)}>
      <Check className="h-2.5 w-2.5 text-ink" strokeWidth={3.5} />
    </span>
  );
}
