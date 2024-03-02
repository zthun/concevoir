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
  name: 'ZSuspenseRotate',
  className: ['ZSuspense-root', 'ZSuspense-rotate'],
  listen: [new ZElementListenBuilder().namedElement('z-device', 'width').build()]
})
export class ZSuspenseRotateElement
  extends HTMLElement
  implements IZComponentFashion, IZComponentDisabled, IZComponentStyles, IZComponentTemplate
{
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');
  public static readonly observedAttributes = ['fashion', 'disabled'];

  @ZAttribute({ fallback: ZFashionContrast.Opposite })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public disabled?: boolean;

  public styles() {
    const { fashion, disabled } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeFixed.ExtraSmall);

    const xl = ZSuspenseRotateElement.SizeChart[width.xl()];
    const lg = ZSuspenseRotateElement.SizeChart[width.lg()];
    const md = ZSuspenseRotateElement.SizeChart[width.md()];
    const sm = ZSuspenseRotateElement.SizeChart[width.sm()];
    const xs = ZSuspenseRotateElement.SizeChart[width.xs()];

    return css`
      @keyframes rotating {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      :host {
        display: ${disabled ? 'none' : 'block'};
      }

      .ZSuspense-rotate-circle {
        animation: rotating 1s ease-in-out infinite;
        border-color: ${detail.color('border')};
        border-radius: 50%;
        border-style: dashed;
        box-shadow: 0 0 0.25rem ${detail.color('main')};

        height: ${xl};
        width: ${xl};

        ${device.break(ZSizeFixed.Large)} {
          height: ${lg};
          width: ${lg};
        }

        ${device.break(ZSizeFixed.Medium)} {
          height: ${md};
          width: ${md};
        }

        ${device.break(ZSizeFixed.Small)} {
          height: ${sm};
          width: ${sm};
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          height: ${xs};
          width: ${xs};
        }
      }
    `;
  }

  public template() {
    return html` <div class="ZSuspense-rotate-circle"></div> `;
  }
}
