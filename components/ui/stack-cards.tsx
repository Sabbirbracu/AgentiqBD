'use client';

import { Children, createRef, useEffect, useMemo, useState, type ReactNode, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

const BASE_TOP = 112; // px from the top of the viewport where the first card sticks
const STEP = 18; // px each later card sticks lower, so the edges of the cards behind stay visible

function Item({
  i,
  n,
  refs,
  enabled,
  children,
}: {
  i: number;
  n: number;
  refs: RefObject<HTMLLIElement | null>[];
  enabled: boolean;
  children: ReactNode;
}) {
  const last = i === n - 1;
  // This card is "covered" while the NEXT card travels from the bottom of the screen to its stuck position.
  const { scrollYProgress } = useScroll({
    target: refs[Math.min(i + 1, n - 1)],
    offset: ['start end', `start ${BASE_TOP + (i + 1) * STEP}px`],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.93]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.18]);

  return (
    <li
      ref={refs[i]}
      className={cn(enabled && 'sticky')}
      style={enabled ? { top: BASE_TOP + i * STEP, zIndex: i + 1 } : undefined}
    >
      <motion.div className="relative" style={enabled && !last ? { scale, transformOrigin: 'top center' } : undefined}>
        {children}
        {enabled && !last && (
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[32px] bg-ink" />
        )}
      </motion.div>
    </li>
  );
}

/** Cards that stack on scroll: each sticks in place and the next one slides over it. Plain list on small screens. */
export function StackCards({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const refs = useMemo(() => items.map(() => createRef<HTMLLIElement>()), [items.length]); // eslint-disable-line react-hooks/exhaustive-deps
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <ul className="space-y-8 lg:space-y-14">
      {items.map((child, i) => (
        <Item key={i} i={i} n={items.length} refs={refs} enabled={wide && !reduce}>
          {child}
        </Item>
      ))}
    </ul>
  );
}
