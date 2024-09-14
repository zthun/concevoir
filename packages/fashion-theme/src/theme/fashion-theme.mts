import { IZFashion, ZFashionBuilder } from "../fashion/fashion.mjs";

/**
 * Priority fashions.
 */
export enum ZFashionPriority {
  /**
   * Primary fashion.  Main color of your site.
   */
  Primary = "primary",
  /**
   * Secondary fashion.
   */
  Secondary = "secondary",
}

/**
 * Severity fashions.
 *
 * Often useful for alerts and buttons.
 */
export enum ZFashionSeverity {
  /**
   * Greens.
   */
  Success = "success",
  /**
   * Oranges.
   */
  Warning = "warning",
  /**
   * Reds.
   */
  Error = "error",
  /**
   * Blues.
   */
  Info = "info",
}

/**
 * Fashion that describes an area.
 */
export enum ZFashionArea {
  /**
   * Site body background.
   */
  Body = "body",
  /**
   * Card or modal surface on top of the body.
   */
  Surface = "surface",
  /**
   * Default button component style.
   */
  Component = "component",
}

/**
 * Constant contrast colors.
 */
export enum ZFashionContrast {
  /**
   * Dark.
   *
   * Usually black.
   */
  Dark = "dark",
  /**
   * Light.
   *
   * Usually white.
   */
  Light = "light",
  /**
   * A theme that contrasts the core them.
   *
   * If the core them is dark, this should be light.
   * Likewise, if the core theme is light, this should be dark.
   */
  Opposite = "opposite",
}

/**
 * Intrinsic fashions.
 */
export enum ZFashionIntrinsic {
  /**
   * Inherit the parent colors.
   */
  Inherit = "inherit",
  /**
   * No color.
   */
  Transparent = "transparent",
}

export type ZFashionName =
  | ZFashionPriority
  | ZFashionSeverity
  | ZFashionArea
  | ZFashionContrast
  | ZFashionIntrinsic;
export type ZFashionRecord = Record<ZFashionName, IZFashion>;

/**
 * Represents a general fashion design that includes the common types.
 */
export interface IZFashionTheme<TCustom extends object = {}>
  extends ZFashionRecord {
  /**
   * The optional name of the design.
   */
  readonly name: string;

  /**
   * Transparent fashion.
   */
  readonly transparent: IZFashion;

  /**
   * Inherit fashion.
   */
  readonly inherit: IZFashion;

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
  private _design: {
    -readonly [P in keyof IZFashionTheme<TCustom>]: IZFashionTheme<TCustom>[P];
  };

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._design = {
      name: "Light",
      primary: new ZFashionBuilder().name("Primary").spectrum(0x1976d2).build(),
      secondary: new ZFashionBuilder()
        .name("Secondary")
        .spectrum(0x9c27b0)
        .build(),
      success: new ZFashionBuilder().name("Success").spectrum(0x2e7d32).build(),
      warning: new ZFashionBuilder().name("Warning").spectrum(0xff9e42).build(),
      error: new ZFashionBuilder().name("Error").spectrum(0xd32f2f).build(),
      info: new ZFashionBuilder().name("Info").spectrum(0xb5e5ff).build(),
      body: new ZFashionBuilder().name("Body").spectrum(0xeeeeee).build(),
      surface: new ZFashionBuilder().name("Surface").spectrum(0xfafafa).build(),
      component: new ZFashionBuilder()
        .name("Component")
        .spectrum(0xdedede)
        .build(),
      light: new ZFashionBuilder().name("Light").spectrum(0xfafafa).build(),
      dark: new ZFashionBuilder().name("Dark").spectrum(0x212121).build(),
      opposite: new ZFashionBuilder()
        .name("Opposite")
        .spectrum(0x212121)
        .build(),
      transparent: new ZFashionBuilder()
        .name("Transparent")
        .transparent()
        .build(),
      inherit: new ZFashionBuilder().name("Inherit").inherit().build(),
      custom: {} as TCustom,
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
