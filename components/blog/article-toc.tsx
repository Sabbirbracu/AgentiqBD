'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronDown, Link2 } from 'lucide-react';
import { SocialIcon } from '@/components/ui/social-icon';
import type { Heading } from '@/lib/blog';
import { cn } from '@/lib/utils';

/** Tracks which heading is at the top of the viewport, for the table of contents highlight. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

function TocList({ items, active, onPick }: { items: Heading[]; active?: string; onPick?: () => void }) {
  return (
    <ul className="space-y-0.5 border-l border-ink/10">
      {items.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={onPick}
            className={cn(
              '-ml-px block border-l-2 py-1.5 text-[14px] leading-snug transition-colors',
              h.level === 3 ? 'pl-7 text-[13.5px]' : 'pl-4',
              active === h.id ? 'border-signal font-semibold text-ink' : 'border-transparent text-ink/55 hover:border-ink/25 hover:text-ink',
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Left column on wide screens: sticky contents with scroll-spy, reading progress and share links. */
export function ArticleToc({ items, url, title }: { items: Heading[]; url: string; title: string }) {
  const active = useActiveHeading(items.map((h) => h.id));
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('article');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  const share = [
    { kind: 'linkedin' as const, label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { kind: 'x' as const, label: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { kind: 'facebook' as const, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="sticky top-28">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/45">On this page</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/[0.07]">
        <div className="h-full origin-left rounded-full bg-signal transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav aria-label="Table of contents" className="mt-5 max-h-[calc(100vh-22rem)] overflow-y-auto pr-2 scrollbar-none">
        <TocList items={items} active={active} />
      </nav>
      <div className="mt-8 border-t border-ink/10 pt-6">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/45">Share</p>
        <div className="mt-3 flex gap-2">
          {share.map((s) => (
            <a
              key={s.kind}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${s.label}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-signal hover:bg-signal hover:text-white"
            >
              <SocialIcon kind={s.kind} className="h-4 w-4" />
            </a>
          ))}
          <button
            type="button"
            onClick={copy}
            aria-label="Copy link"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-signal hover:bg-signal hover:text-white"
          >
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Below xl the contents collapse into a disclosure above the article. */
export function MobileToc({ items }: { items: Heading[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-10 rounded-2xl border border-ink/10 bg-white xl:hidden">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55">On this page · {items.filter((h) => h.level === 2).length} sections</span>
        <ChevronDown className={cn('h-4 w-4 text-ink/60 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <nav aria-label="Table of contents" className="px-5 pb-5">
          <TocList items={items} onPick={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
