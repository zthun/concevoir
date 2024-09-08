import { ZSize, ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentLoading } from "../component/component-loading.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense<
  TWidth extends ZSize = ZSizeFixed,
  THeight extends ZSize = ZSizeVaried.Fit,
> extends IZComponentStyle,
    IZComponentWidth<TWidth, TWidth>,
    IZComponentHeight<THeight, THeight>,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentName {}
