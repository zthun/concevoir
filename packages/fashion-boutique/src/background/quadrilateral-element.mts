import { ZAttribute, registerCustomElement } from '@zthun/helpful-dom';
import { ZComponentBackground } from '../dom/component-background.mjs';

@ZComponentBackground({ name: 'ZQuadrilateral' })
export class ZQuadrilateralElement<T extends string = string> extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-quadrilateral', ZQuadrilateralElement);
  public static readonly observedAttributes = ['bottom', 'left', 'right', 'top'];

  @ZAttribute()
  public bottom?: T;

  @ZAttribute()
  public left?: T;

  @ZAttribute()
  public right?: T;

  @ZAttribute()
  public top?: T;
}
