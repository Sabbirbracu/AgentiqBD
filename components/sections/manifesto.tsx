import { Check, X } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { comparison } from '@/lib/content';

export function Manifesto() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          index="01"
          label="The difference"
          title={
            <>
              A chatbot answers. An AI Employee{' '}
              <span className="accent-serif text-signal">gets the job done.</span>
            </>
          }
        >
          Most “AI” stops at the chat window. We build systems that read your data, take action in
          your software and own an outcome — inside the limits you set.
        </SectionHeading>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <p className="eyebrow mb-8 text-paper/40">{comparison.chatbot.label}</p>
              <ul className="space-y-5">
                {comparison.chatbot.points.map((p) => (
                  <li key={p} className="flex gap-4 text-lg leading-snug text-paper/50">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[28px] bg-paper p-8 text-ink shadow-[0_40px_100px_-40px_rgba(232,79,61,0.5)] sm:p-10">
              <p className="eyebrow relative mb-8 text-signal">{comparison.employee.label}</p>
              <ul className="relative space-y-5">
                {comparison.employee.points.map((p) => (
                  <li key={p} className="flex gap-4 text-lg leading-snug text-ink/90">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
