import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';

/**
 * Emits how far the host element has been scrolled through the viewport as a
 * 0..1 value. Drives the publications wheel without a scroll library — just a
 * rAF-throttled scroll listener.
 */
@Directive({
  selector: '[appScrollProgress]',
  standalone: true,
})
export class ScrollProgressDirective implements OnInit, OnDestroy {
  @Output() appScrollProgress = new EventEmitter<number>();

  private el = inject(ElementRef<HTMLElement>);
  private rafId = 0;
  private onScrollBound = () => this.schedule();
  private onVisibleBound = () => { if (!document.hidden) this.schedule(); };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScrollBound, { passive: true });
    window.addEventListener('resize', this.onScrollBound, { passive: true });
    // requestAnimationFrame is paused while a document is hidden, so a page that
    // loads in a background tab must re-sync once it becomes visible.
    document.addEventListener('visibilitychange', this.onVisibleBound);
    // Deferred: emitting synchronously here can land inside the first change
    // detection pass on a cold bootstrap and trip NG0100.
    setTimeout(() => this.schedule());
  }

  /**
   * Coalesces bursts of scroll events into one measurement per frame.
   *
   * Uses a cancellable frame id rather than a boolean "ticking" latch: a latch
   * set while the document is hidden never clears (the frame never runs), which
   * silently freezes the effect for the rest of the page's life.
   */
  private schedule(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      this.measure();
    });
  }

  private measure(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    const progress = travel <= 0
      ? (rect.top < window.innerHeight / 2 ? 1 : 0)
      : Math.min(1, Math.max(0, -rect.top / travel));
    this.appScrollProgress.emit(progress);
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('scroll', this.onScrollBound);
    window.removeEventListener('resize', this.onScrollBound);
    document.removeEventListener('visibilitychange', this.onVisibleBound);
  }
}
