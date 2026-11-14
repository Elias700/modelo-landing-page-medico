import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Button } from '../../../../shared/components/button/button';
import { MediaFrame } from '../../../../shared/components/media-frame/media-frame';
import { Pending } from '../../../../shared/components/pending/pending';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ABOUT_CONTENT } from '../../landing.content';

@Component({
  selector: 'app-about',
  imports: [Button, MediaFrame, Pending, SectionHeading, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly site = inject(SiteService);
  protected readonly content = ABOUT_CONTENT;
  protected readonly doctor = this.site.config.doctor;
}
