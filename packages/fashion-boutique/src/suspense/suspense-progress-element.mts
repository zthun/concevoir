import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss
} from '@zthun/fashion-tailor';
import { ZFashionContrast } from '@zthun/fashion-theme';
import {
  IZComponentStyles,
  IZComponentTemplate,
  ZAttribute,
  ZComponentShadow,
  ZElementListenBuilder
} from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { ZDeviceElement } from '../background/device-element.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';

@ZComponentShadow({
  name: 'ZSuspenseProgress',
  className: ['ZSuspense-root', 'ZSuspense-progress'],
  listen: [new ZElementListenBuilder().namedElement('z-device', 'height').build()]
})
export class ZSuspenseProgressElement
  extends HTMLElement
  implements IZComponentFashion, IZComponentDisabled, IZComponentTemplate, IZComponentStyles
{
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(0.25, 0.25), 'rem');
  public static readonly observedAttributes = ['fashion', 'disabled'];

  @ZAttribute({ fallback: ZFashionContrast.Opposite })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public disabled?: boolean;

  public styles() {
    const { fashion, disabled } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $height = this.querySelector<ZDeviceElement>('z-device[name="height"]');
    const height = new ZDeviceBounds($height?.device?.call($height), ZSizeFixed.ExtraSmall);

    const xl = ZSuspenseProgressElement.SizeChart[height.xl()];
    const lg = ZSuspenseProgressElement.SizeChart[height.lg()];
    const md = ZSuspenseProgressElement.SizeChart[height.md()];
    const sm = ZSuspenseProgressElement.SizeChart[height.sm()];
    const xs = ZSuspenseProgressElement.SizeChart[height.xs()];

    return css`
      @keyframes scroll {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(400%);
        }
      }

      :host {
        display: ${disabled ? 'none' : 'block'};
      }

      .ZSuspense-progress-bar {
        background-color: ${detail.color('main')};
        box-shadow: 0 0 0.5rem ${detail.color('border')};
        overflow: hidden;
        position: relative;
        width: 100%;

        height: ${xl};

        ${device.break(ZSizeFixed.Large)} {
          height: ${lg};
        }
        ${device.break(ZSizeFixed.Medium)} {
          height: ${md};
        }
        ${device.break(ZSizeFixed.Small)} {
          height: ${sm};
        }
        ${device.break(ZSizeFixed.ExtraSmall)} {
          height: ${xs};
        }
      }

      .ZSuspense-progress-scroll {
        animation: scroll 1.5s ease-in-out infinite;
        position: absolute;
        background-color: ${detail.color('contrast')};
        bottom: 0;
        left: 0;
        top: 0;
        width: 25%;
      }
    `;
  }

  public template() {
    return html`
      <div class="ZSuspense-progress-bar">
        <div class="ZSuspense-progress-scroll"></div>
      </div>
    `;
  }
}
