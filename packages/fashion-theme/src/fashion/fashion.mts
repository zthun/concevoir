import { ZColor, brighten, contrast } from '../color/color.mjs';
import { hex } from '../color/hex.mjs';
import { black, white } from '../color/rgb.mjs';

/**
 * Overrides for a fashion.
 */
export interface IZFashionOverrides {
  main?: ZColor;
  contrast?: ZColor;
  border?: ZColor;
}

/**
 * Represents a set of colors that create a coordinated fashion grouping.
 */
export interface IZFashion {
  /**
   * Optional name of the fashion.
   */
  readonly name: string;

  /**
   * The main fashion color.
   */
  readonly main: ZColor;

  /**
   * A lighter version of main.
   */
  readonly light?: ZColor;

  /**
   * A darker version of main.
   */
  readonly dark?: ZColor;

  /**
   * Appropriate border color.
   */
  readonly border?: ZColor;

  /**
   * The color that contrasts the main.
   *
   * Note that it is not a requirement for this to
   * contract the light and dark fashions.  This
   * only applies to the main fashion.
   */
  readonly contrast: ZColor;

  /**
   * The color overrides for when a component is hovered.
   */
  readonly hover: IZFashionOverrides;

  /**
   * The color overrides for when a component is focused.
   */
  readonly focus: IZFashionOverrides;
}

/**
 * A path to a scoped color value in a fashion block.
 */
export type ZFashionScope =
  | 'main'
  | 'light'
  | 'dark'
  | 'border'
  | 'contrast'
  | 'hover.main'
  | 'hover.contrast'
  | 'hover.border'
  | 'focus.main'
  | 'focus.contrast'
  | 'focus.border';

/**
 * Represents a builder for a complementary fashion objects.
 */
export class ZFashionBuilder {
  private _fashion: { -readonly [P in keyof IZFashion]: IZFashion[P] };

  /**
   * Initializes a new instance of this object.
   *
   * The default complementary pair is white and black
   * for the main and contrast values respectively.
   */
  public constructor() {
    this._fashion = {
      main: white(),
      contrast: black(),
      name: 'default',
      hover: {},
      focus: {}
    };
  }

  /**
   * Sets the name.
   *
   * @param name -
   *        The name.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._fashion.name = name;
    return this;
  }

  /**
   * Sets the light, main, and dark.
   *
   * If you only have the main color, this will auto
   * lighten and darken your main color by a given amount.
   *
   * This will also calculate a contrast value of white or black,
   * whichever one gives the higher contrast value off of the main
   * color.
   *
   * @param color -
   *        The main color.
   * @param amount -
   *        The amount to lighten and darken.
   */
  public spectrum(color: number, amount = 77) {
    const whiteContrast = contrast(color, 0xffffff);
    const blackContrast = contrast(color, 0x000000);
    const higherContrast = whiteContrast >= blackContrast ? white() : black();

    const main = hex(color);
    const light = hex(brighten(color, amount));
    const dark = hex(brighten(color, -amount));

    return this.main(main)
      .dark(dark)
      .light(light)
      .contrast(higherContrast)
      .focus({
        main: light,
        border: dark
      })
      .hover({
        main: dark,
        border: light
      })
      .border(dark);
  }

  /**
   * Sets the main color.
   *
   * @param color -
   *        The main color.
   *
   * @returns
   *        This object.
   */
  public main(color: ZColor): this {
    this._fashion.main = color;
    return this;
  }

  /**
   * Sets the main color.
   *
   * @param color -
   *        The contrast color.
   *
   * @returns
   *        This object.
   */
  public contrast(color: ZColor): this {
    this._fashion.contrast = color;
    return this;
  }

  /**
   * Sets the darker version of the main color.
   *
   * @param color -
   *        The dark color.
   *
   * @returns
   *        This object.
   */
  public dark(color: ZColor): this {
    this._fashion.dark = color;
    return this;
  }

  /**
   * Sets the light version of the main color.
   *
   * @param color -
   *        The light color.
   *
   * @returns
   *        This object.
   */
  public light(color: ZColor): this {
    this._fashion.light = color;
    return this;
  }

  /**
   * Sets an appropriate border for the main color.
   *
   * @param color -
   *        The border color.
   *
   * @returns -
   *        This object.
   */
  public border(color: ZColor): this {
    this._fashion.border = color;
    return this;
  }

  /**
   * Sets the focus fashion.
   *
   * @param focus -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public focus(focus: IZFashionOverrides): this {
    this._fashion.focus = { ...this._fashion.focus, ...focus };
    return this;
  }

  /**
   * Sets the hover fashion.
   *
   * @param hover -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public hover(hover: IZFashionOverrides): this {
    this._fashion.hover = { ...this._fashion.hover, ...hover };
    return this;
  }

  /**
   * Swaps the main and contrast.
   */
  public swap() {
    const t = this._fashion.contrast;
    return this.contrast(this._fashion.main).main(t);
  }

  /**
   * Clones another fashion complements object into this builder object.
   *
   * @param other -
   *        The complements object to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZFashion): this {
    this._fashion = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Builds the complementary object.
   *
   * @returns
   *        The built complementary object.
   */
  public build(): IZFashion {
    return Object.freeze(JSON.parse(JSON.stringify(this._fashion)));
  }
}
