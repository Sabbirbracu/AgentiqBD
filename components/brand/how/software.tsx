'use client';

import { Check, ClipboardCheck, Code2, GitBranch, Lock, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ease, glass, hotGlass, Label, phaseTracker, Rise, Shell, Spinner, StepTracker, Tick, useLoop } from './kit';

/**
 * Custom software & SaaS: one product taken from scope to live. The must-haves are agreed, the screens
 * are wireframed, code streams in while the real interface fills the frame, and the release goes through
 * build, tests, staging and your approval to live. Product names, data and code are samples.
 */

type Product = {
  name: string;
  app: string;
  url: string;
  phone?: boolean;
  scope: string[];
  nav: string[];
  title: string;
  cta: string;
  kpis: [string, string][];
  rows: [string, string, string][];
  code: string[];
};

const products: Product[] = [
  {
    name: 'Web app',
    app: 'School portal',
    url: 'portal.yourschool.com',
    scope: ['Parents sign in with a phone number', 'Pay fees by bKash or card', 'Results and notices in one place'],
    nav: ['Dashboard', 'Fees', 'Results', 'Notices'],
    title: 'Fees · Class 6-B',
    cta: 'Pay ৳4,500',
    kpis: [
      ['Due now', '৳4,500'],
      ['Paid this year', '৳36,000'],
      ['Next due', '10 Dec'],
    ],
    rows: [
      ['November fee', '৳4,500', 'Due'],
      ['October fee', '৳4,500', 'Paid'],
      ['Exam fee', '৳1,200', 'Paid'],
    ],
    code: ['export function FeesPage() {', '  const dues = useDues(student.id);', '  return <PayButton via="bKash"', '    amount={dues.total} />;', '}'],
  },
  {
    name: 'SaaS platform',
    app: 'Clinic platform',
    url: 'app.yourclinic.com',
    scope: ['Each clinic gets its own workspace', 'Doctors write e-prescriptions', 'Monthly plans with billing'],
    nav: ['Patients', 'Prescriptions', 'Billing', 'Settings'],
    title: 'Prescriptions',
    cta: 'New prescription',
    kpis: [
      ['Today', '38'],
      ['This month', '812'],
      ['Clinics', '14'],
    ],
    rows: [
      ['Rahim U.', 'Dr. Nasrin', 'Sent'],
      ['Selina A.', 'Dr. Kabir', 'Draft'],
      ['Hasan M.', 'Dr. Nasrin', 'Sent'],
    ],
    code: ['const clinic = await tenant(req);', 'const rx = await prescriptions.create({', '  clinic, patient, medicines,', '});', "await notify(patient, 'Prescription ready');"],
  },
  {
    name: 'Mobile app',
    app: 'Driver app',
    url: 'Android · iOS',
    phone: true,
    scope: ['Works offline on the road', 'Photo and signature on delivery', 'Live location for dispatch'],
    nav: [],
    title: 'Today · 12 drops',
    cta: 'Capture proof of delivery',
    kpis: [],
    rows: [
      ['Order #5521', 'Mirpur 10 · 2.1 km', 'Next'],
      ['Order #5524', 'Kazipara · 3.4 km', 'Queued'],
      ['Order #5530', 'Shewrapara · 4.0 km', 'Queued'],
    ],
    code: ['<DeliveryList data={drops} />', '<Camera onCapture={saveProof} />', 'queue.syncWhenOnline(proofs);', "location.share({ every: '30s' });"],
  },
  {
    name: 'Internal tool',
    app: 'Stock back office',
    url: 'ops.yourcompany.com',
    scope: ['One stock view for 5 branches', 'Transfers with manager approval', 'Low-stock email every morning'],
    nav: ['Stock', 'Transfers', 'Reports', 'Users'],
    title: 'Stock by branch',
    cta: 'New transfer',
    kpis: [
      ['Items', '2,340'],
      ['Low stock', '9'],
      ['Transfers', '6'],
    ],
    rows: [
      ['Gulshan', '612 items', 'OK'],
      ['Mirpur', '488 items', 'Low'],
      ['Uttara', '530 items', 'OK'],
    ],
    code: ['const stock = await db.stock.byBranch();', 'const low = flagLow(stock, rules.min);', "schedule('07:00', () =>", '  email(managers, report(low)));'],
  },
];

/* Phases: scope, design, build, deploy, hold. */
const durations = [2600, 2400, 3600, 3400, 2600] as const;
const phaseSteps = [0, 1, 2, 3, 4] as const;

/** Light syntax colouring: keywords, strings, calls and JSX tags. */
function Code({ line }: { line: string }) {
  const parts = line.split(/('[^']*'|"[^"]*"|\b(?:const|await|return|export|function)\b|<\/?\w+|\w+(?=\())/g);
  return (
    <>
      {parts.map((t, i) =>
        !t ? null : /^['"]/.test(t) ? (
          <span key={i} className="text-emerald-300">{t}</span>
        ) : /^(const|await|return|export|function)$/.test(t) ? (
          <span key={i} className="text-signal-300">{t}</span>
        ) : /^<\/?\w/.test(t) ? (
          <span key={i} className="text-[#9DB7C9]">{t}</span>
        ) : /^\w+$/.test(t) && line.includes(`${t}(`) ? (
          <span key={i} className="text-[#E8C99A]">{t}</span>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
    </>
  );
}

/** A box that is a dashed wireframe in design and a filled block once built. */
function Block({ wire, className, children }: { wire: boolean; className?: string; children?: React.ReactNode }) {
  return <div className={cn('rounded-md', wire ? 'border border-dashed border-ink/25 bg-transparent' : '', className)}>{wire ? null : children}</div>;
}

function Screen({ pr, mode, k }: { pr: Product; mode: 'scope' | 'wire' | 'real'; k: string }) {
  const wire = mode === 'wire';
  const real = mode === 'real';
  const fade = (i: number) => ({ k: `${k}-${mode}-${i}`, delay: real ? 0.5 + i * 0.35 : wire ? i * 0.12 : 0 });

  if (mode === 'scope')
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#F6F6EF] text-ink/50" style={{ backgroundImage: 'radial-gradient(rgba(10,10,11,0.07) 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        <ClipboardCheck className="h-7 w-7" />
        <p className="text-[12px] font-medium">Scoping version 1 with you</p>
      </div>
    );

  if (pr.phone)
    return (
      <div className="flex h-full flex-col bg-[#F6F6EF] p-3 text-ink">
        <Rise {...fade(0)}>
          <Block wire={wire} className="flex h-9 items-center justify-between bg-ink px-3 text-[11px] font-semibold text-paper">
            {pr.title}
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </Block>
        </Rise>
        <div className="mt-3 flex-1 space-y-2">
          {pr.rows.map((r, i) => (
            <Rise key={r[0]} {...fade(i + 1)}>
              <Block wire={wire} className="flex h-12 items-center justify-between bg-white px-3 shadow-sm">
                <span>
                  <span className="block text-[11px] font-semibold">{r[0]}</span>
                  <span className="block text-[10px] text-ink/50">{r[1]}</span>
                </span>
                <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-semibold', r[2] === 'Next' ? 'bg-signal text-white' : 'bg-ink/[0.06] text-ink/50')}>{r[2]}</span>
              </Block>
            </Rise>
          ))}
        </div>
        <Rise {...fade(4)}>
          <Block wire={wire} className="flex h-10 items-center justify-center bg-signal text-[11px] font-semibold text-white">
            {pr.cta}
          </Block>
        </Rise>
      </div>
    );

  return (
    <div className="flex h-full bg-[#F6F6EF] text-ink">
      <Rise {...fade(0)} className="h-full w-[28%] shrink-0 p-2">
        <Block wire={wire} className="h-full bg-ink p-2.5 text-paper">
          <p className="text-[11px] font-semibold">{pr.app}</p>
          <ul className="mt-3 space-y-1">
            {pr.nav.map((n, i) => (
              <li key={n} className={cn('rounded px-2 py-1 text-[10px]', i === 1 ? 'bg-white/10 text-paper' : 'text-paper/50')}>
                {n}
              </li>
            ))}
          </ul>
        </Block>
      </Rise>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-2 pl-0">
        <Rise {...fade(1)}>
          <Block wire={wire} className="flex h-8 items-center justify-between px-1">
            <span className="text-[12px] font-semibold">{pr.title}</span>
            <span className="rounded-md bg-signal px-2 py-1 text-[9.5px] font-semibold text-white">{pr.cta}</span>
          </Block>
        </Rise>
        <div className="grid grid-cols-3 gap-2">
          {pr.kpis.map(([l, v], i) => (
            <Rise key={l} {...fade(2 + i * 0.3)}>
              <Block wire={wire} className="h-14 bg-white p-2 shadow-sm">
                <span className="block text-[9px] text-ink/45">{l}</span>
                <span className="mt-1 block text-[13px] font-semibold">{v}</span>
              </Block>
            </Rise>
          ))}
        </div>
        <Rise {...fade(3)} className="flex-1">
          <Block wire={wire} className="h-full bg-white p-2 shadow-sm">
            {pr.rows.map((r) => (
              <div key={r[0]} className="flex items-center justify-between border-b border-ink/[0.06] py-1.5 text-[10px] last:border-0">
                <span className="w-2/5 truncate font-medium">{r[0]}</span>
                <span className="w-1/3 truncate text-ink/55">{r[1]}</span>
                <span className={cn('rounded-full px-1.5 py-px text-[9px] font-semibold', /Due|Low|Draft/.test(r[2]) ? 'bg-signal/15 text-signal-600' : 'bg-emerald-500/15 text-emerald-700')}>{r[2]}</span>
              </div>
            ))}
          </Block>
        </Rise>
      </div>
    </div>
  );
}

/** Shows `before` until `at` seconds, then `after` (both kept in place so nothing jumps). */
function Then({ at, before, after }: { at: number; before: React.ReactNode; after: React.ReactNode }) {
  return (
    <span className="relative inline-flex">
      <motion.span className="inline-flex" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: at, duration: 0.15 }}>
        {before}
      </motion.span>
      <motion.span className="absolute inset-0 inline-flex" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: at, duration: 0.3, ease }}>
        {after}
      </motion.span>
    </span>
  );
}

const pipeline = [
  { name: 'Build', phase: 2, at: 1.2 },
  { name: 'Automated tests', phase: 2, at: 2.6 },
  { name: 'Staging', phase: 3, at: 0.6 },
  { name: 'Your approval', phase: 3, at: 1.6 },
  { name: 'Live', phase: 3, at: 2.4 },
];

export function SoftwareArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, products.length);
  const pr = products[loop.tab];
  const p = loop.phase;
  const k = `${loop.tab}`;
  const mode = p === 0 ? 'scope' : p === 1 ? 'wire' : 'real';
  const live = p >= 4;

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: a software product scoped, wireframed, built while the interface fills in, then released through build, tests, staging and client approval"
      prompt="Pick a product · watch it get built"
      tabs={products.map((x) => x.name)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,16rem)] lg:items-start">
        {/* scope and code */}
        <div className="space-y-4">
          <div className={cn('p-4 transition-colors duration-500', p === 0 ? hotGlass : glass)}>
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-semibold">Version 1 scope</p>
              {p >= 1 && <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300">Agreed</span>}
            </div>
            <ul className="mt-3 space-y-2">
              {pr.scope.map((s, i) => (
                <li key={`${k}-${s}`} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-paper/85">
                  {p === 0 ? <Then at={0.5 + i * 0.5} before={<span className="mt-0.5 h-4 w-4 rounded-full border border-white/25" />} after={<Tick className="mt-0.5" />} /> : <Tick className="mt-0.5" />}
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className={cn('overflow-hidden transition-colors duration-500', p === 2 ? hotGlass : glass)}>
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
              <Code2 className="h-3.5 w-3.5 text-paper/50" />
              <Label>{pr.phone ? 'app.tsx' : 'page.tsx'}</Label>
              {p === 2 && <Spinner className="ml-auto" />}
            </div>
            <div className="min-h-[132px] overflow-hidden px-4 py-3 font-mono text-[10.5px] leading-[1.7] text-paper/80">
              {p < 2 ? (
                <span className="text-paper/30">{p === 0 ? '// waiting for the scope' : '// waiting for design sign-off'}</span>
              ) : (
                pr.code.map((line, i) => (
                  <Rise key={`${k}-c${i}`} delay={p === 2 ? 0.2 + i * 0.45 : 0} y={2} className="whitespace-pre">
                    <span className="mr-3 select-none text-paper/20">{i + 1}</span>
                    <Code line={line} />
                  </Rise>
                ))
              )}
            </div>
          </div>
        </div>

        {/* the product taking shape */}
        <div className="relative">
          <span aria-hidden className="absolute -inset-4 rounded-[40px] bg-signal/15 blur-3xl" />
          {pr.phone ? (
            <div className="relative mx-auto w-[230px] rounded-[38px] border border-white/15 bg-[#0c0c0e] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-white/10" />
              <div className="h-[400px] overflow-hidden rounded-[28px]">
                <Screen pr={pr} mode={mode} k={k} />
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0c0c0e] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  ))}
                </span>
                <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[10.5px] text-paper/55">
                  {live && <Lock className="h-3 w-3 text-emerald-400" />}
                  <span className="truncate">{pr.url}</span>
                </span>
                <span className={cn('rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors', live ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/[0.06] text-paper/40')}>
                  {live ? 'Live' : p === 3 ? 'Staging' : p === 2 ? 'Dev' : p === 1 ? 'Prototype' : 'Scope'}
                </span>
              </div>
              <div className="h-[330px]">
                <Screen pr={pr} mode={mode} k={k} />
              </div>
            </div>
          )}
          <Label className="relative mt-3 text-center">
            {pr.app} · {p === 0 ? 'scoping' : p === 1 ? 'clickable prototype' : p === 2 ? 'built in stages' : p === 3 ? 'releasing' : 'live and monitored'}
          </Label>
        </div>

        {/* release pipeline */}
        <div className={cn('p-4 transition-colors duration-500', p === 3 ? hotGlass : glass)}>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-paper/60" />
            <p className="text-[13.5px] font-semibold">Release v1.0</p>
          </div>
          <ol className="relative mt-4 space-y-3.5 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-white/10">
            {pipeline.map((st) => {
              const done = p > st.phase;
              const running = p === st.phase;
              const icon = done ? (
                <Tick />
              ) : running ? (
                <Then at={st.at} before={<Spinner className="h-4 w-4" />} after={<Tick />} />
              ) : (
                <span className="h-4 w-4 rounded-full border border-white/20 bg-ink" />
              );
              return (
                <li key={st.name} className="relative flex items-center gap-3 text-[12.5px]">
                  {icon}
                  <span className={cn(done || running ? 'text-paper/90' : 'text-paper/40')}>{st.name}</span>
                  {st.name === 'Your approval' && running && (
                    <motion.span
                      className="ml-auto rounded-full bg-signal px-2.5 py-0.5 text-[10.5px] font-semibold text-paper"
                      animate={{ scale: [1, 1, 0.88, 1] }}
                      transition={{ duration: 1.6, times: [0, 0.6, 0.8, 1] }}
                    >
                      Approve
                    </motion.span>
                  )}
                  {st.name === 'Live' && (done || running) && (
                    <span className="ml-auto">
                      <Rocket className="h-3.5 w-3.5 text-signal-300" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-black/25 p-3">
            <Label>After launch</Label>
            <div className="mt-2 flex items-center gap-2 text-[12px]">
              {live ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-paper/80">Monitoring · all checks passing</span>
                </>
              ) : (
                <span className="text-paper/35">Monitoring starts at launch</span>
              )}
            </div>
            <svg viewBox="0 0 200 28" className="mt-2 block h-6 w-full" aria-hidden>
              <motion.path
                key={`${k}-${live}`}
                d="M0 16 H60 L66 6 L72 24 L78 12 L84 16 H130 L136 8 L142 22 L148 16 H200"
                fill="none"
                stroke={live ? '#34d399' : 'rgba(252,252,244,0.15)'}
                strokeWidth="1.5"
                initial={loop.reduce || !live ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
              />
            </svg>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-paper/45">
            <Check className="h-3 w-3" /> Docs and support plan included
          </p>
        </div>
      </div>
    </Shell>
  );
}
