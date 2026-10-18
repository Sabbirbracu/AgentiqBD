'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { navLinks } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 sm:px-6',
        scrolled ? 'pt-3 sm:pt-4' : 'pt-0',
      )}
    >
      <div
        className={cn(
          'relative mx-auto flex max-w-[1280px] items-center justify-between overflow-hidden rounded-full border px-3 pl-4 transition-all duration-500 sm:pl-5 sm:pr-5',
          scrolled
            ? 'h-14 border-white/10 bg-ink/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:h-16'
            : 'h-16 border-transparent bg-transparent lg:h-20',
        )}
      >
        <Link href="#top" aria-label="Agentiq BD home" className="flex" onClick={() => setOpen(false)}>
          <Logo tone={scrolled ? 'paper' : 'ink'} size="lg" />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                'whitespace-nowrap rounded-full px-[14px] py-2 text-[14.8px] transition-colors xl:px-[17px]',
                scrolled
                  ? 'text-paper/65 hover:bg-white/[0.06] hover:text-paper'
                  : 'text-[#2C313B] hover:bg-ink/[0.05] hover:text-ink',
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={cn(
              'group hidden h-11 whitespace-nowrap items-center gap-2.5 rounded-full px-[25px] text-[15px] font-medium transition-colors hover:bg-flame hover:text-paper sm:inline-flex',
              scrolled ? 'bg-paper text-ink' : 'bg-ink text-paper',
            )}
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden',
              scrolled ? 'border-white/15 text-paper' : 'border-ink/20 text-ink',
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-6 bottom-0 h-px origin-left bg-signal"
          aria-hidden
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-3xl border border-white/10 bg-ink/95 p-3 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 font-display text-xl text-paper/85 transition-colors hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-signal font-medium text-paper"
              >
                Start a project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
