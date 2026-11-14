import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  ImageRevealDirective,
  ImageRevealMode,
  ImageRevealOrigin,
} from '../../directives/image-reveal.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';

/**
 * Moldura de imagem com proporção reservada (sem CLS), revelação por máscara e parallax interno.
 * `animatedSrc` (GIF) é exibido apenas para quem não prefere movimento reduzido;
 * caso contrário, mostra a foto estática `src`.
 */
@Component({
  selector: 'app-media-frame',
  imports: [ImageRevealDirective, ParallaxDirective],
  templateUrl: './media-frame.html',
  styleUrl: './media-frame.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFrame {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly width = input.required<number>();
  readonly height = input.required<number>();
  readonly animatedSrc = input<string | null>(null);
  readonly priority = input(false);
  readonly objectPosition = input('50% 20%');
  readonly parallax = input(0);
  readonly reveal = input<ImageRevealMode>('scroll');
  readonly revealOrigin = input<ImageRevealOrigin>('bottom');
  readonly revealDelay = input(0);
  readonly revealOnCompact = input(true);

  protected readonly aspectRatio = computed(() => `${this.width()} / ${this.height()}`);
  /** Sobra de imagem acima/abaixo para o parallax nunca revelar bordas vazias. */
  protected readonly overscan = computed(() => `${Math.abs(this.parallax()) * 1.35}%`);
}
