import type { Metadata } from 'next';
import { exportAssets } from '@/components/brand/agent/registry';

export const metadata: Metadata = { title: 'Brand graphics', robots: { index: false, follow: false } };

const groups = [
  { folder: '1 Agent icons', title: 'Agent icons', note: 'One tile per AI Employee role. Transparent, square — avatars, bullets, stickers.', scale: 0.35, dark: false },
  { folder: '2 Service visuals', title: 'Service visuals', note: 'One diagram per capability, light and dark. Transparent PNGs.', scale: 0.4, dark: false },
  { folder: '3 Facebook', title: 'Facebook', note: 'Profile pictures (1080²) and cover (1640×624).', scale: 0.3, dark: false },
  { folder: '4 Post templates', title: 'Post templates', note: '1080×1080 square posts, one per service.', scale: 0.3, dark: false },
];

/** Internal overview of every exportable graphic. Not linked from the site, not indexed. */
export default function BrandPage() {
  return (
    <main className="min-h-screen bg-paper-200 px-6 py-12 text-ink">
      <div className="mx-auto max-w-[1240px]">
        <h1 className="display text-4xl font-semibold">Agentiq brand graphics</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Source of truth for the agent icons, service visuals and social templates. Export everything to PNG
          with <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-sm">npm run export:brand</code> —
          files land in <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-sm">Brand Graphics/</code>.
        </p>

        {groups.map((g) => {
          const items = Object.entries(exportAssets).filter(([, a]) => a.folder === g.folder);
          return (
            <section key={g.folder} className="mt-14">
              <h2 className="display text-2xl font-semibold">{g.title}</h2>
              <p className="mt-1 text-sm text-ink/55">{g.note}</p>
              <div className={`mt-5 flex flex-wrap gap-5 rounded-3xl p-5 ${g.dark ? 'bg-ink' : 'bg-paper'}`}>
                {items.map(([name, a]) => (
                  <figure key={name}>
                    <div
                      className="overflow-hidden rounded-xl"
                      style={{ width: a.w * g.scale, height: a.h * g.scale }}
                    >
                      <div style={{ width: a.w, height: a.h, transform: `scale(${g.scale})`, transformOrigin: 'top left' }}>
                        {a.node}
                      </div>
                    </div>
                    <figcaption className={`mt-2 font-mono text-xs ${g.dark ? 'text-paper/60' : 'text-ink/55'}`}>
                      {name} · {a.w * a.scale}×{a.h * a.scale}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
