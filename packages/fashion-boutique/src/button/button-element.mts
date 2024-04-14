import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import { css } from '@zthun/helpful-fn';
import {
  IZComponentStyles,
  IZComponentWithStyleElement,
  ZAttribute,
  ZComponentClass,
  ZComponentCss,
  ZComponentGenerateId,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect,
  ZComponentStylesRemoveOnDisconnect,
  ZComponentStylesUpdateOnAttributeChange
} from '@zthun/spellcraft';
import { ZPropertyDeviceWidth } from '../background/device-element.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentLoading } from '../component/component-loading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface ZButtonElement extends IZComponentWithStyleElement {}

@ZComponentRegister('z-button', { extend: 'button' })
@ZComponentClass('ZButton-root')
@ZComponentStylesRemoveOnDisconnect()
@ZComponentStylesUpdateOnAttributeChange()
@ZComponentStylesAddOnConnect()
@ZComponentStyles({ prefix: 'z-button' })
@ZComponentCss(
  css`
    @keyframes ZButton-gradient {
      0% {
        background-position-x: 0%;
      }
      50% {
        background-position-x: 100%;
      }
      100% {
        background-position-x: 0%;
      }
    }
    .ZButton-root {
      align-items: center;
      border-radius: 0.375rem;
      display: inline-flex;
      font-family: inherit;
      font-size: inherit;
      gap: ${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)};
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    .ZButton-root:focus {
      outline-style: solid;
      outline-width: ${ZFashionTailorElement.thicknessVar(ZSizeFixed.Medium)};
    }

    .ZButton-root:hover:not([disabled]) {
      cursor: pointer;
    }

    .ZButton-root:disabled {
      opacity: 0.25;
    }

    .ZButton-root[data-loading='true'] {
      animation: ZButton-gradient 1.5s linear infinite;
    }
  `,
  { id: 'ZButton-styles' }
)
@ZComponentGenerateId({ prefix: 'z-button' })
export class ZButtonElement
  extends HTMLButtonElement
  implements IZComponentLoading, IZComponentDisabled, IZComponentFashion, IZComponentName, IZComponentStyles
{
  public static readonly observedAttributes = [
    'data-borderless',
    'data-compact',
    'data-fashion',
    'data-loading',
    'data-outline'
  ];
  public static readonly SizeChart = createSizeChartVariedCss();

  @ZAttribute({ name: 'data-borderless', type: 'boolean' })
  public borderless: boolean | undefined;

  @ZAttribute({ name: 'data-compact', type: 'boolean' })
  public compact: boolean | undefined;

  @ZAttribute({ name: 'data-fashion', fallback: ZFashionArea.Component })
  public fashion: string;

  @ZAttribute({ name: 'data-loading', type: 'boolean' })
  public loading: boolean | undefined;

  @ZAttribute({ name: 'data-outline', type: 'boolean' })
  public outline: boolean | undefined;

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSizeVaried>>;

  public styles() {
    const { borderless, compact, fashion, outline, width } = this;

    const device = new ZFashionDevice();
    const detail = new ZFashionDetail(fashion);
    const padding = compact ? '0' : ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall);

    return css`
      #${this.id} {
        background: ${outline ? 'transparent' : detail.color('main')};
        border-color: ${detail.color('main')};
        border-style: ${borderless ? 'none' : 'solid'};
        color: ${outline ? detail.color('main') : detail.color('contrast')};
        padding: ${padding};
        width: ${ZButtonElement.SizeChart[width.xl]};
      }

      #${this.id}:focus {
        border-color: ${detail.color('focus.main')};
        outline-color: ${detail.color('focus.border')};
      }

      #${this.id}:hover:not([disabled]) {
        background-color: ${detail.color('hover.main')};
        border-color: ${detail.color('hover.border')};
        color: ${detail.color('hover.contrast')};
      }

      #${this.id}:active:not([disabled]) {
        background-color: ${detail.color('active.main')};
        border-color: ${detail.color('active.border')};
        color: ${detail.color('active.contrast')};
      }

      #${this.id}[data-loading="true"] {
        background: linear-gradient(90deg, ${detail.color('main')}, ${detail.color('dark')}, ${detail.color('main')});
        background-size: 300% 100%;
      }

      #${this.id}:disabled {
        opacity: 0.25;
      }

      ${device.break(ZSizeFixed.Large)} {
        #${this.id} {
          width: ${ZButtonElement.SizeChart[width.lg]};
        }
      }

      ${device.break(ZSizeFixed.Medium)} {
        #${this.id} {
          width: ${ZButtonElement.SizeChart[width.md]};
        }
      }

      ${device.break(ZSizeFixed.Small)} {
        #${this.id} {
          width: ${ZButtonElement.SizeChart[width.sm]};
        }
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        #${this.id} {
          width: ${ZButtonElement.SizeChart[width.xs]};
        }
      }
    `;
  }
}
