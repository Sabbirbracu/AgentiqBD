'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ProductImage } from '@/lib/content';
import { cn } from '@/lib/utils';

/** One device screen: crossfades between screenshots. Fills its parent, which sets the aspect ratio. */
function ShotScreen({ images, index, sizes }: { images: ProductImage[]; index: number; sizes: string }) {
  const reduce = useReducedMotion();
  const cur = images[index % images.length];
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={cur.src}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={cur.src} alt={cur.alt} fill sizes={sizes} className="object-cover object-top" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Stand-in for projects with no screenshots yet: the project's own graphic on a dark screen. */
function ArtScreen({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#202026] to-[#0f0f12] p-[6%]">{children}</div>
  );
}

/** Generic app skeleton for the laptop screen when there is nothing real to show. */
function SkeletonScreen() {
  return (
    <div aria-hidden className="absolute inset-0 flex gap-[5%] bg-[#17171b] p-[5%]">
      <div className="w-[18%] space-y-[10%] rounded-sm bg-white/[0.06] p-[3%]">
        <i className="block h-[6%] min-h-[3px] rounded-full bg-signal/70" />
        <i className="block h-[6%] min-h-[3px] rounded-full bg-white/15" />
        <i className="block h-[6%] min-h-[3px] rounded-full bg-white/15" />
      </div>
      <div className="flex flex-1 flex-col gap-[7%]">
        <i className="block h-[9%] w-1/2 rounded-full bg-white/20" />
        <div className="grid flex-1 grid-cols-3 gap-[4%]">
          {[0, 1, 2].map((k) => (
            <i key={k} className="rounded-md bg-white/[0.07]" />
          ))}
        </div>
        <i className="block h-[34%] rounded-md bg-white/[0.07]" />
      </div>
    </div>
  );
}

/** Desktop monitor with a stand. */
function Monitor({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]', className)}>
      <div className="rounded-[10px] border border-white/15 bg-[#0c0c0f] p-[1.4%] sm:rounded-[14px]">
        <div className="relative aspect-[16/9.2] overflow-hidden rounded-[4px] sm:rounded-[6px]">
          {children}
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto aspect-[5/2] w-[13%] bg-gradient-to-b from-[#34343b] to-[#17171b] [clip-path:polygon(14%_0,86%_0,100%_100%,0_100%)]"
      />
      <div aria-hidden className="mx-auto aspect-[16/1] w-[32%] rounded-full bg-gradient-to-b from-[#3a3a42] to-[#1a1a1e]" />
    </div>
  );
}

/** Laptop: lid with the screen, silver base with the thumb notch. */
function Laptop({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('drop-shadow-[0_26px_34px_rgba(0,0,0,0.6)]', className)}>
      <div className="rounded-t-[8px] border border-white/15 bg-[#0c0c0f] p-[2.4%] pb-[1.6%] sm:rounded-t-[11px]">
        <div className="relative aspect-[16/9.6] overflow-hidden rounded-[3px] sm:rounded-[4px]">
          {children}
        </div>
      </div>
      <div className="relative -mx-[7%] h-[7px] rounded-b-[14px] bg-gradient-to-b from-[#e4e4e8] to-[#9b9ba2] sm:h-[11px]">
        <span className="absolute left-1/2 top-0 h-[3px] w-[18%] -translate-x-1/2 rounded-b-md bg-[#7c7c83] sm:h-[4px]" />
      </div>
    </div>
  );
}

/** iPhone 16 Pro Max look: titanium frame, thin bezel, Dynamic Island, side buttons. Sizes are % of its own width. */
function Phone({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const btn = 'absolute w-[1.6%] bg-gradient-to-b from-[#9a9994] to-[#5d5c58]';
  return (
    <div style={style} className={cn('relative drop-shadow-[0_26px_34px_rgba(0,0,0,0.6)]', className)}>
      <span aria-hidden className={cn(btn, '-left-[1.1%] top-[13%] h-[3.2%] rounded-l-sm')} />
      <span aria-hidden className={cn(btn, '-left-[1.1%] top-[19%] h-[6%] rounded-l-sm')} />
      <span aria-hidden className={cn(btn, '-left-[1.1%] top-[26.5%] h-[6%] rounded-l-sm')} />
      <span aria-hidden className={cn(btn, '-right-[1.1%] top-[22%] h-[9.5%] rounded-r-sm')} />
      <div className="rounded-[16%/7.4%] bg-gradient-to-br from-[#b4b3ad] via-[#6d6c68] to-[#3d3d3b] p-[1.7%]">
        <div className="rounded-[14.5%/6.7%] bg-black p-[2.3%]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[12.5%/5.7%]">
            {children}
            <span aria-hidden className="absolute left-1/2 top-[1.9%] z-10 h-[3.1%] w-[27%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** The laptop + phone pair changes screens slowly, and together. */
const PHONE_INTERVAL = 7000;

/**
 * Cover for a project card: a desktop monitor with a laptop (or phones) in front, each showing real screenshots.
 * The screens advance together; paused on hover, off-screen and for reduced motion.
 */
export function DeviceMockup({
  images,
  phones,
  art,
  phoneTilt = 0,
  interval = 4200,
  className,
}: {
  images: ProductImage[];
  phones?: ProductImage[];
  /** Graphic shown on the screens when `images` is empty. */
  art?: ReactNode;
  /** Degrees the phone leans to the left. Above 0 it also steps left, so a gap opens between phone and laptop. */
  phoneTilt?: number;
  interval?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const steps = Math.max(images.length, phones?.length ?? 0);
  const playing = !reduce && !hover && inView && steps > 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((x) => x + 1), phones?.length ? PHONE_INTERVAL : interval);
    return () => clearTimeout(t);
  }, [playing, i, interval, phones]);

  const hasPhones = !!phones && phones.length > 0;
  const hasImages = images.length > 0;
  const hasLaptop = !hasPhones && (images.length > 1 || !hasImages);
  const shot = (list: ProductImage[], index: number, sizes: string) => <ShotScreen images={list} index={index} sizes={sizes} />;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn('relative mx-auto aspect-[16/11.5] w-full max-w-[620px]', className)}
    >
      {hasPhones ? (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-[6%] bottom-[2%] h-[14%] rounded-[50%] bg-black/50 blur-2xl" />
          <Laptop className={cn('absolute bottom-[3%] right-0 z-10', phoneTilt ? 'w-[62%]' : 'w-[86%]')}>
            {shot(images, i, '(min-width: 1024px) 500px, 80vw')}
          </Laptop>
          <Phone
            className={cn('absolute z-20', phoneTilt ? 'bottom-[4%] left-[7.5%] w-[21%]' : 'bottom-0 left-0 w-[26%]')}
            style={phoneTilt ? { transform: `rotate(-${phoneTilt}deg)` } : undefined}
          >
            {shot(phones, i, '160px')}
          </Phone>
        </>
      ) : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-[8%] bottom-[2%] h-[16%] rounded-[50%] bg-black/50 blur-2xl" />
          <Monitor className="absolute left-0 top-0 w-[80%]">
            {hasImages ? shot(images, i, '(min-width: 1024px) 480px, 80vw') : <ArtScreen>{art}</ArtScreen>}
          </Monitor>
          {hasLaptop && (
            <Laptop className="absolute bottom-[1%] right-[1%] z-10 w-[52%]">
              {hasImages ? shot(images, i + 1, '(min-width: 1024px) 320px, 55vw') : <SkeletonScreen />}
            </Laptop>
          )}
        </>
      )}
    </div>
  );
}
