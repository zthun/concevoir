import {
  IZDeviceValueMap,
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
import { ZDeviceElement, ZPropertyDevice } from '../background/device-element.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';

export interface ZSuspenseRotateElement extends IZComponentRender {}

@ZComponentRegister('z-suspense-rotate')
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('width') })
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

  @ZPropertyDevice('width', ZSizeFixed.ExtraSmall)
  public width: Required<IZDeviceValueMap<ZSizeFixed>>;

  public template() {
    const { fashion, disabled, width } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

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
          height: ${ZSuspenseRotateElement.SizeChart[width.xl]};
          width: ${ZSuspenseRotateElement.SizeChart[width.xl]};
        }

        ${device.break(ZSizeFixed.Large)} {
          .ZSuspense-rotate-circle {
            height: ${ZSuspenseRotateElement.SizeChart[width.lg]};
            width: ${ZSuspenseRotateElement.SizeChart[width.lg]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          .ZSuspense-rotate-circle {
            height: ${ZSuspenseRotateElement.SizeChart[width.md]};
            width: ${ZSuspenseRotateElement.SizeChart[width.md]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          .ZSuspense-rotate-circle {
            height: ${ZSuspenseRotateElement.SizeChart[width.sm]};
            width: ${ZSuspenseRotateElement.SizeChart[width.sm]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          .ZSuspense-rotate-circle {
            height: ${ZSuspenseRotateElement.SizeChart[width.xs]};
            width: ${ZSuspenseRotateElement.SizeChart[width.xs]};
          }
        }
      </style>
      <div class="ZSuspense-rotate-circle"></div>
    `;
  }
}
