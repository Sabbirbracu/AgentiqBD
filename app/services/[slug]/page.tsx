import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight, Plus } from 'lucide-react';
import { SolutionShell } from '@/components/sections/solution-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { coreServices, processSteps } from '@/lib/content';
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo';
import { servicePageById, servicePages } from '@/lib/service-pages';

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageById(slug);
  if (!page) return {};
  const url = `/services/${page.id}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: { title: `${page.metaTitle} · Agentiq BD`, description: page.metaDescription, url: absoluteUrl(url), type: 'website' },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePageById(slug);
  const core = coreServices.find((c) => c.id === slug);
  if (!page || !core) notFound();
  const path = `/services/${page.id}`;
  const related = page.related.map((id) => servicePageById(id)).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <SolutionShell tone="dark" ctaTitle={`Want help with ${core.title.toLowerCase()}?`}>
      <JsonLd
        data={[
          serviceJsonLd({ name: core.title, description: page.metaDescription, path }),
          faqJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: core.title, path },
          ]),
        ]}
      />
      <article className="container-x pb-20 pt-24 sm:pb-28 sm:pt-28">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-paper/50">
          <Link href="/" className="hover:text-paper">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <Link href="/services" className="hover:text-paper">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-paper/80">{core.title}</span>
        </nav>

        <p className="eyebrow text-signal-300">{core.category}</p>
        <h1 className="display mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl">{page.h1}</h1>
        <p className="mt-7 max-w-3xl text-pretty text-xl leading-relaxed text-paper/75">{page.answer}</p>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <section aria-labelledby="build" className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 sm:p-9">
            <h2 id="build" className="display text-2xl font-semibold sm:text-3xl">What we build</h2>
            <ul className="mt-6 space-y-4">
              {page.build.map((b) => (
                <li key={b} className="flex gap-3 text-paper/80">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-signal-300" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="fit" className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 sm:p-9">
            <h2 id="fit" className="display text-2xl font-semibold sm:text-3xl">Who it is for</h2>
            <ul className="mt-6 space-y-4">
              {page.fit.map((f) => (
                <li key={f} className="flex gap-3 text-paper/80">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-signal-300" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="how" className="mt-20">
          <h2 id="how" className="display text-3xl font-semibold sm:text-4xl">How we work with you</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((s, i) => (
              <li key={s.label} className="rounded-[20px] border border-white/10 p-6">
                <p className="eyebrow text-signal-300">
                  {String(i + 1).padStart(2, '0')} · {s.label}
                </p>
                <h3 className="display mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq" className="mt-20 max-w-3xl">
          <h2 id="faq" className="display text-3xl font-semibold sm:text-4xl">Common questions</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {page.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium">
                  <h3 className="text-lg font-medium">{f.q}</h3>
                  <Plus className="mt-1 h-5 w-5 shrink-0 text-paper/50 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-paper/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="related" className="mt-20">
          <h2 id="related" className="display text-2xl font-semibold">Related services</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {related.map((r) => {
              const rc = coreServices.find((c) => c.id === r.id);
              return (
                <li key={r.id}>
                  <Link
                    href={`/services/${r.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[15px] text-paper/85 transition-colors hover:border-white/40 hover:bg-white/5"
                  >
                    {rc?.title}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
    </SolutionShell>
  );
}
