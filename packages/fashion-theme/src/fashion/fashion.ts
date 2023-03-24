import { ZColor } from '../color/color';
import { black, transparent, white } from '../color/rgb';

/**
 * Represents a set of colors that create a coordinated fashion grouping.
 */
export interface IZFashion {
  /**
   * Optional name of the fashion.
   */
  readonly name?: string;

  /**
   * The main fashion color.
   */
  readonly main: ZColor;

  /**
   * The lighter color.
   *
   * Should just use main if this is falsy.
   */
  readonly light?: ZColor;

  /**
   * The dark color.
   *
   * Should just use main if this is falsy.
   */
  readonly dark?: ZColor;

  /**
   * The color that contrasts the main.
   *
   * Note that it is not a requirement for this to
   * contract the light and dark fashions.  This
   * only applies to the main fashion.
   */
  readonly contrast: ZColor;
}

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
      contrast: black()
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
   * Builds a fashion for transparency.
   *
   * Note that you still need to set the contrast for this
   * since now there is no way to tell whether or not
   * the contract against the background can be.
   *
   * This sets the main to transparent and removes the light
   * and dark compliments.
   *
   * @param name -
   *        The optional name of the fashion.  Defaults to
   *        Transparent.
   *
   * @returns
   *        This object.
   */
  public transparent(): this {
    this._fashion.main = transparent();
    this._fashion.contrast = 'inherit';
    delete this._fashion.light;
    delete this._fashion.dark;
    return this;
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
