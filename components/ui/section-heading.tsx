import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Reveal } from './reveal';

export function SectionHeading({
  index,
  label,
  title,
  children,
  dark = false,
  align = 'left',
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            'eyebrow mb-6 flex items-center gap-3',
            align === 'center' && 'justify-center',
            dark ? 'text-paper/60' : 'text-ink/55',
          )}
        >
          {index && (
            <>
              <span className="text-signal">{index}</span>
              <span className={cn('h-px w-8', dark ? 'bg-white/25' : 'bg-ink/25')} />
            </>
          )}
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'display text-balance text-[2.5rem] font-semibold leading-[1.02] sm:text-6xl',
            dark ? 'text-paper' : 'text-ink',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-6 text-pretty text-lg leading-relaxed sm:text-xl',
              dark ? 'text-paper/65' : 'text-ink/65',
            )}
          >
            {children}
          </p>
        </Reveal>
      )}
    </div>
  );
}
