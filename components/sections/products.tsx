import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { Showcase } from '@/components/ui/showcase';
import { products, sectionNo } from '@/lib/content';
import { cn } from '@/lib/utils';

const statusStyle = {
  Live: 'bg-emerald-400/15 text-emerald-300',
  MVP: 'bg-amber-400/15 text-amber-300',
  'In development': 'bg-white/10 text-paper/70',
} as const;

export function Products() {
  return (
    <section id="products" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          index={sectionNo('products')}
          label="Our products"
          title={
            <>
              Software we build{' '}
              <span className="accent-serif text-signal">for ourselves, too.</span>
            </>
          }
        >
          Alongside client work, we build and run our own products. Each one is labelled with its
          real stage.
        </SectionHeading>

        <ul className="mt-16 space-y-8">
          {products.map((p, n) => (
            <Reveal key={p.id} as="li">
              <article className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 sm:p-8 lg:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 h-80 w-80 rounded-full opacity-25 blur-[120px]"
                  style={{ background: p.accent, [n % 2 === 0 ? 'right' : 'left']: '-6rem' }}
                />
                <div className={cn('relative grid items-center gap-12 lg:gap-12', n % 2 === 0 ? 'lg:grid-cols-[0.6fr_1.4fr]' : 'lg:grid-cols-[1.4fr_0.6fr]')}>
                  <div className={cn('flex flex-col', n % 2 === 1 && 'lg:order-2')}>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
                          statusStyle[p.status],
                        )}
                      >
                        {p.status}
                      </span>
                      <span className="eyebrow text-paper/45">{p.tag}</span>
                    </div>
                    <h3 className="display mt-7 text-5xl font-semibold leading-none sm:text-6xl">{p.name}</h3>
                    <p className="mt-5 text-pretty text-lg leading-relaxed text-paper/65">{p.summary}</p>

                    <ul className="mt-7 space-y-3.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[15px] leading-snug text-paper/85">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${p.accent}33`, color: p.accent }}
                          >
                            <Check className="h-3 w-3" strokeWidth={3.5} />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                      <p className="text-sm text-paper/55">
                        <span className="eyebrow mr-3 text-paper/35">Availability</span>
                        {p.availability}
                      </p>
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-signal px-5 text-[15px] font-medium transition-colors hover:bg-signal-600"
                        >
                          {p.cta}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={cn('min-w-0', n % 2 === 1 && 'lg:order-1')}>
                    <Showcase
                      images={p.images}
                      frame={p.frame}
                      label={p.frameLabel}
                      accent={p.accent}
                      note={p.imageNote}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
