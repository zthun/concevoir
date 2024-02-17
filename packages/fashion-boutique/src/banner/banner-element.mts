import { CSSInterpolation } from '@emotion/css';
import {
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from 'src/element/fashion-element.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export class ZBannerElement extends ZFashionElement {
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observeAttributes = Object.freeze(['height', 'fashion']);

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  public readonly name = 'ZBanner-root';

  public refreshCssVariables = () => {
    const $fashion = this.queryAttribute('fashion', ZFashionPriority.Primary);
    const $height = this.queryAttribute('height', ZSizeVaried.Fit);

    const main = ZFashionThemeElement.property($fashion, 'main');
    const contrast = ZFashionThemeElement.property($fashion, 'contrast');
    const height = ZBannerElement.HeightChart[$height];

    this.style.setProperty('--banner-background', `var(${main})`);
    this.style.setProperty('--banner-color', `var(${contrast})`);
    this.style.setProperty('--banner-height', `${height}`);
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
