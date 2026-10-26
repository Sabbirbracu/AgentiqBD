import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { navLinks, services, site } from '@/lib/content';

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
              {services.map((sv) => (
                <li key={sv.id}>
                  <a href={`/#service-${sv.id}`} className="text-paper/75 transition-colors hover:text-signal-300">
                    {sv.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="eyebrow mb-5 text-paper/40">Company</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
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
              <li>{site.location}</li>
              <li>
                <a href={site.url} className="transition-colors hover:text-signal-300">
                  www.agentiqbd.com
                </a>
              </li>
              {site.social.map((so) => (
                <li key={so.label}>
                  <a href={so.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal-300">
                    {so.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* oversized wordmark */}
        <p
          aria-hidden
          className="display mt-16 select-none text-center text-[19vw] font-extrabold uppercase leading-[0.8] tracking-[0.02em] text-transparent [-webkit-text-stroke:1px_rgba(252,252,244,0.12)] sm:text-[15vw]"
        >
          Agentiq
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
