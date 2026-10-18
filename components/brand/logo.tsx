import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Agentiq BD mark, rebuilt as vector from the supplied logo so it stays crisp at
 * any size and can sit on light or dark surfaces (the cut-outs are real masks,
 * not painted-on background colour).
 */
export function LogoMark({
  className,
  style,
  boxed = true,
  hand = '#FCFCF4',
  animateHand = false,
  ring,
}: {
  className?: string;
  style?: React.CSSProperties;
  /** Draw the rounded-square frame around the mark. */
  boxed?: boolean;
  /** Colour of the small "hand" inside the red dot. */
  hand?: string;
  /** Sweep the hand around the dot like a clock. */
  animateHand?: boolean;
  /** Fill the cut-out ring around the dot with this colour instead of leaving it transparent. */
  ring?: string;
}) {
  const id = useId().replace(/:/g, '');
  const viewBox = boxed ? '374 374 820 820' : '480 480 580 580';
  return (
    <svg
      viewBox={viewBox}
      className={cn('shrink-0', className)}
      style={style}
      fill="none"
      role="img"
      aria-label="Agentiq BD"
    >
      <defs>
        <mask id={`cut-${id}`} maskUnits="userSpaceOnUse" x="300" y="300" width="1000" height="1000">
          <rect x="300" y="300" width="1000" height="1000" fill="#fff" />
          {/* diagonal slit between the two halves of the "A" */}
          <polygon points="560,1153 920,793 987,793 627,1153" fill="#000" />
          {/* ring around the red dot */}
          <circle cx="980" cy="763" r="88" fill="#000" />
        </mask>
      </defs>
      {boxed && (
        <rect
          x="388"
          y="388"
          width="792"
          height="792"
          rx="52"
          stroke="currentColor"
          strokeWidth="21"
        />
      )}
      <g mask={`url(#cut-${id})`} fill="currentColor">
        <rect x="796" y="498" width="244" height="550" rx="122" />
        <line
          x1="615"
          y1="925"
          x2="918"
          y2="622"
          stroke="currentColor"
          strokeWidth="250"
          strokeLinecap="round"
        />
      </g>
      {ring && <circle cx="980" cy="763" r="88" fill={ring} />}
      <circle cx="980" cy="763" r="66" fill="#E84F3D" />
      <g>
        {animateHand && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 980 763"
            to="360 980 763"
            dur="14s"
            repeatCount="indefinite"
          />
        )}
        <line
          x1="985"
          y1="766"
          x2="1033"
          y2="814"
          stroke={hand}
          strokeWidth="22"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  tone = 'ink',
  compact = false,
  size = 'md',
}: {
  className?: string;
  tone?: 'ink' | 'paper';
  /** Mark only, no wordmark. */
  compact?: boolean;
  /** `lg` is the header lockup. */
  size?: 'md' | 'lg';
}) {
  const isPaper = tone === 'paper';
  const large = size === 'lg';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5',
        isPaper ? 'text-paper' : 'text-ink',
        className,
      )}
    >
      <LogoMark className={large ? 'h-[42px] w-[42px]' : 'h-9 w-9'} hand={isPaper ? '#0A0A0B' : '#FCFCF4'} />
      {!compact &&
        (large ? (
          <span className="flex items-center gap-2 leading-none">
            <span className="font-sans text-[21.5px] font-extrabold uppercase tracking-[0.03em]">Agentiq</span>
            <span className="rounded-[4px] bg-scarlet px-[5px] py-[3.5px] font-sans text-[12.5px] font-extrabold tracking-wide text-paper">
              BD
            </span>
          </span>
        ) : (
          <span className="flex items-end gap-1.5 leading-none">
            <span className="font-display text-[19px] font-extrabold uppercase tracking-[0.08em]">
              Agentiq
            </span>
            <span className="mb-[1px] rounded-[4px] bg-signal px-[5px] py-[3px] font-display text-[9px] font-extrabold tracking-wider text-paper">
              BD
            </span>
          </span>
        ))}
    </span>
  );
}
