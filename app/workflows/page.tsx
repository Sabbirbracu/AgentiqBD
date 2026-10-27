import type { Metadata } from 'next';
import { Workflows } from '@/components/sections/workflows';
import { SolutionShell } from '@/components/sections/solution-shell';

export const metadata: Metadata = {
  alternates: { canonical: '/workflows' },
  title: 'Workflow demonstrations',
  description: 'Before-and-after examples of how scattered, manual processes become one connected flow.',
};

export default function Page() {
  return (
    <SolutionShell tone="light" ctaTitle="Have a process like this to fix?">
      <Workflows />
    </SolutionShell>
  );
}
