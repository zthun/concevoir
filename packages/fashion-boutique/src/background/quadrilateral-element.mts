import { ZGapSize, ZSizeVaried, ZThicknessSize } from "@zthun/fashion-tailor";
import { IZQuadrilateral, firstDefined } from "@zthun/helpful-fn";
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
  ZComponentTemplateNoDisplay,
} from "@zthun/spellcraft";
import { Property } from "csstype";

export interface ZQuadrilateralElement
  extends IZComponentRender,
    IZComponentTemplate,
    IZComponentDispatch {}

@ZComponentRegister("z-quadrilateral")
@ZComponentDispatchOnAttributeChanged()
@ZComponentDispatch(new Event("change"))
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentTemplateNoDisplay()
@ZComponentShadow()
export class ZQuadrilateralElement<
  T extends string = string,
> extends HTMLElement {
  public static readonly observedAttributes = [
    "bottom",
    "left",
    "right",
    "top",
  ];

  public static selector(name: string) {
    return `:scope > z-quadrilateral[name="${name}"]`;
  }

  public static padding = ZQuadrilateralElement.selector.bind(null, "padding");
  public static margin = ZQuadrilateralElement.selector.bind(null, "margin");
  public static edge = ZQuadrilateralElement.selector.bind(null, "edge");
  public static trim = ZQuadrilateralElement.selector.bind(null, "trim");

  @ZAttribute()
  public bottom?: T;

  @ZAttribute()
  public left?: T;

  @ZAttribute()
  public right?: T;

  @ZAttribute()
  public top?: T;
}

export function ZPropertyQuadrilateral<V extends string, T extends HTMLElement>(
  name: string,
  fallback: V,
) {
  return function (target: T, propertyKey: string | symbol): void {
    function get(this: T): IZQuadrilateral<V> {
      const selector = ZQuadrilateralElement.selector(name);
      const quadrilateral =
        this.querySelector<ZQuadrilateralElement<V>>(selector);

      return {
        bottom: firstDefined(fallback, quadrilateral?.bottom),
        left: firstDefined(fallback, quadrilateral?.left),
        right: firstDefined(fallback, quadrilateral?.right),
        top: firstDefined(fallback, quadrilateral?.top),
      };
    }

    Object.defineProperty(target, propertyKey, { get });
  };
}

export function ZPropertyQuadrilateralMargin<T extends HTMLElement>(
  fallback: ZThicknessSize | ZSizeVaried.Fit,
) {
  return ZPropertyQuadrilateral<ZThicknessSize | ZSizeVaried.Fit, T>(
    "margin",
    fallback,
  );
}

export function ZPropertyQuadrilateralPadding<T extends HTMLElement>(
  fallback: ZGapSize,
) {
  return ZPropertyQuadrilateral<ZGapSize, T>("padding", fallback);
}

export function ZPropertyQuadrilateralEdge<T extends HTMLElement>(
  fallback: ZThicknessSize,
) {
  return ZPropertyQuadrilateral<ZThicknessSize, T>("edge", fallback);
}

export function ZPropertyQuadrilateralTrim<T extends HTMLElement>(
  fallback: Property.BorderStyle,
) {
  return ZPropertyQuadrilateral<Property.BorderStyle, T>("trim", fallback);
}
