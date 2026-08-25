import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { CountUpDirective } from '../shared/count-up.directive';
import { IconComponent } from './icon.component';
import { CONFERENCES, PUBLICATIONS } from '../core/site-content';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [NgFor, RevealDirective, CountUpDirective, IconComponent],
  template: `
<section id="publications" class="band-cream">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Writing</span>
      <h2>{{ pub.heading }} <span class="serif">{{ pub.headingAccent }}</span></h2>
      <p>{{ pub.sub }}</p>
    </div>

    <div class="tally" [appReveal]="1" variant="down">
      <div class="t">
        <span class="v" [appCountUp]="publishedCount">0</span>
        <span class="k">Published</span>
      </div>
      <div class="t">
        <span class="v" [appCountUp]="conf.papers.length">0</span>
        <span class="k">Conferences &amp; seminars</span>
      </div>
      <div class="t">
        <span class="v" [appCountUp]="pipelineCount">0</span>
        <span class="k">In press / under review</span>
      </div>
    </div>

    <div class="grid">
      <article class="paper" *ngFor="let it of pub.items; let i = index" [appReveal]="i" variant="tilt">
        <div class="cover" aria-hidden="true">
          <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
            <rect width="300" height="200" [attr.fill]="tint(i)"/>
            <g opacity=".22" stroke="#FFFFFF" stroke-width="1">
              <path d="M0 40h300M0 80h300M0 120h300M0 160h300"/>
            </g>
            <rect x="86" y="30" width="128" height="150" rx="6" fill="#FFFFFF" opacity=".1"
                  [attr.transform]="'rotate(' + (i % 2 === 0 ? -6 : 6) + ' 150 105)'"/>
            <rect x="98" y="24" width="128" height="150" rx="6" fill="none" stroke="#FFFFFF" stroke-width="1.6" opacity=".72"/>
            <g stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity=".8">
              <path d="M116 58h92M116 76h92M116 94h58"/>
            </g>
            <circle [attr.cx]="i % 2 === 0 ? 252 : 60" cy="150" r="34" fill="#FFFFFF" opacity=".07"/>
          </svg>
          <span class="type">{{ it.type }}</span>
        </div>

        <div class="body">
          <span class="status" [class]="'status ' + it.status">{{ statusLabel(it.status) }}</span>
          <h3>{{ it.title }}</h3>
          <div class="meta">{{ it.meta }}</div>
        </div>
      </article>
    </div>

    <!-- conferences + certifications -->
    <div class="sec-head sub-head" [appReveal]="0" variant="clip">
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
      <div class="cert" *ngFor="let c of conf.certifications; let i = index" [appReveal]="i" variant="scale">
        <span class="ic"><app-icon [name]="c.icon" [size]="21"></app-icon></span>
        <span><span class="t">{{ c.t }}</span><span class="d">{{ c.d }}</span></span>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }

.tally{
  display:flex; flex-wrap:wrap; margin-bottom:28px;
  background:var(--card); border:1px solid var(--border); border-radius:18px; overflow:hidden;
}
.tally .t{ flex:1 1 170px; padding:20px 24px; display:flex; flex-direction:column; gap:5px; border-right:1px solid var(--line); }
.tally .t:last-child{ border-right:none; }
.tally .v{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:2rem; letter-spacing:-.04em; color:var(--gold); line-height:1; }
.tally .k{ font-size:.8rem; color:var(--ink-faint); font-weight:600; }
@media (max-width:600px){ .tally .t{ border-right:none; border-bottom:1px solid var(--line) } }

.grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
@media (max-width:900px){ .grid{ grid-template-columns:repeat(2,1fr) } }
@media (max-width:620px){ .grid{ grid-template-columns:1fr } }

.paper{
  background:var(--card); border:1px solid var(--border); border-radius:20px; overflow:hidden;
  display:flex; flex-direction:column;
  transition:transform .32s var(--ease), box-shadow .32s, border-color .32s;
}
.paper:hover{ transform:translateY(-7px); box-shadow:var(--shadow-lg); border-color:transparent; }

.cover{ position:relative; aspect-ratio:16/9.2; overflow:hidden; }
.cover svg{ width:100%; height:100%; display:block; transition:transform .6s var(--ease); }
.paper:hover .cover svg{ transform:scale(1.07); }
.type{
  position:absolute; left:14px; top:14px;
  font-family:"JetBrains Mono",monospace; font-size:.58rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; color:#0B1524;
  background:var(--gold-bright); padding:4px 10px; border-radius:100px;
}

.body{ padding:18px 20px 22px; display:flex; flex-direction:column; gap:8px; flex:1; }
h3{ font-size:1rem; line-height:1.38; }
.meta{ font-size:.82rem; color:var(--ink-faint); margin-top:auto; }
.status{
  align-self:flex-start; font-family:"JetBrains Mono",monospace; font-size:.57rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; padding:3px 9px; border-radius:100px;
}
.status.published{ background:var(--gold-wash); color:var(--gold); }
.status.review{ background:color-mix(in srgb,var(--ink-faint) 16%, transparent); color:var(--ink-soft); }
.status.forthcoming{ background:color-mix(in srgb,var(--navy) 14%, transparent); color:var(--navy); }

.sub-head{ margin-top:clamp(46px,6vw,72px); }
.sub-head h2{ font-size:clamp(1.5rem,3vw,2.1rem); margin-top:0; }

.confs{ border-top:1px solid var(--border); }
.conf{
  display:grid; grid-template-columns:130px 1.4fr 1fr; gap:18px; align-items:baseline;
  padding:17px 12px; border-bottom:1px solid var(--border); position:relative;
  transition:padding-left .35s var(--ease), background .35s;
}
.conf:hover{ padding-left:22px; background:var(--card); }
.role{
  font-family:"JetBrains Mono",monospace; font-size:.6rem; font-weight:700; letter-spacing:.09em;
  text-transform:uppercase; padding:3px 9px; border-radius:100px; justify-self:start;
  background:color-mix(in srgb,var(--ink-faint) 15%, transparent); color:var(--ink-soft);
}
.role.presented{ background:var(--gold-wash); color:var(--gold); }
.ct{ font-family:"Bricolage Grotesque",sans-serif; font-weight:700; font-size:.98rem; letter-spacing:-.02em; color:var(--ink); }
.ch{ font-size:.85rem; color:var(--ink-soft); }
@media (max-width:820px){
  .conf{ grid-template-columns:1fr; gap:6px; }
  .conf:hover{ padding-left:12px; }
}

.certs{ display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-top:22px; }
@media (max-width:620px){ .certs{ grid-template-columns:1fr } }
.cert{
  background:var(--card); border:1px solid var(--border); border-radius:16px; padding:18px;
  display:flex; align-items:center; gap:14px;
  transition:transform .3s var(--ease), border-color .3s;
}
.cert:hover{ transform:translateY(-4px); border-color:var(--gold); }
.cert .ic{
  width:42px; height:42px; border-radius:12px; background:var(--gold-wash); color:var(--gold);
  display:flex; align-items:center; justify-content:center; flex:none;
}
.cert .t{ display:block; font-weight:700; font-size:.95rem; color:var(--ink); }
.cert .d{ display:block; font-size:.8rem; color:var(--ink-faint); margin-top:2px; }
  `],
})
export class PublicationsComponent {
  pub = PUBLICATIONS;
  conf = CONFERENCES;

  private tints = ['#1B3663', '#2A1E12', '#123A46', '#16304F', '#2B2438', '#123527'];
  tint(i: number): string { return this.tints[i % this.tints.length]; }

  get publishedCount(): number {
    return this.pub.items.filter((i) => i.status === 'published').length;
  }
  get pipelineCount(): number {
    return this.pub.items.filter((i) => i.status !== 'published').length;
  }

  statusLabel(s: string): string {
    return s === 'published' ? 'Published' : s === 'review' ? 'Under review' : 'Forthcoming';
  }
}
