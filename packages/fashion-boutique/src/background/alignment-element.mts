import { ZAttribute } from '@zthun/helpful-dom';
import { ZComponentBackground } from '../dom/component-background.mjs';

@ZComponentBackground({ name: 'ZAlignment' })
export class ZAlignmentElement<T extends string = string> extends HTMLElement {
  public static readonly observedAttributes = ['items', 'content'];

  @ZAttribute()
  public items?: T;

  @ZAttribute()
  public content?: T;
}
