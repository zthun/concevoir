import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { IZFashion, ZFashionPriority } from '@zthun/fashion-theme';
import {
  IZComponentConnected,
  IZComponentPropertyChanged,
  ZProperty,
  cssVariable,
  registerCustomElement
} from '@zthun/helpful-dom';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentHeight } from '../component/component-height.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';

export class ZBannerElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentHeight, IZComponentPropertyChanged, IZComponentFashion
{
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  @ZProperty<ZSizeFixed | ZSizeVaried.Fit>({ initial: ZSizeVaried.Fit })
  public height?: ZSizeFixed | ZSizeVaried.Fit;

  @ZProperty<IZFashion | string>({ attribute: ZFashionDetail.nameOf })
  public fashion?: IZFashion | string;

  public constructor() {
    super();

    const device = new ZFashionDevice();

    const css = new ZCssSerialize().serialize({
      ':host': {
        background: `${cssVariable('--banner-background')}`,
        boxSizing: 'border-box',
        color: `${cssVariable('--banner-color')}`,
        display: 'block',
        left: 'auto',
        position: 'sticky',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 1100,

        height: `${cssVariable('--banner-height-xl')}`,

        [device.break(ZSizeFixed.Large)]: {
          height: `${cssVariable('--banner-height-lg')}`
        },

        [device.break(ZSizeFixed.Medium)]: {
          height: `${cssVariable('--banner-height-md')}`
        },

        [device.break(ZSizeFixed.Small)]: {
          height: `${cssVariable('--banner-height-sm')}`
        },

        [device.break(ZSizeFixed.ExtraSmall)]: {
          height: `${cssVariable('--banner-height-xs')}`
        }
      }
    });

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = css;
    shadow.appendChild(style);
    shadow.appendChild(document.createElement('slot'));
  }

  public connectedCallback() {
    this.classList.add('ZBanner-root');
    this.propertyChangedCallback();
  }

  public propertyChangedCallback(): void {
    const detail = new ZFashionDetail(this.fashion);
    const { style } = this;

    style.setProperty('--banner-background', detail.color('main', ZFashionPriority.Primary));
    style.setProperty('--banner-color', detail.color('contrast', ZFashionPriority.Primary));

    const heightBounds = new ZDeviceBounds(this.height, ZSizeVaried.Fit);
    const heightXl = ZBannerElement.HeightChart[heightBounds.xl()];
    const heightLg = ZBannerElement.HeightChart[heightBounds.lg()];
    const heightMd = ZBannerElement.HeightChart[heightBounds.md()];
    const heightSm = ZBannerElement.HeightChart[heightBounds.sm()];
    const heightXs = ZBannerElement.HeightChart[heightBounds.xs()];

    style.setProperty('--banner-height-xl', heightXl);
    style.setProperty('--banner-height-lg', heightLg);
    style.setProperty('--banner-height-md', heightMd);
    style.setProperty('--banner-height-sm', heightSm);
    style.setProperty('--banner-height-xs', heightXs);
  }
}
