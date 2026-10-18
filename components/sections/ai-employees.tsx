'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, CalendarCheck, Headphones, Settings2, UserPlus, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { employees, guardrails } from '@/lib/content';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  support: Headphones,
  lead: UserPlus,
  booking: CalendarCheck,
  custom: Settings2,
};

export function AIEmployees() {
  const [active, setActive] = useState(employees[0].id);
  const current = employees.find((e) => e.id === active)!;

  return (
    <section id="employees" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-signal/15 blur-[140px]" />

      <div className="container-x relative">
        <SectionHeading
          dark
          index="03"
          label="AI Employees"
          title={
            <>
              Meet the team that{' '}
              <span className="accent-serif text-signal">never clocks out.</span>
            </>
          }
        >
          Each AI Employee owns a defined responsibility, works across your channels and is wired
          into your systems. Pick one to watch it work.
        </SectionHeading>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* selector + details */}
          <div>
            <div role="tablist" aria-label="AI Employees" className="grid grid-cols-2 gap-2.5">
              {employees.map((e) => {
                const Icon = icons[e.id];
                const on = e.id === active;
                return (
                  <button
                    key={e.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(e.id)}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300',
                      on
                        ? 'border-signal/60 bg-signal/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                        on ? 'bg-signal text-paper' : 'bg-white/10 text-paper/80',
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-[15px] font-semibold leading-tight">
                        {e.name}
                      </span>
                      <span className="block truncate text-xs text-paper/50">{e.role}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-7"
              >
                <Detail label="Responsibility">{current.responsibility}</Detail>
                <Detail label="Outcome">{current.outcome}</Detail>
                <div>
                  <p className="eyebrow mb-3 text-paper/40">Channels</p>
                  <div className="flex flex-wrap gap-2">
                    {current.channels.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-sm text-paper/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* transcript */}
          <div className="relative">
            <div className="rounded-[28px] border border-white/10 bg-ink-800/80 p-5 backdrop-blur sm:p-7">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal">
                    <Bot className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold leading-none">
                      {current.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-paper/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                    </p>
                  </div>
                </div>
                <span className="eyebrow text-paper/35">Sample run</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.ol
                  key={current.id}
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.28 } } }}
                  className="min-h-[340px] space-y-3"
                >
                  {current.transcript.map((s, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                      }}
                      className={cn('flex', s.who === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      {s.who === 'system' ? (
                        <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-3.5 py-2.5">
                          <span className="rounded-md bg-signal/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal-300">
                            {s.tag}
                          </span>
                          <span className="font-mono text-xs text-paper/60">{s.text}</span>
                        </div>
                      ) : (
                        <div
                          className={cn(
                            'max-w-[86%] rounded-2xl px-4 py-3 text-[15px] leading-snug',
                            s.who === 'user'
                              ? 'rounded-br-md bg-paper text-ink'
                              : 'rounded-bl-md bg-white/[0.08] text-paper',
                          )}
                        >
                          {s.text}
                        </div>
                      )}
                    </motion.li>
                  ))}
                </motion.ol>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* guardrails */}
        <Reveal>
          <div className="mt-20 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
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
              <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {guardrails.map((g) => (
                  <li key={g.title} className="border-t border-white/10 pt-4">
                    <p className="font-display text-lg font-semibold">{g.title}</p>
                    <p className="mt-1 text-[15px] leading-snug text-paper/55">{g.text}</p>
                  </li>
                ))}
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
      <p className="text-pretty text-lg leading-relaxed text-paper/90">{children}</p>
    </div>
  );
}
