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
