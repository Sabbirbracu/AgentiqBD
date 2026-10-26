import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/ui/spotlight';
import { PhoneMarquee, Showcase } from '@/components/ui/showcase';
import { StackCards } from '@/components/ui/stack-cards';
import { projects, sectionNo, type ProjectStatus } from '@/lib/content';
import { cn } from '@/lib/utils';

export const statusStyle: Record<ProjectStatus, string> = {
  Completed: 'bg-emerald-500/12 text-emerald-700',
  Deployed: 'bg-emerald-500/12 text-emerald-700',
  MVP: 'bg-amber-500/15 text-amber-700',
  'In development': 'bg-ink/[0.07] text-ink/70',
};

/* ── Custom graphics for projects that have no screenshots to show. Static, decorative, aria-hidden. ── */

function AutomationArt() {
  const nodes = ['Campaign', 'New lead', 'Follow-up'];
  return (
    <svg viewBox="0 0 360 150" className="h-full w-full" fill="none">
      <rect x="118" y="14" width="124" height="24" rx="12" className="fill-white/10" />
      <circle cx="132" cy="26" r="3.5" className="fill-signal" />
      <text x="142" y="29.5" fontSize="10" className="font-mono fill-paper/60">Runs on a schedule</text>
      {nodes.map((n, i) => (
        <g key={n}>
          <rect x={18 + i * 120} y="62" width="84" height="46" rx="12" className={i === 2 ? 'fill-signal' : 'fill-white/10'} />
          <text x={60 + i * 120} y="89" textAnchor="middle" fontSize="11" className={`font-mono ${i === 2 ? 'fill-paper' : 'fill-paper/75'}`}>
            {n}
          </text>
          {i < 2 && (
            <>
              <path d={`M${106 + i * 120} 85 H${134 + i * 120}`} stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 4" />
              <path d={`M${134 + i * 120} 80 l6 5 l-6 5 z`} fill="white" fillOpacity="0.4" />
            </>
          )}
        </g>
      ))}
      <path d="M60 108 V128 H300 V108" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="180" y="143" textAnchor="middle" fontSize="9" className="font-mono fill-paper/35">Connected to the team’s own tools</text>
    </svg>
  );
}

function MatchArt() {
  const card = (x: number) => (
    <g>
      <rect x={x} y="22" width="112" height="106" rx="14" className="fill-white/[0.06] stroke-white/15" />
      <circle cx={x + 56} cy="55" r="17" className="fill-white/20" />
      <circle cx={x + 56} cy="50" r="6" className="fill-white/45" />
      <path d={`M${x + 44} 66 a12 8 0 0 1 24 0`} className="fill-white/45" />
      <rect x={x + 26} y="84" width="60" height="7" rx="3.5" className="fill-white/30" />
      <rect x={x + 36} y="98" width="40" height="5" rx="2.5" className="fill-white/15" />
      <rect x={x + 30} y="110" width="52" height="8" rx="4" className="fill-white/10" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 150" className="h-full w-full" fill="none">
      {card(30)}
      {card(218)}
      <path d="M144 78 H168 M192 78 H216" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="180" cy="78" r="21" className="fill-signal" />
      <path d="M180 90 C170 83 166 77 169 72 C172 68 178 70 180 74 C182 70 188 68 191 72 C194 77 190 83 180 90 Z" className="fill-paper" />
    </svg>
  );
}

const arts: Record<string, () => ReactNode> = {
  'marketing-automation': () => <AutomationArt />,
  'matrimony-platform': () => <MatchArt />,
};

type Project = (typeof projects)[number];

const pad = (n: number) => String(n).padStart(2, '0');

function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider',
        statusStyle[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/** One project card. Real screenshots when we have them, a custom graphic when we do not. Alternates sides. */
function Card({ p, n, flip }: { p: Project; n: number; flip: boolean }) {
  const phones = p.mobileImages;
  const art = arts[p.id];
  const highlights = (p.features ?? []).slice(0, 3);
  return (
    <SpotlightCard className="group relative grid overflow-hidden rounded-[32px] border border-ink/10 bg-paper shadow-[0_40px_90px_-45px_rgba(10,10,11,0.4)] lg:grid-cols-[1.12fr_0.88fr]">
      <Link
        href={`/work/${p.id}`}
        aria-label={`${p.title}: view details`}
        className={cn('grain relative block min-h-[300px] overflow-hidden bg-gradient-to-br from-ink-700 to-ink lg:min-h-[460px]', flip && 'lg:order-2')}
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-signal/25 blur-[100px]" />
        {phones && phones.length > 0 ? (
          <div className="absolute inset-0">
            <PhoneMarquee images={phones} compact duration={32} />
          </div>
        ) : p.images.length > 0 ? (
          <div className="relative grid h-full place-items-end px-6 pt-10 sm:px-10">
            <Showcase images={p.images} label={p.liveUrl?.replace(/^https?:\/\//, '')} compact interval={4200 + n * 700} className="w-full" />
          </div>
        ) : (
          <div aria-hidden className="relative flex h-full min-h-[300px] items-center justify-center p-8 sm:p-12 lg:min-h-[460px]">
            <div className="w-full max-w-[460px]">{art?.()}</div>
          </div>
        )}
      </Link>

      <div className="relative flex flex-col justify-center overflow-hidden p-7 sm:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[9rem] font-semibold leading-none text-ink/[0.045]"
        >
          {pad(n)}
        </span>

        <div className="relative flex items-center justify-between gap-4">
          <p className="eyebrow text-ink/45">{p.kind}</p>
          <StatusPill status={p.status} />
        </div>

        <h3 className="display relative mt-6 text-balance text-[2rem] font-bold leading-[1.1] sm:text-4xl">{p.title}</h3>
        <p className="relative mt-3 text-pretty text-[15px] leading-relaxed text-ink/65">{p.summary}</p>

        {highlights.length > 0 && (
          <ul className="relative mt-6 space-y-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[14.5px] leading-snug text-ink/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/10 pt-6">
          <Link
            href={`/work/${p.id}`}
            className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-signal"
          >
            View case details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-[15px] font-medium text-ink/70 transition-colors hover:text-signal"
            >
              Visit live site
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Work() {
  return (
    <section id="work" className="bg-paper-200/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={sectionNo('work')}
          label="Selected work"
          title={
            <>
              Proof, not{' '}
              <span className="accent-serif text-signal">promises.</span>
            </>
          }
        >
          Systems we’ve engineered and delivered, each labelled with its current status. Client names
          and screenshots are shared only where we have permission.
        </SectionHeading>

        <div className="mt-14">
          <StackCards>
            {projects.map((p, i) => (
              <Card key={p.id} p={p} n={i + 1} flip={i % 2 === 1} />
            ))}
          </StackCards>
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-[24px] bg-ink p-7 text-paper sm:flex-row sm:items-center sm:p-8">
            <p className="max-w-xl text-pretty text-lg text-paper/75">
              Want to see more, or discuss something similar? We’re happy to walk you through
              relevant work.
            </p>
            <a
              href="#contact"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600"
            >
              Discuss a similar project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
