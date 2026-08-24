import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Counts a number up when it scrolls into view, and re-runs on re-entry.
 * Falls back to the final value when the document is hidden, because
 * requestAnimationFrame is paused there and would otherwise leave a stale 0.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  /** Whole-number target, e.g. 100. Ignored when `decimal` is set. */
  @Input('appCountUp') value: number | string = 0;
  /** Decimal target as a string, e.g. '8.27' — preserves trailing zeros. */
  @Input() decimal?: string;
  @Input() suffix = '';
  @Input() duration = 1150;

  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  private rafId?: number;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      this.snap();
      return;
    }

    node.textContent = this.decimal ? (0).toFixed(this.decimals()) : '0' + this.suffix;

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this.run();
        }
      },
      { threshold: 0.5 }
    );
    this.io.observe(node);

    window.setTimeout(() => { if (document.hidden) this.snap(); }, 2500);
  }

  private decimals(): number {
    const d = this.decimal ?? '';
    const dot = d.indexOf('.');
    return dot === -1 ? 0 : d.length - dot - 1;
  }

  private target(): number {
    return this.decimal ? parseFloat(this.decimal) : Number(this.value);
  }

  private snap(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.textContent = this.decimal
      ? this.target().toFixed(this.decimals())
      : this.target() + this.suffix;
  }

  private run(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    const node = this.el.nativeElement as HTMLElement;
    const target = this.target();
    const dp = this.decimals();
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / this.duration);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = this.decimal
        ? (target * eased).toFixed(dp)
        : Math.round(target * eased) + this.suffix;
      if (p < 1) this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.io?.disconnect();
  }
}
