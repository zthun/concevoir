import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss
} from '@zthun/fashion-tailor';
import { ZFashionContrast } from '@zthun/fashion-theme';
import { html } from '@zthun/helpful-fn';
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
import { ZDeviceElement } from '../background/device-element.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';

export interface ZSuspenseRotateElement extends IZComponentRender {}

@ZComponentRegister('z-suspense-rotate')
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="width"]' })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZSuspense-root', 'ZSuspense-rotate')
@ZComponentShadow()
export class ZSuspenseRotateElement
  extends HTMLElement
  implements IZComponentFashion, IZComponentDisabled, IZComponentTemplate
{
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');
  public static readonly observedAttributes = ['fashion', 'disabled'];

  @ZAttribute({ fallback: ZFashionContrast.Opposite })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public disabled?: boolean;

  public template() {
    const { fashion, disabled } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $width = this.querySelector<ZDeviceElement>(':scope > z-device[name="width"]');
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeFixed.ExtraSmall);

    const xl = ZSuspenseRotateElement.SizeChart[width.xl()];
    const lg = ZSuspenseRotateElement.SizeChart[width.lg()];
    const md = ZSuspenseRotateElement.SizeChart[width.md()];
    const sm = ZSuspenseRotateElement.SizeChart[width.sm()];
    const xs = ZSuspenseRotateElement.SizeChart[width.xs()];

    return html`
      <style>
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
      </style>
      <div class="ZSuspense-rotate-circle"></div>
    `;
  }
}
