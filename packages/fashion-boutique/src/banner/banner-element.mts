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
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentPropertyChanged,
  ZProperty,
  cssVariable,
  registerCustomElement
} from '@zthun/helpful-dom';
import { IZComponentHeight } from '../component/component-height.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { WithFashion, WithFashionAttributes } from '../element/with-fashion.mjs';

export class ZBannerElement
  extends WithFashion(HTMLElement)
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentHeight, IZComponentPropertyChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observedAttributes = [...WithFashionAttributes];

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  @ZProperty<ZSizeFixed | ZSizeVaried.Fit>({ initial: ZSizeVaried.Fit })
  public height?: ZSizeFixed | ZSizeVaried.Fit;

  public constructor() {
    super();

    const device = new ZFashionDevice();

    const css = new ZCssSerialize().serialize({
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
    });

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `:host { ${css} }`;
    shadow.appendChild(style);
    shadow.appendChild(document.createElement('slot'));
  }

  public connectedCallback() {
    this.classList.add('ZBanner-root');
    this.propertyChangedCallback();
  }

  public attributeChangedCallback(): void {
    this.propertyChangedCallback();
  }

  public propertyChangedCallback(): void {
    const { style } = this;

    style.setProperty('--banner-background', this.color('main', ZFashionPriority.Primary));
    style.setProperty('--banner-color', this.color('contrast', ZFashionPriority.Primary));

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
