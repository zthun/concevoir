import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  ZThicknessSize,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { IZQuadrilateral, html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { Property } from 'csstype';
import { ZDeviceElement, ZPropertyDeviceWidth } from '../background/device-element.mjs';
import {
  ZPropertyQuadrilateralEdge,
  ZPropertyQuadrilateralMargin,
  ZPropertyQuadrilateralPadding,
  ZPropertyQuadrilateralTrim,
  ZQuadrilateralElement
} from '../background/quadrilateral-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZBoxElement extends IZComponentRender {}

@ZComponentRegister('z-box')
@ZComponentRenderOnEvent('change', { selector: ZQuadrilateralElement.edge() })
@ZComponentRenderOnEvent('change', { selector: ZQuadrilateralElement.margin() })
@ZComponentRenderOnEvent('change', { selector: ZQuadrilateralElement.padding() })
@ZComponentRenderOnEvent('change', { selector: ZQuadrilateralElement.trim() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentShadow()
export class ZBoxElement extends HTMLElement implements IZComponentFashion, IZComponentTemplate {
  public static readonly observedAttributes = ['tabIndex', 'fashion'];

  public static readonly SizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  @ZAttribute({ fallback: ZFashionIntrinsic.Inherit })
  public fashion: string;

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<string>>;

  @ZPropertyQuadrilateralEdge(ZSizeVoid.None)
  public edge: IZQuadrilateral<ZThicknessSize>;

  @ZPropertyQuadrilateralMargin(ZSizeVoid.None)
  public margin: IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>;

  @ZPropertyQuadrilateralPadding(ZSizeVoid.None)
  public padding: IZQuadrilateral<ZGapSize>;

  @ZPropertyQuadrilateralTrim('none')
  public trim: IZQuadrilateral<Property.BorderStyle>;

  public template() {
    const { edge, trim, padding, margin, fashion, width, tabIndex } = this;
    const focusable = tabIndex >= 0;

    const device = new ZFashionDevice();
    const detail = new ZFashionDetail(fashion);

    return html`
      <style>
        :host {
          background-color: ${detail.color('main')};
          border: ${detail.color('border')};

          border-bottom-style: ${trim.bottom};
          border-left-style: ${trim.left};
          border-right-style: ${trim.right};
          border-top-style: ${trim.top};

          border-bottom-width: ${ZFashionTailorElement.thicknessVar(edge.bottom)};
          border-left-width: ${ZFashionTailorElement.thicknessVar(edge.left)};
          border-right-width: ${ZFashionTailorElement.thicknessVar(edge.right)};
          border-top-width: ${ZFashionTailorElement.thicknessVar(edge?.top)};

          display: block;
          color: ${detail.color('contrast')};
          cursor: ${focusable ? 'pointer' : 'default'};

          padding-bottom: ${ZFashionTailorElement.gapVar(padding.bottom)};
          padding-left: ${ZFashionTailorElement.gapVar(padding.left)};
          padding-right: ${ZFashionTailorElement.gapVar(padding.right)};
          padding-top: ${ZFashionTailorElement.gapVar(padding.top)};

          margin-bottom: ${ZFashionTailorElement.gapVar(margin.bottom)};
          margin-left: ${ZFashionTailorElement.gapVar(margin.left)};
          margin-right: ${ZFashionTailorElement.gapVar(margin.right)};
          margin-top: ${ZFashionTailorElement.gapVar(margin.top)};

          max-width: ${ZBoxElement.SizeChart[width.xl]};
        }

        :host(:focus) {
          background-color: ${focusable ? detail.color('focus.main') : detail.color('main')};
          border-color: ${focusable ? detail.color('focus.border') : detail.color('border')};
          color: ${focusable ? detail.color('focus.contrast') : detail.color('contrast')};
        }

        :host(:hover) {
          background-color: ${focusable ? detail.color('hover.main') : detail.color('main')};
          border-color: ${focusable ? detail.color('hover.border') : detail.color('border')};
          color: ${focusable ? detail.color('hover.contrast') : detail.color('contrast')};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            max-width: ${ZBoxElement.SizeChart[width.lg]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            max-width: ${ZBoxElement.SizeChart[width.md]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            max-width: ${ZBoxElement.SizeChart[width.sm]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            max-width: ${ZBoxElement.SizeChart[width.xs]};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
