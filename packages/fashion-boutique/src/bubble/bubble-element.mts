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
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import { firstTruthy, html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZDeviceElement, ZPropertyDeviceWidth } from '../background/device-element.mjs';
import { ZQuadrilateralElement } from '../background/quadrilateral-element.mjs';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZBubbleElement extends IZComponentRender {}

@ZComponentRegister('z-bubble')
@ZComponentClass('ZBubble-root')
@ZComponentRenderOnEvent('change', { selector: ':scope > z-quadrilateral[name="padding"]' })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentShadow()
export class ZBubbleElement extends HTMLElement implements IZComponentTemplate {
  public static readonly observedAttributes = Object.freeze(['active', 'border', 'fashion']);

  public static readonly SizeChart = {
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem'),
    ...createSizeChartVariedCss()
  };

  @ZAttribute({ type: 'boolean', fallback: false })
  public active: boolean;

  @ZAttribute({ fallback: ZSizeVoid.None })
  public border: ZThicknessSize;

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSizeFixed | ZSizeVaried>>;

  public template(): string {
    const { active, border, fashion, width } = this;
    const detail = new ZFashionDetail(fashion);
    const thickness = ZFashionTailorElement.thicknessVar(border);
    const device = new ZFashionDevice();

    const padding = this.querySelector<ZQuadrilateralElement<ZGapSize>>(`:scope > z-quadrilateral[name="padding"]`);

    return html`
      <style>
        :host {
          align-content: center;
          align-items: center;
          background: ${detail.color('main')};
          color: ${detail.color('contrast')};
          cursor: ${active ? 'pointer' : 'default'};
          border: ${thickness} solid ${detail.color('border')};
          border-radius: 50%;
          clip-path: circle();
          display: flex;
          flex-direction: column;
          height: ${ZBubbleElement.SizeChart[width.xl]};
          justify-content: center;
          padding-bottom: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.bottom))};
          padding-left: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.left))};
          padding-right: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.right))};
          padding-top: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, padding?.top))};
          width: ${ZBubbleElement.SizeChart[width.xl]};
        }

        :host(:focus) {
          background: ${active ? detail.color('focus.main') : detail.color('main')};
          border-color: ${active ? detail.color('focus.border') : detail.color('border')};
          color: ${active ? detail.color('focus.contrast') : detail.color('contrast')};
          outline: 'none';
        }

        :host(:hover) {
          background: ${active ? detail.color('hover.main') : detail.color('main')};
          border-color: ${active ? detail.color('hover.border') : detail.color('border')};
          color: ${active ? detail.color('hover.contrast') : detail.color('contrast')};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            height: ${ZBubbleElement.SizeChart[width.lg]};
            width: ${ZBubbleElement.SizeChart[width.lg]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            height: ${ZBubbleElement.SizeChart[width.md]};
            width: ${ZBubbleElement.SizeChart[width.md]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            height: ${ZBubbleElement.SizeChart[width.sm]};
            width: ${ZBubbleElement.SizeChart[width.sm]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            height: ${ZBubbleElement.SizeChart[width.xs]};
            width: ${ZBubbleElement.SizeChart[width.xs]};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
