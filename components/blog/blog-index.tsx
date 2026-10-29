'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FeaturedPostCard, PostCard } from '@/components/blog/post-card';
import type { BlogCategory, PostCard as Card } from '@/lib/blog';
import { cn } from '@/lib/utils';

/** Category filter + featured card + three-column grid. The filter lives in `?category=` so sidebar topic links can point at it. */
export function BlogIndex({ cards, categories }: { cards: Card[]; categories: BlogCategory[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const param = params.get('category');
  const active = categories.find((c) => c === param) ?? null;
  const shown = active ? cards.filter((c) => c.category === active) : cards;
  const [featured, ...rest] = shown;

  const pick = (c: BlogCategory | null) => router.replace(c ? `/blog?category=${encodeURIComponent(c)}` : '/blog', { scroll: false });
  const chip = (on: boolean) =>
    cn(
      'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors',
      on ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-white text-ink/70 hover:border-ink/25 hover:text-ink',
    );

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by topic">
        <button type="button" role="tab" aria-selected={!active} onClick={() => pick(null)} className={chip(!active)}>
          All articles
          <span className={cn('font-mono text-[11px]', !active ? 'text-paper/60' : 'text-ink/40')}>{cards.length}</span>
        </button>
        {categories.map((c) => {
          const n = cards.filter((x) => x.category === c).length;
          if (!n) return null;
          return (
            <button key={c} type="button" role="tab" aria-selected={active === c} onClick={() => pick(c)} className={chip(active === c)}>
              {c}
              <span className={cn('font-mono text-[11px]', active === c ? 'text-paper/60' : 'text-ink/40')}>{n}</span>
            </button>
          );
        })}
      </div>

      {featured && (
        <div className="mt-10">
          <FeaturedPostCard post={featured} />
        </div>
      )}

      {rest.length > 0 && (
        <>
          <div className="mb-6 mt-16 flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
            <p className="text-[22px] font-bold tracking-[-0.01em] text-ink">{active ? `More in ${active}` : 'Latest articles'}</p>
            <p className="font-mono text-[12px] uppercase tracking-wider text-ink/45">{rest.length} articles</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <PostCard key={c.slug} post={c} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
