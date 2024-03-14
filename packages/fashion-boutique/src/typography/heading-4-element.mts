import { registerCustomElement } from '@zthun/helpful-dom';
import { Property } from 'csstype';
import { ZHeadingElement } from './heading-element.mjs';

export class ZHeadingFourElement extends ZHeadingElement {
  public scale() {
    return 1.5;
  }

  public transform(): Property.TextTransform {
    return 'uppercase';
  }
}

registerCustomElement('z-h4', ZHeadingFourElement, { extends: 'h4' });
