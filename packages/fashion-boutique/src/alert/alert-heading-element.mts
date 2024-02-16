import { registerCustomElement } from '@zthun/helpful-dom';
import { mkCss } from '../theme/styled';

export class ZAlertHeadingElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-heading', ZAlertHeadingElement);

  public connectedCallback() {
    this.classList.add('ZAlert-heading');
    this.classList.add(
      mkCss({
        gridArea: 'heading',
        marginBottom: 'calc(var(--alert-padding-y) / 2)'
      })
    );
  }
}
