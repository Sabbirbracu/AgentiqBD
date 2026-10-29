import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { SocialIcon } from '@/components/ui/social-icon';
import { coreServices, navLinks, site } from '@/lib/content';

const partnerHref = `mailto:${site.email}?subject=${encodeURIComponent('Partnership enquiry')}`;
const careersHref = `mailto:${site.email}?subject=${encodeURIComponent('Career enquiry')}`;
const companyLinks = [...navLinks, { label: 'Blog', href: '/blog' }, { label: 'Become a partner', href: partnerHref }, { label: 'Careers', href: careersHref }];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x border-t border-white/10 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-paper/55">
              {site.tagline}. We engineer intelligent software, automate business workflows and
              integrate AI into everyday operations — built from Bangladesh, serving businesses
              globally.
            </p>
          </div>
          <nav aria-label="Services">
            <p className="eyebrow mb-5 text-paper/40">Services</p>
            <ul className="space-y-3">
              {coreServices.map((sv) => (
                <li key={sv.id}>
                  <Link href={`/services/${sv.id}`} className="text-paper/75 transition-colors hover:text-signal-300">
                    {sv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="eyebrow mb-5 text-paper/40">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-paper/75 transition-colors hover:text-signal-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-5 text-paper/40">Contact</p>
            <ul className="space-y-3 text-paper/75">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-signal-300">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:+88${site.phone}`} className="transition-colors hover:text-signal-300">
                  {site.phone}
                </a>
              </li>
              <li>{site.address}</li>
            </ul>
            <ul className="mt-6 flex gap-2.5" aria-label="Social media">
              {site.social.map((so) => (
                <li key={so.label}>
                  <a
                    href={so.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={so.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-signal text-paper transition-colors hover:bg-signal-600"
                  >
                    <SocialIcon kind={so.kind} className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* oversized wordmark */}
        <p
          aria-hidden
          className="display mt-16 select-none text-center text-[11vw] font-extrabold uppercase leading-[0.8] tracking-[0.02em] text-transparent [-webkit-text-stroke:1px_rgba(252,252,244,0.12)] sm:text-[8.5vw]"
        >
          Agentiq BD
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-paper/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Agentiq BD. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors hover:text-paper">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
