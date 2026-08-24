import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { JOURNEY } from '../core/site-content';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [NgFor, NgIf, RevealDirective],
  template: `
<section id="journey" class="band-cream">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Journey</span>
      <h2>{{ j.heading }}</h2>
    </div>

    <div class="tl" #tl>
      <div class="item" *ngFor="let it of j.items; let i = index" [appReveal]="0" variant="left">
        <span class="when">{{ it.when }}</span>
        <div class="body">
          <span class="tag" [class.practice]="it.tag === 'practice'">{{ it.tag === 'practice' ? 'Practice' : 'Academe' }}</span>
          <h3>{{ it.t }}</h3>
          <div class="org" *ngIf="it.org">{{ it.org }}</div>
          <div class="nt">{{ it.nt }}</div>
        </div>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.tl{ position:relative; padding-left:34px; }
.tl::before{ content:""; position:absolute; left:5px; top:8px; bottom:8px; width:2px; background:var(--border); border-radius:2px; }
.tl::after{
  content:""; position:absolute; left:5px; top:8px; width:2px; border-radius:2px;
  background:linear-gradient(var(--gold-bright),var(--gold));
  height:var(--prog,0%);
}

.item{ position:relative; padding-bottom:26px; display:grid; grid-template-columns:170px 1fr; gap:18px; align-items:start; }
.item:last-child{ padding-bottom:0; }
.item::before{
  content:""; position:absolute; left:-34px; top:6px; width:12px; height:12px; border-radius:50%;
  background:var(--cream); border:2.5px solid var(--gold);
  transition:transform .5s cubic-bezier(.34,1.56,.64,1), box-shadow .4s;
}
.item.in::before{ box-shadow:0 0 0 5px var(--gold-wash); }
.item:hover::before{ transform:scale(1.25); }

.when{ font-family:"JetBrains Mono",monospace; font-size:.75rem; font-weight:600; color:var(--ink-faint); padding-top:3px; }
.tag{
  font-family:"JetBrains Mono",monospace; font-size:.6rem; font-weight:700; letter-spacing:.09em;
  text-transform:uppercase; padding:3px 9px; border-radius:100px; display:inline-block; margin-bottom:7px;
  background:color-mix(in srgb,var(--navy) 13%, transparent); color:var(--navy);
}
.tag.practice{ background:var(--gold-wash); color:var(--gold); }
h3{ font-size:1.03rem; }
.org{ color:var(--ink-soft); font-size:.9rem; margin-top:2px; }
.nt{ color:var(--ink-faint); font-size:.85rem; margin-top:3px; }

@media (max-width:640px){ .item{ grid-template-columns:1fr; gap:6px } }
  `],
})
export class JourneyComponent implements AfterViewInit {
  j = JOURNEY;
  @ViewChild('tl') tlRef?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void { this.update(); }

  /** Fills the spine in step with how far the section has been scrolled. */
  @HostListener('window:scroll')
  @HostListener('window:resize')
  update(): void {
    const el = this.tlRef?.nativeElement;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.82;
    const end = -r.height + vh * 0.35;
    const p = Math.max(0, Math.min(1, (start - r.top) / (start - end)));
    el.style.setProperty('--prog', `${(p * 100).toFixed(1)}%`);
  }
}
