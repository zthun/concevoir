import { registerCustomElement } from '@zthun/helpful-dom';
import { ZParagraphElement } from './paragraph-element.mjs';

export class ZParagraphBodyElement extends ZParagraphElement {
  public constructor() {
    super('body');
  }
}

registerCustomElement('z-paragraph-body', ZParagraphBodyElement, { extends: 'p' });
