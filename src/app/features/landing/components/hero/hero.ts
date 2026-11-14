import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Button } from '../../../../shared/components/button/button';
import { MediaFrame } from '../../../../shared/components/media-frame/media-frame';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SplitTextDirective } from '../../../../shared/directives/split-text.directive';
import { HERO_CONTENT } from '../../landing.content';

@Component({
  selector: 'app-hero',
  imports: [Button, MediaFrame, ParallaxDirective, RevealDirective, SplitTextDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly site = inject(SiteService);
  protected readonly content = HERO_CONTENT;
  protected readonly titleBefore = HERO_CONTENT.title.replace(HERO_CONTENT.emphasis, '');
}
