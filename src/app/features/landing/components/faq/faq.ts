import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Button } from '../../../../shared/components/button/button';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { buildFaq } from '../../landing.content';

@Component({
  selector: 'app-faq',
  imports: [Button, SectionHeading, RevealDirective],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq {
  protected readonly site = inject(SiteService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly items = buildFaq(this.site);
  protected readonly openIndex = signal<number | null>(0);

  protected toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }

  /** Setas, Home e End movem o foco entre as perguntas (padrão WAI-ARIA Accordion). */
  protected onKeydown(event: KeyboardEvent, index: number): void {
    const triggers = Array.from(
      this.host.nativeElement.querySelectorAll<HTMLButtonElement>('.trigger'),
    );
    const last = triggers.length - 1;
    const target: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in target)) return;
    event.preventDefault();
    triggers[target[event.key]]?.focus();
  }
}
