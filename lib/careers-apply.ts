import { site } from '@/lib/content';
import type { JobPost } from '@/lib/careers';

/** Applications arrive by email (the site has no forms). The body is a short template so every application has the same basics. */
export function applyHref(job: JobPost) {
  const body = [
    'Hi Agentiq BD team,',
    '',
    `I would like to apply for the ${job.title} role.`,
    '',
    'Name:',
    'Phone / WhatsApp:',
    'Links to my work:',
    '',
    'Why I want this role (max 150 words):',
    '',
    '',
    '(CV attached)',
  ].join('\n');
  return `mailto:${site.email}?subject=${encodeURIComponent(`${job.apply.subject} – Your Name`)}&body=${encodeURIComponent(body)}`;
}

export const formatJobDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
