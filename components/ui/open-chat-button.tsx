'use client';

import type { ReactNode } from 'react';
import { site } from '@/lib/content';
import { cn } from '@/lib/utils';

export const OPEN_CHAT_EVENT = 'agentiq:open-chat';

/**
 * Opens the on-site chat assistant. The chat widget should listen for OPEN_CHAT_EVENT and set
 * `event.detail.handled = true`; until a widget is mounted this falls back to WhatsApp.
 */
export function OpenChatButton({ children, className }: { children: ReactNode; className?: string }) {
  function open() {
    const detail = { handled: false };
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail }));
    if (!detail.handled && site.whatsapp) {
      window.open(`https://wa.me/${site.whatsapp}`, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <button type="button" onClick={open} className={cn(className)}>
      {children}
    </button>
  );
}
