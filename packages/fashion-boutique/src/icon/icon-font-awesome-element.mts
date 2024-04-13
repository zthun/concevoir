import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric
} from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { createGuid, css } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentStyles,
  IZComponentWithStyleElement,
  IZLifecycleAttributeChanged,
  IZLifecycleConnected,
  ZAttribute,
  ZComponentClass,
  ZComponentLink,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect,
  ZComponentStylesRemoveOnDisconnect,
  ZComponentStylesUpdateOnAttributeChange
} from '@zthun/spellcraft';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZFashionDetail } from '../component/component-fashion.mjs';

export interface ZIconFontAwesomeElement extends IZComponentRender, IZComponentWithStyleElement {}

@ZComponentRegister('z-icon-font-awesome')
@ZComponentLink('stylesheet', ZIconFontAwesomeElement.Provider)
@ZComponentClass('ZIcon-root', 'ZIcon-font-awesome')
@ZComponentStylesRemoveOnDisconnect()
@ZComponentStylesUpdateOnAttributeChange()
@ZComponentStylesAddOnConnect()
@ZComponentStyles({ prefix: 'z-icon-font-awesome' })
export class ZIconFontAwesomeElement
  extends HTMLElement
  implements IZComponentStyles, IZLifecycleConnected, IZLifecycleAttributeChanged
{
  public static readonly observedAttributes = ['fashion', 'name', 'family', 'kind'];
  public static readonly Provider = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
  public static readonly Vendor = 'font-awesome';
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem');

  @ZAttribute({ fallback: 'question' })
  public name: string;

  @ZAttribute({ fallback: ZFashionIntrinsic.Inherit })
  public fashion: string;

  @ZAttribute({ fallback: 'classic' })
  public family: 'classic' | 'sharp' | 'brands';

  @ZAttribute({ fallback: 'solid' })
  public kind: 'solid' | 'regular' | 'duotone' | 'light' | 'thin';

  public styles() {
    const { fashion, id } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $width = this.querySelector<ZDeviceElement>(':scope > z-device[name="width"]');
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeFixed.Small);

    return css`
      #${id} {
        color: ${detail.color('main')};
        font-size: ${ZIconFontAwesomeElement.SizeChart[width.xl()]};
      }

      ${device.break(ZSizeFixed.Large)} {
        font-size: ${ZIconFontAwesomeElement.SizeChart[width.lg()]};
      }

      ${device.break(ZSizeFixed.Medium)} {
        font-size: ${ZIconFontAwesomeElement.SizeChart[width.md()]};
      }

      ${device.break(ZSizeFixed.Small)} {
        font-size: ${ZIconFontAwesomeElement.SizeChart[width.sm()]};
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        font-size: ${ZIconFontAwesomeElement.SizeChart[width.xs()]};
      }
    `;
  }

  public connectedCallback(): void {
    const { family, kind, name } = this;
    this.id = `z-icon-font-awesome-${createGuid()}`;
    this.classList.add(`fa-${family}`);
    this.classList.add(`fa-${kind}`);
    this.classList.add(`fa-${name}`);
    this.setAttribute('data-vendor', 'font-awesome');
  }

  public attributeChangedCallback(_: string, oldValue: string, newValue: string): void {
    this.classList.remove(`fa-${oldValue}`);
    this.classList.add(`fa-${newValue}`);
  }
}
