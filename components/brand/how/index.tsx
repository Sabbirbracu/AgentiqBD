'use client';

import type { ReactNode } from 'react';
import { PipDesk } from '@/components/brand/agent/pip-desk';
import { ChatArt } from './chat';
import { ErpArt } from './erp';
import { IntegrationsArt } from './integrations';
import { KnowledgeArt } from './knowledge';
import { ReportingArt } from './reporting';
import { SoftwareArt } from './software';
import { VoiceArt } from './voice';
import { WorkflowArt } from './workflow';

/** The motion graphic under each service's How it works steps: one design per service (ids in ./ids). */
const arts: Record<string, (p: { steps: string[] }) => ReactNode> = {
  'ai-agents': (p) => <PipDesk id="ai-agents" {...p} />,
  chatbots: (p) => <ChatArt {...p} />,
  voice: (p) => <VoiceArt {...p} />,
  'workflow-automation': (p) => <WorkflowArt {...p} />,
  'knowledge-rag': (p) => <KnowledgeArt {...p} />,
  integrations: (p) => <IntegrationsArt {...p} />,
  'business-systems': (p) => <ErpArt {...p} />,
  'custom-software': (p) => <SoftwareArt {...p} />,
  reporting: (p) => <ReportingArt {...p} />,
};

export function HowArt({ id, steps }: { id: string; steps: string[] }) {
  const Art = arts[id];
  return Art ? <>{Art({ steps })}</> : null;
}
