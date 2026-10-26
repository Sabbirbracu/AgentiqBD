'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  BarChart3,
  BookOpenText,
  Bot,
  Boxes,
  ChevronDown,
  Code2,
  Factory,
  FlaskConical,
  FolderKanban,
  Handshake,
  Menu,
  MessagesSquare,
  Newspaper,
  Package,
  PhoneCall,
  Plug,
  ScanSearch,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { moreArt, moreArtDark } from '@/components/brand/more-art';
import { packageArt, packageArtDark } from '@/components/brand/package-art';
import { serviceArt, serviceArtDark } from '@/components/brand/service-art';
import { coreServices, moreMenu, packages, site } from '@/lib/content';
import { cn } from '@/lib/utils';

type MenuId = 'services' | 'packages' | 'more';

const serviceIcons: Record<string, LucideIcon> = {
  'ai-agents': Bot,
  chatbots: MessagesSquare,
  voice: PhoneCall,
  'workflow-automation': Workflow,
  'knowledge-rag': BookOpenText,
  integrations: Plug,
  'business-systems': Factory,
  reporting: BarChart3,
  'custom-software': Code2,
};

const packageIcons: Record<string, LucideIcon> = {
  audit: ScanSearch,
  'agent-starter': Bot,
  workflow: Workflow,
  systems: Boxes,
};

const moreIcons: Record<string, LucideIcon> = {
  'case-studies': FolderKanban,
  partner: Handshake,
  blog: Newspaper,
  rnd: FlaskConical,
  products: Package,
};

const partnerMail = `mailto:${site.email}?subject=${encodeURIComponent('Partnership enquiry')}`;
const moreHref = (href?: string) => (href === 'partner' ? partnerMail : href);

type PreviewItem = {
  id: string;
  title: string;
  short: string;
  description: string;
  tags: readonly string[];
  Icon: LucideIcon;
  art: ReactNode;
  dark: boolean;
  /** Where the row links. Without it the row is "coming soon": hoverable for the preview, not clickable. */
  href?: string;
};

const serviceItems: PreviewItem[] = coreServices.map((s) => ({
  id: s.id,
  title: s.title,
  short: s.tagline,
  description: s.description,
  tags: s.tags,
  Icon: serviceIcons[s.id],
  art: serviceArt[s.id]?.(),
  dark: serviceArtDark[s.id] ?? false,
  href: '/#core-services',
}));

const packageItems: PreviewItem[] = packages.map((p) => ({
  id: p.id,
  title: p.title,
  short: p.short,
  description: p.description,
  tags: p.tags,
  Icon: packageIcons[p.id],
  art: packageArt[p.id]?.(),
  dark: packageArtDark[p.id] ?? false,
  href: '/#contact',
}));

const moreItems: PreviewItem[] = moreMenu.map((m) => ({
  id: m.id,
  title: m.label,
  short: m.text,
  description: m.description,
  tags: m.tags,
  Icon: moreIcons[m.id],
  art: moreArt[m.id]?.(),
  dark: moreArtDark[m.id] ?? false,
  href: moreHref(m.href),
}));

/** Brand gradient behind the mega menus: near-black with warm orange light from the corners. Fully opaque, so text stays readable. */
const panelBg =
  'bg-ink [background-image:radial-gradient(60%_85%_at_100%_100%,rgba(232,79,61,0.34),transparent_70%),radial-gradient(45%_60%_at_0%_0%,rgba(232,79,61,0.12),transparent_70%)]';

/** Two-pane mega menu: the list on the left, a live preview with a graphic on the right. */
function PreviewMenu({
  label,
  previewLabel,
  items,
  cta,
  attached,
  onNavigate,
}: {
  label: string;
  previewLabel: string;
  items: PreviewItem[];
  cta: string;
  /** True when the header is a floating card: the panel hangs directly below it with no gap. */
  attached: boolean;
  onNavigate: () => void;
}) {
  const [active, setActive] = useState(0);
  const cur = items[active];
  const rowCls = (i: number) =>
    cn('group flex flex-1 items-center gap-3.5 rounded-2xl px-3 py-2 transition-colors', i === active ? 'bg-white/[0.09]' : 'hover:bg-white/[0.05]');

  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_1.05fr] border border-white/10 p-2 text-paper shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]',
        panelBg,
        attached ? 'rounded-b-[28px] rounded-t-none border-t-0' : 'rounded-[28px]',
      )}
    >
      <div className="flex flex-col p-3">
        <p className="eyebrow px-3 pb-2 text-paper/50">{label}</p>
        <ul className="flex flex-1 flex-col">
          {items.map((it, i) => {
            const body = (
              <>
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                    i === active ? 'bg-signal text-paper' : 'bg-white/10 text-signal-300',
                  )}
                >
                  <it.Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('block truncate font-display text-[15.5px] font-semibold leading-tight', it.href ? 'text-paper' : 'text-paper/60')}>
                    {it.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-paper/70">{it.short}</span>
                </span>
                {it.href ? (
                  <ArrowUpRight className={cn('h-4 w-4 shrink-0 transition-all', i === active ? 'text-signal-300 opacity-100' : 'opacity-0')} />
                ) : (
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper/65">Soon</span>
                )}
              </>
            );
            return (
              <li key={it.id} className="flex max-h-[84px] flex-1 flex-col">
                {it.href ? (
                  <a href={it.href} onClick={onNavigate} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={rowCls(i)}>
                    {body}
                  </a>
                ) : (
                  <div aria-disabled="true" tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={rowCls(i)}>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col rounded-[22px] border border-white/10 bg-ink/50 p-6 backdrop-blur-sm">
        <p className="eyebrow text-paper/50">{previewLabel}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-3 flex flex-1 flex-col"
          >
            <h3 className="display text-[1.55rem] font-bold leading-tight text-paper">{cur.title}</h3>
            <p className="mt-2 text-pretty text-[14px] leading-relaxed text-paper/75">{cur.description}</p>

            <div
              aria-hidden
              className={cn(
                'mt-5 flex min-h-[212px] flex-1 items-center justify-center overflow-hidden rounded-2xl border px-5 py-3',
                cur.dark ? 'border-white/10 bg-[#141416] text-paper' : 'border-black/5 bg-paper text-ink',
              )}
            >
              <div className="w-full">{cur.art}</div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <ul className="flex flex-wrap gap-1.5">
                {cur.tags.map((t) => (
                  <li key={t} className="rounded-md border border-white/20 bg-white/[0.06] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-paper/75">
                    {t}
                  </li>
                ))}
              </ul>
              {cur.href ? (
                <a
                  href={cur.href}
                  onClick={onNavigate}
                  className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-signal-300 transition-colors hover:text-paper"
                >
                  {cta === 'auto' ? `Open ${cur.title}` : cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-wider text-paper/55">Coming soon</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolledY, setScrolled] = useState(false);
  const scrolled = solid || scrolledY;
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = cn(
    'whitespace-nowrap rounded-full px-[14px] py-2 text-[14.8px] transition-colors xl:px-[17px]',
    scrolled ? 'text-paper/65 hover:bg-white/[0.06] hover:text-paper' : 'text-[#2C313B] hover:bg-ink/[0.05] hover:text-ink',
  );

  const trigger = (id: MenuId, label: string) => (
    <button
      key={id}
      type="button"
      aria-expanded={menu === id}
      aria-haspopup="true"
      onMouseEnter={() => setMenu(id)}
      onFocus={() => setMenu(id)}
      onClick={() => setMenu(id)}
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-[14px] py-2 text-[14.8px] transition-colors xl:px-[17px]',
        menu === id && (scrolled ? 'bg-white/[0.06] text-paper' : 'bg-ink/[0.05] text-ink'),
        scrolled ? 'text-paper/65 hover:bg-white/[0.06] hover:text-paper' : 'text-[#2C313B] hover:bg-ink/[0.05] hover:text-ink',
      )}
    >
      {label}
      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', menu === id && 'rotate-180')} />
    </button>
  );

  const close = () => setMenu(null);

  return (
    <header
      ref={headerRef}
      onMouseLeave={close}
      className={cn(
        'fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 sm:px-6',
        scrolled ? 'pt-3 sm:pt-4' : 'pt-0',
      )}
    >
      <div
        className={cn(
          'relative mx-auto flex max-w-[1280px] items-center justify-between overflow-hidden border px-3 pl-4 transition-all duration-500 sm:pl-5 sm:pr-5',
          'rounded-full',
          scrolled
            ? 'h-14 border-white/10 bg-ink/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:h-16'
            : 'h-16 border-transparent bg-transparent lg:h-20',
        )}
      >
        <Link href="/#top" aria-label="Agentiq BD home" className="flex" onClick={() => setOpen(false)}>
          <Logo tone={scrolled ? 'paper' : 'ink'} size="lg" />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {trigger('services', 'Services')}
          {trigger('packages', 'Packages')}
          <a href="/#why" onMouseEnter={close} className={linkCls}>
            About
          </a>
          {trigger('more', 'More')}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className={cn(
              'group hidden h-11 whitespace-nowrap items-center gap-2.5 rounded-full px-[25px] text-[15px] font-medium transition-colors hover:bg-flame hover:text-paper sm:inline-flex',
              scrolled ? 'bg-paper text-ink' : 'bg-ink text-paper',
            )}
          >
            Start a Project
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

      {/* desktop mega menus */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={cn('mx-auto hidden max-w-[1280px] lg:block', scrolled ? 'mt-0' : 'mt-2')}
          >
            <div className="mx-auto max-w-[1000px]">
              {menu === 'services' && (
                <PreviewMenu label="Our services" previewLabel="Service preview" items={serviceItems} cta="Discuss this service" attached={scrolled} onNavigate={close} />
              )}
              {menu === 'packages' && (
                <PreviewMenu label="Our packages" previewLabel="Package preview" items={packageItems} cta="Ask about this package" attached={scrolled} onNavigate={close} />
              )}
              {menu === 'more' && (
                <PreviewMenu label="More from Agentiq BD" previewLabel="Preview" items={moreItems} cta="auto" attached={scrolled} onNavigate={close} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1240px] overflow-y-auto rounded-3xl border border-white/10 bg-ink/95 p-3 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              <p className="eyebrow px-4 pb-1 pt-3 text-paper/35">Services</p>
              {coreServices.map((s) => (
                <a
                  key={s.id}
                  href="/#core-services"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-2.5 font-display text-[17px] text-paper/85 transition-colors hover:bg-white/5"
                >
                  {s.title}
                </a>
              ))}
              <p className="eyebrow px-4 pb-1 pt-4 text-paper/35">Packages</p>
              {packages.map((p) => (
                <a
                  key={p.id}
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-2.5 font-display text-[17px] text-paper/85 transition-colors hover:bg-white/5"
                >
                  {p.title}
                </a>
              ))}
              <p className="eyebrow px-4 pb-1 pt-4 text-paper/35">More</p>
              {moreMenu.map((m) => {
                const href = moreHref(m.href);
                return href ? (
                  <a
                    key={m.id}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-2.5 font-display text-[17px] text-paper/85 transition-colors hover:bg-white/5"
                  >
                    {m.label}
                  </a>
                ) : (
                  <span key={m.id} className="flex items-center justify-between rounded-2xl px-4 py-2.5 font-display text-[17px] text-paper/40">
                    {m.label}
                    <span className="font-mono text-[10px] uppercase tracking-wider">Soon</span>
                  </span>
                );
              })}
              <div className="my-2 h-px bg-white/10" />
              <a
                href="/#why"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3.5 font-display text-xl text-paper/85 transition-colors hover:bg-white/5"
              >
                About
              </a>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-signal font-medium text-paper"
              >
                Start a Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
