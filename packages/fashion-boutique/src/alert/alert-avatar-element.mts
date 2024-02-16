import { CSSInterpolation } from '@emotion/css';
import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionCustomElement } from '../element/fashion-element.mjs';

export class ZAlertAvatarElement extends ZFashionCustomElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-avatar', ZAlertAvatarElement);
  public readonly name = 'ZAlert-avatar';

  protected refreshCssVariables = undefined;

  protected generateStaticCss?(): CSSInterpolation {
    return {
      gridArea: 'avatar',
      marginRight: 'var(--alert-padding-x)'
    };
  }
}
