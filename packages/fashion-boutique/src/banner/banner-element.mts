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
import { ZAttribute, ZComponentShadow, registerCustomElement } from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { ZDeviceElement } from '../background/device-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZComponentBackgroundListen } from '../dom/component-background.mjs';
import { paintShadow } from '../dom/shadow-util.mjs';

@ZComponentShadow({ name: 'ZBanner', dependencies: [ZDeviceElement] })
@ZComponentBackgroundListen({ selectors: ['z-device[name="height"]'] })
export class ZBannerElement extends HTMLElement implements IZComponentFashion {
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observedAttributes = ['fashion'];

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  public render(shadow: ShadowRoot) {
    const { fashion } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $height = this.querySelector<ZDeviceElement>(`z-device[name="height"]`);
    const height = new ZDeviceBounds($height?.device?.call($height), ZSizeVaried.Fit);

    const $css = css`
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

        height: ${ZBannerElement.HeightChart[height.xl()]}
      }

      ${device.break(ZSizeFixed.Large)} {
        :host {
          height: ${ZBannerElement.HeightChart[height.lg()]};
        }
      },
      
      ${device.break(ZSizeFixed.Medium)} {
        :host {
          height: ${ZBannerElement.HeightChart[height.md()]};
        }
      },      
      
      ${device.break(ZSizeFixed.Small)} {
        :host {
          height: ${ZBannerElement.HeightChart[height.sm()]};
        }
      },

      ${device.break(ZSizeFixed.ExtraSmall)} {
        :host {
          height: ${ZBannerElement.HeightChart[height.xs()]};
        }
      },
    `;

    const $html = html`<slot></slot>`;
    paintShadow(shadow, $css, $html);
  }
}
