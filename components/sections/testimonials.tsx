import { Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionNo, testimonials } from '@/lib/content';

/** Renders nothing until `testimonials` in lib/content.ts holds real, permitted feedback. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="feedback" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={sectionNo('feedback')}
          label="Client feedback"
          title={
            <>
              In our clients’ <span className="accent-serif text-signal">words.</span>
            </>
          }
        />
        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} as="li" delay={(i % 2) * 0.08}>
              <figure className="flex h-full flex-col rounded-[28px] border border-ink/10 bg-paper-50 p-8 sm:p-10">
                <Quote className="h-7 w-7 text-signal" />
                <blockquote className="display mt-6 flex-1 text-balance text-2xl font-medium leading-snug">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-ink/10 pt-5 text-[15px]">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-ink/55">
                    {' '}
                    · {t.role}
                    {t.company ? `, ${t.company}` : ''}
                  </span>
                  {t.project && <span className="mt-1 block text-sm text-ink/45">{t.project}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
