import { ArrowUpRight, CalendarClock, ScanSearch } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionNo, site } from '@/lib/content';

const auditMail = `mailto:${site.email}?subject=${encodeURIComponent('AI Business Audit request')}&body=${encodeURIComponent(
  'Hi Agentiq BD,\n\nI’d like an AI Business Audit.\n\nName:\nCompany:\nWhat the business does:\nWhat I’d like to improve:\n',
)}`;

const bookingMail = `mailto:${site.email}?subject=${encodeURIComponent('Discovery call request')}&body=${encodeURIComponent(
  'Hi Agentiq BD,\n\nI’d like to book a discovery call.\n\nName:\nCompany:\nPreferred times (with time zone):\nWhat I’d like to discuss:\n',
)}`;

const btn =
  'group inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8 text-base font-medium transition-colors';

export function Contact() {
  const discoveryHref = site.bookingUrl || bookingMail;
  const auditHref = site.auditUrl || auditMail;

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-signal/20 blur-[160px]" />

      <div className="container-x relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-14 text-center sm:px-14 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-signal/20 blur-[110px]" />

            <div className="relative">
              <SectionHeading
                dark
                align="center"
                index={sectionNo('contact')}
                label="Contact"
                title={
                  <>
                    Let’s make your business{' '}
                    <span className="accent-serif text-signal">work smarter.</span>
                  </>
                }
              >
                A short conversation is enough. We’ll come back with honest thoughts on what’s worth
                automating, what isn’t, and what a first prototype could look like.
              </SectionHeading>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={discoveryHref}
                  {...(site.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${btn} bg-signal text-paper shadow-[0_10px_30px_-10px_rgba(232,79,61,0.7)] hover:bg-signal-600`}
                >
                  <CalendarClock className="h-[18px] w-[18px]" />
                  Free Discovery Call
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={auditHref}
                  {...(site.auditUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${btn} border border-white/25 text-paper hover:border-white/60 hover:bg-white/5`}
                >
                  <ScanSearch className="h-[18px] w-[18px]" />
                  AI Business Audit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-paper/50">
                Not sure where to start? An AI Business Audit looks at how your business runs today and
                where AI or automation would actually help.
              </p>

              <p className="mt-8 text-sm text-paper/40">
                Prefer email?{' '}
                <a href={`mailto:${site.email}`} className="text-paper/70 underline-offset-4 hover:text-paper hover:underline">
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
