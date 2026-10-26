import type { ReactNode } from 'react';

/** Illustrations for the package menu. Static, decorative, aria-hidden by the caller. */

function AuditArt() {
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      <rect x="40" y="14" width="112" height="102" rx="12" className="fill-paper stroke-ink/15" />
      <rect x="56" y="30" width="56" height="7" rx="3.5" className="fill-ink/25" />
      {[48, 62, 76, 90].map((y, i) => (
        <g key={y}>
          <circle cx="62" cy={y + 3} r="5" className={i < 3 ? 'fill-signal' : 'fill-ink/15'} />
          <rect x="74" y={y} width={i % 2 ? 56 : 68} height="6" rx="3" className="fill-ink/15" />
        </g>
      ))}
      <circle cx="214" cy="62" r="34" className="stroke-ink/10" strokeWidth="9" />
      <circle cx="214" cy="62" r="34" stroke="#E84F3D" strokeWidth="9" strokeLinecap="round" strokeDasharray="140 214" transform="rotate(-90 214 62)" />
      <rect x="198" y="58" width="32" height="8" rx="4" className="fill-ink/20" />
    </svg>
  );
}

function AgentArt() {
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      <rect x="40" y="12" width="220" height="106" rx="14" className="fill-white/[0.05] stroke-white/15" />
      <circle cx="68" cy="38" r="12" className="fill-signal" />
      <rect x="62" y="33" width="12" height="9" rx="3" className="fill-paper" />
      <rect x="86" y="32" width="64" height="7" rx="3.5" className="fill-white/30" />
      <rect x="86" y="44" width="40" height="5" rx="2.5" className="fill-white/15" />
      <rect x="130" y="62" width="118" height="22" rx="11" className="fill-white/10" />
      <text x="189" y="77" textAnchor="middle" fontSize="10" className="font-mono fill-paper/70">Where is my order?</text>
      <rect x="54" y="90" width="132" height="22" rx="11" className="fill-signal" />
      <text x="120" y="105" textAnchor="middle" fontSize="10" className="font-mono fill-paper">With the courier today.</text>
    </svg>
  );
}

function FlowArt() {
  const nodes = ['Request', 'AI', 'CRM', 'Reply'];
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      <path d="M38 65 H262" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4 5" />
      {nodes.map((n, i) => (
        <g key={n}>
          <rect x={14 + i * 72} y="46" width="60" height="38" rx="11" className={i === 3 ? 'fill-signal' : 'fill-white/10'} />
          <text x={44 + i * 72} y="69" textAnchor="middle" fontSize="11" className={`font-mono ${i === 3 ? 'fill-paper' : 'fill-paper/75'}`}>{n}</text>
        </g>
      ))}
      <rect x="92" y="10" width="116" height="22" rx="11" className="fill-white/10" />
      <circle cx="106" cy="21" r="3.5" className="fill-signal" />
      <text x="116" y="24.5" fontSize="10" className="font-mono fill-paper/60">Runs on a trigger</text>
      <path d="M44 84 V108 H236 V84" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" strokeDasharray="3 4" />
    </svg>
  );
}

function SystemsArt() {
  const mods = ['Inventory', 'Production', 'Procurement', 'Support', 'Reporting', 'Alerts'];
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      {mods.map((m, i) => {
        const x = 20 + (i % 3) * 92;
        const y = 16 + Math.floor(i / 3) * 52;
        return (
          <g key={m}>
            <rect x={x} y={y} width="84" height="42" rx="11" className={i === 5 ? 'fill-signal' : 'fill-white/[0.08] stroke-white/15'} />
            <text x={x + 42} y={y + 25} textAnchor="middle" fontSize="10.5" className={`font-mono ${i === 5 ? 'fill-paper' : 'fill-paper/75'}`}>{m}</text>
          </g>
        );
      })}
      <path d="M104 37 H112 M196 37 H204 M104 89 H112 M196 89 H204" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  );
}

export const packageArt: Record<string, () => ReactNode> = {
  audit: () => <AuditArt />,
  'agent-starter': () => <AgentArt />,
  workflow: () => <FlowArt />,
  systems: () => <SystemsArt />,
};

/** Packages whose illustration is drawn for a dark background. */
export const packageArtDark: Record<string, boolean> = {
  audit: false,
  'agent-starter': true,
  workflow: true,
  systems: true,
};
