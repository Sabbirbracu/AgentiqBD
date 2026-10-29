import Link from 'next/link';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { BlogArt } from '@/components/blog/blog-art';
import { slugify, type Block } from '@/lib/blog';
import { cn } from '@/lib/utils';

/** Renders **bold**, `code` and [text](href) inside a string. Internal links use next/link; external ones open in a new tab. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return (
            <code key={i} className="rounded-md border border-ink/10 bg-paper-200/70 px-1.5 py-0.5 font-mono text-[0.86em] text-ink">
              {part.slice(1, -1)}
            </code>
          );
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const cls = 'font-medium text-ink underline decoration-signal/50 decoration-2 underline-offset-[5px] transition-colors hover:text-signal-600 hover:decoration-signal';
          return href.startsWith('/') ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

const calloutStyle = {
  note: { box: 'border-ink/10 bg-paper-200/60', icon: 'bg-ink text-paper', Icon: Info },
  tip: { box: 'border-signal/25 bg-signal/[0.05]', icon: 'bg-signal text-white', Icon: Lightbulb },
  warning: { box: 'border-signal/40 bg-signal/[0.08]', icon: 'bg-signal-700 text-white', Icon: AlertTriangle },
} as const;

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'p':
      return (
        <p className="mt-6 text-pretty text-[17.5px] leading-[1.8] text-ink/80 sm:text-[18px]">
          <Inline text={b.text} />
        </p>
      );
    case 'h2':
      return (
        <h2 id={slugify(b.text)} className="group mt-16 scroll-mt-28 text-balance text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
          <a href={`#${slugify(b.text)}`} className="relative">
            <span aria-hidden className="absolute -left-6 top-0 hidden text-signal opacity-0 transition-opacity group-hover:opacity-100 xl:inline">
              #
            </span>
            {b.text}
          </a>
        </h2>
      );
    case 'h3':
      return (
        <h3 id={slugify(b.text)} className="mt-10 scroll-mt-28 text-[20px] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[21px]">
          {b.text}
        </h3>
      );
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul';
      return (
        <L className="mt-6 space-y-3.5">
          {b.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-[17.5px] leading-[1.75] text-ink/80 sm:text-[18px]">
              {b.ordered ? (
                <span className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/10 font-mono text-[12px] font-semibold text-signal-600">{i + 1}</span>
              ) : (
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-[3px] bg-signal" />
              )}
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </L>
      );
    }
    case 'steps':
      return (
        <ol className="relative mt-8 space-y-4 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-signal/25">
          {b.items.map((s, i) => (
            <li key={i} className="relative flex gap-5">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal font-mono text-[13px] font-semibold text-white ring-4 ring-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_1px_0_rgba(10,10,11,0.03)]">
                <p className="text-[17px] font-bold text-ink">{s.title}</p>
                <p className="mt-1.5 text-[16.5px] leading-relaxed text-ink/70">
                  <Inline text={s.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <figure className="my-12 border-l-4 border-signal pl-6 sm:pl-8">
          <blockquote className="text-balance text-[24px] font-bold leading-snug tracking-[-0.015em] text-ink sm:text-[28px]">“{b.text}”</blockquote>
          {b.cite && <figcaption className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink/50">{b.cite}</figcaption>}
        </figure>
      );
    case 'callout': {
      const s = calloutStyle[b.tone];
      return (
        <aside className={cn('my-10 flex gap-4 rounded-2xl border p-5 sm:p-6', s.box)}>
          <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', s.icon)}>
            <s.Icon className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="text-[16.5px] font-bold text-ink">{b.title}</p>
            <p className="mt-1.5 text-[16.5px] leading-relaxed text-ink/75">
              <Inline text={b.text} />
            </p>
          </div>
        </aside>
      );
    }
    case 'code':
      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-ink/10 bg-paper-50">
          <figcaption className="flex items-center justify-between gap-3 border-b border-ink/10 bg-paper-200/60 px-5 py-3">
            <span className="text-[13.5px] font-medium text-ink/70">{b.caption ?? 'Example'}</span>
            <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-signal-600 ring-1 ring-ink/10">{b.lang}</span>
          </figcaption>
          <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.7] text-ink/85">
            <code>{b.code}</code>
          </pre>
        </figure>
      );
    case 'table':
      return (
        <figure className="my-10">
          <div className="overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-paper-200/70">
                  {b.head.map((h, i) => (
                    <th key={i} className="px-4 py-3 font-semibold text-ink first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/[0.07] bg-white">
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j} className={cn('px-4 py-3 align-top leading-relaxed first:pl-5', j === 0 ? 'font-medium text-ink' : 'text-ink/70')}>
                        <Inline text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caption && <figcaption className="mt-3 text-[13.5px] text-ink/50">{b.caption}</figcaption>}
        </figure>
      );
    case 'figure':
      return (
        <figure className="my-12">
          <BlogArt art={b.art} className="aspect-[16/10] rounded-2xl border border-ink/10" />
          <figcaption className="mt-3 text-[13.5px] leading-relaxed text-ink/55">{b.caption}</figcaption>
        </figure>
      );
  }
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </div>
  );
}
