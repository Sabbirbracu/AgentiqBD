import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/content';

export const metadata: Metadata = { title: 'Privacy policy' };

/** DRAFT — have this reviewed before launch, and update it when the contact form is connected to a backend. */
export default function Privacy() {
  return (
    <main className="container-x mx-auto max-w-2xl py-28">
      <Link href="/" className="text-sm text-ink/55 underline underline-offset-4">
        ← Back to Agentiq BD
      </Link>
      <h1 className="display mt-8 text-5xl font-semibold">Privacy policy</h1>
      <p className="mt-3 rounded-xl bg-ink/[0.05] px-4 py-3 text-sm text-ink/60">
        Draft — pending review.
      </p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
        <p>
          When you contact Agentiq BD through this website, we use the details you give us (your
          name, email address and the message you write) only to reply to your enquiry.
        </p>
        <p>We do not sell your personal information.</p>
        <p>
          To ask what we hold about you, or to have it deleted, email{' '}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
