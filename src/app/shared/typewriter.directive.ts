import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Types text out character by character when the element scrolls into view,
 * and rewinds when it leaves so the effect replays on the way back.
 */
@Directive({
  selector: '[appTypewriter]',
  standalone: true,
})
export class TypewriterDirective implements OnInit, OnDestroy {
  @Input('appTypewriter') text = '';
  /** Milliseconds per character. */
  @Input() speed = 14;

  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  private rafId?: number;
  private caret?: HTMLElement;
  private running = false;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      node.textContent = this.text;
      return;
    }

    // Reserve the final height so the page does not jump as characters land.
    node.textContent = this.text;
    const finalHeight = node.getBoundingClientRect().height;
    if (finalHeight) node.style.minHeight = `${finalHeight}px`;
    node.textContent = '';

    this.caret = document.createElement('span');
    this.caret.className = 'tw-caret';
    this.caret.setAttribute('aria-hidden', 'true');

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Rewind on any exit so the typing replays whenever the block is
          // scrolled back into view, from either direction.
          if (e.isIntersecting) this.start();
          else this.reset();
        }
      },
      { threshold: 0.25 }
    );
    this.io.observe(node);

    window.setTimeout(() => {
      if (document.hidden) node.textContent = this.text;
    }, 2500);
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    const node = this.el.nativeElement as HTMLElement;
    node.textContent = '';
    if (this.caret) node.appendChild(this.caret);

    const chars = Array.from(this.text);
    let i = 0;
    let last = performance.now();

    const step = (now: number) => {
      if (!this.running) return;
      if (now - last >= this.speed) {
        // Emit a few characters per tick on fast displays for a natural pace.
        const budget = Math.max(1, Math.floor((now - last) / this.speed));
        for (let n = 0; n < budget && i < chars.length; n++) {
          node.insertBefore(document.createTextNode(chars[i++]), this.caret ?? null);
        }
        last = now;
      }
      if (i < chars.length) {
        this.rafId = requestAnimationFrame(step);
      } else {
        this.caret?.remove();
      }
    };
    this.rafId = requestAnimationFrame(step);
  }

  private reset(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    const node = this.el.nativeElement as HTMLElement;
    node.textContent = '';
  }

  ngOnDestroy(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.io?.disconnect();
  }
}
