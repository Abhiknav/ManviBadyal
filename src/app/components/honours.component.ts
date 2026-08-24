import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { IconComponent } from './icon.component';
import { HONOURS } from '../core/site-content';

@Component({
  selector: 'app-honours',
  standalone: true,
  imports: [NgFor, RevealDirective, IconComponent],
  template: `
<section id="honours">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Honours</span>
      <h2>{{ h.heading }}</h2>
    </div>

    <div class="grid">
      <article class="h" *ngFor="let it of h.items; let i = index" [appReveal]="i" variant="scale">
        <span class="glow" aria-hidden="true"></span>
        <span class="ic"><app-icon [name]="it.icon" [size]="21"></app-icon></span>
        <span class="tx">
          <span class="t">{{ it.t }}</span>
          <span class="d">{{ it.d }}</span>
        </span>
      </article>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
@media (max-width:820px){ .grid{ grid-template-columns:repeat(2,1fr) } }
@media (max-width:520px){ .grid{ grid-template-columns:1fr } }

.h{
  background:var(--card); border:1px solid var(--border); border-radius:18px; padding:22px;
  display:flex; gap:15px; align-items:flex-start; position:relative; overflow:hidden;
  transition:transform .32s var(--ease), box-shadow .32s, border-color .32s;
}
.h:hover{ transform:translateY(-6px); box-shadow:var(--shadow-lg); border-color:transparent; }

/* gold bloom that follows the card on hover */
.glow{
  position:absolute; top:-40%; right:-30%; width:180px; height:180px; border-radius:50%;
  background:radial-gradient(circle,var(--gold-bright) 0%,transparent 68%);
  opacity:0; transform:scale(.6); transition:opacity .45s, transform .55s var(--ease);
}
.h:hover .glow{ opacity:.16; transform:scale(1); }

.ic{
  width:42px; height:42px; border-radius:12px; background:var(--gold-wash); color:var(--gold);
  display:flex; align-items:center; justify-content:center; flex:none; position:relative;
  transition:transform .4s var(--ease);
}
.h:hover .ic{ transform:rotate(-10deg) scale(1.08); }

.tx{ display:flex; flex-direction:column; gap:3px; position:relative; }
.t{ font-size:.93rem; font-weight:700; color:var(--ink); line-height:1.4; }
.d{ font-size:.8rem; color:var(--ink-faint); font-weight:500; }
  `],
})
export class HonoursComponent {
  h = HONOURS;
}
