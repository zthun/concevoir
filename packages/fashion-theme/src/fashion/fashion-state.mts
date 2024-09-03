import { ZColor } from "../color/color.mjs";
import { transparent } from "../color/rgb.mjs";

/**
 * State object for a fashion.
 */
export interface IZFashionState {
  /**
   * Main color.
   */
  main?: ZColor;
  /**
   * Contrast color that applies against the fashion.
   */
  contrast?: ZColor;
  /**
   * Border color to offset the main color.
   */
  border?: ZColor;
}

export class ZFashionStateBuilder {
  private _state: IZFashionState;

  public constructor() {
    this._state = {};
  }

  public main(color: ZColor) {
    this._state.main = color;
    return this;
  }

  public contrast(color: ZColor) {
    this._state.contrast = color;
    return this;
  }

  public border(color: ZColor) {
    this._state.border = color;
    return this;
  }

  public transparent() {
    this._state.main = transparent();
    this._state.contrast = "inherit";
    delete this._state.border;
    return this;
  }

  public inherit() {
    this._state.main = "inherit";
    this._state.contrast = "inherit";
    delete this._state.border;
    return this;
  }

  public build(): IZFashionState {
    return { ...this._state };
  }
}
