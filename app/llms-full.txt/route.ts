import { buildLlmsFullTxt } from '@/lib/llms';

export const dynamic = 'force-static';
/** Hourly, so scheduled blog posts are listed on their publish day. */
export const revalidate = 3600;

export function GET() {
  return new Response(buildLlmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
