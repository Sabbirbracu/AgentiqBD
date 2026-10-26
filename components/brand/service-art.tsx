import { ArrowRight, Plug } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ── Small illustrations: each tile shows what the service does. All are static, decorative and aria-hidden. ── */

function AgentsArt() {
  const rows = [
    ['SupportAgent', 'Answering an order query', 'bg-emerald-400'],
    ['LeadAgent', 'Scoring a new enquiry', 'bg-signal'],
    ['BookingAgent', 'Confirming Thursday 6:15 pm', 'bg-amber-400'],
  ];
  return (
    <div className="space-y-2.5">
      {rows.map(([name, status, dot], i) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
          style={{ marginLeft: `${i * 14}px` }}
        >
          <span className={cn('h-2 w-2 shrink-0 animate-pulse rounded-full', dot)} style={{ animationDelay: `${i * 300}ms` }} />
          <span className="text-sm font-medium">{name}</span>
          <span className="truncate text-xs text-paper/45">{status}</span>
        </div>
      ))}
      <p className="pl-1 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/30">Illustrative</p>
    </div>
  );
}

function ChatArt() {
  return (
    <div className="space-y-2">
      <div className="w-fit rounded-2xl rounded-bl-md bg-ink/[0.07] px-3.5 py-2 text-[13px] text-ink/70">Where is my order?</div>
      <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-signal px-3.5 py-2 text-[13px] text-paper">With the courier, due tomorrow.</div>
    </div>
  );
}

function VoiceArt() {
  const bars = [30, 55, 80, 45, 95, 60, 35, 75, 50, 85, 40, 65, 30];
  return (
    <div className="flex h-16 items-center justify-between gap-1">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1.5 animate-pulse rounded-full bg-signal"
          style={{ height: `${h}%`, opacity: 0.35 + (h / 100) * 0.65, animationDelay: `${i * 90}ms` }}
        />
      ))}
    </div>
  );
}

function FlowArt() {
  const nodes = ['Request', 'AI', 'CRM', 'Follow-up'];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <span
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-[13px] font-medium',
              i === nodes.length - 1 ? 'border-signal bg-signal text-paper' : 'border-white/15 bg-white/[0.06] text-paper/85',
            )}
          >
            {n}
          </span>
          {i < nodes.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-paper/35" />}
        </div>
      ))}
    </div>
  );
}

function DocsArt() {
  return (
    <div className="space-y-2 rounded-xl border border-ink/10 bg-paper px-4 py-3.5">
      <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
      <span className="block h-1.5 w-full rounded-full bg-signal/45" />
      <span className="block h-1.5 w-3/5 rounded-full bg-ink/10" />
      <span className="block h-1.5 w-2/3 rounded-full bg-ink/10" />
    </div>
  );
}

function PlugArt() {
  return (
    <svg viewBox="0 0 220 84" className="h-[84px] w-full" fill="none">
      {[28, 80, 140, 192].map((x, i) => (
        <g key={x}>
          <path d={`M${x} ${i % 2 ? 66 : 18} L110 42`} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
          <circle cx={x} cy={i % 2 ? 66 : 18} r="8" className="fill-paper stroke-ink/20" strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="110" cy="42" r="17" className="fill-signal" />
      <foreignObject x="98" y="30" width="24" height="24">
        <div className="flex h-6 w-6 items-center justify-center text-paper">
          <Plug className="h-3.5 w-3.5" />
        </div>
      </foreignObject>
    </svg>
  );
}

function SystemsArt() {
  const bars = [62, 48, 71, 55, 83, 28, 66, 58, 74];
  return (
    <div className="flex h-20 items-end gap-2">
      {bars.map((h, i) => (
        <span key={i} className={cn('flex-1 rounded-t-md', i === 5 ? 'bg-signal' : 'bg-white/15')} style={{ height: `${h}%` }} />
      ))}
      <span className="mb-1 ml-1 shrink-0 rounded-full bg-signal/20 px-2.5 py-1 text-[11px] font-medium text-signal-300">
        Shortage flagged
      </span>
    </div>
  );
}

function ReportArt() {
  const bars = [30, 44, 36, 56, 40, 62, 48, 70];
  return (
    <svg viewBox="0 0 400 96" className="h-28 w-full" fill="none">
      {/* donut */}
      <circle cx="46" cy="48" r="26" className="stroke-ink/10" strokeWidth="9" />
      <circle cx="46" cy="48" r="26" stroke="#E84F3D" strokeWidth="9" strokeLinecap="round" strokeDasharray="108 164" transform="rotate(-90 46 48)" />
      <rect x="35" y="45" width="22" height="6" rx="3" className="fill-ink/20" />
      <path d="M96 14 V82" className="stroke-ink/10" />
      {/* bars */}
      {bars.map((h, i) => (
        <rect key={i} x={112 + i * 22} y={82 - h} width="12" height={h} rx="3" className={i === bars.length - 1 ? 'fill-signal' : 'fill-ink/15'} />
      ))}
      <path d="M300 14 V82" className="stroke-ink/10" />
      {/* trend */}
      <path d="M316 72 C330 62 338 76 350 58 S376 42 392 30 V82 H316 Z" fill="#E84F3D" fillOpacity="0.1" />
      <path d="M316 72 C330 62 338 76 350 58 S376 42 392 30" stroke="#E84F3D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="392" cy="30" r="3.5" className="fill-signal" />
    </svg>
  );
}

function CodeArt() {
  return (
    <svg viewBox="0 0 400 96" className="h-28 w-full" fill="none">
      <rect x="10" y="4" width="380" height="88" rx="11" className="fill-white/[0.04] stroke-white/15" />
      <path d="M10 26 H390" className="stroke-white/10" />
      <circle cx="26" cy="15" r="3" className="fill-white/25" />
      <circle cx="37" cy="15" r="3" className="fill-white/25" />
      <circle cx="48" cy="15" r="3" className="fill-signal" />
      <rect x="66" y="9" width="132" height="12" rx="6" className="fill-white/10" />
      <text x="78" y="18" fontSize="8" className="font-mono fill-paper/45">yourapp.com</text>
      {/* sidebar */}
      <path d="M78 26 V92" className="stroke-white/10" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="22" y={36 + i * 13} width="46" height="6" rx="3" className={i === 0 ? 'fill-signal' : 'fill-white/15'} />
      ))}
      {/* content */}
      <rect x="92" y="34" width="96" height="8" rx="4" className="fill-white/30" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={92 + i * 96} y="50" width="88" height="18" rx="6" className="fill-white/[0.07]" />
          <rect x={100 + i * 96} y="56" width="34" height="5" rx="2.5" className="fill-white/25" />
        </g>
      ))}
      <path d="M92 84 C124 72 144 86 178 76 S238 68 270 76 S336 64 380 70" stroke="#E84F3D" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Illustrations keyed by core-service id. */
export const serviceArt: Record<string, () => ReactNode> = {
  'ai-agents': () => <AgentsArt />,
  chatbots: () => <ChatArt />,
  voice: () => <VoiceArt />,
  'workflow-automation': () => <FlowArt />,
  'knowledge-rag': () => <DocsArt />,
  integrations: () => <PlugArt />,
  'business-systems': () => <SystemsArt />,
  reporting: () => <ReportArt />,
  'custom-software': () => <CodeArt />,
};


/** Which illustrations are drawn for a dark background (the rest are drawn for light). */
export const serviceArtDark: Record<string, boolean> = {
  'ai-agents': true,
  'workflow-automation': true,
  'business-systems': true,
  'custom-software': true,
};
