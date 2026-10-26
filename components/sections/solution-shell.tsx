import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { cn } from '@/lib/utils';

/** Frame for a solution detail page: nav, a back link, the section, a closing CTA and the footer. */
export function SolutionShell({
  tone,
  ctaTitle,
  children,
}: {
  tone: 'dark' | 'light';
  ctaTitle: string;
  children: ReactNode;
}) {
  const dark = tone === 'dark';
  return (
    <>
      <Navbar solid />
      <main className={cn(dark ? 'bg-ink text-paper' : 'bg-paper text-ink')}>
        <div className="container-x pt-32 sm:pt-36">
          <Link
            href="/"
            className={cn(
              'relative z-10 inline-flex items-center gap-2 text-sm transition-colors',
              dark ? 'text-paper/60 hover:text-paper' : 'text-ink/60 hover:text-ink',
            )}
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
        <div className="-mt-12 sm:-mt-16">{children}</div>
        <div className="container-x pb-24 sm:pb-32">
          <div
            className={cn(
              'flex flex-col items-start justify-between gap-5 rounded-[28px] border p-8 sm:flex-row sm:items-center sm:p-10',
              dark ? 'border-white/10 bg-white/[0.04]' : 'border-ink/10 bg-paper-200/50',
            )}
          >
            <p className="display max-w-xl text-balance text-2xl font-semibold sm:text-3xl">{ctaTitle}</p>
            <Link
              href="/#contact"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium text-paper transition-colors hover:bg-signal-600"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
