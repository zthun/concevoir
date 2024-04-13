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
import { firstTruthy, html } from '@zthun/helpful-fn';
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
import { ZDeviceElement, ZPropertyDevice } from '../background/device-element.mjs';
import { ZQuadrilateralElement } from '../background/quadrilateral-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZBoxElement extends IZComponentRender {}

@ZComponentRegister('z-box')
@ZComponentRenderOnEvent('change', { selector: ':scope > z-quadrilateral[name="edge"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-quadrilateral[name="margin"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-quadrilateral[name="padding"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-quadrilateral[name="trim"]' })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('width') })
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

  @ZPropertyDevice('width', ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<string>>;

  public template() {
    const { fashion, width, tabIndex } = this;
    const focusable = tabIndex >= 0;

    const device = new ZFashionDevice();
    const detail = new ZFashionDetail(fashion);

    const edgeQuery = ':scope > z-quadrilateral[name="edge"]';
    const edge = this.querySelector<ZQuadrilateralElement<ZThicknessSize>>(edgeQuery);

    const trimQuery = ':scope > z-quadrilateral[name="trim"]';
    const trim = this.querySelector<ZQuadrilateralElement<Property.BorderStyle>>(trimQuery);

    const marginQuery = ':scope > z-quadrilateral[name="margin"]';
    const margin = this.querySelector<ZQuadrilateralElement<ZGapSize | ZSizeVaried.Fit>>(marginQuery);

    const paddingQuery = ':scope > z-quadrilateral[name="padding"]';
    const padding = this.querySelector<ZQuadrilateralElement<ZGapSize>>(paddingQuery);

    return html`
      <style>
        :host {
          background-color: ${detail.color('main')};
          border: ${detail.color('border')};

          border-bottom-style: ${firstTruthy('none', trim?.bottom)};
          border-left-style: ${firstTruthy('none', trim?.left)};
          border-right-style: ${firstTruthy('none', trim?.right)};
          border-top-style: ${firstTruthy('none', trim?.top)};

          border-bottom-width: ${ZFashionTailorElement.thicknessVar(firstTruthy(ZSizeVoid.None, edge?.bottom))};
          border-left-width: ${ZFashionTailorElement.thicknessVar(firstTruthy(ZSizeVoid.None, edge?.left))};
          border-right-width: ${ZFashionTailorElement.thicknessVar(firstTruthy(ZSizeVoid.None, edge?.right))};
          border-top-width: ${ZFashionTailorElement.thicknessVar(firstTruthy(ZSizeVoid.None, edge?.top))};

          display: block;
          color: ${detail.color('contrast')};
          cursor: ${focusable ? 'pointer' : 'default'};

          padding-bottom: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.bottom))};
          padding-left: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.left))};
          padding-right: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.right))};
          padding-top: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.top))};

          margin-bottom: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, margin?.bottom))};
          margin-left: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, margin?.left))};
          margin-right: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, margin?.right))};
          margin-top: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, margin?.top))};

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
