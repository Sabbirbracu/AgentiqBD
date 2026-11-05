import { founder } from '@/lib/content';
import type { Block, BlogCategory, Post } from './types';
import { post as introducing } from './posts/introducing-agentiq-bd';
import { post as howAgentsWork } from './posts/how-ai-agents-work';
import { post as howWeBuild } from './posts/how-we-build-ai-agents';
import { post as offline } from './posts/lessons-building-offline-ai-app';
import { post as compare } from './posts/ai-agent-vs-chatbot-vs-automation';
import { post as rag } from './posts/rag-explained';
import { post as guardrails } from './posts/ai-agent-guardrails';
import { post as processFirst } from './posts/fix-the-process-before-ai';
import { post as bangladesh } from './posts/building-software-for-bangladesh';
import { post as testing } from './posts/testing-ai-agents-before-go-live';
import { post as evalMetrics } from './posts/ai-agent-evaluation-metrics';
import { post as ragEval } from './posts/rag-evaluation';
import { post as testCases } from './posts/ai-agent-test-cases';
import { post as voiceTesting } from './posts/testing-voice-ai-agents';
import { post as monitoring } from './posts/monitoring-ai-agents-in-production';
import { post as agentCost } from './posts/ai-agent-development-cost';
import { post as outsourcing } from './posts/outsourcing-ai-development-to-bangladesh';
import { post as mcp } from './posts/what-is-mcp-model-context-protocol';
import { post as agenticCommerce } from './posts/agentic-commerce-ai-shopping-agents';
import { post as roi } from './posts/ai-agent-roi';
import { post as chooseVendor } from './posts/how-to-choose-an-ai-development-company';
import { post as receptionist } from './posts/ai-receptionist-small-business';
import { post as leadFollowUp } from './posts/automated-lead-follow-up';
import { post as docProcessing } from './posts/ai-document-processing';
import { post as knowledgeAssistant } from './posts/ai-knowledge-assistant-for-employees';
import { post as inventory } from './posts/inventory-software-vs-spreadsheets';
import { post as reporting } from './posts/automated-business-reporting';
import { post as supportAutomation } from './posts/ai-customer-support-automation';
import { post as customVsSaas } from './posts/custom-software-vs-saas';
import { post as processes } from './posts/business-processes-to-automate';

export type { Block, BlogArtId, BlogCategory, Post } from './types';

/**
 * Every written post, including scheduled ones. Put the newest first when adding one: /blog sorts by date
 * (newest first) and posts sharing a date keep this order. The first live post is the wide featured card.
 */
const allPosts: Post[] = [
  // One post per day from 2026-10-29; 2026-11-07 → 2026-11-12 are scheduled (see `date` in each file).
  receptionist,
  chooseVendor,
  roi,
  agenticCommerce,
  mcp,
  outsourcing,
  agentCost,
  processes,
  customVsSaas,
  supportAutomation,
  reporting,
  inventory,
  knowledgeAssistant,
  docProcessing,
  leadFollowUp,
  testCases,
  evalMetrics,
  ragEval,
  voiceTesting,
  monitoring,
  introducing,
  howAgentsWork,
  howWeBuild,
  offline,
  compare,
  rag,
  guardrails,
  processFirst,
  bangladesh,
  testing,
];

export const blogCategories: BlogCategory[] = ['Company', 'Guides', 'Engineering', 'Lessons', 'Strategy'];

/** Byline for every post. TODO(owner): change per post if someone else writes one. */
export const blogAuthor = { name: founder.name, role: founder.title, photo: founder.photo };

export const blogMeta = {
  title: 'Blog',
  metaTitle: 'Blog: AI Agents, Automation & Software Engineering',
  description:
    'Practical articles from Agentiq BD on how AI agents work, how we build them, RAG, guardrails, testing, automation and building software in Bangladesh.',
};

/**
 * Scheduled publishing: a post whose `date` is in the future stays hidden (no page, no sitemap, no llms.txt) until
 * that day starts in Dhaka. Pages that list posts revalidate hourly, so a post goes live within the hour without a
 * redeploy. The daily GitHub workflow (.github/workflows/publish-daily.yml) then warms the pages and pings IndexNow.
 */
export const blogTimeZone = 'Asia/Dhaka';

/**
 * Today's date (YYYY-MM-DD) in Dhaka. Outside production, BLOG_TODAY=2026-11-12 (e.g. in .env.development.local)
 * previews the blog as it will look on that day, to check scheduled posts locally; production always uses the real date.
 */
export const blogToday = () =>
  (process.env.NODE_ENV !== 'production' && process.env.BLOG_TODAY) ||
  new Intl.DateTimeFormat('en-CA', { timeZone: blogTimeZone }).format(new Date());

export const isLive = (p: Post, today = blogToday()) => p.date <= today;

/** Live posts, newest first. Call it at render time (not at module load) so scheduled posts appear on their day. */
export function getPosts(): Post[] {
  const today = blogToday();
  return allPosts
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => isLive(p, today))
    .sort((a, b) => b.p.date.localeCompare(a.p.date) || a.i - b.i)
    .map(({ p }) => p);
}

/** Scheduled posts that are not live yet, soonest first (for checks and the publishing calendar). */
export const scheduledPosts = () => allPosts.filter((p) => !isLive(p)).sort((a, b) => a.date.localeCompare(b.date));

export const postBySlug = (slug: string) => getPosts().find((p) => p.slug === slug);

/**
 * False for a link to a blog post that is not live yet, so the article renders it as plain text until that post's
 * day instead of a link to a 404. Every other href is left alone.
 */
export function isLiveHref(href: string) {
  const m = href.match(/^\/blog\/([^/?#]+)/);
  if (!m) return true;
  const target = allPosts.find((p) => p.slug === m[1]);
  return !target || isLive(target);
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[`*[\]()]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/** Inline marks stripped, for word counts, JSON-LD and llms-full.txt. */
export const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

function blockText(b: Block): string {
  switch (b.type) {
    case 'p':
    case 'h2':
    case 'h3':
    case 'quote':
      return b.text;
    case 'callout':
      return `${b.title} ${b.text}`;
    case 'list':
      return b.items.join(' ');
    case 'steps':
      return b.items.map((i) => `${i.title} ${i.text}`).join(' ');
    case 'table':
      return [...b.head, ...b.rows.flat()].join(' ');
    case 'code':
      return b.code;
    case 'figure':
      return b.caption;
  }
}

export const wordCount = (p: Post) => plain([p.excerpt, ...p.body.map(blockText), ...(p.faq ?? []).flatMap((f) => [f.q, f.a])].join(' ')).split(/\s+/).filter(Boolean).length;

export const readMinutes = (p: Post) => Math.max(1, Math.round(wordCount(p) / 220));

export type Heading = { id: string; text: string; level: 2 | 3 };

export const faqHeading = 'Frequently asked questions';

/** Table of contents entries; ids match the ones the article renderer puts on its headings. */
export function headings(p: Post): Heading[] {
  const body = p.body.flatMap((b) => (b.type === 'h2' || b.type === 'h3' ? [{ id: slugify(b.text), text: plain(b.text), level: b.type === 'h2' ? 2 : 3 } as Heading] : []));
  return p.faq?.length ? [...body, { id: slugify(faqHeading), text: faqHeading, level: 2 }] : body;
}

/** Same category first, then shared tags, then display order. */
export function relatedPosts(p: Post, n = 3) {
  const score = (o: Post) => (o.category === p.category ? 3 : 0) + o.tags.filter((t) => p.tags.includes(t)).length;
  return getPosts()
    .filter((o) => o.slug !== p.slug)
    .map((o, i) => ({ o, s: score(o), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((x) => x.o);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Card data for the index (no bodies, so the client bundle stays small). */
export type PostCard = Pick<Post, 'slug' | 'title' | 'excerpt' | 'category' | 'date' | 'cover' | 'tags'> & { minutes: number };
export const toCard = (p: Post): PostCard => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  date: p.date,
  cover: p.cover,
  tags: p.tags,
  minutes: readMinutes(p),
});
