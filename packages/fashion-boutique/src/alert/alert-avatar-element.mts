import { registerCustomElement } from '@zthun/helpful-dom';
import { css } from '../theme/css.mjs';

export class ZAlertAvatarElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-avatar', ZAlertAvatarElement);

  public connectedCallback() {
    this.classList.add('ZAlert-avatar');
    this.classList.add(
      css({
        gridArea: 'avatar',
        marginRight: 'var(--alert-padding-x)'
      })
    );
  }
}
