'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import type { ProductImage } from '@/lib/content';
import { cn } from '@/lib/utils';

type Frame = 'browser' | 'window';

/**
 * Auto-advancing screenshot carousel inside a browser / app-window frame.
 * Slides every `interval` ms; pauses on hover, when off-screen and for reduced motion.
 * The screen names under it are plain chips (a progress readout), not controls.
 */
export function Showcase({
  images,
  frame = 'browser',
  label,
  accent = '#E84F3D',
  interval = 4800,
  compact = false,
  note,
  className,
}: {
  images: ProductImage[];
  frame?: Frame;
  label?: string;
  accent?: string;
  interval?: number;
  /** Card-cover mode: smaller chrome, no chips. */
  compact?: boolean;
  note?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0); // bumps on resume so the timer and progress bar restart together
  const n = images.length;
  const playing = !reduce && !hover && inView && n > 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), interval);
    return () => clearTimeout(t);
  }, [playing, i, run, n, interval]);

  const cur = images[i];
  const ratio = `${images[0].w} / ${images[0].h}`;
  const bar = compact ? 'h-7 px-3' : 'h-10 px-4';

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setRun((r) => r + 1);
      }}
    >
      {!compact && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] opacity-40 blur-3xl"
          style={{ background: `radial-gradient(60% 60% at 50% 40%, ${accent}66, transparent)` }}
        />
      )}

      <div
        className={cn(
          'overflow-hidden border border-white/12 bg-[#141416] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03)]',
          compact ? 'rounded-xl' : 'rounded-[18px]',
        )}
      >
        {/* window chrome */}
        <div className={cn('relative flex items-center border-b border-white/10 bg-[#1B1B1F]', bar)}>
          <span className="flex gap-1.5" aria-hidden>
            <i className={cn('rounded-full bg-[#FF5F57]', compact ? 'h-2 w-2' : 'h-2.5 w-2.5')} />
            <i className={cn('rounded-full bg-[#FEBC2E]', compact ? 'h-2 w-2' : 'h-2.5 w-2.5')} />
            <i className={cn('rounded-full bg-[#28C840]', compact ? 'h-2 w-2' : 'h-2.5 w-2.5')} />
          </span>
          {label && (
            <span
              className={cn(
                'absolute left-1/2 flex max-w-[60%] -translate-x-1/2 items-center gap-1.5 truncate text-paper/55',
                frame === 'browser' ? 'rounded-md bg-white/[0.06] px-3 py-0.5' : '',
                compact ? 'text-[10px]' : 'text-xs',
              )}
            >
              {frame === 'browser' && <Lock className={compact ? 'h-2.5 w-2.5' : 'h-3 w-3'} />}
              <span className="truncate">{label}</span>
            </span>
          )}
        </div>

        {/* screen */}
        <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: ratio }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={cur.src}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, x: 36, scale: 1.01 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -36 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={cur.src}
                alt={cur.alt}
                fill
                sizes={compact ? '(min-width: 768px) 45vw, 100vw' : '(min-width: 1024px) 55vw, 100vw'}
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {!compact && (
        <>
          <ul aria-label="Screens shown" className="mt-5 flex flex-wrap gap-2">
            {images.map((img, k) => {
              const active = k === i;
              return (
                <li
                  key={img.src}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'relative cursor-default select-none overflow-hidden rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                    active ? 'text-paper' : 'border-white/10 text-paper/50',
                  )}
                  style={active ? { borderColor: `${accent}99`, background: `${accent}22` } : undefined}
                >
                  {img.caption}
                  {active && n > 1 && !reduce && (
                    <span
                      key={`${k}-${run}`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                      style={{
                        background: accent,
                        animation: `showcase-fill ${interval}ms linear forwards`,
                        animationPlayState: playing ? 'running' : 'paused',
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          {note && <p className="mt-3 text-xs leading-relaxed text-paper/40">{note}</p>}
        </>
      )}
    </div>
  );
}

/** Endless, slowly sliding strip of phone screenshots (they ship with their own dark stage). */
export function PhoneMarquee({
  images,
  compact = false,
  duration = 40,
  className,
}: {
  images: ProductImage[];
  compact?: boolean;
  duration?: number;
  className?: string;
}) {
  const items = [...images, ...images];
  return (
    <div
      className={cn(
        'group relative overflow-hidden bg-[#262626] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]',
        compact ? 'h-full' : 'rounded-[22px] py-8',
        className,
      )}
    >
      <ul
        className={cn(
          'flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]',
          compact && 'h-full',
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((m, k) => (
          <li key={`${m.src}-${k}`} className={cn('shrink-0', compact ? 'h-full' : 'w-[200px] sm:w-[250px]')} aria-hidden={k >= images.length}>
            <Image
              src={m.src}
              alt={k < images.length ? m.alt : ''}
              width={m.w}
              height={m.h}
              sizes="250px"
              className={cn('max-w-none', compact ? 'h-[118%] w-auto' : 'h-auto w-full')}
            />
            {!compact && (
              <p className="eyebrow -mt-2 pb-1 text-center text-paper/45">{m.caption}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
