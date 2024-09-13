import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense
  extends IZComponentStyle,
    IZComponentDisabled,
    IZComponentFashion,
    IZComponentName {}
