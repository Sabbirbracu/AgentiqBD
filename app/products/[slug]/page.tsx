import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, CircleDashed, Info, Loader, Minus, Plus, X } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { productStatusStyle } from '@/components/sections/products';
import { Showcase } from '@/components/ui/showcase';
import { JsonLd } from '@/components/seo/json-ld';
import { coreServices, products, site } from '@/lib/content';
import { productPageById, productPages } from '@/lib/product-pages';
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, orgId } from '@/lib/seo';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return productPages.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = productPageById(slug);
  if (!page) return {};
  const path = `/products/${page.id}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: path },
    openGraph: { title: `${page.metaTitle} · Agentiq BD`, description: page.metaDescription, url: absoluteUrl(path), type: 'website' },
  };
}

const progressIcon = { done: Check, doing: Loader, planned: CircleDashed } as const;
const progressTone = {
  done: 'bg-emerald-500/10 text-emerald-700',
  doing: 'bg-amber-400/15 text-amber-700',
  planned: 'bg-ink/[0.06] text-ink/60',
} as const;

function SectionTitle({ label, title, accent }: { label: string; title: string; accent?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-signal-600">{label}</p>
      <h2 className="display mt-4 text-balance text-[34px] font-semibold leading-[1.05] sm:text-5xl">
        {title}
        {accent && <span className="accent-serif text-signal"> {accent}</span>}
      </h2>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = productPageById(slug);
  const p = products.find((x) => x.id === slug);
  if (!page || !p) notFound();

  const path = `/products/${p.id}`;
  const services = page.services.flatMap((id) => coreServices.filter((c) => c.id === id));
  const others = products.filter((o) => o.id !== p.id);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: p.name, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: p.name,
            description: page.metaDescription,
            url: absoluteUrl(path),
            ...(p.href ? { sameAs: p.href } : {}),
            applicationCategory: page.applicationCategory,
            operatingSystem: page.operatingSystem,
            image: p.images.map((i) => absoluteUrl(i.src)),
            creator: { '@type': 'Organization', '@id': orgId, name: 'Agentiq BD' },
            ...(p.status === 'Live' ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } } : {}),
          },
          faqJsonLd(page.faqs),
        ]}
      />
      <Navbar overDark />
      <main className="bg-paper text-ink">
        {/* Hero */}
        <section className="grain relative overflow-hidden bg-ink pb-20 pt-32 text-paper sm:pb-28 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full opacity-30 blur-[140px]" style={{ background: p.accent }} />
          <div className="container-x relative">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper">
              <ArrowLeft className="h-4 w-4" /> All products
            </Link>

            <div className="mt-10 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider', productStatusStyle[p.status])}>{p.status}</span>
                  <span className="eyebrow text-paper/45">{p.tag}</span>
                </div>
                <h1 className="display mt-6 text-6xl font-semibold leading-none sm:text-7xl">{p.name}</h1>
                <p className="mt-6 max-w-xl text-pretty text-xl leading-relaxed text-paper/70">{page.tagline}</p>
                <p className="mt-5 text-sm text-paper/50">
                  <span className="eyebrow mr-3 text-paper/35">Availability</span>
                  {p.availability}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  {page.primaryCta.external ? (
                    <a
                      href={page.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600"
                    >
                      {page.primaryCta.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <Link
                      href={page.primaryCta.href}
                      className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600"
                    >
                      {page.primaryCta.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-[15px] font-medium text-paper transition-colors hover:bg-white/[0.06]"
                  >
                    WhatsApp us
                  </a>
                </div>
              </div>
              <div className="min-w-0">
                <Showcase images={p.images} frame={p.frame} label={p.frameLabel} accent={p.accent} note={p.imageNote} />
              </div>
            </div>
          </div>
        </section>

        {/* Why we built it */}
        <section className="py-24 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionTitle label="Why we built it" title={page.why.title} />
            <div className="space-y-5 text-pretty text-[17px] leading-relaxed text-ink/70">
              {page.why.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          {page.why.problems && (
            <div className="container-x mt-14">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {page.why.problems.map((x, i) => (
                  <li key={x.title} className="rounded-[22px] border border-ink/10 bg-white p-6">
                    <span className="font-mono text-xs text-signal-600">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-[17px] font-semibold leading-snug">{x.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{x.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Who it's for */}
        {page.fit && (
          <section className="border-t border-ink/[0.07] py-24 sm:py-28">
            <div className="container-x">
              <SectionTitle label="Who it’s for" title="Built for one kind of customer," accent="on purpose." />
              <div className="mt-12 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[26px] border border-ink/10 bg-white p-7 sm:p-8">
                  <p className="eyebrow text-emerald-700">A good fit</p>
                  <ul className="mt-5 space-y-3.5">
                    {page.fit.forWho.map((t) => (
                      <li key={t} className="flex gap-3 text-[15.5px] leading-snug text-ink/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[26px] border border-ink/10 bg-paper-200/50 p-7 sm:p-8">
                  <p className="eyebrow text-ink/50">What it is not</p>
                  <ul className="mt-5 space-y-3.5">
                    {page.fit.notFor.map((t) => (
                      <li key={t} className="flex gap-3 text-[15.5px] leading-snug text-ink/70">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" strokeWidth={3} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="bg-ink py-24 text-paper sm:py-28">
          <div className="container-x">
            <div className="max-w-2xl">
              <p className="eyebrow text-signal-300">How it works</p>
              <h2 className="display mt-4 text-balance text-[34px] font-semibold leading-[1.05] sm:text-5xl">
                {page.steps.length} steps, <span className="accent-serif text-signal">no learning curve.</span>
              </h2>
            </div>
            <ol className={cn('mt-12 grid gap-4 sm:grid-cols-2', page.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
              {page.steps.map((s, i) => (
                <li key={s.title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold" style={{ background: `${p.accent}33`, color: p.accent }}>
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-paper/60">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 sm:py-28">
          <div className="container-x">
            <SectionTitle label="What it does" title="Features," accent="in detail." />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.features.map((g) => (
                <div key={g.title} className="rounded-[22px] border border-ink/10 bg-white p-6 sm:p-7">
                  <h3 className="text-[18px] font-semibold">{g.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((t) => (
                      <li key={t} className="flex gap-3 text-[15px] leading-snug text-ink/70">
                        <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: `${p.accent}22`, color: p.accent }}>
                          <Check className="h-2.5 w-2.5" strokeWidth={4} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications + status or limits */}
        <section className="border-t border-ink/[0.07] bg-paper-200/50 py-24 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionTitle label="Specifications" title="Product details" />
              <dl className="mt-10 divide-y divide-ink/10 overflow-hidden rounded-[22px] border border-ink/10 bg-white">
                {page.specs.map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                    <dt className="text-[14px] font-medium text-ink/50">{k}</dt>
                    <dd className="text-[15px] leading-relaxed text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              {page.progress && (
                <>
                  <SectionTitle label="Where it stands" title="Honest progress" />
                  <div className="mt-10 space-y-4">
                    {page.progress.map((g) => {
                      const Icon = progressIcon[g.tone];
                      return (
                        <div key={g.label} className="rounded-[22px] border border-ink/10 bg-white p-6">
                          <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider', progressTone[g.tone])}>
                            <Icon className="h-3.5 w-3.5" /> {g.label}
                          </span>
                          <ul className="mt-4 space-y-2">
                            {g.items.map((t) => (
                              <li key={t} className="flex gap-2.5 text-[14.5px] leading-snug text-ink/70">
                                <Minus className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink/30" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {page.limits && (
                <>
                  <SectionTitle label="Good to know" title="Honest limits" />
                  <ul className="mt-10 space-y-3">
                    {page.limits.map((t) => (
                      <li key={t} className="flex gap-3 rounded-[18px] border border-ink/10 bg-white p-5 text-[15px] leading-relaxed text-ink/75">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionTitle label="FAQ" title="Questions" accent="and answers." />
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {page.faqs.map((f, i) => (
                <details key={f.q} className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="display text-xl font-semibold leading-snug">{f.q}</h3>
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors group-open:border-signal group-open:bg-signal group-open:text-white">
                      <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
                    </span>
                  </summary>
                  <p className="-mt-2 pb-6 pr-14 text-pretty text-[16px] leading-relaxed text-ink/65">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pb-24 sm:pb-28">
          <div className="container-x">
            <div className="grain relative overflow-hidden rounded-[32px] bg-ink p-8 text-paper sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full opacity-30 blur-[100px]" style={{ background: p.accent }} />
              <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                <div>
                  <p className="eyebrow text-paper/45">Built by Agentiq BD</p>
                  <p className="display mt-4 max-w-2xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
                    Need software like {p.name} for your own business?
                  </p>
                  <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-paper/60">
                    We build our own products with the same team and the same care as client work. Tell us the problem; we will say honestly what fits.
                  </p>
                  {services.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {services.map((s) => (
                        <Link key={s.id} href={`/services/${s.id}`} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13.5px] text-paper/75 transition-colors hover:border-signal hover:text-paper">
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600"
                  >
                    Book a discovery call
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  {others.map((o) => (
                    <Link key={o.id} href={`/products/${o.id}`} className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-[15px] font-medium transition-colors hover:bg-white/[0.06]">
                      See {o.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
