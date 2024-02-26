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
  IZComponentDisconnected,
  ZAttribute,
  cssVariable,
  registerCustomElement
} from '@zthun/helpful-dom';
import { ZDeviceElement } from '../background/device-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';

export class ZBannerElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentDisconnected, IZComponentAttributeChanged, IZComponentFashion
{
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observedAttributes = ['fashion'];

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

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

  private _refreshHeight = () => {
    const { style } = this;

    const $height = this.querySelector<ZDeviceElement>(`z-device[name="height"]`);
    const height = new ZDeviceBounds($height?.device(), ZSizeVaried.Fit);

    const xl = ZBannerElement.HeightChart[height.xl()];
    const lg = ZBannerElement.HeightChart[height.lg()];
    const md = ZBannerElement.HeightChart[height.md()];
    const sm = ZBannerElement.HeightChart[height.sm()];
    const xs = ZBannerElement.HeightChart[height.xs()];

    style.setProperty('--banner-height-xl', xl);
    style.setProperty('--banner-height-lg', lg);
    style.setProperty('--banner-height-md', md);
    style.setProperty('--banner-height-sm', sm);
    style.setProperty('--banner-height-xs', xs);
  };

  private _refreshFashion = () => {
    const detail = new ZFashionDetail(this.fashion);
    const { style } = this;

    style.setProperty('--banner-background', detail.color('main'));
    style.setProperty('--banner-color', detail.color('contrast'));
  };

  public connectedCallback() {
    this.classList.add('ZBanner-root');

    const $height = this.querySelector<ZDeviceElement>('z-device[name="height"]');
    $height?.addEventListener('change', this._refreshHeight);

    this._refreshHeight();
    this._refreshFashion();
  }

  public disconnectedCallback() {
    const $height = this.querySelector<ZDeviceElement>('z-device[name="height"]');
    $height?.removeEventListener('change', this._refreshHeight);
  }

  public attributeChangedCallback(): void {
    this._refreshFashion();
  }
}
