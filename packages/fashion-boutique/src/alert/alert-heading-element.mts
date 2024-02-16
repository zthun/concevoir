import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionCustomElement } from 'src/element/fashion-custom-element.mjs';

export class ZAlertHeadingElement extends ZFashionCustomElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-heading', ZAlertHeadingElement);
  public readonly name = 'ZAlert-heading';

  protected refreshCssVariables = undefined;

  protected generateStaticCss() {
    return {
      gridArea: 'heading',
      marginBottom: 'calc(var(--alert-padding-y) / 2)'
    };
  }
}
