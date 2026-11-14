import { Directive, input } from '@angular/core';
import { SplitText } from 'gsap/SplitText';
import { RevealTrigger, scrollTriggerFor, useMotion } from '../animations/motion';

/**
 * Revela o texto por linhas (padrão) ou palavras, cada uma subindo de dentro de uma máscara.
 * `autoSplit` refaz a divisão quando o layout muda (resize, carregamento de fontes) sem reiniciar a animação.
 * `aria: 'auto'` mantém o texto íntegro para leitores de tela.
 */
@Directive({
  selector: '[appSplitText]',
  host: { 'data-split': '' },
})
export class SplitTextDirective {
  readonly splitBy = input<'lines' | 'words'>('lines');
  readonly splitTrigger = input<RevealTrigger>('scroll');
  readonly splitDelay = input(0);

  constructor() {
    useMotion(({ el, gsap }) => {
      const byWords = this.splitBy() === 'words';

      SplitText.create(el, {
        type: byWords ? 'words,lines' : 'lines',
        mask: byWords ? 'words' : 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        aria: 'auto',
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(el, { autoAlpha: 1 });
          const targets = byWords ? self.words : self.lines;
          // Retornar a animação faz o SplitText preservar o progresso dela em cada re-split.
          return gsap.fromTo(
            targets,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.3,
              delay: this.splitDelay(),
              stagger: byWords ? 0.045 : 0.11,
              scrollTrigger: scrollTriggerFor(el, this.splitTrigger(), 'top 88%'),
            },
          );
        },
      });
    });
  }
}
