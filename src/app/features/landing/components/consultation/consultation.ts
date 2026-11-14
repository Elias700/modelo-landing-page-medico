import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { useMotion } from '../../../../shared/animations/motion';
import { CONSULTATION_STEPS } from '../../landing.content';

@Component({
  selector: 'app-consultation',
  imports: [SectionHeading, RevealDirective],
  templateUrl: './consultation.html',
  styleUrl: './consultation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Consultation {
  protected readonly steps = CONSULTATION_STEPS;

  constructor() {
    // Linha de progresso vinculada à rolagem (sem pin): preenche e "acende" as etapas alcançadas.
    useMotion(({ el, gsap }) => {
      const timeline = el.querySelector<HTMLElement>('.timeline');
      const items = Array.from(el.querySelectorAll<HTMLElement>('.step'));
      if (!timeline || !items.length) return;
      items.forEach((item) => item.classList.remove('is-reached'));

      const lastIndex = Math.max(items.length - 1, 1);
      gsap.fromTo(
        timeline,
        { '--progress': 0 },
        {
          '--progress': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.6,
            onUpdate: ({ progress }) => {
              items.forEach((item, index) =>
                item.classList.toggle('is-reached', progress >= (index / lastIndex) * 0.98),
              );
            },
          },
        },
      );
    });
  }
}
