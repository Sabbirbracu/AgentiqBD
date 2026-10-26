import Image from 'next/image';
import { Globe2, Plug, ShieldCheck, UserRound, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SocialIcon } from '@/components/ui/social-icon';
import { SpotlightCard } from '@/components/ui/spotlight';
import { founder, sectionNo, whyUs } from '@/lib/content';
import { cn } from '@/lib/utils';

const pillarIcons: LucideIcon[] = [UserRound, ShieldCheck, Plug, Globe2];

export function Principles() {
  const { belief, pillars } = whyUs;
  // While developing, show every icon so the design can be reviewed; a production build only shows the ones with a real URL.
  const preview = process.env.NODE_ENV !== 'production';
  const socials = founder.social.filter((s) => s.href || preview);

  return (
    <section id="why" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-52 top-24 h-[480px] w-[480px] rounded-full bg-signal/10 blur-[150px]" />

      <div className="container-x relative">
        <SectionHeading
          dark
          index={sectionNo('why')}
          label="About Agentiq BD"
          title={
            <>
              {belief.title} <span className="accent-serif text-signal">{belief.accent}</span>
            </>
          }
        >
          {belief.text}
        </SectionHeading>

        {/* ── Pillars ──────────────────────────────────────────────────────────── */}
        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <Reveal key={p.label} as="li" delay={(i % 2) * 0.08}>
                <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 sm:p-8">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6.5rem] font-semibold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-signal/[0.12]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-signal text-paper shadow-[0_12px_30px_-12px_rgba(232,79,61,0.8)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper/60">
                      {p.label}
                    </span>
                  </div>

                  <h3 className="display relative mt-7 text-balance text-2xl font-semibold leading-[1.15] sm:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="relative mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-paper/60">
                    {p.text}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>

        {/* ── Founder ──────────────────────────────────────────────────────────── */}
        {founder.name && (
          <Reveal className="mt-16">
            <div className="grid overflow-hidden rounded-[32px] bg-paper text-ink shadow-[0_50px_120px_-50px_rgba(232,79,61,0.45)] lg:grid-cols-[0.62fr_1.38fr]">
              {/* portrait */}
              <div className="relative min-h-[300px] bg-ink sm:min-h-[360px] lg:min-h-0">
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.title}`}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[50%_15%]"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="eyebrow flex items-center gap-3 text-ink/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Founder
                </p>
                <h3 className="display mt-4 text-balance text-2xl font-semibold leading-[1.1] sm:text-[1.9rem]">
                  {founder.statement}
                </h3>

                <blockquote className="accent-serif mt-4 border-l-2 border-signal pl-4 text-lg leading-snug text-signal sm:text-xl">
                  {founder.vision}
                </blockquote>

                <div className="mt-5 space-y-3 text-pretty text-[15px] leading-relaxed text-ink/65">
                  {founder.bio.map((para, i) => (
                    <p key={para} className={cn(i === 0 && 'text-base text-ink/80')}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-6 border-t border-ink/10 pt-5">
                  <p className="display text-xl font-semibold leading-none">{founder.name}</p>
                  <p className="mt-1.5 text-sm text-ink/55">{founder.title}</p>
                  {socials.length > 0 && (
                    <ul className="mt-4 flex gap-2">
                      {socials.map((s) => (
                        <li key={s.kind}>
                          <a
                            href={s.href || '#'}
                            {...(s.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            aria-label={`${founder.name} on ${s.label}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
                          >
                            <SocialIcon kind={s.kind} className="h-[14px] w-[14px]" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
