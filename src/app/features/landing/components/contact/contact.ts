import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Button } from '../../../../shared/components/button/button';
import { Icon } from '../../../../shared/components/icon/icon';
import { MediaFrame } from '../../../../shared/components/media-frame/media-frame';
import { Pending } from '../../../../shared/components/pending/pending';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SplitTextDirective } from '../../../../shared/directives/split-text.directive';

/** Canais exibidos apenas quando configurados — nunca um botão que simule funcionamento. */
@Component({
  selector: 'app-contact',
  imports: [Button, Icon, MediaFrame, Pending, RevealDirective, SplitTextDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly site = inject(SiteService);
  protected readonly contact = this.site.config.contact;
  protected readonly clinic = this.site.config.clinic;
  protected readonly hasAnyInfo =
    this.site.hasContactChannel ||
    this.site.addressLines.length > 0 ||
    this.clinic.mapsUrl !== null ||
    this.clinic.openingHours.length > 0;
}
