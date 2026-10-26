export type LeadPayload = {
  /** Which route the enquiry came in on. */
  kind: 'project' | 'partnership';
  name: string;
  email: string;
  /** Service needed (project) or partner type (partnership). */
  topic: string;
  message: string;
};

/**
 * Frontend-only stub. When the AgentiqBD OS backend exists, replace the body with a
 * POST to its leads endpoint (e.g. `${process.env.NEXT_PUBLIC_API_URL}/leads`) and
 * keep the signature — the contact form won't need to change.
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 900));
  if (process.env.NODE_ENV !== 'production') {
    console.info('[submitLead] stub — no backend connected yet', payload);
  }
  return { ok: true };
}
