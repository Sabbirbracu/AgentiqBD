import {
  AlertTriangle,
  BookOpen,
  Boxes,
  CalendarCheck,
  Check,
  ClipboardList,
  Database,
  FileSpreadsheet,
  FileText,
  Globe,
  Headphones,
  LayoutDashboard,
  Lock,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserCog,
  Users,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { FlowLink, IconTile, Mono, RED, theme } from './agent/service-visuals';

/**
 * Preview graphics for the Services mega menu: one compact product scene per service, drawn for the dark
 * preview box at roughly 1:1 so the text stays readable. Same primitives and palette as the service-page
 * heroes. Names, times and figures inside are sample values, never claims.
 */

export const t = theme(true);
export const GREEN = '#22c55e';
export const PAPER = '#FCFCF4';
export const RED_SOFT = 'rgba(232,79,61,0.15)';
export const RED_TEXT = '#F08272';

export function Scene({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 440 260" className="block h-auto w-full font-sans" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function Card({ x, y, w, h, hot, r = 12, fill = t.panel }: { x: number; y: number; w: number; h: number; hot?: boolean; r?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={hot ? RED : t.stroke} strokeWidth={hot ? 1.5 : 1} />;
}

/** Icon tile + name + mono subline. */
export function Node({ x, y, w, h = 44, Icon, name, sub, hot }: { x: number; y: number; w: number; h?: number; Icon: LucideIcon; name: string; sub?: string; hot?: boolean }) {
  const s = 26;
  const ty = sub ? y + h / 2 - 2 : y + h / 2 + 4;
  return (
    <g>
      <Card x={x} y={y} w={w} h={h} hot={hot} />
      <IconTile x={x + 10} y={y + (h - s) / 2} s={s} Icon={Icon} hot={hot} t={t} />
      <text x={x + 44} y={ty} fontSize={11.5} fontWeight={600} fill={t.text}>{name}</text>
      {sub && (
        <text x={x + 44} y={ty + 13} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** Rounded status pill with a dot, e.g. RUNNING. */
export function StatusPill({ x, y, w, children }: { x: number; y: number; w: number; children: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={22} rx={11} fill={t.soft} stroke={t.stroke} />
      <circle cx={x + 12} cy={y + 11} r={3.2} fill={GREEN} className="animate-pulse" />
      <text x={x + 21} y={y + 14.5} className="font-mono" fontSize={8} letterSpacing={1.2} fill={t.muted}>{children}</text>
    </g>
  );
}

export function Tick({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={RED} />
      <Check x={cx - r * 0.6} y={cy - r * 0.6} width={r * 1.2} height={r * 1.2} color={PAPER} strokeWidth={3} />
    </g>
  );
}

/* ───────────────────────── AI agents ───────────────────────── */

function AgentsArt() {
  const agents = [
    { Icon: Headphones, name: 'SupportAgent', sub: 'ANSWERING WHATSAPP', result: 'Order #1042 · shipped' },
    { Icon: Target, name: 'LeadAgent', sub: 'QUALIFYING ENQUIRY', result: 'Score 82 · sent to sales' },
    { Icon: CalendarCheck, name: 'BookingAgent', sub: 'OFFERING SLOTS', result: 'Thu 6:15 pm · held' },
  ];
  return (
    <Scene label="Three AI Employees handling support, leads and bookings, with a refund waiting for human approval">
      <Mono x={14} y={24} t={t} size={9}>AI EMPLOYEES</Mono>
      <StatusPill x={340} y={9} w={86}>3 ON SHIFT</StatusPill>

      {agents.map((a, i) => {
        const y = 38 + i * 52;
        return (
          <g key={a.name}>
            <Card x={14} y={y} w={412} h={44} hot={i === 0} />
            <IconTile x={24} y={y + 8} s={28} Icon={a.Icon} hot={i === 0} t={t} />
            <text x={62} y={y + 19} fontSize={12} fontWeight={600} fill={t.text}>{a.name}</text>
            <text x={62} y={y + 33} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>{a.sub}</text>
            <rect x={246} y={y + 10} width={170} height={24} rx={12} fill={t.soft} />
            <text x={258} y={y + 26} fontSize={10} fill={t.text}>{a.result}</text>
            <circle cx={404} cy={y + 22} r={3.5} fill={GREEN} className="animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
          </g>
        );
      })}

      <rect x={14} y={198} width={412} height={50} rx={14} fill={t.soft} stroke={t.stroke} />
      <IconTile x={24} y={208} s={30} Icon={ShieldCheck} hot t={t} />
      <text x={64} y={220} fontSize={12} fontWeight={600} fill={t.text}>Human approval</text>
      <text x={64} y={235} fontSize={10} fill={t.muted}>Refund over the limit needs a manager</text>
      <rect x={292} y={210} width={66} height={26} rx={13} fill={RED} />
      <text x={325} y={227} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={PAPER}>Approve</text>
      <rect x={364} y={210} width={52} height={26} rx={13} fill="none" stroke={t.line} />
      <text x={390} y={227} textAnchor="middle" fontSize={10.5} fill={t.text}>Review</text>
    </Scene>
  );
}

/* ───────────────────────── Chatbots ───────────────────────── */

function ChatArt() {
  const channels = [
    { Icon: Globe, name: 'Website' },
    { Icon: MessageCircle, name: 'WhatsApp', hot: true },
    { Icon: MessagesSquare, name: 'Messenger' },
  ];
  return (
    <Scene label="A WhatsApp assistant answering a delivery question from the FAQ and handing over to the sales team">
      <Card x={14} y={10} w={262} h={240} r={16} />
      <IconTile x={26} y={22} s={30} Icon={MessageCircle} hot t={t} />
      <text x={64} y={34} fontSize={12} fontWeight={600} fill={t.text}>Shop assistant</text>
      <text x={64} y={48} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>WHATSAPP · ONLINE</text>
      <circle cx={260} cy={37} r={3.5} fill={GREEN} className="animate-pulse" />
      <path d="M14 62 H276" stroke={t.stroke} />

      <rect x={26} y={74} width={148} height={26} rx={13} fill={t.tile} />
      <text x={38} y={91} fontSize={10.5} fill={t.text}>Do you deliver to Sylhet?</text>

      <rect x={100} y={108} width={164} height={44} rx={14} fill={RED} />
      <text x={112} y={126} fontSize={10.5} fill={PAPER}>Yes, in 2–3 days, Tk 120.</text>
      <text x={112} y={142} fontSize={10.5} fill={PAPER}>Shall I place the order?</text>
      <rect x={140} y={158} width={124} height={18} rx={9} fill={RED_SOFT} />
      <text x={150} y={170} className="font-mono" fontSize={7.5} letterSpacing={1} fill={RED_TEXT}>SOURCE · DELIVERY FAQ</text>

      <rect x={26} y={184} width={140} height={26} rx={13} fill={t.tile} />
      <text x={38} y={201} fontSize={10.5} fill={t.text}>Can I talk to a person?</text>

      <rect x={26} y={218} width={238} height={22} rx={11} fill={t.soft} stroke={t.stroke} />
      <UserCog x={34} y={222} width={14} height={14} color={RED_TEXT} strokeWidth={2} />
      <text x={54} y={232.5} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>HANDED TO SALES TEAM · CHAT SAVED</text>

      <Mono x={290} y={24} t={t} size={8.5}>CHANNELS</Mono>
      {channels.map((c, i) => {
        const y = 34 + i * 48;
        return (
          <g key={c.name}>
            <Node x={290} y={y} w={136} h={40} Icon={c.Icon} name={c.name} hot={c.hot} />
            <circle cx={414} cy={y + 20} r={3} fill={GREEN} />
          </g>
        );
      })}
      <Mono x={290} y={192} t={t} size={8.5}>ANSWERS FROM</Mono>
      <Node x={290} y={202} w={136} h={48} Icon={BookOpen} name="Your FAQ" sub="AND POLICIES" />
    </Scene>
  );
}

/* ───────────────────────── Voice ───────────────────────── */

function VoiceArt() {
  const bars = [10, 18, 30, 22, 38, 26, 14, 32, 40, 24, 16, 34, 28, 12, 22, 36, 20, 12];
  return (
    <Scene label="A voice agent answering a call, transcribing it and booking Thursday 6:15 pm in the calendar">
      <Card x={14} y={10} w={196} h={240} r={16} hot />
      <Mono x={112} y={34} t={t} size={8.5} anchor="middle">INCOMING CALL</Mono>
      <circle cx={112} cy={84} r={32} fill={RED_SOFT} className="animate-pulse" />
      <circle cx={112} cy={84} r={22} fill={RED} />
      <Phone x={101} y={73} width={22} height={22} color={PAPER} strokeWidth={2} />
      <text x={112} y={136} textAnchor="middle" fontSize={12.5} fontWeight={600} fill={t.text}>+880 17•• •••214</text>
      <text x={112} y={152} textAnchor="middle" className="font-mono" fontSize={8} letterSpacing={1.2} fill={t.muted}>00:42 · AI ANSWERING</text>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={42 + i * 8}
          y={200 - h / 2}
          width={3.5}
          height={h}
          rx={1.75}
          fill={i % 3 === 1 ? RED : 'rgba(252,252,244,0.7)'}
          className="voice-bar"
          style={{ transformBox: 'fill-box', animationDelay: `${(i % 6) * 120}ms` }}
        />
      ))}

      <Mono x={224} y={24} t={t} size={8.5}>LIVE TRANSCRIPT</Mono>
      <Card x={224} y={34} w={202} h={46} />
      <text x={236} y={50} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.faint}>CALLER</text>
      <text x={236} y={68} fontSize={10.5} fill={t.text}>Can I come Thursday evening?</text>
      <rect x={224} y={88} width={202} height={46} rx={12} fill={RED_SOFT} />
      <text x={236} y={104} className="font-mono" fontSize={7.5} letterSpacing={1} fill={RED_TEXT}>AI AGENT</text>
      <text x={236} y={122} fontSize={10.5} fill={t.text}>Thursday 6:15 pm is free. Book?</text>

      <Card x={224} y={146} w={202} h={52} />
      <IconTile x={234} y={157} s={30} Icon={CalendarCheck} hot t={t} />
      <text x={274} y={170} fontSize={12} fontWeight={600} fill={t.text}>Booked · Thu 6:15 pm</text>
      <text x={274} y={185} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>ADDED TO CALENDAR</text>

      {['SMS SENT', 'CRM UPDATED'].map((s, i) => (
        <g key={s}>
          <rect x={224 + i * 96} y={210} width={i ? 106 : 88} height={24} rx={12} fill={t.soft} stroke={t.stroke} />
          <Check x={234 + i * 96} y={216} width={12} height={12} color={GREEN} strokeWidth={3} />
          <text x={251 + i * 96} y={225.5} className="font-mono" fontSize={8} letterSpacing={1} fill={t.muted}>{s}</text>
        </g>
      ))}
    </Scene>
  );
}

/* ───────────────────────── Workflow automation ───────────────────────── */

function WorkflowArt() {
  const steps = [
    { Icon: Globe, lines: ['Form', 'submitted'] },
    { Icon: Sparkles, lines: ['AI scores', 'the lead'], hot: true },
    { Icon: Database, lines: ['CRM record', 'created'] },
    { Icon: Send, lines: ['Follow-up', 'sent'] },
  ];
  const log = [
    ['Website form received', '09:14'],
    ['Lead scored 82 and added to CRM', '09:14'],
    ['Follow-up email sent', '09:15'],
  ];
  const X = (i: number) => 14 + i * 106;
  return (
    <Scene label="Automated workflow: a website form is scored by AI, added to the CRM and followed up, with an activity log">
      <Mono x={14} y={24} t={t} size={9}>NEW LEAD WORKFLOW</Mono>
      <StatusPill x={346} y={9} w={80}>RUNNING</StatusPill>

      {steps.slice(0, 3).map((_, i) => (
        <FlowLink key={i} i={i} t={t} d={`M${X(i) + 92} 92 H${X(i + 1)}`} />
      ))}
      {steps.map((s, i) => (
        <g key={s.lines[0]}>
          <Card x={X(i)} y={40} w={92} h={104} r={14} hot={s.hot} />
          <IconTile x={X(i) + 10} y={50} s={28} Icon={s.Icon} hot={s.hot} t={t} />
          <Mono x={X(i) + 82} y={68} t={t} size={8.5} anchor="end">{`0${i + 1}`}</Mono>
          <text x={X(i) + 10} y={112} fontSize={11.5} fontWeight={600} fill={t.text}>{s.lines[0]}</text>
          <text x={X(i) + 10} y={128} fontSize={11.5} fontWeight={600} fill={t.text}>{s.lines[1]}</text>
        </g>
      ))}

      <rect x={14} y={156} width={412} height={92} rx={14} fill={t.soft} stroke={t.stroke} />
      <Mono x={28} y={176} t={t} size={8}>ACTIVITY</Mono>
      {log.map(([s, time], i) => {
        const y = 194 + i * 19;
        return (
          <g key={s}>
            <Tick cx={34} cy={y - 3.5} r={6} />
            <text x={48} y={y} fontSize={10.5} fill={t.text}>{s}</text>
            <text x={412} y={y} textAnchor="end" className="font-mono" fontSize={8.5} fill={t.faint}>{time}</text>
          </g>
        );
      })}
    </Scene>
  );
}

/* ───────────────────────── Knowledge base & RAG ───────────────────────── */

function KnowledgeArt() {
  const docs = [
    { name: 'Refund policy', sub: 'PDF · 6 PAGES' },
    { name: 'Staff SOP v3', sub: 'DOCX · 24 PAGES' },
    { name: 'Price list', sub: 'SHEET · 310 ROWS' },
  ];
  return (
    <Scene label="Company documents indexed and used to answer a refund question with a cited source">
      <Mono x={14} y={24} t={t} size={8.5}>YOUR DOCUMENTS</Mono>
      {docs.map((d, i) => {
        const y = 34 + i * 60;
        return (
          <g key={d.name}>
            <FlowLink i={i} t={t} d={`M154 ${y + 25} C166 ${y + 25} 164 140 176 140`} />
            <Node x={14} y={y} w={140} h={50} Icon={FileText} name={d.name} sub={d.sub} />
          </g>
        );
      })}
      <Mono x={14} y={232} t={t} size={7.5}>INDEXED · KEPT IN SYNC</Mono>

      <Mono x={176} y={24} t={t} size={8.5}>ASK</Mono>
      <rect x={176} y={34} width={250} height={36} rx={18} fill={t.panel} stroke={t.stroke} />
      <Search x={190} y={44} width={16} height={16} color={t.muted} strokeWidth={2} />
      <text x={214} y={56} fontSize={11} fill={t.text}>What is the refund window?</text>

      <Card x={176} y={80} w={250} h={130} r={14} hot />
      <IconTile x={188} y={92} s={26} Icon={Sparkles} hot t={t} />
      <text x={222} y={109} fontSize={12} fontWeight={600} fill={t.text}>Answer</text>
      <text x={188} y={138} fontSize={10.5} fill={t.text}>Refunds are accepted within 7 days</text>
      <text x={188} y={154} fontSize={10.5} fill={t.text}>of delivery, with the original receipt.</text>
      <text x={188} y={170} fontSize={10.5} fill={t.muted}>Opened items get store credit.</text>
      <rect x={188} y={182} width={118} height={18} rx={9} fill={RED_SOFT} />
      <text x={198} y={194} className="font-mono" fontSize={7.5} letterSpacing={1} fill={RED_TEXT}>REFUND POLICY · P.3</text>
      <rect x={312} y={182} width={66} height={18} rx={9} fill={t.soft} stroke={t.stroke} />
      <text x={322} y={194} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>SOP · §4</text>

      <Mono x={176} y={232} t={t} size={7.5}>FOR STAFF AND CUSTOMERS</Mono>
    </Scene>
  );
}

/* ───────────────────────── Integrations ───────────────────────── */

function IntegrationsArt() {
  const left = [
    { Icon: Users, name: 'CRM', sub: 'LEADS · DEALS' },
    { Icon: Database, name: 'Database', sub: 'SQL · RECORDS' },
    { Icon: FileSpreadsheet, name: 'Sheets', sub: 'SPREADSHEETS' },
  ];
  const right = [
    { Icon: Boxes, name: 'ERP', sub: 'STOCK · ORDERS' },
    { Icon: Webhook, name: 'REST API', sub: 'WEBHOOKS' },
    { Icon: Mail, name: 'Email', sub: 'INBOX · ALERTS' },
  ];
  const Y = (i: number) => 32 + i * 78;
  return (
    <Scene label="An AI layer connected to the CRM, ERP, database, APIs, spreadsheets and email you already use">
      <Mono x={14} y={20} t={t} size={8.5}>YOUR STACK</Mono>
      <Mono x={426} y={20} t={t} size={8.5} anchor="end">STAYS IN PLACE</Mono>

      {left.map((_, i) => (
        <FlowLink key={`l${i}`} i={i} t={t} d={`M138 ${Y(i) + 22} C152 ${Y(i) + 22} 146 132 160 132`} />
      ))}
      {right.map((_, i) => (
        <FlowLink key={`r${i}`} i={i + 1} t={t} d={`M280 132 C294 132 288 ${Y(i) + 22} 302 ${Y(i) + 22}`} />
      ))}
      {left.map((n, i) => (
        <Node key={n.name} x={14} y={Y(i)} w={124} Icon={n.Icon} name={n.name} sub={n.sub} />
      ))}
      {right.map((n, i) => (
        <Node key={n.name} x={302} y={Y(i)} w={124} Icon={n.Icon} name={n.name} sub={n.sub} />
      ))}

      <circle cx={220} cy={132} r={56} fill="rgba(232,79,61,0.08)" className="animate-pulse" />
      <Card x={160} y={100} w={120} h={64} r={16} hot />
      <IconTile x={172} y={117} s={30} Icon={Sparkles} hot t={t} />
      <text x={210} y={130} fontSize={12} fontWeight={600} fill={t.text}>AI layer</text>
      <text x={210} y={144} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>VIA APIS</text>
      <Mono x={220} y={190} t={t} size={7.5} anchor="middle">NO REPLATFORMING</Mono>
    </Scene>
  );
}

/* ───────────────────────── Industrial AI & ERP ───────────────────────── */

function SystemsArt() {
  const rows: [string, string, number, boolean][] = [
    ['Cotton yarn 30s', '1,240 kg', 0.78, false],
    ['Navy dye', '86 L', 0.12, true],
    ['Packing cartons', '3,400 pcs', 0.66, false],
    ['Zippers 7 in', '2,100 pcs', 0.5, false],
  ];
  return (
    <Scene label="Inventory table with a navy dye shortage flagged by AI and a button to raise a purchase order">
      <Card x={14} y={10} w={412} h={180} r={14} />
      <Mono x={28} y={32} t={t} size={8.5}>INVENTORY · MAIN WAREHOUSE</Mono>
      <circle cx={376} cy={29} r={3.2} fill={GREEN} className="animate-pulse" />
      <Mono x={412} y={32} t={t} size={8.5} anchor="end">LIVE</Mono>
      {[
        ['ITEM', 28],
        ['STOCK', 172],
        ['LEVEL', 248],
      ].map(([s, x]) => (
        <Mono key={s} x={x as number} y={52} t={t} size={7.5}>{s}</Mono>
      ))}
      <Mono x={412} y={52} t={t} size={7.5} anchor="end">STATUS</Mono>
      <path d="M28 60 H412" stroke={t.stroke} />

      {rows.map(([item, stock, pct, low], i) => {
        const y = 64 + i * 30;
        return (
          <g key={item}>
            {low && <rect x={20} y={y} width={400} height={26} rx={8} fill={RED_SOFT} stroke={RED} strokeOpacity={0.5} />}
            <text x={28} y={y + 17} fontSize={11} fontWeight={500} fill={t.text}>{item}</text>
            <text x={172} y={y + 17} className="font-mono" fontSize={9.5} fill={low ? RED_TEXT : t.muted}>{stock}</text>
            <rect x={248} y={y + 11} width={92} height={5} rx={2.5} fill="rgba(255,255,255,0.1)" />
            <rect x={248} y={y + 11} width={92 * pct} height={5} rx={2.5} fill={low ? RED : 'rgba(252,252,244,0.55)'} />
            <rect x={364} y={y + 5} width={48} height={16} rx={8} fill={low ? RED : t.soft} />
            <text x={388} y={y + 16} textAnchor="middle" className="font-mono" fontSize={7.5} letterSpacing={1} fill={low ? PAPER : t.muted}>
              {low ? 'LOW' : 'OK'}
            </text>
          </g>
        );
      })}

      <rect x={14} y={200} width={412} height={48} rx={14} fill={t.soft} stroke={t.stroke} />
      <IconTile x={24} y={209} s={30} Icon={AlertTriangle} hot t={t} />
      <text x={64} y={221} fontSize={12} fontWeight={600} fill={t.text}>Navy dye runs out in 4 days</text>
      <text x={64} y={236} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>AI SHORTAGE CHECK</text>
      <rect x={340} y={211} width={76} height={26} rx={13} fill={RED} />
      <text x={378} y={228} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={PAPER}>Raise PO</text>
    </Scene>
  );
}

/* ───────────────────────── Dashboards & reporting ───────────────────────── */

function ReportingArt() {
  const kpis = [
    { label: 'SALES THIS WEEK', value: 'Tk 4.2M', delta: '+12%', good: true },
    { label: 'ORDERS', value: '1,284', delta: '+8%', good: true },
    { label: 'AVG. DELIVERY', value: '2.4 days', delta: '+0.3', good: false },
  ];
  const pts = [62, 54, 58, 44, 48, 36, 40, 24];
  const px = (i: number) => 30 + i * 34;
  const line = pts.map((v, i) => `${i ? 'L' : 'M'}${px(i)} ${100 + v}`).join(' ');
  const branches: [string, number][] = [
    ['Dhaka', 1],
    ['Ctg', 0.72],
    ['Sylhet', 0.48],
    ['Khulna', 0.36],
  ];
  return (
    <Scene label="Dashboard with sales, orders and delivery KPIs, a sales trend, sales by branch and a scheduled weekly report">
      {kpis.map((k, i) => {
        const x = 14 + i * 140;
        return (
          <g key={k.label}>
            <Card x={x} y={10} w={132} h={58} />
            <text x={x + 12} y={28} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>{k.label}</text>
            <text x={x + 12} y={54} fontSize={17} fontWeight={700} fill={t.text}>{k.value}</text>
            <text x={x + 120} y={54} textAnchor="end" fontSize={10} fontWeight={600} fill={k.good ? GREEN : RED_TEXT}>{k.delta}</text>
          </g>
        );
      })}

      <Card x={14} y={78} w={268} h={120} r={14} />
      <Mono x={26} y={96} t={t} size={7.5}>SALES · LAST 8 WEEKS</Mono>
      {[122, 146, 170].map((y) => (
        <path key={y} d={`M26 ${y} H270`} stroke={t.soft} />
      ))}
      <path d={`${line} L${px(7)} 186 L${px(0)} 186 Z`} fill={RED} fillOpacity={0.12} />
      <path d={line} fill="none" stroke={RED} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={px(7)} cy={124} r={4} fill={RED} className="animate-pulse" />

      <Card x={290} y={78} w={136} h={120} r={14} />
      <Mono x={302} y={96} t={t} size={7.5}>BY BRANCH</Mono>
      {branches.map(([name, v], i) => {
        const y = 114 + i * 20;
        return (
          <g key={name}>
            <text x={302} y={y + 7} fontSize={9.5} fill={t.muted}>{name}</text>
            <rect x={344} y={y} width={70 * v} height={8} rx={4} fill={i === 0 ? RED : 'rgba(252,252,244,0.35)'} />
          </g>
        );
      })}

      <rect x={14} y={208} width={412} height={40} rx={14} fill={t.soft} stroke={t.stroke} />
      <IconTile x={22} y={214} s={28} Icon={Mail} hot t={t} />
      <text x={60} y={232} fontSize={11.5} fontWeight={600} fill={t.text}>Weekly report</text>
      <text x={146} y={232} fontSize={10} fill={t.muted}>Every Monday, 9:00 am, to management</text>
      <text x={414} y={232} textAnchor="end" className="font-mono" fontSize={7.5} letterSpacing={1} fill={RED_TEXT}>SCHEDULED</text>
    </Scene>
  );
}

/* ───────────────────────── Custom software & SaaS ───────────────────────── */

function SoftwareArt() {
  const nav: [LucideIcon, string][] = [
    [LayoutDashboard, 'Dashboard'],
    [ClipboardList, 'Orders'],
    [Users, 'Customers'],
    [Boxes, 'Stock'],
    [Settings, 'Settings'],
  ];
  const orders: [string, string, string, string][] = [
    ['#1042', 'Rahman Traders', 'Tk 18,400', 'PAID'],
    ['#1041', 'Nur Textiles', 'Tk 6,250', 'PENDING'],
    ['#1040', 'Bay Foods', 'Tk 42,900', 'SHIPPED'],
    ['#1039', 'Lotus Pharma', 'Tk 9,800', 'PAID'],
  ];
  return (
    <Scene label="A custom web app with navigation, an orders table, a code snippet and a release deployed notice">
      <Card x={14} y={10} w={412} h={240} r={14} />
      {[30, 42, 54].map((cx, i) => (
        <circle key={cx} cx={cx} cy={28} r={3.5} fill={i === 2 ? RED : 'rgba(255,255,255,0.25)'} />
      ))}
      <rect x={70} y={19} width={162} height={18} rx={9} fill={t.soft} />
      <Lock x={80} y={23} width={10} height={10} color={t.muted} strokeWidth={2.4} />
      <text x={96} y={31} className="font-mono" fontSize={8} fill={t.muted}>app.yourcompany.com</text>
      <path d="M14 46 H426 M104 46 V250" stroke={t.stroke} />

      {nav.map(([Icon, label], i) => {
        const y = 56 + i * 24;
        const on = i === 1;
        return (
          <g key={label}>
            {on && <rect x={20} y={y} width={78} height={20} rx={7} fill={RED_SOFT} />}
            <Icon x={28} y={y + 4} width={12} height={12} color={on ? RED_TEXT : t.muted} strokeWidth={2} />
            <text x={46} y={y + 14} fontSize={9.5} fontWeight={on ? 600 : 400} fill={on ? RED_TEXT : t.muted}>{label}</text>
          </g>
        );
      })}

      <text x={118} y={70} fontSize={14} fontWeight={700} fill={t.text}>Orders</text>
      <rect x={340} y={56} width={74} height={20} rx={10} fill={RED} />
      <text x={377} y={69.5} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={PAPER}>+ New order</text>
      {orders.map(([id, name, amt, status], i) => {
        const y = 86 + i * 26;
        const tone = status === 'PENDING' ? { bg: RED_SOFT, fg: RED_TEXT } : status === 'PAID' ? { bg: 'rgba(34,197,94,0.14)', fg: GREEN } : { bg: t.soft, fg: t.muted };
        return (
          <g key={id}>
            <rect x={116} y={y} width={298} height={22} rx={6} fill={i % 2 ? 'transparent' : t.soft} />
            <text x={126} y={y + 14.5} className="font-mono" fontSize={8.5} fill={t.faint}>{id}</text>
            <text x={164} y={y + 14.5} fontSize={10} fill={t.text}>{name}</text>
            <text x={278} y={y + 14.5} className="font-mono" fontSize={8.5} fill={t.muted}>{amt}</text>
            <rect x={354} y={y + 4} width={54} height={14} rx={7} fill={tone.bg} />
            <text x={381} y={y + 13.5} textAnchor="middle" className="font-mono" fontSize={7} letterSpacing={0.8} fill={tone.fg}>{status}</text>
          </g>
        );
      })}

      <rect x={116} y={196} width={108} height={44} rx={10} fill="#0e0e11" stroke={t.stroke} />
      <text x={126} y={214} className="font-mono" fontSize={8} fill={t.muted}>
        <tspan fill={RED_TEXT}>await</tspan> save(order)
      </text>
      <text x={126} y={229} className="font-mono" fontSize={8} fill={t.faint}>// typed, tested</text>

      <g className="cr-float">
        <Card x={232} y={194} w={182} h={46} hot />
        <IconTile x={242} y={202} s={30} Icon={Rocket} hot t={t} />
        <text x={280} y={215} fontSize={11.5} fontWeight={600} fill={t.text}>Release v2.4 live</text>
        <text x={280} y={229} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>ALL CHECKS PASSED</text>
      </g>
    </Scene>
  );
}

/** Mega-menu preview graphic per core-service id (all drawn for the dark preview box). */
export const serviceMenuArt: Record<string, () => ReactNode> = {
  'ai-agents': () => <AgentsArt />,
  chatbots: () => <ChatArt />,
  voice: () => <VoiceArt />,
  'workflow-automation': () => <WorkflowArt />,
  'knowledge-rag': () => <KnowledgeArt />,
  integrations: () => <IntegrationsArt />,
  'business-systems': () => <SystemsArt />,
  reporting: () => <ReportingArt />,
  'custom-software': () => <SoftwareArt />,
};
