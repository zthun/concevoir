import {
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  ZSpaceSize,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { css } from '../theme/css.mjs';

export class ZBoxWidthElement extends HTMLElement {
  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  public static readonly register = registerCustomElement.bind(null, 'z-box-width', ZBoxWidthElement);
  public static readonly device = Object.freeze(new ZFashionDevice());

  public width() {
    return firstDefined<ZSpaceSize>(ZSizeVaried.Fit, this.getAttribute('width') as ZSpaceSize);
  }

  public widthLg() {
    return firstDefined<ZSpaceSize>(this.width(), this.getAttribute('width-lg') as ZSpaceSize);
  }

  public widthMd() {
    return firstDefined<ZSpaceSize>(this.widthLg(), this.getAttribute('width-md') as ZSpaceSize);
  }

  public widthSm() {
    return firstDefined<ZSpaceSize>(this.widthMd(), this.getAttribute('width-sm') as ZSpaceSize);
  }

  public widthXs() {
    return firstDefined<ZSpaceSize>(this.widthSm(), this.getAttribute('width-xs') as ZSpaceSize);
  }

  public connectedCallback() {
    this._applyVariables();
    this.classList.add('ZBox-width');
    this.classList.add(
      css({
        display: 'block',

        maxWidth: 'var(--box-width-xl)',

        [ZBoxWidthElement.device.break(ZSizeFixed.Large)]: {
          maxWidth: 'var(--box-width-lg)'
        },

        [ZBoxWidthElement.device.break(ZSizeFixed.Medium)]: {
          maxWidth: 'var(--box-width-md)'
        },

        [ZBoxWidthElement.device.break(ZSizeFixed.Small)]: {
          maxWidth: 'var(--box-width-sm)'
        },

        [ZBoxWidthElement.device.break(ZSizeFixed.ExtraSmall)]: {
          maxWidth: 'var(--box-width-xs)'
        }
      })
    );
  }

  private _applyVariables() {
    this.style.setProperty('--box-width-xl', ZBoxWidthElement.BoxSizeChart[this.width()]);
    this.style.setProperty('--box-width-lg', ZBoxWidthElement.BoxSizeChart[this.widthLg()]);
    this.style.setProperty('--box-width-md', ZBoxWidthElement.BoxSizeChart[this.widthMd()]);
    this.style.setProperty('--box-width-sm', ZBoxWidthElement.BoxSizeChart[this.widthSm()]);
    this.style.setProperty('--box-width-xs', ZBoxWidthElement.BoxSizeChart[this.widthXs()]);
  }
}
