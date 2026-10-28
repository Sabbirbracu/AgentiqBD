import { coreServices, faqs, founder, products, projects, site } from '@/lib/content';
import { servicePages } from '@/lib/service-pages';

/**
 * Search and AI-assistant visibility helpers: canonical URLs, the sitemap route list and JSON-LD builders.
 * Everything here is derived from content.ts so the structured data can never drift from what the page says.
 */

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();

/**
 * Date the sitemap reports as "last modified". Search engines ignore lastmod when it is always "today", so
 * bump this only when page content really changes.
 */
export const contentUpdated = '2026-10-27';

/** Every public, indexable route. /brand/* is internal and is excluded here and in robots.ts. */
export const sitemapRoutes: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  ...servicePages.map((s) => ({ path: `/services/${s.id}`, priority: 0.8 })),
  ...projects.map((p) => ({ path: `/work/${p.id}`, priority: 0.7 })),
  { path: '/agenticore', priority: 0.6 },
  { path: '/ai-employees', priority: 0.6 },
  { path: '/workflows', priority: 0.5 },
  { path: '/privacy', priority: 0.2 },
];

/** Only real profile URLs: the '#' placeholders in content.ts must never reach structured data. */
const realProfiles = [
  ...site.social.map((s) => s.href),
  ...founder.social.map((s) => s.href),
].filter((h) => h.startsWith('http'));

export const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const founderId = `${site.url}/#founder`;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': orgId,
        name: site.name,
        alternateName: ['Agentiq', 'AgentiqBD', 'Agentiq BD Ltd'],
        url: site.url,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/brand/agentiqbd-mark.png') },
        image: absoluteUrl('/opengraph-image'),
        description: site.description,
        slogan: site.tagline,
        email: site.email,
        telephone: `+88${site.phone}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address,
          addressLocality: 'Dhaka',
          addressCountry: 'BD',
        },
        areaServed: [{ '@type': 'Country', name: 'Bangladesh' }, 'Worldwide'],
        knowsAbout: [
          'AI agent development',
          'AI chatbots',
          'Voice AI agents',
          'Business workflow automation',
          'Retrieval-augmented generation',
          'ERP and industrial AI',
          'Custom software and SaaS development',
        ],
        founder: { '@id': founderId },
        ...(realProfiles.length ? { sameAs: realProfiles } : {}),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: site.email,
          telephone: `+88${site.phone}`,
          availableLanguage: ['English', 'Bengali'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Agentiq BD services',
          itemListElement: coreServices.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
              url: absoluteUrl(`/services/${s.id}`),
              provider: { '@id': orgId },
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': founderId,
        name: founder.name,
        jobTitle: founder.title,
        image: absoluteUrl(founder.photo),
        worksFor: { '@id': orgId },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'BRAC University' },
        ...(founder.social.some((s) => s.href.startsWith('http'))
          ? { sameAs: founder.social.map((s) => s.href).filter((h) => h.startsWith('http')) }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { '@id': orgId },
        inLanguage: 'en',
      },
      ...products.map((p) => ({
        '@type': 'SoftwareApplication',
        name: p.name,
        description: p.summary,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        creator: { '@id': orgId },
        ...(p.href ? { url: p.href } : {}),
        ...(p.status === 'Live' ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } } : {}),
      })),
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

/** WebPage node with a freshness date; `about` ties the page to the organisation entity for AI assistants. */
export function webPageJsonLd(p: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(p.path)}#webpage`,
    url: absoluteUrl(p.path),
    name: p.name,
    description: p.description,
    inLanguage: 'en',
    dateModified: contentUpdated,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    publisher: { '@id': orgId },
  };
}

export function serviceJsonLd(s: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    url: absoluteUrl(s.path),
    serviceType: s.name,
    provider: { '@id': orgId },
    areaServed: [{ '@type': 'Country', name: 'Bangladesh' }, 'Worldwide'],
  };
}
