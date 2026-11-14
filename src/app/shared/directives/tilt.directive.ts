import { Directive, input } from '@angular/core';
import { useMotion } from '../animations/motion';

/** Inclinação 3D sutil seguindo o ponteiro. Apenas em dispositivos com mouse. */
@Directive({ selector: '[appTilt]' })
export class TiltDirective {
  readonly appTilt = input(4);

  constructor() {
    useMotion(({ el, gsap }) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const maxAngle = this.appTilt();
      gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' });
      const rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(x * maxAngle * 2);
        rotateX(-y * maxAngle * 2);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    });
  }
}
