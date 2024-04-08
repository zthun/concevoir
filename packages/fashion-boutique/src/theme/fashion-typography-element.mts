import { IZFashionTypography, ZFashionTypographyBuilder } from '@zthun/fashion-typeface';
import { ZProperty } from '@zthun/helpful-dom';
import { css } from '@zthun/helpful-fn';
import {
  IZComponentStyles,
  IZComponentWithStyleElement,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect
} from '@zthun/spellcraft';

export interface ZFashionTypographyElement extends IZComponentWithStyleElement {}

@ZComponentRegister('z-fashion-typography')
@ZComponentStylesAddOnConnect()
@ZComponentStyles({ id: 'ZFashionTypography-root' })
export class ZFashionTypographyElement extends HTMLElement implements IZComponentStyles {
  public static readonly defaultTypography = new ZFashionTypographyBuilder().build();
  public static readonly defaultFontSize = `${ZFashionTypographyElement.defaultTypography.size}${ZFashionTypographyElement.defaultTypography.unit}`;

  public static readonly PropertyFontSize = '--fashion-typography-font-size';
  public static readonly PropertyFontFamily = '--fashion-typography-font-family';

  public static readonly VariableFontSize = `var(${ZFashionTypographyElement.PropertyFontSize}, ${ZFashionTypographyElement.defaultFontSize})`;
  public static readonly VariableFontFamily = `var(${ZFashionTypographyElement.PropertyFontFamily}, ${ZFashionTypographyElement.defaultTypography.families})`;

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
      html {
        ${ZFashionTypographyElement.PropertyFontSize}: ${fontSize};
        ${ZFashionTypographyElement.PropertyFontFamily}: ${family};
      }

      body: {
        font-family: ${family};
        font-size: ${fontSize};
      }
    `;
  }
}
