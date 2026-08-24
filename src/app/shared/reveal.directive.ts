import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

export type RevealVariant =
  | 'up' | 'down' | 'left' | 'right'
  | 'corner' | 'corner-left' | 'scale' | 'blur' | 'clip' | 'tilt';

/**
 * Scroll reveal that RE-TRIGGERS.
 *
 * The element animates in every time it enters the viewport and resets once it
 * leaves — from either direction — so scrolling back replays the entrance
 * instead of showing a stale, already-revealed block.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'rv' },
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Stagger index — drives transition-delay via the --i custom property. */
  @Input('appReveal') index: number | string = 0;
  /** Which entrance the element uses. */
  @Input() variant: RevealVariant = 'up';
  /** Extra delay in ms on top of the stagger. */
  @Input() delay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  private failSafeId?: number;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.style.setProperty('--i', String(this.index ?? 0));
    if (this.delay) node.style.setProperty('--d', `${this.delay}ms`);
    node.setAttribute('data-rv', this.variant);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      node.classList.add('in');
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) node.classList.add('in');
          else node.classList.remove('in');
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.io.observe(node);

    // If the document renders while hidden, IntersectionObserver never fires and
    // the content would be stranded at opacity 0. Force it visible.
    this.failSafeId = window.setTimeout(() => {
      if (document.hidden) node.classList.add('in');
    }, 2500);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    if (this.failSafeId) window.clearTimeout(this.failSafeId);
  }
}
