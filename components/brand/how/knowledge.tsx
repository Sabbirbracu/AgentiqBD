'use client';

import { FileSpreadsheet, FileText, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Pip } from '@/components/brand/pip';
import { cn } from '@/lib/utils';
import { CountUp, ease, glass, hotGlass, Label, phaseTracker, Rise, Shell, StepTracker, Typed, useLoop, Wire } from './kit';

/**
 * AI knowledge base / RAG: documents are collected, split into passages and placed on a meaning map;
 * a question lands on the map, the closest passages light up, and Pip answers only from them, citing
 * each source. Documents, questions and answers are sample values.
 */

type Doc = { name: string; kind: 'PDF' | 'DOCX' | 'XLSX'; passages: number; locked?: string };
type DocSet = { name: string; docs: Doc[]; asker: string; question: string; answer: string; sources: [number, string][] };

const sets: DocSet[] = [
  {
    name: 'HR handbook',
    docs: [
      { name: 'HR handbook', kind: 'PDF', passages: 184 },
      { name: 'Leave policy', kind: 'DOCX', passages: 36 },
      { name: 'Payroll rules', kind: 'XLSX', passages: 52, locked: 'HR only' },
      { name: 'Code of conduct', kind: 'PDF', passages: 61 },
    ],
    asker: 'AH',
    question: 'How many casual leaves do I get a year?',
    answer: 'You get 10 days of casual leave a year [1]. Unused days do not carry over to the next year [2].',
    sources: [
      [1, '§3.1 Casual leave'],
      [0, 'p. 14 Leave rules'],
    ],
  },
  {
    name: 'Factory SOPs',
    docs: [
      { name: 'Cold chain SOP', kind: 'PDF', passages: 72 },
      { name: 'Line clearance', kind: 'DOCX', passages: 28 },
      { name: 'Audit checklist', kind: 'XLSX', passages: 44 },
      { name: 'Safety manual', kind: 'PDF', passages: 130, locked: 'Managers' },
    ],
    asker: 'MR',
    question: 'How do we ship insulin in summer?',
    answer: 'Pack it at 2–8 °C with frozen gel packs [1] and log the box temperature every 2 hours [2].',
    sources: [
      [0, '§4.2 Packing'],
      [0, '§6 Temperature log'],
    ],
  },
  {
    name: 'Product specs',
    docs: [
      { name: 'Fabric specs', kind: 'XLSX', passages: 96 },
      { name: 'Pique polo sheet', kind: 'PDF', passages: 18 },
      { name: 'Care labels', kind: 'DOCX', passages: 22 },
      { name: 'Buyer manual', kind: 'PDF', passages: 140, locked: 'Merchandising' },
    ],
    asker: 'MK',
    question: 'What is the GSM of our pique polo fabric?',
    answer: 'Our pique polo fabric is 220 GSM [1], made of 100% combed cotton [2].',
    sources: [
      [1, 'p. 2 Fabric'],
      [0, 'Row 18 Pique'],
    ],
  },
  {
    name: 'Clinic guides',
    docs: [
      { name: 'Lab guide', kind: 'PDF', passages: 88 },
      { name: 'Billing policy', kind: 'DOCX', passages: 30 },
      { name: 'Doctor rosters', kind: 'XLSX', passages: 24 },
      { name: 'Patient FAQs', kind: 'PDF', passages: 46 },
    ],
    asker: 'TS',
    question: 'Does a lipid profile need fasting?',
    answer: 'Yes, 10–12 hours of fasting is needed [1]. Drinking plain water is allowed [2].',
    sources: [
      [0, 'p. 12 Lipid profile'],
      [3, 'Q7 Before your test'],
    ],
  },
];

/* Phases: collect, index, question and retrieve, answer, show sources, hold. */
const durations = [2200, 2400, 2200, 2600, 2200, 2200] as const;
const phaseSteps = [0, 1, 2, 2, 3, 4] as const;

const clusterTone = ['#E8A39A', '#9DB7C9', '#B9C79A', '#C9B49D'];

/* Meaning map: 44 passages in four loose clusters (one per document), fixed so it renders the same everywhere. */
const centers = [
  [92, 88],
  [300, 80],
  [110, 228],
  [306, 222],
];
const dots = Array.from({ length: 44 }, (_, i) => {
  const c = i % 4;
  const a = (i * 2.399) % (Math.PI * 2);
  const r = 14 + ((i * 37) % 52);
  return { x: centers[c][0] + Math.cos(a) * r, y: centers[c][1] + Math.sin(a) * r * 0.8, c };
});
const QUERY = { x: 206, y: 150 };

export function KnowledgeArt({ steps }: { steps: string[] }) {
  const loop = useLoop(durations, sets.length);
  const set = sets[loop.tab];
  const p = loop.phase;
  const k = `${loop.tab}`;
  // The three passages nearest the question are the ones "retrieved", drawn from the cited documents.
  const cited = new Set(set.sources.map(([d]) => d));
  const nearest = dots
    .map((d, i) => ({ i, d, dist: Math.hypot(d.x - QUERY.x, d.y - QUERY.y) + (cited.has(d.c) ? 0 : 400) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3)
    .map((x) => x.i);

  return (
    <Shell
      rootRef={loop.ref}
      label="Animated example: company documents indexed by meaning, a staff question matched to the right passages, and Pip answering with the sources shown"
      prompt="Pick a document set · ask it a question"
      tabs={sets.map((s) => s.name)}
      tab={loop.tab}
      onPick={loop.pick}
      tracker={<StepTracker steps={steps} {...phaseTracker(loop, phaseSteps)} />}
    >
      <div className="grid items-center lg:grid-cols-[minmax(0,16rem)_2.5rem_minmax(0,1fr)_2.5rem_minmax(0,20rem)]">
        {/* documents */}
        <div className={cn('p-4', glass)}>
          <p className="text-[13.5px] font-semibold">Your documents</p>
          <div className="mt-3 space-y-2">
            {set.docs.map((d, i) => {
              const Icon = d.kind === 'XLSX' ? FileSpreadsheet : FileText;
              const usedNow = p >= 4 && set.sources.some(([s]) => s === i);
              return (
                <Rise key={`${k}-${d.name}`} delay={i * 0.3} className={cn('px-3 py-2.5 transition-colors duration-500', usedNow ? hotGlass : glass)}>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${clusterTone[i]}26` }}>
                      <Icon className="h-4 w-4" style={{ color: clusterTone[i] }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] text-paper/90">{d.name}</p>
                      <Label className="mt-0.5 flex items-center gap-1.5">
                        {d.kind}
                        {d.locked && (
                          <>
                            <Lock className="h-2.5 w-2.5" /> {d.locked}
                          </>
                        )}
                      </Label>
                    </div>
                    <span className="text-right font-mono text-[10px] text-paper/50">
                      {p >= 1 ? <CountUp value={String(d.passages)} ms={1400} delay={i * 150} /> : '—'}
                      <span className="block text-[8.5px] uppercase tracking-[0.12em] text-paper/30">passages</span>
                    </span>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>

        <Wire lit={p >= 1} flowing={p === 1} runKey={`${loop.key}-a`} />

        {/* meaning map */}
        <div className={cn('relative overflow-hidden p-4', glass)}>
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-semibold">Meaning map</p>
            <Label>{p === 0 ? 'Waiting for documents' : p === 1 ? 'Indexing passages…' : p >= 2 ? '3 closest passages' : ''}</Label>
          </div>
          <svg viewBox="0 0 400 300" className="mt-2 block h-auto w-full" aria-hidden>
            <defs>
              <radialGradient id="kb-q" cx=".5" cy=".5" r=".5">
                <stop offset="0" stopColor="#E84F3D" stopOpacity=".45" />
                <stop offset="1" stopColor="#E84F3D" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[60, 120, 180, 240].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#fff" strokeOpacity=".04" />
            ))}
            {p >= 2 &&
              nearest.map((n) => (
                <motion.line
                  key={`${k}-l${n}`}
                  x1={QUERY.x}
                  y1={QUERY.y}
                  x2={dots[n].x}
                  y2={dots[n].y}
                  stroke="#E84F3D"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={loop.reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: p === 2 ? 0.8 : 0, ease }}
                />
              ))}
            {dots.map((d, i) => {
              const hit = p >= 2 && nearest.includes(i);
              return (
                <motion.circle
                  key={`${k}-${i}`}
                  cx={d.x}
                  cy={d.y}
                  fill={hit ? '#E84F3D' : clusterTone[d.c]}
                  initial={loop.reduce ? false : { r: 0, opacity: 0 }}
                  animate={{ r: p >= 1 ? (hit ? 6 : 3.2) : 0, opacity: p >= 1 ? (hit ? 1 : p >= 2 ? 0.45 : 0.85) : 0 }}
                  transition={{ duration: 0.4, delay: p === 1 ? (i % 11) * 0.1 + Math.floor(i / 11) * 0.05 : hit ? 1.2 : 0 }}
                />
              );
            })}
            {p >= 2 && (
              <motion.g initial={loop.reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease }} style={{ transformOrigin: `${QUERY.x}px ${QUERY.y}px` }}>
                <circle cx={QUERY.x} cy={QUERY.y} r="34" fill="url(#kb-q)" />
                <circle cx={QUERY.x} cy={QUERY.y} r="7" fill="#FCFCF4" />
                <circle cx={QUERY.x} cy={QUERY.y} r="11" fill="none" stroke="#FCFCF4" strokeOpacity=".4" />
              </motion.g>
            )}
          </svg>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {set.docs.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[10.5px] text-paper/45">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: clusterTone[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        <Wire lit={p >= 3} flowing={p === 3} runKey={`${loop.key}-b`} />

        {/* question and answer */}
        <div className="space-y-3">
          <div className={cn('p-4 transition-opacity duration-500', glass, p < 2 && 'opacity-40')}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3E6E8E] text-[11px] font-semibold">{set.asker}</span>
              <Label>Staff question</Label>
            </div>
            <p className="mt-2 min-h-[2.5em] text-[13.5px] leading-snug text-paper/90">
              {p >= 2 ? p === 2 ? <Typed key={`${k}-q`} text={set.question} ms={900} /> : set.question : <span className="text-paper/30">Waiting for a question…</span>}
            </p>
          </div>
          <div className={cn('p-4 transition-colors duration-500', p >= 3 ? hotGlass : glass, p < 3 && 'opacity-40')}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-ink ring-1 ring-white/15">
                <Pip bust="head" mood={p === 3 ? 'working' : p >= 4 ? 'happy' : 'idle'} className="w-7" title="Pip" />
              </span>
              <Label className={p >= 3 ? 'text-signal-300' : undefined}>Pip · answer</Label>
            </div>
            <p className="mt-2 min-h-[4em] text-[13.5px] leading-snug text-paper">
              {p >= 3 ? p === 3 ? <Typed key={`${k}-a`} text={set.answer} ms={1800} /> : set.answer : <span className="text-paper/30">—</span>}
            </p>
            <div className="mt-3 space-y-1.5">
              {p >= 4 &&
                set.sources.map(([d, where], i) => (
                  <Rise key={`${k}-s${i}`} delay={p === 4 ? i * 0.25 : 0} className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-[11.5px]">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-signal font-mono text-[9px] text-paper">{i + 1}</span>
                    <span className="truncate text-paper/85">{set.docs[d].name}</span>
                    <span className="ml-auto shrink-0 font-mono text-[9.5px] text-paper/45">{where}</span>
                  </Rise>
                ))}
            </div>
            {p >= 4 && (
              <Rise delay={p === 4 ? 0.6 : 0} className="mt-3 flex items-center gap-1.5 text-[11px] text-paper/55">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Answered only from your documents
              </Rise>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
