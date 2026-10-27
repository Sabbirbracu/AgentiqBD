import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceArt as arts } from '@/components/brand/service-art';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/ui/spotlight';
import { coreServices, sectionNo } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Tile layout on a 4-column grid: A A C V / A A W W / K I B B / R R S S. `full` tiles show the full description. */
const layout: Record<string, { cls: string; dark: boolean; full: boolean }> = {
  'ai-agents': { cls: 'sm:col-span-2 lg:row-span-2', dark: true, full: true },
  chatbots: { cls: '', dark: false, full: false },
  voice: { cls: '', dark: false, full: false },
  'workflow-automation': { cls: 'sm:col-span-2', dark: true, full: true },
  'knowledge-rag': { cls: '', dark: false, full: false },
  integrations: { cls: '', dark: false, full: false },
  'business-systems': { cls: 'sm:col-span-2', dark: true, full: true },
  reporting: { cls: 'sm:col-span-2', dark: false, full: true },
  'custom-software': { cls: 'sm:col-span-2', dark: true, full: true },
};

export function CoreServices() {
  return (
    <section id="core-services" className="relative bg-paper-200/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={sectionNo('core')}
          label="Core services"
          title={
            <>
              What we build,{' '}
              <span className="accent-serif text-signal">in plain terms.</span>
            </>
          }
        >
          Nine services across AI, automation and software. Pick the one closest to your problem.
        </SectionHeading>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(230px,auto)] lg:grid-cols-4">
          {coreServices.map((s, i) => {
            const l = layout[s.id];
            const big = s.id === 'ai-agents';
            const text = l.full || !('short' in s) ? s.description : s.short;
            return (
              <Reveal key={s.id} delay={(i % 4) * 0.06} className={cn('h-full', l.cls)}>
                <SpotlightCard
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-5 transition-all sm:p-6 duration-500 hover:-translate-y-1',
                    l.dark
                      ? 'grain border-ink bg-ink text-paper hover:border-white/25'
                      : 'border-ink/10 bg-paper text-ink hover:border-ink/25',
                  )}
                >
                  {l.dark && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-signal/20 blur-[90px]"
                    />
                  )}

                  {/* whole tile links to the service's own page (internal link for search engines + visitors) */}
                  <Link href={`/services/${s.id}`} aria-label={`${s.title}: learn more`} className="absolute inset-0 z-20 rounded-[24px]" />

                  <span
                    className={cn(
                      'absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-paper',
                      l.dark ? 'border-white/15 text-paper/60' : 'border-ink/15 text-ink/50',
                    )}
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  </span>

                  <div aria-hidden className={cn('relative flex flex-1 flex-col justify-center pb-4 pt-7', big && 'pt-10')}>
                    {arts[s.id]()}
                  </div>

                  <div className="relative">
                    <p className={cn('eyebrow', l.dark ? 'text-signal-300' : 'text-signal')}>{s.category}</p>
                    <h3 className={cn('display mt-2.5 font-bold leading-[1.15]', big ? 'text-[2.1rem]' : l.full ? 'text-[1.65rem]' : 'text-[1.4rem]')}>
                      {s.title}
                    </h3>
                    <p className={cn('mt-1.5 text-pretty text-[13.5px] leading-relaxed', l.dark ? 'text-paper/65' : 'text-ink/65', big && 'max-w-md text-[14.5px]')}>
                      {text}
                    </p>
                    {big && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {s.tags.map((t) => (
                          <li
                            key={t}
                            className={cn(
                              'rounded-full px-2.5 py-1 text-[12px]',
                              l.dark ? 'bg-white/10 text-paper/75' : 'bg-ink/[0.06] text-ink/65',
                            )}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
