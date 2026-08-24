import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Splits text into words and rises them in one after another when the block
 * scrolls into view. Resets on exit so it replays on the way back.
 *
 * Each word sits in a clipping wrapper, so the words appear to lift up out of
 * the line rather than just fading.
 */
@Directive({
  selector: '[appSplitText]',
  standalone: true,
  host: { class: 'split' },
})
export class SplitTextDirective implements OnInit, OnDestroy {
  @Input('appSplitText') text = '';
  /** Milliseconds between consecutive words. */
  @Input() stagger = 26;

  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const source = (this.text || node.textContent || '').trim();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    node.textContent = '';
    const words = source.split(/\s+/);

    words.forEach((w, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'w';
      const inner = document.createElement('span');
      inner.textContent = w;
      inner.style.transitionDelay = `${i * this.stagger}ms`;
      wrap.appendChild(inner);
      node.appendChild(wrap);
      // Preserve the space between words as a real text node so the line wraps
      // and copies normally.
      if (i < words.length - 1) node.appendChild(document.createTextNode(' '));
    });

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
      { threshold: 0.2 }
    );
    this.io.observe(node);

    window.setTimeout(() => { if (document.hidden) node.classList.add('in'); }, 2500);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
