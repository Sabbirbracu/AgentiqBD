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
      className={`${display.variable} ${sans.variable} ${mono.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
