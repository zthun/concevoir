import { registerCustomElement } from '@zthun/helpful-dom';
import { mkCss } from '../theme/styled';

export class ZAlertMessageElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-message', ZAlertMessageElement);

  public connectedCallback() {
    this.classList.add('ZAlert-message');
    this.classList.add(
      mkCss({
        gridArea: 'message'
      })
    );
  }
}
