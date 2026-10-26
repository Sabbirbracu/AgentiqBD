import { ArrowUpRight, Factory } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/ui/spotlight';
import { industries, sectionNo, site } from '@/lib/content';

/* ── Custom graphics, one per industry. Static, decorative and aria-hidden; brand colours only. ── */

const mono = 'font-mono';

/** Industrial: a production line from procurement to dispatch, with a shortage caught early. */
function IndustrialArt() {
  const nodes = [
    ['Procure', 36],
    ['Produce', 106],
    ['Inspect', 176],
    ['Dispatch', 246],
  ] as const;
  return (
    <svg viewBox="0 0 280 90" className="h-full w-full" fill="none">
      <path d="M60 58 H232" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4 5" />
      {nodes.map(([label, x], i) => (
        <g key={label}>
          <rect x={x - 29} y="42" width="58" height="32" rx="9" className={i === 1 ? 'fill-signal' : 'fill-white/10'} />
          <text x={x} y="62" textAnchor="middle" fontSize="10.5" className={`${mono} ${i === 1 ? 'fill-paper' : 'fill-paper/70'}`}>
            {label}
          </text>
        </g>
      ))}
      <rect x="40" y="6" width="132" height="24" rx="12" className="fill-signal/20" />
      <circle cx="55" cy="18" r="3.5" className="fill-signal" />
      <text x="65" y="21.5" fontSize="10.5" className={`${mono} fill-signal-300`}>Shortage flagged</text>
      <path d="M106 30 V42" stroke="#E84F3D" strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  );
}

/** SMEs: a lead funnel from enquiry to won. */
function SmeArt() {
  const bars = [
    ['Leads', 270, 'fill-ink/10'],
    ['Qualified', 200, 'fill-ink/15'],
    ['Follow-up', 130, 'fill-ink/25'],
    ['Won', 70, 'fill-signal'],
  ] as const;
  return (
    <svg viewBox="0 0 320 112" className="h-full w-full">
      {bars.map(([label, w, fill], i) => (
        <g key={label}>
          <rect x={(320 - w) / 2} y={8 + i * 26} width={w} height="20" rx="10" className={fill} />
          <text x="160" y={22 + i * 26} textAnchor="middle" fontSize="10" className={`${mono} ${i === 3 ? 'fill-paper' : 'fill-ink/60'}`}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Healthcare: a heartbeat line beside a booked appointment. */
function HealthArt() {
  return (
    <svg viewBox="0 0 320 112" className="h-full w-full" fill="none">
      {[28, 56, 84].map((y) => (
        <path key={y} d={`M0 ${y} H320`} className="stroke-ink/[0.06]" />
      ))}
      <path
        d="M10 62 H64 L74 62 L84 28 L98 92 L110 50 L120 62 H168"
        stroke="#E84F3D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="190" y="30" width="112" height="52" rx="12" className="fill-paper stroke-ink/15" />
      <text x="204" y="52" fontSize="10" className={`${mono} fill-ink/45`}>Thu · 10:30</text>
      <circle cx="209" cy="68" r="4" className="fill-signal" />
      <text x="218" y="71.5" fontSize="11" fontWeight="600" className="fill-ink">Booked</text>
    </svg>
  );
}

/** Education: a batch roster with attendance, beside a graduation cap. */
function EduArt() {
  const rows = [
    { y: 14, present: true },
    { y: 44, present: true },
    { y: 74, present: false },
  ];
  return (
    <svg viewBox="0 0 320 112" className="h-full w-full" fill="none">
      {rows.map(({ y, present }, i) => (
        <g key={y}>
          {i > 0 && <path d={`M22 ${y - 3} H206`} className="stroke-ink/[0.07]" />}
          <circle cx="34" cy={y + 12} r="11" className="fill-ink/15" />
          <circle cx="34" cy={y + 9} r="3.5" className="fill-ink/40" />
          <path d={`M27 ${y + 19} a7 5 0 0 1 14 0`} className="fill-ink/40" />
          <rect x="54" y={y + 5} width="72" height="6" rx="3" className="fill-ink/25" />
          <rect x="54" y={y + 16} width="46" height="5" rx="2.5" className="fill-ink/10" />
          {present ? (
            <>
              <circle cx="190" cy={y + 12} r="10" className="fill-signal" />
              <path d={`M185 ${y + 12} l4 4 l7 -8`} stroke="#FCFCF4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <circle cx="190" cy={y + 12} r="10" className="stroke-ink/30" strokeWidth="1.8" strokeDasharray="3 3" />
          )}
        </g>
      ))}
      {/* graduation cap */}
      <g transform="translate(222 22)">
        <path d="M38 6 L76 22 L38 38 L0 22 Z" className="fill-ink" />
        <path d="M14 31 V47 C14 52 26 57 38 57 S62 52 62 47 V31 L38 41 Z" className="fill-ink/80" />
        <path d="M72 24 V46" stroke="#E84F3D" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="72" cy="50" r="3.5" className="fill-signal" />
      </g>
    </svg>
  );
}

/** Real estate: a skyline with a viewing booked. */
function EstateArt() {
  const blds = [
    [26, 52, 34],
    [66, 30, 40],
    [112, 64, 30],
    [148, 40, 36],
    [190, 56, 32],
    [228, 24, 44],
  ] as const;
  return (
    <svg viewBox="0 0 320 112" className="h-full w-full">
      {blds.map(([x, y, w], i) => (
        <g key={x}>
          <rect x={x} y={100 - y} width={w} height={y} rx="3" className={i === 1 ? 'fill-ink' : 'fill-ink/15'} />
          {[0, 1, 2].map((k) => (
            <rect key={k} x={x + 7} y={100 - y + 8 + k * 14} width="6" height="6" rx="1" className={i === 1 ? 'fill-paper/50' : 'fill-paper'} />
          ))}
        </g>
      ))}
      <path d="M0 100 H320" className="stroke-ink/15" />
      <g>
        <rect x="150" y="4" width="112" height="22" rx="11" className="fill-paper stroke-ink/15" />
        <circle cx="164" cy="15" r="4" className="fill-signal" />
        <text x="173" y="18.5" fontSize="10" className={`${mono} fill-ink/70`}>Viewing booked</text>
      </g>
    </svg>
  );
}

/** Hospitality: a confirmed booking and a guest request noted. */
function HotelArt() {
  return (
    <svg viewBox="0 0 320 112" className="h-full w-full" fill="none">
      <rect x="18" y="12" width="176" height="88" rx="14" className="fill-paper stroke-ink/15" />
      <circle cx="42" cy="34" r="10" className="fill-signal" />
      <path d="M37 34 l4 4 l7 -8" stroke="#FCFCF4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="38" fontSize="11.5" fontWeight="600" className="fill-ink">Booking confirmed</text>
      <path d="M32 52 H180" className="stroke-ink/10" />
      <text x="34" y="68" fontSize="9" className={`${mono} fill-ink/45`}>CHECK-IN</text>
      <text x="34" y="85" fontSize="12" fontWeight="600" className="fill-ink">Fri · 2 pm</text>
      <text x="110" y="68" fontSize="9" className={`${mono} fill-ink/45`}>CHECK-OUT</text>
      <text x="110" y="85" fontSize="12" fontWeight="600" className="fill-ink">Mon · 11 am</text>

      {/* concierge bell and the request it noted */}
      <circle cx="252" cy="36" r="22" className="fill-ink" />
      <rect x="248.5" y="20" width="7" height="4" rx="2" className="fill-paper" />
      <path d="M239 46 V41 a13 13 0 0 1 26 0 V46 L268 50 H236 Z" className="fill-paper" />
      <circle cx="252" cy="54" r="3" className="fill-signal" />
      <rect x="208" y="70" width="98" height="26" rx="13" className="fill-signal" />
      <text x="257" y="86.5" textAnchor="middle" fontSize="10" className={`${mono} fill-paper`}>Request noted</text>
    </svg>
  );
}

/** Logistics: a route with a shipment in transit. */
function LogisticsArt() {
  return (
    <svg viewBox="0 0 320 112" className="h-full w-full" fill="none">
      <path d="M36 82 C90 82 90 30 160 40 S250 70 284 28" className="stroke-ink/25" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
      <path d="M36 82 C90 82 90 30 140 38" stroke="#E84F3D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="82" r="7" className="fill-ink" />
      <circle cx="284" cy="28" r="7" className="fill-paper stroke-ink" strokeWidth="2" />
      <circle cx="140" cy="38" r="8" className="fill-signal" />
      <circle cx="140" cy="38" r="3" className="fill-paper" />
      <rect x="168" y="62" width="82" height="22" rx="11" className="fill-paper stroke-ink/15" />
      <text x="209" y="76.5" textAnchor="middle" fontSize="10" className={`${mono} fill-ink/70`}>In transit</text>
    </svg>
  );
}

const arts: Record<string, () => ReactNode> = {
  'Industrial AI': () => <IndustrialArt />,
  SMEs: () => <SmeArt />,
  Healthcare: () => <HealthArt />,
  Education: () => <EduArt />,
  'Real estate': () => <EstateArt />,
  Hospitality: () => <HotelArt />,
  Logistics: () => <LogisticsArt />,
};

export function Industries() {
  const [featured, ...rest] = industries;
  return (
    <section id="industries" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={sectionNo('industries')}
          label="Industries we serve"
          title={
            <>
              From the factory floor to{' '}
              <span className="accent-serif text-signal">the front desk.</span>
            </>
          }
        >
          The sectors we are focused on, and the kind of work we do in each.
        </SectionHeading>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* featured: industrial AI */}
          <Reveal className="md:col-span-2 lg:col-span-3">
            <SpotlightCard className="grain relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-signal/20 blur-[110px]" />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-signal px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
                    <Factory className="h-3.5 w-3.5" /> {featured.short}
                  </span>
                  <h3 className="display text-balance text-3xl font-semibold leading-[1.05] sm:text-5xl">
                    {featured.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-paper/65">
                    {featured.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <div aria-hidden className="h-24 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    {arts[featured.short]()}
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {featured.uses.map((u) => (
                      <li
                        key={u}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[15px]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {rest.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 0.08}>
              <SpotlightCard className="group flex h-full flex-col rounded-[24px] border border-ink/10 bg-paper-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/25">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink/55">
                    {ind.short}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                </div>

                <div aria-hidden className="mb-6 h-28 overflow-hidden rounded-2xl border border-ink/[0.07] bg-paper px-3 py-2">
                  {arts[ind.short]()}
                </div>

                <h3 className="display text-2xl font-semibold leading-tight">{ind.name}</h3>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink/60">{ind.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ind.uses.map((u) => (
                    <li key={u} className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-[13px] text-ink/70">
                      {u}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* closing call to action */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-ink/10 bg-paper-200/60 p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-xl">
              <p className="display text-balance text-2xl font-semibold leading-tight sm:text-3xl">
                Don’t see your industry?
              </p>
              <p className="mt-2 text-pretty leading-relaxed text-ink/60">
                Tell us what slows your team down. We will tell you honestly whether we can help.
              </p>
            </div>
            <a
              href={site.bookingUrl || '/#contact'}
              {...(site.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-signal px-8 text-base font-medium text-paper shadow-[0_10px_30px_-10px_rgba(232,79,61,0.7)] transition-colors hover:bg-signal-600"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
