import {
  CalendarClock,
  Database,
  FileText,
  Globe,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Plug,
  Sheet,
  Users,
  Wrench,
  Factory,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { worksWith } from '@/lib/content';

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  whatsapp: MessageCircle,
  messenger: MessagesSquare,
  mail: Mail,
  voice: Phone,
  calendar: CalendarClock,
  crm: Users,
  erp: Factory,
  api: Plug,
  database: Database,
  documents: FileText,
  sheet: Sheet,
  tools: Wrench,
  dashboard: LayoutDashboard,
};

type Item = { name: string; note: string; icon: string };

function Chip({ item }: { item: Item }) {
  const Icon = icons[item.icon] ?? Plug;
  return (
    <li className="group/chip flex shrink-0 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-3 pr-6 transition-colors duration-300 hover:border-flame/60 hover:bg-white/[0.08]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-flame/15 text-flame ring-1 ring-flame/25 transition-colors duration-300 group-hover/chip:bg-flame group-hover/chip:text-paper">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[19px] font-semibold text-paper">{item.name}</span>
        <span className="mt-0.5 block text-[13px] text-paper/50">{item.note}</span>
      </span>
    </li>
  );
}

/** Two counter-moving rows of integrations. Hover pauses a row; reduced motion stops it. */
export function WorksWith() {
  return (
    <div id="works-with" className="relative isolate overflow-hidden bg-ink text-paper">
      {/* warm glow where the hero's river meets the dark band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(252,82,44,0.22),transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="container-x pb-14 pt-16 sm:pb-20 sm:pt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 text-paper/60">
              <span className="h-px w-8 bg-flame" />
              Works with
            </p>
            <h2 className="display max-w-2xl text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02]">
              Plugs into the tools{' '}
              <span className="accent-serif text-flame">you already run.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-pretty text-base leading-relaxed text-paper/60 sm:text-lg">
              {worksWith.description}
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15} y={20}>
        <div className="space-y-4 pb-16 sm:pb-20">
          {worksWith.rows.map((row, ri) => {
            const items = [...row.items] as Item[];
            return (
              <div
                key={row.label}
                className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
                aria-label={row.label}
              >
                <ul
                  className={`flex w-max gap-4 pr-4 ${
                    ri % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'
                  } group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
                >
                  {[...items, ...items].map((item, i) => (
                    <Chip key={`${item.name}-${i}`} item={item} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
