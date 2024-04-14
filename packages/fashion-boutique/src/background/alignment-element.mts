import { firstDefined } from '@zthun/helpful-fn';
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
import { Property } from 'csstype';

export interface IZAlignment<TItems extends string, TContent extends string> {
  items?: TItems;
  content?: TContent;
}

export type IZAlign = IZAlignment<Property.AlignItems, Property.AlignContent>;
export type IZJustify = IZAlignment<Property.JustifyItems, Property.JustifyContent>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ZAlignmentElement<TItems extends string, TContent extends string>
  extends IZComponentDispatch,
    IZComponentRender,
    IZComponentTemplate {}

@ZComponentRegister('z-alignment')
@ZComponentDispatchOnAttributeChanged()
@ZComponentDispatch(new Event('change'))
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentTemplateNoDisplay()
@ZComponentShadow()
export class ZAlignmentElement<TItems extends string, TContent extends string> extends HTMLElement {
  public static readonly observedAttributes = ['items', 'content'];

  public static selector(name: string) {
    return `:scope > z-alignment[name="${name}"]`;
  }

  public static align = ZAlignmentElement.selector.bind(null, 'align');
  public static justify = ZAlignmentElement.selector.bind(null, 'justify');

  public alignment(): IZAlignment<TItems, TContent> {
    const { items, content } = this;
    return { items, content };
  }

  @ZAttribute()
  public name?: string;

  @ZAttribute()
  public items?: TItems;

  @ZAttribute()
  public content?: TContent;
}

function ZPropertyAlignment<TItems extends string, TContent extends string, T extends HTMLElement>(name: string) {
  return function (target: T, propertyKey: string | symbol): void {
    function get(this: T) {
      const selector = ZAlignmentElement.selector(name);
      const alignment = this.querySelector<ZAlignmentElement<TItems, TContent>>(selector);
      return firstDefined({}, alignment?.alignment());
    }

    Object.defineProperty(target, propertyKey, { get });
  };
}

export function ZPropertyAlignmentAlign<T extends HTMLElement>() {
  return ZPropertyAlignment<Property.AlignItems, Property.AlignContent, T>('align');
}

export function ZPropertyAlignmentJustify<T extends HTMLElement>() {
  return ZPropertyAlignment<Property.JustifyItems, Property.JustifyContent, T>('justify');
}
