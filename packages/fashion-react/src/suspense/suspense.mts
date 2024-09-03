import {
  IZComponentFashion,
  IZComponentHeight,
  IZComponentLoading,
  IZComponentName,
  IZComponentWidth,
} from "@zthun/fashion-boutique";
import { ZSize, ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { IZComponentStyle } from "../component/component-style.mjs";

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense<
  TWidth extends ZSize = ZSizeFixed,
  THeight extends ZSize = ZSizeVaried.Fit,
> extends IZComponentStyle,
    IZComponentWidth<TWidth>,
    IZComponentHeight<THeight>,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentName {}
