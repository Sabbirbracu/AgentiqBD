import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { privacyPolicy, termsAndConditions } from '@/lib/legal';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: termsAndConditions.metaTitle,
  description: termsAndConditions.description,
  alternates: { canonical: termsAndConditions.path },
  openGraph: { title: `${termsAndConditions.metaTitle} · Agentiq BD`, description: termsAndConditions.description, url: absoluteUrl(termsAndConditions.path), type: 'website' },
};

export default function Terms() {
  return <LegalPage doc={termsAndConditions} other={privacyPolicy} />;
}
