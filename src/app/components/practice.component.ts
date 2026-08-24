import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { IconComponent } from './icon.component';
import { PRACTICE } from '../core/site-content';
import { EnquiryService } from '../core/enquiry.service';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [NgFor, RevealDirective, IconComponent],
  template: `
<section id="practice">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Practice</span>
      <h2>{{ p.heading }}</h2>
      <p>{{ p.sub }}</p>
    </div>

    <div class="rows">
      <button
        class="row"
        type="button"
        *ngFor="let it of p.items; let i = index"
        [appReveal]="i"
        (click)="enquire(it.t)">
        <span class="idx">{{ pad(i + 1) }}</span>
        <span class="ic"><app-icon [name]="it.icon" [size]="22"></app-icon></span>
        <span class="t">{{ it.t }}</span>
        <span class="d">{{ it.d }}</span>
        <span class="go" aria-hidden="true">→</span>
      </button>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.rows{ border-top:1px solid var(--border); }

.row{
  font:inherit; text-align:left; width:100%; cursor:pointer; background:transparent;
  border:none; border-bottom:1px solid var(--border);
  display:grid; grid-template-columns:52px 44px 1.05fr 1.5fr 34px;
  align-items:center; gap:18px; padding:22px 14px;
  position:relative; overflow:hidden; color:var(--ink);
  transition:padding .35s var(--ease), color .35s;
}

/* On entrance each row assembles itself: rule draws across, number and icon
   pop, the title slides in from the left and the description from the right. */
.row::after{
  content:""; position:absolute; left:0; right:0; bottom:-1px; height:1px;
  background:var(--gold); transform:scaleX(0); transform-origin:left;
  transition:transform .8s var(--ease) calc(var(--i,0) * 80ms);
}
.row.in::after{ transform:scaleX(1); }

.row .idx, .row .ic, .row .t, .row .d{
  opacity:0;
  transition:opacity .6s var(--ease), transform .68s var(--ease);
  transition-delay:calc(var(--i,0) * 80ms + var(--cd, 0ms));
}
.row .idx{ transform:translateY(10px); --cd:60ms; }
.row .ic{ transform:scale(.6) rotate(-14deg); --cd:120ms; }
.row .t{ transform:translateX(-34px); --cd:180ms; }
.row .d{ transform:translateX(38px); --cd:250ms; }
.row.in .idx, .row.in .ic, .row.in .t, .row.in .d{ opacity:1; transform:none; }

@media (prefers-reduced-motion: reduce){
  .row .idx,.row .ic,.row .t,.row .d{ opacity:1 !important; transform:none !important; transition:none !important; }
  .row::after{ transform:scaleX(1); transition:none; }
}
/* gold wash sweeps in from the left on hover */
.row::before{
  content:""; position:absolute; inset:0; z-index:-1; background:var(--gold-wash);
  transform:scaleX(0); transform-origin:left; transition:transform .45s var(--ease);
}
.row:hover{ padding-left:26px; }
.row:hover::before{ transform:scaleX(1); }

.idx{ font-family:"JetBrains Mono",monospace; font-size:.72rem; font-weight:700; color:var(--gold); }
.ic{
  width:44px; height:44px; border-radius:12px; background:var(--gold-wash); color:var(--gold);
  display:flex; align-items:center; justify-content:center;
  transition:transform .4s var(--ease), background .3s;
}
.row:hover .ic{ transform:rotate(-8deg) scale(1.08); background:var(--card); }
/* Hover must react instantly — the entrance stagger delay must not apply here. */
.row:hover .idx, .row:hover .ic, .row:hover .t, .row:hover .d{ transition-delay:0ms; }

.t{ font-family:"Bricolage Grotesque",sans-serif; font-weight:700; font-size:1.1rem; letter-spacing:-.02em; }
.d{ font-size:.9rem; color:var(--ink-soft); }
.go{
  font-size:1.1rem; color:var(--gold); justify-self:end;
  opacity:0; transform:translateX(-8px); transition:opacity .3s, transform .35s var(--ease);
}
.row:hover .go{ opacity:1; transform:none; }

@media (max-width:820px){
  .row{ grid-template-columns:40px 40px 1fr; gap:14px; padding:18px 10px; }
  .d{ grid-column:1 / -1; padding-left:54px; }
  .go{ display:none; }
  .row:hover{ padding-left:14px; }
}
  `],
})
export class PracticeComponent {
  p = PRACTICE;
  constructor(private enquiry: EnquiryService) {}
  pad(n: number): string { return String(n).padStart(2, '0'); }
  enquire(subject: string): void { this.enquiry.enquire(subject); }
}
