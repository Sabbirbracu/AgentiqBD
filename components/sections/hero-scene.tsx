'use client';

import Image from 'next/image';
import { useReducedMotion } from 'motion/react';
import { LogoMark } from '@/components/brand/logo';

/**
 * Hero artwork — a Bangladeshi river port in the brand's cream / ink / red.
 *
 * Layers (back to front):
 *   1. /hero/scene.webp   the painted plate: sky, skyline, factory, bridge, water
 *   2. sun glow + water sparkles
 *   3. boats              cut-outs of the artwork that bob on the water
 *   4. birds
 *   5. the Agentiq network: dashed spokes, pins and labels, wired to the core
 *
 * Everything is positioned in the artwork's own coordinate system (1672 × 501, "design
 * pixels") and expressed as percentages / container-query units, so the whole composition
 * scales as one piece and the labels stay attached to the buildings they point at.
 *
 * To swap in higher-resolution art, replace the files in /public/hero keeping the same
 * framing (same aspect ratio, same layout) — no code changes needed.
 */

const W = 1672;
const H = 501;
const Y0 = 440; // design-space y of the artwork's top edge

const x = (v: number) => `${((v / W) * 100).toFixed(3)}%`;
const y = (v: number) => `${(((v - Y0) / H) * 100).toFixed(3)}%`;
const cq = (v: number) => `${((v / W) * 100).toFixed(4)}cqw`;

const CORE = { x: 837, y: 642 };

/** Dashed spokes: quadratic curves from the core to each pin's dot (fitted to the design). */
const spokes = [
  { id: 'inventory', c: [630.75, 537], to: [360.5, 664] },
  { id: 'production', c: [684.5, 592], to: [564, 672] },
  { id: 'procurement', c: [658.5, 628.5], to: [572, 817] },
  { id: 'support', c: [966.5, 592.5], to: [1110, 661] },
  { id: 'reporting', c: [1042, 533], to: [1375, 650] },
  { id: 'logistics', c: [965.5, 617], to: [1144, 806] },
] as const;

const spokePath = (s: (typeof spokes)[number]) =>
  `M${CORE.x} ${CORE.y} Q${s.c[0]} ${s.c[1]} ${s.to[0]} ${s.to[1]}`;

/** Label pills: box in design pixels. */
const pills = [
  { label: 'Inventory', box: [307, 624, 417, 651] },
  { label: 'Production', box: [508, 635, 632, 662] },
  { label: 'Procurement', box: [507, 778, 639, 806] },
  { label: 'Support', box: [1069, 624, 1163, 651] },
  { label: 'Reporting', box: [1326, 595, 1434, 622] },
  { label: 'Bookings', box: [790, 715, 885, 740], phone: true },
  { label: 'Logistics', box: [1164, 746, 1259, 773] },
] as const;

/** Pin dots — [cx, cy, r]. A second, smaller dot marks where a pin lands on the scene. */
const dots: [number, number, number][] = [
  [360.5, 664, 6.4],
  [360, 684, 3.8],
  [564, 672, 6.4],
  [1375, 631, 6.4],
  [1375, 650, 4.4],
  [1110, 661, 6.4],
  [836, 707, 6.4],
  [836, 750, 6.4],
  [1206, 783, 6.4],
  [1144, 806, 4.2],
  [572, 817, 6.4],
  [572, 836, 4.4],
];
/** Short stems that join dots to each other and to the core: [x, y1, y2]. */
const stems: [number, number, number][] = [
  [360.5, 670, 700],
  [564, 678, 698],
  [1375, 637, 645],
  [1110, 667, 684],
  [837, 686, 701],
  [836, 756, 766],
  [1206, 789, 812],
  [572, 823, 832],
];

/** Chimney mouths in the plate — [x, y, puffs, size, rise]. Smoke drifts right with the wind. */
const stacks = [
  { x: 486, y: 653, n: 14, r: 8, rise: 105, t: 12 },
  { x: 554.5, y: 682, n: 10, r: 5, rise: 95, t: 9.5 },
  { x: 564, y: 703, n: 10, r: 4.6, rise: 85, t: 9 },
];

const boats = [
  { id: 'canoe', x: 52, y: 346, w: 333, h: 112, sway: 'a', t: 6.4, d: -1.2 },
  { id: 'cargo', x: 524, y: 380, w: 214, h: 49, sway: 'b', t: 8.6, d: -3.1 },
  { id: 'tug', x: 790, y: 321, w: 94, h: 77, sway: 'c', t: 4.8, d: -0.7 },
  { id: 'skiff', x: 900, y: 371, w: 58, h: 23, sway: 'c', t: 4.2, d: -2.4 },
  { id: 'ship', x: 1107, y: 300, w: 304, h: 129, sway: 'b', t: 9.6, d: -4.4 },
] as const;

const birds = [
  { x: 897, y: 688, s: 9, t: 16, d: -3, f: 0.8 },
  { x: 915, y: 708, s: 7, t: 13, d: -7, f: 0.7 },
  { x: 937, y: 713, s: 6, t: 15, d: -1, f: 0.75 },
  { x: 1572, y: 617, s: 17, t: 19, d: -5, f: 1.0 },
  { x: 1646, y: 606, s: 11, t: 17, d: -9, f: 0.9 },
  { x: 1631, y: 628, s: 6, t: 14, d: -2, f: 0.8 },
];

// deterministic scatter so server and client render the same sparkles
function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const sparkles = (() => {
  const r = rng(7);
  const out: { x: number; y: number; w: number; warm: boolean; t: number; d: number }[] = [];
  for (let i = 0; i < 46; i++) {
    const py = 806 + r() * 130;
    const px = r() * W;
    const nearSun = px > 1100 && px < 1420 && py > 860;
    out.push({ x: px, y: py, w: 10 + r() * 20, warm: nearSun && r() > 0.35, t: 3 + r() * 4, d: -r() * 7 });
  }
  return out;
})();

export function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <div
      className="hero-fx pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      role="img"
      aria-label="Illustration of a river port in Bangladesh — a factory, warehouses, a bridge, a city skyline, cargo ships and wooden boats. A red Agentiq core at the centre is wired to Inventory, Production, Procurement, Bookings, Support, Reporting and Logistics."
    >
      <div
        className="relative left-1/2 w-[max(100%,1040px)] -translate-x-1/2 [container-type:inline-size]"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        {/* 1 · painted plate + boats (scale in together) */}
        <div className="hero-anim-scene absolute inset-0">
          <Image
            src="/hero/scene.webp"
            alt=""
            width={W}
            height={H}
            priority
            unoptimized
            sizes="100vw"
            className="absolute inset-0 h-full w-full select-none"
          />

          {/* sun glow */}
          <span
            className="hero-sun absolute rounded-full"
            style={{
              left: x(1248),
              top: y(700),
              width: cq(190),
              aspectRatio: '1',
              background:
                'radial-gradient(circle, rgba(255,140,70,0.4) 0%, rgba(255,165,100,0.16) 40%, rgba(255,190,140,0) 70%)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* water sparkles */}
          <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
            {sparkles.map((s, i) => (
              <rect
                key={i}
                className="hero-twinkle"
                x={s.x}
                y={s.y}
                width={s.w}
                height="1.7"
                rx="0.85"
                fill={s.warm ? '#FFC9A0' : '#FFFFFF'}
                style={{ ['--t' as string]: `${s.t}s`, ['--d' as string]: `${s.d}s` }}
              />
            ))}
          </svg>

          {/* chimney smoke */}
          <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <radialGradient id="smoke-puff">
                <stop offset="0" stopColor="#0C0C0E" stopOpacity="0.9" />
                <stop offset="0.5" stopColor="#141416" stopOpacity="0.55" />
                <stop offset="1" stopColor="#222226" stopOpacity="0" />
              </radialGradient>
              <filter id="smoke-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>
            <g filter="url(#smoke-soft)">
              {stacks.map((st, si) =>
                Array.from({ length: st.n }).map((_, i) => (
                  <circle
                    key={`${si}-${i}`}
                    className="hero-smoke"
                    cx={st.x}
                    cy={st.y}
                    r={st.r}
                    fill="url(#smoke-puff)"
                    style={{
                      ['--t' as string]: `${st.t}s`,
                      ['--d' as string]: `${(-i * st.t) / st.n}s`,
                      ['--dx' as string]: `${st.rise * (0.35 + ((i * 7) % 5) / 18)}px`,
                      ['--dy' as string]: `${-st.rise}px`,
                      ['--s' as string]: `${3 + (i % 3) * 0.5}`,
                      ['--o' as string]: `${0.5 + (i % 3) * 0.08}`,
                    }}
                  />
                )),
              )}
            </g>
          </svg>

          {/* boats */}
          {boats.map((b) => (
            <div
              key={b.id}
              className="hero-boat absolute"
              data-sway={b.sway}
              style={{
                left: x(b.x),
                top: `${((b.y / H) * 100).toFixed(3)}%`,
                width: cq(b.w),
                height: `${((b.h / H) * 100).toFixed(3)}%`,
                ['--t' as string]: `${b.t}s`,
                ['--d' as string]: `${b.d}s`,
              }}
            >
              <Image
                src={`/hero/boat-${b.id}.webp`}
                alt=""
                width={b.w}
                height={b.h}
                unoptimized
                className="h-full w-full select-none"
              />
            </div>
          ))}

          {/* birds */}
          <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {birds.map((b, i) => (
              <g key={i} transform={`translate(${b.x} ${b.y})`}>
                <g className="hero-bird" style={{ ['--t' as string]: `${b.t}s`, ['--d' as string]: `${b.d}s` }}>
                  <path
                    className="hero-wing"
                    d={`M${-b.s} 0 Q${-b.s / 2} ${-b.s * 0.55} 0 ${b.s * 0.08} Q${b.s / 2} ${-b.s * 0.55} ${b.s} 0`}
                    fill="none"
                    stroke="#3E3E46"
                    strokeWidth={Math.max(1.5, b.s / 6)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ ['--f' as string]: `${b.f}s` }}
                  />
                </g>
              </g>
            ))}
          </svg>
        </div>

        {/* 5 · the Agentiq network */}
        <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            {spokes.map((s, i) => (
              <mask key={s.id} id={`spoke-mask-${s.id}`} maskUnits="userSpaceOnUse" x="0" y={Y0} width={W} height={H}>
                <path
                  d={spokePath(s)}
                  className="hero-line-mask"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="12"
                  pathLength={1}
                  strokeDasharray="1"
                  style={{ ['--d' as string]: `${0.9 + i * 0.12}s` }}
                />
              </mask>
            ))}
          </defs>

          {/* spokes: dashes flow outward from the core */}
          {spokes.map((s) => (
            <path
              key={s.id}
              d={spokePath(s)}
              className="hero-line"
              fill="none"
              stroke="#EF4129"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeDasharray="7 5"
              mask={`url(#spoke-mask-${s.id})`}
            />
          ))}

          {/* data packets travelling core → node */}
          {!reduce &&
            spokes.map((s, i) => (
              <g key={s.id} opacity="0">
                <animateMotion
                  dur="3.8s"
                  begin={`${2.6 + i * 0.7}s`}
                  repeatCount="indefinite"
                  path={spokePath(s)}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.35 0 0.35 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.88;1"
                  dur="3.8s"
                  begin={`${2.6 + i * 0.7}s`}
                  repeatCount="indefinite"
                />
                <circle r="8" fill="#FC522C" opacity="0.22" />
                <circle r="3.2" fill="#FC522C" stroke="#fff" strokeWidth="1.2" />
              </g>
            ))}

          {/* stems */}
          <g stroke="#EF4129" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" className="hero-fade" style={{ ['--d' as string]: '1.7s' }}>
            {stems.map(([sx, y1, y2], i) => (
              <line key={i} x1={sx} y1={y1} x2={sx} y2={y2} />
            ))}
          </g>

          {/* dots */}
          {dots.map(([cx, cy, r], i) => (
            <g key={i}>
              {r > 5 && (
                <circle
                  className="hero-ping"
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="#FC522C"
                  strokeWidth="1.4"
                  style={{ ['--d' as string]: `${2.2 + (i % 5) * 0.45}s` }}
                />
              )}
              <circle
                className="hero-dot"
                cx={cx}
                cy={cy}
                r={r}
                fill="#F8321A"
                stroke="#fff"
                strokeWidth={r > 5 ? 2.4 : 1.8}
                style={{ ['--d' as string]: `${1.5 + i * 0.07}s` }}
              />
            </g>
          ))}
        </svg>

        {/* labels */}
        {pills.map((p, i) => {
          const [x0, y0, x1, y1] = p.box;
          return (
            <span
              key={p.label}
              className={`${'phone' in p ? '' : 'max-sm:hidden '}hero-pin absolute flex items-center justify-center whitespace-nowrap rounded-[10px] border border-[#EBCDB8]/70 bg-white/[0.97] font-sans font-bold uppercase leading-none text-ink shadow-[0_4px_14px_-5px_rgba(110,70,40,0.28)]`}
              style={{
                left: x(x0),
                top: y(y0),
                width: cq(x1 - x0),
                height: `${(((y1 - y0) / H) * 100).toFixed(3)}%`,
                fontSize: cq(13.2),
                letterSpacing: '0.04em',
                paddingTop: cq(1),
                borderRadius: cq(9),
                ['--d' as string]: `${1.35 + i * 0.09}s`,
              }}
            >
              {p.label}
            </span>
          );
        })}

        {/* the core */}
        <div
          className="hero-core absolute"
          style={{ left: x(CORE.x), top: y(CORE.y), width: cq(88), aspectRatio: '1' }}
        >
          <span
            className="hero-core-glow absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: '170%',
              aspectRatio: '1',
              background:
                'radial-gradient(circle, rgba(252,82,44,0.26) 0%, rgba(252,82,44,0.08) 46%, rgba(252,82,44,0) 70%)',
            }}
          />
          {[0, 1.7].map((d) => (
            <span
              key={d}
              className="hero-core-ring absolute left-1/2 top-1/2 rounded-full border border-flame/60"
              style={{ width: '100%', aspectRatio: '1', ['--d' as string]: `${1.1 + d}s` }}
            />
          ))}
          {/* white ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#FFFDFB]"
            style={{ boxShadow: '0 0 0 1px rgba(252,82,44,0.22), 0 8px 20px -8px rgba(252,82,44,0.45)' }}
          />
          {/* red disc */}
          <span
            className="absolute rounded-full"
            style={{
              inset: '7.4%',
              background:
                'radial-gradient(circle at 36% 26%, #FF7449 0%, #FC522C 52%, #F0431F 100%)',
              boxShadow: 'inset 0 -0.35cqw 0.7cqw rgba(190,40,10,0.28)',
            }}
          />
          <LogoMark
            boxed={false}
            ring="#FFFDFB"
            hand="#FFFDFB"
            animateHand={!reduce}
            className="absolute text-[#17171A]"
            style={{ left: '22.7%', top: '22.7%', width: '50%', height: '50%' }}
          />
        </div>

        {/* core label */}
        <span
          className="hero-pin absolute flex items-center justify-center whitespace-nowrap border border-[#EBCDB8]/70 bg-white/[0.97] font-sans font-bold uppercase leading-none text-ink shadow-[0_4px_14px_-5px_rgba(110,70,40,0.28)]"
          style={{
            left: x(769),
            top: y(567),
            width: cq(143),
            height: `${((29 / H) * 100).toFixed(3)}%`,
            fontSize: cq(16.5),
            letterSpacing: '0.03em',
            paddingTop: cq(1),
            borderRadius: cq(10),
            ['--d' as string]: '1.2s',
          }}
        >
          Agentiq Core
        </span>
      </div>
    </div>
  );
}
