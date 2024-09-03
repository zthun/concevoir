import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentRequired } from "../component/component-required.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentValue } from "../component/component-value.mjs";

export interface IZBoolean<T>
  extends IZComponentDisabled,
    IZComponentValue<T>,
    IZComponentStyle,
    IZComponentLabel,
    IZComponentName,
    IZComponentRequired,
    IZComponentFashion {}
