import { CSSInterpolation } from '@emotion/css';
import {
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithFashion, WithFashionObservedAttributes } from '../element/with-fashion.mjs';

export class ZBannerElement extends WithFashion(ZFashionElement) {
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observedAttributes = Object.freeze(['height', ...WithFashionObservedAttributes]);

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  public readonly name = 'ZBanner-root';

  public refreshCssVariables = () => {
    const fallback = ZFashionPriority.Primary;
    const $height = this.queryAttribute('height', ZSizeVaried.Fit);

    this.style.setProperty('--banner-background', this.color('main', fallback));
    this.style.setProperty('--banner-color', this.color('contrast', fallback));
    this.style.setProperty('--banner-height', ZBannerElement.HeightChart[$height]);
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
