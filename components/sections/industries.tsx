import { ArrowUpRight, Factory } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/ui/spotlight';
import { industries } from '@/lib/content';

export function Industries() {
  const [featured, ...rest] = industries;
  return (
    <section id="industries" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Industries"
          title={
            <>
              From the factory floor to{' '}
              <span className="accent-serif text-signal">the front desk.</span>
            </>
          }
        >
          The same engineering discipline, applied where it removes the most friction.
        </SectionHeading>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {/* featured: industrial AI */}
          <Reveal className="lg:col-span-3">
            <SpotlightCard className="grain relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-12">
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-signal px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
                    <Factory className="h-3.5 w-3.5" /> {featured.short}
                  </span>
                  <h3 className="display text-balance text-3xl font-semibold leading-[1.05] sm:text-5xl">
                    {featured.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-paper/65">
                    {featured.description}
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {featured.uses.map((u) => (
                    <li
                      key={u}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-[15px]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>

          {rest.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 0.08}>
              <SpotlightCard className="group flex h-full flex-col rounded-[24px] border border-ink/10 bg-paper-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/25">
                <div className="mb-10 flex items-center justify-between">
                  <span className="eyebrow text-ink/40">0{i + 1}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                </div>
                <h3 className="display text-2xl font-semibold leading-tight">{ind.name}</h3>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink/60">
                  {ind.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ind.uses.map((u) => (
                    <li
                      key={u}
                      className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-[13px] text-ink/70"
                    >
                      {u}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
