import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SiteService } from '../../../core/config/site.service';

/**
 * Marcador de dado não configurado. Visível apenas em desenvolvimento (ng serve);
 * em produção não renderiza nada.
 */
@Component({
  selector: 'app-pending',
  template: `
    @if (site.showPending) {
      <span class="pending" title="Preencha em src/app/core/config/site.config.ts"
        >{{ label() }} — a confirmar</span
      >
    }
  `,
  styles: `
    .pending {
      display: inline-block;
      padding: 0.2em 0.6em;
      border: 1px dashed currentColor;
      border-radius: var(--radius-sm);
      font-family: var(--font-body);
      font-size: var(--fs-xs);
      font-style: normal;
      letter-spacing: 0.04em;
      opacity: 0.7;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pending {
  protected readonly site = inject(SiteService);
  readonly label = input.required<string>();
}
