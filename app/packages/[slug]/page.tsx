import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PackageLandingPage } from '@/components/sections/package-landing';
import { JsonLd } from '@/components/seo/json-ld';
import { packages } from '@/lib/content';
import { packagePageById, packagePages } from '@/lib/package-pages';
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return packagePages.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = packagePageById(slug);
  if (!page) return {};
  const url = `/packages/${page.id}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: { title: `${page.metaTitle} · Agentiq BD`, description: page.metaDescription, url: absoluteUrl(url), type: 'website' },
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = packagePageById(slug);
  const pkg = packages.find((p) => p.id === slug);
  if (!page || !pkg) notFound();
  const path = `/packages/${page.id}`;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: page.metaTitle, description: page.metaDescription, path }),
          serviceJsonLd({
            name: pkg.title,
            description: page.answer,
            path,
            price: { min: page.minPrice, max: page.maxPrice },
            serviceType: page.keywords[0],
            keywords: page.keywords,
          }),
          faqJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Packages', path: '/packages' },
            { name: pkg.title, path },
          ]),
        ]}
      />
      <PackageLandingPage pkg={pkg} page={page} />
    </>
  );
}
