import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { processSteps } from '@/lib/content';

export function Approach() {
  return (
    <section id="approach" className="bg-paper-200/60 py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="07"
            label="How we work"
            title={
              <>
                From bottleneck to{' '}
                <span className="accent-serif text-signal">production.</span>
              </>
            }
          >
            A clear, staged process — so you see it working before you commit, and know exactly
            what happens at every step.
          </SectionHeading>
        </div>

        <ol className="relative">
          <span className="absolute bottom-3 left-[21px] top-3 w-px bg-ink/15" aria-hidden />
          {processSteps.map((p, i) => (
            <Reveal key={p.title} as="li" className="relative pb-9 pl-16 last:pb-0">
              <span className="absolute left-0 top-0 flex h-[43px] w-[43px] items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-sm font-medium">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display text-2xl font-semibold leading-none">{p.title}</h3>
              <p className="mt-2.5 max-w-lg text-pretty leading-relaxed text-ink/65">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
