import { MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { missionGoals, values } from '@/lib/content';

export function Origin() {
  return (
    <section id="company" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              index="09"
              label="Our story"
              title={
                <>
                  Built from Bangladesh.{' '}
                  <span className="accent-serif text-signal">Held to a global standard.</span>
                </>
              }
            >
              Agentiq BD exists to prove that world-class AI engineering can be built in Dhaka —
              and to put it to work for businesses at home and abroad.
            </SectionHeading>

            <Reveal delay={0.1}>
              <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper-50 px-5 py-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal text-paper">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold leading-none">Dhaka, Bangladesh</p>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                    23.8103° N · 90.4125° E
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal>
              <p className="eyebrow mb-5 text-ink/45">Our mission</p>
              <ul className="space-y-4">
                {missionGoals.map((g) => (
                  <li
                    key={g}
                    className="display border-b border-ink/10 pb-4 text-2xl font-semibold leading-tight last:border-0 sm:text-[1.7rem]"
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="eyebrow mb-5 text-ink/45">What we hold ourselves to</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {values.map((v) => (
                  <li key={v.title} className="rounded-2xl bg-ink/[0.04] p-5">
                    <p className="font-display text-base font-semibold leading-tight">{v.title}</p>
                    <p className="mt-1.5 text-sm text-ink/60">{v.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
