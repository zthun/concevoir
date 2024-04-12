import {
  ZDeviceBounds,
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
import { ZAlignmentElement } from '../background/alignment-element.mjs';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZGridElement extends IZComponentRender {}

@ZComponentRegister('z-grid')
@ZComponentRenderOnEvent('change', { selector: ':scope > z-alignment[name="align"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-alignment[name="justify"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="columns"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="width"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="height"]' })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZGrid-root')
@ZComponentShadow()
export class ZGridElement extends HTMLElement implements IZComponentTemplate {
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());
  public static readonly observedAttributes = ['rows', 'gap'];

  @ZAttribute()
  public rows?: Property.GridTemplateRows;

  @ZAttribute()
  public gap?: ZGapSize;

  public template() {
    const { rows, gap } = this;

    const device = new ZFashionDevice();

    const $columns = this.querySelector<ZDeviceElement>(':scope > z-device[name="columns"]');
    const columns = new ZDeviceBounds<Property.GridTemplateColumns>($columns?.device?.call($columns), 'none');

    const $align = this.querySelector<ZAlignmentElement>(`:scope > z-alignment[name="align"]`);
    const $justify = this.querySelector<ZAlignmentElement>(`:scope > z-alignment[name="justify"]`);

    const $width = this.querySelector<ZDeviceElement>(`:scope > z-device[name="width"]`);
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeVaried.Fit);

    const $height = this.querySelector<ZDeviceElement>(`:scope > z-device[name="height"]`);
    const height = new ZDeviceBounds($height?.device?.call($height), ZSizeVaried.Fit);

    return html`
      <style>
        :host {
          align-content: ${firstTruthy('normal', $align?.content)};
          align-items: ${firstTruthy('stretch', $align?.items)};
          display: grid;
          gap: ${ZFashionTailorElement.gapVar(firstTruthy(ZSizeVoid.None, gap))};
          grid-template-rows: ${firstTruthy('auto', rows)};
          justify-content: ${firstTruthy('normal', $justify?.content)};
          justify-items: ${firstTruthy('stretch', $justify?.items)};

          grid-template-columns: ${columns.xl()};
          height: ${ZGridElement.GridDimensionChart[height.xl()]};
          width: ${ZGridElement.GridDimensionChart[width.xl()]};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            grid-template-columns: ${columns.lg()};
            height: ${ZGridElement.GridDimensionChart[height.lg()]};
            width: ${ZGridElement.GridDimensionChart[width.lg()]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            grid-template-columns: ${columns.md()};
            height: ${ZGridElement.GridDimensionChart[height.md()]};
            width: ${ZGridElement.GridDimensionChart[width.md()]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            grid-template-columns: ${columns.sm()};
            height: ${ZGridElement.GridDimensionChart[height.sm()]};
            width: ${ZGridElement.GridDimensionChart[width.sm()]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            grid-template-columns: ${columns.xs()};
            height: ${ZGridElement.GridDimensionChart[height.xs()]};
            width: ${ZGridElement.GridDimensionChart[width.xs()]};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
