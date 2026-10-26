'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, FlaskConical, RotateCcw, ScrollText, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { AgentTile, type AgentRole } from '@/components/brand/agent/tile';
import { ControlRoom } from '@/components/brand/agent/control-room';
import { Hub, hubSystems } from '@/components/brand/agent/hub';
import { employees, guardrails } from '@/lib/content';
import { cn } from '@/lib/utils';

const roleFor = { support: 'support', lead: 'lead', booking: 'booking', custom: 'custom' } as const;

const guardIcons: LucideIcon[] = [ShieldCheck, UserCheck, ScrollText, FlaskConical];

export function AIEmployees() {
  const [active, setActive] = useState(employees[0].id);
  const [run, setRun] = useState(0); // bumping this replays the sample conversation
  const current = employees.find((e) => e.id === active)!;
  const role = roleFor[current.id as keyof typeof roleFor] as Exclude<AgentRole, 'guard'>;

  return (
    <section id="employees" className="grain relative overflow-hidden border-t border-white/10 bg-ink py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-signal/15 blur-[150px]" />
      <div className="pointer-events-none absolute -left-52 bottom-40 h-[420px] w-[420px] rounded-full bg-signal/10 blur-[140px]" />

      <div className="container-x relative">
        {/* heading + the whole crew */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
          <SectionHeading
            dark
            label="AI Employees"
            title={
              <>
                Meet the team that{' '}
                <span className="accent-serif text-signal">never clocks out.</span>
              </>
            }
          >
            Each AI Employee owns a defined responsibility, works across your channels and is wired
            into your systems. Pick a role to see what it can actually do.
          </SectionHeading>
          <Reveal delay={0.1}>
            <div className="px-3 pt-6 sm:px-10"><ControlRoom /></div>
          </Reveal>
        </div>

        {/* role selector */}
        <div role="tablist" aria-label="AI Employees" className="mt-14 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:mt-16">
          {employees.map((e) => {
            const on = e.id === active;
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setActive(e.id);
                  setRun((n) => n + 1);
                }}
                className={cn(
                  'group relative flex items-center gap-3 overflow-hidden rounded-[22px] border p-3 pr-4 text-left transition-all duration-300 sm:p-3.5',
                  on
                    ? 'border-signal/70 bg-gradient-to-br from-signal/20 to-signal/[0.04] shadow-[0_18px_50px_-24px_rgba(232,79,61,0.9)]'
                    : 'border-white/10 bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]',
                )}
              >
                <AgentTile
                  role={roleFor[e.id as keyof typeof roleFor]}
                  className={cn(
                    'h-12 w-12 transition-all duration-300 sm:h-14 sm:w-14',
                    on ? 'scale-105' : 'opacity-70 grayscale-[0.4] group-hover:opacity-100 group-hover:grayscale-0',
                  )}
                />
                <span className="min-w-0">
                  <span className="block truncate font-display text-[15px] font-semibold leading-tight sm:text-base">
                    {e.name}
                  </span>
                  <span className={cn('block truncate text-xs', on ? 'text-paper/70' : 'text-paper/45')}>
                    {e.role}
                  </span>
                </span>
                {on && (
                  <motion.span
                    layoutId="employee-underline"
                    className="absolute inset-x-5 bottom-0 h-[3px] rounded-full bg-signal"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* stage */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          {/* character + brief */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {current.name}
              </span>
              <span className="eyebrow text-paper/30">How it plugs in</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                {/* full diagram from sm up; compact list on phones where the text would be tiny */}
                <div className="hidden sm:block">
                  <Hub role={role} channels={current.channels} />
                </div>
                <div className="sm:hidden">
                  <div className="flex items-center gap-4">
                    <AgentTile role={role} className="h-16 w-16" />
                    <div>
                      <p className="font-display text-lg font-semibold leading-tight">{current.name}</p>
                      <p className="text-sm text-paper/55">{current.role}</p>
                    </div>
                  </div>
                  <p className="eyebrow mb-2 mt-6 text-paper/40">Channels in</p>
                  <div className="flex flex-wrap gap-2">
                    {current.channels.map((c) => (
                      <span key={c} className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-sm text-paper/85">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="eyebrow mb-2 mt-5 text-paper/40">Systems updated</p>
                  <ul className="space-y-2">
                    {hubSystems[role].map((o) => (
                      <li key={o.label} className="flex items-baseline gap-3 border-l-2 border-signal pl-3 text-sm">
                        <span className="font-semibold">{o.label}</span>
                        <span className="font-mono text-xs text-paper/50">{o.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="mt-7"
              >
                <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <Detail label="Responsibility">{current.responsibility}</Detail>
                  <Detail label="Outcome">{current.outcome}</Detail>
                </div>
                <div className="mt-6">
                  <p className="eyebrow mb-3 text-paper/40">What it can do</p>
                  <ul className="flex flex-wrap gap-2">
                    {current.canDo.map((c) => (
                      <li key={c} className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-sm text-paper/85">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* conversation */}
          <div className="flex flex-col rounded-[32px] border border-white/10 bg-ink-800/80 p-5 backdrop-blur sm:p-7">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <AgentTile role={role} className="h-10 w-10" badge={false} />
                <div>
                  <p className="font-display text-[15px] font-semibold leading-none">{current.name}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-paper/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · replies in seconds
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRun((n) => n + 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/55 transition-colors hover:border-white/30 hover:text-paper"
              >
                <RotateCcw className="h-3 w-3" />
                Replay
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.ol
                key={`${current.id}-${run}`}
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.42, delayChildren: 0.15 } } }}
                className="min-h-[360px] flex-1 space-y-3"
              >
                {current.transcript.map((s, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.98 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
                    }}
                    className={cn('flex items-end gap-2.5', s.who === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {s.who === 'system' ? (
                      <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-3.5 py-2.5">
                        <span className="rounded-md bg-signal/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal-300">
                          {s.tag}
                        </span>
                        <span className="font-mono text-xs text-paper/60">{s.text}</span>
                      </div>
                    ) : (
                      <>
                        {s.who === 'agent' && <AgentTile role={role} className="mb-0.5 h-7 w-7" badge={false} />}
                        <div
                          className={cn(
                            'max-w-[84%] rounded-2xl px-4 py-3 text-[15px] leading-snug',
                            s.who === 'user'
                              ? 'rounded-br-md bg-paper text-ink'
                              : 'rounded-bl-md bg-white/[0.08] text-paper',
                          )}
                        >
                          {s.text}
                        </div>
                      </>
                    )}
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>

            <div className="mt-5 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-5 pr-2" aria-hidden>
              <span className="flex-1 text-sm text-paper/35">Message {current.name}…</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal">
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-center text-[11px] text-paper/30">Illustrative sample run — not a live conversation.</p>
          </div>
        </div>

        {/* guardrails */}
        <Reveal>
          <div className="relative mt-20 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-signal/15 blur-[90px]" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid grid-cols-1 items-start gap-6">
                <AgentTile role="guard" surface="dark" className="mx-auto h-28 w-28 sm:h-32 sm:w-32" />
                <div>
                  <p className="eyebrow mb-4 text-signal-300">Built responsibly</p>
                  <h3 className="display text-balance text-3xl font-semibold leading-tight">
                    Capable, and <span className="accent-serif text-signal">accountable.</span>
                  </h3>
                  <p className="mt-4 text-paper/60">
                    AI Employees aren’t fully autonomous in every context — and they shouldn’t be.
                    Every deployment is built with explicit limits.
                  </p>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {guardrails.map((g, i) => {
                  const Icon = guardIcons[i % guardIcons.length];
                  return (
                    <li
                      key={g.title}
                      className="group rounded-2xl border border-white/10 bg-ink/50 p-5 transition-colors hover:border-signal/40"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/15 text-signal-300 transition-colors group-hover:bg-signal group-hover:text-paper">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="mt-4 font-display text-lg font-semibold">{g.title}</p>
                      <p className="mt-1 text-[15px] leading-snug text-paper/55">{g.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-2 text-paper/40">{label}</p>
      <p className="text-pretty text-[17px] leading-relaxed text-paper/90">{children}</p>
    </div>
  );
}
