import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarClock, Check, ChevronRight, Lightbulb, MessageCircle, Plus, ScanSearch, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { HowArt } from '@/components/brand/how';
import { howArtIds } from '@/components/brand/how/ids';
import { serviceArt, serviceArtDark } from '@/components/brand/service-art';
import { serviceHeroArt } from '@/components/brand/service-hero-art';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { coreServices, packages, processSteps, products, projects, site } from '@/lib/content';
import type { ServiceLanding } from '@/lib/service-landing';
import { includedInEveryBuild } from '@/lib/service-landing';
import type { ServicePage } from '@/lib/service-pages';
import { servicePageById } from '@/lib/service-pages';
import { packagePages } from '@/lib/package-pages';
import { cn } from '@/lib/utils';

type Core = (typeof coreServices)[number];

export const bookingMail = `mailto:${site.email}?subject=${encodeURIComponent('Discovery call request')}&body=${encodeURIComponent(
  'Hi Agentiq BD,\n\nI’d like to book a discovery call.\n\nName:\nCompany:\nPreferred times (with time zone):\nWhat I’d like to discuss:\n',
)}`;
export const auditMail = `mailto:${site.email}?subject=${encodeURIComponent('AI Business Audit request')}&body=${encodeURIComponent(
  'Hi Agentiq BD,\n\nI’d like an AI Business Audit.\n\nName:\nCompany:\nWhat the business does:\nWhat I’d like to improve:\n',
)}`;
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const btn = 'group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-colors';

/** Wraps each phrase found in `text` with `wrap`; text without a match is returned as is. */
export function emphasize(text: string, phrases: string[], wrap: (part: string, i: number) => ReactNode): ReactNode[] {
  const found = phrases.filter((p) => p && text.includes(p));
  if (!found.length) return [text];
  const re = new RegExp(`(${found.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
  return text.split(re).map((part, i) => (found.includes(part) ? wrap(part, i) : part));
}

/** "AI Agent Development" → "AI agent development": lower-cases plain words, keeps acronyms like AI, ERP, RAG and SaaS. */
const inSentence = (title: string) => title.replace(/\b[A-Z][a-z]+\b/g, (w) => w.toLowerCase());

export function whatsappHref(service: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Agentiq BD, I’d like to know more about ${service}.`)}`;
}

/**
 * The two calls to action used on every service and package page: book a call (primary) and WhatsApp (secondary).
 * `primary` swaps the booking button for another action, such as requesting the free audit.
 */
export function CtaButtons({
  service,
  dark = true,
  primary,
  className,
}: {
  service: string;
  dark?: boolean;
  primary?: { label: string; href: string; external?: boolean };
  className?: string;
}) {
  const main = primary ?? { label: 'Book a free discovery call', href: site.bookingUrl || bookingMail, external: Boolean(site.bookingUrl) };
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
      <a
        href={main.href}
        {...(main.external ? external : {})}
        className={cn(btn, 'bg-signal text-paper shadow-[0_10px_30px_-10px_rgba(232,79,61,0.7)] hover:bg-signal-600')}
      >
        <CalendarClock className="h-[18px] w-[18px]" aria-hidden />
        {main.label}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </a>
      <a
        href={whatsappHref(service)}
        {...external}
        className={cn(
          btn,
          'border',
          dark ? 'border-white/25 text-paper hover:border-white/60 hover:bg-white/5' : 'border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.04]',
        )}
      >
        <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export function Section({ id, tone = 'paper', className, children }: { id?: string; tone?: 'paper' | 'tint' | 'ink'; className?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-28',
        tone === 'paper' && 'bg-paper',
        tone === 'tint' && 'bg-paper-200/60',
        tone === 'ink' && 'grain overflow-hidden bg-ink text-paper',
        className,
      )}
    >
      <div className="container-x relative">{children}</div>
    </section>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ core, page, landing }: { core: Core; page: ServicePage; landing: ServiceLanding }) {
  const Art = serviceHeroArt[core.id];
  const jump = [
    ['overview', 'What it is'],
    ['how', 'How it works'],
    ['deliverables', 'What you get'],
    ['use-cases', 'Use cases'],
    ['fit', 'Is it right for you?'],
    ['faq', 'FAQ'],
  ];
  return (
    <section className="grain relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[760px] rounded-full bg-signal/20 blur-[160px]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[320px] w-[520px] rounded-full bg-signal/10 blur-[140px]" />

      <div className="container-x relative pb-14 pt-28 sm:pb-20 sm:pt-32">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-paper/50">
          <Link href="/" className="hover:text-paper">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <Link href="/services" className="hover:text-paper">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-paper/80">{core.title}</span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.08fr] lg:gap-14">
          <div>
            <Reveal>
              <h1 className="display text-balance text-[2.75rem] font-semibold leading-[1.0] tracking-[-0.02em] sm:text-[3.6rem] xl:text-[4.4rem]">
                {emphasize(page.h1, [landing.heroAccent], (part, i) => (
                  <span key={i} className="accent-serif text-signal">{part}</span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-paper/60 sm:text-xl">
                {emphasize(landing.intro, landing.introHighlights, (part, i) => (
                  <strong key={i} className="font-medium text-paper">{part}</strong>
                ))}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <CtaButtons service={core.title} className="mt-9" />
              <p className="mt-4 text-sm text-paper/45">Free call. Honest advice, even if the answer is “you don’t need AI for this”.</p>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mt-9 flex flex-wrap gap-2" aria-label="Covers">
                {core.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-paper/70">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={40}>
            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:p-5">
              {Art?.({})}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <nav aria-label="On this page" className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {jump.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-4 py-2 text-sm text-paper/55 transition-colors hover:bg-white/[0.06] hover:text-paper">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/* ───────────────────────── Sections ───────────────────────── */

function Overview({ core, page, landing }: { core: Core; page: ServicePage; landing: ServiceLanding }) {
  return (
    <Section id="overview">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <SectionHeading label="The basics" title={<>What is {landing.term}?</>} />
          <Reveal delay={0.12}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/70 sm:text-xl">{page.answer}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {core.tags.map((tag) => (
                <li key={tag} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper-50 px-4 py-3 text-[15px] font-medium">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:pt-16">
          <figure className="grain relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-signal/25 blur-[90px]" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-signal">
              <Lightbulb className="h-5 w-5" aria-hidden />
            </span>
            <p className="eyebrow relative mt-7 text-paper/50">In plain words</p>
            <blockquote className="relative mt-4 text-pretty text-xl leading-relaxed text-paper/90 sm:text-[1.4rem]">{landing.plain}</blockquote>
          </figure>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 border-t border-ink/10 pt-10">
          <h3 className="eyebrow text-ink/50">Key terms</h3>
          <dl className={cn('mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2', landing.glossary.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
            {landing.glossary.map((g) => (
              <div key={g.term}>
                <dt className="display text-lg font-semibold">{g.term}</dt>
                <dd className="mt-2 text-pretty text-[15px] leading-relaxed text-ink/65">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

function HowItWorks({ core, landing }: { core: Core; landing: ServiceLanding }) {
  const hasArt = howArtIds.has(core.id);
  return (
    <>
      <Section id="how" tone="tint" className={cn(hasArt && 'pb-14 sm:pb-16')}>
        <SectionHeading
          label="How it works"
          title={
            <>
              From request to result, <span className="accent-serif text-signal">step by step.</span>
            </>
          }
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {landing.how.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.08} className="relative rounded-[22px] border border-ink/10 bg-paper p-6 sm:p-7">
              {i < landing.how.length - 1 && (
                <span aria-hidden className="absolute -right-5 top-12 hidden h-px w-5 bg-ink/20 lg:block" />
              )}
              <span
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm font-medium text-paper',
                  i === landing.how.length - 1 ? 'bg-signal' : 'bg-ink',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display mt-6 text-balance text-xl font-semibold leading-snug">{s.title}</h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink/65">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>
      {hasArt && (
        <section aria-label="See it working" className="grain relative overflow-hidden bg-ink text-paper">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0A0A0B_0%,#141012_55%,#0A0A0B_100%)]" />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-signal/[0.16] blur-[160px]" />
          <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[620px] rounded-full bg-signal/[0.07] blur-[140px]" />
          <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 h-[380px] w-[620px] rounded-full bg-[#6b2a22]/20 blur-[150px]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black_20%,transparent_80%)]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="container-x relative py-16 sm:py-24">
            <Reveal y={40}>
              <HowArt id={core.id} steps={landing.how.map((s) => s.title)} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

function Shifts({ core, landing }: { core: Core; landing: ServiceLanding }) {
  return (
    <Section id="outcomes">
      <SectionHeading
        label="Sound familiar?"
        title={
          <>
            What changes when it is <span className="accent-serif text-signal">in place.</span>
          </>
        }
      >
        The everyday problems this service is built to remove, and what the same work looks like afterwards.
      </SectionHeading>

      <Reveal delay={0.1}>
        <div className="mt-14 overflow-hidden rounded-[28px] border border-ink/10">
          <div className="hidden grid-cols-[1fr_auto_1fr] border-b border-ink/10 bg-paper-200/60 md:grid">
            <p className="eyebrow px-8 py-4 text-ink/50">Today</p>
            <span className="w-12" />
            <p className="eyebrow px-8 py-4 text-signal">With {core.title}</p>
          </div>
          <ul className="divide-y divide-ink/10">
            {landing.shifts.map((s) => (
              <li key={s.before} className="grid gap-3 p-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:p-0">
                <p className="flex items-start gap-3 text-pretty leading-relaxed text-ink/55 md:px-8 md:py-6">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/[0.07] text-ink/45">
                    <X className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span>
                    <span className="sr-only">Today: </span>
                    {s.before}
                  </span>
                </p>
                <span aria-hidden className="hidden w-12 justify-center text-ink/30 md:flex">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <p className="flex items-start gap-3 text-pretty font-medium leading-relaxed md:px-8 md:py-6">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span>
                    <span className="sr-only">Afterwards: </span>
                    {s.after}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function Deliverables({ page }: { page: ServicePage }) {
  return (
    <Section id="deliverables" tone="ink">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[700px] rounded-full bg-signal/15 blur-[150px]" />
      <SectionHeading
        dark
        label="What you get"
        title={
          <>
            What we build <span className="accent-serif text-signal">for you.</span>
          </>
        }
      >
        Every project is scoped to your process, so the exact list is agreed in discovery. These are the pieces we typically deliver.
      </SectionHeading>

      <ul className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {page.build.map((b, i) => (
          <Reveal key={b} as="li" delay={i * 0.06} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <span className="font-mono text-sm text-signal-300">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-4 text-pretty text-lg leading-snug text-paper/90">{b}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="relative mt-10 rounded-[24px] border border-white/10 p-6 sm:p-8">
          <p className="eyebrow text-paper/50">Included in every build</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {includedInEveryBuild.map((x) => (
              <li key={x.title}>
                <p className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-signal-300" strokeWidth={3} aria-hidden />
                  {x.title}
                </p>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-paper/55">{x.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function UseCases({ landing }: { landing: ServiceLanding }) {
  const allReal = landing.useCases.every((u) => u.real);
  return (
    <Section id="use-cases" tone="tint">
      <SectionHeading
        label="Use cases"
        title={
          allReal ? (
            <>
              Things we have <span className="accent-serif text-signal">already built.</span>
            </>
          ) : (
            <>
              Where it <span className="accent-serif text-signal">fits in.</span>
            </>
          )
        }
      >
        {allReal
          ? 'Projects and products we have designed and delivered ourselves.'
          : 'Example scenarios to show how this works in practice. Yours will be shaped around your own process.'}
      </SectionHeading>
      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {landing.useCases.map((u, i) => (
          <Reveal key={u.title} as="li" delay={i * 0.08} className="flex flex-col rounded-[22px] border border-ink/10 bg-paper p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow text-ink/50">{u.sector}</p>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
                  u.real ? 'bg-signal/10 text-signal-600' : 'bg-ink/[0.05] text-ink/45',
                )}
              >
                {u.real ? 'Built by us' : 'Example'}
              </span>
            </div>
            <h3 className="display mt-5 text-balance text-xl font-semibold leading-snug">{u.title}</h3>
            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink/65">{u.text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export type Tone = 'paper' | 'tint';

function Proof({ landing, tone }: { landing: ServiceLanding; tone: Tone }) {
  const items = (landing.proof ?? [])
    .map((p) => {
      if (p.kind === 'project') {
        const x = projects.find((x) => x.id === p.id);
        return x && { key: p.id, title: x.title, kind: x.kind, status: x.status, text: p.text, href: `/work/${x.id}`, image: x.images[0] };
      }
      const x = products.find((x) => x.id === p.id);
      return x && { key: p.id, title: x.name, kind: x.tag, status: x.status, text: p.text, href: '/#products', image: x.images[0] };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  if (!items.length) return null;

  return (
    <Section id="proof" tone={tone}>
      <SectionHeading
        label="From our work"
        title={
          <>
            See the <span className="accent-serif text-signal">work.</span>
          </>
        }
      />
      <ul className={cn('mt-14 grid gap-6', items.length > 1 && 'lg:grid-cols-2')}>
        {items.map((p, i) => (
          <Reveal key={p.key} as="li" delay={i * 0.08}>
            <Link
              href={p.href}
              className={cn(
                'group grid h-full overflow-hidden rounded-[28px] border border-ink/10 bg-paper-50 transition-colors hover:border-ink/25',
                items.length === 1 && p.image && 'lg:grid-cols-[1.25fr_1fr]',
              )}
            >
              {p.image && (
                <div className="relative aspect-[16/9] overflow-hidden border-b border-ink/10 bg-paper-200 lg:aspect-auto lg:min-h-[300px] lg:border-b-0">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <p className="eyebrow flex items-center gap-2 text-ink/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {p.status} · {p.kind}
                </p>
                <h3 className="display mt-4 text-2xl font-semibold sm:text-3xl">{p.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink/65">{p.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-signal">
                  See the project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function Fit({ core, page, landing, tone }: { core: Core; page: ServicePage; landing: ServiceLanding; tone: Tone }) {
  return (
    <Section id="fit" tone={tone}>
      <SectionHeading
        label="Is it right for you?"
        title={
          <>
            An honest <span className="accent-serif text-signal">fit check.</span>
          </>
        }
      >
        We would rather tell you now than sell you something you do not need.
      </SectionHeading>
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal className="rounded-[24px] border border-ink/10 bg-paper-50 p-7 sm:p-9">
          <h3 className="display text-2xl font-semibold">A good fit for</h3>
          <ul className="mt-6 space-y-4">
            {page.fit.map((f) => (
              <li key={f} className="flex gap-3 text-pretty leading-relaxed text-ink/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[24px] border border-dashed border-ink/20 p-7 sm:p-9">
          <h3 className="display text-2xl font-semibold">Probably not yet if</h3>
          <ul className="mt-6 space-y-4">
            {landing.notFit.map((f) => (
              <li key={f} className="flex gap-3 text-pretty leading-relaxed text-ink/60">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/[0.07] text-ink/45">
                  <X className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-ink/10 pt-5 text-pretty text-sm leading-relaxed text-ink/50">
            Not sure which side you are on? That is exactly what the discovery call is for.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="grain relative mt-12 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-ink p-8 text-paper lg:flex-row lg:items-center sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-96 rounded-full bg-signal/25 blur-[100px]" />
          <div className="relative max-w-xl">
            <p className="display text-balance text-2xl font-semibold leading-tight sm:text-3xl">
              Talk it through with the engineer who would build it.
            </p>
            <p className="mt-3 text-pretty text-paper/60">
              Tell us how the work runs in your business today, and we will tell you what is worth doing first.
            </p>
          </div>
          <CtaButtons service={core.title} className="relative shrink-0" />
        </div>
      </Reveal>
    </Section>
  );
}

function Process({ tone }: { tone: Tone }) {
  return (
    <Section id="process" tone={tone}>
      <SectionHeading
        label="How we work with you"
        title={
          <>
            Three steps, and you approve the plan <span className="accent-serif text-signal">first.</span>
          </>
        }
      />
      <ol className="mt-14 grid gap-5 lg:grid-cols-3">
        {processSteps.map((s, i) => (
          <Reveal key={s.label} as="li" delay={i * 0.08} className="flex flex-col rounded-[22px] border border-ink/10 bg-paper-50 p-7">
            <p className="eyebrow flex items-center gap-3 text-ink/50">
              <span className="text-signal">{String(i + 1).padStart(2, '0')}</span>
              <span className="h-px w-6 bg-ink/20" />
              {s.label}
            </p>
            <h3 className="display mt-5 text-2xl font-semibold">{s.title}</h3>
            <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-ink/65">{s.text}</p>
            <p className="mt-6 flex items-start gap-3 rounded-2xl bg-ink/[0.045] p-4 text-[15px] font-medium leading-snug">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-paper">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {s.outcome}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Faq({ core, items, tone }: { core: Core; items: { q: string; a: string }[]; tone: Tone }) {
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading label="FAQ" title="Common questions" />
          <Reveal delay={0.12}>
            <p className="mt-6 text-pretty leading-relaxed text-ink/65">
              Have a question about {inSentence(core.title)} that is not here?
            </p>
            <a
              href={whatsappHref(core.title)}
              {...external}
              className="mt-4 inline-flex items-center gap-2 font-medium text-signal underline-offset-4 hover:underline"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Ask us on WhatsApp
            </a>
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

function Related({ page, tone }: { page: ServicePage; tone: Tone }) {
  const related = page.related
    .map((id) => ({ page: servicePageById(id), core: coreServices.find((c) => c.id === id) }))
    .filter((r): r is { page: ServicePage; core: Core } => Boolean(r.page && r.core));
  return (
    <Section id="related" tone={tone}>
      <SectionHeading label="Related services" title="Often combined with" />
      <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {related.map(({ core }, i) => {
          const dark = serviceArtDark[core.id];
          return (
            <Reveal key={core.id} as="li" delay={i * 0.08} className="min-w-0">
              <Link href={`/services/${core.id}`} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/10 bg-paper-50 transition-colors hover:border-ink/25">
                <div aria-hidden className={cn('flex h-40 items-center overflow-hidden px-7', dark ? 'bg-ink text-paper' : 'bg-paper-200/70 text-ink')}>
                  <div className="w-full">{serviceArt[core.id]?.()}</div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow text-ink/45">{core.category}</p>
                  <h3 className="display mt-3 text-xl font-semibold">{core.title}</h3>
                  <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-ink/60">{core.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-signal">
                    Learn more
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

function ClosingCta({ core }: { core: Core }) {
  // Fixed-scope packages that cover this service (their `relatedServices` lists it).
  const pkgs = packagePages
    .filter((p) => p.relatedServices.includes(core.id))
    .map((p) => packages.find((x) => x.id === p.id))
    .filter((p): p is (typeof packages)[number] => Boolean(p));
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[960px] -translate-x-1/2 rounded-full bg-signal/20 blur-[160px]" />
      <div className="container-x relative">
        <Reveal>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-14 text-center sm:px-14 sm:py-20">
            <p className="eyebrow text-paper/55">Next step</p>
            <h2 className="display mx-auto mt-5 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.05] sm:text-5xl">
              Ready to talk about <span className="accent-serif text-signal">{inSentence(core.title)}?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/65">
              Book a free discovery call. We will look at how the work runs today and tell you honestly what is worth building first.
            </p>
            <CtaButtons service={core.title} className="mt-10 justify-center" />
            {pkgs.length > 0 && (
              <p className="mt-8 text-sm text-paper/55">
                Prefer a fixed scope and price?{' '}
                {pkgs.map((p, i) => (
                  <span key={p.id}>
                    {i > 0 && ' or '}
                    <Link href={`/packages/${p.id}`} className="font-medium text-paper/85 underline-offset-4 hover:text-paper hover:underline">
                      See {p.title} ({p.price})
                    </Link>
                  </span>
                ))}
              </p>
            )}
            <p className="mt-4 text-sm text-paper/45">
              Not sure where to start?{' '}
              <a
                href={site.auditUrl || auditMail}
                {...(site.auditUrl ? external : {})}
                className="inline-flex items-center gap-1.5 text-paper/75 underline-offset-4 hover:text-paper hover:underline"
              >
                <ScanSearch className="h-3.5 w-3.5" aria-hidden />
                Ask for an AI Business Audit
              </a>{' '}
              or email{' '}
              <a href={`mailto:${site.email}`} className="text-paper/75 underline-offset-4 hover:text-paper hover:underline">
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Full landing page for one core service: teach what it is, show what changes, then make it easy to start. */
export function ServiceLandingPage({
  core,
  page,
  landing,
  faqs,
}: {
  core: Core;
  page: ServicePage;
  landing: ServiceLanding;
  faqs: { q: string; a: string }[];
}) {
  // Sections after the use cases alternate paper / tint; the optional proof block shifts the pattern by one.
  const hasProof = Boolean(landing.proof?.length);
  const tone = (i: number): Tone => ((i + (hasProof ? 1 : 0)) % 2 === 0 ? 'paper' : 'tint');
  return (
    <>
      <Navbar overDark />
      <main>
        <Hero core={core} page={page} landing={landing} />
        <Overview core={core} page={page} landing={landing} />
        <HowItWorks core={core} landing={landing} />
        <Shifts core={core} landing={landing} />
        <Deliverables page={page} />
        <UseCases landing={landing} />
        {hasProof && <Proof landing={landing} tone="paper" />}
        <Fit core={core} page={page} landing={landing} tone={tone(0)} />
        <Process tone={tone(1)} />
        <Faq core={core} items={faqs} tone={tone(2)} />
        <Related page={page} tone={tone(3)} />
        <ClosingCta core={core} />
      </main>
      <Footer />
    </>
  );
}
