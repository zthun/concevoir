import { hex } from '../color/hex';
import { black, transparent, white } from '../color/rgb';
import { IZFashion, ZFashionBuilder } from '../fashion/fashion';

/**
 * Represents a fashion scheme that contains a primary and secondary priority.
 */
export interface IZFashionThemePriority {
  /**
   * The fashion for the primary priority.
   */
  readonly primary: IZFashion;
  /**
   * The fashion for the secondary priority.
   */
  readonly secondary: IZFashion;
}

/**
 * Represents a fashion scheme that contains the severity fashions.
 */
export interface IZFashionThemeSeverity {
  /**
   * The fashion for the success severity.
   */
  readonly success: IZFashion;
  /**
   * The fashion for the warning severity.
   */
  readonly warning: IZFashion;
  /**
   * The fashion for the error severity.
   */
  readonly error: IZFashion;
  /**
   * The fashion for the info severity.
   */
  readonly info: IZFashion;
}

/**
 * Represents a fashion design scheme for targeted spaces.
 */
export interface IZFashionThemeSpace {
  /**
   * The fashion for body background.
   */
  readonly body: IZFashion;

  /**
   * Contrasting body fashion.
   */
  readonly surface: IZFashion;
}

/**
 * A fashion scheme
 */
export interface IZFashionThemeContrast {
  /**
   * Fashion for less color contrast.
   */
  readonly light: IZFashion;
  /**
   * Fashion for heavier color contrast.
   */
  readonly dark: IZFashion;
}

/**
 * Represents a general fashion design that includes the common types.
 */
export interface IZFashionTheme<TCustom = {}>
  extends IZFashionThemePriority,
    IZFashionThemeSeverity,
    IZFashionThemeSpace,
    IZFashionThemeContrast {
  /**
   * The optional name of the design.
   */
  readonly name: string;

  /**
   * Transparent fashion.
   */
  readonly transparent: IZFashion;

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
export class ZFashionThemeBuilder {
  private _design: { -readonly [P in keyof IZFashionTheme]: IZFashionTheme[P] };

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._design = {
      name: 'Default',
      primary: new ZFashionBuilder()
        .name('Primary')
        .main(hex(0x1976d2))
        .light(hex(0x42a5f5))
        .dark(hex(0x1565c0))
        .contrast(white())
        .build(),
      secondary: new ZFashionBuilder()
        .name('Secondary')
        .main(hex(0x9c27b0))
        .light(hex(0xba68c8))
        .dark(hex(0x7b1fa2))
        .contrast(white())
        .build(),
      success: new ZFashionBuilder()
        .name('Success')
        .main(hex(0x2e7d32))
        .light(hex(0x4caf50))
        .dark(hex(0x1b5e20))
        .contrast(white())
        .build(),
      warning: new ZFashionBuilder()
        .name('Warning')
        .main(hex(0xed6c02))
        .light(hex(0xff9800))
        .dark(hex(0xe65100))
        .contrast(white())
        .build(),
      error: new ZFashionBuilder()
        .name('Error')
        .main(hex(0xd32f2f))
        .light(hex(0xef5350))
        .dark(hex(0xc62828))
        .contrast(white())
        .build(),
      info: new ZFashionBuilder()
        .name('Info')
        .main(hex(0x0288d1))
        .light(hex(0x039f4))
        .dark(hex(0x1579b))
        .contrast(white())
        .build(),
      body: new ZFashionBuilder()
        .name('Background')
        .main(hex(0xeeeeee))
        .light(hex(0xf5f5f5))
        .dark(hex(0xbdbdbd))
        .contrast(black())
        .build(),
      surface: new ZFashionBuilder()
        .name('Surface')
        .main(hex(0xfafafa))
        .light(white())
        .dark(hex(0xf5f5f5))
        .contrast(black())
        .build(),
      light: new ZFashionBuilder()
        .name('Light')
        .main(hex(0xfafafa))
        .light(white())
        .dark(hex(0xf5f5f5))
        .contrast(black())
        .build(),
      dark: new ZFashionBuilder()
        .name('Dark')
        .main(hex(0x212121))
        .light(hex(0x424242))
        .dark(black())
        .contrast(white())
        .build(),
      transparent: new ZFashionBuilder().name('Transparent').main(transparent()).contrast('inherit').build(),
      custom: {}
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
  public build(): IZFashionTheme {
    return Object.freeze(JSON.parse(JSON.stringify(this._design)));
  }
}
