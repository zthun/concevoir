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

export interface ZAlignmentElement extends IZComponentDispatch, IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-alignment')
@ZComponentDispatchOnAttributeChanged()
@ZComponentDispatch(new Event('change'))
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentTemplateNoDisplay()
@ZComponentShadow()
export class ZAlignmentElement<T extends string = string> extends HTMLElement {
  public static readonly observedAttributes = ['items', 'content'];

  @ZAttribute()
  public items?: T;

  @ZAttribute()
  public content?: T;
}
