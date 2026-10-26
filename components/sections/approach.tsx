import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { processSteps, sectionNo, site } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Approach() {
  const href = site.bookingUrl || '/#contact';
  const last = processSteps.length - 1;

  return (
    <section id="approach" className="bg-paper-200/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={sectionNo('how')}
          label="How we work"
          title={
            <>
              From bottleneck to{' '}
              <span className="accent-serif text-signal">production.</span>
            </>
          }
        >
          Three clear steps, and you approve the plan before we build anything.
        </SectionHeading>

        {/* Each step is a subgrid across four shared rows (node, title, text, outcome), so the rows line up
            across columns no matter how many lines a headline or paragraph wraps to. */}
        <ol className="mt-16 grid gap-x-8 gap-y-14 lg:grid-cols-3 lg:gap-y-0">
          {processSteps.map((p, i) => (
            <Reveal
              key={p.label}
              as="li"
              delay={i * 0.1}
              className="group relative grid grid-cols-[3.5rem_1fr] gap-x-6 lg:row-span-4 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-x-0"
            >
              {/* connector: vertical on mobile, horizontal to the next step on desktop */}
              {i < last && (
                <>
                  <span aria-hidden className="absolute bottom-[-3.5rem] left-[27px] top-16 w-px bg-ink/15 lg:hidden" />
                  <span aria-hidden className="absolute left-[72px] right-[-2rem] top-[27px] hidden h-px bg-ink/15 lg:block" />
                </>
              )}

              <span
                className={cn(
                  'relative z-10 row-span-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-mono text-base font-medium transition-colors duration-300 lg:row-span-1',
                  i === last ? 'bg-signal text-paper' : 'bg-ink text-paper group-hover:bg-signal',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="col-start-2 lg:col-start-1 lg:mt-8">
                <p className="eyebrow text-ink/45">{p.label}</p>
                <h3 className="display mt-3 text-balance text-2xl font-semibold leading-tight sm:text-[1.7rem]">
                  {p.title}
                </h3>
              </div>

              <p className="col-start-2 mt-4 text-pretty leading-relaxed text-ink/65 lg:col-start-1">{p.text}</p>

              <div className="col-start-2 mt-6 flex items-start gap-3 rounded-2xl bg-ink/[0.045] p-4 lg:col-start-1">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <div>
                  <p className="eyebrow text-ink/40">You get</p>
                  <p className="mt-1 text-[15px] font-medium leading-snug">{p.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* the single call to action */}
        <Reveal delay={0.1}>
          <div className="grain relative mt-16 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:flex-row sm:items-center sm:p-10">
            <div className="relative max-w-xl">
              <p className="display text-balance text-2xl font-semibold leading-tight sm:text-3xl">
                Tell us the bottleneck.
                <span className="accent-serif text-signal"> We’ll tell you what is worth building.</span>
              </p>
            </div>
            <a
              href={href}
              {...(site.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group relative inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-signal px-8 text-base font-medium text-paper shadow-[0_10px_30px_-10px_rgba(232,79,61,0.7)] transition-colors hover:bg-signal-600"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
