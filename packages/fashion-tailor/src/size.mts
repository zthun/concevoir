import { ZSizeFixed } from "./fixed/size-fixed.mjs";
import { ZSizeVaried } from "./varied/size-varied.mjs";
import { ZSizeVoid } from "./void/size-void.mjs";

/**
 * A sizing object that can be a fixed size or none.
 */
export type ZSizeGap = ZSizeFixed | ZSizeVoid;

/**
 * A gap sizing that includes support for auto.
 *
 * Mostly used for margins.
 */
export type ZSizeMargin = ZSizeGap | ZSizeVaried.Fit;

/**
 * Same as {@link ZSizeGap} but aliased for semantics.
 */
export type ZSizeThickness = ZSizeFixed | ZSizeVoid;

/**
 * Same as {@link ZSizeGap} but aliased for semantics.
 */
export type ZSizeRounding = ZSizeFixed | ZSizeVoid | ZSizeVaried.Full;

/**
 * A sizing object that can be one any of the valid enum sizes.
 */
export type ZSize = ZSizeFixed | ZSizeVaried | ZSizeVoid;

/**
 * Represents a chart that maps a size to more useable values.
 */
export type ZSizeChart<T> = Record<ZSize, T>;
