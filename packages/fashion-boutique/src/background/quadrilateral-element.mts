import {
  IZComponentDispatch,
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentDispatch,
  ZComponentDispatchOnAttributeChanged,
  ZComponentRegister,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow,
  ZComponentTemplateNoDisplay
} from '@zthun/spellcraft';

export interface ZQuadrilateralElement extends IZComponentRender, IZComponentTemplate, IZComponentDispatch {}

@ZComponentRegister('z-quadrilateral')
@ZComponentDispatchOnAttributeChanged()
@ZComponentDispatch(new Event('change'))
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentTemplateNoDisplay()
@ZComponentShadow()
export class ZQuadrilateralElement<T extends string = string> extends HTMLElement {
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
