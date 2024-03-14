import { registerCustomElement } from '@zthun/helpful-dom';
import { ZHeadingElement } from './heading-element.mjs';

export class ZHeadingOneElement extends ZHeadingElement {}

registerCustomElement('z-h1', ZHeadingOneElement, { extends: 'h1' });
