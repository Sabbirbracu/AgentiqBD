import { ArrowUpRight, Bot, Code2, Database, Workflow, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/ui/spotlight';
import { services } from '@/lib/content';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  employees: Bot,
  automation: Workflow,
  erp: Database,
  custom: Code2,
};

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-paper-200/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Capabilities"
          title={
            <>
              Four capabilities.
              <br />
              <span className="accent-serif text-signal">One connected system.</span>
            </>
          }
        >
          We don’t build isolated demos. We design AI-powered systems that automate real operations,
          connect your workflows and help you scale with less repetitive work.
        </SectionHeading>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.id];
            const dark = i === 0 || i === 3;
            return (
              <Reveal key={s.id} delay={(i % 2) * 0.1}>
                <SpotlightCard
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-10',
                    dark
                      ? 'grain border-ink bg-ink text-paper'
                      : 'border-ink/10 bg-paper text-ink',
                  )}
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span
                      className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-2xl',
                        dark ? 'bg-signal text-paper' : 'bg-ink text-paper',
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        'font-mono text-sm tracking-widest',
                        dark ? 'text-paper/35' : 'text-ink/30',
                      )}
                    >
                      {s.number}
                    </span>
                  </div>

                  <h3 className="display relative z-10 mt-10 text-3xl font-semibold leading-tight sm:text-[2.1rem]">
                    {s.title}
                  </h3>
                  <p
                    className={cn(
                      'relative z-10 mt-2 font-serif text-xl italic',
                      dark ? 'text-signal-300' : 'text-signal',
                    )}
                  >
                    {s.kicker}
                  </p>
                  <p
                    className={cn(
                      'relative z-10 mt-5 text-pretty leading-relaxed',
                      dark ? 'text-paper/65' : 'text-ink/65',
                    )}
                  >
                    {s.description}
                  </p>

                  <ul
                    className={cn(
                      'relative z-10 mt-8 space-y-3 border-t pt-6',
                      dark ? 'border-white/10' : 'border-ink/10',
                    )}
                  >
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className={cn(
                          'flex items-start gap-3 text-[15px] leading-snug',
                          dark ? 'text-paper/80' : 'text-ink/75',
                        )}
                      >
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
