import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from '../element/fashion-element.mjs';

export class ZAlertHeadingElement extends ZFashionElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-heading', ZAlertHeadingElement);
  public readonly name = 'ZAlert-heading';

  public generateStaticCss = () => ({
    gridArea: 'heading',
    marginBottom: 'calc(var(--alert-padding-y) / 2)'
  });
}
