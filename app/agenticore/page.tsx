import type { Metadata } from 'next';
import { BusinessSystems } from '@/components/sections/business-systems';
import { SolutionShell } from '@/components/sections/solution-shell';

export const metadata: Metadata = {
  title: 'AgentiCore',
  description: 'Inventory, production, procurement, support and reporting connected through intelligent workflows.',
};

export default function Page() {
  return (
    <SolutionShell tone="dark" ctaTitle="Want your operations connected like this?">
      <BusinessSystems />
    </SolutionShell>
  );
}
