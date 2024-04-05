import { IZFashionTypography, ZFashionTypographyBuilder } from '@zthun/fashion-typeface';
import { ZProperty } from '@zthun/helpful-dom';
import { css } from '@zthun/helpful-fn';
import { IZComponentStyles, ZComponentRegister, ZComponentStyles } from '@zthun/spellcraft';

@ZComponentRegister('z-fashion-typography')
@ZComponentStyles({ id: 'ZFashionTypography-root' })
export class ZFashionTypographyElement extends HTMLElement implements IZComponentStyles {
  public static readonly observedAttributes = ['size', 'unit', 'family', 'number'];

  public static readonly PropertyFontSize = '--typography-font-size';
  public static readonly PropertyFontFamily = '--typography-font-family';

  public static readonly VariableFontSize = `var(${ZFashionTypographyElement.PropertyFontSize}, 1em)`;
  public static readonly VariableFontFamily = `var(${ZFashionTypographyElement.PropertyFontFamily}, Roboto, Arial, sans-serif)`;

  @ZProperty({ initial: new ZFashionTypographyBuilder().build() })
  public typography: IZFashionTypography;

  public applyTypography(typography: IZFashionTypography) {
    this.typography = typography;
  }

  public styles() {
    const { typography } = this;
    const { size, unit } = typography;
    const family = `${typography.families.join(',')}`;
    const fontSize = `${size}${unit}`;

    return css`
      body: {
        font-family: ${family};
        font-size: ${fontSize};
      }
    `;
  }
}
