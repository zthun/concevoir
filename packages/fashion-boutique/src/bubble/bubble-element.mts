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
import { IZQuadrilateral, html } from '@zthun/helpful-fn';
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
import { Property } from 'csstype';
import { ZDeviceElement, ZPropertyDeviceWidth } from '../background/device-element.mjs';
import { ZPropertyQuadrilateralPadding, ZQuadrilateralElement } from '../background/quadrilateral-element.mjs';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZBubbleElement extends IZComponentRender {}

@ZComponentRegister('z-bubble')
@ZComponentClass('ZBubble-root')
@ZComponentRenderOnEvent('change', { selector: ZQuadrilateralElement.padding() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentShadow()
export class ZBubbleElement extends HTMLElement implements IZComponentTemplate {
  public static readonly observedAttributes = Object.freeze(['active', 'edge', 'fashion', 'trim']);

  public static readonly SizeChart = {
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem'),
    ...createSizeChartVariedCss()
  };

  @ZAttribute({ type: 'boolean', fallback: false })
  public active: boolean;

  @ZAttribute({ fallback: ZSizeVoid.None })
  public edge: ZThicknessSize;

  @ZAttribute({ fallback: 'solid' })
  public trim: Property.BorderStyle;

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSizeFixed | ZSizeVaried>>;

  @ZPropertyQuadrilateralPadding(ZSizeVoid.None)
  public padding: IZQuadrilateral<ZGapSize>;

  public template(): string {
    const { active, edge, fashion, padding, trim, width } = this;
    const detail = new ZFashionDetail(fashion);
    const thickness = ZFashionTailorElement.thicknessVar(edge);
    const device = new ZFashionDevice();

    return html`
      <style>
        :host {
          align-content: center;
          align-items: center;
          background: ${detail.color('main')};
          color: ${detail.color('contrast')};
          cursor: ${active ? 'pointer' : 'default'};
          border: ${thickness} ${trim} ${detail.color('border')};
          border-radius: 50%;
          clip-path: circle();
          display: flex;
          flex-direction: column;
          height: ${ZBubbleElement.SizeChart[width.xl]};
          justify-content: center;
          padding-bottom: ${ZFashionTailorElement.gapVar(padding.bottom)};
          padding-left: ${ZFashionTailorElement.gapVar(padding.left)};
          padding-right: ${ZFashionTailorElement.gapVar(padding.right)};
          padding-top: ${ZFashionTailorElement.gapVar(padding.top)};
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
