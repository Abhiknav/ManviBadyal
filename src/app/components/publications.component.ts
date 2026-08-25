import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { ScrollProgressDirective } from '../shared/scroll-progress.directive';
import { CountUpDirective } from '../shared/count-up.directive';
import { CONFERENCES, PUBLICATIONS } from '../core/site-content';

const SPAN_DEG = 150;

interface WheelItem {
  item: (typeof PUBLICATIONS.items)[number];
  index: number;
  angle: number;
  opacity: number;
  scale: number;
  focused: boolean;
}

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [NgFor, NgClass, RevealDirective, ScrollProgressDirective, CountUpDirective],
  template: `
<section id="publications" class="band-cream">

  <!-- tall scroll track; the viewport inside it sticks while the wheel turns -->
  <div class="track" [style.height.vh]="pub.items.length * 46" (appScrollProgress)="onProgress($event)">
    <div class="sticky">
      <div class="wrap stage">

        <!-- LEFT: heading + the record as a table, focused row lit -->
        <div class="left">
          <div class="sec-head" [appReveal]="0" variant="clip">
            <span class="label">Writing</span>
            <h2>{{ pub.heading }} <span class="serif">{{ pub.headingAccent }}</span></h2>
          </div>

          <div class="tally" [appReveal]="1" variant="left">
            <div class="t"><span class="v" [appCountUp]="publishedCount">0</span><span class="k">Published</span></div>
            <div class="t"><span class="v" [appCountUp]="conf.papers.length">0</span><span class="k">Conferences</span></div>
            <div class="t"><span class="v" [appCountUp]="pipelineCount">0</span><span class="k">In press</span></div>
          </div>

          <table class="record" [appReveal]="2" variant="left">
            <thead>
              <tr><th class="n">#</th><th>Work</th><th class="ty">Type</th><th class="st">Status</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let v of views"
                  [class.on]="v.focused"
                  (click)="focus(v.index)"
                  (keydown.enter)="focus(v.index)"
                  tabindex="0">
                <td class="n">{{ pad(v.index + 1) }}</td>
                <td class="w">{{ v.item.title }}</td>
                <td class="ty">{{ v.item.type }}</td>
                <td class="st"><span class="pill" [ngClass]="v.item.status">{{ statusLabel(v.item.status) }}</span></td>
              </tr>
            </tbody>
          </table>

          <p class="readout">
            <span class="ro-meta">{{ focused.meta }}</span>
          </p>
          <p class="hint">Scroll to turn the wheel — or pick a row</p>
        </div>

        <!-- RIGHT: the vertical wheel -->
        <div class="wheel" aria-hidden="true">
          <span class="arc"></span>
          <div class="pivot">
            <button
              class="spoke"
              type="button"
              *ngFor="let v of views"
              [class.on]="v.focused"
              [style.transform]="spokeTransform(v)"
              [style.opacity]="v.opacity"
              [style.zIndex]="v.focused ? 5 : 1"
              (click)="focus(v.index)">
              <span class="card">
                <span class="spine" [ngClass]="v.item.status"></span>
                <span class="cbody">
                  <span class="ctype">{{ v.item.type }}</span>
                  <span class="ctitle">{{ v.item.title }}</span>
                  <span class="cstatus" [ngClass]="v.item.status">{{ statusLabel(v.item.status) }}</span>
                </span>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- conferences + certifications -->
  <div class="wrap after">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <h2>{{ conf.heading }} <span class="serif">{{ conf.headingAccent }}</span></h2>
      <p>{{ conf.sub }}</p>
    </div>

    <div class="confs">
      <article class="conf" *ngFor="let c of conf.papers; let i = index" [appReveal]="i" variant="left">
        <span class="role" [class.presented]="c.role !== 'Participated'">{{ c.role }}</span>
        <span class="ct">{{ c.title }}</span>
        <span class="ch">{{ c.host }}</span>
      </article>
    </div>

    <div class="certs">
      <div class="cert" *ngFor="let c of conf.certifications; let i = index" [appReveal]="i" variant="corner">
        <span class="seal" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="28" r="17" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <circle cx="32" cy="28" r="12.5" fill="none" stroke="currentColor" stroke-width=".9" opacity=".55"/>
            <path d="M26 28.5l4.2 4.2L38 25" fill="none" stroke="currentColor" stroke-width="2.1"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 43l-4 13 12-5.4L44 56l-4-13" fill="none" stroke="currentColor"
                  stroke-width="1.6" stroke-linejoin="round"/>
          </svg>
        </span>
        <span><span class="t">{{ c.t }}</span><span class="d">{{ c.d }}</span></span>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }

/* ---------- sticky stage ---------- */
.track{ position:relative; }
.sticky{ position:sticky; top:0; height:100vh; display:flex; align-items:center; overflow:hidden; }
.stage{ display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(24px,4vw,52px); align-items:center; width:100%; }

/* ---------- left column ---------- */
.left{ min-width:0; }
.left .sec-head{ margin-bottom:22px; }
.left .sec-head h2{ font-size:clamp(1.6rem,3.2vw,2.4rem); }

.tally{ display:flex; gap:0; background:var(--card); border:1px solid var(--border); border-radius:16px; overflow:hidden; margin-bottom:18px; }
.tally .t{ flex:1; padding:14px 18px; display:flex; flex-direction:column; gap:3px; border-right:1px solid var(--line); }
.tally .t:last-child{ border-right:none; }
.tally .v{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:1.6rem; letter-spacing:-.04em; color:var(--gold); line-height:1; }
.tally .k{ font-size:.72rem; color:var(--ink-faint); font-weight:600; }

.record{ width:100%; border-collapse:collapse; background:var(--card); border:1px solid var(--border); border-radius:16px; overflow:hidden; }
.record th{
  font-family:"JetBrains Mono",monospace; font-size:.58rem; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; color:var(--ink-faint); text-align:left; padding:11px 14px;
  border-bottom:1px solid var(--border); background:color-mix(in srgb,var(--ink-faint) 7%, transparent);
}
.record td{ padding:11px 14px; border-bottom:1px solid var(--line); font-size:.86rem; vertical-align:middle; }
.record tr:last-child td{ border-bottom:none; }
.record tbody tr{ cursor:pointer; transition:background .35s var(--ease), transform .45s var(--ease); }
.record tbody tr:hover{ background:color-mix(in srgb,var(--gold) 8%, transparent); }
/* the focused row lights up and nudges across as the wheel turns */
.record tbody tr.on{ background:var(--gold-wash); transform:translateX(6px); }
.record tbody tr.on .w{ color:var(--ink); font-weight:700; }
.record .n{ width:34px; font-family:"JetBrains Mono",monospace; font-size:.72rem; color:var(--gold); }
.record .w{ color:var(--ink-soft); line-height:1.35; }
.record .ty{ width:104px; font-size:.76rem; color:var(--ink-faint); white-space:nowrap; }
.record .st{ width:104px; }
.pill{
  font-family:"JetBrains Mono",monospace; font-size:.54rem; font-weight:700; letter-spacing:.09em;
  text-transform:uppercase; padding:3px 8px; border-radius:100px; white-space:nowrap;
}
.pill.published{ background:var(--gold-wash); color:var(--gold); }
.pill.review{ background:color-mix(in srgb,var(--ink-faint) 18%, transparent); color:var(--ink-soft); }
.pill.forthcoming{ background:color-mix(in srgb,var(--navy) 15%, transparent); color:var(--navy); }

.readout{ margin-top:14px; min-height:1.4em; }
.ro-meta{ font-size:.85rem; color:var(--ink-soft); font-style:italic; }
.hint{
  margin-top:10px; font-family:"JetBrains Mono",monospace; font-size:.62rem;
  letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint);
}

/* ---------- the wheel ---------- */
.wheel{ position:relative; height:74vh; --r:335px; }
.arc{
  position:absolute; right:-335px; top:50%; width:670px; height:670px; margin-top:-335px;
  border:1px dashed color-mix(in srgb,var(--gold) 40%, transparent); border-radius:50%; opacity:.5;
}
.pivot{ position:absolute; right:0; top:50%; width:0; height:0; }

.spoke{
  position:absolute; top:0; left:0; width:250px; height:104px; margin:-52px 0 0 -125px;
  background:none; border:none; padding:0; cursor:pointer;
  transition:transform .55s var(--ease), opacity .55s var(--ease);
}
.card{
  display:flex; width:100%; height:100%; overflow:hidden; text-align:left;
  background:var(--card); border:1px solid var(--border); border-radius:14px;
  box-shadow:var(--shadow-sm);
  transition:box-shadow .4s var(--ease), border-color .4s var(--ease);
}
.spoke.on .card{ border-color:var(--gold-bright); box-shadow:0 0 0 3px var(--gold-wash), var(--shadow-lg); }

.spine{ width:7px; flex:none; background:var(--gold); }
.spine.review{ background:var(--ink-faint); }
.spine.forthcoming{ background:var(--navy); }

.cbody{ display:flex; flex-direction:column; gap:4px; padding:12px 14px; min-width:0; justify-content:center; }
.ctype{ font-family:"JetBrains Mono",monospace; font-size:.55rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--gold); }
.ctitle{
  font-family:"Bricolage Grotesque",sans-serif; font-weight:700; font-size:.84rem; line-height:1.3;
  letter-spacing:-.01em; color:var(--ink);
  display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;
}
.cstatus{ font-family:"JetBrains Mono",monospace; font-size:.52rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); }
.cstatus.published{ color:var(--gold); }
.cstatus.forthcoming{ color:var(--navy); }

/* ---------- after the wheel ---------- */
.after{ padding-top:clamp(40px,6vw,72px); padding-bottom:clamp(20px,3vw,32px); }
.after .sec-head h2{ font-size:clamp(1.5rem,3vw,2.1rem); margin-top:0; }

.confs{ border-top:1px solid var(--border); }
.conf{
  display:grid; grid-template-columns:132px 1.4fr 1fr; gap:18px; align-items:baseline;
  padding:17px 12px; border-bottom:1px solid var(--border);
  transition:padding-left .35s var(--ease), background .35s;
}
.conf:hover{ padding-left:24px; background:var(--card); }
.role{
  font-family:"JetBrains Mono",monospace; font-size:.6rem; font-weight:700; letter-spacing:.09em;
  text-transform:uppercase; padding:3px 9px; border-radius:100px; justify-self:start;
  background:color-mix(in srgb,var(--ink-faint) 15%, transparent); color:var(--ink-soft);
}
.role.presented{ background:var(--gold-wash); color:var(--gold); }
.ct{ font-family:"Bricolage Grotesque",sans-serif; font-weight:700; font-size:.98rem; letter-spacing:-.02em; color:var(--ink); }
.ch{ font-size:.85rem; color:var(--ink-soft); }

.certs{ display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-top:24px; }
.cert{
  background:var(--card); border:1px solid var(--border); border-radius:16px; padding:18px 20px;
  display:flex; align-items:center; gap:16px;
  transition:transform .3s var(--ease), border-color .3s;
}
.cert:hover{ transform:translateY(-5px); border-color:var(--gold); }
.seal{ width:46px; height:46px; color:var(--gold); flex:none; }
.seal svg{ width:100%; height:100%; display:block; }
.cert .t{ display:block; font-weight:700; font-size:.96rem; color:var(--ink); }
.cert .d{ display:block; font-size:.8rem; color:var(--ink-faint); margin-top:2px; }

/* ---------- responsive ---------- */
@media (max-width:1000px){
  .stage{ grid-template-columns:1fr; gap:20px; }
  .wheel{ display:none; }              /* the table alone carries it */
  .sticky{ position:static; height:auto; padding:clamp(50px,8vw,90px) 0; }
  .track{ height:auto !important; }
  .hint{ display:none; }
}
@media (max-width:820px){
  .conf{ grid-template-columns:1fr; gap:6px; }
  .conf:hover{ padding-left:12px; }
  .record .ty{ display:none; }
}
@media (max-width:620px){
  .certs{ grid-template-columns:1fr; }
  .record .st{ width:auto; }
}
@media (prefers-reduced-motion: reduce){
  .spoke{ transition:none; }
  .record tbody tr{ transition:none; }
}
  `],
})
export class PublicationsComponent {
  pub = PUBLICATIONS;
  conf = CONFERENCES;

  views: WheelItem[] = [];
  focused = PUBLICATIONS.items[0];

  /** Set when a row/card is clicked, so scrolling does not immediately undo it. */
  private pinned: number | null = null;
  private pinnedUntil = 0;

  private step = PUBLICATIONS.items.length > 1 ? SPAN_DEG / (PUBLICATIONS.items.length - 1) : 0;

  constructor() { this.recompute(0); }

  onProgress(progress: number): void {
    if (this.pinned !== null && Date.now() < this.pinnedUntil) return;
    this.pinned = null;
    this.recompute(progress);
  }

  focus(index: number): void {
    this.pinned = index;
    this.pinnedUntil = Date.now() + 2500;
    const denom = this.pub.items.length - 1;
    this.recompute(denom > 0 ? index / denom : 0);
  }

  private recompute(progress: number): void {
    const current = progress * (this.pub.items.length - 1);

    this.views = this.pub.items.map((item, index) => {
      const angle = (index - current) * this.step;
      const dist = Math.abs(angle);
      const focused = dist < this.step / 2;
      return {
        item, index, angle, focused,
        opacity: Math.max(0.18, 1 - dist / 105),
        scale: focused ? 1.1 : Math.max(0.66, 1 - dist / 150),
      };
    });

    let best = this.views[0];
    for (const v of this.views) if (Math.abs(v.angle) < Math.abs(best.angle)) best = v;
    this.focused = best.item;
  }

  /** Ride the arc, then counter-rotate so the card itself stays upright. */
  spokeTransform(v: WheelItem): string {
    return `rotate(${v.angle}deg) translateX(calc(var(--r) * -1)) rotate(${-v.angle}deg) scale(${v.scale})`;
  }

  get publishedCount(): number { return this.pub.items.filter(i => i.status === 'published').length; }
  get pipelineCount(): number { return this.pub.items.filter(i => i.status !== 'published').length; }

  pad(n: number): string { return String(n).padStart(2, '0'); }

  statusLabel(s: string): string {
    return s === 'published' ? 'Published' : s === 'review' ? 'Under review' : 'Forthcoming';
  }
}
