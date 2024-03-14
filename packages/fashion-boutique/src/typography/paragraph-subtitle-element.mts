import { registerCustomElement } from '@zthun/helpful-dom';
import { ZParagraphElement } from './paragraph-element.mjs';

export class ZParagraphSubtitleElement extends ZParagraphElement {
  public constructor() {
    super('subtitle');
  }

  public scale() {
    return 1.1;
  }
}

registerCustomElement('z-paragraph-subtitle', ZParagraphSubtitleElement, { extends: 'p' });
