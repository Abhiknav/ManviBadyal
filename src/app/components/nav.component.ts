import { Component, HostListener, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NAV_LINKS, PROFILE } from '../core/site-content';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
<header class="site">
  <div class="inner">
    <a href="#top" class="brand">Manvi<span class="dot">.</span></a>

    <nav class="links">
      <a *ngFor="let l of links" [href]="'#' + l.id">{{ l.label }}</a>
    </nav>

    <a class="cta" href="#contact">Get in touch</a>

    <button class="menu" (click)="toggle()" [attr.aria-expanded]="open()" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  <nav class="mobile" *ngIf="open()">
    <a *ngFor="let l of links" [href]="'#' + l.id" (click)="close()">{{ l.label }}</a>
    <a href="#contact" (click)="close()">Get in touch</a>
  </nav>
</header>
  `,
  styles: [`
:host{ display:block; position:relative; z-index:40; }
.site{ padding:20px 0; }
.inner{
  max-width:1140px; margin:0 auto; padding:0 clamp(20px,5vw,56px);
  display:flex; align-items:center; justify-content:space-between; gap:16px;
}
.brand{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:1.12rem; text-decoration:none; letter-spacing:-.03em; }
.brand .dot{ color:var(--gold-bright); }

.links{ display:flex; gap:24px; }
.links a{ font-size:.86rem; font-weight:600; text-decoration:none; color:var(--ink-soft); position:relative; transition:color .2s; }
.links a::after{
  content:""; position:absolute; left:0; right:0; bottom:-5px; height:1.5px;
  background:var(--gold-bright); transform:scaleX(0); transform-origin:left;
  transition:transform .3s var(--ease);
}
.links a:hover{ color:var(--ink); }
.links a:hover::after{ transform:scaleX(1); }

.cta{
  font-size:.8rem; font-weight:700; text-decoration:none; color:#fff;
  background:var(--navy-deep); padding:10px 20px; border-radius:100px;
  transition:transform .2s, box-shadow .2s; white-space:nowrap;
}
.cta:hover{ transform:translateY(-2px); box-shadow:var(--shadow-sm); }

.menu{ display:none; background:none; border:1px solid var(--border); color:var(--ink); width:40px; height:38px; border-radius:10px; cursor:pointer; }
.menu span{ display:block; width:16px; height:1.5px; background:var(--ink); margin:3.5px auto; }

.mobile{ display:flex; flex-direction:column; padding:6px clamp(20px,5vw,56px) 18px; }
.mobile a{ text-decoration:none; color:var(--ink-soft); font-size:.95rem; font-weight:600; padding:13px 0; border-bottom:1px solid var(--line); }

@media (max-width:900px){
  .links, .cta{ display:none; }
  .menu{ display:block; }
}
  `],
})
export class NavComponent {
  links = NAV_LINKS;
  profile = PROFILE;
  open = signal(false);

  toggle(): void { this.open.update((v) => !v); }
  close(): void { this.open.set(false); }

  /** The mobile sheet must never linger once the desktop nav takes over. */
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900) this.open.set(false);
  }
}
