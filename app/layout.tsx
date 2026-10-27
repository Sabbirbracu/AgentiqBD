import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Besley, Geist_Mono, Poppins, Schibsted_Grotesk } from 'next/font/google';
import { site } from '@/lib/content';

const display = Besley({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});
const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const title = 'Agentiq BD — AI Agents, Automation & Software in Bangladesh';

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
