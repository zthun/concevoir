import { CSSInterpolation } from '@emotion/css';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export class ZAlertElement extends ZFashionElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert', ZAlertElement);
  public static readonly observedAttributes = Object.freeze(['fashion']);
  public readonly name = 'ZAlert-root';

  public get fashion(): string {
    return firstDefined(ZFashionPriority.Primary, this.getAttribute('fashion'));
  }

  protected generateStaticCss(): CSSInterpolation {
    return {
      alignItems: 'center',
      backgroundColor: 'var(--alert-fashion)',
      border: 'var(--alert-border-thickness) double var(--alert-border)',
      borderRadius: 'var(--alert-border-radius)',
      boxShadow: '0 0 0 var(--alert-box-shadow-thickness) var(--alert-box-shadow-color)',
      color: 'var(--alert-contrast)',
      display: 'grid',
      gridTemplateAreas: `
        "avatar heading ."
        "avatar message ."
      `,
      gridTemplateColumns: 'auto auto 1fr',
      padding: 'var(--alert-padding-x) var(--alert-padding-y)'
    };
  }

  protected refreshCssVariables() {
    const fashion = this.fashion;

    const contrast = ZFashionThemeElement.property(fashion, 'contrast');
    const main = ZFashionThemeElement.property(fashion, 'main');
    const border = ZFashionThemeElement.property(fashion, 'border');
    const light = ZFashionThemeElement.property(fashion, 'light');
    const thickness = ZFashionTailorElement.thicknessProperty(ZSizeFixed.ExtraSmall);
    const radius = ZFashionTailorElement.thicknessProperty(ZSizeFixed.ExtraLarge);
    const paddingX = ZFashionTailorElement.gapProperty(ZSizeFixed.ExtraSmall);
    const paddingY = ZFashionTailorElement.gapProperty(ZSizeFixed.Small);

    this.style.setProperty('--alert-contrast', `var(${contrast})`);
    this.style.setProperty('--alert-fashion', `var(${main})`);
    this.style.setProperty('--alert-border', `var(${light})`);
    this.style.setProperty('--alert-border-radius', `var(${radius})`);
    this.style.setProperty('--alert-box-shadow-color', `var(${border})`);
    this.style.setProperty('--alert-box-shadow-thickness', `var(${thickness})`);
    this.style.setProperty('--alert-padding-x', `var(${paddingX})`);
    this.style.setProperty('--alert-padding-y', `var(${paddingY})`);
  }
}
