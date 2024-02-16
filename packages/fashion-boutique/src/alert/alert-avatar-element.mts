import { registerCustomElement } from '@zthun/helpful-dom';
import { mkCss } from '../theme/styled';

export class ZAlertAvatarElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-avatar', ZAlertAvatarElement);

  public connectedCallback() {
    this.classList.add('ZAlert-avatar');
    this.classList.add(
      mkCss({
        gridArea: 'avatar',
        marginRight: 'var(--alert-padding-x)'
      })
    );
  }
}
