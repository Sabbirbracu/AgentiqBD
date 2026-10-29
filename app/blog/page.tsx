import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { BlogIndex } from '@/components/blog/blog-index';
import { JsonLd } from '@/components/seo/json-ld';
import { blogCategories, blogMeta, posts, toCard } from '@/lib/blog';
import { site } from '@/lib/content';
import { absoluteUrl, breadcrumbJsonLd, founderId, orgId } from '@/lib/seo';

export const metadata: Metadata = {
  title: blogMeta.metaTitle,
  description: blogMeta.description,
  alternates: { canonical: '/blog' },
  openGraph: { title: `${blogMeta.metaTitle} · Agentiq BD`, description: blogMeta.description, url: absoluteUrl('/blog'), type: 'website' },
};

export default function BlogPage() {
  const cards = posts.map(toCard);

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${absoluteUrl('/blog')}#blog`,
            name: 'Agentiq BD Blog',
            description: blogMeta.description,
            url: absoluteUrl('/blog'),
            publisher: { '@id': orgId },
            inLanguage: 'en',
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.date,
              author: { '@id': founderId },
            })),
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />
      <Navbar />
      <main className="bg-white text-ink">
        <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
          <div className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full bg-signal/[0.08] blur-[120px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(rgba(10,10,11,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="container-x relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/70">Agentiq BD Blog</span>
            </span>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
              <h1 className="text-balance text-[40px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[56px] lg:text-[64px]">
                Notes from building AI that <span className="text-signal">actually works.</span>
              </h1>
              <p className="text-pretty text-[17px] leading-relaxed text-ink/65 sm:text-[18px] lg:pb-2">
                How AI agents work, how we build and test them, and honest lessons from shipping software in Bangladesh. Written for business owners and the engineers who work with them.
              </p>
            </div>

            <div className="mt-12">
              <Suspense fallback={null}>
                <BlogIndex cards={cards} categories={blogCategories} />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[32px] bg-signal px-7 py-12 text-white sm:px-12 sm:py-14">
              <div className="pointer-events-none absolute -bottom-32 -right-20 h-[380px] w-[380px] rounded-full bg-ink/25 blur-[90px]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <p className="text-balance text-[28px] font-bold leading-tight tracking-[-0.02em] sm:text-[36px]">Have a process that needs fixing?</p>
                  <p className="mt-3 text-pretty text-[17px] leading-relaxed text-white/80">
                    Tell us where the work slows down. You talk directly to the engineer who would build it, and we will say honestly whether AI is the right tool.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-paper"
                  >
                    Book a discovery call
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center rounded-full border border-white/40 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Chat on WhatsApp
                  </a>
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
