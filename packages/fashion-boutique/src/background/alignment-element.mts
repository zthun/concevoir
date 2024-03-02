import { ZAttribute, ZComponentBackground } from '@zthun/helpful-dom';

@ZComponentBackground({ name: 'ZAlignment' })
export class ZAlignmentElement<T extends string = string> extends HTMLElement {
  public static readonly observedAttributes = ['items', 'content'];

  @ZAttribute()
  public items?: T;

  @ZAttribute()
  public content?: T;
}
