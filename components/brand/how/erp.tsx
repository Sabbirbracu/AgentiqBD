'use client';

import { Boxes, Database, Factory, ShoppingCart, Truck, Warehouse } from 'lucide-react';
import { motion } from 'motion/react';
import { Pip } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { CountUp, ease, glass, hotGlass, Label, phaseTracker, Rise, Shell, StepTracker, Tick, Typed, useLoop, Wire } from './kit';

/**
 * Industrial AI & ERP: the operation is mapped, procurement, inventory and production are built as
 * modules on one database, a goods receipt updates every module at once, and AI projects stock forward
 * to flag a shortage with a suggested purchase order. Sample values.
 */

type Plant = {
  name: string;
  material: string;
  unit: string;
  po: string;
  ordered: string;
  received: string;
  stockFrom: number;
  stockTo: number;
  run: string;
  need: string;
  insight: string;
  action: string;
  shortDay: number;
};

const plants: Plant[] = [
  {
    name: 'Pharma',
    material: 'Paracetamol API',
    unit: 'kg',
    po: 'PO-778',
    ordered: '500 kg',
    received: '480 kg received',
    stockFrom: 1120,
    stockTo: 1600,
    run: 'Batch B-221',
    need: '650 kg per batch',
    insight: 'At this batch rate, Paracetamol API falls below safety stock in 6 days.',
    action: 'Draft PO · 500 kg',
    shortDay: 6,
  },
  {
    name: 'Garments',
    material: 'Cotton fabric',
    unit: 'm',
    po: 'PO-312',
    ordered: '8,000 m',
    received: '8,000 m received',
    stockFrom: 6200,
    stockTo: 14200,
    run: 'Order · 5,000 polos',
    need: '1.6 m per piece',
    insight: 'Cutting for the polo order runs about 300 m short on day 4.',
    action: 'Draft PO · 500 m',
    shortDay: 4,
  },
  {
    name: 'Food',
    material: 'Sugar',
    unit: 'kg',
    po: 'PO-554',
    ordered: '1,500 kg',
    received: '1,500 kg received',
    stockFrom: 900,
    stockTo: 2400,
    run: 'Run 40 · biscuits',
    need: '320 kg per run',
    insight: 'Sugar drops below safety stock by Thursday at this run rate.',
    action: 'Draft PO · 1.5 t',
    shortDay: 5,
  },
  {
    name: 'Plastics',
    material: 'PP resin',
    unit: 'kg',
    po: 'PO-207',
    ordered: '3,000 kg',
    received: '3,000 kg received',
    stockFrom: 2400,
    stockTo: 5400,
    run: 'Mould run M-12',
    need: '900 kg per day',
    insight: 'At current output, PP resin runs out 4 days after this run.',
    action: 'Draft PO · 3 t',
    shortDay: 4,
  },
];

/* Phases: map the operation, build the modules, connect the data (goods receipt), AI on top, hold. */
const durations = [2200, 2400, 3200, 3800, 2400] as const;
const phaseSteps = [0, 1, 2, 3, 4] as const;

const flow = [
  { name: 'Supplier', Icon: Truck },
  { name: 'Store', Icon: Warehouse },
  { name: 'Production', Icon: Factory },
  { name: 'Dispatch', Icon: Boxes },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] py-2 text-[12px]">
      <span className="text-paper/45">{label}</span>
      <span className="truncate text-right text-paper/85">{children}</span>
    </div>
  );
}

function Module({ title, Icon, phase, hot, k, delay, children }: { title: string; Icon: typeof Truck; phase: number; hot: boolean; k: string; delay: number; children: React.ReactNode }) {
  const built = phase >= 1;
  return (
    <div className={cn('p-4 transition-colors duration-500', hot ? hotGlass : glass, !built && 'border-dashed bg-transparent')}>
      <div className="flex items-center gap-2.5">
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-[9px] transition-colors duration-500', hot ? 'bg-signal' : 'bg-[#2a2a30]')}>
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-[13.5px] font-semibold">{title}</p>
      </div>
      <div className="mt-3 min-h-[118px]">
        {built ? (
          <Rise k={k} delay={phase === 1 ? delay : 0}>
            {children}
          </Rise>
        ) : (
          <div className="space-y-2.5 pt-1">
            {[80, 60, 70].map((w) => (
              <span key={w} className="block h-2.5 rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Forecast({ shortDay, draw, reduce }: { shortDay: number; draw: boolean; reduce: boolean }) {
  // Ten days of projected stock, falling through the safety line on `shortDay`.
  const pts = Array.from({ length: 11 }, (_, d) => {
    const v = 92 - d * (52 / shortDay) + (d % 2 ? 3 : -2);
    return [16 + d * 26.8, 110 - Math.max(v, 6)] as const;
  });
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const cross = pts[shortDay];
  return (
    <svg viewBox="0 0 300 124" className="block h-auto w-full" aria-hidden>
      <line x1="10" x2="292" y1="70" y2="70" stroke="#F08272" strokeOpacity=".7" strokeDasharray="4 4" />
      <text x="292" y="64" textAnchor="end" fontSize="9" fill="#F08272" fillOpacity=".8" className="font-mono">
        SAFETY STOCK
      </text>
      <motion.path
        key={`${shortDay}-${draw}`}
        d={path}
        fill="none"
        stroke="#FCFCF4"
        strokeOpacity=".85"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce || !draw ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease }}
      />
      {draw && (
        <motion.g initial={reduce ? false : { opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, duration: 0.4 }} style={{ transformOrigin: `${cross[0]}px ${cross[1]}px` }}>
          <circle cx={cross[0]} cy={cross[1]} r="11" fill="#E84F3D" fillOpacity=".25" />
          <circle cx={cross[0]} cy={cross[1]} r="4.5" fill="#E84F3D" />
        </motion.g>
      )}
      <text x="16" y="122" fontSize="9" fill="#FCFCF4" fillOpacity=".4" className="font-mono">
        TODAY
      </text>
      <text x={cross[0]} y="122" textAnchor="middle" fontSize="9" fill="#F08272" className="font-mono">
        DAY {shortDay}
      </text>
    </svg>
  );
}

export function ErpArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, plants.length);
  const pl = plants[loop.tab];
  const p = loop.phase;
  const k = `${loop.tab}`;
  const syncing = p === 2;

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: procurement, inventory and production on one connected system, with a goods receipt updating every module and AI flagging a projected shortage"
      prompt="Pick an industry · watch one system run the floor"
      tabs={plants.map((x) => x.name)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      {/* the operation, mapped */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)]">
        {flow.map((n, i) => (
          <div key={n.name} className="contents">
            {i > 0 && <Wire lit={p >= 1 || loop.reduce} flowing={p === 0} runKey={`${loop.key}-f${i}`} delay={i * 0.35} />}
            <Rise k={`${k}-flow-${i}`} delay={p === 0 ? i * 0.3 : 0} className={cn('flex items-center gap-3 px-4 py-3', glass)}>
              <n.Icon className="h-4 w-4 text-paper/60" />
              <span className="text-[13px] text-paper/85">{n.name}</span>
              <Label className="ml-auto">0{i + 1}</Label>
            </Rise>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,20rem)]">
        <Module title="Procurement" Icon={ShoppingCart} phase={p} hot={syncing} k={`${k}-pr`} delay={0}>
          <Row label="Order">{pl.po}</Row>
          <Row label="Material">{pl.material}</Row>
          <Row label="Ordered">{pl.ordered}</Row>
          <Row label="Status">{p >= 2 ? <span className="text-emerald-300">{pl.received}</span> : 'Open'}</Row>
        </Module>

        <Module title="Inventory" Icon={Warehouse} phase={p} hot={syncing} k={`${k}-in`} delay={0.2}>
          <Label>{pl.material} · on hand</Label>
          <p className="display mt-1 text-[2rem] font-semibold leading-none">
            {p >= 2 ? (
              <CountUp key={`${k}-stock`} value={pl.stockTo.toLocaleString('en-US')} from={pl.stockFrom} ms={1400} delay={p === 2 ? 900 : 0} />
            ) : (
              pl.stockFrom.toLocaleString('en-US')
            )}
            <span className="ml-1 text-sm font-normal text-paper/50">{pl.unit}</span>
          </p>
          <Row label="Last movement">{p >= 2 ? `+ ${pl.ordered} · GRN` : '—'}</Row>
          <Row label="Location">Main store · bay 4</Row>
        </Module>

        <Module title="Production" Icon={Factory} phase={p} hot={syncing} k={`${k}-pd`} delay={0.4}>
          <Row label="Plan">{pl.run}</Row>
          <Row label="Needs">{pl.need}</Row>
          <Row label="Material">
            {p >= 2 ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <Tick className="h-3.5 w-3.5" /> Available
              </span>
            ) : (
              'Waiting for stock'
            )}
          </Row>
          <Row label="Start">{p >= 2 ? 'Cleared to start' : '—'}</Row>
        </Module>

        {/* AI on top */}
        <div className={cn('p-4 transition-colors duration-500 lg:row-span-2', p >= 3 ? hotGlass : glass, p < 3 && 'opacity-50')}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-ink ring-1 ring-white/15">
              <Pip bust="head" mood={p === 3 ? 'working' : p >= 4 ? 'happy' : 'idle'} className="w-8" title="Pip" />
            </span>
            <div>
              <Label className={p >= 3 ? 'text-signal-300' : undefined}>AI insight</Label>
              <p className="text-[13.5px] font-semibold">Stock forecast · {pl.material}</p>
            </div>
          </div>
          <div className="mt-3">
            <Forecast shortDay={pl.shortDay} draw={p >= 3} reduce={loop.reduce} />
          </div>
          <p className="mt-3 min-h-[3.2em] text-[12.5px] leading-snug text-paper/85">
            {p >= 3 ? p === 3 ? <Typed key={`${k}-ins`} text={pl.insight} ms={1500} delay={1800} /> : pl.insight : 'Pip watches every movement and projects stock forward.'}
          </p>
          <div className="mt-3 flex items-center gap-2">
            {p >= 3 && (
              <motion.span
                key={`${k}-btn`}
                className="rounded-full bg-signal px-3 py-1 text-[11.5px] font-semibold text-paper"
                initial={loop.reduce ? false : { opacity: 0, y: 4 }}
                animate={p === 3 ? { opacity: 1, y: 0, scale: [1, 1, 0.9, 1] } : { opacity: 1, y: 0 }}
                transition={{ delay: p === 3 ? 3 : 0, duration: 0.8, times: [0, 0.5, 0.75, 1] }}
              >
                {pl.action}
              </motion.span>
            )}
            {p >= 4 && (
              <Rise className="flex items-center gap-1.5 text-[11.5px] text-paper/70">
                <Tick className="h-3.5 w-3.5" /> Sent for approval
              </Rise>
            )}
          </div>
        </div>

        {/* one database */}
        <div className={cn('flex items-center gap-3 px-4 py-3 transition-colors duration-500 lg:col-span-3', syncing ? hotGlass : glass)}>
          <Database className={cn('h-4 w-4 shrink-0', syncing ? 'text-signal-300' : 'text-paper/50')} />
          <p className="text-[12.5px] text-paper/75">
            {p >= 2 ? (
              <>
                <span className="font-semibold text-paper">{pl.received}</span> · one entry updated purchasing, stock and production together
              </>
            ) : (
              'One shared database · every module reads the same stock'
            )}
          </p>
          {syncing && (
            <motion.span className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <motion.span className="block h-full w-1/2 rounded-full bg-signal" animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            </motion.span>
          )}
        </div>
      </div>
    </Shell>
  );
}
