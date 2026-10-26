import { Globe, Mail, MessageCircle, MessagesSquare, Phone, Plug, Database, Inbox, type LucideIcon } from 'lucide-react';
import { AgentTile, type AgentRole } from './tile';

/**
 * Per-role architecture diagram: where the work comes in, which AI Employee handles it,
 * and which systems it updates. Dark-surface only (used on the AI Employees stage).
 * The "systems" values mirror the system lines in each sample conversation.
 */

const channelIcon: Record<string, LucideIcon> = {
  Website: Globe,
  WhatsApp: MessageCircle,
  Messenger: MessagesSquare,
  Email: Mail,
  Voice: Phone,
  CRM: Database,
  'Any integrated channel': Plug,
  Inbox: Inbox,
};

export const hubSystems: Record<string, { label: string; note: string }[]> = {
  support: [
    { label: 'ERP', note: 'Order lookup' },
    { label: 'Helpdesk', note: 'Ticket #2841 logged' },
    { label: 'Notices', note: 'Delivery update' },
  ],
  lead: [
    { label: 'CRM', note: 'Lead scored 86/100' },
    { label: 'Sales team', note: 'Owner assigned' },
    { label: 'Notes', note: 'Context added' },
  ],
  booking: [
    { label: 'Calendar', note: 'Live availability' },
    { label: 'Bookings', note: 'Slot confirmed' },
    { label: 'Reminders', note: '24h and 2h before' },
  ],
  custom: [
    { label: 'Document AI', note: 'Fields extracted' },
    { label: 'Validation', note: 'Mismatch flagged' },
    { label: 'Approvals', note: 'Routed to buyer' },
  ],
};

const W = 560;
const H = 340;
const CY = 176;
const TILE = 96;

export function Hub({ role, channels }: { role: Exclude<AgentRole, 'guard'>; channels: readonly string[] }) {
  const ins = channels.length ? channels : ['Inbox'];
  const outs = hubSystems[role];
  const inY = (i: number) => CY + (i - (ins.length - 1) / 2) * 58;
  const outY = (i: number) => CY + (i - (outs.length - 1) / 2) * 76;
  const L = { x: 0, w: 140, h: 42 };
  const R = { x: 378, w: 182, h: 60 };
  const cx0 = W / 2 - TILE / 2;
  const cx1 = W / 2 + TILE / 2;

  const inPaths = ins.map((_, i) => `M${L.x + L.w} ${inY(i)} C ${L.x + L.w + 44} ${inY(i)}, ${cx0 - 44} ${CY}, ${cx0} ${CY}`);
  const outPaths = outs.map((_, i) => `M${cx1} ${CY} C ${cx1 + 40} ${CY}, ${R.x - 40} ${outY(i)}, ${R.x} ${outY(i)}`);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full font-sans" role="img" aria-label={`${role} agent: channels in, systems updated`}>
      <defs>
        <radialGradient id={`hub-glow-${role}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E84F3D" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#E84F3D" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={W / 2} cy={CY} r={150} fill={`url(#hub-glow-${role})`} />
      <circle cx={W / 2} cy={CY} r={96} fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 6" />

      {/* column labels */}
      <text x={L.x} y={20} className="font-mono" fontSize={11} letterSpacing={2} fill="rgba(252,252,244,0.4)">
        CHANNELS IN
      </text>
      <text x={R.x} y={20} className="font-mono" fontSize={11} letterSpacing={2} fill="rgba(252,252,244,0.4)">
        SYSTEMS UPDATED
      </text>

      {/* connectors */}
      {[...inPaths, ...outPaths].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
          <path d={d} fill="none" stroke="#E84F3D" strokeWidth={1.5} strokeDasharray="3 9" className="hub-flow" />
          <circle r={3.5} fill="#E84F3D">
            <animateMotion dur="3.2s" begin={`${(i % 4) * 0.6}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}

      {/* inbound channel pills */}
      {ins.map((c, i) => {
        const Icon = channelIcon[c] ?? Plug;
        const y = inY(i) - L.h / 2;
        return (
          <g key={c}>
            <rect x={L.x} y={y} width={L.w} height={L.h} rx={L.h / 2} fill="#17171a" stroke="rgba(255,255,255,0.16)" />
            <Icon x={L.x + 15} y={y + 12} width={18} height={18} color="#F08272" strokeWidth={1.9} />
            <text x={L.x + 42} y={y + 27} fontSize={15} fontWeight={500} fill="#FCFCF4">
              {c.length > 12 ? 'Any channel' : c}
            </text>
          </g>
        );
      })}

      {/* the agent */}
      <foreignObject x={W / 2 - TILE / 2} y={CY - TILE / 2} width={TILE} height={TILE}>
        <AgentTile role={role} className="h-full w-full" />
      </foreignObject>

      {/* outbound systems */}
      {outs.map((o, i) => {
        const y = outY(i) - R.h / 2;
        return (
          <g key={o.label}>
            <rect x={R.x} y={y} width={R.w} height={R.h} rx={14} fill="#17171a" stroke="rgba(255,255,255,0.16)" />
            <rect x={R.x} y={y + 14} width={3} height={R.h - 28} rx={1.5} fill="#E84F3D" />
            <text x={R.x + 20} y={y + 26} fontSize={16} fontWeight={600} fill="#FCFCF4">
              {o.label}
            </text>
            <text x={R.x + 20} y={y + 45} className="font-mono" fontSize={12} fill="rgba(252,252,244,0.55)">
              {o.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
