import type { MetadataRoute } from 'next';
import { absoluteUrl, contentUpdated, sitemapRoutes } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: contentUpdated,
    priority: r.priority,
  }));
}
