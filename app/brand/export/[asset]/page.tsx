import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { exportAssets } from '@/components/brand/agent/registry';

export const metadata: Metadata = { title: 'Export', robots: { index: false, follow: false } };

/** One graphic at its exact export size, on a transparent page — see scripts/export-brand.mjs. */
export default async function ExportPage({ params }: { params: Promise<{ asset: string }> }) {
  const { asset } = await params;
  const a = exportAssets[asset];
  if (!a) notFound();
  return (
    <>
      <style>{`html,body{background:transparent!important;margin:0}nextjs-portal{display:none!important}`}</style>
      <div style={{ width: a.w, height: a.h, position: 'relative', overflow: 'hidden' }}>{a.node}</div>
    </>
  );
}
