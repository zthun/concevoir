import {
  ZDeviceBounds,
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
import { ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { css, firstTruthy, html } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZQuadrilateralElement } from '../background/quadrilateral-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZComponentBackgroundListen } from '../dom/component-background.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

@ZComponentShadow({ name: 'ZBox', dependencies: [ZQuadrilateralElement, ZDeviceElement] })
@ZComponentBackgroundListen({
  selectors: [
    'z-quadrilateral[name="edge"]',
    'z-quadrilateral[name="margin"]',
    'z-quadrilateral[name="padding"]',
    'z-quadrilateral[name="trim"]',
    'z-device[name="width"]'
  ]
})
export class ZBoxElement extends HTMLElement implements IZComponentFashion {
  public static readonly observedAttributes = ['tabIndex', 'fashion'];

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  @ZAttribute({ fallback: ZFashionIntrinsic.Inherit })
  public fashion: string;

  public render(shadow: ShadowRoot) {
    const focusable = this.tabIndex >= 0;
    const device = new ZFashionDevice();
    const detail = new ZFashionDetail(this.fashion);

    const edgeQuery = 'z-quadrilateral[name="edge"]';
    const edge = this.querySelector<ZQuadrilateralElement<ZThicknessSize>>(edgeQuery);

    const trimQuery = 'z-quadrilateral[name="trim"]';
    const trim = this.querySelector<ZQuadrilateralElement<Property.BorderStyle>>(trimQuery);

    const marginQuery = 'z-quadrilateral[name="margin"]';
    const margin = this.querySelector<ZQuadrilateralElement<ZGapSize | ZSizeVaried.Fit>>(marginQuery);

    const paddingQuery = 'z-quadrilateral[name="padding"]';
    const padding = this.querySelector<ZQuadrilateralElement<ZGapSize>>(paddingQuery);

    const $width = this.querySelector<ZDeviceElement>(`z-device[name="width"]`);
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeVaried.Fit);

    const $css = css`
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

        max-width: ${ZBoxElement.BoxSizeChart[width.xl()]};
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
          max-width: ${ZBoxElement.BoxSizeChart[width.lg()]};
        }
      }

      ${device.break(ZSizeFixed.Medium)} {
        :host {
          max-width: ${ZBoxElement.BoxSizeChart[width.md()]};
        }
      }

      ${device.break(ZSizeFixed.Small)} {
        :host {
          max-width: ${ZBoxElement.BoxSizeChart[width.sm()]};
        }
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        :host {
          max-width: ${ZBoxElement.BoxSizeChart[width.xs()]};
        }
      }
    `;

    const $html = html`<slot></slot>`;

    const style = document.createElement('style');
    style.textContent = $css;

    const template = document.createElement('template');
    template.innerHTML = $html;

    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));
  }
}
