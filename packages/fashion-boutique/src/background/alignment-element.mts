import { ZAttribute, registerCustomElement } from '@zthun/helpful-dom';
import { ZBackgroundElement } from './background-element.mjs';

export class ZAlignmentElement<T extends string = string> extends ZBackgroundElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alignment', ZAlignmentElement);
  public static readonly observedAttributes = ['items', 'content'];

  @ZAttribute()
  public items?: T;

  @ZAttribute()
  public content?: T;
}
