import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from '../element/fashion-element.mjs';

export class ZAlertMessageElement extends ZFashionElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-message', ZAlertMessageElement);
  public readonly name = 'ZAlert-message';

  protected refreshCssVariables = undefined;

  protected generateStaticCss() {
    return {
      gridArea: 'message'
    };
  }
}
