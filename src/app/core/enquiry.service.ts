import { Injectable, signal } from '@angular/core';

export interface EnquiryRequest {
  subject: string;
  /** Incremented on every click so repeat clicks on the same card still fire. */
  seq: number;
}

/**
 * Bridges the "Enquire" buttons to the contact form: records which subject was
 * clicked, then scrolls the form into view so the click has a visible result.
 */
@Injectable({ providedIn: 'root' })
export class EnquiryService {
  readonly request = signal<EnquiryRequest | null>(null);
  private seq = 0;

  enquire(subject: string): void {
    this.request.set({ subject, seq: ++this.seq });

    const el = document.getElementById('contact');
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

    // Draw the eye to the form once scrolling has settled.
    window.setTimeout(() => {
      const form = document.getElementById('contact-form');
      if (!form) return;
      form.classList.add('flash');
      window.setTimeout(() => form.classList.remove('flash'), 1400);
    }, reduce ? 0 : 620);
  }
}
