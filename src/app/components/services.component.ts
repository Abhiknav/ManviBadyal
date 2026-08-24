import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { CountUpDirective } from '../shared/count-up.directive';
import { IconComponent } from './icon.component';
import { SERVICES } from '../core/site-content';
import { EnquiryService } from '../core/enquiry.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, RevealDirective, CountUpDirective, IconComponent],
  template: `
<section id="services" class="band-cream">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Research &amp; drafting</span>
      <h2>{{ s.heading }} <span class="serif">{{ s.headingAccent }}</span></h2>
      <p>{{ s.sub }}</p>
    </div>

    <div class="proof" [appReveal]="1" variant="down">
      <div class="p" *ngFor="let p of s.proof">
        <span class="v" [appCountUp]="p.v" [suffix]="p.suffix || ''">0</span>
        <span class="k">{{ p.k }}</span>
      </div>
    </div>

    <div class="grid">
      <button
        class="svc"
        type="button"
        *ngFor="let it of s.items; let i = index"
        [appReveal]="i"
        (click)="enquire(it.t)">
        <span class="ic"><app-icon [name]="it.icon" [size]="24"></app-icon></span>
        <span class="body">
          <span class="t">{{ it.t }}</span>
          <span class="d">{{ it.d }}</span>
        </span>
        <span class="go">Enquire <span class="arw">→</span></span>
      </button>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.proof{
  display:flex; gap:0; flex-wrap:wrap; margin-bottom:30px;
  background:var(--card); border:1px solid var(--border); border-radius:18px; overflow:hidden;
}
.proof .p{ flex:1 1 180px; padding:22px 24px; display:flex; flex-direction:column; gap:6px; border-right:1px solid var(--line); }
.proof .p:last-child{ border-right:none; }
.proof .v{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:2rem; letter-spacing:-.04em; color:var(--gold); line-height:1; }
.proof .k{ font-size:.8rem; color:var(--ink-faint); font-weight:600; }

.grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
@media (max-width:900px){ .grid{ grid-template-columns:repeat(2,1fr) } }
@media (max-width:600px){ .grid{ grid-template-columns:1fr } .proof .p{ border-right:none; border-bottom:1px solid var(--line) } }

.svc{
  font:inherit; text-align:left; cursor:pointer;
  background:var(--card); border:1px solid var(--border); border-radius:18px; padding:24px;
  display:flex; flex-direction:column; gap:14px; position:relative; overflow:hidden;
  transition:transform .3s var(--ease), box-shadow .3s, border-color .3s;
}
.svc::after{
  content:""; position:absolute; left:0; right:0; bottom:0; height:2px;
  background:linear-gradient(90deg,var(--gold-bright),var(--gold));
  transform:scaleX(0); transform-origin:left; transition:transform .4s var(--ease);
}
.svc:hover{ transform:translateY(-6px); box-shadow:var(--shadow-lg); border-color:transparent; }
.svc:hover::after{ transform:scaleX(1); }

.ic{
  width:48px; height:48px; border-radius:14px; background:var(--gold-wash); color:var(--gold);
  display:flex; align-items:center; justify-content:center;
  transition:transform .35s var(--ease), background .3s;
}
.svc:hover .ic{ transform:rotate(-8deg) scale(1.06); }

.body{ display:flex; flex-direction:column; gap:6px; }
.t{ font-family:"Bricolage Grotesque",sans-serif; font-weight:700; font-size:1.03rem; letter-spacing:-.02em; color:var(--ink); }
.d{ font-size:.89rem; color:var(--ink-soft); line-height:1.5; }

.go{
  margin-top:auto; font-family:"JetBrains Mono",monospace; font-size:.7rem; font-weight:700;
  letter-spacing:.08em; text-transform:uppercase; color:var(--gold);
  display:inline-flex; align-items:center; gap:7px; opacity:.55; transition:opacity .3s;
}
.svc:hover .go{ opacity:1; }
.go .arw{ transition:transform .28s var(--ease); }
.svc:hover .go .arw{ transform:translateX(5px); }
  `],
})
export class ServicesComponent {
  s = SERVICES;
  constructor(private enquiry: EnquiryService) {}

  /** Preselects the subject in the contact form and scrolls to it. */
  enquire(subject: string): void {
    this.enquiry.enquire(subject);
  }
}
