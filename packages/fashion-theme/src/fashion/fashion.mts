import { ZColor, brighten, contrast } from "../color/color.mjs";
import { hex } from "../color/hex.mjs";
import { black, transparent, white } from "../color/rgb.mjs";

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
 * Intrinsic fashions that are built in and
 * don't change across themes.
 */
export enum ZFashionIntrinsic {
  /**
   * Fashion for transparency.
   */
  Transparent = "transparent",

  /**
   * Fashion for inherit.
   */
  Inherit = "inherit",
}

export type ZFashionName =
  | ZFashionPriority
  | ZFashionSeverity
  | ZFashionArea
  | ZFashionContrast
  | ZFashionIntrinsic;

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

  /**
   * The color overrides for when a component is active.
   */
  readonly active: IZFashionOverrides;
}

/**
 * A path to a scoped color value in a fashion block.
 */
export type ZFashionScope =
  | "main"
  | "light"
  | "dark"
  | "border"
  | "contrast"
  | "hover.main"
  | "hover.contrast"
  | "hover.border"
  | "focus.main"
  | "focus.contrast"
  | "focus.border"
  | "active.main"
  | "active.contrast"
  | "active.border";

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
      active: {},
      contrast: black(),
      focus: {},
      hover: {},
      main: white(),
      name: "default",
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
   * Sets the name to {@link ZFashionPriority.Primary}.
   *
   * @returns
   *        This object.
   */
  public namedPrimary = this.name.bind(this, ZFashionPriority.Primary);

  /**
   * Sets the name to {@link ZFashionPriority.Secondary}.
   *
   * @returns
   *        This object.
   */
  public namedSecondary = this.name.bind(this, ZFashionPriority.Secondary);

  /**
   * Sets the name to {@link ZFashionSeverity.Success}.
   *
   * @returns
   *        This object.
   */
  public namedSuccess = this.name.bind(this, ZFashionSeverity.Success);

  /**
   * Sets the name to {@link ZFashionSeverity.Error}.
   *
   * @returns
   *        This object.
   */
  public namedError = this.name.bind(this, ZFashionSeverity.Error);

  /**
   * Sets the name to {@link ZFashionSeverity.Warning}.
   *
   * @returns
   *        This object.
   */
  public namedWarning = this.name.bind(this, ZFashionSeverity.Warning);

  /**
   * Sets the name to {@link ZFashionSeverity.Info}.
   *
   * @returns
   *        This object.
   */
  public namedInfo = this.name.bind(this, ZFashionSeverity.Info);

  /**
   * Sets the name to {@link ZFashionArea.Body}.
   *
   * @returns
   *        This object.
   */
  public namedBody = this.name.bind(this, ZFashionArea.Body);

  /**
   * Sets the name to {@link ZFashionArea.Component}.
   *
   * @returns
   *        This object.
   */
  public namedComponent = this.name.bind(this, ZFashionArea.Component);

  /**
   * Sets the name to {@link ZFashionArea.Surface}.
   *
   * @returns
   *        This object.
   */
  public namedSurface = this.name.bind(this, ZFashionArea.Surface);

  /**
   * Sets the name to {@link ZFashionContrast.Dark}.
   *
   * @returns
   *        This object.
   */
  public namedDark = this.name.bind(this, ZFashionContrast.Dark);

  /**
   * Sets the name to {@link ZFashionContrast.Light}.
   *
   * @returns
   *        This object.
   */
  public namedLight = this.name.bind(this, ZFashionContrast.Light);

  /**
   * Sets the name to {@link ZFashionContrast.Opposite}.
   *
   * @returns
   *        This object.
   */
  public namedOpposite = this.name.bind(this, ZFashionContrast.Opposite);

  /**
   * Generates a default transparent fashion.
   *
   * @returns
   *        This object.
   */
  public transparent() {
    return this.name(ZFashionIntrinsic.Transparent)
      .main(transparent())
      .contrast("inherit");
  }

  /**
   * Generates a default inherit fashion.
   *
   * @returns
   *        This object.
   */
  public inherit() {
    return this.name(ZFashionIntrinsic.Inherit)
      .main("inherit")
      .contrast("inherit");
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
    const w = 0xffffff;
    const b = 0x000000;

    const whiteMainContrast = contrast(color, w);
    const blackMainContrast = contrast(color, b);
    const higherMainContrast =
      whiteMainContrast >= blackMainContrast ? white() : black();

    const lighter = brighten(color, Math.floor(amount / 2));
    const whiteLighterContrast = contrast(lighter, w);
    const blackLighterContrast = contrast(lighter, b);
    const higherLighterContrast =
      whiteLighterContrast >= blackLighterContrast ? white() : black();

    const light = brighten(color, amount);
    const whiteLightContrast = contrast(light, w);
    const blackLightContrast = contrast(light, b);
    const higherLightContrast =
      whiteLightContrast >= blackLightContrast ? white() : black();

    const dark = brighten(color, -amount);
    const whiteDarkContrast = contrast(dark, w);
    const blackDarkContrast = contrast(dark, b);
    const higherDarkContrast =
      whiteDarkContrast >= blackDarkContrast ? white() : black();

    const mainColor = hex(color);
    const lighterColor = hex(lighter);
    const lightColor = hex(light);
    const darkColor = hex(dark);

    return this.main(mainColor)
      .dark(darkColor)
      .light(lightColor)
      .contrast(higherMainContrast)
      .active({
        contrast: higherLighterContrast,
        main: lighterColor,
        border: lightColor,
      })
      .focus({
        contrast: higherLightContrast,
        main: lightColor,
        border: darkColor,
      })
      .hover({
        contrast: higherDarkContrast,
        main: darkColor,
        border: lightColor,
      })
      .border(darkColor);
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
   * Sets the active fashion.
   *
   * @param hover -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public active(active: IZFashionOverrides): this {
    this._fashion.active = { ...this._fashion.active, ...active };
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
