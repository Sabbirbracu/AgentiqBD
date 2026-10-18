import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'dark' | 'ghost' | 'ghost-dark';

const variants: Record<Variant, string> = {
  primary:
    'bg-signal text-paper hover:bg-signal-600 shadow-[0_10px_30px_-10px_rgba(232,79,61,0.7)]',
  dark: 'bg-ink text-paper hover:bg-ink-600',
  ghost: 'border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]',
  'ghost-dark': 'border border-white/20 text-paper hover:border-white/50 hover:bg-white/5',
};

const base =
  'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-all duration-300 active:scale-[0.98]';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
