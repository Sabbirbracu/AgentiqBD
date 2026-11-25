import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Banknote, BriefcaseBusiness, CalendarClock, Check, GraduationCap, Mail, MapPin, Mic, Users, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/content';
import { jobById, jobs, type JobPost } from '@/lib/careers';
import { applyHref, formatJobDate } from '@/lib/careers-apply';
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jobPostingJsonLd, webPageJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = jobById(slug);
  if (!job) return {};
  const url = `/careers/${job.id}`;
  return {
    title: job.metaTitle,
    description: job.metaDescription,
    alternates: { canonical: url },
    robots: job.open ? undefined : { index: false, follow: true },
    openGraph: { title: `${job.metaTitle} · Agentiq BD`, description: job.metaDescription, url: absoluteUrl(url), type: 'website' },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <h2 id={`${id}-title`} className="display text-2xl font-semibold sm:text-[1.9rem]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function List({ items, tone = 'yes' }: { items: string[]; tone?: 'yes' | 'plus' | 'no' }) {
  return (
    <ul className="space-y-3.5 text-[17px] leading-relaxed text-ink/75">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className={cn(
              'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
              tone === 'yes' && 'bg-signal/15 text-signal',
              tone === 'plus' && 'bg-ink/[0.07] text-ink/55',
              tone === 'no' && 'bg-ink/[0.07] text-ink/45',
            )}
          >
            {tone === 'no' ? <X className="h-3 w-3" strokeWidth={3} /> : <Check className="h-3 w-3" strokeWidth={3.5} />}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Facts({ job }: { job: JobPost }) {
  const facts = [
    { Icon: Banknote, label: 'Salary', value: job.salary.label },
    { Icon: MapPin, label: 'Location', value: job.location },
    { Icon: BriefcaseBusiness, label: 'Job type', value: job.employmentLabel },
    { Icon: GraduationCap, label: 'Experience', value: job.experience },
    { Icon: Users, label: 'Openings', value: String(job.vacancies) },
    { Icon: CalendarClock, label: 'Apply by', value: job.validThrough ? formatJobDate(job.validThrough) : 'Open until filled' },
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:grid-cols-3">
      {facts.map(({ Icon, label, value }) => (
        <div key={label} className="bg-ink p-5">
          <dt className="eyebrow flex items-center gap-2 text-paper/45">
            <Icon className="h-3.5 w-3.5 text-signal-300" />
            {label}
          </dt>
          <dd className="mt-2 text-[15px] font-medium leading-snug text-paper">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobById(slug);
  if (!job) notFound();
  const path = `/careers/${job.id}`;
  const apply = applyHref(job);

  const nav = [
    { id: 'about', label: 'About the role' },
    { id: 'work', label: 'What you will do' },
    { id: 'you', label: 'Who we are looking for' },
    { id: 'growth', label: 'What you will learn' },
    { id: 'apply', label: 'How to apply' },
    { id: 'faq', label: 'Questions' },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: job.metaTitle, description: job.metaDescription, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
            { name: job.title, path },
          ]),
          faqJsonLd(job.faq),
          ...(job.open ? [jobPostingJsonLd(job)] : []),
        ]}
      />
      <Navbar overDark />
      <main>
        <header className="grain relative overflow-hidden bg-ink pb-14 pt-32 text-paper sm:pb-20 sm:pt-36">
          <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[140px]" />
          <div className="container-x relative">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-paper/55 transition-colors hover:text-paper">
              <ArrowLeft className="h-4 w-4" /> All open roles
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              {job.open ? (
                <span className="rounded-full bg-signal px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-paper">Hiring now</span>
              ) : (
                <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-paper/70">Position filled</span>
              )}
              <span className="eyebrow text-paper/50">{job.team}</span>
            </div>
            <h1 className="display mt-5 text-balance text-5xl font-semibold leading-[1.02] sm:text-7xl">{job.title}</h1>
            <p className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-paper/65">{job.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {job.open && (
                <a href={apply} className="inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600">
                  <Mail className="h-4 w-4" /> Apply by email
                </a>
              )}
              <span className="text-sm text-paper/45">Posted {formatJobDate(job.datePosted)}</span>
            </div>
            <div className="mt-12">
              <Facts job={job} />
            </div>
          </div>
        </header>

        <div className="bg-paper text-ink">
          <div className="container-x grid gap-12 pb-24 pt-16 sm:pb-32 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div className="max-w-3xl space-y-16">
              {!job.open && (
                <p className="rounded-[20px] border border-ink/10 bg-paper-200/60 p-5 text-ink/70">
                  This position has been filled. See <Link href="/careers" className="font-medium text-signal underline underline-offset-4">current openings</Link>.
                </p>
              )}

              <Section id="about" title="About the role">
                <div className="space-y-4 text-[17px] leading-relaxed text-ink/75">
                  {job.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Section>

              <Section id="work" title="What you will do">
                <div className="grid gap-5">
                  {job.responsibilities.map((r, i) => (
                    <div key={r.title} className="rounded-[24px] border border-ink/10 bg-white p-6 sm:p-7">
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
                        <span className="display text-xl font-semibold">{r.title}</span>
                      </p>
                      <div className="mt-4">
                        <List items={r.items} />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="you" title="Who we are looking for">
                <h3 className="eyebrow mb-4 text-ink/50">You must have</h3>
                <List items={job.mustHave} />
                <h3 className="eyebrow mb-4 mt-10 text-ink/50">Nice to have</h3>
                <List items={job.niceToHave} tone="plus" />
                <h3 className="eyebrow mb-4 mt-10 text-ink/50">This role is probably not for you if</h3>
                <List items={job.notForYou} tone="no" />
              </Section>

              <Section id="growth" title="What you will learn">
                <List items={job.growth} />
                <div className="mt-8 rounded-[24px] bg-ink p-6 text-paper sm:p-7">
                  <p className="eyebrow text-paper/50">Salary</p>
                  <p className="display mt-2 text-3xl font-semibold">{job.salary.label}</p>
                  <p className="mt-2 text-paper/60">{job.salary.note}</p>
                </div>
              </Section>

              <Section id="apply" title="How to apply">
                <p className="text-[17px] leading-relaxed text-ink/75">
                  Email <a href={apply} className="font-medium text-ink underline decoration-signal/40 underline-offset-4 hover:decoration-signal">{site.email}</a> with
                  the subject <span className="rounded-md bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[14px]">{job.apply.subject} – Your Name</span> and include:
                </p>
                <ol className="mt-5 space-y-3 text-[17px] leading-relaxed text-ink/75">
                  {job.apply.send.map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal font-mono text-xs font-bold text-paper">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                  {job.apply.optional.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/[0.08] text-ink/60">
                        <Mic className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <span className="font-medium text-ink">Optional: </span>
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-sm text-ink/50">Please write your note yourself. We want to hear your English, not an AI’s.</p>

                <h3 className="eyebrow mb-5 mt-12 text-ink/50">What happens next</h3>
                <ol className="relative space-y-6 border-l border-ink/10 pl-7">
                  {job.process.map((step, i) => (
                    <li key={step.title} className="relative">
                      <span className="absolute -left-[35px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-signal bg-paper" />
                      <p className="font-mono text-xs text-signal">Step {i + 1}</p>
                      <p className="display mt-1 text-lg font-semibold">{step.title}</p>
                      <p className="mt-1 leading-relaxed text-ink/65">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section id="faq" title="Questions">
                <div className="divide-y divide-ink/10 border-y border-ink/10">
                  {job.faq.map((f) => (
                    <details key={f.q} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span aria-hidden className="text-2xl font-light text-signal transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-ink/70">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Section>

              {job.open && (
                <div className="rounded-[28px] bg-ink p-8 text-paper sm:p-10">
                  <p className="display text-3xl font-semibold">Sounds like you?</p>
                  <p className="mt-3 max-w-xl text-paper/60">
                    Send your CV and a short note in English. We read every application and reply to everyone we shortlist.
                  </p>
                  <a href={apply} className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium transition-colors hover:bg-signal-600">
                    <Mail className="h-4 w-4" /> Apply for {job.title}
                  </a>
                </div>
              )}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <nav aria-label="On this page">
                  <p className="eyebrow mb-4 text-ink/45">On this page</p>
                  <ol className="space-y-2 text-sm">
                    {nav.map((n, i) => (
                      <li key={n.id}>
                        <a href={`#${n.id}`} className="flex gap-2.5 text-ink/60 transition-colors hover:text-signal">
                          <span className="font-mono text-ink/35">{String(i + 1).padStart(2, '0')}</span>
                          {n.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                {job.open && (
                  <div className="rounded-[24px] border border-ink/10 bg-white p-6">
                    <p className="display text-lg font-semibold">{job.title}</p>
                    <p className="mt-1 text-sm text-ink/55">{job.salary.label}</p>
                    <a href={apply} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-signal text-[15px] font-medium text-paper transition-colors hover:bg-signal-600">
                      <Mail className="h-4 w-4" /> Apply by email
                    </a>
                    <p className="mt-3 text-center text-xs text-ink/45">
                      {job.vacancies} opening · {job.validThrough ? `Apply by ${formatJobDate(job.validThrough)}` : 'Open until filled'}
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
