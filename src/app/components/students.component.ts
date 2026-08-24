import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../shared/reveal.directive';
import { STUDENTS } from '../core/site-content';
import { FeedbackService } from '../core/feedback.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, RevealDirective],
  template: `
<section id="students">
  <div class="wrap">
    <div class="sec-head" [appReveal]="0" variant="clip">
      <span class="label">Students</span>
      <h2>{{ s.heading }}</h2>
      <p>{{ s.sub }}</p>
    </div>
  </div>

  <div class="row">
    <div class="track">
      <figure class="q" *ngFor="let q of doubled(); let i = index"
              [attr.aria-hidden]="i >= quotes().length ? 'true' : null">
        <div class="stars" aria-hidden="true">★★★★★</div>
        <blockquote>{{ q.q }}</blockquote>
        <figcaption>
          {{ q.who }}
          <span class="pending" *ngIf="q.pending">Awaiting review</span>
        </figcaption>
      </figure>
    </div>
  </div>

  <div class="wrap">
    <div class="add" [appReveal]="0" variant="tilt">
      <div class="add-head">
        <div>
          <h3>{{ s.formTitle }}</h3>
          <p>{{ s.formSub }}</p>
        </div>
        <button class="btn ghost" type="button" (click)="toggle()" [attr.aria-expanded]="open()">
          {{ open() ? 'Close' : 'Write a review' }} <span class="arw">→</span>
        </button>
      </div>

      <form *ngIf="open()" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="two">
          <label>
            <span>Name <i>(optional)</i></span>
            <input type="text" formControlName="name" placeholder="Shown with your review">
          </label>
          <label>
            <span>Course / year</span>
            <input type="text" formControlName="course" placeholder="LL.B. · Third year">
          </label>
        </div>
        <label>
          <span>Your review</span>
          <textarea rows="3" formControlName="message" placeholder="What was the class actually like?"></textarea>
          <em *ngIf="invalid('message')">Please write at least a sentence.</em>
        </label>

        <div class="actions">
          <button class="btn gold" type="submit">Post review <span class="arw">→</span></button>
          <span class="note" *ngIf="!fb.hasBackend">
            Saved to this browser and marked for review — not yet delivered.
            Connect a backend to receive these.
          </span>
        </div>

        <p class="done" *ngIf="done()">
          Thanks — your review is showing above, marked <strong>awaiting review</strong>.
        </p>
      </form>
    </div>
  </div>
</section>
  `,
  styles: [`
:host{ display:block; }
.row{ overflow:hidden; white-space:nowrap; position:relative; margin-top:8px; }
.row::before,.row::after{ content:""; position:absolute; top:0; bottom:0; width:90px; z-index:2; pointer-events:none; }
.row::before{ left:0; background:linear-gradient(90deg,var(--paper),transparent); }
.row::after{ right:0; background:linear-gradient(270deg,var(--paper),transparent); }

.track{ display:inline-flex; gap:16px; animation:slide 48s linear infinite; }
.track:hover{ animation-play-state:paused; }
@keyframes slide{ from{ transform:translateX(0) } to{ transform:translateX(-50%) } }
@media (prefers-reduced-motion: reduce){ .track{ animation:none } }

.q{
  white-space:normal; width:330px; flex:none; margin:0;
  background:var(--card); border:1px solid var(--border); border-radius:20px; padding:24px;
  display:flex; flex-direction:column; gap:13px;
  transition:transform .3s var(--ease), border-color .3s, box-shadow .3s;
}
.q:hover{ transform:translateY(-6px) scale(1.015); border-color:var(--gold); box-shadow:var(--shadow-lg); }
.stars{ color:var(--gold-bright); font-size:.85rem; letter-spacing:2px; }
blockquote{ margin:0; font-size:.95rem; color:var(--ink); line-height:1.6; }
figcaption{
  font-family:"JetBrains Mono",monospace; font-size:.67rem; letter-spacing:.06em;
  text-transform:uppercase; color:var(--ink-faint); margin-top:auto;
  display:flex; align-items:center; gap:8px; flex-wrap:wrap;
}
.pending{
  background:var(--gold-wash); color:var(--gold); padding:3px 8px; border-radius:100px;
  font-size:.58rem; font-weight:700; letter-spacing:.08em;
}

.add{
  margin-top:34px; background:var(--card); border:1px solid var(--border);
  border-radius:22px; padding:26px;
}
.add-head{ display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; }
.add-head h3{ font-size:1.15rem; }
.add-head p{ color:var(--ink-soft); font-size:.9rem; margin-top:4px; }

form{ margin-top:22px; padding-top:22px; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:14px;
      animation:unfold .5s var(--ease) both; }
@keyframes unfold{ from{ opacity:0; transform:translateY(-10px) } to{ opacity:1; transform:none } }
.two{ display:grid; grid-template-columns:1fr 1fr; gap:13px; }
@media (max-width:560px){ .two{ grid-template-columns:1fr } }

label{ display:flex; flex-direction:column; gap:7px; }
label > span{ font-size:.76rem; font-weight:700; color:var(--ink-soft); }
label i{ font-style:normal; color:var(--ink-faint); font-weight:500; }
input,textarea{
  font:inherit; font-size:.92rem; color:var(--ink);
  background:var(--paper); border:1px solid var(--border); border-radius:11px;
  padding:12px 14px; outline:none; width:100%;
  transition:border-color .22s, box-shadow .22s;
}
textarea{ resize:vertical; }
input:focus,textarea:focus{ border-color:var(--gold-bright); box-shadow:0 0 0 3px rgba(195,148,41,.16); }
em{ font-style:normal; font-size:.75rem; color:#C0392B; }

.actions{ display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
.note{ font-size:.75rem; color:var(--ink-faint); max-width:380px; line-height:1.45; }
.done{ font-size:.85rem; color:var(--gold); }
  `],
})
export class StudentsComponent {
  s = STUDENTS;
  open = signal(false);
  done = signal(false);

  form = this.builder.group({
    name: [''],
    course: [''],
    message: ['', [Validators.required, Validators.minLength(12)]],
  });

  constructor(private builder: FormBuilder, public fb: FeedbackService) {}

  quotes() { return this.fb.all(); }

  /** Duplicated so the -50% marquee translate loops seamlessly. */
  doubled() { const q = this.fb.all(); return [...q, ...q]; }

  toggle(): void { this.open.update((v) => !v); this.done.set(false); }

  invalid(k: string): boolean {
    const c = this.form.get(k);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { name, course, message } = this.form.value;
    const who = [name, course].filter(Boolean).join(' · ') || 'Student';
    await this.fb.submit({ q: message ?? '', who });
    this.form.reset();
    this.done.set(true);
  }
}
