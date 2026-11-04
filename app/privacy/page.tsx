import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { privacyPolicy, termsAndConditions } from '@/lib/legal';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.description,
  alternates: { canonical: privacyPolicy.path },
  openGraph: { title: `${privacyPolicy.metaTitle} · Agentiq BD`, description: privacyPolicy.description, url: absoluteUrl(privacyPolicy.path), type: 'website' },
};

export default function Privacy() {
  return <LegalPage doc={privacyPolicy} other={termsAndConditions} />;
}
