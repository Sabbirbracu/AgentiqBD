import type { MetadataRoute } from 'next';
import { absoluteUrl, contentUpdated, sitemapRoutes } from '@/lib/seo';

/** Hourly, so scheduled blog posts join the sitemap on their publish day. */
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified ?? contentUpdated,
    priority: r.priority,
  }));
}
