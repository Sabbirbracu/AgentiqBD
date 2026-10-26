import { AlertTriangle, BarChart3, Boxes, Factory, Headset, PackageSearch, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { agenticore } from '@/lib/content';

const moduleIcons = [Boxes, Factory, PackageSearch, Headset, BarChart3];
const bars = [62, 48, 71, 55, 83, 40, 66, 28, 74, 58, 69, 45];

export function BusinessSystems() {
  return (
    <section id="agenticore" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            dark
            label="AgentiCore"
            title={
              <>
                Intelligent business systems,{' '}
                <span className="accent-serif text-signal">working as one.</span>
              </>
            }
          >
            Inventory, production, procurement, support and reporting usually live in separate
            tools. AgentiCore connects them through intelligent workflows, so an order, a shortage
            or a customer question reaches every team that needs to act.
          </SectionHeading>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {agenticore.modules.map((m, i) => {
                const Icon = moduleIcons[i];
                return (
                  <li
                    key={m.name}
                    className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold">{m.name}</span>
                      <span className="block text-[13px] text-paper/50">{m.stat}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* illustrative dashboard */}
        <Reveal delay={0.15} y={40}>
          <div className="relative">
            <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-white/20 via-transparent to-signal/30" />
            <div className="relative rounded-[28px] border border-white/10 bg-ink-800 p-5 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="eyebrow text-paper/45">Inventory overview</p>
                  <p className="display mt-1 text-2xl font-semibold">Stock health</p>
                </div>
                <span className="eyebrow rounded-full border border-white/10 px-3 py-1.5 text-paper/45">
                  Illustrative
                </span>
              </div>

              <div className="flex h-40 gap-2 sm:gap-3" aria-hidden>
                {bars.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end">
                    <div
                      className={`rounded-t-md ${h < 35 ? 'bg-signal' : 'bg-white/20'}`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-paper/30">
                <span>Item A</span>
                <span>Item L</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-3 rounded-2xl border border-signal/40 bg-signal/10 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal-300" />
                  <div>
                    <p className="text-[15px] font-medium">Projected shortage in ~6 days</p>
                    <p className="mt-0.5 text-sm text-paper/60">
                      Item H is below its safety level and an open order is delayed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-paper/70" />
                  <div>
                    <p className="text-[15px] font-medium">Draft purchase order ready</p>
                    <p className="mt-0.5 text-sm text-paper/60">
                      Prepared from supplier history. Waiting for your approval — nothing is sent
                      until you confirm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
