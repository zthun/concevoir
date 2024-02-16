import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from '../element/fashion-element.mjs';

export class ZAlertAvatarElement extends ZFashionElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-avatar', ZAlertAvatarElement);
  public readonly name = 'ZAlert-avatar';

  public generateStaticCss = () => ({
    gridArea: 'avatar',
    marginRight: 'var(--alert-padding-x)'
  });
}
