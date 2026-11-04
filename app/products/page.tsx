import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { productStatusStyle } from '@/components/sections/products';
import { Showcase } from '@/components/ui/showcase';
import { JsonLd } from '@/components/seo/json-ld';
import { products } from '@/lib/content';
import { productPageById } from '@/lib/product-pages';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

const description =
  'Software Agentiq BD designs, builds and runs itself: BatchPilot, coaching centre management for Bangladesh, and MyPixel Guard, a free on-device metadata remover. Each labelled with its real stage.';

export const metadata: Metadata = {
  title: 'Products: BatchPilot and MyPixel Guard',
  description,
  alternates: { canonical: '/products' },
  openGraph: { title: 'Products · Agentiq BD', description, url: absoluteUrl('/products'), type: 'website' },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Agentiq BD products',
            itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: absoluteUrl(`/products/${p.id}`) })),
          },
        ]}
      />
      <Navbar overDark />
      <main className="grain relative overflow-hidden bg-ink pb-24 pt-32 text-paper sm:pb-32 sm:pt-40">
        <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[140px]" />
        <div className="container-x relative">
          <p className="eyebrow text-signal-300">Our products</p>
          <h1 className="display mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] sm:text-7xl">
            Software we build <span className="accent-serif text-signal">for ourselves, too.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-paper/65">
            Alongside client work, we design, ship and run our own products. Each one is labelled with its real stage, and each
            has a full case study: why we built it, how it works and where it stands.
          </p>

          <ul className="mt-16 space-y-8">
            {products.map((p, n) => {
              const page = productPageById(p.id);
              return (
                <li key={p.id}>
                  <article className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 sm:p-8 lg:p-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-32 h-80 w-80 rounded-full opacity-25 blur-[120px]"
                      style={{ background: p.accent, [n % 2 === 0 ? 'right' : 'left']: '-6rem' }}
                    />
                    <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                      <div className={cn('flex flex-col', n % 2 === 1 && 'lg:order-2')}>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={cn('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider', productStatusStyle[p.status])}>{p.status}</span>
                          <span className="eyebrow text-paper/45">{p.tag}</span>
                        </div>
                        <h2 className="display mt-6 text-5xl font-semibold leading-none">
                          <Link href={`/products/${p.id}`} className="transition-colors hover:text-signal-300">
                            {p.name}
                          </Link>
                        </h2>
                        <p className="mt-5 text-pretty text-lg leading-relaxed text-paper/65">{page?.tagline ?? p.summary}</p>
                        <ul className="mt-6 space-y-3">
                          {p.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex gap-3 text-[15px] leading-snug text-paper/80">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${p.accent}33`, color: p.accent }}>
                                <Check className="h-3 w-3" strokeWidth={3.5} />
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                          <Link
                            href={`/products/${p.id}`}
                            className="group inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-[15px] font-medium transition-colors hover:bg-signal-600"
                          >
                            View case study
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                          {p.href && (
                            <a
                              href={p.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[15px] font-medium transition-colors hover:bg-white/[0.06]"
                            >
                              {p.cta}
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className={cn('min-w-0', n % 2 === 1 && 'lg:order-1')}>
                        <Showcase images={p.images} frame={p.frame} label={p.frameLabel} accent={p.accent} />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="display text-2xl font-semibold sm:text-3xl">Looking for client work instead?</p>
              <p className="mt-2 text-paper/60">ERP systems, learning platforms and more, built for our clients.</p>
            </div>
            <Link href="/#work" className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 text-[15px] font-medium transition-colors hover:bg-white/[0.06]">
              See our work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
