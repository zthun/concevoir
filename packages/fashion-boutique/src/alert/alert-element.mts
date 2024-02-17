import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithFashion } from '../element/with-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZAlertElement extends WithFashion(ZFashionElement) {
  public static readonly register = registerCustomElement.bind(null, 'z-alert', ZAlertElement);
  public static readonly observedAttributes = Object.freeze(['fashion']);
  public readonly name = 'ZAlert-root';

  public generateStaticCss = () => ({
    alignItems: 'center',
    backgroundColor: 'var(--alert-fashion)',
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
    const name = ZFashionPriority.Primary;
    const main = this.color((f) => f.main, { name, scope: 'main' });
    const contrast = this.color((f) => f.contrast, { name, scope: 'contrast' });
    const border = this.color((f) => firstDefined(f.main, f.border), { name, scope: 'border' });
    const thickness = ZFashionTailorElement.thicknessProperty(ZSizeFixed.ExtraSmall);
    const radius = ZFashionTailorElement.thicknessProperty(ZSizeFixed.ExtraLarge);
    const paddingX = ZFashionTailorElement.gapProperty(ZSizeFixed.ExtraSmall);
    const paddingY = ZFashionTailorElement.gapProperty(ZSizeFixed.Small);

    this.style.setProperty('--alert-contrast', contrast);

    this.style.setProperty('--alert-fashion', main);
    this.style.setProperty('--alert-border', border);
    this.style.setProperty('--alert-box-shadow-color', border);

    this.style.setProperty('--alert-border-radius', `var(${radius})`);
    this.style.setProperty('--alert-box-shadow-thickness', `var(${thickness})`);
    this.style.setProperty('--alert-padding-x', `var(${paddingX})`);
    this.style.setProperty('--alert-padding-y', `var(${paddingY})`);
  };
}
