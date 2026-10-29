import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Pip, the Agentiq BD AI Employee, drawn from the waist up behind a laptop ("at the desk" pose from the
 * Pip mascot concept). Same shapes and palette as the concept: glossy cream shell, black visor, headphone
 * ears, and one red eye that is the logo's dot. Mood lives in the eye only (no mouth, no brows):
 * focused = still hand, working = spinning hand, waiting = hand up, happy = ^ shape. `mic` adds a headset boom; `bust="head"` crops to the head
 * (Pip mini, for avatars and small badges).
 */

export type PipMood = 'idle' | 'focused' | 'working' | 'waiting' | 'happy';

/** Brand mark as a nested SVG so it can sit on the chest and the laptop lid. */
function Mark({ x, y, s, color, id }: { x: number; y: number; s: number; color: string; id: string }) {
  return (
    <svg x={x} y={y} width={s} height={s} viewBox="480 480 580 580" overflow="visible">
      <mask id={id} maskUnits="userSpaceOnUse" x="300" y="300" width="1000" height="1000">
        <rect x="300" y="300" width="1000" height="1000" fill="#fff" />
        <polygon points="560,1153 920,793 987,793 627,1153" fill="#000" />
        <circle cx="980" cy="763" r="88" fill="#000" />
      </mask>
      <g mask={`url(#${id})`} fill={color}>
        <rect x="796" y="498" width="244" height="550" rx="122" />
        <line x1="615" y1="925" x2="918" y2="622" stroke={color} strokeWidth="250" strokeLinecap="round" />
      </g>
      <circle cx="980" cy="763" r="66" fill="#E84F3D" />
      <line x1="985" y1="766" x2="1033" y2="814" stroke="#FCFCF4" strokeWidth="22" strokeLinecap="round" />
    </svg>
  );
}

/** Rotates children around the local origin; CSS so the angle can ease between moods. */
const spinOrigin = { transformBox: 'view-box', transformOrigin: '0 0' } as const;

export function Pip({
  mood = 'idle',
  mic = false,
  bust = 'desk',
  className,
  title = 'Pip, the Agentiq BD AI Employee',
}: {
  mood?: PipMood;
  mic?: boolean;
  bust?: 'desk' | 'head';
  className?: string;
  title?: string;
}) {
  const u = useId().replace(/:/g, '');
  const id = (n: string) => `pip-${n}-${u}`;
  const url = (n: string) => `url(#${id(n)})`;

  const working = mood === 'working';
  const headTilt = mood === 'focused' ? -6 : mood === 'happy' ? 4 : mood === 'waiting' ? -2 : 0;
  // clock hand: drawn pointing down-right (45°); rotate to look left, up, etc.
  const handAngle = mood === 'focused' ? 90 : mood === 'waiting' ? -135 : 0;

  return (
    <svg
      viewBox={bust === 'head' ? '44 10 212 190' : '40 8 220 348'}
      className={cn('block h-auto', bust === 'desk' && 'overflow-visible', className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <radialGradient id={id('head')} cx=".36" cy=".3" r=".78">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".45" stopColor="#F6F5EE" />
          <stop offset=".8" stopColor="#D8D7CD" />
          <stop offset="1" stopColor="#A9A89E" />
        </radialGradient>
        <radialGradient id={id('shell')} cx=".32" cy=".25" r=".9">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".5" stopColor="#F1F0E8" />
          <stop offset=".85" stopColor="#CFCEC4" />
          <stop offset="1" stopColor="#A9A89E" />
        </radialGradient>
        <linearGradient id={id('limb')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9C8BE" />
          <stop offset=".28" stopColor="#FFFFFF" />
          <stop offset=".62" stopColor="#ECEBE3" />
          <stop offset="1" stopColor="#A6A59B" />
        </linearGradient>
        <radialGradient id={id('black')} cx=".35" cy=".28" r=".85">
          <stop offset="0" stopColor="#55555E" />
          <stop offset=".35" stopColor="#1E1E22" />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
        <linearGradient id={id('visor')} x1="0" y1="0" x2=".3" y2="1">
          <stop offset="0" stopColor="#34343B" />
          <stop offset=".45" stopColor="#0E0E10" />
          <stop offset=".85" stopColor="#070708" />
          <stop offset="1" stopColor="#26262B" />
        </linearGradient>
        <radialGradient id={id('eye')} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#FF9B87" />
          <stop offset=".5" stopColor="#F0553F" />
          <stop offset="1" stopColor="#C2321F" />
        </radialGradient>
        <radialGradient id={id('bloom')} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#E84F3D" stopOpacity=".55" />
          <stop offset="1" stopColor="#E84F3D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('lid')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2A30" />
          <stop offset="1" stopColor="#0B0B0D" />
        </linearGradient>
      </defs>

      {/* arms: upper arm, elbow, forearm down to the keyboard */}
      {[
        { sx: 100, ex: 94, side: 1 },
        { sx: 200, ex: 206, side: -1 },
      ].map(({ sx, ex, side }) => (
        <g key={sx}>
          <g transform={`translate(${sx} 222) rotate(${6.7 * side}) translate(0 8)`}>
            <path d="M-11 0Q-11 -6 0 -6Q11 -6 11 0L10 27Q10 42 0 42Q-10 42 -10 27Z" fill={url('limb')} />
            <path d="M-6 2L-5 30" stroke="#fff" strokeOpacity=".9" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g transform={`translate(${ex} 272) rotate(${-4.8 * side}) translate(0 7)`}>
            <path d="M-12 0Q-12 -6 0 -6Q12 -6 12 0L14 20Q14 39 0 39Q-14 39 -14 20Z" fill={url('limb')} />
          </g>
          <circle cx={ex} cy={272} r={10} fill={url('black')} />
        </g>
      ))}

      {/* torso with the chest plate and badge */}
      <path d="M102 214C102 202 120 196 150 196C180 196 198 202 198 214L193 274C191 288 176 294 150 294C124 294 109 288 107 274Z" fill={url('shell')} />
      <path d="M110 218Q112 206 136 202" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M126 216H174C179 216 181 220 180 225L173 260C171 268 163 273 150 273C137 273 129 268 127 260L120 225C119 220 121 216 126 216Z" fill={url('black')} />
      <Mark x={137} y={226} s={26} color="#F4F3EC" id={id('m1')} />

      {/* shoulders */}
      {[100, 200].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={222} r={19} fill={url('shell')} />
          <circle cx={cx} cy={222} r={9} fill={url('black')} />
          <circle cx={cx} cy={222} r={6} fill="none" stroke="#E84F3D" strokeWidth="1.8" />
        </g>
      ))}

      {/* laptop, lid facing us */}
      <rect x={76} y={272} width={148} height={74} rx={10} fill={url('lid')} />
      <rect x={76} y={272} width={148} height={74} rx={10} fill="none" stroke="#45454C" strokeWidth="2" />
      <path d="M88 280H212" stroke="#fff" strokeOpacity=".08" strokeWidth="2" strokeLinecap="round" />
      <Mark x={135} y={294} s={30} color="#F4F3EC" id={id('m2')} />
      {working && <rect x={76} y={272} width={148} height={74} rx={10} fill="#E84F3D" opacity=".07" className="pip-screen" />}
      <rect x={60} y={342} width={180} height={14} rx={7} fill={url('black')} />
      <path d="M66 346H234" stroke="#fff" strokeOpacity=".12" strokeWidth="1.5" />

      {/* hands resting on the keyboard edge; they tap while working */}
      {[
        { x: 92, cls: 'pip-type-l' },
        { x: 208, cls: 'pip-type-r' },
      ].map(({ x, cls }) => (
        <g key={x} transform={`translate(${x} 326)`}>
          <g className={cn(working && cls)}>
            <rect x={-14} y={-6} width={28} height={26} rx={11} fill={url('shell')} stroke="#9A998F" strokeWidth="1" />
            <path d="M-8 -1Q-3 -4 5 -3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <rect x={-11} y={-12} width={22} height={9} rx={4.5} fill={url('black')} />
            <path d="M-10 -7.5H10" stroke="#E84F3D" strokeWidth="1.3" opacity=".85" />
          </g>
        </g>
      ))}

      {/* head, tilting a little with the mood */}
      <g transform="translate(150 190)">
        <g className={cn(working && 'pip-bob')}>
          <g style={{ ...spinOrigin, transform: `rotate(${headTilt}deg)`, transition: 'transform .6s cubic-bezier(.22,1,.36,1)' }}>
            <g transform="translate(-150 -190)">
              <rect x={137} y={182} width={26} height={22} rx={6} fill={url('black')} />
              <path d="M138 189H162M138 196H162" stroke="#3A3A40" strokeWidth="2" />
              <circle cx={150} cy={104} r={88} fill={url('head')} />
              <path d="M70 128Q92 186 150 190Q208 186 230 128" fill="none" stroke="#B9B8AE" strokeOpacity=".35" strokeWidth="10" strokeLinecap="round" />
              <path d="M84 92C84 60 112 46 150 46C188 46 216 60 216 92V108C216 140 190 154 150 154C110 154 84 140 84 108Z" fill={url('visor')} />
              <path d="M84 92C84 60 112 46 150 46C188 46 216 60 216 92V108C216 140 190 154 150 154C110 154 84 140 84 108Z" fill="none" stroke="#000" strokeOpacity=".4" strokeWidth="2" />

              {mood === 'happy' ? (
                <g>
                  <circle cx={150} cy={100} r={34} fill={url('bloom')} />
                  <path d="M128 110Q150 74 172 110" fill="none" stroke="#E84F3D" strokeWidth="9" strokeLinecap="round" />
                  <path d="M128 110Q150 74 172 110" fill="none" stroke="#FF9B87" strokeWidth="3" strokeLinecap="round" opacity=".7" />
                </g>
              ) : (
                <g opacity={mood === 'idle' ? 0.78 : 1}>
                  <circle cx={150} cy={98} r={36} fill={url('bloom')} className={cn(mood === 'waiting' && 'pip-pulse')} />
                  <circle cx={150} cy={98} r={22} fill={url('eye')} />
                  <circle cx={150} cy={98} r={22} fill="none" stroke="#FF8A75" strokeWidth="2" opacity=".8" />
                  <g transform="translate(150 98)">
                    <g className={cn(working && 'pip-spin')}>
                      <g style={{ ...spinOrigin, transform: `rotate(${handAngle}deg)`, transition: 'transform .5s cubic-bezier(.22,1,.36,1)' }}>
                        <line x1={2} y1={2} x2={14} y2={14} stroke="#FFF4EC" strokeWidth="5.5" strokeLinecap="round" />
                      </g>
                    </g>
                  </g>
                </g>
              )}

              <path d="M100 74Q112 56 140 54" stroke="#fff" strokeOpacity=".55" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M196 132Q204 124 207 114" stroke="#fff" strokeOpacity=".18" strokeWidth="4" fill="none" strokeLinecap="round" />
              <ellipse cx={112} cy={40} rx={22} ry={9} transform="rotate(-24 112 40)" fill="#fff" opacity=".8" />

              {/* headphone ears */}
              {[
                { x: 64, f: 1 },
                { x: 236, f: -1 },
              ].map(({ x, f }) => (
                <g key={x} transform={`translate(${x} 108) scale(${f} 1)`}>
                  <ellipse cx={0} cy={0} rx={15} ry={30} fill={url('black')} />
                  <ellipse cx={-3} cy={0} rx={8} ry={18} fill="none" stroke="#E84F3D" strokeWidth="3" />
                  <ellipse cx={-3} cy={0} rx={3.5} ry={7} fill="#E84F3D" />
                  <path d="M-9-22Q-4-27 2-25" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </g>
              ))}

              {mic && (
                <g>
                  <path d="M60 134Q66 176 112 174" fill="none" stroke="#1E1E22" strokeWidth="6" strokeLinecap="round" />
                  <path d="M60 134Q66 176 112 174" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x={106} y={165} width={22} height={16} rx={8} fill={url('black')} />
                  <rect x={109} y={168} width={16} height={10} rx={5} fill="none" stroke="#E84F3D" strokeWidth="2" className={cn(working && 'pip-pulse')} />
                </g>
              )}
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
