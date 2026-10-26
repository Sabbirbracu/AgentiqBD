import { exportAssets } from '@/components/brand/agent/registry';

/** Sizes + folders for scripts/export-brand.mjs. */
export function GET() {
  const out = Object.fromEntries(
    Object.entries(exportAssets).map(([name, a]) => [
      name,
      { w: a.w, h: a.h, scale: a.scale, transparent: a.transparent, folder: a.folder },
    ]),
  );
  return Response.json(out);
}
