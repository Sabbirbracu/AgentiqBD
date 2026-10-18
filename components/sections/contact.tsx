'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Loader2 } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { interests, site } from '@/lib/content';
import { submitLead } from '@/lib/leads';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-xl border border-ink/15 bg-paper-50 px-4 py-3.5 text-base text-ink placeholder:text-ink/35 transition-colors focus:border-ink focus:outline-none';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [picked, setPicked] = useState<string[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return; // honeypot
    setStatus('sending');
    try {
      await submitLead({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        company: String(data.get('company') ?? ''),
        message: String(data.get('message') ?? ''),
        interests: picked,
      });
      setStatus('sent');
      form.reset();
      setPicked([]);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute left-1/2 top-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-signal/20 blur-[160px]" />

      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            dark
            index="11"
            label="Start a project"
            title={
              <>
                Tell us the bottleneck.{' '}
                <span className="accent-serif text-signal">We’ll tell you if AI is the answer.</span>
              </>
            }
          >
            A short note is enough. We’ll come back with honest thoughts on what’s worth
            automating, what isn’t, and what a first prototype could look like.
          </SectionHeading>

          <Reveal delay={0.1}>
            <ul className="mt-12 space-y-4">
              <ContactRow icon={Mail} label="Email">
                <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label="Studio">
                {site.location}
              </ContactRow>
              <ContactRow icon={Clock} label="Response time">
                Within 1–2 business days
              </ContactRow>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={40}>
          <div className="rounded-[28px] bg-paper p-6 text-ink shadow-[0_50px_120px_-40px_rgba(232,79,61,0.45)] sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[460px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-signal" strokeWidth={1.5} />
                  <h3 className="display mt-6 text-3xl font-semibold">Message received.</h3>
                  <p className="mt-3 max-w-sm text-ink/60">
                    Thanks for reaching out — someone from Agentiq BD will reply within one to two
                    business days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm font-medium underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Label text="Your name">
                      <input name="name" required autoComplete="name" placeholder="Jane Rahman" className={field} />
                    </Label>
                    <Label text="Work email">
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@company.com"
                        className={field}
                      />
                    </Label>
                  </div>
                  <Label text="Company">
                    <input name="company" autoComplete="organization" placeholder="Company name" className={field} />
                  </Label>

                  <fieldset>
                    <legend className="mb-2.5 text-sm font-medium text-ink/70">I’m interested in</legend>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((i) => {
                        const on = picked.includes(i);
                        return (
                          <button
                            type="button"
                            key={i}
                            aria-pressed={on}
                            onClick={() =>
                              setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))
                            }
                            className={cn(
                              'rounded-full border px-4 py-2 text-sm transition-all duration-200',
                              on
                                ? 'border-ink bg-ink text-paper'
                                : 'border-ink/15 text-ink/70 hover:border-ink/40',
                            )}
                          >
                            {i}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Label text="What would you like to improve?">
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="e.g. Our team spends hours every day answering the same WhatsApp questions…"
                      className={cn(field, 'resize-none')}
                    />
                  </Label>

                  {/* honeypot — hidden from people, catches bots */}
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-signal text-base font-medium text-paper shadow-[0_14px_36px_-14px_rgba(232,79,61,0.9)] transition-all hover:bg-signal-600 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <p role="alert" className="text-center text-sm text-signal-600">
                      Something went wrong. Please try again or email {site.email}.
                    </p>
                  )}
                  <p className="text-center text-xs text-ink/40">
                    We’ll only use your details to reply to this enquiry.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-sm font-medium text-ink/70">{text}</span>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
        <Icon className="h-5 w-5 text-signal-300" />
      </span>
      <div>
        <p className="eyebrow text-paper/40">{label}</p>
        <p className="mt-0.5 text-lg">{children}</p>
      </div>
    </li>
  );
}
