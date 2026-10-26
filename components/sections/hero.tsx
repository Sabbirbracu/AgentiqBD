import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { HeroScene } from './hero-scene';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-paper-50 text-ink">
      {/* One viewport: copy on top, the illustrated river scene anchored to the bottom edge. */}
      <div className="relative flex min-h-svh flex-col">
        <div className="container-x relative z-10 pt-[clamp(6.5rem,15.5svh,10rem)] text-center">
          <Reveal delay={0.06}>
            <h1 className="mx-auto max-w-5xl text-balance font-display text-[clamp(2.4rem,min(5.6vw,9.9svh),5rem)] font-bold leading-[1.04] tracking-[-0.022em]">
              Turn complexity
              <br />
              into <span className="accent-serif text-scarlet">intelligence.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-[clamp(1.1rem,2.65svh,1.9rem)] max-w-[54rem] text-pretty text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.5] text-[#2B2F3A]">
              We engineer intelligent software, automate business workflows,
              <br className="hidden md:block" /> and integrate AI into everyday operations.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-[clamp(1rem,2.53svh,2rem)] flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/#contact"
                className="h-[50px] gap-3 bg-flame px-[34px] text-base font-semibold hover:bg-flame-600 shadow-[0_12px_30px_-10px_rgba(252,82,44,0.75)]"
              >
                Start a Project
              </ButtonLink>
              <ButtonLink href="/#work" variant="ghost" arrow={false} className="h-[50px] px-6 text-base">
                Explore Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* reserves the artwork's height under the copy, so the two never collide */}
        <div aria-hidden className="shrink-0" style={{ height: 'calc(max(100vw, 1040px) * 0.2302)' }} />

        <HeroScene />
      </div>
    </section>
  );
}
