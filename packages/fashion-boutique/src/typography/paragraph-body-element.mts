import { registerCustomElement } from '@zthun/helpful-dom';
import { ZParagraphElement } from './paragraph-element.mjs';

export class ZParagraphBodyElement extends ZParagraphElement {}

registerCustomElement('z-paragraph-body', ZParagraphBodyElement, { extends: 'p' });
