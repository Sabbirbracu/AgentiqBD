import { Logo } from '@/components/brand/logo';
import { navLinks, site } from '@/lib/content';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x border-t border-white/10 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-paper/55">
              {site.tagline}. AI engineering and intelligent business systems — built from
              Bangladesh, serving businesses globally.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-5 text-paper/40">Explore</p>
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
          <p className="font-mono text-xs uppercase tracking-[0.14em]">AI Systems · Built to Work</p>
        </div>
      </div>
    </footer>
  );
}
