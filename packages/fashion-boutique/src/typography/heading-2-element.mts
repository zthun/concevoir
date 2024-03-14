import { registerCustomElement } from '@zthun/helpful-dom';
import { ZHeadingElement } from './heading-element.mjs';

export class ZHeadingTwoElement extends ZHeadingElement {
  public scale() {
    return 2.5;
  }
}

registerCustomElement('z-h2', ZHeadingTwoElement, { extends: 'h2' });
