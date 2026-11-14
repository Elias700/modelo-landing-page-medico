import { Directive, input } from '@angular/core';
import { RevealTrigger, scrollTriggerFor, useMotion } from '../animations/motion';

/**
 * Fade + deslocamento vertical na entrada.
 * Com `revealStagger` (seletor CSS), anima os filhos correspondentes em sequência.
 */
@Directive({
  selector: '[appReveal]',
  host: { 'data-reveal': '' },
})
export class RevealDirective {
  readonly revealTrigger = input<RevealTrigger>('scroll');
  readonly revealDelay = input(0);
  readonly revealDistance = input(36);
  readonly revealStagger = input<string | null>(null);

  constructor() {
    useMotion(({ el, gsap, isCompact }) => {
      const selector = this.revealStagger();
      const targets = selector ? Array.from(el.querySelectorAll<HTMLElement>(selector)) : [el];
      if (selector) gsap.set(el, { autoAlpha: 1 });

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: isCompact ? this.revealDistance() * 0.6 : this.revealDistance() },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          delay: this.revealDelay(),
          stagger: 0.1,
          clearProps: 'transform',
          scrollTrigger: scrollTriggerFor(el, this.revealTrigger()),
        },
      );
    });
  }
}
