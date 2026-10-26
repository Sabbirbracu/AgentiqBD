import { Factory, Headset, Store, Wrench, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionNo, whoWeAre } from '@/lib/content';

/** Renders `**phrase**` as a highlighted span. */
function Marked({ text, tone }: { text: string; tone: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={tone}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function WhoWeAre() {
  return (
    <section id="who" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute -right-48 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-signal/20 blur-[160px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(70%_70%_at_70%_50%,#000,transparent)]"
      />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <SectionHeading
            dark
            index={sectionNo('who')}
            label="About Agentiq BD"
            title={
              <>
                Who <span className="accent-serif text-signal">we are.</span>
              </>
            }
            className="[&_h2]:text-6xl sm:[&_h2]:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-pretty font-poppins text-2xl font-bold leading-[1.35] tracking-[-0.01em] text-paper sm:text-[1.75rem]">
              <Marked text={whoWeAre.lead} tone="text-signal-300" />
            </p>
            <p className="mt-7 max-w-xl text-pretty font-poppins text-[17px] font-medium leading-[1.7] text-paper/60">
              <Marked text={whoWeAre.body} tone="font-bold text-paper" />
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={30}>
          <Sectors />
        </Reveal>
      </div>
    </section>
  );
}

const sectorIcons: Record<string, LucideIcon> = {
  manufacturers: Factory,
  smes: Store,
  services: Headset,
};

/** Who we serve: three sector cards on a glowing spine, ending in how we deliver. */
function Sectors() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(232,79,61,0.22),transparent)]"
      />
      {/* spine behind the cards, with a light running down it */}
      <div aria-hidden className="absolute bottom-24 left-[44px] top-10 w-px bg-gradient-to-b from-transparent via-signal/50 to-signal/10">
        <span className="spine-run absolute -left-[3px] h-2 w-2 rounded-full bg-signal shadow-[0_0_14px_3px_rgba(232,79,61,0.8)]" />
      </div>

      <p className="eyebrow mb-4 pl-1 text-paper/45">Who we build for</p>
      <ul className="relative space-y-3.5">
        {whoWeAre.sectors.map((s, i) => {
          const Icon = sectorIcons[s.id];
          return (
            <Reveal key={s.id} as="li" delay={0.1 + i * 0.1} y={24}>
              <div
                className={`group relative flex items-start gap-4 rounded-2xl border bg-[#111113] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/50 ${
                  i === 0 ? 'border-signal/40 shadow-[0_24px_60px_-30px_rgba(232,79,61,0.6)]' : 'border-white/10'
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    i === 0 ? 'bg-signal text-paper' : 'bg-white/[0.08] text-paper group-hover:bg-signal'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className="display text-xl font-semibold leading-tight">{s.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-snug text-paper/55">{s.text}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-paper/60">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={0.45} y={24}>
        <div className="relative mt-3.5 flex items-center gap-4 overflow-hidden rounded-2xl bg-signal p-5 text-paper shadow-[0_30px_70px_-30px_rgba(232,79,61,0.9)]">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink/90">
            <Wrench className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div className="relative">
            <p className="eyebrow text-paper/75">How we deliver</p>
            <p className="display mt-0.5 text-lg font-semibold leading-tight">{whoWeAre.delivery}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
