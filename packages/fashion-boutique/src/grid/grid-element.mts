import {
  ZDeviceBounds,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { IZComponentRender, ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { css, firstTruthy, html } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZAlignmentElement } from '../background/alignment-element.mjs';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZComponentBackgroundListen } from '../dom/component-background.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

@ZComponentShadow({ name: 'ZGrid', dependencies: [ZDeviceElement, ZAlignmentElement] })
@ZComponentBackgroundListen({
  selectors: [
    'z-alignment[name="align"]',
    'z-device[name="columns"]',
    'z-alignment[name="justify"]',
    'z-device[name="height"]',
    'z-device[name="width"]'
  ]
})
export class ZGridElement extends HTMLElement implements IZComponentRender {
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());
  public static readonly observedAttributes = ['rows', 'gap'];

  @ZAttribute()
  public rows?: Property.GridTemplateRows;

  @ZAttribute()
  public gap?: ZGapSize;

  public render(shadow: ShadowRoot) {
    const { rows, gap } = this;

    const device = new ZFashionDevice();

    const $columns = this.querySelector<ZDeviceElement>('z-device[name="columns"]');
    const columns = new ZDeviceBounds<Property.GridTemplateColumns>($columns?.device?.call($columns), 'none');

    const $align = this.querySelector<ZAlignmentElement>(`z-alignment[name="align"]`);
    const $justify = this.querySelector<ZAlignmentElement>(`z-alignment[name="justify"]`);

    const $width = this.querySelector<ZDeviceElement>(`z-device[name="width"]`);
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeVaried.Fit);

    const $height = this.querySelector<ZDeviceElement>(`z-device[name="height"]`);
    const height = new ZDeviceBounds($height?.device?.call($height), ZSizeVaried.Fit);

    const $css = css`
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
    `;

    const $html = html` <slot></slot> `;

    const style = document.createElement('style');
    style.textContent = $css;

    const template = document.createElement('template');
    template.innerHTML = $html;

    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));
  }
}
