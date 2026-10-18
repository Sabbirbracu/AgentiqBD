import './globals.css';
import type { Metadata, Viewport } from 'next';
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from 'next/font/google';
import { site } from '@/lib/content';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const title = 'Agentiq BD — Turn Complexity into Intelligence';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s · Agentiq BD' },
  description: site.description,
  applicationName: 'Agentiq BD',
  keywords: [
    'AI engineering',
    'AI employees',
    'workflow automation',
    'AI-enabled ERP',
    'industrial AI',
    'business automation',
    'Bangladesh AI company',
    'Agentiq BD',
  ],
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
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
