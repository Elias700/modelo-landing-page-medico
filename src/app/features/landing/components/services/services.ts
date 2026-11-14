import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';
import { SERVICES } from '../../landing.content';

@Component({
  selector: 'app-services',
  imports: [Icon, SectionHeading, RevealDirective, TiltDirective],
  templateUrl: './services.html',
  styleUrl: './services.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly services = SERVICES;
}
