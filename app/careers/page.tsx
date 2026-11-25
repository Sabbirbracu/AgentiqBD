import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Banknote, BriefcaseBusiness, GraduationCap, Languages, MapPin, Sprout, Target, Users } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/content';
import { openJobs } from '@/lib/careers';
import { formatJobDate } from '@/lib/careers-apply';
import { absoluteUrl, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';

const description =
  'Careers at Agentiq BD, an AI engineering and software company in Dhaka. See open roles, salary ranges and how to apply.';

export const metadata: Metadata = {
  title: 'Careers at Agentiq BD: Open Roles in Dhaka',
  description,
  alternates: { canonical: '/careers' },
  openGraph: { title: 'Careers · Agentiq BD', description, url: absoluteUrl('/careers'), type: 'website' },
};

const values = [
  {
    Icon: Sprout,
    title: 'Learn every week',
    text: 'We hire for attitude and teach the rest. You get real work, direct feedback and the room to get better at it.',
  },
  {
    Icon: Languages,
    title: 'English at work',
    text: 'We work with international clients, so you will write and speak English every day and get confident at it.',
  },
  {
    Icon: Target,
    title: 'Own your results',
    text: 'Small team, clear goals. You can see what your work changes, and you get credit for it.',
  },
];

export default function CareersPage() {
  const jobs = openJobs();
  const linkedin = site.social.find((s) => s.kind === 'linkedin')?.href;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Careers at Agentiq BD', description, path: '/careers' }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ]),
        ]}
      />
      <Navbar overDark />
      <main>
        <section className="grain relative overflow-hidden bg-ink pb-20 pt-32 text-paper sm:pb-28 sm:pt-40">
          <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[140px]" />
          <div className="container-x relative">
            <p className="eyebrow text-signal-300">Careers</p>
            <h1 className="display mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] sm:text-7xl">
              Start your career <span className="accent-serif text-signal">where AI meets real business.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-paper/65">
              We are a small team in Dhaka building AI systems and software for clients at home and abroad. We hire people who
              want to learn fast and grow with us.
            </p>

            <ul className="mt-14 grid gap-4 sm:grid-cols-3">
              {values.map(({ Icon, title, text }) => (
                <li key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal/15 text-signal-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="display mt-5 text-xl font-semibold">{title}</p>
                  <p className="mt-2 leading-relaxed text-paper/60">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="open-roles" className="bg-paper pb-24 pt-16 text-ink sm:pb-32 sm:pt-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-signal">Open roles</p>
                <h2 id="open-roles" className="display mt-3 text-4xl font-semibold sm:text-5xl">
                  {jobs.length === 1 ? 'One open role' : jobs.length ? `${jobs.length} open roles` : 'No open roles right now'}
                </h2>
              </div>
            </div>

            {jobs.length > 0 ? (
              <ul className="mt-10 space-y-5">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <Link
                      href={`/careers/${job.id}`}
                      className="group relative block overflow-hidden rounded-[28px] border border-ink/10 bg-white p-6 transition-all hover:border-signal/40 hover:shadow-[0_30px_60px_-30px_rgba(232,79,61,0.35)] sm:p-9"
                    >
                      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="rounded-full bg-signal px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-paper">Hiring</span>
                            <span className="eyebrow text-ink/50">{job.team}</span>
                          </div>
                          <h3 className="display mt-4 text-3xl font-semibold sm:text-4xl">{job.title}</h3>
                          <p className="mt-3 text-pretty text-lg leading-relaxed text-ink/65">{job.summary}</p>
                          <ul className="mt-6 flex flex-wrap gap-2 text-sm text-ink/70">
                            {[
                              { Icon: Banknote, text: job.salary.label },
                              { Icon: MapPin, text: 'Dhaka' },
                              { Icon: BriefcaseBusiness, text: job.employmentLabel },
                              { Icon: GraduationCap, text: job.experience },
                              { Icon: Users, text: `${job.vacancies} ${job.vacancies === 1 ? 'opening' : 'openings'}` },
                            ].map(({ Icon, text }) => (
                              <li key={text} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3.5 py-1.5">
                                <Icon className="h-4 w-4 text-signal" />
                                {text}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                          <span className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors group-hover:bg-signal">
                            View role &amp; apply
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                          <span className="text-sm text-ink/45">
                            Posted {formatJobDate(job.datePosted)}
                            {job.validThrough ? ` · Apply by ${formatJobDate(job.validThrough)}` : ' · Open until filled'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 max-w-2xl text-lg text-ink/65">We are not hiring at the moment. New roles will be posted on this page first.</p>
            )}

            <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-ink/10 bg-paper-200/50 p-6 sm:flex-row sm:items-center sm:p-8">
              <p className="max-w-xl text-ink/70">
                Not the right role for you? New openings are posted here first
                {linkedin ? ' and on our LinkedIn page' : ''}.
              </p>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 text-[15px] font-medium transition-colors hover:border-signal/40 hover:text-signal"
                >
                  Follow on LinkedIn
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
