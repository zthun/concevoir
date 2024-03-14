import { registerCustomElement } from '@zthun/helpful-dom';
import { Property } from 'csstype';
import { ZHeadingElement } from './heading-element.mjs';

export class ZHeadingSixElement extends ZHeadingElement {
  public scale() {
    return 1.25;
  }

  public transform(): Property.TextTransform {
    return 'uppercase';
  }
}

registerCustomElement('z-h6', ZHeadingSixElement, { extends: 'h6' });
