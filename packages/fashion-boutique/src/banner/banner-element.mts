import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { html } from '@zthun/helpful-fn';
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
import { ZDeviceElement } from '../background/device-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';

export interface ZBannerElement extends IZComponentRender {}

@ZComponentRegister('z-banner')
@ZComponentRenderOnEvent('change', { selector: 'z-device[name="height"]' })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentShadow()
export class ZBannerElement extends HTMLElement implements IZComponentFashion, IZComponentTemplate {
  public static readonly observedAttributes = ['fashion'];
  public static readonly SizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  public template() {
    const { fashion } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $height = this.querySelector<ZDeviceElement>(`z-device[name="height"]`);
    const height = new ZDeviceBounds($height?.device?.call($height), ZSizeVaried.Fit);

    return html`
      <style>
        :host {
          background: ${detail.color('main')};
          box-sizing: border-box;
          color: ${detail.color('contrast')};
          display: block;
          position: sticky;
          width: 100%;
          z-index: 1100;

          left: auto;
          right: 0;
          top: 0;

          height: ${ZBannerElement.SizeChart[height.xl()]};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            height: ${ZBannerElement.SizeChart[height.lg()]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            height: ${ZBannerElement.SizeChart[height.md()]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            height: ${ZBannerElement.SizeChart[height.sm()]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            height: ${ZBannerElement.SizeChart[height.xs()]};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
