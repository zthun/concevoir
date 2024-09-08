import { brighten, contrast } from "../color/color.mjs";
import { hex } from "../color/hex.mjs";
import { black, white } from "../color/rgb.mjs";
import { IZFashionState, ZFashionStateBuilder } from "./fashion-state.mjs";

/**
 * Represents a set of colors that create a coordinated fashion grouping.
 */
export interface IZFashion {
  /**
   * Optional name of the fashion.
   */
  readonly name?: string;

  /**
   * Idle state.
   */
  readonly idle: IZFashionState &
    Required<Pick<IZFashionState, "main" | "contrast">>;

  /**
   * Color overrides for when a component is hovered.
   */
  readonly hover?: IZFashionState;

  /**
   * Color overrides for when a component is focused.
   */
  readonly focus?: IZFashionState;

  /**
   * Color overrides for when a component is active.
   */
  readonly active?: IZFashionState;

  /**
   * Color overrides for when a component is visited.
   */
  readonly visited?: IZFashionState;
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
      idle: {
        main: white(),
        contrast: black(),
      },
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
   * Removes everything but idle main and contrast, and the fashion name.
   *
   * @returns
   *        This object.
   */
  public clear() {
    delete this._fashion.active;
    delete this._fashion.focus;
    delete this._fashion.hover;
    delete this._fashion.visited;
    delete this._fashion.idle.border;
    return this;
  }

  /**
   * Sets the idle, hover, and focus states.
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
    const createState = (_color: number) => {
      const whiteContrast = contrast(_color, 0xffffff);
      const blackContrast = contrast(_color, 0x000000);

      return new ZFashionStateBuilder()
        .main(hex(_color))
        .contrast(whiteContrast >= blackContrast ? white() : black())
        .border(hex(brighten(_color, -amount)))
        .build();
    };

    return this.idle(createState(color))
      .focus(createState(brighten(color, -amount)))
      .hover(createState(brighten(color, amount)))
      .active(createState(brighten(color, amount * 1.15)))
      .visited(createState(brighten(color, -amount * 1.15)));
  }

  /**
   * Sets the idle state.
   *
   * Note that main and contrast will be fully held and, if not set in
   * the state, will be ignored.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public idle(state: IZFashionState): this {
    this._fashion.idle = Object.assign({}, this._fashion.idle, state);
    return this;
  }

  /**
   * Sets the focus state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public focus(state: IZFashionState): this {
    this._fashion.focus = { ...state };
    return this;
  }

  /**
   * Sets the hover state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public hover(state: IZFashionState): this {
    this._fashion.hover = { ...state };
    return this;
  }

  /**
   * Sets the active state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public active(state: IZFashionState): this {
    this._fashion.active = { ...state };
    return this;
  }

  /**
   * Sets the visited state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public visited(state: IZFashionState): this {
    this._fashion.visited = { ...state };
    return this;
  }

  /**
   * Builds the transparent fashion.
   *
   * @returns -
   *        This object.
   */
  public transparent(): this {
    return this.clear().idle(new ZFashionStateBuilder().transparent().build());
  }

  /**
   * Builds the inherit fashion.
   *
   * @returns -
   *        This object.
   */
  public inherit(): this {
    return this.clear().idle(new ZFashionStateBuilder().inherit().build());
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
