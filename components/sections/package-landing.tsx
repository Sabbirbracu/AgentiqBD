import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Eye,
  Handshake,
  LifeBuoy,
  MessageCircle,
  Plus,
  Quote,
  ScanSearch,
  ShieldCheck,
  Tag,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { packageArt } from '@/components/brand/package-art';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';
import { CtaButtons, Section, auditMail, bookingMail, emphasize, external, whatsappHref } from '@/components/sections/service-landing';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { coreServices, packages, projects, site } from '@/lib/content';
import type { Heading, PackagePage } from '@/lib/package-pages';
import { promises } from '@/lib/package-pages';
import { cn } from '@/lib/utils';

export type Pkg = (typeof packages)[number];

const pkgById = (id: string) => packages.find((p) => p.id === id);
const auditCta = {
  label: 'Get your free audit',
  href: site.auditUrl || auditMail,
  external: Boolean(site.auditUrl),
};
const promiseIcons: LucideIcon[] = [ShieldCheck, Eye, Handshake, LifeBuoy];
/** Each card in the stack steps right a little further, so the deck reads as cards laid over one another. */
const stackOffsets = ['lg:ml-0', 'lg:ml-6', 'lg:ml-12', 'lg:ml-[4.5rem]', 'lg:ml-24'];

/** "Built for sellers ready to" + accent "grow past the inbox." */
const title = (h: Heading): ReactNode => (
  <>
    {h.title} <span className="accent-serif text-signal">{h.accent}</span>
  </>
);

function Tick() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
    </span>
  );
}

/** Centred, text-only hero sized to fit one screen, with the page's jump links pinned to the bottom. */
function Hero({ pkg, page }: { pkg: Pkg; page: PackagePage }) {
  const facts = [
    // Paid packages only; the free audit's badge and title already say "free" and "48 hours".
    { Icon: Clock, label: 'Typical timeline', value: pkg.timeline },
    { Icon: Tag, label: 'Price range', value: pkg.price },
  ];
  const jump = [
    ['for', 'Who it’s for'],
    ['problem', 'The problem'],
    ['deliverables', 'What you get'],
    ['pricing', pkg.free ? 'Timeline' : 'Price & timeline'],
    ['how', 'How it works'],
    ['faq', 'FAQ'],
  ];
  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-signal/20 blur-[160px]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[320px] w-[520px] rounded-full bg-signal/10 blur-[140px]" />

      <div className="container-x relative flex flex-1 flex-col pt-20 lg:pt-24">
        {/* Short laptop screens get tighter spacing so the whole hero, jump links included, fits one screen. */}
        <div className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center py-12 text-center sm:py-12 [@media(max-height:820px)]:sm:py-4 [@media(max-height:700px)]:sm:!py-3">
          <Reveal>
            {pkg.free && (
              <p className="mx-auto mb-6 w-fit rounded-full bg-signal px-4 py-1.5 [@media(max-height:820px)]:mb-5 [@media(max-height:700px)]:!mb-4 font-mono text-[12px] font-bold uppercase tracking-wider text-paper shadow-[0_10px_30px_-10px_rgba(232,79,61,0.9)]">
                100% free · No obligation
              </p>
            )}
            <h1 className="display text-balance text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[3.9rem] xl:text-[4.75rem] [@media(max-height:820px)]:sm:text-[3.4rem] [@media(max-height:820px)]:xl:text-[4.375rem] [@media(max-height:700px)]:xl:!text-[3.9rem]">
              {emphasize(page.h1, [page.heroAccent], (part, i) => (
                <span key={i} className="accent-serif block text-signal">
                  {part}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-10 max-w-3xl text-pretty text-lg leading-relaxed text-paper/65 sm:text-xl [@media(max-height:820px)]:mt-7 [@media(max-height:820px)]:sm:text-lg [@media(max-height:700px)]:!mt-5">{page.intro}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="mx-auto mt-8 flex w-fit flex-col items-start gap-2.5 text-left [@media(max-height:820px)]:mt-5 [@media(max-height:820px)]:gap-1.5 [@media(max-height:700px)]:!mt-4" aria-label="What you get">
              {page.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-2.5 text-[15px] font-medium text-paper/90">
                  <Tick />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          {!pkg.free && (
          <Reveal delay={0.16}>
              <dl className="mx-auto mt-9 [@media(max-height:820px)]:mt-5 [@media(max-height:700px)]:!mt-5 flex w-fit flex-col divide-y divide-white/10 rounded-2xl border border-white/12 bg-white/[0.04] sm:flex-row sm:divide-x sm:divide-y-0">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 px-5 py-3">
                    <f.Icon className="h-4 w-4 text-signal-300" aria-hidden />
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-paper/50">{f.label}</dt>
                    <dd className="display text-lg font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <CtaButtons service={pkg.title} primary={pkg.free ? auditCta : undefined} className="mt-9 justify-center [@media(max-height:820px)]:mt-6 [@media(max-height:700px)]:!mt-5" />
            {!pkg.free && (
              <p className="mt-5 text-sm text-paper/45 [@media(max-height:820px)]:mt-2 [@media(max-height:700px)]:hidden">
                Free call first. You approve a fixed scope and quote before any work starts.
              </p>
            )}
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <nav aria-label="On this page" className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] lg:justify-center">
          {jump.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full px-4 py-2 text-sm text-paper/55 transition-colors hover:bg-white/[0.06] hover:text-paper"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/** Who it is for: one card per buyer, in their own words, so visitors recognise themselves. */
function Audience({ pkg, page }: { pkg: Pkg; page: PackagePage }) {
  const h = page.headings.audience;
  return (
    <Section id="for">
      <SectionHeading label="Who it’s for" title={title(h)}>
        {h.lead}
      </SectionHeading>
      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {page.audience.map((a, i) => (
          <Reveal key={a.title} as="li" delay={i * 0.06} className="min-w-0">
            <div className="group relative flex h-full flex-col rounded-[26px] border border-ink/10 bg-paper-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_30px_60px_-35px_rgba(232,79,61,0.45)] sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-paper transition-colors duration-300 group-hover:bg-signal">
                  <a.Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="display text-xl font-semibold leading-snug sm:text-[1.35rem]">{a.title}</h3>
              </div>
              <figure className="relative mt-6 rounded-2xl rounded-tl-md bg-ink/[0.045] px-5 pb-4 pt-5">
                <Quote className="absolute -top-3 right-5 h-6 w-6 fill-signal/15 text-signal/70" aria-hidden />
                <blockquote className="accent-serif text-pretty text-[1.2rem] leading-snug text-ink/85">“{a.quote}”</blockquote>
              </figure>
              <p className="mt-5 flex gap-2.5 text-pretty text-[15px] leading-relaxed text-ink/65">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-signal" aria-hidden />
                {a.text}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.08} className="rounded-[24px] border border-dashed border-ink/20 p-6 sm:p-8">
          <h3 className="eyebrow text-ink/50">Probably not this package if</h3>
          <ul className="mt-5 space-y-4">
            {page.notFor.map((n) => {
              const alt = n.alt ? pkgById(n.alt) : undefined;
              return (
                <li key={n.text} className="flex gap-3 text-pretty leading-relaxed text-ink/65">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/[0.07] text-ink/45">
                    <X className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span>
                    {n.text}{' '}
                    {alt && (
                      <Link href={`/packages/${alt.id}`} className="font-medium text-signal underline-offset-4 hover:underline">
                        See {alt.title} →
                      </Link>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
        <Reveal delay={0.12} className="grain relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-6 text-paper sm:p-8">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal/30 blur-[80px]" />
          <div className="relative">
            <p className="display text-2xl font-semibold">Sounds like you?</p>
            <p className="mt-2 text-pretty text-paper/60">
              {pkg.free
                ? 'Two minutes to ask, 48 hours to your roadmap.'
                : 'Tell us where you are today. We will tell you honestly if this package fits.'}
            </p>
          </div>
          <a
            href={pkg.free ? auditCta.href : site.bookingUrl || bookingMail}
            {...(pkg.free ? (auditCta.external ? external : {}) : site.bookingUrl ? external : {})}
            className="group relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-[15px] font-medium text-paper transition-colors hover:bg-signal-600"
          >
            {pkg.free ? 'Get your free audit' : 'Talk it through'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/** Today vs. after: each problem with what it costs, next to what changes. */
function Problems({ pkg, page }: { pkg: Pkg; page: PackagePage }) {
  const h = page.headings.problems;
  const after = pkg.free ? 'After the audit' : `With ${pkg.title}`;
  return (
    <Section id="problem" tone="tint">
      <SectionHeading label="The problem" title={title(h)}>
        {h.lead}
      </SectionHeading>
      <Reveal delay={0.08}>
        <div className="mt-14 overflow-hidden rounded-[28px] border border-ink/10 shadow-[0_40px_80px_-50px_rgba(10,10,11,0.35)]">
          <div className="hidden md:grid md:grid-cols-2">
            <p className="flex items-center gap-2.5 bg-paper-300/60 px-8 py-4 font-mono text-[12px] uppercase tracking-wider text-ink/60">
              <X className="h-4 w-4" strokeWidth={3} aria-hidden />
              Today
            </p>
            <p className="flex items-center gap-2.5 bg-signal px-8 py-4 font-mono text-[12px] uppercase tracking-wider text-paper">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              {after}
            </p>
          </div>
          {page.problems.map((p, i) => (
            <div key={p.problem} className="grid md:grid-cols-2">
              <div className={cn('flex flex-col gap-3 bg-paper-50 px-6 py-6 sm:px-8', i > 0 && 'border-t border-ink/10')}>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/45 md:hidden">Today</span>
                <p className="text-pretty text-[16.5px] leading-relaxed text-ink/75">{p.problem}</p>
                <span className="w-fit rounded-full bg-signal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-signal-700">
                  Costs you: {p.cost}
                </span>
              </div>
              <div className={cn('flex items-start gap-3 bg-ink px-6 py-6 text-paper sm:px-8', i > 0 && 'md:border-t md:border-white/10')}>
                <Tick />
                <div>
                  <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-signal-300 md:hidden">{after}</span>
                  <p className="text-pretty text-[16.5px] font-medium leading-relaxed">{p.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Deliverables({ pkg, page }: { pkg: Pkg; page: PackagePage }) {
  const h = page.headings.deliverables;
  const n = page.deliverables.length;
  return (
    <Section id="deliverables" tone="ink">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[700px] rounded-full bg-signal/15 blur-[150px]" />
      <SectionHeading dark label="What you get" title={title(h)}>
        {h.lead}
      </SectionHeading>

      <ul className={cn('relative mt-14 grid gap-4 sm:grid-cols-2', n === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        {page.deliverables.map((d, i) => {
          // A lone card on the last row of three stretches across it and lays out sideways.
          const wide = n !== 4 && n % 3 === 1 && i === n - 1;
          return (
            <Reveal
              key={d.title}
              as="li"
              delay={i * 0.05}
              className={cn(
                'group relative flex gap-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-signal/50 hover:bg-white/[0.06] sm:p-7',
                wide ? 'flex-col sm:col-span-2 sm:flex-row sm:items-center lg:col-span-3' : 'flex-col',
              )}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-signal text-paper shadow-[0_10px_30px_-12px_rgba(232,79,61,0.9)]">
                <d.Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="display text-xl font-semibold">{d.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-paper/65">{d.text}</p>
              </div>
              <span className="absolute right-6 top-6 font-mono text-xs text-paper/30">{String(i + 1).padStart(2, '0')}</span>
            </Reveal>
          );
        })}
      </ul>

      {page.notIncluded ? (
        <Reveal delay={0.1}>
          <div className="relative mt-10 rounded-[24px] border border-dashed border-white/20 p-6 sm:p-8">
            <p className="eyebrow text-paper/50">Kept for the paid stage, so the audit stays fast and free</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.notIncluded.map((x) => (
                <li key={x} className="flex gap-2.5 text-pretty text-paper/70">
                  <X className="mt-1 h-4 w-4 shrink-0 text-paper/40" strokeWidth={3} aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-pretty text-sm leading-relaxed text-paper/55">
              If you want to go further, these are scoped into a paid package from what the audit finds, so you only pay for work you have chosen.
            </p>
          </div>
        </Reveal>
      ) : (
        page.included && <IncludedStack pkg={pkg} included={page.included} />
      )}
    </Section>
  );
}

/** What ships as standard with a paid package: a cascading stack of cards that settle into place one after another. */
function IncludedStack({ pkg, included }: { pkg: Pkg; included: NonNullable<PackagePage['included']> }) {
  const last = included.items.length - 1;
  return (
    <div className="relative mt-20 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <Reveal>
        <p className="eyebrow text-signal-300">Included with {pkg.title}</p>
        <h3 className="display mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">{title(included.heading)}</h3>
        <p className="mt-4 max-w-md text-pretty leading-relaxed text-paper/60">{included.heading.lead}</p>
        <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-paper/70">
          <ShieldCheck className="h-4 w-4 text-signal-300" aria-hidden />
          {included.badge}
        </p>
      </Reveal>

      <ol className="relative">
        {included.items.map((x, i) => {
          const Icon = x.Icon;
          return (
            <Reveal
              key={x.title}
              as="li"
              y={48}
              delay={0.08 + i * 0.1}
              className={cn('relative lg:w-[calc(100%-6rem)]', i > 0 && '-mt-3', stackOffsets[i])}
            >
              {/* Later cards paint over earlier ones (DOM order), which is what makes the stack overlap. */}
              <div
                className={cn(
                  'group relative flex items-start gap-4 rounded-2xl border p-5 pb-7 shadow-[0_-20px_40px_-22px_rgba(0,0,0,0.95)] transition-transform duration-300 hover:-translate-y-1.5 sm:gap-5 sm:p-6 sm:pb-8',
                  i === last ? 'border-signal/50 bg-gradient-to-br from-[#2a1512] to-[#161618]' : 'border-white/12 bg-[#161618]',
                )}
              >
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                    i === last ? 'bg-signal text-paper' : 'bg-signal/15 text-signal-300 ring-1 ring-inset ring-signal/30',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="display text-lg font-semibold">{x.title}</h4>
                  <p className="mt-1 text-pretty text-[15px] leading-relaxed text-paper/60">{x.text}</p>
                </div>
                <span className="font-mono text-xs text-paper/30">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

/** Real, deployed projects that show this kind of work. */
function Proof({ page }: { page: PackagePage }) {
  const items = (page.proof ?? []).map((id) => projects.find((p) => p.id === id)).filter((p): p is (typeof projects)[number] => Boolean(p));
  if (!items.length) return null;
  return (
    <Section id="proof">
      <SectionHeading
        label="Work we’ve shipped"
        title={
          <>
            Proof, not <span className="accent-serif text-signal">promises.</span>
          </>
        }
      >
        Live systems we have designed and built, in the same kind of work as this package.
      </SectionHeading>
      <ul className={cn('mt-12 grid gap-5', items.length > 1 && 'md:grid-cols-2')}>
        {items.map((p, i) => {
          const cover = p.images[0];
          return (
            <Reveal key={p.id} as="li" delay={i * 0.08} className="min-w-0">
              <Link
                href={`/work/${p.id}`}
                className={cn(
                  'group flex h-full overflow-hidden rounded-[24px] border border-ink/10 bg-paper-50 transition-colors hover:border-ink/25',
                  items.length > 1 ? 'flex-col' : 'flex-col md:flex-row',
                )}
              >
                <div className={cn('relative overflow-hidden bg-ink', items.length > 1 ? 'aspect-[16/9]' : 'aspect-[16/9] md:aspect-auto md:w-1/2')}>
                  {cover ? (
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.w}
                      height={cover.h}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="grain flex h-full min-h-[200px] items-center justify-center p-8 text-paper">
                      <p className="display text-center text-3xl font-semibold">{p.title}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                    <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-ink/70">{p.kind}</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-[#22c55e]/10 px-2.5 py-1 text-[#15803d]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                      {p.status}
                    </span>
                  </div>
                  <h3 className="display mt-4 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-pretty leading-relaxed text-ink/65">{p.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-signal">
                    View the project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

function Pricing({ pkg, page, tone }: { pkg: Pkg; page: PackagePage; tone: 'paper' | 'tint' }) {
  return (
    <Section id="pricing" tone={tone}>
      <SectionHeading label={pkg.free ? 'Timeline' : 'Price & timeline'} title={title(page.headings.pricing)} />
      <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="grain relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal/25 blur-[90px]" />
          <p className="eyebrow relative text-paper/50">{pkg.free ? 'Price' : 'Price range'}</p>
          <p className="display relative mt-3 text-4xl font-bold sm:text-5xl">{pkg.free ? 'Free' : pkg.price}</p>
          {!pkg.free && <p className="relative mt-2 text-paper/60">In US dollars. Your exact quote follows the discovery call.</p>}
          <div className="relative mt-8 border-t border-white/10 pt-6">
            <p className="eyebrow text-paper/50">{pkg.free ? 'Delivery' : 'Typical timeline'}</p>
            <p className="display mt-2 text-3xl font-semibold">{pkg.timeline}</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-paper/55">{page.timelineNote}</p>
          </div>
          <CtaButtons service={pkg.title} primary={pkg.free ? auditCta : undefined} className="relative mt-8" />
        </Reveal>

        <div className="flex flex-col gap-5">
          {pkg.free ? (
            <>
              <Reveal delay={0.06} className="rounded-[24px] border border-ink/10 bg-paper-50 p-6 sm:p-8">
                <h3 className="display text-2xl font-semibold">Why is it free?</h3>
                <p className="mt-3 text-pretty text-lg leading-relaxed text-ink/70">{page.whyFree}</p>
              </Reveal>
              <Reveal delay={0.12} className="rounded-[24px] border border-dashed border-ink/20 p-6 sm:p-8">
                <h3 className="eyebrow text-ink/50">All we need from you</h3>
                <ul className="mt-5 space-y-3.5">
                  {page.needFromYou?.map((x) => (
                    <li key={x} className="flex gap-3 text-pretty leading-relaxed text-ink/75">
                      <Tick />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </>
          ) : (
            <>
              {page.scopes.map((s, i) => (
                <Reveal key={s.label} delay={0.06 + i * 0.06} className="rounded-[24px] border border-ink/10 bg-paper-50 p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="eyebrow text-ink/50">{s.label}</h3>
                    <p className="display text-2xl font-semibold text-signal">{s.price}</p>
                  </div>
                  <p className="mt-3 text-pretty text-lg leading-relaxed text-ink/75">{s.text}</p>
                </Reveal>
              ))}
              <Reveal delay={0.18} className="rounded-[24px] border border-dashed border-ink/20 p-6 sm:p-8">
                <h3 className="eyebrow text-ink/50">What moves the price</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {page.priceFactors.map((f) => (
                    <li key={f} className="rounded-full border border-ink/12 bg-paper-50 px-3.5 py-1.5 text-sm text-ink/70">
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </>
          )}
        </div>
      </div>

      {!pkg.free && (
        <Reveal delay={0.1}>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p, i) => {
              const Icon = promiseIcons[i];
              return (
                <li key={p.title} className="flex gap-4 bg-paper-50 p-6">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden />
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-ink/60">{p.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}

/** Numbered steps joined by a line, so the path from first call to done reads at a glance. */
function Steps({ page, tone }: { page: PackagePage; tone: 'paper' | 'tint' }) {
  return (
    <Section id="how" tone={tone}>
      <SectionHeading label="How it works" title={title(page.headings.steps)} />
      <div className="relative mt-14">
        <span aria-hidden className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-signal via-signal/40 to-ink/10 lg:block" />
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {page.steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.08} className="relative">
              <span
                className={cn(
                  'relative flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm font-semibold ring-8',
                  tone === 'tint' ? 'ring-paper-200' : 'ring-paper',
                  i === 0 ? 'bg-signal text-paper' : 'bg-ink text-paper',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink/65">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Faq({ pkg, items, related, tone }: { pkg: Pkg; items: { q: string; a: string }[]; related: string[]; tone: 'paper' | 'tint' }) {
  const services = related.map((id) => coreServices.find((c) => c.id === id)).filter((c): c is (typeof coreServices)[number] => Boolean(c));
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading label="FAQ" title="Common questions" />
          <Reveal delay={0.12}>
            <p className="mt-6 text-pretty leading-relaxed text-ink/65">Have a question about this package that is not here?</p>
            <a
              href={whatsappHref(pkg.title)}
              {...external}
              className="mt-4 inline-flex items-center gap-2 font-medium text-signal underline-offset-4 hover:underline"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Ask us on WhatsApp
            </a>
            {services.length > 0 && (
              <div className="mt-10 border-t border-ink/10 pt-6">
                <p className="eyebrow text-ink/50">Related services</p>
                <ul className="mt-4 space-y-2.5">
                  {services.map((c) => (
                    <li key={c.id}>
                      <Link href={`/services/${c.id}`} className="group inline-flex items-center gap-2 font-medium text-ink/80 transition-colors hover:text-signal">
                        {c.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-medium">{f.q}</h3>
                  <Plus className="mt-1 h-5 w-5 shrink-0 text-ink/40 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink/65">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Cards for packages, each with its menu graphic, price and timeline. */
export function PackageCards({ items, className }: { items: Pkg[]; className?: string }) {
  return (
    <ul className={cn('grid gap-5 md:grid-cols-2', items.length % 3 === 0 && 'lg:grid-cols-3', className)}>
      {items.map((p, i) => (
        <Reveal key={p.id} as="li" delay={i * 0.06} className="min-w-0">
          <Link
            href={`/packages/${p.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/10 bg-paper-50 transition-colors hover:border-ink/25"
          >
            <div aria-hidden className="bg-ink p-4 text-paper sm:p-5">
              {packageArt[p.id]?.()}
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span className={cn('rounded-full px-2.5 py-1', p.free ? 'bg-signal text-paper' : 'bg-ink/[0.06] text-ink/70')}>{p.price}</span>
                <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-ink/70">{p.timeline}</span>
              </div>
              <h3 className="display mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-ink/60">{p.short}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-signal">
                View package
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

function OtherPackages({ pkg, tone }: { pkg: Pkg; tone: 'paper' | 'tint' }) {
  return (
    <Section id="other-packages" tone={tone}>
      <SectionHeading label="Other packages" title="Looking for something else?" />
      <PackageCards items={packages.filter((p) => p.id !== pkg.id)} className="mt-12 lg:grid-cols-4" />
    </Section>
  );
}

function ClosingCta({ pkg }: { pkg: Pkg }) {
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[960px] -translate-x-1/2 rounded-full bg-signal/20 blur-[160px]"
      />
      <div className="container-x relative">
        <Reveal>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-14 text-center sm:px-14 sm:py-20">
            <p className="eyebrow text-paper/55">Next step</p>
            <h2 className="display mx-auto mt-5 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.05] sm:text-5xl">
              {pkg.free ? (
                <>
                  Find out what to fix <span className="accent-serif text-signal">first.</span>
                </>
              ) : (
                <>
                  Ready to start with <span className="accent-serif text-signal">{pkg.title}?</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/65">
              {pkg.free
                ? 'Tell us a little about your business. After the discovery discussion, your roadmap arrives within 48 hours.'
                : `${pkg.price}, typically ${pkg.timeline}. Book a free call and we will send a fixed scope and quote for you to approve.`}
            </p>
            <CtaButtons service={pkg.title} primary={pkg.free ? auditCta : undefined} className="mt-10 justify-center" />
            {!pkg.free && (
              <p className="mt-8 text-sm text-paper/45">
                Not sure this is the right package?{' '}
                <Link
                  href="/packages/audit"
                  className="inline-flex items-center gap-1.5 text-paper/75 underline-offset-4 hover:text-paper hover:underline"
                >
                  <ScanSearch className="h-3.5 w-3.5" aria-hidden />
                  Start with the free 48-hour audit
                </Link>
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Offer page for one package: who it is for, the problem, what you get, then price and timeline. */
export function PackageLandingPage({ pkg, page }: { pkg: Pkg; page: PackagePage }) {
  // Sections after the dark deliverables block alternate paper / tint; the optional proof block shifts it by one.
  const hasProof = Boolean(page.proof?.length);
  const tone = (i: number) => ((i + (hasProof ? 1 : 0)) % 2 === 0 ? 'paper' : 'tint');
  return (
    <>
      <Navbar overDark />
      <main>
        <Hero pkg={pkg} page={page} />
        <Audience pkg={pkg} page={page} />
        <Problems pkg={pkg} page={page} />
        <Deliverables pkg={pkg} page={page} />
        <Proof page={page} />
        <Pricing pkg={pkg} page={page} tone={tone(0)} />
        <Steps page={page} tone={tone(1)} />
        <Faq pkg={pkg} items={page.faqs} related={page.relatedServices} tone={tone(2)} />
        <OtherPackages pkg={pkg} tone={tone(3)} />
        <ClosingCta pkg={pkg} />
      </main>
      <Footer />
    </>
  );
}
