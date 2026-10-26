import { ArrowUpRight, Bot, Code2, Factory, MessageCircle, Workflow, type LucideIcon } from 'lucide-react';
import { buttonBase, buttonVariants } from '@/components/ui/button';
import { OpenChatButton } from '@/components/ui/open-chat-button';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/ui/spotlight';
import { sectionNo, services, site } from '@/lib/content';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  'ai-engineering': Bot,
  'business-automation': Workflow,
  'industrial-ai': Factory,
  'custom-software': Code2,
};

export function Capabilities() {
  return (
    <section id="services" className="relative bg-paper-200/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={sectionNo('services')}
          label="What we do"
          title={
            <>
              Four ways we put
              <br />
              <span className="accent-serif text-signal">engineering to work.</span>
            </>
          }
        >
          We build software, AI and automation as one solution, designed around how your business
          actually runs.
        </SectionHeading>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.id];
            const dark = i === 0 || i === 3;
            return (
              <Reveal key={s.id} delay={(i % 2) * 0.1} id={`service-${s.id}`} className="scroll-mt-28">
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
                      'relative z-10 mt-2 text-lg font-medium',
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

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-6 rounded-[28px] border border-ink/10 bg-paper px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
            <div>
              <p className="display text-xl font-semibold sm:text-2xl">
                Not sure which one fits?
              </p>
              <p className="mt-1 text-ink/60">
                Tell us what’s slowing your business down. We’ll point you to the right starting
                point.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <a
                href={site.bookingUrl || '/#contact'}
                {...(site.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={cn(buttonBase, buttonVariants.primary)}
              >
                Book a Free Call
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <OpenChatButton className={cn(buttonBase, buttonVariants.ghost)}>
                <MessageCircle className="h-4 w-4" /> Chat with us
                <span className="text-xs font-normal text-ink/45">AI assistant</span>
              </OpenChatButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
