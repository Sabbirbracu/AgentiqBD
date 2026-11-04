import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/content';
import type { LegalBlock, LegalDoc } from '@/lib/legal';
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';

const linkClass = 'font-medium text-ink underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal';

/** Links the {tokens} used in lib/legal.ts text. */
const tokens: Record<string, ReactNode> = {
  email: <a href={`mailto:${site.email}`} className={linkClass}>{site.email}</a>,
  phone: <a href={`tel:+88${site.phone}`} className={linkClass}>{site.phone}</a>,
  whatsapp: (
    <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
      WhatsApp
    </a>
  ),
  privacy: <Link href="/privacy" className={linkClass}>Privacy Policy</Link>,
  terms: <Link href="/terms" className={linkClass}>Terms &amp; Conditions</Link>,
  packages: <Link href="/packages" className={linkClass}>Packages</Link>,
};

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <span key={i}>{tokens[part] ?? part}</span> : part))}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p><Rich text={block} /></p>;
  return (
    <ul className="space-y-2.5 pl-1">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
          <span><Rich text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Privacy policy and terms pages: summary, sticky contents list, numbered sections, link to the other document. */
export function LegalPage({ doc, other }: { doc: LegalDoc; other: LegalDoc }) {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: doc.metaTitle, description: doc.description, path: doc.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: doc.metaTitle, path: doc.path },
          ]),
        ]}
      />
      <Navbar />
      <main className="bg-paper text-ink">
        <div className="container-x pb-24 pt-32 sm:pb-32 sm:pt-36">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <header className="mt-10 max-w-3xl">
            <p className="eyebrow text-signal">Legal</p>
            <h1 className="display mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl">{doc.title}</h1>
            <p className="eyebrow mt-6 text-ink/50">
              Effective {formatDate(doc.effective)} · Last updated {formatDate(doc.updated)}
            </p>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/70 sm:text-xl">{doc.intro}</p>
          </header>

          <section aria-labelledby="summary" className="mt-12 max-w-3xl rounded-[28px] border border-ink/10 bg-paper-200/50 p-6 sm:p-8">
            <h2 id="summary" className="display text-2xl font-semibold">In short</h2>
            <ul className="mt-5 space-y-3 text-[17px] leading-relaxed text-ink/75">
              {doc.summary.map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink/50">This summary is for convenience. The full text below is what applies.</p>
          </section>

          <div className="mt-16 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow mb-4 text-ink/45">On this page</p>
                <ol className="space-y-2 text-sm">
                  {doc.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex gap-2.5 text-ink/60 transition-colors hover:text-signal">
                        <span className="font-mono text-ink/35">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="max-w-3xl space-y-12">
              {doc.sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
                  <h2 id={`${s.id}-title`} className="display flex items-baseline gap-3 text-2xl font-semibold sm:text-[1.75rem]">
                    <span className="font-mono text-base font-normal text-signal">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink/75">
                    {s.body.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                </section>
              ))}

              <Link
                href={other.path}
                className="group flex items-center justify-between gap-4 rounded-[28px] border border-ink/10 p-6 transition-colors hover:border-signal/40 sm:p-8"
              >
                <span>
                  <span className="eyebrow block text-ink/45">Also read</span>
                  <span className="display mt-2 block text-2xl font-semibold">{other.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-signal transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
