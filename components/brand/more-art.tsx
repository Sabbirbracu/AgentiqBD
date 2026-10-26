import type { ReactNode } from 'react';

/** Illustrations for the "More" menu. Static and decorative; the caller marks them aria-hidden. */

function CaseArt() {
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      <rect x="104" y="8" width="168" height="104" rx="12" className="fill-paper stroke-ink/15" />
      <rect x="120" y="22" width="60" height="6" rx="3" className="fill-ink/15" />
      <rect x="120" y="36" width="100" height="5" rx="2.5" className="fill-ink/10" />
      <rect x="32" y="22" width="172" height="100" rx="12" className="fill-paper stroke-ink/25" />
      <circle cx="48" cy="38" r="3" className="fill-ink/25" />
      <circle cx="59" cy="38" r="3" className="fill-ink/25" />
      <circle cx="70" cy="38" r="3" className="fill-signal" />
      <path d="M32 50 H204" className="stroke-ink/10" />
      <rect x="46" y="62" width="76" height="46" rx="8" className="fill-ink/10" />
      <rect x="132" y="64" width="58" height="6" rx="3" className="fill-ink/25" />
      <rect x="132" y="78" width="44" height="5" rx="2.5" className="fill-ink/15" />
      <rect x="132" y="92" width="50" height="16" rx="8" className="fill-signal" />
      <text x="157" y="103.5" textAnchor="middle" fontSize="8.5" className="font-mono fill-paper">Deployed</text>
    </svg>
  );
}

function PartnerArt() {
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      <circle cx="112" cy="65" r="40" className="fill-ink/[0.06] stroke-ink/25" strokeWidth="1.5" />
      <circle cx="188" cy="65" r="40" className="fill-signal/10 stroke-signal" strokeWidth="1.5" />
      {[112, 188].map((x, i) => (
        <g key={x}>
          <circle cx={x + (i ? 12 : -12)} cy="56" r="9" className={i ? 'fill-signal/60' : 'fill-ink/30'} />
          <path d={`M${x + (i ? 12 : -12) - 14} 84 a14 10 0 0 1 28 0`} className={i ? 'fill-signal/60' : 'fill-ink/30'} />
        </g>
      ))}
      <circle cx="150" cy="65" r="14" className="fill-ink" />
      <path d="M150 58 V72 M143 65 H157" stroke="#FCFCF4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function BlogArt() {
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      <rect x="62" y="10" width="176" height="110" rx="14" className="fill-paper stroke-ink/20" />
      <rect x="76" y="22" width="148" height="44" rx="8" className="fill-ink/10" />
      <path d="M76 56 l30 -22 l26 18 l22 -14 l46 26 v2 H76 Z" className="fill-ink/15" />
      <circle cx="198" cy="36" r="6" className="fill-signal" />
      <rect x="76" y="76" width="112" height="8" rx="4" className="fill-ink/40" />
      <rect x="76" y="90" width="148" height="5" rx="2.5" className="fill-ink/15" />
      <circle cx="84" cy="108" r="6" className="fill-ink/25" />
      <rect x="96" y="105" width="52" height="5" rx="2.5" className="fill-ink/15" />
    </svg>
  );
}

function RndArt() {
  const nodes: [number, number][] = [
    [50, 36],
    [98, 96],
    [150, 40],
    [206, 92],
    [252, 40],
  ];
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      {[
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [0, 2],
        [2, 4],
      ].map(([a, b]) => (
        <path key={`${a}${b}`} d={`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`} stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 4" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 14 : 8} className={i === 2 ? 'fill-signal' : 'fill-white/20'} />
      ))}
      <path d="M144 40 h12 M150 34 v12" stroke="#FCFCF4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProductsArt() {
  const tiles = [
    { x: 56, label: 'Live', dark: true },
    { x: 168, label: 'MVP', dark: false },
  ];
  return (
    <svg viewBox="0 0 300 130" className="h-full w-full" fill="none">
      {tiles.map((t) => (
        <g key={t.label}>
          <rect x={t.x} y="18" width="76" height="76" rx="20" className={t.dark ? 'fill-ink' : 'fill-signal'} />
          <rect x={t.x + 22} y="40" width="32" height="32" rx="8" className="fill-paper/25" />
          <circle cx={t.x + 38} cy="56" r="7" className="fill-paper" />
          <rect x={t.x + 6} y="102" width="64" height="18" rx="9" className="fill-ink/[0.07]" />
          <text x={t.x + 38} y="114.5" textAnchor="middle" fontSize="9.5" className="font-mono fill-ink/60">{t.label}</text>
        </g>
      ))}
    </svg>
  );
}

export const moreArt: Record<string, () => ReactNode> = {
  'case-studies': () => <CaseArt />,
  partner: () => <PartnerArt />,
  blog: () => <BlogArt />,
  rnd: () => <RndArt />,
  products: () => <ProductsArt />,
};

/** Illustrations drawn for a dark background. */
export const moreArtDark: Record<string, boolean> = { rnd: true };
