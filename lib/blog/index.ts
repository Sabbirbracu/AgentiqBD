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

export type { Block, BlogArtId, BlogCategory, Post } from './types';

/**
 * Display order on /blog: the first post is the wide featured card, the rest fill the three-column grid.
 * Posts sharing a date keep this order, so put the newest first when adding one.
 */
export const posts: Post[] = [
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

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

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

export const wordCount = (p: Post) => plain([p.excerpt, ...p.body.map(blockText)].join(' ')).split(/\s+/).filter(Boolean).length;

export const readMinutes = (p: Post) => Math.max(1, Math.round(wordCount(p) / 220));

export type Heading = { id: string; text: string; level: 2 | 3 };

/** Table of contents entries; ids match the ones the article renderer puts on its headings. */
export function headings(p: Post): Heading[] {
  return p.body.flatMap((b) => (b.type === 'h2' || b.type === 'h3' ? [{ id: slugify(b.text), text: plain(b.text), level: b.type === 'h2' ? 2 : 3 } as Heading] : []));
}

/** Same category first, then shared tags, then display order. */
export function relatedPosts(p: Post, n = 3) {
  const score = (o: Post) => (o.category === p.category ? 3 : 0) + o.tags.filter((t) => p.tags.includes(t)).length;
  return posts
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
