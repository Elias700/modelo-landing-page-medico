import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteService } from '../../core/config/site.service';
import { About } from './components/about/about';
import { Clinic } from './components/clinic/clinic';
import { Consultation } from './components/consultation/consultation';
import { Contact } from './components/contact/contact';
import { Faq } from './components/faq/faq';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Prevention } from './components/prevention/prevention';
import { Services } from './components/services/services';

@Component({
  selector: 'app-landing-page',
  imports: [About, Clinic, Consultation, Contact, Faq, Footer, Header, Hero, Prevention, Services],
  templateUrl: './landing-page.html',
  styles: `
    main:focus {
      outline: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  private readonly site = inject(SiteService);

  /** Sem fotos reais nem dados, a seção do consultório só aparece em desenvolvimento. */
  protected readonly showClinic =
    this.site.config.clinic.photos.length > 0 || this.site.hasClinicInfo || this.site.showPending;
}
