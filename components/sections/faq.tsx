'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { faqs } from '@/lib/content';
import { cn } from '@/lib/utils';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-paper-200/60 py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeading
          index="10"
          label="FAQ"
          title={
            <>
              Straight <span className="accent-serif text-signal">answers.</span>
            </>
          }
        >
          Can’t find what you’re looking for? Ask us directly — we reply within one to two business
          days.
        </SectionHeading>

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="display text-xl font-semibold leading-snug sm:text-2xl">
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                        isOpen
                          ? 'rotate-45 border-signal bg-signal text-paper'
                          : 'border-ink/20 text-ink',
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl text-pretty pb-7 pr-12 text-lg leading-relaxed text-ink/65">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
