import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CountUpDirective } from '../shared/count-up.directive';
import { HERO, PROFILE } from '../core/site-content';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgFor, NgIf, CountUpDirective],
  template: `
<section class="hero" id="top">
  <div class="aurora" aria-hidden="true">
    <span class="b b1"></span><span class="b b2"></span><span class="b b3"></span>
  </div>
  <div class="grain" aria-hidden="true"></div>

  <div class="wrap grid">
    <div class="copy">
      <span class="pill"><i></i>{{ hero.pill }}</span>

      <h1>
        <span class="ln"><span>{{ hero.headlineA }}</span></span>
        <span class="ln"><span class="serif">{{ hero.headlineAccent }}</span></span>
      </h1>

      <p class="sub">{{ hero.sub }}</p>

      <div class="cta-row">
        <a class="btn primary" href="#contact">Send a brief <span class="arw">→</span></a>
        <a class="btn ghost" href="#teaching">Courses taught</a>
      </div>

      <div class="creds">
        <span>{{ profile.title }}</span>
        <em>·</em>
        <span>{{ profile.secondTitle }}</span>
      </div>
    </div>

    <div class="photo-zone">
      <div class="frame" aria-hidden="true"></div>
      <div class="card">
        <img [src]="profile.photo" alt="Manvi Badyal" width="800" height="1200">
        <div class="cap">
          <div class="nm">{{ profile.name }}</div>
          <div class="rl">{{ profile.title }}</div>
          <div class="org">{{ profile.captionOrg }}</div>
        </div>
      </div>

      <div class="chip c1">
        <span class="v" *ngIf="hero.chips[0].suffix" [appCountUp]="hero.chips[0].v" [suffix]="hero.chips[0].suffix!">0</span>
        <span class="k">{{ hero.chips[0].k }}</span>
      </div>
      <div class="chip c2">
        <span class="v">{{ hero.chips[1].v }}</span>
        <span class="k">{{ hero.chips[1].k }}</span>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.hero{ position:relative; padding:clamp(16px,4vw,40px) 0 clamp(54px,7vw,92px); overflow:hidden; background:var(--paper-tint); }

/* drifting warm wash so the hero never reads as flat white */
.aurora{ position:absolute; inset:-20%; z-index:0; filter:blur(70px); opacity:.85; }
.b{ position:absolute; border-radius:50%; display:block; }
.b1{ width:46vw; height:46vw; background:radial-gradient(circle,var(--gold-soft) 0%,transparent 68%); top:2%; right:2%; animation:drift1 19s ease-in-out infinite; }
.b2{ width:38vw; height:38vw; background:radial-gradient(circle,#CBD9EC 0%,transparent 70%); bottom:0%; left:-4%; animation:drift2 23s ease-in-out infinite; }
.b3{ width:26vw; height:26vw; background:radial-gradient(circle,#F0DFC0 0%,transparent 70%); top:38%; left:38%; animation:drift3 27s ease-in-out infinite; }
@keyframes drift1{ 0%,100%{ transform:translate(0,0) scale(1) } 50%{ transform:translate(-4%,5%) scale(1.09) } }
@keyframes drift2{ 0%,100%{ transform:translate(0,0) scale(1) } 50%{ transform:translate(6%,-5%) scale(1.12) } }
@keyframes drift3{ 0%,100%{ transform:translate(0,0) scale(1) } 50%{ transform:translate(-7%,-4%) scale(.92) } }

.grain{
  position:absolute; inset:0; z-index:0; opacity:.5; pointer-events:none;
  background-image:radial-gradient(circle at 1px 1px, rgba(11,20,32,.055) 1px, transparent 0);
  background-size:22px 22px;
  mask-image:linear-gradient(to bottom, #000 0%, transparent 78%);
}

.grid{ position:relative; z-index:1; display:grid; grid-template-columns:1.08fr .92fr; gap:clamp(30px,5vw,64px); align-items:center; }
@media (max-width:900px){ .grid{ grid-template-columns:1fr; gap:44px; } }

.pill{
  display:inline-flex; align-items:center; gap:9px; background:rgba(255,255,255,.72);
  backdrop-filter:blur(6px); border:1px solid var(--border); padding:8px 16px 8px 12px;
  border-radius:100px; font-size:.78rem; font-weight:600; color:var(--ink-soft); box-shadow:var(--shadow-sm);
  animation:fadeUp .8s var(--ease) .3s both;
}
.pill i{ width:7px; height:7px; border-radius:50%; background:#2E9E52; position:relative; flex:none; }
.pill i::after{ content:""; position:absolute; inset:-4px; border-radius:50%; background:#2E9E52; opacity:.3; animation:ping 2.2s ease-out infinite; }
@keyframes ping{ 0%{ transform:scale(.5); opacity:.5 } 100%{ transform:scale(2.4); opacity:0 } }

h1{ font-size:clamp(2.35rem,5.4vw,3.95rem); line-height:1.05; margin-top:22px; }
h1 .serif{ font-size:1.05em; }
.ln{ display:block; overflow:hidden; }
.ln > span{ display:inline-block; transform:translateY(105%); animation:rise .9s var(--ease) forwards; }
.ln:nth-child(1) > span{ animation-delay:.06s }
.ln:nth-child(2) > span{ animation-delay:.2s }
@keyframes rise{ to{ transform:none } }

.sub{ margin-top:22px; color:var(--ink-soft); font-size:1.04rem; max-width:500px; animation:fadeUp .8s var(--ease) .44s both; }
.cta-row{ display:flex; gap:12px; flex-wrap:wrap; margin-top:30px; animation:fadeUp .8s var(--ease) .54s both; }
@keyframes fadeUp{ from{ opacity:0; transform:translateY(16px) } to{ opacity:1; transform:none } }

.creds{
  margin-top:26px; display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  font-family:"JetBrains Mono",monospace; font-size:.7rem; letter-spacing:.08em;
  text-transform:uppercase; color:var(--ink-faint);
  animation:fadeUp .8s var(--ease) .64s both;
}
.creds em{ color:var(--gold-bright); font-style:normal; }

.photo-zone{ position:relative; max-width:400px; margin:0 auto; animation:fadeUp .9s var(--ease) .22s both; }
.frame{ position:absolute; inset:16px -16px -16px 16px; border:1.5px solid var(--gold-bright); border-radius:26px; opacity:.55; }
.card{ position:relative; border-radius:26px; overflow:hidden; aspect-ratio:1/1.06; box-shadow:var(--shadow-lg); background:var(--cream); }
.card img{ width:100%; height:100%; object-fit:cover; object-position:center 18%; display:block; }
.card::after{ content:""; position:absolute; inset:0; background:linear-gradient(to top, rgba(11,21,36,.46), transparent 46%); }
.cap{ position:absolute; left:20px; right:20px; bottom:18px; z-index:2; color:#fff; }
.cap .nm{ font-family:"Bricolage Grotesque",sans-serif; font-weight:700; font-size:1.12rem; letter-spacing:-.02em; }
.cap .rl{ font-family:"JetBrains Mono",monospace; font-size:.63rem; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.85); margin-top:4px; }
.cap .org{ font-family:"JetBrains Mono",monospace; font-size:.63rem; letter-spacing:.1em; text-transform:uppercase; color:var(--gold-bright); margin-top:2px; }

.chip{
  position:absolute; z-index:3; background:var(--card); border:1px solid var(--border);
  box-shadow:var(--shadow-lg); border-radius:15px; padding:11px 15px;
  display:flex; align-items:center; gap:11px;
}
.chip .v{ font-family:"JetBrains Mono",monospace; font-weight:700; font-size:1.1rem; color:var(--gold); }
.chip .k{ font-size:.65rem; color:var(--ink-faint); font-weight:700; text-transform:uppercase; letter-spacing:.06em; line-height:1.25; max-width:82px; }
.chip.c1{ top:26px; left:-30px; animation:bob 5s ease-in-out infinite }
.chip.c2{ bottom:34px; right:-28px; animation:bob 5s ease-in-out .9s infinite }
@keyframes bob{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-9px) } }
@media (max-width:520px){ .chip.c1{ left:-10px } .chip.c2{ right:-8px } .frame{ inset:12px -10px -12px 12px } }

@media (prefers-reduced-motion: reduce){
  .b,.chip,.pill i::after{ animation:none !important; }
  .ln > span{ transform:none; animation:none; }
  .pill,.sub,.cta-row,.creds,.photo-zone{ animation:none; opacity:1; }
}
  `],
})
export class HeroComponent {
  hero = HERO;
  profile = PROFILE;
}
