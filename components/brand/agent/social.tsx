import type { ReactNode } from 'react';
import { Logo, LogoMark } from '@/components/brand/logo';
import { cn } from '@/lib/utils';
import { ControlRoom } from './control-room';
import { CustomVisual, ErpVisual, WorkflowVisual } from './service-visuals';

/**
 * Fixed-size social templates (Facebook / LinkedIn / Instagram). Rendered at their real pixel
 * size on /brand/export/<name> and screenshotted by scripts/export-brand.mjs, so they use the
 * website's own fonts and the same visuals as the site.
 */

const gridLight =
  'bg-[linear-gradient(rgba(10,10,11,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,0.045)_1px,transparent_1px)] [background-size:54px_54px]';
const gridDark =
  'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:54px_54px]';

/* ───────────── profile picture ───────────── */

export function ProfileTile({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  const dark = tone === 'ink';
  return (
    <div className={cn('relative flex h-[1080px] w-[1080px] items-center justify-center overflow-hidden', dark ? 'bg-ink text-paper' : 'bg-paper text-ink')}>
      <div
        className={cn(
          'absolute inset-0',
          dark
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(232,79,61,0.5),rgba(232,79,61,0)_55%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(232,79,61,0.2),rgba(232,79,61,0)_55%)]',
        )}
      />
      <LogoMark boxed={false} hand={dark ? '#FCFCF4' : '#FCFCF4'} className="relative h-[560px] w-[560px]" />
    </div>
  );
}

/* ───────────── Facebook cover 1640 × 624 ───────────── */

export function CoverTile() {
  return (
    <div className={cn('relative h-[624px] w-[1640px] overflow-hidden bg-paper-100', gridLight)}>
      <div className="absolute -right-20 top-[-80px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(232,79,61,0.2),transparent_65%)]" />
      <div className="absolute left-[96px] top-[84px] z-10">
        <Logo size="lg" className="origin-top-left scale-[1.5]" />
        <h1 className="mt-14 max-w-[820px] font-display text-[84px] font-bold leading-[1] tracking-[-0.025em] text-ink">
          Turn complexity
          <br />
          into <span className="accent-serif text-scarlet">intelligence.</span>
        </h1>
        <div className="mt-9 flex gap-3 font-mono text-[17px] font-medium uppercase tracking-[0.14em] text-ink/70">
          {['AI Employees', 'Automation', 'AI ERP', 'Custom AI'].map((t) => (
            <span key={t} className="rounded-full border border-ink/20 bg-white px-4 py-2">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute right-[120px] top-[62px] w-[600px]">
        <ControlRoom dark={false} />
      </div>
    </div>
  );
}

/* ───────────── 1080 × 1080 service posts ───────────── */

const posts: Record<
  string,
  { n: string; label: string; title: ReactNode; kicker: string; tone: 'ink' | 'paper'; visual: (dark: boolean) => ReactNode }
> = {
  employees: {
    n: '01',
    label: 'AI Employees',
    title: (
      <>
        Meet the team that <span className="accent-serif text-signal">never clocks out.</span>
      </>
    ),
    kicker: 'Support · Sales & leads · Bookings · Custom roles',
    tone: 'ink',
    visual: (d) => (
      <div className="w-[720px]">
        <ControlRoom dark={d} />
      </div>
    ),
  },
  workflow: {
    n: '02',
    label: 'AI Workflow Automation',
    title: (
      <>
        Connect the work <span className="accent-serif text-signal">between your tools.</span>
      </>
    ),
    kicker: 'Request → AI → CRM → follow-up, hands-free',
    tone: 'paper',
    visual: (d) => <WorkflowVisual dark={d} className="w-[900px]" />,
  },
  erp: {
    n: '03',
    label: 'AI-Enabled ERP',
    title: (
      <>
        Operations on <span className="accent-serif text-signal">one connected platform.</span>
      </>
    ),
    kicker: 'Procurement · Inventory · Production · Orders',
    tone: 'ink',
    visual: (d) => <ErpVisual dark={d} className="w-[900px]" />,
  },
  custom: {
    n: '04',
    label: 'Custom AI Engineering',
    title: (
      <>
        Built around how you <span className="accent-serif text-signal">actually run.</span>
      </>
    ),
    kicker: 'RAG · integrations · internal tools · dashboards',
    tone: 'paper',
    visual: (d) => <CustomVisual dark={d} className="w-[900px]" />,
  },
};

export const postKeys = Object.keys(posts);

export function PostTile({ kind }: { kind: string }) {
  const p = posts[kind];
  const dark = p.tone === 'ink';
  return (
    <div className={cn('relative h-[1080px] w-[1080px] overflow-hidden', dark ? cn('bg-ink text-paper', gridDark) : cn('bg-paper-100 text-ink', gridLight))}>
      <div
        className={cn(
          'absolute left-1/2 top-[360px] h-[900px] w-[900px] -translate-x-1/2 rounded-full',
          dark ? 'bg-[radial-gradient(circle,rgba(232,79,61,0.4),transparent_66%)]' : 'bg-[radial-gradient(circle,rgba(232,79,61,0.2),transparent_66%)]',
        )}
      />
      <div className="absolute inset-x-[72px] top-[64px] flex items-center justify-between">
        <Logo size="lg" tone={dark ? 'paper' : 'ink'} className="origin-left scale-[1.3]" />
        <span className={cn('font-mono text-[20px] font-medium uppercase tracking-[0.18em]', dark ? 'text-paper/60' : 'text-ink/55')}>
          <span className="text-signal">{p.n}</span> — {p.label}
        </span>
      </div>
      <h2 className="absolute inset-x-[72px] top-[150px] font-display text-[78px] font-bold leading-[1.03] tracking-[-0.025em]">
        {p.title}
      </h2>
      <div className="absolute inset-x-0 top-[380px] flex justify-center">{p.visual(dark)}</div>
      <div className="absolute inset-x-[72px] bottom-[56px] flex items-end justify-between">
        <p className={cn('max-w-[620px] text-[26px] leading-snug', dark ? 'text-paper/70' : 'text-ink/65')}>{p.kicker}</p>
        <span className="rounded-full bg-signal px-7 py-3.5 font-sans text-[24px] font-bold text-paper">agentiqbd.com</span>
      </div>
    </div>
  );
}
