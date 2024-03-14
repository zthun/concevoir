import { registerCustomElement } from '@zthun/helpful-dom';
import { ZHeadingElement } from './heading-element.mjs';

export class ZHeadingThreeElement extends ZHeadingElement {
  public scale() {
    return 2;
  }
}

registerCustomElement('z-h3', ZHeadingThreeElement, { extends: 'h3' });
