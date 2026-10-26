import type { Metadata } from 'next';
import { AIEmployees } from '@/components/sections/ai-employees';
import { SolutionShell } from '@/components/sections/solution-shell';

export const metadata: Metadata = {
  title: 'AI Employees',
  description: 'AI Employees for customer support, sales and bookings, built with scoped permissions, human approval and a full audit trail.',
};

export default function Page() {
  return (
    <SolutionShell tone="dark" ctaTitle="Want an AI Employee on your team?">
      <AIEmployees />
    </SolutionShell>
  );
}
