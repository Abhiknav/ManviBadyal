import { Injectable, signal } from '@angular/core';
import { STUDENTS, SUBMIT_ENDPOINT } from './site-content';

export interface Feedback {
  q: string;
  who: string;
  /** Present only on entries submitted through the site, not the curated ones. */
  pending?: boolean;
  at?: string;
}

const STORAGE_KEY = 'manvi.feedback.v1';

/**
 * Holds the student feedback shown in the "Ask the back bench" section.
 *
 * Curated quotes come from site-content. Anything submitted through the form is
 * kept in localStorage and shown to that visitor marked "awaiting review", so
 * the act of submitting has a visible result.
 *
 * localStorage is per-browser: a submission made here is NOT visible to Manvi
 * or to anyone else. Set SUBMIT_ENDPOINT in site-content.ts to POST submissions
 * to a real backend — then they reach her and can be moderated into the curated
 * list.
 */
@Injectable({ providedIn: 'root' })
export class FeedbackService {
  /** Locally submitted entries, newest first. */
  readonly mine = signal<Feedback[]>(this.load());

  /** Curated quotes plus anything submitted from this browser. */
  readonly all = signal<Feedback[]>([...STUDENTS.quotes, ...this.load()]);

  /** True when submissions are delivered to a server rather than kept locally. */
  readonly hasBackend = !!SUBMIT_ENDPOINT;

  private load(): Feedback[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Feedback[]) : [];
    } catch {
      return [];
    }
  }

  private persist(list: Feedback[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* private browsing / quota — the in-memory copy still works this session */
    }
  }

  async submit(entry: { q: string; who: string }): Promise<'sent' | 'local'> {
    const record: Feedback = {
      q: entry.q.trim(),
      who: entry.who.trim() || 'Student',
      pending: true,
      at: new Date().toISOString(),
    };

    const next = [record, ...this.mine()];
    this.mine.set(next);
    this.all.set([...STUDENTS.quotes, ...next]);
    this.persist(next);

    if (!SUBMIT_ENDPOINT) return 'local';

    try {
      await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'feedback', ...record }),
      });
      return 'sent';
    } catch {
      return 'local';
    }
  }
}
