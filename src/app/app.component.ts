import { Component } from '@angular/core';
import { IconSpriteComponent } from './components/icon.component';
import { NavComponent } from './components/nav.component';
import { HeroComponent } from './components/hero.component';
import { RibbonComponent } from './components/ribbon.component';
import { AboutComponent } from './components/about.component';
import { TeachingComponent } from './components/teaching.component';
import { ServicesComponent } from './components/services.component';
import { PracticeComponent } from './components/practice.component';
import { PublicationsComponent } from './components/publications.component';
import { StudentsComponent } from './components/students.component';
import { JourneyComponent } from './components/journey.component';
import { HonoursComponent } from './components/honours.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';
import { RIBBON_A, RIBBON_B } from './core/site-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IconSpriteComponent, NavComponent, HeroComponent, RibbonComponent,
    AboutComponent, TeachingComponent, ServicesComponent, PracticeComponent,
    PublicationsComponent, StudentsComponent, JourneyComponent, HonoursComponent,
    ContactComponent, FooterComponent,
  ],
  template: `
<app-icon-sprite></app-icon-sprite>

<app-nav></app-nav>
<app-hero></app-hero>

<app-ribbon [items]="ribbonA"></app-ribbon>

<app-about></app-about>
<app-teaching></app-teaching>
<app-services></app-services>
<app-practice></app-practice>
<app-publications></app-publications>
<app-students></app-students>

<app-ribbon [items]="ribbonB" [alt]="true"></app-ribbon>

<app-journey></app-journey>
<app-honours></app-honours>
<app-contact></app-contact>
<app-footer></app-footer>
  `,
})
export class AppComponent {
  ribbonA = RIBBON_A;
  ribbonB = RIBBON_B;
}
