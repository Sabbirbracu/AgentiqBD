import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SolutionShell } from '@/components/sections/solution-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { coreServices } from '@/lib/content';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';

const description =
  'AI agents, chatbots, voice AI, workflow automation, RAG, integrations, industrial AI and ERP, custom software and reporting from Agentiq BD in Dhaka, Bangladesh.';

export const metadata: Metadata = {
  title: 'AI, Automation & Software Services',
  description,
  alternates: { canonical: '/services' },
  openGraph: { title: 'AI, Automation & Software Services · Agentiq BD', description, url: absoluteUrl('/services'), type: 'website' },
};

export default function ServicesIndex() {
  return (
    <SolutionShell tone="dark" ctaTitle="Not sure which service fits? Describe the bottleneck.">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: coreServices.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.title,
              url: absoluteUrl(`/services/${s.id}`),
            })),
          },
        ]}
      />
      <section className="container-x pb-20 pt-24 sm:pb-28 sm:pt-28">
        <p className="eyebrow text-signal-300">Services</p>
        <h1 className="display mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl">
          AI, automation and software services
        </h1>
        <p className="mt-7 max-w-3xl text-pretty text-xl leading-relaxed text-paper/75">
          Agentiq BD is an AI engineering and software company in Dhaka, Bangladesh. Nine services, one approach:
          start from the bottleneck in your business, then build only what helps.
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s) => (
            <li key={s.id}>
              <Link
                href={`/services/${s.id}`}
                className="group flex h-full flex-col rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/30"
              >
                <p className="eyebrow text-signal-300">{s.category}</p>
                <h2 className="display mt-3 text-2xl font-semibold">{s.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-paper/65">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-paper/80 group-hover:text-signal-300">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SolutionShell>
  );
}
