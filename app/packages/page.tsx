import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { packageArt } from '@/components/brand/package-art';
import { PackageCards } from '@/components/sections/package-landing';
import { SolutionShell } from '@/components/sections/solution-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { packages } from '@/lib/content';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';

const description =
  'Fixed-scope packages from Agentiq BD with starting prices and timelines: a free 48-hour AI business audit, AI e-commerce, SaaS MVPs, AI workflow automation and custom business software.';

export const metadata: Metadata = {
  title: 'Packages & Pricing: AI and Software Development',
  description,
  alternates: { canonical: '/packages' },
  openGraph: { title: 'Packages & Pricing · Agentiq BD', description, url: absoluteUrl('/packages'), type: 'website' },
};

export default function PackagesIndex() {
  const [audit, ...paid] = packages;
  return (
    <SolutionShell tone="light" ctaTitle="Not sure which package fits? Start with the free audit.">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Packages', path: '/packages' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: packages.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.title,
              url: absoluteUrl(`/packages/${p.id}`),
            })),
          },
        ]}
      />
      <section className="container-x pb-20 pt-24 sm:pb-28 sm:pt-28">
        <p className="eyebrow text-signal">Packages</p>
        <h1 className="display mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Clear packages, with prices and timelines <span className="accent-serif text-signal">up front.</span>
        </h1>
        <p className="mt-7 max-w-3xl text-pretty text-xl leading-relaxed text-ink/65">
          Each package shows who it is for, the problem it solves, what you get, and where the price and timeline start. Not sure
          which one fits? Start with the free audit.
        </p>

        <Link
          href={`/packages/${audit.id}`}
          className="group grain relative mt-14 grid items-center gap-8 overflow-hidden rounded-[28px] bg-ink p-6 text-paper sm:p-10 lg:grid-cols-[1fr_1fr]"
        >
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-96 rounded-full bg-signal/25 blur-[100px]" />
          <div className="relative">
            <p className="eyebrow flex items-center gap-3 text-paper/55">
              <span className="rounded-full bg-signal px-3 py-1 font-semibold text-paper">100% free</span>
              Start here · {audit.timeline}
            </p>
            <h2 className="display mt-5 text-3xl font-semibold sm:text-4xl">{audit.title}</h2>
            <p className="mt-3 max-w-lg text-pretty text-lg leading-relaxed text-paper/65">{audit.description}</p>
            {audit.includes && (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {audit.includes.map((x) => (
                  <li key={x.title} className="text-[15px] text-paper/80">
                    <span className="text-signal-300">✓</span> {x.title}
                  </li>
                ))}
              </ul>
            )}
            <span className="mt-8 inline-flex items-center gap-2 font-medium text-signal-300">
              See the free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
          <div aria-hidden className="relative rounded-[20px] border border-white/10 bg-[#141416] p-3 sm:p-4">
            {packageArt[audit.id]?.()}
          </div>
        </Link>

        <PackageCards items={paid} className="mt-5" />
      </section>
    </SolutionShell>
  );
}
