import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';
import { PUBLICATIONS } from '../core/site-content';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [NgFor, RevealDirective],
  template: `
<section id="publications" class="band-cream">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Writing</span>
      <h2>{{ pub.heading }} <span class="serif">{{ pub.headingAccent }}</span></h2>
      <p>{{ pub.sub }}</p>
    </div>

    <div class="grid">
      <article class="paper" *ngFor="let it of pub.items; let i = index" [appReveal]="i" variant="tilt">
        <div class="cover" aria-hidden="true">
          <!-- generative cover: layered page + rule marks, tinted per index -->
          <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
            <rect width="300" height="200" [attr.fill]="tint(i)"/>
            <g opacity=".26" stroke="#FFFFFF" stroke-width="1">
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
          <span class="year">{{ it.year }}</span>
          <h3>{{ it.title }}</h3>
          <div class="venue">{{ it.venue }}</div>
          <p class="abs">{{ it.abstract }}</p>
        </div>
      </article>
    </div>

    <p class="note" [appReveal]="3">
      Placeholder entries — replace with the real papers, journals and volume details.
    </p>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
@media (max-width:900px){ .grid{ grid-template-columns:repeat(2,1fr) } }
@media (max-width:620px){ .grid{ grid-template-columns:1fr } }

.paper{
  background:var(--card); border:1px solid var(--border); border-radius:20px; overflow:hidden;
  display:flex; flex-direction:column;
  transition:transform .32s var(--ease), box-shadow .32s, border-color .32s;
}
.paper:hover{ transform:translateY(-7px); box-shadow:var(--shadow-lg); border-color:transparent; }

.cover{ position:relative; aspect-ratio:16/9.6; overflow:hidden; }
.cover svg{ width:100%; height:100%; display:block; transition:transform .6s var(--ease); }
.paper:hover .cover svg{ transform:scale(1.07); }
.type{
  position:absolute; left:14px; top:14px;
  font-family:"JetBrains Mono",monospace; font-size:.6rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; color:#0B1524;
  background:var(--gold-bright); padding:4px 10px; border-radius:100px;
}

.body{ padding:20px 22px 24px; display:flex; flex-direction:column; gap:7px; flex:1; }
.year{ font-family:"JetBrains Mono",monospace; font-size:.7rem; font-weight:600; color:var(--gold); letter-spacing:.06em; }
h3{ font-size:1.04rem; line-height:1.35; }
.venue{ font-size:.82rem; color:var(--ink-faint); font-style:italic; }
.abs{ font-size:.88rem; color:var(--ink-soft); line-height:1.55; margin-top:4px; }

.note{
  margin-top:22px; font-family:"JetBrains Mono",monospace; font-size:.7rem;
  letter-spacing:.05em; color:var(--ink-faint); text-align:center;
}
  `],
})
export class PublicationsComponent {
  pub = PUBLICATIONS;
  private tints = ['#1B3663', '#2A1E12', '#123A46'];
  tint(i: number): string { return this.tints[i % this.tints.length]; }
}
