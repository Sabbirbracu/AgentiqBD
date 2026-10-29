import {
  AlertTriangle,
  Boxes,
  Check,
  CreditCard,
  Database,
  Factory,
  FileText,
  LayoutDashboard,
  Lock,
  MessageCircle,
  Rocket,
  ScanSearch,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { FlowLink, IconTile, Mono, RED } from './agent/service-visuals';
import { Card, GREEN, Node, PAPER, RED_SOFT, RED_TEXT, Scene, StatusPill, Tick, t } from './service-menu-art';

/**
 * Preview graphics for the Packages mega menu, drawn for the dark preview box with the same kit as the service
 * previews. Names, prices and figures inside are sample values, never claims.
 */

/* ───────────────────────── 48-hour AI business audit ───────────────────────── */

function AuditArt() {
  const top = [
    ['Auto-answer Messenger enquiries', 'HIGH IMPACT'],
    ['Daily sales & stock summary', 'QUICK WIN'],
    ['End manual invoice entry', 'SAVES HOURS'],
  ];
  return (
    <Scene label="A free audit report delivered within 48 hours, listing the top three opportunities and a roadmap">
      <Card x={14} y={10} w={412} h={240} r={16} />
      <IconTile x={26} y={22} s={30} Icon={ScanSearch} hot t={t} />
      <text x={64} y={34} fontSize={12.5} fontWeight={600} fill={t.text}>Your AI Business Audit</text>
      <text x={64} y={48} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.muted}>WORKFLOWS · OPPORTUNITIES · ROADMAP</text>
      <rect x={362} y={24} width={52} height={22} rx={11} fill={RED} />
      <text x={388} y={38.5} textAnchor="middle" className="font-mono" fontSize={9} fontWeight={700} letterSpacing={1.4} fill={PAPER}>FREE</text>
      <path d="M14 62 H426" stroke={t.stroke} />

      <Mono x={26} y={80} t={t} size={7.5}>DISCOVERY CALL</Mono>
      <Mono x={414} y={80} t={t} size={7.5} anchor="end">REPORT IN YOUR INBOX</Mono>
      <rect x={26} y={88} width={388} height={6} rx={3} fill={RED} />
      {[
        [26, '0 H', undefined],
        [220, '24 H', 'middle'],
        [414, '48 H', 'end'],
      ].map(([x, label, anchor]) => (
        <g key={label as string}>
          <circle cx={x as number} cy={91} r={5.5} fill={RED} stroke={t.panel} strokeWidth={2} />
          <Mono x={x as number} y={110} t={t} size={8} anchor={anchor as 'middle' | 'end' | undefined}>{label}</Mono>
        </g>
      ))}

      <Mono x={26} y={130} t={t} size={7.5}>TOP 3 OPPORTUNITIES</Mono>
      {top.map(([s, impact], i) => {
        const y = 138 + i * 30;
        return (
          <g key={s}>
            <rect x={26} y={y} width={388} height={26} rx={8} fill={i ? t.soft : RED_SOFT} stroke={i ? 'none' : RED} strokeOpacity={0.5} />
            <circle cx={40} cy={y + 13} r={8} fill={i ? t.tile : RED} />
            <text x={40} y={y + 16.5} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={PAPER}>{i + 1}</text>
            <text x={56} y={y + 17} fontSize={10.5} fill={t.text}>{s}</text>
            <rect x={330} y={y + 5} width={78} height={16} rx={8} fill={i ? t.soft : RED} stroke={i ? t.stroke : 'none'} />
            <text x={369} y={y + 15.5} textAnchor="middle" className="font-mono" fontSize={7} letterSpacing={0.8} fill={i ? t.muted : PAPER}>{impact}</text>
          </g>
        );
      })}
      <Mono x={26} y={240} t={t} size={7.5}>NEXT · A ROADMAP OF WHAT TO FIX FIRST AND WHY</Mono>
    </Scene>
  );
}

/* ───────────────────────── AI commerce launch ───────────────────────── */

function CommerceArt() {
  const products = [
    { name: 'Cotton saree', price: 'Tk 2,450', tone: 'rgba(232,79,61,0.34)' },
    { name: 'Jamdani saree', price: 'Tk 2,900', tone: 'rgba(232,79,61,0.2)' },
  ];
  const steps: { Icon: LucideIcon; name: string; sub: string }[] = [
    { Icon: ShoppingCart, name: 'Order placed', sub: 'WEBSITE' },
    { Icon: CreditCard, name: 'Paid', sub: 'BKASH · NAGAD' },
    { Icon: Truck, name: 'Courier booked', sub: 'STEADFAST · REDX' },
    { Icon: MessageCircle, name: 'Buyer updated', sub: 'WHATSAPP · SMS' },
  ];
  return (
    <Scene label="An online store with AI product search, and an order flowing through payment, courier booking and a customer update">
      <Card x={14} y={10} w={254} h={240} r={16} />
      <rect x={26} y={22} width={230} height={30} rx={15} fill={t.soft} stroke={t.stroke} />
      <Sparkles x={37} y={29} width={16} height={16} color={RED_TEXT} strokeWidth={2} />
      <text x={60} y={41} fontSize={10.5} fill={t.text}>Red cotton saree under Tk 3,000</text>
      <Mono x={26} y={70} t={t} size={7.5}>AI SEARCH · 12 MATCHES</Mono>
      {products.map((p, i) => {
        const x = 26 + i * 120;
        return (
          <g key={p.name}>
            <rect x={x} y={78} width={110} height={128} rx={12} fill={t.soft} stroke={i ? t.stroke : RED} strokeOpacity={i ? 1 : 0.6} />
            <rect x={x + 8} y={86} width={94} height={62} rx={8} fill={p.tone} />
            <ShoppingBag x={x + 44} y={106} width={22} height={22} color="rgba(252,252,244,0.75)" strokeWidth={1.8} />
            <text x={x + 10} y={166} fontSize={10.5} fontWeight={600} fill={t.text}>{p.name}</text>
            <text x={x + 10} y={184} className="font-mono" fontSize={9} fill={t.muted}>{p.price}</text>
            <rect x={x + 70} y={173} width={32} height={18} rx={9} fill={RED} />
            <text x={x + 86} y={185.5} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={PAPER}>Add</text>
          </g>
        );
      })}
      <Mono x={26} y={232} t={t} size={7.5}>AI PRODUCT COPY · BANGLA + ENGLISH</Mono>

      <Mono x={282} y={24} t={t} size={8.5}>ORDER #2381</Mono>
      {steps.map((s, i) => {
        const y = 34 + i * 54;
        return (
          <g key={s.name}>
            {i < steps.length - 1 && <FlowLink i={i} t={t} d={`M305 ${y + 44} V${y + 54}`} />}
            <Node x={282} y={y} w={144} Icon={s.Icon} name={s.name} sub={s.sub} hot={i === 1} />
          </g>
        );
      })}
    </Scene>
  );
}

/* ───────────────────────── Custom software & SaaS MVP ───────────────────────── */

function SaasArt() {
  const stages = ['SCOPE', 'DESIGN', 'BUILD', 'LAUNCH'];
  const bars = [18, 24, 22, 30, 34, 32, 42, 46, 52, 60];
  const built: [LucideIcon, string][] = [
    [Lock, 'Login & user roles'],
    [CreditCard, 'Subscriptions & billing'],
    [Webhook, 'APIs & integrations'],
    [Sparkles, 'AI features'],
  ];
  return (
    <Scene label="A SaaS MVP going from scope to launch, with active accounts growing and the core features built in">
      <Card x={14} y={10} w={412} h={96} r={16} />
      <Mono x={28} y={32} t={t} size={8.5}>FROM IDEA TO LAUNCH</Mono>
      <StatusPill x={350} y={17} w={64}>LIVE</StatusPill>
      <path d="M60 66 H360" stroke={RED} strokeWidth={2} />
      {stages.map((s, i) => {
        const x = 60 + i * 100;
        const last = i === stages.length - 1;
        return (
          <g key={s}>
            {last ? (
              <g>
                <circle cx={x} cy={66} r={18} fill={RED_SOFT} className="animate-pulse" />
                <circle cx={x} cy={66} r={12} fill={RED} />
                <Rocket x={x - 6.5} y={59.5} width={13} height={13} color={PAPER} strokeWidth={2} />
              </g>
            ) : (
              <Tick cx={x} cy={66} r={10} />
            )}
            <Mono x={x} y={96} t={t} size={8} anchor="middle">{s}</Mono>
          </g>
        );
      })}

      <Card x={14} y={116} w={200} h={134} r={16} />
      <Mono x={28} y={138} t={t} size={7.5}>ACTIVE ACCOUNTS</Mono>
      <text x={28} y={172} fontSize={26} fontWeight={700} fill={t.text}>128</text>
      <text x={84} y={171} className="font-mono" fontSize={8} letterSpacing={1} fill={GREEN}>+24 THIS MONTH</text>
      {bars.map((h, i) => (
        <rect key={i} x={28 + i * 17.5} y={238 - h} width={11} height={h} rx={3} fill={i === bars.length - 1 ? RED : 'rgba(252,252,244,0.22)'} />
      ))}

      <Card x={222} y={116} w={204} h={134} r={16} />
      <Mono x={236} y={138} t={t} size={7.5}>BUILT IN</Mono>
      {built.map(([Icon, s], i) => {
        const y = 148 + i * 24;
        const ai = i === built.length - 1;
        return (
          <g key={s}>
            <rect x={232} y={y} width={184} height={20} rx={7} fill={ai ? RED_SOFT : t.soft} />
            <Icon x={240} y={y + 4} width={12} height={12} color={ai ? RED_TEXT : t.muted} strokeWidth={2} />
            <text x={260} y={y + 14} fontSize={10} fill={t.text}>{s}</text>
            <Check x={398} y={y + 4} width={12} height={12} color={GREEN} strokeWidth={3} />
          </g>
        );
      })}
    </Scene>
  );
}

/* ───────────────────────── AI & workflow automation ───────────────────────── */

function AutomationArt() {
  const fields = [
    ['VENDOR', 'Bay Foods'],
    ['AMOUNT', 'Tk 42,900'],
    ['DUE', '12 Nov 2026'],
  ];
  return (
    <Scene label="An invoice read by AI and saved to the ERP, and a knowledge assistant answering a staff question from the HR policy">
      <Card x={14} y={10} w={412} h={112} r={16} />
      <Mono x={28} y={32} t={t} size={8.5}>DOCUMENT INTAKE</Mono>
      <StatusPill x={340} y={17} w={74}>RUNNING</StatusPill>

      <rect x={28} y={44} width={86} height={66} rx={10} fill={t.soft} stroke={t.stroke} />
      <FileText x={40} y={54} width={18} height={18} color={t.muted} strokeWidth={2} />
      <text x={40} y={92} className="font-mono" fontSize={8} fill={t.text}>invoice.pdf</text>
      <text x={40} y={103} className="font-mono" fontSize={7} letterSpacing={0.8} fill={t.faint}>EMAIL · 09:14</text>
      <FlowLink i={0} t={t} d="M114 77 H136" />

      <Card x={136} y={44} w={170} h={66} r={10} hot />
      <Sparkles x={286} y={52} width={12} height={12} color={RED_TEXT} strokeWidth={2} />
      {fields.map(([k, v], i) => (
        <g key={k}>
          <text x={148} y={64 + i * 17} className="font-mono" fontSize={7.5} letterSpacing={1} fill={t.faint}>{k}</text>
          <text x={204} y={64 + i * 17} fontSize={10} fill={t.text}>{v}</text>
        </g>
      ))}
      <FlowLink i={1} t={t} d="M306 77 H326" />
      <Node x={326} y={55} w={88} Icon={Database} name="Saved" sub="IN ERP" />

      <Card x={14} y={132} w={412} h={118} r={16} />
      <Mono x={28} y={154} t={t} size={8.5}>KNOWLEDGE ASSISTANT</Mono>
      <Mono x={412} y={154} t={t} size={7.5} anchor="end">HR · SOPS · POLICIES</Mono>
      <rect x={28} y={164} width={150} height={26} rx={13} fill={t.tile} />
      <text x={40} y={181} fontSize={10.5} fill={t.text}>Leave days for new staff?</text>
      <rect x={160} y={196} width={252} height={26} rx={13} fill={RED} />
      <text x={172} y={213} fontSize={10.5} fill={PAPER}>14 days in year one, after probation.</text>
      <rect x={272} y={228} width={140} height={16} rx={8} fill={RED_SOFT} />
      <text x={282} y={239} className="font-mono" fontSize={7} letterSpacing={1} fill={RED_TEXT}>SOURCE · HR POLICY P.2</text>
    </Scene>
  );
}

/* ───────────────────────── Custom business software ───────────────────────── */

function BusinessSoftwareArt() {
  const modules: { Icon: LucideIcon; name: string; sub: string; hot?: boolean }[] = [
    { Icon: Boxes, name: 'Inventory', sub: '12,480 SKUS' },
    { Icon: ShoppingCart, name: 'Procurement', sub: '6 POS PENDING' },
    { Icon: Factory, name: 'Production', sub: 'LINE 2 · 92%' },
    { Icon: Truck, name: 'Logistics', sub: '18 DISPATCHES' },
    { Icon: Store, name: 'Branches', sub: 'DHAKA · CTG · +2' },
    { Icon: LayoutDashboard, name: 'Reports', sub: 'DAILY · 9 PM', hot: true },
  ];
  const branches: [string, number][] = [
    ['Dhaka', 1],
    ['Chattogram', 0.64],
    ['Sylhet', 0.42],
    ['Khulna', 0.3],
  ];
  return (
    <Scene label="A multi-branch operations platform with inventory, procurement, production, logistics and reports, and an AI stock alert">
      <Mono x={14} y={24} t={t} size={9}>OPERATIONS PLATFORM</Mono>
      <StatusPill x={312} y={9} w={114}>4 BRANCHES LIVE</StatusPill>
      {modules.map((m, i) => (
        <Node key={m.name} x={14 + (i % 3) * 140} y={36 + Math.floor(i / 3) * 60} w={132} h={52} Icon={m.Icon} name={m.name} sub={m.sub} hot={m.hot} />
      ))}

      <rect x={14} y={158} width={412} height={92} rx={16} fill={t.soft} stroke={t.stroke} />
      <Mono x={28} y={178} t={t} size={7.5}>STOCK VALUE BY BRANCH</Mono>
      {branches.map(([name, v], i) => {
        const y = 188 + i * 15;
        return (
          <g key={name}>
            <text x={28} y={y + 7.5} fontSize={9.5} fill={t.muted}>{name}</text>
            <rect x={100} y={y} width={160 * v} height={8} rx={4} fill={i === 1 ? RED : 'rgba(252,252,244,0.35)'} />
          </g>
        );
      })}
      <rect x={284} y={172} width={130} height={66} rx={12} fill={RED_SOFT} stroke={RED} strokeOpacity={0.5} />
      <AlertTriangle x={296} y={183} width={14} height={14} color={RED_TEXT} strokeWidth={2.2} />
      <text x={316} y={194.5} fontSize={11} fontWeight={600} fill={t.text}>Ctg stock low</text>
      <text x={296} y={213} fontSize={9.5} fill={t.muted}>2 items below minimum</text>
      <text x={296} y={228} className="font-mono" fontSize={7.5} letterSpacing={1} fill={RED_TEXT}>AI ALERT</text>
    </Scene>
  );
}

/** Mega-menu preview graphic per package id (all drawn for the dark preview box). */
export const packageArt: Record<string, () => ReactNode> = {
  audit: () => <AuditArt />,
  commerce: () => <CommerceArt />,
  'saas-mvp': () => <SaasArt />,
  automation: () => <AutomationArt />,
  'business-software': () => <BusinessSoftwareArt />,
};
