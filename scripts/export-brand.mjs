#!/usr/bin/env node
/**
 * Exports every graphic in components/brand/agent/registry.tsx to PNG.
 *
 *   1. start the site:        npm run dev -- -p 3100
 *   2. in another terminal:   npm run export:brand            (everything)
 *                             npm run export:brand -- agent-lead post-erp   (just these)
 *
 * Each asset is opened at /brand/export/<name> in headless Chrome and captured at its exact
 * size (icons and visuals on a transparent background). Output:
 *   ../../Brand Graphics/<folder>/<name>.png     the kit you use for Facebook, slides, print…
 *
 * Uses `sharp`, which ships with Next.js (no extra install). Chrome path and base URL can be overridden with CHROME_PATH and BRAND_URL.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const kitDir = resolve(root, '../../Brand Graphics');
const base = process.env.BRAND_URL ?? 'http://localhost:3100';
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome} — set CHROME_PATH.`);
  process.exit(1);
}

/** name → [css width, css height, scale, transparent, kit folder, web width|null] — mirrors registry.tsx */
const list = await fetch(`${base}/brand/export-list`).then((r) => r.json()).catch(() => {
  console.error(`Can't reach ${base}/brand/export-list — is the dev server running?`);
  process.exit(1);
});

const wanted = process.argv.slice(2);
const names = Object.keys(list).filter((n) => wanted.length === 0 || wanted.includes(n));
if (names.length === 0) {
  console.error('No matching assets. Available:\n  ' + Object.keys(list).join('\n  '));
  process.exit(1);
}

const tmp = join(tmpdir(), 'agentiq-brand-export');
mkdirSync(tmp, { recursive: true });

for (const name of names) {
  const a = list[name];
  const raw = join(tmp, `${name}.png`);
  rmSync(raw, { force: true });
  const r = spawnSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--default-background-color=00000000',
      `--force-device-scale-factor=${a.scale}`,
      `--window-size=${a.w},${a.h}`,
      '--virtual-time-budget=8000',
      `--user-data-dir=${join(tmp, 'profile')}`,
      `--screenshot=${raw}`,
      `${base}/brand/export/${name}`,
    ],
    { encoding: 'utf8' },
  );
  if (!existsSync(raw)) {
    console.error(`✗ ${name}\n${r.stderr?.split('\n').slice(-4).join('\n')}`);
    continue;
  }

  const outDir = join(kitDir, a.folder);
  mkdirSync(outDir, { recursive: true });
  // Chrome's window can be a few px taller than asked; crop to the exact artboard.
  await sharp(raw)
    .extract({ left: 0, top: 0, width: a.w * a.scale, height: a.h * a.scale })
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, `${name}.png`));
  console.log(`✓ ${name}  ${a.w * a.scale}×${a.h * a.scale}`);
}
console.log(`\nKit: ${kitDir}`);
