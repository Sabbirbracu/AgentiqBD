import {
  Bell,
  BookOpen,
  Bot,
  Boxes,
  Calendar,
  CalendarCheck,
  Check,
  Code2,
  Database,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Globe,
  Headphones,
  LayoutDashboard,
  Lock,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Rocket,
  ScrollText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  UserCog,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { ErpVisual, FlowLink, Frame, IconTile, Mono, RED, WorkflowVisual, theme, type Theme } from './agent/service-visuals';

/**
 * Hero graphics for the service landing pages: one architecture-style diagram per service, drawn for the dark
 * hero. Same primitives and palette as the brand kit (agent/service-visuals). Names, times and figures inside
 * are sample values, never claims.
 */

const t = theme(true);
const GREEN = '#22c55e';

function Card({ x, y, w, h, hot, r = 16 }: { x: number; y: number; w: number; h: number; hot?: boolean; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={t.panel} stroke={hot ? RED : t.stroke} strokeWidth={hot ? 1.6 : 1} />;
}

/** Icon tile + title + mono subline, the standard node of these diagrams. */
function Node({ x, y, w, Icon, name, sub, hot, t: th = t }: { x: number; y: number; w: number; Icon: LucideIcon; name: string; sub: string; hot?: boolean; t?: Theme }) {
  return (
    <g>
      <Card x={x} y={y} w={w} h={56} r={14} />
      <IconTile x={x + 12} y={y + 11} s={34} Icon={Icon} hot={hot} t={th} />
      <text x={x + 56} y={y + 26} fontSize={13.5} fontWeight={600} fill={th.text}>{name}</text>
      <text x={x + 56} y={y + 42} className="font-mono" fontSize={9.5} letterSpacing={1.2} fill={th.muted}>{sub}</text>
    </g>
  );
}

function CheckBar({ y, items }: { y: number; items: string[] }) {
  return (
    <g>
      <rect x={20} y={y} width={648} height={52} rx={16} fill={t.soft} stroke={t.stroke} />
      {items.map((s, i) => (
        <g key={s}>
          <circle cx={46 + i * 214} cy={y + 26} r={9} fill={RED} />
          <Check x={46 + i * 214 - 5.5} y={y + 26 - 5.5} width={11} height={11} color="#FCFCF4" strokeWidth={3} />
          <text x={64 + i * 214} y={y + 31} fontSize={12.5} fontWeight={500} fill={t.text}>{s}</text>
        </g>
      ))}
    </g>
  );
}

function Chip({ x, y, w, children, hot }: { x: number; y: number; w: number; children: string; hot?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={24} rx={12} fill={hot ? 'rgba(232,79,61,0.16)' : t.soft} stroke={hot ? 'none' : t.stroke} />
      <text x={x + 12} y={y + 16} className="font-mono" fontSize={9} letterSpacing={1.4} fill={hot ? '#F08272' : t.muted}>
        {children}
      </text>
    </g>
  );
}

/* ───────────────────────── AI agents ───────────────────────── */

function AgentsHero({ className }: { className?: string }) {
  const rows = [84, 166, 248];
  const ins = [
    { Icon: MessageCircle, name: 'WhatsApp', msg: 'Where is order #1042?' },
    { Icon: Globe, name: 'Website', msg: 'Quote for 50 units?' },
    { Icon: Mail, name: 'Email', msg: 'Visit on Thursday?' },
  ];
  const agents = [
    { Icon: Headphones, name: 'SupportAgent', sub: 'LOOKING UP ORDER' },
    { Icon: Target, name: 'LeadAgent', sub: 'QUALIFYING' },
    { Icon: CalendarCheck, name: 'BookingAgent', sub: 'OFFERING SLOTS' },
  ];
  const outs = [
    { Icon: Boxes, name: 'ERP', sub: 'ORDER FOUND' },
    { Icon: Users, name: 'CRM', sub: 'LEAD SCORED' },
    { Icon: Calendar, name: 'Calendar', sub: 'THU 6:15 PM HELD' },
  ];
  return (
    <Frame dark label="AI Employees taking requests from WhatsApp, website and email, updating the ERP, CRM and calendar, with human approval" className={className}>
      <Mono x={20} y={30} t={t}>INCOMING</Mono>
      <Mono x={232} y={30} t={t}>AI EMPLOYEES</Mono>
      <Mono x={492} y={30} t={t}>YOUR SYSTEMS</Mono>

      {rows.map((cy, i) => (
        <g key={cy}>
          <FlowLink i={i} t={t} d={`M196 ${cy} H232`} />
          <FlowLink i={i + 1} t={t} d={`M456 ${cy} H492`} />
        </g>
      ))}

      {ins.map((n, i) => (
        <g key={n.name}>
          <Card x={20} y={rows[i] - 32} w={176} h={64} r={14} />
          <IconTile x={32} y={rows[i] - 17} Icon={n.Icon} t={t} />
          <text x={76} y={rows[i] - 3} fontSize={13} fontWeight={600} fill={t.text}>{n.name}</text>
          <text x={76} y={rows[i] + 14} fontSize={10.5} fill={t.muted}>{n.msg}</text>
        </g>
      ))}

      <Card x={232} y={44} w={224} h={244} hot r={20} />
      {agents.map((a, i) => (
        <g key={a.name}>
          <IconTile x={248} y={rows[i] - 18} s={36} Icon={a.Icon} hot={i === 0} t={t} />
          <text x={296} y={rows[i] - 2} fontSize={14} fontWeight={600} fill={t.text}>{a.name}</text>
          <text x={296} y={rows[i] + 15} className="font-mono" fontSize={9} letterSpacing={1.2} fill={t.muted}>{a.sub}</text>
          <circle cx={438} cy={rows[i]} r={4} fill={GREEN} className="animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
          {i < 2 && <path d={`M248 ${rows[i] + 41} H440`} stroke={t.stroke} />}
        </g>
      ))}

      {outs.map((n, i) => (
        <Node key={n.name} x={492} y={rows[i] - 28} w={176} Icon={n.Icon} name={n.name} sub={n.sub} />
      ))}

      <rect x={20} y={314} width={648} height={66} rx={16} fill={t.soft} stroke={t.stroke} />
      <IconTile x={34} y={330} s={34} Icon={ShieldCheck} hot t={t} />
      <text x={82} y={344} fontSize={13.5} fontWeight={600} fill={t.text}>Human approval</text>
      <text x={82} y={362} fontSize={11.5} fill={t.muted}>Refund above the limit is waiting for a manager</text>
      <rect x={512} y={333} width={70} height={28} rx={14} fill={RED} />
      <text x={547} y={351} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#FCFCF4">Approve</text>
      <rect x={590} y={333} width={64} height={28} rx={14} fill="none" stroke={t.line} />
      <text x={622} y={351} textAnchor="middle" fontSize={11.5} fontWeight={500} fill={t.text}>Review</text>
    </Frame>
  );
}

/* ───────────────────────── Chatbots ───────────────────────── */

function ChatHero({ className }: { className?: string }) {
  const channels = [
    { Icon: Globe, name: 'Website chat' },
    { Icon: MessageCircle, name: 'WhatsApp' },
    { Icon: MessagesSquare, name: 'Messenger' },
  ];
  const customer = 'rgba(255,255,255,0.1)';
  return (
    <Frame dark label="AI chatbot answering a delivery question from a policy document and handing a sales question to the team" className={className}>
      {/* chat window */}
      <Card x={20} y={16} w={372} h={368} r={20} />
      <circle cx={52} cy={48} r={17} fill={RED} />
      <Bot x={42} y={38} width={20} height={20} color="#FCFCF4" strokeWidth={2} />
      <text x={80} y={45} fontSize={14} fontWeight={600} fill={t.text}>Assistant</text>
      <circle cx={84} cy={59} r={3} fill={GREEN} />
      <Mono x={93} y={62} t={t} size={9}>ONLINE · YOUR KNOWLEDGE BASE</Mono>
      <path d="M20 80 H392" stroke={t.stroke} />

      <rect x={170} y={96} width={206} height={34} rx={14} fill={customer} />
      <text x={184} y={117} fontSize={12.5} fill={t.text}>Do you deliver to Chattogram?</text>

      <rect x={36} y={142} width={262} height={52} rx={14} fill={t.tile} />
      <text x={50} y={163} fontSize={12.5} fill={t.text}>Yes. Orders to Chattogram usually</text>
      <text x={50} y={181} fontSize={12.5} fill={t.text}>arrive in 2–3 working days.</text>
      <rect x={36} y={200} width={178} height={22} rx={11} fill={t.soft} stroke={t.stroke} />
      <FileText x={46} y={205} width={12} height={12} color={RED} strokeWidth={2} />
      <Mono x={64} y={215} t={t} size={9}>DELIVERY POLICY.PDF</Mono>

      <rect x={120} y={236} width={256} height={34} rx={14} fill={customer} />
      <text x={134} y={257} fontSize={12.5} fill={t.text}>Can someone help with bulk pricing?</text>

      <rect x={36} y={282} width={262} height={34} rx={14} fill={t.tile} />
      <text x={50} y={303} fontSize={12.5} fill={t.text}>Sure, passing you to our sales team.</text>
      <Chip x={36} y={326} w={252} hot>HANDED TO SALES · CHAT ATTACHED</Chip>

      {/* channels, knowledge, CRM */}
      <Mono x={424} y={34} t={t}>CHANNELS</Mono>
      {channels.map((c, i) => {
        const y = 46 + i * 46;
        return (
          <g key={c.name}>
            <FlowLink i={i} t={t} d={`M424 ${y + 18} C 408 ${y + 18}, 408 190, 392 190`} />
            <rect x={424} y={y} width={244} height={36} rx={18} fill={t.panel} stroke={t.stroke} />
            <c.Icon x={440} y={y + 10} width={16} height={16} color={t.muted} strokeWidth={2} />
            <text x={466} y={y + 23} fontSize={13} fontWeight={600} fill={t.text}>{c.name}</text>
            <circle cx={650} cy={y + 18} r={3.5} fill={GREEN} />
          </g>
        );
      })}

      <Mono x={424} y={210} t={t}>ANSWERS FROM</Mono>
      <FlowLink i={1} t={t} d="M424 262 C 408 262, 408 236, 392 236" />
      <Card x={424} y={222} w={244} h={80} r={14} />
      <IconTile x={436} y={234} s={32} Icon={BookOpen} t={t} />
      <text x={480} y={248} fontSize={13.5} fontWeight={600} fill={t.text}>Knowledge base</text>
      <Mono x={480} y={264} t={t} size={9}>FAQS · POLICIES · PRICES</Mono>
      <rect x={436} y={282} width={70} height={5} rx={2.5} fill={t.line} />
      <rect x={514} y={282} width={92} height={5} rx={2.5} fill={RED} opacity={0.6} />
      <rect x={614} y={282} width={40} height={5} rx={2.5} fill={t.line} />

      <FlowLink i={2} t={t} d="M392 340 C 408 340, 408 346, 424 346" />
      <Card x={424} y={318} w={244} h={58} r={14} />
      <IconTile x={436} y={330} s={34} Icon={UserPlus} hot t={t} />
      <text x={482} y={345} fontSize={13.5} fontWeight={600} fill={t.text}>Lead saved to CRM</text>
      <Mono x={482} y={361} t={t} size={9}>NAME · PHONE · REQUEST</Mono>
    </Frame>
  );
}

/* ───────────────────────── Voice ───────────────────────── */

function VoiceHero({ className }: { className?: string }) {
  const wave = [30, 52, 74, 40, 88, 60, 34, 70, 46, 92, 58, 38, 66, 82, 44, 30, 62, 78, 50, 36, 70, 54, 86, 42, 30, 48];
  const slots = [
    { time: '10:00', label: 'Booked', kind: 'busy' },
    { time: '10:30', label: 'Booked', kind: 'busy' },
    { time: '11:00', label: 'Free', kind: 'free' },
    { time: '11:30', label: 'Check-up · new booking', kind: 'new' },
    { time: '12:00', label: 'Free', kind: 'free' },
  ];
  const lines: { who: 'CALLER' | 'AGENT'; y: number; text: string }[] = [
    { who: 'CALLER', y: 222, text: 'Can I book a check-up on Saturday?' },
    { who: 'AGENT', y: 258, text: 'Saturday 11:30 am is free.' },
    { who: 'AGENT', y: 276, text: 'Shall I book it?' },
    { who: 'CALLER', y: 310, text: 'Yes, please.' },
    { who: 'AGENT', y: 344, text: 'Booked. A confirmation SMS' },
    { who: 'AGENT', y: 362, text: 'is on its way.' },
  ];
  return (
    <Frame dark label="Voice AI agent answering a call, booking a Saturday slot in the calendar and saving a call summary" className={className}>
      <Card x={20} y={16} w={300} h={136} r={18} />
      <IconTile x={34} y={30} s={36} Icon={Phone} hot t={t} />
      <text x={82} y={45} fontSize={14} fontWeight={600} fill={t.text}>Incoming call</text>
      <Mono x={82} y={62} t={t} size={10}>+880 17•• ••• 421</Mono>
      <rect x={240} y={32} width={66} height={22} rx={11} fill={t.soft} stroke={t.stroke} />
      <circle cx={253} cy={43} r={3.5} fill={GREEN} className="animate-pulse" />
      <Mono x={263} y={47} t={t} size={9}>LIVE</Mono>
      {wave.map((h, i) => {
        const bh = h * 0.42;
        return (
          <rect
            key={i}
            x={36 + i * 10.6}
            y={118 - bh / 2}
            width={5}
            height={bh}
            rx={2.5}
            fill={RED}
            opacity={0.35 + (h / 100) * 0.65}
            className="animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        );
      })}

      <Card x={20} y={168} w={300} h={216} r={18} />
      <Mono x={36} y={194} t={t} size={9.5}>LIVE TRANSCRIPT</Mono>
      {lines.map((l, i) => (
        <g key={i}>
          {(i === 0 || lines[i - 1].who !== l.who) && (
            <text x={36} y={l.y} className="font-mono" fontSize={8.5} letterSpacing={1.4} fill={l.who === 'AGENT' ? RED : t.faint}>
              {l.who}
            </text>
          )}
          <text x={100} y={l.y} fontSize={12} fill={l.who === 'AGENT' ? t.text : t.muted}>{l.text}</text>
        </g>
      ))}

      <FlowLink i={0} t={t} d="M320 84 H352" />
      <Card x={352} y={16} w={316} h={236} r={18} />
      <Mono x={368} y={40} t={t} size={9.5}>CALENDAR</Mono>
      <text x={368} y={64} fontSize={16} fontWeight={650} fill={t.text}>Saturday</text>
      {slots.map((s, i) => {
        const y = 80 + i * 32;
        return (
          <g key={s.time}>
            <Mono x={368} y={y + 17} t={t} size={10}>{s.time}</Mono>
            <rect
              x={420}
              y={y}
              width={232}
              height={26}
              rx={8}
              fill={s.kind === 'new' ? RED : s.kind === 'busy' ? t.soft : 'none'}
              stroke={s.kind === 'free' ? t.stroke : 'none'}
              strokeDasharray={s.kind === 'free' ? '4 4' : undefined}
            />
            <text x={432} y={y + 17} fontSize={11.5} fontWeight={s.kind === 'new' ? 600 : 500} fill={s.kind === 'new' ? '#FCFCF4' : s.kind === 'busy' ? t.muted : t.faint}>
              {s.label}
            </text>
          </g>
        );
      })}

      <FlowLink i={1} t={t} d="M510 252 V268" />
      <Card x={352} y={268} w={316} h={116} r={18} />
      <IconTile x={368} y={284} s={34} Icon={FileText} t={t} />
      <text x={414} y={299} fontSize={13.5} fontWeight={600} fill={t.text}>Call summary saved</text>
      <Mono x={414} y={315} t={t} size={9}>SENT TO CRM</Mono>
      <text x={368} y={346} fontSize={12} fill={t.muted}>Intent: booking · Sat 11:30 am</text>
      <text x={368} y={366} fontSize={12} fill={t.muted}>Status: confirmed by caller</text>
      <circle cx={644} cy={301} r={10} fill={GREEN} opacity={0.18} />
      <Check x={638} y={295} width={12} height={12} color={GREEN} strokeWidth={3} />
    </Frame>
  );
}

/* ───────────────────────── Knowledge base & RAG ───────────────────────── */

function KnowledgeHero({ className }: { className?: string }) {
  const docs = [
    { name: 'Returns SOP.pdf', sub: 'OPERATIONS' },
    { name: 'HR policy.docx', sub: 'PEOPLE' },
    { name: 'Price list.xlsx', sub: 'SALES' },
  ];
  return (
    <Frame dark label="Retrieval-augmented answer: documents are searched, the best passages retrieved, and the answer cites its source" className={className}>
      <Mono x={20} y={30} t={t}>YOUR DOCUMENTS</Mono>
      <Mono x={226} y={30} t={t}>RETRIEVAL</Mono>
      <Mono x={478} y={30} t={t}>ANSWER</Mono>

      {docs.map((d, i) => {
        const y = 44 + i * 70;
        return (
          <g key={d.name}>
            <FlowLink i={i} t={t} d={`M192 ${y + 29} C 209 ${y + 29}, 209 167, 226 167`} />
            <Card x={20} y={y} w={172} h={58} r={14} />
            <IconTile x={32} y={y + 12} s={34} Icon={FileText} hot={i === 0} t={t} />
            <text x={76} y={y + 27} fontSize={12.5} fontWeight={600} fill={t.text}>{d.name}</text>
            <Mono x={76} y={y + 43} t={t} size={9}>{d.sub}</Mono>
          </g>
        );
      })}
      <rect x={20} y={258} width={172} height={32} rx={16} fill={t.soft} stroke={t.stroke} />
      <Lock x={36} y={267} width={14} height={14} color={RED} strokeWidth={2} />
      <text x={58} y={279} fontSize={11.5} fill={t.muted}>Access by role</text>

      <Card x={226} y={44} w={220} h={246} r={18} />
      <rect x={238} y={56} width={196} height={52} rx={12} fill={t.soft} stroke={t.stroke} />
      <Search x={250} y={65} width={14} height={14} color={RED} strokeWidth={2.2} />
      <text x={272} y={76} fontSize={12} fill={t.text}>How long do customers</text>
      <text x={272} y={94} fontSize={12} fill={t.text}>have to return an item?</text>
      <Mono x={238} y={132} t={t} size={9}>TOP PASSAGES</Mono>
      {[0, 1].map((i) => {
        const y = 142 + i * 70;
        const hot = i === 0;
        return (
          <g key={i}>
            <rect x={238} y={y} width={196} height={60} rx={10} fill={t.soft} stroke={hot ? 'rgba(232,79,61,0.45)' : t.stroke} />
            {hot && <rect x={238} y={y + 10} width={3} height={40} rx={1.5} fill={RED} />}
            <text x={250} y={y + 18} className="font-mono" fontSize={9} letterSpacing={1.3} fill={hot ? '#F08272' : t.faint}>
              {hot ? '[1] RETURNS SOP · §2' : '[2] RETURNS SOP · §4'}
            </text>
            <rect x={250} y={y + 28} width={160} height={5} rx={2.5} fill={hot ? RED : t.line} opacity={hot ? 0.65 : 1} />
            <rect x={250} y={y + 40} width={128} height={5} rx={2.5} fill={t.line} />
          </g>
        );
      })}

      <FlowLink i={2} t={t} d="M446 167 H478" />
      <Card x={478} y={44} w={190} h={246} hot r={18} />
      <IconTile x={492} y={58} s={32} Icon={Sparkles} hot t={t} />
      <text x={534} y={79} fontSize={14} fontWeight={600} fill={t.text}>Answer</text>
      {['Unused items can be', 'returned within the', 'period set in §2 of', 'the Returns SOP, with', 'the original receipt.'].map((l, i) => (
        <text key={l} x={492} y={120 + i * 18} fontSize={12} fill={t.text}>{l}</text>
      ))}
      <Chip x={492} y={218} w={162} hot>[1] RETURNS SOP · §2</Chip>
      <Check x={492} y={258} width={13} height={13} color={GREEN} strokeWidth={3} />
      <text x={512} y={269} fontSize={11.5} fill={t.muted}>Source attached</text>

      <CheckBar y={318} items={['Answers from your files', 'Every answer has a source', 'Says when it doesn’t know']} />
    </Frame>
  );
}

/* ───────────────────────── Integrations ───────────────────────── */

function IntegrationsHero({ className }: { className?: string }) {
  const rows = [86, 166, 246];
  const left = [
    { Icon: Users, name: 'CRM', sub: 'CONTACTS · DEALS' },
    { Icon: Boxes, name: 'ERP', sub: 'ORDERS · STOCK' },
    { Icon: Database, name: 'Database', sub: 'SQL · RECORDS' },
  ];
  const right = [
    { Icon: MessageCircle, name: 'WhatsApp', sub: 'CUSTOMER CHAT' },
    { Icon: Mail, name: 'Email', sub: 'INBOX' },
    { Icon: FileSpreadsheet, name: 'Sheets', sub: 'SPREADSHEETS' },
  ];
  const guards = [
    { Icon: Lock, label: 'Authentication' },
    { Icon: ShieldCheck, label: 'Permissions' },
    { Icon: ScrollText, label: 'Audit log' },
  ];
  return (
    <Frame dark label="AI integration layer connecting CRM, ERP and database with WhatsApp, email and spreadsheets, with authentication, permissions and an audit log" className={className}>
      <Mono x={20} y={30} t={t}>YOUR SYSTEMS</Mono>
      <Mono x={344} y={30} t={t} anchor="middle">AI INTEGRATION LAYER</Mono>
      <Mono x={668} y={30} t={t} anchor="end">YOUR CHANNELS</Mono>

      {rows.map((cy, i) => (
        <g key={cy}>
          <FlowLink i={i} t={t} d={`M180 ${cy} C 212 ${cy}, 212 166, 244 166`} />
          <FlowLink i={i + 1} t={t} d={`M444 166 C 476 166, 476 ${cy}, 508 ${cy}`} />
        </g>
      ))}
      {left.map((n, i) => (
        <Node key={n.name} x={20} y={rows[i] - 28} w={160} Icon={n.Icon} name={n.name} sub={n.sub} />
      ))}
      {right.map((n, i) => (
        <Node key={n.name} x={508} y={rows[i] - 28} w={160} Icon={n.Icon} name={n.name} sub={n.sub} />
      ))}

      <Card x={244} y={52} w={200} h={228} hot r={22} />
      <IconTile x={322} y={70} s={44} Icon={Sparkles} hot t={t} />
      <text x={344} y={140} textAnchor="middle" fontSize={15} fontWeight={650} fill={t.text}>AI layer</text>
      <Mono x={344} y={158} t={t} size={9} anchor="middle">READS · DECIDES · UPDATES</Mono>
      {guards.map((g, i) => {
        const y = 176 + i * 30;
        return (
          <g key={g.label}>
            <rect x={262} y={y} width={164} height={24} rx={12} fill={t.soft} stroke={t.stroke} />
            <g.Icon x={274} y={y + 5} width={14} height={14} color={RED} strokeWidth={2} />
            <text x={296} y={y + 16} fontSize={11.5} fontWeight={500} fill={t.text}>{g.label}</text>
          </g>
        );
      })}

      <CheckBar y={318} items={['Two-way sync', 'Permissions and logging', 'No rebuild needed']} />
    </Frame>
  );
}

/* ───────────────────────── Custom software ───────────────────────── */

function SoftwareHero({ className }: { className?: string }) {
  const nav = [
    { Icon: UserCog, name: 'Admin' },
    { Icon: Users, name: 'Staff' },
    { Icon: Store, name: 'Customers' },
    { Icon: LayoutDashboard, name: 'Reports' },
  ];
  const kpis = [
    ['OPEN', '24'],
    ['PAID', '112'],
    ['SHIPPED', '86'],
  ];
  const orders = [
    { id: '#1042', branch: 'Dhaka', status: 'New', hot: true },
    { id: '#1041', branch: 'Chattogram', status: 'Paid' },
    { id: '#1040', branch: 'Sylhet', status: 'Shipped' },
    { id: '#1039', branch: 'Khulna', status: 'Pending' },
  ];
  const stages = [
    { Icon: Code2, name: 'Build', sub: 'REVIEWED' },
    { Icon: FlaskConical, name: 'Test', sub: 'AUTOMATED' },
    { Icon: Rocket, name: 'Deploy', sub: 'LIVE', hot: true },
  ];
  return (
    <Frame dark label="Custom web application with role-based portals, an orders view and a build, test and deploy pipeline with isolated customer data" className={className}>
      <Card x={20} y={16} w={468} h={368} r={18} />
      <path d="M20 52 H488" stroke={t.stroke} />
      <circle cx={40} cy={34} r={4} fill={t.line} />
      <circle cx={54} cy={34} r={4} fill={t.line} />
      <circle cx={68} cy={34} r={4} fill={RED} />
      <rect x={88} y={24} width={168} height={20} rx={10} fill={t.soft} />
      <Mono x={100} y={38} t={t} size={9}>APP.YOURCOMPANY.COM</Mono>

      <path d="M136 52 V384" stroke={t.stroke} />
      <Mono x={32} y={76} t={t} size={9}>PORTALS</Mono>
      {nav.map((n, i) => {
        const y = 88 + i * 34;
        const on = i === 0;
        return (
          <g key={n.name}>
            {on && <rect x={28} y={y} width={100} height={28} rx={8} fill={t.soft} />}
            {on && <rect x={28} y={y + 7} width={3} height={14} rx={1.5} fill={RED} />}
            <n.Icon x={40} y={y + 7} width={14} height={14} color={on ? RED : t.muted} strokeWidth={2} />
            <text x={62} y={y + 19} fontSize={12} fontWeight={on ? 600 : 500} fill={on ? t.text : t.muted}>{n.name}</text>
          </g>
        );
      })}

      <text x={156} y={82} fontSize={18} fontWeight={650} fill={t.text}>Orders</text>
      <Mono x={156} y={100} t={t} size={9}>ALL BRANCHES</Mono>
      <rect x={404} y={68} width={68} height={26} rx={13} fill={RED} />
      <text x={438} y={85} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#FCFCF4">+ New</text>
      {kpis.map(([k, v], i) => (
        <g key={k}>
          <rect x={156 + i * 108} y={116} width={98} height={58} rx={12} fill={t.soft} stroke={t.stroke} />
          <Mono x={168 + i * 108} y={136} t={t} size={8.5}>{k}</Mono>
          <text x={168 + i * 108} y={161} fontSize={18} fontWeight={650} fill={t.text}>{v}</text>
        </g>
      ))}

      <Mono x={156} y={200} t={t} size={8.5}>ORDER</Mono>
      <Mono x={236} y={200} t={t} size={8.5}>BRANCH</Mono>
      <Mono x={380} y={200} t={t} size={8.5}>STATUS</Mono>
      <path d="M156 208 H472" stroke={t.stroke} />
      {orders.map((o, i) => {
        const y = 214 + i * 40;
        return (
          <g key={o.id}>
            <text x={156} y={y + 22} className="font-mono" fontSize={10.5} fill={t.muted}>{o.id}</text>
            <text x={236} y={y + 22} fontSize={12} fill={t.text}>{o.branch}</text>
            <rect x={380} y={y + 7} width={76} height={22} rx={11} fill={o.hot ? RED : t.soft} />
            <text x={418} y={y + 22} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={o.hot ? '#FCFCF4' : t.muted}>{o.status}</text>
            {i < orders.length - 1 && <path d={`M156 ${y + 36} H472`} stroke={t.stroke} strokeDasharray="2 5" />}
          </g>
        );
      })}

      <Mono x={512} y={34} t={t}>DELIVERY</Mono>
      <FlowLink i={0} t={t} d="M488 218 H512" />
      {stages.map((s, i) => {
        const y = 46 + i * 72;
        return (
          <g key={s.name}>
            {i < stages.length - 1 && <FlowLink i={i + 1} t={t} d={`M590 ${y + 56} V${y + 72}`} />}
            <Node x={512} y={y} w={156} Icon={s.Icon} name={s.name} sub={s.sub} hot={s.hot} />
          </g>
        );
      })}

      <Card x={512} y={270} w={156} h={114} r={14} />
      <IconTile x={524} y={282} s={30} Icon={Lock} t={t} />
      <text x={564} y={302} fontSize={13} fontWeight={600} fill={t.text}>Isolated data</text>
      {['Centre A', 'Centre B'].map((c, i) => (
        <g key={c}>
          <rect x={524 + i * 70} y={326} width={62} height={24} rx={12} fill={t.soft} stroke={t.stroke} />
          <text x={555 + i * 70} y={342} textAnchor="middle" fontSize={10.5} fontWeight={500} fill={t.text}>{c}</text>
        </g>
      ))}
      <Mono x={524} y={372} t={t} size={8.5}>ONE PORTAL EACH</Mono>
    </Frame>
  );
}

/* ───────────────────────── Dashboards & reporting ───────────────────────── */

function ReportingHero({ className }: { className?: string }) {
  const kpis = [
    { label: 'ORDERS', value: '1,284', delta: '+6%' },
    { label: 'REVENUE · BDT', value: '8.6L', delta: '+4%' },
    { label: 'LOW STOCK', value: '3', delta: '!', hot: true },
  ];
  const pts = [262, 250, 256, 232, 238, 216, 204];
  const X = (i: number) => 40 + i * 64;
  const line = pts.map((y, i) => `${i ? 'L' : 'M'}${X(i)} ${y}`).join(' ');
  return (
    <Frame dark label="Weekly dashboard with sample figures, a trend chart, an AI-written summary, a stock alert and a scheduled report" className={className}>
      <rect x={0.5} y={0.5} width={687} height={399} rx={22} fill={t.panel} stroke={t.stroke} />
      <text x={24} y={44} fontSize={20} fontWeight={650} fill={t.text}>Weekly overview</text>
      <Mono x={24} y={64} t={t} size={9.5}>SALES · STOCK · OPERATIONS</Mono>
      <rect x={560} y={26} width={104} height={26} rx={13} fill={t.soft} stroke={t.stroke} />
      <Mono x={612} y={43} t={t} size={9} anchor="middle">SAMPLE DATA</Mono>

      {kpis.map((k, i) => {
        const x = 24 + i * 144;
        return (
          <g key={k.label}>
            <rect x={x} y={84} width={132} height={72} rx={14} fill={t.soft} stroke={k.hot ? RED : t.stroke} />
            <Mono x={x + 14} y={106} t={t} size={9}>{k.label}</Mono>
            <text x={x + 14} y={138} fontSize={22} fontWeight={650} fill={t.text}>{k.value}</text>
            <rect x={x + 86} y={122} width={34} height={20} rx={10} fill={k.hot ? RED : 'rgba(34,197,94,0.16)'} />
            <text x={x + 103} y={136} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={k.hot ? '#FCFCF4' : GREEN}>{k.delta}</text>
          </g>
        );
      })}

      {[190, 230, 270].map((y) => (
        <path key={y} d={`M24 ${y} H444`} stroke={t.stroke} strokeDasharray="2 5" />
      ))}
      <path d="M24 300.5 H444" stroke={t.line} />
      <path d={`${line} L${X(6)} 300 L${X(0)} 300 Z`} fill={RED} fillOpacity={0.12} />
      <path d={line} fill="none" stroke={RED} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={X(6)} cy={pts[6]} r={4.5} fill={RED} />
      <circle cx={X(6)} cy={pts[6]} r={9} fill={RED} opacity={0.2} className="animate-pulse" />
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <Mono key={i} x={X(i)} y={320} t={t} size={9} anchor="middle">{d}</Mono>
      ))}

      <Card x={468} y={84} w={196} h={150} hot r={16} />
      <IconTile x={482} y={98} s={30} Icon={Sparkles} hot t={t} />
      <text x={522} y={118} fontSize={13.5} fontWeight={600} fill={t.text}>AI summary</text>
      {['Orders are up on last', 'week. 3 items are below', 'reorder level; see the', 'stock view.'].map((l, i) => (
        <text key={l} x={482} y={154 + i * 18} fontSize={12} fill={t.muted}>{l}</text>
      ))}

      <Card x={468} y={248} w={196} h={66} r={16} />
      <IconTile x={482} y={265} s={32} Icon={Bell} t={t} />
      <text x={524} y={280} fontSize={13} fontWeight={600} fill={t.text}>Alert sent</text>
      <Mono x={524} y={296} t={t} size={8.5}>STOCK BELOW REORDER</Mono>

      <rect x={24} y={336} width={640} height={44} rx={14} fill={t.soft} stroke={t.stroke} />
      <Send x={40} y={350} width={16} height={16} color={RED} strokeWidth={2} />
      <text x={66} y={363} fontSize={12.5} fontWeight={600} fill={t.text}>Weekly report</text>
      <text x={166} y={363} fontSize={12} fill={t.muted}>Every Monday, 9:00 am, emailed to management</text>
    </Frame>
  );
}

/** Hero graphic per core-service id (all drawn for the dark hero). */
export const serviceHeroArt: Record<string, (p: { className?: string }) => ReactNode> = {
  'ai-agents': (p) => <AgentsHero {...p} />,
  chatbots: (p) => <ChatHero {...p} />,
  voice: (p) => <VoiceHero {...p} />,
  'workflow-automation': (p) => <WorkflowVisual dark {...p} />,
  'knowledge-rag': (p) => <KnowledgeHero {...p} />,
  integrations: (p) => <IntegrationsHero {...p} />,
  'business-systems': (p) => <ErpVisual dark {...p} />,
  'custom-software': (p) => <SoftwareHero {...p} />,
  reporting: (p) => <ReportingHero {...p} />,
};
