import { Directive, computed, input } from '@angular/core';
import { RevealTrigger, scrollTriggerFor, useMotion } from '../animations/motion';

export type ImageRevealMode = RevealTrigger | 'none';
export type ImageRevealOrigin = 'bottom' | 'top' | 'left' | 'right';

const HIDDEN_CLIP: Record<ImageRevealOrigin, string> = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

/** Revela o elemento com uma máscara (clip-path) enquanto a mídia interna desacelera de um zoom leve. */
@Directive({
  selector: '[appImageReveal]',
  host: {
    '[attr.data-image-reveal]': "enabled() ? '' : null",
    '[attr.data-reveal-wide-only]': "revealOnCompact() ? null : ''",
  },
})
export class ImageRevealDirective {
  readonly appImageReveal = input<ImageRevealMode | ''>('scroll');
  readonly revealOrigin = input<ImageRevealOrigin>('bottom');
  readonly revealDelay = input(0);
  /** `false` exibe a imagem direto em telas < 900px (útil para a imagem LCP). */
  readonly revealOnCompact = input(true);

  protected readonly enabled = computed(() => this.appImageReveal() !== 'none');

  constructor() {
    useMotion(({ el, gsap, isCompact }) => {
      const mode = this.appImageReveal() || 'scroll';
      if (mode === 'none' || (isCompact && !this.revealOnCompact())) return;

      const media = el.querySelectorAll('img, video');
      const timeline = gsap.timeline({
        delay: this.revealDelay(),
        scrollTrigger: scrollTriggerFor(el, mode, 'top 90%'),
      });

      timeline
        .fromTo(
          el,
          { clipPath: HIDDEN_CLIP[this.revealOrigin()] },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' },
        )
        .fromTo(media, { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0);
    });
  }
}
