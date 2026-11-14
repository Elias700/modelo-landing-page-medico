import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'solid' | 'outline' | 'light' | 'outline-light';

/** Link com aparência de botão: preenchimento que sobe e texto que rola no hover. */
@Component({
  selector: 'a[appButton]',
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
  },
})
export class Button {
  readonly label = input.required<string>();
  readonly variant = input<ButtonVariant>('solid');
  readonly icon = input<'arrow' | 'down' | null>('arrow');
}
