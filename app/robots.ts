import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

/** AI search and answer engines we want to be able to read and cite the site (GEO / AEO). */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/brand/', '/api/'] },
      { userAgent: aiCrawlers, allow: '/', disallow: ['/brand/'] },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
