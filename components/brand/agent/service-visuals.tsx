import {
  AlertTriangle,
  Boxes,
  Check,
  ClipboardList,
  Database,
  FileText,
  Factory,
  MessageSquare,
  Monitor,
  Plug,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Service-category illustrations, drawn as clean architecture diagrams — one per capability.
 * Pure SVG (no filters), themed for dark or light surfaces. Copy mirrors lib/content.ts.
 */

const RED = '#E84F3D';

function theme(dark: boolean) {
  return dark
    ? { panel: '#151518', stroke: 'rgba(255,255,255,0.14)', text: '#FCFCF4', muted: 'rgba(252,252,244,0.58)', faint: 'rgba(252,252,244,0.4)', line: 'rgba(255,255,255,0.22)', tile: '#2a2a30', soft: 'rgba(255,255,255,0.06)' }
    : { panel: '#FFFFFF', stroke: 'rgba(10,10,11,0.13)', text: '#0A0A0B', muted: 'rgba(10,10,11,0.6)', faint: 'rgba(10,10,11,0.42)', line: 'rgba(10,10,11,0.24)', tile: '#0A0A0B', soft: 'rgba(10,10,11,0.045)' };
}
type Theme = ReturnType<typeof theme>;

function Frame({ dark, label, children, className }: { dark: boolean; label: string; children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 688 400"
      className={cn('block h-auto w-full font-sans', !dark && 'drop-shadow-[0_26px_36px_rgba(10,10,11,0.16)]', className)}
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

function Link({ d, t, i = 0 }: { d: string; t: Theme; i?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke={t.line} strokeWidth={1.6} />
      <path d={d} fill="none" stroke={RED} strokeWidth={1.6} strokeDasharray="3 9" className="hub-flow" />
      <circle r={3.6} fill={RED}>
        <animateMotion dur="3.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );
}

function IconTile({ x, y, s = 34, Icon, hot, t }: { x: number; y: number; s?: number; Icon: LucideIcon; hot?: boolean; t: Theme }) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.3} fill={hot ? RED : t.tile} />
      <Icon x={x + s * 0.24} y={y + s * 0.24} width={s * 0.52} height={s * 0.52} color="#FCFCF4" strokeWidth={2} />
    </g>
  );
}

function Mono({ x, y, children, t, size = 10.5, anchor }: { x: number; y: number; children: React.ReactNode; t: Theme; size?: number; anchor?: 'end' | 'middle' }) {
  return (
    <text x={x} y={y} className="font-mono" fontSize={size} letterSpacing={1.8} fill={t.faint} textAnchor={anchor}>
      {children}
    </text>
  );
}

/* ───────────────────────── Workflow automation ───────────────────────── */

const flow = [
  { Icon: MessageSquare, lines: ['Customer', 'request'], note: 'Any channel' },
  { Icon: Sparkles, lines: ['AI understands', '& qualifies'], note: 'Scoped AI', hot: true },
  { Icon: Database, lines: ['CRM record', 'created'], note: 'Your CRM' },
  { Icon: Send, lines: ['Follow-up', 'sent'], note: 'Automatic' },
];

export function WorkflowVisual({ dark = false, className }: { dark?: boolean; className?: string }) {
  const t = theme(dark);
  const X = (i: number) => 20 + i * 176;
  const Y = (i: number) => (i % 2 === 0 ? 76 : 188);
  const W = 128;
  const H = 108;
  return (
    <Frame dark={dark} className={className} label="Four-step automated workflow: request, AI qualification, CRM record, follow-up">
      <Mono x={20} y={34} t={t}>SALES WORKFLOW</Mono>
      <g>
        <rect x={688 - 20 - 88} y={18} width={88} height={24} rx={12} fill={t.soft} stroke={t.stroke} />
        <circle cx={688 - 20 - 88 + 16} cy={30} r={3.5} fill="#22c55e" />
        <Mono x={688 - 20 - 88 + 28} y={34} t={t} size={10}>RUNNING</Mono>
      </g>

      {flow.slice(0, 3).map((_, i) => (
        <Link key={i} i={i} t={t} d={`M${X(i) + W} ${Y(i) + H / 2} C ${X(i) + W + 30} ${Y(i) + H / 2}, ${X(i + 1) - 30} ${Y(i + 1) + H / 2}, ${X(i + 1)} ${Y(i + 1) + H / 2}`} />
      ))}

      {flow.map((n, i) => (
        <g key={i}>
          <rect x={X(i)} y={Y(i)} width={W} height={H} rx={18} fill={t.panel} stroke={n.hot ? RED : t.stroke} strokeWidth={n.hot ? 1.6 : 1} />
          <IconTile x={X(i) + 14} y={Y(i) + 14} Icon={n.Icon} hot={n.hot} t={t} />
          <Mono x={X(i) + W - 14} y={Y(i) + 36} t={t} anchor="end">{`0${i + 1}`}</Mono>
          <text x={X(i) + 14} y={Y(i) + 72} fontSize={13.5} fontWeight={600} fill={t.text}>{n.lines[0]}</text>
          <text x={X(i) + 14} y={Y(i) + 90} fontSize={13.5} fontWeight={600} fill={t.text}>{n.lines[1]}</text>
        </g>
      ))}

      <rect x={20} y={322} width={648} height={52} rx={16} fill={t.soft} stroke={t.stroke} />
      {['No lead sits unanswered', 'CRM stays accurate', 'Sales sees qualified leads'].map((s, i) => (
        <g key={s}>
          <circle cx={46 + i * 214} cy={348} r={9} fill={RED} />
          <Check x={46 + i * 214 - 5.5} y={348 - 5.5} width={11} height={11} color="#FCFCF4" strokeWidth={3} />
          <text x={64 + i * 214} y={353} fontSize={13} fontWeight={500} fill={t.text}>{s}</text>
        </g>
      ))}
    </Frame>
  );
}

/* ───────────────────────── AI-enabled ERP ───────────────────────── */

const modules: { Icon: LucideIcon; name: string }[] = [
  { Icon: ShoppingCart, name: 'Procurement' },
  { Icon: Boxes, name: 'Inventory' },
  { Icon: Factory, name: 'Production' },
  { Icon: ClipboardList, name: 'Sales & Orders' },
];
const bars = [58, 70, 64, 82, 74, 90, 68, 62, 78, 92, 70, 38, 54, 72];

export function ErpVisual({ dark = false, className }: { dark?: boolean; className?: string }) {
  const t = theme(dark);
  return (
    <Frame dark={dark} className={className} label="ERP dashboard with modules, a stock chart and an AI-flagged exception">
      <rect x={0.5} y={0.5} width={687} height={399} rx={22} fill={t.panel} stroke={t.stroke} />
      <path d="M180 0.5 V399.5" stroke={t.stroke} />

      <Mono x={24} y={38} t={t}>OPERATIONS</Mono>
      {modules.map((m, i) => {
        const y = 60 + i * 50;
        const on = m.name === 'Inventory';
        return (
          <g key={m.name}>
            {on && <rect x={12} y={y} width={156} height={40} rx={12} fill={t.soft} />}
            {on && <rect x={12} y={y + 11} width={3} height={18} rx={1.5} fill={RED} />}
            <m.Icon x={28} y={y + 11} width={18} height={18} color={on ? RED : t.muted} strokeWidth={1.9} />
            <text x={58} y={y + 25} fontSize={13.5} fontWeight={on ? 600 : 500} fill={on ? t.text : t.muted}>{m.name}</text>
          </g>
        );
      })}
      <g>
        <rect x={24} y={324} width={132} height={52} rx={14} fill={t.soft} stroke={t.stroke} />
        <Sparkles x={36} y={340} width={16} height={16} color={RED} strokeWidth={2} />
        <text x={60} y={352} fontSize={12} fontWeight={600} fill={t.text}>AI assist</text>
        <text x={36} y={368} fontSize={10.5} className="font-mono" fill={t.faint}>flags exceptions</text>
      </g>

      <text x={204} y={44} fontSize={21} fontWeight={650} fill={t.text}>Inventory</text>
      <text x={204} y={64} className="font-mono" fontSize={11} fill={t.muted}>Stock · movement · batches</text>
      <g>
        <rect x={688 - 24 - 104} y={26} width={104} height={26} rx={13} fill={dark ? 'rgba(232,79,61,0.16)' : 'rgba(232,79,61,0.1)'} />
        <circle cx={688 - 24 - 104 + 16} cy={39} r={3.5} fill={RED} />
        <text x={688 - 24 - 104 + 28} y={43} className="font-mono" fontSize={10} letterSpacing={1.2} fill={dark ? '#F08272' : '#CC3B2A'}>1 EXCEPTION</text>
      </g>

      {/* stock chart */}
      <g>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M204 ${112 + i * 40} H664`} stroke={t.stroke} strokeDasharray="2 5" />
        ))}
        {bars.map((h, i) => {
          const flagged = i === 11;
          return (
            <rect key={i} x={208 + i * 33} y={232 - h * 1.2} width={20} height={h * 1.2} rx={5} fill={flagged ? RED : dark ? 'rgba(252,252,244,0.2)' : 'rgba(10,10,11,0.16)'} />
          );
        })}
        <path d="M204 232.5 H664" stroke={t.line} />
        <path d="M204 186 H664" stroke={RED} strokeWidth={1.2} strokeDasharray="5 5" />
        <text x={664} y={180} textAnchor="end" className="font-mono" fontSize={10} letterSpacing={1.4} fill={RED}>REORDER LEVEL</text>
      </g>

      {[
        { x: 204, Icon: AlertTriangle, title: 'Exception detected', l1: 'Projected shortage before the', l2: 'next production run.', hot: true },
        { x: 438, Icon: Sparkles, title: 'Suggested action', l1: 'Raise a purchase order and', l2: 'notify procurement.', hot: false },
      ].map((c) => (
        <g key={c.title}>
          <rect x={c.x} y={256} width={226} height={120} rx={16} fill={t.panel} stroke={c.hot ? RED : t.stroke} strokeWidth={c.hot ? 1.5 : 1} />
          <IconTile x={c.x + 16} y={272} s={32} Icon={c.Icon} hot={c.hot} t={t} />
          <text x={c.x + 60} y={294} fontSize={14} fontWeight={600} fill={t.text}>{c.title}</text>
          <text x={c.x + 16} y={332} fontSize={13} fill={t.muted}>{c.l1}</text>
          <text x={c.x + 16} y={350} fontSize={13} fill={t.muted}>{c.l2}</text>
        </g>
      ))}
    </Frame>
  );
}

/* ───────────────────────── Custom AI engineering ───────────────────────── */

export function CustomVisual({ dark = false, className }: { dark?: boolean; className?: string }) {
  const t = theme(dark);
  const col1: { Icon: LucideIcon; name: string; sub: string }[] = [
    { Icon: FileText, name: 'Documents', sub: 'PDFs · SOPs' },
    { Icon: Database, name: 'Databases', sub: 'SQL · NoSQL' },
    { Icon: Plug, name: 'APIs', sub: 'Any service' },
  ];
  const col3: { Icon: LucideIcon; name: string; sub: string }[] = [
    { Icon: Users, name: 'CRM', sub: 'Contacts' },
    { Icon: Boxes, name: 'ERP', sub: 'Stock' },
    { Icon: Webhook, name: 'Services', sub: 'REST APIs' },
  ];
  const core: { Icon: LucideIcon; name: string; sub: string }[] = [
    { Icon: Search, name: 'Retrieval', sub: 'Your data, cited' },
    { Icon: Sparkles, name: 'Reasoning', sub: 'Task logic' },
    { Icon: ShieldCheck, name: 'Guardrails', sub: 'Scoped access' },
  ];
  const ny = (i: number) => 58 + i * 76;
  const MID = 58 + 76 + 28;
  return (
    <Frame dark={dark} className={className} label="Architecture: your data, an AI layer with guardrails, your systems, your team">
      <Mono x={20} y={32} t={t}>YOUR DATA</Mono>
      <Mono x={208} y={32} t={t}>AI LAYER</Mono>
      <Mono x={448} y={32} t={t}>YOUR SYSTEMS</Mono>
      <Mono x={608} y={32} t={t}>YOUR TEAM</Mono>

      {col1.map((_, i) => (
        <Link key={`a${i}`} i={i} t={t} d={`M148 ${ny(i) + 28} C 178 ${ny(i) + 28}, 178 ${MID}, 208 ${MID}`} />
      ))}
      {col3.map((_, i) => (
        <Link key={`b${i}`} i={i + 1} t={t} d={`M388 ${MID} C 418 ${MID}, 418 ${ny(i) + 28}, 448 ${ny(i) + 28}`} />
      ))}
      <Link i={2} t={t} d={`M576 ${MID} C 590 ${MID}, 596 ${MID}, 608 ${MID}`} />

      {col1.map((n, i) => (
        <g key={n.name}>
          <rect x={20} y={ny(i)} width={128} height={56} rx={14} fill={t.panel} stroke={t.stroke} />
          <IconTile x={32} y={ny(i) + 11} s={34} Icon={n.Icon} t={t} />
          <text x={74} y={ny(i) + 27} fontSize={13.5} fontWeight={600} fill={t.text}>{n.name}</text>
          <text x={74} y={ny(i) + 43} className="font-mono" fontSize={10.5} fill={t.muted}>{n.sub}</text>
        </g>
      ))}

      <rect x={208} y={46} width={180} height={238} rx={20} fill={t.panel} stroke={RED} strokeWidth={1.6} />
      {core.map((n, i) => (
        <g key={n.name}>
          <IconTile x={224} y={66 + i * 72} s={36} Icon={n.Icon} hot={i === 1} t={t} />
          <text x={270} y={86 + i * 72} fontSize={14} fontWeight={600} fill={t.text}>{n.name}</text>
          <text x={270} y={103 + i * 72} className="font-mono" fontSize={10} fill={t.muted}>{n.sub}</text>
          {i < 2 && <path d={`M224 ${116 + i * 72} H372`} stroke={t.stroke} />}
        </g>
      ))}

      {col3.map((n, i) => (
        <g key={n.name}>
          <rect x={448} y={ny(i)} width={128} height={56} rx={14} fill={t.panel} stroke={t.stroke} />
          <IconTile x={460} y={ny(i) + 11} s={34} Icon={n.Icon} t={t} />
          <text x={502} y={ny(i) + 27} fontSize={13.5} fontWeight={600} fill={t.text}>{n.name}</text>
          <text x={502} y={ny(i) + 43} className="font-mono" fontSize={10.5} fill={t.muted}>{n.sub}</text>
        </g>
      ))}

      <rect x={608} y={MID - 44} width={60} height={88} rx={14} fill={t.panel} stroke={t.stroke} />
      <IconTile x={621} y={MID - 30} s={34} Icon={Monitor} hot t={t} />
      <rect x={620} y={MID + 14} width={36} height={4} rx={2} fill={t.line} />
      <rect x={620} y={MID + 24} width={24} height={4} rx={2} fill={t.line} />

      <rect x={20} y={318} width={648} height={56} rx={16} fill={t.soft} stroke={t.stroke} />
      {['Knowledge-base & RAG apps', 'CRM · ERP · API integration', 'Internal tools & dashboards'].map((s, i) => (
        <g key={s}>
          <circle cx={46 + i * 214} cy={346} r={9} fill={RED} />
          <Check x={46 + i * 214 - 5.5} y={346 - 5.5} width={11} height={11} color="#FCFCF4" strokeWidth={3} />
          <text x={64 + i * 214} y={351} fontSize={13} fontWeight={500} fill={t.text}>{s}</text>
        </g>
      ))}
    </Frame>
  );
}
