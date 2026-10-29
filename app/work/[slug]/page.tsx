import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PhoneMarquee, Showcase } from '@/components/ui/showcase';
import { statusStyle } from '@/components/sections/work';
import { JsonLd } from '@/components/seo/json-ld';
import { projects } from '@/lib/content';
import { absoluteUrl, breadcrumbJsonLd, orgId } from '@/lib/seo';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  if (!p) return {};
  const path = `/work/${p.id}`;
  return {
    title: `${p.title} case study`,
    description: p.summary,
    alternates: { canonical: path },
    openGraph: { title: `${p.title} case study · Agentiq BD`, description: p.summary, url: absoluteUrl(path), type: 'article' },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  if (!p) notFound();
  const cs = p.caseStudy;
  const parts = [
    ['The challenge', cs?.challenge],
    ['What we built', cs?.solution],
    ['The outcome', cs?.outcome],
  ].filter((x): x is [string, string] => Boolean(x[1]));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Our work', path: '/#work' },
            { name: p.title, path: `/work/${p.id}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: p.title,
            description: p.summary,
            url: absoluteUrl(`/work/${p.id}`),
            creator: { '@type': 'Organization', '@id': orgId, name: 'Agentiq BD' },
          },
        ]}
      />
      <Navbar overDark />
      <main className="grain relative overflow-hidden bg-ink pb-24 pt-32 text-paper sm:pb-32 sm:pt-40">
        <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[140px]" />
        <div className="container-x relative">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-paper/50">{p.kind}</span>
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
                statusStyle[p.status].replace('text-ink/70', 'text-paper/80').replace('bg-ink/[0.07]', 'bg-white/10'),
              )}
            >
              {p.status}
            </span>
          </div>
          <h1 className="display mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] sm:text-7xl">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-paper/65">{p.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
            <div>
              <p className="eyebrow text-paper/40">Our role</p>
              <p className="mt-1.5 font-medium">{p.role}</p>
            </div>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600"
              >
                Visit live site
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>

          {p.mobileImages && p.mobileImages.length > 1 && (
            <div className="mt-14">
              <PhoneMarquee images={p.mobileImages} />
            </div>
          )}

          {p.images.length > 0 && (
            <div className={cn('mx-auto', p.mobileImages?.length ? 'mt-14 max-w-4xl' : 'mt-14')}>
              <Showcase
                images={p.images}
                label={p.liveUrl?.replace(/^https?:\/\//, '')}
                accent="#E84F3D"
                note={p.imageNote}
              />
            </div>
          )}

          {p.mobileImages?.length === 1 && (
            <figure className="mx-auto mt-14 max-w-[280px]">
              <Image
                src={p.mobileImages[0].src}
                alt={p.mobileImages[0].alt}
                width={p.mobileImages[0].w}
                height={p.mobileImages[0].h}
                sizes="280px"
                className="h-auto w-full rounded-[28px] border border-white/15"
              />
              <figcaption className="mt-3 text-center text-xs text-paper/40">{p.mobileImages[0].caption}</figcaption>
            </figure>
          )}

          {p.features && p.features.length > 0 && (
            <div className="mt-16">
              <p className="eyebrow mb-5 text-paper/45">What it does</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-[15px] leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {parts.length > 0 && (
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {parts.map(([label, text]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7">
                  <p className="eyebrow text-signal-300">{label}</p>
                  <p className="mt-4 text-pretty leading-relaxed text-paper/75">{text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-20 flex flex-col items-start justify-between gap-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:flex-row sm:items-center sm:p-10">
            <p className="display max-w-xl text-balance text-2xl font-semibold sm:text-3xl">
              Have something similar in mind?
            </p>
            <Link
              href="/#contact"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
