import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaFrame } from '../../../../shared/components/media-frame/media-frame';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { PREVENTION_CONTENT } from '../../landing.content';

@Component({
  selector: 'app-prevention',
  imports: [MediaFrame, SectionHeading, ParallaxDirective, RevealDirective],
  templateUrl: './prevention.html',
  styleUrl: './prevention.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Prevention {
  protected readonly content = PREVENTION_CONTENT;
}
