import {
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { ZFashionElement } from 'src/element/fashion-element.mjs';
import { CSSInterpolation } from 'src/theme/css.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export class ZBannerElement extends ZFashionElement {
  public static HeightChart = {
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  };

  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observeAttributes = Object.freeze(['height', 'fashion']);
  public readonly name = 'ZBanner-root';

  public fashion() {
    return firstDefined(ZFashionPriority.Primary, this.getAttribute('fashion'));
  }

  public height() {
    return firstDefined(ZSizeVaried.Fit, this.getAttribute('height'));
  }

  protected refreshCssVariables(): void {
    const fashion = this.fashion();

    const main = ZFashionThemeElement.property(fashion, 'main');
    const contrast = ZFashionThemeElement.property(fashion, 'contrast');
    const height = ZBannerElement.HeightChart[this.height()];

    this.style.setProperty('--banner-background', `var(${main})`);
    this.style.setProperty('--banner-color', `var(${contrast})`);
    this.style.setProperty('--banner-height', `${height}`);
  }

  public generateStaticCss(): CSSInterpolation {
    return {
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
    };
  }
}
