import { CSSInterpolation } from '@emotion/css';
import {
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithFashion } from '../element/with-fashion.mjs';
import { WithHeight } from '../element/with-height.mjs';

export class ZBannerElement extends WithFashion(WithHeight<ZSizeFixed | ZSizeVaried.Fit>(ZFashionElement)) {
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  public readonly name = 'ZBanner-root';

  public refreshCssVariables = () => {
    const fallback = ZFashionPriority.Primary;

    this.style.setProperty('--banner-background', this.color('main', fallback));
    this.style.setProperty('--banner-color', this.color('contrast', fallback));
    this.style.setProperty('--banner-height', ZBannerElement.HeightChart[this.heightXl(ZSizeVaried.Fit)]);
  };

  public generateStaticCss = (): CSSInterpolation => ({
    background: 'var(--banner-background)',
    boxSizing: 'border-box',
    color: 'var(--banner-color)',
    display: 'block',
    height: 'var(--banner-height)',
    left: 'auto',
    position: 'sticky',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 1100
  });
}
