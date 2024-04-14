import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss
} from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
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
import { ZDeviceElement, ZPropertyDeviceHeight } from '../background/device-element.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';

export interface ZSuspenseProgressElement extends IZComponentRender {}

@ZComponentRegister('z-suspense-progress')
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('height') })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZSuspense-root', 'ZSuspense-progress')
@ZComponentShadow()
export class ZSuspenseProgressElement
  extends HTMLElement
  implements IZComponentFashion, IZComponentDisabled, IZComponentTemplate
{
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(0.25, 0.25), 'rem');
  public static readonly observedAttributes = ['fashion', 'disabled'];

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public disabled?: boolean;

  @ZPropertyDeviceHeight(ZSizeFixed.ExtraSmall)
  public height: Required<IZDeviceValueMap<ZSizeFixed>>;

  public template() {
    const { fashion, disabled, height } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    return html`
      <style>
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
          background-color: currentColor;
          box-shadow: 0 0 0.5rem ${detail.color('border')};
          height: ${ZSuspenseProgressElement.SizeChart[height.xl]};
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .ZSuspense-progress-scroll {
          animation: scroll 1.5s ease-in-out infinite;
          position: absolute;
          background-color: ${detail.color('main')};
          bottom: 0;
          left: 0;
          top: 0;
          width: 25%;
        }

        ${device.break(ZSizeFixed.Large)} {
          .ZSuspense-progress-bar {
            height: ${ZSuspenseProgressElement.SizeChart[height.lg]};
          }
        }
        ${device.break(ZSizeFixed.Medium)} {
          .ZSuspense-progress-bar {
            height: ${ZSuspenseProgressElement.SizeChart[height.md]};
          }
        }
        ${device.break(ZSizeFixed.Small)} {
          .ZSuspense-progress-bar {
            height: ${ZSuspenseProgressElement.SizeChart[height.sm]};
          }
        }
        ${device.break(ZSizeFixed.ExtraSmall)} {
          .ZSuspense-progress-bar {
            height: ${ZSuspenseProgressElement.SizeChart[height.xs]};
          }
        }
      </style>
      <div class="ZSuspense-progress-bar">
        <div class="ZSuspense-progress-scroll"></div>
      </div>
    `;
  }
}
