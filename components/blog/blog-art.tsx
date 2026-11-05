import { useId, type ReactNode } from 'react';
import { LogoMark } from '@/components/brand/logo';
import type { BlogArtId } from '@/lib/blog';
import { cn } from '@/lib/utils';

/**
 * Cover and in-article illustrations for the blog, one per article topic. Pure SVG in the brand palette
 * (ink, paper, signal), drawn on a 640×400 canvas so they crop cleanly to 16:10 cards.
 */

const RED = '#E84F3D';
const INK = '#0A0A0B';
const PAPER = '#FCFCF4';

/** Whether the art is drawn on a dark surface; cards use it to pick the border colour. */
export const blogArtDark: Record<BlogArtId, boolean> = {
  intro: true,
  'agent-loop': false,
  build: true,
  offline: false,
  compare: false,
  rag: true,
  guardrails: false,
  process: false,
  phone: true,
  testing: true,
  metrics: false,
  'rag-eval': true,
  checklist: false,
  'voice-test': false,
  monitoring: false,
  cost: false,
  global: true,
  mcp: false,
  commerce: false,
  roi: false,
  vetting: true,
  receptionist: true,
  leads: true,
  documents: false,
  knowledge: false,
  inventory: false,
  dashboard: false,
  support: false,
  'build-buy': true,
  automations: false,
};

function Bg({ id, tone }: { id: string; tone: 'dark' | 'light' | 'red' }) {
  const base = tone === 'dark' ? INK : tone === 'red' ? RED : PAPER;
  const dot = tone === 'light' ? 'rgba(10,10,11,0.07)' : 'rgba(255,255,255,0.07)';
  const glow = tone === 'dark' ? 'rgba(232,79,61,0.38)' : tone === 'red' ? 'rgba(10,10,11,0.28)' : 'rgba(232,79,61,0.14)';
  return (
    <>
      <defs>
        <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={dot} />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="92%" cy="100%" r="75%">
          <stop offset="0" stopColor={glow} />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill={base} />
      <rect width="640" height="400" fill={`url(#${id}-dots)`} />
      <rect width="640" height="400" fill={`url(#${id}-glow)`} />
    </>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

const mono = 'font-mono';

function Chip({ x, y, w, label, dark, hot }: { x: number; y: number; w: number; label: string; dark?: boolean; hot?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height="34"
        rx="17"
        fill={hot ? RED : dark ? 'rgba(255,255,255,0.07)' : '#fff'}
        stroke={hot ? RED : dark ? 'rgba(255,255,255,0.16)' : 'rgba(10,10,11,0.14)'}
      />
      <text x={x + w / 2} y={y + 21.5} textAnchor="middle" fontSize="13" className={mono} fill={hot || dark ? PAPER : INK}>
        {label}
      </text>
    </g>
  );
}

function IntroArt({ id }: { id: string }) {
  return (
    <>
      <Svg>
        <Bg id={id} tone="dark" />
        {[250, 190, 130].map((rx, i) => (
          <ellipse key={rx} cx="320" cy="200" rx={rx} ry={rx * 0.56} stroke="white" strokeOpacity={0.1 + i * 0.04} strokeDasharray="3 6" />
        ))}
        <Chip x={64} y={92} w={120} label="AI agents" dark />
        <Chip x={448} y={86} w={128} label="Automation" dark />
        <Chip x={40} y={268} w={168} label="Business systems" dark />
        <Chip x={440} y={276} w={160} label="Custom software" hot />
        <text x="32" y="376" fontSize="12" letterSpacing="2.4" className={mono} fill="rgba(252,252,244,0.45)">
          DHAKA · BANGLADESH
        </text>
        <text x="608" y="376" textAnchor="end" fontSize="12" letterSpacing="2.4" className={mono} fill="rgba(252,252,244,0.45)">
          BUILT FOR THE WORLD →
        </text>
      </Svg>
      <div className="absolute left-1/2 top-1/2 w-[19%] -translate-x-1/2 -translate-y-1/2">
        <LogoMark className="h-auto w-full drop-shadow-[0_20px_40px_rgba(232,79,61,0.35)]" animateHand />
      </div>
    </>
  );
}

function AgentLoopArt({ id }: { id: string }) {
  const nodes = [
    { x: 320, y: 72, label: 'Observe' },
    { x: 458, y: 200, label: 'Think', hot: true },
    { x: 320, y: 328, label: 'Act' },
    { x: 182, y: 200, label: 'Check' },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <circle cx="320" cy="200" r="128" stroke={RED} strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 6" className="hub-flow" />
      {[45, 135, 225, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        const x = 320 + 128 * Math.cos(r);
        const y = 200 + 128 * Math.sin(r);
        return <path key={a} d="M-6 -5 L4 0 L-6 5 Z" fill={RED} transform={`translate(${x} ${y}) rotate(${a + 90})`} />;
      })}
      <circle cx="320" cy="200" r="54" fill={INK} />
      <circle cx="320" cy="200" r="66" stroke={INK} strokeOpacity="0.12" />
      <text x="320" y="197" textAnchor="middle" fontSize="12" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.6)">
        GOAL
      </text>
      <circle cx="320" cy="214" r="5" fill={RED} />
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 60} y={n.y - 21} width="120" height="42" rx="12" fill={n.hot ? INK : '#fff'} stroke={n.hot ? INK : 'rgba(10,10,11,0.14)'} />
          <circle cx={n.x - 38} cy={n.y} r="5" fill={n.hot ? RED : 'rgba(10,10,11,0.25)'} />
          <text x={n.x + 8} y={n.y + 5} textAnchor="middle" fontSize="15" fontWeight="600" className="font-sans" fill={n.hot ? PAPER : INK}>
            {n.label}
          </text>
        </g>
      ))}
      <path d="M380 340 H430" stroke={INK} strokeOpacity="0.3" strokeDasharray="3 4" />
      <path d="M430 340 V318 H446 M430 340 V362 H446" stroke={INK} strokeOpacity="0.3" strokeDasharray="3 4" />
      <rect x="446" y="303" width="176" height="30" rx="8" fill="#fff" stroke="rgba(10,10,11,0.14)" />
      <text x="458" y="322.5" fontSize="12" className={mono} fill={INK}>check_availability()</text>
      <rect x="446" y="347" width="176" height="30" rx="8" fill="#fff" stroke="rgba(10,10,11,0.14)" />
      <text x="458" y="366.5" fontSize="12" className={mono} fill={INK}>create_booking()</text>
      <path d="M122 200 H80 V74" stroke={RED} strokeOpacity="0.7" strokeDasharray="3 4" />
      <rect x="22" y="40" width="118" height="34" rx="17" fill={RED} />
      <text x="81" y="61.5" textAnchor="middle" fontSize="12" className={mono} fill={PAPER}>hand over</text>
    </Svg>
  );
}

function BuildArt({ id }: { id: string }) {
  const stages = ['Map', 'Tools', 'Prompt', 'Guard', 'Test', 'Launch'];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      <text x="40" y="64" fontSize="12" letterSpacing="2.4" className={mono} fill="rgba(252,252,244,0.45)">
        BOTTLENECK → GO-LIVE
      </text>
      <path d="M70 200 H570" stroke="white" strokeOpacity="0.14" strokeWidth="3" />
      <path d="M70 200 H370" stroke={RED} strokeWidth="3" />
      {stages.map((s, i) => {
        const x = 70 + i * 100;
        const done = i < 3;
        const current = i === 3;
        return (
          <g key={s}>
            <text x={x} y="160" textAnchor="middle" fontSize="12" className={mono} fill="rgba(252,252,244,0.4)">
              {String(i + 1).padStart(2, '0')}
            </text>
            {current && <circle cx={x} cy="200" r="30" fill={RED} fillOpacity="0.18" className="animate-pulseRing svg-fx" />}
            <circle cx={x} cy="200" r="20" fill={done ? RED : current ? INK : INK} stroke={done || current ? RED : 'rgba(255,255,255,0.22)'} strokeWidth="2" />
            {done && <path d={`M${x - 7} 200 l5 5 l9 -10`} stroke={PAPER} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />}
            {current && <circle cx={x} cy="200" r="6" fill={RED} />}
            <text x={x} y="252" textAnchor="middle" fontSize="14" fontWeight="600" className="font-sans" fill={done || current ? PAPER : 'rgba(252,252,244,0.45)'}>
              {s}
            </text>
          </g>
        );
      })}
      <rect x="150" y="296" width="340" height="62" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      {[
        ['shadow', 0.3],
        ['narrow', 0.6],
        ['wide', 1],
      ].map(([l, f], i) => (
        <g key={l as string}>
          <rect x={172 + i * 104} y="338" width="88" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
          <rect x={172 + i * 104} y="338" width={88 * (f as number)} height="6" rx="3" fill={RED} />
          <text x={172 + i * 104} y="324" fontSize="12" className={mono} fill="rgba(252,252,244,0.6)">
            {l as string}
          </text>
        </g>
      ))}
    </Svg>
  );
}

function OfflineArt({ id }: { id: string }) {
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <rect x="60" y="70" width="320" height="230" rx="18" fill={INK} />
      <rect x="74" y="84" width="292" height="202" rx="8" fill={PAPER} />
      <path d="M74 250 L150 178 L208 226 L262 186 L366 260 V286 H74 Z" fill="rgba(10,10,11,0.12)" />
      <circle cx="320" cy="124" r="14" fill="rgba(10,10,11,0.12)" />
      <circle cx="160" cy="146" r="26" fill="rgba(10,10,11,0.18)" />
      <rect x="126" y="112" width="68" height="68" rx="6" stroke={RED} strokeWidth="2" strokeDasharray="5 4" />
      <rect x="126" y="96" width="44" height="16" rx="4" fill={RED} />
      <text x="148" y="108" textAnchor="middle" fontSize="10" className={mono} fill={PAPER}>face</text>
      <rect x="222" y="232" width="118" height="12" rx="3" fill="rgba(10,10,11,0.35)" />
      <rect x="214" y="224" width="134" height="28" rx="5" stroke={RED} strokeWidth="2" strokeDasharray="5 4" />
      <rect x="20" y="300" width="400" height="14" rx="7" fill={INK} />
      <g transform="translate(470 92)">
        <path d="M30 74 a30 30 0 0 1 4 -59 a40 40 0 0 1 76 8 a26 26 0 0 1 6 51 Z" fill="#fff" stroke="rgba(10,10,11,0.18)" strokeWidth="2" />
        <path d="M14 96 L128 -6" stroke={RED} strokeWidth="5" strokeLinecap="round" />
      </g>
      <text x="537" y="218" textAnchor="middle" fontSize="13" letterSpacing="1.5" className={mono} fill={INK}>NO UPLOAD</text>
      <path d="M384 186 C420 186 430 170 456 160" stroke={INK} strokeOpacity="0.3" strokeDasharray="4 5" />
      <Chip x={466} y={248} w={142} label="on-device AI" hot />
      <Chip x={466} y={292} w={142} label="files stay here" />
    </Svg>
  );
}

function CompareArt({ id }: { id: string }) {
  const cols = [
    { x: 60, h: 150, title: 'AUTOMATION', dark: false },
    { x: 250, h: 210, title: 'CHATBOT', dark: false },
    { x: 440, h: 270, title: 'AI AGENT', dark: true },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <path d="M40 352 H600" stroke={INK} strokeOpacity="0.15" />
      {cols.map((c, i) => {
        const top = 352 - c.h;
        const fg = c.dark ? PAPER : INK;
        const soft = c.dark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,11,0.1)';
        return (
          <g key={c.title}>
            <rect x={c.x} y={top} width="140" height={c.h} rx="16" fill={c.dark ? INK : '#fff'} stroke={c.dark ? INK : 'rgba(10,10,11,0.14)'} />
            <text x={c.x + 16} y={top + 28} fontSize="11.5" letterSpacing="1.6" className={mono} fill={c.dark ? 'rgba(252,252,244,0.6)' : 'rgba(10,10,11,0.55)'}>
              {c.title}
            </text>
            {i === 0 &&
              [0, 1, 2].map((r) => (
                <g key={r}>
                  <rect x={c.x + 16} y={top + 48 + r * 30} width="30" height="16" rx="4" fill={soft} />
                  <path d={`M${c.x + 52} ${top + 56 + r * 30} h20`} stroke={INK} strokeOpacity="0.4" strokeWidth="1.5" />
                  <path d={`M${c.x + 68} ${top + 52 + r * 30} l5 4 l-5 4`} stroke={INK} strokeOpacity="0.4" strokeWidth="1.5" />
                  <rect x={c.x + 80} y={top + 48 + r * 30} width="44" height="16" rx="4" fill={soft} />
                </g>
              ))}
            {i > 0 && (
              <>
                <rect x={c.x + 16} y={top + 46} width="84" height="24" rx="12" fill={soft} />
                <rect x={c.x + 40} y={top + 80} width="84" height="24" rx="12" fill={c.dark ? RED : INK} />
                <rect x={c.x + 16} y={top + 114} width="70" height="24" rx="12" fill={soft} />
              </>
            )}
            {i === 2 &&
              ['order', 'stock', 'pickup'].map((t, r) => (
                <g key={t}>
                  <rect x={c.x + 16} y={top + 160 + r * 30} width="108" height="22" rx="6" fill="rgba(232,79,61,0.16)" stroke="rgba(232,79,61,0.5)" />
                  <text x={c.x + 26} y={top + 175 + r * 30} fontSize="11" className={mono} fill={fg}>
                    ✓ {t}
                  </text>
                </g>
              ))}
          </g>
        );
      })}
      <path d="M130 186 C200 150 250 130 320 128 C390 126 440 96 510 70" stroke={RED} strokeWidth="2" strokeDasharray="5 6" className="hub-flow" />
      <path d="M502 66 L514 68 L508 79" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function RagArt({ id }: { id: string }) {
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      {[2, 1, 0].map((i) => (
        <g key={i} transform={`translate(${46 + i * 12} ${110 - i * 12})`}>
          <rect width="104" height="136" rx="10" fill={i === 0 ? PAPER : 'rgba(255,255,255,0.12)'} stroke="rgba(255,255,255,0.18)" />
          {i === 0 &&
            [24, 40, 56, 72, 88, 104].map((y, k) => <rect key={y} x="14" y={y} width={k % 3 === 2 ? 50 : 76} height="6" rx="3" fill="rgba(10,10,11,0.2)" />)}
        </g>
      ))}
      <path d="M182 190 H222" stroke={RED} strokeWidth="2" strokeDasharray="4 4" className="hub-flow" />
      <path d="M218 184 l7 6 l-7 6" stroke={RED} strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, k) => {
        const x = 236 + (k % 3) * 36;
        const y = 140 + Math.floor(k / 3) * 36;
        const hot = k === 4 || k === 7;
        return <rect key={k} x={x} y={y} width="28" height="28" rx="7" fill={hot ? RED : 'rgba(255,255,255,0.09)'} stroke={hot ? RED : 'rgba(255,255,255,0.14)'} />;
      })}
      <path d="M350 190 H388" stroke={RED} strokeWidth="2" strokeDasharray="4 4" className="hub-flow" />
      <path d="M384 184 l7 6 l-7 6" stroke={RED} strokeWidth="2" strokeLinecap="round" />
      <rect x="404" y="104" width="206" height="40" rx="14" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.16)" />
      <text x="420" y="129" fontSize="13" className="font-sans" fill="rgba(252,252,244,0.85)">Delivery outside Dhaka?</text>
      <rect x="404" y="160" width="206" height="82" rx="14" fill={PAPER} />
      <text x="420" y="188" fontSize="13.5" fontWeight="600" className="font-sans" fill={INK}>3–5 working days</text>
      <rect x="532" y="175" width="28" height="18" rx="5" fill={RED} />
      <text x="546" y="188" textAnchor="middle" fontSize="11" className={mono} fill={PAPER}>2</text>
      <rect x="420" y="204" width="150" height="6" rx="3" fill="rgba(10,10,11,0.15)" />
      <rect x="420" y="218" width="104" height="6" rx="3" fill="rgba(10,10,11,0.15)" />
      {[
        ['DOCUMENTS', 104],
        ['INDEX', 290],
        ['ANSWER', 507],
      ].map(([l, x]) => (
        <text key={l as string} x={x as number} y="300" textAnchor="middle" fontSize="12" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">
          {l as string}
        </text>
      ))}
    </Svg>
  );
}

function GuardrailsArt({ id }: { id: string }) {
  const layers = [
    { w: 580, h: 350, label: 'audit log' },
    { w: 480, h: 284, label: 'limits' },
    { w: 380, h: 218, label: 'approval' },
    { w: 280, h: 152, label: 'validation' },
    { w: 186, h: 92, label: 'permissions' },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      {layers.map((l, i) => {
        const x = 320 - l.w / 2;
        const y = 200 - l.h / 2;
        const last = i === layers.length - 1;
        return (
          <g key={l.label}>
            <rect x={x} y={y} width={l.w} height={l.h} rx={22 - i * 2} fill={i === 0 ? 'none' : `rgba(255,255,255,${0.35 + i * 0.12})`} stroke={last ? RED : INK} strokeOpacity={last ? 0.9 : 0.16} strokeWidth={last ? 2 : 1.2} strokeDasharray={i === 0 ? '5 5' : undefined} />
            <rect x={x + 14} y={y - 10} width={l.label.length * 7.6 + 18} height="20" rx="10" fill={last ? RED : PAPER} stroke={last ? RED : 'rgba(10,10,11,0.16)'} />
            <text x={x + 23} y={y + 4} fontSize="11.5" className={mono} fill={last ? PAPER : INK}>
              {l.label}
            </text>
          </g>
        );
      })}
      <rect x="270" y="180" width="100" height="40" rx="12" fill={INK} />
      <circle cx="292" cy="200" r="6" fill={RED} />
      <text x="330" y="205" textAnchor="middle" fontSize="13" letterSpacing="1.5" className={mono} fill={PAPER}>MODEL</text>
    </Svg>
  );
}

function ProcessArt({ id }: { id: string }) {
  const after = ['Input', 'Rules', 'AI', 'Done'];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <text x="40" y="58" fontSize="12" letterSpacing="2.4" className={mono} fill="rgba(10,10,11,0.5)">BEFORE</text>
      <text x="360" y="58" fontSize="12" letterSpacing="2.4" className={mono} fill={RED}>AFTER</text>
      <path
        d="M40 210 C70 120 120 300 140 200 C160 100 210 120 190 190 C170 260 110 250 150 290 C190 330 240 250 220 210 C200 170 260 120 280 160 C295 190 270 230 300 210"
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="2.2"
      />
      {[
        [96, 156],
        [196, 158],
        [150, 290],
        [258, 140],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 17} y={y - 13} width="34" height="26" rx="6" fill="#fff" stroke="rgba(10,10,11,0.2)" />
          <path d={`M${x - 9} ${y - 3} h18 M${x - 9} ${y + 4} h11`} stroke={INK} strokeOpacity="0.35" strokeWidth="1.6" />
        </g>
      ))}
      <path d="M320 70 V340" stroke={INK} strokeOpacity="0.15" strokeDasharray="4 6" />
      <circle cx="320" cy="205" r="14" fill={PAPER} stroke="rgba(10,10,11,0.18)" />
      <path d="M316 199 l6 6 l-6 6" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M372 205 H602" stroke={INK} strokeOpacity="0.2" strokeWidth="2.2" />
      <path d="M372 205 H602" stroke={RED} strokeWidth="2.2" strokeDasharray="6 8" className="hub-flow" />
      {after.map((l, i) => {
        const x = 386 + i * 70;
        const hot = l === 'AI';
        return (
          <g key={l}>
            <rect x={x - 22} y="183" width="44" height="44" rx="12" fill={hot ? RED : i === 3 ? INK : '#fff'} stroke={hot ? RED : i === 3 ? INK : 'rgba(10,10,11,0.18)'} />
            {i === 3 ? (
              <path d={`M${x - 8} 205 l5 5 l11 -11`} stroke={PAPER} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <circle cx={x} cy="205" r="5" fill={hot ? PAPER : 'rgba(10,10,11,0.3)'} />
            )}
            <text x={x} y="254" textAnchor="middle" fontSize="13" fontWeight="600" className="font-sans" fill={INK}>
              {l}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function PhoneArt({ id }: { id: string }) {
  const rows = [true, true, false, true, true];
  return (
    <Svg>
      <Bg id={id} tone="red" />
      <rect x="150" y="34" width="190" height="380" rx="30" fill={INK} />
      <rect x="160" y="44" width="170" height="370" rx="22" fill={PAPER} />
      <rect x="220" y="52" width="50" height="8" rx="4" fill={INK} />
      <text x="176" y="92" fontSize="15" fontWeight="700" fill={INK} style={{ fontFamily: 'var(--font-sans), "Noto Sans Bengali", "Kohinoor Bangla", sans-serif' }}>
        উপস্থিতি
      </text>
      <text x="176" y="110" fontSize="10.5" className={mono} fill="rgba(10,10,11,0.5)">BATCH A · 4:00 PM</text>
      {rows.map((present, i) => {
        const y = 128 + i * 46;
        return (
          <g key={i}>
            <rect x="172" y={y} width="146" height="38" rx="10" fill="#fff" stroke="rgba(10,10,11,0.1)" />
            <circle cx="190" cy={y + 19} r="9" fill="rgba(10,10,11,0.14)" />
            <rect x="206" y={y + 12} width={52 + (i % 3) * 10} height="6" rx="3" fill="rgba(10,10,11,0.35)" />
            <rect x="206" y={y + 23} width="34" height="5" rx="2.5" fill="rgba(10,10,11,0.15)" />
            <rect x="286" y={y + 9} width="22" height="20" rx="6" fill={present ? INK : RED} />
            {present ? (
              <path d={`M292 ${y + 19} l3 3 l6 -6`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={`M293 ${y + 15} l8 8 M301 ${y + 15} l-8 8`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
            )}
          </g>
        );
      })}
      <path d="M318 239 C370 239 380 196 420 190" stroke={PAPER} strokeOpacity="0.8" strokeWidth="2" strokeDasharray="4 5" className="hub-flow" />
      <rect x="420" y="140" width="190" height="108" rx="18" fill={PAPER} />
      <rect x="436" y="156" width="42" height="20" rx="6" fill={INK} />
      <text x="457" y="170" textAnchor="middle" fontSize="11" className={mono} fill={PAPER}>SMS</text>
      <text x="490" y="170" fontSize="11" className={mono} fill="rgba(10,10,11,0.5)">to parent</text>
      <rect x="436" y="192" width="150" height="7" rx="3.5" fill="rgba(10,10,11,0.3)" />
      <rect x="436" y="208" width="120" height="7" rx="3.5" fill="rgba(10,10,11,0.18)" />
      <rect x="436" y="224" width="88" height="7" rx="3.5" fill="rgba(10,10,11,0.18)" />
      <text x="515" y="282" textAnchor="middle" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.9)">PHONE FIRST</text>
      <text x="515" y="302" textAnchor="middle" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.9)">BANGLA FIRST</text>
    </Svg>
  );
}

function TestingArt({ id }: { id: string }) {
  const rows = ['exchange-wrong-colour', 'refund-over-limit', 'prompt-injection-email', 'other-customer-data', 'angry-customer-handover'];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      <rect x="70" y="46" width="500" height="308" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <path d="M70 84 H570" stroke="rgba(255,255,255,0.1)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={92 + i * 16} cy="65" r="5" fill={i === 0 ? RED : 'rgba(255,255,255,0.2)'} />
      ))}
      <text x="320" y="70" textAnchor="middle" fontSize="12" className={mono} fill="rgba(252,252,244,0.55)">scenarios · run</text>
      {['act', 'fact', 'safe', 'hand'].map((h, k) => (
        <text key={h} x={418 + k * 36} y="112" textAnchor="middle" fontSize="10" className={mono} fill="rgba(252,252,244,0.4)">
          {h}
        </text>
      ))}
      {rows.map((r, i) => {
        const y = 136 + i * 40;
        return (
          <g key={r}>
            <circle cx="102" cy={y} r="10" fill={RED} />
            <path d={`M97 ${y} l3.5 3.5 l6 -7`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="124" y={y + 4.5} fontSize="13" className={mono} fill="rgba(252,252,244,0.85)">
              {r}
            </text>
            {[0, 1, 2, 3].map((k) => (
              <circle key={k} cx={418 + k * 36} cy={y} r="5" fill={RED} fillOpacity={0.55 + k * 0.12} />
            ))}
          </g>
        );
      })}
      <path d="M90 330 H550" stroke="rgba(255,255,255,0.1)" />
      <text x="90" y="346" dy="-4" fontSize="12" className={mono} fill="rgba(252,252,244,0.55)">critical scenarios</text>
      <rect x="430" y="331" width="120" height="10" rx="5" fill={RED} />
    </Svg>
  );
}

function MetricsArt({ id }: { id: string }) {
  const bars = [
    { label: 'task success', v: 0.86, gate: 0.8 },
    { label: 'tool calls', v: 0.93, gate: 0.9 },
    { label: 'grounded', v: 0.9, gate: 0.85 },
    { label: 'handover', v: 0.72, gate: 0.8, hot: true },
    { label: 'safety', v: 1, gate: 1 },
  ];
  const x0 = 236;
  const w = 300;
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <rect x="70" y="46" width="500" height="308" rx="16" fill="#fff" stroke="rgba(10,10,11,0.12)" />
      <path d="M70 84 H570" stroke="rgba(10,10,11,0.08)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={92 + i * 16} cy="65" r="5" fill={i === 0 ? RED : 'rgba(10,10,11,0.14)'} />
      ))}
      <text x="320" y="70" textAnchor="middle" fontSize="12" className={mono} fill="rgba(10,10,11,0.5)">scorecard · release gate</text>
      {bars.map((b, i) => {
        const y = 118 + i * 44;
        return (
          <g key={b.label}>
            <text x="98" y={y + 4.5} fontSize="13" className={mono} fill={INK}>
              {b.label}
            </text>
            <rect x={x0} y={y - 7} width={w} height="14" rx="7" fill="rgba(10,10,11,0.06)" />
            <rect x={x0} y={y - 7} width={w * b.v} height="14" rx="7" fill={b.hot ? RED : INK} fillOpacity={b.hot ? 1 : 0.85} />
            <path d={`M${x0 + w * b.gate} ${y - 13} V${y + 13}`} stroke={RED} strokeWidth="2" strokeDasharray="3 3" />
          </g>
        );
      })}
      <path d="M90 330 H550" stroke="rgba(10,10,11,0.08)" />
      <text x="90" y="342" fontSize="12" className={mono} fill="rgba(10,10,11,0.5)">- - - threshold</text>
      <rect x="436" y="328" width="114" height="20" rx="10" fill={RED} />
      <text x="493" y="342" textAnchor="middle" fontSize="11" className={mono} fill={PAPER}>1 below gate</text>
    </Svg>
  );
}

function RagEvalArt({ id }: { id: string }) {
  const hits = [
    { label: 'returns-policy.pdf · p3', ok: true },
    { label: 'delivery-faq.md · §2', ok: true },
    { label: 'returns-policy-2024.pdf', ok: false },
  ];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      <rect x="46" y="70" width="226" height="40" rx="14" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.16)" />
      <text x="62" y="95" fontSize="13" className="font-sans" fill="rgba(252,252,244,0.85)">Can I return a sale item?</text>
      {hits.map((h, i) => {
        const y = 140 + i * 50;
        return (
          <g key={h.label}>
            <text x="50" y={y + 24} fontSize="12" className={mono} fill="rgba(252,252,244,0.45)">
              #{i + 1}
            </text>
            <rect x="76" y={y} width="196" height="38" rx="10" fill={h.ok ? 'rgba(255,255,255,0.09)' : 'rgba(232,79,61,0.16)'} stroke={h.ok ? 'rgba(255,255,255,0.16)' : RED} />
            <text x="90" y={y + 23.5} fontSize="11.5" className={mono} fill="rgba(252,252,244,0.8)">
              {h.label}
            </text>
          </g>
        );
      })}
      <path d="M292 190 H340" stroke={RED} strokeWidth="2" strokeDasharray="4 4" className="hub-flow" />
      <path d="M336 184 l7 6 l-7 6" stroke={RED} strokeWidth="2" strokeLinecap="round" />
      <rect x="360" y="96" width="236" height="188" rx="16" fill={PAPER} />
      <text x="378" y="126" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(10,10,11,0.5)">ANSWER CHECK</text>
      {[
        ['right passage found', true],
        ['says only what it says', true],
        ['cites the source', true],
        ['ignores old version', false],
      ].map(([l, ok], i) => {
        const y = 150 + i * 30;
        return (
          <g key={l as string}>
            <rect x="378" y={y} width="20" height="20" rx="6" fill={ok ? INK : RED} />
            {ok ? (
              <path d={`M383 ${y + 10} l3.5 3.5 l6 -7`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={`M384 ${y + 6} l8 8 M392 ${y + 6} l-8 8`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
            )}
            <text x="410" y={y + 14.5} fontSize="13" className="font-sans" fill={INK}>
              {l as string}
            </text>
          </g>
        );
      })}
      {[
        ['RETRIEVAL', 160],
        ['GENERATION', 478],
      ].map(([l, x]) => (
        <text key={l as string} x={x as number} y="326" textAnchor="middle" fontSize="12" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">
          {l as string}
        </text>
      ))}
    </Svg>
  );
}

function ChecklistArt({ id }: { id: string }) {
  const groups = [
    { label: 'happy path', done: [true, true, true] },
    { label: 'messy input', done: [true, true, false] },
    { label: 'tool failures', done: [true, false, false] },
    { label: 'prompt injection', done: [true, true, true], hot: true },
    { label: 'handover', done: [true, true, false] },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <rect x="150" y="30" width="340" height="356" rx="18" fill="#fff" stroke="rgba(10,10,11,0.12)" />
      <rect x="270" y="20" width="100" height="24" rx="8" fill={INK} />
      <text x="320" y="36" textAnchor="middle" fontSize="11" letterSpacing="1.4" className={mono} fill={PAPER}>PRE-LAUNCH</text>
      {groups.map((g, i) => {
        const y = 74 + i * 58;
        return (
          <g key={g.label}>
            <text x="176" y={y + 6} fontSize="13" className={mono} fill={INK}>
              {g.label}
            </text>
            {g.hot && (
              <g>
                <rect x="400" y={y - 8} width="66" height="18" rx="9" fill={RED} />
                <text x="433" y={y + 4.5} textAnchor="middle" fontSize="10" className={mono} fill={PAPER}>critical</text>
              </g>
            )}
            {g.done.map((d, k) => (
              <g key={k}>
                <rect x={176 + k * 96} y={y + 16} width="16" height="16" rx="4" fill={d ? INK : '#fff'} stroke={d ? INK : 'rgba(10,10,11,0.25)'} />
                {d && <path d={`M${180 + k * 96} ${y + 24} l3 3 l5 -6`} stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
                <rect x={198 + k * 96} y={y + 21} width="62" height="6" rx="3" fill="rgba(10,10,11,0.16)" />
              </g>
            ))}
          </g>
        );
      })}
    </Svg>
  );
}

function VoiceTestArt({ id }: { id: string }) {
  const wave = [10, 22, 38, 18, 52, 30, 64, 40, 24, 58, 34, 16, 46, 28, 12, 36, 20, 8];
  const checks = [
    { label: 'name heard', ok: true },
    { label: 'date heard', ok: true },
    { label: 'number heard', ok: false },
    { label: 'read back', ok: true },
  ];
  return (
    <Svg>
      <Bg id={id} tone="red" />
      <rect x="40" y="96" width="290" height="190" rx="18" fill={INK} />
      <text x="60" y="128" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.5)">CALLER AUDIO</text>
      {wave.map((h, i) => (
        <rect key={i} x={62 + i * 14} y={196 - h / 2} width="7" height={h} rx="3.5" fill={i === 6 || i === 9 ? RED : PAPER} fillOpacity={i === 6 || i === 9 ? 1 : 0.75} />
      ))}
      <rect x="60" y="240" width="250" height="28" rx="8" fill="rgba(255,255,255,0.08)" />
      <text x="72" y="258" fontSize="11.5" className={mono} fill="rgba(252,252,244,0.8)">"Thursday at five, 017…"</text>
      <path d="M342 190 H382" stroke={PAPER} strokeOpacity="0.85" strokeWidth="2" strokeDasharray="4 5" className="hub-flow" />
      <rect x="392" y="96" width="210" height="190" rx="18" fill={PAPER} />
      {checks.map((c, i) => {
        const y = 118 + i * 40;
        return (
          <g key={c.label}>
            <rect x="410" y={y} width="20" height="20" rx="6" fill={c.ok ? INK : RED} />
            {c.ok ? (
              <path d={`M415 ${y + 10} l3.5 3.5 l6 -7`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={`M416 ${y + 6} l8 8 M424 ${y + 6} l-8 8`} stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
            )}
            <text x="442" y={y + 14.5} fontSize="13" className={mono} fill={INK}>
              {c.label}
            </text>
          </g>
        );
      })}
      <text x="320" y="330" textAnchor="middle" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.9)">SPEECH IN · LOGIC · SPEECH OUT</text>
    </Svg>
  );
}

function MonitoringArt({ id }: { id: string }) {
  const pts = [62, 58, 64, 60, 57, 61, 59, 63, 60, 112, 66, 61, 58];
  const x = (i: number) => 92 + i * 38;
  const y = (v: number) => 300 - v * 1.6;
  const line = pts.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <rect x="60" y="46" width="520" height="308" rx="16" fill="#fff" stroke="rgba(10,10,11,0.12)" />
      <path d="M60 84 H580" stroke="rgba(10,10,11,0.08)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={82 + i * 16} cy="65" r="5" fill={i === 0 ? RED : 'rgba(10,10,11,0.14)'} />
      ))}
      <text x="320" y="70" textAnchor="middle" fontSize="12" className={mono} fill="rgba(10,10,11,0.5)">tool errors · last 13 days</text>
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M80 ${150 + k * 40} H560`} stroke="rgba(10,10,11,0.06)" />
      ))}
      <path d={`M80 ${y(90)} H560`} stroke={RED} strokeWidth="1.6" strokeDasharray="5 5" />
      <text x="556" y={y(90) - 8} textAnchor="end" fontSize="11" className={mono} fill={RED}>alert</text>
      <path d={line} stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {pts.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={i === 9 ? 7 : 3.5} fill={i === 9 ? RED : INK} />
      ))}
      <rect x={x(9) - 62} y={y(112) - 46} width="124" height="30" rx="10" fill={INK} />
      <text x={x(9)} y={y(112) - 26} textAnchor="middle" fontSize="11" className={mono} fill={PAPER}>CRM API timeout</text>
      <path d="M80 330 H560" stroke="rgba(10,10,11,0.08)" />
    </Svg>
  );
}

function CostArt({ id }: { id: string }) {
  const segs = [
    { label: 'integrations', w: 120, hot: true },
    { label: 'testing', w: 86 },
    { label: 'guardrails', w: 80 },
    { label: 'data', w: 62 },
    { label: 'design', w: 56 },
  ];
  let x = 70;
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <text x="70" y="74" fontSize="12" letterSpacing="2" className={mono} fill="rgba(10,10,11,0.5)">WHERE THE BUILD BUDGET GOES</text>
      {segs.map((s, i) => {
        const sx = x;
        x += s.w + 4;
        return (
          <g key={s.label}>
            <rect x={sx} y="92" width={s.w} height="40" rx="8" fill={s.hot ? RED : i % 2 ? 'rgba(10,10,11,0.82)' : INK} />
            <text x={sx + s.w / 2} y="152" textAnchor="middle" fontSize="11.5" className={mono} fill={INK}>{s.label}</text>
          </g>
        );
      })}
      <text x={x + 8} y="117" fontSize="11.5" className={mono} fill="rgba(10,10,11,0.45)">+ model</text>
      {[
        { t: 'BUILD', s: 'one-time', y: 196 },
        { t: 'RUN', s: 'per month', y: 252 },
        { t: 'CARE', s: 'per month', y: 308 },
      ].map((r, i) => (
        <g key={r.t}>
          <rect x="70" y={r.y} width="500" height="44" rx="12" fill="#fff" stroke="rgba(10,10,11,0.12)" />
          <rect x="84" y={r.y + 12} width="64" height="20" rx="6" fill={i === 0 ? INK : 'rgba(10,10,11,0.07)'} />
          <text x="116" y={r.y + 26} textAnchor="middle" fontSize="11" letterSpacing="1.4" className={mono} fill={i === 0 ? PAPER : INK}>{r.t}</text>
          <text x="164" y={r.y + 27} fontSize="13" className={mono} fill="rgba(10,10,11,0.6)">{r.s}</text>
          <rect x={360} y={r.y + 18} width={i === 0 ? 190 : i === 1 ? 70 : 52} height="8" rx="4" fill={i === 0 ? RED : 'rgba(10,10,11,0.25)'} />
        </g>
      ))}
    </Svg>
  );
}

function GlobalArt({ id }: { id: string }) {
  const x0 = 150;
  const hw = 18; // px per hour
  const rows = [
    { city: 'London', offset: -6, y: 108 },
    { city: 'Dhaka', offset: 0, y: 188, hot: true },
    { city: 'New York', offset: -11, y: 268 },
  ];
  // working day 9-18 local, shown on Dhaka clock (0-24)
  const block = (offset: number) => {
    const start = (9 - offset + 24) % 24;
    return { start, end: start + 9 };
  };
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      <text x="40" y="58" fontSize="12" letterSpacing="2.2" className={mono} fill="rgba(252,252,244,0.5)">WORKING HOURS ON THE DHAKA CLOCK · UTC+6</text>
      {[0, 6, 12, 18, 24].map((h) => (
        <g key={h}>
          <path d={`M${x0 + h * hw} 84 V316`} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 5" />
          <text x={x0 + h * hw} y="344" textAnchor="middle" fontSize="11" className={mono} fill="rgba(252,252,244,0.45)">{String(h % 24).padStart(2, '0')}:00</text>
        </g>
      ))}
      <rect x={x0 + 15 * hw} y="84" width={3 * hw} height="232" rx="10" fill="rgba(232,79,61,0.14)" />
      <rect x={x0 + 19 * hw} y="84" width={2 * hw} height="232" rx="10" fill="rgba(232,79,61,0.14)" />
      {rows.map((r) => {
        const b = block(r.offset);
        const parts = b.end <= 24 ? [[b.start, b.end]] : [[b.start, 24], [0, b.end - 24]];
        return (
          <g key={r.city}>
            <text x="40" y={r.y + 22} fontSize="14" className={mono} fill={r.hot ? RED : PAPER}>{r.city}</text>
            {parts.map(([s, e], k) => (
              <rect key={k} x={x0 + s * hw} y={r.y} width={(e - s) * hw} height="34" rx="10" fill={r.hot ? RED : 'rgba(255,255,255,0.14)'} stroke={r.hot ? RED : 'rgba(255,255,255,0.22)'} />
            ))}
          </g>
        );
      })}
      <text x="600" y="380" textAnchor="end" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">OVERLAP = LIVE CALLS · REST = ASYNC</text>
    </Svg>
  );
}

function McpArt({ id }: { id: string }) {
  const hosts = ['AI assistant', 'Code editor', 'Your agent'];
  const servers = ['CRM', 'Orders', 'Documents'];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      {hosts.map((h, i) => {
        const y = 92 + i * 84;
        return (
          <g key={h}>
            <rect x="46" y={y} width="150" height="52" rx="14" fill="#fff" stroke="rgba(10,10,11,0.14)" />
            <text x="121" y={y + 31} textAnchor="middle" fontSize="13" className={mono} fill={INK}>{h}</text>
            <path d={`M196 ${y + 26} C 240 ${y + 26}, 240 200, 268 200`} stroke={INK} strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="4 5" className="hub-flow" />
          </g>
        );
      })}
      <rect x="268" y="150" width="104" height="100" rx="22" fill={RED} />
      <text x="320" y="206" textAnchor="middle" fontSize="22" fontWeight="700" className={mono} fill={PAPER}>MCP</text>
      <text x="320" y="228" textAnchor="middle" fontSize="10" letterSpacing="1.2" className={mono} fill="rgba(252,252,244,0.8)">one plug</text>
      {servers.map((s, i) => {
        const y = 92 + i * 84;
        return (
          <g key={s}>
            <path d={`M372 200 C 400 200, 400 ${y + 26}, 444 ${y + 26}`} stroke={INK} strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="4 5" className="hub-flow" />
            <rect x="444" y={y} width="150" height="52" rx="14" fill={INK} />
            <text x="508" y={y + 31} textAnchor="middle" fontSize="13" className={mono} fill={PAPER}>{s}</text>
            <rect x="562" y={y + 18} width="14" height="12" rx="3" fill={RED} />
            <path d={`M565 ${y + 18} v-3 a4 4 0 0 1 8 0 v3`} stroke={RED} strokeWidth="1.8" fill="none" />
          </g>
        );
      })}
      <text x="121" y="364" textAnchor="middle" fontSize="11" letterSpacing="2" className={mono} fill="rgba(10,10,11,0.45)">HOSTS</text>
      <text x="519" y="364" textAnchor="middle" fontSize="11" letterSpacing="2" className={mono} fill="rgba(10,10,11,0.45)">SERVERS</text>
    </Svg>
  );
}

function CommerceArt({ id }: { id: string }) {
  const fields = [
    { l: 'title + attributes', ok: true },
    { l: 'GTIN', ok: true },
    { l: 'price · live', ok: true },
    { l: 'stock · live', ok: true },
    { l: 'returns policy', ok: false },
  ];
  return (
    <Svg>
      <Bg id={id} tone="red" />
      <rect x="52" y="60" width="270" height="280" rx="20" fill={PAPER} />
      <rect x="72" y="80" width="88" height="88" rx="14" fill="rgba(10,10,11,0.08)" />
      <path d="M92 146 l18 -26 l14 18 l10 -12 l16 20 z" fill="rgba(10,10,11,0.25)" />
      <rect x="176" y="92" width="120" height="10" rx="5" fill={INK} />
      <rect x="176" y="112" width="84" height="8" rx="4" fill="rgba(10,10,11,0.25)" />
      <text x="176" y="154" fontSize="18" fontWeight="700" className={mono} fill={INK}>$118</text>
      {fields.map((f, i) => {
        const y = 188 + i * 29;
        return (
          <g key={f.l}>
            <rect x="72" y={y} width="18" height="18" rx="5" fill={f.ok ? INK : RED} />
            {f.ok ? (
              <path d={`M76.5 ${y + 9} l3 3 l5.5 -6`} stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={`M77 ${y + 5} l8 8 M85 ${y + 5} l-8 8`} stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" />
            )}
            <text x="100" y={y + 13.5} fontSize="12.5" className={mono} fill={INK}>{f.l}</text>
          </g>
        );
      })}
      <path d="M334 200 H392" stroke={PAPER} strokeWidth="2" strokeDasharray="4 5" className="hub-flow" />
      <rect x="400" y="120" width="200" height="160" rx="20" fill={INK} />
      <circle cx="430" cy="150" r="10" fill={RED} />
      <text x="448" y="155" fontSize="12" letterSpacing="1.4" className={mono} fill={PAPER}>AI SHOPPER</text>
      <rect x="420" y="174" width="160" height="30" rx="9" fill="rgba(255,255,255,0.08)" />
      <text x="432" y="193" fontSize="11" className={mono} fill="rgba(252,252,244,0.8)">"trail shoes, &lt;$120"</text>
      <rect x="420" y="220" width="160" height="40" rx="12" fill={PAPER} />
      <text x="500" y="245" textAnchor="middle" fontSize="12.5" className={mono} fill={INK}>checkout ✓</text>
      <text x="320" y="376" textAnchor="middle" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.9)">READABLE DATA WINS THE RECOMMENDATION</text>
    </Svg>
  );
}

function RoiArt({ id }: { id: string }) {
  const X = (m: number) => 90 + m * 40;
  const Y = (v: number) => 320 - v * 0.022;
  const months = Array.from({ length: 13 }, (_, i) => i);
  const cost = months.map((m) => 2500 + m * 500);
  const value = months.map((m) => m * 2000);
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${X(i)} ${Y(v)}`).join(' ');
  const pay = 2500 / 1500;
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <rect x="50" y="40" width="540" height="330" rx="18" fill="#fff" stroke="rgba(10,10,11,0.12)" />
      <text x="74" y="72" fontSize="12" letterSpacing="1.8" className={mono} fill="rgba(10,10,11,0.5)">CUMULATIVE · EXAMPLE NUMBERS</text>
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M90 ${120 + k * 66} H570`} stroke="rgba(10,10,11,0.06)" />
      ))}
      <path d={path(cost)} stroke={INK} strokeWidth="2.4" />
      <path d={path(value)} stroke={RED} strokeWidth="2.6" />
      <circle cx={X(pay)} cy={Y(pay * 2000)} r="7" fill={RED} stroke="#fff" strokeWidth="3" />
      <rect x={X(pay) + 12} y={Y(pay * 2000) - 44} width="132" height="30" rx="10" fill={INK} />
      <text x={X(pay) + 78} y={Y(pay * 2000) - 24} textAnchor="middle" fontSize="11.5" className={mono} fill={PAPER}>payback ≈ 1.7 mo</text>
      <text x={X(12) - 4} y={Y(value[12]) + 4} textAnchor="end" dy="-12" fontSize="12" className={mono} fill={RED}>value</text>
      <text x={X(12) - 4} y={Y(cost[12]) + 22} textAnchor="end" fontSize="12" className={mono} fill={INK}>total cost</text>
      {[0, 3, 6, 9, 12].map((m) => (
        <text key={m} x={X(m)} y="344" textAnchor="middle" fontSize="11" className={mono} fill="rgba(10,10,11,0.45)">m{m}</text>
      ))}
    </Svg>
  );
}

function VettingArt({ id }: { id: string }) {
  const rows = ['live work', 'testing', 'ownership', 'pricing', 'questions'];
  const vendors = [
    { name: 'A', s: [4, 2, 2, 3, 2] },
    { name: 'B', s: [5, 5, 4, 4, 5], hot: true },
    { name: 'C', s: [3, 1, 3, 2, 3] },
  ];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      <text x="60" y="66" fontSize="12" letterSpacing="2.2" className={mono} fill="rgba(252,252,244,0.5)">VENDOR SCORECARD</text>
      {vendors.map((v, j) => (
        <text key={v.name} x={300 + j * 110} y="104" textAnchor="middle" fontSize="13" className={mono} fill={v.hot ? RED : PAPER}>vendor {v.name}</text>
      ))}
      {rows.map((r, i) => {
        const y = 136 + i * 46;
        return (
          <g key={r}>
            <path d={`M60 ${y + 22} H580`} stroke="rgba(255,255,255,0.07)" />
            <text x="60" y={y + 6} fontSize="13" className={mono} fill="rgba(252,252,244,0.8)">{r}</text>
            {vendors.map((v, j) =>
              [0, 1, 2, 3, 4].map((k) => (
                <circle key={`${j}-${k}`} cx={268 + j * 110 + k * 16} cy={y + 2} r="5" fill={k < v.s[i] ? (v.hot ? RED : PAPER) : 'rgba(255,255,255,0.12)'} fillOpacity={k < v.s[i] && !v.hot ? 0.75 : 1} />
              )),
            )}
          </g>
        );
      })}
      <rect x="352" y="356" width="116" height="26" rx="13" fill={RED} />
      <text x="410" y="373" textAnchor="middle" fontSize="11" letterSpacing="1.2" className={mono} fill={PAPER}>paid pilot →</text>
    </Svg>
  );
}

function ReceptionistArt({ id }: { id: string }) {
  const calls = [
    { t: '02:14', l: 'Book Thu 5pm', r: 'booked', ok: true },
    { t: '08:03', l: 'Opening hours?', r: 'answered', ok: true },
    { t: '09:41', l: 'Move my appointment', r: 'moved', ok: true },
    { t: '11:20', l: 'Billing complaint', r: '→ staff', ok: false },
  ];
  const wave = [8, 18, 30, 14, 40, 24, 34, 12, 26, 16];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      <rect x="40" y="70" width="190" height="260" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.16)" />
      <circle cx="135" cy="140" r="32" fill={RED} />
      <path d="M124 128 c2 -3 6 -3 7 0 l3 6 c1 2 0 4 -2 5 l-2 1 c2 5 6 9 11 11 l1 -2 c1 -2 3 -3 5 -2 l6 3 c3 1 3 5 0 7 c-4 4 -10 5 -15 2 c-8 -5 -14 -11 -18 -19 c-2 -5 -1 -10 4 -14 z" fill={PAPER} />
      <text x="135" y="204" textAnchor="middle" fontSize="12" letterSpacing="1.4" className={mono} fill="rgba(252,252,244,0.7)">AI RECEPTIONIST</text>
      {wave.map((h, i) => (
        <rect key={i} x={80 + i * 11} y={256 - h / 2} width="6" height={h} rx="3" fill={i === 4 ? RED : PAPER} fillOpacity={i === 4 ? 1 : 0.7} />
      ))}
      <text x="135" y="308" textAnchor="middle" fontSize="11" className={mono} fill="rgba(252,252,244,0.45)">24/7 · every call</text>
      {calls.map((c, i) => {
        const y = 78 + i * 64;
        return (
          <g key={c.l}>
            <rect x="262" y={y} width="338" height="50" rx="14" fill={c.ok ? 'rgba(255,255,255,0.07)' : RED} stroke={c.ok ? 'rgba(255,255,255,0.14)' : RED} />
            <text x="280" y={y + 30} fontSize="12" className={mono} fill="rgba(252,252,244,0.55)">{c.t}</text>
            <text x="330" y={y + 30} fontSize="13" className={mono} fill={PAPER}>{c.l}</text>
            <text x="584" y={y + 30} textAnchor="end" fontSize="12" className={mono} fill={c.ok ? RED : PAPER}>{c.r}</text>
          </g>
        );
      })}
      <text x="600" y="376" textAnchor="end" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">ROUTINE HANDLED · THE REST HANDED OVER</text>
    </Svg>
  );
}

/** Small tick or cross box used by several covers. */
function Mark({ x, y, ok, s = 18 }: { x: number; y: number; ok: boolean; s?: number }) {
  const k = s / 18;
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={5 * k} fill={ok ? INK : RED} />
      {ok ? (
        <path d={`M${x + 4.5 * k} ${y + 9 * k} l${3 * k} ${3 * k} l${5.5 * k} ${-6 * k}`} stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M${x + 5 * k} ${y + 5 * k} l${8 * k} ${8 * k} M${x + 13 * k} ${y + 5 * k} l${-8 * k} ${8 * k}`} stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" />
      )}
    </g>
  );
}

function LeadsArt({ id }: { id: string }) {
  const sources = ['Web form', 'Email', 'WhatsApp', 'Facebook', 'Phone'];
  const stages = [
    { l: 'Replied · 2 min', hot: true },
    { l: 'Qualified' },
    { l: 'Call booked' },
  ];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      {sources.map((s, i) => {
        const y = 66 + i * 58;
        return (
          <g key={s}>
            <Chip x={40} y={y} w={132} label={s} dark />
            <path d={`M172 ${y + 17} C 220 ${y + 17}, 220 200, 254 200`} stroke={PAPER} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 5" className="hub-flow" />
          </g>
        );
      })}
      <rect x="254" y="160" width="110" height="80" rx="18" fill={PAPER} />
      <text x="309" y="196" textAnchor="middle" fontSize="15" fontWeight="700" className={mono} fill={INK}>CRM</text>
      <text x="309" y="216" textAnchor="middle" fontSize="10.5" className={mono} fill="rgba(10,10,11,0.55)">one inbox</text>
      {stages.map((s, i) => {
        const y = 104 + i * 70;
        return (
          <g key={s.l}>
            <path d={`M364 200 C 392 200, 392 ${y + 22}, 416 ${y + 22}`} stroke={PAPER} strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="416" y={y} width="184" height="44" rx="14" fill={s.hot ? RED : 'rgba(255,255,255,0.07)'} stroke={s.hot ? RED : 'rgba(255,255,255,0.16)'} />
            <text x="508" y={y + 27} textAnchor="middle" fontSize="12.5" className={mono} fill={PAPER}>{s.l}</text>
          </g>
        );
      })}
      <text x="600" y="376" textAnchor="end" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">NO ENQUIRY LEFT WAITING</text>
    </Svg>
  );
}

function DocumentsArt({ id }: { id: string }) {
  const fields = [
    { k: 'supplier', v: 'Acme Supplies', ok: true },
    { k: 'invoice no', v: 'INV-20418', ok: true },
    { k: 'PO match', v: 'PO-1187', ok: true },
    { k: 'total', v: '$4,210.00', ok: true },
    { k: 'line sum', v: '$4,120.00', ok: false },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <g transform="rotate(-4 160 200)">
        <rect x="58" y="62" width="200" height="270" rx="10" fill="#fff" stroke="rgba(10,10,11,0.14)" />
        <rect x="78" y="84" width="80" height="12" rx="4" fill={INK} />
        <rect x="78" y="106" width="120" height="7" rx="3.5" fill="rgba(10,10,11,0.2)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x="78" y={140 + i * 22} width="100" height="7" rx="3.5" fill="rgba(10,10,11,0.14)" />
            <rect x="196" y={140 + i * 22} width="42" height="7" rx="3.5" fill="rgba(10,10,11,0.22)" />
          </g>
        ))}
        <rect x="160" y="290" width="78" height="16" rx="4" fill={RED} fillOpacity="0.85" />
      </g>
      <path d="M276 200 H322" stroke={INK} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 5" className="hub-flow" />
      <rect x="330" y="70" width="270" height="260" rx="18" fill={INK} />
      <text x="352" y="102" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.5)">EXTRACTED · VALIDATED</text>
      {fields.map((f, i) => {
        const y = 122 + i * 40;
        return (
          <g key={f.k}>
            <Mark x={352} y={y} ok={f.ok} />
            <text x="382" y={y + 13.5} fontSize="12" className={mono} fill="rgba(252,252,244,0.6)">{f.k}</text>
            <text x="582" y={y + 13.5} textAnchor="end" fontSize="12.5" className={mono} fill={f.ok ? PAPER : RED}>{f.v}</text>
          </g>
        );
      })}
      <text x="465" y="356" textAnchor="middle" fontSize="11" letterSpacing="1.6" className={mono} fill={RED}>mismatch → human review</text>
    </Svg>
  );
}

function KnowledgeArt({ id }: { id: string }) {
  const docs = ['Returns policy v4', 'Warehouse SOP', 'Price list · Nov', 'HR handbook'];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      {docs.map((d, i) => {
        const y = 70 + i * 66;
        const hot = i === 0;
        return (
          <g key={d}>
            <rect x="40" y={y} width="200" height="50" rx="12" fill="#fff" stroke={hot ? RED : 'rgba(10,10,11,0.14)'} strokeWidth={hot ? 2 : 1} />
            <rect x="56" y={y + 14} width="16" height="22" rx="3" fill={hot ? RED : 'rgba(10,10,11,0.18)'} />
            <text x="84" y={y + 30} fontSize="12.5" className={mono} fill={INK}>{d}</text>
          </g>
        );
      })}
      <path d="M240 95 C 290 95, 290 150, 318 150" stroke={RED} strokeWidth="2" strokeDasharray="4 5" className="hub-flow" />
      <rect x="318" y="60" width="282" height="280" rx="20" fill={INK} />
      <rect x="400" y="84" width="180" height="46" rx="14" fill="rgba(255,255,255,0.1)" />
      <text x="490" y="112" textAnchor="middle" fontSize="12" className={mono} fill={PAPER}>Return window for B2B?</text>
      <rect x="338" y="148" width="228" height="96" rx="14" fill={PAPER} />
      <text x="354" y="174" fontSize="12" className={mono} fill={INK}>30 days from delivery,</text>
      <text x="354" y="194" fontSize="12" className={mono} fill={INK}>unopened, with invoice.</text>
      <rect x="354" y="210" width="140" height="22" rx="11" fill={RED} />
      <text x="424" y="225" textAnchor="middle" fontSize="10.5" className={mono} fill={PAPER}>source: policy v4 §2</text>
      <text x="459" y="314" textAnchor="middle" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.5)">EVERY ANSWER CITED</text>
    </Svg>
  );
}

function InventoryArt({ id }: { id: string }) {
  const sheets = ['stock_FINAL.xlsx', 'stock_v3_upd.xlsx', 'branch2.xlsx'];
  const bars = [
    { l: 'Paracetamol 500', v: 0.82 },
    { l: 'Gloves M', v: 0.46 },
    { l: 'Syringe 5ml', v: 0.12, hot: true },
    { l: 'Masks', v: 0.64 },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      {sheets.map((s, i) => (
        <g key={s} transform={`rotate(${-6 + i * 5} 140 ${110 + i * 70})`}>
          <rect x="44" y={80 + i * 74} width="196" height="56" rx="8" fill="#fff" stroke="rgba(10,10,11,0.16)" />
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M44 ${96 + i * 74 + k * 13} H240`} stroke="rgba(10,10,11,0.08)" />
          ))}
          <text x="56" y={92 + i * 74} fontSize="10.5" className={mono} fill="rgba(10,10,11,0.6)">{s}</text>
          <text x="226" y={124 + i * 74} textAnchor="end" fontSize="13" fontWeight="700" className={mono} fill={RED}>{['412', '398', '?'][i]}</text>
        </g>
      ))}
      <path d="M262 200 H306" stroke={INK} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 5" className="hub-flow" />
      <rect x="314" y="64" width="286" height="272" rx="18" fill={INK} />
      <text x="336" y="96" fontSize="11" letterSpacing="1.6" className={mono} fill="rgba(252,252,244,0.5)">LIVE STOCK · ALL BRANCHES</text>
      {bars.map((b, i) => {
        const y = 122 + i * 48;
        return (
          <g key={b.l}>
            <text x="336" y={y + 4} fontSize="11.5" className={mono} fill="rgba(252,252,244,0.8)">{b.l}</text>
            <rect x="336" y={y + 12} width="240" height="10" rx="5" fill="rgba(255,255,255,0.1)" />
            <rect x="336" y={y + 12} width={240 * b.v} height="10" rx="5" fill={b.hot ? RED : PAPER} />
            {b.hot && <text x="576" y={y + 4} textAnchor="end" fontSize="11" className={mono} fill={RED}>reorder</text>}
          </g>
        );
      })}
    </Svg>
  );
}

function DashboardArt({ id }: { id: string }) {
  const kpis = [
    { l: 'Revenue', v: '$48.2k', d: '−8%', down: true },
    { l: 'Margin', v: '31%', d: '+2pt' },
    { l: 'Overdue', v: '$6.1k', d: '+12%', down: true },
  ];
  const bars = [42, 58, 50, 66, 61, 72, 54];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <rect x="40" y="40" width="560" height="320" rx="18" fill="#fff" stroke="rgba(10,10,11,0.12)" />
      {kpis.map((k, i) => {
        const x = 62 + i * 176;
        return (
          <g key={k.l}>
            <rect x={x} y="62" width="160" height="78" rx="12" fill="rgba(10,10,11,0.04)" />
            <text x={x + 14} y="86" fontSize="11" letterSpacing="1.2" className={mono} fill="rgba(10,10,11,0.5)">{k.l.toUpperCase()}</text>
            <text x={x + 14} y="120" fontSize="22" fontWeight="700" className={mono} fill={INK}>{k.v}</text>
            <text x={x + 146} y="120" textAnchor="end" fontSize="12" className={mono} fill={k.down ? RED : INK}>{k.d}</text>
          </g>
        );
      })}
      {bars.map((h, i) => (
        <rect key={i} x={70 + i * 34} y={320 - h * 2} width="22" height={h * 2} rx="5" fill={i === 6 ? RED : INK} fillOpacity={i === 6 ? 1 : 0.85} />
      ))}
      <rect x="330" y="166" width="248" height="168" rx="14" fill={INK} />
      <text x="348" y="192" fontSize="11" letterSpacing="1.4" className={mono} fill={RED}>MONDAY SUMMARY</text>
      {['Revenue −8% vs last week:', 'two large orders moved', 'to next week. Overdue', 'up: 3 invoices > 30 days.'].map((l, i) => (
        <text key={l} x="348" y={220 + i * 22} fontSize="12" className={mono} fill="rgba(252,252,244,0.85)">{l}</text>
      ))}
    </Svg>
  );
}

function SupportArt({ id }: { id: string }) {
  const steps = [
    { l: 'Answer', s: 'policies, how-to', w: 0.95 },
    { l: 'Look up', s: 'order status', w: 0.75 },
    { l: 'Act', s: 'within limits', w: 0.5 },
    { l: 'Hand over', s: 'to a person', w: 0.3, hot: true },
  ];
  return (
    <Svg>
      <Bg id={id} tone="red" />
      {steps.map((s, i) => {
        const y = 300 - i * 70;
        const x = 60 + i * 60;
        return (
          <g key={s.l}>
            <rect x={x} y={y} width="300" height="54" rx="14" fill={s.hot ? INK : PAPER} />
            <text x={x + 20} y={y + 24} fontSize="14" fontWeight="700" className={mono} fill={s.hot ? PAPER : INK}>{s.l}</text>
            <text x={x + 20} y={y + 42} fontSize="11" className={mono} fill={s.hot ? 'rgba(252,252,244,0.6)' : 'rgba(10,10,11,0.55)'}>{s.s}</text>
            <text x={x + 284} y={y + 33} textAnchor="end" fontSize="11" className={mono} fill={s.hot ? RED : 'rgba(10,10,11,0.45)'}>{`0${i + 1}`}</text>
          </g>
        );
      })}
      <rect x="40" y="40" width="178" height="70" rx="16" fill={INK} />
      <text x="56" y="68" fontSize="11" className={mono} fill="rgba(252,252,244,0.55)">customer</text>
      <text x="56" y="90" fontSize="12.5" className={mono} fill={PAPER}>"Where is my order?"</text>
      <text x="600" y="376" textAnchor="end" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.9)">AUTOMATE IN ORDER OF RISK</text>
    </Svg>
  );
}

function BuildBuyArt({ id }: { id: string }) {
  const cols = [
    { t: 'BUY', items: ['Accounting', 'Email', 'Payroll'], x: 44 },
    { t: 'CONNECT', items: ['CRM ↔ Store', 'Store ↔ Stock', 'Stock ↔ Books'], x: 244 },
    { t: 'BUILD', items: ['Your quoting', 'Your scheduling', 'Your product'], x: 444, hot: true },
  ];
  return (
    <Svg>
      <Bg id={id} tone="dark" />
      {cols.map((c) => (
        <g key={c.t}>
          <rect x={c.x} y="70" width="152" height="40" rx="12" fill={c.hot ? RED : 'rgba(255,255,255,0.1)'} />
          <text x={c.x + 76} y="95" textAnchor="middle" fontSize="13" letterSpacing="2" fontWeight="700" className={mono} fill={PAPER}>{c.t}</text>
          {c.items.map((it, i) => (
            <g key={it}>
              <rect x={c.x} y={128 + i * 56} width="152" height="44" rx="12" fill="rgba(255,255,255,0.05)" stroke={c.hot ? RED : 'rgba(255,255,255,0.16)'} strokeDasharray={c.t === 'CONNECT' ? '4 4' : undefined} />
              <text x={c.x + 76} y={155 + i * 56} textAnchor="middle" fontSize="12" className={mono} fill={PAPER}>{it}</text>
            </g>
          ))}
        </g>
      ))}
      <text x="40" y="376" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">COMMODITY</text>
      <text x="600" y="376" textAnchor="end" fontSize="11" letterSpacing="2" className={mono} fill="rgba(252,252,244,0.45)">YOUR EDGE →</text>
    </Svg>
  );
}

function AutomationsArt({ id }: { id: string }) {
  const rows = [
    { t: 'New enquiry', a: 'CRM + reply', ai: false },
    { t: 'Invoice email', a: 'extract + post', ai: true },
    { t: 'Stock < min', a: 'purchase request', ai: false },
    { t: 'Due date −3d', a: 'payment reminder', ai: false },
    { t: 'Support msg', a: 'tag + draft', ai: true },
  ];
  return (
    <Svg>
      <Bg id={id} tone="light" />
      <text x="60" y="58" fontSize="11" letterSpacing="2" className={mono} fill="rgba(10,10,11,0.5)">TRIGGER</text>
      <text x="420" y="58" fontSize="11" letterSpacing="2" className={mono} fill="rgba(10,10,11,0.5)">ACTION</text>
      {rows.map((r, i) => {
        const y = 74 + i * 60;
        return (
          <g key={r.t}>
            <rect x="60" y={y} width="190" height="42" rx="12" fill="#fff" stroke="rgba(10,10,11,0.14)" />
            <text x="78" y={y + 26} fontSize="12.5" className={mono} fill={INK}>{r.t}</text>
            <path d={`M250 ${y + 21} H408`} stroke={INK} strokeOpacity="0.4" strokeWidth="1.6" strokeDasharray="4 5" className="hub-flow" />
            {r.ai && (
              <g>
                <rect x="303" y={y + 9} width="50" height="24" rx="12" fill={RED} />
                <text x="328" y={y + 25} textAnchor="middle" fontSize="11" fontWeight="700" className={mono} fill={PAPER}>AI</text>
              </g>
            )}
            <rect x="408" y={y} width="172" height="42" rx="12" fill={INK} />
            <text x="494" y={y + 26} textAnchor="middle" fontSize="12.5" className={mono} fill={PAPER}>{r.a}</text>
          </g>
        );
      })}
    </Svg>
  );
}

const arts: Record<BlogArtId, (p: { id: string }) => ReactNode> = {
  intro: IntroArt,
  'agent-loop': AgentLoopArt,
  build: BuildArt,
  offline: OfflineArt,
  compare: CompareArt,
  rag: RagArt,
  guardrails: GuardrailsArt,
  process: ProcessArt,
  phone: PhoneArt,
  testing: TestingArt,
  metrics: MetricsArt,
  'rag-eval': RagEvalArt,
  checklist: ChecklistArt,
  'voice-test': VoiceTestArt,
  monitoring: MonitoringArt,
  cost: CostArt,
  global: GlobalArt,
  mcp: McpArt,
  commerce: CommerceArt,
  roi: RoiArt,
  vetting: VettingArt,
  receptionist: ReceptionistArt,
  leads: LeadsArt,
  documents: DocumentsArt,
  knowledge: KnowledgeArt,
  inventory: InventoryArt,
  dashboard: DashboardArt,
  support: SupportArt,
  'build-buy': BuildBuyArt,
  automations: AutomationsArt,
};

/** Fills its parent; give the parent a size or aspect ratio. */
export function BlogArt({ art, className }: { art: BlogArtId; className?: string }) {
  const id = `ba${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const Art = arts[art];
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Art id={id} />
    </div>
  );
}
