import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { TypewriterDirective } from '../shared/typewriter.directive';
import { CountUpDirective } from '../shared/count-up.directive';
import { IconComponent } from './icon.component';
import { ABOUT } from '../core/site-content';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf, RevealDirective, TypewriterDirective, CountUpDirective, IconComponent],
  template: `
<section id="about">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">About</span>
      <h2>{{ about.heading }} <span class="serif">{{ about.headingAccent }}</span></h2>
    </div>

    <div class="bento">
      <div class="bx lead" [appReveal]="0" variant="corner-left">
        <app-icon class="qm" name="quote" [size]="30"></app-icon>
        <p class="typed" [appTypewriter]="about.typed" [speed]="12"></p>
        <p class="closing">{{ about.closing }}</p>
      </div>

      <div class="bx stat" *ngFor="let f of about.facts; let i = index" [appReveal]="i + 1" variant="scale">
        <div class="v" *ngIf="f.decimal" [appCountUp]="0" [decimal]="f.decimal">0.00</div>
        <div class="v" *ngIf="!f.decimal" [appCountUp]="f.v!" [suffix]="f.suffix || ''">0</div>
        <div class="k">{{ f.k }}</div>
      </div>

      <div class="bx wide" *ngFor="let c of about.cards; let i = index" [appReveal]="i + 3" variant="right">
        <span class="ic"><app-icon [name]="c.icon" [size]="23"></app-icon></span>
        <div><div class="t">{{ c.t }}</div><div class="d">{{ c.d }}</div></div>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.bento{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.bx{ background:var(--card); border:1px solid var(--border); border-radius:20px; padding:26px; position:relative; overflow:hidden; }

.lead{ grid-column:span 2; grid-row:span 2; display:flex; flex-direction:column; gap:16px; }
.lead .qm{ color:var(--gold-bright); opacity:.5; }
.typed{ font-size:1.08rem; line-height:1.62; color:var(--ink-soft); }
.closing{ font-size:.95rem; color:var(--ink-faint); border-top:1px solid var(--line); padding-top:16px; margin-top:auto; }

/* blinking caret appended by the typewriter directive */
::ng-deep .tw-caret{
  display:inline-block; width:2px; height:1.05em; vertical-align:-.16em;
  margin-left:2px; background:var(--gold-bright); animation:blink .9s steps(1) infinite;
}
@keyframes blink{ 0%,50%{ opacity:1 } 51%,100%{ opacity:0 } }

.stat .v{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:2.3rem; letter-spacing:-.04em; color:var(--ink); line-height:1; }
.stat .k{ font-size:.82rem; color:var(--ink-faint); margin-top:9px; font-weight:600; }

.wide{ grid-column:span 2; display:flex; align-items:center; gap:18px; transition:transform .3s var(--ease), border-color .3s; }
.wide:hover{ transform:translateY(-4px); border-color:var(--gold); }
.wide .ic{ width:46px; height:46px; border-radius:13px; background:var(--gold-wash); color:var(--gold); display:flex; align-items:center; justify-content:center; flex:none; }
.wide .t{ font-weight:700; font-size:1rem; }
.wide .d{ font-size:.86rem; color:var(--ink-soft); margin-top:2px; }

@media (max-width:900px){ .bento{ grid-template-columns:repeat(2,1fr) } .lead{ grid-column:span 2; grid-row:auto } }
@media (max-width:560px){ .bento{ grid-template-columns:1fr } .lead,.wide{ grid-column:span 1 } }
  `],
})
export class AboutComponent {
  about = ABOUT;
}
