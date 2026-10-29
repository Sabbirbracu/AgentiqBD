import { BarChart3, BookOpenText, Bot, Code2, Factory, MessagesSquare, PhoneCall, Plug, Workflow, type LucideIcon } from 'lucide-react';

/** One icon per core-service id, shared by the navbar menu and the service pages. */
export const serviceIcons: Record<string, LucideIcon> = {
  'ai-agents': Bot,
  chatbots: MessagesSquare,
  voice: PhoneCall,
  'workflow-automation': Workflow,
  'knowledge-rag': BookOpenText,
  integrations: Plug,
  'business-systems': Factory,
  reporting: BarChart3,
  'custom-software': Code2,
};
