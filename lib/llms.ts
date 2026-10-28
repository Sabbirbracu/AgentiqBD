import { coreServices, faqs, founder, packages, processSteps, products, projects, site, whyUs } from '@/lib/content';
import { absoluteUrl, contentUpdated } from '@/lib/seo';
import { servicePages } from '@/lib/service-pages';

/**
 * Plain-text / markdown summaries for AI assistants (llms.txt and llms-full.txt), built from the same data as
 * the pages so the two can never disagree. Wording rules are the site's: no invented clients or metrics.
 */

const intro =
  'Agentiq BD is an AI engineering and software company based in Dhaka, Bangladesh, serving clients globally. It builds AI agents ("AI Employees"), chatbots, voice AI, workflow automation, knowledge-base (RAG) applications, AI integrations, industrial AI and ERP systems, and custom software. Delivery is founder-led and hands-on.';

const disambiguation =
  'Agentiq BD is not affiliated with NVIDIA\'s "AgentIQ" open-source toolkit or any other product named Agent IQ. Our domain is agentiqbd.com.';

const facts = () => [
  `- Name: ${site.name}`,
  `- Location: ${site.address}, Bangladesh`,
  `- Founder: ${founder.name}, ${founder.title}`,
  `- Email: ${site.email}`,
  `- Phone / WhatsApp: +880 1304 867542`,
  '- Languages: English (delivery, meetings, documentation)',
  `- Website: ${site.url}`,
];

const productLine = (p: (typeof products)[number]) =>
  `- ${p.href ? `[${p.name}](${p.href})` : p.name}: ${p.summary} (${p.status === 'Live' ? 'live' : p.status === 'MVP' ? 'MVP, in development' : 'in development'}).`;

export function buildLlmsTxt() {
  return [
    `# ${site.name}`,
    '',
    `> ${intro}`,
    '',
    disambiguation,
    '',
    '## Company facts',
    ...facts(),
    '',
    '## Services',
    ...servicePages.map((s) => {
      const core = coreServices.find((c) => c.id === s.id);
      return `- [${core?.title ?? s.h1}](${absoluteUrl(`/services/${s.id}`)}): ${s.metaDescription}`;
    }),
    '',
    '## Work and products',
    ...projects.map((p) => `- [${p.title}](${absoluteUrl(`/work/${p.id}`)}): ${p.summary}`),
    ...products.map(productLine),
    '',
    '## Optional',
    `- [Full text of this site for AI assistants](${absoluteUrl('/llms-full.txt')})`,
    `- [Home](${absoluteUrl('/')}): overview, FAQ and contact options`,
    `- [Services hub](${absoluteUrl('/services')})`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    '',
  ].join('\n');
}

export function buildLlmsFullTxt() {
  const out: string[] = [
    `# ${site.name} — full site text`,
    '',
    `> ${intro}`,
    '',
    `Last updated: ${contentUpdated}. Source: ${site.url}`,
    '',
    disambiguation,
    '',
    '## Company facts',
    ...facts(),
    '',
    '## How we work',
    ...processSteps.map((s, i) => `${i + 1}. **${s.label}.** ${s.text} Outcome: ${s.outcome}`),
    '',
    `## Our approach: ${whyUs.belief.title} ${whyUs.belief.accent}`,
    whyUs.belief.text,
    '',
    ...whyUs.pillars.map((p) => `- **${p.title}** ${p.text}`),
    '',
    '## Packages',
    ...packages.map((p) => `- **${p.title}**: ${p.description}`),
    '',
    '## Services',
    '',
  ];

  for (const s of servicePages) {
    const core = coreServices.find((c) => c.id === s.id);
    out.push(
      `### ${core?.title ?? s.h1}`,
      `URL: ${absoluteUrl(`/services/${s.id}`)}`,
      '',
      s.answer,
      '',
      'What we build:',
      ...s.build.map((b) => `- ${b}`),
      '',
      'Who it is for:',
      ...s.fit.map((f) => `- ${f}`),
      '',
      ...s.faqs.flatMap((f) => [`**${f.q}**`, f.a, '']),
    );
  }

  out.push('## Work', '');
  for (const p of projects) {
    out.push(`### ${p.title}`, `URL: ${absoluteUrl(`/work/${p.id}`)}`, `Type: ${p.kind}. Status: ${p.status}.`, '', p.summary, '');
    if (p.features?.length) out.push(...p.features.map((f) => `- ${f}`), '');
    const cs = p.caseStudy;
    if (cs?.challenge) out.push(`Challenge: ${cs.challenge}`, '');
    if (cs?.solution) out.push(`Solution: ${cs.solution}`, '');
    if (cs?.outcome) out.push(`Outcome: ${cs.outcome}`, '');
  }

  out.push('## Products', '', ...products.flatMap((p) => [productLine(p), ...p.highlights.map((h) => `  - ${h}`)]), '');

  out.push('## Frequently asked questions', '', ...faqs.flatMap((f) => [`**${f.q}**`, f.a, '']));

  out.push('## Contact', `- Email: ${site.email}`, '- WhatsApp: https://wa.me/8801304867542', `- Website: ${site.url}`, '');

  return out.join('\n');
}
