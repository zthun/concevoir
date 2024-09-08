import { firstDefined, RequiredDeep } from "@zthun/helpful-fn";
import { IZFashionState } from "./fashion-state.mjs";
import { IZFashion } from "./fashion.mjs";

/**
 * Represents a helper fashion that retrieves rules based on a set of requirements.
 *
 * A color picker will return a color for every state and part, with idle
 * being the fallback for everything.
 */
export class ZColorPicker implements RequiredDeep<Omit<IZFashion, "name">> {
  public constructor(public fashion: IZFashion) {}

  public get idle() {
    const { fashion } = this;
    return {
      get main() {
        return fashion.idle.main;
      },
      get contrast() {
        return fashion.idle.contrast;
      },
      get border() {
        return firstDefined(this.main, fashion.idle.border);
      },
    };
  }

  public get hover() {
    return this._getStateWithFallbackToIdle(this.fashion.hover);
  }

  public get focus() {
    return this._getStateWithFallbackToIdle(this.fashion.focus);
  }

  public get active() {
    return this._getStateWithFallbackToIdle(this.fashion.active);
  }

  public get visited() {
    return this._getStateWithFallbackToIdle(this.fashion.visited);
  }

  private _getStateWithFallbackToIdle(state?: IZFashionState) {
    const { idle } = this;

    return {
      get main() {
        return firstDefined(idle.main, state?.main);
      },
      get contrast() {
        return firstDefined(idle.contrast, state?.contrast);
      },
      get border() {
        return firstDefined(idle.border, state?.border);
      },
    };
  }
}
