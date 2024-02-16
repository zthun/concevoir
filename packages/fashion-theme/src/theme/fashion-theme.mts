import { IZFashion, ZFashionBuilder, ZFashionName } from '../fashion/fashion.mjs';

export type ZFashionRecord = Record<ZFashionName, IZFashion>;

/**
 * Represents a general fashion design that includes the common types.
 */
export interface IZFashionTheme<TCustom extends object = {}> extends ZFashionRecord {
  /**
   * The name of the theme.
   */
  readonly name: string;

  /**
   * Custom fashions.
   */
  readonly custom: TCustom;
}

/**
 * Represents a builder for a fashion design.
 *
 * This builder will give you a baseline for a fashion
 * design with the default palette and the most basic of colors.
 *
 * If all you do with this is override the palette, then you
 * should have a generally good scheme for your fashion needs.
 */
export class ZFashionThemeBuilder<TCustom extends object = {}> {
  private _design: { -readonly [P in keyof IZFashionTheme<TCustom>]: IZFashionTheme<TCustom>[P] };

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._design = {
      name: 'light',
      primary: new ZFashionBuilder().namedPrimary().spectrum(0x1976d2).build(),
      secondary: new ZFashionBuilder().namedSecondary().spectrum(0x9c27b0).build(),
      success: new ZFashionBuilder().namedSuccess().spectrum(0x2e7d32).build(),
      warning: new ZFashionBuilder().namedWarning().spectrum(0xff9e42).build(),
      error: new ZFashionBuilder().namedError().spectrum(0xd32f2f).build(),
      info: new ZFashionBuilder().namedInfo().spectrum(0xb5e5ff).build(),
      body: new ZFashionBuilder().namedBody().spectrum(0xeeeeee).build(),
      surface: new ZFashionBuilder().namedSurface().spectrum(0xfafafa).build(),
      component: new ZFashionBuilder().namedComponent().spectrum(0xdedede).build(),
      light: new ZFashionBuilder().namedLight().spectrum(0xfafafa).build(),
      dark: new ZFashionBuilder().namedDark().spectrum(0x212121).build(),
      opposite: new ZFashionBuilder().namedOpposite().spectrum(0x212121).build(),
      transparent: new ZFashionBuilder().transparent().build(),
      inherit: new ZFashionBuilder().inherit().build(),
      custom: {} as TCustom
    };
  }

  /**
   * Sets the name of the design.
   *
   * @param name -
   *        The design name.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._design.name = name;
    return this;
  }

  /**
   * Sets the primary fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public primary(fashion: IZFashion): this {
    this._design.primary = fashion;
    return this;
  }

  /**
   * Sets the secondary fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public secondary(fashion: IZFashion): this {
    this._design.secondary = fashion;
    return this;
  }

  /**
   * Sets the success fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public success(fashion: IZFashion): this {
    this._design.success = fashion;
    return this;
  }

  /**
   * Sets the warning fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public warning(fashion: IZFashion): this {
    this._design.warning = fashion;
    return this;
  }

  /**
   * Sets the error fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public error(fashion: IZFashion): this {
    this._design.error = fashion;
    return this;
  }

  /**
   * Sets the info fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public info(fashion: IZFashion): this {
    this._design.info = fashion;
    return this;
  }

  /**
   * Sets the body fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public body(fashion: IZFashion): this {
    this._design.body = fashion;
    return this;
  }

  /**
   * Sets the surface fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public surface(fashion: IZFashion): this {
    this._design.surface = fashion;
    return this;
  }

  /**
   * Sets the component fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public component(fashion: IZFashion): this {
    this._design.component = fashion;
    return this;
  }

  /**
   * Sets the light fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public light(fashion: IZFashion): this {
    this._design.light = fashion;
    return this;
  }

  /**
   * Sets the dark fashion.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public dark(fashion: IZFashion): this {
    this._design.dark = fashion;
    return this;
  }

  /**
   * Sets the opposite contrast theme.
   *
   * @param fashion -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public opposite(fashion: IZFashion): this {
    this._design.opposite = fashion;
    return this;
  }

  /**
   * Sets the custom theme.
   *
   * @param custom -
   *        The custom theme to set.
   *
   * @returns
   *        A new builder with a newly typed custom
   *        theme.
   */
  public custom<T extends object>(custom: T): ZFashionThemeBuilder<T> {
    const next = new ZFashionThemeBuilder<T>().copy(this._design);
    next._design.custom = custom;
    return next;
  }

  /**
   * Copies another design into this design.
   *
   * @param other -
   *        The fashion design to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZFashionTheme): this {
    this._design = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the built copy of the fashion design.
   *
   * @returns
   *        A deep copy of the built design.
   */
  public build(): IZFashionTheme<TCustom> {
    return Object.freeze(JSON.parse(JSON.stringify(this._design)));
  }
}
