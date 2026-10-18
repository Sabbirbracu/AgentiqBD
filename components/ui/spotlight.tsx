'use client';

import { cn } from '@/lib/utils';
import type { HTMLAttributes, MouseEvent } from 'react';

/** A card whose red glow follows the cursor (see `.spotlight` in globals.css). */
export function SpotlightCard({
  className,
  onMouseMove,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  }
  return <div className={cn('spotlight', className)} onMouseMove={handleMove} {...props} />;
}
