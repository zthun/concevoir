import { registerCustomElement } from '@zthun/helpful-dom';
import { css } from '../theme/css.mjs';

export class ZAlertHeadingElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-heading', ZAlertHeadingElement);

  public connectedCallback() {
    this.classList.add('ZAlert-heading');
    this.classList.add(
      css({
        gridArea: 'heading',
        marginBottom: 'calc(var(--alert-padding-y) / 2)'
      })
    );
  }
}
