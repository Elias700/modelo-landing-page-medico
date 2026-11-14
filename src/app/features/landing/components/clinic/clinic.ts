import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { MediaFrame } from '../../../../shared/components/media-frame/media-frame';
import { Pending } from '../../../../shared/components/pending/pending';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/**
 * Exibe somente fotos REAIS do consultório (SITE_CONFIG.clinic.photos).
 * A landing page oculta esta seção em produção enquanto não houver fotos nem informações.
 */
@Component({
  selector: 'app-clinic',
  imports: [Icon, MediaFrame, Pending, SectionHeading, RevealDirective],
  templateUrl: './clinic.html',
  styleUrl: './clinic.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clinic {
  protected readonly site = inject(SiteService);
  protected readonly clinic = this.site.config.clinic;
  protected readonly placeholderSlots = [1, 2, 3];
}
