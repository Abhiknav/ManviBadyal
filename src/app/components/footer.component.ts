import { Component } from '@angular/core';
import { PROFILE } from '../core/site-content';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
<footer>
  <div class="wrap inner">
    <div class="left">
      <span class="brand">{{ profile.name }}<span class="dot">.</span></span>
      <span class="roles">
        <strong>{{ profile.title }}</strong>
        <em>·</em>
        <span>{{ profile.secondTitle }}</span>
        <em>·</em>
        <span>{{ profile.formerRole }}</span>
      </span>
    </div>
    <span class="fine">ENROLMENT {{ profile.enrolment }}</span>
  </div>
</footer>
  `,
  styles: [`
:host{ display:block; }
footer{ padding:34px 0 46px; }
.inner{
  display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:16px;
  border-top:1px solid var(--line); padding-top:26px;
}
.left{ display:flex; flex-direction:column; gap:8px; }
.brand{ font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:1.05rem; }
.brand .dot{ color:var(--gold-bright); }
.roles{
  display:flex; flex-wrap:wrap; align-items:center; gap:8px;
  font-size:.82rem; color:var(--ink-soft);
}
.roles strong{ color:var(--ink); font-weight:700; }
.roles em{ font-style:normal; color:var(--gold-bright); }
.fine{ font-family:"JetBrains Mono",monospace; font-size:.68rem; color:var(--ink-faint); letter-spacing:.06em; }
  `],
})
export class FooterComponent {
  profile = PROFILE;
}
