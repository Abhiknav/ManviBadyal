import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { CountUpDirective } from '../shared/count-up.directive';
import { SplitTextDirective } from '../shared/split-text.directive';
import { TEACHING } from '../core/site-content';

@Component({
  selector: 'app-teaching',
  standalone: true,
  imports: [NgFor, NgIf, RevealDirective, CountUpDirective, SplitTextDirective],
  template: `
<section id="teaching" class="band-dark">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Teaching</span>
      <h2>{{ t.heading }}</h2>
      <p>{{ t.sub }}</p>
    </div>

    <div class="grid">
      <div class="now" [appReveal]="0" variant="corner-left">
        <span class="badge"><i></i>Currently teaching</span>
        <h3>{{ t.nowTitle }}</h3>
        <div class="meta">{{ t.nowMeta }}</div>
        <p class="body-copy" [appSplitText]="t.nowBody" [stagger]="22"></p>
        <div class="stats">
          <div class="s" *ngFor="let s of t.stats">
            <div class="v" *ngIf="isNumber(s.v); else plain" [appCountUp]="s.v" [suffix]="s.suffix || ''">0</div>
            <ng-template #plain><div class="v">{{ s.v }}</div></ng-template>
            <div class="k">{{ s.k }}</div>
          </div>
        </div>
      </div>

      <div class="courses">
        <article class="course" *ngFor="let c of t.courses; let i = index"
                 [appReveal]="i" variant="corner" [delay]="120">
          <span class="n">{{ c.n }}</span>
          <div>
            <h4>{{ c.t }}</h4>
            <p>{{ c.d }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.grid{ display:grid; grid-template-columns:.92fr 1.08fr; gap:clamp(30px,5vw,56px); align-items:start; }
@media (max-width:900px){ .grid{ grid-template-columns:1fr } }

.now{
  background:linear-gradient(150deg,#1B2C48 0%,#142338 100%);
  border:1px solid var(--border); border-radius:24px; padding:30px; position:relative; overflow:hidden;
}
.now::before{
  content:""; position:absolute; top:-70px; right:-70px; width:210px; height:210px; border-radius:50%;
  background:radial-gradient(circle,var(--gold-bright) 0%,transparent 66%); opacity:.2;
  animation:pulse 7s ease-in-out infinite;
}
@keyframes pulse{ 0%,100%{ transform:scale(1); opacity:.2 } 50%{ transform:scale(1.18); opacity:.3 } }

.badge{
  display:inline-flex; align-items:center; gap:8px;
  font-family:"JetBrains Mono",monospace; font-size:.64rem; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--navy-deep);
  background:var(--gold-bright); padding:5px 11px; border-radius:100px; position:relative;
}
.badge i{ width:6px; height:6px; border-radius:50%; background:var(--navy-deep); animation:blip 1.8s ease-in-out infinite; }
@keyframes blip{ 0%,100%{ opacity:1 } 50%{ opacity:.25 } }

.now h3{ font-size:1.5rem; margin-top:18px; letter-spacing:-.03em; }
.now .meta{ font-family:"JetBrains Mono",monospace; font-size:.73rem; color:var(--gold); margin-top:8px; letter-spacing:.05em; }
.now .body-copy{ color:var(--ink-soft); font-size:.95rem; margin-top:16px; }

.stats{ display:flex; gap:26px; margin-top:24px; padding-top:22px; border-top:1px solid var(--border); flex-wrap:wrap; }
.stats .v{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:1.7rem; color:var(--gold-bright); letter-spacing:-.03em; line-height:1; }
.stats .k{ font-size:.73rem; color:var(--ink-faint); margin-top:5px; font-weight:600; }

.courses{ display:flex; flex-direction:column; gap:12px; }
.course{
  display:flex; align-items:flex-start; gap:16px; background:var(--card);
  border:1px solid var(--border); border-radius:16px; padding:18px 20px;
  transition:transform .32s var(--ease), border-color .32s, background .32s;
}
.course:hover{ transform:translateX(8px); border-color:var(--gold); }
.course .n{ font-family:"JetBrains Mono",monospace; font-size:.72rem; font-weight:700; color:var(--gold); padding-top:3px; flex:none; }
.course h4{ font-size:1rem; font-weight:700; letter-spacing:-.02em; }
.course p{ margin-top:4px; font-size:.87rem; color:var(--ink-soft); line-height:1.5; }

@media (prefers-reduced-motion: reduce){ .now::before,.badge i{ animation:none !important } }
  `],
})
export class TeachingComponent {
  t = TEACHING;
  isNumber(v: string): boolean { return /^\d+$/.test(v); }
}
