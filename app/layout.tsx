import './globals.css';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from '@/lib/content';

/**
 * Fonts are self-hosted (latin subset, downloaded from Google Fonts, SIL Open Font License) so the Docker build never
 * has to reach fonts.googleapis.com; a failed download there broke a deploy on 2026-11-06. Besley, Schibsted Grotesk
 * and Geist Mono are variable fonts, so one file covers every weight.
 */
const display = localFont({
  src: './fonts/besley-latin-var.woff2',
  weight: '400 900',
  variable: '--font-display',
  display: 'swap',
});
const poppins = localFont({
  src: [
    { path: './fonts/poppins-latin-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/poppins-latin-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/poppins-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
const sans = localFont({
  src: './fonts/schibsted-grotesk-latin-var.woff2',
  weight: '400 900',
  variable: '--font-sans',
  display: 'swap',
});
const mono = localFont({
  src: './fonts/geist-mono-latin-var.woff2',
  weight: '100 900',
  variable: '--font-mono',
  display: 'swap',
});
const title = 'Agentiq BD — AI & Software Company in Bangladesh';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s · Agentiq BD' },
  description: site.description,
  applicationName: 'Agentiq BD',
  authors: [{ name: 'Agentiq BD', url: site.url }],
  creator: 'Agentiq BD',
  publisher: 'Agentiq BD',
  category: 'technology',
  keywords: [
    'Agentiq BD',
    'software company in Bangladesh',
    'software development company in Bangladesh',
    'AI company in Bangladesh',
    'AI agents',
    'agentic AI',
    'AI agent development',
    'AI employees',
    'AI chatbot development',
    'workflow automation',
    'business automation',
    'AI automation company Bangladesh',
    'AI company in Dhaka',
    'AI-enabled ERP',
    'industrial AI',
    'custom software development Bangladesh',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Google Search Console HTML-tag verification: set NEXT_PUBLIC_GSC_VERIFICATION in Vercel if you pick that method.
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: 'Agentiq BD',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
