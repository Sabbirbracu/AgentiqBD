import { Database, Globe, MessageCircle, CalendarDays, Mail, CheckCircle2, Ticket } from 'lucide-react';
import { AgentTile, agentMeta, type AgentRole } from './tile';
import { cn } from '@/lib/utils';

/**
 * "Control room" illustration: the AI Employee team as it would look in an operations view.
 * Values are the ones used in the sample conversations on the site — illustrative, not live data.
 */

const rows: { role: AgentRole; task: string; status: string }[] = [
  { role: 'support', task: 'Order lookup · ticket #2841', status: 'Replying' },
  { role: 'lead', task: 'Qualifying · 3-branch enquiry', status: 'Scoring' },
  { role: 'booking', task: 'Thursday 6:15 pm · reminder set', status: 'Booking' },
  { role: 'custom', task: 'Supplier invoice · 1 mismatch', status: 'Reviewing' },
];

export function ControlRoom({ dark = true, className }: { dark?: boolean; className?: string }) {
  const surface = dark ? 'dark' : 'light';
  return (
    <div className={cn('cr relative mx-auto w-full max-w-[580px] select-none', className)}>
      {/* soft glow behind the panel */}
      <div
        aria-hidden
        className={cn(
          'absolute -inset-6 -z-10 rounded-[48px] blur-3xl',
          dark ? 'bg-signal/25' : 'bg-signal/15',
        )}
      />

      <div
        className={cn(
          'overflow-hidden rounded-[26px] border',
          dark
            ? 'border-white/12 bg-[#111113]/95 text-paper shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]'
            : 'border-ink/10 bg-white text-ink shadow-[0_40px_80px_-40px_rgba(10,10,11,0.45)]',
        )}
      >
        {/* window bar */}
        <div className={cn('flex items-center justify-between border-b px-5 py-3.5', dark ? 'border-white/10' : 'border-ink/10')}>
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className={cn('h-2.5 w-2.5 rounded-full', dark ? 'bg-white/15' : 'bg-ink/15')} />
              ))}
            </span>
            <span className={cn('ml-2 font-mono text-[11px] uppercase tracking-[0.16em]', dark ? 'text-paper/55' : 'text-ink/50')}>
              AI Employees
            </span>
          </div>
          <span className={cn('flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]', dark ? 'text-paper/70' : 'text-ink/60')}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            4 active
          </span>
        </div>

        {/* agents */}
        <ul>
          {rows.map((r, i) => {
            const m = agentMeta[r.role];
            return (
              <li
                key={r.role}
                className={cn('flex items-center gap-4 px-5 py-4', dark ? 'border-white/[0.07]' : 'border-ink/[0.07]', i > 0 && 'border-t')}
              >
                <AgentTile role={r.role} surface={surface} className="h-12 w-12" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate font-display text-[15px] font-semibold leading-none">{m.name}</p>
                    <span
                      className={cn(
                        'flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                        dark ? 'bg-signal/15 text-signal-300' : 'bg-signal/10 text-signal-600',
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      {r.status}
                    </span>
                  </div>
                  <p className={cn('mt-1.5 truncate text-[13px]', dark ? 'text-paper/55' : 'text-ink/55')}>{r.task}</p>
                  <div className={cn('mt-2.5 h-[3px] overflow-hidden rounded-full', dark ? 'bg-white/10' : 'bg-ink/10')}>
                    <span
                      className="cr-bar block h-full origin-left rounded-full bg-signal"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* connected systems */}
        <div
          className={cn(
            'flex items-center justify-between gap-3 border-t px-5 py-3.5',
            dark ? 'border-white/10 bg-white/[0.03]' : 'border-ink/10 bg-ink/[0.025]',
          )}
        >
          <span className={cn('font-mono text-[10.5px] uppercase tracking-[0.16em]', dark ? 'text-paper/40' : 'text-ink/40')}>
            Connected
          </span>
          <div className={cn('flex items-center gap-4', dark ? 'text-paper/65' : 'text-ink/60')}>
            {[Globe, MessageCircle, Mail, Database, CalendarDays].map((Icon, i) => (
              <Icon key={i} className="h-4 w-4" strokeWidth={1.8} />
            ))}
          </div>
        </div>
      </div>

      {/* floating confirmations */}
      <div
        className={cn(
          'cr-float absolute -right-3 -top-6 flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 sm:-right-8',
          dark
            ? 'border-white/15 bg-[#1b1b1f] text-paper shadow-[0_20px_40px_-18px_rgba(0,0,0,0.8)]'
            : 'border-ink/10 bg-white text-ink shadow-[0_20px_40px_-18px_rgba(10,10,11,0.4)]',
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-paper">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold">Lead scored 86/100</span>
          <span className={cn('block font-mono text-[10px] uppercase tracking-wider', dark ? 'text-paper/45' : 'text-ink/45')}>
            CRM · owner assigned
          </span>
        </span>
      </div>
      <div
        className={cn(
          'cr-float absolute -bottom-6 -left-3 flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 [animation-delay:-2.4s] sm:-left-8',
          dark
            ? 'border-white/15 bg-[#1b1b1f] text-paper shadow-[0_20px_40px_-18px_rgba(0,0,0,0.8)]'
            : 'border-ink/10 bg-white text-ink shadow-[0_20px_40px_-18px_rgba(10,10,11,0.4)]',
        )}
      >
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', dark ? 'bg-white/10 text-paper' : 'bg-ink text-paper')}>
          <Ticket className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold">Ticket #2841 logged</span>
          <span className={cn('block font-mono text-[10px] uppercase tracking-wider', dark ? 'text-paper/45' : 'text-ink/45')}>
            Helpdesk · notified
          </span>
        </span>
      </div>
    </div>
  );
}
