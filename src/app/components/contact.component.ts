import { Component, effect, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../shared/reveal.directive';
import { CONTACT, CONTACT_SUBJECTS, PROFILE } from '../core/site-content';
import { EnquiryService } from '../core/enquiry.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, RevealDirective],
  template: `
<section id="contact">
  <div class="wrap">
    <div class="band" [appReveal]="0" variant="scale">
      <div class="head">
        <span class="label">Contact</span>
        <h2>{{ c.heading }}</h2>
        <p class="sub">{{ c.sub }}</p>

        <div class="cards">
          <a class="cc" [href]="'mailto:' + profile.email">
            <span class="k">Email</span><span class="v">{{ profile.email }}</span>
          </a>
          <a class="cc" [href]="profile.phoneHref">
            <span class="k">Phone</span><span class="v">{{ profile.phone }}</span>
          </a>
          <a class="cc" [href]="profile.linkedin" target="_blank" rel="noopener">
            <span class="k">LinkedIn</span><span class="v">{{ profile.linkedinLabel }}</span>
          </a>
          <div class="cc">
            <span class="k">Based in</span><span class="v">{{ profile.location }}</span>
          </div>
        </div>
      </div>

      <form id="contact-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="f-head">
          <span class="dot" aria-hidden="true"></span>
          <span>Send a brief</span>
        </div>

        <div class="row2">
          <label>
            <span>Name</span>
            <input type="text" formControlName="name" placeholder="Your name" autocomplete="name">
            <em *ngIf="invalid('name')">Please enter your name.</em>
          </label>
          <label>
            <span>Email</span>
            <input type="email" formControlName="email" placeholder="you@firm.com" autocomplete="email">
            <em *ngIf="invalid('email')">Please enter a valid email.</em>
          </label>
        </div>

        <label>
          <span>Subject</span>
          <select formControlName="subject">
            <optgroup *ngFor="let g of c.groups" [label]="g.label">
              <option *ngFor="let s of g.options" [value]="s">{{ s }}</option>
            </optgroup>
          </select>
        </label>

        <label>
          <span>Details</span>
          <textarea rows="4" formControlName="message" placeholder="What is the matter, and by when do you need it?"></textarea>
          <em *ngIf="invalid('message')">A line or two about the work, please.</em>
        </label>

        <button class="btn gold" type="submit">
          Send this brief <span class="arw">→</span>
        </button>

        <p class="hint" *ngIf="!sent()">
          Opens your mail app with the message ready to send.
        </p>

        <div class="result" *ngIf="sent()">
          <p class="ok">Your mail app should have opened.</p>
          <p class="hint">Nothing happened? Copy the message and send it yourself.</p>
          <div class="result-actions">
            <button class="mini" type="button" (click)="copy()">
              {{ copied() ? 'Copied' : 'Copy message' }}
            </button>
            <a class="mini" [href]="mailHref()">Open mail again</a>
            <a class="mini" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
          </div>
          <pre class="preview">{{ preview() }}</pre>
        </div>
      </form>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.band{
  background:var(--navy-deep); border-radius:30px; padding:clamp(30px,4.6vw,56px);
  position:relative; overflow:hidden;
  --card:#152137; --border:#26344C; --ink:#F3F6FA; --ink-soft:#A9B6C9; --ink-faint:#7B8798;
  --gold:#DDB051; --gold-bright:#EBC163;
  color:var(--ink);
  display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,4vw,52px); align-items:start;
}
.band::before{
  content:""; position:absolute; top:-120px; left:-70px; width:360px; height:360px; border-radius:50%;
  background:radial-gradient(circle,#EBC163 0%,transparent 68%); opacity:.14;
  animation:float 12s ease-in-out infinite;
}
@keyframes float{ 0%,100%{ transform:translate(0,0) } 50%{ transform:translate(30px,26px) } }
@media (max-width:880px){ .band{ grid-template-columns:1fr } }

.head{ position:relative; }
h2{ color:var(--ink); font-size:clamp(1.8rem,4vw,2.7rem); }
.sub{ color:var(--ink-soft); margin-top:15px; max-width:420px; }

.cards{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:28px; }
@media (max-width:460px){ .cards{ grid-template-columns:1fr } }
.cc{
  background:var(--card); border:1px solid var(--border); border-radius:14px; padding:15px;
  text-decoration:none; color:inherit; display:flex; flex-direction:column; gap:6px;
  transition:transform .22s, border-color .22s;
}
a.cc:hover{ transform:translateY(-4px); border-color:var(--gold); }
.cc .k{ font-family:"JetBrains Mono",monospace; font-size:.62rem; color:var(--ink-faint); text-transform:uppercase; letter-spacing:.1em; }
.cc .v{ font-weight:700; font-size:.88rem; word-break:break-word; }

form{
  background:var(--card); border:1px solid var(--border); border-radius:22px;
  padding:26px; display:flex; flex-direction:column; gap:15px; position:relative;
  transition:box-shadow .5s, border-color .5s;
}
form.flash{ border-color:var(--gold-bright); box-shadow:0 0 0 4px rgba(235,193,99,.16); }

.f-head{
  display:flex; align-items:center; gap:9px;
  font-family:"JetBrains Mono",monospace; font-size:.68rem; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--gold);
}
.f-head .dot{ width:7px; height:7px; border-radius:50%; background:var(--gold-bright); animation:blip 1.9s ease-in-out infinite; }
@keyframes blip{ 0%,100%{ opacity:1 } 50%{ opacity:.3 } }

.row2{ display:grid; grid-template-columns:1fr 1fr; gap:13px; }
@media (max-width:520px){ .row2{ grid-template-columns:1fr } }

label{ display:flex; flex-direction:column; gap:7px; }
label > span{ font-size:.76rem; font-weight:700; color:var(--ink-soft); letter-spacing:.02em; }
/* Fields are light-on-white inside the dark band: the native <select> popup is
   drawn by the OS and does not reliably inherit a dark background, which made
   the options invisible. A light field guarantees readable options everywhere. */
input,select,textarea{
  font:inherit; font-size:.92rem; color:#0B1524;
  background:#FFFFFF; border:1px solid var(--border); border-radius:11px;
  padding:12px 14px; outline:none; width:100%;
  transition:border-color .22s, box-shadow .22s;
}
textarea{ resize:vertical; min-height:96px; }
input::placeholder,textarea::placeholder{ color:#7A8496; }
input:focus,select:focus,textarea:focus{ border-color:var(--gold-bright); box-shadow:0 0 0 3px rgba(235,193,99,.24); }
select{ appearance:none; cursor:pointer;
  background-image:linear-gradient(45deg,transparent 50%,#0B1524 50%),linear-gradient(135deg,#0B1524 50%,transparent 50%);
  background-position:calc(100% - 19px) 55%, calc(100% - 14px) 55%;
  background-size:5px 5px, 5px 5px; background-repeat:no-repeat; padding-right:38px; }
select option{ color:#0B1524; background:#FFFFFF; }
select optgroup{ color:#5A6478; font-style:normal; font-weight:700; }
em{ font-style:normal; font-size:.75rem; color:#F0A0A0; }

.hint,.ok{ font-size:.78rem; color:var(--ink-faint); }
.ok{ color:var(--gold-bright); font-weight:700; }
.ok a{ color:inherit; }

.result{ display:flex; flex-direction:column; gap:9px; animation:unfold .45s var(--ease) both; }
@keyframes unfold{ from{ opacity:0; transform:translateY(-8px) } to{ opacity:1; transform:none } }
.result-actions{ display:flex; gap:9px; flex-wrap:wrap; }
.mini{
  font:inherit; font-size:.74rem; font-weight:700; cursor:pointer; text-decoration:none;
  background:transparent; color:var(--gold-bright); border:1px solid var(--border);
  border-radius:100px; padding:7px 14px; transition:border-color .2s, background .2s;
}
.mini:hover{ border-color:var(--gold-bright); background:rgba(235,193,99,.08); }
.preview{
  margin:0; font-family:"JetBrains Mono",monospace; font-size:.7rem; line-height:1.6;
  color:var(--ink-soft); background:var(--navy-deep); border:1px solid var(--border);
  border-radius:12px; padding:14px; white-space:pre-wrap; word-break:break-word;
  max-height:190px; overflow:auto;
}

@media (prefers-reduced-motion: reduce){ .band::before,.f-head .dot{ animation:none } }
  `],
})
export class ContactComponent {
  c = CONTACT;
  profile = PROFILE;
  subjects = CONTACT_SUBJECTS;
  sent = signal(false);
  copied = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [CONTACT_SUBJECTS[0]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder, private enquiry: EnquiryService) {
    // Every "Enquire" button carries a subject that exists verbatim in the
    // dropdown, so this is an exact selection rather than a fuzzy match.
    effect(() => {
      const req = this.enquiry.request();
      if (!req) return;
      const match = this.subjects.includes(req.subject)
        ? req.subject
        : this.subjects[this.subjects.length - 1];
      this.form.patchValue({ subject: match });
    });
  }

  invalid(k: string): boolean {
    const c = this.form.get(k);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  /** The composed message, shown so it can be copied if mail does not open. */
  preview(): string {
    const { name, email, subject, message } = this.form.value;
    return `To: ${PROFILE.email}\nSubject: ${subject}\n\n${message}\n\n—\n${name}\n${email}`;
  }

  mailHref(): string {
    const { name, email, subject, message } = this.form.value;
    const body = `${message}\n\n—\n${name}\n${email}`;
    return (
      `mailto:${PROFILE.email}` +
      `?subject=${encodeURIComponent(subject ?? 'Enquiry')}` +
      `&body=${encodeURIComponent(body)}`
    );
  }

  async copy(): Promise<void> {
    const text = this.preview();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API needs a secure context; fall back to a temporary textarea.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* nothing more to try */ }
      ta.remove();
    }
    this.copied.set(true);
    window.setTimeout(() => this.copied.set(false), 2000);
  }

  /**
   * No backend yet — hand the composed brief to the visitor's mail client, then
   * always show the composed text so the click has a visible result even when
   * no mail handler is registered (the previous version appeared to do nothing).
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // An anchor click is more reliable than assigning location.href, which some
    // browsers ignore for mailto: when no handler is registered.
    const a = document.createElement('a');
    a.href = this.mailHref();
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.sent.set(true);
  }
}
