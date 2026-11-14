import { Directive, input } from '@angular/core';
import { useMotion } from '../animations/motion';

/**
 * Deslocamento vertical vinculado à rolagem (scrub), de -speed% a +speed% da altura do elemento.
 * Valores negativos invertem a direção. Reduzido pela metade em telas compactas.
 */
@Directive({ selector: '[appParallax]' })
export class ParallaxDirective {
  readonly appParallax = input(8);

  constructor() {
    useMotion(({ el, gsap, isCompact }) => {
      const speed = this.appParallax() * (isCompact ? 0.5 : 1);
      if (!speed) return;

      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
  }
}
