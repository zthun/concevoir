import { registerCustomElement } from '@zthun/helpful-dom';
import { ZHeadingElement } from './heading-element.mjs';

export class ZHeadingFiveElement extends ZHeadingElement {
  public scale() {
    return 1.5;
  }
}

registerCustomElement('z-h5', ZHeadingFiveElement, { extends: 'h5' });
