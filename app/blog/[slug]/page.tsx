import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { ArticleBody } from '@/components/blog/article-body';
import { ArticleToc, MobileToc } from '@/components/blog/article-toc';
import { BlogArt } from '@/components/blog/blog-art';
import { Byline, CategoryPill, PostCard } from '@/components/blog/post-card';
import { JsonLd } from '@/components/seo/json-ld';
import { blogAuthor, blogCategories, headings, postBySlug, posts, readMinutes, relatedPosts, toCard, wordCount } from '@/lib/blog';
import { coreServices, founder, site } from '@/lib/content';
import { absoluteUrl, blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  const path = `/blog/${p.slug}`;
  const title = p.metaTitle ?? p.title;
  return {
    title,
    description: p.excerpt,
    keywords: p.keywords,
    authors: [{ name: blogAuthor.name, url: absoluteUrl('/#why') }],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · Agentiq BD`,
      description: p.excerpt,
      url: absoluteUrl(path),
      type: 'article',
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [blogAuthor.name],
      section: p.category,
      tags: p.tags,
    },
  };
}

const widget = 'rounded-[22px] border border-ink/10 bg-white p-5';
const widgetLabel = 'flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const toc = headings(post);
  const minutes = readMinutes(post);
  const related = relatedPosts(post, 3).map(toCard);
  const services = post.services.flatMap((id) => coreServices.filter((c) => c.id === id));

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({
            title: post.title,
            description: post.excerpt,
            path,
            date: post.date,
            updated: post.updated,
            section: post.category,
            keywords: post.keywords,
            words: wordCount(post),
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path },
          ]),
        ]}
      />
      <Navbar />
      <main className="bg-white text-ink">
        {/* Header: aligned with the article column on wide screens */}
        <header className="relative overflow-hidden pt-28 sm:pt-36">
          <div className="pointer-events-none absolute -right-40 -top-32 h-[480px] w-[480px] rounded-full bg-signal/[0.07] blur-[120px]" />
          <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10">
            <div className="xl:grid xl:grid-cols-[210px_minmax(0,1fr)_280px] xl:gap-12">
              <div className="hidden pt-1 xl:block">
                <Link href="/blog" className="group inline-flex items-center gap-2 text-[14px] font-medium text-ink/60 transition-colors hover:text-ink">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> All articles
                </Link>
              </div>
              <div className="max-w-[900px] xl:col-span-2">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-ink/50">
                  <Link href="/" className="transition-colors hover:text-ink">Home</Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <Link href="/blog" className="transition-colors hover:text-ink">Blog</Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <Link href={`/blog?category=${post.category}`} className="transition-colors hover:text-ink">{post.category}</Link>
                </nav>
                <div className="mt-6">
                  <CategoryPill>{post.category}</CategoryPill>
                </div>
                <h1 className="mt-5 text-balance text-[36px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[48px] lg:text-[56px]">{post.title}</h1>
                <p className="mt-5 max-w-[760px] text-pretty text-[18px] leading-relaxed text-ink/65 sm:text-[20px]">{post.excerpt}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6">
                  <Byline date={post.date} minutes={minutes} />
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <li key={t} className="rounded-full border border-ink/10 px-3 py-1 text-[12.5px] text-ink/60">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 xl:grid xl:grid-cols-[210px_minmax(0,1fr)_280px] xl:gap-12">
              <BlogArt art={post.cover} className="aspect-[16/10] rounded-[28px] border border-ink/10 shadow-[0_40px_90px_-50px_rgba(10,10,11,0.45)] sm:aspect-video xl:col-span-2 xl:col-start-2" />
            </div>
          </div>
        </header>

        {/* Body: contents | article | sidebar */}
        <div className="mx-auto w-full max-w-[1360px] px-5 pb-24 pt-14 sm:px-8 sm:pt-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[210px_minmax(0,1fr)_280px]">
            <aside className="hidden xl:block">
              <ArticleToc items={toc} url={url} title={post.title} />
            </aside>

            <article id="article" className="min-w-0 max-w-[720px]">
              <MobileToc items={toc} />

              <section aria-label="In short" className="mb-12 rounded-[22px] border border-signal/20 bg-signal/[0.04] p-6 sm:p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-signal-600">In short</p>
                <ul className="mt-4 space-y-3">
                  {post.takeaways.map((t) => (
                    <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                      <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-white">
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </section>

              <ArticleBody blocks={post.body} />

              <div className="mt-16 flex flex-col gap-6 rounded-[24px] border border-ink/10 bg-paper-50 p-6 sm:flex-row sm:items-center sm:p-7">
                <Image src={founder.photo} alt={founder.name} width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">Written by</p>
                  <p className="mt-1 text-[18px] font-bold text-ink">{founder.name}</p>
                  <p className="text-[14.5px] text-ink/60">{founder.title}, Agentiq BD</p>
                  <p className="mt-2 text-[15px] text-ink/70">{founder.vision}</p>
                </div>
                <Link href="/#why" className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-signal-600 hover:text-signal-700">
                  About us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>

            <aside className="flex flex-col gap-5">
              <div className={widget}>
                <p className={widgetLabel}>
                  <Sparkles className="h-3.5 w-3.5 text-signal" /> Recommended for you
                </p>
                <ul className="mt-4 divide-y divide-ink/[0.07]">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="group flex gap-3.5 py-3.5 first:pt-0 last:pb-0">
                        <BlogArt art={r.cover} className="aspect-[16/10] w-[88px] shrink-0 rounded-lg border border-ink/10" />
                        <div className="min-w-0">
                          <p className="line-clamp-3 text-[14px] font-semibold leading-snug text-ink transition-colors group-hover:text-signal-600">{r.title}</p>
                          <p className="mt-1.5 text-[12px] text-ink/45">
                            {r.category} · {r.minutes} min
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {services.length > 0 && (
                <div className={widget}>
                  <p className={widgetLabel}>Related services</p>
                  <ul className="mt-3 space-y-1">
                    {services.map((s) => (
                      <li key={s.id}>
                        <Link href={`/services/${s.id}`} className="group -mx-2 flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-[14.5px] font-medium text-ink/80 transition-colors hover:bg-signal/[0.06] hover:text-ink">
                          {s.title}
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/35 transition-colors group-hover:text-signal" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={widget}>
                <p className={widgetLabel}>Topics</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blogCategories.map((c) => (
                    <Link
                      key={c}
                      href={`/blog?category=${c}`}
                      className={
                        c === post.category
                          ? 'rounded-full bg-ink px-3 py-1.5 text-[13px] font-medium text-paper'
                          : 'rounded-full border border-ink/10 px-3 py-1.5 text-[13px] text-ink/65 transition-colors hover:border-signal/40 hover:text-ink'
                      }
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[22px] bg-signal p-6 text-white lg:sticky lg:top-28">
                <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-ink/25 blur-[60px]" />
                <div className="relative">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Free discovery call</p>
                  <p className="mt-3 text-[21px] font-bold leading-snug tracking-[-0.01em]">Talk to the engineer who would build it.</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">Describe the bottleneck. We will tell you honestly whether AI, automation or plain software fits.</p>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex h-11 items-center justify-center gap-2 rounded-full bg-white text-[14.5px] font-semibold text-ink transition-colors hover:bg-paper"
                  >
                    Book a call <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 flex h-11 items-center justify-center rounded-full border border-white/40 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    WhatsApp us
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="border-t border-ink/[0.07] bg-paper-50 py-20">
          <div className="container-x">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-[28px] font-bold tracking-[-0.02em] sm:text-[32px]">Keep reading</h2>
              <Link href="/blog" className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-signal-600 hover:text-signal-700">
                All articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PostCard key={r.slug} post={r} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
