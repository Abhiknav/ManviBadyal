import { Component, Input } from '@angular/core';

/** Inline SVG sprite. Rendered once by AppComponent, referenced everywhere. */
@Component({
  selector: 'app-icon-sprite',
  standalone: true,
  template: `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <symbol id="i-scale" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M8 20h8M5 8h14"/><path d="M5 8 2.6 13.4a3 2.5 0 0 0 4.8 0Z"/><path d="M19 8l-2.4 5.4a3 2.5 0 0 0 4.8 0Z"/></g><circle cx="12" cy="8" r="1.4" fill="currentColor"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6Z"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"/></g></symbol>
  <symbol id="i-bank" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6H3ZM5 12v6M10 12v6M14 12v6M19 12v6M3 20h18"/></g></symbol>
  <symbol id="i-doc" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7ZM14 3v4h4M10 12h5M10 16h5"/></g></symbol>
  <symbol id="i-car" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16l2-7h14l2 7M3 16h18"/><circle cx="7.5" cy="17.6" r="1.7"/><circle cx="16.5" cy="17.6" r="1.7"/></g></symbol>
  <symbol id="i-book" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6C9.5 4.3 5.5 4.3 3 5.3v13c2.5-1 6.5-1 9 .7 2.5-1.7 6.5-1.7 9-.7v-13c-2.5-1-6.5-1-9 .7ZM12 6v13"/></g></symbol>
  <symbol id="i-mic" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9.5" y="3" width="5" height="9" rx="2.5"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M8.5 21h7"/></g></symbol>
  <symbol id="i-trophy" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5c0 3-2.2 5-5 5s-5-2-5-5Z"/><path d="M7 5.5H4V7c0 2 1.5 3.5 3 3.7M17 5.5h3V7c0 2-1.5 3.5-3 3.7M12 14v4.5M8 20.5h8"/></g></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M12 3c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z"/></symbol>
  <symbol id="i-flag" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v18M6 4.5h12l-3 3.5 3 3.5H6"/></g></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.5-5 6-5s6 1.5 6 5"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 15.3c2.5 0 5 1.3 5 4.2"/></g></symbol>
  <symbol id="i-cap" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4ZM6 10.6V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.4M21.5 8.5v5"/></g></symbol>
  <symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z"/></g></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4 21 21"/></g></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></g></symbol>
  <symbol id="i-quote" viewBox="0 0 24 24"><g fill="currentColor"><path d="M9 5c-3 1.5-5 4.4-5 8.2V19h6v-6H6.4c.2-2.6 1.4-4.4 3.4-5.4L9 5ZM19 5c-3 1.5-5 4.4-5 8.2V19h6v-6h-3.6c.2-2.6 1.4-4.4 3.4-5.4L19 5Z"/></g></symbol>
</defs></svg>
  `,
})
export class IconSpriteComponent {}

/** Renders one icon from the sprite. */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<svg [attr.width]="size" [attr.height]="size" aria-hidden="true"><use [attr.href]="'#i-' + name"></use></svg>`,
  styles: [`:host{ display:inline-flex; } svg{ display:block; }`],
})
export class IconComponent {
  @Input() name = 'star';
  @Input() size = 22;
}
