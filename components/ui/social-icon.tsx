import { siFacebook, siGithub, siX } from 'simple-icons';

const icons = {
  facebook: { path: siFacebook.path, viewBox: '0 0 24 24' },
  github: { path: siGithub.path, viewBox: '0 0 24 24' },
  x: { path: siX.path, viewBox: '0 0 24 24' },
  linkedin: {
    path: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
    viewBox: '0 0 448 512',
  },
} as const;

export type SocialKind = keyof typeof icons;

/** Single-colour brand glyph; colour comes from `currentColor`. */
export function SocialIcon({ kind, className }: { kind: SocialKind; className?: string }) {
  const i = icons[kind];
  return (
    <svg viewBox={i.viewBox} fill="currentColor" aria-hidden className={className}>
      <path d={i.path} />
    </svg>
  );
}
