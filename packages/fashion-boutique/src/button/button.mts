import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import {
  $attr,
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
import { IZComponentLoading } from '../component/component-loading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZSuspenseRotateElement } from '../suspense/suspense-rotate-element.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

@ZComponentShadow({
  name: 'ZButton',
  dependencies: [ZSuspenseRotateElement, ZDeviceElement],
  listen: [new ZElementListenBuilder().namedElement('z-device', 'width').build()]
})
export class ZButtonElement
  extends HTMLElement
  implements
    IZComponentLoading,
    IZComponentDisabled,
    IZComponentFashion,
    IZComponentName,
    IZComponentStyles,
    IZComponentTemplate
{
  public static readonly observedAttributes = ['borderless', 'compact', 'disabled', 'fashion', 'loading', 'outline'];
  public static readonly SizeChart = createSizeChartVariedCss();

  @ZAttribute({ type: 'boolean' })
  public borderless: boolean | undefined;

  @ZAttribute({ type: 'boolean' })
  public compact: boolean | undefined;

  @ZAttribute({ type: 'boolean' })
  public disabled: boolean | undefined;

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  @ZAttribute()
  public name: string | undefined;

  @ZAttribute({ type: 'boolean' })
  public loading: boolean | undefined;

  @ZAttribute({ type: 'boolean' })
  public outline: boolean | undefined;

  public styles() {
    const { borderless, compact, fashion, outline } = this;

    const device = new ZFashionDevice();
    const detail = new ZFashionDetail(fashion);
    const gap = ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall);
    const padding = compact ? '0' : gap;
    const thickness = ZFashionTailorElement.thicknessVar(ZSizeFixed.Medium);

    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeVaried.Fit);

    return css`
      :host {
        display: block;
        width: ${ZButtonElement.SizeChart[width.xl()]};
      }

      button {
        align-items: center;
        background: ${outline ? 'transparent' : detail.color('main')};
        border-color: ${detail.color('main')};
        border-radius: 0.375rem;
        border-style: ${borderless ? 'none' : 'solid'};
        color: ${outline ? detail.color('main') : detail.color('contrast')};
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: ${gap};
        overflow: hidden;
        padding: ${padding};
        position: relative;
        width: ${ZButtonElement.SizeChart[width.xl()]};
      }

      button:focus {
        border-color: ${detail.color('focus.main')};
        outline-color: ${detail.color('focus.border')};
        outline-style: solid;
        outline-width: ${thickness};
      }

      button:hover:not([disabled]) {
        background-color: ${detail.color('hover.main')};
        border-color: ${detail.color('hover.border')};
        color: ${detail.color('hover.contrast')};
        cursor: pointer;
      }

      button:active:not([disabled]) {
        background-color: ${detail.color('active.main')};
        border-color: ${detail.color('active.border')};
        color: ${detail.color('active.contrast')};
      }

      button:disabled {
        opacity: 0.25;
      }

      ${device.break(ZSizeFixed.Large)} {
        :host {
          width: ${ZButtonElement.SizeChart[width.lg()]};
        }

        button {
          width: ${ZButtonElement.SizeChart[width.lg()]};
        }
      }

      ${device.break(ZSizeFixed.Medium)} {
        :host {
          width: ${ZButtonElement.SizeChart[width.md()]};
        }

        button {
          width: ${ZButtonElement.SizeChart[width.md()]};
        }
      }

      ${device.break(ZSizeFixed.Small)} {
        :host {
          width: ${ZButtonElement.SizeChart[width.sm()]};
        }

        button {
          width: ${ZButtonElement.SizeChart[width.sm()]};
        }
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        :host {
          width: ${ZButtonElement.SizeChart[width.xs()]};
        }

        button {
          width: ${ZButtonElement.SizeChart[width.xs()]};
        }
      }
    `;
  }

  public template() {
    const { disabled, loading, fashion } = this;

    return html`
      <button ${$attr('disabled', disabled)}>
        <slot name="prefix"></slot>
        <slot></slot>
        <z-suspense-rotate class="ZButton-loading" ${$attr('disabled', !loading)} ${$attr('fashion', fashion)}>
        </z-suspense-rotate>
      </button>
    `;
  }
}
