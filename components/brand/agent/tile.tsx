import {
  CalendarCheck,
  Headphones,
  Settings2,
  ShieldCheck,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { LogoMark } from '@/components/brand/logo';
import { cn } from '@/lib/utils';

/**
 * The Agentiq AI Employee "app icon": the brand mark on a graphite tile, with a small
 * red role badge. One shape for every role keeps the family recognisable; the badge says
 * what the employee does. Sizes with the className (h-/w-), everything inside is relative.
 */

export type AgentRole = 'support' | 'lead' | 'booking' | 'custom' | 'guard';

export const agentMeta: Record<AgentRole, { name: string; role: string; Icon: LucideIcon }> = {
  support: { name: 'SupportAgent', role: 'Customer Support', Icon: Headphones },
  lead: { name: 'LeadAgent', role: 'Sales & Leads', Icon: UserPlus },
  booking: { name: 'BookingAgent', role: 'Appointments', Icon: CalendarCheck },
  custom: { name: 'Custom AI Employee', role: 'Industry-specific', Icon: Settings2 },
  guard: { name: 'Guardrails', role: 'Permissions & audit', Icon: ShieldCheck },
};

export function AgentTile({
  role,
  className,
  surface = 'dark',
  badge = true,
}: {
  role: AgentRole;
  className?: string;
  /** Colour of the surface the tile sits on, so the badge's cut-out ring blends in. */
  surface?: 'dark' | 'light';
  badge?: boolean;
}) {
  const { Icon } = agentMeta[role];
  return (
    <span
      className={cn(
        'relative inline-flex aspect-square shrink-0 items-center justify-center rounded-[27%] bg-gradient-to-b from-[#2a2a30] to-[#0c0c0e] text-paper',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(255,255,255,0.08),0_14px_28px_-14px_rgba(0,0,0,0.65)]',
        className,
      )}
    >
      <LogoMark boxed={false} className="h-[54%] w-[54%]" />
      {badge && (
        <span
          className={cn(
            'absolute -bottom-[7%] -right-[7%] flex h-[40%] w-[40%] items-center justify-center rounded-full bg-signal text-paper ring-[3px]',
            surface === 'dark' ? 'ring-ink' : 'ring-white',
          )}
        >
          <Icon className="h-[54%] w-[54%]" strokeWidth={2.3} />
        </span>
      )}
    </span>
  );
}
