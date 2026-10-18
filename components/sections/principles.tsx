import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { metrics, principles } from '@/lib/content';

export function Principles() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          index="08"
          label="Why Agentiq"
          title={
            <>
              Engineering first.{' '}
              <span className="accent-serif text-signal">Hype last.</span>
            </>
          }
        >
          Five principles shape every system we build.
        </SectionHeading>

        <ul className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {principles.map((p, i) => (
            <Reveal key={p.title} as="li" delay={i * 0.04}>
              <div className="group grid gap-3 py-8 transition-colors sm:grid-cols-[80px_1fr_1.1fr] sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm text-signal">0{i + 1}</span>
                <h3 className="display text-2xl font-semibold leading-tight transition-colors group-hover:text-signal-300 sm:text-[1.9rem]">
                  {p.title}
                </h3>
                <p className="text-pretty leading-relaxed text-paper/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-16">
            <p className="eyebrow mb-5 text-paper/45">What we measure</p>
            <ul className="flex flex-wrap gap-3">
              {metrics.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-display text-lg"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
