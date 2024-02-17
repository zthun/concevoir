import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithFashion } from '../element/with-fashion.mjs';
import { WithTailor } from '../element/with-tailor.mjs';

export class ZAlertElement extends WithTailor(WithFashion(ZFashionElement)) {
  public static readonly register = registerCustomElement.bind(null, 'z-alert', ZAlertElement);
  public readonly name = 'ZAlert-root';

  public generateStaticCss = () => ({
    alignItems: 'center',
    backgroundColor: 'var(--alert-background)',
    borderColor: 'var(--alert-border)',
    borderStyle: 'double',
    borderWidth: 'var(--alert-border-thickness)',
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
  });

  public refreshCssVariables = () => {
    const fallback = ZFashionPriority.Primary;

    this.style.setProperty('--alert-contrast', this.color('contrast', fallback));
    this.style.setProperty('--alert-background', this.color('main', fallback));
    this.style.setProperty('--alert-border', this.color(['dark', 'main'], fallback));
    this.style.setProperty('--alert-box-shadow-color', this.color(['border', 'main'], fallback));
    this.style.setProperty('--alert-border-radius', this.thickness(ZSizeFixed.ExtraLarge));
    this.style.setProperty('--alert-box-shadow-thickness', this.thickness(ZSizeFixed.ExtraSmall));
    this.style.setProperty('--alert-padding-x', this.gap(ZSizeFixed.ExtraSmall));
    this.style.setProperty('--alert-padding-y', this.gap(ZSizeFixed.Small));
  };
}
