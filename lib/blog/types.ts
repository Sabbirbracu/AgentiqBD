/**
 * Blog article shape. Bodies are structured blocks (not raw HTML) so the article page controls every style,
 * and headings feed the table of contents automatically.
 *
 * Inline text supports three marks: **bold**, `code` and [link text](/path or https://…).
 */

export type BlogArtId =
  | 'intro'
  | 'agent-loop'
  | 'build'
  | 'offline'
  | 'compare'
  | 'rag'
  | 'guardrails'
  | 'process'
  | 'phone'
  | 'testing';

export type BlogCategory = 'Company' | 'Guides' | 'Engineering' | 'Lessons' | 'Strategy';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; tone: 'note' | 'tip' | 'warning'; title: string; text: string }
  | { type: 'code'; lang: string; code: string; caption?: string }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'figure'; art: BlogArtId; caption: string };

export type Post = {
  slug: string;
  title: string;
  /** Search title when the display title is too long for a results page. */
  metaTitle?: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  keywords: string[];
  /** ISO date (YYYY-MM-DD). */
  date: string;
  updated?: string;
  cover: BlogArtId;
  /** "In short" box at the top of the article; also used in llms-full.txt. */
  takeaways: string[];
  /** Service page ids (lib/service-pages.ts) this article supports; shown in the sidebar. */
  services: string[];
  body: Block[];
};
