import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const ICONS = {
  stethoscope: [
    'M6 3H5v6a5 5 0 0 0 10 0V3h-1',
    'M10 14v1.5a5 5 0 0 0 10 0V13',
    'M20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  ],
  clipboard: [
    'M9 3.5h6v3H9z',
    'M9 5H6.5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H15',
    'M9 12h6M9 16h4',
  ],
  shield: ['M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z', 'M9 12l2 2 4-4'],
  heart: [
    'M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z',
    'M7 12h2.5l1.5-2.5 2 4 1.5-1.5H17',
  ],
  chart: ['M4 20h16', 'M4 4v16', 'M7.5 15l3.5-4.5 3 2.5 4.5-6'],
  leaf: ['M5 19C5 10.5 11 5 19.5 4.5 19 13 13.5 19 5 19z', 'M5 19l8.5-8.5'],
  chat: ['M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.5z', 'M9 10.5h.01M12 10.5h.01M15 10.5h.01'],
  phone: [
    'M5.5 4h3.2l1.8 4.5-2.2 1.4a11 11 0 0 0 5.8 5.8l1.4-2.2 4.5 1.8v3.2a1.5 1.5 0 0 1-1.6 1.5C10.5 19.4 4.6 13.5 4 5.6A1.5 1.5 0 0 1 5.5 4z',
  ],
  pin: [
    'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z',
    'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  ],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7.5V12l3 2'],
  calendar: ['M4.5 6.5h15v13h-15z', 'M4.5 10.5h15', 'M8.5 4v4M15.5 4v4'],
  mail: ['M4 6h16v12H4z', 'M4 7l8 6 8-6'],
  plus: ['M12 5v14', 'M5 12h14'],
  arrowUp: ['M12 19V5', 'M6 11l6-6 6 6'],
  arrowRight: ['M5 12h14', 'M13 6l6 6-6 6'],
  image: ['M4 5h16v14H4z', 'M4 16l4.5-4.5 3.5 3.5 2.5-2.5L20 18', 'M15.5 9.5h.01'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;

/** Ícones de traço fino, decorativos (aria-hidden). Use texto visível ao lado para significado. */
@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  protected readonly paths = computed(() => ICONS[this.name()]);
}
