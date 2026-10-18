import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { HeroScene } from './hero-scene';
import { WorksWith } from './works-with';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-paper-50 text-ink">
      {/* One viewport: copy on top, the illustrated river scene anchored to the bottom edge. */}
      <div className="relative flex min-h-svh flex-col">
        <div className="container-x relative z-10 pt-[clamp(6.5rem,15.5svh,10rem)] text-center">
          <Reveal delay={0.06}>
            <h1 className="mx-auto max-w-5xl text-balance font-sans text-[clamp(2.6rem,min(6vw,10.65svh),5.75rem)] font-extrabold leading-[0.9] tracking-[-0.058em]">
              Turn complexity
              <br />
              into <span className="accent-serif text-[1.05em] tracking-[-0.03em] text-scarlet [-webkit-text-stroke:0.012em_currentColor]">intelligence.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-[clamp(1.1rem,2.65svh,1.9rem)] max-w-[54rem] text-pretty text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.5] text-[#2B2F3A]">
              AI Employees, workflow automation and AI-enabled business systems that plug
              <br className="hidden md:block" /> into the tools you already run — so your team can focus on the work only people can do.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-[clamp(1rem,2.53svh,2rem)] flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="#contact"
                className="h-[50px] gap-3 bg-flame px-[34px] text-base font-semibold hover:bg-flame-600 shadow-[0_12px_30px_-10px_rgba(252,82,44,0.75)]"
              >
                Start a project
              </ButtonLink>
              <ButtonLink href="#employees" variant="ghost" arrow={false} className="h-[50px] px-6 text-base">
                See an AI Employee at work
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* reserves the artwork's height under the copy, so the two never collide */}
        <div aria-hidden className="shrink-0" style={{ height: 'calc(max(100vw, 1040px) * 0.2302)' }} />

        <HeroScene />
      </div>

      <WorksWith />
    </section>
  );
}
