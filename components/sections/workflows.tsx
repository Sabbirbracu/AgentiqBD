'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { workflows } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Workflows() {
  const [active, setActive] = useState(workflows[0].id);
  const wf = workflows.find((w) => w.id === active)!;

  return (
    <section id="workflows" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x relative">
        <SectionHeading
          label="Workflow demonstrations"
          title={
            <>
              From scattered steps to{' '}
              <span className="accent-serif text-signal">one connected flow.</span>
            </>
          }
        >
          The expensive part of most work is the hand-offs between people and tools. Here is how
          three common processes change, end to end.
        </SectionHeading>

        <div className="mt-14 flex flex-wrap gap-2" role="tablist" aria-label="Workflow examples">
          {workflows.map((w) => (
            <button
              key={w.id}
              role="tab"
              aria-selected={w.id === active}
              onClick={() => setActive(w.id)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300',
                w.id === active
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/15 text-ink/65 hover:border-ink/40 hover:text-ink',
              )}
            >
              {w.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8 overflow-hidden rounded-[28px] border border-ink/10 bg-paper-50 shadow-[0_30px_80px_-50px_rgba(10,10,11,0.4)]"
          >
            <div className="p-6 sm:p-10">
              <h3 className="display text-balance text-3xl font-semibold leading-tight sm:text-4xl">
                {wf.title}
              </h3>

              {/* pipeline */}
              <ol className="relative mt-12 grid gap-4 md:grid-cols-4 md:gap-5">
                {wf.nodes.map((n, i) => (
                  <li key={n} className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.45 }}
                      className={cn(
                        'relative h-full rounded-2xl border p-5',
                        i === wf.nodes.length - 1
                          ? 'border-signal bg-signal text-paper'
                          : 'border-ink/10 bg-paper text-ink',
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-xs tracking-widest',
                          i === wf.nodes.length - 1 ? 'text-paper/70' : 'text-ink/35',
                        )}
                      >
                        0{i + 1}
                      </span>
                      <p className="mt-6 font-display text-xl font-semibold leading-tight">{n}</p>
                    </motion.div>
                    {i < wf.nodes.length - 1 && (
                      <>
                        <svg
                          className="absolute -right-5 top-1/2 z-10 hidden h-3 w-5 -translate-y-1/2 md:block"
                          viewBox="0 0 20 12"
                          aria-hidden
                        >
                          <line
                            x1="0"
                            y1="6"
                            x2="20"
                            y2="6"
                            stroke="#E84F3D"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            className="animate-dash"
                          />
                        </svg>
                        <svg
                          className="mx-auto mt-4 block h-5 w-3 md:hidden"
                          viewBox="0 0 12 20"
                          aria-hidden
                        >
                          <line
                            x1="6"
                            y1="0"
                            x2="6"
                            y2="20"
                            stroke="#E84F3D"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            className="animate-dash"
                          />
                        </svg>
                      </>
                    )}
                  </li>
                ))}
              </ol>

              <div className="mt-12 grid gap-4 border-t border-ink/10 pt-8 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                <div className="rounded-2xl bg-ink/[0.04] p-6">
                  <p className="eyebrow mb-4 text-ink/45">Before</p>
                  <ul className="space-y-3">
                    {wf.before.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-snug text-ink/70">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowRight className="mx-auto hidden h-5 w-5 self-center text-signal md:block" aria-hidden />
                <div className="rounded-2xl border border-signal/30 bg-signal/[0.06] p-6">
                  <p className="eyebrow mb-4 text-signal">After</p>
                  <ul className="space-y-3">
                    {wf.after.map((a) => (
                      <li key={a} className="flex gap-3 text-[15px] font-medium leading-snug">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" strokeWidth={3} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-pretty font-display text-xl font-semibold leading-snug sm:text-2xl">
                {wf.outcome}
              </p>
              <p className="mt-3 text-xs text-ink/40">Illustrative scenario — outcomes vary with your tools and process.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
