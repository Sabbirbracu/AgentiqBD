import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BlogArt } from '@/components/blog/blog-art';
import { blogAuthor, formatDate, type PostCard as Card } from '@/lib/blog';
import { cn } from '@/lib/utils';

export function CategoryPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-3 py-1 text-[12.5px] font-semibold text-signal-600', className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </span>
  );
}

export function Byline({ date, minutes, className }: { date: string; minutes: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image src={blogAuthor.photo} alt={blogAuthor.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
      <div className="text-[13.5px] leading-tight">
        <p className="font-semibold text-ink">{blogAuthor.name}</p>
        <p className="mt-0.5 text-ink/55">
          <time dateTime={date}>{formatDate(date)}</time> · {minutes} min read
        </p>
      </div>
    </div>
  );
}

/** Wide card for the newest post at the top of /blog. */
export function FeaturedPostCard({ post }: { post: Card }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-[0_30px_80px_-50px_rgba(10,10,11,0.35)] transition-shadow hover:shadow-[0_40px_90px_-40px_rgba(232,79,61,0.35)] lg:grid-cols-[1.25fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
        <BlogArt art={post.cover} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-paper">Featured</span>
          <CategoryPill>{post.category}</CategoryPill>
        </div>
        <h2 className="mt-6 text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px]">{post.title}</h2>
        <p className="mt-4 text-pretty text-[17px] leading-relaxed text-ink/65">{post.excerpt}</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <Byline date={post.date} minutes={post.minutes} />
          <span className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-[14.5px] font-semibold text-white transition-colors group-hover:bg-signal-600">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ post, headingLevel = 'h2' }: { post: Card; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-signal/30 hover:shadow-[0_30px_60px_-35px_rgba(232,79,61,0.45)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/[0.06]">
        <BlogArt art={post.cover} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <CategoryPill>{post.category}</CategoryPill>
          <span className="font-mono text-[11.5px] uppercase tracking-wider text-ink/45">{post.minutes} min read</span>
        </div>
        <H className="mt-4 text-balance text-[20px] font-bold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-signal-600">{post.title}</H>
        <p className="mt-3 line-clamp-3 text-pretty text-[15px] leading-relaxed text-ink/60">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-[13px] text-ink/50">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
