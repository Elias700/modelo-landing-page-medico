import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { Pending } from '../../../../shared/components/pending/pending';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-footer',
  imports: [Icon, Pending, RevealDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly site = inject(SiteService);
  protected readonly config = this.site.config;
  protected readonly year = new Date().getFullYear();
}
