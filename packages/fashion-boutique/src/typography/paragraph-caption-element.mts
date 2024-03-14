import { registerCustomElement } from '@zthun/helpful-dom';
import { ZParagraphElement } from './paragraph-element.mjs';

export class ZParagraphCaptionElement extends ZParagraphElement {
  public constructor() {
    super('caption');
  }

  public scale() {
    return 0.9;
  }
}

registerCustomElement('z-paragraph-caption', ZParagraphCaptionElement, { extends: 'p' });
