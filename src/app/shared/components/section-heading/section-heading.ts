import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';

/**
 * Cabeçalho editorial de seção (eyebrow + h2 + subtítulo).
 * `emphasis` destaca, em itálico, um trecho que exista dentro de `title`.
 */
@Component({
  selector: 'app-section-heading',
  imports: [RevealDirective, SplitTextDirective],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-align]': 'align()',
  },
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly eyebrow = input<string | null>(null);
  readonly subtitle = input<string | null>(null);
  readonly emphasis = input<string | null>(null);
  readonly align = input<'start' | 'center'>('start');

  protected readonly titleParts = computed(() => {
    const title = this.title();
    const emphasis = this.emphasis();
    const index = emphasis ? title.indexOf(emphasis) : -1;
    if (!emphasis || index < 0) return { before: title, emphasis: '', after: '' };
    return {
      before: title.slice(0, index),
      emphasis,
      after: title.slice(index + emphasis.length),
    };
  });
}
