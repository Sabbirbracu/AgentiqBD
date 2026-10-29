import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceLandingPage } from '@/components/sections/service-landing';
import { JsonLd } from '@/components/seo/json-ld';
import { coreServices, faqs as siteFaqs } from '@/lib/content';
import { absoluteUrl, breadcrumbJsonLd, definedTermsJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd } from '@/lib/seo';
import { serviceLanding } from '@/lib/service-landing';
import { servicePageById, servicePages } from '@/lib/service-pages';

/** Site-wide questions every service page also answers: pricing and timelines, then support after launch. */
const sharedFaqs = siteFaqs.filter((f) => /pricing|maintenance/i.test(f.q));

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageById(slug);
  if (!page) return {};
  const url = `/services/${page.id}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: { title: `${page.metaTitle} · Agentiq BD`, description: page.metaDescription, url: absoluteUrl(url), type: 'website' },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePageById(slug);
  const core = coreServices.find((c) => c.id === slug);
  const landing = serviceLanding[slug];
  if (!page || !core || !landing) notFound();
  const path = `/services/${page.id}`;
  const faqs = [...page.faqs, ...sharedFaqs];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: page.metaTitle, description: page.metaDescription, path }),
          serviceJsonLd({ name: core.title, description: page.metaDescription, path }),
          faqJsonLd(faqs),
          definedTermsJsonLd({ name: `${core.title}: key terms`, path, terms: landing.glossary }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: core.title, path },
          ]),
        ]}
      />
      <ServiceLandingPage core={core} page={page} landing={landing} faqs={faqs} />
    </>
  );
}
