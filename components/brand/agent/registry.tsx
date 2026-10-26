import type { ReactNode } from 'react';
import { ControlRoom } from './control-room';
import { CustomVisual, ErpVisual, WorkflowVisual } from './service-visuals';
import { CoverTile, PostTile, ProfileTile, postKeys } from './social';
import { AgentTile, type AgentRole } from './tile';

/**
 * Everything that can be exported as an image. Each entry is rendered at exactly `w × h` CSS px
 * on /brand/export/<name> and captured at `scale` × by scripts/export-brand.mjs.
 *   transparent → PNG with alpha        folder → where it lands in "Brand Graphics/"
 */
export type ExportAsset = {
  w: number;
  h: number;
  scale: number;
  transparent: boolean;
  folder: string;
  node: ReactNode;
};

export const exportAssets: Record<string, ExportAsset> = {};

const roles: AgentRole[] = ['support', 'lead', 'booking', 'custom', 'guard'];
for (const r of roles) {
  exportAssets[`agent-${r}`] = {
    w: 512,
    h: 512,
    scale: 2,
    transparent: true,
    folder: '1 Agent icons',
    node: (
      <div className="flex h-full w-full items-center justify-center p-12">
        <AgentTile role={r} surface="light" className="h-full w-full" />
      </div>
    ),
  };
}

/** Padded so shadows and floating cards are never clipped. */
const pad = (w: number, h: number, node: ReactNode) => (
  <div className="flex items-center justify-center" style={{ width: w, height: h }}>
    {node}
  </div>
);

for (const dark of [false, true]) {
  const s = dark ? '-dark' : '';
  const folder = '2 Service visuals';
  const base = { scale: 2, transparent: true, folder };
  exportAssets[`visual-employees${s}`] = { ...base, w: 740, h: 640, node: pad(740, 640, <div className="w-[600px]"><ControlRoom dark={dark} /></div>) };
  exportAssets[`visual-workflow${s}`] = { ...base, w: 760, h: 480, node: pad(760, 480, <WorkflowVisual dark={dark} className="w-[688px]" />) };
  exportAssets[`visual-erp${s}`] = { ...base, w: 760, h: 480, node: pad(760, 480, <ErpVisual dark={dark} className="w-[688px]" />) };
  exportAssets[`visual-custom-ai${s}`] = { ...base, w: 760, h: 480, node: pad(760, 480, <CustomVisual dark={dark} className="w-[688px]" />) };
}

exportAssets['facebook-profile-dark'] = { w: 1080, h: 1080, scale: 1, transparent: false, folder: '3 Facebook', node: <ProfileTile tone="ink" /> };
exportAssets['facebook-profile-light'] = { w: 1080, h: 1080, scale: 1, transparent: false, folder: '3 Facebook', node: <ProfileTile tone="paper" /> };
exportAssets['facebook-cover'] = { w: 1640, h: 624, scale: 1, transparent: false, folder: '3 Facebook', node: <CoverTile /> };
for (const k of postKeys) {
  exportAssets[`post-${k}`] = { w: 1080, h: 1080, scale: 1, transparent: false, folder: '4 Post templates', node: <PostTile kind={k} /> };
}
