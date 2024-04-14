import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
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
import { Property } from 'csstype';
import {
  IZAlign,
  IZJustify,
  ZAlignmentElement,
  ZPropertyAlignmentAlign,
  ZPropertyAlignmentJustify
} from '../background/alignment-element.mjs';
import {
  ZDeviceElement,
  ZPropertyDevice,
  ZPropertyDeviceHeight,
  ZPropertyDeviceWidth
} from '../background/device-element.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZGridElement extends IZComponentRender {}

@ZComponentRegister('z-grid')
@ZComponentRenderOnEvent('change', { selector: ZAlignmentElement.align() })
@ZComponentRenderOnEvent('change', { selector: ZAlignmentElement.justify() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('columns') })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.height() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZGrid-root')
@ZComponentShadow()
export class ZGridElement extends HTMLElement implements IZComponentTemplate {
  public static readonly SizeChart = Object.freeze(createSizeChartVariedCss());
  public static readonly observedAttributes = ['rows', 'gap'];

  @ZAttribute()
  public rows?: Property.GridTemplateRows;

  @ZAttribute()
  public gap?: ZGapSize;

  @ZPropertyDevice('columns', 'none')
  public columns: Required<IZDeviceValueMap<Property.GridTemplateColumns>>;

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSizeVaried>>;

  @ZPropertyDeviceHeight(ZSizeVaried.Fit)
  public height: Required<IZDeviceValueMap<ZSizeVaried>>;

  @ZPropertyAlignmentAlign()
  public align: IZAlign;

  @ZPropertyAlignmentJustify()
  public justify: IZJustify;

  public template() {
    const { align, justify, columns, rows, gap, width, height } = this;
    const device = new ZFashionDevice();

    return html`
      <style>
        :host {
          align-content: ${firstTruthy('normal', align?.content)};
          align-items: ${firstTruthy('stretch', align?.items)};
          display: grid;
          gap: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, gap))};
          grid-template-rows: ${firstTruthy('auto', rows)};
          justify-content: ${firstTruthy('normal', justify?.content)};
          justify-items: ${firstTruthy('stretch', justify?.items)};

          grid-template-columns: ${columns.xl};
          height: ${ZGridElement.SizeChart[height.xl]};
          width: ${ZGridElement.SizeChart[width.xl]};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            grid-template-columns: ${columns.lg};
            height: ${ZGridElement.SizeChart[height.lg]};
            width: ${ZGridElement.SizeChart[width.lg]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            grid-template-columns: ${columns.md};
            height: ${ZGridElement.SizeChart[height.md]};
            width: ${ZGridElement.SizeChart[width.md]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            grid-template-columns: ${columns.sm};
            height: ${ZGridElement.SizeChart[height.sm]};
            width: ${ZGridElement.SizeChart[width.sm]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            grid-template-columns: ${columns.xs};
            height: ${ZGridElement.SizeChart[height.xs]};
            width: ${ZGridElement.SizeChart[width.xs]};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
