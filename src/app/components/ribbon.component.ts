import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ribbon',
  standalone: true,
  imports: [NgFor],
  template: `
<div class="ribbon" [class.alt]="alt" aria-hidden="true">
  <div class="track" [class.reverse]="alt">
    <span class="item" *ngFor="let it of doubled">{{ it }}</span>
  </div>
</div>
  `,
  styles: [`
:host{ display:block; }
.ribbon{ background:var(--navy-deep); padding:15px 0; overflow:hidden; white-space:nowrap; }
.ribbon.alt{ background:var(--cream); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.track{ display:inline-flex; animation:slide 34s linear infinite; }
.track.reverse{ animation-duration:42s; animation-direction:reverse; }
@keyframes slide{ from{ transform:translateX(0) } to{ transform:translateX(-50%) } }
.item{
  font-family:"JetBrains Mono",monospace; font-size:.8rem; font-weight:500;
  letter-spacing:.11em; text-transform:uppercase; color:rgba(255,255,255,.72);
  padding:0 20px; display:inline-flex; align-items:center; gap:20px;
}
.item::after{ content:"◆"; font-size:.55rem; color:var(--gold-bright); }
.ribbon.alt .item{ color:var(--ink-soft); }
@media (prefers-reduced-motion: reduce){ .track{ animation:none } }
  `],
})
export class RibbonComponent {
  @Input() items: string[] = [];
  @Input() alt = false;
  /** Duplicated so the -50% translate loops seamlessly. */
  get doubled(): string[] { return [...this.items, ...this.items]; }
}
