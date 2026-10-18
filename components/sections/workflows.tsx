'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
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
          index="04"
          label="Workflow automation"
          title={
            <>
              Automation that moves like{' '}
              <span className="accent-serif text-signal">your business does.</span>
            </>
          }
        >
          The expensive part of most work isn’t the work — it’s the hand-offs between people and
          tools. We connect them so the next step simply happens.
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

              <div className="mt-12 grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
                <p className="text-pretty text-lg leading-relaxed text-ink/70">{wf.detail}</p>
                <ul className="space-y-3">
                  {wf.changes.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[15px] font-medium">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
