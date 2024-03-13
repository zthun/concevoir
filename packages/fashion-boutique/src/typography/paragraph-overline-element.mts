import { registerCustomElement } from '@zthun/helpful-dom';
import { ZParagraphElement } from './paragraph-element.mjs';

export class ZParagraphOverlineElement extends ZParagraphElement {
  public scale() {
    return 0.95;
  }
}

registerCustomElement('z-paragraph-overline', ZParagraphOverlineElement, { extends: 'p' });
