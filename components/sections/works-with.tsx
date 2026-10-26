import {
  Database,
  FileText,
  Globe,
  Phone,
  Plug,
  type LucideIcon,
} from 'lucide-react';
import {
  siAndroid,
  siConvex,
  siDocker,
  siFastapi,
  siGmail,
  siGooglecalendar,
  siGooglesheets,
  siHubspot,
  siMessenger,
  siMongodb,
  siMysql,
  siNextdotjs,
  siOdoo,
  siPostgresql,
  siPython,
  siReact,
  siSap,
  siShopify,
  siStripe,
  siSupabase,
  siTelegram,
  siTypescript,
  siWhatsapp,
  siWordpress,
  siZoho,
} from 'simple-icons';
import { Reveal } from '@/components/ui/reveal';
import { worksWith } from '@/lib/content';

/** Generic icons for categories with no single brand. */
const icons: Record<string, LucideIcon> = {
  globe: Globe,
  voice: Phone,
  documents: FileText,
  api: Plug,
  database: Database,
};

/** Real brand logos, drawn in their official colour on a light tile (so dark logos stay legible). */
const brands: Record<string, { path: string; hex: string; title: string }> = {
  whatsapp: siWhatsapp,
  messenger: siMessenger,
  gmail: siGmail,
  telegram: siTelegram,
  googlecalendar: siGooglecalendar,
  android: siAndroid,
  hubspot: siHubspot,
  zoho: siZoho,
  odoo: siOdoo,
  sap: siSap,
  shopify: siShopify,
  wordpress: siWordpress,
  stripe: siStripe,
  googlesheets: siGooglesheets,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  supabase: siSupabase,
  convex: siConvex,
  python: siPython,
  fastapi: siFastapi,
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  docker: siDocker,
};

type Item = { name: string; note: string; brand?: string; icon?: string };

function Chip({ item }: { item: Item }) {
  const brand = item.brand ? brands[item.brand] : undefined;
  const Icon = icons[item.icon ?? ''] ?? Plug;
  return (
    <li className="group/chip flex shrink-0 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-3 pr-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08]">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
        {brand ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" role="img" aria-label={brand.title}>
            <path d={brand.path} fill={`#${brand.hex}`} />
          </svg>
        ) : (
          <Icon className="h-5 w-5 text-ink/70" strokeWidth={1.75} />
        )}
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[18px] font-semibold text-paper">{item.name}</span>
        <span className="mt-0.5 block text-[13px] text-paper/50">{item.note}</span>
      </span>
    </li>
  );
}

/** Two counter-moving rows of integrations, kept to the content width so they line up with the title.
 *  Hover pauses a row; reduced motion stops it. */
export function WorksWith() {
  return (
    <div id="works-with" className="relative isolate overflow-hidden bg-ink text-paper">
      {/* warm glow along the top of the dark band */}
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
              Technology &amp; integrations
            </p>
            <h2 className="display max-w-2xl text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02]">
              Built to connect with{' '}
              <span className="accent-serif text-flame">the systems you use.</span>
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
        <div className="container-x pb-16 sm:pb-20">
          <div className="space-y-4">
            {worksWith.rows.map((row, ri) => {
              const items = [...row.items] as Item[];
              return (
                <div
                  key={row.label}
                  className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
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
        </div>
      </Reveal>
      <p className="container-x -mt-8 pb-12 text-xs leading-relaxed text-paper/35 sm:-mt-10">
        Logos are trademarks of their respective owners and are shown to indicate technologies we
        build with or connect to. No endorsement or partnership is implied.
      </p>
    </div>
  );
}
